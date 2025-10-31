// Lista los registros de pedidos utilizando DataTables
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
    $("#presupuestos").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#condicion_pago").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", "true");

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
    $("#presupuestos").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", "true");
    $("#condicion_pago").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", "true");

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
        console.log(resultado); // Verifica el contenido de la respuesta
        var lista = "";
        for (rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionOrdenCompra(" + rs.id + "," + rs.proveedor_id + "," + rs.empresa_id + "," + rs.sucursal_id + "," + rs.presupuesto_id + ",'" + rs.emp_razon_social + "','" + rs.suc_razon_social + "','" + rs.presupuesto + "','" + rs.ord_comp_intervalo_fecha_vence + "','" + rs.ord_comp_fecha + "','" + rs.ord_comp_estado + "','" + rs.ord_comp_cant_cuota + "','" + rs.encargado + "','" + rs.prov_razonsocial + "','" + rs.prov_ruc + "','" + rs.prov_telefono + "','" + rs.prov_correo + "','" + rs.condicion_pago + "');\">";
            lista += "<td>" + rs.id + "</td>";  // Código de la orden de compra
            lista += "<td>" + rs.ord_comp_intervalo_fecha_vence + "</td>";  // Intervalo de fecha de vencimiento
            lista += "<td>" + rs.ord_comp_fecha + "</td>";  // Fecha
            lista += "<td>" + rs.presupuesto + "</td>";  // Presupuesto
            lista += "<td>" + rs.encargado + "</td>";  // Encargado
            lista += "<td>" + rs.ord_comp_cant_cuota + "</td>";  // Cantidad de cuota
            lista += "<td>" + rs.ord_comp_estado + "</td>";  // Estado
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })    
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

