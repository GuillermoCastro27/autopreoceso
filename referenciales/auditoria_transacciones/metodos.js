var tablaIniciada = false;
var auditData     = [];
var todasLasTablas = [];

$(function() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format:      'DD/MM/YYYY',
        time:        false,
        clearButton: true,
        weekStart:   1
    });
});

function parseFecha(val) {
    if (!val || val.length !== 10) return '';
    var p = val.split('/');
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : '';
}

// Palabras clave para identificar a qué módulo pertenece cada tabla
var MODULOS_KEYWORDS = {
    'Compras':       ['comp', 'compra', 'pedido', 'orden_compra', 'ajuste', 'nota_remi_comp', 'notas_cred_deb', 'presupuesto_comp'],
    'Ventas':        ['vent', 'venta', 'cobro', 'apertura', 'arqueo', 'nota_remi_vent', 'notas_vent', 'pedidos_ven'],
    'Servicio':      ['serv', 'solicitud', 'recepcion', 'diagnostico', 'reclamo', 'promocion', 'descuento', 'insumo', 'contrato_serv', 'ord_serv', 'pres_serv'],
    'Referenciales': ['empresa', 'sucursal', 'cliente', 'proveedor', 'item', 'marca', 'modelo', 'funcionario', 'pais', 'ciudad', 'nacion', 'tipo_', 'motivo', 'equipo', 'caja', 'entidad', 'timbrado', 'deposito', 'forma_cobro'],
    'Seguridad':     ['user', 'rol', 'permiso', 'modulo', 'acceso', 'login']
};

// Colores y etiquetas por módulo
var MODULOS_ESTILO = {
    'Compras':       { color: '#8e44ad', icon: 'shopping_cart' },
    'Ventas':        { color: '#27ae60', icon: 'point_of_sale' },
    'Servicio':      { color: '#e67e22', icon: 'build'         },
    'Referenciales': { color: '#2980b9', icon: 'settings'      },
    'Seguridad':     { color: '#c0392b', icon: 'security'      },
    'Otro':          { color: '#7f8c8d', icon: 'help_outline'  }
};

cargarTablas();
listar();

function getModuloDeTabla(nombreTabla) {
    var t = nombreTabla.toLowerCase();
    for (var modulo in MODULOS_KEYWORDS) {
        var keywords = MODULOS_KEYWORDS[modulo];
        for (var i = 0; i < keywords.length; i++) {
            if (t.indexOf(keywords[i]) !== -1) return modulo;
        }
    }
    return 'Otro';
}

function cargarTablas() {
    $.ajax({
        url:    getUrl() + 'auditoria/tablas',
        method: 'GET'
    })
    .done(function(data) {
        todasLasTablas = data || [];
        filtrarTablasPorModulo(false); // false = no auto-listar al cargar
    });
}

function filtrarTablasPorModulo(autoListar) {
    var modulo = $('#filtro_modulo').val();
    var tablas = todasLasTablas;

    if (modulo && MODULOS_KEYWORDS[modulo]) {
        var keywords = MODULOS_KEYWORDS[modulo];
        tablas = todasLasTablas.filter(function(t) {
            var tLower = t.toLowerCase();
            return keywords.some(function(kw) { return tLower.indexOf(kw) !== -1; });
        });
    }

    var opts = '<option value="">— Todas las tablas —</option>';
    tablas.forEach(function(t) {
        opts += '<option value="' + t + '">' + t + '</option>';
    });
    $('#filtro_tabla').html(opts);

    if (autoListar !== false) listar();
}

function listar() {
    if (tablaIniciada) {
        $('.js-exportable').DataTable().destroy();
        tablaIniciada = false;
    }

    $.ajax({
        url:    getUrl() + 'auditoria/read',
        method: 'GET',
        data: {
            tabla_nombre: $('#filtro_tabla').val(),
            operacion:    $('#filtro_operacion').val(),
            registro_id:  $('#filtro_registro_id').val().trim(),
            desde:        parseFecha($('#filtro_desde').val()),
            hasta:        parseFecha($('#filtro_hasta').val())
        }
    })
    .done(function(data) {
        // Si hay módulo seleccionado, filtrar también por módulo en el resultado
        var moduloSel = $('#filtro_modulo').val();
        if (moduloSel && !$('#filtro_tabla').val()) {
            data = data.filter(function(r) {
                return getModuloDeTabla(r.tabla_nombre) === moduloSel;
            });
        }
        renderResumen(data);
        renderTabla(data);
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudieron cargar los registros de auditoría.', 'error');
    });
}

