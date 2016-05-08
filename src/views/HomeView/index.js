import React, { } from 'react';
import { connect } from 'react-redux';

import EventLog from '../../components/EventLog/index.js';
import { Counter } from '../../components/Counter/index.js';
import { FlexLong } from '../../components/FlexLong/index.js';
import { FlexShort } from '../../components/FlexShort/index.js';
import {
  countThingsAssets, countThingsLocations, countThingsPeople
} from '../../redux/modules/things.js';
import classes from './styles.css';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  render () {
    const {
      countThingsAssets, countThingsLocations, countThingsPeople
    } = this.props;
    return (
      <div className={classes.self}>
        <FlexLong>
          <FlexShort className={classes.counters}>
            <Counter className={classes.counter} label='Assets' value={countThingsAssets} />
            <Counter className={classes.counter} label='Locations' value={countThingsLocations} />
            <Counter className={classes.counter} label='People' value={countThingsPeople} />
            <Counter className={classes.counter} label='Tags' value={3} />
          </FlexShort>
          <EventLog />
        </FlexLong>
      </div>
    );
  }
}

HomeView.propTypes = {

};

const mapStateToProps = (state) => ({
  countThingsAssets: countThingsAssets(state),
  countThingsLocations: countThingsLocations(state),
  countThingsPeople: countThingsPeople(state)
});
export default connect(mapStateToProps, {})(HomeView);
