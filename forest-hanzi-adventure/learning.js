const MODES = ['identify', 'listen', 'read', 'word', 'write'];
const QUESTIONS_PER_MODE = 3;

const ANIMALS = [
  { id: 'rabbit', name: '小兔米米', emoji: '🐰', color: '#ffe5ec', cheer: '竖起耳朵，仔细听！' },
  { id: 'fox', name: '狐狸橙橙', emoji: '🦊', color: '#ffead8', cheer: '动动脑筋，一定能找到！' },
  { id: 'panda', name: '熊猫团团', emoji: '🐼', color: '#e7f4e9', cheer: '慢慢来，每个字都很有趣！' },
  { id: 'bear', name: '小熊豆豆', emoji: '🐻', color: '#f5e9d7', cheer: '我们一起走过汉字森林！' },
];

const word = (id, term, pinyin, emoji, group, phrase, sentence) => ({ id, term, pinyin, emoji, group, phrase, sentence });

const WORDS = [
  word('one', '一', 'yī', '1️⃣', 'number', '一个', '树上有 ___ 只小鸟。'),
  word('two', '二', 'èr', '2️⃣', 'number', '二月', '我有 ___ 只小手。'),
  word('three', '三', 'sān', '3️⃣', 'number', '三朵花', '草地上开了 ___ 朵花。'),
  word('four', '四', 'sì', '4️⃣', 'number', '四季', '一年有 ___ 个季节。'),
  word('five', '五', 'wǔ', '5️⃣', 'number', '五颗星', '盘子里有 ___ 个苹果。'),
  word('six', '六', 'liù', '6️⃣', 'number', '六条鱼', '水里游着 ___ 条小鱼。'),
  word('seven', '七', 'qī', '7️⃣', 'number', '七天', '一个星期有 ___ 天。'),
  word('eight', '八', 'bā', '8️⃣', 'number', '八条腿', '章鱼有 ___ 条腿。'),
  word('nine', '九', 'jiǔ', '9️⃣', 'number', '九月', '八后面是 ___。'),
  word('ten', '十', 'shí', '🔟', 'number', '十根手指', '两只手有 ___ 根手指。'),
  word('sun', '日', 'rì', '☀️', 'nature', '日出', '山那边看到了 ___ 出。'),
  word('moon', '月', 'yuè', '🌙', 'nature', '月亮', '晚上可以看到 ___ 亮。'),
  word('mountain', '山', 'shān', '⛰️', 'nature', '大山', '远处有一座大 ___。'),
  word('water', '水', 'shuǐ', '💧', 'nature', '喝水', '口渴了要喝 ___。'),
  word('fire', '火', 'huǒ', '🔥', 'nature', '小火苗', '红红的 ___ 苗在跳舞。'),
  word('tree', '木', 'mù', '🌳', 'nature', '木头', '桌子可以用 ___ 头做。'),
  word('flower', '花', 'huā', '🌷', 'nature', '花朵', '春天开了一朵 ___。'),
  word('field', '田', 'tián', '🌾', 'nature', '水田', '农民伯伯在 ___ 里劳动。'),
  word('person', '人', 'rén', '🧑', 'people', '大人', '门口站着一个 ___。'),
  word('big', '大', 'dà', '🐘', 'opposite', '大象', '小猫旁边有一头 ___ 象。'),
  word('small', '小', 'xiǎo', '🐭', 'opposite', '小鸟', '树枝上停着一只 ___ 鸟。'),
  word('up', '上', 'shàng', '⬆️', 'position', '上面', '小鸟飞到天空 ___ 面。'),
  word('down', '下', 'xià', '⬇️', 'position', '下面', '小猫躲在桌子 ___ 面。'),
  word('middle', '中', 'zhōng', '🎯', 'position', '中间', '小兔站在队伍 ___ 间。'),
  word('mouth', '口', 'kǒu', '👄', 'body', '开口', '请张开 ___ 读一读。'),
  word('eye', '目', 'mù', '👀', 'body', '目光', '我的 ___ 光看向远方。'),
  word('ear', '耳', 'ěr', '👂', 'body', '耳朵', '用 ___ 朵认真听。'),
  word('hand', '手', 'shǒu', '✋', 'body', '小手', '举起你的 ___。'),
  word('home', '家', 'jiā', '🏠', 'people', '回家', '放学以后我回 ___。'),
  word('friend', '友', 'yǒu', '🤝', 'people', '朋友', '我和朋 ___ 一起玩。'),
  word('white', '白', 'bái', '☁️', 'color', '白云', '天上飘着一朵 ___ 云。'),
  word('green', '青', 'qīng', '🌿', 'color', '青草', '小羊在吃 ___ 草。'),
];

