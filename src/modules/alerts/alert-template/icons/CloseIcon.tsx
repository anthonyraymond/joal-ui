import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';

const styles = () => createStyles({
  icon: {
    stroke: '#000000'
  }
});

type CloseIconProps = {
  classes: any,
  className?: string
}

const CloseIcon: React.FC<CloseIconProps> = ({ classes, className: classNameProps }) => (
  <BaseIcon classes={{ icon: classes.icon }} className={classNameProps}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
);
CloseIcon.defaultProps = {
  className: ''
};

export default withStyles(styles)(CloseIcon);
