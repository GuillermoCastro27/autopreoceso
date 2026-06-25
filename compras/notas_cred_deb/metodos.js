var _notaRows = {};
var _detRows  = {};

cargarFuncionarioIdLogueado();
listar();
campoFecha();

$(document).on('click', '.item-list', function() {
    var id = $(this).attr('data-nota-id');
    var d = _notaRows[id];
    if (!d) return;
    seleccionNotaComp(
        d.id, d.proveedor_id, d.empresa_id, d.sucursal_id, d.compra_cab_id,
        d.emp_razon_social||'', d.suc_razon_social||'', d.compra||'',
        d.nota_comp_intervalo_fecha_vence||'', d.nota_comp_fecha||'',
        d.nota_comp_estado||'', d.nota_comp_cant_cuota||'', d.nota_comp_tipo||'',
        d.nota_comp_observaciones||'', d.funcionario||'', d.prov_razonsocial||'',
        d.prov_ruc||'', d.prov_telefono||'', d.prov_correo||'',
        d.nota_comp_condicion_pago||'', d.nota_comp_timbrado||'', d.comp_timbrado||'',
        d.nota_comp_nro_nota||'', d.comp_nro_factura||'',
        d.nota_comp_afecta_stock ? 1 : 0,
        d.nota_comp_motivo||'', d.nota_comp_timbrado_vence||''
    );
});

$(document).on('click', '.nota-det-item', function() {
    var idx = $(this).attr('data-det-id');
    var r = _detRows[idx];
    if (!r) return;
    var _modNom = r.modelo_nom ? r.modelo_nom + (r.modelo_año ? ' (' + r.modelo_año + ')' : '') : '';
    seleccionDetalle(
        r.item_id, r.tipo_impuesto_id, r.item_descripcion||'', r.tipo_imp_nom||'',
        r.notas_comp_det_cantidad||0, r.notas_comp_det_costo||0,
        r.deposito_id||0, r.stock_disponible||0,
        r.marca_id||0, r.modelo_id||0,
        r.dep_nombre||'', r.mar_nom||'', _modNom
    );
});

var listaDepositos = [];
function cargarDepositos() {
    $.ajax({ url: getUrl()+'deposito/read', method:'GET', dataType:'json', success:function(data){ listaDepositos=data; } });
}
cargarDepositos();
function getSelectDeposito(id_sel) {
    var opts = '<option value="">-- Depósito --</option>';
    listaDepositos.forEach(function(d){ opts += '<option value="'+d.id+'"'+(d.id==id_sel?' selected':'')+'>'+d.dep_nombre+'</option>'; });
    return opts;
}
function getNombreDeposito(id) {
    var d = listaDepositos.find(function(x){ return x.id==id; });
    return d ? d.dep_nombre : '-';
}

// Configura el formato de la tabla para exportar en diferentes formatos
function formatoTabla(){
    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Listado de Notas de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Notas de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Notas de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Notas de Compras'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}
// Función para recargar la página y cancelar operaciones.
function cancelar(){
    location.reload(true);
}

// Prepara el formulario para agregar un nuevo presupuesto.
function setAfectaStock(valor) {
    $('#nota_comp_afecta_stock').val(valor ? '1' : '0');
    if (valor) {
        $('#btnAfectaSi').addClass('active btn-success').removeClass('btn-default');
        $('#btnAfectaNo').removeClass('active btn-success').addClass('btn-default');
    } else {
        $('#btnAfectaNo').addClass('active btn-danger').removeClass('btn-default');
        $('#btnAfectaSi').removeClass('active btn-success').addClass('btn-default');
    }
}

function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#nota_comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#nota_comp_fecha").removeAttr("disabled");
    $("#nota_comp_cant_cuota").attr("disabled", "true");
    $("#compra_cab").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#nota_comp_condicion_pago").attr("disabled", "true");
    $("#suc_razon_social").attr("disabled", "true");
    $("#nota_comp_tipo").removeAttr("disabled");
    $("#nota_comp_observaciones").removeAttr("disabled");
    $("#nota_comp_motivo").removeAttr("disabled");
    $("#nota_comp_timbrado").removeAttr("disabled");
    $("#nota_comp_timbrado_vence").removeAttr("disabled");
    $("#nota_comp_nro_nota").removeAttr("disabled");
    // Habilitar toggle y resetear a Sí (default)
    $('#btnAfectaSi, #btnAfectaNo').removeAttr('disabled');
    setAfectaStock(true);

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);

    $("#nota_comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#nota_comp_fecha").removeAttr("disabled");
    $("#nota_comp_cant_cuota").attr("disabled", "true");
    $("#compra_cab").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#nota_comp_condicion_pago").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", "true");
    $("#nota_comp_tipo").removeAttr("disabled");
    $("#nota_comp_observaciones").removeAttr("disabled");
    $("#nota_comp_motivo").removeAttr("disabled");
    $("#nota_comp_timbrado").removeAttr("disabled");
    $("#nota_comp_timbrado_vence").removeAttr("disabled");
    $("#nota_comp_nro_nota").removeAttr("disabled");
    $('#btnAfectaSi, #btnAfectaNo').removeAttr('disabled');

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

