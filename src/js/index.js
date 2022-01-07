import '../img/arrow-down.svg';
import '../css/style.css';

// //  html elements
// const btn_src = document.getElementById('btn_src');
// const demo = document.getElementById('demo');
// const results = document.getElementById('results');
// // search constant
// const allUrbanAreas = [];
// const allUrbAreasURL = 'https://api.teleport.org/api/urban_areas/';
// const researchUrl = 'https://api.teleport.org/api/cities/?search=';
// // search variables

// // function for return Json
// async function myFetch(input){
//     let response = await fetch(input);
//     let myJson = await response.json();
//     city = myJson;
//     console.log(city);
// }

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click",()=>{
    optionsContainer.classList.toggle("active");
})

optionsList.forEach( o => {
    o.addEventListener("click",()=>{
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});