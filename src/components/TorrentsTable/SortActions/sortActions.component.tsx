import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NameIcon from '@material-ui/icons/SortByAlpha';
import LeechersIcon from '@material-ui/icons/CloudDownloadOutlined';
import SeedersIcon from '@material-ui/icons/CloudUploadOutlined';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

const styles = () => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 144
  },
  toggleButton: {
    height: 48,
  }
});

type Props = {
  classes: {},
  sortProperty: string,
  sortDirection: string,
  onSortChange: (sortProperty: string, sortDirection: string) => void
};


const SortActions = (props: Props) => {
  const {
    classes, sortProperty, sortDirection, onSortChange
  } = props;

  const handleSortChange = (userSelectionSortProperty) => {
    // The value is null when the user clic one more time on the same tile
    if (sortProperty !== userSelectionSortProperty && userSelectionSortProperty !== null) {
      onSortChange(userSelectionSortProperty, 'asc');
      return;
    }

    // User clicked the same property once again
    if (sortDirection === 'asc') {
      onSortChange(sortProperty, 'desc');
      return;
    }
    if (sortDirection === 'desc') {
      onSortChange('', 'asc');
      return; // eslint-disable-line no-useless-return
    }
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup selected={sortProperty !== ''} value={sortProperty} exclusive onChange={(e, v) => handleSortChange(v)}>
            <Tooltip title="Sort by name" selected={sortProperty} placement="top">
              <ToggleButton selected={sortProperty === 'torrentName'} className={classes.toggleButton} value="torrentName">
                <NameIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Sort by leechers" placement="top">
              <ToggleButton selected={sortProperty === 'lastKnownLeechers'} className={classes.toggleButton} value="lastKnownLeechers">
                <LeechersIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Sort by seeders" placement="top">
              <ToggleButton selected={sortProperty === 'lastKnownSeeders'} className={classes.toggleButton} value="lastKnownSeeders">
                <SeedersIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SortActions);
