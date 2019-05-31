import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    progressBar: {
    }
  })
);

type AnnouncingProgressBarProps = {
  className?: string
}

const AnnouncingProgressBar: React.FC<AnnouncingProgressBarProps> = (props) => {
  const classes = useStyles();
  const { className: classNameProps } = props;

  return (
    <LinearProgress color="primary" className={classnames(classes.progressBar, classNameProps)} />
  );
}
AnnouncingProgressBar.defaultProps = {
  className: ''
};

export default AnnouncingProgressBar;