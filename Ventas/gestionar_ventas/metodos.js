// Arrays pre-save para múltiples pedidos y órdenes
var pedidosPreSave = [];
var ordenesPreSave = [];

cargarFuncionarioIdLogueado();
listar();
campoFecha();
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

    // Pedido y orden deshabilitados hasta seleccionar cliente
    $("#pedido_venta").attr("disabled", "true");
    $("#orden_buscar").attr("disabled", "true");

    // Limpiar arrays pre-save
    pedidosPreSave = [];
    ordenesPreSave = [];
    renderizarPedidosPreSave();
    renderizarOrdenesPreSave();

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
    $("#condicion_pago").attr("disabled", "true");
    $("#emp_razon_social").attr("disabled", "true");
    $("#suc_razon_social").attr("disabled", "true");

    // Habilitar cuota para que el usuario pueda corregirla si es necesario
    controlarCamposPago();

    // Cliente ya cargado — habilitar pedido y orden directamente
    $("#pedido_venta").removeAttr("disabled");
    $("#orden_buscar").removeAttr("disabled");

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

    // Mostrar secciones
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();
    $("#cardPedidosVinculados").show();
    $("#cardOrdenesVinculadas").show();

    if (vent_estado === "PENDIENTE") {
        $("#rowAgregarPedido").show();
        $("#rowAgregarOrden").show();
    } else {
        $("#rowAgregarPedido").hide();
        $("#rowAgregarOrden").hide();
    }

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
    $.ajax({
        url: getUrl() + "ventas_cab/detalle/" + ventaId,
        method: "GET",
        dataType: "json"
    })
    .done(function(res) {
        renderizarDetalles(res.detalles || []);
        renderizarPedidosVinculados(res.pedidos || []);
        renderizarOrdenesVinculadas(res.ordenes || []);
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function renderizarDetalles(resultado) {
    let cantidadDetalle = 0;
    let TotalGral  = 0;
    let TotalIva10 = 0;
    let TotalIva5  = 0;
    const estadoVenta = $("#vent_estado").val();
    let lista = "";

    if (resultado && resultado.length > 0) {
        for (let rs of resultado) {
            const cantidad = parseFloat(rs.vent_det_cantidad) || 0;
            const precio   = parseFloat(rs.vent_det_precio) || 0;
            const subtotal = parseFloat(rs.subtotal) || (cantidad * precio);
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
            lista += "<tr>";
            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + rs.item_decripcion + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(precio) + "</td>";
            lista += "<td>" + rs.tip_imp_nom + "</td>";
            lista += "<td>" + (rs.dep_nombre || '-') + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
            TotalGral += subtotal;
        }
        $("#tableDetalle").html(lista);
    } else {
        $("#tableDetalle").html(
            "<tr><td colspan='8' class='text-center'>No se encontraron detalles para esta venta.</td></tr>"
        );
    }

    $("#txtTotalGral").text(formatearNumero(TotalGral));
    $("#txtIva10").text(formatearNumero(TotalIva10));
    $("#txtIva5").text(formatearNumero(TotalIva5));
    $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));

    if (estadoVenta === "PENDIENTE" && cantidadDetalle > 0) {
        $("#btnConfirmar").removeAttr("disabled");
    } else {
        $("#btnConfirmar").attr("disabled", true);
    }
}

function renderizarPedidosVinculados(resultado) {
    var lista = "";
    var estadoVenta = $("#vent_estado").val();
    for (var rs of resultado) {
        lista += "<tr>";
        lista += "<td>" + (rs.pedido_descripcion || rs.pedidos_ventas_id) + "</td>";
        lista += "<td>" + (rs.ped_ven_estado || '') + "</td>";
        lista += "<td>" + (rs.cli_nombre || '') + " " + (rs.cli_apellido || '') + "</td>";
        lista += "<td>" + (rs.ped_ven_fecha || '') + "</td>";
        lista += "<td>";
        if (estadoVenta === "PENDIENTE" && rs.id > 0) {
            lista += "<button class='btn btn-xs btn-danger waves-effect' onclick='eliminarPedidoVenta(" + rs.id + ");'>" +
                     "<i class='material-icons' style='font-size:16px;line-height:1;'>delete</i></button>";
        }
        lista += "</td></tr>";
    }
    if (!lista) {
        lista = "<tr><td colspan='5' class='text-center text-muted'>Sin pedidos vinculados</td></tr>";
    }
    $("#tablePedidosVinculados").html(lista);
}

