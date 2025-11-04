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
            + rs.empresa_id + ","                        // Empresa
            + rs.clientes_id + ","                       // Cliente
            + rs.diagnostico_cab_id + ","                // ID diagnóstico
            + rs.tipo_servicio_id + ", '"                // ID tipo servicio
            + esc(rs.emp_razon_social) + "', '"          // Empresa nombre
            + esc(rs.suc_razon_social) + "', '"          // Sucursal nombre
            + esc(rs.ord_serv_fecha) + "', '"            // Fecha
            + esc(rs.ord_serv_fecha_vence) + "', '"      // Fecha vence
            + esc(rs.cli_nombre) + "', '"                // Cliente nombre
            + esc(rs.cli_apellido) + "', '"              // Cliente apellido
            + esc(rs.cli_ruc) + "', '"                   // RUC
            + esc(rs.cli_telefono) + "', '"              // Teléfono
            + esc(rs.cli_direccion) + "', '"             // Dirección
            + esc(rs.cli_correo) + "', '"                // Correo
            + esc(rs.presupuesto_serv) + "', '"          // Presupuesto
            + esc(rs.diagnostico || '') + "', '"         // 👈 Diagnóstico (nuevo)
            + esc(rs.tipo_serv_nombre || '') + "', '"    // 👈 Tipo de servicio (nuevo)
            + esc(rs.ord_serv_observaciones) + "', '"    // Observaciones
            + esc(rs.ord_serv_estado) + "', '"           // Estado
            + esc(rs.ord_serv_tipo) + "', '"             // Tipo
            + esc(rs.encargado) + "');\">";              // Encargado

            // 🧱 Columnas visibles en la tabla
            lista += `<td>${rs.id || ''}</td>`;
            lista += `<td>${rs.emp_razon_social || ''}</td>`;
            lista += `<td>${rs.suc_razon_social || ''}</td>`;
            lista += `<td>${rs.ord_serv_fecha || ''}</td>`;
            lista += `<td>${rs.ord_serv_fecha_vence || ''}</td>`;
            lista += `<td>${rs.cli_nombre || ''}</td>`;
            lista += `<td>${rs.cli_apellido || ''}</td>`;
            lista += `<td>${rs.cli_ruc || ''}</td>`;
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
    id, empresa_id, clientes_id, diagnostico_cab_id, tipo_servicio_id,
    emp_razon_social, suc_razon_social,
    fecha, fecha_vence, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo,
    presupuesto_serv, diagnostico, tipo_serv_nombre,  // 👈 nuevos
    observaciones, estado, tipo, encargado
) {
    // 🧩 Asignar valores principales
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#clientes_id").val(clientes_id);
    $("#diagnostico_cab_id").val(diagnostico_cab_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);

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

    // 📋 Presupuesto, diagnóstico y tipo de servicio
    $("#presupuesto_serv").val(presupuesto_serv);
    $("#diagnostico").val(diagnostico);
    $("#tipo_serv_nombre").val(tipo_serv_nombre);

    // 📋 Observaciones, estado y tipo
    $("#ord_serv_observaciones").val(observaciones);
    $("#ord_serv_estado").val(estado);
    $("#ord_serv_tipo").val(tipo);
    $("#encargado").val(encargado);
    // Cargar detalles asociados
    listarDetalles();
    // 🔹 Mostrar secciones y activar estilo
    $("#registros").hide();
    $("#detalle").show();
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
function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"ordenserviciodet/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionOrdenServDet("+rs.item_id+",'"+rs.item_decripcion+"',"+rs.orden_serv_det_cantidad+");\">";
                lista = lista + "<td>" + rs.item_id + "</td>";
                lista = lista + "<td>" + rs.item_decripcion + "</td>";
                lista = lista + "<td>" + rs.orden_serv_det_cantidad + "</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ord_serv_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}


