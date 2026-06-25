// Lista los registros de pedidos utilizando DataTables
// Cargar funcionario_id del usuario logueado
cargarFuncionarioIdLogueado();
listar();
campoFecha();

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
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ordenes de Compras'
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
function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#ord_comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#ord_comp_fecha").removeAttr("disabled");
    $("#ord_comp_cant_cuota").attr("disabled", "true");
    $("#emp_razon_social").attr("disabled", "true");
    $("#condicion_pago").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", "true");

    // Mostrar toggle origen y resetear a presupuesto
    $("#seccionOrigen").show();
    setOrigen('presupuesto');

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

    $("#ord_comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#ord_comp_fecha").removeAttr("disabled");
    $("#ord_comp_cant_cuota").attr("disabled", "true");
    $("#emp_razon_social").attr("disabled", "true");
    $("#condicion_pago").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", "true");

    // Detectar origen según datos cargados
    var hasPedido = $("#pedido_id").val() && $("#pedido_id").val() != "0";
    $("#seccionOrigen").show();
    setOrigen(hasPedido ? 'pedido' : 'presupuesto');

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
        url: getUrl() + "ordencompracab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (rs of resultado) {
            var pedidoId     = rs.pedido_id     || 0;
            var presupuestoId = rs.presupuesto_id || 0;
            lista += "<tr class=\"item-list\" onclick=\"seleccionOrdenCompra("
                + rs.id + ","
                + rs.proveedor_id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + presupuestoId + ",'"
                + rs.emp_razon_social + "','"
                + rs.suc_razon_social + "','"
                + rs.presupuesto + "','"
                + rs.ord_comp_intervalo_fecha_vence + "','"
                + rs.ord_comp_fecha + "','"
                + rs.ord_comp_estado + "','"
                + rs.ord_comp_cant_cuota + "','"
                + (rs.funcionario || rs.encargado || '') + "','"
                + (rs.prov_razonsocial || '') + "','"
                + (rs.prov_ruc || '') + "','"
                + (rs.prov_telefono || '') + "','"
                + (rs.prov_correo || '') + "','"
                + rs.condicion_pago + "',"
                + pedidoId + ");\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.ord_comp_intervalo_fecha_vence + "</td>";
            lista += "<td>" + rs.ord_comp_fecha + "</td>";
            lista += "<td>" + rs.presupuesto + "</td>";
            lista += "<td>" + (rs.funcionario || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.ord_comp_cant_cuota + "</td>";
            lista += "<td>" + rs.ord_comp_estado + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
    });
}

function imprimirOrden() {
    var id = $('#id').val();
    if (!id || id == '0') return;
    window.open('imprimir.html?id=' + id, '_blank');
}

