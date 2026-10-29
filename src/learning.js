export const MODES = ['recognize', 'listen', 'read', 'use', 'write'];

const PALETTE = ['#ff6b6b', '#ff9f43', '#feca57', '#48dbb4', '#54a0ff', '#5f6ee8', '#a66dd4', '#ef7db5'];
const word = (id, term, pinyin, english, group, emoji, scene, extra = {}) => ({
  id, term, pinyin, english, group, emoji, scene,
  color: extra.color || PALETTE[Math.abs([...id].reduce((sum, letter) => sum + letter.charCodeAt(0), 0)) % PALETTE.length],
  level: extra.level || 'theme',
});

export const WORDS = [
  word('one', '一', 'yī', 'one', 'number', '1️⃣', '盘子里有 ___ 个苹果。', { level: 'school' }),
  word('two', '二', 'èr', 'two', 'number', '2️⃣', '我有 ___ 只小手。', { level: 'school' }),
  word('three', '三', 'sān', 'three', 'number', '3️⃣', '树上有 ___ 只小鸟。', { level: 'school' }),
  word('four', '四', 'sì', 'four', 'number', '4️⃣', '小桌子有 ___ 条腿。', { level: 'school' }),
  word('five', '五', 'wǔ', 'five', 'number', '5️⃣', '一只手有 ___ 根手指。', { level: 'school' }),
  word('six', '六', 'liù', 'six', 'number', '6️⃣', '盒子里有 ___ 支彩笔。', { level: 'school' }),
  word('seven', '七', 'qī', 'seven', 'number', '7️⃣', '一个星期有 ___ 天。', { level: 'school' }),
  word('eight', '八', 'bā', 'eight', 'number', '8️⃣', '章鱼有 ___ 条腿。', { level: 'school' }),
  word('nine', '九', 'jiǔ', 'nine', 'number', '9️⃣', '拼图还差 ___ 块。', { level: 'school' }),
  word('ten', '十', 'shí', 'ten', 'number', '🔟', '两只手有 ___ 根手指。', { level: 'school' }),
  word('hundred', '百', 'bǎi', 'hundred', 'number', '💯', '十个十是 ___。', { level: 'school' }),
  word('thousand', '千', 'qiān', 'thousand', 'number', '🏯', '十个百是 ___。', { level: 'school' }),
  word('ten-thousand', '万', 'wàn', 'ten thousand', 'number', '✨', '十个千是 ___。', { level: 'school' }),

  ...[
    ['red', '红', 'hóng', 'red', '🍓', '草莓是 ___ 色的。', '#ef4444'], ['blue', '蓝', 'lán', 'blue', '🌊', '大海是 ___ 色的。', '#3b82f6'],
    ['orange', '橙', 'chéng', 'orange', '🍊', '橙子是 ___ 色的。', '#f97316'], ['yellow', '黄', 'huáng', 'yellow', '🌞', '太阳像 ___ 色的圆球。', '#facc15'],
    ['green', '绿', 'lǜ', 'green', '🌿', '小草是 ___ 色的。', '#22c55e'], ['cyan', '青', 'qīng', 'cyan/green', '🦚', '孔雀羽毛有 ___ 色。', '#16a6a1'],
    ['purple', '紫', 'zǐ', 'purple', '🍇', '葡萄是 ___ 色的。', '#9333ea'], ['black', '黑', 'hēi', 'black', '🐈‍⬛', '夜空是 ___ 色的。', '#334155'],
    ['white', '白', 'bái', 'white', '☁️', '云朵是 ___ 色的。', '#f8fafc'], ['gray', '灰', 'huī', 'gray', '🐘', '大象是 ___ 色的。', '#94a3b8'],
    ['pink', '粉', 'fěn', 'pink', '🌸', '花朵是 ___ 色的。', '#f9a8d4'], ['brown', '棕', 'zōng', 'brown', '🐻', '小熊是 ___ 色的。', '#92400e'],
    ['gold', '金', 'jīn', 'gold', '🏅', '奖牌闪着 ___ 色的光。', '#d4a017'], ['silver', '银', 'yín', 'silver', '🌙', '月光像 ___ 色。', '#a8b1bd'],
    ['light-blue', '浅蓝', 'qiǎn lán', 'light blue', '🦋', '小蝴蝶是 ___ 色的。', '#7dd3fc'], ['light-orange', '浅橙', 'qiǎn chéng', 'light orange', '🦊', '小狐狸是 ___ 色的。', '#fdba74'],
    ['light-green', '浅绿', 'qiǎn lǜ', 'light green', '🐸', '小青蛙是 ___ 色的。', '#86efac'], ['light-gold', '浅金', 'qiǎn jīn', 'light gold', '🐥', '小鸡是 ___ 色的。', '#fde68a'],
  ].map(([id, term, pinyin, english, emoji, scene, color]) => word(id, term, pinyin, english, 'color', emoji, scene, { color, level: 'school' })),

  word('mouth', '嘴巴', 'zuǐ ba', 'mouth', 'body', '👄', '我用 ___ 吃饭、说话。', { level: 'school' }),
  word('nose', '鼻子', 'bí zi', 'nose', 'body', '👃', '我用 ___ 闻花香。', { level: 'school' }),
  word('eyes', '眼睛', 'yǎn jing', 'eyes', 'body', '👀', '我用 ___ 看彩虹。', { level: 'school' }),
  word('ears', '耳朵', 'ěr duo', 'ears', 'body', '👂', '我用 ___ 听音乐。', { level: 'school' }),
  word('hand', '手', 'shǒu', 'hand', 'body', '✋', '我用 ___ 画画。', { level: 'school' }),
  word('me', '我', 'wǒ', 'me', 'family', '🙋‍♀️', '___ 喜欢读书。', { level: 'school' }),
  word('dad', '爸爸', 'bà ba', 'dad', 'family', '👨', '___ 和我一起玩。', { level: 'school' }),
  word('mom', '妈妈', 'mā ma', 'mom', 'family', '👩', '___ 给我一个拥抱。', { level: 'school' }),
  word('friend', '朋友', 'péng you', 'friend', 'school', '🧒🏽👧🏻', '我和 ___ 一起上学。', { level: 'school' }),
  word('home', '家', 'jiā', 'home', 'family', '🏠', '放学后我回 ___。', { level: 'school' }),
  word('goldfish', '金鱼', 'jīn yú', 'goldfish', 'animal', '🐠', '小小的 ___ 在水里游。', { level: 'school' }),

  ...[
    ['spring', '春', 'chūn', 'spring', 'season', '🌱', '___ 天花开了。'], ['summer', '夏', 'xià', 'summer', 'season', '☀️', '___ 天可以游泳。'],
    ['autumn', '秋', 'qiū', 'autumn', 'season', '🍂', '___ 天树叶落下。'], ['winter', '冬', 'dōng', 'winter', 'season', '⛄', '___ 天会下雪。'],
    ['rain', '雨', 'yǔ', 'rain', 'weather', '🌧️', '今天下 ___ 了。'], ['snow', '雪', 'xuě', 'snow', 'weather', '❄️', '白白的 ___ 从天上落下。'],
    ['wind', '风', 'fēng', 'wind', 'weather', '🌬️', '___ 吹动树叶。'], ['cloud', '云', 'yún', 'cloud', 'weather', '☁️', '天上有一朵 ___。'],
    ['cat', '猫', 'māo', 'cat', 'animal', '🐱', '小 ___ 喵喵叫。'], ['dog', '狗', 'gǒu', 'dog', 'animal', '🐶', '小 ___ 汪汪叫。'],
    ['rabbit', '兔', 'tù', 'rabbit', 'animal', '🐰', '小 ___ 有长耳朵。'], ['bird', '鸟', 'niǎo', 'bird', 'animal', '🐦', '小 ___ 在天上飞。'],
    ['big', '大', 'dà', 'big', 'opposite', '🐘', '大象很 ___。'], ['small', '小', 'xiǎo', 'small', 'opposite', '🐭', '小老鼠很 ___。'],
    ['up', '上', 'shàng', 'up', 'opposite', '⬆️', '小鸟飞到天 ___。'], ['down', '下', 'xià', 'down', 'opposite', '⬇️', '小猫躲在桌子 ___。'],
    ['hot', '热', 'rè', 'hot', 'opposite', '🔥', '夏天很 ___。'], ['cold', '冷', 'lěng', 'cold', 'opposite', '🧊', '冬天很 ___。'],
    ['walk', '走', 'zǒu', 'walk', 'action', '🚶‍♀️', '我们一起 ___ 路。'], ['run', '跑', 'pǎo', 'run', 'action', '🏃‍♀️', '小马快快地 ___。'],
    ['jump', '跳', 'tiào', 'jump', 'action', '🤸‍♀️', '小兔向上 ___。'], ['sit', '坐', 'zuò', 'sit', 'action', '🪑', '请 ___ 在椅子上。'],
    ['eat', '吃', 'chī', 'eat', 'action', '🍽️', '我用嘴巴 ___ 饭。'], ['drink', '喝', 'hē', 'drink', 'action', '🥛', '口渴了要 ___ 水。'],
    ['apple', '苹果', 'píng guǒ', 'apple', 'plant', '🍎', '我喜欢吃红色的 ___。'], ['banana', '香蕉', 'xiāng jiāo', 'banana', 'plant', '🍌', '小猴喜欢吃 ___。'],
    ['watermelon', '西瓜', 'xī guā', 'watermelon', 'plant', '🍉', '夏天吃甜甜的 ___。'], ['flower', '花', 'huā', 'flower', 'plant', '🌷', '花园里开了一朵 ___。'],
    ['tree', '树', 'shù', 'tree', 'plant', '🌳', '小鸟停在 ___ 上。'], ['clothes', '衣服', 'yī fu', 'clothes', 'clothes', '👕', '我穿上干净的 ___。'],
    ['shoes', '鞋子', 'xié zi', 'shoes', 'clothes', '👟', '出门要穿 ___。'], ['hat', '帽子', 'mào zi', 'hat', 'clothes', '🧢', '太阳大，我戴 ___。'],
    ['rice', '饭', 'fàn', 'rice/meal', 'food', '🍚', '我们一起吃 ___。'], ['water', '水', 'shuǐ', 'water', 'food', '💧', '口渴了要喝 ___。'],
    ['milk', '牛奶', 'niú nǎi', 'milk', 'food', '🥛', '早餐我喝 ___。'], ['bread', '面包', 'miàn bāo', 'bread', 'food', '🍞', '香香的 ___ 出炉了。'],
    ['door', '门', 'mén', 'door', 'home', '🚪', '回家先开 ___。'], ['car', '车', 'chē', 'car', 'home', '🚗', '我们坐 ___ 去学校。'],
    ['teacher', '老师', 'lǎo shī', 'teacher', 'school', '👩‍🏫', '___ 教我们读书。'], ['classmate', '同学', 'tóng xué', 'classmate', 'school', '🧑‍🤝‍🧑', '我和 ___ 一起学习。'],
    ['school', '学校', 'xué xiào', 'school', 'school', '🏫', '早上我去 ___。'], ['book', '书', 'shū', 'book', 'school', '📖', '我打开 ___ 来读。'],
    ['pen', '笔', 'bǐ', 'pen', 'school', '✏️', '我用 ___ 写字。'],
  ].map(([id, term, pinyin, english, group, emoji, scene]) => word(id, term, pinyin, english, group, emoji, scene)),
];

