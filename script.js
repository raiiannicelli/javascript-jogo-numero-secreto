// Jogo do Número Secreto - Código limpo e boas práticas

// Módulo do menu e navegação
document.addEventListener('DOMContentLoaded', function () {
  // Menu Central
  const menuSection = document.getElementById('menu-section');
  const menuSecret = document.getElementById('menu-secret');
  const menuMath = document.getElementById('menu-math');
  const menuMedia = document.getElementById('menu-media');
  const secretSection = document.getElementById('secret-section');
  const mathSection = document.getElementById('math-section');
  const mediaSection = document.getElementById('media-section');

  function showSection(section) {
    menuSection.style.display = 'none';
    secretSection.style.display = section === 'secret' ? '' : 'none';
    mathSection.style.display = section === 'math' ? '' : 'none';
    mediaSection.style.display = section === 'media' ? '' : 'none';
  }
  function iniciarJogoNumeroSecreto() {
    showSection('secret');
  }
  function iniciarJogoMatematica() {
    showSection('math');
  }
  function iniciarJogoMedia() {
    showSection('media');
  }
  menuSecret.addEventListener('click', iniciarJogoNumeroSecreto);
  menuMath.addEventListener('click', iniciarJogoMatematica);
  menuMedia.addEventListener('click', iniciarJogoMedia);

  // --- Jogo do Número Secreto ---
  const min = 1;
  const max = 10;
  let secretNumber = generateSecretNumber();
  let attempts = 0;
  const guessForm = document.getElementById('guess-form');
  const guessInput = document.getElementById('guess-input');
  const feedback = document.getElementById('feedback');
  const restartBtn = document.getElementById('restart-btn');

  function generateSecretNumber() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function resetGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    feedback.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    restartBtn.style.display = 'none';
    guessForm.style.display = 'flex';
  }
  function handleGuess(event) {
    event.preventDefault();
    const guess = Number(guessInput.value);
    attempts++;
    if (isNaN(guess) || guess < min || guess > max) {
      feedback.textContent = `Digite um número entre ${min} e ${max}.`;
      return;
    }
    if (guess === secretNumber) {
      feedback.textContent = `Parabéns! Você acertou em ${attempts} tentativa(s)! O número era ${secretNumber}.`;
      guessInput.disabled = true;
      restartBtn.style.display = 'inline-block';
      guessForm.style.display = 'none';
    } else if (guess < secretNumber) {
      feedback.textContent = 'O número secreto é maior.';
    } else {
      feedback.textContent = 'O número secreto é menor.';
    }
    guessInput.value = '';
    guessInput.focus();
  }
  guessForm.addEventListener('submit', handleGuess);
  restartBtn.addEventListener('click', resetGame);

  // Voltar ao menu ao terminar o jogo
  function voltarMenu() {
    secretSection.style.display = 'none';
    mathSection.style.display = 'none';
    mediaSection.style.display = 'none';
    menuSection.style.display = '';
  }
  // Adiciona botão de voltar ao menu nas sessões de jogo
  const btnVoltarSecret = document.createElement('button');
  btnVoltarSecret.textContent = 'Voltar ao Menu';
  btnVoltarSecret.className = 'menu-btn';
  btnVoltarSecret.style.marginTop = '18px';
  btnVoltarSecret.onclick = voltarMenu;
  secretSection.appendChild(btnVoltarSecret);
  // --- Jogo de Cálculo da Média ---
  const mediaForm = document.getElementById('media-form');
  const mediaInput = document.getElementById('media-input');
  const mediaFeedback = document.getElementById('media-feedback');
  const mediaRestartBtn = document.getElementById('media-restart-btn');
  let mediaTries = 0;

  function resetMediaGame() {
    mediaInput.value = '';
    mediaFeedback.textContent = '';
    mediaInput.disabled = false;
    mediaRestartBtn.style.display = 'none';
    mediaForm.style.display = 'flex';
    mediaTries = 0;
  }
  function handleMediaCalc(event) {
    event.preventDefault();
    const values = mediaInput.value.split(',').map(v => v.trim()).filter(v => v !== '');
    const nums = values.map(Number);
    mediaTries++;
    if (nums.length === 0 || nums.some(isNaN)) {
      mediaFeedback.textContent = 'Digite apenas números separados por vírgula.';
      return;
    }
    const soma = nums.reduce((acc, n) => acc + n, 0);
    const media = soma / nums.length;
    mediaFeedback.textContent = `A média é ${media.toFixed(2)}. (${mediaTries} tentativa${mediaTries > 1 ? 's' : ''})`;
    mediaInput.disabled = true;
    mediaRestartBtn.style.display = 'inline-block';
    mediaForm.style.display = 'none';
  }
  if (mediaForm) {
    mediaForm.addEventListener('submit', handleMediaCalc);
    mediaRestartBtn.addEventListener('click', resetMediaGame);
    resetMediaGame();
  }

  // --- Jogo de Adivinhação Matemática ---

  // --- Jogo de Adivinhação Matemática ---
  const mathForm = document.getElementById('math-form');
  const mathInput = document.getElementById('math-input');
  const mathFeedback = document.getElementById('math-feedback');
  const mathRestartBtn = document.getElementById('math-restart-btn');
  const mathQuestion = document.getElementById('math-question');

  let mathAnswer = null;
  let mathTries = 0;

  function generateMathQuestion() {
    // Operações possíveis
    const ops = [
      { op: '+', fn: (a, b) => a + b },
      { op: '-', fn: (a, b) => a - b },
      { op: '*', fn: (a, b) => a * b },
      { op: '/', fn: (a, b) => Math.floor(a / b) }
    ];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 90) + 10; // 10-99
    let b = Math.floor(Math.random() * 9) + 2;  // 2-10
    if (op.op === '-' && b > a) [a, b] = [b, a];
    if (op.op === '/') {
      a = a - (a % b); // garantir divisão exata
    }
    mathAnswer = op.fn(a, b);
    mathQuestion.textContent = `Quanto é ${a} ${op.op} ${b}?`;
    mathFeedback.textContent = '';
    mathInput.value = '';
    mathInput.disabled = false;
    mathRestartBtn.style.display = 'none';
    mathForm.style.display = 'flex';
    mathTries = 0;
  }
  function handleMathGuess(event) {
    event.preventDefault();
    const guess = Number(mathInput.value);
    mathTries++;
    if (isNaN(guess)) {
      mathFeedback.textContent = 'Digite um número válido.';
      return;
    }
    if (guess === mathAnswer) {
      mathFeedback.textContent = `Correto! Você acertou em ${mathTries} tentativa(s)!`;
      mathInput.disabled = true;
      mathRestartBtn.style.display = 'inline-block';
      mathForm.style.display = 'none';
    } else {
      mathFeedback.textContent = guess < mathAnswer ? 'A resposta é maior.' : 'A resposta é menor.';
    }
    mathInput.value = '';
    mathInput.focus();
  }
  mathForm.addEventListener('submit', handleMathGuess);
  mathRestartBtn.addEventListener('click', generateMathQuestion);
  // Botão voltar para o menu na sessão matemática
  const btnVoltarMath = document.createElement('button');
  btnVoltarMath.textContent = 'Voltar ao Menu';
  btnVoltarMath.className = 'menu-btn';
  btnVoltarMath.style.marginTop = '18px';
  btnVoltarMath.onclick = voltarMenu;
  mathSection.appendChild(btnVoltarMath);
  // Botão voltar para o menu na sessão média
  const btnVoltarMedia = document.createElement('button');
  btnVoltarMedia.textContent = 'Voltar ao Menu';
  btnVoltarMedia.className = 'menu-btn';
  btnVoltarMedia.style.marginTop = '18px';
  btnVoltarMedia.onclick = voltarMenu;
  mediaSection.appendChild(btnVoltarMedia);

  // Exibe menu ao carregar
  menuSection.style.display = '';
  secretSection.style.display = 'none';
  mathSection.style.display = 'none';
  mediaSection.style.display = 'none';
  generateMathQuestion();
});
