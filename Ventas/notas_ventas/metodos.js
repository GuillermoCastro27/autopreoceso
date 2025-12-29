// Lista los registros de pedidos utilizando DataTables
// Cargar user_id del usuario logueado
cargarUserIdLogueado();
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
function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);

    $("#nota_vent_fecha").prop("readonly", false);
    $("#nota_vent_tipo").prop("disabled", false);
    $("#nota_vent_observaciones").prop("disabled", false);
    $("#venta").prop("disabled", false);

    // Campos NO editables
    $("#emp_razon_social, #suc_razon_social,#nota_vene_condicion_pago,#vencimiento,#cuotas").prop("disabled", true);
    $("#cli_nombre, #cli_apellido, #cli_ruc, #cli_direccion, #cli_telefono, #cli_correo").prop("disabled", true);

    // Botones
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

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);

    $(".form-line").addClass("focused");
}


// Prepara el formulario para eliminar un presupuesto.
function eliminar() {
    $("#txtOperacion").val(3);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
}


// Prepara el formulario para confirmar un presupuesto.
function confirmar() {
    $("#txtOperacion").val(4);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
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
        url: getUrl() + "notaventcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log(resultado);

        let lista = "";

        for (let rs of resultado) {

            lista += `
            <tr class="item-list"
                onclick="seleccionNotaVent(
                    ${rs.id},
                    ${rs.empresa_id},
                    ${rs.sucursal_id},
                    ${rs.ventas_cab_id},
                    ${rs.clientes_id},

                    '${rs.emp_razon_social}',
                    '${rs.suc_razon_social}',
                    '${rs.venta}',
                    '${rs.vencimiento}',
                    '${rs.nota_vent_fecha}',
                    '${rs.nota_vent_estado}',
                    '${rs.cuotas}',
                    '${rs.nota_vent_tipo}',
                    '${rs.nota_vent_observaciones}',
                    '${rs.encargado}',

                    '${rs.cli_nombre}',
                    '${rs.cli_apellido}',
                    '${rs.cli_ruc}',
                    '${rs.cli_direccion}',
                    '${rs.cli_telefono}',
                    '${rs.cli_correo}',

                    '${rs.nota_vene_condicion_pago}'
                );">
                <td>${rs.id}</td>
                <td>${rs.vencimiento}</td>
                <td>${rs.nota_vent_fecha}</td>
                <td>${rs.venta}</td>
                <td>${rs.encargado}</td>
                <td>${rs.cuotas}</td>
                <td>${rs.nota_vent_tipo}</td>
                <td>${rs.nota_vent_observaciones}</td>
                <td>${rs.nota_vent_estado}</td>
            </tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}
function seleccionNotaVent(
    id,
    empresa_id,
    sucursal_id,
    ventas_cab_id,
    clientes_id,
    emp_razon_social,
    suc_razon_social,
    venta,
    vencimiento,
    fecha,
    estado,
    cuotas,
    tipo,
    observaciones,
    encargado,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,
    condicion_pago
){
    // 🔴 NORMALIZAR ESTADO (CLAVE PARA LOS BOTONES)
    estado = estado.trim().toUpperCase();

    // ===============================
    // CABECERA
    // ===============================
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#clientes_id").val(clientes_id);

    $("#nota_vent_intervalo_fecha_vence").val(vencimiento === 'N/A' ? '' : vencimiento);
    $("#nota_vent_fecha").val(fecha);
    $("#nota_vent_estado").val(estado);
    $("#nota_vent_cant_cuota").val(cuotas);
    $("#nota_vent_tipo").val(tipo);
    $("#nota_vent_observaciones").val(observaciones);
    $("#nota_vene_condicion_pago").val(condicion_pago);

    // ===============================
    // CLIENTE
    // ===============================
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#venta").val(venta);
    $("#encargado").val(encargado);

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // ===============================
    // UI
    // ===============================
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    // ===============================
    // BOTONES (RESET TOTAL)
    // ===============================
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .prop("disabled", true);

    $("#btnCancelar").prop("disabled", false);

    // ===============================
    // REGLAS POR ESTADO
    // ===============================
    if (estado === "PENDIENTE") {
        $("#btnEditar").prop("disabled", false);
        $("#btnEliminar").prop("disabled", false);
        $("#btnConfirmar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (estado === "CONFIRMADO") {
        $("#btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}

function buscarVentas() {

    $.ajax({
        url: getUrl() + "ventas_cab/buscarVentasNota",
        method: "GET",
        dataType: "json",
        data: {
            q: $("#nro_venta").val()
        }
    })
    .done(function (resultado) {

        console.log("Ventas encontradas:", resultado);

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += `
                <li class="list-group-item"
                    onclick="seleccionVenta(
                        ${rs.ventas_cab_id},
                        '${rs.venta}',

                        ${rs.empresa_id},
                        '${rs.emp_razon_social}',

                        ${rs.sucursal_id},
                        '${rs.suc_razon_social}',

                        ${rs.clientes_id},
                        '${rs.cli_nombre}',
                        '${rs.cli_apellido}',
                        '${rs.cli_ruc}',
                        '${rs.cli_direccion}',
                        '${rs.cli_telefono}',
                        '${rs.cli_correo}',

                        '${rs.condicion_pago}',
                        '${rs.vent_intervalo_fecha_vence}',
                        '${rs.vent_cant_cuota}'
                    )">
                    VENTA NRO: ${rs.venta}
                    – ${rs.cli_nombre} ${rs.cli_apellido}
                </li>
            `;
        }

        lista += "</ul>";

        $("#listaVentas")
            .html(lista)
            .css({
                display: "block",
                position: "absolute",
                zIndex: 2000
            });
    })
    .fail(function (xhr) {
        console.error("Error al buscar ventas:", xhr.responseText);
    });
}
function seleccionVenta(
    ventas_cab_id,
    venta,

    empresa_id,
    emp_razon_social,

    sucursal_id,
    suc_razon_social,

    clientes_id,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,

    condicion_pago,
    vent_intervalo_fecha_vence,
    vent_cant_cuota
) {
    // ===============================
    // VENTA
    // ===============================
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#venta").val(venta).prop("disabled", true);

    // ===============================
    // EMPRESA / SUCURSAL
    // ===============================
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // ===============================
    // CLIENTE
    // ===============================
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // ===============================
    // CONDICIÓN DE PAGO (HEREDADA)
    // ===============================
    $("#nota_vene_condicion_pago")
        .val(condicion_pago)
        .prop("disabled", true);

    // Vencimiento
    $("#vencimiento")
        .val(vent_intervalo_fecha_vence === 'N/A' ? '' : vent_intervalo_fecha_vence)
        .prop("disabled", true);

    // Cuotas
    $("#cuotas")
        .val(vent_cant_cuota === 'N/A' ? '' : vent_cant_cuota)
        .prop("disabled", true);

    // ===============================
    // UX
    // ===============================
    $("#listaVentas").html("").hide();
    $(".form-line").addClass("focused");
}


// Realiza operaciones de creación, edición, anulacion y confirmación de un pedido
function grabar() {

    let endpoint = "notaventcab/create";
    let metodo   = "POST";
    let estado   = "PENDIENTE";

    // ===============================
    // 🔹 OPERACIÓN
    // ===============================
    if ($("#txtOperacion").val() == 2) {
        endpoint = "notaventcab/update/" + $("#id").val();
        metodo = "PUT";
    }
    else if ($("#txtOperacion").val() == 3) {
        endpoint = "notaventcab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    else if ($("#txtOperacion").val() == 4) {
        endpoint = "notaventcab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    // ===============================
    // 🔹 DATOS HEREDADOS DE LA VENTA
    // ===============================
    let condicionPago = $("#nota_vene_condicion_pago").val();

    let vencimiento = $("#vencimiento").val();
    if (condicionPago === 'CONTADO' || vencimiento === '') {
        vencimiento = null;
    }

    let cuotas = $("#cuotas").val();
    if (condicionPago === 'CONTADO' || cuotas === '') {
        cuotas = null;
    }

    // ===============================
    // 🔹 AJAX
    // ===============================
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            // Identificadores
            'id'                  : $("#id").val(),
            'ventas_cab_id'       : $("#ventas_cab_id").val(),
            'clientes_id'         : $("#clientes_id").val(),
            'empresa_id'          : $("#empresa_id").val(),
            'sucursal_id'         : $("#sucursal_id").val(),
            'user_id'             : $("#user_id").val(),

            // Nota de venta
            'nota_vent_fecha'                 : $("#nota_vent_fecha").val(),
            'nota_vent_intervalo_fecha_vence' : vencimiento,
            'nota_vent_cant_cuota'             : cuotas,
            'nota_vent_tipo'                  : $("#nota_vent_tipo").val(),
            'nota_vent_observaciones'          : $("#nota_vent_observaciones").val(),
            'nota_vene_condicion_pago'         : condicionPago,
            'nota_vent_estado'                : estado,

            // Control
            'operacion' : $("#txtOperacion").val()
        }
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                // Setear ID devuelto
                if (resultado.registro?.id) {
                    $("#id").val(resultado.registro.id);
                }

                // Mostrar detalle
                $("#detalle").show();
                listarDetalles();

                // Si ya no está pendiente, recargar
                if (resultado.registro?.nota_vent_estado !== "PENDIENTE") {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        alert("Error al grabar la nota de venta");
    });
}



// Configura el formato de fecha en ciertos campos usando BootstrapMaterialDatePicker.
function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss', // Formato compatible con timestamp en Laravel
        clearButton: true,
        weekStart: 1
    });
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// Prepara el formulario para editar un detalle existente del pedido
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#notas_vent_det_cantidad").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#notas_vent_det_cantidad").removeAttr("disabled"); // Habilitar el campo de costo
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Realiza operaciones de creación, edición o eliminación de detalles del pedido.
function grabarDetalle() {

    const cantidad = $.trim($("#notas_vent_det_cantidad").val());
    const precio   = $.trim($("#notas_vent_det_precio").val());
    const itemId   = $.trim($("#item_id").val());

    if (!cantidad || !precio || !itemId) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    if (isNaN(cantidad) || isNaN(precio)) {
        alert("La cantidad y el precio deben ser números válidos.");
        return;
    }

    // Validar que cantidad y costo sean números
    if (isNaN(cantidad) || isNaN(precio)) {
        alert("La cantidad y el costo deben ser números válidos.");
        return;
    }

    var endpoint = "notaventdet/create";
    var metodo = "POST";

    if ($("#txtOperacionDetalle").val() == 2) {
        endpoint = "notaventdet/update/" + $("#id").val() + "/" + itemId;
        metodo = "PUT";
    }
    if ($("#txtOperacionDetalle").val() == 3) {
        endpoint = "notaventdet/delete/" + $("#id").val() + "/" + itemId;
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "notas_vent_cab_id": $("#id").val(),
            "item_id": itemId,
            "tipo_impuesto_id": $("#tipo_impuesto_id").val(),
            "notas_vent_det_cantidad": cantidad,
            "notas_vent_det_precio": precio // Asegúrate de enviar el costo aquí
        }
    })
    .done(function(respuesta) {
        listarDetalles(); // Listar los detalles después de agregar

        // Obtener el debe pendiente (asegúrate de que sea un número válido)
        const debePendiente = parseFloat($("#debe_pendiente").val()) || 0;

        // Verificar el estado de la orden de compra y el debe pendiente
        if ($("#nota_vent_estado").val() === "PENDIENTE" && debePendiente >= 0) {
            $("#btnConfirmar").removeAttr("disabled"); // Habilitar el botón Confirmar
        } else {
            $("#btnConfirmar").attr("disabled", "disabled"); // Deshabilitar si no cumple las condiciones
        }
    })
    .fail(function(a, b, c) {
        alert("Error al agregar el detalle: " + c);
        console.log(a.responseText);
    });

    // Mostrar y ocultar botones según corresponda
    $("#btnAgregarDetalle").show();
    $("#btnEditarDetalle").show();
    $("#btnEliminarDetalle").show();
    $("#btnGrabarDetalle").hide();

    // Limpiar campos
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").val("");
    $("#notas_vent_det_cantidad").val("");
    $("#tip_imp_nom").val("");
    $("#notas_vent_det_precio").val(""); // Limpiar el campo costo después de grabar
    $("#tipo_impuesto_id").val(""); // Limpiar ID de tipo de impuesto si es necesario
    $("#subtotal").val("");    // Limpiar subtotal
    $("#totalConImpuesto").val(""); // Limpiar total con impuesto
}


// Realiza una búsqueda de productos y muestra los resultados.
function buscarProductos() {

    $.ajax({
        url: getUrl() + "items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            item_decripcion: $("#item_decripcion").val()
        }
    })
    .done(function (resultado) {

        console.log("Items encontrados:", resultado);

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += `
                <li class="list-group-item"
                    onclick="seleccionProducto(
                        ${rs.item_id},
                        '${rs.item_decripcion}',
                        ${rs.tipo_impuesto_id ?? 'null'},
                        '${rs.item_costo}',
                        '${rs.tip_imp_nom}',
                        ${rs.tipo_imp_tasa},
                        ${rs.cantidad_disponible}
                    )">
                    ${rs.item_decripcion}
                    <span class="pull-right text-muted">
                        Stock: ${rs.cantidad_disponible}
                    </span>
                </li>`;
        }

        lista += "</ul>";

        $("#listaProductos")
            .html(lista)
            .css({
                display: "block",
                position: "absolute",
                zIndex: 2000
            });
    })
    .fail(function (xhr) {
        alert("Error al buscar productos");
        console.log(xhr.responseText);
    });
}
function seleccionProducto(
    item_id,
    item_decripcion,
    tipo_impuesto_id,
    item_costo,
    tip_imp_nom,
    tipo_imp_tasa,
    cantidad_disponible
) {
    // ===============================
    // DATOS DEL ITEM
    // ===============================
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#item_precio").val(item_costo); // ← sigue siendo item_costo del backend

    // Impuesto
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Stock disponible (si querés mostrarlo)
    $("#stock_disponible").val(cantidad_disponible ?? 0);

    // ===============================
    // CÁLCULOS
    // ===============================
    const cantidad = parseFloat($("#notas_vent_det_cantidad").val()) || 0;
    const precio   = parseFloat(item_costo) || 0;

    const subtotal = cantidad * precio;

    let iva = 0;
    if (tip_imp_nom === 'IVA10') {
        iva = subtotal / 11;
    } else if (tip_imp_nom === 'IVA5') {
        iva = subtotal / 21;
    }

    const totalConImpuesto = subtotal; // Precio ya incluye IVA

    // ===============================
    // SETEAR CAMPOS
    // ===============================
    $("#subtotal").val(subtotal.toFixed(2));
    $("#totalConImpuesto").val(totalConImpuesto.toFixed(2));

    // ===============================
    // UI
    // ===============================
    $("#listaProductos").hide().html("");
    $(".form-line").addClass("focused");
}
function buscarTipoImpuestos(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-impuesto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoImpuestos("+rs.id+",'"+rs.tip_imp_nom+"','"+rs.tipo_imp_tasa+"');\">"+rs.tip_imp_nom+","+rs.tipo_imp_tasa+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoImpuestos").html(lista);
        $("#listaTipoImpuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionTipoImpuestos(id,tip_imp_nom,tipo_imp_tasa){
    $("#tipo_impuesto_id").val(id);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#tipo_imp_tasa").val(tipo_imp_tasa);

    $("#listaTipoImpuestos").html("");
    $("#listaTipoImpuestos").attr("style","display:none;");
}

// Realiza una búsqueda de productos mediante una solicitud AJAX
function listarDetalles() {

    let cantidadDetalle = 0;
    let totalGral = 0;
    let totalIVA = 0;

    const notaVentId = $("#id").val();
    const estadoNota = $("#nota_vent_estado").val();

    if (!notaVentId || notaVentId == 0) {
        console.warn("No hay ID de nota de venta");
        return;
    }

    $.ajax({
        url: getUrl() + "notaventdet/read/" + notaVentId,
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        console.log("Detalles nota venta:", resultado);

        let lista = "";

        if (resultado && resultado.length > 0) {

            for (let rs of resultado) {

                const cantidad = parseFloat(rs.notas_vent_det_cantidad) || 0;
                const precio   = parseFloat(rs.notas_vent_det_precio) || 0;

                const subtotal = cantidad * precio;

                // ===============================
                // IVA INCLUIDO (PARAGUAY)
                // ===============================
                let iva = 0;

                if (rs.tip_imp_nom === "IVA10") {
                    iva = subtotal / 11;
                } 
                else if (rs.tip_imp_nom === "IVA5") {
                    iva = subtotal / 21;
                }

                totalGral += subtotal;
                totalIVA  += iva;

                lista += `
                    <tr class="item-list"
                        onclick="seleccionDetalle(
                            ${rs.item_id},
                            ${rs.tipo_impuesto_id},
                            '${rs.item_decripcion}',
                            '${rs.tip_imp_nom}',
                            ${cantidad},
                            ${precio},
                            '${formatearNumero(subtotal)}'
                        )">
                        <td>${rs.item_id}</td>
                        <td>${rs.item_decripcion}</td>
                        <td>${cantidad}</td>
                        <td class="text-right">${formatearNumero(precio)}</td>
                        <td>${rs.tip_imp_nom}</td>
                        <td class="text-right">${formatearNumero(subtotal)}</td>
                        <td class="text-right">${formatearNumero(iva)}</td>
                    </tr>
                `;
                cantidadDetalle++;
            }

            $("#tableDetalle").html(lista);

        } else {
            $("#tableDetalle").html(`
                <tr>
                    <td colspan="7" class="text-center">
                        No se encontraron detalles para esta nota de venta
                    </td>
                </tr>
            `);
        }

        // ===============================
        // TOTALES
        // ===============================
        $("#txtTotalGral").text(formatearNumero(totalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(totalIVA));

        // ===============================
        // BOTÓN CONFIRMAR
        // ===============================
        if (estadoNota === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }
    })
    .fail(function (xhr) {
        alert("Error al obtener detalles de la nota de venta");
        console.log(xhr.responseText);
    });
}

function seleccionDetalle(
    item_id,
    tipo_impuesto_id,
    item_decripcion,
    tip_imp_nom,
    cantidad,
    precio,
    subtotal
) {
    // 🔒 BLOQUEO SI ESTÁ CONFIRMADO
    if ($("#nota_vent_estado").val() === "CONFIRMADO") {
        return; // solo visualiza la tabla, no carga formulario
    }

    // Cargar datos
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#notas_vent_det_cantidad").val(cantidad);
    $("#notas_vent_det_precio").val(precio);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#item_decripcion").val(item_decripcion);

    $("#formDetalles").show();

    // Bloquear por defecto
    $("#notas_vent_det_cantidad").prop("disabled", true);
    $("#notas_vent_det_precio").prop("disabled", true);

    $("#btnEditarDetalle").show();
    $("#btnGrabarDetalle").hide();

    $("#txtOperacionDetalle").val(2);

    $(".form-line").addClass("focused");
}
function actualizarTotalesVenta() {
    const cantidad = parseFloat($("#notas_vent_det_cantidad").val()) || 0;
    const precio   = parseFloat($("#item_precio").val()) || 0;

    const subtotal = cantidad * precio;

    $("#subtotal").val(subtotal.toFixed(2));
    $("#totalConImpuesto").val(subtotal.toFixed(2));
}

// Función para cargar el user_id real del usuario logueado
function cargarUserIdLogueado() {
    try {
        const datosSesion = JSON.parse(sessionStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.id) {
            $('#user_id').val(datosSesion.user.id);
            console.log('User ID cargado exitosamente:', datosSesion.user.id);
        } else {
            console.error('No se encontraron datos de sesión válidos');
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}