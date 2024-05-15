// Al cargar la página, intenta cargar las ubicaciones guardadas
window.addEventListener("load", function() {
    var storedLocations = JSON.parse(localStorage.getItem("ubicacionesDisponibles"));
    if (storedLocations) {
        ubicacionesDisponibles = storedLocations;
        mostrarUbicacionesGuardadas();
    }
});

// Función para mostrar las ubicaciones guardadas
function mostrarUbicacionesGuardadas() {
    if (typeof(Storage) !== "undefined") {
        var storedLocations = JSON.parse(localStorage.getItem("ubicacionesDisponibles"));
        if (storedLocations) {
            ubicacionesDisponibles = storedLocations;
            var listaDirecciones = document.getElementById("listaDirecciones");
            listaDirecciones.innerHTML = '';
            ubicacionesDisponibles.forEach(function(ubicacion) {
                var latitud = ubicacion.latitude;
                var longitud = ubicacion.longitude;
                var nuevaDireccion = document.createElement("li");
                nuevaDireccion.textContent = "Latitud: " + latitud + ", Longitud: " + longitud;
                nuevaDireccion.setAttribute("data-latitud", latitud);
                nuevaDireccion.setAttribute("data-longitud", longitud);
                listaDirecciones.appendChild(nuevaDireccion);
            });
        }
    } else {
        console.log("El navegador no soporta localStorage.");
    }
}

