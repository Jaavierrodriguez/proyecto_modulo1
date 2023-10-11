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

        buttonFav.id = `id${element.id}`


        divAnim.append(imgAnim, nameAnim, buttonFav)
        divList.appendChild(divAnim)
        console.log(buttonFav.id);
        if (localStorage.getItem("favs")) {
            let favsArray = JSON.parse(localStorage.getItem("favs"));
            if (favsArray.includes(`id${element.id}`)) {
                buttonFav.innerHTML = `&#9829 Eliminar de favoritos`; // Corazón lleno
            } else {
                buttonFav.innerHTML = `&#9825 Añadir a favoritos`; // Corazón hueco
            }
        } else {
            buttonFav.innerHTML = `&#9825 Añadir a favoritos`; // Corazón hueco por defecto
        }
        console.log(element.id)

        document.querySelector("#relog").textContent = ""
        document.querySelector("#relog").appendChild(divList);

        if (document.querySelector("#relog").innerHTML == "") {
            document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
        }

        console.log(document.querySelector(`#anime${element.id}`));


        document.querySelector(`#id${element.id}`).addEventListener("click", function () {
            console.log("funciono");
            let favsArray = []

            if (localStorage.getItem("favs")) {
                favsArray = JSON.parse(localStorage.getItem("favs"))
            }
            //Esto borra o añade dependiendo de si está o no guardado el anime en el local storage
            if (favsArray.includes(this.id)) {
                favsArray = favsArray.filter(id => id !== this.id);
                this.innerHTML = "&#9825 Añadir a favoritos"
            } else {
                favsArray.push(this.id);
                this.innerHTML = "&#9829 Eliminar de favoritos"
            }
            localStorage.setItem("favs", JSON.stringify(favsArray))
        });

    })
}

let currentPage = Math.floor(Math.random() * 984);
//let currentPage = 1; // Página actual
let itemsPerPage = 20; // Número de resultados por página
let input = document.getElementById("anime-input")
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