/*
  HOW TO USE

  1. Go to vaultItemHack in RC for main instructions
  2. Replace IDs in `tierBySourceId` with new boss IDs, value is the index of the bucket
  3. run this via `yarn run item-levels`
*/

const INSTANCE_ID = "14643";

const fs = require("fs");

const wowItems = JSON.parse(fs.readFileSync("wow_items.json")).items;
const wowInstances = JSON.parse(fs.readFileSync("wow_instances.json")).instances;

const raid = wowInstances.find((x) => x.id === INSTANCE_ID);
const bossIds = raid.bosses.map((x) => x.id);

const items = wowItems.filter((x) => bossIds.includes(x.sourceId));

const tierBySourceId = {
  209333: 0,
  206689: 0,

  208478: 1,
  208363: 1,

  208445: 2,
  206172: 2,
  214082: 2,

  210601: 3,
  213646: 3,
};

const tierByItemId = {};
items.forEach((item) => {
  tierByItemId[item.id] = tierBySourceId[item.sourceId];
});

console.log(tierByItemId);
