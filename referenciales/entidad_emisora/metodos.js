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
                title:'Entidades Emisoras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Entidades Emisoras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Entidades Emisoras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Entidades Emisoras'
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
    $("#ent_emis_nombre").removeAttr("disabled");
    $("#ent_emis_direccion").removeAttr("disabled");
    $("#ent_emis_telefono").removeAttr("disabled");
    $("#ent_emis_email").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#ent_emis_nombre").removeAttr("disabled");
    $("#ent_emis_direccion").removeAttr("disabled");
    $("#ent_emis_telefono").removeAttr("disabled");
    $("#ent_emis_email").removeAttr("disabled");

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
        var estado = $("#ent_emis_estado").val();
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

function listar() {
    $.ajax({
        url: getUrl() + "entidad_emisora/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {
            var estado = rs.ent_emis_estado || 'activo';
            var badge  = (estado).toLowerCase() === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';

            lista += `<tr class="item-list"
                        onclick="seleccionEntidadEmisora(
                            ${rs.entidad_emisora_id},
                            '${rs.ent_emis_nombre}',
                            '${rs.ent_emis_direccion || ""}',
                            '${rs.ent_emis_telefono || ""}',
                            '${rs.ent_emis_email || ""}',
                            '${estado}'
                        )">`;

            lista += `<td>${rs.entidad_emisora_id}</td>`;
            lista += `<td>${rs.ent_emis_nombre}</td>`;
            lista += `<td>${rs.ent_emis_direccion || ""}</td>`;
            lista += `<td>${rs.ent_emis_telefono || ""}</td>`;
            lista += `<td>${rs.ent_emis_email || ""}</td>`;
            lista += `<td>${badge}</td>`;

            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        swal('Error', 'No se pudo cargar la lista.', 'error');
    });
}
function seleccionEntidadEmisora(
    id,
    nombre,
    direccion,
    telefono,
    email,
    estado
) {
    $("#txtCodigo").val(id);
    $("#ent_emis_nombre").val(nombre);
    $("#ent_emis_direccion").val(direccion);
    $("#ent_emis_telefono").val(telefono);
    $("#ent_emis_email").val(email);
    $("#ent_emis_estado").val(estado);

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

    $(".form-line").attr("class", "form-line focused");
}


function grabar() {
    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }

    // 🔹 Captura de campos
    var nombre    = $("#ent_emis_nombre").val().trim();
    var direccion = $("#ent_emis_direccion").val().trim();
    var telefono  = $("#ent_emis_telefono").val().trim();
    var email     = $("#ent_emis_email").val().trim();
    var estado    = $("#ent_emis_estado").val();

    // 🔹 Validación mínima
    if (nombre === "" || estado === "") {
        swal({
            title: "Error",
            text: "El nombre y el estado son obligatorios.",
            type: "error"
        });
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(nombre)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }

    // 🔹 Configuración por defecto
    var endpoint = "entidad_emisora/create";
    var metodo   = "POST";

    // ✏️ Editar
    if ($("#txtOperacion").val() == 2) {
        endpoint = "entidad_emisora/update/" + $("#txtCodigo").val();
        metodo   = "PUT";
    }

    // 🗑️ Anular
    if ($("#txtOperacion").val() == 3) {
        endpoint = "entidad_emisora/delete/" + $("#txtCodigo").val();
        metodo   = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            ent_emis_nombre: nombre,
            ent_emis_direccion: direccion,
            ent_emis_telefono: telefono,
            ent_emis_email: email,
            ent_emis_estado: estado
        }
    })
    .done(function (resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {
            if (resultado.tipo === "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) {
                $.each(res.errors, function(k, v){ msg += (Array.isArray(v) ? v[0] : v) + '\n'; });
            } else {
                msg = res && res.message ? res.message : 'Verifique los campos ingresados.';
            }
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 409) {
            swal('No se puede eliminar', res && res.mensaje ? res.mensaje : 'El registro está siendo utilizado en otra parte del sistema.', 'error');
        } else if (xhr.status === 404) {
            swal('No encontrado', 'El registro seleccionado no existe.', 'error');
        } else {
            swal('Error', res && res.mensaje ? res.mensaje : 'Ocurrió un error inesperado. Intente nuevamente.', 'error');
        }
    });
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'entidad_emisora/estado/' + id,
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
