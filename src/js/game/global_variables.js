import defenderOne from '../../img/defender1.png';
import defenderTwo from '../../img/defender2.png';
import defenderThree from '../../img/defender3.png';
import {createValues} from './functions';

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


const cookieText = document.cookie;
export const valuesList = createValues(cookieText);

// SCORE
export const winningScore = 500 + valuesList[0] * 100; //

// RESOURCES
export const amount = 10 + valuesList[11] * 2; //
export const startResources = 300 + valuesList[3] * 10; //
export const speedSpawnResources = 200 - valuesList[6]*10; //

// DEFENDER
export const defenderCost = [valuesList[12] * 2 + 60, 2 * (valuesList[12] * 2 + 60),valuesList[1] * 2 + 40]; // 
export const health = [ 100 + valuesList[8] * 4, 50 + valuesList[8] * 4,100 + valuesList[10] * 90 ]; //
export const projectilePower = [5 + valuesList[2] * 2, 30 + valuesList[7] * 3]; //

//ENEMY
export const enemyDamage = [5 + Math.floor(valuesList[14]/2), 1 + Math.floor(valuesList[5]/2) ]; //
export const enemySpeed = [Math.random() * 0.2 + valuesList[4] * 0.04,Math.random() * 0.2 + valuesList[15] * 0.1];//
export const enemyHealth = [100 + valuesList[9]*100,100 + valuesList[13]*80];
export const enemyDamageSpeed = 20 + Math.floor(valuesList[16]*0.1);

window.addEventListener('resize', function() {
    canvasPosition = canvas.getBoundingClientRect();
})