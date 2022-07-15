const { test, expect } = require("@jest/globals");
const { genDiff } = require("../index");
const { resolve } = require("path");

test("genDiff", () => {
  const file1Path = resolve(currentPath, file1Name);
  const file2Path = resolve(currentPath, file2Name);

  expect(genDiff(file1Path, file2Path)).toBe("");
});
