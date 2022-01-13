import '../../css/game-style.css';
import {createGrid,animate,createValues} from './functions';
import * as gv from "./global_variables";

createValues();

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

// function for run the game
animate();
