var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Items = require('./items');

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/items', function(req, res) {
	var items = Items.getAll();
	res.json(items);
});

app.get('/item/:id', function(req, res) {
	var item = Items.get(req.params.id);
	res.json(item);
});

app.post('/item', function(req, res) {
	Items.save(req.body, function() {
		res.send(Items.get(req.body.id));
	});
});

app.delete('/item/:id', function(req, res) {
	Items.remove(req.params.id);
	res.end();
});

app.get('/wowhead/:id', function(req, res) {
	Items.wowheadXML(req.params.id, function(data) {
		res.json(data);
	});
});

app.listen(3050);
