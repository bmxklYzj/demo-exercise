import 'normalize.css';
import './index.less';
import DataBase from './database';
var dataBase = new DataBase();
var $ = document.querySelector.bind(document); // document.querySelector must exec under document context
var $$ = document.querySelectorAll.bind(document);
var todoContent = $('#todo-list-content');
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

$('#input-add').addEventListener('click', function (e) { // 注意没有tap事件...
    var todo = $('#input').value.trim();
    if (todo) {
        addItem(todo);
    }
});

function addItem(todo) {
    var data = dataBase.add(todo);
    appendToDom(data);
    $('#input').value = '';
}

function appendToDom(data) {
    var li = document.createElement('li');
    li.innerHTML =
        `
        <label class="todo-list-wrap">
            <input type="checkbox" class="iconfont checkbox">
            <p class="todo-list-item" data-id="${data.id}">${data.todo}</p>
        </label>
        `
    todoContent.append(li);
}


var coordinateInfo = {
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
            console.log(e);
            if (confirm('是否删除当前列？')) {
                console.log(coordinateInfo.target, coordinateInfo.target.querySelector('.todo-list-item'))
                var todoId = coordinateInfo.target.querySelector('.todo-list-item').getAttribute('data-id');
                todoContent.removeChild(coordinateInfo.target.parentNode);
                dataBase.remove(todoId);
            }
        }
    }
});