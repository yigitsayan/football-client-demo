import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';

// TODO we will move this section to env file
const apiUrl = 'https://api.football-data.org/v2';
const apiToken = 'xxxxxxxxxxxxx';
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
};

const store = createStore(initialState);

export default store;
