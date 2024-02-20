import React from 'react';
import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';
import { useRouteContext } from '../contexts/RouteContext';
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth();
  if (typeof user === 'undefined') {
    <Navigate to={PATH_AUTH.login} />;
  }
  const role = user?.userType;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();
  const {dispatch} = useRouteContext()
 

  const handlePath = (to) => {
    dispatch({ type: 'NAVIGATE', payload: to });
  };

 
  if (currentRole !== 'Officer') {
    return (
      <Container sx={{mt: 5}}>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>

        <Button onClick={() => handlePath("/")} sx={{mt: 5}} variant="contained">Back</Button>

      </Container>
    );
  }

  return <>{children}</>;
}
