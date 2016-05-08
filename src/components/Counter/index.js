import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import classes from './styles.css';

const TRANSITION_PROPS = {
  transitionAppear: false,
  transitionEnterTimeout: 1e3,
  transitionLeaveTimeout: 1e3,
  transitionName: {
    enter: classes.valueEnter,
    enterActive: classes.valueEnterActive,
    leave: classes.valueLeave,
    leaveActive: classes.valueLeaveActive
  }
};

export const Counter = ({ className, label, value }) => (
  <div className={classnames(classes.self, className)}>
    <label className={classes.label}>{label}</label>
    <ReactCSSTransitionGroup {...TRANSITION_PROPS}>
      <span className={classes.value}>{value}</span>
    </ReactCSSTransitionGroup>
  </div>
);

Counter.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number
};
