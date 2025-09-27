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
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipo de impuestos'
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
    $("#tipo_diag_nombre").removeAttr("disabled");
    $("#tipo_diag_descrip").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tipo_diag_nombre").removeAttr("disabled");
    $("#tipo_diag_descrip").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-diagnostico/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoServicio("+rs.id+",'"+rs.tipo_diag_nombre+"','"+rs.tipo_diag_descrip+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_diag_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_diag_descrip;
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
function seleccionTipoServicio(codigo, tipo_diag_nombre,tipo_diag_descrip){
    $("#txtCodigo").val(codigo);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    $("#tipo_diag_descrip").val(tipo_diag_descrip);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var nombre = $("#tipo_diag_nombre").val().trim();
    var descripción = $("#tipo_diag_descrip").val().trim();

    // Validar que el campo descripción no esté vacío
    if (nombre === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (descripción === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var endpoint = "tipo-diagnostico/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "tipo-diagnostico/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "tipo-diagnostico/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipo_diag_nombre': $("#tipo_diag_nombre").val(), 
            'tipo_diag_descrip': $("#tipo_diag_descrip").val()
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
                location.reload(true);
            }
        });
    })
    .fail(function(a) {
        // Manejar el error de respuesta personalizada del servidor
        try {
            var response = JSON.parse(a.responseText);  // Intentamos obtener la respuesta JSON
            if (response.mensaje.includes("ya existe")) {
                // Mostrar mensaje específico para el error de duplicado
                swal({
                    title: "Error",
                    text: "Error: El registro ya existe",
                    type: "error"
                });
            } else {
                // Mostrar cualquier otro error personalizado
                swal({
                    title: "Error",
                    text: response.mensaje,
                    type: "error"
                });
            }
        } catch (e) {
            // Si no es JSON, mostrar el error genérico
            swal({
                title: "Error",
                text: "El registro ya existe",
                type: "error"
            });
        }
    });
}