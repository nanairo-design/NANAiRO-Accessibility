/**
 * Builds the distributable copies from `dist/`.
 *
 * The bundle ships in three places (CDN folder, WordPress plugin, and the
 * archives served by the landing page) and the plugin also carries a copy of
 * the TypeScript sources. Keeping that by hand invites drift, so run
 * `npm run package` after `npm run build` instead.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const at = (...parts) => join(root, ...parts);

const VERSION = JSON.parse(readFileSync(at('package.json'), 'utf8')).version;
const BUNDLE = 'nanairo-accessibility.iife.js';
const WORDPRESS_PLUGIN = at('packaging/wordpress/nanairo-accessibility');
const CDN_DIR = at('packaging/cdn');
const DOWNLOADS = at('public/downloads');

/**
 * Sources mirrored into the plugin so it ships human-readable code. Discovered
 * rather than listed: a hard-coded list silently drops a newly added module,
 * and the sync deletes the stale copies first, so the shipped source would no
 * longer build.
 */
const mirroredSources = () => readdirSync(at('src')).filter((name) => name.endsWith('.ts')).sort();

const kb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

/**
 * The plugin ships its own manifest and lockfile. npm records the manifest's
 * ranges in the lockfile root entry, so comparing the two catches a manifest
 * that was edited without refreshing the lockfile — which would make `npm ci`
 * fail for anyone building the shipped source.
 */
function checkPluginLockfile() {
  const base = join(WORDPRESS_PLUGIN, 'source');
  const manifest = JSON.parse(readFileSync(join(base, 'package.json'), 'utf8'));
  const lock = JSON.parse(readFileSync(join(base, 'package-lock.json'), 'utf8'));
  const recorded = lock.packages?.[''] ?? {};

  for (const field of ['dependencies', 'devDependencies']) {
    const expected = JSON.stringify(manifest[field] ?? {});
    const actual = JSON.stringify(recorded[field] ?? {});
    if (expected !== actual) {
      throw new Error(
        `packaging/wordpress/nanairo-accessibility/source: package-lock.json is out of date for "${field}".\n`
        + `  package.json:      ${expected}\n`
        + `  package-lock.json: ${actual}\n`
        + '  Run "npm install" in that directory and commit the refreshed lockfile.',
      );
    }
  }
  console.log('lockfile -> plugin source manifest and lockfile agree');
}

function readBundle() {
  const source = at('dist', BUNDLE);
  if (!existsSync(source)) {
    throw new Error(`${source} is missing — run "npm run build" first.`);
  }
  // The .map is deliberately not distributed alongside these copies, so the
  // annotation has to go too or every visitor with devtools open gets a 404.
  return readFileSync(source, 'utf8').replace(/\n?\/\/# sourceMappingURL=.*\n?$/, '\n');
}

function syncPluginSources() {
  const target = join(WORDPRESS_PLUGIN, 'source/src');
  mkdirSync(join(target, 'assets'), { recursive: true });

  for (const name of readdirSync(target)) {
    if (name.endsWith('.ts')) rmSync(join(target, name));
  }
  const sources = mirroredSources();
  for (const name of sources) {
    cpSync(at('src', name), join(target, name));
  }
  cpSync(at('src/assets'), join(target, 'assets'), { recursive: true });
  // The build config decides the bundle bytes, so the shipped source needs the
  // same one to be able to reproduce them.
  cpSync(at('vite.config.ts'), join(WORDPRESS_PLUGIN, 'source/vite.config.ts'));
  console.log(`sources  -> ${sources.length} files mirrored into the plugin (${sources.join(', ')})`);
}

function writeBundleCopies(bundle) {
  for (const destination of [join(CDN_DIR, BUNDLE), join(WORDPRESS_PLUGIN, 'assets/js', BUNDLE)]) {
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, bundle);
  }
  console.log(`bundle   -> ${kb(Buffer.byteLength(bundle))} (sourcemap annotation stripped)`);
}

/** Fixed so that repackaging unchanged files produces an identical archive. */
const ARCHIVE_TIMESTAMP = new Date('2020-01-01T00:00:00Z');

function normalizeTimes(path) {
  utimesSync(path, ARCHIVE_TIMESTAMP, ARCHIVE_TIMESTAMP);
  if (!statSync(path).isDirectory()) return;
  for (const entry of readdirSync(path)) normalizeTimes(join(path, entry));
}

function zip(archive, cwd, entries) {
  // Staged in a temp directory so the timestamps stored in the archive can be
  // normalized without touching the working tree.
  const staging = mkdtempSync(join(tmpdir(), 'nanairo-pack-'));
  try {
    for (const entry of entries) {
      cpSync(join(cwd, entry), join(staging, entry), { recursive: true });
      normalizeTimes(join(staging, entry));
    }
    rmSync(archive, { force: true });
    execFileSync('zip', ['-q', '-X', '-r', archive, ...entries], { cwd: staging, env: { ...process.env, TZ: 'UTC' } });
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
  console.log(`archive  -> ${archive.replace(`${root}/`, '')} (${kb(statSync(archive).size)})`);
}

function buildArchives() {
  mkdirSync(DOWNLOADS, { recursive: true });

  zip(join(DOWNLOADS, `nanairo-accessibility-cdn-${VERSION}.zip`), CDN_DIR, [BUNDLE, 'README.md', 'example.html']);
  zip(join(DOWNLOADS, `nanairo-accessibility-wordpress-${VERSION}.zip`), at('packaging/wordpress'), ['nanairo-accessibility']);

  const tarball = `nanairo-accessibility-${VERSION}.tgz`;
  execFileSync('npm', ['pack', '--silent', '--pack-destination', DOWNLOADS], { cwd: root });
  console.log(`archive  -> public/downloads/${tarball} (${kb(statSync(join(DOWNLOADS, tarball)).size)})`);
}

checkPluginLockfile();
syncPluginSources();
writeBundleCopies(readBundle());
buildArchives();
