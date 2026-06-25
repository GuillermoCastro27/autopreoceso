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
    $("#tipo_diag_nombre").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#equipo_nombre").removeAttr("disabled");

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
    $("#tipo_diag_nombre").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");
    $("#equipo_nombre").removeAttr("disabled");

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

        const esc = s => (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'");

        let lista = "";

        resultado.forEach(rs => {

            lista += `
            <tr class="item-list" onclick="seleccionOrdenServicio(
                ${rs.id},
                ${rs.empresa_id},
                ${rs.sucursal_id},
                ${rs.clientes_id},
                ${rs.diagnostico_cab_id || 0},
                ${rs.tipo_diagnostico_id || 0},
                ${rs.tipo_vehiculo_id || 0},
                ${rs.equipo_trabajo_id || 0},
                ${rs.presupuesto_serv_cab_id}, 

                '${esc(rs.emp_razon_social)}',
                '${esc(rs.suc_razon_social)}',

                '${esc(rs.ord_serv_fecha)}',
                '${esc(rs.ord_serv_fecha_vence)}',

                '${esc(rs.cli_nombre)}',
                '${esc(rs.cli_apellido)}',
                '${esc(rs.cli_ruc)}',
                '${esc(rs.cli_telefono)}',
                '${esc(rs.cli_direccion)}',
                '${esc(rs.cli_correo)}',

                '${esc(rs.presupuesto_serv)}',
                '${esc(rs.diagnostico || "")}',
                '${esc(rs.tipo_diag_nombre || "")}',

                '${esc(rs.ord_serv_observaciones)}',
                '${esc(rs.ord_serv_estado)}',
                '${esc(rs.ord_serv_tipo)}',
                '${esc(rs.encargado)}',
                '${esc(rs.tip_veh_nombre)}',
                ${rs.tip_veh_capacidad || 0},
                '${esc(rs.tip_veh_combustible)}',
                '${esc(rs.tip_veh_categoria)}',
                '${esc(rs.mar_nom)}',
                '${esc(rs.modelo_nom)}',
                '${esc(rs.equipo_nombre)}',
                '${esc(rs.equipo_descripcion)}',
                '${esc(rs.equipo_categoria)}',
                ${rs.tip_serv_precio || 0}
            )">
                <td>${rs.id || ""}</td>
                <td>${rs.emp_razon_social || ""}</td>
                <td>${rs.suc_razon_social || ""}</td>
                <td>${rs.ord_serv_fecha || ""}</td>
                <td>${rs.ord_serv_fecha_vence || ""}</td>
                <td>${rs.cli_nombre || ""}</td>
                <td>${rs.cli_apellido || ""}</td>
                <td>${rs.cli_ruc || ""}</td>
                <td>${rs.presupuesto_serv || ""}</td>
                <td>${rs.ord_serv_observaciones || "N/A"}</td>
                <td>${rs.ord_serv_estado || "N/A"}</td>
                <td>${rs.ord_serv_tipo || "N/A"}</td>
                <td>${rs.funcionario || rs.name || rs.encargado || '-'}</td>
            </tr>`;
        });

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr) {
        mostrarErrores(xhr);
    });
}
function seleccionOrdenServicio(
    id, empresa_id, sucursal_id, clientes_id,
    diagnostico_cab_id, tipo_diagnostico_id, tipo_vehiculo_id, equipo_trabajo_id,
    presupuesto_serv_cab_id,
    emp_razon_social, suc_razon_social,
    fecha, fecha_vence,
    cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo
    ,presupuesto_serv, diagnostico, tipo_diag_nombre,
    observaciones, estado, tipo, encargado,
    tip_veh_nombre, tip_veh_capacidad,
    tip_veh_combustible, tip_veh_categoria,
    mar_nom, modelo_nom,
    equipo_nombre, equipo_descripcion, equipo_categoria,
    tip_serv_precio
) {
    // 🧩 IDs principales
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#diagnostico_cab_id").val(diagnostico_cab_id);
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);

    // 🏢 Empresa y sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // 📅 Fechas
    $("#ord_serv_fecha").val(fecha);
    $("#ord_serv_fecha_vence").val(fecha_vence);

    // 👤 Cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // 📋 Presupuesto, diagnóstico y tipo diagnóstico
    $("#presupuesto_serv_cab_id").val(presupuesto_serv_cab_id);
    $("#presupuesto_serv").val(presupuesto_serv);
    $("#diagnostico").val(diagnostico);
    $("#tipo_diag_nombre").val(tipo_diag_nombre);

    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#mar_nom").val(mar_nom);
    $("#modelo_nom").val(modelo_nom);

    $("#equipo_trabajo_id").val(equipo_trabajo_id);
    $("#equipo_nombre").val(equipo_nombre);
    $("#equipo_descripcion").val(equipo_descripcion);
    $("#equipo_categoria").val(equipo_categoria);
    $("#tip_serv_precio").val(Number(tip_serv_precio || 0).toLocaleString('es-PY', {minimumFractionDigits: 0, maximumFractionDigits: 0}));

    // 📋 Observaciones, estado, tipo y encargado
    $("#ord_serv_observaciones").val(observaciones);
    $("#ord_serv_estado").val(estado);
    $("#ord_serv_tipo").val(tipo);
    $("#encargado").val(encargado);

    // 📄 Detalle de la orden (asegurate que esta función exista para orden de serv.)
    listarDetalles();

    // 🎛️ Vista y botones
    $("#registros").hide();
    $("#detalle").show();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (estado === "PENDIENTE") {
        $("#btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", false);
    } else if (estado === "CONFIRMADO") {
        // Confirmada: solo lectura, sin operaciones adicionales
    } else if (estado === "ANULADO") {
        // Todos los botones permanecen deshabilitados
    }

    $(".form-line").addClass("focused");
}
function buscarPresupuestoServ() {
    const texto = $("#presupuesto_serv").val();
    const funcionario_id = $("#funcionario_id").val();

    $.ajax({
        url: getUrl() + "presupuestoservcab/buscar",
        method: "POST",
        data: { texto: texto, funcionario_id: funcionario_id },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";

        if (!resultado || resultado.length === 0) {
            lista = "<div class='list-group-item'>No se encontraron presupuestos confirmados</div>";
        } else {
            var esc2 = function(s) { return (s || '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };
            for (var i = 0; i < resultado.length; i++) {
                var rs = resultado[i];
                lista += "<div class='list-group-item' style='cursor:pointer' onclick=\"seleccionarPresupuestoServ("
                    + rs.presupuestos_serv_cab_id + ",'" + esc2(rs.presupuesto_serv) + "',"
                    + rs.empresa_id + ",'" + esc2(rs.emp_razon_social) + "',"
                    + rs.sucursal_id + ",'" + esc2(rs.suc_razon_social) + "',"
                    + rs.tipo_diagnostico_id + ",'" + esc2(rs.tipo_diag_nombre) + "',"
                    + rs.clientes_id + ",'" + esc2(rs.cli_nombre) + "','" + esc2(rs.cli_apellido) + "',"
                    + "'" + esc2(rs.cli_ruc) + "','" + esc2(rs.cli_telefono) + "','" + esc2(rs.cli_direccion) + "','" + esc2(rs.cli_correo) + "',"
                    + rs.diagnostico_cab_id + ","
                    + "'" + esc2(rs.diag_cab_observaciones) + "','" + esc2(rs.diag_cab_prioridad) + "',"
                    + "'" + esc2(rs.diag_cab_nivel_combustible) + "','" + esc2(rs.diag_cab_kilometraje) + "',"
                    + "'" + esc2(rs.encargado) + "','" + esc2(rs.pres_serv_cab_fecha_vence) + "',"
                    + rs.tipo_vehiculo_id + ","
                    + "'" + esc2(rs.tip_veh_nombre) + "',"
                    + (rs.tip_veh_capacidad || 0) + ","
                    + "'" + esc2(rs.tip_veh_combustible) + "','" + esc2(rs.tip_veh_categoria) + "',"
                    + "'" + esc2(rs.mar_nom) + "','" + esc2(rs.modelo_nom) + "'"
                    + ");\">"
                    + (function(p) {
                        var c = p === 'ALTA' ? '#c0392b' : p === 'MEDIA' ? '#e67e22' : '#27ae60';
                        return '<span style="background:' + c + ';color:#fff;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;float:right;">' + (p || '?') + '</span>';
                    })(rs.diag_cab_prioridad)
                    + "<b>" + (rs.presupuesto_serv || '') + "</b><br>"
                    + "Estado: " + (rs.pres_serv_cab_estado || '') + " &nbsp;|&nbsp; Encargado: " + (rs.encargado || '')
                    + "</div>";
            }
        }

        $("#listaPresupuestoServ").html(lista).show();
        $("#listaPresupuestoServ").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionarPresupuestoServ(
    id, presupuesto_serv,
    empresa_id, emp_razon_social,
    sucursal_id, suc_razon_social,
    tipo_diagnostico_id, tipo_diag_nombre,
    clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo,
    diagnostico_cab_id, diag_cab_observaciones, diag_cab_prioridad,
    diag_cab_nivel_combustible, diag_cab_kilometraje,
    encargado, fecha_vence_presupuesto,
    tipo_vehiculo_id, tip_veh_nombre, tip_veh_capacidad,
    tip_veh_combustible, tip_veh_categoria,
    mar_nom, modelo_nom
) {
    // 🧩 Guardar IDs
    $("#presupuesto_serv_cab_id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
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

    $("#tipo_diag_nombre").val(tipo_diag_nombre);
    // 🧩 Ocultar la lista y aplicar estilo
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#mar_nom").val(mar_nom);
    $("#modelo_nom").val(modelo_nom);

    $("#listaPresupuestoServ").hide();
    $(".form-line").addClass("focused");
}

function buscarEquipoTrabajo(){
    $.ajax({
        url:getUrl() + "equipo_trabajo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionEquiTrab("+rs.equipo_trabajo_id+",'"+rs.equipo_nombre+"','"+rs.equipo_descripcion+"','"+rs.equipo_categoria+"');\">"+rs.equipo_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaEquiTrab").html(lista);
        $("#listaEquiTrab").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr){
        mostrarErrores(xhr);
    })
}

function seleccionEquiTrab(equipo_trabajo_id,equipo_nombre,equipo_descripcion,equipo_categoria){
    $("#equipo_trabajo_id").val(equipo_trabajo_id);
    $("#equipo_nombre").val(equipo_nombre);
    $("#equipo_descripcion").val(equipo_descripcion);
    $("#equipo_categoria").val(equipo_categoria);

    $("#listaEquiTrab").html("");
    $("#listaEquiTrab").attr("style","display:none;");
}

function grabar() {
    
    const observaciones = ($("#ord_serv_observaciones").val() || "").trim();
    const fecha = ($("#ord_serv_fecha").val() || "").trim();
    const fechaVence = ($("#ord_serv_fecha_vence").val() || "").trim();
    const empresa = parseInt($("#empresa_id").val()) || 0;
    const sucursal = parseInt($("#sucursal_id").val()) || 0;
    const presupuesto = parseInt($("#presupuesto_serv_cab_id").val()) || 0;
    const cliente = parseInt($("#clientes_id").val()) || 0;
    const tipo = ($("#ord_serv_tipo").val() || "NORMAL").trim();
    // Validar campos obligatorios
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
            'funcionario_id': $("#funcionario_id").val(),
            'equipo_trabajo_id': $("#equipo_trabajo_id").val(),
            'diagnostico_cab_id': $("#diagnostico_cab_id").val(),
            'tipo_diagnostico_id': $("#tipo_diagnostico_id").val(),
            'tipo_vehiculo_id': $("#tipo_vehiculo_id").val(),
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

                if (resultado.registro.ord_serv_estado !== "PENDIENTE" || $("#txtOperacion").val() == 2) {
                    location.reload(true);
                } else {
                    $("#ord_serv_fecha").attr("disabled","true");
                    $("#presupuesto_serv").attr("disabled","true");
                    $("#ord_serv_observaciones").attr("disabled","true");
                    $("#equipo_nombre").attr("disabled","true");

                    $("#btnAgregar").attr("disabled","true");
                    $("#btnGrabar").attr("disabled","true");
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");
                }
            }
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
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
            lista += `<tr class="item-list">
                <td>${rs.item_id}</td>
                <td>${rs.item_descripcion || ''}</td>
                <td>${rs.orden_serv_det_cantidad}</td>
                <td>${rs.orden_serv_det_costo}</td>
                <td>${rs.mar_nom || '-'}</td>
                <td>${rs.modelo_nom || '-'}</td>
                <td>${rs.dep_nombre || '-'}</td>
            </tr>`;
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ord_serv_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    })
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

function mostrarErrores(xhr) {
    let mensaje = 'Ocurrió un error inesperado.';
    if (xhr.responseJSON) {
        if (xhr.responseJSON.message) {
            mensaje = xhr.responseJSON.message;
        }
        if (xhr.responseJSON.errors) {
            const errores = xhr.responseJSON.errors;
            mensaje = Object.values(errores).flat().join('\n');
        }
    }
    swal({ title: 'Error', text: mensaje, type: 'error' });
}


