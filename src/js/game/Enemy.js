import * as gv from "./global_variables";
import { valuesList } from "./functions";
import enemyOne from '../../img/enemy1.png';
import enemyTwo from '../../img/enemy2.png';
import { frame } from "./functions";
const enemyTypes = [];
const enemy1 = new Image();
const enemy2 = new Image();
enemy1.src = enemyOne;
enemy2.src = enemyTwo;
enemyTypes.push(enemy1);
enemyTypes.push(enemy2);

export class Enemy {
    constructor(verticalPosition) {
        this.x = gv.canvas.width;
        this.y = verticalPosition;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize- gv.cellGap * 2;
        this.speed =  Math.random() * 0.2 + valuesList[4] * 0.1;
        this.movement = this.speed;
        this.health = 100 + valuesList[9]*100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[Math.floor(Math.random()* enemyTypes.length)];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        if (this.enemyType === enemy1) {
            this.maxFrame = 4; 
        } else if (this.enemyType === enemy2){
            this.maxFrame = 7;
        }
       
        this.spriteWidth = 256;
        this.spriteHeight = 256;
    }
    update(){
        this.x -= this.movement;
        if (frame % 5 * this.movement === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
        // console.log(this.movement);
    }
    draw(){
        // gv.ctx.fillStyle = 'red';
        // gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'gold';
        gv.ctx.font = '30px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +22, this.y+35);
        // gv.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        gv.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}