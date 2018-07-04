import _ from 'lodash';
import './style.css';
import img from './assets/git.png';
import print from './print.js';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    element.classList.add('hello');

    var imgDom = new Image();
    imgDom.src = img;
    element.appendChild(imgDom);

    var button = document.createElement('button');
    button.innerHTML = 'button';
    button.onclick = print;
    element.appendChild(button);
    return element;
}

document.body.appendChild(component());