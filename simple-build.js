'use strict';

// Simple Hexo static site generator
const path = require('path');
const fs = require('fs');

// Create public directory structure
const publicDir = path.join(__dirname, 'public');

// Ensure directories exist
const dirs = ['', 'css', 'js', 'about', 'guestbook', 'moments', 'topics', 
               'categories', 'categories/日常', 'categories/专题', 
               'archives', 'archives/2024', 'tags'];

// Create directories
dirs.forEach(dir => {
  const fullPath = path.join(publicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log('Public directory structure created.');
console.log('Note: Run hexo generate to build actual content.');
