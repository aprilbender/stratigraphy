<div id="ajaxContent">
    <p>Loading Image...</p>
</div>

    <style>
        .hide-img {
            display: none;
    }

        .show-img {
            display: block;
        position: absolute;

        /* can omit the border if you want*/
        border: 1px solid black;
    }
</style>

    <script>

        let hoverData = {};
        var Webflow = Webflow || [];
        
        // https://gist.githubusercontent.com/johnsogg/393ab25e8c4cb79e77d620aeb82df112/raw/f643c25973238538d6996b809a3b2505c112c64b/rollover.svg
Webflow.push(function() {
            console.log(`Beginning process: fetch mondo SVG...`);
        // April: when you re-upload your svg, this is the URL for you to change.............v -------------------------------------v
        // const svgUrl = 'https://cdn.rawgit.com/johnsogg/393ab25e8c4cb79e77d620aeb82df112/raw/0e080cc13b3435a2e8543af3f66bf2483ee3ccb5/rollover.svg';
        const svgUrl = 'https://raw.githubusercontent.com/aprilbender/stratigraphy/master/Paleogeography_Maps_Compressed.svg';
  $.get(svgUrl, function(data) {
            // this way works with the github gist: (keep it around!)
            // $('#ajaxContent').replaceWith(new XMLSerializer().serializeToString(data));
            // this way works with the committed version in the github repo:
            $('#ajaxContent').replaceWith(data)
        });
        console.log(`Done with process: fetch mondo SVG.`);
      });
      
// Webflow.push(function() {
            //	console.log('adding document loaded handler...');
            //  $(window).load(console.log('document loaded')); 
            //});

            Webflow.push(function () {
                console.log(`Beginning process: fetch image data...`);
                $('.rollover-image-data').each((index, invisibleThing) => {
                    const k = invisibleThing.getElementsByTagName('div')[0].innerText;
                    invisibleThing.getElementsByTagName('img')[0].onload = () => {
                        const v = invisibleThing.getElementsByTagName('img')[0].src;
                        const w = invisibleThing.getElementsByTagName('img')[0].width;
                        const h = invisibleThing.getElementsByTagName('img')[0].height;
                        hoverData[k] = {
                            src: v,
                            width: w,
                            height: h,
                        };
                        console.log(`loaded ${k} (${w}x${h})`);
                    }
                });
                console.log(`Done with process: fetch image data.`);
            });

        function whack(e, ident, over) {
            var rect = e.getBoundingClientRect();
        $('#hover-img').attr('class', over ? 'show-img' : 'hide-img');
            if (over) {
            	try {
              	if (!hoverData[ident]) {
            console.log(`hoverData not found for ${ident}`)
        } else {
            console.log(`hover over pip ${ident}`);
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
            console.log('ignoring error:', err);
        }
      }
  }
</script>