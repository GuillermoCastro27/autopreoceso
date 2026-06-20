listar();
campoFecha();

// ─── HELPERS DEPÓSITO ────────────────────────────────────────────────────────
function cargarDepositosPorSucursal(sucursal_id, selectId, selected_id) {
    if (!sucursal_id) return;
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucursal_id, function(data) {
        var label = selectId === '#deposito_destino_id_det'
            ? '-- Depósito Destino --'
            : (esTransferencia() ? '-- Depósito Origen --' : '-- Depósito --');
        var opts = '<option value="">' + label + '</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selected_id ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        $(selectId).html(opts);
    });
}

function getNombreDeposito(id, lista) {
    if (!id || !lista) return '-';
    var d = lista.find(function(x) { return x.id == id; });
    return d ? d.dep_nombre : '-';
}


// ─── TIPO ────────────────────────────────────────────────────────────────────
function setTipo(tipo) {
    $('#tipo').val(tipo);
    if (tipo === 'TRANSFERENCIA') {
        $('#btnTipoTransferencia').addClass('active btn-danger').removeClass('btn-default');
        $('#btnTipoProveedor').removeClass('active btn-primary').addClass('btn-default');
        $('#suc_razon_social').attr('placeholder', 'Sucursal Origen');
        $('#seccionProveedor').hide();
        limpiarCamposProveedor();
        deshabilitarCamposProveedor();
        $('#seccionTransferencia').show();
        $('#timbrado_id_remi, #tim_numero_remi, #nota_remi_nro_preview, #tim_vence_remi').val('');
        if ($('#sucursal_id').val()) {
            $('#suc_destino_razon_social').prop('disabled', false);
        } else {
            $('#suc_destino_razon_social').prop('disabled', true);
        }
        $('#conductor_nombre, #tvd_buscar').prop('disabled', false);
        $('#colDepositoDestino').show();
        $('#thDepositoDestino').show();
    } else {
        $('#btnTipoProveedor').addClass('active btn-primary').removeClass('btn-default');
        $('#btnTipoTransferencia').removeClass('active btn-danger').addClass('btn-default');
        $('#suc_razon_social').attr('placeholder', 'Sucursal');
        $('#seccionProveedor').show();
        habilitarCamposProveedor();
        $('#seccionTransferencia').hide();
        limpiarCamposTransferencia();
        $('#colDepositoDestino').hide();
        $('#thDepositoDestino').hide();
    }
}

function limpiarCamposTransferencia() {
    $('#suc_destino_razon_social').prop('disabled', true).val('');
    $('#sucursal_destino_id').val('');
    $('#conductor_id').val('');
    $('#conductor_nombre').val('').prop('disabled', true);
    $('#conductor_ci').val('');
    $('#tipo_vehiculo_det_id').val('');
    $('#tvd_buscar').val('').prop('disabled', true);
    $('#tvd_marca, #tvd_modelo, #tvd_placa, #tvd_chasis, #tvd_motor').val('');
    $('#listaConductor, #listaVehiculo').html('').hide();
}

