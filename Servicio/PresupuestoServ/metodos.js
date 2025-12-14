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
    $("#prom_cab_nombre").attr("disabled","true");
    $("#desc_cab_nombre").attr("disabled","true");
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
    $("#desc_cab_nombre").attr("disabled","true");
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
                + rs.id + ","                               // id
                + rs.empresa_id + ","                       // empresa_id
                + rs.sucursal_id + ","                      // sucursal_id
                + rs.clientes_id + ","                      // clientes_id
                + rs.tipo_servicio_id + ","                 // tipo_servicio_id
                + rs.tipo_diagnostico_id + ","              // tipo_diagnostico_id
                + (rs.promociones_cab_id || 0) + ","        // promociones_cab_id
                + (rs.descuentos_cab_id || 0) + ","         // descuentos_cab_id
                + (rs.diagnostico_cab_id || 0) + ","        // diagnostico_cab_id
                + rs.tipo_vehiculo_id + ","                 // tipo_vehiculo_id

                + "'" + esc(rs.emp_razon_social) + "',"     // emp_razon_social
                + "'" + esc(rs.suc_razon_social) + "',"     // suc_razon_social
                + "'" + esc(rs.pres_serv_cab_fecha) + "',"  // fecha
                + "'" + esc(rs.pres_serv_cab_fecha_vence) + "'," // fecha_vence
                + "'" + esc(rs.cli_nombre) + "',"           // cli_nombre
                + "'" + esc(rs.cli_apellido) + "',"         // cli_apellido
                + "'" + esc(rs.cli_ruc) + "',"              // cli_ruc
                + "'" + esc(rs.cli_telefono) + "',"         // cli_telefono
                + "'" + esc(rs.cli_direccion) + "',"        // cli_direccion
                + "'" + esc(rs.cli_correo) + "',"           // cli_correo

                + "'" + esc(rs.diagnostico) + "',"          // diagnostico
                + "'" + esc(rs.pres_serv_cab_observaciones) + "'," // observaciones
                + "'" + esc(rs.prom_cab_nombre) + "',"      // prom_cab_nombre
                + "'" + esc(rs.desc_cab_nombre) + "',"      // desc_cab_nombre

                + "'" + esc(rs.tipo_servicio) + "',"        // tipo_servicio (nombre)
                + (rs.precio_servicio || 0) + ","           // tip_serv_precio

                + "'" + esc(rs.tipo_diag_nombre) + "',"     // tipo_diag_nombre
                + "'" + esc(rs.tipo_descuentos) + "',"      // tipo_descuentos
                + "'" + esc(rs.tipo_promociones) + "',"     // tipo_promociones
                + "'" + esc(rs.pres_serv_cab_estado) + "'," // estado

                + "'" + esc(rs.tipo_prom_modo) + "',"       // tipo_prom_modo
                + (rs.tipo_prom_valor || 0) + ","           // tipo_prom_valor
                + (rs.desc_cab_porcentaje || 0) + ","       // desc_cab_porcentaje

                + "'" + esc(rs.tip_veh_nombre) + "',"       // tip_veh_nombre
                + "'" + esc(rs.tip_veh_capacidad) + "',"    // tip_veh_capacidad
                + "'" + esc(rs.tip_veh_combustible) + "',"  // tip_veh_combustible
                + "'" + esc(rs.tip_veh_categoria) + "',"    // tip_veh_categoria
                + "'" + esc(rs.marca_nombre) + "',"         // marca_nombre
                + "'" + esc(rs.modelo_nombre) + "'"         // modelo_nombre
                + ");\">";

            lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.pres_serv_cab_fecha}</td>`;
            lista += `<td>${rs.cli_nombre} ${rs.cli_apellido}</td>`;
            lista += `<td>${rs.cli_ruc}</td>`;
            lista += `<td>
                ${rs.tip_veh_nombre || ''} - ${rs.marca_nombre || ''} ${rs.modelo_nombre || ''}
            </td>`;
            lista += `<td>${rs.pres_serv_cab_estado}</td>`;

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
    tipo_diagnostico_id, promociones_cab_id, descuentos_cab_id, diagnostico_cab_id,
    tipo_vehiculo_id,
    emp_razon_social, suc_razon_social,
    fecha, fecha_vence, cli_nombre, cli_apellido, cli_ruc,
    cli_telefono, cli_direccion, cli_correo,
    diagnostico, observaciones, prom_cab_nombre, desc_cab_nombre,
    tipo_servicio, tip_serv_precio, tipo_diag_nombre, tipo_descuentos, tipo_promociones, estado,
    tipo_prom_modo, tipo_prom_valor, desc_cab_porcentaje,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible,
    tip_veh_categoria, marca_nombre, modelo_nombre
) {
    // IDs
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#diagnostico_cab_id").val(diagnostico_cab_id);
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id)

    // TIPO SERVICIO ⭐ NUEVO
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#tipo_serv_nombre").val(tipo_servicio);
    $("#tip_serv_precio").val(tip_serv_precio);

    // Tipo diagnóstico
    $("#tipo_diag_nombre").val(tipo_diag_nombre);

    // Empresa y sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // Fechas
    $("#pres_serv_cab_fecha").val(fecha);
    $("#pres_serv_cab_fecha_vence").val(fecha_vence);

    // Cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    // Diagnóstico
    $("#diagnostico").val(diagnostico);
    $("#pres_serv_cab_observaciones").val(observaciones);

    // Promociones / descuentos
    $("#prom_cab_nombre").val(prom_cab_nombre);
    $("#desc_cab_nombre").val(desc_cab_nombre);
    $("#tipo_desc_nombre").val(tipo_descuentos);
    $("#tipo_prom_nombre").val(tipo_promociones);

    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);
    $("#desc_cab_porcentaje").val(desc_cab_porcentaje);

    // Vehículo
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#marc_nom").val(marca_nombre);
    $("#modelo_nom").val(modelo_nombre);

    // Estado
    $("#pres_serv_cab_estado").val(estado);

    // Vista
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    $(".form-line").addClass("focused");

    // Botones
    $("#btnCancelar").prop("disabled", false);
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .prop("disabled", true);

    if (estado === "PENDIENTE") {
        $("#btnEliminar, #btnEditar").prop("disabled", false);
        $("#formDetalles").show();
    }
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
                            ${rs.clientes_id}, '${rs.cli_nombre}', '${rs.cli_apellido}', 
                            '${rs.cli_ruc}', '${rs.cli_telefono}', '${rs.cli_direccion}', '${rs.cli_correo}',
                            ${rs.tipo_vehiculo_id || 0},
                            '${rs.tip_veh_nombre}',
                            '${rs.tip_veh_capacidad}',
                            '${rs.tip_veh_combustible}',
                            '${rs.tip_veh_categoria}',
                            '${rs.marc_nom}',
                            '${rs.modelo_nom}'
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
    clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo,

    // 🔥 CAMPOS DEL VEHÍCULO
    tipo_vehiculo_id,tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible, tip_veh_categoria,
    marc_nom, modelo_nom
) {
    // Guardar IDs
    $("#diagnostico_cab_id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#tipo_diagnostico_id").val(tipo_diagnostico_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#clientes_id").val(clientes_id);

    // Datos visibles
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

    // 🔥 Autocompletar datos del vehículo
    $("#tipo_vehiculo_id").val(tipo_vehiculo_id);
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#marc_nom").val(marc_nom);
    $("#modelo_nom").val(modelo_nom);

    // Ocultar lista y estilizar
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
function cargarPresupuesto(id) {

    $.ajax({
        url: getUrl() + "presupuestoservcab/readById/" + id,
        method: "GET",
        dataType: "json"
    })
    .done(function(rs) {
        $("#id").val(rs.id);
        $("#empresa_id").val(rs.empresa_id);
        $("#sucursal_id").val(rs.sucursal_id);
        $("#clientes_id").val(rs.clientes_id);
        $("#diagnostico_cab_id").val(rs.diagnostico_cab_id);
        $("#tipo_servicio_id").val(rs.tipo_servicio_id);
        $("#tipo_vehiculo_id").val(rs.tipo_vehiculo_id);

        $("#pres_serv_cab_fecha").val(rs.pres_serv_cab_fecha);
        $("#pres_serv_cab_fecha_vence").val(rs.pres_serv_cab_fecha_vence);
        $("#pres_serv_cab_observaciones").val(rs.pres_serv_cab_observaciones);
        $("#promociones_cab_id").val(rs.promociones_cab_id || "");
        $("#tipo_prom_modo").val(rs.tipo_prom_modo || "");
        $("#tipo_prom_valor").val(rs.tipo_prom_valor || 0);
        $("#descuentos_cab_id").val(rs.descuentos_cab_id || "");
        $("#desc_cab_porcentaje").val(rs.desc_cab_porcentaje || 0);
        $("#tip_serv_precio").val(rs.tip_serv_precio || 0);
        $("#detalle").show();
        $("#registros").hide(); 
        listarDetalles();

        $(".form-line").addClass("focused");
    })
    .fail(function(xhr) {
        console.error("Error cargarPresupuesto:", xhr.responseText);
    });
}



function grabar() {
    const observaciones = ($("#pres_serv_cab_observaciones").val() || "").trim();
    const fecha = ($("#pres_serv_cab_fecha").val() || "").trim();
    const fechaVence = ($("#pres_serv_cab_fecha_vence").val() || "").trim();

    const empresa = parseInt($("#empresa_id").val()) || 0;
    const sucursal = parseInt($("#sucursal_id").val()) || 0;
    const diagnostico = parseInt($("#diagnostico_cab_id").val()) || 0;
    const cliente = parseInt($("#clientes_id").val()) || 0;
    const tipoServicio = parseInt($("#tipo_servicio_id").val()) || 0;
    const tipoVehiculo = parseInt($("#tipo_vehiculo_id").val()) || 0;
    console.log("🔍 Datos a enviar:", {
        observaciones,
        fecha,
        fechaVence,
        empresa,
        sucursal,
        diagnostico,
        cliente,
        tipoServicio,
        tipoVehiculo
    });
    if (
        !observaciones ||
        !fecha ||
        !fechaVence ||
        empresa <= 0 ||
        sucursal <= 0 ||
        diagnostico <= 0 ||
        cliente <= 0 ||
        tipoServicio <= 0 ||
        tipoVehiculo <= 0
    ) {
        swal({
            title: "Error",
            text: "Todos los campos obligatorios deben estar completos.",
            type: "error"
        });
        return;
    }
    let endpoint = "presupuestoservcab/create";
    let metodo = "POST";
    let estado = "PENDIENTE";

    switch ($("#txtOperacion").val()) {
        case "2": // EDITAR
            endpoint = "presupuestoservcab/update/" + $("#id").val();
            metodo = "PUT";
            break;

        case "3": // ANULAR
            endpoint = "presupuestoservcab/anular/" + $("#id").val();
            metodo = "PUT";
            estado = "ANULADO";
            break;

        case "4": // CONFIRMAR
            endpoint = "presupuestoservcab/confirmar/" + $("#id").val();
            metodo = "PUT";
            estado = "CONFIRMADO";
            break;
    }
    const promociones = $("#promociones_cab_id").val() || null;
    const descuentos = $("#descuentos_cab_id").val() || null;
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id: ($("#txtOperacion").val() == "1") ? null : $("#id").val(),

            pres_serv_cab_fecha: fecha,
            pres_serv_cab_fecha_vence: fechaVence,
            pres_serv_cab_observaciones: observaciones,
            pres_serv_cab_estado: estado,

            empresa_id: empresa,
            sucursal_id: sucursal,
            diagnostico_cab_id: diagnostico,
            clientes_id: cliente,
            tipo_servicio_id: tipoServicio,
            tipo_vehiculo_id: tipoVehiculo,

            promociones_cab_id: promociones,
            descuentos_cab_id: descuentos,

            user_id: $("#user_id").val()
        }
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo !== "success") return;
            if ($("#txtOperacion").val() == "1") {
                cargarPresupuesto(resultado.registro.id);
                return;
            }
            $("#id").val(resultado.registro.id);
            $("#detalle").show();
            listarDetalles();
        });
    })
    .fail(function (xhr, status, error) {
        console.error("❌ Error AJAX:", xhr.responseText);
        swal("Error", "Ocurrió un error al procesar la solicitud.", "error");
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

    let TotalItems = 0;      // Suma total de los ítems sin IVA
    let TotalIVA = 0;        // Suma total del IVA de los ítems
    let cantidadDetalle = 0;

    let precioMO = parseFloat($("#tip_serv_precio").val()) || 0;

    $.ajax({
        url: getUrl() + "presupuesto_serv_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        const promoModo = $("#tipo_prom_modo").val() || "";
        const promoValor = parseFloat($("#tipo_prom_valor").val()) || 0;
        const descPct = parseFloat($("#desc_cab_porcentaje").val()) || 0;

        if (resultado && resultado.length > 0) {

            for (let rs of resultado) {

                let cantidad = parseFloat(rs.pres_serv_det_cantidad) || 0;
                let costo = parseFloat(rs.pres_serv_det_costo) || 0;

                // SUBTOTAL
                let subtotal = cantidad * costo;

                // DESCUENTO EN ₲
                let descMonto = subtotal * (descPct / 100);

                // PROMOCIÓN EN ₲
                let promoMonto = 0;
                if (promoModo === "MONTO_FIJO") promoMonto = promoValor;
                else if (promoModo === "PORCENTAJE") promoMonto = subtotal * (promoValor / 100);
                else if (promoModo === "2X1") promoMonto = subtotal / 2;

                // BASE IMPONIBLE (Neto)
                let totalItemNeto = subtotal - descMonto - promoMonto;

                // IVA SOBRE EL NETO
                let ivaItem = 0;
                if (rs.tip_imp_nom === "IVA10") ivaItem = totalItemNeto / 11;
                else if (rs.tip_imp_nom === "IVA5") ivaItem = totalItemNeto / 21;

                // SUMAR TOTALES
                TotalItems += totalItemNeto;
                TotalIVA += ivaItem;
                cantidadDetalle++;

                // FILA HTML
                lista += `
                    <tr class='item-list' onclick="seleccionPresupuestoDet(
                        ${rs.item_id},
                        '${rs.item_decripcion}',
                        ${cantidad},
                        ${rs.pres_serv_det_cantidad_stock},
                        ${costo},
                        ${rs.tipo_impuesto_id},
                        '${rs.tip_imp_nom}'
                    )">
                        <td>${rs.item_id}</td>
                        <td>${rs.item_decripcion}</td>
                        <td class='text-right'>${cantidad}</td>
                        <td class='text-right'>${rs.pres_serv_det_cantidad_stock}</td>
                        <td class='text-right'>${formatearNumero(costo)}</td>
                        <td>${rs.tip_imp_nom}</td>
                        <td class='text-right'>${formatearNumero(subtotal)}</td>
                        <td class='text-right'>${descPct}%</td>
                        <td>${promoModo}</td>
                        <td class='text-right'>${formatearNumero(promoValor)}</td>
                        <td class='text-right'>${formatearNumero(descMonto)}</td>
                        <td class='text-right'>${formatearNumero(promoMonto)}</td>
                        <td class='text-right'><b>${formatearNumero(totalItemNeto)}</b></td>
                        <td class='text-right'>${formatearNumero(ivaItem)}</td>
                        <td class='text-right'>${formatearNumero(precioMO)}</td>
                    </tr>`;
            }
            $("#tableDetalle").html(lista);

        } else {
            $("#tableDetalle").html("<tr><td colspan='16' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        let ivaMO = precioMO > 0 ? precioMO / 11 : 0;

        let totalSinIVA = TotalItems + precioMO;
        let totalIVA = TotalIVA + ivaMO;

        $("#txtTotalGral").text(formatearNumero(totalSinIVA));
        $("#txtTotalConImpuesto").text(formatearNumero(totalIVA));

        if (cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    });
}

function seleccionPresupuestoDet(
    item_id,
    item_decripcion,
    pres_serv_det_cantidad,
    pres_serv_det_cantidad_stock,
    pres_serv_det_costo,
    tipo_impuesto_id,
    tip_imp_nom
) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#pres_serv_det_cantidad").val(pres_serv_det_cantidad);
    $("#pres_serv_det_cantidad_stock").val(pres_serv_det_cantidad_stock);
    $("#pres_serv_det_costo").val(pres_serv_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // CÁLCULOS
    const cantidad = parseFloat(pres_serv_det_cantidad) || 0;
    const costo = parseFloat(pres_serv_det_costo) || 0;
    const subtotal = cantidad * costo;

    const descPct = parseFloat($("#desc_cab_porcentaje").val()) || 0;
    const promoModo = $("#tipo_prom_modo").val() || "";
    const promoValor = parseFloat($("#tipo_prom_valor").val()) || 0;

    const descMonto = subtotal * (descPct / 100);

    let promoMonto = 0;
    if (promoModo === "MONTO_FIJO") promoMonto = promoValor;
    else if (promoModo === "PORCENTAJE") promoMonto = subtotal * (promoValor / 100);
    else if (promoModo === "2X1") promoMonto = subtotal / 2;

    const baseIVA = subtotal - descMonto - promoMonto;

    let iva = 0;
    if (tip_imp_nom === "IVA10") iva = baseIVA / 11;
    else if (tip_imp_nom === "IVA5") iva = baseIVA / 21;

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));
    $("#descuento").val(formatearNumero(descMonto));
    $("#promocion").val(formatearNumero(promoMonto));
    $("#total_final").val(formatearNumero(baseIVA));

    $(".form-line").addClass("focused");
}





