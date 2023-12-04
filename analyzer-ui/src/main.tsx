import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  ChakraProvider,
  CSSReset,
  ColorModeScript,
  extendTheme,
} from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
