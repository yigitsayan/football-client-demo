import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import TeamList from './TeamList';
import TeamDetailModal from './TeamDetailModal';

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
  const [currentTarget, setCurrentTarget] = useState(null);
  const [currentTeamDetail, setCurrentTeamDetail] = useState(null);
  const fetchTeams = useStoreActions(
    actions => actions.teams.fetchItems
  );
  const fetchTeamDetail = useStoreActions(
    actions => actions.teamDetail.fetchItems
  );
  const teamDataInStore = useStoreState(state => state.teams.items);
  const isFetching = useStoreState(state => state.teams.loading);
  const teamDetails = useStoreState(state => state.teamDetail.items);
  const currentSelectedTeam = useStoreState(state => state.teamDetail.selectedTeam);

  useEffect(() => {
    fetchTeams(2019);
  }, [fetchTeams]);

  useEffect(() => {
    const isTeamDetailExist = teamDetails.find(team => team.id === currentSelectedTeam);
    setCurrentTeamDetail(isTeamDetailExist);
  }, [teamDetails, currentSelectedTeam]);

  const handlePopOver = (event, teamId) => {
    const isTeamDetailExist = teamDetails.find(team => team.id === teamId);
    if (isTeamDetailExist) {
      setCurrentTeamDetail(isTeamDetailExist);
    } else {
      fetchTeamDetail(teamId);
    }
    setCurrentTarget(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setCurrentTarget(null);
  };

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
              <TeamList onMouseEnter={handlePopOver} onMouseLeave={handlePopOverClose} teams={teamDataInStore} />
            </div>
          )}
        </Grid>
      </Grid>
      <TeamDetailModal teamDetail={currentTeamDetail} currentTarget={currentTarget} onModalClose={handlePopOverClose} />
    </div>
  );
};

export default TeamPage;
