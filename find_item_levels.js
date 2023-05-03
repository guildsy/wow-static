const fs = require("fs");

const wowItems = JSON.parse(fs.readFileSync("wow_items.json")).items;
const wowInstances = JSON.parse(fs.readFileSync("wow_instances.json")).instances;

const vault = wowInstances.find((x) => x.id === "14663");
const vaultBossIds = vault.bosses.map((x) => x.id);

const vaultItems = wowItems.filter((x) => vaultBossIds.includes(x.sourceId));

const tierBySourceId = {
  201261: 0,
  201774: 0,
  199659: 0,

  200912: 1,
  201320: 1,

  202637: 2,
  201579: 2,

  203133: 3,
  205319: 3,
};

const tierByItemId = {};
vaultItems.forEach((item) => {
  tierByItemId[item.id] = tierBySourceId[item.sourceId];
});

console.log(tierByItemId);
