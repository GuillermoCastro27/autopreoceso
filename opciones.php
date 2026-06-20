<style>
#menu-buscador {
    background: rgba(0,0,0,0.35) !important;
    color: #e0e0e0 !important;
    border: 1px solid rgba(255,255,255,0.12) !important;
    box-sizing: border-box;
}
#menu-buscador:focus {
    background: rgba(0,0,0,0.5) !important;
    border-color: rgba(255,255,255,0.3) !important;
}
#menu-buscador::placeholder {
    color: rgba(255,255,255,0.38);
}
</style>

<!-- Page Loader -->
<div class="page-loader-wrapper">
    <div class="loader">
        <div class="preloader">
            <div class="spinner-layer pl-red">
                <div class="circle-clipper left"><div class="circle"></div></div>
                <div class="circle-clipper right"><div class="circle"></div></div>
            </div>
        </div>
        <p>Por favor espere...</p>
    </div>
</div>
<!-- Overlay For Sidebars -->
<div class="overlay"></div>

<!-- Top Bar -->
<nav class="navbar">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
            <a href="javascript:void(0);" class="bars"></a>
            <a class="navbar-brand">AUTOPROCESOS</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="/taller_front/manual"
                       style="padding-top:12px; padding-bottom:12px; display:flex; align-items:center; gap:4px;"
                       title="Manual de Usuario">
                        <i class="material-icons" style="color:#fff; vertical-align:middle;">help_outline</i>
                        <span style="color:#fff; font-size:13px; font-weight:600;">Manual</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="cerrarSesion();"
                       style="padding-top:12px; padding-bottom:12px; display:flex; align-items:center; gap:4px;">
                        <i class="material-icons" style="color:#e74c3c; vertical-align:middle;">power_settings_new</i>
                        <span style="color:#fff; font-size:13px; font-weight:600;">Cerrar Sesión</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<section>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info" id="menu-user-info"></div>

        <!-- Buscador de menú -->
        <div style="padding:10px 14px 6px;">
            <div style="position:relative;">
                <i class="material-icons" style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:#aaa;font-size:17px;pointer-events:none;">search</i>
                <input type="text" id="menu-buscador" placeholder="Buscar en el menú..." autocomplete="off"
                       style="width:100%;padding:7px 8px 7px 32px;border:none;border-radius:4px;background:rgba(255,255,255,0.08);color:#fff;font-size:12px;outline:none;transition:background .2s;">
            </div>
        </div>

        <!-- Menu -->
        <div class="menu">
            <ul class="list" id="menu-lista">
                <li class="header">NAVEGACIÓN PRINCIPAL</li>
            </ul>
        </div>
    </aside>

    <!-- Right Sidebar (selector de temas) -->
    <aside id="rightsidebar" class="right-sidebar">
        <ul class="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="skins">
                <ul class="demo-choose-skin">
                    <li data-theme="red" class="active"><div class="red"></div><span>Red</span></li>
                    <li data-theme="pink"><div class="pink"></div><span>Pink</span></li>
                    <li data-theme="purple"><div class="purple"></div><span>Purple</span></li>
                    <li data-theme="indigo"><div class="indigo"></div><span>Indigo</span></li>
                    <li data-theme="blue"><div class="blue"></div><span>Blue</span></li>
                    <li data-theme="cyan"><div class="cyan"></div><span>Cyan</span></li>
                    <li data-theme="teal"><div class="teal"></div><span>Teal</span></li>
                    <li data-theme="green"><div class="green"></div><span>Green</span></li>
                    <li data-theme="orange"><div class="orange"></div><span>Orange</span></li>
                    <li data-theme="brown"><div class="brown"></div><span>Brown</span></li>
                    <li data-theme="grey"><div class="grey"></div><span>Grey</span></li>
                    <li data-theme="black"><div class="black"></div><span>Black</span></li>
                </ul>
            </div>
        </div>
    </aside>
</section>

<script>
/* ============================================================
   MENÚ DINÁMICO — se construye según los permisos del usuario
   ============================================================ */
