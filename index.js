const { sortBy, uniq } = require("lodash");
const fs = require("fs");
const { extname } = require("path");

const sortObj = (obj) =>
  Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

const compareObj = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const sortedArr = sortBy([...obj1Keys, ...obj2Keys]);
  const uniqArr = uniq(sortedArr);

  const result = uniqArr.reduce((acc, key) => {
    const isHavePropInObj1 = obj1.hasOwnProperty(key);
    const isHavePropInObj2 = obj2.hasOwnProperty(key);

    if (isHavePropInObj1 && isHavePropInObj2 && obj1[key] === obj2[key]) {
      acc = acc + `    ${key}: ${obj1[key]} \n`;
    }
    if (isHavePropInObj1 && isHavePropInObj2 && obj1[key] !== obj2[key]) {
      acc = acc + `  - ${key}: ${obj1[key]} \n  + ${key}: ${obj2[key]} \n`;
    }
    if (isHavePropInObj1 && !isHavePropInObj2) {
      acc = acc + `  - ${key}: ${obj1[key]} \n`;
    }
    if (!isHavePropInObj1 && isHavePropInObj2) {
      acc = acc + `  + ${key}: ${obj2[key]} \n`;
    }
    return acc;
  }, "");

  return `{ \n${result}}`;
};

const defineFileType = (str) => {
  return extname(str);
};

const genDiff = (path1, path2) => {
  const typeOfFile1 = defineFileType(path1);
  const typeOfFile2 = defineFileType(path2);

  const file1 = JSON.parse(fs.readFileSync(path1, "utf-8"));
  const file2 = JSON.parse(fs.readFileSync(path2, "utf-8"));

  const sortFile1 = sortObj(file1);
  const sortFile2 = sortObj(file2);

  return compareObj(sortFile1, sortFile2);
};

exports.genDiff = genDiff;
