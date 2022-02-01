import * as v from "./global-variables";

let city;
let optionsList;
let valuesList = [];

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
            v.btnGame.style.background = "#2f3640";
            v.selected.innerHTML = o.querySelector("label").innerHTML;
            let theCity = v.selected.innerHTML.toLowerCase();
            if (theCity === "washington, d.c.") {
                theCity = 'washington-dc'
            }
            theCity = theCity.replace(/ /g, "-").replace(",", "").replace(".", "");
            v.optionsContainer.classList.remove("active");
            
            await myFetch('https://api.teleport.org/api/urban_areas/slug:'+theCity+'/scores/');

            let categories = city.categories;
            v.totDesc.innerHTML = "Total value";
            v.cityPar.innerHTML = city.summary;
            // categories.push(Math.floor(city.teleport_city_score));
            v.totValue.innerHTML = Math.floor(city.teleport_city_score);

            for (let i = 0; i < categories.length; i++) {
                v.number[i].innerHTML = "";
                v.circle[i].style.strokeDashoffset = 260;
                let value = Math.floor(categories[i].score_out_of_10);
                valuesList.push(value);
                v.circle[i].style.stroke = categories[i].color;
                v.desc[i].innerHTML = categories[i].name;
                let circleValue = Math.floor(value*260/10);
                let counter = 0;
                
                const interval = setInterval(()=>{if (counter == circleValue){
                    v.number[i].innerHTML = value;
                    clearInterval(interval);
                    v.btnGame.style.opacity = '1';
                    v.btnGame.style.pointerEvents = 'auto';
                    v.btnGame.addEventListener('mouseover',()=>{ 
                        v.desc[i].innerHTML = v.glitch[i];
                        let num = Math.floor(Math.random()*20);
                        let num2 = Math.floor(Math.random()*20);
                        let sum = num - num2;
                        v.desc[i].style.top = sum + 'px';
                        v.desc[i].style.left = sum + 'px';
                        v.desc[i].style.transform = "rotate("+sum+"deg)";
                        v.desc[i].style.color = "#adff2f";
                        v.circle[i].style.stroke = "#adff2f";
                        v.number[i].style.color = "#adff2f";
                        document.body.style.background = "#2f3640";
                    })
                    v.btnGame.addEventListener('mouseout',()=>{ 
                        v.desc[i].innerHTML = categories[i].name;
                        v.desc[i].style.top = '0';
                        v.desc[i].style.top = '0';
                        v.desc[i].style.left = '0';
                        v.desc[i].style.transform = "rotate(0deg)";
                        v.desc[i].style.color = "#000";
                        v.circle[i].style.stroke = categories[i].color;
                        v.number[i].style.color = "#555";
                        document.body.style.background = "#f7f6ff";
                    })
                }else{
                    counter += 1;
                    v.circle[i].style.strokeDashoffset = 260 - counter;
                    v.number[i].innerHTML = Math.floor(Math.random()*10);
                }},10)    
            }

            let sumDifficultLevel = valuesList[4] + valuesList[9] + valuesList[12];
            v.btnGame.style.background = btnColor(sumDifficultLevel);
            console.log(btnColor(sumDifficultLevel));
            console.log(sumDifficultLevel);
           
            valuesList.push(Math.floor(city.teleport_city_score));
            document.cookie = valuesList;
            valuesList = [];
        });
    });
}

const btnColor = function (value) {
    let color = "#2f3640";
    switch (true) {
        case value < 10:
            color = "green";
            v.btnGame.innerHTML = "Easy";
            break;
        case value < 15:
            color = "yellow";
            v.btnGame.innerHTML = "Medium";
            break;
        case value < 20:
            color = "orange";
            v.btnGame.innerHTML = "Hard";
            break;
        case value < 30:
            color = "red";
            v.btnGame.innerHTML = "Insane";
            break;
    
        default:
            color = "#2f3640";
            console.log('entrato');
            break;
    }
    return color;
}

export {addCities,optionsList};