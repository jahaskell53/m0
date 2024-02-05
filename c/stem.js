#!/usr/bin/env node

// use Porter Stemmer to stem individual terms in a streaming fashion

const readline = require('readline');
const natural = require('natural');
const fs = require('fs');

const stopwords = new Set(fs.readFileSync('d/stopwords.txt', 'utf8').split('\n').map(word => word.trim()));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  // TODO some code
  let words = line.split(' ');
  let filteredWords = words.filter(word => !stopwords.has(word.toLowerCase())); // Filter out stopwords
  let stemmedWords = filteredWords.map(word => natural.PorterStemmer.stem(word));
  process.stdout.write(stemmedWords.join(' ') + '\n');
});