// Prepara el formulario para eliminar un presupuesto.
function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para confirmar un presupuesto.
function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Muestra un cuadro de diálogo para confirmar la operación antes de realizarla.
function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIRMAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
    }
    swal({
        title: titulo,
        text: pregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#458E49",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () {
        grabar();
    });
}

// Muestra un mensaje de operación con SweetAlert.
function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}

// Obtiene y muestra la lista de pedidos mediante una solicitud AJAX.
function listar() { 
    $.ajax({
        url: getUrl() + "notacompcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        _notaRows = {};
        for (rs of resultado) {
            _notaRows[rs.id] = rs;
            lista += '<tr class="item-list" data-nota-id="' + rs.id + '">';
            lista += "<td>" + rs.id + "</td>";  // Código de la orden de compra
            lista += "<td>" + rs.nota_comp_intervalo_fecha_vence + "</td>";  // Intervalo de fecha de vencimiento
            lista += "<td>" + rs.nota_comp_fecha + "</td>";  // Fecha
            lista += "<td>" + rs.compra + "</td>";  // Compra
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";  // Encargado
            lista += "<td>" + rs.nota_comp_cant_cuota + "</td>";  // Cantidad de cuota
            lista += "<td>" + rs.nota_comp_tipo + "</td>";
            lista += "<td>" + (rs.nota_comp_motivo || '-') + "</td>";
            lista += "<td>" + (rs.nota_comp_observaciones || '-') + "</td>";
            lista += "<td>" + rs.nota_comp_estado + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })    
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// Rellena el formulario con los datos de un pedido seleccionado.
function seleccionNotaComp(id_nota_compra_cab, proveedor_id, empresa_id, sucursal_id, compra_cab_id, emp_razon_social, suc_razon_social, compra_cab, nota_comp_intervalo_fecha_vence, nota_comp_fecha, nota_comp_estado, nota_comp_cant_cuota, nota_comp_tipo, nota_comp_observaciones, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, nota_comp_condicion_pago, nota_comp_timbrado, comp_timbrado, nota_comp_nro_nota, comp_nro_factura, nota_comp_afecta_stock, nota_comp_motivo, nota_comp_timbrado_vence) {
    // Asigna los valores al formulario
    $("#id").val(id_nota_compra_cab);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#compra_cab_id").val(compra_cab_id);
    $("#proveedor_id").val(proveedor_id);
    $("#nota_comp_intervalo_fecha_vence").val(nota_comp_intervalo_fecha_vence);
    $("#nota_comp_fecha").val(nota_comp_fecha);
    $("#nota_comp_cant_cuota").val(nota_comp_cant_cuota);
    $("#nota_comp_tipo").val(nota_comp_tipo);
    $("#nota_comp_observaciones").val(nota_comp_observaciones);
    $("#nota_comp_motivo").val(nota_comp_motivo || '');
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#compra_cab").val(compra_cab);
    $("#nota_comp_estado").val(nota_comp_estado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#encargado").val(encargado);
    $("#nota_comp_timbrado").val(nota_comp_timbrado || '');
    $("#nota_comp_timbrado_vence").val(nota_comp_timbrado_vence || '');
    $("#nota_comp_nro_nota").val(nota_comp_nro_nota || '');
    $("#comp_timbrado").val(comp_timbrado || '');
    $("#comp_nro_factura").val(comp_nro_factura || '');
    // Cargar toggle Afecta Stock (deshabilitar — solo lectura al visualizar)
    setAfectaStock(nota_comp_afecta_stock == '1' || nota_comp_afecta_stock === true);
    $('#btnAfectaSi, #btnAfectaNo').attr('disabled', true);

    // Asignar la condición de pago (CONTADO o CRÉDITO)
    $("#nota_comp_condicion_pago").val(nota_comp_condicion_pago);

    // Mostrar/ocultar secciones según sea necesario
    $("#registros").attr("style", "display:none;");
    $("#detalle").attr("style", "display:block;");
    $("#formDetalles").attr("style", "display:none;");
    listarDetalles();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");

    if(nota_comp_estado === "PENDIENTE"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
        mostrarBotonesDetNota('normal');
    }

    if(nota_comp_estado === "CONFIRMADO"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        $("#btnEditar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}

// Realiza operaciones de creación, edición, anulacion y confirmación de un pedido
function grabar() {
    var endpoint = "notacompcab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    // Lógica para cambiar el endpoint y el método según la operación
    if ($("#txtOperacion").val() == 2) {
        endpoint = "notacompcab/update/" + $("#id").val();
        metodo = "PUT";
    } else if ($("#txtOperacion").val() == 3) {
        endpoint = "notacompcab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    } else if ($("#txtOperacion").val() == 4) {
        endpoint = "notacompcab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    // Obtener el valor de condicion_pago
    var condicionPago = $("#nota_comp_condicion_pago").val();

    // Obtener y formatear la fecha de vencimiento
    var intervaloFechaVence = $.trim($("#nota_comp_intervalo_fecha_vence").val());
    var formattedIntervaloFechaVence = null;
    if (condicionPago !== 'CONTADO' && !$("#nota_comp_intervalo_fecha_vence").is(':disabled') && intervaloFechaVence) {
        var mIFV = moment(intervaloFechaVence, 'DD/MM/YYYY HH:mm', true);
        formattedIntervaloFechaVence = mIFV.isValid() ? mIFV.format('YYYY-MM-DD HH:mm:ss') : intervaloFechaVence;
    }

    // ── Validaciones agrupadas ──────────────────────────────────────────────
    var errores = [];

    // Fecha (debe ser hoy)
    var fechaVal = $('#nota_comp_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, FMT_NOTA, true);
        if (!mFecha.isValid()) errores.push('El formato de la fecha es inválido.');
        else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day')))
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
    }

    if (!$('#nota_comp_motivo').val().trim()) errores.push('El motivo de la nota es obligatorio.');
    if (!$('#nota_comp_tipo').val())          errores.push('Seleccione el tipo de nota (Crédito/Débito).');

    // Vencimiento timbrado
    var timbradoNota      = $.trim($('#nota_comp_timbrado').val());
    var timbradoVenceNota = $.trim($('#nota_comp_timbrado_vence').val());
    if (timbradoNota && !timbradoVenceNota) {
        errores.push('La fecha de vencimiento del timbrado es obligatoria cuando se ingresa un timbrado.');
    } else if (timbradoVenceNota) {
        var mTV = moment(timbradoVenceNota, 'DD/MM/YYYY', true);
        if (!mTV.isValid()) {
            errores.push('La fecha de vencimiento del timbrado tiene formato inválido. Use DD/MM/YYYY.');
        } else if (mTV.isBefore(moment(), 'day')) {
            errores.push('La fecha de vencimiento del timbrado no puede ser anterior a hoy.');
        }
    }
    if (!$('#compra_cab_id').val() || $('#compra_cab_id').val() == '0')
        errores.push('Debe seleccionar la compra relacionada.');

    // Nro. nota: si tiene valor, validar formato
    var nroNota = $.trim($('#nota_comp_nro_nota').val());
    if (nroNota && !/^\d{3}-\d{3}-\d{7}$/.test(nroNota))
        errores.push('El Nro. de Nota debe tener el formato 000-000-0000000.');

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id': $("#id").val(),
            'nota_comp_intervalo_fecha_vence': formattedIntervaloFechaVence,
            'nota_comp_fecha': (function(){
                var v = $.trim($("#nota_comp_fecha").val());
                var m = moment(v, 'DD/MM/YYYY HH:mm', true);
                return m.isValid() ? m.format('YYYY-MM-DD HH:mm:ss') : v;
            })(),
            'nota_comp_cant_cuota': condicionPago === 'CONTADO' ? null : $("#nota_comp_cant_cuota").val(),
            'nota_comp_tipo': $("#nota_comp_tipo").val(),
            'nota_comp_afecta_stock':   $('#nota_comp_afecta_stock').val() === '1' ? 1 : 0,
            'nota_comp_observaciones': $("#nota_comp_observaciones").val() || null,
            'nota_comp_motivo': $("#nota_comp_motivo").val(),
            'nota_comp_timbrado': $("#nota_comp_timbrado").val() || null,
            'nota_comp_timbrado_vence': timbradoVenceNota
                ? moment(timbradoVenceNota, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            'nota_comp_nro_nota': $("#nota_comp_nro_nota").val() || null,
            'funcionario_id': $("#funcionario_id").val(),
            'compra_cab_id': $("#compra_cab_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'nota_comp_condicion_pago': condicionPago,
            'nota_comp_estado': estado,
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                $("#formDetalles").attr("style","display:block;");
                mostrarBotonesDetNota('normal');
                listarDetalles();
                if(resultado.registro.nota_comp_estado!="PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a) { mostrarErrores(a); });
}


// Configura el formato de fecha en ciertos campos usando BootstrapMaterialDatePicker.
// ─── HELPERS ─────────────────────────────────────────────────────────────────
function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';
    if (res && res.errors) {
        var lineas = [];
        $.each(res.errors, function(k, v) { lineas.push('• ' + (Array.isArray(v) ? v[0] : v)); });
        msg = lineas.join('\n');
    } else if (res && res.mensaje) { msg = res.mensaje; }
    else { msg = 'Ocurrió un error inesperado.'; }
    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
}

var FMT_NOTA = 'DD/MM/YYYY HH:mm';

function validarFechaNota() {
    var val = $('#nota_comp_fecha').val().trim();
    var aviso = $('#avisoFechaNota');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, FMT_NOTA, true);
    if (!m.isValid()) {
        $('#nota_comp_fecha').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
    } else if (!m.clone().startOf('day').isSame(moment().startOf('day'))) {
        $('#nota_comp_fecha').css('border-color','#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#nota_comp_fecha').css('border-color',''); aviso.hide();
    }
}

function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        clearButton: true,
        weekStart: 1
    });
    $('#nota_comp_timbrado_vence').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY', time: false, clearButton: true, weekStart: 1
    });
    $('#nota_comp_fecha').on('change', function() { validarFechaNota(); });
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function autoFormatoFactura(input) {
    var digits = input.value.replace(/\D/g, '').slice(0, 13);
    var formatted = digits;
    if (digits.length > 6) {
        formatted = digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6);
    } else if (digits.length > 3) {
        formatted = digits.slice(0,3) + '-' + digits.slice(3);
    }
    input.value = formatted;
}


// ─── HELPERS DETALLE ─────────────────────────────────────────────────────────
var _timersNota = {};
function debounceNota(key, fn) { clearTimeout(_timersNota[key]); _timersNota[key] = setTimeout(fn, 300); }

function mostrarBotonesDetNota(modo) {
    if (modo === 'grabar') {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').hide();
        $('#btnGrabarDetalle, #btnCancelarDetalle').show();
    } else {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').show();
        $('#btnGrabarDetalle, #btnCancelarDetalle').hide();
    }
}

function cargarDepositosNota(selected_id) {
    var sucId = $('#sucursal_id').val();
    if (!sucId) return;
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucId, function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selected_id ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        $('#deposito_id_det').html(opts);
    });
}

function validarCantidadNota() {
    var nota_tipo = $('#nota_comp_tipo').val();
    if (nota_tipo !== 'Crédito') return; // Solo validar stock en NC
    var cant  = parseFloat($('#notas_comp_det_cantidad').val());
    var stock = parseFloat($('#stock_disponible_det').val()) || 0;
    if (!isNaN(cant) && cant > stock) {
        $('#notas_comp_det_cantidad').css('border-color','#e74c3c');
        $('#avisoStockNota').text('Stock disponible: ' + stock).show();
        $('#btnGrabarDetalle').prop('disabled', true);
    } else {
        $('#notas_comp_det_cantidad').css('border-color','');
        $('#avisoStockNota').hide();
        $('#btnGrabarDetalle').prop('disabled', false);
    }
}

function cancelarDetalle() {
    mmLimpiar();
    $('#txtOperacionDetalle').val(0);
    $('#item_id').val('');
    $('#item_descripcion').val('').prop('disabled', true);
    $('#notas_comp_det_cantidad').val('').prop('disabled', true).css('border-color','');
    $('#item_costo').val('').prop('disabled', true);
    $('#tipo_imp_nom_det').val('').prop('disabled', true);
    $('#tipo_impuesto_id').val('');
    $('#stock_disponible_det').val(0);
    $('#avisoStockNota').hide();
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();
    mostrarBotonesDetNota('normal');
}

function agregarDetalle() {
    cancelarDetalle();
    $('#txtOperacionDetalle').val(1);
    $('#item_descripcion').removeAttr('disabled');
    $('#notas_comp_det_cantidad').removeAttr('disabled');
    $('#item_costo').removeAttr('disabled');
    $('#tipo_imp_nom_det').removeAttr('disabled');
    cargarDepositosNota(null);
    // Depósito: solo visualización, no editable
    $('#deposito_id_det').prop('disabled', true);
    mostrarBotonesDetNota('grabar');
}

function editarDetalle() {
    $('#txtOperacionDetalle').val(2);
    $('#item_descripcion').removeAttr('disabled');
    $('#notas_comp_det_cantidad').removeAttr('disabled');
    $('#item_costo').removeAttr('disabled');
    $('#tipo_imp_nom_det').removeAttr('disabled');
    cargarDepositosNota($('#deposito_id_det').val());
    $('#deposito_id_det').prop('disabled', true);
    var itemId = $('#item_id').val();
    if (itemId && _mmMarcaId) {
        mmCargarMarcas(itemId, _mmMarcaId);
        if (_mmModeloId) setTimeout(function(){ mmCargarModelos(itemId, _mmMarcaId, _mmModeloId); }, 350);
    } else {
        $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    }
    mostrarBotonesDetNota('grabar');
}

function eliminarDetalle() {
    $('#txtOperacionDetalle').val(3);
    mostrarBotonesDetNota('grabar');
}

function grabarDetalle() {
    var oper    = parseInt($('#txtOperacionDetalle').val());
    var itemId  = $.trim($('#item_id').val());
    var cantidad = $.trim($('#notas_comp_det_cantidad').val()).replace(/\./g,'').replace(',','.');
    var costo    = $.trim($('#item_costo').val()).replace(/\./g,'').replace(',','.');

    var errores = [];
    if (oper !== 3) {
        if (!itemId)                             errores.push('Seleccione un ítem.');
        if (!cantidad || isNaN(cantidad) || parseFloat(cantidad) <= 0) errores.push('Cantidad inválida.');
        if (!costo    || isNaN(costo))           errores.push('Costo inválido.');
        if (!$('#tipo_impuesto_id').val())        errores.push('El ítem debe tener tipo de impuesto.');
        var nota_tipo = $('#nota_comp_tipo').val();
        if (nota_tipo === 'Crédito') {
            var stock = parseFloat($('#stock_disponible_det').val()) || 0;
            if (parseFloat(cantidad) > stock) errores.push('La cantidad supera el stock disponible (' + stock + ').');
        }
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• ' + e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = 'notacompdet/create';
    var metodo   = 'POST';
    if (oper === 2) { endpoint = 'notacompdet/update/' + $('#id').val() + '/' + itemId; metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'notacompdet/delete/' + $('#id').val() + '/' + itemId; metodo = 'DELETE'; }

    $.ajax({
        url: getUrl() + endpoint, method: metodo, dataType: 'json',
        data: {
            'notas_comp_cab_id':      $('#id').val(),
            'item_id':                itemId,
            'tipo_impuesto_id':       $('#tipo_impuesto_id').val(),
            'notas_comp_det_cantidad':cantidad,
            'notas_comp_det_costo':   costo,
            'deposito_id':            $('#deposito_id_det').val() || null,
            'marca_id':               _mmMarcaId ? parseInt(_mmMarcaId) : null,
            'modelo_id':              _mmModeloId ? parseInt(_mmModeloId) : null
        }
    })
    .done(function() { listarDetalles(); })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        var msg = (res && res.mensaje) ? res.mensaje : 'Error al guardar el detalle.';
        swal({ title: xhr.status === 422 ? 'Aviso' : 'Error', text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
    });

    cancelarDetalle();
}


function buscarProductos() {
    var q = $('#item_descripcion').val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }
    debounceNota('prod', function() {
        $.ajax({ url: getUrl() + 'items/buscar', method: 'POST', dataType: 'json',
                 data: { item_descripcion: q, deposito_id: $('#deposito_id_det').val() || null } })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += '<li class="list-group-item" onclick="seleccionProducto('
                    + rs.item_id + ",'" + _esc(rs.item_descripcion) + "',"
                    + rs.tipo_impuesto_id + ",'" + (rs.item_costo||0) + "','"
                    + _esc(rs.tipo_imp_nom||'') + "'," + (rs.tipo_imp_tasa||0) + ',' + stock + ')">'
                    + rs.item_descripcion
                    + ' <span class="badge" style="background:#3b82f6;color:#fff;">Stock: ' + stock + '</span>'
                    + '</li>';
            });
            lista += '</ul>';
            $('#listaProductos').html(lista).attr('style','display:block; position:absolute; z-index:2000;');
        });
    });
}

