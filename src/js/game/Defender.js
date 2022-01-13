import * as gv from "./global_variables";
import { Projectile } from "./Projectile";
import { valuesList } from "./functions";

export class Defender {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize - gv.cellGap* 2;
        this.shooting = false;
        this.health = 50 + valuesList[8] * 4;
        this.projectiles = [];
        this.timer = 0;
        this.speedFire = 20 + Math.floor(valuesList[2]*0.6);
    }
    draw(){
        gv.ctx.fillStyle = 'blue';
        gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        gv.ctx.fillStyle = 'gold';
        gv.ctx.font = '30px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +22, this.y+35);
    }
    update(){
        if (this.shooting) {
            this.timer++;
            if(this.timer % this.speedFire === 0){
                gv.projectiles.push(new Projectile(this.x + gv.cellSize, this.y + gv.cellSize/2))
            }
        }

    }
}