function _imprimirOrdenLegacy_unused() {
    var id        = $('#id').val();
    var empresa   = $('#emp_razon_social').val();
    var sucursal  = $('#suc_razon_social').val();
    var fecha     = $('#ord_comp_fecha').val();
    var proveedor = $('#prov_razonsocial').val();
    var ruc       = $('#prov_ruc').val();
    var condicion = $('#condicion_pago').val();
    var estado    = $('#ord_comp_estado').val();

    $.ajax({ url: getUrl() + 'ordencompradet/read/' + id, method: 'GET', dataType: 'json' })
    .done(function(detalles) {
        var filas = '';
        var total = 0, totalIVA = 0;

        detalles.forEach(function(d, i) {
            var sub = (d.orden_compra_det_cantidad||0) * (d.item_costo||0);
            var iva = 0;
            if (d.tipo_imp_nom === 'IVA10') iva = sub/11;
            else if (d.tipo_imp_nom === 'IVA5') iva = sub/21;
            total += sub; totalIVA += iva;

            filas += '<tr>'
                + '<td style="text-align:center;">' + (i+1) + '</td>'
                + '<td>' + d.item_descripcion + '</td>'
                + '<td style="text-align:right;">' + (d.orden_compra_det_cantidad||0) + '</td>'
                + '<td style="text-align:right;">' + Number(d.item_costo||0).toLocaleString('es-PY') + '</td>'
                + '<td>' + (d.tipo_imp_nom||'-') + '</td>'
                + '<td style="text-align:right;">' + Number(sub).toLocaleString('es-PY') + '</td>'
                + '<td style="text-align:right;">' + Number(iva).toLocaleString('es-PY') + '</td>'
                + '<td>' + (d.dep_nombre||'-') + '</td>'
                + '</tr>';
        });

        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
            + '<title>Orden de Compra #' + id + '</title>'
            + '<style>body{font-family:Arial,sans-serif;font-size:12px;margin:20px;color:#333}'
            + 'h1{font-size:18px;text-align:center;margin:0}h2{font-size:13px;text-align:center;color:#555;margin:4px 0 16px}'
            + '.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px}'
            + '.campo label{font-weight:bold;font-size:10px;text-transform:uppercase;color:#888;display:block}'
            + 'table{width:100%;border-collapse:collapse;margin-top:12px}'
            + 'th{background:#2c3e50;color:#fff;padding:7px;text-align:left;font-size:11px}'
            + 'td{padding:6px;border-bottom:1px solid #eee}'
            + 'tr:nth-child(even) td{background:#f9f9f9}'
            + 'tfoot td{font-weight:bold;background:#ecf0f1}'
            + '.footer{margin-top:30px;text-align:center;font-size:10px;color:#aaa}'
            + '@media print{button{display:none}}</style></head><body>'
            + '<h1>ORDEN DE COMPRA</h1>'
            + '<h2>' + empresa + ' — ' + sucursal + '</h2>'
            + '<div style="text-align:center;margin-bottom:12px;"><strong>N° ' + String(id).padStart(7,'0') + '</strong>'
            + ' &nbsp; <span style="background:#27ae60;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;">' + estado + '</span></div>'
            + '<div class="grid">'
            + '<div class="campo"><label>Proveedor</label><span>' + proveedor + '</span></div>'
            + '<div class="campo"><label>RUC</label><span>' + (ruc||'—') + '</span></div>'
            + '<div class="campo"><label>Fecha</label><span>' + fecha + '</span></div>'
            + '<div class="campo"><label>Condición de Pago</label><span>' + condicion + '</span></div>'
            + '</div>'
            + '<table><thead><tr><th>#</th><th>Producto</th><th>Cant.</th><th>Costo</th><th>Impuesto</th><th>Subtotal</th><th>IVA</th><th>Depósito</th></tr></thead>'
            + '<tbody>' + filas + '</tbody>'
            + '<tfoot><tr><td colspan="5" style="text-align:right;">TOTAL:</td>'
            + '<td style="text-align:right;">' + Number(total).toLocaleString('es-PY') + '</td>'
            + '<td style="text-align:right;">' + Number(totalIVA).toLocaleString('es-PY') + '</td>'
            + '<td></td></tr></tfoot></table>'
            + '<div class="footer">Impreso el ' + new Date().toLocaleString('es-PY') + '</div>'
            + '<script>window.onload=function(){window.print();window.onafterprint=function(){window.close();}};<\/script>'
            + '</body></html>';

        var w = window.open('', '_blank', 'width=900,height=650');
        w.document.write(html);
        w.document.close();
    });
}

