#!/usr/bin/env node

const { resolve } = require("path");
const { program } = require("commander");
const { genDiff } = require("../index.js");

const currentPath = process.cwd();

program
  .description("Compares two configuration files and shows a difference.")
  .version("-V, --version output the version number")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format")
  .action((file1Name, file2Name) => {
    const file1Path = resolve(currentPath, file1Name);
    const file2Path = resolve(currentPath, file2Name);

    console.log(genDiff(file1Path, file2Path));
  });

program.parse();