// ─── BÚSQUEDA CONDUCTOR ──────────────────────────────────────────────────────
var _timerConductor;
function buscarConductor() {
    var q = $.trim($('#conductor_nombre').val());
    clearTimeout(_timerConductor);
    if (!q) { $('#listaConductor').html('').hide(); return; }
    _timerConductor = setTimeout(function() {
        $.ajax({
            url: getUrl() + 'funcionario/buscar',
            method: 'GET',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { q: q }
        })
        .done(function(data) {
            var lista = "<ul class='list-group' style='margin:0;'>";
            if (!data.length) lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
            data.forEach(function(rs) {
                var info = JSON.stringify({
                    id:          rs.id,
                    nombre:      (rs.fun_nom || '') + ' ' + (rs.fun_apellido || ''),
                    ci:          rs.fun_ci || ''
                }).replace(/'/g, "&#39;");
                lista += "<li class='list-group-item lista-conductor-item' style='cursor:pointer;' data-info='" + info + "'>"
                    + (rs.fun_nom || '') + ' ' + (rs.fun_apellido || '')
                    + ' <small class="text-muted">CI: ' + (rs.fun_ci || '-') + '</small>'
                    + "</li>";
            });
            lista += "</ul>";
            $('#listaConductor').html(lista).show();
        });
    }, 300);
}

$(document).on('click', '.lista-conductor-item', function() {
    var d = $(this).data('info');
    if (!d) return;
    $('#conductor_id').val(d.id);
    $('#conductor_nombre').val(d.nombre);
    $('#conductor_ci').val(d.ci);
    $('#listaConductor').html('').hide();
    $(".form-line").addClass("focused");
});

// ─── BÚSQUEDA VEHÍCULO ────────────────────────────────────────────────────────
var _timerVehiculo;
function buscarVehiculo() {
    var q = $.trim($('#tvd_buscar').val());
    clearTimeout(_timerVehiculo);
    if (!q) { $('#listaVehiculo').html('').hide(); return; }
    _timerVehiculo = setTimeout(function() {
        $.ajax({
            url: getUrl() + 'tipo_vehiculo_det/buscar',
            method: 'GET',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { q: q }
        })
        .done(function(data) {
            var lista = "<ul class='list-group' style='margin:0;'>";
            if (!data.length) lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
            data.forEach(function(rs) {
                var info = JSON.stringify({
                    id:       rs.id,
                    placa:    rs.tv_det_placa   || '',
                    chasis:   rs.tv_det_num_chasis || '',
                    motor:    rs.tv_det_num_motor  || '',
                    mar_nom: rs.mar_nom        || '',
                    modelo_nom: rs.modelo_nom    || ''
                }).replace(/'/g, "&#39;");
                lista += "<li class='list-group-item lista-vehiculo-item' style='cursor:pointer;' data-info='" + info + "'>"
                    + (rs.mar_nom || '') + ' ' + (rs.modelo_nom || '')
                    + ' — <strong>' + (rs.tv_det_placa || '') + '</strong>'
                    + "</li>";
            });
            lista += "</ul>";
            $('#listaVehiculo').html(lista).show();
        });
    }, 300);
}

$(document).on('click', '.lista-vehiculo-item', function() {
    var d = $(this).data('info');
    if (!d) return;
    $('#tipo_vehiculo_det_id').val(d.id);
    $('#tvd_buscar').val(d.mar_nom + ' ' + d.modelo_nom + ' — ' + d.placa);
    $('#tvd_marca').val(d.mar_nom);
    $('#tvd_modelo').val(d.modelo_nom);
    $('#tvd_placa').val(d.placa);
    $('#tvd_chasis').val(d.chasis);
    $('#tvd_motor').val(d.motor);
    $('#listaVehiculo').html('').hide();
    $(".form-line").addClass("focused");
});

function habilitarTipo() {
    $('#btnTipoProveedor, #btnTipoTransferencia').removeAttr('disabled');
}
function deshabilitarTipo() {
    $('#btnTipoProveedor, #btnTipoTransferencia').attr('disabled', true);
}

var CAMPOS_PROVEEDOR = ['#prov_razonsocial','#nota_remi_nro','#nota_remi_fecha_emision',
                        '#chofer_nombre','#chofer_documento','#chofer_telefono',
                        '#tipo_vehiculo','#vehiculo_matricula','#vehiculo_modelo',
                        '#vehiculo_color','#vehiculo_anio','#vehiculo_nro'];

function habilitarCamposProveedor() {
    CAMPOS_PROVEEDOR.forEach(function(c) { $(c).removeAttr('disabled'); });
    $('#prov_ruc, #prov_telefono').prop('disabled', true); // solo lectura, se autocompletan
}
function deshabilitarCamposProveedor() {
    CAMPOS_PROVEEDOR.forEach(function(c) { $(c).prop('disabled', true); });
    $('#prov_ruc, #prov_telefono').prop('disabled', true);
}
function limpiarCamposProveedor() {
    CAMPOS_PROVEEDOR.forEach(function(c) { $(c).val(''); });
    $('#proveedor_id').val('');
    $('#prov_ruc, #prov_telefono').val('');
    $('#nota_remi_nro, #nota_remi_fecha_emision').val('').css('border-color','');
    $('#avisoNroNota, #avisoFechaEmision').hide();
    ['#avisoCI','#avisoTelefono','#avisoMatricula','#avisoAnio'].forEach(function(a) {
        $(a).hide().text('');
    });
    ['#chofer_documento','#chofer_telefono','#vehiculo_matricula','#vehiculo_anio'].forEach(function(c) {
        $(c).css('border-color','');
    });
}

// ─── VALIDACIONES EN TIEMPO REAL ─────────────────────────────────────────────
function marcarCampo(inputId, avisoId, esValido, mensaje) {
    var input = $(inputId);
    var aviso = $(avisoId);
    if (!esValido && input.val().length > 0) {
        input.css('border-color', '#e74c3c');
        aviso.text(mensaje).show();
    } else {
        input.css('border-color', '');
        aviso.hide().text('');
    }
}

function validarCI() {
    var val = $('#chofer_documento').val();
    marcarCampo('#chofer_documento', '#avisoCI',
        /^\d{6,8}$/.test(val),
        'La CI debe tener entre 6 y 8 dígitos.');
}

function validarTelefono() {
    var val = $('#chofer_telefono').val();
    if (val.length === 0) { marcarCampo('#chofer_telefono','#avisoTelefono', true, ''); return; }
    marcarCampo('#chofer_telefono', '#avisoTelefono',
        /^09\d{8}$/.test(val),
        'Formato: 09XXXXXXXX (10 dígitos).');
}

function validarMatricula() {
    var val = $('#vehiculo_matricula').val().trim();
    var tipo = $('#tipo_vehiculo').val();
    if (!val || !tipo) return;
    var esValido = false;
    var msg = '';
    if (tipo === 'AUTOMOVIL') {
        esValido = /^[A-Z]{3,4}\s?\d{3}$/.test(val);
        msg = 'Formato automóvil: ABC 123 o ABCD 123.';
    } else if (tipo === 'MOTOCICLETA') {
        esValido = /^\d{1,4}\s?[A-Z]{2,3}$/.test(val);
        msg = 'Formato moto: 123 ABC.';
    }
    marcarCampo('#vehiculo_matricula', '#avisoMatricula', esValido, msg);
}

function validarAnio() {
    var val = $('#vehiculo_anio').val();
    if (val.length === 0) { marcarCampo('#vehiculo_anio','#avisoAnio', true, ''); return; }
    var anio = parseInt(val);
    var anioActual = new Date().getFullYear();
    marcarCampo('#vehiculo_anio', '#avisoAnio',
        /^\d{4}$/.test(val) && anio >= 1900 && anio <= anioActual,
        'Año inválido (1900–' + anioActual + ').');
}

function mascararFecha(input) {
    var v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 4) v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
    else if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
    input.value = v;
}

function autoFormatoNroNota(input) {
    var digits = input.value.replace(/\D/g, '').slice(0, 13);
    var formatted = digits;
    if (digits.length > 6) formatted = digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6);
    else if (digits.length > 3) formatted = digits.slice(0,3) + '-' + digits.slice(3);
    input.value = formatted;
    // validación en tiempo real
    var aviso = $('#avisoNroNota');
    if (formatted && !/^\d{3}-\d{3}-\d{7}$/.test(formatted)) {
        $('#nota_remi_nro').css('border-color','#e74c3c');
        aviso.text('Formato: 000-000-0000000').show();
    } else {
        $('#nota_remi_nro').css('border-color','');
        aviso.hide();
    }
}

function validarFechaEmision() {
    var val = $('#nota_remi_fecha_emision').val().trim();
    var aviso = $('#avisoFechaEmision');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, 'DD/MM/YYYY', true);
    if (!m.isValid()) {
        $('#nota_remi_fecha_emision').css('border-color','#e74c3c');
        aviso.text('Formato: DD/MM/YYYY').show();
    } else if (m.isAfter(moment(), 'day')) {
        $('#nota_remi_fecha_emision').css('border-color','#e74c3c');
        aviso.text('La fecha de emisión no puede ser futura.').show();
    } else {
        $('#nota_remi_fecha_emision').css('border-color','');
        aviso.hide();
    }
}

function cambiarTipoVehiculo() {
    var tipo = $('#tipo_vehiculo').val();
    var placeholder = tipo === 'MOTOCICLETA' ? '123 ABC' : (tipo === 'AUTOMOVIL' ? 'ABC 123' : 'Matrícula');
    $('#vehiculo_matricula').attr('placeholder', placeholder).val('');
    $('#avisoMatricula').hide().text('');
    $('#vehiculo_matricula').css('border-color','');
}

