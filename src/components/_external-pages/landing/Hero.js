import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import flashFill from "@iconify/icons-eva/flash-fill";
// material
import { styled } from "@mui/styles";
import { Button, Box, Link, Container, Typography, Stack } from "@mui/material";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
//
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";

import overlay from "../../../assets/static/overlay.svg";
import PossapLogo from "../../../assets/static/home/PossapLogo.svg";
import { useRouteContext } from "../../../contexts/RouteContext";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: "auto",
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "30%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function Hero() {
  const { dispatch } = useRouteContext();


  const handlePath = (to) => {
    dispatch({ type: 'NAVIGATE', payload: to });
  };
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="overlay" src={overlay} variants={varFadeIn} />

        <HeroImgStyle alt="hero" src={PossapLogo} variants={varFadeInUp} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h2" sx={{ color: "common.white" }}>
                Welcome to the Police <br /> Specialized Services Automation
                Project <br />
                <Typography
                  component="span"
                  variant="h2"
                  sx={{ color: "primary.main" }}
                >
                  &nbsp;(POSSAP) Portal
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: "common.white" }}>
                Easy and automated access to services such as Special protection
                services, Guards service, Police extracts etc.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                onClick={() => handlePath(PATH_DASHBOARD.general.app)}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Request Service
              </Button>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}
