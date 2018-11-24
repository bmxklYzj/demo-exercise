import 'normalize.css';
import './index.less';
import DataBase from './database';
let dataBase = new DataBase();
let $ = document.querySelector.bind(document); // document.querySelector must exec under document context
let $$ = document.querySelectorAll.bind(document);
let todoContent = $('#todo-list-content');
// 监听input的enter事件
$('#input').addEventListener('keydown', function (e) {
    let todo = e.target.value.trim();
    if (
        e.key === 'Enter'
        && todo
    ) {
        addItem(todo);
    }
});

$('#input-add').addEventListener('click', function (e) { // 注意没有tap事件，使用touchstart或click...
    let todo = $('#input').value.trim();
    if (todo) {
        addItem(todo);
    }
});

function addItem(todo) {
    let data = dataBase.add(todo);
    appendToDom(data);
    $('#input').value = '';
}

function appendToDom(data) {
    let li = document.createElement('li');
    li.innerHTML =
        `
        <label class="todo-list-wrap">
            <input type="checkbox" class="iconfont checkbox">
            <p class="todo-list-item" data-id="${data.id}">${data.todo}</p>
        </label>
        `
    todoContent.appendChild(li); // 注意appendChild和append的区别
}


let coordinateInfo = {
    x: -1,
    y: -1,
    target: null
};
// touch删除
todoContent.addEventListener('touchstart', function (e) {
    coordinateInfo = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        target: e.changedTouches[0].target
    };
});
todoContent.addEventListener('touchmove', function (e) {
    if (Math.abs(e.changedTouches[0].clientX - coordinateInfo.x) > 20) {
        if (
            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            === coordinateInfo.target
        ) {
            if (confirm('是否删除当前列？')) {
                let todoId = coordinateInfo.target.querySelector('.todo-list-item').getAttribute('data-id');
                todoContent.removeChild(coordinateInfo.target.parentNode);
                dataBase.remove(todoId);
            }
        }
    }
});