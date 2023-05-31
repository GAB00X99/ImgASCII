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

document.getElementById('captureButton').addEventListener('click', function() {
    // Capturar el elemento .resultado
    var resultadoDiv = document.querySelector('.resultado');

    // Utilizar html2canvas para generar la captura de pantalla
    html2canvas(resultadoDiv).then(function(canvas) {
        // Crear un elemento <a> para descargar la imagen
        var link = document.createElement('a');
        link.href = canvas.toDataURL(); // Obtener la URL de la imagen
        link.download = 'captura.png'; // Nombre de archivo de descarga
        link.click(); // Simular clic en el enlace para descargar la imagen
    });
});
