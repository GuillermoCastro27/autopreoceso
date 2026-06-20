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
                title:'Listado de Diagnostico'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Diagnostico'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Diagnostico'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Diagnostico'
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
    $("#diag_cab_fecha").removeAttr("disabled");
    $("#recepcion").removeAttr("disabled");
    $("#diag_cab_observaciones").removeAttr("disabled");
    $("#tipo_diag_nombre").removeAttr("disabled");
    $("#diag_cab_prioridad").attr("disabled","true");
    $("#diag_cab_kilometraje").attr("disabled","true");
    $("#diag_cab_nivel_combustible").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);
    
    $("#diag_cab_fecha").removeAttr("disabled");
    $("#recepcion").removeAttr("disabled");
    $("#diag_cab_observaciones").removeAttr("disabled");
    $("#tipo_diag_nombre").removeAttr("disabled");
    $("#diag_cab_prioridad").attr("disabled","true");
    $("#diag_cab_kilometraje").attr("disabled","true");
    $("#diag_cab_nivel_combustible").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

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
        url: getUrl() + "diagnosticocab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        const esc = s => (s || '').toString().replace(/'/g, "\\'");

        let lista = "";
        for (let rs of resultado) {
            lista += "<tr class='item-list' onclick=\"seleccionDiagnostico("

            // IDs
            + rs.id + ","
            + rs.empresa_id + ","
            + rs.sucursal_id + ","
            + rs.clientes_id + ","
            + (rs.tipo_servicio_id || 0) + ","
            + (rs.tipo_vehiculo_id || 0) + ","
            + (rs.tipo_diagnostico_id || 0) + ", '"

            // Texto diagnóstico
            + esc(rs.tipo_diag_nombre) + "', '"

            // Empresa / sucursal / encargado
            + esc(rs.emp_razon_social) + "', '"
            + esc(rs.suc_razon_social) + "', '"
            + esc(rs.encargado) + "', '"

            // Recepción
            + esc(rs.recepcion) + "', '"

            // Datos diagnóstico
            + esc(rs.diag_cab_fecha) + "', '"
            + esc(rs.diag_cab_estado) + "', '"
            + esc(rs.diag_cab_observaciones) + "', '"
            + esc(rs.diag_cab_prioridad) + "', '"
            + esc(rs.diag_cab_kilometraje) + "', '"
            + esc(rs.diag_cab_nivel_combustible) + "', '"

            // Tipo servicio
            + esc(rs.tipo_serv_nombre || '') + "', '"

            // Vehículo
            + esc(rs.tip_veh_nombre) + "', '"
            + esc(rs.tip_veh_capacidad) + "', '"
            + esc(rs.tip_veh_combustible) + "', '"
            + esc(rs.tip_veh_categoria) + "', '"
            + esc(rs.marca_nombre) + "', '"
            + esc(rs.modelo_nombre) + "', '"

            // Cliente
            + esc(rs.cli_nombre) + "', '"
            + esc(rs.cli_apellido) + "', '"
            + esc(rs.cli_ruc) + "', '"
            + esc(rs.cli_telefono) + "', '"
            + esc(rs.cli_direccion) + "', '"
            + esc(rs.cli_correo) + "', "

            // Recepción ID
            + (rs.recep_cab_id || 0)

            + ");\">";

            // 🔹 Celdas visibles
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.emp_razon_social || '') + "</td>";
            lista += "<td>" + (rs.suc_razon_social || '') + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + (rs.recepcion || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_fecha || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_estado || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_observaciones || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_prioridad || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_kilometraje || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_nivel_combustible || '') + "</td>";
            lista += "<td>" + (rs.tipo_serv_nombre || '') + "</td>";
            lista += "<td>" + (rs.cli_nombre || '') + "</td>";
            lista += "<td>" + (rs.cli_apellido || '') + "</td>";
            lista += "<td>" + (rs.cli_ruc || '') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionDiagnostico(
    id_recepcion, empresa_id, sucursal_id, clientes_id,
    tipo_servicio_id, tipo_vehiculo_id, tipo_diagnostico_id, tipo_diag_nombre,

    emp_razon_social, suc_razon_social, encargado, recepcion,
    diag_cab_fecha, diag_cab_estado, diag_cab_observaciones,
    diag_cab_prioridad, diag_cab_kilometraje, diag_cab_nivel_combustible,

    tipo_servicio,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible,
    tip_veh_categoria, marca_nombre, modelo_nombre,

    cli_nombre, cli_apellido, cli_ruc, cli_telefono,
    cli_direccion, cli_correo, recep_cab_id
) {
    // IDs
    $("#id").val(id_recepcion);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#recep_cab_id").val(recep_cab_id);

    // Recepción
    $("#recepcion").val(recepcion);

    // Datos del diagnóstico
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#diag_cab_fecha").val(diag_cab_fecha);
    $("#diag_cab_observaciones").val(diag_cab_observaciones);
    $("#diag_cab_prioridad").val(diag_cab_prioridad);
    $("#diag_cab_kilometraje").val(diag_cab_kilometraje);
    $("#diag_cab_nivel_combustible").val(diag_cab_nivel_combustible);
    $("#diag_cab_estado").val(diag_cab_estado);

    // Servicio
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    $("#tipo_serv_nombre").val(tipo_servicio);

    // VEHÍCULO
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);

    // Marca y modelo (CORRECTOS)
    $("#mar_nom").val(marca_nombre);
    $("#modelo_nom").val(modelo_nombre);

    // Cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // Vistas
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    if (diag_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").removeAttr("disabled");
        $("#formDetalles").show();
    }

    if (diag_cab_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").addClass("focused");
}
function buscarRecepcion() {
    $.ajax({
        url: getUrl() + "recepcab/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "funcionario_id": $("#funcionario_id").val(),
            "name": $("#recepcion").val()
        }
    })
    .done(function(resultado) {

        if (!resultado || resultado.length === 0) {
            $("#listaRecepcion").html("<li class='list-group-item text-center text-muted'>No se encontraron recepciones</li>");
            $("#listaRecepcion").attr("style", "display:block; position:absolute; z-index:2000;");
            return;
        }

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += `<li class='list-group-item'
                        onclick="seleccionRecepcion(
                            ${rs.recep_cab_id},
                            ${rs.empresa_id},
                            ${rs.sucursal_id},
                            '${(rs.recepcion || '')}',
                            ${rs.clientes_id},

                            '${(rs.cli_nombre || '')}',
                            '${(rs.cli_apellido || '')}',
                            ${rs.tipo_servicio_id},

                            '${(rs.cli_ruc || '')}',
                            '${(rs.cli_direccion || '')}',
                            '${(rs.cli_telefono || '')}',
                            '${(rs.cli_correo || '')}',

                            '${(rs.suc_razon_social || '')}',
                            '${(rs.emp_razon_social || '')}',
                            '${(rs.tipo_servicio || '')}',
                            '${(rs.recep_cab_prioridad || '')}',
                            '${(rs.recep_cab_kilometraje || '')}',
                            '${(rs.recep_cab_nivel_combustible || '')}',

                            ${rs.tipo_vehiculo_id},
                            '${(rs.tip_veh_nombre || '')}',
                            '${(rs.mar_nom || '')}',
                            '${(rs.modelo_nom || '')}',
                            '${(rs.modelo_año || '')}',
                            '${(rs.vehiculo_info || '')}',
                            '${(rs.tip_veh_combustible || '')}',
                            '${(rs.tip_veh_categoria || '')}',
                            '${(rs.tip_veh_capacidad || '')}',
                            '${(rs.tip_veh_observacion || '')}'
                        )">
                        ${(rs.recepcion || 'Sin descripción')}
                    </li>`;
        }

        lista += "</ul>";

        $("#listaRecepcion").html(lista);
        $("#listaRecepcion").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionRecepcion(
    recep_cab_id, empresa_id, sucursal_id,
    recepcion, clientes_id, cli_nombre, cli_apellido, tipo_servicio_id,
    cli_ruc, cli_direccion, cli_telefono, cli_correo,
    suc_razon_social, emp_razon_social, tipo_servicio,
    recep_cab_prioridad, recep_cab_kilometraje, recep_cab_nivel_combustible,

    tipo_vehiculo_id, tip_veh_nombre, mar_nom, modelo_nom, modelo_año,
    vehiculo_info, tip_veh_combustible, tip_veh_categoria, tip_veh_capacidad, tip_veh_observacion
) {

    // Datos principales
    $("#recep_cab_id").val(recep_cab_id);
    $("#recepcion").val(recepcion);

    // Cliente
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // Empresa / Sucursal
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#emp_razon_social").val(emp_razon_social);

    // Tipo de servicio
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#tipo_serv_nombre").val(tipo_servicio);

    // Datos de recepción
    $("#diag_cab_prioridad").val(recep_cab_prioridad);
    $("#diag_cab_kilometraje").val(recep_cab_kilometraje);
    $("#diag_cab_nivel_combustible").val(recep_cab_nivel_combustible);

    // DATOS DEL VEHÍCULO COMPLETOS
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#mar_nom").val(mar_nom);
    $("#modelo_nom").val(modelo_nom);
    $("#modelo_año").val(modelo_año);

    $("#vehiculo_info").val(vehiculo_info);

    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_observacion").val(tip_veh_observacion);

    // Ocultar lista
    $("#listaRecepcion").html("");
    $("#listaRecepcion").attr("style", "display:none;");

    // Campos en modo "focused"
    $(".form-line").addClass("focused");
}

function buscarTipoDiagnostico(){
    $.ajax({
        url:getUrl() + "tipo-diagnostico/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoDiagnostico("+rs.tipo_diagnostico_id+",'"+rs.tipo_diag_nombre+"','"+rs.tipo_diag_descrip+"');\">"+rs.tipo_diag_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoDiag").html(lista);
        $("#listaTipoDiag").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionTipoDiagnostico(tipo_diagnostico_id,tipo_diag_nombre,tipo_diag_descrip){
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    $("#tipo_diag_descrip").val(tipo_diag_descrip);

    $("#listaTipoDiag").html("");
    $("#listaTipoDiag").attr("style","display:none;");
}
function grabar(){
    var op = parseInt($("#txtOperacion").val());

    // Anular y confirmar: solo cambian estado
    if (op === 3 || op === 4) {
        var endpoint = op === 3
            ? "diagnosticocab/anular/"   + $("#id").val()
            : "diagnosticocab/confirmar/" + $("#id").val();
        $.ajax({ url: getUrl() + endpoint, method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
                function() { if (resultado.tipo === "success") location.reload(true); });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    // Agregar / Editar
    var CHARS_INV      = /[*<>{}|]/;
    var observaciones  = $("#diag_cab_observaciones").val().trim();
    var fecha          = $("#diag_cab_fecha").val().trim();
    var prioridad      = $("#diag_cab_prioridad").val();
    var kilometraje    = $("#diag_cab_kilometraje").val().trim();
    var combustible    = $("#diag_cab_nivel_combustible").val().trim();
    var recepcionId    = $("#recep_cab_id").val();
    var tipoDiagId     = $("#tipo_diagnostico_id").val();

    if (!observaciones)   { swal("Error", "Las observaciones son obligatorias.", "error"); return; }
    if (CHARS_INV.test(observaciones)) { swal("Caracteres no permitidos", "Las observaciones contienen caracteres no permitidos: * < > { } |", "error"); return; }
    if (!fecha)           { swal("Error", "La fecha del diagnóstico es obligatoria.", "error"); return; }
    if (!prioridad)       { swal("Error", "Debe seleccionar la prioridad.", "error"); return; }
    if (!kilometraje)     { swal("Error", "El kilometraje es obligatorio.", "error"); return; }
    var kmNum = parseFloat(kilometraje);
    if (isNaN(kmNum) || kmNum < 0) { swal("Error", "El kilometraje debe ser un número mayor o igual a cero.", "error"); return; }
    if (!combustible)     { swal("Error", "El nivel de combustible es obligatorio.", "error"); return; }
    if (!recepcionId || recepcionId == '0') { swal("Error", "Debe seleccionar una recepción.", "error"); return; }
    if (!tipoDiagId  || tipoDiagId  == '0') { swal("Error", "Debe seleccionar el tipo de diagnóstico.", "error"); return; }

    var endpoint = op === 2
        ? "diagnosticocab/update/" + $("#id").val()
        : "diagnosticocab/create";
    var metodo = op === 2 ? "PUT" : "POST";

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'diag_cab_fecha':             fecha,
            'diag_cab_observaciones':     observaciones,
            'diag_cab_prioridad':         prioridad,
            'diag_cab_kilometraje':       kilometraje,
            'diag_cab_nivel_combustible': combustible,
            'funcionario_id':             $("#funcionario_id").val(),
            'clientes_id':                $("#clientes_id").val(),
            'tipo_diagnostico_id':        tipoDiagId,
            'recep_cab_id':               recepcionId,
            'tipo_vehiculo_id':           $("#tipo_vehiculo_id").val(),
            'tipo_servicio_id':           $("#tipo_servicio_id").val(),
            'empresa_id':                 $("#empresa_id").val(),
            'sucursal_id':                $("#sucursal_id").val()
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
                    $("#diag_cab_fecha").attr("disabled","true");
                    $("#recepcion").attr("disabled","true");
                    $("#diag_cab_observaciones").attr("disabled","true");
                    $("#tipo_diag_nombre").attr("disabled","true");

                    $("#btnAgregar").attr("disabled","true");
                    $("#btnGrabar").attr("disabled","true");
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");

                    $("#formDetalles").show();
                    listarDetalles();
                }
            }
        });
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
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>');
    cargarDepositosDet(null);
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val('');
    $("#item_descripcion").val('').removeAttr("disabled");
    $("#tipo_imp_nom").val('').attr("disabled","true");
    $("#diag_det_cantidad_stock").val('').attr("disabled","true");
    $("#diag_det_cantidad").val('').removeAttr("disabled");
    $("#diag_det_costo").val('').attr("disabled","true");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#tipo_imp_nom").attr("disabled","true");
    $("#diag_det_cantidad_stock").attr("disabled","true");
    $("#diag_det_cantidad").removeAttr("disabled");
    $("#diag_det_costo").attr("disabled","true");
    $("#marca_det_mm, #modelo_det_mm").removeAttr("disabled");
    cargarDepositosDet($('#deposito_id_det').val());

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function cancelarDetalle() {
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    mmLimpiar();
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val('');
    $("#item_descripcion").val('').prop('disabled', true);
    $("#tipo_imp_nom").val('').prop('disabled', true);
    $("#diag_det_cantidad_stock").val('').prop('disabled', true);
    $("#diag_det_cantidad").val('').prop('disabled', true);
    $("#diag_det_costo").val('').prop('disabled', true);
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
            url: getUrl() + "diagnostico_det/delete/" + $("#id").val() + "/" + $("#item_id").val(),
            method: "DELETE",
            dataType: "json"
        })
        .done(function() {
            swal({ title: "Eliminado", text: "Ítem eliminado.", type: "success", timer: 1500, showConfirmButton: false });
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
        var cant = parseFloat($("#diag_det_cantidad").val());
        if (isNaN(cant) || cant <= 0) { swal("Error", "La cantidad debe ser mayor a cero.", "error"); return; }
    }

    var endpoint = "diagnostico_det/create";
    var metodo = "POST";
    if (op === 2) { endpoint = "diagnostico_det/update/" + $("#id").val(); metodo = "PUT"; }
    if (op === 3) { endpoint = "diagnostico_det/delete/" + $("#id").val() + "/" + $("#item_id").val(); metodo = "DELETE"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "diagnostico_cab_id":    $("#id").val(),
            "item_id":               $("#item_id").val(),
            "tipo_impuesto_id":      $("#tipo_impuesto_id").val(),
            "diag_det_cantidad":     $("#diag_det_cantidad").val(),
            "diag_det_costo":        $("#diag_det_costo").val(),
            "diag_det_cantidad_stock":$("#diag_det_cantidad_stock").val(),
            "marca_id":              _mmMarcaId  ? parseInt(_mmMarcaId)  : null,
            "modelo_id":             _mmModeloId ? parseInt(_mmModeloId) : null,
            "deposito_id":             $("#deposito_id_det").val() || null
        }
    })
    .done(function() { cancelarDetalle(); listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });
}


