import * as gv from "./global_variables";
import resourceCoin from '../../img/coin.png';
import { collisionArea,frame } from "./functions";

const coin = new Image();
coin.src = resourceCoin;

export class Resource {
    constructor() {
        this.x = Math.random() * (gv.canvas.width - gv.cellSize);
        this.y = Math.floor(Math.random() * 5 + 1) * gv.cellSize + 25;
        this.width = gv.cellSize * 0.8;
        this.height = gv.cellSize * 0.8;
        this.amount = gv.amount;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
       
        this.spriteWidth = 130;
        this.spriteHeight = 130;
    }
    draw(){
        // collisionArea('yellow',this.x, this.y, this.width, this.height)
        // gv.ctx.fillStyle = 'black';
        // gv.ctx.font = '700 20px Stick No Bills'
        // gv.ctx.fillText(this.amount,this.x + 20, this.y + 22);
        gv.ctx.drawImage(coin, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, this.x + 16, this.y + 25, this.width/2, this.height/2);
    }
    update(){
        if (frame % 7 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
}