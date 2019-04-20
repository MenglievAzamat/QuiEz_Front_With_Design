var size = (window.outerWidth * 16) / 1020;

document.querySelector("html").style.fontSize = size + "px";

window.addEventListener("resize", function() {
  var size = (window.outerWidth * 16) / 1020;

  document.querySelector("html").style.fontSize = size + "px";
});
