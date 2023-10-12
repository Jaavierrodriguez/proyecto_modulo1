let animes = 19.664;
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

let favs = [1, 2];

favs.forEach((idAnime, i) => {
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
      // res.incluided.forEach((anime) => {
        document.querySelector(".animeFavs").innerHTML += `
      <img src=${res.data.attributes.posterImage.medium}>
      <h2>${res.data.attributes.titles.en_jp}</h2>
      `;
      // });
    })
    .catch((error) => console.error("No se a podido realizar la acción" + error));
})

