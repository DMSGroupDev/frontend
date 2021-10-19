import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";

var primaryColor = "#79B4B7";
if (localStorage.getItem('primaryColor') !== "undefined") {
    primaryColor = localStorage.getItem('primaryColor')
}

var secondaryColor = "#364F6B";
if (localStorage.getItem('secondaryColor') !== "undefined") {
    secondaryColor = localStorage.getItem('secondaryColor')
}

const MyTheme = createMuiTheme(
    merge({}, defaultTheme, {
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
            error: {
                main: "#F39189",
            }
        },
        typography: {
            fontSize: 18,
        },
    })
);

export default MyTheme