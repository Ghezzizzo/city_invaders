import * as gv from "./global_variables";
import { Cell } from "./Cell";
import {Enemy} from "./Enemy";
import { Defender, Shooter } from "./Defender";
import {Resourse} from './Resource';
import { floatingMasseage } from "./FloatingMessage";
import {cards} from './cards';

let cookieText = document.cookie;
let valuesList = [];
let frame = 0;
let enemiesInterval = 1000;
let numberOfResources;
let speedSpawn;
let winningScore;
let defenderCost;
let score = 0;
let result = 1;
let gameOver = false;
let chosenDefender = 0;

function createValues() {
    valuesList = JSON.parse("[" + cookieText + "]");

    numberOfResources = 300 + valuesList[3] * 10;
    speedSpawn = 200 - valuesList[6]*10;
    defenderCost = Math.floor(80 + 1/(valuesList[1]*10+1)) ;
    winningScore = Math.floor(1000 - 1/valuesList[0]*100) ;
}

gv.canvas.addEventListener('click', function () {
    const gridPositionX = gv.mouse.x - (gv.mouse.x % gv.cellSize) + gv.cellGap;
    const gridPositionY = gv.mouse.y - (gv.mouse.y % gv.cellSize) + gv.cellGap;
    if (gridPositionY < gv.cellSize) return;
    for (let i = 0; i < gv.defenders.length; i++) {
        if (gv.defenders[i].x === gridPositionX && 
            gv.defenders[i].y === gridPositionY) return;
    }
    if (numberOfResources >= defenderCost){
        if (cards[chosenDefender].canShoot) {
            gv.defenders.push(new Shooter(gridPositionX,gridPositionY));
        } else {
            gv.defenders.push(new Defender(gridPositionX,gridPositionY));
        }
        numberOfResources -= defenderCost;
    } else {
        gv.floatingMessages.push(new floatingMasseage('need more resources', gv.mouse.x,gv.mouse.y, 20, 'blue'));
    }

})

function createGrid() {
    for (let y = gv.cellSize; y < gv.canvas.height; y += gv.cellSize) {
        for (let x = 0; x < gv.canvas.width; x += gv.cellSize) {  
            gv.gameGrid.push(new Cell(x,y))
        }  
    }
}

function handleGameGrid(){
    for (let i = 0; i < gv.gameGrid.length; i++) {
        gv.gameGrid[i].draw();
    }
}

function handleDefender() {
    for (let i = 0; i < gv.defenders.length; i++) {
        gv.defenders[i].draw();
        gv.defenders[i].update();
        if (cards[gv.defenders[i].chosenDefender].canShoot) {
            if (gv.enemyPositions.indexOf(gv.defenders[i].y) !== -1) {
                gv.defenders[i].shoot();
            } else {
                gv.defenders[i].idle();
            }  
        }
        
        for (let j = 0; j < gv.enemies.length; j++) {
            if (gv.defenders[i] && collision(gv.defenders[i], gv.enemies[j])) {
                gv.enemies[j].movement = 0;
                gv.defenders[i].health -= 0.2 + 1/valuesList[14];
            }
            if(gv.defenders[i] && gv.defenders[i].health <= 0){
                gv.defenders.splice(i, 1);
                i--;
                gv.enemies[j].movement = gv.enemies[j].speed;
            }
        }
    }
}

function handleEnemy() {
    for (let i = 0; i < gv.enemies.length; i++) {
        gv.enemies[i].update();
        gv.enemies[i].draw();
        if (gv.enemies[i].x < 0) {
            result = 0;
            gameOver = true;
        }
        if (gv.enemies[i].health <= 0) {
            score += gv.enemies[i].maxHealth/10;
            let gainedResources = gv.enemies[i].maxHealth/5;
            gv.floatingMessages.push(new floatingMasseage('+'+gainedResources,gv.enemies[i].x,gv.enemies[i].y,20,'red'))
            gv.floatingMessages.push(new floatingMasseage('+'+gainedResources,275,50,15,'gold'))
            numberOfResources += gainedResources;
            const findPos = gv.enemyPositions.indexOf(gv.enemies[i].y);
            gv.enemyPositions.splice(findPos, 1);
            gv.enemies.splice(i, 1);
            i--;
        }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * gv.cellSize + gv.cellGap;
        gv.enemies.push(new Enemy(verticalPosition));
        gv.enemyPositions.push(verticalPosition);
        
        if (enemiesInterval > 200) enemiesInterval -= 100;
        
    }
}

