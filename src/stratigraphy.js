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
  console.log("whackHoverImage:", e, ident, over, prefix, positionBehavior);
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
