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
                title:'Listado de Motivo ajuste'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Motivo ajuste'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Motivo ajuste'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Motivo ajuste'
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
    $("#descripcion").removeAttr("disabled");
    $("#tipo_ajuste").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#descripcion").removeAttr("disabled");
    $("#tipo_ajuste").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function confirmarCambioEstado() {
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");
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
    if(oper===4){
        var estado = $("#motivo_estado").val();
        var activo = (estado || 'activo').toLowerCase() === 'activo';
        titulo   = activo ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = activo
            ? '¿Desea desactivar este registro? No aparecerá en búsquedas.'
            : '¿Desea activar este registro nuevamente?';
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
        url:getUrl() + "motivo_ajuste/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = rs.estado || 'activo';
            var badge  = (estado).toLowerCase() === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionMotivoAjuste("+rs.id+",'"+rs.descripcion+"','"+rs.tipo_ajuste+"','"+estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.descripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_ajuste;
                lista = lista +"</td>";
                lista = lista + "<td>" + badge + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionMotivoAjuste(codigo, descripcion, tipo_ajuste, estado){
    $("#txtCodigo").val(codigo);
    $("#descripcion").val(descripcion);
    $("#tipo_ajuste").val(tipo_ajuste);

    $("#motivo_estado").val(estado || 'activo');
    var activo = (estado || 'activo').toLowerCase() === 'activo';
    if (activo) {
        $("#btnEstado").removeClass("btn-success").addClass("btn-danger");
        $("#lblEstado").text("Desactivar");
        $("#btnEstado").find("i").text("block");
    } else {
        $("#btnEstado").removeClass("btn-danger").addClass("btn-success");
        $("#lblEstado").text("Activar");
        $("#btnEstado").find("i").text("check_circle");
    }
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar() {
    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }
    var descripcion = $("#descripcion").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(descripcion)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }

    var endpoint = "motivo_ajuste/create";
    var metodo = "POST";
    if ($("#txtOperacion").val() == 2) {
        endpoint = "motivo_ajuste/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) {
        endpoint = "motivo_ajuste/delete/" + $("#txtCodigo").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + "" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'descripcion': descripcion,
            'tipo_ajuste': $("#tipo_ajuste").val()
            
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
            // Error de llave foránea (marca en uso en otra tabla)
            swal({
                title: "Error",
                text: "No se puede eliminar la marca porque está siendo utilizada en otra parte del sistema.",
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

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'motivo_ajuste/estado/' + id,
        method: 'PATCH',
        dataType: 'json'
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo },
            function() { if (res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
    });
}