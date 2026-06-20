var listaSucursales = [];

function cargarSucursales() {
    $.ajax({
        url: getUrl() + 'sucursal/read',
        method: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        listaSucursales = data;
        var opts = '<option value="" disabled selected>Seleccione sucursal...</option>';
        data.forEach(function(s) {
            opts += '<option value="' + s.id + '">' + s.suc_razon_social + '</option>';
        });
        $('#sucursal_id').html(opts);
        listar();
    });
}

function getNombreSucursal(id) {
    var s = listaSucursales.find(function(x) { return x.id == id; });
    return s ? s.suc_razon_social : '-';
}

cargarSucursales();

function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',    text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Listado de Depósitos' },
            { extend: 'excel',   text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Listado de Depósitos' },
            { extend: 'pdf',     text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Listado de Depósitos' },
            { extend: 'print',   text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Listado de Depósitos' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar() {
    location.reload(true);
}

function agregar() {
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#dep_nombre").removeAttr("disabled");
    $("#sucursal_id").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function editar() {
    $("#txtOperacion").val(2);
    $("#dep_nombre").removeAttr("disabled");
    $("#sucursal_id").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function confirmarCambioEstado() {
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if (oper === 2) {
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if (oper === 4) {
        var estado = $("#dep_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
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
    }, function() {
        grabar();
    });
}

function listar() {
    $.ajax({
        url: getUrl() + 'deposito/read',
        method: 'GET',
        dataType: 'json'
    })
    .done(function(resultado) {
        var lista = "";
        for (var rs of resultado) {
            var estado = rs.dep_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista += "<tr class=\"item-list\" onclick=\"seleccionDeposito(" + rs.id + ",'" + rs.dep_nombre + "'," + (rs.sucursal_id || 0) + ",'" + estado + "');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.dep_nombre + "</td>";
            lista += "<td>" + getNombreSucursal(rs.sucursal_id) + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a, b, c) {
        alert(c);
    });
}

function seleccionDeposito(codigo, dep_nombre, sucursal_id, estado) {
    $("#txtCodigo").val(codigo);
    $("#dep_nombre").val(dep_nombre);
    $("#sucursal_id").val(sucursal_id);
    $("#dep_estado").val(estado || 'activo');

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

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", "true");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function grabar() {
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) { cambiarEstado(); return; }

    var dep_nombre = $("#dep_nombre").val().trim();

    if (dep_nombre === "") {
        swal({ title: "Error", text: "El nombre del depósito no debe estar vacío.", type: "error" });
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(dep_nombre)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }

    var endpoint = "deposito/create";
    var metodo = "POST";
    if (op == 2) {
        endpoint = "deposito/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }
    // op===3 removed — use cambiarEstado() for state toggle

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id': $("#txtCodigo").val(),
            'dep_nombre': dep_nombre,
            'sucursal_id': $("#sucursal_id").val()
        }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo == "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(xhr) {
        var respuesta = xhr.responseJSON;
        if (xhr.status === 400) {
            swal({ title: "Error", text: respuesta.mensaje, type: "error" });
        } else if (xhr.status === 422) {
            var errores = "";
            $.each(respuesta.errors, function(key, value) { errores += value + "\n"; });
            swal({ title: "Error de validación", text: errores, type: "error" });
        } else if (xhr.status === 500 && xhr.responseText.includes("SQLSTATE[23503]")) {
            swal({ title: "Error", text: "No se puede eliminar el depósito porque está siendo utilizado en otra parte del sistema.", type: "error" });
        } else {
            swal({ title: "Error", text: "Ocurrió un error inesperado.", type: "error" });
        }
        console.log(xhr.responseText);
    });
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'deposito/estado/' + id,
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

