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
                title:'Listado de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Compras'
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
function cancelar() {
    location.reload(true);
}

// Prepara el formulario para agregar una nueva compra.
function agregar() {
    $("#txtOperacion").val(1); // Indica operación de agregar
    $("#id").val(0); // Resetea el campo ID
    $("#comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").attr("disabled", "true");
    $("#comp_timbrado").removeAttr("disabled");
    $("#comp_nro_factura").removeAttr("disabled");
    $("#comp_fecha_emision").removeAttr("disabled");
    $("#ordencompra").removeAttr("disabled");
    $("#condicion_pago").attr("disabled", "true");
    $("#emp_razon_social").attr("disabled", "true");
    $("#suc_razon_social").attr("disabled", "true");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");
}

// Prepara el formulario para editar una compra existente.
function editar() {
    $("#txtOperacion").val(2); // Indica operación de editar
    $("#comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").attr("disabled", "true");
    $("#comp_timbrado").removeAttr("disabled");
    $("#comp_nro_factura").removeAttr("disabled");
    $("#comp_fecha_emision").removeAttr("disabled");
    $("#ordencompra").removeAttr("disabled");
    $("#condicion_pago").attr("disabled", "true");
    $("#emp_razon_social").attr("disabled", "true");
    $("#suc_razon_social").attr("disabled", "true");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

// Prepara el formulario para eliminar una compra.
function eliminar() {
    $("#txtOperacion").val(3); // Indica operación de eliminar

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para confirmar una compra.
function confirmar() {
    $("#txtOperacion").val(4); // Indica operación de confirmar

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

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
    if(oper === 4) {
        titulo = "RECIBIDO";
        pregunta = "DESEA CONFIRMAR LA RECEPCIÓN DE LA COMPRA SELECCIONADA?";
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
function mensajeOperacion(titulo, mensaje, tipo) {
    swal(titulo, mensaje, tipo);
}

// Inicializar fechas por defecto al mes actual
(function() {
    var hoy   = new Date();
    var desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    document.getElementById('filtro_desde').value = desde.toISOString().slice(0,10);
    document.getElementById('filtro_hasta').value  = hoy.toISOString().slice(0,10);
})();

// Lista los registros de compra mediante una solicitud AJAX
function listar() {
    var desde = document.getElementById('filtro_desde').value;
    var hasta = document.getElementById('filtro_hasta').value;
    $.ajax({
        url: getUrl() + "compras/read",
        method: "GET",
        dataType: "json",
        data: { desde: desde, hasta: hasta }
    })
    .done(function(resultado) {
        var lista = "";
        for (rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionCompra(" + rs.id + "," + rs.proveedor_id + "," + rs.empresa_id + "," + rs.sucursal_id + "," + rs.orden_compra_cab_id + ",'" + rs.emp_razon_social + "','" + rs.suc_razon_social + "','" + rs.ordencompra + "','" + rs.comp_intervalo_fecha_vence + "','" + rs.comp_fecha + "','" + rs.comp_estado + "','" + rs.comp_cant_cuota + "','" + rs.encargado + "','" + rs.prov_razonsocial + "','" + rs.prov_ruc + "','" + rs.prov_telefono + "','" + rs.prov_correo + "','" + rs.condicion_pago + "','" + (rs.comp_timbrado || '') + "','" + (rs.comp_nro_factura || '') + "','" + (rs.comp_fecha_emision || '') + "');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.comp_nro_factura || '-') + "</td>";
            lista += "<td>" + (rs.comp_timbrado || '-') + "</td>";
            lista += "<td>" + rs.comp_intervalo_fecha_vence + "</td>";
            lista += "<td>" + rs.comp_fecha + "</td>";
            lista += "<td>" + rs.ordencompra + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.comp_cant_cuota + "</td>";
            lista += "<td>" + rs.comp_estado + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
    });
}

// Rellena el formulario con los datos de un pedido seleccionado.
function seleccionCompra(id_compra_cab, proveedor_id, empresa_id, sucursal_id, orden_compra_cab_id, emp_razon_social, suc_razon_social, ordencompra, comp_intervalo_fecha_vence, comp_fecha, comp_estado, comp_cant_cuota, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, condicion_pago, comp_timbrado, comp_nro_factura, comp_fecha_emision) {
    $("#id").val(id_compra_cab);
    $("#proveedor_id").val(proveedor_id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#orden_compra_cab_id").val(orden_compra_cab_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#ordencompra").val(ordencompra);
    $("#comp_intervalo_fecha_vence").val(comp_intervalo_fecha_vence);
    $("#comp_fecha").val(comp_fecha);
    $("#comp_estado").val(comp_estado);
    $("#comp_cant_cuota").val(comp_cant_cuota);
    $("#encargado").val(encargado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#condicion_pago").val(condicion_pago);
    $("#comp_timbrado").val(comp_timbrado);
    $("#comp_nro_factura").val(comp_nro_factura || '');
    $("#comp_fecha_emision").val(comp_fecha_emision || '');

    // Mostrar y ocultar secciones según sea necesario
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

    if(comp_estado === "PENDIENTE"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if(comp_estado === "RECIBIDO"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        $("#btnEditar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function mascararFechaComp(input) {
    var v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 4) v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
    else if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
    input.value = v;
}

function validarFechaEmisionComp() {
    var val = $('#comp_fecha_emision').val().trim();
    var aviso = $('#avisoFechaEmisionComp');
    if (!val) { aviso.hide(); $('#comp_fecha_emision').css('border-color',''); return; }
    var m = moment(val, 'DD/MM/YYYY', true);
    if (!m.isValid()) {
        $('#comp_fecha_emision').css('border-color','#e74c3c');
        aviso.text('Formato: DD/MM/YYYY').show();
    } else if (m.isAfter(moment(), 'day')) {
        $('#comp_fecha_emision').css('border-color','#e74c3c');
        aviso.text('La fecha de emisión no puede ser futura.').show();
    } else {
        $('#comp_fecha_emision').css('border-color',''); aviso.hide();
    }
}

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

var FMT_COMP = 'YYYY-MM-DD HH:mm:ss';

// ─── VALIDACIONES EN TIEMPO REAL ─────────────────────────────────────────────
function validarFechaComp() {
    var val = $('#comp_fecha').val().trim();
    var aviso = $('#avisoFechaComp');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, FMT_COMP, true);
    if (!m.isValid()) {
        $('#comp_fecha').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
    } else if (!m.clone().startOf('day').isSame(moment().startOf('day'))) {
        $('#comp_fecha').css('border-color','#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#comp_fecha').css('border-color',''); aviso.hide();
    }
}

function validarIFVComp() {
    var condicion = $('#condicion_pago').val();
    if (condicion !== 'CREDITO') { $('#avisoIFVComp').hide(); return; }
    var val = $('#comp_intervalo_fecha_vence').val().trim();
    var aviso = $('#avisoIFVComp');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, FMT_COMP, true);
    if (!m.isValid()) {
        $('#comp_intervalo_fecha_vence').css('border-color','#e74c3c');
        aviso.text('Formato inválido.').show();
    } else if (m.clone().startOf('day').isBefore(moment().startOf('day'))) {
        $('#comp_intervalo_fecha_vence').css('border-color','#e74c3c');
        aviso.text('La fecha de vencimiento no puede ser pasada.').show();
    } else {
        $('#comp_intervalo_fecha_vence').css('border-color',''); aviso.hide();
    }
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
function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    const CompraId    = $("#id").val();
    const estadoCompra = $("#comp_estado").val();

    if (!CompraId) {
        alert("No se ha definido el ID de la compra.");
        return;
    }

    $.ajax({
        url: getUrl() + "compradet/read/" + CompraId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = rs.comp_det_cantidad || 0;
                const costo    = rs.item_costo || 0;
                const subtotal = cantidad * costo;
                const imp = (rs.tip_imp_nom || '').toUpperCase();
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

                lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.item_id + "," + rs.tipo_impuesto_id + ",'" + rs.item_decripcion + "','" + (rs.tip_imp_nom || '-') + "'," + cantidad + ", " + costo + ", '" + formatearNumero(subtotal) + "', '" + formatearNumero(iva) + "'," + (rs.deposito_id||0) + ");\">";
                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td>" + (rs.marc_nom  || '—') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '—') + "</td>";
                lista += "<td>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.tip_imp_nom || '-') + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "<td>" + getNombreDeposito(rs.deposito_id) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='10' class='text-center'>No se encontraron detalles para esta compra.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        // Habilitar el botón Confirmar si hay detalles y la orden está pendiente
        if (estadoCompra === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true"); // Deshabilitar si no hay detalles o la orden no está pendiente
        }
    })
    .fail(function(a, b, c) {
        alert("Error al obtener detalles: " + c);
    });
}
function buscarOrdenCompra() {
    $.ajax({
        url: getUrl() + "ordencompracab/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "funcionario_id":$("#funcionario_id").val(),
            "name":$("#ordencompra").val()
        }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionOrdenCompra("+rs.orden_compra_cab_id+","+rs.empresa_id+","+rs.sucursal_id+", '"+rs.ordencompra+"',"+rs.proveedor_id+", '"+rs.prov_razonsocial+"', '"+rs.prov_ruc+"', '"+rs.prov_telefono+"', '"+rs.prov_correo+"', '"+rs.suc_razon_social+"', '"+rs.emp_razon_social+"', '"+rs.ord_comp_intervalo_fecha_vence+"', '"+rs.ord_comp_cant_cuota+"', '"+rs.condicion_pago+"')\">"+rs.ordencompra+"</li>";   
        }
        lista += "</ul>";
        $("#listaOrdenCompra").html(lista);
        $("#listaOrdenCompra").attr("style", "display:block; position: absolute; z-index: 2000;");
    })    
    .fail(function(jqXHR, textStatus, errorThrown) {
    });
}
function seleccionOrdenCompra(orden_compra_cab_id, empresa_id, sucursal_id, ordencompra, proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, suc_razon_social, emp_razon_social,ord_comp_intervalo_fecha_vence,ord_comp_cant_cuota,condicion_pago) {
    // Asigna valores a los campos correspondientes
    $("#orden_compra_cab_id").val(orden_compra_cab_id);
    $("#ordencompra").val(ordencompra);
    $("#comp_intervalo_fecha_vence").val(ord_comp_intervalo_fecha_vence);
    $("#comp_cant_cuota").val(ord_comp_cant_cuota);
    $("#condicion_pago").val(condicion_pago);

    // Autocompletar los campos del proveedor
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial); // Razon social del proveedor
    $("#prov_ruc").val(prov_ruc);                 // RUC del proveedor
    $("#prov_telefono").val(prov_telefono);       // Teléfono del proveedor
    $("#prov_correo").val(prov_correo);           // Correo del proveedor

    // Autocompletar campos de empresa y sucursal
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social); // Razon social de la sucursal
    $("#emp_razon_social").val(emp_razon_social); // Razon social de la empresa

    // Limpiar lista de orden de compra
    $("#listaOrdenCompra").html("");
    $("#listaOrdenCompra").attr("style", "display:none;");

    // Marcar los campos como "focused"
    $(".form-line").attr("class", "form-line focused");
}


// Realiza operaciones de creación, edición, anulación y confirmación de una compra
function grabar() {
    var endpoint = "compras/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "compras/update/" + $("#id").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) {
        endpoint = "compras/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if ($("#txtOperacion").val() == 4) {
        endpoint = "compras/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "RECIBIDO";
    }
    var errores = [];
    var condicion = $('#condicion_pago').val();

    // Fecha de la compra (debe ser hoy)
    var fechaVal = $('#comp_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha de la compra es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, FMT_COMP, true);
        if (!mFecha.isValid()) errores.push('El formato de la fecha es inválido.');
        else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day')))
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
    }

    // Fecha de emisión (requerida, no futura)
    var fechaEmision = $.trim($('#comp_fecha_emision').val());
    if (!fechaEmision) {
        errores.push('La fecha de emisión de la factura es obligatoria.');
    } else {
        var mEmision = moment(fechaEmision, 'DD/MM/YYYY', true);
        if (!mEmision.isValid()) errores.push('La fecha de emisión tiene formato inválido. Use DD/MM/YYYY.');
        else if (mEmision.isAfter(moment(), 'day')) errores.push('La fecha de emisión no puede ser futura.');
    }

    // Orden de compra requerida
    if (!$('#orden_compra_cab_id').val() || $('#orden_compra_cab_id').val() == '0')
        errores.push('Debe seleccionar una Orden de Compra.');

    // Validaciones para CRÉDITO
    if (condicion === 'CREDITO') {
        var ifv = $('#comp_intervalo_fecha_vence').val().trim();
        if (!ifv) {
            errores.push('El intervalo de vencimiento es obligatorio para condición CRÉDITO.');
        } else {
            var mIFV = moment(ifv, FMT_COMP, true);
            if (!mIFV.isValid()) errores.push('El formato del intervalo de vencimiento es inválido.');
            else if (mIFV.clone().startOf('day').isBefore(moment().startOf('day')))
                errores.push('El intervalo de vencimiento no puede ser una fecha pasada.');
        }
        var cuotas = parseInt($('#comp_cant_cuota').val());
        if (!cuotas || cuotas <= 0) errores.push('La cantidad de cuotas es obligatoria para condición CRÉDITO.');
    }

    // Número de factura: si tiene valor, validar formato
    var nroFactura = $.trim($('#comp_nro_factura').val());
    if (nroFactura && !/^\d{3}-\d{3}-\d{7}$/.test(nroFactura))
        errores.push('El Nro. de Factura debe tener el formato 000-000-0000000.');

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
            'comp_intervalo_fecha_vence': $("#comp_intervalo_fecha_vence").val(),
            'comp_fecha': $("#comp_fecha").val(),
            'comp_estado': estado,
            'comp_cant_cuota': $("#comp_cant_cuota").val(),
            'condicion_pago': $("#condicion_pago").val(),
            'comp_timbrado': $("#comp_timbrado").val(),
            'comp_nro_factura': nroFactura || null,
            'comp_fecha_emision': fechaEmision
                ? moment(fechaEmision, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            'funcionario_id': $("#funcionario_id").val(),
            'orden_compra_cab_id': $("#orden_compra_cab_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val()
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
                if(resultado.registro.comp_estado!="PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
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

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
    $('#comp_fecha').on('change', function() { validarFechaComp(); });
    $('#comp_intervalo_fecha_vence').on('change', function() { validarIFVComp(); });
    $('#condicion_pago').on('change', function() {
        if ($(this).val() === 'CONTADO') {
            $('#comp_intervalo_fecha_vence').css('border-color','');
            $('#avisoIFVComp').hide();
        } else { validarIFVComp(); }
    });
}
