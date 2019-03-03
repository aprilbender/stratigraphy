// stratigraphy.js
//
// This is a global js file that should work in every page.
//
// It is not in production yet. I am consolidating the various scripts
// that are independently embedded in various pages so there is far
// less copypasta.

let whackHoverImage = prefix => (e, ident, over) => {
  console.log("whackHoverImage invoked with arguments:");
  console.log("e:", e);
  console.log("ident:", ident);
  console.log("over", over);
  console.log("using prefix:", prefix);
};
