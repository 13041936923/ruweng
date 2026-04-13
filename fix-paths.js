// Fix paths for GitHub Pages subdirectory deployment
const fs = require('fs');
const path = require('path');

const subdir = '/ruweng';
const rootDir = __dirname;

function fixFile(filePath) {
  if (!filePath.endsWith('.html')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Fix CSS links
  content = content.replace(/href="\/css\//g, `href="${subdir}/css/`);
  content = content.replace(/href="\/js\//g, `href="${subdir}/js/`);
  
  // Fix JS links
  content = content.replace(/src="\/js\//g, `src="${subdir}/js/`);
  
  // Fix navigation links
  content = content.replace(/href="\//g, `href="${subdir}/`);
  
  // Fix atom.xml and sitemap links
  content = content.replace(/href="\/atom\.xml"/g, `href="${subdir}/atom.xml"`);
  content = content.replace(/href="\/sitemap\.xml"/g, `href="${subdir}/sitemap.xml"`);
  
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

walkDir(rootDir);
console.log('All paths fixed!');
