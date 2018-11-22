// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => ({
  dropzone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    zIndex: 16777270,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(156, 155, 155, 0.86)',
    textAlign: 'center',
    color: 'rgba(130, 130, 130, 0.75)'
  },
  icon: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    transform: 'translate(0, -50%)'
  }
});


class TorrentDropZone extends Component {
  props: {
    classes: {},
    onDrop: () => void,
    children: Children
  }

  constructor() {
    super();
    this.state = {
      dropzoneActive: false
    };
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(accepted, rejected) {
    const { onDrop } = this.props;

    this.setState({
      dropzoneActive: false
    });
    onDrop(accepted, rejected);
  }

  render() {
    const { dropzoneActive } = this.state;
    const { classes, children } = this.props;

    return (
      <Dropzone
        disableClick
        className={classes.dropzone}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        <div>
          {children}
          {dropzoneActive && (
            <div className={classes.overlay}>
              <div>
                <i className={classnames(classes.icon, 'fa', 'fa-download', 'fa-5x')} aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </Dropzone>
    );
  }
}

export default withStyles(styles)(TorrentDropZone);