// Rellena el formulario con los datos de una orden de compra seleccionada.
function seleccionOrdenCompra(id_orde_compra_cab, proveedor_id, empresa_id, sucursal_id, presupuesto_id, emp_razon_social, suc_razon_social, presupuestos, ord_comp_intervalo_fecha_vence, ord_comp_fecha, ord_comp_estado, ord_comp_cant_cuota, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, condicion_pago, pedido_id) {
    $("#id").val(id_orde_compra_cab);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#presupuesto_id").val(presupuesto_id || 0);
    $("#pedido_id").val(pedido_id || 0);
    $("#proveedor_id").val(proveedor_id);
    $("#ord_comp_intervalo_fecha_vence").val(ord_comp_intervalo_fecha_vence);
    $("#ord_comp_fecha").val(ord_comp_fecha);
    $("#ord_comp_cant_cuota").val(ord_comp_cant_cuota);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#presupuestos").val(presupuestos);
    $("#pedido_desc").val(pedido_id && pedido_id != 0 ? presupuestos : '');
    $("#ord_comp_estado").val(ord_comp_estado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#condicion_pago").val(condicion_pago);

    // Mostrar el origen en el toggle (solo indicativo, oculto)
    $("#seccionOrigen").hide();
    if (pedido_id && pedido_id != 0) {
        $("input[name='origen_oc'][value='pedido']").prop("checked", true);
        $("#divPresupuesto").hide();
        $("#panelPedidosPresupuesto").hide();
        $("#divPedido").show();
    } else {
        $("input[name='origen_oc'][value='presupuesto']").prop("checked", true);
        $("#divPresupuesto").show();
        $("#divPedido").hide();
        cargarPedidosDelPresupuesto(presupuesto_id);
    }

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

    if (ord_comp_estado === "PENDIENTE") {
        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    } else if (ord_comp_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
        $('#btnImprimir').show().removeAttr('disabled');
    } else if (ord_comp_estado === "PROCESADO") {
        $('#btnImprimir').show().removeAttr('disabled');
    } else if (ord_comp_estado === "ANULADO") {
        $('#btnImprimir').hide().attr('disabled', true);
    }

    $(".form-line").attr("class","form-line focused");
    controlarCamposPago();
}

// Realiza operaciones de creación, edición, anulacion y confirmación de un pedido
function grabar() {
    var endpoint = "ordencompracab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    // Lógica para cambiar el endpoint y el método según la operación
    if ($("#txtOperacion").val() == 2) {
        endpoint = "ordencompracab/update/" + $("#id").val();
        metodo = "PUT";
    } else if ($("#txtOperacion").val() == 3) {
        endpoint = "ordencompracab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    } else if ($("#txtOperacion").val() == 4) {
        endpoint = "ordencompracab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    // Obtener el valor de condicion_pago
    var condicionPago = $("#condicion_pago").val();

    var origen = $("input[name='origen_oc']:checked").val() || 'presupuesto';
    var presupuestoId = origen === 'presupuesto' ? $("#presupuesto_id").val() : null;
    var pedidoId      = origen === 'pedido'      ? $("#pedido_id").val()      : null;
    var proveedorId   = $("#proveedor_id").val();
    var intervaloFechaVence = $("#ord_comp_intervalo_fecha_vence").val();
    var formattedIntervaloFechaVence = condicionPago === 'CONTADO' ? null : intervaloFechaVence;

    // ── Validaciones agrupadas ──────────────────────────────────────────────
    var errores = [];

    // Fecha OC (debe ser hoy)
    var fechaVal = $('#ord_comp_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha de la orden es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, FMT_OC, true);
        if (!mFecha.isValid()) errores.push('El formato de la fecha es inválido.');
        else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day')))
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
    }

    if (origen === 'presupuesto' && (!presupuestoId || presupuestoId == "0"))
        errores.push('Debe seleccionar un Presupuesto.');
    if (origen === 'pedido' && (!pedidoId || pedidoId == "0"))
        errores.push('Debe seleccionar un Pedido.');
    if (!proveedorId || proveedorId == "0") errores.push('Debe seleccionar un Proveedor.');

    if (condicionPago === 'CREDITO') {
        if (!formattedIntervaloFechaVence) {
            errores.push('La fecha de vencimiento es obligatoria para condición CRÉDITO.');
        } else {
            var mVence = moment(formattedIntervaloFechaVence, FMT_OC, true);
            if (!mVence.isValid()) errores.push('El formato de la fecha de vencimiento es inválido.');
            else if (mVence.clone().startOf('day').isBefore(moment().startOf('day')))
                errores.push('La fecha de vencimiento no puede ser pasada.');
        }
        var cantCuota = parseInt($("#ord_comp_cant_cuota").val());
        if (!cantCuota || cantCuota <= 0) errores.push('La cantidad de cuotas es obligatoria para condición CRÉDITO.');
    }

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
            'ord_comp_intervalo_fecha_vence': formattedIntervaloFechaVence,
            'ord_comp_fecha': $("#ord_comp_fecha").val(),
            'ord_comp_cant_cuota': condicionPago === 'CONTADO' ? null : $("#ord_comp_cant_cuota").val(),
            'funcionario_id': $("#funcionario_id").val(),
            'presupuesto_id': presupuestoId,
            'pedido_id': pedidoId,
            'proveedor_id': proveedorId,
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'condicion_pago': condicionPago,
            'ord_comp_estado': estado,
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
                listarDetalles();
                if(resultado.registro.ord_comp_estado!="PENDIENTE"){
                    location.reload(true);
                } else {
                    $("#ord_comp_fecha").attr("disabled", true);
                    $("#condicion_pago").attr("disabled", true);
                    $("#ord_comp_intervalo_fecha_vence").attr("disabled", true);
                    $("#ord_comp_cant_cuota").attr("disabled", true);
                    $("#presupuestos").attr("disabled", true);
                    $("#pedido_desc").attr("disabled", true);
                    $("#prov_razonsocial").attr("disabled", true);
                    $("#seccionOrigen").hide();
                    $("#formDetalles").attr("style","display:block;");
                    $("#btnGrabar").attr("disabled", true);
                    $("#btnAgregar").attr("disabled", true);
                    $("#btnCancelar").removeAttr("disabled");
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
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

// ─── VALIDACIONES EN TIEMPO REAL ─────────────────────────────────────────────
var FMT_OC = 'YYYY-MM-DD HH:mm:ss';

function validarFechaOC() {
    var val = $('#ord_comp_fecha').val().trim();
    var aviso = $('#avisoFechaOC');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, FMT_OC, true);
    if (!m.isValid()) {
        $('#ord_comp_fecha').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
    } else if (!m.clone().startOf('day').isSame(moment().startOf('day'))) {
        $('#ord_comp_fecha').css('border-color','#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#ord_comp_fecha').css('border-color',''); aviso.hide();
        validarVenceOC();
    }
}

function validarVenceOC() {
    var condicion = $('#condicion_pago').val();
    if (condicion !== 'CREDITO') { $('#avisoVenceOC').hide(); return; }
    var valFecha = $('#ord_comp_fecha').val().trim();
    var valVence = $('#ord_comp_intervalo_fecha_vence').val().trim();
    var aviso = $('#avisoVenceOC');
    if (!valVence) { aviso.hide(); return; }
    var mVence = moment(valVence, FMT_OC, true);
    if (!mVence.isValid()) {
        $('#ord_comp_intervalo_fecha_vence').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show(); return;
    }
    if (mVence.clone().startOf('day').isBefore(moment().startOf('day'))) {
        $('#ord_comp_intervalo_fecha_vence').css('border-color','#e74c3c');
        aviso.text('La fecha de vencimiento no puede ser pasada.').show(); return;
    }
    if (valFecha) {
        var mFecha = moment(valFecha, FMT_OC, true);
        if (mFecha.isValid() && mVence.isBefore(mFecha)) {
            $('#ord_comp_intervalo_fecha_vence').css('border-color','#e74c3c');
            aviso.text('El vencimiento debe ser igual o posterior a la fecha de la OC.').show(); return;
        }
    }
    $('#ord_comp_intervalo_fecha_vence').css('border-color',''); aviso.hide();
}

function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
    $('#ord_comp_fecha').on('change', function() { validarFechaOC(); });
    $('#ord_comp_intervalo_fecha_vence').on('change', function() { validarVenceOC(); });

    // Al cambiar condición de pago, limpiar avisos y bordes de IFV y cuota
    $('#condicion_pago').on('change', function() {
        if ($(this).val() === 'CONTADO') {
            $('#ord_comp_intervalo_fecha_vence').css('border-color', '');
            $('#avisoVenceOC').hide().text('');
            $('#ord_comp_cant_cuota').css('border-color', '');
        } else {
            // Al cambiar a CRÉDITO, re-validar si ya hay valor en IFV
            validarVenceOC();
        }
    });
}
var _ajaxDeposito  = null;
var _marcaIdOC     = null;
var _modeloIdOC    = null;
var _cacheMarcasOC = {};
var _cacheModelosOC= {};

function cargarMarcasOC(itemId, marcaSelId) {
    _marcaIdOC  = marcaSelId || null;
    _modeloIdOC = null;
    $('#marca_det_oc').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_oc').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!itemId) return;
    var cb = function(data) {
        _cacheMarcasOC[itemId] = data;
        var opts = '<option value="">-- Marca --</option>';
        data.forEach(function(m) {
            var id = m.marca_id;
            opts += '<option value="'+id+'"'+(id==marcaSelId?' selected':'')+'>'+m.mar_nom+'</option>';
        });
        $('#marca_det_oc').html(opts).removeAttr('disabled');
        if (marcaSelId) { _marcaIdOC = marcaSelId; cargarModelosOC(itemId, marcaSelId, null); }
    };
    if (_cacheMarcasOC[itemId]) cb(_cacheMarcasOC[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/marcas', cb);
}

function cargarModelosOC(itemId, marcaId, modeloSelId) {
    _marcaIdOC  = marcaId;
    _modeloIdOC = modeloSelId || null;
    $('#modelo_det_oc').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!marcaId || !itemId) return;
    var cb = function(data) {
        _cacheModelosOC[itemId] = data;
        var filtrados = data.filter(function(m) { return String(m.marca_id) === String(marcaId); });
        if (!filtrados.length) return;
        var opts = '<option value="">-- Modelo --</option>';
        filtrados.forEach(function(m) {
            var id = m.modelo_id;
            opts += '<option value="'+id+'"'+(id==modeloSelId?' selected':'')+'>'+m.modelo_nom+(m.modelo_año?' ('+m.modelo_año+')':'')+  '</option>';
        });
        $('#modelo_det_oc').html(opts).removeAttr('disabled');
        if (modeloSelId) { $('#modelo_det_oc').val(modeloSelId); _modeloIdOC = modeloSelId; }
    };
    if (_cacheModelosOC[itemId]) cb(_cacheModelosOC[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/modelos', cb);
}
function cargarDepositosOrden(selectedId, callback) {
    if (_ajaxDeposito) { _ajaxDeposito.abort(); _ajaxDeposito = null; }
    var ordenId = $("#id").val();
    _ajaxDeposito = $.get(getUrl() + 'ordencompradet/depositos/' + ordenId, function(rows) {
        _ajaxDeposito = null;
        var select = $("#deposito_id_det");
        if (rows.length === 1) {
            var d = rows[0];
            select.html('<option value="' + d.id + '">' + d.dep_nombre + ' — ' + d.suc_razon_social + '</option>');
            select.val(d.id).attr("disabled", true);
        } else if (rows.length > 1) {
            var opts = '<option value="">-- Depósito --</option>';
            rows.forEach(function(d) {
                var sel = (d.id == selectedId) ? ' selected' : '';
                opts += '<option value="' + d.id + '"' + sel + '>' + d.dep_nombre + ' — ' + d.suc_razon_social + '</option>';
            });
            select.html(opts).removeAttr("disabled");
        } else {
            select.html(getSelectDeposito(selectedId)).removeAttr("disabled");
        }
        if (callback) callback();
    });
}

// Prepara el formulario para agregar un nuevo detalle al pedido
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val("");
    $("#item_descripcion").val("").removeAttr("disabled");
    $("#orden_compra_det_cantidad").val("").removeAttr("disabled");
    $("#tipo_imp_nom").val("").removeAttr("disabled");
    $("#item_costo").val("").removeAttr("disabled");
    $("#cantidad_stock").val("");
    _marcaIdOC  = null;
    _modeloIdOC = null;
    $('#marca_det_oc').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_oc').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#marca_det_oc').off('change.oc').on('change.oc', function() {
        _marcaIdOC = $(this).val() || null; _modeloIdOC = null;
        cargarModelosOC($('#item_id').val(), _marcaIdOC, null);
    });
    $('#modelo_det_oc').off('change.oc').on('change.oc', function() { _modeloIdOC = $(this).val() || null; });
    cargarDepositosOrden(null);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

// Prepara el formulario para editar un detalle existente del pedido
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#orden_compra_det_cantidad").removeAttr("disabled");
    $("#tipo_imp_nom").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled");
    var itemId = $('#item_id').val();
    cargarMarcasOC(itemId, _marcaIdOC);
    $('#marca_det_oc').off('change.oc').on('change.oc', function() {
        _marcaIdOC = $(this).val() || null; _modeloIdOC = null;
        cargarModelosOC(itemId, _marcaIdOC, null);
    });
    $('#modelo_det_oc').off('change.oc').on('change.oc', function() { _modeloIdOC = $(this).val() || null; });
    var currentDeposito = $("#deposito_id_det").val();
    cargarDepositosOrden(currentDeposito);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

// Prepara el formulario para eliminar un detalle del pedido.
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#item_costo").attr("disabled", "disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

function cancelarDetalle(){
    if (_ajaxDeposito) { _ajaxDeposito.abort(); _ajaxDeposito = null; }

    $("#txtOperacionDetalle").val(0);
    $("#item_id").val("");
    $("#item_descripcion").val("").attr("disabled", true);
    $("#orden_compra_det_cantidad").val("").attr("disabled", true);
    $("#item_costo").val("").attr("disabled", true);
    $("#tipo_imp_nom").val("").attr("disabled", true);
    $("#tipo_impuesto_id").val("");
    $("#cantidad_stock").val("");
    _marcaIdOC  = null;
    _modeloIdOC = null;
    $('#marca_det_oc').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_oc').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $("#deposito_id_det").html('<option value="">-- Depósito --</option>').attr("disabled", true);
    $("#listaProductos").html("").hide();
    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");
    $("#btnCancelarDetalle").attr("style","display:none");
}

function grabarDetalle() {
    var oper     = parseInt($("#txtOperacionDetalle").val());
    var itemId   = $.trim($("#item_id").val());
    var cantidad = $.trim($("#orden_compra_det_cantidad").val()).replace(/\./g, '').replace(',', '.');
    var costo    = $.trim($("#item_costo").val()).replace(/\./g, '').replace(',', '.');

    var errores = [];
    if (oper !== 3) {
        if (!itemId)                               errores.push('Seleccione un ítem.');
        if (!cantidad || isNaN(cantidad) || parseFloat(cantidad) <= 0)
                                                   errores.push('La cantidad debe ser mayor a cero.');
        if (!costo || isNaN(costo))                errores.push('El costo es obligatorio y debe ser numérico.');
        if (!$('#deposito_id_det').val())           errores.push('Seleccione un depósito.');
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = "ordencompradet/create";
    var metodo = "POST";

    if ($("#txtOperacionDetalle").val() == 2) {
        endpoint = "ordencompradet/update/" + $("#id").val() + "/" + itemId;
        metodo = "PUT";
    }
    if ($("#txtOperacionDetalle").val() == 3) {
        endpoint = "ordencompradet/delete/" + $("#id").val() + "/" + itemId;
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "orden_compra_cab_id": $("#id").val(),
            "item_id": itemId,
            "tipo_impuesto_id": $("#tipo_impuesto_id").val(),
            "orden_compra_det_cantidad": cantidad,
            "orden_compra_det_costo": costo,
            "deposito_id": $("#deposito_id_det").val(),
            "marca_id":  _marcaIdOC  ? parseInt(_marcaIdOC)  : null,
            "modelo_id": _modeloIdOC ? parseInt(_modeloIdOC) : null
        }
    })
    .done(function() { listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });

    $("#txtOperacionDetalle").val(0);
    $("#item_id").val("");
    $("#item_descripcion").val("").attr("disabled", true);
    $("#orden_compra_det_cantidad").val("").attr("disabled", true);
    $("#item_costo").val("").attr("disabled", true);
    $("#tipo_imp_nom").val("").attr("disabled", true);
    $("#tipo_impuesto_id").val("");
    $("#cantidad_stock").val("");
    $("#deposito_id_det").html('<option value="">-- Depósito --</option>').attr("disabled", true);
    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");
    $("#btnCancelarDetalle").attr("style","display:none");
}


// Realiza una búsqueda de productos y muestra los resultados.
function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "item_descripcion": $("#item_descripcion").val(),
            "tipo_descripcion": "PRODUCTO",
            "deposito_id": $("#deposito_id_det").val() || null
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            var stock = rs.cantidad_disponible != null ? rs.cantidad_disponible : 0;
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_descripcion + "',"
                + rs.tipo_impuesto_id + ","
                + (rs.item_costo || 0) + ",'"
                + rs.tipo_imp_nom + "',"
                + rs.tipo_imp_tasa + ","
                + stock + ")\">"
                + rs.item_descripcion
                + " <span class='badge' style='background:#3b82f6;color:#fff;'>Stock: " + stock + "</span>"
                + "</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a, b, c){
        alert(c);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#item_costo").val(formatearNumero(item_costo));
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#cantidad_stock").val('' + cantidad_disponible);
    _marcaIdOC  = null;
    _modeloIdOC = null;
    cargarMarcasOC(item_id, null);
    $("#listaProductos").html("").hide();
    $(".form-line").attr("class","form-line focused");
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
    .fail(function(a,b,c){
        alert(c);
    })
}

function seleccionTipoImpuestos(id,tipo_imp_nom,tipo_imp_tasa){
    $("#tipo_impuesto_id").val(id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#tipo_imp_tasa").val(tipo_imp_tasa);

    $("#listaTipoImpuestos").html("");
    $("#listaTipoImpuestos").attr("style","display:none;");
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function _esc(s) {
    return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Realiza una búsqueda de productos mediante una solicitud AJAX
function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    const ordenCompraId = $("#id").val();
    const estadoOrden   = $("#ord_comp_estado").val();

    if (!ordenCompraId) {
        alert("No se ha definido el ID de la orden de compra.");
        return;
    }

    $.ajax({
        url: getUrl() + "ordencompradet/read/" + ordenCompraId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = rs.orden_compra_det_cantidad || 0;
                const costo    = rs.item_costo || 0;
                const subtotal = cantidad * costo;
                const imp = (rs.tipo_imp_nom || '').toUpperCase();
                let iva = 0;
                if (imp.indexOf('EXENT') !== -1) {
                    iva = 0;
                } else if (imp.indexOf('5') !== -1) {
                    iva = Math.round(subtotal / 21);
                    TotalIva5 += iva;
                } else {
                    iva = Math.round(subtotal / 11);
                    TotalIva10 += iva;
                }

                var _depNomOC = getNombreDeposito(rs.deposito_id);
                var _modNomOC = rs.modelo_nom ? rs.modelo_nom + (rs.modelo_año ? ' (' + rs.modelo_año + ')' : '') : '';
                lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.item_id + "," + rs.tipo_impuesto_id + ",'" + _esc(rs.item_descripcion) + "','" + _esc(rs.tipo_imp_nom || '-') + "'," + cantidad + ", " + costo + ", '" + formatearNumero(subtotal) + "', '" + formatearNumero(iva) + "'," + (rs.deposito_id||0) + "," + rs.cantidad_disponible + "," + (rs.marca_id||0) + "," + (rs.modelo_id||0) + ",'" + _esc(_depNomOC) + "','" + _esc(rs.mar_nom||'') + "','" + _esc(_modNomOC) + "');\">";
                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_descripcion + "</td>";
                lista += "<td>" + (rs.mar_nom || '—') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '—') + "</td>";
                lista += "<td>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.tipo_imp_nom || '-') + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "<td>" + getNombreDeposito(rs.deposito_id) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='10' class='text-center'>No se encontraron detalles para esta orden de compra.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        // Habilitar el botón Confirmar si hay detalles y la orden está pendiente
        if (estadoOrden === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true"); // Deshabilitar si no hay detalles o la orden no está pendiente
        }
    })
    .fail(function(a, b, c) {
        alert("Error al obtener detalles: " + c);
    });
}

// Selecciona un detalle de un pedido y actualiza el formulario
function seleccionDetalle(item_id, tipo_impuesto_id, item_descripcion, tipo_imp_nom, orden_compra_det_cantidad, costo, subtotal, totalConImpuesto, deposito_id, cantidad_disponible, marca_id, modelo_id, dep_nombre, mar_nom, modelo_nom_full) {
    $("#item_id").val(item_id);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#item_descripcion").val(item_descripcion);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#orden_compra_det_cantidad").val(orden_compra_det_cantidad);
    $("#item_costo").val(formatearNumero(costo));
    $("#cantidad_stock").val('' + cantidad_disponible);
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>');
    } else {
        $dep.html('<option value="">-- Depósito --</option>');
    }
    $dep.prop('disabled', true);
    _marcaIdOC  = marca_id  || null;
    _modeloIdOC = modelo_id || null;
    var $marca = $('#marca_det_oc');
    if (marca_id && mar_nom) {
        $marca.html('<option value="' + marca_id + '" selected>' + mar_nom + '</option>');
    } else {
        $marca.html('<option value="">-- Marca --</option>');
    }
    $marca.prop('disabled', true);
    var $modelo = $('#modelo_det_oc');
    if (modelo_id && modelo_nom_full) {
        $modelo.html('<option value="' + modelo_id + '" selected>' + modelo_nom_full + '</option>');
    } else {
        $modelo.html('<option value="">-- Modelo --</option>');
    }
    $modelo.prop('disabled', true);
    $("#listaProductos").html("").hide();
    $(".form-line").attr("class", "form-line focused");
}

function actualizarTotales() {
    const cantidad = parseFloat($("#orden_compra_det_cantidad").val()) || 0;
    const costo = parseFloat($("#item_costo").val()) || 0;
    const tasaImpuesto = parseFloat($("#tipo_impuesto_id").val()) || 0; // Asegúrate de obtener correctamente la tasa de impuesto

    const subtotal = cantidad * costo;
    const totalImpuesto = subtotal * (tasaImpuesto / 100);
    const totalConImpuesto = subtotal + totalImpuesto;

    $("#subtotal").val(subtotal.toFixed(2)); // Mostrar subtotal
    $("#totalConImpuesto").val(totalConImpuesto.toFixed(2)); // Mostrar total con impuestos
}

function buscarPresupuesto() {
    $.ajax({
        url: getUrl() + "presupuesto/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "funcionario_id": $("#funcionario_id").val(),
            "name": $("#presupuesto").val()
        }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPresupuesto("
                + rs.presupuesto_id + "," 
                + rs.empresa_id + "," 
                + rs.sucursal_id + ", '"
                + rs.presupuesto + "', "
                + rs.proveedor_id + ", '"
                + rs.emp_razon_social + "','"
                + rs.suc_razon_social + "','"
                + rs.prov_razonsocial + "', '"
                + rs.prov_ruc + "', '"
                + rs.prov_telefono + "', '"
                + rs.prov_correo + "')\">"
                + rs.presupuesto + "</li>";   
        }

        lista += "</ul>";
        $("#listaPresupuesto").html(lista);
        $("#listaPresupuesto").attr("style", "display:block; position: absolute; z-index: 2000;");
    });
}

function seleccionPresupuesto(presupuesto_id, empresa_id, sucursal_id, presupuesto, proveedor_id, emp_razon_social, suc_razon_social, prov_razonsocial, prov_ruc, prov_telefono, prov_correo) {
    $("#presupuesto_id").val(presupuesto_id);
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#presupuestos").val(presupuesto);

    // Autocompletar el proveedor
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    $("#listaPresupuesto").html("");
    $("#listaPresupuesto").attr("style", "display:none;");
    $(".form-line").addClass("focused");

    cargarPedidosDelPresupuesto(presupuesto_id);
}

function cargarPedidosDelPresupuesto(presupuesto_id) {
    if (!presupuesto_id || presupuesto_id == 0) {
        $("#panelPedidosPresupuesto").hide();
        return;
    }
    $.get(getUrl() + 'presupuesto-pedidos/read/' + presupuesto_id, function(rows) {
        if (!rows || rows.length === 0) {
            $("#panelPedidosPresupuesto").hide();
            return;
        }
        var html = '';
        rows.forEach(function(r) {
            html += '<tr>'
                + '<td>' + r.pedido_id + '</td>'
                + '<td>' + (r.ped_pbservaciones || '-') + '</td>'
                + '<td>' + (r.ped_vence || '-') + '</td>'
                + '<td>' + (r.ped_estado || '-') + '</td>'
                + '</tr>';
        });
        $('#bodyPedidosPresupuesto').html(html);
        $('#panelPedidosPresupuesto').show();
    });
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
    .fail(function(a,b,c) {
        alert(c);
    });
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
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
    })
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

