import defenderOne from '../../img/defender1.png';
import defenderTwo from '../../img/defender2.png';
import defenderThree from '../../img/defender3.png';


const defender1 = new Image();
defender1.src = defenderOne;
const defender2 = new Image();
defender2.src = defenderTwo;
const defender3 = new Image();
defender3.src = defenderThree;

export const defenderList = [defender1,defender2,defender3];

export const canvas = document.getElementById('canvas1');
export const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

export const btnContainer = document.querySelector('.buttons-container');
export const cellSize = 100;
export const cellGap = 3;
export const gameGrid = [];
export const defenders = [];
export const enemies = [];
export const enemyPositions = [];
export const projectiles = [];
export const floatingMessages = [];
export const resources = [];
export const endGame = ['GAME OVER','YOU WIN'];

export const controlBar = {width:canvas.width, height: cellSize}
export const mouse = { x: 10, y: 10, width:0.1, height:0.1, clicked: false}

export let canvasPosition = canvas.getBoundingClientRect();