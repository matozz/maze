/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from ".";
import deepmerge from "../util/function/deepmerge";
import diffUserProps from "../util/function/diffUserProps";

export default function useMergedThemeProps({
  name,
  oldProps,
  defaultProps = {},
}) {
  const theme = useTheme();

  let newProps: any = {};

  if (theme?.components?.[name]) {
    const userProps = diffUserProps(oldProps, defaultProps);
    newProps = deepmerge(
      oldProps,
      theme?.components?.[name][theme?.mode] || theme?.components?.[name]
    );
    newProps = deepmerge(newProps, userProps);
  } else {
    newProps = oldProps;
  }

  newProps["theme"] = theme?.mode;

  return newProps;
}
