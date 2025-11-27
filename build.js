import {build, context} from "esbuild"
import progress from "@olton/esbuild-plugin-progress"
import { replace } from "esbuild-plugin-replace";
import pkg from "./package.json" with {type: "json"};

const version = pkg.version
const production = process.env.MODE === "production"

const banner = `
/*!
 * Freemarker Wrapper v${version}.
 * Freemarker template engine integration for NodeJS.
 * Copyright ${new Date().getFullYear()} Serhii Pimenov
 * Licensed under MIT
 * Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 */
`

const options = {
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: production,
    sourcemap: !production,
    platform: "node",
    target: ["esnext"],
    banner: {
        js: banner
    },
    plugins: [
        progress(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
}

if (production) {
    await build({
        ...options,
        outfile: "./dist/freemarker.js",
        format: "esm"
    })
} else {
    const ctxEsm = await context({
        ...options,
        outfile: "./dist/freemarker.js",
        format: "esm"
    })

    await Promise.all([ctxEsm.watch(), ])
}

