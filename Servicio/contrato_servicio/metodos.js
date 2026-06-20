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
                title:'Listado de Contrato de Servicio'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Contrato de Servicio'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Contrato de Servicio'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Contrato de Servicio'
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
    $("#contrato_fecha").removeAttr("disabled");
    $("#contrato_fecha_inicio").removeAttr("disabled");
    $("#contrato_fecha_fin").removeAttr("disabled");
    $("#contrato_intervalo_fecha_vence").attr("disabled","true");
    $("#contrato_condicion_pago").removeAttr("disabled");
    $("#contrato_observacion").removeAttr("disabled");
    $("#contrato_cuotas").attr("disabled","true");
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    $("#tip_con_nombre").removeAttr("disabled");
    $("#contrato_objeto").removeAttr("disabled");
    $("#contrato_alcance").removeAttr("disabled");
    $("#contrato_responsabilidad").removeAttr("disabled");
    $("#contrato_garantia").removeAttr("disabled");
    $("#contrato_limitacion").removeAttr("disabled");
    $("#contrato_fuerza_mayor").removeAttr("disabled");
    $("#contrato_jurisdiccion").removeAttr("disabled");
    $("#contrato_representante").removeAttr("disabled");
    $("#orden_buscar").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRenovar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);
    
    $("#contrato_fecha").removeAttr("disabled");
    $("#contrato_fecha_inicio").removeAttr("disabled");
    $("#contrato_fecha_fin").removeAttr("disabled");
    $("#contrato_intervalo_fecha_vence").attr("disabled","true");
    $("#contrato_condicion_pago").removeAttr("disabled");
    $("#contrato_observacion").removeAttr("disabled");
    $("#contrato_cuotas").attr("disabled","true");
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    $("#tip_con_nombre").removeAttr("disabled");
    $("#contrato_objeto").removeAttr("disabled");
    $("#contrato_alcance").removeAttr("disabled");
    $("#contrato_responsabilidad").removeAttr("disabled");
    $("#contrato_garantia").removeAttr("disabled");
    $("#contrato_limitacion").removeAttr("disabled");
    $("#contrato_fuerza_mayor").removeAttr("disabled");
    $("#contrato_jurisdiccion").removeAttr("disabled");
    $("#contrato_representante").removeAttr("disabled");
    $("#orden_buscar").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRenovar").attr("disabled","true");

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
function imprimirContrato() {
    const id = $("#id").val();

    if (!id) {
        swal("Atención", "Seleccione un contrato", "warning");
        return;
    }

    window.open(
        getUrl() + "contratoservcab/imprimir/" + id,
        "_blank"
    );
}

