import {
  MODES,
  WORDS,
  buildChoices,
  calculateStars,
  chooseSessionWords,
  createDefaultProgress,
  updateProgress,
} from './learning.js';

const STORAGE_KEY = 'rainbow-hanzi-island-v1';
const MODE_COPY = {
  recognize: { label: '认一认 · LOOK', title: '哪个字和图片是好朋友？' },
  listen: { label: '听一听 · LISTEN', title: '听一听，找到这个字' },
  read: { label: '读一读 · SAY', title: '大声读出这个字' },
  use: { label: '用一用 · USE', title: '哪个字最适合放进去？' },
  write: { label: '写一写 · WRITE', title: '用手指沿着字写一写' },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadState() {
  const defaults = { progress: createDefaultProgress(), stars: 0, sessions: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return defaults;
    const progress = createDefaultProgress();
    for (const word of WORDS) {
      for (const mode of MODES) progress[word.id][mode] = saved.progress?.[word.id]?.[mode] || 0;
    }
    return { progress, stars: saved.stars || 0, sessions: saved.sessions || 0 };
  } catch {
    return defaults;
  }
}

let savedState = loadState();
let session = null;
let writingIndex = 0;
let activeDialogWord = null;
let activeScreen = 'home-screen';

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  updateStarCount();
}

function updateStarCount() {
  $('#total-stars').textContent = String(savedState.stars);
}

function showScreen(screenId) {
  activeScreen = screenId;
  $$('.screen').forEach((screen) => screen.classList.toggle('is-active', screen.id === screenId));
  $$('.bottom-nav button').forEach((button) => button.classList.toggle('is-current', button.dataset.go === screenId));
  $('.bottom-nav').hidden = ['game-screen', 'result-screen'].includes(screenId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (screenId === 'word-screen') renderWordCards('all');
  if (screenId === 'draw-screen') requestAnimationFrame(renderWritingScreen);
  if (screenId === 'progress-screen') renderProgress();
}

function speak(word) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word.term);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.72;
  utterance.pitch = 1.08;
  const chineseVoice = window.speechSynthesis.getVoices().find((voice) => /^zh(-|_)/i.test(voice.lang));
  if (chineseVoice) utterance.voice = chineseVoice;
  window.speechSynthesis.speak(utterance);
}

function startAdventure() {
  session = {
    words: chooseSessionWords(WORDS, savedState.progress, 5),
    modes: ['recognize', 'listen', 'read', 'use', 'write'],
    index: 0,
    correct: 0,
    hadMistake: false,
    locked: false,
  };
  showScreen('game-screen');
  renderQuestion();
}

function currentWord() {
  return session.words[session.index];
}

function currentMode() {
  return session.modes[session.index];
}

function renderQuestion() {
  const word = currentWord();
  const mode = currentMode();
  const copy = MODE_COPY[mode];
  session.hadMistake = false;
  session.locked = false;
  $('#question-count').textContent = `${session.index + 1} / ${session.words.length}`;
  $('#session-progress').style.width = `${((session.index + 1) / session.words.length) * 100}%`;
  $('#mode-label').textContent = copy.label;
  $('#question-title').textContent = copy.title;
  $('#game-feedback').textContent = '';
  $('#choice-grid').replaceChildren();
  $('#read-controls').hidden = true;
  $('#sound-button').hidden = !['listen', 'read'].includes(mode);
  $('#sound-button').onclick = () => speak(word);

  if (mode === 'recognize') {
    $('#question-visual').innerHTML = `<span class="big-emoji" role="img" aria-label="${word.english}">${word.emoji}</span>`;
    renderChoices(word);
  } else if (mode === 'listen') {
    $('#question-visual').innerHTML = '<button class="listen-orb" type="button" aria-label="播放读音">🔊</button>';
    $('.listen-orb').addEventListener('click', () => speak(word));
    renderChoices(word);
  } else if (mode === 'read') {
    $('#question-visual').innerHTML = `<span class="big-word">${word.term}</span>`;
    $('#read-controls').hidden = false;
    $('#read-done').onclick = () => finishSelfCheckedQuestion('读得真响亮！');
  } else if (mode === 'use') {
    $('#question-visual').innerHTML = `<div class="scene">${word.emoji}<br>${word.scene}</div>`;
    renderChoices(word);
  } else {
    renderSessionWriting(word);
  }
}

