import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.dirname(testsDirectory);

test('the static page exposes touch-friendly learning activities', async () => {
  const html = await readFile(path.join(projectDirectory, 'index.html'), 'utf8');
  for (const id of ['home-screen', 'game-screen', 'word-screen', 'draw-screen', 'result-screen', 'progress-screen']) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
  assert.match(html, /每日探险/);
  assert.match(html, /认一认/);
  assert.match(html, /听一听/);
  assert.match(html, /用一用/);
  assert.match(html, /写一写/);
  assert.match(html, /<canvas[^>]+id=["']writing-canvas["']/);
  assert.match(html, /本周重点/);
  assert.match(html, /动物伙伴/);
  assert.match(html, /积分/);
  assert.match(html, /<script[^>]+type=["']module["'][^>]+src=["']\.\/src\/app\.js["']/);
  assert.doesNotMatch(html, /Bluey/i);
});

test('the web app can be installed and cached on an iPad', async () => {
  const [html, manifest, worker] = await Promise.all([
    readFile(path.join(projectDirectory, 'index.html'), 'utf8'),
    readFile(path.join(projectDirectory, 'manifest.webmanifest'), 'utf8'),
    readFile(path.join(projectDirectory, 'sw.js'), 'utf8'),
  ]);
  assert.match(html, /manifest\.webmanifest/);
  assert.equal(JSON.parse(manifest).display, 'standalone');
  assert.match(worker, /index\.html/);
});
