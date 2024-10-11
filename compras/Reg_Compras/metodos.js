// Lista los registros de la tabla compra_cab utilizando DataTables
listar();
campoFecha();

// Configura el formato de la tabla para exportar en diferentes formatos
function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend: 'copy',
                text: 'COPIAR',
                className: 'btn btn-primary waves-effect',
                title: 'Listado de Compras'
            },
            {
                extend: 'excel',
                text: 'EXCEL',
                className: 'btn btn-success waves-effect',
                title: 'Listado de Compras'
            },
            {
                extend: 'pdf',
                text: 'PDF',
                className: 'btn btn-danger waves-effect',
                title: 'Listado de Compras'
            },
            {
                extend: 'print',
                text: 'IMPRIMIR',
                className: 'btn btn-warning waves-effect',
                title: 'Listado de Compras'
            }
        ],
        iDisplayLength: 3,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: {
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
    $("#comp_intervalo_fecha_vence").removeAttr("disabled");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").removeAttr("disabled");
    $("#orden_compra").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");

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
    $("#comp_intervalo_fecha_vence").removeAttr("disabled");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");

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

// Función para consultar los registros de la tabla compra_cab
function consultar() {
    fetch('compras')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Manipula los datos como desees
      })
      .catch(error => console.error('Error:', error));
}

// Muestra un cuadro de diálogo para confirmar la operación antes de realizarla.
function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if (oper === 2) {
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if (oper === 3) {
        titulo = "ELIMINAR";
        pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
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
        url: getUrl() + "compras/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (var rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionCompra(" + rs.id + ",'" + rs.comp_intervalo_fecha_vence + "','" + rs.comp_fecha + "','" + rs.comp_estado + "','" + rs.condicion_pago + "');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.comp_intervalo_fecha_vence + "</td>";
            lista += "<td>" + rs.comp_fecha + "</td>";
            lista += "<td>" + rs.comp_estado + "</td>";
            lista += "<td>" + rs.condicion_pago + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a, b, c) {
        alert(c);
    });
}

// Rellena el formulario con los datos de una compra seleccionada
function seleccionCompra(id, comp_intervalo_fecha_vence, comp_fecha, comp_estado, condicion_pago) {
    $("#id").val(id);
    $("#comp_intervalo_fecha_vence").val(comp_intervalo_fecha_vence);
    $("#comp_fecha").val(comp_fecha);
    $("#comp_estado").val(comp_estado);
    $("#condicion_pago").val(condicion_pago);

    $("#registros").attr("style", "display:none;");
    $("#detalle").attr("style", "display:block;");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnGrabar").attr("disabled", "true");
    $("#btnCancelar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnCancelar").removeAttr("disabled");

    if (comp_estado === "PENDIENTE") {
        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
    }

    $(".form-line").attr("class", "form-line focused");
}
function buscarOrdenCompra() {
    $.ajax({
        url: getUrl() + "ordencompracab/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "user_id":$("#user_id").val(),
            "name":$("#orden_compra").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionOrdenCompra(" + rs.id + ", '" + rs.ord_comp_estado + "', '" + rs.ord_comp_fecha + "', '" + rs.condicion_pago + "', '" + rs.ord_comp_cant_cuota + "', '" + rs.ord_comp_intervalo_fecha_vence + "')\">" + rs.id + " - " + rs.prov_razonsocial + "</li>";   
        }
        lista += "</ul>";
        $("#listaOrdenCompra").html(lista);
        $("#listaOrdenCompra").attr("style", "display:block; position: absolute; z-index: 2000;");
    })    
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la búsqueda:", textStatus, errorThrown);
    });
}
function seleccionOrdenCompra(id, estado, fecha, condicion_pago, cant_cuota, intervalo_fecha_vence) {
    $("#orden_compra_id").val(id);
    $("#orden_compra_estado").val(estado);
    $("#orden_compra_fecha").val(fecha);
    $("#orden_compra_condicion_pago").val(condicion_pago);
    $("#orden_compra_cant_cuota").val(cant_cuota);
    $("#orden_compra_intervalo_fecha_vence").val(intervalo_fecha_vence);

    $("#listaOrdenCompra").html("");
    $("#listaOrdenCompra").attr("style", "display:none;");

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
        estado = "CONFIRMADO";
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
            'user_id': $("#user_id").val(), // Asumiendo que tienes un campo para el ID de usuario
            'orden_compra_cab_id': $("#orden_compra_cab_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val()
        }
    })
    .done(function(respuesta) {
        if (respuesta.tipo === "success") {
            mensajeOperacion("Éxito", respuesta.mensaje, "success");
            listar();
            cancelar();
        } else {
            mensajeOperacion("Error", respuesta.mensaje, "error");
        }
    })
    .fail(function(xhr, status, error) {
        mensajeOperacion("Error", "Error al procesar la solicitud: " + xhr.responseText, "error");
    });
}

// Inicializa el campo de fecha
function campoFecha() {
    $("#comp_fecha").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true
    });
}
