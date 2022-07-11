#!/usr/bin/env node
import { Command } from "commander/esm.mjs";
const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("-V, --version output the version number")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format");

program.parse();