export const CURRICULUM_UNITS = [
  { start: '08-17', end: '08-30', colorTerm: '红', theme: '数字', focusTerms: ['一', '二', '三', '四', '五', '红'] },
  { start: '08-31', end: '09-11', colorTerm: '蓝', theme: '颜色', focusTerms: ['红', '蓝', '黄', '绿'] },
  { start: '09-12', end: '09-20', colorTerm: '橙', theme: '颜色', focusTerms: ['橙', '红', '黄', '蓝'] },
  { start: '09-21', end: '10-09', colorTerm: '黄', theme: '季节', focusTerms: ['春', '夏', '秋', '冬', '黄'] },
  { start: '10-10', end: '10-23', colorTerm: '绿', theme: '身体', focusTerms: ['嘴巴', '鼻子', '眼睛', '耳朵', '手', '绿'] },
  { start: '10-24', end: '11-04', colorTerm: '青', theme: '家庭', focusTerms: ['我', '爸爸', '妈妈', '家', '青'] },
  { start: '11-05', end: '11-18', colorTerm: '紫', theme: '天气', focusTerms: ['雨', '雪', '风', '云', '紫'] },
  { start: '11-19', end: '12-04', colorTerm: '黑', theme: '动物', focusTerms: ['猫', '狗', '兔', '鸟', '金鱼', '黑'] },
  { start: '12-05', end: '12-17', colorTerm: '白', theme: '反义词', focusTerms: ['大', '小', '上', '下', '冷', '热', '白'] },
  { start: '01-12', end: '01-22', colorTerm: '灰', theme: '动作', focusTerms: ['走', '跑', '跳', '坐', '吃', '喝', '灰'] },
  { start: '01-23', end: '02-19', colorTerm: '粉', theme: '水果植物', focusTerms: ['苹果', '香蕉', '西瓜', '花', '树', '粉'] },
  { start: '02-20', end: '03-04', colorTerm: '棕', theme: '衣服', focusTerms: ['衣服', '鞋子', '帽子', '棕'] },
  { start: '03-05', end: '03-19', colorTerm: '金', theme: '颜色', focusTerms: ['金', '红', '黄', '棕'] },
  { start: '03-20', end: '03-25', colorTerm: '银', theme: '食物', focusTerms: ['饭', '水', '牛奶', '面包', '银'] },
  { start: '04-06', end: '04-16', colorTerm: '浅蓝', theme: '家和车', focusTerms: ['家', '门', '车', '浅蓝'] },
  { start: '04-17', end: '04-29', colorTerm: '浅橙', theme: '家和车', focusTerms: ['家', '门', '车', '浅橙'] },
  { start: '05-04', end: '05-14', colorTerm: '浅绿', theme: '水果植物', focusTerms: ['花', '树', '浅绿'] },
  { start: '05-15', end: '05-28', colorTerm: '浅金', theme: '学校', focusTerms: ['老师', '同学', '朋友', '学校', '书', '笔', '浅金'] },
];

