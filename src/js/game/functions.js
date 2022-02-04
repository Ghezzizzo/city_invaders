import * as gv from "./global_variables";
import { Cell } from "./Cell";
import {Enemy} from "./Enemy";
import { Defender, Shooter } from "./Defender";
import {Resourse} from './Resource';
import {floatingMasseage } from "./FloatingMessage";
import {cards} from './cards';
import terrain from "../../img/background.jpg";
import {input} from './game';

let frame = 0;
let enemiesInterval = 1000;
let score = 0;
let result = 1;
let gameOver = false;
let chosenDefender = -1;
let numberOfResources = gv.startResources;
let selected = false;

const ground = new Image();
ground.src = terrain;

function createValues(params) {
    let newArray = JSON.parse("[" + params + "]");
    return newArray;
}

gv.canvas.addEventListener('click', function () {
    const gridPositionX = gv.mouse.x - (gv.mouse.x % gv.cellSize) + gv.cellGap;
    const gridPositionY = gv.mouse.y - (gv.mouse.y % gv.cellSize) + gv.cellGap;
    if (gridPositionY < gv.cellSize) return;
    for (let i = 0; i < gv.defenders.length; i++) {
        if (gv.defenders[i].x === gridPositionX && 
            gv.defenders[i].y === gridPositionY) return;
    }

    for (let i = 0; i < gv.resources.length; i++) {
        if (gv.resources[i] && gv.mouse.x && gv.mouse.y && collision(gv.resources[i], gv.mouse)) return;  
    }
    
    if (selected) {
        if (numberOfResources >= cards[chosenDefender].cost){
            if (cards[chosenDefender].canShoot) {
                gv.defenders.push(new Shooter(gridPositionX,gridPositionY));
            } else {
                gv.defenders.push(new Defender(gridPositionX,gridPositionY));
            }
            numberOfResources -= cards[chosenDefender].cost;
        } else {
            gv.floatingMessages.push(new floatingMasseage('need more resources', gv.mouse.x,gv.mouse.y, 20, '#f5f6fa'));
        }
        selected = false;
    } else {
        gv.floatingMessages.push(new floatingMasseage('select your defender', gv.mouse.x,gv.mouse.y, 20, '#f5f6fa'));
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
                
                if( frame % gv.enemyDamageSpeed === 0) {
                    gv.defenders[i].health -= gv.enemyDamage[gv.enemies[j].chosenEnemy];
                    gv.floatingMessages.push(new floatingMasseage('-' + gv.enemyDamage[gv.enemies[j].chosenEnemy], gv.defenders[i].x + 40 + Math.floor(Math.random()*20 - 10),gv.defenders[i].y -5,15,'#f5f6fa')) 
                }
                
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
            gv.floatingMessages.push(new floatingMasseage('+'+gainedResources,gv.enemies[i].x,gv.enemies[i].y,20,'#f5f6fa'))
            gv.floatingMessages.push(new floatingMasseage('+'+gainedResources,375,45,15,'#f5f6fa'))
            numberOfResources += gainedResources;
            const findPos = gv.enemyPositions.indexOf(gv.enemies[i].y);
            gv.enemyPositions.splice(findPos, 1);
            gv.enemies.splice(i, 1);
            i--;
        }
    }
    if (frame % enemiesInterval === 0 && score < gv.winningScore) {
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
                if (!gv.projectiles[i].explode) {
                    gv.enemies[j].health -= gv.projectiles[i].power;
                    gv.floatingMessages.push(new floatingMasseage('-' + gv.projectiles[i].power,gv.enemies[j].x + 40,gv.enemies[j].y + 10,15,'#f5f6fa')) 
                }
                gv.projectiles[i].explode = true;
            } 
             
        }
        if (gv.projectiles[i].delete) {
            gv.projectiles.splice(i, 1);
            i--;   
        } 

        if (gv.projectiles[i] && gv.projectiles[i].x > gv.canvas.width - gv.cellSize) {
            gv.projectiles.splice(i, 1);
            i--;
        }
    }
}

