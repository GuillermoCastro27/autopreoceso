// Cargar user_id del usuario logueado
cargarUserIdLogueado();
listar();
campoFecha();
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
                title:'Listado de Pedidos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del START al END de un total de TOTAL registros',
            sInfoFiltered: '(filtrado de entre MAX registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}
function cancelar(){
    location.reload(true);
}

function agregar() {

    $("#txtOperacion").val(1);
    $("#id").val(0);

    // Campos editables
    $("#nota_remi_vent_fecha").removeAttr("disabled");
    $("#nota_remi_vent_observaciones").removeAttr("disabled");

    // Campos SIEMPRE bloqueados
    $("#emp_razon_social").attr("disabled", true);
    $("#suc_razon_social").attr("disabled", true);
    $("#nro_venta").removeAttr("disabled"); // para buscar venta
    $("#cli_nombre").attr("disabled", true);

    // Botones
    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnGrabar, #btnCancelar").removeAttr("disabled");

    $(".form-line").addClass("focused");
    $("#registros").hide();
}
function editar() {

    $("#txtOperacion").val(2);

    $("#nota_remi_vent_fecha").removeAttr("disabled");
    $("#nota_remi_vent_observaciones").removeAttr("disabled");

    // Todo lo demás bloqueado
    $("#emp_razon_social, #suc_razon_social, #nro_venta, #cli_nombre")
        .attr("disabled", true);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnGrabar, #btnCancelar").removeAttr("disabled");

    $(".form-line").addClass("focused");
}
function eliminar() {

    $("#txtOperacion").val(3);

    // No se edita ningún campo
    $("input").attr("disabled", true);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnGrabar, #btnCancelar").removeAttr("disabled");
}
function confirmar() {

    $("#txtOperacion").val(4);

    // Bloquear todo
    $("input").attr("disabled", true);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnGrabar, #btnCancelar").removeAttr("disabled");
}


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
        pregunta="¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
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

function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}


