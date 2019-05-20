// @flow
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => ({
  progressBar: {
  }
});

type Props = {
  classes: {},
  className?: string,
  color: 'primary' | 'secondary'
}

const UndeterminateProgressBar = ({ classes, className: classNameProps, color }: Props) => (
  <LinearProgress color={color} className={classnames(classes.progressBar, classNameProps)} />
);
UndeterminateProgressBar.defaultProps = {
  className: ''
};

export default withStyles(styles)(UndeterminateProgressBar);
