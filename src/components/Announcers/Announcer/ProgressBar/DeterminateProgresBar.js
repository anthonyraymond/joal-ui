// @flow
import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import ReactTooltip from 'react-tooltip';
import styles from './styles.css';

type AnnounceProgressBarProps = {
  startAt: number,
  maxValue: number
};

class DeterminateProgressBar extends Component {
  props: AnnounceProgressBarProps
  state: {
    completed: number,
    maxValue: number
  };
  timer: number

  constructor(props) {
    super(props);

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

  componentWillUnmount() {
    this.cancelTimer();
  }

  cancelTimer() {
    clearInterval(this.timer);
  }

  render() {
    const { maxValue, completed } = this.state;
    const timeUntilNext = maxValue - completed;
    return (
      <div>
        <LinearProgress
          data-tip={`Updating tracker stats in ${timeUntilNext}s`}
          data-for="trackerStatUpdateDelay"
          className={styles.progressBar}
          mode="determinate"
          max={maxValue}
          value={completed}
        />
        {/*
          TODO: Check that this line does not register a new ReactTooltip every
          second. Because the component is updated by his own state every second as well
        */}
        <ReactTooltip id="trackerStatUpdateDelay" getContent={[() => `Updating tracker stats in ${timeUntilNext}s`, 1000]} />
      </div>
    );
  }
}

export default DeterminateProgressBar;
