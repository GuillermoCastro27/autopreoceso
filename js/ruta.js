function getUrl(){
    var host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
        return "http://127.0.0.1:8000/Proyecto_tp/";
    }
    return "https://web-production-f58ca.up.railway.app/Proyecto_tp/";
}

function getFrontUrl(){
    var host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
        return "http://localhost/taller_front/";
    }
    return "https://remarkable-axolotl-f9d663.netlify.app/";
}

// ─── PERMISOS GRANULARES ────────────────────────────────────────────────────

/**
 * Verifica si el usuario en sesión tiene un permiso granular.
 * @param {string} permiso  Formato "modulo.accion", ej: "compras.anular"
 * @returns {boolean}  true si tiene permiso O si no hay permisos granulares definidos (perfil legacy)
 */
function tienePermiso(permiso) {
    try {
        var sesion   = JSON.parse(localStorage.getItem('datosSesion') || '{}');
        var permisos = sesion.permisos || [];
        // Sin permisos granulares definidos → acceso total (compatibilidad con sesiones anteriores)
        if (permisos.length === 0) return true;
        // Coincidencia exacta
        if (permisos.indexOf(permiso) >= 0) return true;
        // Fallback: si se pide modulo.entidad.accion, también acepta modulo.accion (perfil de nivel 2)
        var partes = permiso.split('.');
        if (partes.length === 3) {
            var fallback = partes[0] + '.' + partes[2];
            if (permisos.indexOf(fallback) >= 0) return true;
        }
        return false;
    } catch (e) {
        return true;
    }
}

/**
 * Oculta elementos del DOM según permisos. Llamar después del DOM ready.
 * @param {Array<{selector: string, permiso: string}>} reglas
 */
function aplicarPermisosUI(reglas) {
    reglas.forEach(function(r) {
        if (!tienePermiso(r.permiso)) {
            document.querySelectorAll(r.selector).forEach(function(el) {
                el.style.display = 'none';
            });
        }
    });
}
