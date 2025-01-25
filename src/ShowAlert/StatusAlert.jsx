import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

export default function StatusAlert({ open, setOpen, message, severity }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
StatusAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
};
