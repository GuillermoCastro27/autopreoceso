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
                title:'Listado de Tipo Items'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Roles'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Roles'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Roles'
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
    $("#txtCodigo").val(0);
    $("#pref_descripcion").removeAttr("disabled");
    $("#pref_abreviatura").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#pref_descripcion").removeAttr("disabled");
    $("#pref_abreviatura").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/perfiles/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionRol("+rs.id+",'"+rs.pref_descripcion+"','"+rs.pref_abreviatura+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pref_descripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pref_abreviatura;
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
function seleccionRol(codigo, pref_descripcion, pref_abreviatura){
    $("#txtCodigo").val(codigo);
    $("#pref_descripcion").val(pref_descripcion);
    $("#pref_abreviatura").val(pref_abreviatura);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar() {
    var descripcion = $("#pref_descripcion").val().trim();
    var abreviatura = $("#pref_abreviatura").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }
    if (abreviatura === "") {
        swal({
            title: "Error", 
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return; 
    }

    var endpoint = "perfiles/create";
    var metodo = "POST";
    if($("#txtOperacion").val() == 2) {
        endpoint = "perfiles/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val() == 3) {
        endpoint = "perfiles/delete/" + $("#txtCodigo").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'pref_descripcion': descripcion, 
            'pref_abreviatura': abreviatura
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function() {
            if(resultado.tipo == "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(xhr) {
        var respuesta = xhr.responseJSON;

        // Manejo de errores
        if (xhr.status === 400) {
            swal({
                title: "Error",
                text: respuesta.mensaje,
                type: "error"
            });
        } else if (xhr.status === 422) {
            // Errores de validación
            let errores = "";
            $.each(respuesta.errors, function(key, value) {
                errores += value + "\n";
            });
            swal({
                title: "Error de validación",
                text: errores,
                type: "error"
            });
        } else if (xhr.status === 500 && xhr.responseText.includes("SQLSTATE[23503]")) {
            // Error de llave foránea (tipo en uso en otra tabla)
            swal({
                title: "Error",
                text: "No se puede eliminar el tipo de ítem porque está siendo utilizado en otra parte del sistema.",
                type: "error"
            });
        } else {
            swal({
                title: "Error",
                text: "Ocurrió un error inesperado.",
                type: "error"
            });
        }
        console.log(xhr.responseText);
    });
}