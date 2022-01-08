import '../css/style.css';

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

// variables for API
let optionsList;
let url = 'https://api.teleport.org/api/urban_areas/';
let city;

selected.addEventListener("click",()=>{
    optionsContainer.classList.toggle("active");
    searchBox.value = "";
    filterList("");
    if (optionsContainer.classList.contains("active")) {
        searchBox.focus();
    }
})

async function addCities() {
    await myFetch(url);
    let nameCities = city._links["ua:item"];
    for (let i = 0; i < nameCities.length; i++) {
        createList(nameCities[i].name);
    }
    optionsList = document.querySelectorAll(".option");
    optionsList.forEach( (o) => {
        o.addEventListener("click",()=>{
            let n = 0;
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            myFetch('https://api.teleport.org/api/urban_areas/slug:'+selected.innerHTML.toLowerCase()+'/scores/');
            console.log(city);
            n++;
        });
    });
}

addCities();

searchBox.addEventListener("keyup",(e)=>{
    filterList(e.target.value);
})

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach( option =>{
        let label = option.firstElementChild.innerText.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    })
}

function createList(nameCity) {
    let container = document.createElement('div');
    let labelName = document.createElement('label');
    container.classList.add('option');
    labelName.setAttribute('for',nameCity);
    labelName.innerHTML = nameCity;
    optionsContainer.appendChild(container);
    container.appendChild(labelName);
}

async function myFetch(input){
    let response = await fetch(input);
    let myJson = await response.json();
    city = myJson;
    console.log(city);
}