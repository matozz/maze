import React, { useEffect, useState } from "react";
import useThemeContext from "@theme/hooks/useThemeContext";
import { createTheme, ThemeProvider } from "maze-ui";

export const Wrapper = ({ children, live }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { isDarkTheme } = useThemeContext();

  // Wrapper the theming
  const primaryDark = "#90caf9";
  const theme = createTheme({
    mode: mode,
    components: {
      ...["Button", "Switch", "Radio", "TextField"].reduce((comps, comp) => {
        comps[comp] = { dark: { color: primaryDark }, light: {} };
        return comps;
      }, {}),
      Dialog: { dark: { backgroundColor: "#383838" } },
      DialogTitle: { dark: { color: "#eaeef3" } },
      DialogContentText: { dark: { color: "rgba(255, 255, 255, 0.7)" } },
    },
  });

  useEffect(() => setMode(isDarkTheme ? "dark" : "light"), [isDarkTheme]);

  return (
    <div
      style={{
        position: "relative",
        outline: 0,
        marginBottom: live ? 0 : 24,
        display: "flex",
        justifyContent: "center",
        padding: 24,
        backgroundColor: isDarkTheme ? "rgb(10, 25, 41)" : "white",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: isDarkTheme
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(0, 0, 0, 0.12)",
        borderImage: "initial",
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
};
