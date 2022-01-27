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

export const startResources = 300 + valuesList[3] * 10;
export const speedSpawn = 200 - valuesList[6]*10;
export const defenderCost = Math.floor(80 + 1/(valuesList[1]*10+1));
export const winningScore = Math.floor(1000 * 1/(valuesList[0]*10+10));
export const enemyDamage = 0.2 + 1/valuesList[14];
export const speedFire1 = 20 + Math.floor(valuesList[2]*0.6);
export const health1 = 50 + valuesList[8] * 4;
export const speeedEnemy1 = Math.random() * 0.2 + valuesList[4] * 0.1;
export const enemyHealth1 = 100 + valuesList[9]*100;
export const projectilePower = 5 + valuesList[7];
export const amount = Math.floor(10 + valuesList[11]*0.5);