export const ANIMAL_REWARDS = [
  { id: 'rabbit', name: '小兔米米', points: 0, image: './assets/animals/rabbit.svg' }, { id: 'fox', name: '狐狸橙橙', points: 25, image: './assets/animals/fox.svg' },
  { id: 'panda', name: '熊猫团团', points: 60, image: './assets/animals/panda.svg' }, { id: 'cat', name: '小猫蓝蓝', points: 100, image: './assets/animals/cat.svg' },
  { id: 'owl', name: '猫头鹰博士', points: 160, image: './assets/animals/owl.svg' }, { id: 'bear', name: '小熊星星', points: 240, image: './assets/animals/bear.svg' },
];

export function createDefaultProgress(words = WORDS) { return Object.fromEntries(words.map(({ id }) => [id, Object.fromEntries(MODES.map((mode) => [mode, 0]))])); }
function shuffle(items, random = Math.random) { const result = [...items]; for (let index = result.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(random() * (index + 1)); [result[index], result[swapIndex]] = [result[swapIndex], result[index]]; } return result; }
const scoreWord = (item, progress) => MODES.reduce((total, mode) => total + (progress[item.id]?.[mode] || 0), 0);

export function chooseSessionWords(words, progress, count = 5, random = Math.random, focusTerms = []) {
  const focusSet = new Set(focusTerms);
  const focused = shuffle(words.filter((item) => focusSet.has(item.term)), random).sort((a, b) => scoreWord(a, progress) - scoreWord(b, progress));
  const review = shuffle(words.filter((item) => !focusSet.has(item.term)), random).sort((a, b) => scoreWord(a, progress) - scoreWord(b, progress));
  const focusCount = focused.length ? Math.min(focused.length, Math.max(1, Math.min(3, count - 1))) : 0;
  return shuffle([...focused.slice(0, focusCount), ...review.slice(0, count - focusCount)], random);
}

