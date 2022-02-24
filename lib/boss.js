const fetch = require('node-fetch');

// return array of item IDs
function extractItemData(text) {
	const baseRegex = /WH\.Gatherer\.addData\(3,\s*[1|2],\s*(.*)\);/;
	const allMatches = new RegExp(baseRegex, 'g');

	const fullItemCodeMatch = [...text.matchAll(allMatches)];

	// there can sometimes be multiple sets of items, so assume the last one is the correct one
	const lastMatch = fullItemCodeMatch[fullItemCodeMatch.length -1];
	if (!lastMatch) return [];

	// do the capturing group stuff
	const fullItemRaw = baseRegex.exec(lastMatch)[1];
	if (!fullItemRaw) return [];

	const json = JSON.parse(fullItemRaw);
	const itemIds = Object.keys(json);
	return itemIds;
}

// return array of item urls
function itemIdsToUrls(itemIds, urlPreifx) {
	return itemIds.map((id) => {
		return `${urlPreifx}/item=${id}`;
	});
}

async function fetchBossHtml(url) {
	const res = await fetch(url);
	const text = await res.text();

	const itemIds = extractItemData(text);
	// console.log(itemIds);

	const subdomainMatch = /https:\/\/(.+)\.wowhead\.com/.exec(url);
	const subdomain = subdomainMatch && subdomainMatch[1] || 'www';

	const itemUrls = itemIdsToUrls(itemIds, `https://${subdomain}.wowhead.com`);
	console.log(itemUrls);

	return {
		urls: itemUrls
	}
}

// const TEMP_BOSS_URL = 'https://ptr.wowhead.com/npc=15990/kelthuzad#drops;mode:m';
// fetchBossHtml(TEMP_BOSS_URL).then(console.log);

module.exports = {
	fetchBossHtml
}