// ─── TABLA ───────────────────────────────────────────────────────────────────
function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip', responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Notas de Remisión' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Notas de Remisión' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Notas de Remisión' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Notas de Remisión' }
        ],
        iDisplayLength: 5,
        language: {
            sSearch: 'Buscar: ', sZeroRecords: 'No se encontraron resultados',
            sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoEmpty: 'Sin registros', sInfoFiltered: '(filtrado de _MAX_)',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar() { location.reload(true); }

function validarFechaInput(campoId, avisoId) {
    var val = $('#' + campoId).val().trim();
    var aviso = $('#' + avisoId);
    if (!val) { aviso.hide(); return; }
    var m = moment(val, 'DD/MM/YYYY HH:mm:ss', true);
    if (!m.isValid()) {
        $('#' + campoId).css('border-color', '#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
        return;
    }
    var hoy = moment().startOf('day');
    var fechaDia = m.clone().startOf('day');
    if (!fechaDia.isSame(hoy)) {
        $('#' + campoId).css('border-color', '#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#' + campoId).css('border-color', '');
        aviso.hide();
    }
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;

    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';

    // Laravel validation errors: { errors: { campo: ['mensaje'] } }
    if (res && res.errors) {
        var lineas = [];
        $.each(res.errors, function(campo, mensajes) {
            lineas.push('• ' + (Array.isArray(mensajes) ? mensajes[0] : mensajes));
        });
        msg = lineas.join('\n');
    } else if (res && res.mensaje) {
        msg = res.mensaje;
    } else if (res && res.message) {
        msg = res.message;
    } else {
        msg = 'Ocurrió un error inesperado. Intente nuevamente.';
    }

    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
    console.error(xhr.responseText);
}
function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss', clearButton: true, weekStart: 1
    });

    // El onchange HTML no dispara para datetimepicker — se bindea aquí
    $('#nota_remi_fecha').on('change', function() {
        validarFechaInput('nota_remi_fecha', 'avisoFechaRemi');
    });

    $('#nota_remi_fecha_emision').on('input change', function() { validarFechaEmision(); });
}

// ─── OPERACIONES CABECERA ────────────────────────────────────────────────────
function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#nota_remi_fecha").removeAttr("disabled");
    $("#nota_remi_observaciones").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    habilitarTipo();
    setTipo('PROVEEDOR');
    habilitarCamposProveedor();
    buscarEmpresas();

    $('#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');

    $(".form-line").addClass("focused");
    $("#registros").hide();
}

