import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    titleDrawer: React.CSSProperties;
    bodyDrawer: React.CSSProperties;
    contentDrawer: React.CSSProperties;
    titleCards: React.CSSProperties;
    bodyCards: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    titleDrawer?: React.CSSProperties;
    bodyDrawer?: React.CSSProperties;
    contentDrawer?: React.CSSProperties;
    titleCards?: React.CSSProperties;
    bodyCards?: React.CSSProperties;
  }
}
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleDrawer: true;
    bodyDrawer: true;
    contentDrawer: true;
    titleCards: true;
    bodyCards: true;
  }
}

const TextField = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "--TextField-brandBorderColor": "#daedd5",
        "--TextField-brandBorderHoverColor": "#daedd5",
        "--TextField-brandBorderFocusedColor": "#DAEDD5",
        "& label.Mui-focused": {
          color: "var(--TextField-brandBorderFocusedColor)",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: "var(--TextField-brandBorderColor)",
      },
      root: {
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "var(--TextField-brandBorderHoverColor)",
        },
        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "var(--TextField-brandBorderFocusedColor)",
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        "&::before, &::after": {
          borderBottom: "2px solid var(--TextField-brandBorderColor)",
        },
        "&:hover:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
        },
        "&.Mui-focused:after": {
          borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
        },
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        "&::before": {
          borderBottom: "2px solid var(--TextField-brandBorderColor)",
        },
        "&:hover:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
        },
        "&.Mui-focused:after": {
          borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      inputFocused: {
        //Text in text field will focus
        color: "#79B669",
        "&.Mui-focused": {
          color: "#79B669",
        },
      },
      clearIndicator: {
        color: "#daedd5",
      },
    },
  },
};

const Slider = {
  MuiSlider: {
    styleOverrides: {
      root: {
        height: "14px",
      },
      thumb: {
        width: "5px",
        height: "24px",
        borderRadius: "16px",
        backgroundColor: "#FaFdF5",
        boxShadow: "0px 0px 0px 5px rgba(0, 0, 0, 0.25)",
      },
      valueLabel: {
        backgroundColor: "#FaFdF5",
        color: "#49454f",
        borderRadius: "10px",
        padding: "2px 8px",
        fontSize: "1rem",
      },
      valueLabelOpen: {},
      track: {},
      rail: {},
    },
  },
};

const Drawer = {
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: "#141218",
        borderRadius: "8px",
      },
    },
  },
};

const accordion = {
  MuiAccordion: {
    styleOverrides: {
      root: {
        background: "#27242b",
        color: "#fff",
        fontSize: "1.25rem",
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        background: "#423e47",
      },
    },
  },
};

const tableUi = {
  MuiTableCell: {
    styleOverrides: {
      root: {
        color: "white",
        fontWeight: "200",
      },
      head: {
        color: "white",
        fontWeight: "800",
      },
    },
  },
};

export const drawerSliderBar = {
  justifyContent: "space-between",
  overflowY: "auto",
  padding: "1rem",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#888 transparent",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#79B669",
      light: "#DAEDD5",
      dark: "#104502",
      // contrastText: "#daedd5",
    },
    secondary: {
      main: "#619254",
      light: "#93AB8D",
      dark: "#082502",
      // contrastText: "#",
    },
  },
  typography: {
    h1: {
      color: "var(--Neutral---99, #fffbfe)",
      fontSize: "3.5625rem",
      fontWeight: "400",
      lineHeight: "3rem",
      letterSpacing: "-0.01563rem",
    },
    h2: {
      color: "var(--Primary---70, #daedd5)",
      fontSize: "2.5rem",
      fontWeight: "400",
      lineHeight: "2.75rem",
    },
    h3: {
      color: " #fff",
      fontSize: "1.5rem",
      fontWeight: "400",
      lineHeight: "1.75rem",
      letterSpacing: "-0.01563rem",
    },
    body1: {
      color: "var(--Neutral---99, #fffbfe)",
      fontSize: "1.2rem",
      fontWeight: "400",
      lineHeight: "1.5rem",
      letterSpacing: "0.03125rem",
    },
    body2: {
      fontWeight: "400",
      fontSize: "1.2rem",
      lineHeight: "1.1rem",
      letterSpacing: "-0.03rem",
    },
    titleDrawer: {
      color: "var(--Primary---70, #daedd5)",
      fontSize: "2.5rem",
      fontWeight: "400",
      lineHeight: "2.75rem",
      marginBottom: "2rem",
      textAlign: "center",
    },
    bodyDrawer: {
      color: "#fffbfe",
      fontSize: "1rem",
      fontWeight: "200",
      marginBottom: "2rem",
    },
    contentDrawer: {
      color: "#fffbfe",
      fontSize: "1rem",
      fontWeight: "200",
    },
    titleCards: {
      color: "var(--Primary--60, #b8d6b0)",
      fontSize: "1.2rem",
      fontWeight: "400",
      textDecorationLine: "underline",
    },
    bodyCards: {
      fontWeight: "200",
      fontSize: "1.2rem",
      lineHeight: "1.1rem",
      letterSpacing: "-0.03rem",
    },
  },
  components: {
    ...TextField,
    ...Slider,
    ...Drawer,
    ...accordion,
    ...tableUi,
  },
});
