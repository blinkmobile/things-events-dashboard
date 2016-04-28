// https://github.com/blinkmobile/no-polling-example/blob/master/www/bus.js

import Chance from 'chance';

import { eventReceived } from '../redux/modules/events.js';
import {
  TAG_TYPES, getTags, tagReceived, tagRemoved
} from '../redux/modules/tags.js';
import {
  THING_TYPES, getThings, thingReceived, thingRemoved
} from '../redux/modules/things.js';

const chance = new Chance();

// getRandomTag (store: Store) => Map
const getRandomTag = (store) => {
  const tags = getTags(store.getState());
  if (!tags.size) {
    return null;
  }
  return tags.get(chance.pickone(Object.keys(tags.toJS())));
};

// getRandomTag (store: Store) => Map
const getRandomThing = (store) => {
  const things = getThings(store.getState());
  if (!things.size) {
    return null;
  }
  return things.get(chance.pickone(Object.keys(things.toJS())));
};

const NEW_THINGS = {
  assets (store) {
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      name: chance.word(),
      type: 'assets'
    }));
  },

  locations (store) {
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      name: chance.street(),
      type: 'locations'
    }));
  },

  people (store) {
    const firstName = chance.first();
    const surname = chance.last();
    store.dispatch(thingReceived({
      id: '' + (new Date()).valueOf(),
      firstName,
      name: `${chance.prefix()} ${firstName} ${surname}`,
      type: 'people',
      surname
    }));
  }
};

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
    if (!allTagsIds.length) {
      return;
    }
    // iterate over an array (length: 1 - 6) of random tag IDs
    chance.pickset(allTagsIds, chance.d6()).forEach((tagId) => {
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
    const allTags = getTags(store.getState());
    if (allTags.size < 20) {
      store.dispatch(tagReceived({
        id: '' + (new Date()).valueOf(),
        type: chance.pickone(TAG_TYPES)
      }));
    }
  },

  newThing (store) {
    const allThings = getTags(store.getState());
    if (allThings.size < 20) {
      NEW_THINGS[chance.pickone(THING_TYPES)](store);
    }
  },

  removeTag (store) {
    const allTags = getTags(store.getState());
    if (allTags.size >= 20) {
      const allTagsIds = Object.keys(allTags.toJS());
      store.dispatch(tagRemoved(chance.pickone(allTagsIds)));
    }
  },

  removeThing (store) {
    const allThings = getTags(store.getState());
    if (allThings.size >= 20) {
      const allThingsIds = Object.keys(allThings.toJS());
      store.dispatch(thingRemoved(chance.pickone(allThingsIds)));
    }
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
    HAPPENINGS.newEvent(store);
  }, 1e3);
};
