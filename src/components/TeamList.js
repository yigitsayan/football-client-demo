/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() => ({
  listContainer: {
    width: 200,
    margin: '0 auto',
  },
  listItem: {
    justifyContent: 'center',
    color: '#457B9D',
  },
  teamName: {
    flex: 7,
  },
  teamLogo: {
    flex: 1,
  },
}));


const TeamList = props => {
  const styles = useStyles();
  return (
    <List component="ul" className={styles.listContainer}>
      {props.teams.map(team => (
        <ListItem
          onMouseEnter={e => props.onMouseEnter(e, team.id)}
          onMouseLeave={props.onMouseLeave}
          key={team.id}
          className={styles.listItem}
        >
          <div className={styles.teamName}>{team.name}</div>
          <img className={styles.teamLogo} alt="teamLogo" src={team.crestUrl} />
        </ListItem>
      ))}
    </List>
  );
};

export default TeamList;
