"use client";
import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { breakpoints } from "./breakpoints";

const theme = createTheme({
  typography,
  breakpoints,
  palette: {
    mode: "light",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#0e202a",
          fontSize: "13px",
          textDecoration: "none",
          textTransform: "uppercase",
          backgroundColor: "transparent",
          border: "1px solid #0e202a",
          borderRadius: "8px",
          padding: "20px 45px 19px 44px",
          "&:hover": {
            backgroundColor: "#0e202a",
            borderColor: "#0e202a",
            color: "#fff",
          },
        },
        alt: {
          borderColor: "#fff",
          color: "#fff",
          backgroundColor: "transparent",
          "&:hover": {
            color: "#0e202a",
            backgroundColor: "#fff",
          },
        },

        /* variants: */
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: "list-item",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
