import '../../css/game-style.css';
import {createGrid,animate,createValues} from './functions';
import * as gv from "./global_variables";
window.addEventListener('resize', function() {
    canvasPosition = gv.canvas.getBoundingClientRect();
})



// create grid for the game
createGrid();


// create mouse interaction
gv.canvas.addEventListener('mousemove', function (e) {
    gv.mouse.x = e.x - gv.canvasPosition.left;
    gv.mouse.y = e.y - gv.canvasPosition.top;
})

gv.canvas.addEventListener('mouseleave', function () {
    gv.mouse.x = undefined;
    gv.mouse.y = undefined;
})

gv.canvas.addEventListener('mousedown', function () {
    gv.mouse.clicked = true;
})
gv.canvas.addEventListener('mouseup', function () {
    gv.mouse.clicked = false;
})
// function for run the game
animate();
