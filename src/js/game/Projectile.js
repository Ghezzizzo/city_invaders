import * as gv from "./global_variables";
import bulletImg from '../../img/bullet.png';
import { collisionArea,frame } from "./functions";

const bullet = new Image();
bullet.src = bulletImg;

export class Projectile{
    constructor(x, y,type) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = gv.projectilePower[type];
        this.speed = 5;
        this.explode = false;
        this.delete = false;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spriteWidth = 66;
        this.spriteHeight = 66; 
    }
    update(){
        if (!this.explode) {
            this.x += this.speed;
            this.minFrame = 0;
            this.maxFrame = 3; 
        } else {
            this.minFrame = 4;
            this.maxFrame = 7;
        }

        if (frame % 4 === 0) {
            if (this.frameX < this.maxFrame) {
                if (this.frameX === 6) {
                    this.delete = true;
                }
                this.frameX++
            } else {
                this.frameX = this.minFrame
            };
        }
    }
    draw(){
        // gv.ctx.fillStyle = 'blue';
        // gv.ctx.beginPath();
        // gv.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        // gv.ctx.fill();
        gv.ctx.drawImage(bullet, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, this.x - 20, this.y - 20, this.width * 4, this.height*4);
    }
}