import {cube} from './math';

var ele = document.createElement('div');

ele.innerHTML = [
    'hello webpack!',
    'cube(5): ' + cube(5)
];

document.body.appendChild(ele);

if (module.hot) {
    module.hot.accept('./math.js', function () {
        console.log('updating!', cube(5));
    });
}