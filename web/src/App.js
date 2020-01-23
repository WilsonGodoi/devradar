import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.scss';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Material-UI
import Grid from '@material-ui/core/Grid';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    listDevs();
  }, []);

  async function listDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={4} md={3}>
          <DevForm listDevs={listDevs} />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <DevItem devs={devs} listDevs={listDevs} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
