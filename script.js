// Jogo do Número Secreto - Código limpo e boas práticas
(function () {
  'use strict';

  const min = 1;
  const max = 100;
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

  // Inicialização
  resetGame();
})();
