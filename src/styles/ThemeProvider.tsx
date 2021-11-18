/* istanbul ignore file */
import * as React from "react";
import ThemeContext from "./ThemeContext";

function ThemeProvider(props) {
  const { children, theme: localTheme } = props;

  const theme = localTheme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
