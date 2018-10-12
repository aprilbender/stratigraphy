let hoverData = {};
var Webflow = Webflow || [];

let loadMondoSvg = () => {
    const svgUrl = 'https://raw.githubusercontent.com/aprilbender/stratigraphy/master/Paleogeography_Maps_Compressed.svg';
    $.get(svgUrl, function (data) {
        // this way works with the github gist: (keep it around!)
        // $('#ajaxContent').replaceWith(new XMLSerializer().serializeToString(data));
        // this way works with the committed version in the github repo:
        $('#ajaxContent').replaceWith(data)
    });
}

let numHoversSeen = 0;
let loadHoverImages = () => {
    $('.rollover-image-data').each((index, invisibleThing) => {
        const elm = invisibleThing.getElementsByTagName('div')[0]
        const k = invisibleThing.getElementsByTagName('div')[0].innerText;
        const v = invisibleThing.getElementsByTagName('img')[0].src;
        const w = invisibleThing.getElementsByTagName('img')[0].width;
        const h = invisibleThing.getElementsByTagName('img')[0].height;
        numHoversSeen++;
        console.log(`${numHoversSeen} - hover ${k}: ${w}x${h} at ${v}`);
        hoverData[k] = { src: v, width: w, height: h };
    });
}

let postLoadStuff = () => {
    loadMondoSvg();
    loadHoverImages();
}

Webflow.push(function () {
    $(document).ready(() => postLoadStuff());
});

let whack = (e, ident, over) => {
    var rect = e.getBoundingClientRect();
    $('#hover-img').attr('class', over ? 'show-img' : 'hide-img');
    if (over) {
        try {
            if (!hoverData[ident]) {
                console.log(`hoverData not found for ${ident}`);
            }
            let d = hoverData[ident];
            let position = `
                    left: ${rect.right + 100}px; 
                    top: ${rect.top + 50}px;
                    background: url(${d.src});
                    background-size: contain;
                    background-repeat: no-repeat;
                    width: ${d.width}px;
                    height: ${d.height}px;
                `;
            $('#hover-img').attr('style', position);
        } catch (err) {
            console.log(`ignoring error for ${ident}`);
        }
    }
}