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
export const resources = [];
export const endGame = ['GAME OVER','YOU WIN'];

export const controlBar = {width:canvas.width, height: cellSize}
export const mouse = { x: 10, y: 10, width:0.1, height:0.1 }

export let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener('resize', function name(params) {
    canvasPosition = canvas.getBoundingClientRect();
})