(function () {
    /* --- Leer sesión --- */
    var sesion = {};
    try { sesion = JSON.parse(localStorage.getItem('datosSesion') || '{}'); } catch (e) {}

    /* --- Redirigir al login si no hay sesión válida --- */
    if (!sesion.token) {
        window.location.href = '/taller_front/index.html';
    }

    var superadmin = sesion.superadmin === true;
    var modulos    = sesion.modulos  || [];
    var permisos   = sesion.permisos || [];

    /* --- Info del usuario en el sidebar --- */
    var userInfoEl = document.getElementById('menu-user-info');
    if (userInfoEl && sesion.user) {
        var nombre = sesion.user.name || sesion.user.login || 'Usuario';
        var perfil = sesion.user.perfil_descripcion || '';
        userInfoEl.innerHTML =
            '<div style="padding:15px 20px; background:rgba(0,0,0,.15);">'
          + '<div style="display:flex; align-items:center; gap:12px;">'
          + '<div style="width:46px; height:46px; border-radius:50%; background:#e74c3c; display:flex; align-items:center; justify-content:center;">'
          + '<i class="material-icons" style="color:#fff; font-size:26px;">person</i></div>'
          + '<div><div style="color:#fff; font-weight:600; font-size:14px;">' + _esc(nombre) + '</div>'
          + '<div style="color:#aaa; font-size:12px;">' + _esc(perfil) + '</div></div>'
          + '</div></div>';
    }

    /* --- Escape HTML seguro --- */
    function _esc(s) {
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    /* --- Verificación de acceso a una ventana --- */
    function tieneAcceso(modulo, entidad) {
        if (!modulo) return true;             // sin módulo = siempre visible (manual, ayuda)
        if (superadmin) return true;
        // Sesión sin datos de módulos → no filtrar (compatible con sesiones viejas)
        if (modulos.length === 0) return true;
        // Verificar que el usuario tenga el módulo
        if (modulos.indexOf(modulo) < 0) return false;
        // Si hay permisos granulares, verificar a nivel de entidad
        if (permisos.length > 0 && entidad) {
            var pfx = modulo + '.' + entidad + '.';
            return permisos.some(function (p) { return p.indexOf(pfx) === 0; });
        }
        // Tiene el módulo pero sin permisos granulares → acceso concedido
        return true;
    }

    /* ============================================================
       ESTRUCTURA DEL MENÚ
       modulo  = nombre del módulo en la BD (mod_nombre)
       entidad = segundo segmento del permiso (modulo.ENTIDAD.accion)
       ============================================================ */
    var MENU = [
        {
            label: 'Gestionar Mantenimiento y Seguridad',
            icono: 'settings',
            grupos: [
                {
                    label: 'Mantener Ref. de Compras', icono: 'store',
                    ventanas: [
                        { label: 'Mantener Proveedores',       url: '/taller_front/referenciales/proveedor',      modulo: 'referenciales', entidad: 'proveedor'      },
                        { label: 'Mantener Ítems',             url: '/taller_front/referenciales/items',          modulo: 'referenciales', entidad: 'items'          },
                        { label: 'Mantener Motivo de Ajuste',  url: '/taller_front/referenciales/Motivo_ajuste',  modulo: 'referenciales', entidad: 'motivo_ajuste'  },
                        { label: 'Mantener Tipo de Ítem',      url: '/taller_front/referenciales/tipo_item',      modulo: 'referenciales', entidad: 'tipos'          },
                        { label: 'Mantener Tipo de Impuesto',  url: '/taller_front/referenciales/tipo_impuesto',  modulo: 'referenciales', entidad: 'tipo_impuesto'  },
                        { label: 'Mantener Marca',             url: '/taller_front/referenciales/marca',          modulo: 'referenciales', entidad: 'marca'          },
                        { label: 'Mantener Modelo',            url: '/taller_front/referenciales/modelo',         modulo: 'referenciales', entidad: 'modelo'         }
                    ]
                },
                {
                    label: 'Mantener Ref. de Servicio de Taller Mecánico', icono: 'tune',
                    ventanas: [
                        { label: 'Mantener Tipo de Servicio',    url: '/taller_front/referenciales/tipo_servicio',    modulo: 'referenciales', entidad: 'tipo_servicio'    },
                        { label: 'Mantener Tipo de Promoción',   url: '/taller_front/referenciales/tipo_promociones', modulo: 'referenciales', entidad: 'tipo_promociones' },
                        { label: 'Mantener Tipo de Descuento',   url: '/taller_front/referenciales/tipo_descuentos',  modulo: 'referenciales', entidad: 'tipo_descuentos'  },
                        { label: 'Mantener Tipo de Diagnóstico', url: '/taller_front/referenciales/Tipo_diagnostico', modulo: 'referenciales', entidad: 'tipo_diagnostico' },
                        { label: 'Mantener Equipo de Trabajo',   url: '/taller_front/referenciales/equipo_trabajo',   modulo: 'referenciales', entidad: 'equipo_trabajo'   },
                        { label: 'Mantener Tipo de Vehículo',    url: '/taller_front/referenciales/tipo_vehiculo',    modulo: 'referenciales', entidad: 'tipo_vehiculo'    },
                        { label: 'Mantener Tipo de Contrato',    url: '/taller_front/referenciales/tipo_contrato',    modulo: 'referenciales', entidad: 'tipo_contrato'    }
                    ]
                },
                {
                    label: 'Mantener Ref. de Ventas y Cobros', icono: 'receipt',
                    ventanas: [
                        { label: 'Mantener Clientes',           url: '/taller_front/referenciales/clientes',         modulo: 'referenciales', entidad: 'clientes'         },
                        { label: 'Mantener Caja',               url: '/taller_front/referenciales/caja',             modulo: 'referenciales', entidad: 'caja'             },
                        { label: 'Mantener Entidad Emisora',    url: '/taller_front/referenciales/entidad_emisora',  modulo: 'referenciales', entidad: 'entidad_emisora'  },
                        { label: 'Mantener Marca de Tarjeta',   url: '/taller_front/referenciales/marca_tarjeta',    modulo: 'referenciales', entidad: 'marca_tarjeta'    },
                        { label: 'Mantener Forma de Cobro',     url: '/taller_front/referenciales/forma_cobro',      modulo: 'referenciales', entidad: 'forma_cobro'      },
                        { label: 'Mantener Entidad Adherida',   url: '/taller_front/referenciales/entidad_adherida',  modulo: 'referenciales', entidad: 'entidad_adherida'  },
                        { label: 'Mantener Tipo Comprobante',   url: '/taller_front/referenciales/tipo_comprobante',  modulo: 'referenciales', entidad: 'tipo_comprobante'  },
                        { label: 'Mantener Timbrado',           url: '/taller_front/referenciales/timbrado',          modulo: 'referenciales', entidad: 'timbrado'          }
                    ]
                },
                {
                    label: 'Mantener Ref. Varios', icono: 'public',
                    ventanas: [
                        { label: 'Mantener Funcionarios',  url: '/taller_front/referenciales/funcionario',  modulo: 'referenciales', entidad: 'funcionarios'  },
                        { label: 'Mantener Ciudades',      url: '/taller_front/referenciales/ciudades',      modulo: 'referenciales', entidad: 'ciudades'      },
                        { label: 'Mantener Países',        url: '/taller_front/referenciales/paises',        modulo: 'referenciales', entidad: 'paises'        },
                        { label: 'Mantener Nacionalidad',  url: '/taller_front/referenciales/nacionalidad',  modulo: 'referenciales', entidad: 'nacionalidad'  },
                        { label: 'Mantener Empresa',       url: '/taller_front/referenciales/empresa',       modulo: 'referenciales', entidad: 'empresa'       },
                        { label: 'Mantener Sucursal',      url: '/taller_front/referenciales/sucursal',      modulo: 'referenciales', entidad: 'sucursal'      },
                        { label: 'Mantener Depósitos',         url: '/taller_front/referenciales/deposito',       modulo: 'referenciales', entidad: 'deposito' }
                    ]
                },
                {
                    label: 'Mantener Seguridad', icono: 'security',
                    ventanas: [
                        { label: 'Mantener Accesos',   url: '/taller_front/referenciales/acceso',          modulo: 'seguridad', entidad: 'accesos'         },
                        { label: 'Mantener Usuarios',  url: '/taller_front/referenciales/users',           modulo: 'seguridad', entidad: 'usuarios'        },
                        { label: 'Mantener Permisos',  url: '/taller_front/referenciales/permisos',        modulo: 'seguridad', entidad: 'permisos'        },
                        { label: 'Mantener Roles',     url: '/taller_front/referenciales/roles',           modulo: 'seguridad', entidad: 'roles'           },
                        { label: 'Mantener Módulos',   url: '/taller_front/referenciales/modulos',         modulo: 'seguridad', entidad: 'modulos'         },
                        { label: 'Mantener Auditoría Login',    url: '/taller_front/referenciales/auditoria_login',         modulo: 'seguridad', entidad: 'auditoria_login'         },
                        { label: 'Mantener Auditoría Transacciones', url: '/taller_front/referenciales/auditoria_transacciones', modulo: 'seguridad', entidad: 'auditoria_transacciones' }
                    ]
                }
            ]
        },
        {
            label: 'Gestionar Compras', icono: 'shopping_cart',
            ventanas: [
                { label: 'Registrar Pedidos',                url: '/taller_front/compras/pedido',            modulo: 'compras', entidad: 'pedidos'       },
                { label: 'Registrar Presupuesto de Proveedor',           url: '/taller_front/compras/presupuesto',        modulo: 'compras', entidad: 'presupuesto'   },
                { label: 'Registrar Órdenes de Compra',      url: '/taller_front/compras/orden_compra',       modulo: 'compras', entidad: 'orden_compra'  },
                { label: 'Registrar Compras',      url: '/taller_front/compras/Reg_compras',        modulo: 'compras', entidad: 'registro'      },
                { label: 'Registrar Nota de Remisión',       url: '/taller_front/compras/Nota_remi_comp',     modulo: 'compras', entidad: 'nota_remision' },
                { label: 'Registrar Ajustes de Inventario',  url: '/taller_front/compras/Ajustes_inventario', modulo: 'compras', entidad: 'ajustes'       },
                { label: 'Registrar Notas de Compra',        url: '/taller_front/compras/notas_cred_deb',     modulo: 'compras', entidad: 'notas'         }
            ]
        },
        {
            label: 'Gestionar Servicio de Taller Mecánico', icono: 'build',
            ventanas: [
                { label: 'Registrar Solicitudes de Servicio',   url: '/taller_front/Servicio/Solicitud',          modulo: 'servicios', entidad: 'solicitudes'       },
                { label: 'Registrar Recepción de Vehículos',    url: '/taller_front/Servicio/Recep',              modulo: 'servicios', entidad: 'recepcion'         },
                { label: 'Registrar Diagnóstico',               url: '/taller_front/Servicio/Diagnostico',        modulo: 'servicios', entidad: 'diagnostico'       },
                { label: 'Registrar Presupuesto de Servicio',   url: '/taller_front/Servicio/PresupuestoServ',    modulo: 'servicios', entidad: 'presupuesto_serv'  },
                { label: 'Registrar Promociones',               url: '/taller_front/Servicio/Promociones',        modulo: 'servicios', entidad: 'promociones'       },
                { label: 'Registrar Descuentos',                url: '/taller_front/Servicio/Descuentos',         modulo: 'servicios', entidad: 'descuentos'        },
                { label: 'Registrar Orden de Servicio',         url: '/taller_front/Servicio/OrdenServicio',      modulo: 'servicios', entidad: 'orden_servicio'    },
                { label: 'Registrar Insumos Utilizados',        url: '/taller_front/Servicio/InsumoUtilizados',   modulo: 'servicios', entidad: 'insumos_utilizados' },
                { label: 'Registrar Contrato',      url: '/taller_front/Servicio/contrato_servicio',  modulo: 'servicios', entidad: 'contrato_servicio' },
                { label: 'Registrar Reclamo de Clientes',       url: '/taller_front/Servicio/Reclamo_cli',        modulo: 'servicios', entidad: 'reclamos'          }
            ]
        },
        {
            label: 'Gestionar Ventas y Cobros', icono: 'point_of_sale',
            ventanas: [
                { label: 'Registrar Pedidos de Clientes',             url: '/taller_front/Ventas/pedido_ventas',          modulo: 'ventas', entidad: 'pedidos'       },
                { label: 'Registrar Ventas',          url: '/taller_front/Ventas/gestionar_ventas',        modulo: 'ventas', entidad: 'ventas'         },
                { label: 'Registrar Apertura y Cierre de Caja', url: '/taller_front/Ventas/apertura_cierre_caja',   modulo: 'ventas', entidad: 'caja'           },
                { label: 'Gestionar Cobranzas', url: '/taller_front/Ventas/cobranzas',             modulo: 'cobros', entidad: 'cobros'         },
                { label: 'Generar Arqueo de Caja',            url: '/taller_front/Ventas/arqueo_caja',             modulo: 'ventas', entidad: 'arqueo'         },
                { label: 'Registrar Nota de Remisión',    url: '/taller_front/Ventas/nota_remi_vent',          modulo: 'ventas', entidad: 'nota_remision'  },
                { label: 'Registrar Notas de Ventas',           url: '/taller_front/Ventas/notas_ventas',            modulo: 'ventas', entidad: 'notas'          }
            ]
        },
        {
            label: 'Informes Varios', icono: 'bar_chart',
            ventanas: [
                { label: 'Informes Web Compras',           url: '/taller_front/compras/Informes_Compra',                    modulo: 'compras',       entidad: null },
                { label: 'Informes Web Servicio',          url: '/taller_front/Servicio/Informes_Servicio',                 modulo: 'servicios',     entidad: null },
                { label: 'Informes Web Ventas',            url: '/taller_front/Ventas/Informes_Ventas',                     modulo: 'ventas',        entidad: null },
                { label: 'Informes Ref. Compras',          url: '/taller_front/referenciales/Informes_Ref_Compras',         modulo: 'referenciales', entidad: null },
                { label: 'Informes Ref. Taller',           url: '/taller_front/referenciales/Informes_Ref_Servicio',        modulo: 'referenciales', entidad: null },
                { label: 'Informes Ref. Ventas y Cobros',  url: '/taller_front/referenciales/Informes_Ref_Ventas',          modulo: 'referenciales', entidad: null },
                { label: 'Informes Ref. Varios',           url: '/taller_front/referenciales/Informes_Ref_Varios',          modulo: 'referenciales', entidad: null },
                { label: 'Informes Ref. Seguridad',        url: '/taller_front/referenciales/Informes_Ref_Seguridad',       modulo: 'seguridad',     entidad: null }
            ]
        },
    ];

    /* ============================================================
       CONSTRUCCIÓN DEL HTML
       ============================================================ */
    var ruta = window.location.pathname;

    function esActiva(url) {
        return ruta.indexOf(url) >= 0;
    }

    function buildVentana(v) {
        if (!tieneAcceso(v.modulo, v.entidad)) return '';
        var activo = esActiva(v.url) ? ' class="active"' : '';
        return '<li' + activo + '>'
             + '<a href="' + v.url + '"><span>' + _esc(v.label) + '</span></a>'
             + '</li>';
    }

    function buildGrupo(g) {
        var items = g.ventanas.map(buildVentana).join('');
        if (!items) return '';
        var tieneActiva = g.ventanas.some(function(v) { return esActiva(v.url) && tieneAcceso(v.modulo, v.entidad); });
        return '<li' + (tieneActiva ? ' class="active"' : '') + '>'
             + '<a href="javascript:void(0);" class="menu-toggle' + (tieneActiva ? ' toggled' : '') + '">'
             + '<i class="material-icons">' + (g.icono || 'folder') + '</i>'
             + '<span>' + _esc(g.label) + '</span></a>'
             + '<ul class="ml-menu"' + (tieneActiva ? '' : ' style="display:none;"') + '>' + items + '</ul>'
             + '</li>';
    }

    function buildModulo(m) {
        var contenido = '';
        if (m.grupos) {
            contenido = m.grupos.map(buildGrupo).join('');
        } else if (m.ventanas) {
            contenido = m.ventanas.map(buildVentana).join('');
        }
        if (!contenido) return '';

        var tieneActiva = false;
        if (m.grupos) {
            tieneActiva = m.grupos.some(function(g) {
                return g.ventanas.some(function(v) { return esActiva(v.url) && tieneAcceso(v.modulo, v.entidad); });
            });
        } else if (m.ventanas) {
            tieneActiva = m.ventanas.some(function(v) { return esActiva(v.url) && tieneAcceso(v.modulo, v.entidad); });
        }

        return '<li' + (tieneActiva ? ' class="active"' : '') + '>'
             + '<a href="javascript:void(0);" class="menu-toggle' + (tieneActiva ? ' toggled' : '') + '">'
             + '<i class="material-icons">' + m.icono + '</i>'
             + '<span>' + _esc(m.label) + '</span></a>'
             + '<ul class="ml-menu"' + (tieneActiva ? '' : ' style="display:none;"') + '>' + contenido + '</ul>'
             + '</li>';
    }

    /* --- Insertar en el DOM --- */
    var lista = document.getElementById('menu-lista');
    if (!lista) return;

    var homeLi = '';
    if (ruta.indexOf('/taller_front/menu.php') < 0) {
        homeLi = '<li><a href="/taller_front/menu.php">'
                + '<i class="material-icons">home</i><span>Home</span></a></li>';
    }

    lista.innerHTML = '<li class="header">NAVEGACIÓN PRINCIPAL</li>'
                    + homeLi
                    + MENU.map(buildModulo).join('');
})();

/* --- Cerrar sesión --- */
function cerrarSesion() {
    localStorage.removeItem('datosSesion');
    localStorage.removeItem('2fa_email');
    window.location.href = '/taller_front/index.html';
}

/* --- URL del backend (antes en ruta.js) --- */
function getUrl() {
    var host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
        return 'http://127.0.0.1:8000/Proyecto_tp/';
    }
    return 'https://web-production-f58ca.up.railway.app/Proyecto_tp/';
}

