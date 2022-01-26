import * as gv from "./global_variables";
import { Projectile } from "./Projectile";
import { valuesList } from "./functions";
import defenderOne from '../../img/defender1.png';
import defenderTwo from '../../img/defender2.png';
import { frame } from "./functions";
import { choosenDefender } from "./cards";

const defender1 = new Image();
defender1.src = defenderOne;
const defender2 = new Image();
defender2.src = defenderTwo;

export class Defender {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize - gv.cellGap* 2;
        this.shooting = false;
        this.shootNow = false;
        this.health = 50 + valuesList[8] * 4;
        this.projectiles = [];
        this.timer = 0;
        this.speedFire = 20 + Math.floor(valuesList[2]*0.6);
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;
        this.spriteWidth = 194;
        this.spriteHeight = 194;
        this.choosenDefender = choosenDefender;
    }
    draw(){
        // gv.ctx.fillStyle = 'blue';
        // gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'black';
        gv.ctx.font = '25px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +32, this.y+10);
        // gv.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        if (this.choosenDefender === 1) {
            gv.ctx.drawImage(defender1, this.frameX * this.spriteWidth, 
                this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height);
        } else if (this.choosenDefender === 2) {
            gv.ctx.drawImage(defender2, this.frameX * this.spriteWidth, 
                this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height);
        }
  

    }
    update(){
        if (frame % 5 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === 15) this.shootNow = true;
        }
        if (this.choosenDefender === 1) {
            if (this.shooting) {
                this.minFrame = 0;
                this.maxFrame = 17;
            } else {
                this.minFrame = 17;
                this.maxFrame = 24;
            }  
        } else if(this.choosenDefender === 2){
            if (this.shooting) {
                this.minFrame =13;
                this.maxFrame = 28;
            } else {
                this.minFrame = 0;
                this.maxFrame = 12;
            }  
        }
        
        if (this.shooting && this.shootNow) {
            gv.projectiles.push(new Projectile(this.x + 70, this.y + 40))
            this.shootNow = false;
        }

    }
}

export {defender1, defender2};