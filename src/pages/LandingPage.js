import React from "react";
// material
import { styled } from "@mui/styles";
// components
import Page from "../components/Page";
import {
  Hero,
  HowItWorks,
  GetSpecialisedServices,
  AllBenfits,
} from "../components/_external-pages/landing";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle
      title="Police Specialized Services Automation Project | POSSAP"
      id="move_top"
    >
      <Hero />
      <ContentStyle>
        {/* <HowItWorks /> */}
        {/* <GetSpecialisedServices />
        <AllBenfits /> */}
      </ContentStyle>
    </RootStyle>
  );
}
