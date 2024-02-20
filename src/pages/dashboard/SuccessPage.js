import React from 'react'
import { motion } from 'framer-motion';
// material
import { styled } from '@mui/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';
import { PageNotFoundIllustration, SentIcon } from '../../assets';
import { useRouteContext } from '../../contexts/RouteContext';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ---------------------------------------------------------------------- 

export default function SuccessPage() {
  const {dispatch, state}  = useRouteContext()
  const handleNavigate = () =>{
    dispatch({
      type:"NAVIGATE",
      payload:"/"
    })
  }
  return (
    <RootStyle title="Success Page | Possap">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Request Generated Successfully
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              {state?.data || ""}
            </Typography>

            <motion.div variants={varBounceIn}>
              <SentIcon sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
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
