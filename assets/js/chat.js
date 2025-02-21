const OPENAI_API_KEY = "API_KEY"; // Reemplaza con tu API Key de OpenAI
const OPENAI_API_URL = "URL"; // URL de la API de OpenAI

// Función para alternar la visibilidad del chatbot
function toggleChatbot() {
  document.body.classList.toggle("show-chatbot");
}

// Función para cerrar el chatbot
function closeChatbot() {
  document.body.classList.remove("show-chatbot");
}

// Función para mostrar las opciones iniciales
function showInitialOptions() {
  const chatBody = document.querySelector(".chat-body");
  chatBody.innerHTML = ""; // Limpiar el chat

  // Mensaje de bienvenida
  const welcomeMessage = document.createElement("div");
  welcomeMessage.classList.add("message", "bot-message");
  welcomeMessage.innerHTML = `
    <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
    <div class="message-text">Hola, soy Angelabot. ¿En qué puedo ayudarte?</div>
  `;
  chatBody.appendChild(welcomeMessage);

  // Opciones iniciales
  const optionsMessage = document.createElement("div");
  optionsMessage.classList.add("message", "bot-message");
  optionsMessage.innerHTML = `
    <div class="message-text">
      <button class="option-button" onclick="handleOptionClick('predeterminadas')">Ver opciones predeterminadas</button>
      <button class="option-button" onclick="handleOptionClick('ia')">Chatear con IA</button>
    </div>
  `;
  chatBody.appendChild(optionsMessage);

  // Desplazarse al final del chat
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Función para manejar el clic en una opción
function handleOptionClick(option) {
  const chatBody = document.querySelector(".chat-body");

  if (option === "predeterminadas") {
    // Mostrar opciones predeterminadas
    chatBody.innerHTML = ""; // Limpiar el chat
    showPredefinedOptions();
  } else if (option === "ia") {
    // Habilitar el chat con IA
    chatBody.innerHTML = ""; // Limpiar el chat
    const iaMessage = document.createElement("div");
    iaMessage.classList.add("message", "bot-message");
    iaMessage.innerHTML = `
      <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
      <div class="message-text">Escribe tu pregunta para chatear con la IA.</div>
    `;
    chatBody.appendChild(iaMessage);

    // Mostrar el campo de entrada para chatear con IA
    document.getElementById("chatbot-input-ia").style.display = "block";
  }
}

// Función para mostrar opciones predeterminadas
function showPredefinedOptions() {
  const chatBody = document.querySelector(".chat-body");

  // Mensaje de opciones
  const optionsMessage = document.createElement("div");
  optionsMessage.classList.add("message", "bot-message");
  optionsMessage.innerHTML = `
    <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
    <div class="message-text">Selecciona una opción:</div>
  `;
  chatBody.appendChild(optionsMessage);

  // Lista de opciones
  const options = [
    { text: "Soporte técnico", value: "soporte" },
    { text: "Funcionamiento de la página", value: "funcionamiento" },
    { text: "Información sobre el decreto 1290", value: "decreto" },
  ];

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("message-text", "options-container");
  options.forEach((opt) => {
    const optionButton = document.createElement("button");
    optionButton.classList.add("option-button");
    optionButton.textContent = opt.text;
    optionButton.onclick = () => handlePredefinedOption(opt.value);
    optionsContainer.appendChild(optionButton);
  });
  chatBody.appendChild(optionsContainer);

  // Desplazarse al final del chat
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Función para manejar una opción predeterminada
function handlePredefinedOption(value) {
  const chatBody = document.querySelector(".chat-body");

  // Mostrar la animación de "Escribiendo..."
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("message", "bot-message");
  typingMessage.innerHTML = `
    <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
    <div class="message-text">
      <div class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  chatBody.appendChild(typingMessage);

  // Desplazarse al final del chat
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simular un retraso de 2 segundos antes de mostrar la respuesta
  setTimeout(() => {
    // Eliminar la animación de "Escribiendo..."
    chatBody.removeChild(typingMessage);

    // Respuesta basada en la opción seleccionada
    let responseText;
    switch (value) {
      case "soporte":
        responseText =
          "Para soporte técnico, contacta a nuestro equipo en soporte@example.com.";
        break;
      case "funcionamiento":
        responseText =
          "Puedes encontrar información sobre el funcionamiento de la plataforma en nuestra sección de ayuda.";
        break;
      case "decreto":
        responseText =
          "El decreto 1290 regula la evaluación del aprendizaje en instituciones educativas. ¿Necesitas más detalles?";
        break;
      default:
        responseText = "Opción no reconocida.";
    }

    // Mostrar la respuesta
    const responseMessage = document.createElement("div");
    responseMessage.classList.add("message", "bot-message");
    responseMessage.innerHTML = `
      <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
      <div class="message-text">${responseText}</div>
    `;
    chatBody.appendChild(responseMessage);

    // Desplazarse al final del chat
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 2000); // Retraso de 2 segundos
}

// Función para enviar un mensaje a OpenAI
async function sendMessageToOpenAI(message) {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Modelo de OpenAI
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content; // Respuesta de OpenAI
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    return "Lo siento, hubo un error al procesar tu solicitud.";
  }
}

// Función para enviar un mensaje a la IA
async function sendMessageToIA() {
  const input = document.getElementById("chatbot-input-ia");
  const message = input.value.trim();

  if (message !== "") {
    const chatBody = document.querySelector(".chat-body");

    // Agregar el mensaje del usuario al chat
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `
      <div class="message-text">${message}</div>
    `;
    chatBody.appendChild(userMessage);

    // Limpiar el input
    input.value = "";

    // Mostrar la animación de "Escribiendo..."
    const typingMessage = document.createElement("div");
    typingMessage.classList.add("message", "bot-message");
    typingMessage.innerHTML = `
      <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
      <div class="message-text">
        <div class="typing-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;
    chatBody.appendChild(typingMessage);

    // Desplazarse al final del chat
    chatBody.scrollTop = chatBody.scrollHeight;

    // Enviar el mensaje a OpenAI
    const response = await sendMessageToOpenAI(message);

    // Eliminar la animación de "Escribiendo..."
    chatBody.removeChild(typingMessage);

    // Mostrar la respuesta de OpenAI
    const chatbotMessage = document.createElement("div");
    chatbotMessage.classList.add("message", "bot-message");
    chatbotMessage.innerHTML = `
      <img class="bot-avatar" src="../img/robotic.png" alt="Chatbot Logo" width="50" height="50">
      <div class="message-text">${response}</div>
    `;
    chatBody.appendChild(chatbotMessage);

    // Desplazarse al final del chat
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// Evento para enviar mensaje al presionar "Enter"
document.getElementById("chatbot-input-ia").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessageToIA();
  }
});

// Evento para enviar mensaje al hacer clic en el botón
document
  .getElementById("send-message")
  .addEventListener("click", sendMessageToIA);

// Iniciar el chatbot con las opciones iniciales
document.addEventListener("DOMContentLoaded", () => {
  showInitialOptions();
});
