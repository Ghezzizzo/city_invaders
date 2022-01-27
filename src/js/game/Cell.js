import * as gv from "./global_variables";
import groundImage from '../../img/grass1.png';
import {collision, collisionArea} from './functions';

const ground = new Image();
ground.src = groundImage;

export class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = gv.cellSize;
        this.height = gv.cellSize;
        this.frameX = 0;
        this.frameY = 0;
       
        this.spriteWidth = 400;
        this.spriteHeight = 400;
    }
    draw(){
        // collisionArea('rgba(0, 161, 255,0.2)',this.x,this.y,this.width,this.height);
        gv.ctx.drawImage(ground, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, this.x, this.y, this.width, this.height);
        if (gv.mouse.x && gv.mouse.y && collision(this,gv.mouse)){
            // gv.ctx.strokeStyle = 'black';
            // gv.ctx.strokeRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'rgba(0, 161, 255,0.2)';
        gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        }


    }
    // draw(){
    //     //collisionArea('red',this.x, this.y, this.width, this.height)
    //     gv.ctx.fillStyle = 'red';
    //     gv.ctx.font = '30px Stick No Bills';
    //     gv.ctx.fillText(Math.floor(this.health), this.x +22, this.y+35);
    //     // gv.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    //     gv.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 
    //         this.frameY * this.spriteHeight, this.spriteWidth, 
    //         this.spriteHeight, this.x, this.y, this.width, this.height);
    // }
}