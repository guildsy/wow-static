var fs = require('fs');

var _items = {};

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

function save(item) {
	console.log('SAVING', item.id);

	// if the id changed then we need to remove the old one
	// and remove the oldItemID prop from the item
	if (item.oldItemID) {
		remove(item.oldItemID);
		delete item.oldItemID;
	}

	_items[item.id] = item;
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
