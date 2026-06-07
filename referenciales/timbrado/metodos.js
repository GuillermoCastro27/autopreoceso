var timbradoData = [];

cargarSelectores();
listar();

function cargarSelectores() {
    // Tipo de comprobante
    $.get(getUrl() + 'tipo-comprobante/read', function(data) {
        var opts = '<option value="">-- Tipo de Comprobante --</option>';
        data.forEach(function(r) {
            opts += '<option value="' + r.id + '">' + r.tip_comp_nombre + ' (' + r.tip_comp_abrev + ')</option>';
        });
        $('#tipo_comprobante_id').html(opts);
    });

    // Empresa
    $.get(getUrl() + 'empresa/read', function(data) {
        var opts = '<option value="">-- Empresa --</option>';
        data.forEach(function(r) {
            opts += '<option value="' + r.id + '">' + r.emp_razon_social + '</option>';
        });
        $('#empresa_id').html(opts);
    });

    // Sucursal
    $.get(getUrl() + 'sucursal/read', function(data) {
        var opts = '<option value="">-- Sucursal --</option>';
        data.forEach(function(r) {
            opts += '<option value="' + r.id + '">' + r.suc_razon_social + '</option>';
        });
        $('#sucursal_id').html(opts);
    });
}

function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Timbrados' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Timbrados' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Timbrados' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Timbrados' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de _MAX_)',
            sZeroRecords: 'No se encontraron registros',
            sInfoEmpty: 'Mostrando 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar() { location.reload(true); }

var CAMPOS = ['#tim_numero', '#tim_establecimiento', '#tim_punto_expedicion',
              '#tipo_comprobante_id', '#empresa_id', '#sucursal_id',
              '#tim_fecha_inicio', '#tim_fecha_fin', '#tim_nro_desde', '#tim_nro_hasta'];

function habilitar(incluirEstado) {
    CAMPOS.forEach(function(c) { $(c).removeAttr('disabled'); });
    if (incluirEstado) $('#tim_estado').removeAttr('disabled');
}

function deshabilitar() {
    CAMPOS.forEach(function(c) { $(c).attr('disabled', true); });
    $('#tim_estado').attr('disabled', true);
    $('#tim_nro_actual').attr('disabled', true);
}

