#!/usr/bin/env node

// use Porter Stemmer to stem individual terms in a streaming fashion

const readline = require('readline');
const natural = require('natural');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  // TODO some code
  // console.error("line: ", line, "end of line");
  let word = line;
    let stemmedWord = natural.PorterStemmer.stem(word);
    process.stdout.write(stemmedWord + '\n');
});