// Rellena el formulario con los datos de un pedido seleccionado.
function seleccionOrdenCompra(id_orde_compra_cab, proveedor_id, empresa_id, sucursal_id, presupuesto_id, emp_razon_social, suc_razon_social, presupuestos, ord_comp_intervalo_fecha_vence, ord_comp_fecha, ord_comp_estado, ord_comp_cant_cuota, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, condicion_pago) {
    console.log("Condición de pago: " + condicion_pago);  // Verifica el valor de la condición de pago
    
    // Asigna los valores al formulario
    $("#id").val(id_orde_compra_cab);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#presupuesto_id").val(presupuesto_id);
    $("#proveedor_id").val(proveedor_id);
    $("#ord_comp_intervalo_fecha_vence").val(ord_comp_intervalo_fecha_vence);
    $("#ord_comp_fecha").val(ord_comp_fecha);
    $("#ord_comp_cant_cuota").val(ord_comp_cant_cuota);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#presupuestos").val(presupuestos);
    $("#ord_comp_estado").val(ord_comp_estado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#encargado").val(encargado);

    // Asignar la condición de pago (CONTADO o CRÉDITO)
    $("#condicion_pago").val(condicion_pago);

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

    if(ord_comp_estado === "PENDIENTE"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if(ord_comp_estado === "CONFIRMADO"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        $("#btnEditar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
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

    // Verificación del valor de presupuesto_id
    var presupuestoId = $("#presupuesto_id").val();
    console.log("Presupuesto ID:", presupuestoId); // Imprimir el valor

    if (!presupuestoId || presupuestoId == "0") {
        alert("El ID del presupuesto es obligatorio.");
        return; // Detener el envío si el presupuesto_id no es válido
    }

    // Verificar el valor del proveedor_id antes de enviar
    var proveedorId = $("#proveedor_id").val();
    console.log("Proveedor ID:", proveedorId); // Verificar el valor del proveedor_id

    if (!proveedorId || proveedorId == "0") {
        alert("El ID del proveedor es obligatorio.");
        return; // Detener el envío si el proveedor_id no es válido
    }

    // Obtener y formatear la fecha de vencimiento
    var intervaloFechaVence = $("#ord_comp_intervalo_fecha_vence").val();
    var formattedIntervaloFechaVence = $("#ord_comp_intervalo_fecha_vence").is(':disabled') ? null : intervaloFechaVence;

    // Si la condición de pago es CONTADO, se envía null en lugar de una fecha
    if (condicionPago === 'CONTADO') {
        formattedIntervaloFechaVence = null;
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
            'user_id': $("#user_id").val(), 
            'presupuesto_id': presupuestoId, 
            'proveedor_id': proveedorId, 
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'condicion_pago': condicionPago, // Asegúrate de enviar la condición de pago
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
                }
            }
        });
    })
    .fail(function(a, b, c) {
        alert(c);
        console.log(a.responseText); // Mostrar error en la consola
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
// Prepara el formulario para agregar un nuevo detalle al pedido
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").removeAttr("disabled");
    $("#orden_compra_det_cantidad").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled"); // Habilitar el campo de costo
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para editar un detalle existente del pedido
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#orden_compra_det_cantidad").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled"); // Habilitar el campo de costo
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para eliminar un detalle del pedido.
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#item_costo").attr("disabled", "disabled"); // Deshabilitar el campo de costo
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Realiza operaciones de creación, edición o eliminación de detalles del pedido.
function grabarDetalle() {
    // Obtener valores y eliminar espacios en blanco
    const cantidad = $.trim($("#orden_compra_det_cantidad").val());
    const costo = $.trim($("#item_costo").val());
    const itemId = $.trim($("#item_id").val());

    // Validación simple
    if (!cantidad || !costo || !itemId) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Validar que cantidad y costo sean números
    if (isNaN(cantidad) || isNaN(costo)) {
        alert("La cantidad y el costo deben ser números válidos.");
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
            "orden_compra_det_costo": costo // Asegúrate de enviar el costo aquí
        }
    })
    .done(function(respuesta) {
        listarDetalles(); // Listar los detalles después de agregar

        // Obtener el debe pendiente (asegúrate de que sea un número válido)
        const debePendiente = parseFloat($("#debe_pendiente").val()) || 0;

        // Verificar el estado de la orden de compra y el debe pendiente
        if ($("#ord_comp_estado").val() === "PENDIENTE" && debePendiente >= 0) {
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
    $("#orden_compra_det_cantidad").val("");
    $("#tip_imp_nom").val("");
    $("#item_costo").val(""); // Limpiar el campo costo después de grabar
    $("#tipo_impuesto_id").val(""); // Limpiar ID de tipo de impuesto si es necesario
    $("#subtotal").val("");    // Limpiar subtotal
    $("#totalConImpuesto").val(""); // Limpiar total con impuesto
}


// Realiza una búsqueda de productos y muestra los resultados.
function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val(),
            "tipo_descripcion": "PRODUCTO"
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_decripcion+"',"+rs.tipo_impuesto_id+",'"+rs.item_costo+"','"+rs.tip_imp_nom+"',"+rs.tipo_imp_tasa+")\">"+rs.item_decripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a, b, c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion, tipo_impuesto_id, item_costo, tip_imp_nom, tipo_imp_tasa){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#item_costo").val(item_costo); // Asegúrate de que este campo exista en tu HTML y que esté habilitado

    // Guardar el ID y el nombre del tipo de impuesto
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Convertir a números para cálculos
    const cantidad = parseFloat($("#orden_compra_det_cantidad").val()) || 0; // Convertir a número
    const costo = parseFloat(item_costo) || 0; // Convertir a número
    const tasaImpuesto = parseFloat(tipo_imp_tasa) || 0; // Convertir la tasa a número

    // Calcular subtotal y total con impuesto
    const subtotal = cantidad * costo;
    const totalConImpuesto = subtotal + (subtotal * (tasaImpuesto / 100)); // Calcular el impuesto correctamente

    // Actualizar los campos de subtotal y total con impuesto
    $("#subtotal").val(subtotal); // Asegúrate de que exista el campo 'subtotal' en tu HTML
    $("#totalConImpuesto").val(totalConImpuesto); // Asegúrate de que exista el campo 'totalConImpuesto'

    // Limpiar la lista de productos
    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");

    // Asegúrate de que las líneas del formulario estén enfocadas correctamente
    $(".form-line").attr("class","form-line focused");
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
function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Realiza una búsqueda de productos mediante una solicitud AJAX
function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral = 0;
    var TotalConImpuesto = 0; // Variable para total con impuestos

    const ordenCompraId = $("#id").val(); // Obtener el ID de la orden de compra
    const estadoOrden = $("#ord_comp_estado").val(); // Obtener el estado de la orden (asegúrate de tener este campo en tu HTML)

    // Comprobar si el ID de la orden de compra es válido
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
        console.log(resultado); // Verificar qué datos llegan del servidor

        var lista = "";
        if (resultado && resultado.length > 0) {
            // Iterar sobre los detalles si existen
            for (let rs of resultado) {
                const cantidad = rs.orden_compra_det_cantidad || 0; // Valor de cantidad, por defecto 0
                const costo = rs.item_costo || 0; // Valor de costo, por defecto 0

                const subtotal = cantidad * costo; // Cálculo del subtotal
                let totalConImpuesto = subtotal; // Inicializamos el total con impuesto igual al subtotal

                // Calcular el impuesto según el tipo
                if (rs.tip_imp_nom === "IVA10") {
                    totalConImpuesto = subtotal / 11; // Dividimos por 11 para IVA10
                } else if (rs.tip_imp_nom === "IVA5") {
                    totalConImpuesto = subtotal / 21; // Dividimos por 21 para IVA5
                }

                // Usar la función formatearNumero para formatear los valores
                lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.item_id + "," + rs.tipo_impuesto_id + ",'" + rs.item_decripcion + "','" + (rs.tip_imp_nom || 'No definido') + "'," + cantidad + ", " + costo + ", '" + formatearNumero(subtotal) + "', '" + formatearNumero(totalConImpuesto) + "');\">";
                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + (costo ? formatearNumero(costo) : 'No definido') + "</td>";
                lista += "<td>" + (rs.tip_imp_nom || 'No definido') + "</td>"; // Manejar caso donde no se defina el tipo de impuesto
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>"; // Mostrar subtotal
                lista += "<td class='text-right'>" + formatearNumero(totalConImpuesto) + "</td>"; // Mostrar total con impuestos
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal; // Sumar al total general
                TotalConImpuesto += totalConImpuesto; // Sumar al total con impuestos
            }

            // Actualizar la tabla con los detalles generados
            $("#tableDetalle").html(lista);
        } else {
            // Si no hay detalles, mostrar un mensaje en la tabla
            $("#tableDetalle").html("<tr><td colspan='7' class='text-center'>No se encontraron detalles para esta orden de compra.</td></tr>");
        }

        // Mostrar los totales en la pantalla
        $("#txtTotalGral").text(formatearNumero(TotalGral)); // Mostrar total general
        $("#txtTotalConImpuesto").text(formatearNumero(TotalConImpuesto)); // Mostrar total con impuestos

        // Habilitar el botón Confirmar si hay detalles y la orden está pendiente
        if (estadoOrden === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true"); // Deshabilitar si no hay detalles o la orden no está pendiente
        }
    })
    .fail(function(a, b, c) {
        alert("Error al obtener detalles: " + c);
        console.log(a.responseText);
    });
}

// Selecciona un detalle de un pedido y actualiza el formulario
function seleccionDetalle(item_id, tipo_impuesto_id, item_decripcion, tip_imp_nom, orden_compra_det_cantidad, costo, subtotal, totalConImpuesto) {
    $("#item_id").val(item_id);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#item_decripcion").val(item_decripcion);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#orden_compra_det_cantidad").val(orden_compra_det_cantidad);
    
    // Rellenar los campos de costo, subtotal y total con impuesto
    $("#item_costo").val(formatearNumero(costo)); // Asegúrate de que este sea el ID del campo de costo
    $("#subtotal").val(formatearNumero(subtotal)); // Asegúrate de que este sea el ID del campo de subtotal
    $("#total_con_impuesto").val(formatearNumero(totalConImpuesto)); // Asegúrate de que este sea el ID del campo de total con impuesto

    $("#listaProductos").html("");
    $("#listaProductos").attr("style", "display:none;");
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
            "user_id": $("#user_id").val(),
            "name": $("#presupuesto").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);
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
}

function buscarEmpresas() {
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/empresa/read",
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
        console.log(a.responseText);
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
        url:"http://127.0.0.1:8000/Proyecto_tp/sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.empresa_id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
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