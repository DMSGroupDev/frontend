import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";

const MyTheme = createMuiTheme(
    merge({}, defaultTheme, {
        palette: {
            primary: {
                main: "#79B4B7",
            },
            secondary: {
                main: "#364F6B",
            },
            error: {
                main: "#F39189",
            }
        },
        typography: {
            fontSize: 18,
        }
    })
);

export default MyTheme