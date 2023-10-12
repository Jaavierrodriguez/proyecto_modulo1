let animes = 19664;
let anime = Math.floor(Math.random() * animes);

let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${1}&page[offset]=${anime}`;

fetch(apiUrl, {
  method: "GET",
  headers: {
    Accept: "application/vnd.api+json",
  },
})
  .then((res) => res.json())
  .then((res) => {
    res.data.forEach((anime) => {
      document.querySelector("#imgTitle").innerHTML += `
    <img src=${anime.attributes.posterImage.medium}>
    <h2>${anime.attributes.titles.en_jp}</h2>
    
    `;
      res.data.forEach((anime) => {
        document.querySelector("#descrip").innerHTML += `
 
    <p>${anime.attributes.description}</p>
    `;
      });
    });
  });

// Url para poder traer los favoritos a mi paginaHOME

let favsNum = [];
let favsId = JSON.parse(localStorage.getItem("favs"));
for (let i = 0; i < favsId.length; i++) {

  let number = favsId[i].replace("id", "");
  favsNum.push(number)

}



//Funcion añadir favs
let favs = function (button) {
  let favsArray = []

  if (localStorage.getItem("favs")) {
    favsArray = JSON.parse(localStorage.getItem("favs"))
  }

  if (favsArray.includes(button.id)) {
    favsArray = favsArray.filter(id => id !== button.id);
    button.innerHTML = "&#9825"
    button.className = "buttonFav buttonFavNo"
  } else {
    favsArray.push(button.id);
    button.innerHTML = "&#9829"
    button.className = "buttonFav buttonFavYes"
  }

  localStorage.setItem("favs", JSON.stringify(favsArray))
}




favsNum.forEach((idAnime) => {
  let apiFavs = `https://kitsu.io/api/edge/anime/${idAnime}`;
  fetch(apiFavs, {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let divAnimeFav = document.createElement("div")
      divAnimeFav.className = "block"

      divAnimeFav.innerHTML += `
      <img src=${res.data.attributes.posterImage.medium}>
      <h2 class = "titleList">${res.data.attributes.titles.en_jp}</h2>
      `;
      document.querySelector("#relog").appendChild(divAnimeFav)

      let buttonFav = document.createElement("button")
      buttonFav.id = `id${res.data.id}`

      if (localStorage.getItem("favs")) {
        let favsArray = JSON.parse(localStorage.getItem("favs"));
        if (favsArray.includes(`id${res.data.id}`)) {
          buttonFav.innerHTML = `&#9829`; // Corazón lleno
          buttonFav.className = "buttonFav buttonFavYes"
        } else {
          buttonFav.innerHTML = `&#9825`; // Corazón hueco
          buttonFav.className = "buttonFav buttonFavNo"
        }
      } else {
        buttonFav.innerHTML = `&#9825`; // Corazón hueco por defecto
        buttonFav.className = "buttonFav buttonFavNo"
      }
      divAnimeFav.appendChild(buttonFav)
      document.querySelector(`#id${res.data.id}`).addEventListener("click", function () { favs(buttonFav) })

    })
    .catch();
})
