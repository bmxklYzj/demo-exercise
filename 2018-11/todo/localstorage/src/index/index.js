import 'normalize.css';
import './index.less';
import DataBase from './database';
let dataBase = new DataBase();
let $ = document.querySelector.bind(document); // document.querySelector must exec under document context
let $$ = document.querySelectorAll.bind(document);
let todoContent = $('#todo-list-content');

// 刚进页面展示之前的列表
appendToDom(dataBase.get());

// 监听input的enter事件
$('#input').addEventListener('keydown', function (e) {
    let todo = e.target.value.trim();
    if (
        e.key === 'Enter'
        && todo
    ) {
        addItem(todo);
    }
}, false);

$('#input-add').addEventListener('click', function (e) { // 注意没有tap事件，使用touchstart或click...
    let todo = $('#input').value.trim();
    if (todo) {
        addItem(todo);
    }
});

function addItem(todo) {
    let data = dataBase.add(todo);
    appendToDom([data]); // [{id: x, todo: xx}]
    $('#input').value = '';
}

function appendToDom(list) {
    let fragment = document.createDocumentFragment();
    list.forEach(item => {
        fragment.appendChild(createLi(item));
    });
    todoContent.appendChild(fragment); // 注意appendChild和append的区别
}

function createLi(todo) {
    let li = document.createElement('li');
    li.innerHTML =
        `
        <label class="todo-list-wrap">
            <input type="checkbox" class="iconfont checkbox">
            <p class="todo-list-item" data-id="${todo.id}">${todo.todo}</p>
        </label>
        `;
    return li;
}

// touch删除
let coordinateInfo = {
    x: -1,
    y: -1,
    target: null
};
todoContent.addEventListener('touchstart', function (e) {
    coordinateInfo = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        target: e.changedTouches[0].target
    };
}, false);
todoContent.addEventListener('touchmove', function (e) {
    if (Math.abs(e.changedTouches[0].clientX - coordinateInfo.x) > 20) {
        if (
            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            === coordinateInfo.target
        ) {
            if (confirm(`是否删除: ${coordinateInfo.target.querySelector('.todo-list-item').innerText} ?`)) {
                let todoId = coordinateInfo.target.querySelector('.todo-list-item').getAttribute('data-id');
                todoContent.removeChild(coordinateInfo.target.parentNode);
                dataBase.remove(todoId);
            }
        }
    }
}, false);