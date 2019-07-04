// Get the popup
var mlPopup = document.getElementById("MLPopup");
// Get the button that opens the popup
var mlLink = document.querySelector(".mentions-legales");
// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the popup
mlLink.onclick = function() {
  popup.style.display = "block";
};
// When the user clicks on <span> (x), close the popup
span.onclick = function() {
  popup.style.display = "none";
};
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};
