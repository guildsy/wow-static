const fetch = require('node-fetch');
const yargs = require('yargs/yargs');

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
	.then((x) => {
		x.results.forEach(({data: bossData}) => {
			console.log(bossData.id, bossData.name.en_US);
		});
	});