function agregar() {
    limpiarCampos();
    $('#txtOperacion').val(1);
    habilitar(false);
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function editar() {
    $('#txtOperacion').val(2);
    habilitar(true);
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function eliminar() {
    $('#txtOperacion').val(3);
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
}

function confirmarOperacion() {
    var oper = parseInt($('#txtOperacion').val());
    var titulo   = oper === 2 ? 'MODIFICAR' : (oper === 3 ? 'ELIMINAR' : 'AGREGAR');
    var pregunta = oper === 2 ? '¿Desea guardar los cambios?' : (oper === 3 ? '¿Desea eliminar el timbrado?' : '¿Desea registrar el nuevo timbrado?');
    swal({ title: titulo, text: pregunta, type: 'warning', showCancelButton: true,
           confirmButtonColor: '#458E49', confirmButtonText: 'SI', cancelButtonText: 'NO',
           closeOnConfirm: false
    }, function() { grabar(); });
}

function limpiarCampos() {
    $('#txtCodigo').val(0);
    $('#tim_numero, #tim_establecimiento, #tim_punto_expedicion').val('');
    $('#tim_fecha_inicio, #tim_fecha_fin, #tim_nro_desde, #tim_nro_hasta, #tim_nro_actual').val('');
    $('#tipo_comprobante_id, #empresa_id, #sucursal_id').val('');
    $('#tim_estado').val('activo');
}

function listar() {
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().destroy();
    }

    $.get(getUrl() + 'timbrado/read', function(data) {
        timbradoData = data;
        var filas = '';
        data.forEach(function(r, i) {
            var badgeColor = r.tim_estado === 'activo'    ? '#27ae60' :
                             r.tim_estado === 'agotado'   ? '#e67e22' :
                             r.tim_estado === 'vencido'   ? '#7f8c8d' : '#c0392b';
            var badge = '<span style="background:' + badgeColor + ';color:#fff;padding:2px 8px;border-radius:10px;font-size:11px;">' +
                        r.tim_estado.toUpperCase() + '</span>';
            var vigencia = (r.tim_fecha_inicio ? r.tim_fecha_inicio.substring(0,10) : '—') +
                           ' → ' + (r.tim_fecha_fin ? r.tim_fecha_fin.substring(0,10) : '—');
            var rango = r.tim_nro_desde + ' – ' + r.tim_nro_hasta;

            filas += '<tr class="item-list" onclick="seleccionar(' + i + ')">' +
                     '<td>' + r.id + '</td>' +
                     '<td><strong>' + r.tim_numero + '</strong></td>' +
                     '<td>' + (r.tim_establecimiento || '001') + '</td>' +
                     '<td>' + (r.tim_punto_expedicion || '001') + '</td>' +
                     '<td>' + (r.tip_comp_nombre || '—') + '</td>' +
                     '<td>' + (r.emp_razon_social || '—') + '</td>' +
                     '<td>' + (r.suc_razon_social || '—') + '</td>' +
                     '<td><small>' + vigencia + '</small></td>' +
                     '<td>' + rango + '</td>' +
                     '<td>' + r.tim_nro_actual + '</td>' +
                     '<td>' + badge + '</td>' +
                     '</tr>';
        });
        $('#tableBody').html(filas);
        formatoTabla();
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar la lista de timbrados.', 'error');
    });
}

function seleccionar(index) {
    var r = timbradoData[index];
    if (!r) return;

    $('#txtCodigo').val(r.id);
    $('#tim_numero').val(r.tim_numero);
    $('#tim_establecimiento').val(r.tim_establecimiento || '001');
    $('#tim_punto_expedicion').val(r.tim_punto_expedicion || '001');
    $('#tim_fecha_inicio').val(r.tim_fecha_inicio ? r.tim_fecha_inicio.substring(0,10) : '');
    $('#tim_fecha_fin').val(r.tim_fecha_fin ? r.tim_fecha_fin.substring(0,10) : '');
    $('#tim_nro_desde').val(r.tim_nro_desde);
    $('#tim_nro_hasta').val(r.tim_nro_hasta);
    $('#tim_nro_actual').val(r.tim_nro_actual);
    $('#tim_estado').val(r.tim_estado);
    $('#tipo_comprobante_id').val(r.tipo_comprobante_id);
    $('#empresa_id').val(r.empresa_id);
    $('#sucursal_id').val(r.sucursal_id);

    deshabilitar();
    $('#btnAgregar, #btnGrabar, #btnCancelar').attr('disabled', true);
    $('#btnEditar, #btnEliminar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function grabar() {
    var oper = parseInt($('#txtOperacion').val());

    if (oper !== 3) {
        var numero   = $('#tim_numero').val().trim();
        var tcId     = $('#tipo_comprobante_id').val();
        var empId    = $('#empresa_id').val();
        var sucId    = $('#sucursal_id').val();
        var fInicio  = $('#tim_fecha_inicio').val();
        var fFin     = $('#tim_fecha_fin').val();
        var nDesde   = parseInt($('#tim_nro_desde').val());
        var nHasta   = parseInt($('#tim_nro_hasta').val());

        if (!numero)  { swal('Error', 'El número de timbrado es obligatorio.', 'error'); return; }
        if (!tcId)    { swal('Error', 'Seleccione el tipo de comprobante.', 'error'); return; }
        if (!empId)   { swal('Error', 'Seleccione la empresa.', 'error'); return; }
        if (!sucId)   { swal('Error', 'Seleccione la sucursal.', 'error'); return; }
        if (!fInicio) { swal('Error', 'Ingrese la fecha de inicio de vigencia.', 'error'); return; }
        if (!fFin)    { swal('Error', 'Ingrese la fecha de fin de vigencia.', 'error'); return; }
        if (fFin < fInicio) { swal('Error', 'La fecha de fin debe ser posterior a la de inicio.', 'error'); return; }
        if (!nDesde || nDesde < 1)    { swal('Error', 'El número desde debe ser mayor a 0.', 'error'); return; }
        if (!nHasta || nHasta <= nDesde) { swal('Error', 'El número hasta debe ser mayor al número desde.', 'error'); return; }
    }

    var url = getUrl() + (oper === 1 ? 'timbrado/create' :
                          oper === 2 ? 'timbrado/update/' + $('#txtCodigo').val() :
                                       'timbrado/delete/' + $('#txtCodigo').val());
    var method = oper === 1 ? 'POST' : (oper === 2 ? 'PUT' : 'DELETE');

    $.ajax({
        url: url, method: method,
        data: {
            tim_numero:           $('#tim_numero').val().trim(),
            tim_establecimiento:  $('#tim_establecimiento').val().trim(),
            tim_punto_expedicion: $('#tim_punto_expedicion').val().trim(),
            tim_fecha_inicio:     $('#tim_fecha_inicio').val(),
            tim_fecha_fin:        $('#tim_fecha_fin').val(),
            tim_nro_desde:        $('#tim_nro_desde').val(),
            tim_nro_hasta:        $('#tim_nro_hasta').val(),
            tim_estado:           $('#tim_estado').val(),
            tipo_comprobante_id:  $('#tipo_comprobante_id').val(),
            empresa_id:           $('#empresa_id').val(),
            sucursal_id:          $('#sucursal_id').val(),
        }
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
            if (res.tipo === 'success') location.reload(true);
        });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) $.each(res.errors, function(k, v){ msg += (Array.isArray(v) ? v[0] : v) + '\n'; });
            else msg = res && res.message ? res.message : 'Verifique los campos.';
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 409) {
            swal('No se puede eliminar', res && res.mensaje ? res.mensaje : 'El timbrado tiene comprobantes asociados.', 'error');
        } else {
            swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
        }
    });
}
