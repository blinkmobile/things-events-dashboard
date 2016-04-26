// https://github.com/blinkmobile/no-polling-example/blob/master/www/bus.js

import { eventReceived } from '../redux/modules/events.js';

const randomEvent = () => ({
  id: (new Date()).valueOf()
});

export const syncStoreWithBus = (store) => {
  setInterval(() => {
    store.dispatch(eventReceived(randomEvent()));
  }, 1e3);
};