function listar() {
    $.ajax({
        url: getUrl() + "contratoservcab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        let lista = "";

        for (let rs of resultado) {

                const partesFin = (rs.contrato_fecha_fin || '').split('/');
            const fechaFin = partesFin.length === 3 ? new Date(+partesFin[2], +partesFin[1]-1, +partesFin[0]) : null;
            const diasRestantes = fechaFin ? Math.floor((fechaFin - new Date()) / 86400000) : null;
            const colorFila = diasRestantes === null ? '' : diasRestantes < 0 ? ' style="background-color:#ffcccc;"' : diasRestantes <= 30 ? ' style="background-color:#fff3cd;"' : '';

            lista += "<tr class='item-list'" + colorFila + " onclick=\"seleccionContratoServicio("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.clientes_id + ","
                + rs.tipo_servicio_id + ","
                + rs.tipo_contrato_id + ", '"

                + esc(rs.tip_con_nombre) + "', '"
                + esc(rs.emp_razon_social) + "', '"
                + esc(rs.suc_razon_social) + "', '"

                + esc(rs.contrato_fecha) + "', '"
                + esc(rs.contrato_fecha_inicio) + "', '"
                + esc(rs.contrato_fecha_fin) + "', '"
                + esc(rs.contrato_intervalo_fecha_vence) + "', '"

                + esc(rs.cli_nombre) + "', '"
                + esc(rs.cli_apellido) + "', '"
                + esc(rs.cli_ruc) + "', '"
                + esc(rs.cli_telefono) + "', '"
                + esc(rs.cli_direccion) + "', '"
                + esc(rs.cli_correo) + "', '"

                + esc(rs.tipo_serv_nombre || '') + "', '"
                + esc(rs.contrato_condicion_pago || '') + "', '"
                + esc(rs.contrato_cuotas || '') + "', '"

                + esc(rs.contrato_objeto || '') + "', '"
                + esc(rs.contrato_alcance || '') + "', '"
                + esc(rs.contrato_responsabilidad || '') + "', '"
                + esc(rs.contrato_garantia || '') + "', '"
                + esc(rs.contrato_limitacion || '') + "', '"
                + esc(rs.contrato_fuerza_mayor || '') + "', '"
                + esc(rs.contrato_jurisdiccion || '') + "', '"

                + esc(rs.contrato_observacion || '') + "', '"
                + esc(rs.contrato_estado || '') + "', '"
                + esc(rs.funcionario || '') + "', '"
                + esc(rs.contrato_representante || '') + "', '"
                + esc(rs.contrato_numero || '') + "', "
                + (rs.orden_serv_cab_id || 0) + ")\">";

                lista += `<td>${rs.id}</td>`;                    // Código
                lista += `<td>${rs.emp_razon_social}</td>`;     // Empresa
                lista += `<td>${rs.suc_razon_social}</td>`;     // Sucursal
                lista += `<td>${rs.contrato_fecha}</td>`;       // Fecha
                lista += `<td>${rs.contrato_fecha_inicio}</td>`;// Fecha Inicio
                lista += `<td>${rs.contrato_fecha_fin}</td>`;   // Fecha Fin
                lista += `<td>${rs.cli_nombre}</td>`;           // Cliente
                lista += `<td>${rs.cli_apellido}</td>`;         // Apellido
                lista += `<td>${rs.cli_ruc}</td>`;              // RUC
                lista += `<td>${rs.tipo_serv_nombre}</td>`;     // Tipo de Servicio
                lista += `<td>${rs.contrato_estado}</td>`;      // Estado
                lista += `<td>${rs.funcionario || rs.name || rs.encargado || '-'}</td>`;            // Encargado
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}
function seleccionContratoServicio(
    id, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    tipo_contrato_id, tip_con_nombre,
    emp_razon_social, suc_razon_social,
    contrato_fecha, contrato_fecha_inicio, contrato_fecha_fin, contrato_intervalo_fecha_vence,
    cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo,
    tipo_serv_nombre, contrato_condicion_pago, contrato_cuotas,
    contrato_objeto, contrato_alcance, contrato_responsabilidad,
    contrato_garantia, contrato_limitacion, contrato_fuerza_mayor,
    contrato_jurisdiccion, contrato_observacion, contrato_estado, encargado,
    contrato_representante, contrato_numero, orden_serv_cab_id
) {

    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);

    $("#tipo_contrato_id").val(tipo_contrato_id);
    $("#tip_con_nombre").val(tip_con_nombre);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    $("#contrato_fecha").val(contrato_fecha);
    $("#contrato_fecha_inicio").val(contrato_fecha_inicio);
    $("#contrato_fecha_fin").val(contrato_fecha_fin);

    if (contrato_intervalo_fecha_vence === 'N/A' || !contrato_intervalo_fecha_vence) {
        $("#contrato_intervalo_fecha_vence")
            .val('')
            .attr("placeholder", "N/A");
    } else {
        $("#contrato_intervalo_fecha_vence")
            .val(contrato_intervalo_fecha_vence)
            .attr("placeholder", "");
    }
    

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    $("#tipo_serv_nombre").val(tipo_serv_nombre);

    $("#contrato_condicion_pago").val(contrato_condicion_pago);
    $("#contrato_cuotas").val(contrato_cuotas);
    controlarCamposPago();

    $("#contrato_objeto").val(contrato_objeto);
    $("#contrato_alcance").val(contrato_alcance);
    $("#contrato_responsabilidad").val(contrato_responsabilidad);
    $("#contrato_garantia").val(contrato_garantia);
    $("#contrato_limitacion").val(contrato_limitacion);
    $("#contrato_fuerza_mayor").val(contrato_fuerza_mayor);
    $("#contrato_jurisdiccion").val(contrato_jurisdiccion);

    $("#contrato_observacion").val(contrato_observacion);
    $("#contrato_estado").val(contrato_estado);
    $("#encargado").val(encargado);
    $("#contrato_representante").val(contrato_representante || '');
    $("#contrato_numero").val(contrato_numero || '');
    $("#orden_serv_cab_id").val(orden_serv_cab_id || '');
    if (orden_serv_cab_id) {
        $("#orden_texto").val('ORDEN Nº: ' + String(orden_serv_cab_id).padStart(7, '0'));
    } else {
        $("#orden_texto").val('');
    }

    $("#registros").hide();
    $("#detalle").show();
    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (contrato_estado === "PENDIENTE") {
        $("#btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", false);
    }

    if (contrato_estado === "CONFIRMADO") {
        $("#btnImprimir, #btnRenovar").prop("disabled", false);
    } else {
        $("#btnImprimir, #btnRenovar").prop("disabled", true);
    }

    $(".form-line").addClass("focused");
}

function buscarTipoServicio(){
    $.ajax({
        url:getUrl() + "tipo-servicio/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoServ("+rs.tipo_servicio_id+",'"+rs.tipo_serv_nombre+"');\">"+rs.tipo_serv_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoServ").html(lista);
        $("#listaTipoServ").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    })
}

function seleccionTipoServ(tipo_servicio_id,tipo_serv_nombre){
    $("#tipo_servicio_id").val(tipo_servicio_id);
    $("#tipo_serv_nombre").val(tipo_serv_nombre);

    $("#listaTipoServ").html("");
    $("#listaTipoServ").attr("style","display:none;");
}
function buscarCliente(){
    $.ajax({
        url: getUrl()+"clientes/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "cli_nombre":$("#cli_nombre").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.clientes_id+",'"+rs.cli_nombre+"','"+rs.cli_apellido+"','"+rs.cli_ruc+"','"+rs.cli_direccion+"','"+rs.cli_telefono+"','"+rs.cli_correo+"')\">"+rs.cli_nombre+" - "+rs.cli_apellido+"- "+rs.cli_ruc+"</li>";   
        }
        lista += "</ul>";
        $("#listaClientes").html(lista);
        $("#listaClientes").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionCliente(clientes_id,cli_nombre,cli_apellido,cli_ruc,cli_direccion,cli_telefono,cli_correo){
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}
function buscarTipoContrato(){
    $.ajax({
        url: getUrl() + "tipo_contrato/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";

        for (rs of resultado) {

            // 👉 Solo permitir seleccionar ACTIVO (recomendado)
            if (rs.tip_con_estado !== "ACTIVO") {
                continue;
            }

            lista += "<li class=\"list-group-item\" style=\"cursor:pointer\" "
                + "onclick=\"seleccionTipoContrato("
                + rs.tipo_contrato_id + ",'"
                + rs.tip_con_nombre + "','"
                + rs.tip_con_objeto + "','"
                + rs.tip_con_alcance + "','"
                + rs.tip_con_garantia + "','"
                + rs.tip_con_responsabilidad + "','"
                + rs.tip_con_limitacion + "','"
                + rs.tip_con_fuerza_mayor + "','"
                + rs.tip_con_jurisdiccion + "');\">"
                + rs.tip_con_nombre
                + "</li>";
        }

        lista += "</ul>";

        $("#listaTipoCont").html(lista);
        $("#listaTipoCont").attr(
            "style",
            "display:block; position:absolute; z-index:2000; width:100%;"
        );
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionTipoContrato(
    tipo_contrato_id,
    tip_con_nombre,
    tip_con_objeto,
    tip_con_alcance,
    tip_con_garantia,
    tip_con_responsabilidad,
    tip_con_limitacion,
    tip_con_fuerza_mayor,
    tip_con_jurisdiccion
){
    // 🔹 Guardar FK
    $("#tipo_contrato_id").val(tipo_contrato_id);

    // 🔹 Mostrar nombre (si tenés input visible)
    $("#tip_con_nombre").val(tip_con_nombre);

    // 🔹 Autocompletar campos del contrato
    $("#contrato_objeto").val(tip_con_objeto);
    $("#contrato_alcance").val(tip_con_alcance);
    $("#contrato_garantia").val(tip_con_garantia);
    $("#contrato_responsabilidad").val(tip_con_responsabilidad);
    $("#contrato_limitacion").val(tip_con_limitacion);
    $("#contrato_fuerza_mayor").val(tip_con_fuerza_mayor);
    $("#contrato_jurisdiccion").val(tip_con_jurisdiccion);

    // 🔹 Ocultar lista
    $("#listaTipoCont").html("");
    $("#listaTipoCont").attr("style","display:none;");
}
function grabar() {

    // 🔹 Definición inicial de endpoint, método y estado
    var endpoint = "contratoservcab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    // Cambiar endpoint y método según operación
    if ($("#txtOperacion").val() == 2) {
        endpoint = "contratoservcab/update/" + $("#id").val();
        metodo = "PUT";
    } 
    else if ($("#txtOperacion").val() == 3) {
        endpoint = "contratoservcab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    } 
    else if ($("#txtOperacion").val() == 4) {
        endpoint = "contratoservcab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    // 🔹 Obtener valores del formulario
    var condicionPago = $("#contrato_condicion_pago").val();
    var cuota = $("#contrato_cuotas").val();
    var intervaloFechaVence = $("#contrato_intervalo_fecha_vence").val();

    var fecha = $("#contrato_fecha").val();
    var fechaInicio = $("#contrato_fecha_inicio").val();
    var fechaFin = $("#contrato_fecha_fin").val();

    var empresa = $("#empresa_id").val();
    var sucursal = $("#sucursal_id").val();
    var cliente = $("#clientes_id").val();
    var tipoServicio = $("#tipo_servicio_id").val();
    var user = $("#funcionario_id").val();

    // 🔹 Nuevos campos del contrato
    var tipoContratoId = $("#tipo_contrato_id").val();
    var contratoObjeto = $("#contrato_objeto").val();
    var contratoAlcance = $("#contrato_alcance").val();
    var contratoResponsabilidad = $("#contrato_responsabilidad").val();
    var contratoGarantia = $("#contrato_garantia").val();
    var contratoLimitacion = $("#contrato_limitacion").val();
    var contratoFuerzaMayor = $("#contrato_fuerza_mayor").val();
    var contratoJurisdiccion = $("#contrato_jurisdiccion").val();

    var observacion = $("#contrato_observacion").val();

    // 🔹 Ajustar IFV según condición de pago
    var formattedIntervaloFechaVence =
        $("#contrato_intervalo_fecha_vence").is(':disabled') ? null : intervaloFechaVence;

    if (condicionPago === 'CONTADO') {
        formattedIntervaloFechaVence = null;
        cuota = null;
    }

    // 🔹 Envío de datos (SE ENVÍA TODO SIEMPRE)
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id: $("#id").val(),

            contrato_fecha: fecha,
            contrato_fecha_inicio: fechaInicio,
            contrato_fecha_fin: fechaFin,
            contrato_intervalo_fecha_vence: formattedIntervaloFechaVence,

            contrato_estado: estado,
            contrato_condicion_pago: condicionPago,
            contrato_cuotas: cuota,

            tipo_contrato_id: tipoContratoId,
            contrato_objeto: contratoObjeto,
            contrato_alcance: contratoAlcance,
            contrato_responsabilidad: contratoResponsabilidad,
            contrato_garantia: contratoGarantia,
            contrato_limitacion: contratoLimitacion,
            contrato_fuerza_mayor: contratoFuerzaMayor,
            contrato_jurisdiccion: contratoJurisdiccion,

            contrato_observacion: observacion,

            empresa_id: empresa,
            sucursal_id: sucursal,
            clientes_id: cliente,
            tipo_servicio_id: tipoServicio,
            funcionario_id: user,

            operacion: $("#txtOperacion").val(),
            contrato_representante: $("#contrato_representante").val(),
            orden_serv_cab_id: $("#orden_serv_cab_id").val() || null
        }
    })
    .done(function (resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                }
                if (resultado.registro && resultado.registro.contrato_numero) {
                    $("#contrato_numero").val(resultado.registro.contrato_numero);
                }
                if (resultado.registro && resultado.registro.contrato_estado) {
                    $("#contrato_estado").val(resultado.registro.contrato_estado);
                }

                $("#detalle").attr("style", "display:block;");
                listarDetalles();

                if (resultado.registro.contrato_estado !== "PENDIENTE"
                    || $("#txtOperacion").val() == 2) {
                    location.reload(true);
                } else {
                    $("#contrato_fecha").attr("disabled","true");
                    $("#contrato_fecha_inicio").attr("disabled","true");
                    $("#contrato_fecha_fin").attr("disabled","true");
                    $("#contrato_condicion_pago").attr("disabled","true");
                    $("#contrato_observacion").attr("disabled","true");
                    $("#tipo_serv_nombre").attr("disabled","true");
                    $("#suc_razon_social").attr("disabled","true");
                    $("#cli_nombre").attr("disabled","true");
                    $("#tip_con_nombre").attr("disabled","true");
                    $("#contrato_objeto").attr("disabled","true");
                    $("#contrato_alcance").attr("disabled","true");
                    $("#contrato_responsabilidad").attr("disabled","true");
                    $("#contrato_garantia").attr("disabled","true");
                    $("#contrato_limitacion").attr("disabled","true");
                    $("#contrato_fuerza_mayor").attr("disabled","true");
                    $("#contrato_jurisdiccion").attr("disabled","true");
                    $("#contrato_representante").attr("disabled","true");
                    $("#orden_buscar").attr("disabled","true");

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
    $("#item_descripcion").removeAttr("disabled");
    $("#tipo_imp_nom").attr("disabled","true");
    $("#contrato_serv_det_cantidad_stock").attr("disabled","true");
    $("#contrato_serv_det_cantidad").removeAttr("disabled");
    $("#contrato_serv_det_costo").attr("disabled","true");

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
    $("#btnCancelarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    if (!$("#item_id").val()) {
        swal("Aviso", "Seleccione un item de la tabla para editar.", "warning");
        return;
    }
    mmCargarMarcas($('#item_id').val(), null);
    $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    cargarDepositosDet($('#deposito_id_det').val());
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#tipo_imp_nom").attr("disabled","true");
    $("#contrato_serv_det_cantidad_stock").attr("disabled","true");
    $("#contrato_serv_det_cantidad").removeAttr("disabled");
    $("#contrato_serv_det_costo").attr("disabled","true");

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
    $("#btnCancelarDetalle").attr("style", "display:inline");
}

function eliminarDetalle() {
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}
function cancelarDetalle() {
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    mmLimpiar();
    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");
    $("#btnCancelarDetalle").attr("style","display:none");
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val("");
    $("#original_item_id").val("");
    $("#item_descripcion").val("");
    $("#tipo_imp_nom").val("");
    $("#tipo_impuesto_id").val("");
    $("#contrato_serv_det_cantidad_stock").val("");
    $("#contrato_serv_det_cantidad").val("");
    $("#contrato_serv_det_costo").val("");
}

function grabarDetalle() {
    var operacion = parseInt($("#txtOperacionDetalle").val());
    var endpoint  = "contratoservdet/create";
    var metodo    = "POST";

    if (operacion === 2) {
        endpoint = "contratoservdet/update/" + $("#id").val();
        metodo   = "PUT";
    }
    if (operacion === 3) {
        swal({
            title: "ELIMINAR",
            text: "¿DESEA ELIMINAR EL DETALLE SELECCIONADO?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "SI",
            cancelButtonText: "NO",
            closeOnConfirm: false
        }, function() {
            $.ajax({
                url: getUrl() + "contratoservdet/delete/" + $("#id").val() + "/" + $("#item_id").val(),
                method: "DELETE",
                dataType: "json"
            })
            .done(function(respuesta) {
                swal({ title: "Respuesta", text: respuesta.mensaje, type: respuesta.tipo }, function() {
                    cancelarDetalle();
                    listarDetalles();
                });
            })
            .fail(function(xhr) {
                mostrarErrores(xhr);
            });
        });
        return;
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "contrato_serv_cab_id":          $("#id").val(),
            "item_id":                       $("#item_id").val(),
            "original_item_id":              $("#original_item_id").val(),
            "tipo_impuesto_id":              $("#tipo_impuesto_id").val(),
            "contrato_serv_det_cantidad":    $("#contrato_serv_det_cantidad").val(),
            "contrato_serv_det_costo":       $("#contrato_serv_det_costo").val(),
            "contrato_serv_det_cantidad_stock": $("#contrato_serv_det_cantidad_stock").val(),
            "marca_id":    _mmMarcaId  ? parseInt(_mmMarcaId)  : null,
            "modelo_id":   _mmModeloId ? parseInt(_mmModeloId) : null,
            "deposito_id": $("#deposito_id_det").val() || null
        }
    })
    .done(function(respuesta) {
        swal({ title: "Respuesta", text: respuesta.mensaje, type: respuesta.tipo }, function() {
            cancelarDetalle();
            listarDetalles();
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
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
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, cantidad_disponible){
    // Asignar valores a los campos del detalle
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#contrato_serv_det_costo").val(item_costo); // <- Asignar el costo al campo del detalle
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    
    // Asignar cantidad disponible al campo correspondiente
    $("#contrato_serv_det_cantidad_stock").val(cantidad_disponible);

    // Cálculo de subtotal y total con impuesto (opcional)
    const cantidad = parseFloat($("#contrato_serv_det_cantidad").val()) || 0;
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
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    $.ajax({
        url: getUrl() + "contratoservdet/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.contrato_serv_det_cantidad) || 0;
                const costo = parseFloat(rs.contrato_serv_det_costo) || 0;
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
                lista += "<tr class='item-list' onclick=\"seleccionSolicitudDet("
                    + rs.item_id + ", '"
                    + (rs.item_descripcion || '').replace(/'/g,"\\'") + "', "
                    + cantidad + ", "
                    + rs.contrato_serv_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + (rs.tipo_imp_nom || '').replace(/'/g,"\\'") + "', "
                    + (rs.marca_id  || 0) + ", "
                    + (rs.modelo_id || 0) + ", "
                    + (rs.deposito_id || 0) + ",'"
                    + (rs.dep_nombre || '').replace(/'/g,"\\'") + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_descripcion + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.contrato_serv_det_cantidad_stock + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.mar_nom   || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "<td>" + (rs.dep_nombre || '-') + "</td>";
                lista += "<td>" + rs.tipo_imp_nom + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='8' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        // Activar o desactivar Confirmar
       if ($("#contrato_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionSolicitudDet(item_id, item_descripcion, contrato_serv_det_cantidad, contrato_serv_det_cantidad_stock, contrato_serv_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id, deposito_id, dep_nombre) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#contrato_serv_det_cantidad").val(contrato_serv_det_cantidad);
    $("#contrato_serv_det_cantidad_stock").val(contrato_serv_det_cantidad_stock);
    $("#contrato_serv_det_costo").val(contrato_serv_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    // Calcular subtotal y IVA para mostrar en el formulario si quieres
    const subtotal = contrato_serv_det_cantidad * contrato_serv_det_costo;
    let iva = 0;
    if (tipo_imp_nom === "IVA10") {
        iva = subtotal / 11;
    } else if (tipo_imp_nom === "IVA5") {
        iva = subtotal / 21;
    }

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));

    mmAutocompletar(item_id, marca_id, modelo_id);
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>').prop('disabled', true);
    } else {
        $dep.html('<option value="">-- Depósito --</option>').prop('disabled', true);
    }
    $(".form-line").attr("class","form-line focused");
}
function buscarEmpresas() {
    $.ajax({
        url:getUrl() + "empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        
        // Comprobar si hay empresas en el resultado
        if (resultado.length > 0) {
            // Seleccionar automáticamente la primera empresa
            var primeraEmpresa = resultado[0];
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telef, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telef, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telef").val(emp_telef);
    $("#emp_correo").val(emp_correo);

    $("#listaEmpresa").html("");
    $("#listaEmpresa").attr("style", "display:none;");
}

function buscarSucursal(){
    $.ajax({
        url:getUrl() + "sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr){
        mostrarErrores(xhr);
    })
}

function seleccionSucursal(empresa_id,suc_razon_social,suc_direccion,suc_telefono,suc_correo){
    $("#sucursal_id").val(empresa_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#suc_direccion").val(suc_direccion);
    $("#suc_telefono").val(suc_telefono);
    $("#suc_correo").val(suc_correo);

    $("#listaSucursal").html("");
    $("#listaSucursal").attr("style","display:none;");
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

function renovarContrato() {
    var id = $("#id").val();
    if (!id) { swal("Error", "No hay contrato seleccionado.", "error"); return; }
    swal({
        title: "¿Renovar contrato?",
        text: "Se creará un nuevo contrato en estado PENDIENTE copiando todos los datos y detalles.",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, renovar",
        cancelButtonText: "Cancelar"
    }, function (confirmado) {
        if (!confirmado) return;
        $.ajax({
            url: getUrl() + "contratoservcab/renovar/" + id,
            method: "PUT",
            dataType: "json"
        })
        .done(function (resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo });
            listar();
        })
        .fail(function (xhr) { mostrarErrores(xhr); });
    });
}

function buscarOrdenParaContrato() {
    var texto = $("#orden_buscar").val();
    $.ajax({
        url: getUrl() + "ordenserviciocab/buscar-para-contrato",
        method: "POST",
        dataType: "json",
        data: { texto: texto }
    })
    .done(function (resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionOrdenContrato("
                + rs.id + ", '" + (rs.orden_texto || '').replace(/'/g, "\'") + "');\">"
                + rs.orden_texto + " — " + (rs.cli_nombre || '') + " " + (rs.cli_apellido || '')
                + "</li>";
        }
        lista += "</ul>";
        $("#lista_orden").html(lista);
    })
    .fail(function (xhr) { mostrarErrores(xhr); });
}

function seleccionOrdenContrato(id, texto) {
    $("#orden_serv_cab_id").val(id);
    $("#orden_texto").val(texto);
    $("#lista_orden").html('');
    $("#orden_buscar").val('');
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

