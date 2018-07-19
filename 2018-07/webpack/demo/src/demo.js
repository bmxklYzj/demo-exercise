import './style.css';
import _ from 'lodash';
import img from './assets/git.png';
import print from './print.js';
import {cube} from './math.js';

function component() {
    var element = document.createElement('div');

    element.innerHTML = [
        'cube 5 is: ' + cube(5),
        'cube 10 is: ' + cube(10)
    ].join('');

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


if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        print();
    });
}