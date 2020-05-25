import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';

// TODO we will move this section to env file
const apiUrl = process.env.REACT_APP_API_URL;
const apiToken = process.env.REACT_APP_API_TOKEN;
const config = {
  headers: {
    'X-Auth-Token': apiToken,
  },
};

const initialState = {
  teams: {
    items: [],
    loading: false,
    addItems: action((state, payload) => {
      state.items = payload;
    }),
    fetchingItems: action(state => {
      state.loading = true;
    }),
    fetchingItemsDone: action(state => {
      state.loading = false;
    }),
    fetchItems: thunk(async (actions, competitionId) => {
      const url = `${apiUrl}/competitions/${competitionId}/teams`;
      actions.fetchingItems();
      try {
        const result = await axios.get(url, config);
        actions.addItems(result.data.teams);
        actions.fetchingItemsDone();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }),
  },
  teamDetail: {
    items: [],
    selectedTeam: null,
    loading: false,
    addSelectedTeam: action((state, teamId) => {
      state.selectedTeam = teamId;
    }),
    addItems: action((state, payload) => {
      state.items.push(payload);
    }),
    fetchingItems: action(state => {
      state.loading = true;
    }),
    fetchingItemsDone: action(state => {
      state.loading = false;
    }),
    fetchItems: thunk(async (actions, teamId) => {
      const url = `${apiUrl}/teams/${teamId}`;
      actions.fetchingItems();
      try {
        const result = await axios.get(url, config);
        actions.addItems(result.data);
        actions.addSelectedTeam(teamId);
        actions.fetchingItemsDone();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }),
  },
};

const store = createStore(initialState);

export default store;
