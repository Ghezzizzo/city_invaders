import * as gv from "./global_variables";

export class floatingMessage {
    constructor(value, x, y, size,color){
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }
    update() {
        this.y -= 0.3;
        this.lifeSpan += 1;
        if (this.opacity < 0.01) this.opacity -= 0.01;
    }
    draw(){
        gv.ctx.globalAlpha = this.opacity;
        gv.ctx.fillStyle = this.color;
        gv.ctx.font = this.size + 'px Stick No Bills';
        gv.ctx.fillText(this.value,this.x,this.y);
        gv.ctx.globalAlpha = 1;
    }
}

