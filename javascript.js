var ubicacionesDisponibles = [];

// Configura Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBhELI7sH-N46iYADK0LPvpWL4B0leJoyk",
    authDomain: "prueba-5-2aaab.firebaseapp.com",
    databaseURL: "https://prueba-5-2aaab-default-rtdb.firebaseio.com",
    projectId: "prueba-5-2aaab",
    storageBucket: "prueba-5-2aaab.appspot.com",
    messagingSenderId: "410823361768",
    appId: "1:410823361768:web:d5eb642483379bbd30355d"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Obtener ubicaciones almacenadas en Firebase al cargar la página
database.ref('ubicaciones').on('value', function(snapshot) {
    ubicacionesDisponibles = [];
    snapshot.forEach(function(childSnapshot) {
        var ubicacion = childSnapshot.val();
        ubicacionesDisponibles.push(ubicacion);
    });
    mostrarUbicacionesGuardadas();
});

// Función para mostrar las ubicaciones almacenadas
function mostrarUbicacionesGuardadas() {
    var listaDirecciones = document.getElementById("listaDirecciones");
    listaDirecciones.innerHTML = '';

    ubicacionesDisponibles.forEach(function(ubicacion) {
        var nuevaDireccion = document.createElement("li");
        nuevaDireccion.textContent = ubicacion.address;
        nuevaDireccion.setAttribute("data-latitud", ubicacion.latitude);
        nuevaDireccion.setAttribute("data-longitud", ubicacion.longitude);
        listaDirecciones.appendChild(nuevaDireccion);
    });
}

// Función para guardar las ubicaciones en Firebase
function guardarUbicacionEnFirebase(ubicacion) {
    database.ref('ubicaciones').push(ubicacion);
}

// Función para mostrar el contenido de Buscar Sitio y ocultar la Página Principal
document.getElementById("btnBuscarSitio").addEventListener("click", function() {
    document.getElementById("paginaPrincipal").classList.add("hidden");
    document.getElementById("contenidoBuscarSitio").classList.remove("hidden");
});

// Función para volver a la Página Principal desde el contenido de Buscar Sitio
document.getElementById("btnVolverBuscar").addEventListener("click", function() {
    document.getElementById("contenidoBuscarSitio").classList.add("hidden");
    document.getElementById("paginaPrincipal").classList.remove("hidden");
});

// Función para mostrar el contenido de Indicar Sitio y ocultar la Página Principal
document.getElementById("btnIndicarSitio").addEventListener("click", function() {
    document.getElementById("paginaPrincipal").classList.add("hidden");
    document.getElementById("contenidoIndicarSitio").classList.remove("hidden");
});

// Función para volver a la Página Principal desde el contenido de Indicar Sitio
document.getElementById("btnVolverIndicar").addEventListener("click", function() {
    document.getElementById("contenidoIndicarSitio").classList.add("hidden");
    document.getElementById("paginaPrincipal").classList.remove("hidden");
});

// Función para obtener la ubicación del usuario y mostrar el nombre de la dirección
document.getElementById("btnIndicar").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            
            // Llamada a la API de geocodificación inversa de OpenStreetMap
            fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude)
                .then(response => response.json())
                .then(data => {
                    var address = data.display_name; // Obtener el nombre de la dirección
                    var ubicacion = { address: address, latitude: latitude, longitude: longitude };
                    guardarUbicacionEnFirebase(ubicacion); // Guardar en Firebase
                })
                .catch(error => {
                    console.error('Error al obtener la dirección:', error);
                });
        });
    } else {
        alert("Geolocalización no soportada en este navegador.");
    }
});

// Función para filtrar la lista de ubicaciones según la entrada del usuario
document.getElementById("inputBusqueda").addEventListener("input", function() {
    var input = this.value.trim().toLowerCase();
    var listaUbicacionesBusqueda = document.getElementById("listaUbicacionesBusqueda");
    listaUbicacionesBusqueda.innerHTML = '';

    ubicacionesDisponibles.forEach(function(ubicacion) {
        var address = ubicacion.address;

        if (address.toLowerCase().includes(input)) {
            var nuevaUbicacion = document.createElement("li");
            nuevaUbicacion.textContent = address;
            nuevaUbicacion.setAttribute("data-latitud", ubicacion.latitude);
            nuevaUbicacion.setAttribute("data-longitud", ubicacion.longitude);
            listaUbicacionesBusqueda.appendChild(nuevaUbicacion);
        }
    });
});

// Al hacer clic en una ubicación encontrada en la búsqueda, llenar el cuadro de búsqueda en el contenido "Buscar sitio" con la ubicación seleccionada
document.getElementById("listaUbicacionesBusqueda").addEventListener("click", function(event) {
    var target = event.target;
    var latitud = target.getAttribute("data-latitud");
    var longitud = target.getAttribute("data-longitud");
    document.getElementById("inputBusqueda").value = "Latitud: " + latitud + ", Longitud: " + longitud;
});
