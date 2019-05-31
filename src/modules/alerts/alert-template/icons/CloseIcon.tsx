import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';
import classnames from 'classnames';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    icon: {
      stroke: '#000000'
    }
  })
);

type CloseIconProps = {
  className?: string
}

const CloseIcon: React.FC<CloseIconProps> = (props) => {
  const classes = useStyles();
  const { className: classNameProps } = props;

  return (
    <BaseIcon className={classnames(classes.icon, classNameProps)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseIcon>
  );
}
CloseIcon.defaultProps = {
  className: ''
};

export default CloseIcon;
