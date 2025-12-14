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
    $("#equipo_nombre").removeAttr("disabled");
    $("#equipo_descripcion").removeAttr("disabled");
    $("#equipo_categoria").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#equipo_nombre").removeAttr("disabled");
    $("#equipo_descripcion").removeAttr("disabled");
    $("#equipo_categoria").removeAttr("disabled");

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
function formatearPrecio(input) {
    // Eliminar puntos para poder trabajar el número real
    let valor = input.value.replace(/\./g, "");

    // Si no es número, salir
    if (isNaN(valor)) {
        input.value = "";
        return;
    }

    // Convertir a número entero
    let numero = parseInt(valor, 10);

    // Formatear con puntos (estilo paraguayo)
    input.value = numero.toLocaleString('es-ES'); 
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

function listar() {
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/equipo_trabajo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista += "<tr class=\"item-list\" onclick=\"seleccionTipoServicio("
                + rs.equipo_trabajo_id + ",'"
                + rs.equipo_nombre + "','"
                + rs.equipo_descripcion + "','"
                + rs.equipo_categoria + "');\">";

            lista += "<td>" + rs.equipo_trabajo_id + "</td>";
            lista += "<td>" + rs.equipo_nombre + "</td>";

            // 🟢 Mostrar precio formateado
            lista += "<td>" + rs.equipo_descripcion + "</td>";
            lista += "<td>" + rs.equipo_categoria + "</td>";

            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoServicio(codigo, equipo_nombre,equipo_descripcion,equipo_categoria){
    $("#txtCodigo").val(codigo);
    $("#equipo_nombre").val(equipo_nombre);
    $("#equipo_descripcion").val(equipo_descripcion);
    $("#equipo_categoria").val(equipo_categoria);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var nombre = $("#equipo_nombre").val().trim();
    var descripcion = $("#equipo_descripcion").val().trim();
    var categoria = $("#equipo_categoria").val().trim();

    // Validar que el campo descripción no esté vacío
    if (nombre === "") {
        swal({
            title: "Error",
            text: "Ningún campo debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "Ningún campo debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (categoria === "") {
        swal({
            title: "Error",
            text: "Ningún campo debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var endpoint = "equipo_trabajo/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "equipo_trabajo/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "equipo_trabajo/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'equipo_nombre': $("#equipo_nombre").val(),  
            'equipo_descripcion': $("#equipo_descripcion").val(),  
            'equipo_categoria': $("#equipo_categoria").val()
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
                text: "Ningún campo debe estar vacío.",
                type: "error"
            });
        }
    });
}