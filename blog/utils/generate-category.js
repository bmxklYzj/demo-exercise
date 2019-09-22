/**
 * @file 根据md中的修改日期生成md目录
 *
 * @author bmxklyzj
 * @date 2019-05-21
 */

let path = require('path');
let fs = require('fs');

function readAllMd(relativePath) {
    let allMds = [];
    let fullPath = path.join(__dirname, relativePath);
    let fileState = fs.statSync(fullPath);
    if (fileState.isDirectory()) {
        fs.readdirSync(fullPath).forEach(item => {
            allMds = allMds.concat(readAllMd(path.join(relativePath, item)));
        });
    }
    else {
        if (relativePath.split('.').pop() === 'md') {
            allMds.push({
                relativePath,
                birthtime: fileState.birthtime,
                mtime: fileState.mtime
            });
            // console.log(fileState);
        }
    }

    return allMds;
}

/**
 * 根据给定排序规则生成目录
 * @param {string} sortBy 排序规则 birthtime - 默认，创建时间；mtime - 修改时间
 */
module.exports = function geterateCategory(sortBy = 'birthtime') {
    let allMds = readAllMd('../');
    let sortedMds = allMds.sort(function cmpDescByTime(o1, o2) {
        return o1[sortBy] < o2[sortBy];
    });
    // console.log(sortedMds);

    let mdCategory = '';
    sortedMds.forEach(item => {
        let title = /.*\/(.*)\.md$/.exec(item.relativePath)[1];
        let path = item.relativePath.replace(/^\.\.\//, '');
        mdCategory += `[${title}](https://github.com/bmxklYzj/demo-exercise/blob/master/blog/${path})` + '\n\n';
    });
    mdCategory = mdCategory.replace(/\n$/, '');
    fs.writeFileSync(path.join(__dirname, '../category.md'), mdCategory);
};
