// stratigraphy.js
//
// This is a global js file that should work in every page.
//
// It is not in production yet. I am consolidating the various scripts
// that are independently embedded in various pages so there is far
// less copypasta.

const whackHoverImage = prefix => (e, ident, over) => {
  console.log("whackHoverImage:", e, ident, over, prefix);
  const selector = `#${ident}`;
  if ($(selector).length) {
    if (over) {
      showHoverImage(selector, e);
    } else {
      hideHoverImage(selector, e);
    }
  } else {
    console.log("Could not find selector:", selector);
  }
};

const showHoverImage = (selector, e) => {
  $(selector).removeClass("strat-hide-img");
  $(selector).addClass("strat-show-img");
  $(selector).addClass("strat-hover-img-position");
  const rect = e.getBoundingClientRect();
  const position = `
                left: ${rect.right + 100}px; 
                top: ${rect.top + 50}px;
            `;
  $(selector).attr("style", position);
};

const hideHoverImage = (selector, e) => {
  $(selector).removeClass("strat-show-img");
  $(selector).addClass("strat-hide-img");
};
