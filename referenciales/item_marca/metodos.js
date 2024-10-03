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
                title:'Listado de Items Marca'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Items Marca'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Items Mearca'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Items Marca'
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
    $("#marc_nom").removeAttr("disabled");
    $("#item_marca_descrip").removeAttr("disabled");

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
    $("#marc_nom").removeAttr("disabled");
    $("#item_marca_descrip").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar() {
    $("#txtOperacion").val(3); // Esto debe ejecutarse al hacer clic en "Eliminar"
    $("#btnGrabar").prop('disabled', false); // Activa el botón "Grabar"
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
        url:"http://127.0.0.1:8000/Proyecto_tp/item-marca/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionItemMarca("+rs.marca_id+",'"+rs.marc_nom+"',"+rs.item_id+",'"+rs.item_decripcion+"','"+rs.item_marca_descrip+"');\">";   
                lista = lista + "<td>";
                lista = lista + rs.marc_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_decripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_marca_descrip;
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

function seleccionItemMarca(marca_id,marc_nom,item_id, item_decripcion, item_marca_descrip){
    $("#marca_id").val(marca_id);
    $("#item_id").val(item_id);
    $("#item_marca_descrip").val(item_marca_descrip);
    $("#item_decripcion").val(item_decripcion);
    $("#marc_nom").val(marc_nom);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
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

function buscarMarca(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/marca/read",
        method:"GET",
        dataType: "json",
        data: {
            'marc_nom': $("#marc_nom").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionMarca("+rs.id+",'"+rs.marc_nom+"');\">"+rs.marc_nom+"</li>";
        }
        lista += "</ul>";
        $("#listaMarcas").html(lista);
        $("#listaMarcas").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionMarca(id, nombre) {
    $("#marca_id").val(id);  // Asegúrate de asignar correctamente marca_id
    $("#marc_nom").val(nombre);
    $("#listaMarcas").html("");
    $("#listaMarcas").attr("style", "display:none;");
}
function grabar() {
    var endpoint = "item-marca/create"; // Esto es para agregar
    var metodo = "POST";
    
    if ($("#txtOperacion").val() == 2) { // Para actualizar
        endpoint = "item-marca/update/" + $("#marca_id").val() + "/" + $("#item_id").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) { // Para eliminar
        endpoint = "item-marca/delete/" + $("#marca_id").val() + "/" + $("#item_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'item_id': $("#item_id").val(),  
            'marca_id': $("#marca_id").val(), 
            'item_marca_descrip': $("#item_marca_descrip").val(), 
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
