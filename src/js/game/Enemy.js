import * as gv from "./global_variables";
import enemyOne from '../../img/enemy1.png';
import enemyTwo from '../../img/enemy2.png';
import { collisionArea,frame } from "./functions";

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
        
        this.chosenEnemy = Math.floor(Math.random() * enemyTypes.length);
        this.enemyType = enemyTypes[this.chosenEnemy];
        this.speed = gv.enemySpeed[this.chosenEnemy];
        this.movement = this.speed;
        this.health = gv.enemyHealth[this.chosenEnemy];
        this.maxHealth = this.health;
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
        this.frameSpeed = [8,7]
    }
    update(){
        this.x -= this.movement;
        if (frame % this.frameSpeed[this.chosenEnemy] === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
    draw(){
        //collisionArea('red',this.x, this.y, this.width, this.height)
        gv.ctx.fillStyle = '#f5f6fa';
        gv.ctx.font = '20px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +35, this.y+30);
        // ombra
        gv.ctx.beginPath();
        gv.ctx.fillStyle = 'rgba(0, 0, 0,0.5)';
        gv.ctx.ellipse(this.x + 45, this.y + 85, 25, 5, Math.PI, 0, 2 * Math.PI);
        gv.ctx.fill();

        // gv.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        gv.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}