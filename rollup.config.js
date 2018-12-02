import { minify } from "uglify-es";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import amd from 'rollup-plugin-amd';

function getConfig(dest, format, ugly) {
  const conf = {
    input: "lib/alert.js",
    output: {
      exports: "named",
      file: dest,
      format,
      name: "alert",
      sourcemap: true
    },
    plugins: [
      resolve({
        jsnext: true
      }),
      amd(),
      commonjs(),
      babel({
        babelrc: false,
        presets: [
          [
            "env",
            {
              modules: false
            }
          ]
        ],
        plugins: ["external-helpers"]
      }),
      ugly &&
      uglify(
        {
          warnings: true,
          toplevel: true,
          sourceMap: true,
          mangle: {
            properties: false
          }
        },
        minify
      ),
      filesize()
    ].filter(Boolean)
  }
  return conf
}

const config = [
  getConfig("assets/alert.js", "cjs", false),
  getConfig("assets/alert.amd.js", "amd", true),
  getConfig("assets/alert.umd.js", "umd", true),
  getConfig("assets/alert.module.js", "es", true)
]

module.exports = config;