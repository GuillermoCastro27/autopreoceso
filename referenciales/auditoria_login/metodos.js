var tablaIniciada = false;

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

listar();

var ETIQUETAS = {
    'exitoso':              { label: 'Exitoso',              clase: 'badge-exitoso'           },
    'contrasena_incorrecta':{ label: 'Contraseña incorrecta', clase: 'badge-contrasena'        },
    'usuario_no_existe':    { label: 'Usuario no existe',    clase: 'badge-usuario_no_existe' },
    'bloqueado':            { label: 'Bloqueado',            clase: 'badge-bloqueado'         },
};

function parsearNavegador(ua) {
    if (!ua) return '—';
    if (ua.includes('Edg'))     return 'Edge';
    if (ua.includes('Chrome'))  return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari'))  return 'Safari';
    if (ua.includes('Opera'))   return 'Opera';
    return ua.substring(0, 40);
}

function listar() {
    if (tablaIniciada) {
        $('.js-exportable').DataTable().destroy();
        tablaIniciada = false;
    }

    $.ajax({
        url: getUrl() + 'login-intentos/read',
        method: 'GET',
        dataType: 'json',
        data: {
            login:     $('#filtro_login').val().trim(),
            resultado: $('#filtro_resultado').val(),
            desde:     parseFecha($('#filtro_desde').val()),
            hasta:     parseFecha($('#filtro_hasta').val())
        }
    })
    .done(function(data) {
        // Resumen por resultado
        var conteos = { exitoso: 0, contrasena_incorrecta: 0, usuario_no_existe: 0, bloqueado: 0 };
        data.forEach(function(r) { if (conteos[r.resultado] !== undefined) conteos[r.resultado]++; });

        $('#resumen').html(
            tarjetaResumen('check_circle', 'Exitosos',              conteos.exitoso,              '#27ae60') +
            tarjetaResumen('lock',         'Contraseña incorrecta', conteos.contrasena_incorrecta,'#e67e22') +
            tarjetaResumen('person_off',   'Usuario no existe',     conteos.usuario_no_existe,    '#8e44ad') +
            tarjetaResumen('block',        'Bloqueados',            conteos.bloqueado,            '#c0392b')
        );

        // Tabla
        var filas = '';
        data.forEach(function(r, i) {
            var info   = ETIQUETAS[r.resultado] || { label: r.resultado, clase: '' };
            var fecha  = r.created_at ? r.created_at.replace('T', ' ').substring(0, 19) : '—';
            filas += '<tr>'
                   + '<td>' + (i + 1) + '</td>'
                   + '<td><strong>' + (r.login || '—') + '</strong></td>'
                   + '<td><span class="' + info.clase + '">' + info.label + '</span></td>'
                   + '<td><code>' + (r.ip || '—') + '</code></td>'
                   + '<td>' + parsearNavegador(r.user_agent) + '</td>'
                   + '<td>' + fecha + '</td>'
                   + '</tr>';
        });
        $('#tableBody').html(filas);

        $('.js-exportable').DataTable({
            dom: 'Bfrtip',
            responsive: true,
            order: [],
            buttons: [
                { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Auditoría de Login' },
                { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Auditoría de Login' },
                { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Auditoría de Login' },
                { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Auditoría de Login' }
            ],
            iDisplayLength: 25,
            language: {
                sSearch: 'Buscar: ',
                sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
                sInfoFiltered: '(filtrado de _MAX_)',
                sZeroRecords: 'No se encontraron registros',
                sInfoEmpty: 'Mostrando 0 registros',
                oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
            }
        });
        tablaIniciada = true;
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudieron cargar los registros', 'error');
    });
}

function tarjetaResumen(icono, label, valor, color) {
    return '<div class="col-sm-3">'
         + '<div style="background:#fff; border-left:4px solid ' + color + '; border-radius:6px; padding:14px 18px; box-shadow:0 1px 4px rgba(0,0,0,.08);">'
         + '<div style="display:flex; align-items:center; gap:10px;">'
         + '<i class="material-icons" style="color:' + color + '; font-size:32px;">' + icono + '</i>'
         + '<div><div style="font-size:24px; font-weight:700; color:' + color + ';">' + valor + '</div>'
         + '<div style="font-size:12px; color:#888;">' + label + '</div></div>'
         + '</div></div></div>';
}

function confirmarLimpiar() {
    swal({
        title: 'Limpiar registros',
        text: '¿Eliminar todos los registros anteriores a 90 días?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c0392b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }, function() {
        $.ajax({
            url:    getUrl() + 'login-intentos/limpiar',
            method: 'DELETE'
        })
        .done(function(r) {
            swal('Listo', r.mensaje, r.tipo);
            listar();
        })
        .fail(function() { swal('Error', 'No se pudo limpiar', 'error'); });
    });
}
