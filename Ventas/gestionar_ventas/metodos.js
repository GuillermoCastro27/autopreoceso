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

// Prepara el formulario para agregar una nueva compra.
function agregar() {
    $("#txtOperacion").val(1); // Indica operación de agregar
    $("#id").val(0); // Resetea el campo ID
    $("#vent_intervalo_fecha_vence").attr("disabled", "true");
    $("#vent_fecha").removeAttr("disabled");
    $("#vent_cant_cuota").attr("disabled", "true");
    $("#pedido_venta").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");
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
    $("#vent_intervalo_fecha_vence").attr("disabled", "true");
    $("#vent_fecha").removeAttr("disabled");
    $("#vent_cant_cuota").attr("disabled", "true");
    $("#pedido_venta").removeAttr("disabled");
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

// Lista los registros de compra mediante una solicitud AJAX
function listar() {
    $.ajax({
        url: getUrl() + "ventas_cab/read",
        method: "GET",
        dataType: "json"
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
                rs.condicion_pago +
            "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.vent_intervalo_fecha_vence + "</td>";
            lista += "<td>" + rs.vent_fecha + "</td>";
            lista += "<td>" + rs.pedido_venta + "</td>";
            lista += "<td>" + rs.encargado + "</td>";
            lista += "<td>" + rs.vent_cant_cuota + "</td>";
            lista += "<td>" + rs.vent_estado + "</td>";
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
    condicion_pago
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

    // Mostrar secciones
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles(); // Detalle viene de ventas_det

    // Reset botones
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnGrabar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    if (vent_estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
    }

    if (vent_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
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
function listarDetalles() {

    let cantidadDetalle = 0;
    let TotalGral = 0;
    let TotalIVA = 0;

    const ventasCabId = $("#id").val();
    const estadoVenta = $("#vent_estado").val();

    if (!ventasCabId) {
        alert("No se ha definido el ID de la venta.");
        return;
    }

    $.ajax({
        url: getUrl() + "ventas_det/read/" + ventasCabId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {

        let lista = "";

        if (resultado && resultado.length > 0) {

            for (let rs of resultado) {

                const cantidad = parseFloat(rs.vent_det_cantidad) || 0;
                const precio   = parseFloat(rs.vent_det_precio) || 0;
                const subtotal = parseFloat(rs.subtotal) || (cantidad * precio);
                const iva      = parseFloat(rs.iva) || 0;

                lista += "<tr>";
                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(precio) + "</td>";
                lista += "<td>" + rs.tip_imp_nom + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
                TotalIVA  += iva;
            }

            $("#tableDetalle").html(lista);

        } else {

            $("#tableDetalle").html(
                "<tr><td colspan='7' class='text-center'>No se encontraron detalles para esta venta.</td></tr>"
            );
        }

        // Totales
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIVA));

        // Botón confirmar
        if (estadoVenta === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error al obtener detalles: " + error);
        console.error(xhr.responseText);
    });
}

function buscarPedidoVentas() {

    $.ajax({
        url: getUrl() + "pedido_ventas/buscar",
        method: "POST",
        dataType: "json",
        data: {
            user_id: $("#user_id").val(),
            name: $("#pedido_venta").val()
        }
    })
    .done(function(resultado) {

        console.log("Pedidos encontrados:", resultado);

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
        console.error("Error al buscar pedidos de venta:", error);
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
    $("#pedidos_ventas_id").val(pedido_id);
    $("#pedido_venta").val(pedido);

    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);
    $("#cli_direccion").val(cli_direccion);

    $("#vent_intervalo_fecha_vence").val("");

    // Reaplicar reglas según condición de pago
    controlarCamposPago();
    $("#listaPedidoVentas").html("").hide();
    $(".form-line").addClass("focused");

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

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id'                      : $("#id").val(),
            'vent_intervalo_fecha_vence': $("#vent_intervalo_fecha_vence").val(),
            'vent_fecha'              : $("#vent_fecha").val(),
            'vent_estado'             : estado,
            'vent_cant_cuota'         : $("#vent_cant_cuota").val(),
            'condicion_pago'          : $("#condicion_pago").val(),
            'user_id'                 : $("#user_id").val(),
            'pedidos_ventas_id'       : $("#pedidos_ventas_id").val(),
            'clientes_id'             : $("#clientes_id").val(),
            'empresa_id'              : $("#empresa_id").val(),
            'sucursal_id'             : $("#sucursal_id").val()
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

                // Mostrar detalle siempre
                $("#detalle").show();
                listarDetalles();

                // Si ya no está pendiente, refrescar
                if (resultado.registro.vent_estado !== "PENDIENTE") {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr, status, error) {
        alert(error);
        console.error(xhr.responseText);
    });
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

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
