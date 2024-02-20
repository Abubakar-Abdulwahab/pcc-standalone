import React from 'react';
// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import UserTable from '../../components/_dashboard/general-app/UserTable';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="User Page | Possap">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>


          <Grid item xs={12} lg={12}>
            <UserTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
