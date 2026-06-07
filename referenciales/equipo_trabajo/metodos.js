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
                title:'Listado de Equipos de Trabajo'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Equipos de Trabajo'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Equipos de Trabajo'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Equipos de Trabajo'
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
    $("#btnEstado").attr("disabled","true");

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
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function confirmarCambioEstado(){
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
        var estado = $("#equipo_estado").val();
        titulo   = (estado || 'activo') === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = (estado || 'activo') === 'activo'
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

function listar() {
    $.ajax({
        url:getUrl() + "equipo_trabajo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = rs.equipo_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista += "<tr class=\"item-list\" onclick=\"seleccionEquipoTrabajo("
                + rs.equipo_trabajo_id + ",'"
                + rs.equipo_nombre + "','"
                + rs.equipo_descripcion + "','"
                + rs.equipo_categoria + "','"
                + estado + "');\">";

            lista += "<td>" + rs.equipo_trabajo_id + "</td>";
            lista += "<td>" + rs.equipo_nombre + "</td>";
            lista += "<td>" + rs.equipo_descripcion + "</td>";
            lista += "<td>" + rs.equipo_categoria + "</td>";
            lista += "<td>" + badge + "</td>";

            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionEquipoTrabajo(codigo, equipo_nombre,equipo_descripcion,equipo_categoria, estado){
    $("#txtCodigo").val(codigo);
    $("#equipo_nombre").val(equipo_nombre);
    $("#equipo_descripcion").val(equipo_descripcion);
    $("#equipo_categoria").val(equipo_categoria);

    $("#equipo_estado").val(estado || 'activo');
    var activo = (estado || 'activo') === 'activo';
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

function grabar(){
    var nombre = $("#equipo_nombre").val().trim();
    var descripcion = $("#equipo_descripcion").val().trim();
    var categoria = $("#equipo_categoria").val().trim();

    // Validar que el campo descripción no esté vacío
    if (nombre === "") {
        swal('Error', 'El nombre del equipo es obligatorio.', 'error');
        return;
    }
    if (descripcion === "") {
        swal('Error', 'La descripción es obligatoria.', 'error');
        return;
    }
    if (categoria === "") {
        swal('Error', 'La categoría es obligatoria.', 'error');
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(nombre)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }
    if (CHARS_INVALIDOS.test(descripcion)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }
    if (CHARS_INVALIDOS.test(categoria)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }

    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }

    var endpoint = "equipo_trabajo/create";
    var metodo = "POST";
    if(op === 2){
        endpoint = "equipo_trabajo/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + ""+endpoint,
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

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'equipo_trabajo/estado/' + id,
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