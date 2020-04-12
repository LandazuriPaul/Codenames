import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
  }
`;
