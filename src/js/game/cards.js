import { defenderList } from "./Defender";
import * as gv from "./global_variables";
import {collision} from "./functions";

let choosenDefender = 0;

const cards = [
    {
        x: 10,
        y: 10,
        width: 70,
        height: 85,
        drawStats:{
            cut:{
                x:0,
                y:0,
                width: 194,
                height: 194,
            },
            pos:{
                x:0,
                y:5,
                width: 194/2,
                height: 194/2,
            }
        }
    },
    {
        x: 90,
        y: 10,
        width: 70,
        height: 85,
        drawStats:{
            cut:{
                x:0,
                y:0,
                width: 194,
                height: 194,
            },
            pos:{
                x:80,
                y:5,
                width: 194/2,
                height: 194/2,
            }
        }
    },
    {
        x: 170,
        y: 10,
        width: 70,
        height: 85,
        drawStats:{
            cut:{
                x:0,
                y:0,
                width: 128,
                height: 128,
            },
            pos:{
                x:172,
                y:30,
                width: 128/2,
                height: 128/2,
            }
        }
    }
]



function chooseDefender() {
    let cardStroke = [];

    for (let i = 0; i < cards.length; i++) {
        cardStroke.push('black');
        if (collision(gv.mouse, cards[i]) && gv.mouse.clicked) {
            choosenDefender = i;
        }
    }

    for (let i = 0; i < cards.length; i++) {
        if (choosenDefender === i) {
            cardStroke[i] = 'gold';
        }
    }

    gv.ctx.lineWidth = 1;
    gv.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    
    for (let i = 0; i < cards.length; i++) {
        createCards(cards[i],cardStroke[i],defenderList[i]);
    }
}

function createCards(card,cardStroke,img) {
    gv.ctx.fillRect(card.x, card.y, card.width, card.height);
    gv.ctx.strokeStyle = cardStroke;
    gv.ctx.strokeRect(card.x, card.y, card.width, card.height);
    gv.ctx.drawImage(img, card.drawStats.cut.x, card.drawStats.cut.y,
        card.drawStats.cut.width, card.drawStats.cut.height, card.drawStats.pos.x,
        card.drawStats.pos.y, card.drawStats.pos.width, card.drawStats.pos.height);

}

export {choosenDefender,chooseDefender};