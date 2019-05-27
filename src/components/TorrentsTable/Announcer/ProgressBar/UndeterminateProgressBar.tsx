// @flow
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => createStyles({
  progressBar: {
  }
});

type UndeterminateProgressBarProps = {
  classes: any,
  className?: string,
  color: 'primary' | 'secondary'
}

const UndeterminateProgressBar: React.FC<UndeterminateProgressBarProps> = ({ classes, className: classNameProps, color }) => (
  <LinearProgress color={color} className={classnames(classes.progressBar, classNameProps)} />
);
UndeterminateProgressBar.defaultProps = {
  className: ''
};

export default withStyles(styles)(UndeterminateProgressBar);
