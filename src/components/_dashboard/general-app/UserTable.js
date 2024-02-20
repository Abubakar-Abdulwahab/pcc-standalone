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
import { deleteDataFromIndexedDb, fetchDBData } from "../../../utils/indexdb";
import postPCCData from "../../../_apis_/auth/postPCCData";
import { RegisterImmigrant } from "../../../_apis_/auth";


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

export default function UserTable() {
  const theme = useTheme();
  const [storedData, setstoredData] = useState([]);
  const [loading, setloading] = useState(false)
    const loadData = () => {
        fetchDBData("userstore").then((data) => {
          const mapData = data.map((e) => ({
            ...e,
            rawData: JSON.parse(e.rawData),
          }));
          setstoredData(mapData);
        });

    }
  useEffect(() => {
    loadData()
  }, []);
  const uploadData = async()=> {
    let successCount = 0;
    setloading(true)
    for (const data of storedData) {
      const {identificationfile, rawData, id } = data;
        const formData = new FormData();
        Object.keys(rawData).forEach((formControlName) => {
          formData.append("RegisterCBSUserModel." + formControlName, rawData[formControlName]);
        });
        formData.delete('identificationfile')
        formData.append('identificationfile', identificationfile);
        const res = await RegisterImmigrant(formData);
        if (res !== 'ERR_NETWORK') {
            deleteDataFromIndexedDb(id)
          successCount++;
        }
    }
    if (successCount === storedData.length) {
      setloading(false)
      loadData()
    }
  }

  return (
    <Card>
      <CardHeader title="User Table " sx={{ mb: 3 }} />
      <Box sx={{ my: 2, mr: 3, display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton onClick={uploadData} loading={loading} type="submit" variant="contained">
          Upload All
        </LoadingButton>
      </Box>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>FullName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Passport Number</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {storedData.length > 0 &&
                storedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{`${row.rawData.Name}`}</TableCell>
                    <TableCell>{row.rawData.Email}</TableCell>
                    <TableCell>{`${row.rawData.PhoneNumber}`}</TableCell>
                    <TableCell>{`${row.rawData.IdNumber}`}</TableCell>
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
