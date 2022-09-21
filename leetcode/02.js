/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const buildTree = (arr) => {
  // [4,8,5,0,1,null,6]
  const queue = [];
  const tree = new TreeNode(arr[0]);
  queue.push(tree);
  let i = 1;
  while (i < arr.length) {
    const cur = queue.shift();
    if (arr[i] != null) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    if (arr[i + 1] != null) {
      cur.right = new TreeNode(arr[i + 1]);
      queue.push(cur.right);
    }
    i += 2;
  }
  return tree;
};

const find = (node) => {
  // console.log(node);
  if (!node) {
    return {
      sum: 0,
      childCnt: -1,
      average: 0,
      res: 0,
    };
  }
  if (!node.left && !node.right) {
    node.sum = node.val;
    node.childCnt = 0;
    node.average = node.sum;
    node.res = 1;
    return node;
  }
  const left = find(node.left);
  const right = find(node.right);
  node.sum = left.sum + right.sum + node.val;
  node.childCnt = left.childCnt + right.childCnt + 2;
  node.average = Math.floor(node.sum / (node.childCnt + 1));
  node.res = left.res + right.res + (node.average === node.val ? 1 : 0);
  return node;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function (root) {
  const tree = buildTree(root);
  // console.log(JSON.stringify(tree));
  // console.log(find(tree));
  const res = find(tree).res;
  console.log(res);
  return res;
};
console.log(averageOfSubtree([4, 8, 5, 0, 1, null, 6]));
console.log(averageOfSubtree([1]));
