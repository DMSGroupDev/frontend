import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";

var primaryColor = "#79B4B7";
if (localStorage.getItem('primaryColor') !== "undefined" && localStorage.getItem('primaryColor') != null) {
    primaryColor = localStorage.getItem('primaryColor')
} else {
    localStorage.setItem('primaryColor', primaryColor);
}

var secondaryColor = "#364F6B";
if (localStorage.getItem('secondaryColor') !== "undefined" && localStorage.getItem('secondaryColor') != null) {
    secondaryColor = localStorage.getItem('secondaryColor')
} else {
    localStorage.setItem('secondaryColor', secondaryColor);
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
            },
            warning: {
                light: "#ffcc80",
                main: "#ffb74d",
                dark: "#ff9800"
            },
        },
        typography: {
            fontSize: 18,
        },
        overrides: {
            RaMenuItemLink: {
                active: {
                    borderLeft: '3px solid',
                    borderLeftColor: primaryColor,
                    color: secondaryColor,
                },
                root: {
                    borderLeft: '3px solid #fff',
                    color: secondaryColor,
                    iconLeftColor: secondaryColor,
                }
            },
            RaSidebar: {
                fixed: {
                    position: 'inherit'
                }
            }
        },
    })
);

export default MyTheme