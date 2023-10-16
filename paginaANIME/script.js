let create = (element) => document.createElement(element)


//Function Add/Remove favs
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

    localStorage.setItem("favs", JSON.stringify(favsArray)) //array de favs -> string
}


//Function Anime Data
let data = function (response) {
    console.log(response)
    document.querySelector("#relog").textContent = ""  //vaciar
    if (document.querySelector("#pages"))
        document.querySelector("#pages").remove();          //quitar pages
    let divGeneral = create("div")
    let divTitle = create("div")
    let divDetails = create("div")
    let divAll = create("div")
    let divListSynop = create("div")
    let imgAnim = create("img")
    let nameAnim = create("h1")
    let synAnim = create("p")
    let details = create("ol")
    let video = create("iframe")

    divGeneral.id = "divGeneral"
    divTitle.id = "divSynop"
    divDetails.id = "divDetails"
    divAll.id = "divAll"
    divListSynop.id = "divListSynop"

    video.src = `https://www.youtube.com/embed/${response.data.attributes.youtubeVideoId}`
    video.frameBorder = "0";
    video.allowFullscreen = true;

    imgAnim.src = response.data.attributes.posterImage.small
    nameAnim.textContent = response.data.attributes.canonicalTitle
    synAnim.textContent = response.data.attributes.synopsis

    divDetails.innerHTML = "<h2>Anime Details</h2>"
    let ele1 = create("li")
    ele1.textContent = "Type: " + response.data.attributes.showType
    let ele2 = create("li")
    ele2.textContent = "Status: " + response.data.attributes.status
    let ele3 = create("li")
    ele3.textContent = "Start Date: " + response.data.attributes.startDate
    let ele4 = create("li")
    ele4.textContent = "End Date: " + response.data.attributes.endDate
    let ele5 = create("li")
    ele5.textContent = "Episodes: " + response.data.attributes.episodeCount
    let ele6 = create("li")
    ele6.textContent = response.data.attributes.averageRating + " % community approval"

    let list = [ele1, ele2, ele3, ele4, ele5, ele6]
    for (i = 0; i < list.length; i++) {
        if (list[i].textContent.indexOf("null") == -1) {
            details.appendChild(list[i])
        }
    }


    divDetails.appendChild(details)
    divTitle.append(nameAnim, synAnim)
    divGeneral.append(imgAnim, divTitle)
    divListSynop.append(divGeneral, divDetails)
    divAll.appendChild(divListSynop)
    document.querySelector("#relog").appendChild(divAll)
    if (response.data.attributes.youtubeVideoId != null && response.data.attributes.youtubeVideoId != "") {
        divAll.appendChild(video)
    }

}


//Function Load Animes
let linkId = ""
let relog = function (response) {
    console.log(response)
    let divList = create("div")
    divList.id = "generalAnimes"

    if (response.data.length == 0) {
        document.querySelector("#relog").innerHTML = `<h2 id="resultsError">No results found</h2>`
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
                });
        })
    })
}


//Fuction Anime list
let page = 1
function loadList(page) {

    let offset = (page - 1) * 20
    //document.querySelector("#nextButtonList").className = "nextButtonList"
    //document.querySelector("#prevButtonList").className = "prevButtonList"
    document.querySelector("#pageNumber").textContent = `Page ${page}`

    let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}`;

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
        });
}
loadList(page)

let nextList = document.querySelector(".nextButtonList")
let prevList = document.querySelector(".prevButtonList")
// next Button
nextList.addEventListener("click", function () {
    page++;
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });
    loadList(page);
});
// prev Button
prevList.addEventListener("click", function () {
    if (page > 1) {
        page--;
        document.getElementById("header").scrollIntoView({ behavior: "smooth" });
        loadList(page);
    }
});

//Number Search
let buttonPageNumber = document.querySelector("#numberButton")
let inputPageNumber = document.querySelector("#searchNumber");

//Search Number with button
buttonPageNumber.addEventListener("click", function () {
    let search = document.querySelector("#searchNumber").value
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });
    page = search
    loadList(search)
})
//Search Number with "Enter"
inputPageNumber.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        let search = document.querySelector("#searchNumber").value
        document.getElementById("header").scrollIntoView({ behavior: "smooth" });
        page = search
        loadList(search);
    }
});


//Funcion Anime List Search
let searchFunction = function (search) {

    //let offset = (page - 1) * 20
    // document.querySelector("#nextButtonList").className = "nextButtonSearch"
    // document.querySelector("#prevButtonList").className = "prevButtonSearch"
    //document.querySelector("#pageNumber").textContent = `Page ${page}`
    let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${search}`;

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
        });
}

// let nextSearch = document.querySelector(".nextButtonSearch")
// let prevSearch = document.querySelector(".prevButtonSearch")
// //next Button
// nextSearch.addEventListener("click", function () {
//     page++;
//     searchFunction(search, page);
// });
// // prev Button
// prevSearch.addEventListener("click", function () {
//     if (page > 1) {
//         page--;
//         searchFunction(search, page);
//     }
// });

let buttonSearch = document.querySelector("#searchButton")
let input = document.querySelector("#searchHolder");

//Search with button
buttonSearch.addEventListener("click", function () {
    let search = document.querySelector("#searchHolder").value
    if (document.querySelector("#pages"))
        document.querySelector("#pages").remove();
    // page = 1
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });

    searchFunction(search)
})
//Search with "Enter"
input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        let search = document.querySelector("#searchHolder").value
        if (document.querySelector("#pages"))
            document.querySelector("#pages").remove();
        // page = 1
        document.getElementById("header").scrollIntoView({ behavior: "smooth" });
        searchFunction(search);
    }
});