function mostrarUbicacion() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var ubicacion = "Latitud: " + lat + ", Longitud: " + lon;

            guardarUbicacion(ubicacion);
            mostrarLista();
        });
    } else {
        alert("La geolocalización no está disponible en este navegador.");
    }
}

function guardarUbicacion(ubicacion) {
    var lista = document.getElementById("lista-ubicaciones");
    var nuevaUbicacion = document.createElement("li");
    nuevaUbicacion.textContent = ubicacion;
    lista.appendChild(nuevaUbicacion);
}

function mostrarLista() {
    var lista = document.getElementById("lista-ubicaciones");
    lista.style.display = "block";
}
