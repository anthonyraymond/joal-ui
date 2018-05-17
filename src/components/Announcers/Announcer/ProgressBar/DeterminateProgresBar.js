// @flow
import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import ReactTooltip from 'react-tooltip';
import styles from './styles.css';

type AnnounceProgressBarProps = {
  infoHash: string,
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
    // Since we sync state to props.startAt, state won’t be up-to-date with any props update. (see https://reactjs.org/docs/react-component.html#constructor)
    // We need to update the state ourselves when props are updated
    if (nextProps.startAt !== this.props.startAt || nextProps.maxValue !== this.props.maxValue) {
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
  normalizeInfoHash = (infoHash: string) => btoa(infoHash);

  render() {
    const { maxValue, completed } = this.state;
    const timeUntilNext = maxValue - completed;
    return (
      <div>
        <LinearProgress
          data-tip={`Updating tracker stats in ${timeUntilNext}s`}
          data-for={`nextUpdate${this.normalizeInfoHash(this.props.infoHash)}`}
          className={styles.progressBar}
          mode="determinate"
          max={maxValue}
          value={completed}
        />
        {/*
          TODO: Check that this line does not register a new ReactTooltip every
          second. Because the component is updated by his own state every second as well
        */}
        <ReactTooltip id={`nextUpdate${this.normalizeInfoHash(this.props.infoHash)}`} getContent={[() => `Updating tracker stats in ${timeUntilNext}s`, 1000]} />
      </div>
    );
  }
}

export default DeterminateProgressBar;
