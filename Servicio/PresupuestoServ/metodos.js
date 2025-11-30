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
    $("#pres_serv_cab_fecha").removeAttr("disabled");
    $("#pres_serv_cab_fecha_vence").removeAttr("disabled");
    $("#diagnostico").removeAttr("disabled");
    $("#pres_serv_cab_observaciones").removeAttr("disabled");
    $("#prom_cab_nombre").removeAttr("disabled");
    $("#desc_cab_nombre").removeAttr("disabled");
    $("#tipo_serv_nombre").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_desc_nombre").attr("disabled","true");
    $("#tipo_prom_nombre").attr("disabled","true");
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
    
    $("#pres_serv_cab_fecha").removeAttr("disabled");
    $("#pres_serv_cab_fecha_vence").attr("disabled","true");
    $("#diagnostico").removeAttr("disabled");
    $("#pres_serv_cab_observaciones").removeAttr("disabled");
    $("#prom_cab_nombre").attr("disabled","true");
    $("#desc_cab_nombre").removeAttr("disabled");
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#tipo_desc_nombre").attr("disabled","true");
    $("#tipo_prom_nombre").attr("disabled","true");

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
        url: getUrl() + "presupuestoservcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        const esc = s => (s || '').toString().replace(/'/g, "\\'");

        let lista = "";
        for (let rs of resultado) {
            lista += "<tr class='item-list' onclick=\"seleccionPresupuesto("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.clientes_id + ","
                + rs.tipo_servicio_id + ","
                + (rs.promociones_cab_id || null) + ","
                + (rs.descuentos_cab_id || null) + ","
                + (rs.diagnostico_cab_id || 0) + ", '"
                + esc(rs.emp_razon_social) + "', '"
                + esc(rs.suc_razon_social) + "', '"
                + esc(rs.pres_serv_cab_fecha) + "', '"
                + esc(rs.pres_serv_cab_fecha_vence) + "', '"
                + esc(rs.cli_nombre) + "', '"
                + esc(rs.cli_apellido) + "', '"
                + esc(rs.cli_ruc) + "',  '"
                + esc(rs.cli_telefono) + "', '"
                + esc(rs.cli_direccion) + "', '"
                + esc(rs.cli_correo) + "', '"
                + esc(rs.diagnostico) + "', '"
                + esc(rs.pres_serv_cab_observaciones) + "', '"
                + esc(rs.prom_cab_nombre) + "', '"
                + esc(rs.desc_cab_nombre) + "', '"
                + esc(rs.tipo_servicio) + "', '"
                + esc(rs.tipo_descuentos) + "', '"
                + esc(rs.tipo_promociones) + "', '"
                + esc(rs.pres_serv_cab_estado) + "', '"
                + esc(rs.tipo_prom_modo) + "', "
                + (rs.tipo_prom_valor || 0) + ", "
                + (rs.desc_cab_porcentaje || 0) + ");\">";

            lista += `<td>${rs.id || ''}</td>`;
            lista += `<td>${rs.emp_razon_social || ''}</td>`;
            lista += `<td>${rs.suc_razon_social || ''}</td>`;
            lista += `<td>${rs.pres_serv_cab_fecha || ''}</td>`;
            lista += `<td>${rs.pres_serv_cab_fecha_vence || ''}</td>`;
            lista += `<td>${rs.cli_nombre || ''}</td>`;
            lista += `<td>${rs.cli_apellido || ''}</td>`;
            lista += `<td>${rs.cli_ruc || ''}</td>`;
            lista += `<td>${rs.cli_telefono || ''}</td>`;
            lista += `<td>${rs.cli_direccion || ''}</td>`;
            lista += `<td>${rs.cli_correo || ''}</td>`;
            lista += `<td>${rs.pres_serv_cab_estado || 'N/A'}</td>`;
            lista += `<td>${rs.diagnostico || 'N/A'}</td>`;
            lista += `<td>${rs.pres_serv_cab_observaciones || 'N/A'}</td>`;
            lista += `<td>${rs.prom_cab_nombre || 'N/A'}</td>`;
            lista += `<td>${rs.desc_cab_nombre || 'N/A'}</td>`;
            lista += `<td>${rs.tipo_servicio || 'N/A'}</td>`;
            lista += `<td>${rs.tipo_descuentos || 'N/A'}</td>`;
            lista += `<td>${rs.tipo_promociones || 'N/A'}</td>`;
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


function seleccionPresupuesto(
    id, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    promociones_cab_id, descuentos_cab_id, diagnostico_cab_id,
    emp_razon_social, suc_razon_social,
    fecha, fecha_vence, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo,
    diagnostico, observaciones, prom_cab_nombre, desc_cab_nombre,
    tipo_servicio, tipo_descuentos, tipo_promociones, estado,
    tipo_prom_modo, tipo_prom_valor, desc_cab_porcentaje
) {
    // 🧩 Asignar valores principales
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#promociones_cab_id").val(promociones_cab_id);
    $("#descuentos_cab_id").val(descuentos_cab_id);
    $("#diagnostico_cab_id").val(diagnostico_cab_id);

    // 🏢 Empresa y Sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // 📅 Fechas
    $("#pres_serv_cab_fecha").val(fecha);
    $("#pres_serv_cab_fecha_vence").val(fecha_vence);

    // 👤 Datos del cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // ⚙️ Diagnóstico y observaciones
    $("#diagnostico").val(diagnostico);
    $("#pres_serv_cab_observaciones").val(observaciones);

    // 🎁 Promoción y Descuento
    $("#prom_cab_nombre").val(prom_cab_nombre);
    $("#desc_cab_nombre").val(desc_cab_nombre);

    // 🔧 Tipos
    $("#tipo_serv_nombre").val(tipo_servicio);
    $("#tipo_desc_nombre").val(tipo_descuentos);
    $("#tipo_prom_nombre").val(tipo_promociones);

    // 📄 Estado
    $("#pres_serv_cab_estado").val(estado);

    // 🟢 NUEVOS CAMPOS: valores usados para cálculos en el detalle
    $("#tipo_prom_modo").val(tipo_prom_modo || "");
    $("#tipo_prom_valor").val(tipo_prom_valor || 0);
    $("#desc_cab_porcentaje").val(desc_cab_porcentaje || 0);

    // 🔹 Mostrar y ocultar secciones
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    // Cargar detalles asociados
    listarDetalles();

    // 🔹 Control de botones
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar, #btnBuscarPromocion, #btnBuscarDescuento")
        .prop("disabled", true);

    $("#btnCancelar").prop("disabled", false);

    if (estado === "PENDIENTE") {
        $("#btnEliminar, #btnEditar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (estado === "CONFIRMADO") {
        $("#btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}


function buscarDiagnostico() {
    const texto = $("#diagnostico").val();
    const user_id = $("#user_id").val();

    $.ajax({
        url: getUrl() + "diagnosticocab/buscar",
        method: "POST",
        data: { texto: texto, user_id: user_id },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";

        if (resultado.length === 0) {
            lista = "<div class='list-group-item'>No se encontraron diagnósticos</div>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <div class="list-group-item" style="cursor:pointer"
                        onclick="seleccionarDiagnostico(
                            ${rs.diagnostico_cab_id},
                            '${rs.diagnostico}',
                            ${rs.empresa_id}, '${rs.emp_razon_social}',
                            ${rs.sucursal_id}, '${rs.suc_razon_social}',
                            ${rs.tipo_diagnostico_id || 0}, '${rs.tipo_diag_nombre || ''}',
                            ${rs.tipo_servicio_id || 0}, '${rs.tipo_serv_nombre || ''}',
                            ${rs.clientes_id}, '${rs.cli_nombre}', '${rs.cli_apellido}', '${rs.cli_ruc}', '${rs.cli_telefono}', '${rs.cli_direccion}', '${rs.cli_correo}'
                        );">
                        <b>${rs.diagnostico}</b><br>
                        Servicio: <b>${rs.tipo_serv_nombre || 'N/A'}</b><br>
                        Estado: ${rs.diag_cab_estado} – Prioridad: ${rs.diag_cab_prioridad}
                    </div>
                `;
            }
        }

        $("#listaDiagnostico").html(lista).show();
        $("#listaDiagnostico").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) {
        console.error(xhr.responseText);
        alert("Error al buscar diagnósticos.");
    });
}
function seleccionarDiagnostico(
    id, diagnostico,
    empresa_id, emp_razon_social,
    sucursal_id, suc_razon_social,
    tipo_diagnostico_id, tipo_diag_nombre,
    tipo_servicio_id, tipo_serv_nombre,
    clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo
) {
    // Guardar IDs
    $("#diagnostico_cab_id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#clientes_id").val(clientes_id);

    // Mostrar datos visibles
    $("#diagnostico").val(diagnostico);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    $("#tipo_serv_nombre").val(tipo_serv_nombre);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // Ocultar lista y aplicar estilo
    $("#listaDiagnostico").hide();
    $(".form-line").addClass("focused");
}

function buscarPromociones() {
    const texto = $("#prom_cab_nombre").val();
    const user_id = $("#user_id").val();

    $.ajax({
        url: getUrl() + "promocionescab/buscar",
        method: "POST",
        data: { texto: texto, user_id: user_id },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";

        if (resultado.length === 0) {
            lista = "<div class='list-group-item'>No se encontraron promociones</div>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <div class="list-group-item" 
                        style="cursor:pointer"
                        onclick="seleccionarPromocion(${rs.promociones_cab_id}, '${rs.prom_cab_nombre}', '${rs.prom_cab_fecha_inicio}', '${rs.prom_cab_fecha_fin}', '${rs.tipo_prom_nombre}');">
                        <b>${rs.prom_cab_nombre}</b> - ${rs.tipo_prom_nombre}<br>
                        Vigencia: ${rs.prom_cab_fecha_inicio} al ${rs.prom_cab_fecha_fin}
                    </div>
                `;
            }
        }

        $("#listaPromociones").html(lista).show();
        $("#listaPromociones").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) {
        console.error(xhr.responseText);
        alert("Error al buscar promociones.");
    });
}
function seleccionarPromocion(id, nombre, fecha_inicio, fecha_fin, tipo_prom_nombre) {
    // Autocompleta los campos principales
    $("#prom_cab_nombre").val(nombre + " (" + fecha_inicio + " al " + fecha_fin + ")");
    $("#promociones_cab_id").val(id);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);

    // Oculta la lista
    $("#listaPromociones").hide();

    // Marca los inputs como “focus” para mantener el diseño del form
    $(".form-line").addClass("focused");
}
function buscarDescuentos() {
    const texto = $("#desc_cab_nombre").val();
    const user_id = $("#user_id").val();

    $.ajax({
        url: getUrl() + "descuentoscab/buscar",
        method: "POST",
        data: { texto: texto, user_id: user_id },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";

        if (resultado.length === 0) {
            lista = "<div class='list-group-item'>No se encontraron descuentos</div>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <div class="list-group-item"
                        style="cursor:pointer"
                        onclick="seleccionarDescuento(${rs.descuentos_cab_id}, '${rs.desc_cab_nombre}', '${rs.desc_cab_porcentaje}', '${rs.desc_cab_fecha_inicio}', '${rs.desc_cab_fecha_fin}', '${rs.tipo_desc_nombre}');">
                        <b>${rs.desc_cab_nombre}</b> - ${rs.tipo_desc_nombre}<br>
                        ${rs.desc_cab_porcentaje}% - Vigencia: ${rs.desc_cab_fecha_inicio} al ${rs.desc_cab_fecha_fin}
                    </div>
                `;
            }
        }

        $("#listaDescuentos").html(lista).show();
        $("#listaDescuentos").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) {
        console.error(xhr.responseText);
        alert("Error al buscar descuentos.");
    });
}
function seleccionarDescuento(id, nombre, porcentaje, fecha_inicio, fecha_fin, tipo_desc_nombre) {
    $("#desc_cab_nombre").val(nombre + " (" + porcentaje + "% - " + fecha_inicio + " al " + fecha_fin + ")");
    $("#descuentos_cab_id").val(id);
    $("#tipo_desc_nombre").val(tipo_desc_nombre);
    $("#listaDescuentos").hide();
    $(".form-line").addClass("focused");
}


function grabar() {
    const observaciones = ($("#pres_serv_cab_observaciones").val() || "").trim();
    const fecha = ($("#pres_serv_cab_fecha").val() || "").trim();
    const fechaVence = ($("#pres_serv_cab_fecha_vence").val() || "").trim();
    const empresa = parseInt($("#empresa_id").val()) || 0;
    const sucursal = parseInt($("#sucursal_id").val()) || 0;
    const diagnostico = parseInt($("#diagnostico_cab_id").val()) || null;
    const cliente = parseInt($("#clientes_id").val()) || 0;

    // 🧩 Registro en consola para detectar cuál campo está vacío
    console.log("🔍 Verificando campos obligatorios antes de enviar:");
    console.log({
        observaciones,
        fecha,
        fechaVence,
        empresa,
        sucursal,
        diagnostico,
        cliente
    });

    // ✅ Validar solo campos realmente obligatorios
    if (!observaciones || !fecha || !fechaVence || empresa <= 0 || sucursal <= 0 || !diagnostico || cliente <= 0) {
        swal({
            title: "Error",
            text: "Todos los campos obligatorios deben estar completos.",
            type: "error"
        });
        return;
    }

    // 🔹 Determinar endpoint, método y estado según la operación
    let endpoint = "presupuestoservcab/create";
    let metodo = "POST";
    let estado = "PENDIENTE";
    
    switch ($("#txtOperacion").val()) {
        case "2":
            endpoint = "presupuestoservcab/update/" + $("#id").val();
            metodo = "PUT";
            break;
        case "3":
            endpoint = "presupuestoservcab/anular/" + $("#id").val();
            metodo = "PUT";
            estado = "ANULADO";
            break;
        case "4":
            endpoint = "presupuestoservcab/confirmar/" + $("#id").val();
            metodo = "PUT";
            estado = "CONFIRMADO";
            break;
    }

    // 🧩 Obtener los valores opcionales de forma segura
    const promociones = $("#promociones_cab_id").val() || null;
    const descuentos = $("#descuentos_cab_id").val() || null;

    // 📦 Envío de datos al backend
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            id: $("#id").val(),
            pres_serv_cab_fecha: fecha,
            pres_serv_cab_fecha_vence: fechaVence,
            pres_serv_cab_observaciones: observaciones,
            pres_serv_cab_estado: estado,
            empresa_id: empresa,
            sucursal_id: sucursal,
            diagnostico_cab_id: diagnostico,
            promociones_cab_id: promociones,
            descuentos_cab_id: descuentos,
            clientes_id: cliente,
            user_id: $("#user_id").val(),
            operacion: $("#txtOperacion").val()
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

                // Deshabilitar búsquedas de promo/descuento al confirmar
                $("#btnBuscarPromociones, #btnBuscarDescuentos").prop("disabled", true);

                // 🔄 Recargar si se confirmó o se actualizó
                if (resultado.registro.pres_serv_cab_estado !== "PENDIENTE" || $("#txtOperacion").val() == 2) {
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



