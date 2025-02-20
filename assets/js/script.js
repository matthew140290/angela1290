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

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}
