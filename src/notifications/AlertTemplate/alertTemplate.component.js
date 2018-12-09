import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from './icons/InfoIcon';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import CloseIcon from './icons/CloseIcon';

const styles = theme => ({
  alert: {
    // boxShadow: '0 8px 12px 0 rgba(0,0,0,0.3)',
    backgroundColor: `${theme.palette.type === 'dark' ? '#333' : '#fff'}`,
    borderRadius: 3,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    fontSize: 11,
    width: 350,
    [theme.breakpoints.down('xs')]: {
      width: '75vw'
    },
    boxSizing: 'border-box',
    position: 'relative'
  },
  message: {
    color: `${theme.palette.type === 'dark' ? '#fff' : '#333'}`,
    paddingRight: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  statusIcon: {
    marginRight: 15
  },
  closeButton: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    border: 'none',
    backgroundColor: theme.palette.type === 'dark' ? '#444' : '#f3f3f3',
    cursor: 'pointer',
  },
  closeIconOverride: {
    stroke: theme.palette.type === 'dark' ? '#BBB' : '#000'
  }
});

type Props = {
  classes: {},
  classNameProps: {},
  style: {},
  message: string,
  options: {},
  close: () => void
}

const AlertTemplate = ({
  classes, message, options, style, close
}: Props) => (
  // the style contains only the margin given as offset
  // options contains all alert given options
  // message is the alert message...
  // close is a function that closes the alert
  <div className={classes.alert} style={style}>
    {options.type === 'success' && <SuccessIcon className={classes.statusIcon} />}
    {options.type === 'info' && <InfoIcon className={classes.statusIcon} />}
    {options.type === 'error' && <ErrorIcon className={classes.statusIcon} />}
    <span className={classes.message} style={{ flex: 2 }}>{message}</span>
    <button className={classes.closeButton} onClick={close} type="button">
      <CloseIcon classes={{ icon: classes.closeIconOverride }} />
    </button>
  </div>
);

export default withStyles(styles)(AlertTemplate);
