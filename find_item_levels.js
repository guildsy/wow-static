/*
  HOW TO USE

  1. Go to vaultItemHack in RC for main instructions
  2. Replace IDs in `tierBySourceId` with new boss IDs, value is the index of the bucket
  3. run this via `yarn run item-levels`
*/

// EDIT THESE TWO
const INSTANCE_ID = "15522";
const tierBySourceId = {
  225822: 0,

  229181: 1,
  228652: 1,
  230583: 1,

  230322: 2,
  228458: 2,

  229953: 3,
  237194: 3,
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
