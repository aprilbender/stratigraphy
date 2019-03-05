// stratigraphy.js
//
// This is a global js file that should work in every page.
//
// It is not in production yet. I am consolidating the various scripts
// that are independently embedded in various pages so there is far
// less copypasta.

const POSITION_BEHAVIOR_CENTERED = "centered";
const POSITION_BEHAVIOR_LEFT_RIGHT = "left/right";

const whackHoverImage = (prefix, positionBehavior) => (e, ident, over) => {
  const selector = `#${prefix}${ident}`;
  if ($(selector).length) {
    if (over) {
      showHoverImage(selector, e, positionBehavior);
    } else {
      hideHoverImage(selector);
    }
  } else {
    console.log("Could not find selector:", selector);
  }
};

makePositionStyle = (e, positionBehavior) => {
  switch (positionBehavior) {
    case POSITION_BEHAVIOR_LEFT_RIGHT:
      const rect = e.getBoundingClientRect();
      const midX = window.innerWidth / 2;
      const side = rect.x > midX ? "right" : "left";
      return `
        top: 50vw;
        ${side}: 50vw;
        transform: translate(0, -50%);
      `;
    default:
    case POSITION_BEHAVIOR_CENTERED:
      return `
        left: 50vw; 
        top: 50vw;
        transform: translate(-50%, -50%);
    `;
  }
};

const showHoverImage = (selector, e, positionBehavior) => {
  $(selector).removeClass("strat-hide-img");
  $(selector).addClass("strat-show-img");
  $(selector).addClass("strat-hover-img-position");
  const position = makePositionStyle(e, positionBehavior);
  $(selector).attr("style", position);
};

const hideHoverImage = selector => {
  $(selector).removeClass("strat-show-img");
  $(selector).addClass("strat-hide-img");
};

const updateLargeSvgSize = () => {
  if (!$("#measure").length) {
    console.log(
      "Warning: measure div does not exist. Did you forget to add it? Not fixing SVG size."
    );
    return;
  }
  const measureWidth = $("#measure")[0].getBoundingClientRect().width;
  const widthStyle = `width: ${measureWidth}px`;
  $("#ajaxContentParent").attr("style", widthStyle);
};

const loadLargeSvg = (targetSelector, svgUrl, successCallback) => {
  $.ajax({
    url: svgUrl,
    success: function(data) {
      $(targetSelector).replaceWith(data);
      window.setTimeout(updateLargeSvgSize, 0);
      if (successCallback) {
        successCallback();
      }
    },
    cache: false
  });
};

// navTo is for internal linking from SVGs. This is to sidestep a limitation in some
// browsers like Safari.
const navTo = id => {
  $("#" + id)[0].scrollIntoView();
};
