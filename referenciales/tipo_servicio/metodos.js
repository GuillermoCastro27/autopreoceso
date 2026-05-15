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
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#tip_serv_precio").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#tip_serv_precio").removeAttr("disabled");

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
        url:getUrl() + "tipo-servicio/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){

            // 🟢 Formatear precio con puntos
            const precio = rs.tip_serv_precio 
                ? parseInt(rs.tip_serv_precio).toLocaleString('es-ES') 
                : "0";

            lista += "<tr class=\"item-list\" onclick=\"seleccionTipoServicio("
                + rs.tipo_servicio_id + ",'"
                + rs.tipo_serv_nombre + "','"
                + precio + "');\">";

            lista += "<td>" + rs.tipo_servicio_id + "</td>";
            lista += "<td>" + rs.tipo_serv_nombre + "</td>";

            // 🟢 Mostrar precio formateado
            lista += "<td>" + precio + "</td>";

            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoServicio(codigo, tipo_serv_nombre,tip_serv_precio){
    $("#txtCodigo").val(codigo);
    $("#tipo_serv_nombre").val(tipo_serv_nombre);
    $("#tip_serv_precio").val(tip_serv_precio);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var descripcion = $("#tipo_serv_nombre").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "Ningún campo debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var endpoint = "tipo-servicio/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "tipo-servicio/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "tipo-servicio/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl() + ""+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipo_serv_nombre': $("#tipo_serv_nombre").val(), 
            tip_serv_precio: $("#tip_serv_precio").val().replace(/\./g, "")
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
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) {
                $.each(res.errors, function(k, v){ msg += v[0] + '\n'; });
            } else {
                msg = 'Ningún campo debe estar vacío.';
            }
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 500 && xhr.responseText.indexOf('SQLSTATE[23') !== -1) {
            swal('Error', 'Este registro está en uso y no puede ser eliminado.', 'error');
        } else {
            swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
    });
}