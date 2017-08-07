// @flow
import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export class ProgressTimer extends React.Component {
  static propTypes = {
    position: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired
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
    if (this.state.completed + 1 >= this.props.total) {
      this.setState({ completed: this.props.total });
      clearInterval(this.timer);
    } else {
      this.setState({ completed: this.state.completed + 1 });
    }
  }

  secondToHMS(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor(sec % 3600 / 60);// eslint-disable-line no-mixed-operators
    const s = Math.floor(sec % 3600 % 60);
    const res = ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    return res ? res : '00:00';
  }

  render() {
    return (
      <div>
        <div className="text-right">
          {this.secondToHMS(this.props.total - this.state.completed)}
        </div>
        <LinearProgress mode="determinate" value={this.state.completed} max={this.props.total} />
      </div>
    );
  }
}

export default ProgressTimer;
