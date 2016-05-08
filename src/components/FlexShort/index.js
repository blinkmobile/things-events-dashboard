import React, { PropTypes } from 'react';
import classnames from 'classnames';

import classes from './styles.css';

export const FlexShort = ({ className, children }) => (
  <div className={classnames(classes.self, className)}>
    {children}
  </div>
);

FlexShort.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
