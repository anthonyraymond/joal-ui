import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';
import classnames from 'classnames';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    icon: {
      stroke: '#31B404'
    }
  })
);

type SuccessIconProps = {
  className?: string
}

const SuccessIcon:React.FC<SuccessIconProps> = (props) => {
  const classes = useStyles();
  const { className: classNameProps } = props;

  return (
    <BaseIcon className={classnames(classes.icon, classNameProps)}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </BaseIcon>
  );
}
SuccessIcon.defaultProps = {
  className: ''
};

export default SuccessIcon;
