let geterateCategory = require('./generate-category');

let sortByParam = (/-sortBy=(.*)/.exec(process.argv[2]) || [])[1];
if (sortByParam !== undefined && !['birthtime', 'mtime'].includes(sortByParam)) {
    throw new Error('');
}
console.log(sortByParam);
geterateCategory(sortByParam);
