
let animes = 19.664
let anime = Math.floor((Math.random() * animes) + 1);

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
      document.querySelector("#bestanime").innerHTML += `
    <img src=${anime.attributes.posterImage.medium}
    <h2>${anime.attributes.titles.en_jp}</h2>
    <p>${anime.attributes.description}</p>

`;
    });
  })


// console.log(res);
//   .catch((error) => console.error("No se a podido realizar la acción" + error));
