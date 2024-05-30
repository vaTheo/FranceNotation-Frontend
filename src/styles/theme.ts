import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const textField = {
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

const slider = {
  MuiSlider: {
    styleOverrides: {
      root: {
        height: "12px",
      },
      thumb: {
        width: "5px",
        height: " 30px",
        borderRadius: "16px",
        backgroundColor: "#FaFdF5",
        boxShadow: "0px 0px 0px 5px rgba(0, 0, 0, 0.25)",
      },
      valueLabel: {
        backgroundColor: "#FaFdF5",
        color: "#49454f",
        borderRadius: "10px",
        padding: "2px 8px",
      },
    },
  },
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
    //No change ATM
    // background: {
    //   default: "#020203",
    //   paper: "#020203",
    // },
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
    h5: {
      color: "var(--Primary--60, #b8d6b0)",
      fontSize: "1.25rem",
      fontWeight: "400",
      textDecorationLine: "underline",
    },
    body1: {
      color: "var(--Neutral---99, #fffbfe)",
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5rem",
      letterSpacing: "0.03125rem",
    },
  },
  components: {
    ...textField,
    ...slider,
  },
  //   MuiAutocomplete: {
  //     styleOverrides: {
  //       root: {
  //         color: "white",
  //       },
  //       inputRoot: {
  //         "& .MuiOutlinedInput-root": {
  //           transition: "border-color 0.3s ease",
  //           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //             borderColor: "#daedd5",
  //             transition: "border-color 0.3s ease",
  //           },
  //         },
  //       },
  //       input: {
  //         color: "#79b669",
  //         fontSize: "1rem",
  //         lineHeight: "1.5rem",
  //         letterSpacing: "0.5px",
  //         "&::placeholder": {
  //           color: "#aaa",
  //           opacity: 1,
  //         },
  //       },
  //       clearIndicator: {
  //         color: "rgba(255, 255, 255, 0.75)",
  //       },
  //       popupIndicator: {
  //         color: "rgba(255, 255, 255, 0.75)",
  //       },
  //       inputFocused: { //Text in text field
  //         color: "#daedd5",
  //         "&.Mui-focused": {
  //           color: "#daedd5",
  //         },
  //       },
  //     },
  //   },
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       root: {
  //         "& fieldset": {
  //           borderColor: "#daedd5",
  //         },
  //         "&:hover": {
  //           borderColor: "#daedd5",
  //         },
  //         "&.Mui-focused": {
  //           borderColor: "#79b669",
  //         },
  //       },
  //     },
  //   },
});
