'use strict';

// Custom Hexo build script with full generation
const Hexo = require('hexo');
const fs = require('fs');
const path = require('path');

// Initialize Hexo
const hexo = new Hexo(__dirname, {
  debug: false
});

console.log('Building blog...');

hexo.init()
  .then(() => hexo.load())
  .then(() => {
    console.log('Generating all files...');
    return hexo.call('generate', { deploy: false });
  })
  .then(() => {
    console.log('Blog generated successfully!');
    console.log('Generated files in public/ folder');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
