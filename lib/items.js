var fs = require('fs');
var request = require('request');
var xml2object = require('xml2object');

var _items = {};

function fetchIcon(id, icon, cb) {
	var url = 'http://wow.zamimg.com/images/wow/icons/large/' + icon + '.jpg';
	request({
		url: url,
		encoding: null
	}, function(err, res, body) {
		if ( ! err && res.statusCode === 200) {
			var data = "data:" + res.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
			_items[id].icon = data;

			write();
			console.log('Saved icon for', id);
			cb();
		} else {
			console.warn('Failed to save icon for', id);
		}
	});
}

function fetchXML(id, cb) {
	var parser = new xml2object(['icon']);
	var url = 'http://www.wowhead.com/item=' + id + '?xml';
	request(url)
		.on('error', function(err) {
			console.warn('Error fetching XML', id, err);
		})
		.pipe(parser.saxStream);

	parser.on('object', function(name, obj) {
		fetchIcon(id, obj.$t, cb);
	});
}

function read() {
	var wowItems = JSON.parse(fs.readFileSync('wow_items.json'));

	// map id to item from array of items
	wowItems.items.forEach(function(item) {
		_items[item.id] = item;
	});
}

function write() {
	var wowItems = {
		items: Object.keys(_items).map(function(id) {
			return _items[id];
		})
	};

	fs.writeFileSync('wow_items.json', JSON.stringify(wowItems, null, 4));
	fs.writeFileSync('wow_items.min.json', JSON.stringify(wowItems));
}

function get(id) {
	return _items[id];
}

function getAll() {
	return _items;
}

function save(item, cb) {
	console.log('SAVING', item.id);

	// if the id changed then we need to remove the old one
	// and remove the oldItemID prop from the item
	if (item.oldItemID) {
		remove(item.oldItemID);
		delete item.oldItemID;
	}

	_items[item.id] = item;

	fetchXML(item.id, cb);
	write();
}

function remove(id) {
	console.log('REMOVING', id);
	delete _items[id];
	write();
}

var Items = {
	get: get,
	getAll: getAll,
	save: save,
	remove: remove
};

read();

module.exports = Items;