function editar() {
    $("#txtOperacion").val(2);
    $("#nota_remi_fecha").removeAttr("disabled");
    $("#nota_remi_observaciones").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    habilitarTipo();
    if ($('#tipo').val() === 'TRANSFERENCIA') {
        $('#conductor_nombre, #tvd_buscar').removeAttr('disabled');
        if ($('#sucursal_id').val()) $('#suc_destino_razon_social').removeAttr('disabled');
    } else {
        habilitarCamposProveedor();
    }

    $('#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $(".form-line").addClass("focused");
}

function eliminar() {
    $("#txtOperacion").val(3);
    $('#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
}

function confirmar() {
    $("#txtOperacion").val(4);
    $('#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var esTransf = esTransferencia();
    var estadoActual = $('#nota_remi_estado').val();
    var msgAnular = (esTransf && estadoActual === 'CONFIRMADO')
        ? '¿Desea anular el registro? Se revertirá el stock transferido.'
        : '¿Desea anular el registro?';
    var textos = { 1: ['AGREGAR','¿Desea grabar la nueva nota?'], 2: ['EDITAR','¿Desea guardar los cambios?'],
                   3: ['ANULAR', msgAnular], 4: ['CONFIRMAR','¿Desea confirmar el registro? Esto moverá el stock.'] };
    var t = textos[oper] || ['',''];
    swal({ title: t[0], text: t[1], type: 'warning', showCancelButton: true,
           confirmButtonColor: '#458E49', confirmButtonText: 'SI', cancelButtonText: 'NO', closeOnConfirm: false
    }, function() { grabar(); });
}

// ─── GRABAR CABECERA ─────────────────────────────────────────────────────────
function grabar() {
    var tipo = $('#tipo').val();

    var errores = [];

    // ── Campos generales ──────────────────────────────────────────────────────
    var fechaVal = $('#nota_remi_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, 'DD/MM/YYYY HH:mm:ss', true);
        if (!mFecha.isValid()) {
            errores.push('El formato de fecha es inválido.');
        } else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day'))) {
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
        }
    }
    if (!$('#nota_remi_observaciones').val().trim())  errores.push('Las observaciones son obligatorias.');
    if (!$('#sucursal_id').val())                     errores.push('Seleccione la sucursal origen.');

    // ── PROVEEDOR: chofer y vehículo ──────────────────────────────────────────
    if (tipo === 'PROVEEDOR') {
        if (!$('#proveedor_id').val())                errores.push('Seleccione el proveedor.');

        var nroNota = $('#nota_remi_nro').val();
        if (!nroNota)                                 errores.push('El número de nota es obligatorio.');
        else if (!/^\d{3}-\d{3}-\d{7}$/.test(nroNota)) errores.push('Nro. de nota inválido. Formato: 000-000-0000000.');

        var fechaEmision = $('#nota_remi_fecha_emision').val().trim();
        if (!fechaEmision) {
            errores.push('La fecha de emisión es obligatoria.');
        } else {
            var mEmision = moment(fechaEmision, 'DD/MM/YYYY', true);
            if (!mEmision.isValid())             errores.push('Fecha de emisión inválida. Formato: DD/MM/YYYY.');
            else if (mEmision.isAfter(moment(), 'day')) errores.push('La fecha de emisión no puede ser futura.');
        }

        if (!$('#tipo_vehiculo').val())               errores.push('Seleccione el tipo de vehículo.');
        if (!$('#chofer_nombre').val().trim())         errores.push('El nombre completo del chofer es obligatorio.');

        var ci = $('#chofer_documento').val();
        if (!ci)                                      errores.push('El número de documento (CI) es obligatorio.');
        else if (!/^\d{6,8}$/.test(ci))              errores.push('La CI debe tener entre 6 y 8 dígitos numéricos.');

        var tel = $('#chofer_telefono').val();
        if (tel && !/^09\d{8}$/.test(tel))           errores.push('El teléfono debe tener el formato 09XXXXXXXX (10 dígitos).');

        var mat = $('#vehiculo_matricula').val().trim().toUpperCase();
        var tipoVeh = $('#tipo_vehiculo').val();
        if (!mat) {
            errores.push('La matrícula del vehículo es obligatoria.');
        } else if (tipoVeh === 'AUTOMOVIL' && !/^[A-Z]{3,4}\s?\d{3}$/.test(mat)) {
            errores.push('Matrícula de automóvil inválida. Formato correcto: ABC 123 o ABCD 123.');
        } else if (tipoVeh === 'MOTOCICLETA' && !/^\d{1,4}\s?[A-Z]{2,3}$/.test(mat)) {
            errores.push('Matrícula de motocicleta inválida. Formato correcto: 123 ABC.');
        }

        if (!$('#vehiculo_modelo').val().trim())      errores.push('El modelo del vehículo es obligatorio.');

        var anio = $('#vehiculo_anio').val();
        if (anio) {
            var anioInt = parseInt(anio);
            if (!/^\d{4}$/.test(anio) || anioInt < 1900 || anioInt > new Date().getFullYear())
                errores.push('El año del vehículo no es válido (debe estar entre 1900 y ' + new Date().getFullYear() + ').');
        }
    }

    // ── TRANSFERENCIA ─────────────────────────────────────────────────────────
    if (tipo === 'TRANSFERENCIA') {
        if (!$('#sucursal_destino_id').val())         errores.push('Seleccione la sucursal destino.');
        else if ($('#sucursal_id').val() === $('#sucursal_destino_id').val())
                                                      errores.push('La sucursal origen y la de destino no pueden ser la misma.');
        if (!$('#conductor_id').val())                errores.push('Seleccione el conductor (funcionario).');
        if (!$('#tipo_vehiculo_det_id').val())        errores.push('Seleccione el vehículo para el transporte.');
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos o incorrectos',
               text: errores.map(function(e){ return '• ' + e; }).join('\n'),
               type: 'warning' });
        return;
    }

    var oper = parseInt($("#txtOperacion").val());
    var endpoint = 'notaremicomp/create';
    var metodo = 'POST';
    var estado = 'PENDIENTE';

    if (oper === 2) { endpoint = 'notaremicomp/update/' + $("#id").val(); metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'notaremicomp/anular/' + $("#id").val();  metodo = 'PUT'; estado = 'ANULADO'; }
    if (oper === 4) { endpoint = 'notaremicomp/confirmar/' + $("#id").val(); metodo = 'PUT'; estado = 'CONFIRMADO'; }

    $.ajax({
        url: getUrl() + endpoint, method: metodo, dataType: 'json',
        data: {
            'id':                      $("#id").val(),
            'nota_remi_fecha':         $("#nota_remi_fecha").val(),
            'nota_remi_observaciones': $("#nota_remi_observaciones").val(),
            'nota_remi_estado':        estado,
            'tipo':                    tipo,
            'sucursal_id':             $("#sucursal_id").val(),
            'sucursal_destino_id':     $("#sucursal_destino_id").val() || null,
            'empresa_id':              $("#empresa_id").val(),
            'funcionario_id':          $("#funcionario_id").val(),
            'proveedor_id':            $("#proveedor_id").val() || null,
            'nota_remi_nro':           $("#nota_remi_nro").val() || null,
            'nota_remi_fecha_emision': $("#nota_remi_fecha_emision").val()
                ? moment($("#nota_remi_fecha_emision").val(), 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            'conductor_id':            $("#conductor_id").val() || null,
            'tipo_vehiculo_det_id':    $("#tipo_vehiculo_det_id").val() || null,
            'chofer_nombre':           $("#chofer_nombre").val() || null,
            'chofer_documento':        $("#chofer_documento").val() || null,
            'chofer_telefono':         $("#chofer_telefono").val() || null,
            'vehiculo_matricula':      $("#vehiculo_matricula").val() || null,
            'vehiculo_modelo':         $("#vehiculo_modelo").val() || null,
            'vehiculo_color':          $("#vehiculo_color").val() || null,
            'vehiculo_anio':           $("#vehiculo_anio").val() || null,
            'vehiculo_nro':            $("#vehiculo_nro").val() || null,
            'tipo_vehiculo':           $("#tipo_vehiculo").val() || null
        }
    })
    .done(function(resultado) {
        swal({ title: 'Respuesta', text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === 'success') {
                $("#id").val(resultado.registro.id);
                $("#detalle").show();
                $("#formDetalles").show();
                if (resultado.registro.nota_remi_estado !== 'PENDIENTE') {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ─── LISTAR ──────────────────────────────────────────────────────────────────
function listar() {
    $.ajax({ url: getUrl() + 'notaremicomp/read', method: 'GET', dataType: 'json' })
    .done(function(resultado) {
        var lista = '';
        resultado.forEach(function(rs) {
            var badgeTipo = rs.tipo === 'TRANSFERENCIA'
                ? '<span style="background:#e74c3c;color:#fff;padding:1px 6px;border-radius:8px;font-size:10px;">TRANSFERENCIA</span>'
                : '<span style="background:#2980b9;color:#fff;padding:1px 6px;border-radius:8px;font-size:10px;">PROVEEDOR</span>';

            var info = JSON.stringify({
                id:                    rs.id,
                empresa_id:            rs.empresa_id,
                emp_razon_social:      rs.emp_razon_social || '',
                sucursal_id:           rs.sucursal_id,
                suc_razon_social:      rs.suc_razon_social || '',
                sucursal_destino_id:   rs.sucursal_destino_id || '',
                suc_destino_razon_social: rs.suc_destino_razon_social || '',
                nota_remi_fecha:       rs.nota_remi_fecha || '',
                nota_remi_observaciones: rs.nota_remi_observaciones || '',
                nota_remi_estado:      rs.nota_remi_estado || '',
                tipo:                  rs.tipo || '',
                funcionario:           rs.funcionario || '',
                proveedor_id:          rs.proveedor_id || '',
                prov_razonsocial:      rs.prov_razonsocial || '',
                prov_ruc:              rs.prov_ruc || '',
                prov_telefono:         rs.prov_telefono || '',
                nota_remi_nro:         rs.nota_remi_nro || '',
                nota_remi_fecha_emision: rs.nota_remi_fecha_emision || '',
                tim_numero:            rs.tim_numero || '',
                tim_fecha_fin:         rs.tim_fecha_fin || '',
                chofer_nombre:         rs.chofer_nombre || '',
                chofer_documento:      rs.chofer_documento || '',
                chofer_telefono:       rs.chofer_telefono || '',
                vehiculo_matricula:    rs.vehiculo_matricula || '',
                vehiculo_modelo:       rs.vehiculo_modelo || '',
                vehiculo_color:        rs.vehiculo_color || '',
                vehiculo_anio:         rs.vehiculo_anio || '',
                vehiculo_nro:          rs.vehiculo_nro || '',
                tipo_vehiculo:         rs.tipo_vehiculo || '',
                conductor_id:          rs.conductor_id || '',
                conductor_nombre:      rs.conductor_nombre || '',
                tipo_vehiculo_det_id:  rs.tipo_vehiculo_det_id || '',
                tv_det_placa:          rs.tv_det_placa || '',
                tv_det_num_chasis:     rs.tv_det_num_chasis || '',
                tv_det_num_motor:      rs.tv_det_num_motor || '',
                tv_mar_nom:           rs.tv_mar_nom || '',
                tv_modelo_nom:         rs.tv_modelo_nom || ''
            }).replace(/'/g, "&#39;");

            lista += '<tr class="item-list" style="cursor:pointer;" data-info=\'' + info + '\'>';
            lista += '<td>' + rs.id + '</td>';
            lista += '<td>' + badgeTipo + '</td>';
            lista += '<td>' + (rs.suc_razon_social || '') + '</td>';
            lista += '<td>' + (rs.suc_destino_razon_social || '—') + '</td>';
            lista += '<td>' + (rs.nota_remi_fecha || '') + '</td>';
            lista += '<td>' + (rs.nota_remi_observaciones || '') + '</td>';
            lista += '<td>' + (rs.funcionario || '-') + '</td>';
            lista += '<td>' + (rs.nota_remi_estado || '') + '</td>';
            lista += '</tr>';
        });
        $('#tableBody').html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { console.error(xhr.responseText); });
}

$(document).on('click', '.item-list', function() {
    var d = $(this).data('info');
    if (d) seleccionNotaRemi(d);
});

// ─── SELECCIÓN NOTA ──────────────────────────────────────────────────────────
function seleccionNotaRemi(d) {
    $("#id").val(d.id);
    $("#empresa_id").val(d.empresa_id);
    $("#sucursal_id").val(d.sucursal_id);
    $("#sucursal_destino_id").val(d.sucursal_destino_id || '');
    $("#emp_razon_social").val(d.emp_razon_social);
    $("#suc_razon_social").val(d.suc_razon_social);
    $("#suc_destino_razon_social").val(d.suc_destino_razon_social || '');
    $("#nota_remi_fecha").val(d.nota_remi_fecha);
    $("#nota_remi_observaciones").val(d.nota_remi_observaciones);
    $("#nota_remi_estado").val(d.nota_remi_estado);

    // Timbrado (solo para TRANSFERENCIA)
    if (d.tipo === 'TRANSFERENCIA') {
        $('#tim_numero_remi').val(d.tim_numero || '');
        $('#nota_remi_nro_preview').val(d.nota_remi_nro || '');
        $('#tim_vence_remi').val(d.tim_fecha_fin || '');
        // Conductor
        $('#conductor_id').val(d.conductor_id || '');
        $('#conductor_nombre').val(d.conductor_nombre || '');
        $('#conductor_ci').val('');
        // Vehículo
        $('#tipo_vehiculo_det_id').val(d.tipo_vehiculo_det_id || '');
        if (d.tipo_vehiculo_det_id) {
            $('#tvd_buscar').val((d.tv_mar_nom || '') + ' ' + (d.tv_modelo_nom || '') + ' — ' + (d.tv_det_placa || ''));
        } else {
            $('#tvd_buscar').val('');
        }
        $('#tvd_marca').val(d.tv_mar_nom || '');
        $('#tvd_modelo').val(d.tv_modelo_nom || '');
        $('#tvd_placa').val(d.tv_det_placa || '');
        $('#tvd_chasis').val(d.tv_det_num_chasis || '');
        $('#tvd_motor').val(d.tv_det_num_motor || '');
    }

    // Datos proveedor
    $('#proveedor_id').val(d.proveedor_id || '');
    $('#prov_razonsocial').val(d.prov_razonsocial || '');
    $('#prov_ruc').val(d.prov_ruc || '');
    $('#prov_telefono').val(d.prov_telefono || '');
    $('#nota_remi_nro').val(d.nota_remi_nro || '');
    $('#nota_remi_fecha_emision').val(d.nota_remi_fecha_emision || '');

    // Datos chofer y vehículo (proveedor)
    $('#chofer_nombre').val(d.chofer_nombre || '');
    $('#chofer_documento').val(d.chofer_documento || '');
    $('#chofer_telefono').val(d.chofer_telefono || '');
    $('#vehiculo_matricula').val(d.vehiculo_matricula || '');
    $('#vehiculo_modelo').val(d.vehiculo_modelo || '');
    $('#vehiculo_color').val(d.vehiculo_color || '');
    $('#vehiculo_anio').val(d.vehiculo_anio || '');
    $('#vehiculo_nro').val(d.vehiculo_nro || '');
    $('#tipo_vehiculo').val(d.tipo_vehiculo || '');
    cambiarTipoVehiculo();

    // Aplicar tipo y mostrar/ocultar sección transferencia
    $('#tipo').val(d.tipo);
    setTipo(d.tipo);
    deshabilitarTipo();
    deshabilitarCamposProveedor();

    // Botón imprimir: solo para TRANSFERENCIA CONFIRMADA
    if (d.tipo === 'TRANSFERENCIA' && d.nota_remi_estado === 'CONFIRMADO') {
        $('#btnImprimir').show().removeAttr('disabled');
    } else {
        $('#btnImprimir').hide().attr('disabled', true);
    }

    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();
    listarDetalles();

    // Resetear botones
    $('#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar').attr('disabled', true);
    $('#btnCancelar').removeAttr('disabled');

    if (d.nota_remi_estado === 'PENDIENTE') {
        $('#btnEditar, #btnEliminar, #btnConfirmar').removeAttr('disabled');
        $('#formDetalles').show();
    }
    if (d.nota_remi_estado === 'CONFIRMADO') {
        $('#btnEliminar').removeAttr('disabled');
    }
    $(".form-line").addClass("focused");
}

// ─── DETALLE ─────────────────────────────────────────────────────────────────
function esTransferencia() {
    return $('#tipo').val() === 'TRANSFERENCIA';
}

function agregarDetalle() {
    mmLimpiar();
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val('');
    $("#item_descripcion").val('');
    $("#nota_remi_com_det_cantidad").val('').prop('disabled', true);

    // Cargar depósitos filtrados por sucursal origen
    cargarDepositosPorSucursal($('#sucursal_id').val(), '#deposito_id_det', null);
    $('#deposito_id_det').removeAttr('disabled');

    if (esTransferencia()) {
        // En transferencia, ítem deshabilitado hasta elegir depósito origen
        $('#item_descripcion').prop('disabled', true);
        cargarDepositosPorSucursal($('#sucursal_destino_id').val(), '#deposito_destino_id_det', null);
        $('#deposito_destino_id_det').removeAttr('disabled');

        // Al elegir depósito origen → habilitar búsqueda de ítem filtrada
        $('#deposito_id_det').off('change.remi').on('change.remi', function() {
            $('#item_id').val('');
            $('#item_descripcion').val('');
            if ($(this).val()) {
                $('#item_descripcion').removeAttr('disabled');
            } else {
                $('#item_descripcion').prop('disabled', true);
            }
        });
    } else {
        $('#item_descripcion').removeAttr('disabled');
    }

    mostrarBotonesDetalle('grabar');
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr('disabled');
    $("#nota_remi_com_det_cantidad").removeAttr('disabled');

    var currentOrigen  = $('#deposito_id_det').val();
    var currentDestino = $('#deposito_destino_id_det').val();
    cargarDepositosPorSucursal($('#sucursal_id').val(), '#deposito_id_det', currentOrigen);
    $('#deposito_id_det').removeAttr('disabled');

    if (esTransferencia()) {
        cargarDepositosPorSucursal($('#sucursal_destino_id').val(), '#deposito_destino_id_det', currentDestino);
        $('#deposito_destino_id_det').removeAttr('disabled');
    }

    $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    mostrarBotonesDetalle('grabar');
}

function eliminarDetalle() {
    $("#txtOperacionDetalle").val(3);
    mostrarBotonesDetalle('grabar');
}

function cancelarDetalle() {
    mmLimpiar();
    var labelOrigen = esTransferencia() ? '-- Depósito Origen --' : '-- Depósito --';
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val('');
    $("#item_descripcion").val('').prop('disabled', true);
    $("#nota_remi_com_det_cantidad").val('').prop('disabled', true);
    $('#stock_disponible_det').val(0);
    $('#avisoStockDet').remove();
    $('#nota_remi_com_det_cantidad').css('border-color', '').off('input.stock');
    $('#btnGrabarDetalle').prop('disabled', false);
    $("#listaProductos").html('').hide();
    $('#deposito_id_det').html('<option value="">' + labelOrigen + '</option>').prop('disabled', true);
    $('#deposito_destino_id_det').html('<option value="">-- Depósito Destino --</option>').prop('disabled', true);
    mostrarBotonesDetalle('normal');
}

function grabarDetalle() {
    var cantidad = parseFloat($("#nota_remi_com_det_cantidad").val());

    if (!$('#item_id').val()) {
        swal('Error', 'Seleccione un ítem.', 'error'); return;
    }
    if (isNaN(cantidad) || cantidad <= 0) {
        swal('Error', 'La cantidad debe ser mayor a cero.', 'error'); return;
    }
    if (!$('#deposito_id_det').val()) {
        swal('Error', 'Seleccione el depósito' + (esTransferencia() ? ' origen.' : '.'), 'error'); return;
    }
    if (esTransferencia()) {
        if (!$('#deposito_destino_id_det').val()) {
            swal('Error', 'Seleccione el depósito destino.', 'error'); return;
        }
        if ($('#deposito_id_det').val() === $('#deposito_destino_id_det').val()) {
            swal('Error', 'El depósito origen y el destino no pueden ser el mismo.', 'error'); return;
        }
        var stockDisponible = parseFloat($('#stock_disponible_det').val()) || 0;
        if (cantidad > stockDisponible) {
            swal('Error', 'La cantidad (' + cantidad + ') supera el stock disponible en el depósito origen (' + stockDisponible + ').', 'error'); return;
        }
    }

    var oper = parseInt($("#txtOperacionDetalle").val());
    var endpoint = 'notaremicomdet/create';
    var metodo   = 'POST';

    if (oper === 2) { endpoint = 'notaremicomdet/update/' + $("#id").val(); metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'notaremicomdet/delete/' + $("#id").val() + '/' + $("#item_id").val(); metodo = 'DELETE'; }

    $.ajax({
        url: getUrl() + endpoint, method: metodo, dataType: 'json',
        data: {
            'nota_remi_comp_id':          $("#id").val(),
            'item_id':                    $("#item_id").val(),
            'nota_remi_com_det_cantidad': cantidad,
            'deposito_id':                $("#deposito_id_det").val() || null,
            'deposito_destino_id':        esTransferencia() ? ($("#deposito_destino_id_det").val() || null) : null,
            'marca_id':                   _mmMarcaId ? parseInt(_mmMarcaId) : null,
            'modelo_id':                  _mmModeloId ? parseInt(_mmModeloId) : null
        }
    })
    .done(function() { listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });

    // Limpiar formulario
    cancelarDetalle();
}

function listarDetalles() {
    var es = esTransferencia();
    $.ajax({ url: getUrl() + 'notaremicomdet/read/' + $("#id").val(), method: 'GET', dataType: 'json' })
    .done(function(resultado) {
        var lista = '';
        var cantidadDetalle = 0;

        if (es) {
            $('#thDepositoDestino').show();
        } else {
            $('#thDepositoDestino').hide();
        }

        for (var rs of resultado) {
            lista += '<tr class="item-list" onclick="seleccionDetalle('
                + rs.item_id + ",'"
                + rs.item_descripcion + "',"
                + rs.nota_remi_com_det_cantidad + ','
                + (rs.deposito_id || 0) + ','
                + (rs.deposito_destino_id || 0) + ','
                + (rs.marca_id || 0) + ','
                + (rs.modelo_id || 0)
                + ');">';
            lista += '<td>' + rs.item_id + '</td>';
            lista += '<td>' + rs.item_descripcion + '</td>';
            lista += '<td>' + (rs.mar_nom || '-') + '</td>';
            lista += '<td>' + (rs.modelo_nom || '-') + '</td>';
            lista += '<td>' + rs.nota_remi_com_det_cantidad + '</td>';
            lista += '<td>' + (rs.dep_origen_nombre || '-') + '</td>';
            if (es) lista += '<td>' + (rs.dep_destino_nombre || '-') + '</td>';
            lista += '</tr>';
            cantidadDetalle++;
        }

        if (!lista) lista = '<tr><td colspan="' + (es ? 7 : 6) + '" class="text-center text-muted">Sin ítems</td></tr>';
        $('#tableDetalle').html(lista);

        if ($('#nota_remi_estado').val() === 'PENDIENTE' && cantidadDetalle > 0) {
            $('#btnConfirmar').removeAttr('disabled');
        } else {
            $('#btnConfirmar').attr('disabled', true);
        }
    })
    .fail(function(xhr) { console.error(xhr.responseText); });
}

function seleccionDetalle(item_id, item_descripcion, cantidad, deposito_id, deposito_destino_id, marca_id, modelo_id) {
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#nota_remi_com_det_cantidad").val(cantidad);

    // Cargar y preseleccionar depósito origen
    cargarDepositosPorSucursal($('#sucursal_id').val(), '#deposito_id_det', deposito_id);

    if (esTransferencia()) {
        cargarDepositosPorSucursal($('#sucursal_destino_id').val(), '#deposito_destino_id_det', deposito_destino_id);
    }

    mmAutocompletar(item_id, marca_id, modelo_id);
    $("#listaProductos").html('').hide();
    $(".form-line").addClass("focused");
}

function mostrarBotonesDetalle(modo) {
    if (modo === 'grabar') {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').hide();
        $('#btnGrabarDetalle, #btnCancelarDetalle').show();
    } else {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').show();
        $('#btnGrabarDetalle, #btnCancelarDetalle').hide();
    }
}

// ─── BÚSQUEDA DE PRODUCTOS ───────────────────────────────────────────────────
function buscarProductos() {
    var q = $("#item_descripcion").val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }

    if (esTransferencia() && !$('#deposito_id_det').val()) {
        swal('Aviso', 'Seleccione el depósito origen antes de buscar ítems.', 'warning');
        return;
    }

    var data = { item_descripcion: q };
    if (esTransferencia()) data.deposito_id = $('#deposito_id_det').val();

    buscarConDebounce('prod', function() {
        $.ajax({ url: getUrl() + 'items/buscar', method: 'POST', dataType: 'json', data: data })
        .done(function(resultado) {
            if (resultado.length === 0 && esTransferencia()) {
                $('#listaProductos').html('<ul class="list-group"><li class="list-group-item text-muted">Sin stock en este depósito</li></ul>')
                    .attr('style', 'display:block; position:absolute; z-index:2000;');
                return;
            }
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += '<li class="list-group-item" onclick="seleccionProducto('
                    + rs.item_id + ",'" + rs.item_descripcion + "'," + stock + ')">'
                    + rs.item_descripcion
                    + ' <span class="badge" style="background:#3b82f6;color:#fff;">Stock: ' + stock + '</span>'
                    + '</li>';
            });
            lista += '</ul>';
            $('#listaProductos').html(lista).attr('style', 'display:block; position:absolute; z-index:2000;');
        });
    });
}

function seleccionProducto(item_id, item_descripcion, cantidad_disponible) {
    $('#item_id').val(item_id);
    $('#item_descripcion').val(item_descripcion);
    $('#stock_disponible_det').val(cantidad_disponible || 0);
    $('#nota_remi_com_det_cantidad').removeAttr('disabled').off('input.stock').on('input.stock', function() {
        validarCantidadStock();
    });
    mmCargarMarcas(item_id, null);
    $('#marca_det_mm').removeAttr('disabled');
    $('#listaProductos').html('').hide();
    $(".form-line").addClass("focused");
}

function validarCantidadStock() {
    if (!esTransferencia()) return;
    var campo = $('#nota_remi_com_det_cantidad');
    var cantidad = parseFloat(campo.val());
    var stock = parseFloat($('#stock_disponible_det').val()) || 0;
    var aviso = $('#avisoStockDet');

    if (!isNaN(cantidad) && cantidad > stock) {
        campo.css('border-color', '#e74c3c');
        if (aviso.length === 0) {
            campo.after('<small id="avisoStockDet" style="color:#e74c3c;">Stock disponible: ' + stock + '</small>');
        }
        $('#btnGrabarDetalle').prop('disabled', true);
    } else {
        campo.css('border-color', '');
        aviso.remove();
        $('#btnGrabarDetalle').prop('disabled', false);
    }
}

// ─── IMPRIMIR ─────────────────────────────────────────────────────────────────
function imprimirNota() {
    var id              = $('#id').val();
    var empresa         = $('#emp_razon_social').val();
    var sucOrigen       = $('#suc_razon_social').val();
    var sucDestino      = $('#suc_destino_razon_social').val();
    var fecha           = $('#nota_remi_fecha').val();
    var observaciones   = $('#nota_remi_observaciones').val();
    var estado          = $('#nota_remi_estado').val();
    var funcionario     = '';

    $.get(getUrl() + 'notaremicomdet/read/' + id, function(detalles) {
        var filas = '';
        detalles.forEach(function(d, i) {
            filas += '<tr>'
                + '<td style="text-align:center;">' + (i + 1) + '</td>'
                + '<td>' + d.item_descripcion + '</td>'
                + '<td style="text-align:center;">' + d.nota_remi_com_det_cantidad + '</td>'
                + '<td style="text-align:center;">' + (d.dep_origen_nombre || '-') + '</td>'
                + '<td style="text-align:center;">' + (d.dep_destino_nombre || '-') + '</td>'
                + '</tr>';
        });

        var badgeEstado = estado === 'CONFIRMADO'
            ? '<span style="background:#27ae60;color:#fff;padding:3px 10px;border-radius:4px;">CONFIRMADO</span>'
            : '<span style="background:#e67e22;color:#fff;padding:3px 10px;border-radius:4px;">' + estado + '</span>';

        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
            + '<title>Nota de Remisión #' + id + '</title>'
            + '<style>'
            + 'body { font-family: Arial, sans-serif; font-size: 12px; margin: 20px; color: #333; }'
            + 'h1 { font-size: 18px; text-align: center; margin: 0; }'
            + 'h2 { font-size: 13px; text-align: center; color: #555; margin: 4px 0 16px; }'
            + '.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }'
            + '.campo label { font-weight: bold; font-size: 10px; text-transform: uppercase; color: #888; display: block; }'
            + '.campo span { font-size: 13px; }'
            + '.flecha { text-align: center; font-size: 22px; color: #2980b9; margin: 4px 0 12px; }'
            + 'table { width: 100%; border-collapse: collapse; margin-top: 12px; }'
            + 'th { background: #2c3e50; color: #fff; padding: 7px; text-align: left; font-size: 11px; }'
            + 'td { padding: 6px; border-bottom: 1px solid #eee; }'
            + 'tr:nth-child(even) td { background: #f9f9f9; }'
            + '.firmas { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 50px; }'
            + '.firma { text-align: center; border-top: 1px solid #333; padding-top: 6px; font-size: 11px; }'
            + '.footer { margin-top: 30px; text-align: center; font-size: 10px; color: #aaa; }'
            + '@media print { button { display: none; } }'
            + '</style></head><body>'

            + '<h1>NOTA DE REMISIÓN — TRANSFERENCIA INTERNA</h1>'
            + '<h2>' + empresa + '</h2>'
            + '<div style="text-align:center;margin-bottom:12px;">' + badgeEstado + '&nbsp;&nbsp;N° <strong>' + String(id).padStart(7,'0') + '</strong></div>'

            + '<div class="grid">'
            + '<div class="campo"><label>Sucursal Origen</label><span>' + sucOrigen + '</span></div>'
            + '<div class="campo"><label>Sucursal Destino</label><span>' + sucDestino + '</span></div>'
            + '<div class="campo"><label>Fecha de Registro</label><span>' + fecha + '</span></div>'
            + '<div class="campo"><label>Observaciones</label><span>' + (observaciones || '—') + '</span></div>'
            + '</div>'

            + '<div class="flecha">▼ ' + sucOrigen + ' &nbsp;→&nbsp; ' + sucDestino + ' ▼</div>'

            + '<table>'
            + '<thead><tr>'
            + '<th>#</th><th>Producto</th><th>Cantidad</th><th>Depósito Origen</th><th>Depósito Destino</th>'
            + '</tr></thead>'
            + '<tbody>' + filas + '</tbody>'
            + '</table>'

            + '<div class="firmas">'
            + '<div class="firma">Elaborado por</div>'
            + '<div class="firma">Entregado por</div>'
            + '<div class="firma">Recibido por</div>'
            + '</div>'

            + '<div class="footer">Impreso el ' + new Date().toLocaleString('es-PY') + '</div>'
            + '<script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; };<\/script>'
            + '</body></html>';

        var ventana = window.open('', '_blank', 'width=800,height=700');
        ventana.document.write(html);
        ventana.document.close();
    });
}

// ─── DEBOUNCE HELPER ─────────────────────────────────────────────────────────
var _timers = {};
function buscarConDebounce(key, fn) {
    clearTimeout(_timers[key]);
    _timers[key] = setTimeout(fn, 300);
}

// ─── EMPRESA / SUCURSAL ──────────────────────────────────────────────────────
function buscarProveedores() {
    var q = $('#prov_razonsocial').val();
    if (q.length < 2) { $('#listaProveedores').html('').hide(); return; }
    buscarConDebounce('prov', function() {
        $.ajax({ url: getUrl() + 'proveedores/buscar', method: 'POST', dataType: 'json',
                 data: { prov_razonsocial: q } })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var label = rs.prov_razonsocial + (rs.prov_ruc ? ' — ' + rs.prov_ruc : '');
                lista += '<li class="list-group-item" onclick="seleccionProveedor('
                    + rs.id + ',\'' + rs.prov_razonsocial + '\',\'' + (rs.prov_ruc||'') + '\',\'' + (rs.prov_telefono||'') + '\')">'
                    + label + '</li>';
            });
            lista += '</ul>';
            $('#listaProveedores').html(lista).attr('style', 'display:block; position:absolute; z-index:2000;');
        });
    });
}

function seleccionProveedor(id, razonsocial, ruc, telefono) {
    $('#proveedor_id').val(id);
    $('#prov_razonsocial').val(razonsocial);
    $('#prov_ruc').val(ruc);
    $('#prov_telefono').val(telefono);
    $('#listaProveedores').html('').hide();
    $(".form-line").addClass("focused");
}

function buscarEmpresas() {
    $.get(getUrl() + 'empresa/read', function(resultado) {
        if (resultado.length > 0) {
            var e = resultado[0];
            $('#empresa_id').val(e.id);
            $('#emp_razon_social').val(e.emp_razon_social);
        }
    });
}

function buscarSucursal() {
    buscarConDebounce('suc', function() {
        $.ajax({ url: getUrl() + 'sucursal/read', method: 'GET', dataType: 'json' })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                lista += '<li class="list-group-item" onclick="seleccionSucursal('
                    + rs.id + ",'" + rs.suc_razon_social + "')\">" + rs.suc_razon_social + '</li>';
            });
            lista += '</ul>';
            $('#listaSucursal').html(lista).attr('style', 'display:block; position:absolute; z-index:2000;');
        });
    });
}

