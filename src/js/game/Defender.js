import * as gv from "./global_variables";
import { Projectile } from "./Projectile";
import { valuesList,frame,chosenDefender } from "./functions";
import {cards} from './cards';

export class Defender {
    constructor(x,y) {
        // position
        this.x = x;
        this.y = y;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize - gv.cellGap* 2;
        // stats
        this.health = 50 + valuesList[8] * 4;

        // animation
        this.chosenDefender = chosenDefender;
        this.minFrame = cards[this.chosenDefender].anim.idle.start;
        this.maxFrame = cards[this.chosenDefender].anim.idle.end;
        this.frameX = this.minFrame;
        this.frameY = 0;
        
        this.spriteWidth = cards[this.chosenDefender].drawStats.cut.width;
        this.spriteHeight = cards[this.chosenDefender].drawStats.cut.height;
    
    }
    draw(){
        ///////////////////////////
        // collision area
        // gv.ctx.fillStyle = 'blue';
        // gv.ctx.fillRect(this.x, this.y, this.width, this.height);
        //////////////////////////
        gv.ctx.fillStyle = 'black';
        gv.ctx.font = '25px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +32, this.y+10);

        gv.ctx.drawImage(gv.defenderList[this.chosenDefender], this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }    
    idle(){
        this.minFrame = cards[this.chosenDefender].anim.idle.start;
        this.maxFrame = cards[this.chosenDefender].anim.idle.end;
    }
    update(){
        if (frame % 5 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }
    }
}

export class Shooter extends Defender {
    constructor(x,y){
        super(x,y);
        this.shootNow = false;
        this.shootFrame = cards[this.chosenDefender].shootFrame;
        this.projectiles = [];
        this.speedFire = 20 + Math.floor(valuesList[2]*0.6);
    }

    update(){
        if (frame % 5 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === this.shootFrame ) this.shootNow = true;
        }
    }

    shoot(){
        this.minFrame = cards[this.chosenDefender].anim.shoot.start;
        this.maxFrame = cards[this.chosenDefender].anim.shoot.end;

        if (this.shootNow) {
            gv.projectiles.push(new Projectile(this.x + 70, this.y + 40));
            this.shootNow = false;
        }
        
    }

}