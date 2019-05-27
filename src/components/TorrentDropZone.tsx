import React, { ReactNode } from 'react';
import { useDropzone } from 'react-dropzone'
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = () => createStyles({
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
    color: 'rgba(130, 130, 130, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

interface TorrentDropZoneProps {
  classes: any,
  onDrop: (acceptedFiles: Array<File>, rejectedFiles:Array<File>) => void,
  children: ReactNode,
}

const TorrentDropZone: React.FC<TorrentDropZoneProps> = (props) => {
  const { classes, children } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted, rejected) => props.onDrop(accepted, rejected),
    noClick: true,
    noKeyboard: true,
  })

  return (
    <div {...getRootProps()} className={classes.dropzone}>
      <input {...getInputProps()} />
      {children}
      {isDragActive && (
        <div className={classes.overlay}>
          <i className={classnames('fa', 'fa-download', 'fa-5x')} aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(TorrentDropZone);
