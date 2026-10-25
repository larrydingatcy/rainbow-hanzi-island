export const MODES = ['recognize', 'listen', 'read', 'use', 'write'];

export const WORDS = [
  { id: 'one', term: '一', pinyin: 'yī', english: 'one', group: 'number', emoji: '1️⃣', scene: '盘子里有 ___ 个苹果。', color: '#ff6b6b' },
  { id: 'two', term: '二', pinyin: 'èr', english: 'two', group: 'number', emoji: '2️⃣', scene: '我有 ___ 只小手。', color: '#ff9f43' },
  { id: 'three', term: '三', pinyin: 'sān', english: 'three', group: 'number', emoji: '3️⃣', scene: '树上有 ___ 只小鸟。', color: '#feca57' },
  { id: 'four', term: '四', pinyin: 'sì', english: 'four', group: 'number', emoji: '4️⃣', scene: '小桌子有 ___ 条腿。', color: '#48dbb4' },
  { id: 'five', term: '五', pinyin: 'wǔ', english: 'five', group: 'number', emoji: '5️⃣', scene: '一只手有 ___ 根手指。', color: '#54a0ff' },
  { id: 'six', term: '六', pinyin: 'liù', english: 'six', group: 'number', emoji: '6️⃣', scene: '盒子里有 ___ 支彩笔。', color: '#5f6ee8' },
  { id: 'seven', term: '七', pinyin: 'qī', english: 'seven', group: 'number', emoji: '7️⃣', scene: '一个星期有 ___ 天。', color: '#a66dd4' },
  { id: 'eight', term: '八', pinyin: 'bā', english: 'eight', group: 'number', emoji: '8️⃣', scene: '章鱼有 ___ 条腿。', color: '#ef7db5' },
  { id: 'nine', term: '九', pinyin: 'jiǔ', english: 'nine', group: 'number', emoji: '9️⃣', scene: '拼图还差 ___ 块。', color: '#f3688b' },
  { id: 'ten', term: '十', pinyin: 'shí', english: 'ten', group: 'number', emoji: '🔟', scene: '两只手有 ___ 根手指。', color: '#00a8a8' },
  { id: 'hundred', term: '百', pinyin: 'bǎi', english: 'hundred', group: 'number', emoji: '💯', scene: '十个十是 ___。', color: '#e55039' },
  { id: 'thousand', term: '千', pinyin: 'qiān', english: 'thousand', group: 'number', emoji: '🏯', scene: '十个百是 ___。', color: '#b7770d' },
  { id: 'ten-thousand', term: '万', pinyin: 'wàn', english: 'ten thousand', group: 'number', emoji: '✨', scene: '十个千是 ___。', color: '#8e44ad' },
  { id: 'red', term: '红', pinyin: 'hóng', english: 'red', group: 'color', emoji: '🍓', scene: '草莓是 ___ 色的。', color: '#ef4444' },
  { id: 'white', term: '白', pinyin: 'bái', english: 'white', group: 'color', emoji: '☁️', scene: '云朵是 ___ 色的。', color: '#f8fafc' },
  { id: 'blue', term: '蓝', pinyin: 'lán', english: 'blue', group: 'color', emoji: '🌊', scene: '大海是 ___ 色的。', color: '#3b82f6' },
  { id: 'green', term: '绿', pinyin: 'lǜ', english: 'green', group: 'color', emoji: '🌿', scene: '小草是 ___ 色的。', color: '#22c55e' },
  { id: 'yellow', term: '黄', pinyin: 'huáng', english: 'yellow', group: 'color', emoji: '🌞', scene: '太阳像 ___ 色的圆球。', color: '#facc15' },
  { id: 'orange', term: '橙', pinyin: 'chéng', english: 'orange', group: 'color', emoji: '🍊', scene: '橙子是 ___ 色的。', color: '#f97316' },
  { id: 'brown', term: '棕', pinyin: 'zōng', english: 'brown', group: 'color', emoji: '🐻', scene: '小熊是 ___ 色的。', color: '#92400e' },
  { id: 'purple', term: '紫', pinyin: 'zǐ', english: 'purple', group: 'color', emoji: '🍇', scene: '葡萄是 ___ 色的。', color: '#9333ea' },
  { id: 'mouth', term: '嘴巴', pinyin: 'zuǐ ba', english: 'mouth', group: 'life', emoji: '👄', scene: '我用 ___ 吃饭、说话。', color: '#fb7185' },
  { id: 'nose', term: '鼻子', pinyin: 'bí zi', english: 'nose', group: 'life', emoji: '👃', scene: '我用 ___ 闻花香。', color: '#fdba74' },
  { id: 'eyes', term: '眼睛', pinyin: 'yǎn jing', english: 'eyes', group: 'life', emoji: '👀', scene: '我用 ___ 看彩虹。', color: '#38bdf8' },
  { id: 'ears', term: '耳朵', pinyin: 'ěr duo', english: 'ears', group: 'life', emoji: '👂', scene: '我用 ___ 听音乐。', color: '#c084fc' },
  { id: 'hand', term: '手', pinyin: 'shǒu', english: 'hand', group: 'life', emoji: '✋', scene: '我用 ___ 画画。', color: '#fbbf24' },
  { id: 'me', term: '我', pinyin: 'wǒ', english: 'me', group: 'life', emoji: '🙋‍♀️', scene: '___ 喜欢读书。', color: '#f472b6' },
  { id: 'dad', term: '爸爸', pinyin: 'bà ba', english: 'dad', group: 'life', emoji: '👨', scene: '___ 和我一起玩。', color: '#60a5fa' },
  { id: 'friend', term: '朋友', pinyin: 'péng you', english: 'friend', group: 'life', emoji: '🧒🏽👧🏻', scene: '我和 ___ 一起上学。', color: '#34d399' },
  { id: 'home', term: '家', pinyin: 'jiā', english: 'home', group: 'life', emoji: '🏠', scene: '放学后我回 ___。', color: '#fb923c' },
  { id: 'mom', term: '妈妈', pinyin: 'mā ma', english: 'mom', group: 'life', emoji: '👩', scene: '___ 给我一个拥抱。', color: '#f472b6' },
  { id: 'goldfish', term: '金鱼', pinyin: 'jīn yú', english: 'goldfish', group: 'life', emoji: '🐠', scene: '小小的 ___ 在水里游。', color: '#f59e0b' },
];

