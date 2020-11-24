var fs = require('fs');

var data = JSON.parse(fs.readFileSync('wow_items.json'));
fs.writeFileSync('wow_items.min.json', JSON.stringify(data));
