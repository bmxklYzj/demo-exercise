let hello = 'hello 1';
console.log(hello);

const arr = [1, "2"];
const arr2: number[] = [1, 2];
const arr3: (string|number)[] = [1, 2, "3"];

const tupe: [number, string] = [1, "name"];
tupe[0] = '1';
tupe[1] = 2;
tupe.push(3);