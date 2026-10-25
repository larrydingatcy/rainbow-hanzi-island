import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WORDS,
  buildChoices,
  calculateStars,
  chooseSessionWords,
  createDefaultProgress,
  updateProgress,
} from '../src/learning.js';

test('the curriculum contains every requested group and photographed word', () => {
  const terms = new Set(WORDS.map((word) => word.term));
  for (const term of ['一', '十', '百', '千', '万', '红', '白', '蓝', '绿', '黄', '橙', '棕', '紫']) {
    assert.ok(terms.has(term), `missing ${term}`);
  }
  for (const term of ['嘴巴', '鼻子', '眼睛', '耳朵', '手', '我', '爸爸', '朋友', '家', '妈妈', '金鱼']) {
    assert.ok(terms.has(term), `missing photographed term ${term}`);
  }
});

test('a session favors words with less practice while staying unique', () => {
  const progress = createDefaultProgress(WORDS);
  const practicedId = WORDS[0].id;
  progress[practicedId] = { recognize: 5, listen: 5, use: 5, write: 5 };
  const selected = chooseSessionWords(WORDS, progress, 5, () => 0.2);
  assert.equal(selected.length, 5);
  assert.equal(new Set(selected.map((word) => word.id)).size, 5);
  assert.equal(selected.some((word) => word.id === practicedId), false);
});

test('answer choices include the answer once and use the same group', () => {
  const answer = WORDS.find((word) => word.term === '绿');
  const choices = buildChoices(answer, WORDS, 4, () => 0.1);
  assert.equal(choices.length, 4);
  assert.equal(choices.filter((word) => word.id === answer.id).length, 1);
  assert.equal(choices.every((word) => word.group === answer.group), true);
});

test('progress grows by mode and never drops below zero', () => {
  const word = WORDS[0];
  const progress = createDefaultProgress([word]);
  const correct = updateProgress(progress, word.id, 'recognize', true);
  const incorrect = updateProgress(correct, word.id, 'recognize', false);
  const manyIncorrect = Array.from({ length: 10 }).reduce(
    (state) => updateProgress(state, word.id, 'recognize', false),
    incorrect,
  );
  assert.equal(correct[word.id].recognize, 1);
  assert.equal(incorrect[word.id].recognize, 0.5);
  assert.equal(manyIncorrect[word.id].recognize, 0);
});

test('session stars are friendly and reward effort', () => {
  assert.equal(calculateStars(0, 5), 1);
  assert.equal(calculateStars(3, 5), 2);
  assert.equal(calculateStars(5, 5), 3);
});
