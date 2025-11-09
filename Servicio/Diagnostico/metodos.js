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
            lista += "<tr class='item-list' onclick=\"seleccionRecepcion("
                + rs.id + ","                                // id_recepcion
                + rs.empresa_id + ","                         // empresa_id
                + rs.sucursal_id + ","                        // sucursal_id
                + rs.clientes_id + ","                        // clientes_id
                + rs.tipo_servicio_id + ", '"                 // tipo_servicio_id
                + esc(rs.emp_razon_social) + "', '"           // emp_razon_social
                + esc(rs.suc_razon_social) + "', '"           // suc_razon_social
                + esc(rs.encargado) + "', '"                  // encargado
                + esc(rs.recepcion) + "', '"                // ✅ solicitudes (TEXTO)
                + esc(rs.diag_cab_fecha) + "', '"   
                + esc(rs.diag_cab_estado) + "', '"           // recep_cab_estado
                + esc(rs.diag_cab_observaciones) + "', '"    // recep_cab_observaciones
                + esc(rs.diag_cab_prioridad) + "', '"        // recep_cab_prioridad
                + esc(rs.diag_cab_kilometraje) + "', '"      // recep_cab_kilometraje
                + esc(rs.diag_cab_nivel_combustible) + "', '"
                + esc(rs.tipo_servicio) + "', '"              // tipo_servicio (nombre)
                + esc(rs.cli_nombre) + "', '"                 // cli_nombre
                + esc(rs.cli_apellido) + "', '"               // cli_apellido
                + esc(rs.cli_ruc) + "', '"                    // cli_ruc
                + esc(rs.cli_telefono) + "', '"               // cli_telefono
                + esc(rs.cli_direccion) + "', '"              // cli_direccion
                + esc(rs.cli_correo) + "', "                  // cli_correo
                + (rs.recep_cab_id || 0)                // ✅ solicitudes_cab_id (AL FINAL)
                + ");\">";

            // celdas visibles
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.emp_razon_social || '') + "</td>";
            lista += "<td>" + (rs.suc_razon_social || '') + "</td>";
            lista += "<td>" + (rs.encargado || '') + "</td>";
            lista += "<td>" + (rs.recepcion || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_fecha || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_estado || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_observaciones || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_prioridad || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_kilometraje || '') + "</td>";
            lista += "<td>" + (rs.diag_cab_nivel_combustible || '') + "</td>";
            lista += "<td>" + (rs.tipo_servicio || '') + "</td>";
            lista += "<td>" + (rs.cli_nombre || '') + "</td>";
            lista += "<td>" + (rs.cli_apellido || '') + "</td>";
            lista += "<td>" + (rs.cli_ruc || '') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}
function seleccionRecepcion(
    id_recepcion, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    emp_razon_social, suc_razon_social, encargado, recepcion,      // ✅ solicitudes acá
    diag_cab_fecha, diag_cab_estado,diag_cab_observaciones, 
    diag_cab_prioridad, diag_cab_kilometraje,diag_cab_nivel_combustible,
    tipo_servicio, cli_nombre, cli_apellido, cli_ruc,cli_telefono, 
    cli_direccion, cli_correo, recep_cab_id      // ✅ id solicitud al final
) {
    // IDs
    $("#id").val(id_recepcion);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#recep_cab_id").val(recep_cab_id);

    // Texto “Solicitud NRO: 000000X”
    $("#recepcion").val(recepcion);

    // Datos visibles
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#diag_cab_fecha").val(diag_cab_fecha);
    $("#diag_cab_observaciones").val(diag_cab_observaciones);
    $("#diag_cab_prioridad").val(diag_cab_prioridad);
    $("#diag_cab_kilometraje").val(diag_cab_kilometraje);
    $("#diag_cab_nivel_combustible").val(diag_cab_nivel_combustible);
    $("#diag_cab_estado").val(diag_cab_estado);
    $("#tipo_serv_nombre").val(tipo_servicio);

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
            "user_id": $("#user_id").val(),
            "name": $("#recepcion").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);

        // Si no hay resultados
        if (!resultado || resultado.length === 0) {
            $("#listaRecepcion").html("<li class='list-group-item text-center text-muted'>No se encontraron solicitudes</li>");
            $("#listaRecepcion").attr("style", "display:block; position:absolute; z-index:2000;");
            return;
        }

        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionSolicitud("
                + rs.recep_cab_id + ","                              // 1 id solicitud
                + rs.empresa_id + ","                                       // 2 empresa
                + rs.sucursal_id + ", '"                                    // 3 sucursal
                + (rs.recepcion || '') + "', "                              // 4 texto solicitud
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
                + (rs.tipo_servicio || '') + "', '"               
                + (rs.recep_cab_prioridad || '') + "', '"               
                + (rs.recep_cab_kilometraje || '') + "', '"               
                + (rs.recep_cab_nivel_combustible || '') + "')\">"                   // 17 prioridad
                + (rs.recepcion || 'Sin descripción') + "</li>";
        }
        lista += "</ul>";

        $("#listaRecepcion").html(lista);
        $("#listaRecepcion").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la búsqueda:", textStatus, errorThrown);
    });
}

