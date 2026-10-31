import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
await import('../learning.js');
const { ANIMALS, EXTENSIONS, MODES, QUESTIONS_PER_MODE, WORDS, buildChoices, createRound, extensionsFor } = globalThis.ForestHanziData;

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test('the new game has five distinct learning modes and child-friendly content', () => {
  assert.deepEqual(MODES, ['identify', 'listen', 'read', 'word', 'write']);
  assert.ok(WORDS.length >= 24);
  assert.ok(ANIMALS.length >= 3);
  assert.ok(WORDS.every((word) => word.term && word.pinyin && word.emoji && word.phrase));
});

test('a round triples every learning mode into fifteen unique tasks', () => {
  const round = createRound(() => 0.31);
  assert.equal(QUESTIONS_PER_MODE, 3);
  assert.equal(round.length, 15);
  assert.equal(new Set(round.map((item) => item.word.id)).size, 15);
  for (const [index, mode] of MODES.entries()) {
    assert.deepEqual(round.slice(index * 3, index * 3 + 3).map((item) => item.mode), [mode, mode, mode]);
  }
});

test('choices include the answer once', () => {
  const answer = WORDS[0];
  const choices = buildChoices(answer, 3, () => 0.22);
  assert.equal(choices.length, 3);
  assert.equal(choices.filter((word) => word.id === answer.id).length, 1);
});

test('extension cards contain both homophones and similar-looking characters', () => {
  const coreTerms = new Set(WORDS.map((word) => word.term));
  assert.ok(EXTENSIONS.some((item) => item.kind === '同音字'));
  assert.ok(EXTENSIONS.some((item) => item.kind === '形近字'));
  assert.equal(EXTENSIONS.every((item) => !coreTerms.has(item.newTerm)), true);
  assert.ok(extensionsFor([{ term: '一' }]).some((item) => item.newTerm === '衣'));
});

test('the standalone page has no points, recording, or Rainbow Island dependency', async () => {
  const [html, app, css] = await Promise.all([
    readFile(path.join(root, 'index.html'), 'utf8'),
    readFile(path.join(root, 'app.js'), 'utf8'),
    readFile(path.join(root, 'styles.css'), 'utf8'),
  ]);
  assert.match(html, /森林汉字探险队/);
  assert.match(html, /id="sound-toggle"/);
  assert.match(html, /id="writing-canvas"/);
  assert.match(html, /新字小发现/);
  assert.match(html, /id="phase-celebration"/);
  assert.match(html, /约 15 分钟/);
  assert.match(html, /<script src="\.\/learning\.js\?v=4"><\/script>/);
  assert.match(html, /<script src="\.\/app\.js\?v=4"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
  assert.doesNotMatch(app, /^import\s/m);
  assert.match(app, /^\(function \(\) \{/);
  assert.match(app, /AudioContext/);
  assert.match(app, /renderPictureChoices/);
  assert.match(app, /showPhaseCelebration/);
  assert.doesNotMatch(app, /word\.sentence|sentence/);
  assert.match(css, /touch-action:\s*none/);
  assert.doesNotMatch(`${html}\n${app}`, /积分|星星|录音|彩虹汉字岛/);
  assert.doesNotMatch(html, /\.\.\//);
});
