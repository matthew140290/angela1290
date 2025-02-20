document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".ham");
  const navMenu = document.querySelector("#nav-menu");

  // Función para abrir/cerrar el menú
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en un enlace (solo en móviles)
  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });
});
// Diccionario de departamentos/ciudades e instituciones
const data = {
  atlantico: {
    "I.E Inobasol de Soledad": "inobasol.angela1290.com",
    "I.E Industrial de Baranoa Pedro A Oñoro": "ietiba.angela1290.com",
    "I.E Fruto de la Esperanza": "fruto.angela1290.com",
  },
  bogota: {
    "Colegio Nacional": "nacional.bogota.angela1290.com",
    "Colegio Central": "central.bogota.angela1290.com",
  },
  // Agrega más departamentos e instituciones aquí
};

// Actualizar las opciones de institución según el departamento seleccionado
function updateInstitutions() {
  const department = document.getElementById("department").value;
  const institutionSelect = document.getElementById("institution");

  // Limpiar opciones anteriores
  institutionSelect.innerHTML =
    '<option value="" disabled selected>Selecciona...</option>';

  if (data[department]) {
    Object.keys(data[department]).forEach((institution) => {
      const option = document.createElement("option");
      option.value = data[department][institution];
      option.textContent = institution;
      institutionSelect.appendChild(option);
    });
  }
}

// Redirigir al subdominio seleccionado
function redirectToSubdomain() {
  const institutionUrl = document.getElementById("institution").value;
  if (institutionUrl) {
    clearSelects();
    window.open(`https://${institutionUrl}`, "_blank");
  } else {
    alert("Por favor selecciona una institución.");
  }
}

function clearSelects() {
  document.getElementById("department").selectedIndex = 0;

  const institutionSelect = document.getElementById("institution");
  institutionSelect.innerHTML =
    '<option value="" disabled selected>Selecciona...</option>';
}

// Función para abrir/cerrar el chatbot con animaciones
function toggleChatbot() {
  const chatbotContainer = document.getElementById("chatbot-container");

  if (chatbotContainer.classList.contains("active")) {
    // Cerrar el chatbot con animación
    chatbotContainer.classList.add("closing");
    setTimeout(() => {
      chatbotContainer.classList.remove("active", "closing");
    }, 300); // Duración de la animación
  } else {
    // Abrir el chatbot
    chatbotContainer.classList.add("active");
  }
}

// // Función para enviar un mensaje
// function sendMessage() {
//   const input = document.getElementById("chatbot-input");
//   const message = input.value.trim();

//   if (message !== "") {
//     // Agregar el mensaje del usuario al chat
//     const chatbotBody = document.getElementById("chatbot-body");
//     const userMessage = document.createElement("div");
//     userMessage.classList.add("message", "user-message");
//     userMessage.textContent = message;
//     chatbotBody.querySelector(".chatbot-messages").appendChild(userMessage);

//     // Limpiar el input
//     input.value = "";

//     // Simular una respuesta del chatbot
//     setTimeout(() => {
//       const chatbotMessage = document.createElement("div");
//       chatbotMessage.classList.add("message", "chatbot-message");
//       chatbotMessage.textContent =
//         "Gracias por tu mensaje. Estamos procesando tu solicitud.";
//       chatbotBody
//         .querySelector(".chatbot-messages")
//         .appendChild(chatbotMessage);

//       // Desplazarse al final del chat
//       chatbotBody.scrollTop = chatbotBody.scrollHeight;
//     }, 1000);
//   }
// }

// Función para enviar mensaje al presionar "Enter"
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
