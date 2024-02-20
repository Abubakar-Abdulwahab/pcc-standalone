import { Icon } from "@iconify/react";
import React, { useRef, useState, useEffect } from "react";
import { sentenceCase } from "change-case";
import shareFill from "@iconify/icons-eva/share-fill";
import printerFill from "@iconify/icons-eva/printer-fill";
import eyeFill from "@iconify/icons-eva/eye-fill";
import uploadFill from "@iconify/icons-eva/upload-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import { useTheme } from "@mui/styles";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer,
  Container,
} from "@mui/material";

//
import Label from "../../Label";
import Scrollbar from "../../Scrollbar";
import { MIconButton } from "../../@material-extend";
import { LoadingButton } from "@mui/lab";
import { fetchDBData } from "../../../utils/indexdb";
import postPCCData from "../../../_apis_/auth/postPCCData";

// ----------------------------------------------------------------------

const MOCK_INVOICES = [
  {
    id: 1,
    transaction_date: "7/31/2021",
    transaction_title: "Monkey D  Luffy",
    city: "East Blue",
    biometricOption: "Uploaded",
  },
  {
    id: 2,
    transaction_date: "5/31/2021",
    transaction_title: "Roronoa Zoro",
    city: "East Blue",
    biometricOption: "Capture",
  },
  {
    id: 3,
    transaction_date: "10/12/2021",
    transaction_title: "Vinsmoke Sanji",
    city: "East Blue",
    biometricOption: "Uploaded",
  },
  {
    id: 4,
    transaction_date: "12/20/2021",
    transaction_title: "Nico Robin",
    city: "East Blue",
    biometricOption: "Uploaded",
  },
  {
    id: 5,
    transaction_date: "6/8/2021",
    transaction_title: "Cat Burglar Nami",
    city: "East Blue",
    biometricOption: "Capture",
  },
];

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <Icon icon={uploadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Upload
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={eyeFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            View
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: "error.main" }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function RequestTable() {
  const theme = useTheme();
  const [storedData, setstoredData] = useState([]);
  const [loading, setloading] = useState(false);
  const loadData = () => {
    fetchDBData("pcc-request").then((data) => {
      const mapData = data.map((e) => ({
        ...e,
        rawData: JSON.parse(e.rawData),
      }));
      setstoredData(mapData);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const uploadData = async () => {
    let successCount = 0;
    setloading(true);
    for (const data of storedData) {
      const { intpassportdatapagefile, passportphotographfile, rawData, id } = data;
      const formData = new FormData();
      Object.keys(rawData).forEach((formControlName) => {
        formData.append(formControlName, rawData[formControlName]);
      });
      formData.append("intpassportdatapagefile", intpassportdatapagefile);
      formData.append("passportphotographfile", passportphotographfile);
      const res = await postPCCData(formData, rawData.PayerId);
      if (res !== "ERR_NETWORK") {
        deleteDataFromIndexedDb(id);
        successCount++;
      }
    }
    if (successCount === storedData.length) {
      setloading(false);
      loadData()
    }
  };

  return (
    <Card>
      <CardHeader title="Request Table" sx={{ mb: 3 }} />
      <Box sx={{ my: 2, mr: 3, display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          onClick={uploadData}
          loading={loading}
          type="submit"
          variant="contained"
        >
          Upload All
        </LoadingButton>
      </Box>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payer ID</TableCell>
                <TableCell>Passport Number</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Biometric Capture</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {storedData.length > 0 &&
                storedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{`${row.rawData.PayerId}`}</TableCell>
                    <TableCell>{`${row.rawData.PassportNumber}`}</TableCell>
                    <TableCell>{row.rawData.CityOfResidence}</TableCell>

                    <TableCell>
                      <Label
                        variant={
                          theme.palette.mode === "light" ? "ghost" : "filled"
                        }
                        color={
                          (row.biometricOption === "Capture" && "warning") ||
                          (row.biometricOption === "rejected" && "error") ||
                          "success"
                        }
                      >
                        {sentenceCase(
                          row.biometricOption === 1 ? "Capture" : "Upload"
                        )}
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      <MoreMenuButton />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          {/* View All */}
        </Button>
      </Box>
    </Card>
  );
}
