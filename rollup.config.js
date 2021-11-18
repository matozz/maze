/* eslint-disable @typescript-eslint/no-var-requires */
// import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

// const extensions = [".js", ".jsx", ".ts", ".tsx"];
const packageJson = require("./package.json");

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss(),
      copy({
        targets: [
          {
            src: "src/variables.scss",
            dest: "build",
            rename: "variables.scss",
          },
          {
            src: "src/typography.scss",
            dest: "build",
            rename: "typography.scss",
          },
        ],
      }),
      // external(),
      // resolve({
      //   mainFields: ["module", "main", "jsnext:main", "browser"],
      //   extensions,
      // }),
      // babel({
      //   exclude: "node_modules/**",
      //   presets: ["@babel/preset-react", "@babel/typescript"],
      //   extensions,
      // }),
      // commonjs({
      //   namedExports: {
      //     "react-js": ["isValidElementType"],
      //     "../../node_modules/react-dom/index.js": ["findDOMNode"],
      //     "../../node_modules/react-is/index.js": [
      //       "isValidElementType",
      //       "isElement",
      //       "ForwardRef",
      //     ],
      //     "../../node_modules/prop-types/index.js": ["element", "elementType"],
      //   },
      // }),
      // postcss({
      //   // use: ["sass"],
      //   plugins: [],
      //   modules: true,
      //   minimize: true,
      // }),
    ],
  },
];
