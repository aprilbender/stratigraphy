// April: this is the only thing that you have to update on a per-page basis. This and maybe
// which 'whack' function to use, depending on how you want rollovers to appear.
// const svgUrl = 'https://raw.githubusercontent.com/aprilbender/stratigraphy/master/Paintings_Compressed.svg';
// const svgUrl = 'https://raw.githubusercontent.com/aprilbender/stratigraphy/master/Paleogeography_Maps_Compressed.svg';
const svgUrl = 'https://raw.githubusercontent.com/aprilbender/stratigraphy/master/Strat_Chart_Compressed.svg';

let hoverData = {};
var Webflow = Webflow || [];
let origWindowWidth = undefined;

let loadMondoSvg = () => {
    $.ajax({
        url: svgUrl,
        success: function (data) {
            // If the image is something that should zoom along with the keyboard zoom controls, we
            // have to fix its size to some fraction of the original screen width.
            const widthStyle = `
                width: ${origWindowWidth * 0.9}px;
            `;
            $('#ajaxContentParent').attr('style', widthStyle);
            // this way works with the github gist: (keep it around!)
            // $('#ajaxContent').replaceWith(new XMLSerializer().serializeToString(data));
            // this way works with the committed version in the github repo:
            $('#ajaxContent').replaceWith(data);
            console.log('fully loaded svg. now doing tooltip thing.');
            loadHoverImages();
        },
        cache: false,
    });
}

let navTo = id => {
    $('#' + id)[0].scrollIntoView();
};

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
    origWindowWidth = window.innerWidth;
    loadMondoSvg();
}

Webflow.push(function () {
    $(document).ready(() => postLoadStuff());
});

let whackNearby = (e, ident, over) => {
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

// the following version of whack puts the rollover on the left or the right side, whichever the hover 
// pip isn't on. It is centered vertically, but you're guaranteed to not have the pip be in the way.
let whackLeftOrRightSide = (e, ident, over) => {
    var rect = e.getBoundingClientRect();
    $('#hover-img').attr('class', over ? 'show-img' : 'hide-img');
    if (over) {
        try {
            if (!hoverData[ident]) {
                console.log(`hoverData not found for ${ident}`);
            }
            let d = hoverData[ident];
            let midX = window.innerWidth / 2;
            let position = `
                width: ${d.width}px;
                height: ${d.height}px;
                ${rect.x > midX ? 'right' : 'left'}: 50vw;
                background: url(${d.src});
                background-size: contain;
                background-repeat: no-repeat;
            `;
            $('#hover-img').attr('style', position);
        } catch (err) {
            console.log(`ignoring error for ${ident}`);
        }
    }
}

// const whack = whackNearby;
const whack = whackLeftOrRightSide;

// 360-degree panographic pictures use different code.
let currentPano = null;
const hidePano = () => {
    if (currentPano != null) {
        $(currentPano).removeClass('show-img');
        $(currentPano).addClass('hide-img');
        currentPano = null;
    }
}
const showPano = (e, ident) => {
    try {
        let rect = e.getBoundingClientRect();
        let midX = window.innerWidth / 2;
        // user has requested to show pano-N (where N is ident) near element e.
        console.log(`please show pano image ${ident} over the element:`, e);
        let nextPano = '#embed-' + ident;
        const bailOut = nextPano === currentPano;
        hidePano(); // in case something is already showing
        if (bailOut) {
            return;
        }
        currentPano = '#embed-' + ident;
        $(currentPano).addClass('show-img');
        const position = `
            ${rect.x > midX ? 'right' : 'left'}: 50vw;
        `;
        $(currentPano).attr('style', position);
    } catch (err) {
        console.log(`ignoring error for ${currentPano}:`, err);
    }
}