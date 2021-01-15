import { createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        li: {
          listStyle: "none",
        },
        ul: {
          padding: 0,
        }
      },
    },
  },
  palette: {
    primary: {
      main: cyan[600],
      contrastText: "#fff",
    },
  },
});
