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
                title:'Listado de Orden de Servicio'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Orden de Servicio'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Orden de Servicio'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Orden de Servicio'
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
    $("#ord_serv_fecha").removeAttr("disabled");
    $("#ord_serv_fecha_vence").attr("disabled","true");
    $("#presupuesto_serv").removeAttr("disabled");
    $("#ord_serv_observaciones").removeAttr("disabled");
    $("#diagnostico").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnBuscarPromociones").removeAttr("disabled");
    $("#btnBuscarDescuentos").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);
    
    $("#ord_serv_fecha").removeAttr("disabled");
    $("#ord_serv_fecha_vence").attr("disabled","true");
    $("#presupuesto_serv").removeAttr("disabled");
    $("#ord_serv_observaciones").removeAttr("disabled");
    $("#diagnostico").attr("disabled","true");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
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
        url: getUrl() + "ordenserviciocab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        const esc = s => (s || '').toString().replace(/'/g, "\\'");

        let lista = "";
        for (let rs of resultado) {
            // 🧩 Cada fila del listado
            lista += "<tr class='item-list' onclick=\"seleccionOrdenServicio("
                + rs.id + ","                                // ID de orden
                + rs.empresa_id + ","                         // Empresa
                + rs.clientes_id + ", '"                      // Cliente
                + esc(rs.emp_razon_social) + "', '"           // Empresa nombre
                + esc(rs.suc_razon_social) + "', '"           // Sucursal nombre
                + esc(rs.ord_serv_fecha) + "', '"             // Fecha
                + esc(rs.ord_serv_fecha_vence) + "', '"       // Fecha vence
                + esc(rs.cli_nombre) + "', '"                 // Cliente nombre
                + esc(rs.cli_apellido) + "', '"               // Cliente apellido
                + esc(rs.cli_ruc) + "', '"                    // Cliente ruc
                + esc(rs.cli_telefono) + "', '"               // Teléfono
                + esc(rs.cli_direccion) + "', '"              // Dirección
                + esc(rs.cli_correo) + "', '"                 // Correo
                + esc(rs.presupuesto_serv) + "', '"           // Presupuesto relacionado
                + esc(rs.ord_serv_observaciones) + "', '"     // Observaciones
                + esc(rs.ord_serv_estado) + "', '"            // Estado
                + esc(rs.ord_serv_tipo) + "', '"              // Tipo
                + esc(rs.encargado) + "');\">";               // Encargado

            // 🧱 Columnas visibles en la tabla
            lista += `<td>${rs.id || ''}</td>`;
            lista += `<td>${rs.emp_razon_social || ''}</td>`;
            lista += `<td>${rs.suc_razon_social || ''}</td>`;
            lista += `<td>${rs.ord_serv_fecha || ''}</td>`;
            lista += `<td>${rs.ord_serv_fecha_vence || ''}</td>`;
            lista += `<td>${rs.cli_nombre || ''}</td>`;
            lista += `<td>${rs.cli_apellido || ''}</td>`;
            lista += `<td>${rs.cli_ruc || ''}</td>`;
            lista += `<td>${rs.cli_telefono || ''}</td>`;
            lista += `<td>${rs.cli_direccion || ''}</td>`;
            lista += `<td>${rs.cli_correo || ''}</td>`;
            lista += `<td>${rs.presupuesto_serv || ''}</td>`;
            lista += `<td>${rs.ord_serv_observaciones || 'N/A'}</td>`;
            lista += `<td>${rs.ord_serv_estado || 'N/A'}</td>`;
            lista += `<td>${rs.ord_serv_tipo || 'N/A'}</td>`;
            lista += `<td>${rs.encargado || ''}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}
function seleccionOrdenServicio(
    id, empresa_id, clientes_id, emp_razon_social, suc_razon_social,
    fecha, fecha_vence, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo,
    presupuesto_serv, observaciones, estado, tipo, encargado
) {
    // 🧩 Asignar valores principales
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#clientes_id").val(clientes_id);

    // 🏢 Empresa y Sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // 📅 Fechas
    $("#ord_serv_fecha").val(fecha);
    $("#ord_serv_fecha_vence").val(fecha_vence);

    // 👤 Datos del cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // 📋 Presupuesto y observaciones
    $("#presupuesto_serv").val(presupuesto_serv);
    $("#ord_serv_observaciones").val(observaciones);

    // 📄 Estado, tipo y encargado
    $("#ord_serv_estado").val(estado);
    $("#ord_serv_tipo").val(tipo);
    $("#encargado").val(encargado);

    // 🔹 Mostrar y ocultar secciones
    $("#registros").hide();
    $("#detalle").show();

    // 🔹 Control de botones
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar")
        .prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (estado === "PENDIENTE") {
        $("#btnEditar, #btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}
function buscarPresupuestoServ() {
    const texto = $("#presupuesto_serv").val();
    const user_id = $("#user_id").val();

    $.ajax({
        url: getUrl() + "presupuestoservcab/buscar",
        method: "POST",
        data: { texto: texto, user_id: user_id },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";

        if (!resultado || resultado.length === 0) {
            lista = "<div class='list-group-item'>No se encontraron presupuestos confirmados</div>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <div class="list-group-item" style="cursor:pointer"
                        onclick="seleccionarPresupuestoServ(
                            ${rs.presupuestos_serv_cab_id},
                            '${(rs.presupuesto_serv || '').replace(/'/g, "\\'")}',

                            ${rs.empresa_id}, '${(rs.emp_razon_social || '').replace(/'/g, "\\'")}',
                            ${rs.sucursal_id}, '${(rs.suc_razon_social || '').replace(/'/g, "\\'")}',

                            ${rs.tipo_servicio_id}, '${(rs.tipo_serv_nombre || '').replace(/'/g, "\\'")}',

                            ${rs.clientes_id}, '${(rs.cli_nombre || '').replace(/'/g, "\\'")}',
                            '${(rs.cli_apellido || '').replace(/'/g, "\\'")}',
                            '${(rs.cli_ruc || '').replace(/'/g, "\\'")}',
                            '${(rs.cli_telefono || '').replace(/'/g, "\\'")}',
                            '${(rs.cli_direccion || '').replace(/'/g, "\\'")}',
                            '${(rs.cli_correo || '').replace(/'/g, "\\'")}',

                            ${rs.diagnostico_cab_id},
                            '${(rs.diag_cab_observaciones || '').replace(/'/g, "\\'")}',
                            '${(rs.diag_cab_prioridad || '').replace(/'/g, "\\'")}',
                            '${(rs.diag_cab_nivel_combustible || '').replace(/'/g, "\\'")}',
                            '${(rs.diag_cab_kilometraje || '').replace(/'/g, "\\'")}',
                            '${(rs.encargado || '').replace(/'/g, "\\'")}',
                            '${(rs.pres_serv_cab_fecha_vence || '').replace(/'/g, "\\'")}'
                        );">
                        <b>${rs.presupuesto_serv}</b><br>
                        Estado: ${rs.pres_serv_cab_estado} – Encargado: ${rs.encargado}
                    </div>
                `;
            }
        }

        $("#listaPresupuestoServ").html(lista).show();
    })
    .fail(function(xhr) {
        console.error(xhr.responseText);
        alert("Error al buscar presupuestos de servicio.");
    });
}

