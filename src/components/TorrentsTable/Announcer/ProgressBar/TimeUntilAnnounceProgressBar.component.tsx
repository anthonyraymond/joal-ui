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

type TimeUntilAnnounceProgressBarProps = {
  className?: string,
  lastAnnouncedDate: string,
  interval: number
}

const TimeUntilAnnounceProgressBar: React.FC<TimeUntilAnnounceProgressBarProps> = (props) => {
  const classes = useStyles();
  const { className: classNameProps } = props;
  
  const [ percent, setPercent ] = React.useState(Math.round((Date.now() - Date.parse(props.lastAnnouncedDate)) / 10 / props.interval));

  React.useEffect(() => {
    const intervalId = setInterval(
        () =>setPercent(p => Math.min(p + 1, 100))
        , props.interval * 1000
    );

    return () => clearInterval(intervalId)
  }, [ props.lastAnnouncedDate, props.interval ])

  return (
    <LinearProgress variant="determinate" value={percent} className={classnames(classes.progressBar, classNameProps)} />
  );
}
TimeUntilAnnounceProgressBar.defaultProps = {
  className: ''
};

export default TimeUntilAnnounceProgressBar;
