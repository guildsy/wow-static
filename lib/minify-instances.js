var fs = require('fs');

var data = JSON.parse(fs.readFileSync('wow_instances.json'));
fs.writeFileSync('wow_instances.min.json', JSON.stringify(data));
