/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";

import { Slider, SliderProps } from "./Slider";

describe("Test Component", () => {
  let props: SliderProps;

  beforeEach(() => {
    props = {
      size: "medium",
    };
  });

  const renderComponent = () => render(<Slider {...props} />);

  it("should have primary className with default props", () => {
    const { getByTestId } = renderComponent();

    const silderComponent = getByTestId("test-slider");

    expect(silderComponent).toHaveClass("root");
  });

  it("should have secondary className with theme set as secondary", () => {
    props.size = "small";
    const { getByTestId } = renderComponent();

    const silderComponent = getByTestId("test-slider");

    expect(silderComponent).toHaveClass("root-small");
  });
});
