import * as gv from "./global_variables";
import { valuesList } from "./functions";

export class Enemy {
    constructor(verticalPosition) {
        this.x = gv.canvas.width;
        this.y = verticalPosition;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize- gv.cellGap * 2;
        this.speed = Math.random() * 0.2 + valuesList[4] * 0.1;
        this.movement = this.speed;
        this.health = 100 + valuesList[9]*100;
        this.maxHealth = this.health;
    }
    update(){
        this.x -= this.movement;
    }
    draw(){
        gv.ctx.fillStyle = 'red';
        gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'gold';
        gv.ctx.font = '30px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +22, this.y+35);
    }
}