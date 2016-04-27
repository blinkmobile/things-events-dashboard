// https://github.com/blinkmobile/no-polling-example/blob/master/www/bus.js

import Chance from 'chance';

import { eventReceived } from '../redux/modules/events.js';
import { tagReceived, getTags } from '../redux/modules/tags.js';
import { thingReceived, getThings } from '../redux/modules/things.js';

const chance = new Chance();

// getRandomTag (store: Store) => Map
const getRandomTag = (store) => {
  const tags = getTags(store.getState());
  return tags.get(chance.pickone(tags.keys()));
};

// getRandomTag (store: Store) => Map
const getRandomThing = (store) => {
  const things = getThings(store.getState());
  return things.get(chance.pickone(things.keys()));
};

const TAG_TYPES = ['beacons', 'rfids', 'rfidreaders'];
// const THING_TYPES = ['assets', 'locations', 'people'];

const HAPPENINGS = {
  linkTagToThing (store) {
    let tag = getRandomTag(store);
    const thing = getRandomThing(store);
    if (tag && thing) {
      tag = tag.toJS();
      tag.thing = thing.get('id');
      store.dispatch(tagReceived(tag));
    }
  },

  newEvent (store) {
    const allThings = getThings(store.getState());
    const allTags = getTags(store.getState());
    const allTagsIds = Object.keys(allTags.toJS());
    const event = {
      id: '' + (new Date()).valueOf()
    };
    console.log('newEvent', `allTagsIds.length = ${allTagsIds.length}`);
    if (!allTagsIds.length) {
      return;
    }
    // iterate over an array (length: 1 - 6) of random tag IDs
    chance.pickset(allTagsIds, chance.d6()).forEach((tagId) => {
      if (!allTags.get(tagId)) {
        console.log(typeof tagId, tagId, allTagsIds, allTags.has(tagId));
      }
      const tag = allTags.get(tagId).toJS();
      event[tag.type] = event[tag.type] || [];
      event[tag.type].push(tagId);
      let thing = allThings.get(tag.thing);
      if (tag.thing && thing) {
        thing = thing.toJS();
        event[thing.type] = event[thing.type] || [];
        event[thing.type].push(thing.id);
      }
    });
    store.dispatch(eventReceived(event));
  },

  newTag (store) {
    store.dispatch(tagReceived({
      id: '' + (new Date()).valueOf(),
      type: chance.pickone(TAG_TYPES)
    }));
  },

  newThingAsset (store) {
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      name: chance.word(),
      type: 'assets'
    }));
  },

  newThingLocation (store) {
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      name: chance.street(),
      type: 'locations'
    }));
  },

  newThingPerson (store) {
    const firstName = chance.first();
    const surname = chance.last();
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      firstName,
      name: `${chance.prefix()} ${firstName} ${surname}`,
      type: 'people',
      surname
    }));
  },

  unlinkTagFromThing (store) {
    let tag = getRandomTag(store);
    if (tag) {
      tag = tag.toJS();
      delete tag.thing;
      store.dispatch(tagReceived(tag));
    }
  }
};

export const syncStoreWithBus = (store) => {
  setInterval(() => {
    const happening = chance.pickone(Object.keys(HAPPENINGS));
    HAPPENINGS[happening](store);
  }, 1e3);
};
