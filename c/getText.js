#!/usr/bin/env node

// Extract text from a web page

const { convert } = require('html-to-text');
const readline = require('readline');
const natural = require('natural');

const rl = readline.createInterface({
  input: process.stdin,
});

// TODO Add some code

let html = '';

rl.on('line', (line) => {
  // TODO Add some code
  // process.stdout.write(line);
  html += line;
});

rl.on('close', () => {
  // TODO Add some code
  const text = convert(html);
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);

  process.stdout.write(tokens.join('\n'));
});
