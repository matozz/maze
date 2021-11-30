/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button, ButtonProps } from "./Button";
import {
  createTheme,
  ThemeProvider,
  useMergedThemeProps,
} from "../../../styles";

import * as hook from "../../../styles";

describe("<Button />", () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {};
  });

  const renderComponent = () => render(<Button {...props}>Test Button</Button>);

  it("should render root, medium, and contained classes but no others", () => {
    const { getByRole } = renderComponent();
    const button = getByRole("button");

    expect(button).toHaveClass("maze-button");
    expect(button).toHaveClass("maze-button--medium");
    expect(button).toHaveClass("maze-button--contained");
    expect(button).not.toHaveClass("maze-button--small");
    expect(button).not.toHaveClass("maze-button--large");
    expect(button).not.toHaveClass("maze-button--text");
    expect(button).not.toHaveClass("maze-button--outlined");
  });

  it("can render small outlined button", () => {
    props.size = "small";
    props.variant = "outlined";
    const { getByRole } = renderComponent();
    const button = getByRole("button");

    expect(button).toHaveClass("maze-button--small");
    expect(button).not.toHaveClass("maze-button--medium");
    expect(button).toHaveClass("maze-button--outlined");
    expect(button).not.toHaveClass("maze-button--contained");
  });

  it("can render large text button", () => {
    props.size = "large";
    props.variant = "text";
    const { getByRole } = renderComponent();
    const button = getByRole("button");

    expect(button).toHaveClass("maze-button--large");
    expect(button).not.toHaveClass("maze-button--medium");
    expect(button).toHaveClass("maze-button--text");
    expect(button).not.toHaveClass("maze-button--contained");
  });

  it("can render contained button with elevation disabled", () => {
    props.preventElevation = true;
    const { getByRole } = renderComponent();
    const button = getByRole("button");

    expect(button).toHaveClass("maze-button--noelevation");
  });

  it("can render button with colors", () => {
    props.color = "#ed6c02";
    const { getByRole } = renderComponent();
    const button = getByRole("button");

    expect(button).toHaveStyle({
      "--maze-main-theme": "237, 108, 2",
    });
  });

  it("can render a disabled button", () => {
    const mockCallBack = jest.fn();

    props.onClick = mockCallBack;
    props.disabled = true;

    const { getByRole } = renderComponent();
    const button = getByRole("button");

    fireEvent.click(button);

    expect(mockCallBack).toBeCalledTimes(0);
    expect(button).toHaveAttribute("disabled");
  });

  it("can render a themed button with ThemeProvider", () => {
    const { getByRole } = render(
      <ThemeWrapper mode="dark">
        <Button {...props}>Dark Button</Button>
      </ThemeWrapper>
    );

    const button = getByRole("button");
    expect(button).toHaveClass("maze-button--dark");
    expect(button).toHaveStyle({
      "--maze-main-theme": "144, 202, 249",
    });
  });

  it("can render a themed button with manually triggered dark mode", () => {
    jest
      .spyOn(hook, "useMergedThemeProps")
      .mockReturnValue({ theme: "dark", color: "#1976d2" });

    const { getByRole } = render(<Button>Dark Button</Button>);
    const button = getByRole("button");
    expect(button).toHaveClass("maze-button--dark");
  });
});

const ThemeWrapper = ({ mode, children }) => {
  const theme = createTheme({
    mode: mode,
    components: {
      Button: { dark: { color: "#90caf9" }, light: {} },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
