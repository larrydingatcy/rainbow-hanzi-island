(function () {
const { ANIMALS, MODES, QUESTIONS_PER_MODE, buildChoices, createRound, extensionsFor } = globalThis.ForestHanziData;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const MODE_COPY = {
  identify: ['认一认', '哪个字和图片是好朋友？'],
  listen: ['听一听', '听一听，找到正确的字'],
  read: ['读一读', '先自己读，再听标准读音'],
  word: ['组一组', '这个字可以和哪张图做朋友？'],
  write: ['写一写', '沿着浅色字认真写一写'],
};

let selectedAnimal = ANIMALS[0];
let soundEnabled = true;
let audioContext = null;
let round = null;
let step = 0;
let locked = false;
let transitionTimer = null;

function showScreen(id) {
  $$('.screen').forEach((screen) => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAnimals() {
  $('#animal-grid').innerHTML = ANIMALS.map((animal) => `<button class="animal-choice${animal.id === selectedAnimal.id ? ' selected' : ''}" style="--animal-color:${animal.color}" data-animal="${animal.id}" type="button"><span>${animal.emoji}</span><small>${animal.name.slice(2)}</small></button>`).join('');
  $('#hero-animal').textContent = selectedAnimal.emoji;
}

function chooseAnimal(id) {
  selectedAnimal = ANIMALS.find((animal) => animal.id === id) || ANIMALS[0];
  renderAnimals();
  playEffect('tap');
}

function playEffect(type = 'tap') {
  if (!soundEnabled) return;
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return;
  audioContext ||= new Context();
  if (audioContext.state === 'suspended') audioContext.resume();
  const patterns = {
    tap: [[420, 0, .05]],
    tryAgain: [[250, 0, .08], [215, .07, .1]],
    success: [[523, 0, .09], [659, .09, .09], [784, .18, .13]],
    finish: [[523, 0, .11], [659, .11, .11], [784, .22, .12], [1047, .34, .2]],
  };
  const now = audioContext.currentTime;
  for (const [frequency, delay, duration] of patterns[type] || patterns.tap) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, now + delay);
    gain.gain.exponentialRampToValueAtTime(.075, now + delay + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + delay + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now + delay);
    oscillator.stop(now + delay + duration + .02);
  }
}

function speakTerm(term) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(term);
  utterance.lang = 'zh-CN';
  utterance.rate = .72;
  utterance.pitch = 1.06;
  const voice = window.speechSynthesis.getVoices().find((item) => /^zh[-_]/i.test(item.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function startRound() {
  window.clearTimeout(transitionTimer);
  $('#phase-celebration').hidden = true;
  round = createRound();
  step = 0;
  $('#companion-emoji').textContent = selectedAnimal.emoji;
  $('#companion-name').textContent = selectedAnimal.name;
  showScreen('game-screen');
  renderTask();
  playEffect('tap');
}

function renderTrail() {
  const labels = ['认', '听', '读', '组', '写'];
  const phase = Math.floor(step / QUESTIONS_PER_MODE);
  $('#trail').innerHTML = labels.map((label, index) => `<span class="trail-step${index < phase ? ' done' : index === phase ? ' current' : ''}">${index < phase ? '✓' : label}</span>`).join('');
  $('#step-count').textContent = `${step + 1} / ${round.length}`;
}

function resetTaskPanels() {
  locked = false;
  $('#feedback').textContent = '';
  $('#choice-grid').replaceChildren();
  $('#choice-grid').hidden = true;
  $('#read-panel').hidden = true;
  $('#writing-panel').hidden = true;
  $('#replay-sound').hidden = true;
  $('#question-visual').replaceChildren();
  $('#companion-cheer').textContent = selectedAnimal.cheer;
}

function renderTask() {
  const { mode, word } = round[step];
  resetTaskPanels();
  renderTrail();
  $('#mode-label').textContent = `${MODE_COPY[mode][0]} · ${step % QUESTIONS_PER_MODE + 1} / ${QUESTIONS_PER_MODE}`;
  $('#question-title').textContent = MODE_COPY[mode][1];

  if (mode === 'identify') {
    $('#question-visual').innerHTML = `<span class="picture" role="img" aria-label="图片提示">${word.emoji}</span>`;
    renderChoices(word);
  } else if (mode === 'listen') {
    $('#question-visual').innerHTML = '<button class="listen-orb" type="button" aria-label="播放读音">🔊</button>';
    $('.listen-orb').addEventListener('click', () => speakTerm(word.term));
    renderChoices(word);
    window.setTimeout(() => speakTerm(word.term), 250);
  } else if (mode === 'read') {
    $('#question-visual').innerHTML = `<span class="big-character">${word.term}</span>`;
    $('#read-panel').hidden = false;
    $('#read-listen').onclick = () => speakTerm(word.term);
    $('#read-done').onclick = completeSelfCheck;
  } else if (mode === 'word') {
    $('#question-visual').innerHTML = `<div class="word-picture-prompt"><span>${word.term}</span><i>＋</i><b>？</b></div><p class="picture-hint">选一张图，组成一个常用词</p>`;
    renderPictureChoices(word);
  } else {
    $('#writing-panel').hidden = false;
    requestAnimationFrame(() => setupCanvas($('#writing-canvas'), word.term));
  }
}

function renderChoices(answer) {
  $('#choice-grid').hidden = false;
  for (const word of buildChoices(answer)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice';
    button.textContent = word.term;
    button.addEventListener('click', () => answerChoice(button, word.id === answer.id));
    $('#choice-grid').append(button);
  }
}

function renderPictureChoices(answer) {
  $('#choice-grid').hidden = false;
  for (const word of buildChoices(answer)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice picture-choice';
    button.innerHTML = `<span aria-hidden="true">${word.emoji}</span>`;
    button.setAttribute('aria-label', '图片选项');
    button.addEventListener('click', () => answerChoice(button, word.id === answer.id));
    $('#choice-grid').append(button);
  }
}

function answerChoice(button, correct) {
  if (locked) return;
  const { mode, word } = round[step];
  if (!correct) {
    button.disabled = true;
    button.classList.add('wrong');
    $('#feedback').textContent = '很接近了，再看一看！';
    $('#companion-cheer').textContent = '别着急，我们再试一次。';
    playEffect('tryAgain');
    return;
  }
  locked = true;
  button.classList.add('correct');
  $$('#choice-grid button').forEach((item) => { item.disabled = true; });
  if (mode === 'word') $('#question-visual').innerHTML = `<div class="word-match-result"><span>${word.term}</span><i>＋</i><em>${word.emoji}</em><b>＝ ${word.phrase}</b></div>`;
  $('#feedback').textContent = mode === 'word' ? `组词成功：${word.phrase}` : `找对啦！${word.term}，${word.pinyin}。`;
  $('#companion-cheer').textContent = '太棒了，我们去下一个树屋！';
  playEffect('success');
  speakTerm(mode === 'word' ? word.phrase : word.term);
  window.setTimeout(nextTask, 1100);
}

function completeSelfCheck() {
  if (locked) return;
  locked = true;
  const { word } = round[step];
  $('#feedback').textContent = `读得真认真！${word.term}，${word.pinyin}。`;
  $('#companion-cheer').textContent = '声音真响亮！';
  playEffect('success');
  speakTerm(word.term);
  window.setTimeout(nextTask, 1100);
}

function nextTask() {
  if (!round) return;
  const completedMode = round[step].mode;
  step += 1;
  if (step % QUESTIONS_PER_MODE === 0) {
    showPhaseCelebration(completedMode, () => {
      if (!round) return;
      if (step < round.length) renderTask();
      else finishRound();
    });
  } else renderTask();
}

function showPhaseCelebration(mode, onComplete) {
  const overlay = $('#phase-celebration');
  $('#celebration-animal').textContent = selectedAnimal.emoji;
  $('#celebration-title').textContent = `${MODE_COPY[mode][0]}完成！`;
  overlay.hidden = false;
  playEffect('finish');
  transitionTimer = window.setTimeout(() => {
    overlay.hidden = true;
    onComplete();
  }, 1900);
}

function finishRound() {
  const words = round.map((item) => item.word);
  $('#result-animal').textContent = selectedAnimal.emoji;
  $('#result-words').innerHTML = words.map((word) => `<span>${word.term}</span>`).join('');
  $('#discovery-grid').innerHTML = extensionsFor(words).map((item) => `<article class="discovery-card"><span class="kind">${item.kind}</span><div class="pair"><b>${item.baseTerm}</b><i>→</i><strong>${item.newTerm}</strong><em>${item.emoji}</em></div><p><b>${item.pinyin}</b> · ${item.phrase}</p><small>${item.tip}</small><button type="button" data-speak="${item.newTerm}">🔊 听一听</button></article>`).join('');
  showScreen('result-screen');
  playEffect('finish');
}

function setupCanvas(canvas, term) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, rect.width || 500);
  const height = Math.max(260, rect.height || 380);
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.dataset.hasInk = 'false';
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgba(79, 156, 104, .16)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `900 ${Math.min(height * .7, width * .65)}px "PingFang SC", sans-serif`;
  context.fillText(term, width / 2, height / 2);
  context.strokeStyle = '#36774d';
  context.lineWidth = Math.max(8, width / 40);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  let drawing = false;
  const point = (event) => { const bounds = canvas.getBoundingClientRect(); return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }; };
  canvas.onpointerdown = (event) => { drawing = true; canvas.dataset.hasInk = 'true'; canvas.setPointerCapture(event.pointerId); const start = point(event); context.beginPath(); context.moveTo(start.x, start.y); };
  canvas.onpointermove = (event) => { if (!drawing) return; const next = point(event); context.lineTo(next.x, next.y); context.stroke(); };
  canvas.onpointerup = canvas.onpointercancel = () => { drawing = false; };
}

$('#animal-grid').addEventListener('click', (event) => { const button = event.target.closest('[data-animal]'); if (button) chooseAnimal(button.dataset.animal); });
$('#start-game').addEventListener('click', startRound);
$('#play-again').addEventListener('click', startRound);
$('#exit-game').addEventListener('click', () => { window.clearTimeout(transitionTimer); $('#phase-celebration').hidden = true; round = null; showScreen('welcome-screen'); });
$('#clear-writing').addEventListener('click', () => round && setupCanvas($('#writing-canvas'), round[step].word.term));
$('#writing-done').addEventListener('click', () => {
  if ($('#writing-canvas').dataset.hasInk !== 'true') { $('#feedback').textContent = '先用手指写一写吧！'; playEffect('tryAgain'); return; }
  completeSelfCheck();
});
$('#discovery-grid').addEventListener('click', (event) => { const button = event.target.closest('[data-speak]'); if (button) speakTerm(button.dataset.speak); });
$('#sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  $('#sound-toggle').setAttribute('aria-pressed', String(soundEnabled));
  $('#sound-toggle').setAttribute('aria-label', soundEnabled ? '关闭声音' : '打开声音');
  $('#sound-toggle span').textContent = soundEnabled ? '🔊' : '🔇';
  $('#sound-toggle b').textContent = soundEnabled ? '声音开' : '声音关';
  if (soundEnabled) playEffect('success');
  else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
});
$$('[data-screen]').forEach((button) => button.addEventListener('click', () => { window.clearTimeout(transitionTimer); $('#phase-celebration').hidden = true; round = null; showScreen(button.dataset.screen); }));

renderAnimals();
}());
