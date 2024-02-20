import React from 'react'
import { motion } from 'framer-motion';

// material
import { styled } from '@mui/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { PageNotFoundIllustration } from '../assets';
import { useRouteContext } from '../contexts/RouteContext';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ---------------------------------------------------------------------- 

export default function Page404() {
  const {dispatch}  = useRouteContext()
  const handleNavigate = () =>{
    dispatch({
      type:"NAVIGATE",
      payload:"/"
    })
  }
  return (
    <RootStyle title="404 Page Not Found | Possap">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for.
            </Typography>

            <motion.div variants={varBounceIn}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </motion.div>

            <Button   size="large" variant="contained" onClick={handleNavigate}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
