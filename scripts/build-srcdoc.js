const fs = require('fs');

const html = fs.readFileSync('src/srcdoc/index.html', 'utf-8');

fs.writeFileSync('src/srcdoc/index.js', `export default ${JSON.stringify(html)};`);