export function createDefaultProgress(words = WORDS) {
  return Object.fromEntries(words.map(({ id }) => [id, Object.fromEntries(MODES.map((mode) => [mode, 0]))]));
}

function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function chooseSessionWords(words, progress, count = 5, random = Math.random) {
  const score = (word) => MODES.reduce((total, mode) => total + (progress[word.id]?.[mode] || 0), 0);
  return shuffle(words, random).sort((left, right) => score(left) - score(right)).slice(0, Math.min(count, words.length));
}

export function buildChoices(answer, words, count = 4, random = Math.random) {
  const sameGroup = words.filter((word) => word.group === answer.group && word.id !== answer.id);
  const fallback = words.filter((word) => word.group !== answer.group && word.id !== answer.id);
  const preferred = shuffle(sameGroup, random).slice(0, count - 1);
  const distractors = preferred.length === count - 1
    ? preferred
    : [...preferred, ...shuffle(fallback, random).slice(0, count - 1 - preferred.length)];
  return shuffle([answer, ...distractors], random);
}

export function updateProgress(progress, wordId, mode, correct) {
  const current = progress[wordId]?.[mode] || 0;
  return {
    ...progress,
    [wordId]: {
      ...progress[wordId],
      [mode]: Math.max(0, Math.min(5, current + (correct ? 1 : -0.5))),
    },
  };
}

export function calculateStars(correct, total) {
  const ratio = total ? correct / total : 0;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}
