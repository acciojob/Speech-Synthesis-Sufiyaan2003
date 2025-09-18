// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Fetch and populate available voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(
      voice =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
  if (voices.length === 0) {
    voicesDropdown.innerHTML =
      '<option value="">No voices available</option>';
  }
}

// Set voice, rate, pitch, and text values
function setVoice() {
  msg.voice = voices.find(voice => voice.name === voicesDropdown.value);
  restartSpeech();
}
function setOption() {
  msg[this.name] = this.value;
  if (this.name === 'rate' || this.name === 'pitch') {
    restartSpeech();
  }
}
function restartSpeech() {
  window.speechSynthesis.cancel();
  if (msg.text.trim().length > 0) {
    window.speechSynthesis.speak(msg);
  }
}

// Speak the typed text
function speak() {
  if (msg.text.trim().length === 0) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// Stop speaking immediately
function stop() {
  window.speechSynthesis.cancel();
}

// Update textarea text value in msg
document.querySelector('[name="text"]').addEventListener('input', function () {
  msg.text = this.value;
});

// Event listeners
window.speechSynthesis.onvoiceschanged = populateVoices;
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

// Initialize default values
msg.text = document.querySelector('[name="text"]').value;
msg.rate = document.querySelector('[name="rate"]').value;
msg.pitch = document.querySelector('[name="pitch"]').value;
