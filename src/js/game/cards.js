import { defender1,defender2 } from "./Defender";
import * as gv from "./global_variables";
import {collision} from "./functions";

let choosenDefender = 1;

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}

const card2 = {
    x: 90,
    y: 10,
    width: 70,
    height: 85
}



function chooseDefender() {
    let card1stroke = 'black';
    let card2stroke = 'black';
if (collision(gv.mouse, card1) && gv.mouse.clicked) {
    choosenDefender = 1;
} else if(collision(gv.mouse, card2) && gv.mouse.clicked){
    choosenDefender = 2;
}
if (choosenDefender === 1) {
    card1stroke = 'gold';
    card2stroke = 'black';
}else if(choosenDefender === 2) {
    card1stroke = 'black';
    card2stroke = 'gold';
} else {
    card1stroke = 'black';
    card2stroke = 'black';
}

    gv.ctx.lineWidth = 1;
    gv.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    gv.ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    gv.ctx.strokeStyle = card1stroke;
    gv.ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    gv.ctx.drawImage(defender1, 0, 0, 194, 194, 0, 5, 194/2, 194/2);
    gv.ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    gv.ctx.drawImage(defender2, 0, 0, 194, 194, 80, 5, 194/2, 194/2);
    gv.ctx.strokeStyle = card2stroke;
    gv.ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
}

export {choosenDefender,chooseDefender};