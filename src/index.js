import getProfile from './profile';
import './style.css';

function draw(params) {
    const el = document.createElement('div');
    const btn = document.createElement('button');
    el.innerHTML = 'Hello world';
    el.classList.add('hello');

    btn.innerHTML = 'GET PROFILE';
    btn.onclick = getProfile;
    el.appendChild(btn);

    return el;
}

document.body.appendChild(draw());