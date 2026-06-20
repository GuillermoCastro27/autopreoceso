// Arrays pre-save para múltiples pedidos y órdenes
var pedidosPreSave = [];
var ordenesPreSave = [];
var todosPedidosPanel = [];
var todasOrdenesPanel = [];

cargarFuncionarioIdLogueado();
listar();
campoFecha();

var listaDepositos = [];
function cargarDepositos() {
    $.ajax({ url: getUrl()+'deposito/read', method:'GET', dataType:'json', success:function(data){ listaDepositos=data; } });
}
cargarDepositos();
function getNombreDeposito(id) {
    var d = listaDepositos.find(function(x){ return x.id==id; });
    return d ? d.dep_nombre : '-';
}

// ─── VENTA DIRECTA ───────────────────────────────────────────────────────────
function onVentaDirectaChange() {
    var directa = $('#chkVentaDirecta').is(':checked');
    if (directa) {
        $('#lblVentaDirecta').css({ background: '#e3f2fd', borderColor: '#1976d2', color: '#1565c0' });
        $('#seccionPedidosOrdenes').hide();
        pedidosPreSave = [];
        ordenesPreSave = [];
        renderizarPedidosPreSave();
        renderizarOrdenesPreSave();
        cerrarPanelPedidos();
        cerrarPanelOrdenes();
        if ($("#txtOperacion").val() == 1) {
            $("#cli_nombre").removeAttr("disabled");
        }
    } else {
        $('#lblVentaDirecta').css({ background: '#f5f5f5', borderColor: '#b0bec5', color: '#546e7a' });
        $('#seccionPedidosOrdenes').show();
    }
}

// ─── MARCA / MODELO ESTADO ───────────────────────────────────────────────────
var _marcaIdSel   = null;
var _modeloIdSel  = null;
var _ajaxMarcas   = null;
var _ajaxModelos  = null;
var _cacheMarcas  = {};
var _cacheModelos = {};

$(function() {
    $(document).off('change', '#marca_det').on('change', '#marca_det', function() {
        _marcaIdSel  = $(this).val() || null;
        _modeloIdSel = null;
        $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
        if (!_marcaIdSel) return;
        var itemId = $('#item_id').val();
        if (!itemId) return;
        var data = _cacheModelos[itemId];
        if (data) {
            _poblarModeloSelect(data, _marcaIdSel, null, $('#modelo_det'));
        } else {
            $.get(getUrl() + 'items/' + itemId + '/modelos', function(d) {
                _cacheModelos[itemId] = d;
                _poblarModeloSelect(d, _marcaIdSel, null, $('#modelo_det'));
            });
        }
    });
    $(document).off('change', '#modelo_det').on('change', '#modelo_det', function() {
        _modeloIdSel = $(this).val() || null;
    });
});

function cargarMarcasVenta(itemId, marcaSelId) {
    _marcaIdSel  = null;
    _modeloIdSel = null;
    var select = $('#marca_det');
    select.html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!itemId) return;

    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    if (_cacheMarcas[itemId]) {
        _poblarMarcaSelect(_cacheMarcas[itemId], marcaSelId, select, itemId);
        return;
    }

    _ajaxMarcas = $.get(getUrl() + 'items/' + itemId + '/marcas', function(data) {
        _ajaxMarcas = null;
        _cacheMarcas[itemId] = data;
        if (!data.length) return;
        _poblarMarcaSelect(data, marcaSelId, select, itemId);
    });
}

function _poblarMarcaSelect(data, marcaSelId, select, itemId) {
    var opts = '<option value="">-- Marca --</option>';
    data.forEach(function(m) {
        var id  = m.marca_id || m.id;
        var sel = (id == marcaSelId) ? ' selected' : '';
        opts += '<option value="' + id + '"' + sel + '>' + m.mar_nom + '</option>';
    });
    select.html(opts).prop('disabled', false);
    if (marcaSelId) {
        _marcaIdSel = marcaSelId;
        var modData = _cacheModelos[itemId];
        if (modData) {
            _poblarModeloSelect(modData, marcaSelId, null, $('#modelo_det'));
        } else {
            $.get(getUrl() + 'items/' + itemId + '/modelos', function(d) {
                _cacheModelos[itemId] = d;
                _poblarModeloSelect(d, marcaSelId, null, $('#modelo_det'));
            });
        }
    }
}

function _poblarModeloSelect(data, marcaId, modeloSelId, select) {
    var opts = '<option value="">-- Modelo --</option>';
    data.forEach(function(m) {
        var id    = m.modelo_id || m.id;
        var label = m.modelo_nom + (m.modelo_año ? ' (' + m.modelo_año + ')' : '');
        var sel   = (id == modeloSelId) ? ' selected' : '';
        opts += '<option value="' + id + '"' + sel + '>' + label + '</option>';
    });
    select.html(opts).prop('disabled', false);
    if (modeloSelId) { select.val(modeloSelId); _modeloIdSel = modeloSelId; }
}

