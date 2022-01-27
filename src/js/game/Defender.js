import * as gv from "./global_variables";
import { Projectile } from "./Projectile";
import {collisionArea,frame,chosenDefender } from "./functions";
import {cards} from './cards';

export class Defender {
    constructor(x,y) {
        // position
        this.x = x;
        this.y = y;
        this.width = gv.cellSize - gv.cellGap * 2;
        this.height = gv.cellSize - gv.cellGap* 2;
        this.levitate = false;

        // stats
        this.health = gv.health1;

        // animation
        this.chosenDefender = chosenDefender;
        this.minFrame = cards[this.chosenDefender].anim.idle.start;
        this.maxFrame = cards[this.chosenDefender].anim.idle.end;
        this.frameX = this.minFrame;
        this.frameY = 0;
        
        this.spriteWidth = cards[this.chosenDefender].draw.cut.width;
        this.spriteHeight = cards[this.chosenDefender].draw.cut.height;
    
    }
    draw(){
        ///////////////////////////
        // collision area
        // collisionArea('blue',this.x, this.y, this.width, this.height);
        //////////////////////////
        gv.ctx.fillStyle = '#2f3640';
        gv.ctx.font = '25px Stick No Bills';
        gv.ctx.fillText(Math.floor(this.health), this.x +32, this.y+10);

        if (!this.levitate) {
            gv.ctx.beginPath();
            gv.ctx.fillStyle = 'rgba(0, 0, 0,0.5)';
            gv.ctx.ellipse(this.x + 48, this.y + 80, 25, 5, Math.PI, 0, 2 * Math.PI);
            gv.ctx.fill();
        }
        

        gv.ctx.drawImage(gv.defenderList[this.chosenDefender], this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }    
    idle(){
        this.minFrame = cards[this.chosenDefender].anim.idle.start;
        this.maxFrame = cards[this.chosenDefender].anim.idle.end;
        if (cards[this.chosenDefender].levitate.idle) {
            this.levitate = false;
        } else {
            this.levitate = true;
        }
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
        this.speedFire = gv.speedFire1;
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
            if (cards[this.chosenDefender].levitate.shoot) {
                this.levitate = false;
            } else {
                this.levitate = true;
            }
        }
        
    }

}