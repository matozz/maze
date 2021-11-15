/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from ".";
import deepmerge from "../util/function/deepmerge";

export default function useMergedThemeProps({ name, oldProps }) {
  const theme = useTheme();

  let newProps: any = {};

  if (theme?.components?.[name]) {
    newProps = deepmerge(
      oldProps,
      theme?.components?.[name][theme?.mode] || theme?.components?.[name]
    );
  } else {
    newProps = oldProps;
  }

  newProps["theme"] = theme?.mode;

  return newProps;
}
