// @flow
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

interface ProgressTimerProps {
  position: number,
  total: number
}

interface ProgressTimerState {
  completed: number
}

export class ProgressTimer extends React.Component<ProgressTimerProps, ProgressTimerState> {
  timer?: NodeJS.Timeout | number = undefined

  constructor(props: ProgressTimerProps) {
    super(props);
    const { position } = this.props;

    this.state = {
      completed: position
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.incrementTimeBar(), 1000);
  }

  componentWillUnmount() {
    clearInterval((this.timer as number));
  }

  incrementTimeBar() {
    const { completed } = this.state;
    const { total } = this.props;

    if (completed + 1 >= total) {
      this.setState({ completed: total });
      clearInterval((this.timer as number));
    } else {
      this.setState({ completed: completed + 1 });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  secondToHMS(sec: number): string {
    const h = Math.floor(sec / 3600);
    const m = Math.floor(sec % 3600 / 60);// eslint-disable-line no-mixed-operators
    const s = Math.floor(sec % 3600 % 60);
    const res = (`${(h > 0 ? `${h}:${m < 10 ? '0' : ''}` : '') + m}:${s < 10 ? '0' : ''}${s}`);
    return res || '00:00';
  }

  render() {
    const { completed } = this.state;
    const { total } = this.props;
    return (
      <div>
        <div className="text-right">
          {this.secondToHMS(total - completed)}
        </div>
        <LinearProgress variant="determinate" value={completed} />
      </div>
    );
  }
}

export default ProgressTimer;
