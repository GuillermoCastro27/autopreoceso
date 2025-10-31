listar();
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
                title:'Listado de Items Modelo'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Items Modelo'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Items Modelo'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Items Modelo'
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
    $("#item_decripcion").removeAttr("disabled");
    $("#modelo_nom").removeAttr("disabled");
    $("#item_modelo_descrip").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#modelo_nom").removeAttr("disabled");
    $("#item_modelo_descrip").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

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

function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}


function listar(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/item-modelo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionItemModelo("+rs.modelo_id+",'"+rs.modelo_nom+"',"+rs.item_id+",'"+rs.item_decripcion+"','"+rs.item_modelo_descrip+"');\">";   
                lista = lista + "<td>";
                lista = lista + rs.modelo_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_decripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_modelo_descrip;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}

function seleccionItemModelo(modelo_id,modelo_nom,item_id, item_decripcion, item_modelo_descrip){
    $("#modelo_id").val(modelo_id);
    $("#item_id").val(item_id);
    $("#item_modelo_descrip").val(item_modelo_descrip);
    $("#item_decripcion").val(item_decripcion);
    $("#modelo_nom").val(modelo_nom);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar() {
    var descripcion = $("#item_modelo_descrip").val().trim();
    var producto = $("#item_decripcion").val().trim();
    var modelo = $("#modelo_nom").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    if (producto === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    if (modelo === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    console.log({
        id: $("#id").val(),
        item_id: $("#item_id").val(),
        modelo_id: $("#modelo_id").val(),
        item_modelo_descrip: $("#item_modelo_descrip").val()
    });
    var endpoint = "item-modelo/create";
    var metodo = "POST";
    if ($("#txtOperacion").val() == 2) {
        endpoint = "item-modelo/update/" + $("#id").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) {
        endpoint = "item-modelo/delete/" + $("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id': $("#id").val(),
            'item_id': $("#item_id").val(),  // Cambiado para enviar item_id
            'modelo_id': $("#modelo_id").val(), // Cambiado para enviar modelo_id
            'item_modelo_descrip': $("#item_modelo_descrip").val(), // Cambiado para enviar item_modelo_descrip
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function() {
            if (resultado.tipo == "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(a, b, c) {
        alert(c);
        console.log(a.responseText);
    });
}
function buscarProductos(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/items/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "item_decripcion":$("#item_decripcion").val(),
            "tipo_descripcion":"PRODUCTO"
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_decripcion+"')\">"+rs.item_decripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion) {
    $("#item_id").val(item_id);  // Asegúrate de asignar correctamente item_id
    $("#item_decripcion").val(item_decripcion);
    $("#listaProductos").html("");
    $("#listaProductos").attr("style", "display:none;");
    $(".form-line").attr("class", "form-line focused");
}

function buscarModelo(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/modelo/read",
        method:"GET",
        dataType: "json",
        data: {
            'modelo_nom': $("#modelo_nom").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionModelo("+rs.id+",'"+rs.modelo_nom+"');\">"+rs.modelo_nom+"</li>";
        }
        lista += "</ul>";
        $("#listaModelos").html(lista);
        $("#listaModelos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionModelo(id, nombre) {
    $("#modelo_id").val(id);  // Asegúrate de asignar correctamente modelo_id
    $("#modelo_nom").val(nombre);
    $("#listaModelos").html("");
    $("#listaModelos").attr("style", "display:none;");
}