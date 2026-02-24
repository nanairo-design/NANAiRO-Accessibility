import fs from "node:fs"
import path from "node:path"

const loaderDir = process.cwd()
const distDir = path.join(loaderDir, "dist")
const source = path.join(distDir, "index.global.js")
const target = path.join(distDir, "loader.js")

if (!fs.existsSync(source)) {
  console.error("Loader build output not found:", source)
  process.exit(1)
}

fs.copyFileSync(source, target)