function handleResource() {
    if (frame % gv.speedSpawnResources === 0 && score < gv.winningScore) {
        gv.resources.push(new Resourse());
    }
    for (let i = 0; i < gv.resources.length; i++) {
        gv.resources[i].draw();
        gv.resources[i].update();
        if (gv.resources[i] && gv.mouse.x && gv.mouse.y && collision(gv.resources[i], gv.mouse)) {
            numberOfResources += gv.resources[i].amount;
            gv.floatingMessages.push(new floatingMasseage('+'+gv.resources[i].amount +' resources',gv.resources[i].x,gv.resources[i].y,20,'#f5f6fa'))
            gv.floatingMessages.push(new floatingMasseage('+'+gv.resources[i].amount,375,45,15,'#f5f6fa'))
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
        gv.ctx.fillStyle = '#f5f6fa';
        gv.ctx.font = '20px Stick No Bills';
        gv.ctx.fillText('Resources: ' + numberOfResources, 280, 65);
        gv.ctx.fillStyle = '#f5f6fa';
        gv.ctx.font = '20px Stick No Bills';
        gv.ctx.fillText('Score: ' + score, 280, 45);
        if (score >= gv.winningScore) {
            gv.ctx.fillText('No more enemies', 480, 45);
        }  
    } 
    if (score >= gv.winningScore && gv.enemies.length === 0) {
        result = 1;
        gameOver = true;
    }
}

function animate() {
    if (!gameOver) {
        gv.ctx.clearRect(0,0,gv.canvas.width,gv.canvas.height);

        if (gv.mouse.y <= gv.cellSize && gv.mouse.x >= 280 && gv.mouse.clicked) {
            selected = false;
        }

        

        gv.ctx.drawImage(ground, 0,400,1920,200, 0, 0, gv.canvas.width,gv.cellSize);
        gv.ctx.drawImage(ground, 0, 680,gv.canvas.width,540, 0, gv.cellSize, gv.canvas.width,gv.cellSize*3);
        gv.ctx.drawImage(ground, 0, 720,gv.canvas.width,540, 0, gv.cellSize * 3 + 20, gv.canvas.width,gv.cellSize*3);
        gv.ctx.drawImage(ground, 0, 710,gv.canvas.width,180, 0, gv.cellSize*5 +20, gv.canvas.width,gv.cellSize);
        // gv.ctx.drawImage(ground, 0, 720,gv.canvas.width,180, 0, gv.cellSize*4, gv.canvas.width,gv.cellSize);
        // gv.ctx.drawImage(ground, 0, 720,gv.canvas.width,180, 0, gv.cellSize*5, gv.canvas.width,gv.cellSize);
        gv.ctx.fillStyle = 'rgba(47, 54, 64,0.5)';
        gv.ctx.fillRect(0,0,gv.controlBar.width, gv.controlBar.height);
        handleGameGrid();  
        handleDefender();
        handleEnemy();
        chooseDefender();
        handleResource();
        handleProjectile();
        handleFloatingMessage();

        if (input.keys[0] === "mousedown") {
            gv.mouse.clicked = true;
        } else {
            gv.mouse.clicked = false;
        }
        frame++;
        
        requestAnimationFrame(animate);
    } else {
        gv.ctx.clearRect(0,0,gv.canvas.width,gv.canvas.height);  
        gv.ctx.fillStyle = '#2f3640';
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
        cardStroke.push('#2f3640');
        if (collision(gv.mouse, cards[i]) && gv.mouse.clicked) {
            chosenDefender = i;
            selected = true;
        }

        if (chosenDefender === i && selected) {
            cardStroke[i] = '#f5f6fa';
        }
    }

    for (let i = 0; i < cards.length; i++) {

    }
    
    for (let i = 0; i < cards.length; i++) {
        gv.ctx.lineWidth = 1;
        gv.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        createCards(cards[i],cardStroke[i],gv.defenderList[i]);
    }
    
}

function createCards(card,cardStroke,img) {
    gv.ctx.fillRect(card.x, card.y, card.width, card.height);
    gv.ctx.strokeStyle = cardStroke;
    gv.ctx.strokeRect(card.x, card.y, card.width, card.height);
    gv.ctx.drawImage(img, card.draw.cut.x, card.draw.cut.y,
        card.draw.cut.width, card.draw.cut.height, card.draw.pos.x,
        card.draw.pos.y, card.draw.pos.width, card.draw.pos.height);
    
    gv.ctx.fillStyle = '#f5f6fa';
    gv.ctx.font = '16px Stick No Bills';
    
    gv.ctx.fillText(card.cost, card.x + 45, card.y + 14);
}

function collisionArea(color,x,y,width,height) {
    gv.ctx.fillStyle = color;
    gv.ctx.fillRect(x, y, width, height);
}

export {collisionArea,createGrid,handleGameGrid,animate,collision,createValues,frame,chosenDefender,selected};