function renderChoices(answer) {
  for (const choice of buildChoices(answer, WORDS, 4)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.textContent = choice.term;
    button.addEventListener('click', () => answerChoice(button, choice.id === answer.id));
    $('#choice-grid').append(button);
  }
}

function answerChoice(button, correct) {
  if (session.locked) return;
  const word = currentWord();
  const mode = currentMode();
  if (!correct) {
    session.hadMistake = true;
    button.classList.add('is-wrong');
    button.disabled = true;
    savedState.progress = updateProgress(savedState.progress, word.id, mode, false);
    saveState();
    $('#game-feedback').textContent = '再看一看，你就快找到啦！';
    return;
  }
  session.locked = true;
  button.classList.add('is-correct');
  $$('#choice-grid button').forEach((choice) => { choice.disabled = true; });
  savedState.progress = updateProgress(savedState.progress, word.id, mode, true);
  if (!session.hadMistake) session.correct += 1;
  saveState();
  speak(word);
  $('#game-feedback').textContent = `答对啦！${word.term}，${word.pinyin}。`;
  window.setTimeout(nextQuestion, 1050);
}

function finishSelfCheckedQuestion(message) {
  if (session.locked) return;
  session.locked = true;
  const word = currentWord();
  savedState.progress = updateProgress(savedState.progress, word.id, currentMode(), true);
  session.correct += 1;
  saveState();
  speak(word);
  $('#game-feedback').textContent = `${message} ${word.term}，${word.pinyin}。`;
  window.setTimeout(nextQuestion, 1100);
}

function nextQuestion() {
  session.index += 1;
  if (session.index < session.words.length) renderQuestion();
  else finishAdventure();
}

function finishAdventure() {
  const stars = calculateStars(session.correct, session.words.length);
  savedState.stars += stars;
  savedState.sessions += 1;
  saveState();
  $('#result-stars').textContent = '⭐'.repeat(stars);
  $('#result-summary').textContent = `今天和 ${session.words.length} 个汉字朋友见了面，还练习了看、听、读、用、写。`;
  $('#result-words').innerHTML = session.words.map((word) => `<span>${word.term}</span>`).join('');
  showScreen('result-screen');
}

function renderSessionWriting(word) {
  $('#question-visual').innerHTML = '<div class="canvas-wrap session-canvas"><canvas id="session-writing-canvas" aria-label="写字区域"></canvas><span class="canvas-tip">沿着浅色字写一写</span></div>';
  $('#choice-grid').innerHTML = '<button id="session-clear" class="soft-button" type="button">擦掉重写</button><button id="session-write-done" class="primary-button" type="button">写好了 ✓</button>';
  const canvas = $('#session-writing-canvas');
  requestAnimationFrame(() => setupCanvas(canvas, word));
  $('#session-clear').addEventListener('click', () => setupCanvas(canvas, word));
  $('#session-write-done').addEventListener('click', () => {
    if (canvas.dataset.hasInk !== 'true') {
      $('#game-feedback').textContent = '先用手指写一写吧！';
      return;
    }
    finishSelfCheckedQuestion('写得真认真！');
  });
}

function setupCanvas(canvas, word) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, rect.width || 560);
  const height = Math.max(260, rect.height || 420);
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.dataset.hasInk = 'false';
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const fontSize = Math.min(height * .68, width / Math.max(1.15, word.term.length * .9));
  context.fillStyle = 'rgba(255, 111, 97, .16)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `900 ${fontSize}px "PingFang SC", "Hiragino Sans GB", sans-serif`;
  context.fillText(word.term, width / 2, height / 2);
  context.strokeStyle = '#ef5e57';
  context.lineWidth = Math.max(8, width / 42);
  context.lineCap = 'round';
  context.lineJoin = 'round';

  let drawing = false;
  const point = (event) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };
  canvas.onpointerdown = (event) => {
    drawing = true;
    canvas.dataset.hasInk = 'true';
    canvas.setPointerCapture(event.pointerId);
    const start = point(event);
    context.beginPath();
    context.moveTo(start.x, start.y);
  };
  canvas.onpointermove = (event) => {
    if (!drawing) return;
    const next = point(event);
    context.lineTo(next.x, next.y);
    context.stroke();
  };
  canvas.onpointerup = canvas.onpointercancel = () => { drawing = false; };
}

