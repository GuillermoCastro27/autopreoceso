// ─── AUTH ─────────────────────────────────────────────────────────────────────
function getToken() {
    var s = JSON.parse(localStorage.getItem('datosSesion'));
    return s ? s.token : '';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
cargarFuncionarioIdLogueado();
listar();
campoFecha();

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function formatoTabla() {
    if ($.fn.dataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().destroy();
    }
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect', title:'Notas de Venta' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',  title:'Notas de Venta' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',   title:'Notas de Venta' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',  title:'Notas de Venta' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';
    if (res && res.errors) {
        var lineas = [];
        $.each(res.errors, function(k, v) { lineas.push('• ' + (Array.isArray(v) ? v[0] : v)); });
        msg = lineas.join('\n');
    } else if (res && res.mensaje) {
        msg = res.mensaje;
    } else {
        msg = 'Ocurrió un error inesperado.';
    }
    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
}

function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function badgeEstado(estado) {
    var mapa = { PENDIENTE: 'warning', CONFIRMADO: 'success', ANULADO: 'danger' };
    var cls  = mapa[estado] || 'default';
    return '<span class="label label-' + cls + '">' + estado + '</span>';
}

var _timers = {};
function _debounce(key, fn, delay) {
    clearTimeout(_timers[key]);
    _timers[key] = setTimeout(fn, delay || 300);
}

// ─── OPERACIONES CABECERA ─────────────────────────────────────────────────────
function cancelar() { location.reload(true); }

function setAfectaStock(valor) {
    $('#nota_vent_afecta_stock').val(valor ? '1' : '0');
    if (valor) {
        $('#btnAfectaSi').addClass('active btn-success').removeClass('btn-default');
        $('#btnAfectaNo').removeClass('active btn-danger').addClass('btn-default');
    } else {
        $('#btnAfectaNo').addClass('active btn-danger').removeClass('btn-default');
        $('#btnAfectaSi').removeClass('active btn-success').addClass('btn-default');
    }
}

function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);

    // Limpiar todos los campos del formulario
    $("#empresa_id, #sucursal_id").val("");
    $("#emp_razon_social").val("");
    $("#suc_razon_social").val("");
    $("#ventas_cab_id").val(0);
    $("#venta").val("");
    $("#clientes_id").val("");
    $("#cli_nombre, #cli_apellido, #cli_ruc, #cli_direccion, #cli_telefono, #cli_correo").val("");
    $("#nota_vene_condicion_pago, #vencimiento, #cuotas").val("");
    $("#nota_vent_fecha, #nota_vent_observaciones").val("");
    $("#nota_vent_tipo").val("");
    $("#timbrado_id, #nota_vent_nro_comprobante").val("");
    $("#tim_numero_display").val("(seleccionar sucursal y tipo)");
    $("#tim_vence_display").val("—");
    setAfectaStock(true);

    $("#nota_vent_fecha").prop("readonly", false);
    $("#nota_vent_tipo").prop("disabled", false);
    $("#nota_vent_observaciones").prop("disabled", false);
    $('#btnAfectaSi, #btnAfectaNo').prop('disabled', false);
    $("#venta").prop("disabled", false);
    $("#suc_razon_social").prop("disabled", false); // el usuario elige su sucursal

    $("#emp_razon_social, #nota_vene_condicion_pago, #vencimiento, #cuotas").prop("disabled", true);
    $("#cli_nombre, #cli_apellido, #cli_ruc, #cli_direccion, #cli_telefono, #cli_correo").prop("disabled", true);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);

    $("#registros").hide();
    $(".form-line").addClass("focused");
}

function editar() {
    $("#txtOperacion").val(2);
    $("#nota_vent_fecha").prop("readonly", false);
    $("#nota_vene_condicion_pago").prop("disabled", false);
    $("#vencimiento").prop("disabled", false);
    $("#cuotas").prop("disabled", false);
    $("#nota_vent_tipo").prop("disabled", false);
    $("#nota_vent_observaciones").prop("disabled", false);
    $('#btnAfectaSi, #btnAfectaNo').prop('disabled', false);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
    $(".form-line").addClass("focused");
}

function eliminar() {
    $("#txtOperacion").val(3);
    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
}

function confirmar() {
    $("#txtOperacion").val(4);
    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulos   = { 1:'AGREGAR', 2:'EDITAR', 3:'ANULAR', 4:'CONFIRMAR' };
    var preguntas = {
        1:'¿DESEA GRABAR EL NUEVO REGISTRO?',
        2:'¿DESEA EDITAR EL REGISTRO SELECCIONADO?',
        3:'¿DESEA ANULAR EL REGISTRO SELECCIONADO?',
        4:'¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?'
    };
    swal({
        title: titulos[oper] || 'OPERACIÓN',
        text:  preguntas[oper] || '¿Confirmar?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#458E49',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        closeOnConfirm: false
    }, function() { grabar(); });
}