function renderResumen(data) {
    var conteos = { INSERT: 0, UPDATE: 0, DELETE: 0 };
    var porModulo = {};
    data.forEach(function(r) {
        if (conteos[r.operacion] !== undefined) conteos[r.operacion]++;
        var mod = getModuloDeTabla(r.tabla_nombre);
        porModulo[mod] = (porModulo[mod] || 0) + 1;
    });

    var html = tarjeta('add_circle',     'INSERT',  conteos.INSERT, '#27ae60')
             + tarjeta('edit',           'UPDATE',  conteos.UPDATE, '#2980b9')
             + tarjeta('delete_forever', 'DELETE',  conteos.DELETE, '#c0392b')
             + tarjeta('list',           'Total',   data.length,    '#7f8c8d');

    // Mini tarjetas por módulo (solo si hay más de un módulo)
    var modulosPresentes = Object.keys(porModulo).sort();
    if (modulosPresentes.length > 1) {
        var htmlMod = '<div class="col-sm-12" style="margin-top:10px;">'
                    + '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
        modulosPresentes.forEach(function(mod) {
            var est = MODULOS_ESTILO[mod] || MODULOS_ESTILO['Otro'];
            htmlMod += '<div style="background:#fff;border-left:3px solid ' + est.color + ';'
                     + 'border-radius:5px;padding:6px 14px;box-shadow:0 1px 3px rgba(0,0,0,.08);'
                     + 'display:flex;align-items:center;gap:6px;">'
                     + '<i class="material-icons" style="color:' + est.color + ';font-size:16px;">' + est.icon + '</i>'
                     + '<span style="font-weight:700;color:' + est.color + ';">' + porModulo[mod] + '</span>'
                     + '<span style="font-size:11px;color:#888;">' + mod + '</span>'
                     + '</div>';
        });
        htmlMod += '</div></div>';
        html += htmlMod;
    }

    $('#resumen').html(html);
}

function renderTabla(data) {
    auditData = data;
    var filas = '';

    data.forEach(function(r, i) {
        var badgeClass = 'badge-' + r.operacion.toLowerCase();
        var fecha      = r.fecha_hora ? r.fecha_hora.replace('T', ' ').substring(0, 19) : '—';
        var modulo     = getModuloDeTabla(r.tabla_nombre);
        var est        = MODULOS_ESTILO[modulo] || MODULOS_ESTILO['Otro'];

        var badgeMod = '<span style="background:' + est.color + ';color:#fff;'
                     + 'padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">'
                     + modulo + '</span>';

        var btnDetalle = '<button class="btn btn-default btn-xs btn-detalle waves-effect" '
                       + 'onclick="verDetalle(' + i + ');">'
                       + '<i class="material-icons" style="font-size:14px;vertical-align:middle;">visibility</i>'
                       + '</button>';

        filas += '<tr>'
               + '<td>' + (i + 1) + '</td>'
               + '<td>' + badgeMod + '</td>'
               + '<td><code>' + r.tabla_nombre + '</code></td>'
               + '<td><span class="' + badgeClass + '">' + r.operacion + '</span></td>'
               + '<td>' + (r.registro_id || '—') + '</td>'
               + '<td><small>' + (r.usuario_bd || '—') + '</small></td>'
               + '<td>' + fecha + '</td>'
               + '<td>' + btnDetalle + '</td>'
               + '</tr>';
    });

    $('#tableBody').html(filas);

    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        order: [[6, 'desc']],
        columnDefs: [{ orderable: false, targets: 7 }],
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Auditoría de Transacciones' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Auditoría de Transacciones' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Auditoría de Transacciones' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Auditoría de Transacciones' }
        ],
        iDisplayLength: 25,
        language: {
            sSearch:      'Buscar: ',
            sInfo:        'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoFiltered:'(filtrado de _MAX_)',
            sZeroRecords: 'No se encontraron registros',
            sInfoEmpty:   'Mostrando 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });

    tablaIniciada = true;
}

function verDetalle(index) {
    var r = auditData[index];
    if (!r) return;

    var modulo = getModuloDeTabla(r.tabla_nombre);
    $('#modalTitulo').text(r.operacion + ' — ' + r.tabla_nombre + ' #' + r.registro_id + '  [' + modulo + ']');

    try {
        var anterior = r.datos_anteriores ? JSON.stringify(JSON.parse(r.datos_anteriores), null, 2) : null;
        var nuevo    = r.datos_nuevos     ? JSON.stringify(JSON.parse(r.datos_nuevos),     null, 2) : null;

        if (anterior) {
            $('#jsonAntes').text(anterior).removeClass('json-null');
        } else {
            $('#jsonAntes').text('(sin datos anteriores — operación INSERT)').addClass('json-null');
        }

        if (nuevo) {
            $('#jsonDespues').text(nuevo).removeClass('json-null');
        } else {
            $('#jsonDespues').text('(sin datos nuevos — operación DELETE)').addClass('json-null');
        }
    } catch (e) {
        $('#jsonAntes').text(r.datos_anteriores || '—');
        $('#jsonDespues').text(r.datos_nuevos   || '—');
    }

    $('#modalDetalle').modal('show');
}

function tarjeta(icono, label, valor, color) {
    return '<div class="col-sm-3">'
         + '<div style="background:#fff;border-left:4px solid ' + color + ';border-radius:6px;'
         + 'padding:14px 18px;box-shadow:0 1px 4px rgba(0,0,0,.08);margin-bottom:10px;">'
         + '<div style="display:flex;align-items:center;gap:10px;">'
         + '<i class="material-icons" style="color:' + color + ';font-size:32px;">' + icono + '</i>'
         + '<div><div style="font-size:24px;font-weight:700;color:' + color + ';">' + valor + '</div>'
         + '<div style="font-size:12px;color:#888;">' + label + '</div></div>'
         + '</div></div></div>';
}
