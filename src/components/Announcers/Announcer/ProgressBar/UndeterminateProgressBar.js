// @flow
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => ({
  progressBar: {
    height: 7
  }
});

type Props = {
  classes: {},
  className?: string
}

const UndeterminateProgressBar = ({ classes, className: classNameProps }: Props) => (
  <LinearProgress className={classnames(classes.progressBar, classNameProps)} />
);
UndeterminateProgressBar.defaultProps = {
  className: ''
};

export default withStyles(styles)(UndeterminateProgressBar);
