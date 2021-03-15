import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from 'styled-reset';

export const myTheme: DefaultTheme = {
    bgColor: "black",
    fontColor: "white",
}

export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray",
    }
  
export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "#2c2c2c",
}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor };
    }
`