import dependencyExtractPlugin from "esbuild-gutenberg-dependency-extract-plugin"
import { resolve } from "path"
import {build} from "esbuild"
import { exit } from "process"
import {sassPlugin} from "esbuild-sass-plugin"
import postcss from "postcss"
import autoprefixer from "autoprefixer"

const options = {
  entryPoints: { 
  "index": resolve(process.cwd(), "src", "index.js"),
  "admin/settings/basic": resolve(process.cwd(), "src", "admin/settings", "basic.js"),
  "admin/edit/index": resolve(process.cwd(), "src", "admin/edit", "index.js")
  },
  plugins: [
    dependencyExtractPlugin(),
    sassPlugin({
      type: "css",
      filter: /.(s[ac]ss|css)$/,
      async transformation(source) {
        const { css } = await postcss([autoprefixer]).process(source)
        return css
      }
    }),
  ],
  loader: {
    ".js": "jsx",
    ".scss": "css"
  },
  outdir: "dist",
  bundle: true
}

await build(options).catch(err => {
  console.log("err")
  exit(1)
})