// stratigraphy.js
//
// This is a global js file that should work in every page.

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
        ${side}: 50vw;
        transform: translate(0, -50%);
      `;
    default:
    case POSITION_BEHAVIOR_CENTERED:
      return ``;
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

// these pano-related functiosn deal with 360-degre panographic embeds. They require
// the page to have a certain structure (e.g. divs named #embed-123)
let currentPano = null;
const hidePano = () => {
  if (currentPano != null) {
    $(currentPano).removeClass("pano-show-img");
    $(currentPano).addClass("pano-hide-img");
    currentPano = null;
  }
};
const showPano = (e, ident) => {
  try {
    let rect = e.getBoundingClientRect();
    let midX = window.innerWidth / 2;
    // user has requested to show pano-N (where N is ident) near element e.
    let nextPano = "#embed-" + ident;
    const bailOut = nextPano === currentPano;
    hidePano(); // in case something is already showing
    if (bailOut) {
      return;
    }
    currentPano = "#embed-" + ident;
    $(currentPano).addClass("pano-show-img");
    const position = `
            ${rect.x > midX ? "right" : "left"}: 50vw;
        `;
    $(currentPano).attr("style", position);
  } catch (err) {
    console.log(`ignoring error for ${currentPano}:`, err);
  }
};

// Tooltips

// the tooltips input should be a dictionary of { id : message}, e.g.
// tooltips = { 'oil-1' : '<span>848,383 bbl <br />Gallup Formation</span>' }
//
// targetSelectors should be an array of selectors that the tooltips will be
// attached to.
const loadTooltips = (tooltips, targetSelectors) => {
  targetSelectors.forEach(selector => {
    $(selector).each(function(_, elm) {
      $(elm).attr("data-tippy", tooltips[elm.id]);
    });
  });
  $.getScript("https://unpkg.com/tippy.js@3/dist/tippy.all.min.js");
};
