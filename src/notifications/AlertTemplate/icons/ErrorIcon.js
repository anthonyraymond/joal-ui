import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';

const styles = () => ({
  icon: {
    stroke: '#FF0040'
  }
});

type Props = {
  classes: {},
  className?: string
}

const ErrorIcon = ({ classes, className: classNameProps }: Props) => (
  <BaseIcon classes={{ icon: classes.icon }} className={classNameProps}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12" y2="16" />
  </BaseIcon>
);
ErrorIcon.defaultProps = {
  className: ''
};

export default withStyles(styles)(ErrorIcon);