function cargarDepositosVenta(selectedId) {
    var sucId = $('#sucursal_id').val();
    var select = $('#deposito_id_det');
    if (!sucId) {
        select.html('<option value="">-- Depósito (seleccione primero) --</option>');
        return;
    }
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucId, function(data) {
        var opts = '<option value="">-- Depósito (seleccione primero) --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selectedId ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        select.html(opts);
        if (selectedId) {
            $('#item_descripcion').prop('disabled', false).attr('placeholder', 'Buscar producto...');
        }
    });
}

function onDepositoChange() {
    var depId = $('#deposito_id_det').val();
    $('#item_id').val('');
    $('#item_descripcion').val('');
    $('#cantidad_stock').val('');
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();

    if (depId) {
        $('#item_descripcion').prop('disabled', false).attr('placeholder', 'Buscar producto...');
    } else {
        $('#item_descripcion').prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
        $('#det_cantidad').prop('disabled', true);
    }
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
                title:'Listado de Ventas'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ventas'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ventas'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ventas'
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

// Prepara el formulario para agregar una nueva venta.
function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val("");
    $("#vent_intervalo_fecha_vence").attr("disabled", "true");
    $("#vent_fecha").removeAttr("disabled");
    $("#vent_cant_cuota").attr("disabled", "true");
    $("#condicion_pago").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#suc_razon_social").attr("disabled", "true");

    $("#cli_nombre").removeAttr("disabled");

    // Botones de panel deshabilitados hasta seleccionar cliente
    $("#btnAbrirPanelPedidos").attr("disabled", true);
    $("#btnAbrirPanelOrdenes").attr("disabled", true);
    cerrarPanelPedidos();
    cerrarPanelOrdenes();

    // Limpiar arrays pre-save y resetear checkbox venta directa
    pedidosPreSave = [];
    ordenesPreSave = [];
    renderizarPedidosPreSave();
    renderizarOrdenesPreSave();
    $('#chkVentaDirecta').prop('checked', false).prop('disabled', false);
    $('#lblVentaDirecta').css({ background: '#f5f5f5', borderColor: '#b0bec5', color: '#546e7a', opacity: '1', cursor: 'pointer' });
    $('#seccionPedidosOrdenes').show();

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");

    if ($("#empresa_id").val() && $("#sucursal_id").val()) {
        cargarTimbrado();
    } else {
        buscarEmpresas();
    }
}

