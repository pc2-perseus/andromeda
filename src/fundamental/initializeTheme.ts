import type { Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const primary = {
    main: "#1495bf",
    light: "#18afe1",
    dark: "#107597",
};

const secondary = {
    main: "#4d998b",
    light: "#8cc5ba",
    dark: "#33665c",
};

export default function initializeTheme(isDarkMode: boolean): Theme {
    return createTheme({
        palette: {
            secondary: secondary,
            primary: primary,
            mode: isDarkMode ? "dark" : "light",
            background: {
                default: isDarkMode ? "#212529" : "#ffffff",
                paper: isDarkMode ? "#212529" : "#ffffff",
            },
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: primary.main,
                        },
                    },
                },
            },
            MuiPickersOutlinedInput: {
                styleOverrides: {
                    root: {
                        "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                            borderColor: primary.main,
                        },
                    },
                },
            },
        },
    });
}