function renderizarOrdenesVinculadas(resultado) {
    var lista = "";
    var estadoVenta = $("#vent_estado").val();
    var etiquetas = [];
    for (var rs of resultado) {
        etiquetas.push("ORD: " + String(rs.orden_serv_cab_id).padStart(7, '0'));
        lista += "<tr>";
        lista += "<td>" + rs.orden_descripcion + "</td>";
        lista += "<td>" + rs.ord_serv_estado + "</td>";
        lista += "<td>" + rs.cli_nombre + " " + rs.cli_apellido + "</td>";
        lista += "<td>" + rs.contrato_descripcion + "</td>";
        lista += "<td>";
        if (estadoVenta === "PENDIENTE") {
            lista += "<button class='btn btn-xs btn-danger waves-effect' onclick='eliminarOrdenServVenta(" + rs.id + ");'>" +
                     "<i class='material-icons' style='font-size:16px;line-height:1;'>delete</i></button>";
        }
        lista += "</td></tr>";
    }
    if (!lista) {
        lista = "<tr><td colspan='5' class='text-center text-muted'>Sin órdenes vinculadas</td></tr>";
    }
    $("#tableOrdenes").html(lista);
    $("#orden_buscar").val(etiquetas.join(", "));
}

function listarDetalles() {
    const ventasCabId = $("#id").val();
    if (!ventasCabId) {
        swal("Atención", "No hay venta seleccionada.", "warning");
        return;
    }
    $.ajax({
        url: getUrl() + "ventas_det/read/" + ventasCabId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        renderizarDetalles(resultado);
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
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

    // Cliente elegido → habilitar pedido y orden
    $("#pedido_venta").removeAttr("disabled");
    $("#orden_buscar").removeAttr("disabled");

    $(".form-line").addClass("focused");
}

function buscarPedidoVentas() {

    $.ajax({
        url: getUrl() + "pedido_ventas/buscar",
        method: "POST",
        dataType: "json",
        data: {
            clientes_id: $("#clientes_id").val(),
            q: $("#pedido_venta").val()
        }
    })
    .done(function(resultado) {


        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += "<li class='list-group-item' " +
                "onclick=\"seleccionPedidoVentas(" +
                rs.id + "," +
                rs.clientes_id + "," +
                rs.empresa_id + "," +
                rs.sucursal_id + ",'" +
                rs.pedido + "','" +
                rs.cli_nombre + "','" +
                rs.cli_apellido + "','" +
                rs.cli_ruc + "','" +
                rs.cli_telefono + "','" +
                rs.cli_correo + "','" +
                rs.cli_direccion + "','" +
                rs.suc_razon_social + "','" +
                rs.emp_razon_social + "','" +
                rs.ped_ven_vence +
                "')\">" +
                rs.pedido +
            "</li>";
        }

        lista += "</ul>";

        $("#listaPedidoVentas").html(lista)
                               .css({
                                   display: "block",
                                   position: "absolute",
                                   zIndex: 2000
                               });
    })
    .fail(function(xhr, status, error) {
    });
}
function seleccionPedidoVentas(
    pedido_id,
    clientes_id,
    empresa_id,
    sucursal_id,
    pedido,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_telefono,
    cli_correo,
    cli_direccion,
    suc_razon_social,
    emp_razon_social,
    ped_ven_vence
) {
    // No agregar duplicados
    if (pedidosPreSave.find(function(p) { return p.id === pedido_id; })) {
        $("#listaPedidoVentas").html("").hide();
        return;
    }

    pedidosPreSave.push({
        id:          pedido_id,
        descripcion: pedido,
        cli_nombre:  cli_nombre,
        cli_apellido:cli_apellido,
        fecha:       ped_ven_vence || ''
    });

    // Solo llenar datos del cliente/empresa si es el primero seleccionado
    if (pedidosPreSave.length === 1 && ordenesPreSave.length === 0) {
        $("#empresa_id").val(empresa_id);
        $("#sucursal_id").val(sucursal_id);
        $("#emp_razon_social").val(emp_razon_social);
        $("#suc_razon_social").val(suc_razon_social);
        $("#clientes_id").val(clientes_id);
        $("#cli_nombre").val(cli_nombre).attr("disabled", "true");
        $("#cli_apellido").val(cli_apellido);
        $("#cli_ruc").val(cli_ruc);
        $("#cli_telefono").val(cli_telefono);
        $("#cli_correo").val(cli_correo);
        $("#cli_direccion").val(cli_direccion);
        controlarCamposPago();
        cargarTimbrado();
    }

    $("#pedido_venta").val('');
    $("#listaPedidoVentas").html("").hide();
    $(".form-line").addClass("focused");
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

                $("#id").val(resultado.registro.id);
                pedidosPreSave = [];
                ordenesPreSave = [];

                $("#detalle").show();
                listarDetalles();

                $("#cardPedidosVinculados").show();
                $("#cardOrdenesVinculadas").show();
                if (resultado.registro.vent_estado === "PENDIENTE") {
                    $("#rowAgregarPedido").show();
                    $("#rowAgregarOrden").show();
                }
                listarPedidosVenta();
                listarOrdenesVenta();

                if (resultado.registro.vent_estado !== "PENDIENTE") {
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

// ===================== ÓRDENES DE SERVICIO =====================

function buscarOrdenServ() {
    var texto = $("#orden_buscar").val();
    if (texto.length < 1) { $("#listaOrdenes").hide(); return; }

    $.ajax({
        url: getUrl() + "ordenservventa/buscar-ordenes?q=" + encodeURIComponent(texto) +
             "&clientes_id=" + ($("#clientes_id").val() || ''),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var contratoId   = rs.contrato_serv_cab_id || 0;
            var contratoDesc = (rs.contrato_descripcion || '').replace(/'/g, "\\'");
            var ordenDesc    = rs.orden_descripcion.replace(/'/g, "\\'");
            var cliNom  = (rs.cli_nombre     || '').replace(/'/g, "\\'");
            var cliApe  = (rs.cli_apellido   || '').replace(/'/g, "\\'");
            var cliRuc  = (rs.cli_ruc        || '').replace(/'/g, "\\'");
            var cliDir  = (rs.cli_direccion  || '').replace(/'/g, "\\'");
            var cliTel  = (rs.cli_telefono   || '').replace(/'/g, "\\'");
            var cliCor  = (rs.cli_correo     || '').replace(/'/g, "\\'");
            var empDesc = (rs.emp_razon_social || '').replace(/'/g, "\\'");
            var sucDesc = (rs.suc_razon_social || '').replace(/'/g, "\\'");

            lista += "<li class='list-group-item' onclick=\"seleccionOrden(" +
                rs.orden_serv_cab_id + "," + contratoId +
                ",'" + ordenDesc  + "','" + contratoDesc +
                "'," + rs.clientes_id + ",'" + cliNom + "','" + cliApe +
                "','" + cliRuc + "','" + cliDir + "','" + cliTel + "','" + cliCor +
                "'," + rs.empresa_id + ",'" + empDesc +
                "'," + rs.sucursal_id + ",'" + sucDesc + "');\">" +
                rs.orden_descripcion;
            if (rs.contrato_descripcion) {
                lista += " <small class='text-muted'>— " + rs.contrato_descripcion + "</small>";
            }
            lista += "</li>";
        }
        lista += "</ul>";
        $("#listaOrdenes").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// Buscador extra (para vincular órdenes adicionales después de grabar)
function buscarOrdenServExtra() {
    var texto = $("#orden_buscar_extra").val();
    if (texto.length < 1) { $("#listaOrdenesExtra").hide(); return; }

    $.ajax({
        url: getUrl() + "ordenservventa/buscar-ordenes?q=" + encodeURIComponent(texto) +
             "&clientes_id=" + ($("#clientes_id").val() || ''),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var contratoId   = rs.contrato_serv_cab_id || 0;
            var contratoDesc = (rs.contrato_descripcion || '').replace(/'/g, "\\'");
            var ordenDesc    = rs.orden_descripcion.replace(/'/g, "\\'");
            lista += "<li class='list-group-item' onclick=\"seleccionOrdenExtra(" +
                rs.orden_serv_cab_id + "," + contratoId +
                ",'" + ordenDesc + "','" + contratoDesc + "');\">" +
                rs.orden_descripcion;
            if (rs.contrato_descripcion) {
                lista += " <small class='text-muted'>— " + rs.contrato_descripcion + "</small>";
            }
            lista += "</li>";
        }
        lista += "</ul>";
        $("#listaOrdenesExtra").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionOrdenExtra(orden_id, contrato_id, orden_desc, contrato_desc) {
    $("#orden_serv_cab_id_extra").val(orden_id);
    $("#contrato_serv_cab_id_extra").val(contrato_id || '');
    $("#orden_buscar_extra").val(orden_desc);
    $("#contrato_desc_extra").val(contrato_desc || 'Sin contrato');
    $("#listaOrdenesExtra").hide();
    $("#btnVincularExtra").removeAttr("disabled");
}

function seleccionOrden(orden_id, contrato_id, orden_desc, contrato_desc,
                        clientes_id, cli_nombre, cli_apellido, cli_ruc,
                        cli_direccion, cli_telefono, cli_correo,
                        empresa_id, emp_razon_social,
                        sucursal_id, suc_razon_social) {

    // No agregar duplicados
    if (ordenesPreSave.find(function(o) { return o.orden_id === orden_id; })) {
        $("#listaOrdenes").hide();
        return;
    }

    ordenesPreSave.push({
        orden_id:     orden_id,
        contrato_id:  contrato_id || null,
        orden_desc:   orden_desc,
        contrato_desc:contrato_desc || 'Sin contrato',
        cli_nombre:   cli_nombre,
        cli_apellido: cli_apellido,
        ord_estado:   'CONFIRMADO'
    });

    // Mostrar el último contrato seleccionado como referencia
    $("#orden_buscar").val('');
    $("#contrato_descripcion_sel").val(contrato_desc || 'Sin contrato');
    $("#listaOrdenes").hide();

    // Solo llenar datos del cliente/empresa si es el primero seleccionado
    if (ordenesPreSave.length === 1 && pedidosPreSave.length === 0) {
        $("#empresa_id").val(empresa_id);
        $("#emp_razon_social").val(emp_razon_social);
        $("#sucursal_id").val(sucursal_id);
        $("#suc_razon_social").val(suc_razon_social);
        $("#clientes_id").val(clientes_id);
        $("#cli_nombre").val(cli_nombre).attr("disabled", "true");
        $("#cli_apellido").val(cli_apellido);
        $("#cli_ruc").val(cli_ruc);
        $("#cli_direccion").val(cli_direccion);
        $("#cli_telefono").val(cli_telefono);
        $("#cli_correo").val(cli_correo);
        cargarTimbrado();
    }

    $(".form-line").addClass("focused");
    renderizarOrdenesPreSave();
}

// Vincula una orden adicional (después de que la venta ya fue grabada)
function agregarOrdenServVenta() {
    var ventas_cab_id = $("#id").val();
    var orden_id      = $("#orden_serv_cab_id_extra").val();
    var contrato_id   = $("#contrato_serv_cab_id_extra").val();

    if (!ventas_cab_id || ventas_cab_id == 0 || ventas_cab_id === '') {
        swal("Atención", "Grabe la venta primero antes de vincular órdenes.", "warning");
        return;
    }
    if (!orden_id || orden_id == 0) {
        swal("Atención", "Seleccione una orden de servicio.", "warning");
        return;
    }

    $.ajax({
        url: getUrl() + "ordenservventa/create",
        method: "POST",
        dataType: "json",
        data: {
            ventas_cab_id:        ventas_cab_id,
            orden_serv_cab_id:    orden_id,
            contrato_serv_cab_id: contrato_id || null
        }
    })
    .done(function(resultado) {
        if (resultado.tipo === "success") {
            $("#orden_buscar_extra").val('');
            $("#orden_serv_cab_id_extra").val(0);
            $("#contrato_serv_cab_id_extra").val('');
            $("#contrato_desc_extra").val('');
            $("#btnVincularExtra").attr("disabled", "true");
            listarOrdenesVenta();
        } else {
            swal("Error", resultado.mensaje, "error");
        }
    })
    .fail(function(xhr) {
        var err = xhr.responseJSON;
        swal("Error", err && err.message ? err.message : "No se pudo vincular la orden.", "error");
    });
}

function listarOrdenesVenta() {
    var ventas_cab_id = $("#id").val();
    if (!ventas_cab_id || ventas_cab_id == 0 || ventas_cab_id === '') {
        $("#tableOrdenes").html("<tr><td colspan='5' class='text-center text-muted'>Grabe la venta primero para poder vincular órdenes</td></tr>");
        return;
    }
    $.ajax({
        url: getUrl() + "ordenservventa/by-venta/" + ventas_cab_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        renderizarOrdenesVinculadas(resultado);
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function eliminarOrdenServVenta(id) {
    swal({
        title: "Eliminar vínculo",
        text: "¿Desea quitar esta orden de la venta?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63031",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + "ordenservventa/delete/" + id,
            method: "DELETE",
            dataType: "json"
        })
        .done(function(resultado) {
            swal("Listo", resultado.mensaje, resultado.tipo);
            listarOrdenesVenta();
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
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

// ===================== PEDIDOS POST-SAVE =======================

function listarPedidosVenta() {
    var ventas_cab_id = $("#id").val();
    if (!ventas_cab_id || ventas_cab_id == 0) {
        $("#tablePedidosVinculados").html(
            "<tr><td colspan='5' class='text-center text-muted'>Grabe la venta primero</td></tr>"
        );
        return;
    }
    $.ajax({
        url: getUrl() + "ventas-pedidos/by-venta/" + ventas_cab_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        renderizarPedidosVinculados(resultado);
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function buscarPedidoVentasExtra() {
    var texto = $("#pedido_buscar_extra").val();
    if (texto.length < 1) { $("#listaPedidosExtra").hide(); return; }

    $.ajax({
        url: getUrl() + "pedido_ventas/buscar",
        method: "POST",
        dataType: "json",
        data: {
            clientes_id: $("#clientes_id").val(),
            q: texto
        }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var pedDesc = (rs.pedido || '').replace(/'/g, "\\'");
            lista += "<li class='list-group-item' onclick=\"seleccionPedidoExtra(" +
                rs.id + ",'" + pedDesc + "');\">" + rs.pedido + "</li>";
        }
        lista += "</ul>";
        $("#listaPedidosExtra").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionPedidoExtra(pedido_id, pedido_desc) {
    $("#pedidos_ventas_id_extra").val(pedido_id);
    $("#pedido_buscar_extra").val(pedido_desc);
    $("#listaPedidosExtra").hide();
    $("#btnVincularPedido").removeAttr("disabled");
}

function agregarPedidoVenta() {
    var ventas_cab_id = $("#id").val();
    var pedido_id     = $("#pedidos_ventas_id_extra").val();

    if (!ventas_cab_id || ventas_cab_id == 0) {
        swal("Atención", "Grabe la venta primero antes de vincular pedidos.", "warning");
        return;
    }
    if (!pedido_id || pedido_id == 0) {
        swal("Atención", "Seleccione un pedido de ventas.", "warning");
        return;
    }

    $.ajax({
        url: getUrl() + "ventas-pedidos/create",
        method: "POST",
        dataType: "json",
        data: {
            ventas_cab_id:     ventas_cab_id,
            pedidos_ventas_id: pedido_id
        }
    })
    .done(function(resultado) {
        if (resultado.tipo === "success") {
            $("#pedido_buscar_extra").val('');
            $("#pedidos_ventas_id_extra").val(0);
            $("#btnVincularPedido").attr("disabled", "true");
            listarPedidosVenta();
            listarDetalles();
        } else {
            swal("Error", resultado.mensaje, resultado.tipo);
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function eliminarPedidoVenta(id) {
    swal({
        title: "Eliminar vínculo",
        text: "¿Desea quitar este pedido de la venta? Los ítems copiados en el detalle NO se eliminan automáticamente.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d63031",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + "ventas-pedidos/delete/" + id,
            method: "DELETE",
            dataType: "json"
        })
        .done(function(resultado) {
            swal("Listo", resultado.mensaje, resultado.tipo);
            listarPedidosVenta();
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
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
