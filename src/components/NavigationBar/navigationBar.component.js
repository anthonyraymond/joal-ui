// @flow
import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LogsIcon from 'material-ui/svg-icons/notification/sms';

type Props = {
  currentPath: string,
  onClickDashboard: () => void,
  onClickSettings: () => void,
  onClickLogs: () => void
};

const NavigationBar = (props: Props) => {
  const {
    currentPath,
    onClickDashboard,
    onClickSettings,
    onClickLogs
  } = props;

  const whichIndex = (whichPath) => {
    if (whichPath === '/') {
      return 0;
    } else if (whichPath === '/settings') {
      return 1;
    }
    return 2;
  };

  return (
    <Paper zDepth={1}>
      <BottomNavigation selectedIndex={whichIndex(currentPath)}>
        <BottomNavigationItem
          label="dashboard"
          icon={<DashboardIcon />}
          onTouchTap={onClickDashboard}
        />
        <BottomNavigationItem
          label="configuration"
          icon={<SettingsIcon />}
          onTouchTap={onClickSettings}
        />
        <BottomNavigationItem
          label="history"
          icon={<LogsIcon />}
          onTouchTap={onClickLogs}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationBar;
