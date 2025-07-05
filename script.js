const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const fileInput = document.getElementById("file-input");

sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage("user", message);
    userInput.value = "";
    setTimeout(() => {
      appendMessage("bot", `You said: "${message}"`);
    }, 500);
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  appendMessage("user", `Uploaded file: ${file.name}`);
});

function appendMessage(sender, message) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", sender);
  bubble.innerHTML = `<p>${message}</p><span class="timestamp">${getTime()}</span>`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
}