// Prepara el formulario para editar una venta existente.
function editar() {
    $("#txtOperacion").val(2);
    $("#vent_intervalo_fecha_vence").attr("disabled", "true");
    $("#vent_fecha").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");

    // Habilitar cuota para que el usuario pueda corregirla si es necesario
    controlarCamposPago();

    // Cliente ya cargado — habilitar paneles directamente
    $("#btnAbrirPanelPedidos").removeAttr("disabled");
    $("#btnAbrirPanelOrdenes").removeAttr("disabled");

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
        titulo = "CONFIRMAR";
        pregunta = "¿DESEA CONFIRMAR LA VENTA SELECCIONADA?";
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

// Lista los registros de ventas mediante una solicitud AJAX
function listar() {
    var desde = document.getElementById('filtro_desde').value;
    var hasta = document.getElementById('filtro_hasta').value;
    $.ajax({
        url: getUrl() + "ventas_cab/read",
        method: "GET",
        dataType: "json",
        data: { desde: desde, hasta: hasta }
    })
    .done(function(resultado) {

        var lista = "";

        for (rs of resultado) {

            lista += "<tr class='item-list' onclick=\"seleccionVenta(" +
                rs.id + "," +
                rs.clientes_id + "," +
                rs.empresa_id + "," +
                rs.sucursal_id + ",'" +
                rs.emp_razon_social + "','" +
                rs.suc_razon_social + "','" +
                rs.pedido_venta + "','" +
                rs.vent_intervalo_fecha_vence + "','" +
                rs.vent_fecha + "','" +
                rs.vent_estado + "','" +
                rs.vent_cant_cuota + "','" +
                rs.encargado + "','" +
                rs.cli_nombre + "','" +
                rs.cli_apellido + "','" +
                rs.cli_ruc + "','" +
                rs.cli_direccion + "','" +
                rs.cli_telefono + "','" +
                rs.cli_correo + "','" +
                rs.condicion_pago + "','" +
                (rs.vent_nro_factura || '') + "','" +
                (rs.tim_numero || '') + "','" +
                (rs.tim_fecha_fin ? rs.tim_fecha_fin.substring(0,10) : '') +
            "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.vent_nro_factura || '-') + "</td>";
            lista += "<td>" + rs.vent_intervalo_fecha_vence + "</td>";
            lista += "<td>" + rs.vent_fecha + "</td>";
            lista += "<td>" + rs.pedido_venta + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.vent_cant_cuota + "</td>";
            lista += "<td>" + rs.vent_estado + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}
function seleccionVenta(
    id,
    clientes_id,
    empresa_id,
    sucursal_id,
    emp_razon_social,
    suc_razon_social,
    pedido_venta,
    vent_intervalo_fecha_vence,
    vent_fecha,
    vent_estado,
    vent_cant_cuota,
    encargado,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,
    condicion_pago,
    vent_nro_factura,
    tim_numero,
    tim_fecha_fin
) {

    $("#id").val(id);
    $("#clientes_id").val(clientes_id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#pedido_venta").val(pedido_venta);

    $("#vent_intervalo_fecha_vence").val(vent_intervalo_fecha_vence);
    $("#vent_fecha").val(vent_fecha);
    $("#vent_estado").val(vent_estado);
    $("#vent_cant_cuota").val(vent_cant_cuota);
    $("#condicion_pago").val(condicion_pago);

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // Mostrar datos del timbrado almacenados
    $("#vent_nro_comprobante").val(vent_nro_factura || '');
    $("#tim_numero_display").val(tim_numero || '');
    $("#tim_vence_display").val(tim_fecha_fin || '—');

    // Determinar si es venta directa (sin pedido ni orden vinculada)
    var esDirecta = !pedido_venta || pedido_venta.trim() === '' || pedido_venta === 'null';
    $('#chkVentaDirecta').prop('checked', esDirecta).prop('disabled', true);
    if (esDirecta) {
        $('#lblVentaDirecta').css({ background: '#e3f2fd', borderColor: '#1976d2', color: '#1565c0', opacity: '0.8', cursor: 'default' });
        $('#seccionPedidosOrdenes').hide();
    } else {
        $('#lblVentaDirecta').css({ background: '#f5f5f5', borderColor: '#b0bec5', color: '#546e7a', opacity: '0.8', cursor: 'default' });
        $('#seccionPedidosOrdenes').show();
    }

    // Mostrar secciones
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    cargarDetalleVenta(id);

    // Reset botones
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnGrabar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);
    $("#btnImprimir").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    if (vent_estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        cancelarDetalle();
        $("#formDetalles").show();
    } else if (vent_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
        $("#btnImprimir").removeAttr("disabled");
    } else if (vent_estado === "PROCESADO") {
        $("#btnImprimir").removeAttr("disabled");
    } else if (vent_estado === "ANULADO") {
        // Todos los botones permanecen deshabilitados
    }

    $(".form-line").addClass("focused");
}

function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function cargarDetalleVenta(ventaId) {
    listarDetalles();
}

function listarDetalles() {
    var ventasCabId = $("#id").val();
    if (!ventasCabId) return;
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;
    var estadoVenta = $("#vent_estado").val();

    $.ajax({
        url: getUrl() + "ventas_det/read/" + ventasCabId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (var rs of resultado) {
            var cantidad = parseFloat(rs.vent_det_cantidad) || 0;
            var precio   = parseFloat(rs.vent_det_precio)   || 0;
            var subtotal = parseFloat(rs.subtotal)          || (cantidad * precio);
            var iva      = parseFloat(rs.iva)               || 0;
            var imp = (rs.tipo_imp_nom || '').toUpperCase();
            if (imp.indexOf('EXENT') !== -1) {
                iva = 0;
            } else if (imp.indexOf('5') !== -1) {
                iva = Math.round(subtotal / 21);
                TotalIva5 += iva;
            } else {
                iva = Math.round(subtotal / 11);
                TotalIva10 += iva;
            }
            lista += "<tr class='item-list' onclick=\"seleccionDetalle("
                + rs.item_id + ",'"
                + (rs.item_descripcion || '').replace(/'/g, "\\'") + "',"
                + cantidad + ","
                + precio + ","
                + (rs.cantidad_stock || 0) + ","
                + (rs.deposito_id || 0) + ","
                + (rs.marca_id    || 0) + ","
                + (rs.modelo_id   || 0) + ","
                + (rs.tipo_impuesto_id || 0) + ")\">";
            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + (rs.item_descripcion || '') + "</td>";
            lista += "<td>" + (rs.mar_nom  || '—') + "</td>";
            lista += "<td>" + (rs.modelo_nom ? rs.modelo_nom + (rs.modelo_año ? ' (' + rs.modelo_año + ')' : '') : '—') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(precio) + "</td>";
            lista += "<td>" + (rs.dep_nombre || getNombreDeposito(rs.deposito_id)) + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
            TotalGral += subtotal;
        }

        if (!lista) {
            lista = "<tr><td colspan='9' class='text-center text-muted'>No se encontraron detalles para esta venta.</td></tr>";
        }
        $("#tableDetalle").html(lista);
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));

        if (estadoVenta === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionDetalle(item_id, item_descripcion, det_cantidad, det_precio, cantidad_stock, deposito_id, marca_id, modelo_id, tipo_impuesto_id) {
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#det_precio").val(det_precio);
    $("#cantidad_stock").val(cantidad_stock);
    $("#det_tipo_impuesto_id").val(tipo_impuesto_id);
    _marcaIdSel  = marca_id  || null;
    _modeloIdSel = modelo_id || null;
    cargarDepositosVenta(deposito_id);

    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);

    if (marca_id) {
        function poblarMarca(marcas) {
            var opts = '<option value="">-- Marca --</option>';
            marcas.forEach(function(m) {
                var id = m.marca_id || m.id;
                opts += '<option value="' + id + '"' + (id == marca_id ? ' selected' : '') + '>' + m.mar_nom + '</option>';
            });
            $('#marca_det').html(opts).val(marca_id).prop('disabled', true);
        }
        function poblarModelo(modelos) {
            var mopts = '<option value="">-- Modelo --</option>';
            modelos.forEach(function(m) {
                var id = m.modelo_id || m.id;
                mopts += '<option value="' + id + '"' + (id == modelo_id ? ' selected' : '') + '>' + m.modelo_nom + (m.modelo_año ? ' (' + m.modelo_año + ')' : '') + '</option>';
            });
            if (modelo_id) $('#modelo_det').html(mopts).val(modelo_id).prop('disabled', true);
        }
        if (_cacheMarcas[item_id]) {
            poblarMarca(_cacheMarcas[item_id]);
        } else {
            $.get(getUrl() + 'items/' + item_id + '/marcas', function(d) { _cacheMarcas[item_id] = d; poblarMarca(d); });
        }
        if (modelo_id) {
            if (_cacheModelos[item_id]) {
                poblarModelo(_cacheModelos[item_id]);
            } else {
                $.get(getUrl() + 'items/' + item_id + '/modelos', function(d) { _cacheModelos[item_id] = d; poblarModelo(d); });
            }
        }
    }
    $(".form-line").addClass("focused");
}

function buscarCliente() {
    var texto = $("#cli_nombre").val();
    if (texto.length < 2) { $("#listaClientes").hide(); return; }

    $.ajax({
        url: getUrl() + "clientes/buscar",
        method: "POST",
        dataType: "json",
        data: { cli_nombre: texto }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var nom = (rs.cli_nombre    || '').replace(/'/g, "\\'");
            var ape = (rs.cli_apellido  || '').replace(/'/g, "\\'");
            var ruc = (rs.cli_ruc       || '').replace(/'/g, "\\'");
            var dir = (rs.cli_direccion || '').replace(/'/g, "\\'");
            var tel = (rs.cli_telefono  || '').replace(/'/g, "\\'");
            var cor = (rs.cli_correo    || '').replace(/'/g, "\\'");
            lista += "<li class='list-group-item' onclick=\"seleccionCliente(" +
                rs.clientes_id + ",'" + nom + "','" + ape + "','" + ruc +
                "','" + dir + "','" + tel + "','" + cor + "');\">" +
                rs.cli_nombre + " " + rs.cli_apellido + " — " + rs.cli_ruc +
            "</li>";
        }
        lista += "</ul>";
        $("#listaClientes").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionCliente(clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_direccion, cli_telefono, cli_correo) {
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#listaClientes").html("").hide();

    // Cliente elegido → habilitar paneles
    $("#btnAbrirPanelPedidos").removeAttr("disabled");
    $("#btnAbrirPanelOrdenes").removeAttr("disabled");

    $(".form-line").addClass("focused");
}

// ===================== PANEL MULTI-SELECT PEDIDOS =====================

function abrirPanelPedidos() {
    var clienteId = $("#clientes_id").val();
    if (!clienteId) {
        swal("Atención", "Seleccione un cliente primero.", "warning");
        return;
    }
    $("#panelMultiPedidos").show();
    $("#filtroPanelPedidos").val('');
    $("#listaPanelPedidos").html("<p class='text-center text-muted' style='padding:8px;'>Cargando...</p>");

    $.ajax({
        url: getUrl() + "pedido_ventas/buscar",
        method: "POST",
        dataType: "json",
        data: { clientes_id: clienteId, q: '' }
    })
    .done(function(resultado) {
        todosPedidosPanel = resultado;
        renderizarPanelPedidos(resultado);
    })
    .fail(function() {
        $("#listaPanelPedidos").html("<p class='text-center text-danger' style='padding:8px;'>Error al cargar pedidos.</p>");
    });
}

function cerrarPanelPedidos() {
    $("#panelMultiPedidos").hide();
    $("#filtroPanelPedidos").val('');
}

function filtrarPanelPedidos() {
    var texto = $("#filtroPanelPedidos").val().toLowerCase();
    var filtrados = todosPedidosPanel.filter(function(p) {
        return (p.pedido || '').toLowerCase().indexOf(texto) !== -1;
    });
    renderizarPanelPedidos(filtrados);
}

function renderizarPanelPedidos(pedidos) {
    if (!pedidos || pedidos.length === 0) {
        $("#listaPanelPedidos").html(
            "<p class='text-center text-muted' style='padding:8px;'>No se encontraron pedidos confirmados para este cliente.</p>"
        );
        return;
    }
    var html = "";
    for (var i = 0; i < pedidos.length; i++) {
        var p = pedidos[i];
        var yaAgregado = pedidosPreSave.some(function(s) { return s.id === p.id; });
        var dis = yaAgregado ? 'disabled' : '';
        var estiloFila = yaAgregado ? 'color:#aaa;' : '';
        html += "<div style='padding:5px 4px; border-bottom:1px solid #eef3f8;" + estiloFila + "'>";
        html += "<label style='font-weight:normal; margin:0; cursor:" + (yaAgregado ? 'not-allowed' : 'pointer') + ";'>";
        html += "<input type='checkbox' class='ckPedidoVenta' value='" + p.id + "' " + dis;
        html += " data-pedido='" + (p.pedido || '').replace(/'/g, "&#39;") + "'";
        html += " data-cli-nombre='" + (p.cli_nombre || '').replace(/'/g, "&#39;") + "'";
        html += " data-cli-apellido='" + (p.cli_apellido || '').replace(/'/g, "&#39;") + "'";
        html += " data-fecha='" + (p.ped_ven_vence || '') + "'";
        html += " style='margin-right:6px;'> ";
        html += p.pedido;
        if (p.cli_nombre) html += " <small class='text-muted'>— " + p.cli_nombre + " " + (p.cli_apellido || '') + "</small>";
        if (yaAgregado) html += " <span class='label label-default' style='font-size:10px;'>ya agregado</span>";
        html += "</label></div>";
    }
    $("#listaPanelPedidos").html(html);
}

function agregarPedidosMarcados() {
    var marcados = $('.ckPedidoVenta:checked:not(:disabled)');
    if (marcados.length === 0) {
        swal("Atención", "Marque al menos un pedido para agregar.", "warning");
        return;
    }
    var esElPrimero = pedidosPreSave.length === 0 && ordenesPreSave.length === 0;
    marcados.each(function() {
        var $cb = $(this);
        var pedidoId = parseInt($cb.val());
        if (pedidosPreSave.some(function(p) { return p.id === pedidoId; })) return;
        pedidosPreSave.push({
            id:           pedidoId,
            descripcion:  $cb.data('pedido'),
            cli_nombre:   $cb.data('cli-nombre'),
            cli_apellido: $cb.data('cli-apellido'),
            fecha:        $cb.data('fecha') || ''
        });
    });
    if (esElPrimero && pedidosPreSave.length > 0) {
        $("#cli_nombre").attr("disabled", "true");
    }
    cerrarPanelPedidos();
    renderizarPedidosPreSave();
}

// Realiza operaciones de creación, edición, anulación y confirmación de una compra
function grabar() {

    let endpoint = "ventas_cab/create";
    let metodo   = "POST";
    let estado   = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "ventas_cab/update/" + $("#id").val();
        metodo = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "ventas_cab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "ventas_cab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    var pedidosIds  = pedidosPreSave.map(function(p) { return p.id; });
    var ordenesData = ordenesPreSave.map(function(o) {
        return { orden_id: o.orden_id, contrato_id: o.contrato_id };
    });

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id'                        : $("#id").val(),
            'vent_intervalo_fecha_vence': $("#vent_intervalo_fecha_vence").val(),
            'vent_fecha'                : $("#vent_fecha").val(),
            'vent_estado'               : estado,
            'vent_cant_cuota'           : $("#vent_cant_cuota").val(),
            'condicion_pago'            : $("#condicion_pago").val(),
            'funcionario_id'            : $("#funcionario_id").val(),
            'pedidos_ids'               : JSON.stringify(pedidosIds),
            'ordenes_ids'               : JSON.stringify(ordenesData),
            'clientes_id'               : $("#clientes_id").val(),
            'empresa_id'                : $("#empresa_id").val(),
            'sucursal_id'               : $("#sucursal_id").val(),
            'timbrado_id'               : $("#timbrado_id").val() || null,
            'vent_nro_comprobante'      : $("#vent_nro_comprobante").val() || null
        }
    })
    .done(function(resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                var nuevoEstado = resultado.registro.vent_estado;

                $("#id").val(resultado.registro.id);
                $("#vent_estado").val(nuevoEstado);
                pedidosPreSave = [];
                ordenesPreSave = [];

                // Deshabilitar campos del formulario
                $("#vent_fecha, #vent_intervalo_fecha_vence, #vent_cant_cuota, #condicion_pago")
                    .attr("disabled", true);
                $("#cli_nombre, #suc_razon_social").attr("disabled", true);
                $("#btnAbrirPanelPedidos, #btnAbrirPanelOrdenes").attr("disabled", true);
                cerrarPanelPedidos();
                cerrarPanelOrdenes();

                // Resetear todos los botones
                $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar, #btnImprimir")
                    .attr("disabled", true);

                if (nuevoEstado === "PENDIENTE") {
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");
                    // btnConfirmar lo controla listarDetalles() → renderizarDetalles()

                    $("#detalle").show();
                    cancelarDetalle();
                    $("#formDetalles").show();
                    listarDetalles();
                } else {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
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
    .fail(function(xhr) {
        swal("Error", "No se pudo cargar la empresa.", "error");
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

    // Si sucursal no está cargada aún, auto-seleccionar la primera disponible
    if (!$("#sucursal_id").val()) {
        $.ajax({ url: getUrl() + 'sucursal/read', method: 'GET', dataType: 'json' })
        .done(function(sucs) {
            if (sucs.length) {
                $("#sucursal_id").val(sucs[0].id);
                $("#suc_razon_social").val(sucs[0].suc_razon_social);
            }
            cargarTimbrado();
        });
        return;
    }
    cargarTimbrado();
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
    .fail(function(xhr){
        swal("Error", "No se pudo cargar las sucursales.", "error");
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

    cargarTimbrado();
}

function cargarTimbrado() {
    var empId = $("#empresa_id").val();
    var sucId = $("#sucursal_id").val();

    if (!empId || !sucId) return;

    $.ajax({
        url: getUrl() + 'timbrado/para-ventas',
        method: 'GET',
        data: { empresa_id: empId, sucursal_id: sucId, tipo_documento: 'factura' }
    })
    .done(function(res) {
        $("#timbrado_id").val(res.timbrado_id);
        $("#vent_nro_comprobante").val(res.nro_formateado || res.nro_comprobante);
        $("#tim_numero_display").val(res.tim_numero);
        var vence = res.tim_fecha_fin ? res.tim_fecha_fin.substring(0,10) : '—';
        $("#tim_vence_display").val(vence);
        if (res.nros_restantes <= 10) {
            swal('Atención', 'El timbrado ' + res.tim_numero + ' tiene solo ' + res.nros_restantes + ' números restantes.', 'warning');
        }
    })
    .fail(function(xhr) {
        $("#timbrado_id").val('');
        $("#vent_nro_comprobante").val('');
        $("#tim_numero_display").val('Sin timbrado activo');
        $("#tim_vence_display").val('—');
        if (xhr.status !== 403) {
            swal('Sin timbrado', 'No hay un timbrado activo para la empresa y sucursal seleccionadas. Registre uno en Referenciales → Timbrado.', 'warning');
        }
    });
}

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
        $('#funcionario_id').val(datosSesion.user.funcionario_id);
    } else {
        swal("Sesión expirada", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}

// ===================== PANEL MULTI-SELECT ÓRDENES =====================

function abrirPanelOrdenes() {
    var clienteId = $("#clientes_id").val();
    if (!clienteId) {
        swal("Atención", "Seleccione un cliente primero.", "warning");
        return;
    }
    $("#panelMultiOrdenes").show();
    $("#filtroPanelOrdenes").val('');
    $("#listaPanelOrdenes").html("<p class='text-center text-muted' style='padding:8px;'>Cargando...</p>");

    $.ajax({
        url: getUrl() + "ordenservventa/buscar-ordenes?q=&clientes_id=" + clienteId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        todasOrdenesPanel = resultado;
        renderizarPanelOrdenes(resultado);
    })
    .fail(function() {
        $("#listaPanelOrdenes").html("<p class='text-center text-danger' style='padding:8px;'>Error al cargar órdenes.</p>");
    });
}

function cerrarPanelOrdenes() {
    $("#panelMultiOrdenes").hide();
    $("#filtroPanelOrdenes").val('');
}

function filtrarPanelOrdenes() {
    var texto = $("#filtroPanelOrdenes").val().toLowerCase();
    var filtrados = todasOrdenesPanel.filter(function(o) {
        return (o.orden_descripcion || '').toLowerCase().indexOf(texto) !== -1 ||
               (o.contrato_descripcion || '').toLowerCase().indexOf(texto) !== -1;
    });
    renderizarPanelOrdenes(filtrados);
}

function renderizarPanelOrdenes(ordenes) {
    if (!ordenes || ordenes.length === 0) {
        $("#listaPanelOrdenes").html(
            "<p class='text-center text-muted' style='padding:8px;'>No se encontraron órdenes confirmadas para este cliente.</p>"
        );
        return;
    }
    var html = "";
    for (var i = 0; i < ordenes.length; i++) {
        var o = ordenes[i];
        var yaAgregada = ordenesPreSave.some(function(s) { return s.orden_id === o.orden_serv_cab_id; });
        var dis = yaAgregada ? 'disabled' : '';
        var estiloFila = yaAgregada ? 'color:#aaa;' : '';
        html += "<div style='padding:5px 4px; border-bottom:1px solid #eef8f0;" + estiloFila + "'>";
        html += "<label style='font-weight:normal; margin:0; cursor:" + (yaAgregada ? 'not-allowed' : 'pointer') + ";'>";
        html += "<input type='checkbox' class='ckOrdenServ' value='" + o.orden_serv_cab_id + "' " + dis;
        html += " data-contrato-id='" + (o.contrato_serv_cab_id || 0) + "'";
        html += " data-orden-desc='" + (o.orden_descripcion || '').replace(/'/g, "&#39;") + "'";
        html += " data-contrato-desc='" + (o.contrato_descripcion || 'Sin contrato').replace(/'/g, "&#39;") + "'";
        html += " data-cli-nombre='" + (o.cli_nombre || '').replace(/'/g, "&#39;") + "'";
        html += " data-cli-apellido='" + (o.cli_apellido || '').replace(/'/g, "&#39;") + "'";
        html += " style='margin-right:6px;'> ";
        html += o.orden_descripcion;
        if (o.contrato_descripcion) html += " <small class='text-muted'>— " + o.contrato_descripcion + "</small>";
        if (yaAgregada) html += " <span class='label label-default' style='font-size:10px;'>ya agregada</span>";
        html += "</label></div>";
    }
    $("#listaPanelOrdenes").html(html);
}

function agregarOrdenesMarcadas() {
    var marcadas = $('.ckOrdenServ:checked:not(:disabled)');
    if (marcadas.length === 0) {
        swal("Atención", "Marque al menos una orden para agregar.", "warning");
        return;
    }
    var esLaPrimera = pedidosPreSave.length === 0 && ordenesPreSave.length === 0;
    marcadas.each(function() {
        var $cb = $(this);
        var ordenId = parseInt($cb.val());
        if (ordenesPreSave.some(function(o) { return o.orden_id === ordenId; })) return;
        ordenesPreSave.push({
            orden_id:      ordenId,
            contrato_id:   parseInt($cb.data('contrato-id')) || null,
            orden_desc:    $cb.data('orden-desc'),
            contrato_desc: $cb.data('contrato-desc') || 'Sin contrato',
            cli_nombre:    $cb.data('cli-nombre'),
            cli_apellido:  $cb.data('cli-apellido'),
            ord_estado:    'CONFIRMADO'
        });
    });
    if (esLaPrimera && ordenesPreSave.length > 0) {
        $("#cli_nombre").attr("disabled", "true");
    }
    cerrarPanelOrdenes();
    renderizarOrdenesPreSave();
}


// ===================== PEDIDOS PRE-SAVE ========================

function renderizarPedidosPreSave() {
    if (pedidosPreSave.length === 0) {
        $("#rowPedidosPreSave").hide();
        $("#tablePedidosPreSave").html(
            "<tr><td colspan='4' class='text-center text-muted'>Sin pedidos seleccionados</td></tr>"
        );
        return;
    }
    $("#rowPedidosPreSave").show();
    var html = "";
    for (var i = 0; i < pedidosPreSave.length; i++) {
        var p = pedidosPreSave[i];
        html += "<tr>";
        html += "<td>" + p.descripcion + "</td>";
        html += "<td>" + (p.cli_nombre || '') + " " + (p.cli_apellido || '') + "</td>";
        html += "<td>" + (p.fecha || '') + "</td>";
        html += "<td><button class='btn btn-xs btn-danger waves-effect' onclick='removerPedidoPre(" + i + ");'>" +
                "<i class='material-icons' style='font-size:14px;line-height:1;'>close</i></button></td>";
        html += "</tr>";
    }
    $("#tablePedidosPreSave").html(html);
}

function removerPedidoPre(index) {
    pedidosPreSave.splice(index, 1);
    renderizarPedidosPreSave();
    if (pedidosPreSave.length === 0 && ordenesPreSave.length === 0) {
        $("#cli_nombre").removeAttr("disabled");
    }
}

// ===================== ÓRDENES PRE-SAVE ========================

function renderizarOrdenesPreSave() {
    if (ordenesPreSave.length === 0) {
        $("#rowOrdenesPreSave").hide();
        $("#tableOrdenesPreSave").html(
            "<tr><td colspan='5' class='text-center text-muted'>Sin órdenes seleccionadas</td></tr>"
        );
        return;
    }
    $("#rowOrdenesPreSave").show();
    var html = "";
    for (var i = 0; i < ordenesPreSave.length; i++) {
        var o = ordenesPreSave[i];
        html += "<tr>";
        html += "<td>" + o.orden_desc + "</td>";
        html += "<td>" + (o.ord_estado || 'CONFIRMADO') + "</td>";
        html += "<td>" + (o.cli_nombre || '') + " " + (o.cli_apellido || '') + "</td>";
        html += "<td>" + (o.contrato_desc || 'Sin contrato') + "</td>";
        html += "<td><button class='btn btn-xs btn-danger waves-effect' onclick='removerOrdenPre(" + i + ");'>" +
                "<i class='material-icons' style='font-size:14px;line-height:1;'>close</i></button></td>";
        html += "</tr>";
    }
    $("#tableOrdenesPreSave").html(html);
}

function removerOrdenPre(index) {
    ordenesPreSave.splice(index, 1);
    renderizarOrdenesPreSave();
    if (pedidosPreSave.length === 0 && ordenesPreSave.length === 0) {
        $("#cli_nombre").removeAttr("disabled");
    }
}

// ===============================================================

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    if (xhr.status === 422 && res && res.errors) {
        var msgs = Object.values(res.errors).flat().map(function(e){ return '• ' + e; }).join('\n');
        swal({ title: 'Datos inválidos', text: msgs, type: 'warning' });
    } else if (res && res.mensaje) {
        swal({ title: 'Error', text: res.mensaje, type: res.tipo || 'error' });
    } else {
        swal({ title: 'Error', text: 'Ocurrió un error inesperado (HTTP ' + xhr.status + ').', type: 'error' });
    }
}

function imprimir() {
    var id = $("#id").val();
    if (!id || id == 0) return;
    window.open('imprimir.html?id=' + id, '_blank');
}

// ===================== DETALLE VENTA =====================

var _debounceTimers = {};
function _debounce(key, fn) { clearTimeout(_debounceTimers[key]); _debounceTimers[key] = setTimeout(fn, 300); }

function cancelarDetalle() {
    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    $('#txtOperacionDetalle').val(0);
    $('#item_id').val('');
    $('#item_descripcion').val('').prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
    $('#det_cantidad').val('').prop('disabled', true);
    $('#det_precio').val('').prop('disabled', true);
    $('#cantidad_stock').val('');
    $('#det_tipo_impuesto_id').val('');
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#deposito_id_det').html('<option value="">-- Depósito (seleccione primero) --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();

    $("#btnAgregarDetalle").show();
    $("#btnEditarDetalle").show();
    $("#btnEliminarDetalle").show();
    $("#btnGrabarDetalle").hide();
    $("#btnCancelarDetalle").hide();
}

function agregarDetalle() {
    cancelarDetalle();
    $("#txtOperacionDetalle").val(1);
    cargarDepositosVenta(null);
    $("#deposito_id_det").prop('disabled', false);
    $("#item_descripcion").prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
    $("#det_cantidad").prop('disabled', false);
    $("#det_precio").prop('disabled', false);

    $("#btnAgregarDetalle").hide();
    $("#btnEditarDetalle").hide();
    $("#btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
    $("#btnCancelarDetalle").show();
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    var currentDeposito = $('#deposito_id_det').val();
    cargarDepositosVenta(currentDeposito);
    $("#deposito_id_det").prop('disabled', false);
    if (currentDeposito) {
        $("#item_descripcion").prop('disabled', false).attr('placeholder', 'Buscar producto...');
    }
    $("#det_cantidad").prop('disabled', false);
    $("#det_precio").prop('disabled', false);

    var marcaActual  = _marcaIdSel;
    var modeloActual = _modeloIdSel;
    var itemId = $('#item_id').val();
    if (itemId) { cargarMarcasVenta(itemId, marcaActual); }

    $("#btnAgregarDetalle").hide();
    $("#btnEditarDetalle").hide();
    $("#btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
    $("#btnCancelarDetalle").show();
}

function eliminarDetalle() {
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").hide();
    $("#btnEditarDetalle").hide();
    $("#btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
    $("#btnCancelarDetalle").show();
}

function grabarDetalle() {
    var oper = parseInt($("#txtOperacionDetalle").val());
    var ventaId = $('#id').val();
    var errores = [];

    if (oper !== 3) {
        if (!$('#item_id').val())           errores.push('Seleccione un producto.');
        var cant = parseFloat($('#det_cantidad').val());
        if (isNaN(cant) || cant <= 0)       errores.push('La cantidad debe ser mayor a cero.');
        var prec = parseFloat($('#det_precio').val());
        if (isNaN(prec) || prec < 0)        errores.push('El precio no puede ser negativo.');
        if (!$('#deposito_id_det').val())    errores.push('Seleccione un depósito.');
        if (!$('#det_tipo_impuesto_id').val()) errores.push('El ítem debe tener tipo de impuesto.');
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = "ventas_det/create";
    var metodo   = "POST";

    if (oper === 2) {
        endpoint = "ventas_det/update/" + ventaId + "/" + $("#item_id").val();
        metodo   = "PUT";
    }
    if (oper === 3) {
        endpoint = "ventas_det/delete/" + ventaId + "/" + $("#item_id").val();
        metodo   = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            ventas_cab_id:      ventaId,
            item_id:            $('#item_id').val(),
            vent_det_cantidad:  $('#det_cantidad').val(),
            vent_det_precio:    $('#det_precio').val(),
            tipo_impuesto_id:   $('#det_tipo_impuesto_id').val(),
            deposito_id:        $('#deposito_id_det').val() || null,
            marca_id:           _marcaIdSel  ? parseInt(_marcaIdSel)  : null,
            modelo_id:          _modeloIdSel ? parseInt(_modeloIdSel) : null
        }
    })
    .done(function(res) {
        if (res.tipo === 'success') {
            listarDetalles();
            cancelarDetalle();
        } else {
            swal('Error', res.mensaje, res.tipo || 'error');
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function buscarProductos() {
    var q = $('#item_descripcion').val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }
    var depositoId = $('#deposito_id_det').val() || '';
    if (!depositoId) {
        $('#listaProductos').html('<ul class="list-group"><li class="list-group-item text-muted">Seleccione un depósito primero.</li></ul>').show();
        return;
    }
    _debounce('prod', function() {
        $.ajax({
            url: getUrl() + "items/buscar",
            method: "POST",
            dataType: "json",
            data: { item_descripcion: q, deposito_id: depositoId }
        })
        .done(function(resultado) {
            var lista = "<ul class='list-group'>";
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += "<li class='list-group-item' style='cursor:pointer;' onclick=\"seleccionProducto(" + rs.item_id + ",'" + (rs.item_descripcion || '').replace(/'/g, "\\'") + "'," + stock + "," + (rs.tipo_impuesto_id || 0) + "," + (rs.item_precio || rs.item_costo || 0) + ")\">"
                    + rs.item_descripcion
                    + " <span class='badge' style='background:#3b82f6;color:#fff;'>Stock: " + stock + "</span>"
                    + "</li>";
            });
            lista += "</ul>";
            $('#listaProductos').html(lista).css({ display: 'block', position: 'absolute', zIndex: 2000 });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function seleccionProducto(item_id, item_descripcion, cantidad_disponible, tipo_impuesto_id, item_precio) {
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#cantidad_stock").val(cantidad_disponible);
    $("#det_tipo_impuesto_id").val(tipo_impuesto_id);
    if (!$('#det_precio').val()) $('#det_precio').val(item_precio || '');
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $("#listaProductos").html("").hide();
    $(".form-line").addClass("focused");
    cargarMarcasVenta(item_id, null);
}

