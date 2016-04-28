import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import { getDereferencedEvents } from '../../redux/modules/events.js';
import { EventLogItem } from '../EventLogItem/index.js';

import classes from './styles.css';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EventLog extends React.Component {
  render () {
    const { className, events } = this.props;
    if (!events || !events.size) {
      return (
        <div className={classnames(className, classes.self)}>
          <p>No events to display yet</p>
        </div>
      );
    }
    return (
      <ul className={classnames(className, classes.self)}>
      {events.reverse().map((event, index) => (
        <EventLogItem key={index} event={event} />
      ))}
      </ul>
    );
  }
}

EventLog.propTypes = {
  className: PropTypes.string,
  events: PropTypes.instanceOf(List).isRequired
};

const mapStateToProps = (state) => ({
  events: getDereferencedEvents(state)
});
export default connect(mapStateToProps, {})(EventLog);
