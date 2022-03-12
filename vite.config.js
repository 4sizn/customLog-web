// const path = require("path");
import path from "path";
import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";

module.exports = defineConfig({
	optimizeDeps: {
		exclude: ["src/__test__", "src/sample.ts", "src/app.ts"],
	},
	plugins: [typescript()],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "CustomLog",
			fileName: (format) => `custom-log.${format}.js`,
		},
	},
});
