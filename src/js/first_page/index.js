import '../../css/style.css';
import * as v from "./global-variables";
import {addCities} from './functions';
import {filterList} from './searchbox';

v.btnGame.style.display = 'block';
v.searchBox.style.display = 'block';

addCities();

filterList;

v.selected.addEventListener("click",()=>{
    v.optionsContainer.classList.toggle("active");
    v.searchBox.value = "";
    filterList("");
    if (v.optionsContainer.classList.contains("active")) {
        v.searchBox.focus();
    }
})

v.searchBox.addEventListener("keyup",(e)=>{
    filterList(e.target.value);
})