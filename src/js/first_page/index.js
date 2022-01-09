import '../../css/style.css';

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const number = document.querySelectorAll(".number");
const desc = document.querySelectorAll(".desc");
const circle = document.querySelectorAll("circle");
const btnGame = document.querySelector(".game-link");

// variables for API
let optionsList;
let url = 'https://api.teleport.org/api/urban_areas/';
let city;

btnGame.style.display = 'block';
searchBox.style.display = 'block';

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
        o.addEventListener("click", async () => {
            
            selected.innerHTML = o.querySelector("label").innerHTML;
            let theCity = selected.innerHTML.toLowerCase();
            if (theCity === "washington, d.c.") {
                theCity = 'washington-dc'
            }
            theCity = theCity.replace(/ /g, "-").replace(",", "").replace(".", "");
            optionsContainer.classList.remove("active");
            
            await myFetch('https://api.teleport.org/api/urban_areas/slug:'+theCity+'/scores/');
            
            let categories = city.categories;
            
            for (let i = 0; i < categories.length; i++) {
                number[i].innerHTML = "";
                circle[i].style.strokeDashoffset = 260;
                let value = Math.floor(categories[i].score_out_of_10);
                circle[i].style.stroke = categories[i].color;
                desc[i].innerHTML = categories[i].name;
                let circleValue = Math.floor(value*260/10);
                let counter = 0;
               
                const interval = setInterval(()=>{if (counter == circleValue){
                    number[i].innerHTML = value;
                    clearInterval(interval);
                    btnGame.style.opacity = '1';
                    btnGame.style.pointerEvents = 'auto';
                }else{
                    counter += 1;
                    circle[i].style.strokeDashoffset = 260 - counter;
                    number[i].innerHTML = Math.floor(Math.random()*10);
                }},10)
                  
            }
            
        });
    });
}

addCities();

searchBox.addEventListener("keyup",(e)=>{
    filterList(e.target.value);
})

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach( (option) => {
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
    
}


