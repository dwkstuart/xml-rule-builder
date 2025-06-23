import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/xml-rule-builder.umd.js",
      format: "umd",
      name: "XmlRuleBuilder",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "@mui/material": "MaterialUI",
        "@emotion/react": "emotionReact",
        "@emotion/styled": "emotionStyled"
      }
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" })
  ],
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@emotion/react",
    "@emotion/styled"
  ]
}; 