function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, stock) {
    $('#item_id').val(item_id);
    $('#item_descripcion').val(item_descripcion);
    $('#item_costo').val('' + item_costo);
    $('#tipo_impuesto_id').val(tipo_impuesto_id);
    $('#tipo_imp_nom_det').val(tipo_imp_nom);
    $('#stock_disponible_det').val(stock || 0);
    mmCargarMarcas(item_id, null);
    $('#marca_det_mm').removeAttr('disabled');
    $('#listaProductos').html('').hide();
    $(".form-line").addClass("focused");
}


function buscarTipoImpuestos(){
    $.ajax({
        url:getUrl() + "tipo-impuesto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoImpuestos("+rs.id+",'"+rs.tipo_imp_nom+"','"+rs.tipo_imp_tasa+"');\">"+rs.tipo_imp_nom+","+rs.tipo_imp_tasa+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoImpuestos").html(lista);
        $("#listaTipoImpuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a) { mostrarErrores(a); })
}

function seleccionTipoImpuestos(id,tipo_imp_nom,tipo_imp_tasa){
    $("#tipo_impuesto_id").val(id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#tipo_imp_tasa").val(tipo_imp_tasa);

    $("#listaTipoImpuestos").html("");
    $("#listaTipoImpuestos").attr("style","display:none;");
}

function _esc(s) {
    return (s || '').replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function listarDetalles() {
    var notasCompraId = $('#id').val();
    var estadoNotas   = $('#nota_comp_estado').val();
    if (!notasCompraId) return;

    $.ajax({ url: getUrl() + 'notacompdet/read/' + notasCompraId, method: 'GET', dataType: 'json' })
    .done(function(resultado) {
        var lista = '';
        var TotalGral = 0, TotalIva10 = 0, TotalIva5 = 0, cantidadDetalle = 0;
        _detRows = {};

        resultado.forEach(function(rs, idx) {
            var cantidad = rs.notas_comp_det_cantidad || 0;
            var costo    = rs.notas_comp_det_costo    || 0;
            var subtotal = cantidad * costo;
            var imp = (rs.tipo_imp_nom || '').toUpperCase();
            var iva = 0;
            if (imp.indexOf('EXENT') !== -1) {
                iva = 0;
            } else if (imp.indexOf('5') !== -1) {
                iva = Math.round(subtotal / 21);
                TotalIva5 += iva;
            } else {
                iva = Math.round(subtotal / 11);
                TotalIva10 += iva;
            }

            _detRows[idx] = rs;
            lista += '<tr class="nota-det-item" data-det-id="' + idx + '">';
            lista += '<td>' + rs.item_id + '</td>';
            lista += '<td>' + rs.item_descripcion + '</td>';
            lista += '<td>' + (rs.mar_nom||'-') + '</td>';
            lista += '<td>' + (rs.modelo_nom||'-') + '</td>';
            lista += '<td>' + cantidad + '</td>';
            lista += '<td class="text-right">' + formatearNumero(costo) + '</td>';
            lista += '<td>' + (rs.tipo_imp_nom||'-') + '</td>';
            lista += '<td class="text-right">' + formatearNumero(subtotal) + '</td>';
            lista += '<td class="text-right">' + formatearNumero(iva) + '</td>';
            lista += '<td>' + (rs.dep_nombre||'-') + '</td>';
            lista += '</tr>';

            cantidadDetalle++;
            TotalGral += subtotal;
        });

        if (!lista) lista = '<tr><td colspan="10" class="text-center text-muted">Sin ítems en el detalle</td></tr>';
        $('#tableDetalle').html(lista);
        $('#txtIva10').text(formatearNumero(TotalIva10));
        $('#txtIva5').text(formatearNumero(TotalIva5));
        $('#txtTotalConImpuesto').text(formatearNumero(TotalIva10 + TotalIva5));
        $('#txtTotalGral').text(formatearNumero(TotalGral));

        if (estadoNotas === 'PENDIENTE' && cantidadDetalle > 0) {
            $('#btnConfirmar').removeAttr('disabled');
        } else {
            $("#btnConfirmar").attr("disabled", "true"); // Deshabilitar si no hay detalles o la orden no está pendiente
        }
    })
    .fail(function(a) { mostrarErrores(a); });
}

function seleccionDetalle(item_id, tipo_impuesto_id, item_descripcion, tipo_imp_nom, cantidad, costo, deposito_id, stock_disponible, marca_id, modelo_id, dep_nombre, mar_nom, modelo_nom_full) {
    $('#item_id').val(item_id);
    $('#tipo_impuesto_id').val(tipo_impuesto_id);
    $('#item_descripcion').val(item_descripcion);
    $('#tipo_imp_nom_det').val(tipo_imp_nom);
    $('#notas_comp_det_cantidad').val(cantidad);
    $('#item_costo').val(costo);
    $('#stock_disponible_det').val(stock_disponible || 0);
    $('#notas_comp_det_cantidad').css('border-color', '');
    $('#avisoStockNota').hide();
    $('#btnGrabarDetalle').prop('disabled', false);
    _mmMarcaId  = marca_id  || null;
    _mmModeloId = modelo_id || null;
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>');
    } else {
        $dep.html('<option value="">-- Depósito --</option>');
    }
    $dep.prop('disabled', true);
    var $marca = $('#marca_det_mm');
    if (marca_id && mar_nom) {
        $marca.html('<option value="' + marca_id + '" selected>' + mar_nom + '</option>');
    } else {
        $marca.html('<option value="">-- Marca --</option>');
    }
    $marca.prop('disabled', true);
    var $modelo = $('#modelo_det_mm');
    if (modelo_id && modelo_nom_full) {
        $modelo.html('<option value="' + modelo_id + '" selected>' + modelo_nom_full + '</option>');
    } else {
        $modelo.html('<option value="">-- Modelo --</option>');
    }
    $modelo.prop('disabled', true);
    $('#listaProductos').html('').hide();
    $(".form-line").addClass("focused");
}

function actualizarTotales() {
    const cantidad = parseFloat($("#notas_comp_det_cantidad").val()) || 0;
    const costo = parseFloat($("#item_costo").val()) || 0;
    const tasaImpuesto = parseFloat($("#tipo_impuesto_id").val()) || 0; // Asegúrate de obtener correctamente la tasa de impuesto

    const subtotal = cantidad * costo;
    const totalImpuesto = subtotal * (tasaImpuesto / 100);
    const totalConImpuesto = subtotal + totalImpuesto;

    $("#subtotal").val(subtotal.toFixed(2)); // Mostrar subtotal
    $("#totalConImpuesto").val(totalConImpuesto.toFixed(2)); // Mostrar total con impuestos
}

function buscarCompra() {
    $.ajax({
        url: getUrl() + "compras/buscar",  // Asegúrate de que la URL esté correcta
        method: "POST",
        dataType: "json",
        data: {
            "funcionario_id": $("#funcionario_id").val(),   // Obtener user_id del input correspondiente
            "name": $("#compra_cab").val()        // Obtener el nombre de la compra
        }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";

        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCompra("
                + rs.compra_cab_id + ", "
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", '"
                + _esc(rs.compra||'') + "', "
                + rs.proveedor_id + ", '"
                + _esc(rs.emp_razon_social||'') + "','"
                + _esc(rs.suc_razon_social||'') + "','"
                + _esc(rs.prov_razonsocial||'') + "', '"
                + _esc(rs.prov_ruc||'') + "', '"
                + _esc(rs.prov_telefono||'') + "', '"
                + _esc(rs.prov_correo||'') + "', '"
                + _esc(rs.comp_intervalo_fecha_vence||'') + "', '"
                + _esc(rs.comp_cant_cuota||'') + "', '"
                + _esc(rs.condicion_pago||'') + "', '"
                + _esc(rs.comp_timbrado||'') + "','"
                + _esc(rs.comp_nro_factura||'') + "')\">"
                + rs.compra + "</li>";   
        }

        lista += "</ul>";
        $("#listaCompra").html(lista);
        $("#listaCompra").attr("style", "display:block; position: absolute; z-index: 2000;");
    });
}

function seleccionCompra(
    compra_cab_id, empresa_id, sucursal_id, compra, proveedor_id,
    emp_razon_social, suc_razon_social, prov_razonsocial, prov_ruc,
    prov_telefono, prov_correo, comp_intervalo_fecha_vence, comp_cant_cuota, condicion_pago, comp_timbrado, comp_nro_factura
) {
    $("#compra_cab_id").val(compra_cab_id);
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#nota_comp_intervalo_fecha_vence").val(comp_intervalo_fecha_vence);
    $("#nota_comp_cant_cuota").val(comp_cant_cuota);
    $("#nota_comp_condicion_pago").val(condicion_pago);
    $("#compra_cab").val(compra);
    $("#comp_timbrado").val(comp_timbrado || '');
    $("#comp_nro_factura").val(comp_nro_factura || '');

    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    $("#listaCompra").html("");
    $("#listaCompra").attr("style", "display:none;");
    $(".form-line").addClass("focused");
}


function buscarEmpresas() {
    $.ajax({
        url:getUrl() + "empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        
        // Comprobar si hay empresas en el resultado
        if (resultado.length > 0) {
            // Seleccionar automáticamente la primera empresa
            var primeraEmpresa = resultado[0];
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telefono, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(a) { mostrarErrores(a); });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telefono, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telefono").val(emp_telefono);
    $("#emp_correo").val(emp_correo);

    $("#listaEmpresa").html("");
    $("#listaEmpresa").attr("style", "display:none;");
}

function buscarSucursal(){
    $.ajax({
        url:getUrl() + "sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+_esc(rs.suc_razon_social||'')+"','"+_esc(rs.suc_direccion||'')+"','"+_esc(rs.suc_telefono||'')+"','"+_esc(rs.suc_correo||'')+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a) { mostrarErrores(a); })
}

function seleccionSucursal(empresa_id,suc_razon_social,suc_direccion,suc_telefono,suc_correo){
    $("#sucursal_id").val(empresa_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#suc_direccion").val(suc_direccion);
    $("#suc_telefono").val(suc_telefono);
    $("#suc_correo").val(suc_correo);

    $("#listaSucursal").html("");
    $("#listaSucursal").attr("style","display:none;");
}

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
        } else {
            swal({ title: 'Error', text: 'No se puede identificar al usuario. Inicie sesión nuevamente.', type: 'error' });
            window.location.href = '../../index.html';
        }
    } catch (error) {
        swal({ title: 'Error', text: 'Error al cargar datos del usuario. Inicie sesión nuevamente.', type: 'error' });
        window.location.href = '../../index.html';
    }
}
