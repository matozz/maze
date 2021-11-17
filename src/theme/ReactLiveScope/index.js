/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import * as Maze from "maze-ui";
import { Wrapper } from "@site/src/components/ComponentsWrapper";

const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: "20px",
      color: "#fff",
      padding: "10px",
      cursor: "pointer",
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}
  >
    {children}
  </span>
);

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Highlight,
  ...Maze,
  Wrapper,
};

export default ReactLiveScope;
