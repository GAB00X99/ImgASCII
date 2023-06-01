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
// Obtener el campo de texto de caracteres a ocultar
var hiddenCharsInput = document.getElementById('hidden_chars');

// Obtener el elemento de resultado
var resultadoDiv = document.querySelector('.resultado');

// Escuchar el evento de cambio en el campo de texto
hiddenCharsInput.addEventListener('input', ocultarCaracteres);

// Función para ocultar los caracteres especificados
function ocultarCaracteres() {
    var hiddenChars = hiddenCharsInput.value;

    // Obtener el contenido del resultado
    var asciiImg = resultadoDiv.querySelector('pre');
    var asciiText = asciiImg.textContent;

    // Reemplazar los caracteres especificados por espacios vacíos
    var charsArray = hiddenChars.split('');
    for (var i = 0; i < charsArray.length; i++) {
        var char = charsArray[i];
        asciiText = asciiText.split(char).join(' ');
    }

    // Actualizar el contenido del resultado con los caracteres ocultos
    asciiImg.textContent = asciiText;
}
