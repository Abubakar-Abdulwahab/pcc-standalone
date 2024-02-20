import React, { useEffect, useState } from "react";
import { paramCase } from "change-case";
// material
import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Input,
  InputAdornment,
  Button,
  alpha,
} from "@mui/material";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import UserNewForm from "../../components/_dashboard/user/UserNewForm";
import { styled } from "@mui/styles";
import getImmigrantData from "../../_apis_/auth/getImmigrantData";
import { LoadingButton } from "@mui/lab";
import { useRouteContext } from "../../contexts/RouteContext";
import Searchbar from "../../layouts/dashboard/Searchbar";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------
const TitleStyle = styled("div")(({ theme }) => ({
  color: "#333",
  float: "left",
  fontWeight: 600,
  width: "30%",
}));
const TextStyle = styled("div")(({ theme }) => ({
  color: "#888",
  float: "left",
  width: "70%",
}));
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  marginBottom: "10px",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettings();
  const [loading, setloading] = useState(false);
  const [profileId, setprofileId] = useState("");
  const [userData, setuserData] = useState(null);

  const { dispatch, state } = useRouteContext();

  useEffect(() => {
    console.log(state, 'out');
    if (state && typeof state?.data === "string") {
      console.log(state, 'if');
      setprofileId(() => state?.data);
      handleSearch(state?.data)
    }
  }, [state, setprofileId]);

  const handleNavigate = (to) => {
    dispatch({
      type: "NAVIGATE-WITH-DATA",
      payload: { path: to, data: userData },
    });
  };
  const handleSearch = async (id = null) => {
    setloading(true);
    try {
      console.log(id, profileId);
      const res = await getImmigrantData(profileId || id);
      setuserData(res.data.ResponseObject.UserDetails);
      setloading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.message + " | " + "Make sure the profile ID is correct and try again or contact admin",
        {
          variant: "error",
        }
      );
    }
  };

  useEffect(() => {}, [profileId]);

  return (
    <Page title="User Profile | Possap">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Immigrant User Profile"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "User Profile" },
          ]}
        />

        <SearchbarStyle>
          <Input
            autoFocus
            fullWidth
            disableUnderline
            onChange={(e) => setprofileId(e.target.value)}
            defaultValue={ typeof state?.data === "string" ?state.data : ""}
            placeholder="Search for profile"
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            sx={{ mr: 1, fontWeight: "fontWeightBold" }}
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </LoadingButton>
        </SearchbarStyle>
        {userData && (
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Box sx={{ borderRight: "2px dashed #ccc" }}>
                    <h3>{userData?.CBSUserVM?.Name}</h3>
                    <h4>{userData?.CBSUserVM?.Email}</h4>
                    <Typography>
                      {userData?.CBSUserVM?.Gender === 1 ? "Male" : "Female"}
                    </Typography>
                    <div className="staff-id">
                      Payer ID : {userData?.TaxPayerProfileVM?.PayerId}
                    </div>
                    <div className="staff-msg">
                      <LoadingButton
                        onClick={() =>
                          handleNavigate(PATH_DASHBOARD.services.createRequest)
                        }
                        sx={{ mt: 4 }}
                        variant="contained"
                      >
                        Generate Character Certificate Request
                      </LoadingButton>
                    </div>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <ul style={{ width: "100%" }}>
                    <li style={{ display: "flex", marginBottom: "10px" }}>
                      <TitleStyle>Phone No.</TitleStyle>
                      <TextStyle>
                        <a href="">{userData?.CBSUserVM?.PhoneNumber}</a>
                      </TextStyle>
                    </li>
                    <li style={{ display: "flex", marginBottom: "10px" }}>
                      <TitleStyle>Passport No.</TitleStyle>
                      <TextStyle>
                        {userData?.TaxPayerProfileVM?.IdNumber}
                      </TextStyle>
                    </li>
                    <li style={{ display: "flex", marginBottom: "10px" }}>
                      <TitleStyle>State of Origin</TitleStyle>
                      <TextStyle>
                        {userData?.TaxPayerProfileVM?.SelectedStateName}
                      </TextStyle>
                    </li>
                    <li style={{ display: "flex", marginBottom: "10px" }}>
                      <TitleStyle>LGA of Origin</TitleStyle>
                      <TextStyle>
                        {userData?.TaxPayerProfileVM?.SelectedLGAName}
                      </TextStyle>
                    </li>
                    <li style={{ display: "flex", marginBottom: "10px" }}>
                      <TitleStyle>Address</TitleStyle>
                      <TextStyle>
                        {userData?.TaxPayerProfileVM?.Address}
                      </TextStyle>
                    </li>
                  </ul>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
      </Container>
    </Page>
  );
}
