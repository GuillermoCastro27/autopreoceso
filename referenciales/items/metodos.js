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
                title:'Listado de Items'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Items'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Items'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Items'
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
function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#item_decripcion").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled");
    $("#item_precio").removeAttr("disabled");
    $("#tipo_descripcion").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#marc_nom").removeAttr("disabled");
    $("#modelo_nom").removeAttr("disabled");

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
    $("#item_costo").removeAttr("disabled");
    $("#item_precio").removeAttr("disabled");
    $("#tipo_descripcion").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#marc_nom").removeAttr("disabled");
    $("#modelo_nom").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/items/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionItems(" + rs.id + ", "+rs.tipo_impuesto_id+"," + rs.tipo_id + "," + rs.marca_id + "," + rs.modelo_id + ",'" + rs.item_decripcion + "','" + rs.item_costo + "','" + rs.item_precio + "','" + rs.tipo_descripcion + "','" + rs.tip_imp_nom + "','" + rs.marc_nom + "','" + rs.modelo_nom + "');\">";
                lista = lista + "<td>" + rs.id + "</td>";
                lista = lista + "<td>" + rs.item_decripcion + "</td>";
                lista = lista + "<td>" + rs.item_costo + "</td>";
                lista = lista + "<td>" + rs.item_precio + "</td>";
                lista = lista + "<td>" + rs.tipo_descripcion + "</td>";
                lista = lista + "<td>" + rs.tip_imp_nom + "</td>";
                lista = lista + "<td>" + rs.marc_nom + "</td>";
                lista = lista + "<td>" + rs.modelo_nom + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionItems(id,tipo_id, marca_id, modelo_id,tipo_impuesto_id, item_decripcion, item_costo, item_precio, tipo_descripcion, tip_imp_nom, marc_nom, modelo_nom) {
    // Asignar los valores a los campos correspondientes
    $("#id").val(id);
    $("#item_decripcion").val(item_decripcion);
    $("#item_costo").val(item_costo);
    $("#item_precio").val(item_precio);
    
    $("#marc_nom").val(marc_nom); // Campo visible de la marca
    $("#modelo_nom").val(modelo_nom); // Campo visible de la modelo
    $("#marca_id").val(marca_id); // Campo oculto de marca_id
    $("#modelo_id").val(modelo_id); // Campo oculto de modelo_id
    $("#tipo_id").val(tipo_id); // Campo oculto de tipo_id
    $("#tipo_descripcion").val(tipo_descripcion); // Campo oculto de tipo_descripcion
    $("#tipo_impuesto_id").val(tipo_impuesto_id); // Campo visible de la tipo_impuesto_id 
    $("#tip_imp_nom").val(tip_imp_nom); // Campo visible de la tip_imp_nom


    $("#btnAgregar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    $("#btnEditar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");
    
    $(".form-line").attr("class","form-line focused");
}


function buscarTipoItems(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoItems("+rs.id+",'"+rs.tipo_descripcion+"', '"+rs.tipo_objeto+"' )\">"+rs.tipo_descripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaTipoItems").html(lista);
        $("#listaTipoItems").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionTipoItems(id, tipo_descripcion, tipo_objeto) {
    $("#tipo_id").val(id);  // Asegúrate de que el campo hidden exista
    $("#tipo_descripcion").val(tipo_descripcion);
    $("#tipo_objeto").val(tipo_objeto);

    $("#listaTipoItems").html("");
    $("#listaTipoItems").attr("style", "display:none;");
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

function buscarMarcas(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/marca/read",
        method:"GET",
        dataType: "json"
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

function seleccionMarca(id,marc_nom){
    $("#marca_id").val(id);
    $("#marc_nom").val(marc_nom);

    $("#listaMarcas").html("");
    $("#listaMarcas").attr("style","display:none;");
}

function buscarModelo(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/modelo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionModelos("+rs.id+",'"+rs.modelo_nom+"');\">"+rs.modelo_nom+"</li>";
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

function seleccionModelos(id,modelo_nom){
    $("#modelo_id").val(id);
    $("#modelo_nom").val(modelo_nom);

    $("#listaModelos").html("");
    $("#listaModelos").attr("style","display:none;");
}


function grabar() {
    var endpoint = "items/create";
    var metodo = "POST";
    if($("#txtOperacion").val() == 2){
        endpoint = "items/update/" + $("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val() == 3){
        endpoint = "items/delete/" + $("#id").val();
        metodo = "DELETE";
    }
    
    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'item_decripcion': $("#item_decripcion").val(), 
            'item_costo': $("#item_costo").val(),
            'item_precio': $("#item_precio").val(),
            'tipo_id': $("#tipo_id").val(),
            'tipo_impuesto_id': $("#tipo_impuesto_id").val(),
            'marca_id': $("#marca_id").val(),
            'modelo_id': $("#modelo_id").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            icon: resultado.tipo,
        }).then(function() {
            if(resultado.tipo === "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(jqXHR) {
        if (jqXHR.status === 422) {
            // Errores de validación
            var errors = jqXHR.responseJSON.errors;
            var errorMessage = "";

            if (errors.item_costo) {
                errorMessage += "Costo: " + errors.item_costo[0] + "\n";
            }
            if (errors.item_precio) {
                errorMessage += "Precio: " + errors.item_precio[0] + "\n";
            }

            swal("Errores en el formulario", errorMessage, "error");
        } else if (jqXHR.status === 500 && jqXHR.responseText.includes("SQLSTATE[23503]")) {
            // Error de llave foránea (registro en uso en otra tabla)
            swal("Error", "No se puede eliminar el registro porque está siendo utilizado en otra parte del sistema.", "error");
        } else {
            // Otros errores no manejados
            swal("Error", "Ocurrió un error inesperado. Intenta nuevamente.", "error");
        }
    });
}

