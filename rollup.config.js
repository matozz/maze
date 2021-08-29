import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "./src/index.js",
    output: [
      // {
      //   file: "dist/index.js",
      //   format: "cjs",
      // },
      {
        file: "dist/index.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      external(),
      resolve({
        mainFields: ["module", "main", "jsnext:main", "browser"],
        extensions,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/typescript"],
        extensions,
      }),
      commonjs({
        namedExports: {
          "react-js": ["isValidElementType"],
          "../../node_modules/react-dom/index.js": ["findDOMNode"],
          "../../node_modules/react-is/index.js": [
            "isValidElementType",
            "isElement",
            "ForwardRef",
          ],
          "../../node_modules/prop-types/index.js": ["element", "elementType"],
        },
      }),
      postcss({
        // use: ["sass"],
        plugins: [],
        modules: true,
        minimize: true,
      }),
    ],
  },
];