function seleccionarPresupuestoServ(
    id, presupuesto_serv,
    empresa_id, emp_razon_social,
    sucursal_id, suc_razon_social,
    tipo_servicio_id, tipo_serv_nombre,
    clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo,
    diagnostico_cab_id, diag_cab_observaciones, diag_cab_prioridad, diag_cab_nivel_combustible, diag_cab_kilometraje,
    encargado, fecha_vence_presupuesto
) {
    // 🧩 Guardar IDs
    $("#presupuestos_serv_cab_id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#clientes_id").val(clientes_id);
    $("#diagnostico_cab_id").val(diagnostico_cab_id);

    // 🧾 Mostrar texto del presupuesto seleccionado
    $("#presupuesto_serv").val(presupuesto_serv);

    // 🏢 Empresa y Sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // 📅 Fecha de vencimiento del presupuesto
    $("#pres_serv_cab_fecha_vence").val(fecha_vence_presupuesto || "");
    $("#ord_serv_fecha_vence").val(fecha_vence_presupuesto || ""); // si existe en tu orden

    // 👤 Datos del cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // ⚙️ Diagnóstico
    $("#diagnostico").val(diag_cab_observaciones || "");

    // Campos adicionales (si existen en tu formulario)
    $("#diag_prioridad").val?.(diag_cab_prioridad || "");
    $("#diag_combustible").val?.(diag_cab_nivel_combustible || "");
    $("#diag_kilometraje").val?.(diag_cab_kilometraje || "");
    $("#encargado").val?.(encargado || "");

    // 🧩 Ocultar la lista y aplicar estilo
    $("#listaPresupuestoServ").hide();
    $(".form-line").addClass("focused");
}

