import * as v from './global-variables';

const btnColor = function (value) {
    let color = "#2f3640";
    switch (true) {
        case value < 10:
            color = "#19ad51";
            v.btnGame.innerHTML = "Easy";
            v.btnGame.style.color = "#f5f6fa";
            break;
        case value < 15:
            color = "#f3d630";
            v.btnGame.innerHTML = "Medium";
            v.btnGame.style.color = "#2f3640";
            break;
        case value < 20:
            color = "#f29b30";
            v.btnGame.innerHTML = "Hard";
            v.btnGame.style.color = "#f5f6fa";
            break;
        case value < 30:
            color = "red";
            v.btnGame.innerHTML = "Insane";
            v.btnGame.style.color = "#f5f6fa";
            break;
    
        default:
            color = "#2f3640";
            break;
    }
    return color;
}

function gameView(i, value) {
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
    v.totValue.style.color = "#adff2f";
    v.btnGame.style.color = "#2f3640";
    v.btnGame.style.background = btnColor(value);
    document.body.style.background = "#2f3640";
}

function cityView(i, categories, value) {
    v.desc[i].innerHTML = categories[i].name;
    v.desc[i].style.top = '0';
    v.desc[i].style.top = '0';
    v.desc[i].style.left = '0';
    v.desc[i].style.transform = "rotate(0deg)";
    v.desc[i].style.color = "#000";
    v.circle[i].style.stroke = categories[i].color;
    v.number[i].style.color = "#555";
    document.body.style.background = "#f7f6ff";
    v.totValue.style.color = "#2f3640";
    v.btnGame.innerHTML = "Play";
    v.btnGame.style.color = "#f5f6fa";
}

export {cityView,gameView};