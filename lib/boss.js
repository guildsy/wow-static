const fetch = require('node-fetch');
const path = require('path');

// return array of item IDs
function extractItemData(text) {
	const baseRegex = /WH\.Gatherer\.addData\(3,\s*[1|2|3],\s*(.*)\);/;
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
function itemIdsToUrls(itemIds, urlPreifx, subpath) {
	return itemIds.map((id) => {
		return path.join(urlPreifx, subpath, `item=${id}`);
	});
}

async function fetchBossHtml(url) {
	const res = await fetch(url);
	const text = await res.text();

	const itemIds = extractItemData(text);

	const subdomainMatch = /https:\/\/(.+)\.wowhead\.com/.exec(url);
	const subdomain = subdomainMatch && subdomainMatch[1] || 'www';

	const isBeta = url.includes('wowhead.com/beta')

	const itemUrls = itemIdsToUrls(itemIds, `https://${subdomain}.wowhead.com`, isBeta ? 'beta' : '');
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
