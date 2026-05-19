// Función para ejecutar el inicio de sesión
function validarEntrada(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const u = document.getElementById("userInput").value.trim();
    const p = document.getElementById("passInput").value.trim();
    
    const loginSection = document.getElementById("login-section");
    const loader = document.getElementById("loader");

    // Credenciales
    if (u === "admin" && p === "admin") {
        // EVITAR PARPADEO: Bloqueamos cualquier otra acción
        if (loginSection.style.display === "none") return;

        // 1. Iniciamos animación visual
        loginSection.style.opacity = "0";
        loginSection.style.transform = "translateY(-20px)";
        loginSection.style.pointerEvents = "none"; // Desactiva botones
        
        // 2. Transición al loader
        setTimeout(() => {
            loginSection.style.display = "none";
            loader.style.display = "block";
        }, 500);

        // 3. Guardar sesión en el mismo storage que usa index.html
        sessionStorage.setItem("login", "true");
        
        // 4. Redirección
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2500); 

    } else {
        alert("Acceso denegado. Verifique sus datos.");
        document.getElementById("passInput").value = "";
    }
}

// Verificación de sesión inicial
window.onload = function() {
    if (sessionStorage.getItem("login") === "true") {
        // Si hay sesión, ocultamos el login antes de que se vea (evita parpadeo inicial)
        document.getElementById("login-section").style.display = "none";
        window.location.href = "index.html";
    }
};