const { sortBy, uniq } = require("lodash");
const fs = require("fs");
const yaml = require("js-yaml");
const { extname } = require("path");

const sortObj = (obj) => Object.keys(obj)
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
    const isHavePropInObj1 = key in obj1;
    const isHavePropInObj2 = key in obj2;

    if (isHavePropInObj1 && isHavePropInObj2 && obj1[key] === obj2[key]) {
      return `${acc}    ${key}: ${obj1[key]} \n`;
    }
    if (isHavePropInObj1 && isHavePropInObj2 && obj1[key] !== obj2[key]) {
      return `${acc}  - ${key}: ${obj1[key]} \n  + ${key}: ${obj2[key]} \n`;
    }
    if (isHavePropInObj1 && !isHavePropInObj2) {
      return `${acc}  - ${key}: ${obj1[key]} \n`;
    }
    if (!isHavePropInObj1 && isHavePropInObj2) {
      return `${acc}  + ${key}: ${obj2[key]} \n`;
    }
    return acc;
  }, "");

  return `{ \n${result}}`;
};

const defineFileType = (str) => extname(str);

const parseOfType = (type, path) => {
  if (type === ".json") {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  }
  return yaml.load(fs.readFileSync(path, "utf8"));
};

const genDiff = (path1, path2) => {
  const typeOfFile1 = defineFileType(path1);
  const typeOfFile2 = defineFileType(path2);

  const file1 = parseOfType(typeOfFile1, path1);
  const file2 = parseOfType(typeOfFile2, path2);

  const sortFile1 = sortObj(file1);
  const sortFile2 = sortObj(file2);

  return compareObj(sortFile1, sortFile2);
};

exports.genDiff = genDiff;
