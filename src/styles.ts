import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from 'styled-reset';

export const myTheme: DefaultTheme = {
    bgColor: "black",
    fontColor: "white",
    accent: "rgb(0, 149, 246)",
    borderColor: "rgb(219, 219, 219)",
}

export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray",
    accent: "rgb(0, 149, 246)",
    borderColor: "rgb(219, 219, 219)"
}
  
export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "#2c2c2c",
    accent: "rgb(0, 149, 246)",
    borderColor: "rgb(219, 219, 219)"
}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all: unset;
    }
    * {
        box-sizing: border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: rgb(38, 38, 38);
    }
    a {
        text-decoration: none;
    }
`