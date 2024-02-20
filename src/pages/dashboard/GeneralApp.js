import React from 'react';
// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import RequestTable from '../../components/_dashboard/general-app/RequestTable';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="General: App | Possap">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>


          <Grid item xs={12} lg={12}>
            <RequestTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
