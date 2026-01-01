cargarUserIdLogueado();
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
                title:'Listado de Pedidos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos'
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
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#tip_veh_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#marc_nom").removeAttr("disabled");

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
    
    $("#recep_cab_fecha").removeAttr("disabled");
    $("#recep_cab_fecha_estimada").attr("disabled","true");
    $("#solicitud").removeAttr("disabled");
    $("#recep_cab_observaciones").removeAttr("disabled");
    $("#recep_cab_prioridad").attr("disabled","true");
    $("#recep_cab_kilometraje").removeAttr("disabled");
    $("#recep_cab_nivel_combustible").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#tip_veh_nombre").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#marc_nom").removeAttr("disabled");

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
        url: getUrl() + "recepcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {

        const esc = s => (s || '').toString().replace(/'/g, "\\'");

        let lista = "";

        for (let rs of resultado) {

            lista += "<tr class='item-list' onclick=\"seleccionRecepcion("

                // IDs
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.clientes_id + ","
                + rs.tipo_servicio_id + ","
                + rs.tipo_vehiculo_id + ","

                // Empresa - Sucursal
                + "'" + esc(rs.emp_razon_social) + "', '"
                + esc(rs.suc_razon_social) + "', '"

                // Otros datos
                + esc(rs.encargado) + "', '"
                + esc(rs.solicitudes) + "', '"
                + esc(rs.recep_cab_fecha) + "', '"
                + esc(rs.recep_cab_fecha_estimada) + "', '"
                + esc(rs.recep_cab_estado) + "', '"
                + esc(rs.recep_cab_observaciones) + "', '"
                + esc(rs.recep_cab_prioridad) + "', '"
                + esc(rs.recep_cab_kilometraje) + "', '"
                + esc(rs.recep_cab_nivel_combustible) + "', '"
                + esc(rs.tipo_servicio) + "', '"
                + esc(rs.cli_nombre) + "', '"
                + esc(rs.cli_apellido) + "', '"
                + esc(rs.cli_ruc) + "', '"
                + esc(rs.cli_telefono) + "', '"
                + esc(rs.cli_direccion) + "', '"
                + esc(rs.cli_correo) + "', '"
                + (rs.solicitudes_cab_id || 0) + "',"

                // Vehículo
                + "'" + esc(rs.tip_veh_nombre) + "', '"
                + esc(rs.tip_veh_capacidad) + "',  '"
                + esc(rs.tip_veh_combustible) + "', '"
                + esc(rs.tip_veh_categoria) + "','"
                + esc(rs.tip_veh_observacion) + "', '"
                + esc(rs.marc_nom) + "', '"
                + esc(rs.modelo_nom) + "', '"
                + esc(rs.modelo_año) + "'"

                + ");\">";

            // Columnas visibles
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.cli_nombre + ' ' + rs.cli_apellido) + "</td>";
            lista += "<td>" + (rs.vehiculo_info || '') + "</td>";
            lista += "<td>" + (rs.solicitudes || '') + "</td>";
            lista += "<td>" + (rs.recep_cab_fecha || '') + "</td>";
            lista += "<td>" + (rs.recep_cab_estado || '') + "</td>";
            lista += "<td>" + (rs.encargado || '') + "</td>";

            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    });
}

