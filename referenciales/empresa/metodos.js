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
                title:'Listado de Empresa'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Empresa'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Empresa'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Empresa'
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
    $("#emp_razon_social").removeAttr("disabled");
    $("#emp_telefono").removeAttr("disabled");
    $("#emp_direccion").removeAttr("disabled");
    $("#emp_correo").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#emp_razon_social").removeAttr("disabled");
    $("#emp_telefono").removeAttr("disabled");
    $("#emp_direccion").removeAttr("disabled");
    $("#emp_correo").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionEmpresa(" + rs.id + ",'" + rs.emp_razon_social + "','" + rs.emp_telefono + "','" + rs.emp_direccion + "','" + rs.emp_correo + "');\">";
                lista = lista + "<td>" + rs.id + "</td>";
                lista = lista + "<td>" + rs.emp_razon_social + "</td>";
                lista = lista + "<td>" + rs.emp_telefono + "</td>";
                lista = lista + "<td>" + rs.emp_direccion + "</td>";
                lista = lista + "<td>" + rs.emp_correo + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_telefono, emp_direccion, emp_correo) {
    // Asignar los valores a los campos correspondientes
    $("#id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_telefono").val(emp_telefono);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_correo").val(emp_correo);


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "empresa/create";
    var metodo = "POST";
    if($("#txtOperacion").val() == 2){
        endpoint = "empresa/update/" + $("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val() == 3){
        endpoint = "empresa/delete/" + $("#id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'emp_razon_social': $("#emp_razon_social").val(),
            'emp_telefono': $("#emp_telefono").val(),
            'emp_direccion': $("#emp_direccion").val(),
            'emp_correo': $("#emp_correo").val()
        }
    })
    .done(function(resultado){
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){
            if(resultado.tipo == "success"){
                location.reload(true);
            }
        });
    })
    .fail(function(xhr, status, error){
        var respuesta = xhr.responseJSON;

        // Verificar si es un error de validación o duplicado
        if (xhr.status === 400) {
            swal({
                title: "Error",
                text: respuesta.mensaje,  // Mostrar el mensaje específico del error
                type: "error"
            });
        } else if (xhr.status === 422) {
            // Errores de validación
            let errores = "";
            $.each(respuesta.errors, function(key, value){
                errores += value + "\n";
            });
            swal({
                title: "Error de validación",
                text: "Ningun campo debe estar vacio",
                type: "error"
            });
        } else {
            swal({
                title: "Error",
                text: "El RUC ya existe",
                type: "error"
            });
        }
        console.log(xhr.responseText);
    });
}
