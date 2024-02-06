#!/usr/bin/env node

const readline = require('readline');
const {JSDOM} = require('jsdom');
const {URL} = require('url');

// Example usage:
// console.log(process.argv[0])
const inputURL = process.argv[2];
const baseURL = new URL(inputURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// TODO some code
let urls = new Set();
rl.on('line', (line) => {
  // TODO some code
  //   const regex = /href="([^"]*)"/g;
  // let match;
  //  while ((match = regex.exec(line)) !== null) {
  //   const url = new URL(match[1], baseURL);
  //   // rl.write(url.toString() + "\n");
  //   urls += url.toString() + "\n";
  // }
  const dom = new JSDOM(line);
  const document = dom.window.document;
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    let url;
    try {
      url = new URL(link.href).href;
    } catch (e) {
      url = new URL(link.href, baseURL).href;
    }
    // console.error('the url', url.toString());

    // const url = new URL(link.href, baseURL);
    if (!urls.has(url.toString())) {
      process.stdout.write(url.toString() + '\n');
      urls.add(url.toString());
      // console.error(url.toString());
    }
  });
  // write urls to stdout
  // process.stdout.write(Array.from(urls).join('\n') + '\n');
});

rl.on('close', () => {
  // TODO some code
  // console.error("urls", urls);
  // process.stdout.write(Array.from(urls).join('\n') + '\n');
  // dont need to exit process, and write on end, that seemed to be the issue
});
