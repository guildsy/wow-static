const fs = require("fs");

const wowItems = JSON.parse(fs.readFileSync("wow_items.json")).items;
const wowInstances = JSON.parse(fs.readFileSync("wow_instances.json")).instances;

const vault = wowInstances.find((x) => x.id === "14030");
const vaultBossIds = vault.bosses.map((x) => x.id);

const vaultItems = wowItems.filter((x) => vaultBossIds.includes(x.sourceId));

const tierBySourceId = {
  // 1-4
  184972: 0,
  190496: 0,
  187771: 0,
  187967: 0,

  // wing
  189813: 1,
  181378: 1,

  // final
  190245: 2,
  193909: 2,
};

const tierByItemId = {};
vaultItems.forEach((item) => {
  tierByItemId[item.id] = tierBySourceId[item.sourceId];
});

console.log(tierByItemId);
