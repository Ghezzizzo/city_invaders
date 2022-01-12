import * as v from "./global-variables";

let city;
let optionsList;

async function myFetch(input){
    let response = await fetch(input);
    let myJson = await response.json();
    city = myJson;  
}

function createList(nameCity) {
    let container = document.createElement('div');
    let labelName = document.createElement('label');
    container.classList.add('option');
    labelName.setAttribute('for',nameCity);
    labelName.innerHTML = nameCity;
    v.optionsContainer.appendChild(container);
    container.appendChild(labelName);
}

async function addCities() {
    await myFetch(v.url);
    let nameCities = city._links["ua:item"];
    for (let i = 0; i < nameCities.length; i++) {
        createList(nameCities[i].name);
    }
    optionsList = document.querySelectorAll(".option");
    optionsList.forEach( (o) => {
        o.addEventListener("click", async () => {
            
            v.selected.innerHTML = o.querySelector("label").innerHTML;
            let theCity = v.selected.innerHTML.toLowerCase();
            if (theCity === "washington, d.c.") {
                theCity = 'washington-dc'
            }
            theCity = theCity.replace(/ /g, "-").replace(",", "").replace(".", "");
            v.optionsContainer.classList.remove("active");
            
            await myFetch('https://api.teleport.org/api/urban_areas/slug:'+theCity+'/scores/');

            let categories = city.categories;
            v.cityPar.innerHTML = city.summary;
            for (let i = 0; i < categories.length; i++) {
                v.number[i].innerHTML = "";
                v.circle[i].style.strokeDashoffset = 260;
                let value = Math.floor(categories[i].score_out_of_10);
                v.circle[i].style.stroke = categories[i].color;
                v.desc[i].innerHTML = categories[i].name;
                let circleValue = Math.floor(value*260/10);
                let counter = 0;
               
                const interval = setInterval(()=>{if (counter == circleValue){
                    v.number[i].innerHTML = value;
                    clearInterval(interval);
                    v.btnGame.style.opacity = '1';
                    v.btnGame.style.pointerEvents = 'auto';
                }else{
                    counter += 1;
                    v.circle[i].style.strokeDashoffset = 260 - counter;
                    v.number[i].innerHTML = Math.floor(Math.random()*10);
                }},10)
                  
            }
            
        });
    });
}

export {addCities,optionsList};