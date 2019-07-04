// Get the popup
var mlPopup = document.getElementById("mlPopup");
// Get the button that opens the popup
var mlLink = document.querySelector(".mentions-legales");
// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the popup
mlLink.onclick = function() {
  mlPopup.style.display = "block";
};
// When the user clicks on <span> (x), close the popup
span.onclick = function() {
  mlPopup.style.display = "none";
};
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == mlPopup) {
    mlPopup.style.display = "none";
  }
};
