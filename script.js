// script.js
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const fileInput = document.getElementById("file-input");
const fileNameDisplay = document.getElementById("file-name");

sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage("user", message);
    userInput.value = "";
    simulateBotResponse(message);
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const supportedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
  if (!supportedTypes.includes(file.type)) {
    alert("Unsupported file type.");
    fileInput.value = "";
    fileNameDisplay.textContent = "No file chosen";
    return;
  }
  fileNameDisplay.textContent = file.name;
  appendMessage("user", `Uploaded file: ${file.name}`);
});

micBtn.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Voice recognition error: " + event.error);
  };
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateBotResponse(userMessage) {
  setTimeout(() => {
    appendMessage("bot", `You asked: "${userMessage}". I'm still learning to provide smarter answers.`);
  }, 1000);
}
