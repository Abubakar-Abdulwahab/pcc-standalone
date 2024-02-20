import React from 'react'

// material
import { styled } from '@mui/styles';
// components
import Logo from '../components/Logo';
import { useRouteContext } from '../contexts/RouteContext';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const { dispatch } = useRouteContext();

  const handlePath = () => {
    dispatch({ type: 'NAVIGATE', payload: "/" });
  };
  return (
    <>
      <HeaderStyle>
        <Box sx={{cursor: 'pointer'}} onClick={handlePath}>
          <Logo />
        </Box>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
