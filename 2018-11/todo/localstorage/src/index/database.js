/**
 * localstorage 有效数据库
 *
 * @author bmxklyzj
 * @date 2018-11-24
 * @constructor
 */

let id = 0;
function getId() {
    return id++;
}

const localStorageKey = 'TODO';

function DataBase() {
    this.getData = function () {
        return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    };
    this.setData = function (data) {
        console.log('setdata',  data, JSON.stringify(data));

        localStorage.setItem(localStorageKey, JSON.stringify(data));
    };
}

DataBase.prototype.add = function(todo) {
    let item = {
        id: getId(),
        todo
    };
    let data = this.getData();
    data.push(item);
    this.setData(data);
    // this.setData(this.getData().push(item)) 之前这样写，坑了好久，才发现是push的原因，push返回的是修改后数组个数

    return item;
};

DataBase.prototype.remove = function (todoId) {
    let data = this.getData();
    let len = data.length;
    while (len--) {
        if (data[len].id === +todoId) {
            data.splice(len, 1); // delete
            this.setData(data);
            break;
        }
    }
};

DataBase.prototype.get = function () {
    return this.getData();
};

export default DataBase;