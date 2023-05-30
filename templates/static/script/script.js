// Obtener los elementos de entrada de color
var bgColorInput = document.getElementById('bgcolor');
var fontColorInput = document.getElementById('fontcolor');

// Obtener el elemento .resultado
var resultadoDiv = document.querySelector('.resultado');

// Escuchar los eventos de cambio de color
bgColorInput.addEventListener('change', cambiarColorFondo);
fontColorInput.addEventListener('change', cambiarColorLetra);

// Función para cambiar el color de fondo
function cambiarColorFondo() {
    resultadoDiv.style.backgroundColor = bgColorInput.value;
}

// Función para cambiar el color de letra
function cambiarColorLetra() {
    resultadoDiv.style.color = fontColorInput.value;
}