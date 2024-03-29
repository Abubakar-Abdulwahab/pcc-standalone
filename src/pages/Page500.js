import React from 'react'
import { styled } from '@mui/styles';
// material
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="500 Internal Server Error | Possap">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>There was an error, please try again later.</Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" >
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