function seleccionSucursal(id, suc_razon_social) {
    $('#sucursal_id').val(id);
    $('#suc_razon_social').val(suc_razon_social);
    $('#listaSucursal').html('').hide();
    if (esTransferencia()) {
        $('#sucursal_destino_id').val('');
        $('#suc_destino_razon_social').val('').prop('disabled', false);
        cargarTimbradoRemi();
    }
}

function cargarTimbradoRemi() {
    var empId = $('#empresa_id').val();
    var sucId = $('#sucursal_id').val();
    if (!empId || !sucId) return;

    $.ajax({
        url: getUrl() + 'timbrado/para-ventas',
        method: 'GET',
        data: { empresa_id: empId, sucursal_id: sucId, tipo_documento: 'nota_remision_comp' }
    })
    .done(function(res) {
        $('#timbrado_id_remi').val(res.timbrado_id);
        $('#tim_numero_remi').val(res.tim_numero);
        $('#nota_remi_nro_preview').val(res.nro_formateado || res.nro_comprobante);
        $('#tim_vence_remi').val(res.tim_fecha_fin ? res.tim_fecha_fin.substring(0,10) : '—');
        if (res.nros_restantes <= 10) {
            swal('Atención', 'El timbrado tiene solo ' + res.nros_restantes + ' números restantes.', 'warning');
        }
    })
    .fail(function() {
        $('#timbrado_id_remi').val('');
        $('#tim_numero_remi').val('Sin timbrado activo');
        $('#nota_remi_nro_preview').val('');
        $('#tim_vence_remi').val('—');
    });
}

function buscarSucursalDestino() {
    var origenId = $('#sucursal_id').val();
    buscarConDebounce('sucDest', function() {
        $.ajax({ url: getUrl() + 'sucursal/read', method: 'GET', dataType: 'json' })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.filter(function(rs) { return String(rs.id) !== String(origenId); })
                .forEach(function(rs) {
                    lista += '<li class="list-group-item" onclick="seleccionSucursalDestino('
                        + rs.id + ",'" + rs.suc_razon_social + "')\">" + rs.suc_razon_social + '</li>';
                });
            lista += '</ul>';
            $('#listaSucursalDestino').html(lista).attr('style', 'display:block; position:absolute; z-index:2000;');
        });
    });
}

function seleccionSucursalDestino(id, suc_razon_social) {
    $('#sucursal_destino_id').val(id);
    $('#suc_destino_razon_social').val(suc_razon_social);
    $('#listaSucursalDestino').html('').hide();
}

