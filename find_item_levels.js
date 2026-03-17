/*
  HOW TO USE

  1. Go to vaultItemHack in RC for main instructions
  2. Replace IDs in `tierBySourceId` with new boss IDs, value is the index of the bucket
  3. run this via `yarn run item-levels`
*/

// EDIT THESE TWO
const INSTANCE_ID = "16340";
const tierBySourceId = {
  240435: 0,

  240434: 1,
  240432: 1,
  256116: 1,

  242056: 2,
  250589: 2,
  240387: 2,

  244761: 3,
  214650: 3
};

// DON'T NEED TO EDIT BELOW
const fs = require("fs");

const wowItems = JSON.parse(fs.readFileSync("wow_items.json")).items;
const wowInstances = JSON.parse(fs.readFileSync("wow_instances.json")).instances;

const raid = wowInstances.find((x) => x.id === INSTANCE_ID);
const bossIds = raid.bosses.map((x) => x.id);

const items = wowItems.filter((x) => bossIds.includes(x.sourceId));

const tierByItemId = {};
items.forEach((item) => {
  tierByItemId[item.id] = tierBySourceId[item.sourceId];
});

console.log(tierByItemId);
