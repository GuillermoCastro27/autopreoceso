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
                title:'Listado de Ajustes'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ajustes'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ajustes'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ajustes'
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
    $("#ajus_cab_fecha").removeAttr("disabled");
    $("#descripcion").removeAttr("disabled");
    $("#tipo_ajuste").val("");
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
    $("#ajus_cab_fecha").removeAttr("disabled");
    $("#descripcion").removeAttr("disabled");
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


function listar(){
    $.ajax({
        url: getUrl() + "ajus_cab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionAjuste("
                + rs.id + ", " 
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", '"
                + rs.emp_razon_social + "', '"
                + rs.suc_razon_social + "', '"
                + rs.ajus_cab_fecha + "', '"
                + rs.motivo_ajuste_id + "', '"
                + rs.descripcion + "', '"
                + rs.tipo_ajuste + "', '"
                + rs.ajus_cab_estado + "', '"
                + rs.name + "');\">";
            
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.emp_razon_social + "</td>";
            lista += "<td>" + rs.suc_razon_social + "</td>";
            lista += "<td>" + rs.ajus_cab_fecha + "</td>";
            lista += "<td>" + rs.descripcion + "</td>";
            lista += "<td>" + rs.tipo_ajuste + "</td>";
            lista += "<td>" + rs.name + "</td>";
            lista += "<td>" + rs.ajus_cab_estado + "</td>";
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
function seleccionAjuste(ajuste_id,empresa_id, sucursal_id,emp_razon_social,suc_razon_social, ajus_cab_fecha, motivo_ajuste_id, descripcion,tipo_ajuste, ajus_cab_estado){
    $("#id").val(ajuste_id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#ajus_cab_fecha").val(ajus_cab_fecha);
    $("#motivo_ajuste_id").val(motivo_ajuste_id);
    $("#descripcion").val(descripcion);
    $("#tipo_ajuste").val(tipo_ajuste);
    $("#ajus_cab_estado").val(ajus_cab_estado);

    
    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();
    
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    
    $("#btnCancelar").removeAttr("disabled");

    if(ajus_cab_estado === "PENDIENTE"){
    $("#btnAgregar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    
    $("#btnEliminar").removeAttr("disabled");
    $("#btnConfirmar").removeAttr("disabled");
    $("#btnEditar").removeAttr("disabled");
    $("#formDetalles").attr("style","display:block;");
    }
    $(".form-line").attr("class","form-line focused");
}
function grabar(){
    var descripcion = $("#descripcion").val().trim();
    var fecha = $("#ajus_cab_fecha").val().trim();
    var sucursal = $("#suc_razon_social").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    if (fecha === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    if (sucursal === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    var endpoint = "ajus_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "ajus_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "ajus_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "ajus_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'ajus_cab_fecha': $("#ajus_cab_fecha").val(), 
            'motivo_ajuste_id': $("#motivo_ajuste_id").val(),  
            'tipo_ajuste': $("#tipo_ajuste").val(),
            'user_id': $("#user_id").val(), 
            'ajus_cab_estado': estado,
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val()
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
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                if(resultado.registro.ajus_cab_estado!="PENDIENTE"){
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
    $("#ajus_det_cantidad").removeAttr("disabled");
    $("#cantidad_stock").val(""); // Limpiar la cantidad de stock al agregar un nuevo detalle
    
    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#ajus_det_cantidad").removeAttr("disabled");

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

    var endpoint = "ajus_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "ajus_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "ajus_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "ajuste_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "ajus_det_cantidad":$("#ajus_det_cantidad").val(),
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
$("#ajus_det_cantidad").val("");
$("#cantidad_stock").val("");
}

function buscarProductos() {
    $.ajax({
        url: getUrl() + "items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val(),
            "tipo_descripcion": "PRODUCTO"
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
        url:getUrl()+"ajus_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.item_id+",'"+rs.item_decripcion+"',"+rs.ajus_det_cantidad+","+rs.cantidad_stock+");\">";
                lista = lista + "<td>" + rs.item_id + "</td>";
                lista = lista + "<td>" + rs.item_decripcion + "</td>";
                lista = lista + "<td>" + rs.ajus_det_cantidad + "</td>";
                lista = lista + "<td>" + rs.cantidad_stock + "</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ajus_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
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
function seleccionDetalle(item_id, item_decripcion, ajus_det_cantidad, cantidad_stock) {
    console.log("Seleccionado item_id:", item_id);
    $("#original_item_id").val(item_id); // Guarda el item_id original
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#ajus_det_cantidad").val(ajus_det_cantidad);
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
function buscarMotivoAjuste() {
    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/motivo_ajuste/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionMotivoAjuste("+rs.id+", '"+rs.descripcion+"', '"+rs.tipo_ajuste+"');\">" + 
                     rs.descripcion + " (" + rs.tipo_ajuste + ")</li>";
        }
        lista += "</ul>";
        $("#listaMotivoajuste").html(lista);
        $("#listaMotivoajuste").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a, b, c) {
        alert("Error al obtener los motivos de ajuste: " + c);
        console.log(a.responseText);
    });
}

function seleccionMotivoAjuste(id, descripcion, tipo_ajuste) {
    $("#motivo_ajuste_id").val(id);
    $("#descripcion").val(descripcion);
    $("#tipo_ajuste").val(tipo_ajuste);

    $("#listaMotivoajuste").html("");
    $("#listaMotivoajuste").attr("style", "display:none;");
}
