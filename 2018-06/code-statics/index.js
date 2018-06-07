/**
 * @file 统计同级 src 目录下面的所有文件的行数
 * @author yangzongjun
 * @date 2018-06-07 00:45:10
 */
let fs = require('fs');
let path = require('path');

let root = path.join(__dirname, '../first-screen');
// 最终生成的结果如下：
// res = {
//     directoryCount: n, // 目录总数
//     totalFile: {
//         fileCount: n, // 文件总数
//         lineCount: n, // 该类型文件总行数
//         lineCountWithoutBlankLine: n // 滤出空行后的总行数
//     },
//     fileList: {
//         '.js': {
//             fileCount: n, // 文件总数
//             lineCount: n, // 该类型文件总行数
//             lineCountWithoutBlankLine: n // 滤出空行后的总行数
//         },
//         '.vue': {
//             fileCount: n,
//             lineCount: n,
//             lineCountWithoutBlankLine: n // 滤出空行后的总行数
//         }
//     }
// }
let res = {
    directoryCount: 0,
    totalFile: {
        fileCount: 0,
        lineCount: 0,
        lineCountWithoutBlankLine: 0
    },
    fileList: {}
};

const ignoreFile = ['DS_Store'];

/**
 * 递归文件夹
 *
 * @param {string} path 路径
 */
function rescuriveFind(parentPath) {
    let directorys = fs.readdirSync(parentPath);
    directorys.forEach(item => {
        let currentPath = path.join(parentPath, item);
        let status = fs.statSync(currentPath);
        if (status.isDirectory()) {
            res.directoryCount++;
            rescuriveFind(currentPath);
        }
        else {
            // console.log('file: %s, %s', JSON.stringify(status), item);
            let fileContent = fs.readFileSync(currentPath, 'utf8');
            let suffix = item.split('.').pop();
            if (ignoreFile.indexOf(suffix) !== -1) {
                return false;
            }
            if (res.fileList[suffix] === undefined) {
                res.fileList[suffix] = {
                    fileCount: 0,
                    lineCount: 0,
                    lineCountWithoutBlankLine: 0
                };
            }
            res.fileList[suffix].fileCount++;
            res.fileList[suffix].lineCount += fileContent.split(/[\r\n]/g).length;
            // trim是处理 头部有多个换行 此时会保留一个换行的bug
            fileContent = fileContent.trim().replace(/[\r\n]\s+/gim, '\n');
            res.fileList[suffix].lineCountWithoutBlankLine += fileContent.split(/[\r\n]/g).length;
        }
    });
}

rescuriveFind(root);

// 计算总文件数、总代码行数
for (let k in res.fileList) {
    let item = res.fileList[k];
    let totalFile = res.totalFile;
    totalFile.fileCount += item.fileCount;
    totalFile.lineCount += item.lineCount;
    totalFile.lineCountWithoutBlankLine += item.lineCountWithoutBlankLine;
}
console.log(JSON.stringify(res));


