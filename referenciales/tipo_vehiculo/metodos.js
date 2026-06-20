var esc = function(s) { return (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };

listar();

function cambiarUso(uso) {
    if (uso === 'EMPRESA') {
        $("#col_tv_anio").show();
        $("#col_tv_color").show();
        var codigo = $("#txtCodigo").val();
        if (codigo && codigo !== '0') {
            $("#cardDetalle").show();
        }
    } else {
        $("#col_tv_anio").hide();
        $("#col_tv_color").hide();
        $("#tv_anio").val("");
        $("#tv_color").val("");
        $("#cardDetalle").hide();
        cancelarDetalle();
    }
}

function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect', title:'Tipos de Vehículo' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',  title:'Tipos de Vehículo' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',   title:'Tipos de Vehículo' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',  title:'Tipos de Vehículo' }
        ],
        iDisplayLength: 3,
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

function mostrarErrores(xhr) {
    var res = xhr.responseJSON;
    if (xhr.status === 422 && res && res.errors) {
        var msg = Object.values(res.errors).flat().join('\n');
        swal('Error de validación', msg, 'error');
    } else {
        swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
    }
}

function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#tv_uso").removeAttr("disabled");
    $("#tip_veh_nombre").removeAttr("disabled");
    $("#tip_veh_capacidad").removeAttr("disabled");
    $("#tip_veh_combustible").removeAttr("disabled");
    $("#tip_veh_categoria").removeAttr("disabled");
    $("#tip_veh_observacion").removeAttr("disabled");
    $("#tv_anio").removeAttr("disabled");
    $("#tv_color").removeAttr("disabled");
    $("#mar_nom").removeAttr("disabled");
    $("#modelo_nom").attr("disabled", "true");
    $("#modelo_año").attr("disabled", "true");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    cambiarUso($("#tv_uso").val());
    $(".form-line").attr("class", "form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tv_uso").removeAttr("disabled");
    $("#tip_veh_nombre").removeAttr("disabled");
    $("#tip_veh_capacidad").removeAttr("disabled");
    $("#tip_veh_combustible").removeAttr("disabled");
    $("#tip_veh_categoria").removeAttr("disabled");
    $("#tip_veh_observacion").removeAttr("disabled");
    $("#tv_anio").removeAttr("disabled");
    $("#tv_color").removeAttr("disabled");
    $("#mar_nom").removeAttr("disabled");
    $("#modelo_nom").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    cambiarUso($("#tv_uso").val());
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
        var estado = $("#tip_veh_estado").val();
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

