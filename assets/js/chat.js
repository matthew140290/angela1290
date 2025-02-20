// Respuestas y opciones predeterminadas
const defaultOptions = {
  inicio: {
    pregunta: "Hola, ¿en qué puedo ayudarte?",
    opciones: [
      { texto: "Soporte técnico", valor: "soporte" },
      { texto: "Funcionamiento de la página", valor: "funcionamiento" },
      { texto: "Información sobre el decreto 1290", valor: "decreto" },
    ],
  },
  soporte: {
    pregunta: "¿Con qué tipo de soporte necesitas ayuda?",
    opciones: [
      { texto: "Error al iniciar sesión", valor: "error_login" },
      { texto: "Problemas con el registro", valor: "error_registro" },
      { texto: "Otro problema", valor: "otro" },
    ],
  },
  funcionamiento: {
    pregunta: "¿Qué deseas saber sobre el funcionamiento de la página?",
    opciones: [
      {
        texto: "Cómo seleccionar una institución",
        valor: "seleccionar_institucion",
      },
      {
        texto: "Cómo usar el sistema de calificaciones",
        valor: "calificaciones",
      },
      { texto: "Cómo contactar a soporte", valor: "contactar_soporte" },
    ],
  },
  decreto: {
    pregunta:
      "El decreto 1290 regula la evaluación del aprendizaje y promoción de los estudiantes en Colombia. ¿Qué más deseas saber?",
    opciones: [
      { texto: "Requisitos de promoción", valor: "requisitos_promocion" },
      {
        texto: "Cómo se evalúa a los estudiantes",
        valor: "evaluacion_estudiantes",
      },
      { texto: "Volver al menú principal", valor: "inicio" },
    ],
  },
  error_login: {
    pregunta:
      "Para resolver problemas de inicio de sesión, asegúrate de que tu correo y contraseña sean correctos. Si el problema persiste, contacta a soporte.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  error_registro: {
    pregunta:
      "Si tienes problemas con el registro, verifica que todos los campos estén completos y que tu correo no esté ya registrado.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  otro: {
    pregunta:
      "Por favor, describe el problema que estás enfrentando y nos pondremos en contacto contigo.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  seleccionar_institucion: {
    pregunta:
      "Para seleccionar una institución, ve a la sección 'Selección de Institución Educativa', elige tu departamento y luego tu institución.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  calificaciones: {
    pregunta:
      "El sistema de calificaciones permite a los profesores registrar y gestionar las notas de los estudiantes. Los estudiantes pueden ver sus calificaciones en su perfil.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  contactar_soporte: {
    pregunta:
      "Puedes contactar a soporte desde la sección 'Soporte' o enviar un mensaje directamente aquí.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  requisitos_promocion: {
    pregunta:
      "Los requisitos de promoción incluyen aprobar todas las materias y cumplir con los estándares de asistencia.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
  evaluacion_estudiantes: {
    pregunta:
      "Los estudiantes son evaluados mediante exámenes, tareas y participación en clase. Cada institución tiene sus propios criterios de evaluación.",
    opciones: [{ texto: "Volver al menú principal", valor: "inicio" }],
  },
};

// Estado actual del chatbot
let currentState = "inicio";

// Función para mostrar opciones al usuario
function showOptions(state) {
  const chatbotBody = document.getElementById("chatbot-body");
  const options = defaultOptions[state];

  // Mostrar "Escribiendo..." mientras se simula la demora
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("message", "chatbot-message");
  typingMessage.textContent = "Escribiendo...";
  chatbotBody.querySelector(".chatbot-messages").appendChild(typingMessage);

  // Desplazarse al final del chat
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  // Simular demora antes de mostrar la pregunta y las opciones
  setTimeout(() => {
    // Eliminar el mensaje "Escribiendo..."
    chatbotBody.querySelector(".chatbot-messages").removeChild(typingMessage);

    // Mostrar la pregunta
    const questionMessage = document.createElement("div");
    questionMessage.classList.add("message", "chatbot-message");
    questionMessage.textContent = options.pregunta;
    chatbotBody.querySelector(".chatbot-messages").appendChild(questionMessage);

    // Mostrar las opciones
    options.opciones.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option-button");
      optionButton.textContent = option.texto;
      optionButton.onclick = () => handleOptionClick(option.valor);
      chatbotBody.querySelector(".chatbot-messages").appendChild(optionButton);
    });

    // Desplazarse al final del chat
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 1000); // Demora de 1 segundo
}

// Función para manejar el clic en una opción
function handleOptionClick(value) {
  currentState = value;
  const chatbotBody = document.getElementById("chatbot-body");

  // Limpiar el chat antes de mostrar nuevas opciones
  chatbotBody.querySelector(".chatbot-messages").innerHTML = "";

  // Mostrar las nuevas opciones
  showOptions(currentState);
}

// Función para enviar un mensaje
function sendMessage() {
  const input = document.getElementById("chatbot-input");
  const message = input.value.trim();

  if (message !== "") {
    // Agregar el mensaje del usuario al chat
    const chatbotBody = document.getElementById("chatbot-body");
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = message;
    chatbotBody.querySelector(".chatbot-messages").appendChild(userMessage);

    // Limpiar el input
    input.value = "";

    // Desplazarse al final del chat
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Mostrar opciones predeterminadas
    showOptions(currentState);
  }
}

// Iniciar el chatbot con la primera pregunta
document.addEventListener("DOMContentLoaded", () => {
  showOptions(currentState);
});
