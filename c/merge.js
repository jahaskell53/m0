#!/usr/bin/env node

// merge two files---the incoming 1-page index and the global index (on disk)
// the details of the global index can be seen in the test cases.

const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const globalIndexPath = process.argv[2];
const incomingIndex = {};

// TODO some code here
rl.on('line', (line) => {
  // TODO some code here
   const [term, count, url] = line.split('|').map(part => part.trim());
  //  console.log("term: ", term, "count: ", count, "url: ", url);
  if (!incomingIndex[term]) {
    incomingIndex[term] = {};
  }
  if (!incomingIndex[term][url]) {
    incomingIndex[term][url] = parseInt(count, 10);
  } else {
    incomingIndex[term][url] += parseInt(count, 10);
  }
});

rl.on('close', () => {
  mergeIndices();
  exit(0);
});

const mergeIndices = () => {
  // TODO some code here
   let globalIndex = {};

  if (fs.existsSync(globalIndexPath) && fs.statSync(globalIndexPath).size > 0) {
    const lines = fs.readFileSync(globalIndexPath, 'utf8').trim().split('\n');
    lines.forEach(line => {
      const parts = line.split('|').map(part => part.trim());
      const term = parts[0];
      // console.error("term: ", term, "parts: ", parts[1], "\n");
      const urlsCounts = parts[1].split(' ');
      // console.log("urlsCounts: ", urlsCounts);
      globalIndex[term] = globalIndex[term] || {};

      for (let i = 0; i < urlsCounts.length - 1; i += 2) {
        const url = urlsCounts[i];
        const count = parseInt(urlsCounts[i + 1], 10);
        // console.log("url: ", url, "count: ", count);
        if (!globalIndex[term][url]) {
          globalIndex[term][url] = count;
        } else {
          globalIndex[term][url] += count;
        }
      }
    });
  }

   Object.keys(incomingIndex).forEach(term => {
    if (!globalIndex[term]) {
      globalIndex[term] = incomingIndex[term];
    } else {
      Object.keys(incomingIndex[term]).forEach(url => {
        if (!globalIndex[term][url]) {
          globalIndex[term][url] = incomingIndex[term][url];
        } else {
          globalIndex[term][url] += incomingIndex[term][url];
        }
      });
    }
  });
  // console.error("globalIndex: ", globalIndex);
  Object.keys(globalIndex).forEach(term => {
    const urlsAndCounts = Object.entries(globalIndex[term]).sort(([urlA, countA], [urlB, countB]) => {
    if (countB !== countA) {
      return countB - countA; 
    } else {
      return urlA.localeCompare(urlB);
    }
  }).flatMap(([url, count]) => {
      // console.log("url: ", url, "count: ", count);
      return [url, count];
    }).join(' '); 
    process.stdout.write(`${term} | ${urlsAndCounts}\n`);
  });
}