function grabar() {
    var oper = parseInt($("#txtOperacion").val());

    // Validaciones frontend (solo en crear/editar)
    if (oper === 1 || oper === 2) {
        var errores = [];
        if (!$.trim($("#nota_vent_fecha").val())) errores.push('La fecha es obligatoria.');
        if (!$.trim($("#nota_vent_observaciones").val())) errores.push('Las observaciones son obligatorias.');
        if (!$("#nota_vent_tipo").val()) errores.push('Seleccione el tipo de nota (Crédito/Débito).');
        if (!$("#ventas_cab_id").val() || $("#ventas_cab_id").val() == '0')
            errores.push('Debe seleccionar la venta relacionada.');
        if (errores.length > 0) {
            swal({ title:'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type:'warning' });
            return;
        }
    }

    var endpoint, metodo, estado;
    switch (oper) {
        case 2:  endpoint = 'notaventcab/update/'    + $("#id").val(); metodo = 'PUT';    estado = $("#nota_vent_estado").val(); break;
        case 3:  endpoint = 'notaventcab/anular/'    + $("#id").val(); metodo = 'PUT';    estado = 'ANULADO';    break;
        case 4:  endpoint = 'notaventcab/confirmar/' + $("#id").val(); metodo = 'PUT';    estado = 'CONFIRMADO'; break;
        default: endpoint = 'notaventcab/create';                      metodo = 'POST';   estado = 'PENDIENTE';
    }

    var condicionPago = $("#nota_vene_condicion_pago").val();
    var vencimiento   = (condicionPago === 'CONTADO' || !$.trim($("#vencimiento").val())) ? null : $("#vencimiento").val();
    var cuotas        = (condicionPago === 'CONTADO' || !$.trim($("#cuotas").val())) ? null : $("#cuotas").val();

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() },
        data: {
            id:                              $("#id").val(),
            ventas_cab_id:                   $("#ventas_cab_id").val(),
            clientes_id:                     $("#clientes_id").val(),
            empresa_id:                      $("#empresa_id").val(),
            sucursal_id:                     $("#sucursal_id").val(),
            funcionario_id:                  $("#funcionario_id").val(),
            nota_vent_fecha:                 $("#nota_vent_fecha").val(),
            nota_vent_intervalo_fecha_vence: vencimiento,
            nota_vent_cant_cuota:            cuotas,
            nota_vent_tipo:                  $("#nota_vent_tipo").val(),
            nota_vent_afecta_stock:          $("#nota_vent_afecta_stock").val(),
            nota_vent_observaciones:         $("#nota_vent_observaciones").val(),
            nota_vene_condicion_pago:        condicionPago,
            nota_vent_estado:                estado,
            timbrado_id:                     $("#timbrado_id").val() || null,
            nota_vent_nro_comprobante:       $("#nota_vent_nro_comprobante").val() || null,
            operacion:                       oper
        }
    })
    .done(function(resultado) {
        swal({ title:'Respuesta', text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === 'success') {
                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                }
                var estadoReg = (resultado.registro && resultado.registro.nota_vent_estado) || 'PENDIENTE';
                $("#nota_vent_estado").val(estadoReg);
                $("#detalle").show();
                listarDetalles();
                if (estadoReg === 'PENDIENTE') {
                    $("#formDetalles").show();
                    mostrarBotonesDetalle('normal');
                    $("#btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", false);
                    $("#btnAgregar, #btnGrabar").prop("disabled", true);
                    $("#btnCancelar").prop("disabled", false);
                } else {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ─── LISTADO ─────────────────────────────────────────────────────────────────
function listar() {
    $.ajax({
        url: getUrl() + 'notaventcab/read',
        method: 'GET',
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(resultado) {
        var lista = '';
        resultado.forEach(function(rs) {
            var info = JSON.stringify({
                id:                       rs.id,
                empresa_id:               rs.empresa_id,
                sucursal_id:              rs.sucursal_id,
                ventas_cab_id:            rs.ventas_cab_id,
                clientes_id:              rs.clientes_id,
                emp_razon_social:         rs.emp_razon_social         || '',
                suc_razon_social:         rs.suc_razon_social         || '',
                venta:                    rs.venta                    || '',
                vencimiento:              rs.vencimiento              || 'N/A',
                nota_vent_fecha:          rs.nota_vent_fecha          || '',
                nota_vent_estado:         rs.nota_vent_estado         || '',
                cuotas:                   rs.cuotas                   || '0',
                nota_vent_tipo:           rs.nota_vent_tipo           || '',
                nota_vent_afecta_stock:   (rs.nota_vent_afecta_stock !== false && rs.nota_vent_afecta_stock !== 0) ? 1 : 0,
                nota_vent_observaciones:  rs.nota_vent_observaciones  || '',
                funcionario:              rs.funcionario              || '-',
                cli_nombre:               rs.cli_nombre               || '',
                cli_apellido:             rs.cli_apellido             || '',
                cli_ruc:                  rs.cli_ruc                  || '',
                cli_direccion:            rs.cli_direccion            || '',
                cli_telefono:             rs.cli_telefono             || '',
                cli_correo:               rs.cli_correo               || '',
                nota_vene_condicion_pago: rs.nota_vene_condicion_pago || '',
                nota_vent_nro_comprobante:rs.nota_vent_nro_comprobante|| '',
                tim_numero:               rs.tim_numero               || '',
                tim_fecha_fin:            rs.tim_fecha_fin            || ''
            }).replace(/'/g, "&#39;");

            lista += '<tr class="nota-vent-row" style="cursor:pointer;" data-info=\'' + info + '\'>';
            lista += '<td>' + rs.id + '</td>';
            lista += '<td>' + (rs.vencimiento||'N/A') + '</td>';
            lista += '<td>' + (rs.nota_vent_fecha||'') + '</td>';
            lista += '<td>' + (rs.venta||'') + '</td>';
            lista += '<td>' + (rs.funcionario||'-') + '</td>';
            lista += '<td>' + (rs.cuotas||'0') + '</td>';
            lista += '<td>' + (rs.nota_vent_tipo||'') + '</td>';
            lista += '<td>' + (rs.nota_vent_observaciones||'') + '</td>';
            lista += '<td>' + badgeEstado(rs.nota_vent_estado||'') + '</td>';
            lista += '</tr>';
        });
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on('click', '.nota-vent-row', function() {
    var d = $(this).data('info');
    if (!d) return;
    seleccionNotaVent(
        d.id, d.empresa_id, d.sucursal_id, d.ventas_cab_id, d.clientes_id,
        d.emp_razon_social, d.suc_razon_social, d.venta, d.vencimiento, d.nota_vent_fecha, d.nota_vent_estado,
        d.cuotas, d.nota_vent_tipo, d.nota_vent_observaciones, d.funcionario,
        d.cli_nombre, d.cli_apellido, d.cli_ruc, d.cli_direccion, d.cli_telefono, d.cli_correo,
        d.nota_vene_condicion_pago, d.nota_vent_nro_comprobante, d.tim_numero, d.tim_fecha_fin,
        d.nota_vent_afecta_stock
    );
});

// ─── SELECCIÓN ───────────────────────────────────────────────────────────────
function seleccionNotaVent(
    id, empresa_id, sucursal_id, ventas_cab_id, clientes_id,
    emp_razon_social, suc_razon_social, venta, vencimiento, fecha, estado,
    cuotas, tipo, observaciones, funcionario,
    cli_nombre, cli_apellido, cli_ruc, cli_direccion, cli_telefono, cli_correo,
    condicion_pago, nro_comprobante, tim_numero, tim_fecha_fin,
    afecta_stock
) {
    estado = estado.trim().toUpperCase();

    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#clientes_id").val(clientes_id);

    var venc = (vencimiento === 'N/A') ? '' : vencimiento;
    $("#nota_vent_intervalo_fecha_vence").val(venc);
    $("#vencimiento").val(venc);
    $("#nota_vent_fecha").val(fecha);
    $("#nota_vent_estado").val(estado);
    $("#nota_vent_cant_cuota").val(cuotas);
    $("#cuotas").val(cuotas);
    $("#nota_vent_tipo").val(tipo);
    $("#nota_vent_observaciones").val(observaciones);
    setAfectaStock(afecta_stock === 1 || afecta_stock === true);
    $('#btnAfectaSi, #btnAfectaNo').prop('disabled', true);
    $("#nota_vene_condicion_pago").val(condicion_pago);

    // Timbrado guardado
    $("#nota_vent_nro_comprobante").val(nro_comprobante || '');
    $("#tim_numero_display").val(tim_numero || '(sin timbrado)');
    $("#tim_vence_display").val(tim_fecha_fin || '—');

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#venta").val(venta);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();
    listarDetalles();

    // Botones: reset total
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (estado === 'PENDIENTE') {
        $("#btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", false);
        $("#formDetalles").show();
        mostrarBotonesDetalle('normal');
    } else if (estado === 'CONFIRMADO') {
        $("#btnEliminar").prop("disabled", false);
    } else if (estado === 'ANULADO') {
        // Todos los botones permanecen deshabilitados
    }

    $(".form-line").addClass("focused");
}

// ─── VENTA ───────────────────────────────────────────────────────────────────
function buscarVentas() {
    var q = $.trim($("#venta").val());
    if (!q) { $("#listaVentas").html('').hide(); return; }
    _debounce('vent', function() {
        $.ajax({
            url: getUrl() + 'ventas_cab/buscarVentasNota',
            method: 'GET',
            dataType: 'json',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { q: q }
        })
        .done(function(resultado) {
            var lista = "<ul class='list-group'>";
            resultado.forEach(function(rs) {
                var info = JSON.stringify({
                    ventas_cab_id:              rs.ventas_cab_id,
                    venta:                      rs.venta                      || '',
                    empresa_id:                 rs.empresa_id,
                    emp_razon_social:           rs.emp_razon_social            || '',
                    sucursal_id:                rs.sucursal_id,
                    suc_razon_social:           rs.suc_razon_social            || '',
                    clientes_id:                rs.clientes_id,
                    cli_nombre:                 rs.cli_nombre                  || '',
                    cli_apellido:               rs.cli_apellido                || '',
                    cli_ruc:                    rs.cli_ruc                     || '',
                    cli_direccion:              rs.cli_direccion               || '',
                    cli_telefono:               rs.cli_telefono                || '',
                    cli_correo:                 rs.cli_correo                  || '',
                    condicion_pago:             rs.condicion_pago              || '',
                    vent_intervalo_fecha_vence: rs.vent_intervalo_fecha_vence  || '',
                    vent_cant_cuota:            rs.vent_cant_cuota             || ''
                }).replace(/'/g, "&#39;");

                lista += "<li class='list-group-item lista-venta-nota-item' style='cursor:pointer;' data-info='" + info + "'>"
                    + 'VENTA NRO: ' + (rs.venta||'') + ' &ndash; ' + (rs.cli_nombre||'') + ' ' + (rs.cli_apellido||'')
                    + "</li>";
            });
            lista += "</ul>";
            $("#listaVentas").html(lista).css({ display:'block', position:'absolute', zIndex:2000 });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

$(document).on('click', '.lista-venta-nota-item', function() {
    var d = $(this).data('info');
    if (!d) return;
    seleccionVenta(d.ventas_cab_id, d.venta, d.empresa_id, d.emp_razon_social,
        d.sucursal_id, d.suc_razon_social, d.clientes_id, d.cli_nombre, d.cli_apellido,
        d.cli_ruc, d.cli_direccion, d.cli_telefono, d.cli_correo,
        d.condicion_pago, d.vent_intervalo_fecha_vence, d.vent_cant_cuota);
});

function seleccionVenta(
    ventas_cab_id, venta,
    empresa_id, emp_razon_social,
    sucursal_id, suc_razon_social,
    clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_direccion, cli_telefono, cli_correo,
    condicion_pago, vent_intervalo_fecha_vence, vent_cant_cuota
) {
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#venta").val(venta).prop("disabled", true);
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    // sucursal_id NO se autocompleta — el usuario elige su propia sucursal

    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    var venc = (vent_intervalo_fecha_vence === 'N/A') ? '' : vent_intervalo_fecha_vence;
    $("#nota_vene_condicion_pago").val(condicion_pago).prop("disabled", true);
    $("#vencimiento").val(venc).prop("disabled", true);
    $("#cuotas").val(vent_cant_cuota === 'N/A' ? '' : vent_cant_cuota).prop("disabled", true);

    $("#listaVentas").html('').hide();
    $(".form-line").addClass("focused");
}

// ─── SUCURSAL ────────────────────────────────────────────────────────────────
function buscarSucursal() {
    var q     = $.trim($("#suc_razon_social").val());
    var empId = $("#empresa_id").val();

    if (!empId) {
        $("#listaSucursal").html("<ul class='list-group'><li class='list-group-item text-muted'>Seleccione una venta primero.</li></ul>")
            .css({ display:'block', position:'absolute', zIndex:2000 });
        return;
    }
    if (!q) { $("#listaSucursal").html("").hide(); return; }

    $.ajax({
        url: getUrl() + 'sucursal/read',
        method: 'GET',
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(resultado) {
        var filtrado = resultado.filter(function(s) {
            return String(s.empresa_id) === String(empId) &&
                   s.suc_razon_social.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        var lista = "<ul class='list-group'>";
        filtrado.forEach(function(s) {
            lista += "<li class='list-group-item lista-suc-item' style='cursor:pointer;'" +
                " data-id='" + s.id + "'" +
                " data-nombre='" + (s.suc_razon_social||'').replace(/'/g,"&#39;") + "'>" +
                s.suc_razon_social + "</li>";
        });
        if (!filtrado.length) lista += "<li class='list-group-item text-muted'>Sin sucursales encontradas.</li>";
        lista += "</ul>";
        $("#listaSucursal").html(lista).css({ display:'block', position:'absolute', zIndex:2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on('click', '.lista-suc-item', function() {
    seleccionSucursal($(this).data('id'), $(this).data('nombre'));
});

function seleccionSucursal(id, nombre) {
    $("#sucursal_id").val(id);
    $("#suc_razon_social").val(nombre);
    $("#listaSucursal").html("").hide();
    $(".form-line").addClass("focused");
    cargarTimbrado();
}

// ─── TIMBRADO ────────────────────────────────────────────────────────────────
function cargarTimbrado() {
    var empId = $("#empresa_id").val();
    var sucId = $("#sucursal_id").val();
    var tipo  = $("#nota_vent_tipo").val();

    if (!empId || !sucId || !tipo) {
        $("#timbrado_id").val('');
        $("#nota_vent_nro_comprobante").val('');
        var msg = !empId  ? '(seleccionar venta)'
                : !sucId  ? '(seleccionar sucursal)'
                :            '(seleccionar tipo)';
        $("#tim_numero_display").val(msg);
        $("#tim_vence_display").val('—');
        return;
    }

    var tipoDocumento = tipo === 'Crédito' ? 'nota_credito' : 'nota_debito';

    $.ajax({
        url: getUrl() + 'timbrado/para-ventas',
        method: 'GET',
        headers: { Authorization: 'Bearer ' + getToken() },
        data: { empresa_id: empId, sucursal_id: sucId, tipo_documento: tipoDocumento }
    })
    .done(function(res) {
        $("#timbrado_id").val(res.timbrado_id);
        $("#nota_vent_nro_comprobante").val(res.nro_comprobante);
        $("#tim_numero_display").val(res.tim_numero);
        $("#tim_vence_display").val(res.tim_fecha_fin ? res.tim_fecha_fin.substring(0,10) : '—');
        if (res.nros_restantes <= 10) {
            swal('Atención', 'El timbrado ' + res.tim_numero + ' tiene solo ' + res.nros_restantes + ' números restantes.', 'warning');
        }
    })
    .fail(function(xhr) {
        $("#timbrado_id").val('');
        $("#nota_vent_nro_comprobante").val('');
        var res = xhr.responseJSON;
        var msg = (res && res.mensaje) ? res.mensaje : 'Sin timbrado activo para este tipo de nota.';
        $("#tim_numero_display").val(msg);
        $("#tim_vence_display").val('—');
        if (xhr.status === 404) {
            swal('Sin timbrado', msg + ' Registre uno en Referenciales → Timbrado.', 'warning');
        }
    });
}

// ─── DETALLE — BOTONES ───────────────────────────────────────────────────────
function mostrarBotonesDetalle(modo) {
    if (modo === 'grabar') {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').hide();
        $('#btnGrabarDetalle, #btnCancelarDetalle').show();
    } else {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').show();
        $('#btnGrabarDetalle, #btnCancelarDetalle').hide();
    }
}

function agregarDetalle() {
    cancelarDetalle();
    $('#txtOperacionDetalle').val(1);
    $('#item_decripcion').removeAttr('disabled');
    $('#notas_vent_det_cantidad').removeAttr('disabled');
    $('#notas_vent_det_precio').removeAttr('disabled');
    $('#tip_imp_nom').removeAttr('disabled');
    cargarDepositosDetalle(null);
    $('#deposito_id_det').prop('disabled', true);
    mostrarBotonesDetalle('grabar');
}

function editarDetalle() {
    $('#txtOperacionDetalle').val(2);
    $('#item_decripcion').removeAttr('disabled');
    $('#notas_vent_det_cantidad').removeAttr('disabled');
    $('#notas_vent_det_precio').removeAttr('disabled');
    $('#tip_imp_nom').removeAttr('disabled');
    cargarDepositosDetalle($('#deposito_id_det').val());
    $('#deposito_id_det').prop('disabled', true);
    if (typeof mmCargarMarcas === 'function') {
        mmCargarMarcas($('#item_id').val(), _mmMarcaId || null);
    } else {
        $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    }
    mostrarBotonesDetalle('grabar');
}

function eliminarDetalle() {
    $('#txtOperacionDetalle').val(3);
    mostrarBotonesDetalle('grabar');
}

function cancelarDetalle() {
    if (typeof mmLimpiar === 'function') mmLimpiar();
    $('#txtOperacionDetalle').val(0);
    $('#item_id').val('');
    $('#item_decripcion').val('').prop('disabled', true);
    $('#notas_vent_det_cantidad').val('').prop('disabled', true).css('border-color','');
    $('#notas_vent_det_precio').val('').prop('disabled', true);
    $('#tip_imp_nom').val('').prop('disabled', true);
    $('#tipo_impuesto_id').val('');
    $('#stock_disponible_det').val(0);
    $('#avisoStockNota').hide();
    $('#btnGrabarDetalle').prop('disabled', false);
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();
    mostrarBotonesDetalle('normal');
}

function validarCantidadNota() {
    // En nota de débito se resta stock, validar que no supere disponible
    if ($('#nota_vent_tipo').val() !== 'Débito') return;
    var cant  = parseFloat($('#notas_vent_det_cantidad').val());
    var stock = parseFloat($('#stock_disponible_det').val()) || 0;
    if (!isNaN(cant) && cant > stock) {
        $('#notas_vent_det_cantidad').css('border-color','#e74c3c');
        $('#avisoStockNota').text('Stock disponible: ' + stock).show();
        $('#btnGrabarDetalle').prop('disabled', true);
    } else {
        $('#notas_vent_det_cantidad').css('border-color','');
        $('#avisoStockNota').hide();
        $('#btnGrabarDetalle').prop('disabled', false);
    }
}

function cargarDepositosDetalle(selected_id) {
    var sucId = $('#sucursal_id').val();
    if (!sucId) return;
    $.ajax({
        url: getUrl() + 'deposito/read-by-sucursal/' + sucId,
        method: 'GET',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selected_id ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        $('#deposito_id_det').html(opts);
    });
}

function grabarDetalle() {
    var oper     = parseInt($('#txtOperacionDetalle').val());
    var itemId   = $.trim($('#item_id').val());
    var cantidad = $.trim($('#notas_vent_det_cantidad').val()).replace(/\./g,'').replace(',','.');
    var precio   = $.trim($('#notas_vent_det_precio').val()).replace(/\./g,'').replace(',','.');
    var notaId   = $('#id').val();

    var errores = [];
    if (oper !== 3) {
        if (!itemId) errores.push('Seleccione un ítem.');
        if (!cantidad || isNaN(cantidad) || parseFloat(cantidad) <= 0) errores.push('Cantidad inválida.');
        if (!precio   || isNaN(precio))  errores.push('Precio inválido.');
        if (!$('#tipo_impuesto_id').val()) errores.push('El ítem debe tener tipo de impuesto.');
        if ($('#nota_vent_tipo').val() === 'Débito') {
            var stock = parseFloat($('#stock_disponible_det').val()) || 0;
            if (parseFloat(cantidad) > stock) errores.push('La cantidad supera el stock disponible (' + stock + ').');
        }
    }
    if (errores.length > 0) {
        swal({ title:'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type:'warning' });
        return;
    }

    var endpoint = 'notaventdet/create';
    var metodo   = 'POST';
    if (oper === 2) { endpoint = 'notaventdet/update/' + notaId + '/' + itemId; metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'notaventdet/delete/' + notaId + '/' + itemId; metodo = 'DELETE'; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() },
        data: {
            notas_vent_cab_id:       notaId,
            item_id:                 itemId,
            tipo_impuesto_id:        $('#tipo_impuesto_id').val(),
            notas_vent_det_cantidad: cantidad,
            notas_vent_det_precio:   precio,
            deposito_id:             $('#deposito_id_det').val() || null,
            marca_id:  (typeof _mmMarcaId  !== 'undefined' && _mmMarcaId)  ? parseInt(_mmMarcaId)  : null,
            modelo_id: (typeof _mmModeloId !== 'undefined' && _mmModeloId) ? parseInt(_mmModeloId) : null
        }
    })
    .done(function() {
        listarDetalles();
        cancelarDetalle();
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        var msg = (res && res.mensaje) ? res.mensaje : 'Error al guardar el detalle.';
        swal({ title: xhr.status === 422 ? 'Aviso' : 'Error', text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
    });
}

// ─── DETALLE — LISTA ─────────────────────────────────────────────────────────
function listarDetalles() {
    var notaVentId = $("#id").val();
    var estadoNota = $("#nota_vent_estado").val();
    if (!notaVentId || notaVentId == 0) return;

    $.ajax({
        url: getUrl() + 'notaventdet/read/' + notaVentId,
        method: 'GET',
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(resultado) {
        var lista = '';
        var totalGral = 0, TotalIva10 = 0, TotalIva5 = 0, cantidadDetalle = 0;

        resultado.forEach(function(rs) {
            var cantidad = parseFloat(rs.notas_vent_det_cantidad) || 0;
            var precio   = parseFloat(rs.notas_vent_det_precio)   || 0;
            var subtotal = cantidad * precio;

            var imp = (rs.tip_imp_nom || '').toUpperCase();
            var iva = 0;
            if (imp.indexOf('EXENT') !== -1)      { iva = 0; }
            else if (imp.indexOf('5') !== -1)      { iva = Math.round(subtotal / 21); TotalIva5 += iva; }
            else                                   { iva = Math.round(subtotal / 11); TotalIva10 += iva; }
            totalGral += subtotal;

            var det = JSON.stringify({
                item_id:         rs.item_id,
                tipo_impuesto_id:rs.tipo_impuesto_id,
                item_decripcion: rs.item_decripcion  || '',
                tip_imp_nom:     rs.tip_imp_nom       || '',
                cantidad:        cantidad,
                precio:          precio,
                deposito_id:     rs.deposito_id       || 0,
                stock_disponible:rs.stock_disponible  || 0,
                marca_id:        rs.marca_id          || 0,
                modelo_id:       rs.modelo_id         || 0
            }).replace(/'/g, "&#39;");

            lista += '<tr class="nota-det-row" style="cursor:pointer;" data-det=\'' + det + '\'>';
            lista += '<td>' + rs.item_id + '</td>';
            lista += '<td>' + rs.item_decripcion + '</td>';
            lista += '<td>' + (rs.marc_nom||'-') + '</td>';
            lista += '<td>' + (rs.modelo_nom||'-') + '</td>';
            lista += '<td class="text-right">' + cantidad + '</td>';
            lista += '<td class="text-right">' + formatearNumero(precio) + '</td>';
            lista += '<td>' + (rs.tip_imp_nom||'-') + '</td>';
            lista += '<td class="text-right">' + formatearNumero(subtotal) + '</td>';
            lista += '<td class="text-right">' + formatearNumero(iva) + '</td>';
            lista += '<td>' + (rs.dep_nombre||'-') + '</td>';
            lista += '</tr>';
            cantidadDetalle++;
        });

        if (!lista) lista = '<tr><td colspan="10" class="text-center text-muted">Sin ítems en el detalle</td></tr>';
        $('#tableDetalle').html(lista);
        $('#txtTotalGral').text(formatearNumero(totalGral));
        $('#txtIva10').text(formatearNumero(TotalIva10));
        $('#txtIva5').text(formatearNumero(TotalIva5));
        $('#txtTotalConImpuesto').text(formatearNumero(TotalIva10 + TotalIva5));

        if (estadoNota === 'PENDIENTE' && cantidadDetalle > 0) {
            $('#btnConfirmar').prop('disabled', false);
        } else {
            $('#btnConfirmar').prop('disabled', true);
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on('click', '.nota-det-row', function() {
    var d = $(this).data('det');
    if (!d) return;
    seleccionDetalle(d.item_id, d.tipo_impuesto_id, d.item_decripcion, d.tip_imp_nom,
        d.cantidad, d.precio, d.deposito_id, d.stock_disponible, d.marca_id, d.modelo_id);
});

function seleccionDetalle(item_id, tipo_impuesto_id, item_decripcion, tip_imp_nom, cantidad, precio, deposito_id, stock_disponible, marca_id, modelo_id) {
    if ($("#nota_vent_estado").val() === 'CONFIRMADO') return;

    $('#item_id').val(item_id);
    $('#tipo_impuesto_id').val(tipo_impuesto_id);
    $('#item_decripcion').val(item_decripcion);
    $('#tip_imp_nom').val(tip_imp_nom);
    $('#notas_vent_det_cantidad').val(cantidad);
    $('#notas_vent_det_precio').val(precio);
    $('#stock_disponible_det').val(stock_disponible || 0);
    $('#notas_vent_det_cantidad').css('border-color','');
    $('#avisoStockNota').hide();
    $('#btnGrabarDetalle').prop('disabled', false);
    cargarDepositosDetalle(deposito_id);
    if (typeof mmAutocompletar === 'function') mmAutocompletar(item_id, marca_id, modelo_id);
    $('#listaProductos').html('').hide();
    $(".form-line").addClass("focused");
}

// ─── PRODUCTOS ───────────────────────────────────────────────────────────────
function buscarProductos() {
    var q = $('#item_decripcion').val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }
    _debounce('prod', function() {
        $.ajax({
            url: getUrl() + 'items/buscar',
            method: 'POST',
            dataType: 'json',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { item_decripcion: q }
        })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                var info = JSON.stringify({
                    item_id:          rs.item_id,
                    item_decripcion:  rs.item_decripcion  || '',
                    tipo_impuesto_id: rs.tipo_impuesto_id || null,
                    item_costo:       rs.item_costo       || 0,
                    tip_imp_nom:      rs.tip_imp_nom       || '',
                    tipo_imp_tasa:    rs.tipo_imp_tasa     || 0,
                    stock:            stock
                }).replace(/'/g, "&#39;");

                lista += '<li class="list-group-item lista-prod-item" style="cursor:pointer;" data-info=\'' + info + '\'>'
                    + rs.item_decripcion
                    + ' <span class="badge" style="background:#3b82f6;color:#fff;">Stock: ' + stock + '</span>'
                    + '</li>';
            });
            lista += '</ul>';
            $('#listaProductos').html(lista).css({ display:'block', position:'absolute', zIndex:2000 });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

$(document).on('click', '.lista-prod-item', function() {
    var d = $(this).data('info');
    if (!d) return;
    seleccionProducto(d.item_id, d.item_decripcion, d.tipo_impuesto_id, d.item_costo, d.tip_imp_nom, d.tipo_imp_tasa, d.stock);
});

function seleccionProducto(item_id, item_decripcion, tipo_impuesto_id, item_costo, tip_imp_nom, tipo_imp_tasa, cantidad_disponible) {
    $('#item_id').val(item_id);
    $('#item_decripcion').val(item_decripcion);
    $('#notas_vent_det_precio').val('' + item_costo);
    $('#tipo_impuesto_id').val(tipo_impuesto_id);
    $('#tip_imp_nom').val(tip_imp_nom);
    $('#stock_disponible_det').val(cantidad_disponible || 0);
    if (typeof mmCargarMarcas === 'function') { mmCargarMarcas(item_id, null); $('#marca_det_mm').removeAttr('disabled'); }
    $('#listaProductos').html('').hide();
    $(".form-line").addClass("focused");
}

// ─── TIPO IMPUESTO ───────────────────────────────────────────────────────────
function buscarTipoImpuestos() {
    $.ajax({
        url: getUrl() + 'tipo-impuesto/read',
        method: 'GET',
        dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        resultado.forEach(function(rs) {
            lista += "<li class='list-group-item' onclick=\"seleccionTipoImpuestos(" + rs.id + ",'" + rs.tip_imp_nom + "','" + rs.tipo_imp_tasa + "');\">" + rs.tip_imp_nom + ', ' + rs.tipo_imp_tasa + "</li>";
        });
        lista += "</ul>";
        $('#listaTipoImpuestos').html(lista).css({ display:'block', position:'absolute', zIndex:2000 });
    })
    .fail(function() { swal('Error', 'No se pudo cargar tipos de impuesto.', 'error'); });
}

function seleccionTipoImpuestos(id, tip_imp_nom, tipo_imp_tasa) {
    $('#tipo_impuesto_id').val(id);
    $('#tip_imp_nom').val(tip_imp_nom);
    $('#listaTipoImpuestos').html('').hide();
}

// ─── MISC ─────────────────────────────────────────────────────────────────────
function actualizarTotalesVenta() {
    var cantidad = parseFloat($("#notas_vent_det_cantidad").val()) || 0;
    var precio   = parseFloat($("#notas_vent_det_precio").val())   || 0;
    var subtotal = cantidad * precio;
    $("#subtotal").val(subtotal.toFixed(2));
    $("#totalConImpuesto").val(subtotal.toFixed(2));
}

function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function cargarFuncionarioIdLogueado() {
    var datosSesion = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
        $('#funcionario_id').val(datosSesion.user.funcionario_id);
    } else {
        swal('Sesión expirada', 'No se puede identificar al usuario. Inicie sesión nuevamente.', 'error');
        window.location.href = '../../index.html';
    }
}