function cargarDepositosDet(selectedId) {
    var sucId = $('#sucursal_id').val();
    var sel   = $('#deposito_id_det');
    if (!sucId) { sel.html('<option value="">-- Depósito --</option>'); return; }
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucId, function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selectedId ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        sel.html(opts).removeAttr('disabled');
    });
}
function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "item_descripcion": $("#item_descripcion").val(),
            "deposito_id": $("#deposito_id_det").val() || null
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
    $("#diag_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#diag_det_cantidad_stock").val(cantidad_disponible);

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
        url: getUrl() + "diagnostico_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.diag_det_cantidad) || 0;
                const costo = parseFloat(rs.diag_det_costo) || 0;
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

                lista += "<tr class='item-list' onclick=\"seleccionRecepcionDet("
                    + rs.item_id + ", '"
                    + (rs.item_descripcion || '').replace(/'/g,"\\'") + "', "
                    + cantidad + ", "
                    + rs.diag_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tipo_imp_nom + "', "
                    + (rs.marca_id  || 0) + ", "
                    + (rs.modelo_id || 0) + ", "
                    + (rs.deposito_id || 0) + ",'"
                    + (rs.dep_nombre || '').replace(/'/g,"\\'") + "'"
                    + ");\">";

                lista += "<td>" + rs.item_descripcion + "</td>";
                lista += "<td>" + (rs.mar_nom   || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.diag_det_cantidad_stock + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.dep_nombre || '-') + "</td>";
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
        if ($("#diag_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionRecepcionDet(item_id, item_descripcion, diag_det_cantidad, diag_det_cantidad_stock, diag_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id, deposito_id, dep_nombre) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#diag_det_cantidad").val(diag_det_cantidad);
    $("#diag_det_cantidad_stock").val(diag_det_cantidad_stock);
    $("#diag_det_costo").val(diag_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    mmAutocompletar(item_id, marca_id, modelo_id);
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>').prop('disabled', true);
    } else {
        $dep.html('<option value="">-- Depósito --</option>').prop('disabled', true);
    }
    $(".form-line").addClass("focused");
}
function cargarFuncionarioIdLogueado() {
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
        } else {
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}



