(function() {
  "use strict";

  const input = document.getElementById("filter-restos");
  const gridRestau = document.querySelector(".restaurants-grid");
  const url = "/api/search/resto";
  const meta = document.getElementById("site_url");
  const siteUrl = meta.getAttribute("data-url");
  const allHearts = document.getElementsByClassName("fa-heart");
  const button = document.querySelector(".sendButton");

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

  [...allHearts].forEach(
    // spread allHearts to transform our HTML collection into an array
    heart =>
      (heart.onclick = function(evt) {
        const restauId = this.getAttribute("data-restauId");
        console.log(restauId);
        axios
          .post(`${siteUrl}/addToFav/${restauId}`)
          .then(id => console.log(id))
          .catch(err => console.log(err));

        if (this.classList.contains("fas")) {
          heart.classList.replace("fas", "far");
        } else if (heart.classList.contains("far")) {
          heart.classList.replace("far", "fas");
        }
      })
  );
  //

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

  // var mlpopup = document.getElementById("ml_popup");
  // var btnMl = document.querySelector(".btn-ml");
  // var spantwo = document.getElementsByClassName("closetwo")[0];
  // btnMl.onclick = function() {
  //   mlpopup.style.display = "block";
  // };
  // spantwo.onclick = function() {
  //   mlpopup.style.display = "none";
  // };
  // window.onclick = function(event) {
  //   event.preventDefault();
  //   if (event.target == mlpopup) {
  //     mlpopup.style.display = "none";
  //   }
  // };

  // var cgupopup = document.getElementById("cgu_popup");
  // var btnCgu = document.querySelector(".btn-cgu");
  // var span = document.getElementsByClassName("close")[0];
  // btnCgu.onclick = function() {
  //   cgupopup.style.display = "block";
  // };
  // span.onclick = function() {
  //   cgupopup.style.display = "none";
  // };
  // window.onclick = event => {
  //   event.preventDefault();
  //   if (event.target == cgupopup) {
  //     cgupopup.style.display = "none";
  //   }
  // };
})();