// Helper: activa un origen y actualiza las clases Bootstrap del btn-group
function setOrigen(valor) {
    $("input[name='origen_oc'][value='" + valor + "']").prop("checked", true);
    $("#btnLblPresupuesto, #btnLblPedido").removeClass("active");
    $("#btnLbl" + (valor === 'pedido' ? 'Pedido' : 'Presupuesto')).addClass("active");
    cambiarOrigen();
}

// Cambia entre modo Presupuesto y modo Pedido Directo
function cambiarOrigen() {
    var origen = $("input[name='origen_oc']:checked").val();
    var esNuevo = parseInt($("#txtOperacion").val()) === 1;

    // Actualizar clases btn-group
    $("#btnLblPresupuesto, #btnLblPedido").removeClass("active");
    $("#btnLbl" + (origen === 'pedido' ? 'Pedido' : 'Presupuesto')).addClass("active");

    if (origen === 'pedido') {
        $("#divPresupuesto").hide();
        $("#panelPedidosPresupuesto").hide();
        $("#divPedido").show();
        $("#pedido_desc").removeAttr("disabled");
        $("#prov_razonsocial").removeAttr("disabled");
        if (esNuevo) {
            $("#presupuesto_id").val(0);
            $("#presupuestos").val('');
            $("#proveedor_id").val(0);
            $("#prov_razonsocial").val('');
            $("#prov_ruc").val('');
            $("#prov_telefono").val('');
            $("#prov_correo").val('');
            $("#empresa_id").val('');
            $("#emp_razon_social").val('');
            $("#sucursal_id").val('');
            $("#suc_razon_social").val('');
        }
    } else {
        $("#divPresupuesto").show();
        $("#divPedido").hide();
        $("#presupuestos").removeAttr("disabled");
        $("#prov_razonsocial").attr("disabled", "true");
        if (esNuevo) {
            $("#pedido_id").val(0);
            $("#pedido_desc").val('');
            $("#proveedor_id").val(0);
            $("#prov_razonsocial").val('');
            $("#prov_ruc").val('');
            $("#prov_telefono").val('');
            $("#prov_correo").val('');
        }
    }
}

