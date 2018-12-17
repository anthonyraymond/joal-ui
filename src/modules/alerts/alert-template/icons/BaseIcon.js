import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  icon: {
    stroke: 'black'
  }
});

type Props = {
  classes: {},
  className?: string,
  children: {}
}

const BaseIcon = ({
  classes, className: classNameProps, children
}: Props) => (
  <svg
    className={classnames(classes.icon, classNameProps)}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ minWidth: 24 }}
  >
    {children}
  </svg>
);
BaseIcon.defaultProps = {
  className: ''
};

export default withStyles(styles)(BaseIcon);