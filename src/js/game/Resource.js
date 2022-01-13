import * as gv from "./global_variables";
import { valuesList } from "./functions";

export class Resourse {
    constructor() {
        this.x = Math.random() * (gv.canvas.width - gv.cellSize);
        this.y = Math.floor(Math.random() * 5 + 1) * gv.cellSize + 25;
        this.width = gv.cellSize * 0.6;
        this.height = gv.cellSize * 0.6;
        this.amount = Math.floor(5 + valuesList[11]*0.5);
    }
    draw(){
        gv.ctx.fillStyle = 'yellow';
        gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'black';
        gv.ctx.font = '20 Stick No Bills'
        gv.ctx.fillText(this.amount,this.x + 15, this.y + 25);
    }
}