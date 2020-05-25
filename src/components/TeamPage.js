import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import TeamList from './TeamList';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  headerText: {
    color: '#1D3557',
  },
  loadingIcon: {
    marginTop: '40%',
  },
}));

const TeamPage = () => {
  const styles = useStyles();
  const fetchTeams = useStoreActions(
    actions => actions.teams.fetchItems
  );
  const teamDataInStore = useStoreState(state => state.teams.items);
  const isFetching = useStoreState(state => state.teams.loading);

  useEffect(() => {
    fetchTeams(2019);
  }, [fetchTeams]);

  return (
    <div className={styles.root}>
      <Grid container>
        <Grid item xs={12}>
          {isFetching && (
            <CircularProgress className={styles.loadingIcon} />
          )}
          {!isFetching && teamDataInStore.length > 0 && (
            <div>
              <h2 className={styles.headerText}>Serie A</h2>
              <TeamList teams={teamDataInStore} />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamPage;