function renderWordCards(filter = 'all') {
  const words = filter === 'all' ? WORDS : WORDS.filter((word) => word.group === filter);
  $('#word-count').textContent = `${words.length} 个`;
  $('#word-grid').replaceChildren();
  for (const word of words) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'word-card';
    button.style.setProperty('--word-bg', `${word.color}20`);
    button.dataset.emoji = word.emoji;
    button.innerHTML = `<strong>${word.term}</strong><small>${word.pinyin}</small>`;
    button.addEventListener('click', () => openWordDialog(word));
    $('#word-grid').append(button);
  }
}

function openWordDialog(word) {
  activeDialogWord = word;
  $('#dialog-emoji').textContent = word.emoji;
  $('#dialog-term').textContent = word.term;
  $('#dialog-pinyin').textContent = `${word.pinyin} · ${word.english}`;
  $('#dialog-scene').textContent = word.scene.replace('___', word.term);
  $('#word-dialog').showModal();
}

function renderWritingScreen() {
  const word = WORDS[writingIndex];
  $('#writing-word').textContent = word.term;
  $('#writing-pinyin').textContent = `${word.pinyin} · ${word.english}`;
  $('#writing-word-list').replaceChildren();
  WORDS.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `writing-word-button${index === writingIndex ? ' is-selected' : ''}`;
    button.textContent = item.term;
    button.addEventListener('click', () => { writingIndex = index; renderWritingScreen(); });
    $('#writing-word-list').append(button);
  });
  setupCanvas($('#writing-canvas'), word);
}

function moveWritingWord(change) {
  writingIndex = (writingIndex + change + WORDS.length) % WORDS.length;
  renderWritingScreen();
}

function renderProgress() {
  const values = WORDS.map((word) => MODES.map((mode) => savedState.progress[word.id][mode] || 0));
  const learned = values.filter((scores) => scores.some((score) => score > 0)).length;
  const mastered = values.filter((scores) => scores.reduce((sum, score) => sum + score, 0) / MODES.length >= 3).length;
  $('#progress-stars').textContent = String(savedState.stars);
  $('#learned-count').textContent = String(learned);
  $('#mastered-count').textContent = String(mastered);
  $('#session-count').textContent = String(savedState.sessions);
  const names = { recognize: '认一认', listen: '听一听', read: '读一读', use: '用一用', write: '写一写' };
  $('#skill-bars').innerHTML = MODES.map((mode) => {
    const total = WORDS.reduce((sum, word) => sum + (savedState.progress[word.id][mode] || 0), 0);
    const percent = Math.round((total / (WORDS.length * 5)) * 100);
    return `<div class="skill-row"><span>${names[mode]}</span><div class="skill-meter"><span style="width:${percent}%"></span></div><small>${percent}%</small></div>`;
  }).join('');
}

$$('[data-go]').forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.go)));
$('#start-adventure').addEventListener('click', startAdventure);
$('#play-again').addEventListener('click', startAdventure);
$('.filter-row').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  $$('.filter-chip').forEach((chip) => chip.classList.toggle('is-selected', chip === button));
  renderWordCards(button.dataset.filter);
});
$('#close-word-dialog').addEventListener('click', () => $('#word-dialog').close());
$('#dialog-sound').addEventListener('click', () => activeDialogWord && speak(activeDialogWord));
$('#previous-word').addEventListener('click', () => moveWritingWord(-1));
$('#next-word').addEventListener('click', () => moveWritingWord(1));
$('#clear-canvas').addEventListener('click', renderWritingScreen);
$('#writing-sound').addEventListener('click', () => speak(WORDS[writingIndex]));
$('#writing-finish').addEventListener('click', () => {
  const canvas = $('#writing-canvas');
  if (canvas.dataset.hasInk !== 'true') return;
  const word = WORDS[writingIndex];
  savedState.progress = updateProgress(savedState.progress, word.id, 'write', true);
  saveState();
  const button = $('#writing-finish');
  button.textContent = '收到一颗星 ⭐';
  window.setTimeout(() => { button.textContent = '写好了 ✓'; }, 1200);
});
$('#reset-progress').addEventListener('click', () => {
  if (!window.confirm('确定要清除所有星星和练习记录吗？')) return;
  savedState = { progress: createDefaultProgress(), stars: 0, sessions: 0 };
  saveState();
  renderProgress();
});

window.addEventListener('resize', () => {
  if (activeScreen === 'draw-screen') renderWritingScreen();
});

updateStarCount();
renderWordCards();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
