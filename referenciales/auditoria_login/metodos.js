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
cargarBloqueados();

var ETIQUETAS = {
    'exitoso':              { label: 'Exitoso',              clase: 'badge-exitoso'           },
    'contrasena_incorrecta':{ label: 'Contraseña incorrecta', clase: 'badge-contrasena'        },
    'usuario_no_existe':    { label: 'Usuario no existe',    clase: 'badge-usuario_no_existe' },
    'bloqueado':            { label: 'Bloqueado',            clase: 'badge-bloqueado'         },
    'desbloqueado':         { label: 'Desbloqueado',         clase: 'badge-desbloqueado'      },
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

function cargarBloqueados() {
    $.ajax({
        url:      getUrl() + 'users/bloqueados',
        method:   'GET',
        dataType: 'json'
    })
    .done(function(data) {
        if (!data || data.length === 0) {
            $('#card-bloqueados').hide();
            return;
        }
        $('#badge-cant-bloqueados').text(data.length);
        var filas = '';
        data.forEach(function(u) {
            var hasta = u.bloqueado_hasta
                ? u.bloqueado_hasta.replace('T', ' ').substring(0, 19)
                : '—';
            filas += '<tr>'
                   + '<td>' + (u.name || '—') + '</td>'
                   + '<td><strong>' + (u.login || '—') + '</strong></td>'
                   + '<td>' + (u.email || '—') + '</td>'
                   + '<td>' + hasta + '</td>'
                   + '<td style="text-align:center;"><span style="color:#c0392b; font-weight:700;">' + (u.minutos_restantes || 0) + ' min</span></td>'
                   + '<td style="text-align:center;">'
                   + '<button class="btn btn-success btn-sm waves-effect" onclick="desbloquear(' + u.id + ',\'' + (u.login || '') + '\')">'
                   + '<i class="material-icons" style="font-size:16px; vertical-align:middle;">lock_open</i> Desbloquear'
                   + '</button></td>'
                   + '</tr>';
        });
        $('#tbody-bloqueados').html(filas);
        $('#card-bloqueados').show();
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) console.warn('No se pudo cargar usuarios bloqueados');
    });
}

function desbloquear(id, login) {
    swal({
        title:              '¿Desbloquear usuario?',
        text:               'Se desbloqueará la cuenta de "' + login + '" y se registrará en la auditoría.',
        type:               'warning',
        showCancelButton:   true,
        confirmButtonColor: '#16a085',
        confirmButtonText:  'Sí, desbloquear',
        cancelButtonText:   'Cancelar'
    }, function() {
        $.ajax({
            url:    getUrl() + 'users/' + id + '/desbloquear',
            method: 'POST'
        })
        .done(function(r) {
            swal('Listo', r.mensaje, 'success');
            cargarBloqueados();
            listar();
        })
        .fail(function(xhr) {
            var msg = (xhr.responseJSON && xhr.responseJSON.error) ? xhr.responseJSON.error : 'No se pudo desbloquear el usuario';
            swal('Error', msg, 'error');
        });
    });
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

