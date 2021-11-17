---
sidebar_position: 1
---

# Installation

Maze is available as an **[npm package](https://www.npmjs.com/package/maze-ui)**.

## npm

To install and save in your package.json dependencies, run:

```shell
npm install maze-ui
```

## yarn

```shell
yarn add maze-ui
```

## Roboto font

Maze was designed with the **[Roboto](https://fonts.google.com/specimen/Roboto)** font in mind. So be sure to follow these instructions. For instance, via Google Web Fonts:

```jsx
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

Or via Fontsource npm package:

```shell
yarn add @fontsource/roboto 

npm install @fontsource/roboto
```

Full documentation can be found **[here](https://fontsource.org/docs/introduction)**.

## CDN

You can start using Maze with minimal Front-end infrastructure, which is great for prototyping.

```
https://unpkg.com/maze-ui@latest/dist/index.js
```

:::info Warning

⚠️ Using this approach in production is discouraged though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ links are using the `latest` tag to point to the latest version of the library. This pointer is unstable, it shifts as we release new versions. You should consider pointing to a specific version, such as `maze-ui@1.1.9`.

:::