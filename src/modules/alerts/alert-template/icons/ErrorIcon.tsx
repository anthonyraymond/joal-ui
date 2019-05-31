import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseIcon from './BaseIcon';
import classnames from 'classnames';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    icon: {
      stroke: '#FF0040'
    }
  })
);

type ErrorIconProps = {
  className?: string
}

const ErrorIcon: React.FC<ErrorIconProps> = (props) => {
  const classes = useStyles();
  const { className: classNameProps } = props;

  return (
    <BaseIcon className={classnames(classes.icon, classNameProps)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </BaseIcon>
  );
}
ErrorIcon.defaultProps = {
  className: ''
};

export default ErrorIcon;
