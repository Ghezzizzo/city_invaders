import * as gv from "./global_variables";
import { valuesList } from "./functions";

export class Projectile{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 5 + valuesList[7];
        this.speed = 5;
    }
    update(){
        this.x += this.speed;
    }
    draw(){
        gv.ctx.fillStyle = 'blue';
        gv.ctx.beginPath();
        gv.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        gv.ctx.fill();
    }
}