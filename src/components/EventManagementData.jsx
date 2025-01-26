import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  createTheme,
  ThemeProvider,
  Menu,
  Stack,
  Button,
  Dialog,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Slide,
  TextField,
} from "@mui/material";

import {
  Close,
  EditNote,
  DeleteForever,
  Add,
  MoreHorizTwoTone,
} from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  editUser,
  fetchUsers,
  removeUser,
} from "../redux/features/usersSlice";
import styles from "./EventManagementData.module.css";
import StatusAlert from "../ShowAlert/StatusAlert";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const eventValue = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: { city: "", zipcode: "" },
};
function EventManagementData() {
  const [initialData, setInitialData] = useState(eventValue);
  const [allInput, setAllInput] = useState(initialData);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setAllInput(initialData);
  }, [initialData]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionMode, setActionMode] = useState(null);
  const { users } = useSelector((state) => state.users);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  console.log(users, "allusers from selector got");
  const dispatch = useDispatch();
  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleClickOpen = () => {
    setAllInput(eventValue);
    !actionMode ? setActionMode("add") : setActionMode(null);
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "zipcode") {
      setAllInput((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setAllInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actionMode === "add") {
      dispatch(addUser(allInput));
      setAllInput(eventValue);
      showAlert("Event added successfully", "success");
    } else {
      dispatch(editUser({ id: allInput.id, updatedUser: allInput }));
      showAlert("Event updated successfully", "success");
    }
    handleClose();
  };

  const handleClose = () => {
    setActionMode(null);
    setOpen(false);
  };

  const handleOpenMenu = (id) => {
    setOpenMenuId(id);
  };
  const [openMenuId, setOpenMenuId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    console.log(openMenuId, "id got");
    dispatch(removeUser(openMenuId));
    showAlert("Event deleted successfully", "warning");
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              ID
            </th>
          );
        },
        customBodyRender: (value) => {
          return (
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {value || " "}
            </td>
          );
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              Name
            </th>
          );
        },
        customBodyRender: (value) => {
          return (
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(value || " ").charAt(0).toUpperCase() + (value || " ").slice(1)}
            </td>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              Email
            </th>
          );
        },
        customBodyRender: (value) => {
          return (
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {value || " "}
            </td>
          );
        },
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              Phone
            </th>
          );
        },
        customBodyRender: (value) => {
          return (
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {value || " "}
            </td>
          );
        },
      },
    },
    {
      name: "address",
      label: "City",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              City
            </th>
          );
        },
        customBodyRender: (value) => {
          return (
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {value?.city || " "}({value?.zipcode})
            </td>
          );
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        customHeadRender: ({ index }) => {
          return (
            <th
              key={index}
              style={{
                textAlign: "right",
                paddingRight: "70px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Action
            </th>
          );
        },
        customBodyRender: (value) => (
          <>
            <td
              key={value}
              style={{
                display: "flex",
                justifyContent: "flex-end", // Aligns content to the left
                alignItems: "center",
                paddingRight: "20px", // Add padding for starting point
              }}
            >
              <div style={{ paddingRight: "20px" }}>
                <Button
                  id="basic-button"
                  aria-controls={openDropMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openDropMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <div onClick={() => handleOpenMenu(value)}>
                    <MoreHorizTwoTone />
                  </div>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseMenu}>
                    <div
                      onClick={() => handleEdit()}
                      style={{
                        display: "flex",
                        justifyContent: "space-center",
                        alignItems: "center",
                      }}
                    >
                      <EditNote /> Edit
                    </div>
                  </MenuItem>

                  <MenuItem onClick={handleCloseMenu}>
                    <div
                      onClick={() => handleDelete()}
                      style={{
                        display: "flex",
                        justifyContent: "space-center",
                        alignItems: "center",
                      }}
                    >
                      <DeleteForever /> Delete
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </td>
          </>
        ),
      },
    },
  ];

  async function handleEdit() {
    setActionMode("edit");
    const userToEdit = users.find((user) => user.id === openMenuId);
    if (userToEdit) {
      setInitialData(userToEdit);
    }
    setOpen(true);
  }

  const rowsPerPageOptions = [5, 10, 25, 100];

  const options = {
    selectableRows: "none",
    selectToolbarPlacement: "none",
    elevation: 0,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: rowsPerPageOptions,
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
    },
    responsive: "standard",
    tableBody: {
      style: {
        maxHeight: `${rowsPerPage * 50}px`,
        overflow: "auto",
        marginLeft: "5px",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        boxShadow: "none",
      },
    },
    tableHead: {
      style: {
        backgroundColor: "#f2f2f2",
        color: "black",
      },
    },
    rows: {
      style: {},
      selectableRowsOnClick: true,
    },
  };

  const getTheme = () =>
    createTheme({
      palette: {
        mode: "light",
        primary: {
          main: "#2196f3",
        },
        secondary: {
          main: "#03a9f4",
        },
      },
      typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "Sans-serif"].join(","),
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
      },
      tableBody: {
        style: {
          maxHeight: "500px",
          overflowY: "scroll",
        },
      },
      tableHead: {
        style: {
          backgroundColor: "#f2f2f2",
          color: "black",
        },
      },
      rows: {
        style: {
          "&:hover": {
            backgroundColor: "#f2f2f2",
          },
        },
      },
    });

  const handleValidation = () => {
    const { name, email, phone, address } = allInput;
    if (!name || !email || !phone || !address?.city || !address?.zipcode) {
      showAlert("Please fill out all required fields.", "error");
      return false;
    }
    return true;
  };
  return (
    <Box>
      <StatusAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={alertSeverity}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{ margin: "10px", marginTop: "100px" }}
      >
        <Box onClick={handleClickOpen} className={styles.title}>
          <Add />
          Add Member
        </Box>
      </Stack>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            position: "absolute",
            background: "#141b2d",
            top: "0",
            backgroundColor: "white",
            maxHeight: "95%",
            margin: "auto",
            overflowX: "hidden",
            zIndex: 1200,
          },
        }}
      >
        <AppBar sx={{ position: "relative", bgcolor: "#1d82f5" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close fontSize="large" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, fontSize: "18px" }}>
              {actionMode === "add" ? "Add New Event" : "Edit Event"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ background: "#fff" }}>
          <Grid
            container
            spacing={2}
            sx={{
              margin: { xs: "auto", sm: "10px" },
            }}
          >
            <Grid item xs={11} md={5.5}>
              <TextField
                label="Name"
                name="name"
                value={allInput.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={11} md={5.5}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={allInput.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={11} md={5.5}>
              <TextField
                label="Phone"
                name="phone"
                value={allInput.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={11} md={5.5}>
              <TextField
                label="City"
                name="city"
                value={allInput.address?.city || ""}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={11} md={5.5}>
              <TextField
                label="Zip Code"
                name="zipcode"
                value={allInput.address?.zipcode || ""}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ padding: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (handleValidation()) {
                  handleSubmit(e);
                }
              }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Dialog>
      <Divider />
      <ListItemText style={{ background: "white", margin: 0 }}>
        <ThemeProvider theme={getTheme()}>
          <Box className={styles.container}>
            <MUIDataTable
              title={
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#333",
                  }}
                >
                  Member Lists
                </span>
              }
              data={users}
              columns={columns}
              options={options}
            />
          </Box>
        </ThemeProvider>
      </ListItemText>
    </Box>
  );
}

export default EventManagementData;
