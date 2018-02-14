import babel from "rollup-plugin-babel";

export default {
  input: "src/TypeWriter.js",
  output: {
    file: "bundle.js", 
    format: "iife",
    name: "TypeWriter",
    sourcemap: true
  },
  plugins: [babel({ exclude: "node_modules/**" })]
}