function seleccionSolicitud(
    recep_cab_id, empresa_id, sucursal_id,
    recepcion, clientes_id, cli_nombre, cli_apellido, tipo_servicio_id,
    cli_ruc, cli_direccion, cli_telefono, cli_correo,
    suc_razon_social, emp_razon_social, tipo_servicio,recep_cab_prioridad,
    recep_cab_kilometraje,recep_cab_nivel_combustible
) {
    // Asignar datos principales
    $("#recep_cab_id").val(recep_cab_id || 0);
    $("#recepcion").val(recepcion || '');
    $("#diag_cab_prioridad").val(recep_cab_prioridad || '');
    $("#diag_cab_kilometraje").val(recep_cab_kilometraje || '');
    $("#diag_cab_nivel_combustible").val(recep_cab_nivel_combustible || '');

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
    $("#listaRecepcion").html("");
    $("#listaRecepcion").attr("style", "display:none;");

    // Forzar enfoque visual en campos llenos
    $(".form-line").attr("class", "form-line focused");
}
function buscarTipoDiagnostico(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-diagnostico/read",
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
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionTipoDiagnostico(tipo_diagnostico_id,tipo_diag_nombre,tipo_diag_descrip){
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    $("#tipo_diag_descrip").val(tipo_diag_descrip);

    $("#listaTipoDiag").html("");
    $("#listaTipoDiag").attr("style","display:none;");
}
function grabar(){
    var observaciones = $("#diag_cab_observaciones").val().trim();
    var fecha = $("#diag_cab_fecha").val().trim();
    var prioridad = $("#diag_cab_prioridad").val().trim();
    var kilometraje = $("#diag_cab_kilometraje").val().trim();
    var combustible = $("#diag_cab_nivel_combustible").val().trim();
    var sucursal = $("#suc_razon_social").val().trim();

    // Validar campos vacíos
    if (observaciones === ""
         || fecha === ""  || sucursal === ""
         || prioridad === ""|| kilometraje === ""|| combustible === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return; 
    }

    var endpoint = "diagnosticocab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "diagnosticocab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "diagnosticocab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "diagnosticocab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'diag_cab_fecha': $("#diag_cab_fecha").val(), 
            'diag_cab_observaciones': $("#diag_cab_observaciones").val(),  
            'diag_cab_prioridad': $("#diag_cab_prioridad").val(),  
            'diag_cab_kilometraje': $("#diag_cab_kilometraje").val(),  
            'diag_cab_nivel_combustible': $("#diag_cab_nivel_combustible").val(),
            'user_id': $("#user_id").val(), 
            'diag_cab_estado': estado,
            'clientes_id': $("#clientes_id").val(),
            'tipo_diagnostico_id': $("#tipo_diagnostico_id").val(),
            'recep_cab_id': $("#recep_cab_id").val(),
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
                if(resultado.registro.diag_cab_estado!="PENDIENTE" || $("#txtOperacion").val()==2){
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
    $("#diag_det_cantidad_stock").attr("disabled","true");
    $("#diag_det_cantidad").removeAttr("disabled"); 
    $("#diag_det_costo").attr("disabled","true"); 

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#tip_imp_nom").attr("disabled","true");
    $("#diag_det_cantidad_stock").attr("disabled","true");
    $("#diag_det_cantidad").removeAttr("disabled"); 
    $("#diag_det_costo").attr("disabled","true");

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

    var endpoint = "diagnostico_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "diagnostico_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "diagnostico_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "diagnostico_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "original_item_id": $("#original_item_id").val(),
        "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
        "diag_det_cantidad":$("#diag_det_cantidad").val(),
        "diag_det_costo":$("#diag_det_costo").val(),
        "diag_det_cantidad_stock":$("#diag_det_cantidad_stock").val()
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
$("#diag_det_cantidad_stock").val("");
$("#diag_det_cantidad").val("");
$("#diag_det_costo").val("");
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
    $("#diag_det_costo").val(item_costo); // <- Asignar el costo al campo del detalle
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);
    
    // Asignar cantidad disponible al campo correspondiente
    $("#diag_det_cantidad_stock").val(cantidad_disponible);

    // Cálculo de subtotal y total con impuesto (opcional)
    const cantidad = parseFloat($("#diag_det_cantidad").val()) || 0;
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
                    + rs.diag_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tip_imp_nom + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.diag_det_cantidad_stock + "</td>";
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
        if ($("#diag_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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

function seleccionRecepcionDet(item_id, item_decripcion, diag_det_cantidad, diag_det_cantidad_stock, diag_det_costo, tipo_impuesto_id, tip_imp_nom) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#diag_det_cantidad").val(diag_det_cantidad);
    $("#diag_det_cantidad_stock").val(diag_det_cantidad_stock);
    $("#diag_det_costo").val(diag_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Calcular subtotal y IVA para mostrar en el formulario si quieres
    const subtotal = diag_det_cantidad * diag_det_costo;
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



