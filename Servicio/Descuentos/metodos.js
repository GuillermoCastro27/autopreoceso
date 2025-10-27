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
    $("#desc_cab_fecha_registro").removeAttr("disabled");
    $("#desc_cab_fecha_inicio").removeAttr("disabled");
    $("#desc_cab_fecha_fin").removeAttr("disabled");
    $("#desc_cab_nombre").removeAttr("disabled");
    $("#tipo_desc_nombre").removeAttr("disabled");
    $("#desc_cab_observaciones").removeAttr("disabled");
    $("#desc_cab_porcentaje").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
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
    $("#desc_cab_fecha_registro").removeAttr("disabled");
    $("#desc_cab_fecha_inicio").removeAttr("disabled");
    $("#desc_cab_fecha_fin").removeAttr("disabled");
    $("#desc_cab_nombre").removeAttr("disabled");
    $("#tipo_desc_nombre").removeAttr("disabled");
    $("#desc_cab_observaciones").removeAttr("disabled");
    $("#desc_cab_porcentaje").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
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


function listar() {
    $.ajax({
        url: getUrl() + "descuentoscab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionPromocion(" 
                + rs.id + ", " 
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", "
                + rs.user_id + ", "
                + rs.tipo_descuentos_id + ", '"
                + rs.emp_razon_social + "', '"
                + rs.suc_razon_social + "', '"
                + rs.name + "', '"
                + rs.desc_cab_nombre + "', '"
                + rs.desc_cab_observaciones + "', '"
                + rs.desc_cab_fecha_registro + "', '"
                + rs.desc_cab_fecha_inicio + "', '"
                + rs.desc_cab_fecha_fin + "', '"
                + rs.desc_cab_porcentaje + "', '"
                + rs.desc_cab_estado + "', '"
                + rs.tipo_desc_nombre + "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.emp_razon_social + "</td>";
            lista += "<td>" + rs.suc_razon_social + "</td>";
            lista += "<td>" + rs.desc_cab_nombre + "</td>";
            lista += "<td>" + rs.name + "</td>";
            lista += "<td>" + rs.desc_cab_observaciones + "</td>";
            lista += "<td>" + rs.desc_cab_fecha_registro + "</td>";
            lista += "<td>" + rs.desc_cab_fecha_inicio + "</td>";
            lista += "<td>" + rs.desc_cab_fecha_fin + "</td>";
            lista += "<td>" + rs.desc_cab_porcentaje + "</td>";
            lista += "<td>" + rs.desc_cab_estado + "</td>";
            lista += "<td>" + rs.tipo_desc_nombre + "</td>";
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

function seleccionPromocion(
    id, empresa_id, sucursal_id, user_id, tipo_descuentos_id,
    emp_razon_social, suc_razon_social, encargado,
    desc_cab_nombre, desc_cab_observaciones,
    desc_cab_fecha_registro, desc_cab_fecha_inicio, desc_cab_fecha_fin,desc_cab_porcentaje,
    desc_cab_estado, tipo_desc_nombre
) {
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#user_id").val(user_id);
    $("#tipo_descuentos_id").val(tipo_descuentos_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#name").val(encargado);
    $("#desc_cab_nombre").val(desc_cab_nombre);
    $("#desc_cab_observaciones").val(desc_cab_observaciones);
    $("#desc_cab_fecha_registro").val(desc_cab_fecha_registro);
    $("#desc_cab_fecha_inicio").val(desc_cab_fecha_inicio);
    $("#desc_cab_fecha_fin").val(desc_cab_fecha_fin);
    $("#desc_cab_porcentaje").val(desc_cab_porcentaje);
    $("#desc_cab_estado").val(desc_cab_estado);
    $("#tipo_desc_nombre").val(tipo_desc_nombre);

    // Muestra/oculta paneles
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles(); // Si tuvieras detalles relacionados

    // Botones
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (desc_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (desc_cab_estado === "CONFIRMADO") {
        $("#btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}

function grabar(){
    var observaciones = $("#desc_cab_observaciones").val().trim();
    var nombre = $("#desc_cab_nombre").val().trim();
    var fecharegistro = $("#desc_cab_fecha_registro").val().trim();
    var fechaInicio = $("#desc_cab_fecha_inicio").val().trim();
    var fechaFin = $("#desc_cab_fecha_fin").val().trim();
    var fechaInicio = $("#desc_cab_porcentaje").val().trim();
    var tipoDesc = $("#tipo_desc_nombre").val().trim();
    var sucursal = $("#suc_razon_social").val().trim();

    // Validar campos vacíos
    if (observaciones === "" ||tipoDesc === "" ||fecharegistro === "" ||nombre === "" || fecharegistro === "" || fechaInicio === "" || fechaFin === "" || sucursal === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return; 
    }

    var endpoint = "descuentoscab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "descuentoscab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "descuentoscab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "descuentoscab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'desc_cab_nombre': $("#desc_cab_nombre").val(), 
            'desc_cab_observaciones': $("#desc_cab_observaciones").val(), 
            'desc_cab_fecha_registro': $("#desc_cab_fecha_registro").val(),  
            'desc_cab_fecha_inicio': $("#desc_cab_fecha_inicio").val(),
            'desc_cab_fecha_fin': $("#desc_cab_fecha_fin").val(),
            'user_id': $("#user_id").val(), 
            'desc_cab_estado': estado,
            'desc_cab_porcentaje': $("#desc_cab_porcentaje").val(),
            'tipo_descuentos_id': $("#tipo_descuentos_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'operacion': $("#txtOperacion").val()
        }

    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                
                // 🔄 Recarga si NO es pendiente o si es actualización
                if(resultado.registro.desc_cab_estado!="PENDIENTE" || $("#txtOperacion").val()==2){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
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

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");

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

    var endpoint = "descuentos_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "descuentos_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "descuentos_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "descuentos_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "original_item_id": $("#original_item_id").val()
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
}

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
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_decripcion + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tip_imp_nom + "',"
                + rs.tipo_imp_tasa + ","
                + rs.cantidad_disponible + ")\">"
                + rs.item_decripcion + " (Stock: " + rs.cantidad_disponible + ")</li>";   
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
function seleccionProducto(item_id, item_decripcion){
    // Asignar valores a los campos del detalle
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);

    // Ocultar lista de productos y enfocar formulario
    $("#listaProductos").html("").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    $.ajax({
        url: getUrl() + "descuentos_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        // Generar las filas del detalle
        for (rs of resultado) {
            lista += "<tr class='item-list' onclick=\"seleccionDescuentoDet("
                + rs.item_id + ", '"
                + rs.item_decripcion + "');\">";

            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + rs.item_decripcion + "</td>";
            lista += "</tr>";
        }

        $("#tableDetalle").html(lista);

        // 👇 Habilitar botón Confirmar si hay al menos un detalle
        if ($("#desc_cab_estado").val() === "PENDIENTE" && resultado.length > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionDescuentoDet(item_id, item_decripcion) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);

    $(".form-line").attr("class", "form-line focused");
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
function buscarTipoDescuento(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-descuentos/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoDesc("+rs.tipo_descuentos_id+",'"+rs.tipo_desc_nombre+"');\">"+rs.tipo_desc_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoDesc").html(lista);
        $("#listaTipoDesc").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionTipoDesc(tipo_descuentos_id,tipo_desc_nombre){
    $("#tipo_descuentos_id").val(tipo_descuentos_id);
    $("#tipo_desc_nombre").val(tipo_desc_nombre);

    $("#listaTipoDesc").html("");
    $("#listaTipoDesc").attr("style","display:none;");
}
