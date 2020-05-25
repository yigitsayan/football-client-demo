/* eslint-disable react/prop-types */
import React from 'react';
import { useStoreState } from 'easy-peasy';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  popover: {
    pointerEvents: 'none',
  },
  teamDetailContainer: {
    width: '300px',
    backgroundColor: '#457B9D',
    color: '#ffffff',
    fontSize: 18,
    padding: 20,
    display: 'flex',
  },
  teamInfo: {
    width: '100%',
    display: 'flex',
    marginBottom: 10,
  },
  infoLabel: {
    flex: 2,
    marginRight: 10,
    textAlign: 'right',
  },
  infoValue: {
    flex: 2,
  },
});

const TeamDetailModal = props => {
  const styles = useStyles();
  const isLoading = useStoreState(state => state.teamDetail.loading);
  const { teamDetail, currentTarget } = props;
  return (
    <Popover
      id="mouse-over-popover"
      className={styles.popover}
      open={currentTarget !== null}
      anchorEl={currentTarget}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      disableRestoreFocus
    >
      <div className={styles.teamDetailContainer}>
        {isLoading && (
          <CircularProgress />
        )}
        {!isLoading && teamDetail && (
          <div>
            <div className={styles.teamInfo}>
              <div className={styles.infoLabel}>Name:</div>
              <div className={styles.infoValue}>{teamDetail.name}</div>
            </div>
            <div className={styles.teamInfo}>
              <div className={styles.infoLabel}>Short Name:</div>
              <div className={styles.infoValue}>{teamDetail.shortName}</div>
            </div>
            <div className={styles.teamInfo}>
              <div className={styles.infoLabel}>Statium:</div>
              <div className={styles.infoValue}>{teamDetail.venue}</div>
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default TeamDetailModal;
