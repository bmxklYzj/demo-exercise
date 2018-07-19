function Node(element) {
    this.element = element;
    this.next = null;
}

function List() {
    this.head = new Node('head');
}
List.prototype.push = function (element) {
    var newNode = new Node(element);
    var currentNode = this.head;
    while (currentNode.next !== null) {
        currentNode = currentNode.next;
    }
    currentNode.next = newNode;
}


var list = new List();