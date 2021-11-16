---
sidebar_position: 2
---

# Usage

Maze components work in isolation. You can use any of the components as demonstrated in the documentation. Please refer to each component's **[demo page](../tutorial-extras/manage-docs-versions.md)** to see how they should be imported.

## Quick start

Here's a quick example to get you started, it's literally all you need:

```jsx
import * as React from "react";
import ReactDOM from "react-dom";
import { TextField } from "maze-ui";

function App() {
  return <TextField label="Filled" />;
}

ReactDOM.render(<App />, document.querySelector("#app"));
```

```jsx live
<Wrapper live>
  <TextField label="Filled" />
</Wrapper>
```

## Globals

Maze usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Responsive meta tag

Maze is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```jsx
<meta name="viewport" content="initial-scale=1, width=device-width" />
```