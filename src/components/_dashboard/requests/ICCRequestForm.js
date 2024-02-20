import * as Yup from "yup";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "axios";
// material
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Button,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
// utils
import getUrlString from "../../../utils/get-url-string";
import fakeRequest from "../../../utils/fakeRequest";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//

import { fData } from "../../../utils/formatNumber";
import { UploadAvatar, UploadSingleFile } from "../../upload";

import { useRouteContext } from "../../../contexts/RouteContext";
import getPCCFormData from "../../../_apis_/auth/formData";
import postPCCData from "../../../_apis_/auth/postPCCData";
import { fDateCBS } from "../../../utils/formatTime";
import { saveDataToDB } from "../../../utils/indexdb";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
ICCRequestForm.propTypes = {
  isEdit: PropTypes.bool,
  userData: PropTypes.object,
};

export default function ICCRequestForm({ isEdit, userData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { dispatch } = useRouteContext();
  const [countries, setcountries] = useState([]);
  const [AllStates, setAllStates] = useState([]);
  const [lgas, setlgas] = useState([]);
  const [reasons, setreasons] = useState([]);
  const [intpassportdatapagefile, setintpassportdatapagefile] = useState(null);
  const [passportphotographfile, setpassportphotographfile] = useState(null);
  const [biometricsUploadFile, setbiometricsUploadFile] = useState(null);

  const handlePath = (to) => {
    dispatch({ type: "NAVIGATE", payload: to });
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getPCCFormData();

        if (res.code === "ERR_NETWORK") {
        } else {
          const { data } = res;
          const {
            Countries,
            CharacterCertificateReasonsForInquiry,
            StateLGAs,
          } = data.ResponseObject;
          setcountries(Countries.map((c) => ({ label: c.Name, value: c.Id })));
          setreasons(
            CharacterCertificateReasonsForInquiry.map((c) => ({
              label: c.Name,
              value: c.Id,
            }))
          );
          setAllStates(StateLGAs.map((c) => ({ label: c.Name, value: c.Id })));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // useEffect(() => {
  //   const data = {
  //     CharacterCertificateReasonForInquiry: 2,
  //     SelectedStateOfOrigin: 37,
  //     DestinationCountry: 4,
  //     SelectedCountryOfPassport: 162,
  //     CountryOfResidence: 4,
  //     StateOfResidence: "Abuja",
  //     PassportNumber: "A05936943",
  //     CityOfResidence: "Abuja",
  //     PlaceOfBirth: "Abuja",
  //     DateOfIssuance: fDateCBS("2024-02-05"),
  //     PlaceOfIssuance: "Abuja",
  //     PreviouslyConvicted: false,
  //     DateOfBirth: fDateCBS("1992-02-15"),
  //     BiometricCaptureOption: 1,
  //     PayerId: "WX-40166",
  //   };
  //   const formData = new FormData();
  //   Object.keys(data).forEach((formControlName) => {
  //     formData.append(formControlName, data[formControlName]);
  //   });

  //   if (passportphotographfile && intpassportdatapagefile) {
  //     formData.append("passportphotographfile", passportphotographfile);
  //     formData.append("intpassportdatapagefile", intpassportdatapagefile);
  //     postPCCData(formData, data.PayerId).then((e) => {
  //       enqueueSnackbar(
  //         "Your are offline, data will be cached until connection is back",
  //         {
  //           variant: "info",
  //         }
  //       );
  //       handlePath(PATH_DASHBOARD.general.app);
  //     });
  //     // saveDataToDB(JSON.stringify(data), passportphotographfile, intpassportdatapagefile)
  //   }
  // }, [passportphotographfile, intpassportdatapagefile]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewUserSchema = Yup.object().shape({
    CharacterCertificateReasonForInquiry: Yup.string().required(
      "Reason for inquiry is required"
    ),
    SelectedStateOfOrigin: Yup.object().required("State of origin is required"),
    DestinationCountry: Yup.mixed().required("Destination country is required"),
    SelectedCountryOfPassport: Yup.mixed().required("Country of passport is required"),

    // SelectedCountryOfPassport: Yup.object().shape({
    //   label: Yup.string().required("Country of passport is required"),
    //   value: Yup.number().required("Country of passport is required"),
    // }),
    CountryOfResidence: Yup.mixed().required(
      "Country of residence is required"
    ),
    StateOfResidence: Yup.string().required("State of residence is required"),
    CityOfResidence: Yup.string().required("City of residence is required"),
    PassportNumber: Yup.string().required("Passport Number is required"),
    DateOfBirth: Yup.date().required("Date of birth is required"),
    PlaceOfBirth: Yup.mixed().required("Place of birth is required"),
    DateOfIssuance: Yup.date().required("Date of issuance is required"),
    PlaceOfIssuance: Yup.mixed().required("Place of issuance is required"),
    PlaceOfBirth: Yup.mixed().required("Place of birth is required"),
    BiometricCaptureOption: Yup.mixed().required(
      "Biometric capture is required"
    ),
    PreviouslyConvicted: Yup.boolean(),
    PreviousConvictionHistory: Yup.string().when(
      "PreviouslyConvicted",
      (PreviousConvictionHistory, schema) => {
        if (PreviousConvictionHistory[0] === true) {
          return schema
            .required("Previous Conviction History is required")
            .min(
              10,
              "Previous Conviction History must be more than 10 character"
            )
            .max(100, "Must not exceed 100 characters");
        }
      }
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      PayerId: userData?.TaxPayerProfileVM?.PayerId || "",
      CharacterCertificateReasonForInquiry: "",
      SelectedStateOfOrigin: userData?.SelectedStateOfOrigin || "",
      DestinationCountry: userData?.DestinationCountry || "",
      SelectedCountryOfPassport: userData?.SelectedCountryOfPassport || "",
      CountryOfResidence: userData?.CountryOfResidence || "",
      StateOfResidence: userData?.StateOfResidence || "",
      PassportNumber: userData?.TaxPayerProfileVM?.IdNumber || "",
      CityOfResidence: userData?.CityOfResidence || "",
      PlaceOfBirth: userData?.PlaceOfBirth || null,
      DateOfIssuance:
        userData?.DateOfIssuance || new Date().toISOString().split("T")[0],
      PlaceOfIssuance: userData?.PlaceOfIssuance,
      PreviouslyConvicted: userData?.PreviouslyConvicted || false,
      DateOfBirth:
        userData?.DateOfBirth || new Date().toISOString().split("T")[0],
      BiometricCaptureOption: userData?.BiometricCaptureOption || "",
      PreviousConvictionHistory: userData?.PreviousConvictionHistory || "",
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const formData = new FormData();
        values.DateOfBirth = fDateCBS(values.DateOfBirth);
        values.DateOfIssuance = fDateCBS(values.DateOfIssuance);
        Object.keys(values).forEach((formControlName) => {
          if (formControlName === "passportphotographfile") {
            formData.append(formControlName, passportphotographfile);
          } else if (formControlName === "intpassportdatapagefile") {
            formData.append(formControlName, intpassportdatapagefile);
          } else if (formControlName === "biometricsUploadFile") {
            formData.append(formControlName, biometricsUploadFile);
          } else if (typeof values[formControlName] === "object") {
            formData.append(formControlName, values[formControlName].value);
          } else {
            formData.append(formControlName, values[formControlName]);
          }
        });
        const res = await postPCCData(formData, values.PayerId);
        if (res === "ERR_NETWORK") {
          enqueueSnackbar(
            "Your are offline, data will be cached until connection is back",
            {
              variant: "info",
            }
          );
          saveDataToDB(
            JSON.stringify(values),
            passportphotographfile,
            intpassportdatapagefile,
            biometricsUploadFile,
          );
          handlePath(PATH_DASHBOARD.general.app);
        } else {
          setSubmitting(false);
          if (res?.data?.Error) {
            enqueueSnackbar("Failed to save request", {
              variant: "danger",
            });
          } else {
            dispatch({
              type: "NAVIGATE-WITH-DATA",
              payload: {
                path: "/dashboard/success",
                data: res.data.ResponseObject,
              },
            });
            enqueueSnackbar("Request submitted successfully", {
              variant: "success",
            });
            resetForm();
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
    setFieldTouched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;


  const handleDrop = useCallback(
    (acceptedFiles, field) => {
      const file = acceptedFiles[0];
      if (file) {
        field === "intpassportdatapagefile"
          ? setintpassportdatapagefile(file)
          : field === "biometricsUploadFile"
          ? setbiometricsUploadFile(file)
          : setpassportphotographfile(file);
        setFieldValue(field, {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Reason for Inquiry
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="CharacterCertificateReasonForInquiry"
                      defaultValue=""
                      onChange={(ev) =>
                        setFieldValue(
                          "CharacterCertificateReasonForInquiry",
                          ev.target.value
                        )
                      }
                      //{...getFieldProps("CharacterCertificateReasonForInquiry")}
                      error={Boolean(
                        touched.CharacterCertificateReasonForInquiry &&
                          errors.CharacterCertificateReasonForInquiry
                      )}
                      helperText={
                        touched.CharacterCertificateReasonForInquiry &&
                        errors.CharacterCertificateReasonForInquiry
                      }
                    >
                      {reasons.length > 0 &&
                        reasons.map((r) => (
                          <MenuItem key={r.value} value={r.value}>
                            {r.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Stack>
                <div>
                  <LabelStyle sx={{ mb: 0 }}>Personal Info</LabelStyle>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                    sx={{ mb: 3, mt: 1 }}
                  >
                    <TextField
                      fullWidth
                      type="text"
                      label="International Passport No"
                      {...getFieldProps("PassportNumber")}
                      error={Boolean(
                        touched.PassportNumber && errors.PassportNumber
                      )}
                      helperText={
                        touched.PassportNumber && errors.PassportNumber
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      label="Date of Issuance"
                      {...getFieldProps("DateOfIssuance")}
                      error={Boolean(
                        touched.DateOfIssuance && errors.DateOfIssuance
                      )}
                      helperText={
                        touched.DateOfIssuance && errors.DateOfIssuance
                      }
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Place of Issuance"
                      {...getFieldProps("PlaceOfIssuance")}
                      error={Boolean(
                        touched.PlaceOfIssuance && errors.PlaceOfIssuance
                      )}
                      helperText={
                        touched.PlaceOfIssuance && errors.PlaceOfIssuance
                      }
                    />
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                    sx={{ mb: 2 }}
                  >
                    <Autocomplete
                      fullWidth
                      freeSolo
                      name="SelectedStateOfOrigin"
                      onBlur={(ev, val) =>
                        setFieldTouched("SelectedStateOfOrigin", true)
                      }
                      onChange={(ev, val) =>
                        setFieldValue("SelectedStateOfOrigin", val)
                      }
                      options={AllStates.map((option) => option)}
                      renderInput={(params) => (
                        <TextField
                        error={Boolean(
                          touched.SelectedStateOfOrigin &&
                            errors.SelectedStateOfOrigin
                        )}
                        helperText={
                          touched.SelectedStateOfOrigin &&
                          errors.SelectedStateOfOrigin
                        }
                         {...params} label="State of origin" />
                      )}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Place of Birth"
                      {...getFieldProps("PlaceOfBirth")}
                      error={Boolean(
                        touched.PlaceOfBirth && errors.PlaceOfBirth
                      )}
                      helperText={touched.PlaceOfBirth && errors.PlaceOfBirth}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      {...getFieldProps("DateOfBirth")}
                      error={Boolean(touched.DateOfBirth && errors.DateOfBirth)}
                      helperText={touched.DateOfBirth && errors.DateOfBirth}
                    />
                  </Stack>
                </div>

                <LabelStyle>Files</LabelStyle>
                <div style={{ marginBottom: "1px" }}>
                  <InputLabel>Passport Photograph</InputLabel>
                  <UploadSingleFile
                    maxSize={3145728}
                    accept="image/*"
                    file={values.passportphotographfile}
                    onDrop={(ev) => handleDrop(ev, "passportphotographfile")}
                    error={Boolean(
                      touched.passportphotographfile &&
                        errors.passportphotographfile
                    )}
                  />
                  {touched.passportphotographfile &&
                    errors.passportphotographfile && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.passportphotographfile &&
                          errors.passportphotographfile}
                      </FormHelperText>
                    )}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <InputLabel>International Passport Bio Page</InputLabel>
                  <UploadSingleFile
                    maxSize={3145728}
                    accept="image/*"
                    file={values.intpassportdatapagefile}
                    onDrop={(ev) => handleDrop(ev, "intpassportdatapagefile")}
                    error={Boolean(
                      touched.intpassportdatapagefile &&
                        errors.intpassportdatapagefile
                    )}
                  />
                  {touched.intpassportdatapagefile &&
                    errors.intpassportdatapagefile && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.intpassportdatapagefile &&
                          errors.intpassportdatapagefile}
                      </FormHelperText>
                    )}
                </div>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                  sx={{ mb: 2 }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Biometrics Option
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...getFieldProps("BiometricCaptureOption")}
                      error={Boolean(
                        touched.BiometricCaptureOption &&
                          errors.BiometricCaptureOption
                      )}
                      helperText={
                        touched.BiometricCaptureOption &&
                        errors.BiometricCaptureOption
                      }
                    >
                      <MenuItem value={1}>Capture Using Biometric App</MenuItem>
                      <MenuItem value={2}>
                        Upload Finger Print Document
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                {values.BiometricCaptureOption === 2 && (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                    sx={{ mb: 2 }}
                  >
                    <div style={{ marginBottom: "10px", width: "100%" }}>
                      <InputLabel>Upload Fingerprint Document</InputLabel>
                      <UploadSingleFile
                        maxSize={3145728}
                        accept="image/*"
                        file={values.biometricsUploadFile}
                        onDrop={(ev) => handleDrop(ev, "biometricsUploadFile")}
                        error={Boolean(
                          touched.biometricsUploadFile &&
                            errors.biometricsUploadFile
                        )}
                      />
                      {touched.biometricsUploadFile &&
                        errors.biometricsUploadFile && (
                          <FormHelperText error sx={{ px: 2 }}>
                            {touched.biometricsUploadFile &&
                              errors.biometricsUploadFile}
                          </FormHelperText>
                        )}
                    </div>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Have you been previously convicted?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    {...getFieldProps("PreviouslyConvicted")}
                    error={Boolean(
                      touched.PreviouslyConvicted && errors.PreviouslyConvicted
                    )}
                    helperText={
                      touched.PreviouslyConvicted && errors.PreviouslyConvicted
                    }
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack spacing={3} sx={{ mt: 2 }}>
                {values.PreviouslyConvicted === "true" && (
                  <TextField
                    fullWidth
                    type="text"
                    multiline
                    label="Previous Conviction History"
                    {...getFieldProps("PreviousConvictionHistory")}
                    error={Boolean(
                      touched.PreviousConvictionHistory &&
                        errors.PreviousConvictionHistory
                    )}
                    helperText={
                      touched.PreviousConvictionHistory &&
                      errors.PreviousConvictionHistory
                    }
                  />
                )}
              </Stack>
            </Card>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <LabelStyle>Location</LabelStyle>
                <Autocomplete
                  freeSolo
                  name="SelectedCountryOfPassport"
                  onBlur={(e, val) =>
                    setFieldTouched("SelectedCountryOfPassport", true)
                  }
                  onChange={(ev, val) =>
                    setFieldValue("SelectedCountryOfPassport", val)
                  }
                  options={countries.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(
                        touched.SelectedCountryOfPassport &&
                          errors.SelectedCountryOfPassport
                      )}
                      helperText={
                        touched.SelectedCountryOfPassport &&
                        errors.SelectedCountryOfPasspor
                      }
                      label="Country of Passport"
                    />
                  )}
                />

                <Autocomplete
                  freeSolo
                  name="DestinationCountry"
                  onBlur={(e, val) =>
                    setFieldTouched("DestinationCountry", true)
                  }
                  onChange={(ev, val) =>
                    setFieldValue("DestinationCountry", val)
                  }
                  options={countries.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(
                        touched.DestinationCountry && errors.DestinationCountry
                      )}
                      helperText={
                        touched.DestinationCountry && errors.DestinationCountry
                      }
                      label="Destination Country"
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  name="CountryOfResidence"
                  onBlur={(e, val) =>
                    setFieldTouched("CountryOfResidence", true)
                  }
                  onChange={(ev, val) =>
                    setFieldValue("CountryOfResidence", val)
                  }
                  options={countries.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      error={Boolean(
                        touched.CountryOfResidence && errors.CountryOfResidence
                      )}
                      helperText={
                        touched.CountryOfResidence && errors.CountryOfResidence
                      }
                      {...params}
                      label="Country of Residence"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="State of Residence"
                  {...getFieldProps("StateOfResidence")}
                  error={Boolean(
                    touched.StateOfResidence && errors.StateOfResidence
                  )}
                  helperText={
                    touched.StateOfResidence && errors.StateOfResidence
                  }
                />
                <TextField
                  fullWidth
                  type="text"
                  label="City of Residence"
                  {...getFieldProps("CityOfResidence")}
                  error={Boolean(
                    touched.CityOfResidence && errors.CityOfResidence
                  )}
                  helperText={touched.CityOfResidence && errors.CityOfResidence}
                />
              </Stack>
            </Card>

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
              {/* <Button
                fullWidth
                type="button"
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
                sx={{ mr: 1.5 }}
              >
                Preview
              </Button> */}
              <LoadingButton
                fullWidth
                type="submit"
                disabled={!formik.isValid}
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
