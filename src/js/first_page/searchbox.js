import {optionsList} from './functions';

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

export {filterList};