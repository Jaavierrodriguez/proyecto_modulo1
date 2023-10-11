let relog = function (response) {
    console.log(response)
    let create = (element) => document.createElement(element)
    let divList = create("div")



    response.data.forEach((element, i) => {
        let divAnim = create("div")
        let imgAnim = create("img")
        let nameAnim = create("h2")
        let buttonFav = create("button")

        imgAnim.src = element.attributes.posterImage.small

        nameAnim.textContent = element.attributes.canonicalTitle

        buttonFav.id = `button${element.attributes.canonicalTitle}`
        buttonFav.textContent = "♥ Añadir a favoritos"


        divAnim.append(imgAnim, nameAnim, buttonFav)
        divList.appendChild(divAnim)

        //     document.querySelector(`#button${element.attributes.canonicalTitle}`).addEventListener("click", function () {
        //         let favsArray = []

        //         if (localStorage.getItem("favs")) {
        //             favsArray = JSON.parse(localStorage.getItem("favs"))
        //         }

        //         if (localStorage.getItem("favs")) {
        //             favsArray = JSON.parse(localStorage.getItem("favs"))
        //         }
        //         //Esto borra o añade dependiendo de si está o no guardado el anime en el local storage
        //         if (favsArray.includes(this.id)) {
        //             favsArray = favsArray.filter(anime => anime !== this.id);
        //             this.textContent = "♥ Añadir a favoritos"
        //         } else {
        //             favsArray.push(this.id);
        //             this.textContent = "♥ Eliminar de favoritos"
        //         }
        //     });
        console.log(divList)
        document.querySelector("#relog").innerHTML = divList.innerHTML;

        if (document.querySelector("#relog").innerHTML == "") {
            document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
        }
    })
}

let currentPage = Math.floor(Math.random() * 984);
//let currentPage = 1; // Página actual
let itemsPerPage = 20; // Número de resultados por página
let input = document.getElementById("anime-input")
console.log(currentPage)
// Función para cargar los resultados
function loadResults(page) {
    let offset = (page - 1) * itemsPerPage; // Calcular el offset

    let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&page[offset]=${offset}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
        }
    })
        .then(response => response.json())
        .then(response => relog(response))
        .catch();
}

loadResults(currentPage);



let search
let buttonSearch = document.querySelector("button")
buttonSearch.addEventListener("click", function () {
    search = document.querySelector("#search").value

    let apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${search}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
        }
    })
        .then(response => response.json())
        .then(response => relog(response))
        .catch();
})