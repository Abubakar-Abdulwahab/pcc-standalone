import React, { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ICCRequestForm from '../../components/_dashboard/requests/ICCRequestForm';
import { useRouteContext } from '../../contexts/RouteContext';

// ----------------------------------------------------------------------

export default function ICCRequest() {
  const { themeStretch } = useSettings();
  const {  state } = useRouteContext();

  return (
    <Page title="ICC: New ICC Request | POSSAP">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create Character Certificate Request"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Immigrant Module', },
            { name: 'New Request' }
          ]}
        />

        <ICCRequestForm userData={state.data} />
      </Container>
    </Page>
  );
}
