import '../../css/game-style.css';
import {createGrid,animate,createValues} from './functions';
import * as gv from "./global_variables";

// create grid for the game
createGrid();

// create mouse interaction
gv.canvas.addEventListener('mousemove', function (e) {
    let propX = gv.canvas.width * (e.x - gv.canvasPosition.left) /gv.canvasPosition.width;
    let propY =gv.canvas.height * (e.y - gv.canvasPosition.top) /gv.canvasPosition.height;
    gv.mouse.x = propX;
    gv.mouse.y = propY; 
})

class InputHandler {
    constructor() {
        this.keys = [];

        gv.canvas.addEventListener('mousedown', e => {
            if (this.keys.indexOf(e.type) === -1) {
                this.keys.push(e.type); 
            }
        } );

        gv.canvas.addEventListener('touchstart', e => {
            this.keys.push('mousedown');
        } );

        gv.canvas.addEventListener('touchend', e => {
            this.keys = [];
        } );

        gv.canvas.addEventListener('mouseup', e => {
            this.keys = [];
        } );
        

    }
}

const input = new InputHandler();

gv.canvas.addEventListener('mouseleave', function () {
    gv.mouse.x = undefined;
    gv.mouse.y = undefined;
})

// gv.canvas.addEventListener('mousedown', function () {
//     gv.mouse.clicked = true;
// })
// gv.canvas.addEventListener('mouseup', function () {
//     gv.mouse.clicked = false;
// })
// function for run the game
animate();

export {input}