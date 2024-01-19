export function toggleHamburger() {
  var element = document.getElementById("right_side");
  var elementLeft = document.getElementById("left_side");
  var elementOverlay = document.getElementById("sidebar-overlay");
  // element.classList.toggle("active");
  elementLeft.classList.toggle("active");
  elementOverlay.classList.toggle("active");
}