function handleProjectile() {
    for (let i = 0; i < gv.projectiles.length; i++) {
        gv.projectiles[i].update();
        gv.projectiles[i].draw();

        for (let j = 0; j < gv.enemies.length; j++) {
            if (gv.enemies[j] && gv.projectiles[i] && collision(gv.projectiles[i], gv.enemies[j])) {
                gv.enemies[j].health -= gv.projectiles[i].power;
                gv.projectiles.splice(i, 1);
                i--;
            }
            
        }

        if (gv.projectiles[i] && gv.projectiles[i].x > gv.canvas.width - gv.cellSize) {
            gv.projectiles.splice(i, 1);
            i--;
        }
    }
}

function handleResource() {
    if (frame % speedSpawn === 0 && score < winningScore) {
        gv.resources.push(new Resourse());
    }
    for (let i = 0; i < gv.resources.length; i++) {
        gv.resources[i].draw();
        if (gv.resources[i] && gv.mouse.x && gv.mouse.y && collision(gv.resources[i], gv.mouse)) {
            numberOfResources += gv.resources[i].amount;
            gv.floatingMessages.push(new floatingMasseage('+'+gv.resources[i].amount +' resources',gv.resources[i].x,gv.resources[i].y,20,'black'))
            gv.floatingMessages.push(new floatingMasseage('+'+gv.resources[i].amount,275,50,15,'gold'))
            gv.resources.splice(i, 1);
            i--;
        }
        
    }
}

function handleFloatingMessage() {
    for (let i = 0; i < gv.floatingMessages.length; i++) {
        gv.floatingMessages[i].update();
        gv.floatingMessages[i].draw();
        if (gv.floatingMessages[i].lifeSpan >= 50) {
            gv.floatingMessages.splice(i,1);
            i--;
        }
    }
}

function collision(first, second) {
    if (!(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )) {
        return true;
    }
}

function handleGameStatus() {
    if (!gameOver) {
        gv.ctx.fillStyle = 'gold';
        gv.ctx.font = '20px Stick No Bills';
        gv.ctx.fillText('Resources: ' + numberOfResources, 280, 65);
        gv.ctx.fillStyle = 'gold';
        gv.ctx.font = '20px Stick No Bills';
        gv.ctx.fillText('Score: ' + score, 280, 45);
        gv.ctx.fillText('Defender cost: ' + defenderCost, 480, 65);
        if (score >= winningScore) {
            gv.ctx.fillText('No more enemies', 480, 45);
        }  
    } 
    if (score >= winningScore && gv.enemies.length === 0) {
        result = 1;
        gameOver = true;
    }
}

function animate() {
    if (!gameOver) {
        gv.ctx.clearRect(0,0,gv.canvas.width,gv.canvas.height);
        gv.ctx.fillStyle = 'blue';
        gv.ctx.fillRect(0,0,gv.controlBar.width, gv.controlBar.height);
        handleGameGrid();  
        handleDefender();
        handleEnemy();
        chooseDefender();
        handleResource();
        handleProjectile();
        handleFloatingMessage();
        frame++;
        requestAnimationFrame(animate);
    } else {
        gv.ctx.clearRect(0,0,gv.canvas.width,gv.canvas.height);  
        gv.ctx.fillStyle = 'black';
        gv.ctx.font = '120px Stick No Bills';
        gv.ctx.textAlign = "center";
        gv.ctx.fillText(gv.endGame[result], gv.canvas.width/2, gv.canvas.height/2);
        createBtn('Try Again',()=>{location.reload()})
        createBtn('Select City',()=>{window.location.href = "index.html";})
    }
    handleGameStatus();
}

function createBtn(text,action) {
    let btn = document.createElement('button');
    btn.innerText = text;
    btn.addEventListener('click',action);
    gv.btnContainer.appendChild(btn);
}

function chooseDefender() {
    let cardStroke = [];

    for (let i = 0; i < cards.length; i++) {
        cardStroke.push('black');
        if (collision(gv.mouse, cards[i]) && gv.mouse.clicked) {
            chosenDefender = i;
        }
    }

    for (let i = 0; i < cards.length; i++) {
        if (chosenDefender === i) {
            cardStroke[i] = 'gold';
        }
    }

    gv.ctx.lineWidth = 1;
    gv.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    
    for (let i = 0; i < cards.length; i++) {
        createCards(cards[i],cardStroke[i],gv.defenderList[i]);
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


export {createGrid,handleGameGrid,animate,collision,valuesList,createValues,frame,chosenDefender};