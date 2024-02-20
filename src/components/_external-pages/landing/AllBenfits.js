import React from 'react'
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@mui/styles';
import { Box, Grid, Card, Stack, Button, Container, Typography, alpha } from '@mui/material';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const BENEFITS = ['Multiple Payment Channels', 'Convenience and Ease', 'Payment Transaction Records'];
const BENEFITTEXT = [
  'Payments can be made against an invoice at any bank branch, mobile banking, POS or online with debit cards (MasterCard, Visa, Verve)',
  'Request and pay for police specialized services online at your convenience. You can now access police specialized services from the comfort of your home, office or on the go.',
  'View your request andpayment history in one place.'
];
const BENEFITICONS = ['/static/home/paymentCards.svg', '/static/home/laptopMobile.svg', '/static/home/cardTimer.svg'];
const PLANS = [...Array(3)].map((_, index) => ({
  license: BENEFITS[index],
  commons: [BENEFITTEXT[index]],
  icons: [BENEFITICONS[index]]
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  cardIndex: PropTypes.number,
  plan: PropTypes.shape({
    license: PropTypes.any,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string)
  })
};

function PlanCard({ plan, cardIndex }) {
  const theme = useTheme();
  const { license, commons, icons } = plan;

  const isLight = theme.palette.mode === 'light';

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.12)}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`
        })
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="h4">{license}</Typography>
        </div>

        {cardIndex === 0 ? (
          <Box component="img" src={icons[0]} sx={{ width: 40, height: 40 }} />
        ) : (
          <Stack direction="row" spacing={1}>
            {icons.map((icon) => (
              <Box key={icon} component="img" src={icon} sx={{ width: 40, height: 40 }} />
            ))}
          </Stack>
        )}

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}
        </Stack>

        <Button size="large" fullWidth variant={cardIndex === 1 ? 'contained' : 'outlined'} target="_blank" href="/">
          Get Started
        </Button>
      </Stack>
    </Card>
  );
}

export default function AllBenefits() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Take Advantage of All TheBenefits
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary')
              }}
            >
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={5}>
          {PLANS.map((plan, index) => (
            <Grid key={plan.license} item xs={12} md={4}>
              <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                <PlanCard plan={plan} cardIndex={index} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>

        <MotionInView variants={varFadeIn}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h3">Need Help With Getting Started?</Typography>
            </MotionInView>

            <MotionInView variants={varFadeInDown}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                We understand that you might have questions about the process of making a request and possible
                complaints. Feel free to reach out to us
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <Button size="large" variant="contained" href="/">
                Contact us
              </Button>
            </MotionInView>
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
