import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';

const styles = () => createStyles({
  icon: {
    stroke: '#2E9AFE'
  }
});

type InfoIconProps = {
  classes: any,
  className?: string
}

const InfoIcon:React.FC<InfoIconProps> = ({ classes, className: classNameProps }) => (
  <BaseIcon classes={{ icon: classes.icon }} className={classNameProps}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="8" />
  </BaseIcon>
);
InfoIcon.defaultProps = {
  className: ''
};

export default withStyles(styles)(InfoIcon);