function getFrontUrl() {
    var host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
        return 'http://localhost/taller_front/';
    }
    return 'https://remarkable-axolotl-f9d663.netlify.app/';
}

/* --- Modo foto: muestra panel de detalle para capturas del manual --- */
if (new URLSearchParams(window.location.search).get('foto') === '1') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            $('#detalle, #cardDetalle').show();
            $('#formDetalles, #formDetalle').show();
        }, 800);
    });
}

function tienePermiso(permiso) {
    try {
        var sesion   = JSON.parse(localStorage.getItem('datosSesion') || '{}');
        var permisos = sesion.permisos || [];
        if (permisos.length === 0) return true;
        if (permisos.indexOf(permiso) >= 0) return true;
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

function aplicarPermisosUI(reglas) {
    reglas.forEach(function (r) {
        if (!tienePermiso(r.permiso)) {
            document.querySelectorAll(r.selector).forEach(function (el) {
                el.style.display = 'none';
            });
        }
    });
}

/* ============================================================
   BUSCADOR DE MENÚ
   ============================================================ */
(function () {
    var input = document.getElementById('menu-buscador');
    if (!input) return;

    /* Placeholder color via inline style + focus/blur */
    input.addEventListener('focus', function () { this.style.background = 'rgba(255,255,255,0.16)'; });
    input.addEventListener('blur',  function () { this.style.background = 'rgba(255,255,255,0.08)'; });

    input.addEventListener('input', function () {
        var q     = this.value.trim().toLowerCase();
        var lista = document.getElementById('menu-lista');
        if (!lista) return;

        if (!q) {
            /* Restaurar: mostrar todo, colapsar los ul.ml-menu que no tienen active */
            lista.querySelectorAll('li').forEach(function (li) {
                li.style.display = '';
            });
            lista.querySelectorAll('ul.ml-menu').forEach(function (ul) {
                var parentLi = ul.parentElement;
                var open = parentLi && parentLi.classList.contains('active');
                ul.style.display = open ? '' : 'none';
            });
            return;
        }

        /* Obtener todos los links de navegación reales (no toggles) */
        var hojas = [];
        lista.querySelectorAll('a').forEach(function (a) {
            var href = a.getAttribute('href');
            if (!a.classList.contains('menu-toggle') && href && href !== 'javascript:void(0);') {
                hojas.push(a.parentElement);
            }
        });

        /* Ocultar todo excepto el header */
        lista.querySelectorAll('li:not(.header)').forEach(function (li) {
            li.style.display = 'none';
        });
        lista.querySelectorAll('ul.ml-menu').forEach(function (ul) {
            ul.style.display = 'none';
        });

        /* Mostrar las hojas que coinciden y sus ancestros */
        hojas.forEach(function (li) {
            var a    = li.querySelector('a');
            var text = a ? a.textContent.trim().toLowerCase() : '';
            if (text.indexOf(q) < 0) return;

            li.style.display = '';

            /* Subir por el árbol y abrir cada ul.ml-menu y li padre */
            var node = li.parentElement;
            while (node && node !== lista) {
                if (node.tagName === 'UL')  node.style.display = '';
                if (node.tagName === 'LI')  node.style.display = '';
                node = node.parentElement;
            }
        });
    });
})();
</script>

