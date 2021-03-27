import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const myTheme: DefaultTheme = {
  bgColor: 'black',
  fontColor: 'rgb(38, 38, 38)',
  accent: 'rgb(0, 149, 246)',
  borderColor: 'rgb(219, 219, 219)',
};

export const lightTheme = {
  fontColor: 'rgb(38, 38, 38)',
  bgColor: 'rgb(255, 255, 255)',
  accent: 'rgb(0, 149, 246)',
  borderColor: 'rgb(219, 219, 219)',
};

export const darkTheme = {
  fontColor: 'rgb(255, 255, 255)',
  bgColor: '#2c2c2c',
  accent: 'rgb(0, 149, 246)',
  borderColor: 'rgb(219, 219, 219)',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }
  input {
    all: unset;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