// Busca pedidos CONFIRMADOS por número
function buscarPedidoDirecto() {
    var term = $("#pedido_desc").val();
    $.ajax({
        url: getUrl() + "pedidos/buscar",
        method: "POST",
        dataType: "json",
        data: { numero: term }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPedidoDirecto("
                + rs.pedido_id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ",'"
                + rs.pedido.replace(/'/g, "\\'") + "','"
                + rs.emp_razon_social + "','"
                + rs.suc_razon_social + "')\">"
                + rs.pedido + "</li>";
        }
        lista += "</ul>";
        $("#listaPedido").html(lista).show();
    })
    .fail(function(a, b, c) { alert(c); });
}

function seleccionPedidoDirecto(pedido_id, empresa_id, sucursal_id, pedido_desc, emp_razon_social, suc_razon_social) {
    $("#pedido_id").val(pedido_id);
    $("#pedido_desc").val(pedido_desc);
    // Empresa y sucursal vienen del pedido
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    // Asegurar que proveedor esté habilitado para buscar
    $("#prov_razonsocial").removeAttr("disabled").focus();
    $("#listaPedido").html("").hide();
    $(".form-line").attr("class", "form-line focused");
}

// Busca proveedores (usado en modo Pedido Directo)
function buscarProveedorDirecto() {
    var term = $("#prov_razonsocial").val();
    if (term.length < 2) { $("#listaProveedor").hide(); return; }
    $.ajax({
        url: getUrl() + "proveedores/buscar",
        method: "POST",
        dataType: "json",
        data: { prov_razonsocial: term }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedorDirecto("
                + rs.id + ",'"
                + rs.prov_razonsocial.replace(/'/g, "\\'") + "','"
                + (rs.prov_ruc || '') + "','"
                + (rs.prov_telefono || '') + "','"
                + (rs.prov_correo || '') + "')\">"
                + rs.prov_razonsocial + " - " + (rs.prov_ruc || '') + "</li>";
        }
        lista += "</ul>";
        $("#listaProveedor").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(a, b, c) { alert(c); });
}

function seleccionProveedorDirecto(id, razonsocial, ruc, telefono, correo) {
    $("#proveedor_id").val(id);
    $("#prov_razonsocial").val(razonsocial);
    $("#prov_ruc").val(ruc);
    $("#prov_telefono").val(telefono);
    $("#prov_correo").val(correo);
    $("#listaProveedor").html("").hide();
    $(".form-line").attr("class", "form-line focused");
}

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
        } else {
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}