function listar() {
    $.ajax({
        url: getUrl() + "tipo-vehiculo/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (var i = 0; i < resultado.length; i++) {
            var rs = resultado[i];
            var estado = rs.tip_veh_estado || 'activo';
            var badge  = estado.toLowerCase() === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';

            var uso = rs.tv_uso || 'SERVICIO';
            var usoBadge = uso === 'EMPRESA'
                ? '<span class="badge" style="background:#8e44ad;">Empresa</span>'
                : '<span class="badge" style="background:#2980b9;">Servicio</span>';

            lista += "<tr class='item-list' onclick=\"seleccionTipoVehiculo("
                + rs.tipo_vehiculo_id + ","
                + (rs.marca_id || 0) + ","
                + (rs.modelo_id || 0) + ",'"
                + esc(rs.tip_veh_nombre) + "','"
                + esc(rs.tip_veh_capacidad) + "','"
                + esc(rs.tip_veh_combustible) + "','"
                + esc(rs.tip_veh_categoria) + "','"
                + esc(rs.tip_veh_observacion) + "','"
                + esc(rs.tv_anio) + "','"
                + esc(rs.tv_color) + "','"
                + esc(rs.marca_nombre) + "','"
                + esc(rs.modelo_nombre) + "','"
                + esc(rs.modelo_año) + "','"
                + esc(estado) + "','"
                + esc(uso) + "');\">";

            lista += "<td>" + rs.tipo_vehiculo_id + "</td>";
            lista += "<td>" + usoBadge + "</td>";
            lista += "<td>" + (rs.tip_veh_nombre || '') + "</td>";
            lista += "<td>" + (rs.tip_veh_capacidad || '') + "</td>";
            lista += "<td>" + (rs.tip_veh_combustible || '') + "</td>";
            lista += "<td>" + (rs.tip_veh_categoria || '') + "</td>";
            lista += "<td>" + (rs.tip_veh_observacion || '') + "</td>";
            lista += "<td>" + (rs.tv_anio || '<span style="color:#aaa;">N/A</span>') + "</td>";
            lista += "<td>" + (rs.tv_color || '<span style="color:#aaa;">N/A</span>') + "</td>";
            lista += "<td>" + (rs.marca_nombre || '') + "</td>";
            lista += "<td>" + (rs.modelo_nombre || '') + (rs.modelo_año ? ' (' + rs.modelo_año + ')' : '') + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionTipoVehiculo(
    codigo, marca_id, modelo_id,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible,
    tip_veh_categoria, tip_veh_observacion,
    tv_anio, tv_color,
    marca_nombre, modelo_nombre, modelo_año, estado, tv_uso
) {
    $("#txtCodigo").val(codigo);
    $("#tv_uso").val(tv_uso || 'SERVICIO');
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#tip_veh_observacion").val(tip_veh_observacion);
    $("#tv_anio").val(tv_anio);
    $("#tv_color").val(tv_color);

    $("#mar_nom").val(marca_nombre);
    $("#marca_id").val(marca_id);
    $("#modelo_nom").val(modelo_nombre);
    $("#modelo_id").val(modelo_id);
    $("#modelo_año").val(modelo_año);

    $("#tip_veh_estado").val(estado || 'activo');
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

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", "true");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").addClass("focused");

    cambiarUso(tv_uso || 'SERVICIO');
    if ((tv_uso || 'SERVICIO') === 'EMPRESA') {
        listarDetalles(codigo);
    }
}

function grabar(){
    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }

    var nombre = $("#tip_veh_nombre").val().trim();
    var capacidad = $("#tip_veh_capacidad").val().trim();
    var marca = $("#mar_nom").val().trim();
    var modelo = $("#modelo_nom").val().trim();

    var combustible = $("#tip_veh_combustible").val().trim();
    var categoria   = $("#tip_veh_categoria").val().trim();
    var observacion = $("#tip_veh_observacion").val().trim();
    var color       = $("#tv_color").val().trim();
    var INVALIDOS   = /[*<>{}|]/;

    if (nombre === "") {
        swal('Error', 'El nombre del tipo de vehículo es obligatorio.', 'error');
        return;
    }
    if (INVALIDOS.test(nombre)) {
        swal('Caracteres no permitidos', 'El nombre no puede contener: * < > { } |', 'error');
        return;
    }
    if (marca === "") {
        swal('Error', 'Debe seleccionar una marca.', 'error');
        return;
    }
    if (modelo === "") {
        swal('Error', 'Debe seleccionar un modelo.', 'error');
        return;
    }
    if (capacidad !== "") {
        var cap = parseInt(capacidad);
        if (isNaN(cap) || cap < 1) {
            swal('Error', 'La capacidad debe ser un número entero mayor a cero.', 'error');
            return;
        }
    }
    if (INVALIDOS.test(combustible) || INVALIDOS.test(categoria) || INVALIDOS.test(observacion) || INVALIDOS.test(color)) {
        swal('Caracteres no permitidos', 'Los campos no pueden contener: * < > { } |', 'error');
        return;
    }

    var anio = $("#tv_anio").val().trim();
    if (anio !== "") {
        var anioNum = parseInt(anio);
        if (isNaN(anioNum) || anioNum < 1900 || anioNum > 2100) {
            swal('Error', 'El año debe ser un número entre 1900 y 2100.', 'error');
            return;
        }
    }

    var endpoint = "tipo-vehiculo/create";
    var metodo = "POST";
    if (op === 2) {
        endpoint = "tipo-vehiculo/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }

    var uso = $("#tv_uso").val();

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'tv_uso':              uso,
            'tip_veh_nombre':      $("#tip_veh_nombre").val(),
            'tip_veh_capacidad':   $("#tip_veh_capacidad").val(),
            'tip_veh_combustible': $("#tip_veh_combustible").val(),
            'tip_veh_categoria':   $("#tip_veh_categoria").val(),
            'tip_veh_observacion': $("#tip_veh_observacion").val(),
            'tv_anio':             uso === 'EMPRESA' ? (anio || null) : null,
            'tv_color':            uso === 'EMPRESA' ? $("#tv_color").val() : null,
            'marca_id':            $("#marca_id").val(),
            'modelo_id':           $("#modelo_id").val()
        }
    })
    .done(function(resultado){
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function(){
            if (resultado.tipo === "success") location.reload(true);
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'tipo-vehiculo/estado/' + id,
        method: 'PATCH',
        dataType: 'json'
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo },
            function() { if (res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function buscarMarcas() {
    var texto = $("#mar_nom").val();
    $.ajax({
        url: getUrl() + "marca/buscarPorTipo",
        method: "POST",
        data: { texto: texto, tipo: "VEHICULO" },
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron marcas</li>";
        } else {
            for (var i = 0; i < resultado.length; i++) {
                var rs = resultado[i];
                lista += "<li class='list-group-item' onclick=\"seleccionMarca(" + rs.id + ",'" + esc(rs.mar_nom) + "');\">" + (rs.mar_nom || '') + "</li>";
            }
        }
        lista += "</ul>";
        $("#listaMarcas").html(lista).show().css({ position: "absolute", zIndex: 2000 });
    });
}

function seleccionMarca(id, mar_nom) {
    $("#marca_id").val(id);
    $("#mar_nom").val(mar_nom);
    $("#modelo_nom").prop("disabled", false);
    $("#modelo_id").val("");
    $("#modelo_nom").val("");
    $("#modelo_año").val("");
    $("#listaModelos").html("").hide();
    $("#listaMarcas").html("").hide();
}

function buscarModelo() {
    var texto = $("#modelo_nom").val();
    var marcaId = $("#marca_id").val();
    if (!marcaId) { $("#listaModelos").hide(); return; }

    $.ajax({
        url: getUrl() + "modelo/buscarPorMarca",
        method: "POST",
        data: { texto: texto, marca_id: marcaId },
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron modelos</li>";
        } else {
            for (var i = 0; i < resultado.length; i++) {
                var rs = resultado[i];
                lista += "<li class='list-group-item' onclick=\"seleccionModelos(" + rs.id + ",'" + esc(rs.modelo_nom) + "','" + esc(rs.modelo_año) + "');\">" + (rs.modelo_nom || '') + " (" + (rs.modelo_año || '') + ")</li>";
            }
        }
        lista += "</ul>";
        $("#listaModelos").html(lista).show().css({ position: "absolute", zIndex: 2000 });
    });
}

function seleccionModelos(id, modelo_nom, modelo_año) {
    $("#modelo_id").val(id);
    $("#modelo_nom").val(modelo_nom);
    $("#modelo_año").val(modelo_año);
    if (modelo_año && $("#tv_uso").val() === 'EMPRESA') {
        $("#tv_anio").val(modelo_año);
    }
    $("#listaModelos").html("").hide();
}

/* ==================== DETALLE ==================== */

function listarDetalles(tipo_vehiculo_id) {
    $.ajax({
        url: getUrl() + "tipo-vehiculo-det/read/" + tipo_vehiculo_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (var i = 0; i < resultado.length; i++) {
            var rs = resultado[i];
            lista += "<tr>"
                + "<td>" + rs.id + "</td>"
                + "<td>" + (rs.tv_det_placa || '') + "</td>"
                + "<td>" + (rs.tv_det_num_chasis || '') + "</td>"
                + "<td>" + (rs.tv_det_num_motor || '') + "</td>"
                + "<td>"
                + "<button class='btn btn-xs btn-primary waves-effect' onclick=\"seleccionTipoVehiculoDet("
                + rs.id + ",'"
                + esc(rs.tv_det_placa) + "','"
                + esc(rs.tv_det_num_chasis) + "','"
                + esc(rs.tv_det_num_motor) + "');\"><i class='material-icons' style='font-size:16px;'>edit</i></button> "
                + "<button class='btn btn-xs btn-danger waves-effect' onclick=\"eliminarDetalle(" + rs.id + ");\"><i class='material-icons' style='font-size:16px;'>delete</i></button>"
                + "</td>"
                + "</tr>";
        }
        if (lista === "") {
            lista = "<tr><td colspan='5' class='text-center'>Sin vehículos registrados</td></tr>";
        }
        $("#tableBodyDet").html(lista);
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function agregarDetalle() {
    cancelarDetalle();
    $("#txtDetOperacion").val(1);
    $("#txtDetId").val(0);
    $("#formDetalle").show();
    $("#btnAgregarDetalle").hide();
}

function cancelarDetalle() {
    $("#txtDetOperacion").val(0);
    $("#txtDetId").val(0);
    $("#tv_det_placa").val("");
    $("#tv_det_num_chasis").val("");
    $("#tv_det_num_motor").val("");
    $("#formDetalle").hide();
    $("#btnAgregarDetalle").show();
}

function seleccionTipoVehiculoDet(id, placa, num_chasis, num_motor) {
    $("#txtDetOperacion").val(2);
    $("#txtDetId").val(id);
    $("#tv_det_placa").val(placa);
    $("#tv_det_num_chasis").val(num_chasis);
    $("#tv_det_num_motor").val(num_motor);
    $("#formDetalle").show();
    $("#btnAgregarDetalle").hide();
}

function grabarDetalle() {
    var op = parseInt($("#txtDetOperacion").val());
    var tipo_vehiculo_id = $("#txtCodigo").val();

    var placa  = $("#tv_det_placa").val().trim();
    var chasis = $("#tv_det_num_chasis").val().trim();
    var motor  = $("#tv_det_num_motor").val().trim();

    if (!placa && !chasis && !motor) {
        swal('Error', 'Debe ingresar al menos un dato del vehículo (placa, chasis o motor).', 'error');
        return;
    }
    var INVALIDOS = /[*<>{}|]/;
    if (INVALIDOS.test(placa) || INVALIDOS.test(chasis) || INVALIDOS.test(motor)) {
        swal('Caracteres no permitidos', 'Los campos no pueden contener: * < > { } |', 'error');
        return;
    }

    var endpoint = getUrl() + "tipo-vehiculo-det/create";
    var metodo = "POST";
    if (op === 2) {
        endpoint = getUrl() + "tipo-vehiculo-det/update/" + $("#txtDetId").val();
        metodo = "PUT";
    }

    $.ajax({
        url: endpoint,
        method: metodo,
        dataType: "json",
        data: {
            tipo_vehiculo_id:  tipo_vehiculo_id,
            tv_det_placa:      $("#tv_det_placa").val(),
            tv_det_num_chasis: $("#tv_det_num_chasis").val(),
            tv_det_num_motor:  $("#tv_det_num_motor").val()
        }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === "success") {
                cancelarDetalle();
                listarDetalles(tipo_vehiculo_id);
            }
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function eliminarDetalle(id) {
    var tipo_vehiculo_id = $("#txtCodigo").val();
    swal({
        title: "ELIMINAR",
        text: "¿Desea eliminar este vehículo del registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c0392b",
        confirmButtonText: "SI, ELIMINAR",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + "tipo-vehiculo-det/delete/" + id,
            method: "DELETE",
            dataType: "json"
        })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") {
                    listarDetalles(tipo_vehiculo_id);
                }
            });
        })
        .fail(function(xhr) {
            mostrarErrores(xhr);
        });
    });
}

