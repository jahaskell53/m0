#!/usr/bin/env node

const readline = require('readline');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

// Example usage:
// console.log(process.argv[0])
const inputURL = process.argv[2];
const baseURL = new URL(inputURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// TODO some code
let urls = "";
rl.on('line', (line) => {
  // TODO some code
    const regex = /href="([^"]*)"/g;
  let match;
   while ((match = regex.exec(line)) !== null) {
    const url = new URL(match[1], baseURL);
    // rl.write(url.toString() + "\n");
    urls += url.toString() + "\n";
  }
});

rl.on('close', () => {
  // TODO some code
  process.stdout.write(urls);
  // dont need to exit process, and write on end, that seemed to be the issue
});