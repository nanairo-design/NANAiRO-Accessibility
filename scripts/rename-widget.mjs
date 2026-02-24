import fs from "node:fs"
import path from "node:path"

const widgetDir = process.cwd()
const pkg = JSON.parse(fs.readFileSync(path.join(widgetDir, "package.json"), "utf8"))
const version = pkg.version

const distDir = path.join(widgetDir, "dist")
const source = path.join(distDir, "index.js")
const target = path.join(distDir, `widget-core-${version}.js`)

if (!fs.existsSync(source)) {
  console.error("Widget build output not found:", source)
  process.exit(1)
}

fs.copyFileSync(source, target)
