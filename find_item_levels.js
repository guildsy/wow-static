/*
  HOW TO USE

  1. Go to vaultItemHack in RC for main instructions
  2. Replace IDs in `tierBySourceId` with new boss IDs, value is the index of the bucket
  3. run this via `yarn run item-levels`
*/

// EDIT THESE TWO
const INSTANCE_ID = "16178";
const tierBySourceId = {
  233814: 0,
  233815: 0,
  233816: 0,

  247989: 1,
  237661: 1,
  237861: 1,

  237763: 2,
  233824: 2,
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
