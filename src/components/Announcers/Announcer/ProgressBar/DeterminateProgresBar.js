// @flow
import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactTooltip from 'react-tooltip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => ({
  progressBar: {
    height: 7
  }
});

type AnnounceProgressBarProps = {
  classes: {},
  className?: string,
  infoHash: string,
  startAt: number,
  maxValue: number
};

class DeterminateProgressBar extends Component {
  props: AnnounceProgressBarProps;

  state: {
    completed: number,
    maxValue: number
  };

  timer: number

  constructor(props) {
    super(props);
    this.cancelTimer = this.cancelTimer.bind(this);

    this.state = {
      completed: props.startAt,
      maxValue: props.maxValue
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { maxValue, completed } = this.state;
      const newValue = completed + 1;
      if (newValue > maxValue) {
        this.setState({ completed: maxValue });
        this.cancelTimer();
      } else {
        this.setState({ completed: newValue });
      }
    }, 1000);
  }

  // TODO : update to static getDerivedStateFromProps(nextProps, prevState) after migrating to react 17
  componentWillReceiveProps(nextProps) {
    const { startAt, maxValue } = this.props;
    // Since we sync state to props.startAt, state won’t be up-to-date with any props update. (see https://reactjs.org/docs/react-component.html#constructor)
    // We need to update the state ourselves when props are updated
    if (nextProps.startAt !== startAt || nextProps.maxValue !== maxValue) {
      this.setState({
        completed: nextProps.startAt,
        maxValue: nextProps.maxValue
      });
    }
  }

  componentWillUnmount() {
    this.cancelTimer();
  }

  cancelTimer() {
    clearInterval(this.timer);
  }

  // The ReactTooltip does not support some special character, we need to create an infoHash with normal chars only
  normaliseInfoHash = (infoHash: string) => btoa(infoHash);

  normaliseProgressPercent = (value, maximum) => (value) * 100 / maximum;

  render() {
    const { className: classNameProps, classes, infoHash } = this.props;
    const { maxValue, completed } = this.state;
    const timeUntilNext = maxValue - completed;
    return (
      <div>
        <LinearProgress
          className={classnames(classes.progressBar, classNameProps)}
          variant="determinate"
          data-tip={`Updating tracker stats in ${timeUntilNext}s`}
          data-for={`nextUpdate${this.normaliseInfoHash(infoHash)}`}
          value={this.normaliseProgressPercent(completed, maxValue)}
        />
        {/*
          TODO: Check that this line does not register a new ReactTooltip every
          second. Because the component is updated by his own state every second as well
        */}
        <ReactTooltip id={`nextUpdate${this.normaliseInfoHash(infoHash)}`} getContent={[() => `Updating tracker stats in ${timeUntilNext}s`, 1000]} />
      </div>
    );
  }
}
DeterminateProgressBar.defaultProps = {
  className: ''
};

export default withStyles(styles)(DeterminateProgressBar);
