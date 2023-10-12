let create = (element) => document.createElement(element)
let linkId = ""

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


//Funcion Anime Data
let data = function (response) {
    console.log(response)
    document.querySelector("#relog").textContent = ""
    let divGeneral = create("div"), divTitle = create("div")
    let imgAnim = create("img")
    let nameAnim = create("h2")
    let synAnim = create("p")

    imgAnim.src = response.data.attributes.posterImage.small
    nameAnim.textContent = response.data.attributes.canonicalTitle
    synAnim.textContent = response.data.attributes.synopsis

    divTitle.append(nameAnim, synAnim)
    divGeneral.append(imgAnim, divTitle)
    document.querySelector("#relog").appendChild(divGeneral)








}

//Funcion Load Animes
let relog = function (response) {
    console.log(response)
    let divList = create("div")

    if (response.data.length == 0) {
        document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
    }

    response.data.forEach((element) => {
        let divAnim = create("div")
        let imgAnim = create("img")
        let nameAnim = create("h2")
        let buttonFav = create("button")

        imgAnim.src = element.attributes.posterImage.small
        nameAnim.textContent = element.attributes.canonicalTitle

        nameAnim.id = `h2${element.id}`
        buttonFav.id = `id${element.id}`
        divAnim.className = `block`


        divAnim.append(imgAnim, nameAnim, buttonFav)
        divList.appendChild(divAnim)


        document.querySelector("#relog").textContent = ""
        document.querySelector("#relog").appendChild(divList);


        //Favs
        if (localStorage.getItem("favs")) {
            let favsArray = JSON.parse(localStorage.getItem("favs"));
            if (favsArray.includes(`id${element.id}`)) {
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

        document.querySelector(`#id${element.id}`).addEventListener("click", function () { favs(buttonFav) })

        //Anime Data
        document.querySelector(`#h2${element.id}`).addEventListener("click", function () {
            let idNum = element.id
            linkId = ""
            linkId = idNum
            console.log(idNum)
            fetch(`https://kitsu.io/api/edge/anime/${idNum}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.api+json',
                }
            })
                .then(response => response.json())
                .then(response => data(response))
                .catch(error => {
                    console.error(`Error`, error)
                    error.textContent = "Error loading data"
                });
        })
    })
}



//Anime list random
let randomPage = Math.floor(Math.random() * 984); // Página
let itemsPerPage = 20; // Número de resultados por página


let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&page[offset]=${randomPage}`;

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.api+json',
    }
})
    .then(response => response.json())
    .then(response => relog(response))
    .catch(error => {
        console.error(`Error`, error)
        error.textContent = "Error loading data"
    });



//Anime List Search
let buttonSearch = document.querySelector("button")
buttonSearch.addEventListener("click", function () {
    let search = document.querySelector("#searchHolder").value

    let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&filter[text]=${search}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
        }
    })
        .then(response => response.json())
        .then(response => relog(response))
        .catch(error => {
            console.error(`Error`, error)
            error.textContent = "Error loading data"
        });
})