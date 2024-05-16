// Initialize Firebase
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener una referencia a la base de datos
var database = firebase.database();

// Función para registrar una ubicación en la base de datos
function registrarUbicacion(latitud, longitud) {
    var ubicacionesRef = database.ref('ubicaciones');
    var nuevaUbicacionRef = ubicacionesRef.push();
    nuevaUbicacionRef.set({
        latitud: latitud,
        longitud: longitud
    });
}

// Función para obtener y mostrar todas las ubicaciones registradas
function mostrarUbicaciones() {
    var ubicacionesRef = database.ref('ubicaciones');
    ubicacionesRef.on('value', function(snapshot) {
        var listaUbicaciones = document.getElementById("lista-ubicaciones");
        listaUbicaciones.innerHTML = ""; // Limpiar la lista antes de agregar nuevas ubicaciones
        snapshot.forEach(function(childSnapshot) {
            var ubicacion = childSnapshot.val();
            var latitud = ubicacion.latitud;
            var longitud = ubicacion.longitud;
            var nuevaUbicacion = document.createElement("li");
            nuevaUbicacion.textContent = "Latitud: " + latitud + ", Longitud: " + longitud;
            listaUbicaciones.appendChild(nuevaUbicacion);
        });
    });
}

// Función para obtener la ubicación del usuario y registrarla
function obtenerUbicacion() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            registrarUbicacion(latitud, longitud);
        });
    } else {
        alert("La geolocalización no está disponible en este navegador.");
    }
}

// Llamar a la función para mostrar las ubicaciones al cargar la página
mostrarUbicaciones();
