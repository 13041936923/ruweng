const fs = require('fs');
const path = require('path');

// Find all HTML files
function findHtmlFiles(dir, files = []) {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && item !== 'node_modules' && item !== '.git') {
          findHtmlFiles(fullPath, files);
        } else if (item.endsWith('.html')) {
          files.push(fullPath);
        }
      } catch (e) {}
    }
  } catch (e) {}
  return files;
}

// Update repo in HTML files
function updateHtmlFiles(files) {
  let count = 0;
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix repo
      if (content.includes("repo = 'yourname/yourblog'")) {
        content = content.replace(/repo = 'yourname\/yourblog'/g, "repo = 'ruwengz/ruweng'");
        fs.writeFileSync(file, content);
        count++;
        console.log('Updated: ' + file);
      }
      
      // Add comments to guestbook page
      if (file.includes('guestbook') && content.includes('guestbook-list')) {
        const commentsCode = `
        
        <!-- 留言评论功能 -->
        <div class="comments-section">
          <h3 class="comments-title">💬 留言讨论</h3>
          <div id="comments">
            <script src="https://utteranc.es/client.js"
              repo="ruwengz/ruweng"
              issue-term="pathname"
              label="comment"
              theme="github-dark"
              crossorigin="anonymous"
              async>
            </script>
          </div>
        </div>`;
        
        if (!content.includes('utteranc.es/client.js', content.indexOf('guestbook-list'))) {
          content = content.replace('</div>\n        \n        <% } else if', commentsCode + '</div>\n        \n        <% } else if');
          fs.writeFileSync(file, content);
          count++;
          console.log('Added comments to: ' + file);
        }
      }
    } catch (e) {
      console.log('Error: ' + file, e.message);
    }
  }
  console.log(`\nTotal updated: ${count} files`);
}

const htmlFiles = findHtmlFiles('.');
updateHtmlFiles(htmlFiles);
