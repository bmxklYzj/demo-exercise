/**
 * 单个会话有效数据库
 *
 * @author bmxklyzj
 * @date 2018-11-24
 * @constructor
 */

function getId() {
    let id = 0;
    return function () {
        return id++;
    };
}
getId();

function DataBase() {
    this.list = [];
}

DataBase.prototype.add = function(todo) {
    let data = {
        id: getId(),
        todo: todo
    };
    this.list.push(data);
    return data;
};

DataBase.prototype.remove = function (todoId) {
    let len = this.list.length;
    while (len--) {
        if (this.list[len].id === +todoId) {
            this.list.splice(len, 1); // delete
            break;
        }
    }
};

DataBase.prototype.get = function () {
    return this.list;
};

export default DataBase;