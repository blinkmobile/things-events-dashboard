import React, { } from 'react';
import { connect } from 'react-redux';

import EventLog from '../../components/EventLog/index.js';
import classes from './styles.css';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  render () {
    return (
      <div className={classes.self}>
        <EventLog />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(HomeView);
