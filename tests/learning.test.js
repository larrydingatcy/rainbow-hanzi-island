import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ANIMAL_REWARDS,
  CURRICULUM_UNITS,
  WORDS,
  buildChoices,
  calculateReward,
  calculateStars,
  chooseSessionWords,
  createDefaultProgress,
  getCurrentUnit,
  getUnlockedAnimals,
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

test('the teacher color sequence and learning themes are represented', () => {
  const terms = new Set(WORDS.map((word) => word.term));
  for (const term of ['青', '黑', '灰', '粉', '金', '银', '浅蓝', '浅橙', '浅绿', '浅金']) {
    assert.ok(terms.has(term), `missing teacher color ${term}`);
  }
  const themes = new Set(CURRICULUM_UNITS.map((unit) => unit.theme));
  for (const theme of ['数字', '颜色', '季节', '身体', '家庭', '天气', '动物', '反义词', '动作', '水果植物', '衣服', '食物', '家和车', '学校']) {
    assert.ok(themes.has(theme), `missing theme ${theme}`);
  }
});

test('the date-aware curriculum finds the family and cyan unit', () => {
  const unit = getCurrentUnit(new Date('2026-10-29T12:00:00'));
  assert.equal(unit.colorTerm, '青');
  assert.equal(unit.theme, '家庭');
  assert.ok(unit.focusTerms.includes('爸爸'));
});

test('a focused session mixes current words with spaced review', () => {
  const progress = createDefaultProgress(WORDS);
  const selected = chooseSessionWords(WORDS, progress, 5, () => 0.2, ['青', '爸爸', '妈妈', '家']);
  const focused = selected.filter((word) => ['青', '爸爸', '妈妈', '家'].includes(word.term));
  assert.equal(selected.length, 5);
  assert.ok(focused.length >= 3);
  assert.ok(focused.length < 5);
});

test('rewards grant points, keep a daily streak and unlock animal friends', () => {
  const first = calculateReward(5, 5, { points: 0, streak: 0, lastPracticeDate: '' }, new Date('2026-10-28T12:00:00'));
  const second = calculateReward(4, 5, first, new Date('2026-10-29T12:00:00'));
  assert.equal(first.points, 50);
  assert.equal(first.streak, 1);
  assert.equal(second.points, 90);
  assert.equal(second.streak, 2);
  assert.ok(ANIMAL_REWARDS.length >= 6);
  assert.ok(getUnlockedAnimals(90).length >= 3);
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