const EXTENSIONS = [
  { baseTerm: '一', newTerm: '衣', pinyin: 'yī', kind: '同音字', phrase: '衣服', emoji: '👕', tip: '读音一样，“衣”常常和衣服有关。' },
  { baseTerm: '八', newTerm: '巴', pinyin: 'bā', kind: '同音字', phrase: '尾巴', emoji: '🐒', tip: '读音一样，“巴”可以组成“尾巴”。' },
  { baseTerm: '十', newTerm: '石', pinyin: 'shí', kind: '同音字', phrase: '石头', emoji: '🪨', tip: '读音一样，“石”表示石头。' },
  { baseTerm: '七', newTerm: '期', pinyin: 'qī', kind: '同音字', phrase: '星期', emoji: '📅', tip: '读音一样，“期”就在“星期”里。' },
  { baseTerm: '青', newTerm: '清', pinyin: 'qīng', kind: '同音字', phrase: '清水', emoji: '💧', tip: '“清”有三点水，常常和水有关。' },
  { baseTerm: '家', newTerm: '加', pinyin: 'jiā', kind: '同音字', phrase: '加一加', emoji: '➕', tip: '读音一样，“加”有增加的意思。' },
  { baseTerm: '田', newTerm: '由', pinyin: 'yóu', kind: '形近字', phrase: '自由', emoji: '🕊️', tip: '“田”和“由”都有一个方框，中间竖画的位置不同。' },
  { baseTerm: '木', newTerm: '本', pinyin: 'běn', kind: '形近字', phrase: '书本', emoji: '📖', tip: '“木”下面加一小横，就是“本”。' },
  { baseTerm: '大', newTerm: '太', pinyin: 'tài', kind: '形近字', phrase: '太阳', emoji: '☀️', tip: '“大”下面加一点，就是“太”。' },
  { baseTerm: '口', newTerm: '回', pinyin: 'huí', kind: '形近字', phrase: '回家', emoji: '↩️', tip: '大“口”里面放一个小“口”，就是“回”。' },
  { baseTerm: '手', newTerm: '毛', pinyin: 'máo', kind: '形近字', phrase: '毛衣', emoji: '🧶', tip: '两个字笔画很像，弯钩的位置不同。' },
  { baseTerm: '人', newTerm: '入', pinyin: 'rù', kind: '形近字', phrase: '入口', emoji: '🚪', tip: '“人”和“入”都是两笔，撇捺长短不同。' },
];

function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function buildChoices(answer, count = 3, random = Math.random) {
  const related = shuffle(WORDS.filter((item) => item.group === answer.group && item.id !== answer.id), random);
  const fallback = shuffle(WORDS.filter((item) => item.group !== answer.group && item.id !== answer.id), random);
  return shuffle([answer, ...related, ...fallback].slice(0, count), random);
}

function createRound(random = Math.random) {
  const selected = shuffle(WORDS, random).slice(0, MODES.length * QUESTIONS_PER_MODE);
  return MODES.flatMap((mode, modeIndex) => selected
    .slice(modeIndex * QUESTIONS_PER_MODE, (modeIndex + 1) * QUESTIONS_PER_MODE)
    .map((item) => ({ mode, word: item })));
}

function extensionsFor(words, count = 2) {
  const terms = new Set(words.map((word) => word.term));
  const matched = EXTENSIONS.filter((item) => terms.has(item.baseTerm));
  const pool = [...matched, ...EXTENSIONS];
  const result = [];
  for (const item of pool) {
    if (result.some((existing) => existing.baseTerm === item.baseTerm || existing.newTerm === item.newTerm)) continue;
    result.push(item);
    if (result.length === count) break;
  }
  return result;
}

globalThis.ForestHanziData = { ANIMALS, EXTENSIONS, MODES, QUESTIONS_PER_MODE, WORDS, buildChoices, createRound, extensionsFor };
