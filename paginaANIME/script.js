let currentPage = 1; // Página actual
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
        .then(res => res.json())

        .then(res => {
            console.log(res)
            let create = (element) => document.createElement(element)
            let divList = create("div")
            

            res.data.forEach((element, i) => {
                let divAnim = create("div")
                let imgAnim = create("img")
                let nameAnim = create("h2")

                naruto.src
                imgAnim.src = element.attributes.posterImage.small
                imgAnim.className = "poster"

                nameAnim.textContent = element.attributes.canonicalTitle


                divAnim.append(imgAnim, nameAnim)
                divList.appendChild(divAnim)
            });
            console.log(divList)
            document.querySelector("body").appendChild(divList)
            //document.querySelector("p").textContent = (data.data[0].attributes.description)
        })
        .catch();
}

loadResults(currentPage);