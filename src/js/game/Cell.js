import * as gv from "./global_variables";
import {collision} from './functions';

export class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = gv.cellSize;
        this.height = gv.cellSize;
    }
    draw(){
        if (gv.mouse.x && gv.mouse.y && collision(this,gv.mouse)){
            gv.ctx.strokeStyle = 'black';
            gv.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

    }
}