function listar() {

    $.ajax({
        url: getUrl() + "notaremivent/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            lista += `
                <tr class="item-list"
                    onclick="seleccionNotaRemi(
                        ${rs.id},
                        ${rs.empresa_id},
                        ${rs.sucursal_id},
                        ${rs.ventas_cab_id},      /* ✅ */
                        ${rs.clientes_id},        /* ✅ */
                        '${rs.emp_razon_social}',
                        '${rs.suc_razon_social}',
                        '${rs.nota_remi_vent_fecha_formato}',
                        '${rs.nota_remi_vent_observaciones}',
                        '${rs.nota_remi_vent_estado}',
                        '${rs.cli_nombre}',
                        '${rs.cli_apellido}',
                        '${rs.cli_ruc}',
                        '${rs.cli_direccion}',
                        '${rs.cli_telefono}',
                        '${rs.cli_correo}',
                        '${rs.nro_venta}'
                    )">
                    <td>${rs.id}</td>
                    <td>${rs.emp_razon_social}</td>
                    <td>${rs.suc_razon_social}</td>
                    <td>${rs.nota_remi_vent_fecha_formato}</td>
                    <td>${rs.nota_remi_vent_observaciones}</td>
                    <td>${rs.name}</td>
                    <td>${rs.nota_remi_vent_estado}</td>
                </tr>
            `;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        alert("Error al listar notas de remisión");
    });
}
function seleccionNotaRemi(
    id_nota,
    empresa_id,
    sucursal_id,
    ventas_cab_id,      // ✅ NUEVO
    clientes_id,        // ✅ NUEVO
    emp_razon_social,
    suc_razon_social,
    nota_fecha,
    observaciones,
    estado,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,
    nro_venta
) {
    $("#id").val(id_nota);

    // Empresa / Sucursal
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // Venta
    $("#ventas_cab_id").val(ventas_cab_id);   // ✅ CLAVE
    $("#nro_venta").val(nro_venta);

    // Cliente
    $("#clientes_id").val(clientes_id);       // ✅ CLAVE
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // Nota
    $("#nota_remi_vent_fecha").val(nota_fecha);
    $("#nota_remi_vent_observaciones").val(observaciones);
    $("#nota_remi_vent_estado").val(estado);

    // UI
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    // Botones
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .attr("disabled", true);

    $("#btnCancelar").removeAttr("disabled");

    if (estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").show();
    }

    $(".form-line").addClass("focused");
}

function buscarVentas() {

    $.ajax({
        url: getUrl() + "ventas_cab/buscar",
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
                        '${rs.nro_venta}',
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
                        '${rs.cli_correo}'
                    )">
                    VENTA NRO: ${rs.nro_venta} - ${rs.cli_nombre} ${rs.cli_apellido}
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
    nro_venta,
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
    cli_correo
) {
    // Venta
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#nro_venta").val(nro_venta);

    // Empresa / Sucursal
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // Cliente
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // Ocultar lista
    $("#listaVentas").html("").hide();

    // UX
    $(".form-line").addClass("focused");

    // Bloquear edición de campos que no deben cambiar
    $("#nro_venta").attr("disabled", true);
}
function grabar() {
    console.log("===== DEBUG GRABAR NOTA REMISIÓN =====");
    console.log("Operacion:", $("#txtOperacion").val());
    console.log("ID Nota:", $("#id").val());
    console.log("Estado actual:", $("#nota_remi_vent_estado").val());

    console.log("Venta ID:", $("#ventas_cab_id").val());
    console.log("Cliente ID:", $("#clientes_id").val());

    console.log("Empresa ID:", $("#empresa_id").val());
    console.log("Sucursal ID:", $("#sucursal_id").val());

    console.log("Fecha visible:", $("#nota_remi_vent_fecha").val());
    console.log("Observaciones:", $("#nota_remi_vent_observaciones").val());

    console.log("======================================");

    let observaciones = $("#nota_remi_vent_observaciones").val().trim();
    let fecha         = $("#nota_remi_vent_fecha").val().trim();

    // ===============================
    // VALIDACIONES
    // ===============================
    if (fecha === "") {
        swal("Error", "Debe ingresar la fecha de la nota de remisión.", "error");
        return;
    }

    if (observaciones === "") {
        swal("Error", "Debe ingresar una observación.", "error");
        return;
    }

    if ($("#ventas_cab_id").val() == 0 || $("#ventas_cab_id").val() === "") {
        swal("Error", "Debe seleccionar una venta.", "error");
        return;
    }

    // ===============================
    // ENDPOINT Y MÉTODO
    // ===============================
    let endpoint = "notaremivent/create";
    let metodo   = "POST";
    let estado   = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "notaremivent/update/" + $("#id").val();
        metodo   = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "notaremivent/anular/" + $("#id").val();
        metodo   = "PUT";
        estado   = "ANULADA";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "notaremivent/confirmar/" + $("#id").val();
        metodo   = "PUT";
        estado   = "CONFIRMADA";
    }

    // ===============================
    // AJAX
    // ===============================
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            nota_remi_vent_fecha: $("#nota_remi_vent_fecha").val(),
            nota_remi_vent_observaciones: $("#nota_remi_vent_observaciones").val(),
            nota_remi_vent_estado: estado,

            ventas_cab_id: $("#ventas_cab_id").val(),
            clientes_id: $("#clientes_id").val(),

            user_id: $("#user_id").val(),
            empresa_id: $("#empresa_id").val(),
            sucursal_id: $("#sucursal_id").val(),

            operacion: $("#txtOperacion").val()
        }
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                $("#id").val(resultado.registro.id);

                $("#detalle").show();
                listarDetalles();

                // Si ya no está pendiente, recargar
                if (resultado.registro.nota_remi_vent_estado !== "PENDIENTE") {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "Ocurrió un error al grabar la nota de remisión.", "error");
    });
}
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function listarDetalles() {

    let cantidadDetalle = 0;
    let totalGeneral = 0;

    $.ajax({
        url: getUrl() + "notaremiventdet/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            let subtotal = rs.nota_remi_vent_det_cantidad * rs.nota_remi_vent_det_precio;
            totalGeneral += subtotal;

            lista += `
                <tr class="item-list"
                    onclick="seleccionDetalle(
                        ${rs.item_id},
                        '${rs.item_decripcion}',
                        ${rs.nota_remi_vent_det_cantidad},
                        ${rs.nota_remi_vent_det_precio}
                    )">
                    <td>${rs.item_id}</td>
                    <td>${rs.item_decripcion}</td>
                    <td class="text-right">${rs.nota_remi_vent_det_cantidad}</td>
                    <td class="text-right">${rs.nota_remi_vent_det_precio}</td>
                    <td class="text-right">${subtotal}</td>
                </tr>
            `;

            cantidadDetalle++;
        }

        $("#tableDetalle").html(lista);
        $("#txtTotalGral").html(totalGeneral);

        // Habilitar confirmar solo si está pendiente y tiene detalle
        if ($("#nota_remi_vent_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "No se pudo listar el detalle de la nota de remisión.", "error");
    });
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