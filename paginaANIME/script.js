// let currentPage = 1; // Página actual
// let itemsPerPage = 20; // Número de resultados por página

// // Función para cargar los resultados
// function loadResults(page) {
//     let offset = (page - 1) * itemsPerPage; // Calcular el offset

//     let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&page[offset]=${offset}`;

//     fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/vnd.api+json',
//         }
//     })
//         .then(response => response.json())

//         .then(response => {
//             console.log(response)
//             let create = (element) => document.createElement(element)
//             let divList = create("div")

//             response.data.forEach((element, i) => {
//                 let divAnim = create("div")
//                 let imgAnim = create("img")
//                 let nameAnim = create("h2")

//                 imgAnim.src = element.attributes.posterImage.small
//                 imgAnim.className = "poster"

//                 nameAnim.textContent = element.attributes.canonicalTitle


//                 divAnim.append(imgAnim, nameAnim)
//                 divList.appendChild(divAnim)
//             });
//             console.log(divList)
//             document.querySelector("#relog").appendChild(divList)
//         })

//         .catch();
// }

// loadResults(currentPage);



// let search, button = document.querySelector("button")
// button.addEventListener("click", function () {
//     search = document.querySelector("#search").value

//     let apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${search}`;

//     fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/vnd.api+json',
//         }
//     })
//         .then(response => response.json())
//         .then(data => {

//             console.log(data);
//             let create = (element) => document.createElement(element)

//             let divList = create("div")


//             data.data.forEach((element, i) => {
//                 let divAnim = create("div")
//                 let imgAnim = create("img")
//                 let nameAnim = create("h2")

//                 imgAnim.src = element.attributes.posterImage.small
//                 imgAnim.className = "poster"

//                 nameAnim.textContent = element.attributes.canonicalTitle


//                 divAnim.append(imgAnim, nameAnim)
//                 divList.appendChild(divAnim)
//             });

//             console.log(divList)

//             document.querySelector("#relog").innerHTML = divList.innerHTML;

//             if (document.querySelector("#relog").innerHTML == "") {
//                 document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
//             }
//         })

//         .catch();
// })






let relog = function () {
    console.log(response)
    let create = (element) => document.createElement(element)
    let divList = create("div")

    response.data.forEach((element, i) => {
        let divAnim = create("div")
        let imgAnim = create("img")
        let nameAnim = create("h2")

        imgAnim.src = element.attributes.posterImage.small
        imgAnim.className = "poster"

        nameAnim.textContent = element.attributes.canonicalTitle


        divAnim.append(imgAnim, nameAnim)
        divList.appendChild(divAnim)
    });
    console.log(divList)
    document.querySelector("#relog").appendChild(divList)

    if (document.querySelector("#relog").innerHTML == "") {
        document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
    }
}

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


        .then(response => relog(response) /*{
            console.log(response)


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
            document.querySelector("#relog").appendChild(divList)
        }*/)

        .catch();
}

loadResults(currentPage);



let search, button = document.querySelector("button")
button.addEventListener("click", function () {
    search = document.querySelector("#search").value

    let apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${search}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
        }
    })
        .then(response => response.json())
        .then(response => relog(response) /*{

            console.log(data);
            let create = (element) => document.createElement(element)

            let divList = create("div")


            data.data.forEach((element, i) => {
                let divAnim = create("div")
                let imgAnim = create("img")
                let nameAnim = create("h2")

                imgAnim.src = element.attributes.posterImage.small
                imgAnim.className = "poster"

                nameAnim.textContent = element.attributes.canonicalTitle


                divAnim.append(imgAnim, nameAnim)
                divList.appendChild(divAnim)
            });

            console.log(divList)

            document.querySelector("#relog").innerHTML = divList.innerHTML;

            if (document.querySelector("#relog").innerHTML == "") {
                document.querySelector("#relog").innerHTML = `<h2>No results found</h2>`
            }
        }*/)

        .catch();
})