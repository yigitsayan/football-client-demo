import React from 'react';
import Container from '@material-ui/core/Container';
import { StoreProvider } from 'easy-peasy';

import store from './store';

import TeamPage from './components/TeamPage';

const App = () => (
  <StoreProvider store={store}>
    <Container>
      <TeamPage />
    </Container>
  </StoreProvider>
);

export default App;
