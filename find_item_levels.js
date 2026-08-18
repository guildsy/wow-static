/*
  HOW TO USE

  1. Go to vaultItemHack in RC for main instructions
  2. Replace IDs in `tierBySourceId` with new boss IDs, value is the index of the bucket
  3. run this via `yarn run item-levels`
*/

// EDIT THESE TWO
const INSTANCE_ID = "16915";
const tierBySourceId = {
  253563: 0,
  252959: 0,

  258557: 1,
  267077: 1,

  266403: 2,
  257347: 2,
  257361: 2,

  259447: 3,
  268956: 3
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
