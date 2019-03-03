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
    console.log("I found selector:", selector);
  } else {
    console.log("did not find selector:", selector);
  }
};
