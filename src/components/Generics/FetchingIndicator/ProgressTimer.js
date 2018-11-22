// @flow
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

export class ProgressTimer extends React.Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }

  constructor(props) {
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
    clearInterval(this.timer);
  }

  incrementTimeBar() {
    const { completed } = this.state;
    const { total } = this.props;

    if (completed + 1 >= total) {
      this.setState({ completed: total });
      clearInterval(this.timer);
    } else {
      this.setState({ completed: completed + 1 });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  secondToHMS(sec) {
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
        <LinearProgress variant="determinate" value={completed} max={total} />
      </div>
    );
  }
}

export default ProgressTimer;
