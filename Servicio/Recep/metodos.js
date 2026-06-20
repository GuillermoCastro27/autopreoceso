cargarFuncionarioIdLogueado();
listar();
campoFecha();
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
                title:'Listado de Recepciones de Vehículos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Recepciones de Vehículos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Recepciones de Vehículos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Recepciones de Vehículos'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del START al END de un total de TOTAL registros',
            sInfoFiltered: '(filtrado de entre MAX registros)',
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

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';
    if (res && res.errors) {
        $.each(res.errors, function(k, v) { msg += '• ' + (Array.isArray(v) ? v[0] : v) + '\n'; });
    } else if (res && res.mensaje) {
        msg = res.mensaje;
    } else {
        msg = 'Ocurrió un error inesperado.';
    }
    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#recep_cab_fecha").removeAttr("disabled");
    $("#recep_cab_fecha_estimada").attr("disabled","true");
    $("#solicitud").removeAttr("disabled");
    $("#recep_cab_observaciones").removeAttr("disabled");
    $("#recep_cab_prioridad").attr("disabled","true");
    $("#recep_cab_kilometraje").removeAttr("disabled");
    $("#recep_cab_nivel_combustible").removeAttr("disabled");
    $("#recep_cab_num_chasis").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#tip_veh_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#mar_nom").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnSalida").attr("disabled","true");
    $("#btnTicket").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);

    $("#recep_cab_fecha").removeAttr("disabled");
    $("#recep_cab_fecha_estimada").attr("disabled","true");
    $("#solicitud").removeAttr("disabled");
    $("#recep_cab_observaciones").removeAttr("disabled");
    $("#recep_cab_prioridad").attr("disabled","true");
    $("#recep_cab_kilometraje").removeAttr("disabled");
    $("#recep_cab_nivel_combustible").removeAttr("disabled");
    $("#recep_cab_num_chasis").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#tip_veh_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#mar_nom").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnSalida").attr("disabled","true");
    $("#btnTicket").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

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
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIRMAR";
        pregunta="¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
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
        url: getUrl() + "recepcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {

        var esc = function(s) { return (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };

        var lista = "";

        for (var i = 0; i < resultado.length; i++) {
            var rs = resultado[i];
            var tieneSalida = !!rs.recep_cab_fecha_salida;
            var badgeSalida = tieneSalida
                ? "<span class='label label-success'>RETIRADO<br><small>" + rs.recep_cab_fecha_salida + "</small></span>"
                : "<span class='label label-warning'>EN TALLER</span>";

            lista += "<tr class='item-list' onclick=\"seleccionRecepcion("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.clientes_id + ","
                + rs.tipo_servicio_id + ","
                + rs.tipo_vehiculo_id + ",'"
                + esc(rs.emp_razon_social) + "','"
                + esc(rs.suc_razon_social) + "','"
                + esc(rs.encargado) + "','"
                + esc(rs.solicitudes) + "','"
                + esc(rs.recep_cab_fecha) + "','"
                + esc(rs.recep_cab_fecha_estimada) + "','"
                + esc(rs.recep_cab_estado) + "','"
                + esc(rs.recep_cab_observaciones) + "','"
                + esc(rs.recep_cab_prioridad) + "','"
                + esc(rs.recep_cab_kilometraje) + "','"
                + esc(rs.recep_cab_nivel_combustible) + "','"
                + esc(rs.recep_cab_num_chasis) + "','"
                + esc(rs.recep_cab_fecha_salida) + "','"
                + esc(rs.tipo_servicio) + "','"
                + esc(rs.cli_nombre) + "','"
                + esc(rs.cli_apellido) + "','"
                + esc(rs.cli_ruc) + "','"
                + esc(rs.cli_telefono) + "','"
                + esc(rs.cli_direccion) + "','"
                + esc(rs.cli_correo) + "',"
                + (rs.solicitudes_cab_id || 0) + ",'"
                + esc(rs.tip_veh_nombre) + "','"
                + esc(rs.tip_veh_capacidad) + "','"
                + esc(rs.tip_veh_combustible) + "','"
                + esc(rs.tip_veh_categoria) + "','"
                + esc(rs.tip_veh_observacion) + "','"
                + esc(rs.mar_nom) + "','"
                + esc(rs.modelo_nom) + "','"
                + esc(rs.modelo_año) + "'"
                + ");\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.cli_nombre + ' ' + rs.cli_apellido) + "</td>";
            lista += "<td>" + (rs.vehiculo_info || '') + "</td>";
            lista += "<td>" + (rs.recep_cab_num_chasis || '<span style=\"color:#aaa\">-</span>') + "</td>";
            lista += "<td>" + (rs.solicitudes || '') + "</td>";
            lista += "<td>" + (rs.recep_cab_fecha || '') + "</td>";
            lista += "<td>" + (rs.recep_cab_estado || '') + "</td>";
            lista += "<td>" + badgeSalida + "</td>";
            lista += "<td>" + (rs.encargado || '-') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionRecepcion(
    id_recepcion, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    tipo_vehiculo_id, emp_razon_social, suc_razon_social, encargado, solicitudes,
    recep_cab_fecha, recep_cab_fecha_estimada, recep_cab_estado,
    recep_cab_observaciones, recep_cab_prioridad, recep_cab_kilometraje,
    recep_cab_nivel_combustible, recep_cab_num_chasis, recep_cab_fecha_salida,
    tipo_servicio, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo, solicitudes_cab_id,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible, tip_veh_categoria, tip_veh_observacion,
    mar_nom, modelo_nom, modelo_año
) {

    // IDs
    $("#id").val(id_recepcion);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#solicitudes_cab_id").val(solicitudes_cab_id);

    // Cabecera
    $("#solicitud").val(solicitudes);
    $("#recep_cab_fecha").val(recep_cab_fecha);
    $("#recep_cab_fecha_estimada").val(recep_cab_fecha_estimada);
    $("#recep_cab_observaciones").val(recep_cab_observaciones);
    $("#recep_cab_prioridad").val(recep_cab_prioridad);
    $("#recep_cab_kilometraje").val(recep_cab_kilometraje);
    $("#recep_cab_nivel_combustible").val(recep_cab_nivel_combustible);
    $("#recep_cab_num_chasis").val(recep_cab_num_chasis);
    $("#recep_cab_estado").val(recep_cab_estado);

    // Cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // Empresa / Sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // Servicio
    $("#tipo_serv_nombre").val(tipo_servicio);

    // Vehículo
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#tip_veh_observacion").val(tip_veh_observacion);
    $("#mar_nom").val(mar_nom);
    $("#modelo_nom").val(modelo_nom);
    $("#modelo_año").val(modelo_año);

    // Mostrar pantalla
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar, #btnSalida, #btnTicket").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");
    $("#btnTicket").removeAttr("disabled");

    if (recep_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").removeAttr("disabled");
        $("#formDetalles").show();
    }

    if (!recep_cab_fecha_salida) {
        $("#btnSalida").removeAttr("disabled");
    }

    $(".form-line").addClass("focused");
}
function buscarSolicitud() {
    $.ajax({
        url: getUrl() + "solicitudcad/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "funcionario_id": $("#funcionario_id").val(),
            "name": $("#solicitud").val()
        }
    })
    .done(function(resultado) {
        // Si no hay resultados
        if (!resultado || resultado.length === 0) {
            $("#listaSolicitud").html("<li class='list-group-item text-center text-muted'>No se encontraron solicitudes</li>");
            $("#listaSolicitud").attr("style", "display:block; position:absolute; z-index:2000;");
            return;
        }

        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionSolicitud("
                + rs.solicitudes_cab_id + ","                              // 1 id solicitud
                + rs.empresa_id + ","                                       // 2 empresa
                + rs.sucursal_id + ", '"                                    // 3 sucursal
                + (rs.solicitud || '') + "', "                              // 4 texto solicitud
                + rs.clientes_id + ", '"                                    // 5 cliente id
                + (rs.cli_nombre || '') + "', '"                            // 6 nombre
                + (rs.cli_apellido || '') + "', "                           // 7 apellido
                + rs.tipo_servicio_id + ", '"                               // 8 tipo servicio id
                + (rs.cli_ruc || '') + "', '"                               // 9 ruc
                + (rs.cli_direccion || '') + "', '"                         // 10 direccion
                + (rs.cli_telefono || '') + "', '"                          // 11 telefono
                + (rs.cli_correo || '') + "', '"                            // 12 correo
                + (rs.suc_razon_social || '') + "', '"                      // 13 sucursal razon social
                + (rs.emp_razon_social || '') + "', '"                      // 14 empresa razon social
                + (rs.tipo_servicio || '') + "', '"                         // 15 tipo servicio nombre
                + (rs.soli_cab_fecha_estimada || '') + "', '"               // 16 fecha estimada
                + (rs.soli_cab_prioridad || '') + "')\">"                   // 17 prioridad
                + (rs.solicitud || 'Sin descripción') + "</li>";
        }
        lista += "</ul>";

        $("#listaSolicitud").html(lista);
        $("#listaSolicitud").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionSolicitud(
    solicitudes_cab_id, empresa_id, sucursal_id,
    solicitud, clientes_id, cli_nombre, cli_apellido, tipo_servicio_id,
    cli_ruc, cli_direccion, cli_telefono, cli_correo,
    suc_razon_social, emp_razon_social, tipo_servicio,
    soli_cab_fecha_estimada, soli_cab_prioridad
) {
    // Asignar datos principales
    $("#solicitudes_cab_id").val(solicitudes_cab_id || 0);
    $("#solicitud").val(solicitud || '');
    $("#recep_cab_fecha_estimada").val(soli_cab_fecha_estimada || '');
    $("#recep_cab_prioridad").val(soli_cab_prioridad || '');

    // Cliente
    $("#clientes_id").val(clientes_id || 0);
    $("#cli_nombre").val(cli_nombre || '');
    $("#cli_apellido").val(cli_apellido || '');
    $("#cli_ruc").val(cli_ruc || '');
    $("#cli_direccion").val(cli_direccion || '');
    $("#cli_telefono").val(cli_telefono || '');
    $("#cli_correo").val(cli_correo || '');

    // Empresa y Sucursal
    $("#empresa_id").val(empresa_id || 0);
    $("#sucursal_id").val(sucursal_id || 0);
    $("#suc_razon_social").val(suc_razon_social || '');
    $("#emp_razon_social").val(emp_razon_social || '');

    // Tipo de servicio
    $("#tipo_servicio_id").val(tipo_servicio_id || 0);
    $("#tipo_serv_nombre").val(tipo_servicio || '');

    // Limpiar lista
    $("#listaSolicitud").html("");
    $("#listaSolicitud").attr("style", "display:none;");

    // Forzar enfoque visual en campos llenos
    $(".form-line").attr("class", "form-line focused");
}
function buscarTipoVehiculoPorMarca() {
    var marca_id = $("#marca_id").val();
    var texto    = $("#tip_veh_nombre").val();

    if (!marca_id) {
        $("#listaTipoVeh").html("<ul class='list-group'><li class='list-group-item'>Seleccione primero una marca</li></ul>")
                          .show()
                          .css({position: "absolute", zIndex: 2000});
        return;
    }

    $.ajax({
        url: getUrl() + "tipo-vehiculo/buscarPorMarca",
        method: "GET",
        data: { marca_id: marca_id, texto: texto, uso: 'SERVICIO' },
        dataType: "json"
    })
    .done(function(resultado){
        var esc = function(s) { return (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };
        var lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item text-muted'>No se encontraron tipos de vehículo</li>";
        } else {
            for (var i = 0; i < resultado.length; i++) {
                var rs = resultado[i];
                var descripcion = (rs.tip_veh_nombre || '') + " – " +
                                  (rs.marca_nombre || '') + " " +
                                  (rs.modelo_nombre || '') + " " +
                                  (rs.modelo_año || '');

                lista += "<li class='list-group-item' onclick=\"seleccionTipoVehiculo("
                    + rs.tipo_vehiculo_id + ","
                    + rs.marca_id + ","
                    + rs.modelo_id + ",'"
                    + esc(rs.tip_veh_nombre) + "','"
                    + esc(rs.tip_veh_capacidad) + "','"
                    + esc(rs.tip_veh_combustible) + "','"
                    + esc(rs.tip_veh_categoria) + "','"
                    + esc(rs.tip_veh_observacion) + "','"
                    + esc(rs.marca_nombre) + "','"
                    + esc(rs.modelo_nombre) + "','"
                    + esc(rs.modelo_año) + "');\">"
                    + descripcion + "</li>";
            }
        }

        lista += "</ul>";
        $("#listaTipoVeh").html(lista)
                          .show()
                          .css({position: "absolute", zIndex: 2000});
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionTipoVehiculo(tipo_vehiculo_id,marca_id,modelo_id,tip_veh_nombre,tip_veh_capacidad,tip_veh_combustible,tip_veh_categoria,tip_veh_observacion,marca_nombre,modelo_nombre,modelo_año){
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#marca_id").val(marca_id);
    $("#modelo_id").val(modelo_id); 
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#tip_veh_observacion").val(tip_veh_observacion);
    $("#mar_nom").val(marca_nombre);
    $("#modelo_nom").val(modelo_nombre);
    $("#modelo_año").val(modelo_año);

    $("#listaTipoVeh").html("");
    $("#listaTipoVeh").attr("style","display:none;");
}
function buscarMarcasVehiculo() {
    var esc = function(s) { return (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };
    var texto = $("#mar_nom_veh").val();

    $.ajax({
        url: getUrl() + "marca/buscarVehiculo",
        method: "POST",
        data: { texto: texto },
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron marcas de vehículo</li>";
        } else {
            for (var i = 0; i < resultado.length; i++) {
                var rs = resultado[i];
                lista += "<li class='list-group-item' onclick=\"seleccionMarcaVehiculo("
                    + rs.id + ",'" + esc(rs.mar_nom) + "');\">"
                    + esc(rs.mar_nom) + "</li>";
            }
        }

        lista += "</ul>";
        $("#listaMarcasVehiculo").html(lista)
                                 .show()
                                 .css({ position:"absolute", zIndex:2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionMarcaVehiculo(id, nombre) {

    // Guardar la marca seleccionada
    $("#marca_id").val(id);
    $("#mar_nom").val(nombre);

    // Ocultar lista de marcas
    $("#listaMarcasVehiculo").html("").hide();

    // Habilitar campo Tipo de Vehículo
    $("#tip_veh_nombre").prop("disabled", false);

    // Limpiar tipo de vehículo
    $("#tip_veh_nombre").val("");
    $("#tipo_vehiculo_id").val("");

    // Limpiar datos del tipo de vehículo
    $("#tip_veh_capacidad").val("");
    $("#tip_veh_combustible").val("");
    $("#tip_veh_categoria").val("");
    $("#tip_veh_observacion").val("");

    // Limpiar modelo y año
    $("#modelo_nom").val("");
    $("#modelo_año").val("");

}



function grabar(){
    var op = parseInt($("#txtOperacion").val());

    // Anular y confirmar: solo cambian estado
    if (op === 3 || op === 4) {
        var endpoint = op === 3
            ? "recepcab/anular/"   + $("#id").val()
            : "recepcab/confirmar/" + $("#id").val();
        $.ajax({ url: getUrl() + endpoint, method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
                function() { if (resultado.tipo === "success") location.reload(true); });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    // Agregar / Editar — validaciones campo por campo
    var CHARS_INV    = /[*<>{}|]/;
    var numChasis    = $("#recep_cab_num_chasis").val().trim();
    var observaciones = $("#recep_cab_observaciones").val().trim();
    var fecha         = $("#recep_cab_fecha").val().trim();
    var plazo         = $("#recep_cab_fecha_estimada").val().trim();
    var prioridad     = $("#recep_cab_prioridad").val();
    var kilometraje   = $("#recep_cab_kilometraje").val().trim();
    var combustible   = $("#recep_cab_nivel_combustible").val().trim();
    var solicitudId   = $("#solicitudes_cab_id").val();
    var vehiculoId    = $("#tipo_vehiculo_id").val();

    if (!observaciones)   { swal("Error", "Las observaciones son obligatorias.", "error"); return; }
    if (CHARS_INV.test(observaciones)) { swal("Caracteres no permitidos", "Las observaciones contienen caracteres no permitidos: * < > { } |", "error"); return; }
    if (!fecha)           { swal("Error", "La fecha de recepción es obligatoria.", "error"); return; }
    if (!plazo)           { swal("Error", "La fecha estimada es obligatoria.", "error"); return; }
    if (moment(plazo, 'DD/MM/YYYY HH:mm:ss', true).isBefore(moment(fecha, 'DD/MM/YYYY HH:mm:ss', true))) {
        swal("Error", "La fecha estimada no puede ser anterior a la fecha de recepción.", "error"); return;
    }
    if (!prioridad)       { swal("Error", "Debe seleccionar la prioridad.", "error"); return; }
    if (!kilometraje)     { swal("Error", "El kilometraje es obligatorio.", "error"); return; }
    var kmNum = parseFloat(kilometraje);
    if (isNaN(kmNum) || kmNum < 0) { swal("Error", "El kilometraje debe ser un número mayor o igual a cero.", "error"); return; }
    if (!combustible)     { swal("Error", "El nivel de combustible es obligatorio.", "error"); return; }
    if (numChasis && CHARS_INV.test(numChasis)) { swal("Caracteres no permitidos", "El número de chasis contiene caracteres no permitidos: * < > { } |", "error"); return; }
    if (!solicitudId || solicitudId == '0') { swal("Error", "Debe seleccionar una solicitud.", "error"); return; }
    if (!vehiculoId  || vehiculoId  == '0') { swal("Error", "Debe seleccionar el tipo de vehículo.", "error"); return; }

    var endpoint = op === 2
        ? "recepcab/update/" + $("#id").val()
        : "recepcab/create";
    var metodo = op === 2 ? "PUT" : "POST";

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'recep_cab_fecha':             fecha,
            'recep_cab_fecha_estimada':    plazo,
            'recep_cab_observaciones':     observaciones,
            'recep_cab_prioridad':         prioridad,
            'recep_cab_kilometraje':       kilometraje,
            'recep_cab_nivel_combustible': combustible,
            'recep_cab_num_chasis':        numChasis || null,
            'funcionario_id':              $("#funcionario_id").val(),
            'clientes_id':                 $("#clientes_id").val(),
            'tipo_servicio_id':            $("#tipo_servicio_id").val(),
            'tipo_vehiculo_id':            vehiculoId,
            'solicitudes_cab_id':          solicitudId,
            'empresa_id':                  $("#empresa_id").val(),
            'sucursal_id':                 $("#sucursal_id").val()
        }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
        function() {
            if (resultado.tipo === "success") {
                $("#id").val(resultado.registro.id);
                $("#detalle").show();
                if (op === 2) { location.reload(true); }
                else {
                    $("#recep_cab_fecha").attr("disabled","true");
                    $("#solicitud").attr("disabled","true");
                    $("#recep_cab_observaciones").attr("disabled","true");
                    $("#recep_cab_kilometraje").attr("disabled","true");
                    $("#recep_cab_nivel_combustible").attr("disabled","true");
                    $("#recep_cab_num_chasis").attr("disabled","true");
                    $("#mar_nom").attr("disabled","true");

                    $("#btnAgregar").attr("disabled","true");
                    $("#btnGrabar").attr("disabled","true");
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");
                    $("#btnTicket").removeAttr("disabled");

                    $("#formDetalles").show();
                    listarDetalles();
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function generarTicket() {
    var id = $("#id").val();
    if (!id || id == '0') { swal("Error", "Seleccione una recepción.", "error"); return; }
    window.open('imprimir.html?id=' + id, '_blank');
}

function _generarTicketLegacy_unused() {
    var id = $("#id").val();
    $.ajax({
        url: getUrl() + "recepcion_det/read/" + id,
        method: "GET",
        dataType: "json"
    })
    .done(function(detalles) {
        var nroRecep   = String(id).padStart(7, '0');
        var empresa    = $("#emp_razon_social").val()  || '-';
        var sucursal   = $("#suc_razon_social").val()  || '-';
        var fecha      = $("#recep_cab_fecha").val()   || '-';
        var fechaEst   = $("#recep_cab_fecha_estimada").val() || '-';
        var prioridad  = $("#recep_cab_prioridad").val()|| '-';
        var km         = $("#recep_cab_kilometraje").val() || '-';
        var combustible= $("#recep_cab_nivel_combustible").val() || '-';
        var chasis     = $("#recep_cab_num_chasis").val() || '-';
        var obs        = $("#recep_cab_observaciones").val() || '-';
        var cliente    = ($("#cli_nombre").val() || '') + ' ' + ($("#cli_apellido").val() || '');
        var ruc        = $("#cli_ruc").val()       || '-';
        var telefono   = $("#cli_telefono").val()  || '-';
        var direccion  = $("#cli_direccion").val() || '-';
        var correo     = $("#cli_correo").val()    || '-';
        var vehiculo   = $("#tip_veh_nombre").val()|| '-';
        var marca      = $("#mar_nom").val()      || '-';
        var modelo     = $("#modelo_nom").val()    || '-';
        var anio       = $("#modelo_año").val()    || '-';
        var servicio   = $("#tipo_serv_nombre").val() || '-';

        var filasItems = '';
        var total = 0;
        if (detalles && detalles.length > 0) {
            for (var i = 0; i < detalles.length; i++) {
                var d = detalles[i];
                var subtotal = parseFloat(d.recep_det_cantidad || 0) * parseFloat(d.recep_det_costo || 0);
                total += subtotal;
                filasItems += '<tr>'
                    + '<td>' + (d.item_descripcion || '-') + '</td>'
                    + '<td style="text-align:center">' + (d.recep_det_cantidad || 0) + '</td>'
                    + '<td style="text-align:right">' + parseFloat(d.recep_det_costo || 0).toLocaleString('es-ES', {minimumFractionDigits:0}) + '</td>'
                    + '<td style="text-align:right">' + subtotal.toLocaleString('es-ES', {minimumFractionDigits:0}) + '</td>'
                    + '</tr>';
            }
        } else {
            filasItems = '<tr><td colspan="4" style="text-align:center;color:#999">Sin ítems registrados</td></tr>';
        }

        var html = '<!DOCTYPE html><html><head>'
            + '<meta charset="UTF-8">'
            + '<title>Ticket Recepción NRO ' + nroRecep + '</title>'
            + '<style>'
            + 'body{font-family:Arial,sans-serif;font-size:12px;margin:20px;color:#222}'
            + 'h1{font-size:16px;margin:0}'
            + 'h2{font-size:13px;margin:4px 0}'
            + '.header{text-align:center;border-bottom:2px solid #333;padding-bottom:8px;margin-bottom:10px}'
            + '.nro{font-size:18px;font-weight:bold;color:#333}'
            + '.section{margin-bottom:10px}'
            + '.section-title{font-weight:bold;font-size:11px;text-transform:uppercase;color:#555;border-bottom:1px solid #ccc;margin-bottom:4px}'
            + '.row{display:flex;gap:16px;margin-bottom:3px}'
            + '.label{color:#666;min-width:110px}'
            + 'table{width:100%;border-collapse:collapse;margin-top:6px}'
            + 'th{background:#333;color:#fff;padding:4px 6px;text-align:left;font-size:11px}'
            + 'td{padding:3px 6px;border-bottom:1px solid #eee;font-size:11px}'
            + '.total-row td{font-weight:bold;border-top:2px solid #333;border-bottom:none}'
            + '.firma{margin-top:30px;display:flex;gap:40px}'
            + '.firma-box{flex:1;text-align:center}'
            + '.firma-line{border-top:1px solid #333;margin-top:40px;padding-top:4px;font-size:11px;color:#555}'
            + '.footer{margin-top:20px;text-align:center;font-size:10px;color:#999;border-top:1px solid #ccc;padding-top:6px}'
            + '@media print{button{display:none}}'
            + '</style>'
            + '</head><body>'

            + '<div class="header">'
            + '<h1>' + empresa + '</h1>'
            + '<h2>' + sucursal + '</h2>'
            + '<div class="nro">COMPROBANTE DE RECEPCIÓN NRO: ' + nroRecep + '</div>'
            + '</div>'

            + '<div style="display:flex;gap:20px">'

            + '<div style="flex:1">'
            + '<div class="section"><div class="section-title">Cliente</div>'
            + '<div class="row"><span class="label">Nombre:</span><span>' + cliente.trim() + '</span></div>'
            + '<div class="row"><span class="label">RUC:</span><span>' + ruc + '</span></div>'
            + '<div class="row"><span class="label">Teléfono:</span><span>' + telefono + '</span></div>'
            + '<div class="row"><span class="label">Dirección:</span><span>' + direccion + '</span></div>'
            + '<div class="row"><span class="label">Correo:</span><span>' + correo + '</span></div>'
            + '</div>'

            + '<div class="section"><div class="section-title">Vehículo</div>'
            + '<div class="row"><span class="label">Tipo:</span><span>' + vehiculo + '</span></div>'
            + '<div class="row"><span class="label">Marca:</span><span>' + marca + '</span></div>'
            + '<div class="row"><span class="label">Modelo:</span><span>' + modelo + '</span></div>'
            + '<div class="row"><span class="label">Año:</span><span>' + anio + '</span></div>'
            + '<div class="row"><span class="label">Nro. Chasis:</span><span>' + chasis + '</span></div>'
            + '</div>'
            + '</div>'

            + '<div style="flex:1">'
            + '<div class="section"><div class="section-title">Datos de Recepción</div>'
            + '<div class="row"><span class="label">Fecha ingreso:</span><span>' + fecha + '</span></div>'
            + '<div class="row"><span class="label">Fecha estimada:</span><span>' + fechaEst + '</span></div>'
            + '<div class="row"><span class="label">Prioridad:</span><span>' + prioridad + '</span></div>'
            + '<div class="row"><span class="label">Kilometraje:</span><span>' + km + ' km</span></div>'
            + '<div class="row"><span class="label">Combustible:</span><span>' + combustible + '</span></div>'
            + '<div class="row"><span class="label">Tipo servicio:</span><span>' + servicio + '</span></div>'
            + '<div class="row"><span class="label">Observaciones:</span><span>' + obs + '</span></div>'
            + '</div>'
            + '</div>'

            + '</div>'

            + '<div class="section"><div class="section-title">Ítems / Repuestos</div>'
            + '<table><thead><tr>'
            + '<th>Descripción</th><th style="text-align:center">Cant.</th><th style="text-align:right">Precio Unit.</th><th style="text-align:right">Subtotal</th>'
            + '</tr></thead><tbody>'
            + filasItems
            + '<tr class="total-row"><td colspan="3" style="text-align:right">TOTAL ESTIMADO</td>'
            + '<td style="text-align:right">' + total.toLocaleString('es-ES', {minimumFractionDigits:0}) + '</td></tr>'
            + '</tbody></table>'
            + '</div>'

            + '<div class="firma">'
            + '<div class="firma-box"><div class="firma-line">Firma del Cliente</div></div>'
            + '<div class="firma-box"><div class="firma-line">Firma del Recepcionista</div></div>'
            + '</div>'

            + '<div class="footer">Documento generado el ' + new Date().toLocaleString('es-ES') + ' — Recepción NRO: ' + nroRecep + '</div>'

            + '</body></html>';

        var ventana = window.open('', '_blank', 'width=800,height=700');
        ventana.document.write(html);
        ventana.document.close();
        ventana.focus();
        setTimeout(function() { ventana.print(); }, 500);
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function confirmarSalida() {
    var id = $("#id").val();
    if (!id || id == '0') { swal("Error", "Seleccione una recepción.", "error"); return; }
    swal({
        title: "REGISTRAR SALIDA",
        text: "¿Confirmar la entrega del vehículo al cliente? Esta acción no se puede revertir.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1976D2",
        confirmButtonText: "SÍ, REGISTRAR",
        cancelButtonText: "CANCELAR",
        closeOnConfirm: false
    }, function() {
        registrarSalida(id);
    });
}

function registrarSalida(id) {
    $.ajax({
        url: getUrl() + "recepcab/registrar-salida/" + id,
        method: "PUT",
        dataType: "json"
    })
    .done(function(resultado) {
        swal({ title: "Salida registrada", text: resultado.mensaje, type: resultado.tipo },
        function() { location.reload(true); });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
function formatearNumero(valor) {
    if (valor === null || valor === undefined || valor === '') return '0,00';
    // Si ya es número, úsalo; si es string, intenta limpiarlo y convertirlo
    var num = Number(valor);
    if (isNaN(num)) {
        num = parseNumero(String(valor));
    }
    // formateo en estilo español: separador de miles '.' y decimal ','
    try {
        return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
        // fallback manual si no soporta toLocaleString con opciones
        var parts = (Math.round(num * 100) / 100).toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(',');
    }
}

// Convierte una cadena formateada (ej: "1.234,56" o "1234.56") a Number
function parseNumero(str) {
    if (str === null || str === undefined || str === '') return 0;
    if (typeof str === 'number') return str;
    var s = String(str).trim();
    s = s.replace(/\s+/g, ''); // quitar espacios
    var hasComma = s.indexOf(',') !== -1;
    var hasDot = s.indexOf('.') !== -1;

    if (hasComma && hasDot) {
        // asumimos: '.' = miles, ',' = decimal  ->  "1.234.567,89" -> "1234567.89"
        s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma && !hasDot) {
        // asumimos ',' = decimal -> "1234,56" -> "1234.56"
        s = s.replace(',', '.');
    } else {
        // sólo '.' o ninguno -> ya ok ("1234.56" o "1234")
    }

    // eliminar todo lo que no sea número, signo o punto decimal
    s = s.replace(/[^0-9\.-]/g, '');
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

function agregarDetalle() {
    mmLimpiar();
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val('');
    $("#item_descripcion").val('').removeAttr("disabled");
    $("#tipo_imp_nom").val('').attr("disabled","true");
    $("#recep_det_cantidad_stock").val('').attr("disabled","true");
    $("#recep_det_cantidad").val('').removeAttr("disabled");
    $("#recep_det_costo").val('').attr("disabled","true");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#tipo_imp_nom").attr("disabled","true");
    $("#recep_det_cantidad_stock").attr("disabled","true");
    $("#recep_det_cantidad").removeAttr("disabled");
    $("#recep_det_costo").attr("disabled","true");
    $("#marca_det_mm, #modelo_det_mm").removeAttr("disabled");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function cancelarDetalle() {
    mmLimpiar();
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val('');
    $("#item_descripcion").val('').prop('disabled', true);
    $("#tipo_imp_nom").val('').prop('disabled', true);
    $("#recep_det_cantidad_stock").val('').prop('disabled', true);
    $("#recep_det_cantidad").val('').prop('disabled', true);
    $("#recep_det_costo").val('').prop('disabled', true);
    $("#listaProductos").html('').hide();

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").show();
    $("#btnGrabarDetalle").hide();
}

function eliminarDetalle(){
    if (!$("#item_id").val()) {
        swal("Aviso", "Seleccione un ítem de la tabla para eliminar.", "warning");
        return;
    }
    swal({
        title: "Eliminar ítem",
        text: "¿Desea eliminar \"" + $("#item_descripcion").val() + "\" del detalle?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + "recepcion_det/delete/" + $("#id").val() + "/" + $("#item_id").val(),
            method: "DELETE",
            dataType: "json"
        })
        .done(function() {
            swal({ title: "Eliminado", text: "Ítem eliminado del detalle.", type: "success", timer: 1500, showConfirmButton: false });
            cancelarDetalle();
            listarDetalles();
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function grabarDetalle(){
    var op = parseInt($("#txtOperacionDetalle").val());

    if (op !== 3) {
        if (!$("#item_id").val()) { swal("Error", "Seleccione un ítem.", "error"); return; }
        var cant = parseFloat($("#recep_det_cantidad").val());
        if (isNaN(cant) || cant <= 0) { swal("Error", "La cantidad debe ser mayor a cero.", "error"); return; }
    }

    var endpoint = "recepcion_det/create";
    var metodo = "POST";
    if (op === 2) { endpoint = "recepcion_det/update/" + $("#id").val(); metodo = "PUT"; }
    if (op === 3) { endpoint = "recepcion_det/delete/" + $("#id").val() + "/" + $("#item_id").val(); metodo = "DELETE"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "recep_cab_id":            $("#id").val(),
            "item_id":                 $("#item_id").val(),
            "tipo_impuesto_id":        $("#tipo_impuesto_id").val(),
            "recep_det_cantidad":      $("#recep_det_cantidad").val(),
            "recep_det_costo":         $("#recep_det_costo").val(),
            "recep_det_cantidad_stock":$("#recep_det_cantidad_stock").val(),
            "marca_id":                _mmMarcaId  ? parseInt(_mmMarcaId)  : null,
            "modelo_id":               _mmModeloId ? parseInt(_mmModeloId) : null
        }
    })
    .done(function() { cancelarDetalle(); listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscarItem",
        method: "POST",
        dataType: "json",
        data: {
            "item_descripcion": $("#item_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_descripcion + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tipo_imp_nom + "',"
                + rs.tipo_imp_tasa + ","
                + rs.cantidad_disponible + ")\">"
                + rs.item_descripcion + " (Stock: " + rs.cantidad_disponible + ")</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#recep_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#recep_det_cantidad_stock").val(cantidad_disponible);

    mmCargarMarcas(item_id, null);
    $("#marca_det_mm").removeAttr("disabled");

    $("#listaProductos").html("").hide();
    $(".form-line").addClass("focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    $.ajax({
        url: getUrl() + "recepcion_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.recep_det_cantidad) || 0;
                const costo = parseFloat(rs.recep_det_costo) || 0;
                const subtotal = cantidad * costo;

                const imp = (rs.tipo_imp_nom || '').toUpperCase();
                let iva = 0;
                if (imp.indexOf('EXENT') !== -1) {
                    iva = 0;
                } else if (imp.indexOf('5') !== -1) {
                    iva = Math.round(subtotal / 21);
                    TotalIva5 += iva;
                } else {
                    iva = Math.round(subtotal / 11);
                    TotalIva10 += iva;
                }

                // Generar fila
                lista += "<tr class='item-list' onclick=\"seleccionRecepcionDet("
                    + rs.item_id + ", '"
                    + (rs.item_descripcion || '').replace(/'/g,"\\'") + "', "
                    + cantidad + ", "
                    + rs.recep_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tipo_imp_nom + "', "
                    + (rs.marca_id  || 0) + ", "
                    + (rs.modelo_id || 0)
                    + ");\">";

                lista += "<td>" + rs.item_descripcion + "</td>";
                lista += "<td>" + (rs.mar_nom   || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.recep_det_cantidad_stock + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='10' class='text-center text-muted'>Sin ítems en el detalle.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        // Activar o desactivar Confirmar
        if ($("#recep_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionRecepcionDet(item_id, item_descripcion, recep_det_cantidad, recep_det_cantidad_stock, recep_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#recep_det_cantidad").val(recep_det_cantidad);
    $("#recep_det_cantidad_stock").val(recep_det_cantidad_stock);
    $("#recep_det_costo").val(recep_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    mmAutocompletar(item_id, marca_id, modelo_id);
    $(".form-line").addClass("focused");
}
function cargarFuncionarioIdLogueado() {
    try {
        var datosSesion = JSON.parse(localStorage.getItem('datosSesion'));

        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
        } else {
            swal("Error de sesión", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
            setTimeout(function() { window.location.href = '../../index.html'; }, 2000);
        }
    } catch (error) {
        swal("Error", "Error al cargar datos del usuario. Inicie sesión nuevamente.", "error");
        setTimeout(function() { window.location.href = '../../index.html'; }, 2000);
    }
}



