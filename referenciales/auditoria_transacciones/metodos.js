var tablaIniciada = false;
var auditData     = [];   // almacena filas para el modal (evita incrustar JSON en onclick)

cargarTablas();
listar();

function cargarTablas() {
    $.ajax({
        url:    getUrl() + 'auditoria/tablas',
        method: 'GET'
    })
    .done(function(data) {
        var opts = '<option value="">— Todas las tablas —</option>';
        data.forEach(function(t) {
            opts += '<option value="' + t + '">' + t + '</option>';
        });
        $('#filtro_tabla').html(opts);
    });
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
            desde:        $('#filtro_desde').val(),
            hasta:        $('#filtro_hasta').val()
        }
    })
    .done(function(data) {
        renderResumen(data);
        renderTabla(data);
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudieron cargar los registros de auditoría.', 'error');
    });
}

function renderResumen(data) {
    var conteos = { INSERT: 0, UPDATE: 0, DELETE: 0 };
    data.forEach(function(r) {
        if (conteos[r.operacion] !== undefined) conteos[r.operacion]++;
    });

    $('#resumen').html(
        tarjeta('add_circle',    'INSERT',  conteos.INSERT,  '#27ae60') +
        tarjeta('edit',          'UPDATE',  conteos.UPDATE,  '#2980b9') +
        tarjeta('delete_forever','DELETE',  conteos.DELETE,  '#c0392b') +
        tarjeta('list',          'Total',   data.length,     '#7f8c8d')
    );
}

function renderTabla(data) {
    auditData = data;   // guardar referencia global para el modal
    var filas = '';

    data.forEach(function(r, i) {
        var badgeClass = 'badge-' + r.operacion.toLowerCase();
        var fecha      = r.fecha_hora ? r.fecha_hora.replace('T', ' ').substring(0, 19) : '—';

        var btnDetalle = '<button class="btn btn-default btn-xs btn-detalle waves-effect" '
                       + 'onclick="verDetalle(' + i + ');">'
                       + '<i class="material-icons" style="font-size:14px;vertical-align:middle;">visibility</i>'
                       + '</button>';

        filas += '<tr>'
               + '<td>' + (i + 1) + '</td>'
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
        order: [],
        columnDefs: [{ orderable: false, targets: 6 }],
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

    $('#modalTitulo').text(r.operacion + ' — ' + r.tabla_nombre + ' #' + r.registro_id);

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
