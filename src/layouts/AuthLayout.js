import React from 'react'
import PropTypes from 'prop-types';

// material
import { styled } from '@mui/styles';
import { Box, Typography } from '@mui/material';
// components
import Logo from '../components/Logo';
//
import { MHidden } from '../components/@material-extend';
import { useRouteContext } from '../contexts/RouteContext';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {
  const { dispatch } = useRouteContext();

  const handlePath = () => {
    dispatch({ type: 'NAVIGATE', payload: "/" });
  };
  return (
    <HeaderStyle>
      <Box sx={{cursor: 'pointer'}} onClick={handlePath}>
        <Logo />
      </Box>

      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