export function buildChoices(answer, words, count = 4, random = Math.random) {
  const sameGroup = words.filter((item) => item.group === answer.group && item.id !== answer.id);
  const fallback = words.filter((item) => item.group !== answer.group && item.id !== answer.id);
  const preferred = shuffle(sameGroup, random).slice(0, count - 1);
  const distractors = preferred.length === count - 1 ? preferred : [...preferred, ...shuffle(fallback, random).slice(0, count - 1 - preferred.length)];
  return shuffle([answer, ...distractors], random);
}

export function updateProgress(progress, wordId, mode, correct) { const current = progress[wordId]?.[mode] || 0; return { ...progress, [wordId]: { ...progress[wordId], [mode]: Math.max(0, Math.min(5, current + (correct ? 1 : -0.5))) } }; }
export function calculateStars(correct, total) { const ratio = total ? correct / total : 0; if (ratio >= 0.8) return 3; if (ratio >= 0.5) return 2; return 1; }

const schoolDay = (month, day) => (month < 8 ? month + 12 : month) * 100 + day;
const parseSchoolDay = (value) => { const [month, day] = value.split('-').map(Number); return schoolDay(month, day); };
export function getCurrentUnit(date = new Date()) {
  const today = schoolDay(date.getMonth() + 1, date.getDate());
  return CURRICULUM_UNITS.find((unit) => today >= parseSchoolDay(unit.start) && today <= parseSchoolDay(unit.end)) || CURRICULUM_UNITS.reduce((closest, unit) => (parseSchoolDay(unit.start) <= today ? unit : closest), CURRICULUM_UNITS[0]);
}

const localDateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export function calculateReward(correct, total, state = {}, date = new Date()) {
  const today = localDateKey(date); const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  const sameDay = state.lastPracticeDate === today; const continues = state.lastPracticeDate === localDateKey(yesterday);
  return { ...state, points: (state.points || 0) + Math.max(0, Math.min(correct, total)) * 10, streak: sameDay ? (state.streak || 1) : continues ? (state.streak || 0) + 1 : 1, lastPracticeDate: today };
}
export function getUnlockedAnimals(points = 0) { return ANIMAL_REWARDS.filter((animal) => points >= animal.points); }
