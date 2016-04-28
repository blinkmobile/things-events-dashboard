import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classnames from 'classnames';

import { TAG_TYPES } from '../../redux/modules/tags.js';
import classes from './styles.css';

const ENGLISH_TYPES = {
  // tag types
  beacons: 'Beacons',
  rfidreaders: 'RFID Readers',
  rfids: 'RFIDs',
  // thing types
  assets: 'Assets',
  locations: 'Locations',
  people: 'People'
};

// mapsToNames (list: List<Map>) => List<String>
const mapsToNames = (list = new List()) => list.map((map) => map.get('name'));

// listToEnglish (list: List<String>) => String
const listToEnglish = (list) => {
  switch (list.size) {
    case 0:
      return '';
    case 1:
      return list.first();
    case 2:
      return list.join(' and ');
    default:
      return [
        list.butLast().join(', '),
        list.last()
      ].join(', and '); // Oxford comma
  }
};

// eventTagsToEnglish (event: Map) => String
const eventTagsToEnglish = (event) => {
  return TAG_TYPES.map((type) => {
    const links = event.get(type);
    return {
      type,
      value: links && links.size || 0
    };
  })
    .filter(({ value }) => value > 0)
    .map(({ type, value }) => `${ENGLISH_TYPES[type]}: ${value}`)
    .join('; ') || '';
};

// eventToEnglish (event: Map) => String
const eventToEnglish = (event) => {
  const assets = listToEnglish(mapsToNames(event.get('assets')));
  const locations = listToEnglish(mapsToNames(event.get('locations')));
  const people = listToEnglish(mapsToNames(event.get('people')));
  if (assets && locations && people) {
    return `${people} seen with ${assets} near ${locations}`;
  }
  if (assets && locations || people && locations) {
    return `${assets || people} seen near ${locations}`;
  }
  if (assets && people) {
    return `${people} seen with ${assets}`;
  }
  if (assets || people) {
    return `${assets || people} seen`;
  }
  if (locations) {
    return `${eventTagsToEnglish(event)} seen near ${locations}`;
  }
  return eventTagsToEnglish(event);
};

export const EventLogItem = ({ className, event }) => {
  return (
    <li className={classnames(className, classes.self)}>
      <span className={classes.message}>{eventToEnglish(event)}</span>
    </li>
  );
};

EventLogItem.propTypes = {
  className: PropTypes.string,
  event: PropTypes.instanceOf(Map)
};
