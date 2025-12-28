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

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#ped_ven_fecha").removeAttr("disabled");
    $("#ped_ven_vence").removeAttr("disabled");
    $("#ped_ven_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);
    $("#ped_ven_fecha").removeAttr("disabled");
    $("#ped_ven_vence").removeAttr("disabled");
    $("#ped_ven_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
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

function listar(){
    $.ajax({
        url: getUrl() + "pedido_ventas/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){

        let lista = "";

        for (let rs of resultado) {

            lista += `<tr class="item-list"
                onclick="seleccionPedidoVenta(
                    ${rs.id},
                    ${rs.empresa_id},
                    ${rs.sucursal_id},
                    ${rs.clientes_id},
                    '${rs.emp_razon_social}',
                    '${rs.suc_razon_social}',
                    '${rs.cli_nombre}',
                    '${rs.cli_apellido}',
                    '${rs.cli_ruc}',
                    '${rs.cli_direccion}',
                    '${rs.cli_telefono}',
                    '${rs.cli_correo}',
                    '${rs.ped_ven_fecha}',
                    '${rs.ped_ven_vence}',
                    '${rs.ped_ven_observaciones}',
                    '${rs.ped_ven_estado}'
                )">`;

            lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.emp_razon_social}</td>`;
            lista += `<td>${rs.suc_razon_social}</td>`;
            lista += `<td>${rs.ped_ven_fecha}</td>`;
            lista += `<td>${rs.ped_ven_vence}</td>`;
            lista += `<td>${rs.ped_ven_observaciones}</td>`;
            lista += `<td>${rs.cli_nombre}</td>`;
            lista += `<td>${rs.name}</td>`;
            lista += `<td>${rs.ped_ven_estado}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr){
        console.error(xhr.responseText);
        alert("Error al listar pedidos de ventas");
    });
}
function seleccionPedidoVenta(
    id_pedido,
    empresa_id,
    sucursal_id,
    clientes_id,
    emp_razon_social,
    suc_razon_social,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,
    ped_ven_fecha,
    ped_ven_vence,
    ped_ven_observaciones,
    ped_ven_estado
){
    $("#id").val(id_pedido);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#ped_ven_fecha").val(ped_ven_fecha);
    $("#ped_ven_vence").val(ped_ven_vence);
    $("#ped_ven_observaciones").val(ped_ven_observaciones);
    $("#ped_ven_estado").val(ped_ven_estado);

    // Vista
    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    // Botonera base
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .attr("disabled", true);

    $("#btnCancelar").removeAttr("disabled");

    if (ped_ven_estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").show();
    }

    if (ped_ven_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").addClass("focused");
}
function buscarCliente(){
    $.ajax({
        url: getUrl()+"clientes/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "cli_nombre":$("#cli_nombre").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.clientes_id+",'"+rs.cli_nombre+"','"+rs.cli_apellido+"','"+rs.cli_ruc+"','"+rs.cli_direccion+"','"+rs.cli_telefono+"','"+rs.cli_correo+"')\">"+rs.cli_nombre+" - "+rs.cli_apellido+"- "+rs.cli_ruc+"</li>";   
        }
        lista += "</ul>";
        $("#listaClientes").html(lista);
        $("#listaClientes").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el formulario con los datos de un proveedor seleccionado.
function seleccionCliente(clientes_id,cli_nombre,cli_apellido,cli_ruc,cli_direccion,cli_telefono,cli_correo){
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}
function grabar(){

    var observaciones = $("#ped_ven_observaciones").val().trim();
    var fecha         = $("#ped_ven_fecha").val().trim();
    var plazo         = $("#ped_ven_vence").val().trim();
    var sucursal      = $("#suc_razon_social").val().trim();
    var cliente       = $("#cli_nombre").val().trim();

    // 🔹 Validación mínima
    if (observaciones === "" || fecha === "" || plazo === "" || sucursal === "" || cliente === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return;
    }

    let endpoint = "pedido_ventas/create";
    let metodo   = "POST";
    let estado   = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "pedido_ventas/update/" + $("#id").val();
        metodo   = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "pedido_ventas/anular/" + $("#id").val();
        metodo   = "PUT";
        estado   = "ANULADO";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "pedido_ventas/confirmar/" + $("#id").val();
        metodo   = "PUT";
        estado   = "CONFIRMADO";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id: $("#id").val(),
            ped_ven_fecha: fecha,
            ped_ven_vence: plazo,
            ped_ven_observaciones: observaciones,
            ped_ven_estado: estado,

            user_id: $("#user_id").val(),
            empresa_id: $("#empresa_id").val(),
            sucursal_id: $("#sucursal_id").val(),
            clientes_id: $("#clientes_id").val(),

            operacion: $("#txtOperacion").val()
        }
    })
    .done(function(resultado){

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){

            if (resultado.tipo === "success") {

                $("#id").val(resultado.registro.id);
                $("#detalle").show();

                // 🔄 Recargar si se confirmó, anuló o editó
                if (
                    resultado.registro.ped_ven_estado !== "PENDIENTE" ||
                    $("#txtOperacion").val() == 2
                ) {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr){
        console.error(xhr.responseText);
        swal("Error", "No se pudo completar la operación.", "error");
    });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregarDetalle() {
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#cantidad_stock").val(""); // Limpiar la cantidad de stock al agregar un nuevo detalle

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function grabarDetalle(){

    var endpoint = "pedido_ventas_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "pedido_ventas_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "pedido_ventas_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "pedidos_ventas_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "det_cantidad":$("#det_cantidad").val(),
        "cantidad_stock":$("#cantidad_stock").val()
    }
})

.done(function(respuesta){
listarDetalles();
})
.fail(function(a,b,c){
    alert(c);
    console.log(a.responseText);
})

$("#btnAgregarDetalle").attr("style","display:inline");
$("#btnEditarDetalle").attr("style","display:inline");
$("#btnEliminarDetalle").attr("style","display:inline");
$("#btnGrabarDetalle").attr("style","display:none");

$("#txtOperacionDetalle").val(1);

$("#item_decripcion").val("");
$("#det_cantidad").val("");
$("#cantidad_stock").val("");
}

function buscarProductos() {
    $.ajax({
        url: getUrl() + "items/buscarItem",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_decripcion+"', "+rs.cantidad_disponible+")\">"+
                        rs.item_decripcion + " <span class='badge badge-primary'>Disponible: " + rs.cantidad_disponible + "</span>" +
                      "</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}
function seleccionProducto(item_id, item_decripcion, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    
    // Mostrar cantidad disponible en el campo correcto
    $("#cantidad_stock").val(cantidad_disponible);

    // Limpiar la lista de productos
    $("#listaProductos").html("").hide();

    $(".form-line").addClass("focused");
}

function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"pedido_ventas_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.item_id+",'"+rs.item_decripcion+"',"+rs.det_cantidad+","+rs.cantidad_stock+");\">";
                lista = lista + "<td>" + rs.item_id + "</td>";
                lista = lista + "<td>" + rs.item_decripcion + "</td>";
                lista = lista + "<td>" + rs.det_cantidad + "</td>";
                lista = lista + "<td>" + rs.cantidad_stock + "</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ped_ven_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}
function seleccionDetalle(item_id, item_decripcion, det_cantidad, cantidad_stock) {
    console.log("Seleccionado item_id:", item_id);
    $("#original_item_id").val(item_id); // Guarda el item_id original
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#cantidad_stock").val(cantidad_stock);
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
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telef, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telef, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telef").val(emp_telef);
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