import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";

// material
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//


import { fData } from "../../../utils/formatNumber";
import { UploadAvatar } from "../../upload";
import { RegisterImmigrant } from "../../../_apis_/auth";
import GetStateLGA from "../../../_apis_/auth/getStateLga";
import { useRouteContext } from "../../../contexts/RouteContext";
import { saveUserDataToDB } from "../../../utils/indexdb";

// ----------------------------------------------------------------------
const genderOptions = [
  { label: "Male", value: "1" },
  { label: "Female", value: "2" },
];
UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewForm({ isEdit, currentUser }) {
  const [AllStates, setAllStates] = useState([]);
  const [stateLgaData, setstateLgaData] = useState([]);
  const { dispatch } = useRouteContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetStateLGA();
        const data = res.data.ResponseObject.stateLga;
        setstateLgaData(data);
        const states = data.map((state) => ({
          label: state.Name,
          value: state.Id,
        }));
        setAllStates(states);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // setTimeout(() => {
    //   handleNavigate("OP-000612")
    // }, 4000);
  }, [])
  

  const handleNavigate = (payrId ="") => {
    dispatch({
      type: "NAVIGATE-WITH-DATA",
      payload:{path: "/dashboard/module/user-profile",data:payrId}
      
    });
  };

  const [lgas, setlgas] = useState([]);
  const [passphortFile, setpassphortFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    Name: Yup.string().required("FullName is required"),
    Email: Yup.string().required("Email is required").email(),
    PhoneNumber: Yup.string().required("Phone number is required"),
    Address: Yup.string().required("Address is required"),
    Gender: Yup.string().required("Gender is required"),
    IdNumber: Yup.string().required(
      "International Passport number is required"
    ),
    SelectedState: Yup.string().required("SelectedState is required"),
    SelectedStateLGA: Yup.string().required("LGA is required"),
    identificationfile: Yup.mixed().required(
      "Passport bio-data page is required"
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Name: currentUser?.Name || "",
      Email: currentUser?.Email || "",
      PhoneNumber: currentUser?.PhoneNumber || "",
      Address: currentUser?.Address || "",
      Gender: currentUser?.Gender || "",
      SelectedState: currentUser?.SelectedState || "",
      SelectedStateLGA: currentUser?.SelectedStateLGA || "",
      IdNumber: currentUser?.IdNumber || "",
      identificationfile: currentUser?.identificationfile || null,
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((formControlName) => {
          if (formControlName === "identificationfile") {
            formData.append(formControlName, passphortFile);
          } else {
            formData.append(
              "RegisterCBSUserModel." + formControlName,
              values[formControlName]
            );
          }
        });
        const res = await RegisterImmigrant(formData);
        if(res === 'ERR_NETWORK'){
          enqueueSnackbar("Your are offline, data will be cached until connection is back", {
            variant: "info",
          });
          saveUserDataToDB(JSON.stringify(values), passphortFile)
          handleNavigate()

        }else{

          if(res?.data?.Error){
            enqueueSnackbar("Error Creating Immigrant", {
              variant: "danger",
            });
          }else{
            setSubmitting(false);
            enqueueSnackbar("Create success", {
              variant: "success",
            });
            handleNavigate(res?.data?.ResponseObject?.UserObject?.TaxEntityVM?.PayerId);

          }

        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  useEffect(() => {
    if (values.SelectedState.length > 0) {
      const filterLga = stateLgaData.filter(
        (lga) => lga.Id === parseInt(values.SelectedState)
      );
      const lgas = filterLga[0].LGAs.map((lga) => ({
        label: lga.Name,
        value: lga.Id,
      }));
      setlgas(lgas);
    }
  }, [values]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setpassphortFile(file);
      const imgBlob = new Blob([file], { type: `image/jpeg` });
      const reader = new FileReader().readAsDataURL(file);
      console.log({ file, reader });

      if (file) {
        setFieldValue("identificationfile", {
          ...file,
          preview: URL.createObjectURL(file),
          name: file.name,
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== "active" ? "error" : "success"}
                  sx={{
                    textTransform: "uppercase",
                    position: "absolute",
                    top: 24,
                    right: 24,
                  }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.identificationfile}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(
                    touched.identificationfile && errors.identificationfile
                  )}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png
                      <br /> max size of {fData(2045118)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.identificationfile && errors.identificationfile}
                </FormHelperText>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Fullname"
                    {...getFieldProps("Name")}
                    error={Boolean(touched.Name && errors.Name)}
                    helperText={touched.Name && errors.Name}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps("Email")}
                    error={Boolean(touched.Email && errors.Email)}
                    helperText={touched.Email && errors.Email}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps("PhoneNumber")}
                    error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                    helperText={touched.PhoneNumber && errors.PhoneNumber}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    placeholder="Gender"
                    {...getFieldProps("Gender")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.Gender && errors.Gender)}
                    helperText={touched.Gender && errors.Gender}
                  >
                    <option value="" />
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    label="State of Origin"
                    {...getFieldProps("SelectedState")}
                    error={Boolean(
                      touched.SelectedState && errors.SelectedState
                    )}
                    helperText={touched.SelectedState && errors.SelectedState}
                  >
                    <option value="" />
                    {AllStates.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    label="LGA of Origin"
                    {...getFieldProps("SelectedStateLGA")}
                    error={Boolean(
                      touched.SelectedStateLGA && errors.SelectedStateLGA
                    )}
                    helperText={
                      touched.SelectedStateLGA && errors.SelectedStateLGA
                    }
                  >
                    <option value="" />
                    {lgas.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="International Passport Number"
                    {...getFieldProps("IdNumber")}
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                </Stack>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    label="Address"
                    {...getFieldProps("Address")}
                    error={Boolean(touched.Address && errors.Address)}
                    helperText={touched.Address && errors.Address}
                  />

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {!isEdit ? "Create Immigrant" : "Save Changes"}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