function seleccionRecepcion(
    id_recepcion, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    tipo_vehiculo_id, emp_razon_social, suc_razon_social, encargado, solicitudes,
    recep_cab_fecha, recep_cab_fecha_estimada, recep_cab_estado,
    recep_cab_observaciones, recep_cab_prioridad, recep_cab_kilometraje,
    recep_cab_nivel_combustible, tipo_servicio, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo, solicitudes_cab_id,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible, tip_veh_categoria,tip_veh_observacion,
    marc_nom, modelo_nom, modelo_año
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
    $("#marc_nom").val(marc_nom);
    $("#modelo_nom").val(modelo_nom);
    $("#modelo_año").val(modelo_año);

    // Mostrar pantalla
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    if (recep_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").removeAttr("disabled");
        $("#formDetalles").show();
    }

    $(".form-line").addClass("focused");
}
function buscarSolicitud() {
    $.ajax({
        url: getUrl() + "solicitudcad/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "user_id": $("#user_id").val(),
            "name": $("#solicitud").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);

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
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la búsqueda:", textStatus, errorThrown);
    });
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
    let marca_id = $("#marca_id").val();
    let texto = $("#tip_veh_nombre").val();

    if (!marca_id) {
        $("#listaTipoVeh").html("<li class='list-group-item'>Seleccione primero una marca</li>")
                          .show()
                          .css({position: "absolute", zIndex: 2000});
        return;
    }

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/tipo-vehiculo/buscarPorMarca",
        method: "GET",
        data: { marca_id: marca_id, texto: texto },
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class='list-group'>";

        for (let rs of resultado) {
            let descripcion =
                rs.tip_veh_nombre + " – " +
                rs.marca_nombre + " " +
                rs.modelo_nombre + " " +
                rs.modelo_año;

            lista += `
                <li class='list-group-item'
                    onclick="seleccionTipoVehiculo(
                        ${rs.tipo_vehiculo_id},
                        ${rs.marca_id},
                        ${rs.modelo_id},
                        '${rs.tip_veh_nombre}',
                        '${rs.tip_veh_capacidad}',
                        '${rs.tip_veh_combustible}',
                        '${rs.tip_veh_categoria}',
                        '${rs.tip_veh_observacion}',
                        '${rs.marca_nombre}',
                        '${rs.modelo_nombre}',
                        '${rs.modelo_año}'
                    )">
                    ${descripcion}
                </li>
            `;
        }

        lista += "</ul>";
        $("#listaTipoVeh").html(lista)
                          .show()
                          .css({position: "absolute", zIndex: 2000});
    });
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
    $("#marc_nom").val(marca_nombre);
    $("#modelo_nom").val(modelo_nombre);
    $("#modelo_año").val(modelo_año);

    $("#listaTipoVeh").html("");
    $("#listaTipoVeh").attr("style","display:none;");
}
function buscarMarcasVehiculo() {
    let texto = $("#marc_nom_veh").val();

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/marca/buscarVehiculo",
        method: "POST",
        data: { texto: texto },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron marcas de vehículo</li>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <li class="list-group-item"
                        onclick="seleccionMarcaVehiculo(${rs.id}, '${rs.marc_nom}')">
                        ${rs.marc_nom}
                    </li>
                `;
            }
        }

        lista += "</ul>";
        $("#listaMarcasVehiculo").html(lista)
                                 .show()
                                 .css({ position:"absolute", zIndex:2000 });
    });
}

function seleccionMarcaVehiculo(id, nombre) {

    // Guardar la marca seleccionada
    $("#marca_id").val(id);
    $("#marc_nom").val(nombre);

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

    console.log("📌 Marca seleccionada:", nombre);
}



function grabar(){
    var observaciones = $("#recep_cab_observaciones").val().trim();
    var fecha = $("#recep_cab_fecha").val().trim();
    var plazo = $("#recep_cab_fecha_estimada").val().trim();
    var prioridad = $("#recep_cab_prioridad").val().trim();
    var kilometraje = $("#recep_cab_kilometraje").val().trim();
    var combustible = $("#recep_cab_nivel_combustible").val().trim();
    var sucursal = $("#suc_razon_social").val().trim();

    // Validar campos vacíos
    if (observaciones === ""
         || fecha === "" || plazo === "" || sucursal === ""
         || prioridad === ""|| kilometraje === ""|| combustible === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return; 
    }

    var endpoint = "recepcab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "recepcab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "recepcab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "recepcab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'recep_cab_fecha': $("#recep_cab_fecha").val(), 
            'recep_cab_fecha_estimada': $("#recep_cab_fecha_estimada").val(), 
            'recep_cab_observaciones': $("#recep_cab_observaciones").val(),  
            'recep_cab_prioridad': $("#recep_cab_prioridad").val(),  
            'recep_cab_kilometraje': $("#recep_cab_kilometraje").val(),  
            'recep_cab_nivel_combustible': $("#recep_cab_nivel_combustible").val(),
            'user_id': $("#user_id").val(), 
            'recep_cab_estado': estado,
            'clientes_id': $("#clientes_id").val(),
            'tipo_servicio_id': $("#tipo_servicio_id").val(),
            'tipo_vehiculo_id': $("#tipo_vehiculo_id").val(),
            'solicitudes_cab_id': $("#solicitudes_cab_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'operacion': $("#txtOperacion").val()
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
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                listarDetalles();
                
                // 🔄 Recarga si NO es pendiente o si es actualización
                if(resultado.registro.recep_cab_estado!="PENDIENTE" || $("#txtOperacion").val()==2){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
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
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").removeAttr("disabled");
    $("#tip_imp_nom").attr("disabled","true");
    $("#recep_det_cantidad_stock").attr("disabled","true");
    $("#recep_det_cantidad").removeAttr("disabled"); 
    $("#recep_det_costo").attr("disabled","true"); 

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#tip_imp_nom").attr("disabled","true");
    $("#recep_det_cantidad_stock").attr("disabled","true");
    $("#recep_det_cantidad").removeAttr("disabled"); 
    $("#recep_det_costo").attr("disabled","true")

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function grabarDetalle(){

    var endpoint = "recepcion_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "recepcion_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "recepcion_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "recep_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "original_item_id": $("#original_item_id").val(),
        "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
        "recep_det_cantidad":$("#recep_det_cantidad").val(),
        "recep_det_costo":$("#recep_det_costo").val(),
        "recep_det_cantidad_stock":$("#recep_det_cantidad_stock").val()
    }
})

.done(function(respuesta){
listarDetalles();
})
.fail(function(a,b,c){
    alert(c);
    console.log(a.responseText);
})

$("#btnAgregarDetalle").attr("style","display:inline");
$("#btnEditarDetalle").attr("style","display:inline");
$("#btnEliminarDetalle").attr("style","display:inline");
$("#btnGrabarDetalle").attr("style","display:none");

$("#txtOperacionDetalle").val(1);

$("#item_decripcion").val("");
$("#tip_imp_nom").val("");
$("#recep_det_cantidad_stock").val("");
$("#recep_det_cantidad").val("");
$("#recep_det_costo").val("");
}

function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscarItem",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_decripcion + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tip_imp_nom + "',"
                + rs.tipo_imp_tasa + ","
                + rs.cantidad_disponible + ")\">"
                + rs.item_decripcion + " (Stock: " + rs.cantidad_disponible + ")</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a, b, c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion, tipo_impuesto_id, item_costo, tip_imp_nom, tipo_imp_tasa, cantidad_disponible){
    // Asignar valores a los campos del detalle
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#recep_det_costo").val(item_costo); // <- Asignar el costo al campo del detalle
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);
    
    // Asignar cantidad disponible al campo correspondiente
    $("#recep_det_cantidad_stock").val(cantidad_disponible);

    // Cálculo de subtotal y total con impuesto (opcional)
    const cantidad = parseFloat($("#recep_det_cantidad").val()) || 0;
    const costo = parseFloat(item_costo) || 0;
    const tasaImpuesto = parseFloat(tipo_imp_tasa) || 0;

    const subtotal = cantidad * costo;
    const totalConImpuesto = subtotal + (subtotal * (tasaImpuesto / 100));

    $("#subtotal").val(subtotal);
    $("#totalConImpuesto").val(totalConImpuesto);

    // Ocultar lista de productos y enfocar formulario
    $("#listaProductos").html("").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral = 0;          // Total comprobante (sin IVA)
    var TotalIVA = 0;           // Total IVA

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

                let iva = 0;
                if (rs.tip_imp_nom === "IVA10") {
                    iva = subtotal / 11;
                } else if (rs.tip_imp_nom === "IVA5") {
                    iva = subtotal / 21;
                }

                // Generar fila
                lista += "<tr class='item-list' onclick=\"seleccionRecepcionDet("
                    + rs.item_id + ", '"
                    + rs.item_decripcion + "', "
                    + cantidad + ", "
                    + rs.recep_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tip_imp_nom + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.recep_det_cantidad_stock + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + rs.tip_imp_nom + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
                TotalIVA += iva;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='8' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        // Actualizar totales en el pie
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIVA));

        // Activar o desactivar Confirmar
        if ($("#recep_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionRecepcionDet(item_id, item_decripcion, recep_det_cantidad, recep_det_cantidad_stock, recep_det_costo, tipo_impuesto_id, tip_imp_nom) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#recep_det_cantidad").val(recep_det_cantidad);
    $("#recep_det_cantidad_stock").val(recep_det_cantidad_stock);
    $("#recep_det_costo").val(recep_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Calcular subtotal y IVA para mostrar en el formulario si quieres
    const subtotal = recep_det_cantidad * recep_det_costo;
    let iva = 0;
    if (tip_imp_nom === "IVA10") {
        iva = subtotal / 11;
    } else if (tip_imp_nom === "IVA5") {
        iva = subtotal / 21;
    }

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));

    $(".form-line").attr("class","form-line focused");
}
function cargarUserIdLogueado() {
    try {
        const datosSesion = JSON.parse(sessionStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.id) {
            $('#user_id').val(datosSesion.user.id);
            console.log('User ID cargado exitosamente:', datosSesion.user.id);
        } else {
            console.error('No se encontraron datos de sesión válidos');
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}


