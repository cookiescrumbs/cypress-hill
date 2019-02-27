#!/usr/bin/env node
const Console = console;
const [, , ...args] = process.argv;

Console.log(`Hello world ${args}`);