function grabar() {
    const observaciones = ($("#ord_serv_observaciones").val() || "").trim();
    const fecha = ($("#ord_serv_fecha").val() || "").trim();
    const fechaVence = ($("#ord_serv_fecha_vence").val() || "").trim();
    const empresa = parseInt($("#empresa_id").val()) || 0;
    const sucursal = parseInt($("#sucursal_id").val()) || 0;
    const presupuesto = parseInt($("#presupuestos_serv_cab_id").val()) || 0;
    const cliente = parseInt($("#clientes_id").val()) || 0;
    const tipo = ($("#ord_serv_tipo").val() || "NORMAL").trim();

    // ✅ Validar campos obligatorios
    if (!observaciones || !fecha || !fechaVence || empresa <= 0 || sucursal <= 0 || presupuesto <= 0 || cliente <= 0) {
        swal({
            title: "Error",
            text: "Todos los campos obligatorios deben estar completos.",
            type: "error"
        });
        return;
    }

    // 🔹 Determinar endpoint, método y estado según la operación
    let endpoint = "ordenserviciocab/create";
    let metodo = "POST";
    let estado = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "ordenserviciocab/update/" + $("#id").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) {
        endpoint = "ordenserviciocab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if ($("#txtOperacion").val() == 4) {
        endpoint = "ordenserviciocab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    // 📦 Envío de datos
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'ord_serv_fecha': fecha,
            'ord_serv_fecha_vence': fechaVence,
            'ord_serv_observaciones': observaciones,
            'ord_serv_estado': estado,
            'ord_serv_tipo': tipo,
            'empresa_id': empresa,
            'sucursal_id': sucursal,
            'presupuesto_serv_cab_id': presupuesto,
            'clientes_id': cliente,
            'user_id': $("#user_id").val(),
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function() {
            if (resultado.tipo === "success") {
                $("#id").val(resultado.registro.id);
                $("#detalle").show();
                listarDetalles();

                // 🔄 Recargar si la orden fue confirmada o actualizada
                if (resultado.registro.ord_serv_estado !== "PENDIENTE" || $("#txtOperacion").val() == 2) {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
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
    $("#pres_serv_det_cantidad_stock").attr("disabled","true");
    $("#pres_serv_det_cantidad").removeAttr("disabled"); 
    $("#pres_serv_det_costo").attr("disabled","true"); 

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#tip_imp_nom").attr("disabled","true");
    $("#pres_serv_det_cantidad_stock").attr("disabled","true");
    $("#pres_serv_det_cantidad").removeAttr("disabled"); 
    $("#pres_serv_det_costo").attr("disabled","true")

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

    var endpoint = "presupuesto_serv_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "presupuesto_serv_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "presupuesto_serv_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "presupuesto_serv_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "original_item_id": $("#original_item_id").val(),
        "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
        "pres_serv_det_cantidad":$("#pres_serv_det_cantidad").val(),
        "pres_serv_det_costo":$("#pres_serv_det_costo").val(),
        "pres_serv_det_cantidad_stock":$("#pres_serv_det_cantidad_stock").val()
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
$("#pres_serv_det_cantidad_stock").val("");
$("#pres_serv_det_cantidad").val("");
$("#pres_serv_det_costo").val("");
}

function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val(),
            "tipo_descripcion": "PRODUCTO"
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
    $("#pres_serv_det_costo").val(item_costo); // <- Asignar el costo al campo del detalle
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);
    
    // Asignar cantidad disponible al campo correspondiente
    $("#pres_serv_det_cantidad_stock").val(cantidad_disponible);

    // Cálculo de subtotal y total con impuesto (opcional)
    const cantidad = parseFloat($("#pres_serv_det_cantidad").val()) || 0;
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
    let cantidadDetalle = 0;
    let TotalGral = 0; // total sin impuestos
    let TotalIVA = 0;  // total IVA

    $.ajax({
        url: getUrl() + "presupuesto_serv_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        let lista = "";

        // Traer datos de promoción y descuento desde cabecera
        const promoModo = $("#tipo_prom_modo").val() || "";
        const promoValor = parseFloat($("#tipo_prom_valor").val()) || 0;
        const descPorcentaje = parseFloat($("#desc_cab_porcentaje").val()) || 0;

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.pres_serv_det_cantidad) || 0;
                const costo = parseFloat(rs.pres_serv_det_costo) || 0;
                const subtotal = cantidad * costo;

                // IVA
                let iva = 0;
                if (rs.tip_imp_nom === "IVA10") iva = subtotal / 11;
                else if (rs.tip_imp_nom === "IVA5") iva = subtotal / 21;

                // Descuento
                let descuento = 0;
                if (descPorcentaje > 0) {
                    descuento = subtotal * (descPorcentaje / 100);
                }

                // Promoción
                let promo = 0;
                if (promoModo === "MONTO_FIJO") {
                    promo = promoValor;
                } else if (promoModo === "PORCENTAJE") {
                    promo = subtotal * (promoValor / 100);
                } else if (promoModo === "2X1") {
                    promo = subtotal / 2;
                }

                // Total después de aplicar descuento y promoción
                const totalFinal = subtotal - descuento - promo;

                // 🔹 Sumar a los totales generales
                TotalGral += totalFinal;
                TotalIVA += iva;
                cantidadDetalle++;

                // 🔹 Fila HTML
                lista += `
                    <tr class='item-list'>
                        <td>${rs.item_id}</td>
                        <td>${rs.item_decripcion}</td>
                        <td class='text-right'>${cantidad}</td>
                        <td class='text-right'>${rs.pres_serv_det_cantidad_stock}</td>
                        <td class='text-right'>${formatearNumero(costo)}</td>
                        <td>${rs.tip_imp_nom}</td>
                        <td class='text-right'>${formatearNumero(subtotal)}</td>
                        <td class='text-right'>${formatearNumero(iva)}</td>
                        <td class='text-right'>${formatearNumero(descuento)}</td>
                        <td>${promoModo || "N/A"}</td>
                        <td class='text-right'>${formatearNumero(promoValor)}</td>
                        <td class='text-right'>${formatearNumero(descuento)}</td>
                        <td class='text-right'>${formatearNumero(promo)}</td>
                        <td class='text-right'><b>${formatearNumero(totalFinal)}</b></td>
                    </tr>`;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='14' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        // ✅ Actualizar los totales en el pie
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIVA));

        // Activar Confirmar si corresponde
        if ($("#pres_serv_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function (xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}



function seleccionPresupuestoDet(item_id, item_decripcion, pres_serv_det_cantidad, pres_serv_det_cantidad_stock, pres_serv_det_costo, tipo_impuesto_id, tip_imp_nom) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#pres_serv_det_cantidad").val(pres_serv_det_cantidad);
    $("#pres_serv_det_cantidad_stock").val(pres_serv_det_cantidad_stock);
    $("#pres_serv_det_costo").val(pres_serv_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // 🧩 Cálculo base
    const cantidad = parseFloat(pres_serv_det_cantidad) || 0;
    const costo = parseFloat(pres_serv_det_costo) || 0;
    const subtotal = cantidad * costo;

    // 🧾 IVA
    let iva = 0;
    if (tip_imp_nom === "IVA10") {
        iva = subtotal / 11;
    } else if (tip_imp_nom === "IVA5") {
        iva = subtotal / 21;
    }

    // 💸 Descuento (si aplica)
    const descPorcentaje = parseFloat($("#desc_cab_porcentaje").val()) || 0;
    const descuento = subtotal * (descPorcentaje / 100);

    // 🎁 Promoción (si aplica)
    const promoModo = $("#tipo_prom_modo").val() || "";
    const promoValor = parseFloat($("#tipo_prom_valor").val()) || 0;
    let promo = 0;

    if (promoModo === "MONTO_FIJO") {
        promo = promoValor;
    } else if (promoModo === "PORCENTAJE") {
        promo = subtotal * (promoValor / 100);
    } else if (promoModo === "2X1") {
        promo = subtotal / 2;
    }

    // 🧮 Total final (precio neto del ítem)
    const totalFinal = subtotal - descuento - promo;

    // 🧷 Mostrar valores (si tenés los campos en tu formulario detalle)
    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));
    $("#descuento").val(formatearNumero(descuento));
    $("#promocion").val(formatearNumero(promo));
    $("#total_final").val(formatearNumero(totalFinal));

    // 🔹 Mantener el estilo visual AdminBSB
    $(".form-line").attr("class", "form-line focused");
}



