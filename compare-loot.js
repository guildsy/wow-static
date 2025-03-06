const fetch = require('node-fetch');
const yargs = require('yargs/yargs');

const {instances} = require('./wow_instances.json');
const {items} = require('./wow_items.json');

const IGNORED_ITEM_NAMES = [
	// Undermine
	'223097',
	'235626',
	'236960',
	'223144',
	'223144',
	'223144',
	'223094',
	'223048',
	'224435',
];

const {
	instance: instanceName,
	key: apiKey
} = yargs(process.argv.slice(2))
	.option('instance', {
		demandOption: true,
		describe: 'Raid instance name',
		type: 'string'
	})
	.option('key', {
		demandOption: true,
		describe: 'Battle net api key',
		type: 'string'
	})
	.parse();

fetch("https://us.api.blizzard.com/data/wow/search/journal-encounter?namespace=static-us&instance.name.en_US=Liberation%20of%20Undermine&orderby=id&locale=en_US&_page=1", {
	headers: {
		Authorization: `Bearer ${apiKey}`
	}
})
	.then((x) => x.json())
	.then((res) => {
		const instance = instances.find((x) => x.name === instanceName);
		const items = [];

		res.results.forEach((bnetBoss) => {
			// console.log(boss);
			const instanceBoss = instance.bosses.find((x) => x.encounterId === `${bnetBoss.data.id}`);

			bnetBoss.data.items.forEach(({item: bnetItem}) => {
				// console.log(item);

				items.push({
					name: bnetItem.name.en_US,
					itemId: `${bnetItem.id}`,
					sourceName: instanceBoss.name,
					sourceId: instanceBoss.id
				});
			});
		});

		// console.log(items);
		compareLoot({instance, bnetItems: items});
	});

function compareLoot({instance, bnetItems}) {
	const rcItembyId = items.reduce((acc, item) => {
		acc[item.id] = item;
		return acc
	}, {});
	// console.log(rcItembyId)

	instance.bosses.forEach((boss) => {
		console.log('Comparing loot for: ', boss.id, boss.name);

		bnetItems.forEach((bnetItem) => {
			// ignore items not from this boss
			if (bnetItem.sourceId !== boss.id) return;

			// skip ignored items
			if (IGNORED_ITEM_NAMES.indexOf(bnetItem.itemId) !== -1) return;

			const rcItem = rcItembyId[bnetItem.itemId];
			if (!rcItem) {
				console.log("Item not found in RC data", bnetItem);
				return;
			}

			if (rcItem.sourceId !== bnetItem.sourceId) {
				console.log("Source differs", bnetItem, {rcSource: rcItem.sourceId});
				return;
			}
		});
	});
}
