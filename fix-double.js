// Fix double /ruweng/ruweng paths
const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  if (!filePath.endsWith('.html')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Fix double /ruweng/ruweng to single /ruweng
  content = content.replace(/\/ruweng\/ruweng\//g, '/ruweng/');
  content = content.replace(/href="\/ruweng\/ruweng\//g, 'href="/ruweng/');
  content = content.replace(/src="\/ruweng\/ruweng\//g, 'src="/ruweng/');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else {
      fixFile(fullPath);
    }
  });
}

walkDir(__dirname);
console.log('Done!');
