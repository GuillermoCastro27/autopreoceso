// ─── AUTH ────────────────────────────────────────────────────────────────────
function getToken() {
    var s = JSON.parse(localStorage.getItem('datosSesion'));
    return s ? s.token : '';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
listar();
campoFecha();

// ─── HELPERS ─────────────────────────────────────────────────────────────────
var _timers = {};
function _debounce(key, fn, delay) {
    clearTimeout(_timers[key]);
    _timers[key] = setTimeout(fn, delay || 300);
}

function formatearNumero(n) {
    if (isNaN(n)) return '0,00';
    return Number(n).toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function badgeEstado(estado) {
    var mapa = { PENDIENTE: 'warning', CONFIRMADO: 'success', ANULADO: 'danger' };
    return '<span class="label label-' + (mapa[estado] || 'default') + '">' + estado + '</span>';
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var msg = '';
    if (res && res.errors) {
        msg = $.map(res.errors, function(v) { return '• ' + (Array.isArray(v) ? v[0] : v); }).join('\n');
    } else if (res && res.mensaje) {
        msg = res.mensaje;
    } else {
        msg = 'Ocurrió un error inesperado.';
    }
    swal({ title: xhr.status === 422 ? 'Datos inválidos' : 'Error', text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
}

function formatoTabla() {
    if ($.fn.dataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().destroy();
    }
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Insumos Utilizados' },
            { extend: 'excel', text: 'EXCEL',     className: 'btn btn-success waves-effect',   title: 'Insumos Utilizados' },
            { extend: 'pdf',   text: 'PDF',       className: 'btn btn-danger waves-effect',    title: 'Insumos Utilizados' },
            { extend: 'print', text: 'IMPRIMIR',  className: 'btn btn-warning waves-effect',   title: 'Insumos Utilizados' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando del _START_ al _END_ de _TOTAL_ registros',
            sZeroRecords: 'Sin resultados',
            sInfoEmpty: 'Sin registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function campoFecha() {
    $('.datetimepicker-date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        time: false,
        clearButton: true,
        weekStart: 1
    });
}

// ─── LISTAR ──────────────────────────────────────────────────────────────────
function listar() {
    $.ajax({
        url: getUrl() + 'insumos-cab/read',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(data) {
        var lista = '';
        data.forEach(function(rs) {
            var info = JSON.stringify({
                id:                     rs.id,
                orden_serv_cab_id:      rs.orden_serv_cab_id,
                ins_cab_fecha_registro: rs.ins_cab_fecha_registro || '',
                ins_cab_estado:         rs.ins_cab_estado || '',
                empresa_id:             rs.empresa_id,
                emp_razon_social:       rs.emp_razon_social || '',
                sucursal_id:            rs.sucursal_id,
                suc_razon_social:       rs.suc_razon_social || '',
                clientes_id:            rs.clientes_id,
                cli_nombre:             rs.cli_nombre || '',
                cli_apellido:           rs.cli_apellido || '',
                ord_serv_fecha:         rs.ord_serv_fecha || '',
                equipo_nombre:          rs.equipo_nombre || '',
                marc_nom:               rs.marc_nom || '',
                modelo_nom:             rs.modelo_nom || '',
                recep_cab_num_chasis:   rs.recep_cab_num_chasis || ''
            }).replace(/'/g, "&#39;");

            lista += '<tr class="insumo-row" style="cursor:pointer;" data-info=\'' + info + '\'>';
            lista += '<td>' + rs.id + '</td>';
            lista += '<td>' + String(rs.orden_serv_cab_id).padStart(7, '0') + '</td>';
            lista += '<td>' + (rs.ord_serv_fecha || '') + '</td>';
            lista += '<td>' + (rs.ins_cab_fecha_registro || '') + '</td>';
            lista += '<td>' + (rs.cli_nombre || '') + ' ' + (rs.cli_apellido || '') + '</td>';
            lista += '<td>' + (rs.equipo_nombre || '') + '</td>';
            lista += '<td>' + (rs.marc_nom || '') + ' ' + (rs.modelo_nom || '') + '</td>';
            lista += '<td>' + (rs.emp_razon_social || '') + '</td>';
            lista += '<td>' + badgeEstado(rs.ins_cab_estado || '') + '</td>';
            lista += '</tr>';
        });
        $('#tableBody').html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on('click', '.insumo-row', function() {
    var d = $(this).data('info');
    if (!d) return;
    seleccionCab(d);
});

// ─── SELECCIÓN ───────────────────────────────────────────────────────────────
function seleccionCab(d) {
    var estado = (d.ins_cab_estado || '').trim().toUpperCase();

    $('#ins_cab_id').val(d.id);
    $('#ins_cab_id_display').val(d.id);
    $('#ins_cab_estado').val(estado);
    $('#orden_serv_cab_id').val(d.orden_serv_cab_id);
    $('#empresa_id').val(d.empresa_id);
    $('#sucursal_id').val(d.sucursal_id);
    $('#clientes_id').val(d.clientes_id);

    $('#buscar_os').val('OS Nº ' + String(d.orden_serv_cab_id).padStart(7, '0'));
    $('#ord_serv_fecha').val(d.ord_serv_fecha);
    $('#ins_cab_fecha_registro').val(d.ins_cab_fecha_registro);
    $('#emp_razon_social').val(d.emp_razon_social);
    $('#suc_razon_social').val(d.suc_razon_social);
    $('#ord_cliente').val((d.cli_nombre || '') + ' ' + (d.cli_apellido || ''));
    $('#ord_equipo').val(d.equipo_nombre);
    $('#ord_marca').val(d.marc_nom);
    $('#ord_modelo').val(d.modelo_nom);
    $('#ord_num_chasis').val(d.recep_cab_num_chasis);

    $('#cardRegistros').hide();
    $('#cardDetalle').show();
    $('#formDetalle').hide();
    listarDetalle();

    $('#btnAgregar, #btnGrabar').prop('disabled', true);
    $('#btnCancelar').prop('disabled', false);
    $('#btnEditar, #btnAnular').prop('disabled', false);
    $('#btnConfirmar').prop('disabled', estado !== 'PENDIENTE');

    if (estado === 'PENDIENTE') {
        $('#formDetalle').show();
        mostrarBotonesDet('normal');
    }

    $(".form-line").addClass("focused");
}

// ─── OPERACIONES CABECERA ────────────────────────────────────────────────────
function agregar() {
    $('#txtOperacion').val(1);
    $('#ins_cab_id').val('');
    $('#ins_cab_id_display').val('');
    $('#ins_cab_estado').val('PENDIENTE');
    $('#orden_serv_cab_id, #empresa_id, #sucursal_id, #clientes_id').val('');
    $('#emp_razon_social, #suc_razon_social').val('');
    $('#ord_serv_fecha').val('');
    $('#ord_cliente, #ord_equipo, #ord_marca, #ord_modelo, #ord_num_chasis').val('');
    $('#buscar_os').val('').prop('disabled', false);
    $('#ins_cab_fecha_registro').val('').prop('disabled', false);

    $('#btnAgregar, #btnEditar, #btnAnular, #btnConfirmar').prop('disabled', true);
    $('#btnGrabar, #btnCancelar').prop('disabled', false);
    $('#cardDetalle').hide();
    $('#cardRegistros').hide();
    $(".form-line").addClass("focused");
}

function editar() {
    var estado = $('#ins_cab_estado').val();
    if (estado !== 'PENDIENTE') {
        swal('Aviso', 'Solo se puede modificar un registro en estado PENDIENTE.', 'warning');
        return;
    }
    $('#txtOperacion').val(2);
    $('#ins_cab_fecha_registro').prop('disabled', false);
    $('#btnAgregar, #btnEditar, #btnAnular, #btnConfirmar').prop('disabled', true);
    $('#btnGrabar, #btnCancelar').prop('disabled', false);
    $(".form-line").addClass("focused");
}

function anular() {
    swal({
        title: 'ANULAR', text: '¿Desea anular este registro de insumos?', type: 'warning',
        showCancelButton: true, confirmButtonColor: '#e74c3c',
        confirmButtonText: 'SI', cancelButtonText: 'NO', closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + 'insumos-cab/anular/' + $('#ins_cab_id').val(),
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + getToken() }
        })
        .done(function(res) {
            swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
                if (res.tipo === 'success') location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function confirmarCab() {
    swal({
        title: 'CONFIRMAR', text: '¿Desea confirmar el registro de insumos?', type: 'warning',
        showCancelButton: true, confirmButtonColor: '#458E49',
        confirmButtonText: 'SI', cancelButtonText: 'NO', closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + 'insumos-cab/confirmar/' + $('#ins_cab_id').val(),
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + getToken() }
        })
        .done(function(res) {
            swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
                if (res.tipo === 'success') location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function cancelar() { location.reload(true); }

function confirmarOperacion() {
    var oper = parseInt($('#txtOperacion').val());
    if (oper === 1) {
        var errores = [];
        if (!$('#orden_serv_cab_id').val()) errores.push('Debe seleccionar una Orden de Servicio.');
        if (!$('#ins_cab_fecha_registro').val()) errores.push('La fecha de registro es obligatoria.');
        if (errores.length) {
            swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• ' + e; }).join('\n'), type: 'warning' });
            return;
        }
    }

    swal({
        title: oper === 1 ? 'AGREGAR' : 'MODIFICAR',
        text:  oper === 1 ? '¿Desea grabar el nuevo registro?' : '¿Desea modificar el registro?',
        type: 'warning', showCancelButton: true, confirmButtonColor: '#458E49',
        confirmButtonText: 'SI', cancelButtonText: 'NO', closeOnConfirm: false
    }, function() { grabar(); });
}

function grabar() {
    var oper   = parseInt($('#txtOperacion').val());
    var url    = getUrl() + (oper === 1 ? 'insumos-cab/create' : 'insumos-cab/update/' + $('#ins_cab_id').val());
    var metodo = oper === 1 ? 'POST' : 'PUT';

    $.ajax({
        url: url, method: metodo,
        headers: { Authorization: 'Bearer ' + getToken() },
        data: {
            orden_serv_cab_id:      $('#orden_serv_cab_id').val(),
            ins_cab_fecha_registro: $('#ins_cab_fecha_registro').val()
        }
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
            if (res.tipo === 'success') {
                if (res.registro && res.registro.id) {
                    $('#ins_cab_id').val(res.registro.id);
                    $('#ins_cab_id_display').val(res.registro.id);
                    $('#ins_cab_estado').val('PENDIENTE');
                }
                $('#buscar_os, #ins_cab_fecha_registro').prop('disabled', true);
                $('#cardDetalle').show();
                $('#cardRegistros').hide();
                $('#formDetalle').show();
                mostrarBotonesDet('normal');
                $('#btnEditar, #btnAnular').prop('disabled', false);
                $('#btnConfirmar').prop('disabled', false);
                $('#btnAgregar, #btnGrabar').prop('disabled', true);
                $('#btnCancelar').prop('disabled', false);
                listarDetalle();
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ─── BUSCAR OS ───────────────────────────────────────────────────────────────
function buscarOS() {
    var q = $.trim($('#buscar_os').val());
    if (!q) { $('#listaOS').html('').hide(); return; }
    _debounce('os', function() {
        $.ajax({
            url: getUrl() + 'insumos-cab/buscar-os',
            method: 'GET',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { q: q }
        })
        .done(function(data) {
            var lista = "<ul class='list-group'>";
            if (!data.length) lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
            data.forEach(function(rs) {
                var info = JSON.stringify({
                    id:               rs.id,
                    nro_os:           rs.nro_os || '',
                    ord_serv_fecha:   rs.ord_serv_fecha || '',
                    empresa_id:       rs.empresa_id,
                    emp_razon_social: rs.emp_razon_social || '',
                    sucursal_id:      rs.sucursal_id,
                    suc_razon_social: rs.suc_razon_social || '',
                    clientes_id:      rs.clientes_id,
                    cli_nombre:       rs.cli_nombre || '',
                    cli_apellido:     rs.cli_apellido || '',
                    equipo_nombre:    rs.equipo_nombre || '',
                    marc_nom:             rs.marc_nom || '',
                    modelo_nom:           rs.modelo_nom || '',
                    recep_cab_num_chasis: rs.recep_cab_num_chasis || ''
                }).replace(/'/g, "&#39;");
                lista += "<li class='list-group-item lista-os-item' style='cursor:pointer;' data-info='" + info + "'>"
                    + 'OS Nº ' + (rs.nro_os || '') + ' — ' + (rs.cli_nombre || '') + ' ' + (rs.cli_apellido || '')
                    + ' <small class="text-muted">(' + (rs.marc_nom || '') + ' ' + (rs.modelo_nom || '') + ')</small>'
                    + "</li>";
            });
            lista += "</ul>";
            $('#listaOS').html(lista).css({ display: 'block', position: 'absolute', zIndex: 2000 });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

$(document).on('click', '.lista-os-item', function() {
    var d = $(this).data('info');
    if (!d) return;
    $('#orden_serv_cab_id').val(d.id);
    $('#buscar_os').val('OS Nº ' + d.nro_os).prop('disabled', true);
    $('#ord_serv_fecha').val(d.ord_serv_fecha);
    $('#empresa_id').val(d.empresa_id);
    $('#emp_razon_social').val(d.emp_razon_social);
    $('#sucursal_id').val(d.sucursal_id);
    $('#suc_razon_social').val(d.suc_razon_social);
    $('#clientes_id').val(d.clientes_id);
    $('#ord_cliente').val((d.cli_nombre || '') + ' ' + (d.cli_apellido || ''));
    $('#ord_equipo').val(d.equipo_nombre);
    $('#ord_marca').val(d.marc_nom);
    $('#ord_modelo').val(d.modelo_nom);
    $('#ord_num_chasis').val(d.recep_cab_num_chasis);
    $('#listaOS').html('').hide();
    $(".form-line").addClass("focused");
});

// ─── DETALLE — BOTONES ───────────────────────────────────────────────────────
function mostrarBotonesDet(modo) {
    if (modo === 'grabar') {
        $('#btnAgregarDet, #btnEditarDet, #btnEliminarDet').hide();
        $('#btnGrabarDet, #btnCancelarDet').show();
    } else {
        $('#btnAgregarDet, #btnEditarDet, #btnEliminarDet').show();
        $('#btnGrabarDet, #btnCancelarDet').hide();
    }
}

function agregarDet() {
    cancelarDet();
    $('#txtOperacionDet').val(1);
    $('#buscar_item').removeAttr('disabled');
    $('#ins_det_cantidad, #ins_det_costo').removeAttr('disabled');
    mostrarBotonesDet('grabar');
}

function editarDet() {
    $('#txtOperacionDet').val(2);
    $('#buscar_item').removeAttr('disabled');
    $('#ins_det_cantidad, #ins_det_costo').removeAttr('disabled');
    if (typeof mmCargarMarcas === 'function') {
        mmCargarMarcas($('#item_id').val(), _mmMarcaId || null);
    } else {
        $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    }
    mostrarBotonesDet('grabar');
}

function eliminarDet() {
    var id = $('#det_id').val();
    if (!id) { swal('Aviso', 'Seleccione un ítem de la tabla.', 'warning'); return; }
    swal({
        title: 'ELIMINAR', text: '¿Desea eliminar este ítem?', type: 'warning',
        showCancelButton: true, confirmButtonColor: '#e74c3c',
        confirmButtonText: 'SI', cancelButtonText: 'NO', closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + 'insumos-det/delete/' + id,
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + getToken() }
        })
        .done(function(res) {
            swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
                if (res.tipo === 'success') { listarDetalle(); cancelarDet(); }
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function cancelarDet() {
    if (typeof mmLimpiar === 'function') mmLimpiar();
    $('#txtOperacionDet').val(0);
    $('#det_id').val('');
    $('#item_id').val('');
    $('#item_id_display').val('');
    $('#buscar_item').val('').prop('disabled', true);
    $('#tipo_impuesto_id').val('');
    $('#tip_imp_nom').val('').prop('disabled', true);
    $('#ins_det_cantidad').val('').prop('disabled', true);
    $('#ins_det_costo').val('').prop('disabled', true);
    $('#listaItems').html('').hide();
    mostrarBotonesDet('normal');
}

function grabarDet() {
    var oper     = parseInt($('#txtOperacionDet').val());
    var itemId   = $('#item_id').val();
    var cantidad = parseFloat($('#ins_det_cantidad').val());
    var costo    = parseFloat($('#ins_det_costo').val());

    var errores = [];
    if (!itemId)                          errores.push('Seleccione un ítem.');
    if (isNaN(cantidad) || cantidad <= 0) errores.push('La cantidad debe ser mayor a 0.');
    if (isNaN(costo)    || costo < 0)    errores.push('El costo no puede ser negativo.');
    if (!$('#tipo_impuesto_id').val())    errores.push('El ítem debe tener tipo de impuesto.');

    if (errores.length) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• ' + e; }).join('\n'), type: 'warning' });
        return;
    }

    var url    = getUrl() + (oper === 2 ? 'insumos-det/update/' + $('#det_id').val() : 'insumos-det/create');
    var metodo = oper === 2 ? 'PUT' : 'POST';

    $.ajax({
        url: url, method: metodo,
        headers: { Authorization: 'Bearer ' + getToken() },
        data: {
            insumos_cab_id:   $('#ins_cab_id').val(),
            item_id:          itemId,
            tipo_impuesto_id: $('#tipo_impuesto_id').val(),
            ins_det_cantidad: cantidad,
            ins_det_costo:    costo,
            marca_id:  (typeof _mmMarcaId  !== 'undefined' && _mmMarcaId)  ? parseInt(_mmMarcaId)  : null,
            modelo_id: (typeof _mmModeloId !== 'undefined' && _mmModeloId) ? parseInt(_mmModeloId) : null
        }
    })
    .done(function(res) {
        if (res.tipo === 'success') { listarDetalle(); cancelarDet(); }
        else swal('Error', res.mensaje, 'error');
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ─── DETALLE — LISTAR ────────────────────────────────────────────────────────
function listarDetalle() {
    var cabId = $('#ins_cab_id').val();
    if (!cabId) return;

    $.ajax({
        url: getUrl() + 'insumos-det/read/' + cabId,
        method: 'GET',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(data) {
        var lista = '';
        var total = 0;
        data.forEach(function(rs) {
            var subtotal = parseFloat(rs.subtotal) || 0;
            total += subtotal;

            var det = JSON.stringify({
                id:              rs.id,
                item_id:         rs.item_id,
                item_decripcion: rs.item_decripcion || '',
                tipo_impuesto_id:rs.tipo_impuesto_id,
                tip_imp_nom:     rs.tip_imp_nom || '',
                ins_det_cantidad:rs.ins_det_cantidad,
                ins_det_costo:   rs.ins_det_costo,
                marca_id:        rs.marca_id  || 0,
                modelo_id:       rs.modelo_id || 0
            }).replace(/'/g, "&#39;");

            lista += '<tr class="det-row" style="cursor:pointer;" data-det=\'' + det + '\'>';
            lista += '<td>' + rs.item_id + '</td>';
            lista += '<td>' + (rs.item_decripcion || '') + '</td>';
            lista += '<td>' + (rs.marc_nom || '-') + '</td>';
            lista += '<td>' + (rs.modelo_nom || '-') + '</td>';
            lista += '<td>' + (rs.tip_imp_nom || '-') + '</td>';
            lista += '<td class="text-right">' + formatearNumero(rs.ins_det_cantidad) + '</td>';
            lista += '<td class="text-right">' + formatearNumero(rs.ins_det_costo) + '</td>';
            lista += '<td class="text-right">' + formatearNumero(subtotal) + '</td>';
            lista += '</tr>';
        });
        if (!lista) lista = '<tr><td colspan="8" class="text-center text-muted">Sin ítems registrados</td></tr>';
        $('#tableDetalle').html(lista);
        $('#txtTotalDet').text(formatearNumero(total));

        var estado = $('#ins_cab_estado').val();
        $('#btnConfirmar').prop('disabled', !(estado === 'PENDIENTE' && data.length > 0));
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on('click', '.det-row', function() {
    var d = $(this).data('det');
    if (!d) return;
    var estado = $('#ins_cab_estado').val();
    if (estado === 'CONFIRMADO' || estado === 'ANULADO') return;

    $('#det_id').val(d.id);
    $('#item_id').val(d.item_id);
    $('#item_id_display').val(d.item_id);
    $('#buscar_item').val(d.item_decripcion);
    $('#tipo_impuesto_id').val(d.tipo_impuesto_id);
    $('#tip_imp_nom').val(d.tip_imp_nom);
    $('#ins_det_cantidad').val(d.ins_det_cantidad);
    $('#ins_det_costo').val(d.ins_det_costo);
    if (typeof mmAutocompletar === 'function') mmAutocompletar(d.item_id, d.marca_id, d.modelo_id);
    $(".form-line").addClass("focused");
});

// ─── BUSCAR ÍTEM ─────────────────────────────────────────────────────────────
function buscarItem() {
    var q = $.trim($('#buscar_item').val());
    if (q.length < 2) { $('#listaItems').html('').hide(); return; }
    _debounce('item', function() {
        $.ajax({
            url: getUrl() + 'items/buscar',
            method: 'POST',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { item_decripcion: q }
        })
        .done(function(data) {
            var lista = "<ul class='list-group'>";
            data.forEach(function(rs) {
                var info = JSON.stringify({
                    item_id:          rs.item_id,
                    item_decripcion:  rs.item_decripcion  || '',
                    tipo_impuesto_id: rs.tipo_impuesto_id || null,
                    tip_imp_nom:      rs.tip_imp_nom       || '',
                    item_costo:       rs.item_costo        || 0
                }).replace(/'/g, "&#39;");
                lista += "<li class='list-group-item lista-item-ins' style='cursor:pointer;' data-info='" + info + "'>"
                    + rs.item_decripcion + "</li>";
            });
            lista += "</ul>";
            $('#listaItems').html(lista).css({ display: 'block', position: 'absolute', zIndex: 2000 });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

$(document).on('click', '.lista-item-ins', function() {
    var d = $(this).data('info');
    if (!d) return;
    $('#item_id').val(d.item_id);
    $('#item_id_display').val(d.item_id);
    $('#buscar_item').val(d.item_decripcion);
    $('#tipo_impuesto_id').val(d.tipo_impuesto_id);
    $('#tip_imp_nom').val(d.tip_imp_nom).prop('disabled', true);
    if (!$('#ins_det_costo').val()) $('#ins_det_costo').val(d.item_costo);
    if (typeof mmCargarMarcas === 'function') mmCargarMarcas(d.item_id, null);
    $('#listaItems').html('').hide();
    $(".form-line").addClass("focused");
});
