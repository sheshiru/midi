const input = document.getElementById("filter-restos");
const gridRestau = document.querySelector(".restaurants-grid");
const url = "/api/search/resto";
const meta = document.getElementById("site_url");
const siteUrl = meta.getAttribute("data-url");
const button = document.querySelector(".sendButton");

button.addEventListener("click", function(e) {
  e.preventDefault();
  const resto_id = document
    .querySelector(".speedContainerButtons")
    .getAttribute("data-id");
  axios
    .post(`${siteUrl}/api/restaurant/${resto_id}`, {
      speed: document.querySelector("[name=speed]:checked").value
    })
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});

input.onkeyup = evt => filterRestos(evt.target.value);

function filterRestos(value) {
  axios
    .get(`${url}?search=${value}`)
    .then(apiRes => {
      const restos = Object.values(apiRes.data);
      displayRestos(apiRes.data);
      console.log(apiRes);
    })
    .catch(apiErr => console.error(apiErr));
}

function displayRestos(restos) {
  function renderTemplate(infos) {
    return `<div class="one-restaurant-container">
    <a href="/restaurant/${infos._id}?companyId=${
      document.getElementById("company_id").value
    }" class="individual-thumbnail">
      <div class="restaurants-image"><img src="${
        infos.image
      }" alt="restaurant image"></div>
      <h2 class="restaurants-name">${infos.name}</h2>
      <p class="restaurants-favs">${
        infos.favorites.length
      }<i class="far fa-heart"></i></p>
    </a>
  </div>`;
  }

  gridRestau.innerHTML = "";

  restos.forEach((resto, i) => {
    console.log(resto);
    gridRestau.innerHTML += renderTemplate(resto);
  });
}

// displayStates(states);
// input.onkeyup = evt => filterStates(evt.target.value, states);
// })
// .catch(APIErr => console.log(APIErr));

// function displayStates(states) {
// states.forEach((state) => list.innerHTML += `<li class="item state">${state}</li>`);
// }

// function filterStates(value, states) {
// let statesFiltered = states.filter(function (state) {
// return state.toLowerCase().includes(value.toLowerCase());
// });
// list.innerHTML = "";
// displayStates(statesFiltered);
// }

// var popup = document.getElementById("cguPopup");
// // Get the button that opens the popup
// var btnCGU = document.querySelector(".cgu");
// // Get the <span> element that closes the popup
// var span = document.getElementsByClassName("close")[0];
// // When the user clicks the button, open the popup
// btnCGU.onclick = function() {
//   popup.style.display = "block";
// };
// // When the user clicks on <span> (x), close the popup
// span.onclick = function() {
//   popup.style.display = "none";
// };
// // When the user clicks anywhere outside of the popup, close it
// window.onclick = function(event) {
//   event.preventDefault();
//   if (event.target == popup) {
//     popup.style.display = "none";
//   }
// };

// var mlpopup = document.getElementById("mlPopup");
// // Get the button that opens the popup
// var btnML = document.querySelector(".ml");
// // Get the <span> element that closes the popup
// var span = document.getElementsByClassName("close")[0];
// // When the user clicks the button, open the popup
// btnML.onclick = function() {
//   mlpopup.style.display = "block";
// };
// // When the user clicks on <span> (x), close the popup
// span.onclick = function() {
//   mlpopup.style.display = "none";
// };
// // When the user clicks anywhere outside of the popup, close it
// window.onclick = function(event) {
//   event.preventDefault();
//   if (event.target == mlpopup) {
//     mlpopup.style.display = "none";
//   }
// };
