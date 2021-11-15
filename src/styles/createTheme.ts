/* eslint-disable @typescript-eslint/no-explicit-any */
import deepmerge from "../util/function/deepmerge";
import { defaultTheme } from "./defaultTheme";

export interface ThemeOptions {
  breakpoints?: Record<"xs" | "sm" | "md" | "lg" | "xl", number>;
  mode?: "dark" | "light";
  /**
   * @param {string} key - custom key to access the theme
   * @param {object} object - overide the default style
   */
  components?: Record<string, any>;
}

function createTheme(options: ThemeOptions = {}, ...args: any[]): any {
  const { breakpoints: breakpointsInput, mode: modeInput, ...other } = options;

  let theme = deepmerge(defaultTheme, {
    breakpoints: breakpointsInput,
    mode: modeInput,
  });

  theme = deepmerge(theme, other);

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}

export default createTheme;
