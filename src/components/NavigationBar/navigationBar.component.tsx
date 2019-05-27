// @flow
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import LogsIcon from '@material-ui/icons/Sms';

type NavigationBarProps = {
  currentPath: string,
  onClickDashboard: () => void,
  onClickSettings: () => void,
  onClickLogs: () => void
};

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const {
    currentPath,
    onClickDashboard,
    onClickSettings,
    onClickLogs
  } = props;

  const whichIndex = (whichPath: string) => {
    if (whichPath === '/') {
      return 0;
    }
    if (whichPath === '/settings') {
      return 1;
    }
    return 2;
  };

  const onChangeTab = (event: React.ChangeEvent<{}>, index: number) => {
    if (index === 0) onClickDashboard();
    else if (index === 1) onClickSettings();
    else if (index === 2) onClickLogs();
  };

  return (
    <Paper elevation={1}>
      <BottomNavigation
        showLabels
        value={whichIndex(currentPath)}
        onChange={onChangeTab}
      >
        <BottomNavigationAction
          label="dashboard"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="configuration"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction
          label="history"
          icon={<LogsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavigationBar;
