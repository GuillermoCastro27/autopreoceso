// Lista los registros de pedidos utilizando DataTables
// Cargar user_id del usuario logueado
let cuotasActualesCobro = [];
cargarUserIdLogueado();
listar();
campoFecha();
// Configura el formato de la tabla para exportar en diferentes formatos
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
                title:'Listado de Ventas'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ventas'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ventas'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ventas'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}
// Función para recargar la página y cancelar operaciones.
function cancelar() {
    location.reload(true);
}

// Prepara el formulario para agregar una nueva compra.
function agregar() {

    $("#txtOperacion").val(1);
    $("#id").val(0);

    // ===============================
    // Cabecera del cobro
    // ===============================
    $("#emp_razon_social").attr("disabled", true);
    $("#suc_razon_social").removeAttr("disabled");
    $("#caja").removeAttr("disabled");
    $("#cobro_fecha").removeAttr("disabled");

    $("#cli_nombre").removeAttr("disabled");
    $("#forma_cobro").removeAttr("disabled");
    $("#cobro_observacion").removeAttr("disabled");

    // ===============================
    // Campos genéricos
    // ===============================
    $("#numero_documento").attr("disabled", true);
    $("#nro_voucher").attr("disabled", true);
    $("#portador").attr("disabled", true);
    $("#fecha_cobro_diferido").attr("disabled", true);

    // ===============================
    // 🔒 Inicializar medios de cobro
    // ===============================
    deshabilitarCobroTarjeta();
    deshabilitarCobroCheque();

    $("#monto_tarjeta").val("");
    $("#monto_cheque").val("");

    // ===============================
    // Botones
    // ===============================
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAgregarTarjeta").removeAttr("disabled");
    $("#btnAgregarCheque").removeAttr("disabled");

    // ===============================
    // UI
    // ===============================
    $(".form-line").addClass("focused");
    $("#registros").hide();

    buscarEmpresas();
}
// Prepara el formulario para editar una compra existente.
function editar() {

    // ==================================================
    // 🔒 REGLA DE NEGOCIO (MANDATORIA)
    // ==================================================
    if ($("#cobro_estado").val() !== "PENDIENTE") {
        swal("Atención", "Solo se pueden modificar cobros pendientes", "warning");
        return;
    }

    // ==================================================
    // 🔹 OPERACIÓN: EDITAR
    // ==================================================
    $("#txtOperacion").val(2);

    // ==================================================
    // 🔹 CABECERA DEL COBRO
    // ==================================================
    $("#emp_razon_social").prop("disabled", true);
    $("#suc_razon_social").prop("disabled", false);
    $("#caja").prop("disabled", false);
    $("#cobro_fecha").prop("disabled", false);

    $("#cli_nombre").prop("disabled", false);
    $("#forma_cobro").prop("disabled", false);
    $("#cobro_observacion").prop("disabled", false);

    // ==================================================
    // 🔹 CAMPOS GENERALES (NO EDITABLES)
    // ==================================================
    $("#numero_documento").prop("disabled", true);
    $("#nro_voucher").prop("disabled", true);
    $("#portador").prop("disabled", true);
    $("#fecha_cobro_diferido").prop("disabled", true);

    // ==================================================
    // 🔹 MEDIOS DE COBRO (SOLO HABILITAR)
    // ==================================================
    habilitarCobroTarjeta(true);
    habilitarCobroCheque(true);

    // ==================================================
    // 🔒 BOTONES (EDITANDO)
    // ==================================================
    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);
    $("#btnEliminar").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true); // 🔒 NUNCA habilitar acá

    $("#btnGrabar").prop("disabled", false);
    $("#btnCancelar").prop("disabled", false);
    $("#btnAgregarTarjeta").prop("disabled", false);
    $("#btnAgregarCheque").prop("disabled", false);

    // ==================================================
    // 🔹 UI
    // ==================================================
    $(".form-line").addClass("focused");
    $("#registros").hide();
}


// Prepara el formulario para eliminar una compra.
function eliminar() {

    $("#txtOperacion").val(3); // ANULAR

    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}


// Prepara el formulario para confirmar una compra.
function confirmar() {

    $("#txtOperacion").val(4); // CONFIRMAR

    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}


// Muestra un cuadro de diálogo para confirmar la operación antes de realizarla.
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
    if(oper === 4) {
        titulo = "CONFIRMAR";
        pregunta = "DESEA CONFIRMAR EL COBRO SELECCIONADO?";
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

// Muestra un mensaje de operación con SweetAlert.
function mensajeOperacion(titulo, mensaje, tipo) {
    swal(titulo, mensaje, tipo);
}
function habilitarCobroTarjeta() {

    $("#nro_tarjeta").prop("disabled", false);
    $("#fecha_venc_tarjeta").prop("disabled", false);
    $("#monto_tarjeta").prop("disabled", false);
    $("#nro_voucher_tarjeta").prop("disabled", false);

    $("#entidad_emisora_tarjeta").prop("disabled", false);
    $("#marca_tarjeta_tarjeta").prop("disabled", false);
    $("#entidad_adherida_tarjeta").prop("disabled", false);

    $(".form-line").addClass("focused");
}
function deshabilitarCobroTarjeta() {

    $("#nro_tarjeta").prop("disabled", true).val("");
    $("#fecha_venc_tarjeta").prop("disabled", true).val("");
    $("#monto_tarjeta").prop("disabled", true).val("");
    $("#nro_voucher_tarjeta").prop("disabled", true).val("");

    $("#entidad_emisora_tarjeta").prop("disabled", true).val("");
    $("#marca_tarjeta_tarjeta").prop("disabled", true).val("");
    $("#entidad_adherida_tarjeta").prop("disabled", true).val("");

    $("#entidad_emisora_tarjeta_id").val("");
    $("#marca_tarjeta_tarjeta_id").val("");
    $("#entidad_adherida_tarjeta_id").val("");
}
function deshabilitarCobroCheque() {

    $("#nro_cheque").prop("disabled", true).val("");
    $("#fecha_venc_cheque").prop("disabled", true).val("");
    $("#monto_cheque").prop("disabled", true).val("");

    $("#entidad_emisora_cheque").prop("disabled", true).val("");
    $("#entidad_emisora_cheque_id").val("");
}
function habilitarCobroEfectivo(habilitar) {

    $("#monto_efectivo").prop("disabled", !habilitar);

    if (!habilitar) {
        $("#monto_efectivo").val("");
        $("#vuelto").val("");
    }
}

function validarCobro() {

    let total = parseFloat($("#cobro_importe").val()) || 0;

    let tarjeta = parseFloat($("#monto_tarjeta").val()) || 0;
    let cheque  = parseFloat($("#monto_cheque").val()) || 0;

    let suma = tarjeta + cheque;

    if (suma <= 0) {
        swal("Error", "Debe ingresar al menos un medio de cobro", "error");
        return false;
    }

    if (suma > total) {
        swal("Error", "La suma de los medios de cobro supera el importe", "error");
        return false;
    }

    if (tarjeta > 0 && $("#entidad_emisora_id").val() === "") {
        swal("Error", "Debe seleccionar la entidad emisora de la tarjeta", "error");
        return false;
    }

    if (cheque > 0 && $("#nro_cheque").val().trim() === "") {
        swal("Error", "Debe ingresar el número de cheque", "error");
        return false;
    }

    return true;
}
function mostrarPanelNuevaCuota() {
    $("#panelNuevaCuota").slideDown();
}
function recalcularTotalCobrar(montoNuevo) {

    let total = parseFloat($("#totalCobrar").text().replace(/\./g, "").replace(",", ".")) || 0;
    total += montoNuevo;

    $("#totalCobrar").text(formatearNumero(total));
}
function listarCtasCobrarCliente() {

    let clienteId = $("#clientes_id").val();

    if (!clienteId) {
        swal("Atención", "No hay cliente seleccionado", "warning");
        return;
    }

    cargarCtasCobrar(clienteId);
}
// Lista los registros de compra mediante una solicitud AJAX
function listar() {

    $.ajax({
        url: getUrl() + "cobros_cab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            lista += `<tr class="item-list"
                onclick="seleccionCobro(
                    ${rs.id},
                    ${rs.clientes_id},
                    ${rs.forma_cobro_id},

                    ${rs.empresa_id},
                    '${rs.emp_razon_social}',

                    ${rs.sucursal_id},
                    '${rs.suc_razon_social}',

                    '${rs.cli_nombre}',
                    '${rs.cli_apellido}',
                    '${rs.cli_ruc}',
                    '${rs.cli_telefono}',
                    '${rs.cli_correo}',
                    '${rs.cli_direccion}',
                    '${rs.cobro_observacion}',
                    '${rs.forma_cobro}',
                    '${rs.caja}',
                    '${rs.cobro_fecha}',
                    '${rs.fecha_cobro_diferido}',
                    '${rs.numero_documento}',
                    '${rs.nro_voucher}',
                    '${rs.portador}',

                    ${rs.entidad_emisora_id},
                    '${rs.entidad_emisora}',

                    ${rs.marca_tarjeta_id},
                    '${rs.marca_tarjeta}',

                    ${rs.entidad_adherida_id},
                    '${rs.entidad_adherida}',

                    ${rs.cobro_importe},
                    ${rs.monto_efectivo},
                    '${rs.cobro_estado}',
                    ${rs.ventas_cab_id}
                )">`;

            lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.cobro_fecha}</td>`;
            lista += `<td>${rs.cli_nombre} ${rs.cli_apellido}</td>`;
            lista += `<td>${rs.forma_cobro}</td>`;
            lista += `<td>${rs.caja}</td>`;
            lista += `<td class="text-right">${formatearNumero(rs.cobro_importe)}</td>`;
            lista += `<td>${rs.cobro_estado}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function () {
        swal("Error", "No se pudieron cargar los cobros", "error");
    });
}
function seleccionCobro(
    id,
    clientes_id,
    forma_cobro_id,

    empresa_id,
    emp_razon_social,

    sucursal_id,
    suc_razon_social,

    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_telefono,
    cli_correo,
    cli_direccion,

    cobro_observacion,
    forma_cobro,
    caja,
    cobro_fecha,
    fecha_cobro_diferido,
    numero_documento,
    nro_voucher,
    portador,

    entidad_emisora_id,
    entidad_emisora,

    marca_tarjeta_id,
    marca_tarjeta,

    entidad_adherida_id,
    entidad_adherida,

    cobro_importe,
    monto_efectivo,
    cobro_estado,
    ventas_cab_id
) {

    /* =========================
       1️⃣ IDS BASE
    ========================= */
    $("#id").val(id);
    $("#clientes_id").val(clientes_id);
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#cobro_estado").val(cobro_estado);

    aplicarEstadoCobro(); // 🔒 controla botones según estado

    /* =========================
       2️⃣ CABECERA
    ========================= */
    $("#forma_cobro_id").val(forma_cobro_id);

    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);

    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);
    $("#cli_direccion").val(cli_direccion);

    $("#cobro_fecha").val(cobro_fecha);
    $("#fecha_cobro_diferido").val(fecha_cobro_diferido);
    $("#cobro_importe").val(cobro_importe);
    $("#cobro_observacion").val(cobro_observacion);

    $("#forma_cobro").val(forma_cobro);
    $("#numero_documento").val(numero_documento);
    $("#nro_voucher").val(nro_voucher);
    $("#portador").val(portador);
    $("#caja").val(caja);

    /* =========================
       3️⃣ ENTIDADES (VISUAL)
       (solo texto, NO fuente de verdad)
    ========================= */
    $("#entidad_emisora").val(entidad_emisora || "N/A");
    $("#marca_tarjeta").val(marca_tarjeta || "N/A");
    $("#entidad_adherida").val(entidad_adherida || "N/A");

    /* =========================
       4️⃣ ENTIDADES (IDS)
    ========================= */
    $("#entidad_emisora_id").val(entidad_emisora_id || "");
    $("#marca_tarjeta_id").val(marca_tarjeta_id || "");
    $("#entidad_adherida_id").val(entidad_adherida_id || "");

    /* =========================
       5️⃣ LIMPIAR PANELES
    ========================= */
    deshabilitarCobroTarjeta();
    deshabilitarCobroCheque();

    $("#monto_efectivo").val(0);
    $("#vuelto").val(0);

    /* =========================
       6️⃣ CARGAR EFECTIVO
    ========================= */
    $("#monto_efectivo").val(monto_efectivo || 0);
    $("#monto_efectivo").trigger("input"); // recalcula vuelto

    /* =========================
       7️⃣ CARGAR DETALLES REALES
       (FUENTE DE VERDAD)
    ========================= */
    listarCobroTarjeta(id);
    listarCobroCheque(id);

    /* =========================
       8️⃣ UI – MODO CONSULTA
    ========================= */
    $("input, select").prop("disabled", true);

    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);
    $("#btnEliminar").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (cobro_estado === "PENDIENTE") {
        $("#btnEditar").prop("disabled", false);
        $("#btnEliminar").prop("disabled", false);
        $("#btnConfirmar").prop("disabled", false);
    }

    /* =========================
       9️⃣ LISTADOS
    ========================= */
    listarDetalles();
    listarCtasCobro(id);

    /* =========================
       🔟 MOSTRAR DETALLE
    ========================= */
    $("#registros").hide();
    $("#detalle").show();

    $(".form-line").addClass("focused");
}
function aplicarEstadoCobro() {

    let estado = $("#cobro_estado").val();

    // 🔒 SIEMPRE arrancar bloqueando
    $("#btnConfirmar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);

    if (estado === "PENDIENTE") {

        $("#btnConfirmar").prop("disabled", false);
        $("#btnEditar").prop("disabled", false);
        habilitarFormulario();

    } else {
        // CONFIRMADO o ANULADO
        bloquearFormulario();
    }
}

function obtenerCtasSeleccionadas() {

    let ctas = [];

    $(".chk-cuota:checked").each(function () {
        ctas.push({
            id: $(this).data("id"),
            monto: $(this).data("monto")
        });
    });

    return ctas;
}

function listarCtasCobro(cobro_id) {

    $.ajax({
        url: getUrl() + "cobros_cab/ctas/" + cobro_id,
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let filas = "";
        let total = 0;

        cuotasActualesCobro = []; // 🔥 reset

        for (let rs of resultado) {

            total += parseFloat(rs.monto_cobrado);

            // 🔥 GUARDAMOS EL ID REAL DE LA CUOTA
            cuotasActualesCobro.push(rs.cta_cobrar_id);

            filas += `
                <tr>
                    <td>${rs.venta_nro}</td>
                    <td>${rs.nro_cuota}</td>
                    <td>${rs.fecha_vencimiento}</td>
                    <td class="text-right">${formatearNumero(rs.monto_cobrado)}</td>
                </tr>
            `;
        }

        $("#tablaCtasCobrar").html(filas);
        $("#totalCobrar").text(formatearNumero(total));
        $("#panelCtasCobrar").show();
    })
    .fail(function () {
        swal("Error", "No se pudieron cargar las cuotas del cobro", "error");
    });
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0,00';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function buscarClienteCtasCobrar() {

    $.ajax({
        url: getUrl() + "clientes/buscar",
        method: "POST",
        dataType: "json",
        data: {
            cli_nombre: $("#cli_nombre").val()
        }
    })
    .done(function(resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += "<li class='list-group-item' " +
                "onclick=\"seleccionClienteCtas(" +
                rs.id + ",'" +
                rs.cli_nombre + "','" +
                rs.cli_apellido + "','" +
                rs.cli_ruc + "','" +
                rs.cli_telefono + "','" +
                rs.cli_correo + "','" +
                rs.cli_direccion +
                "')\">" +
                rs.cli_nombre + " " + rs.cli_apellido + " - " + rs.cli_ruc +
            "</li>";
        }

        lista += "</ul>";

        $("#listaClientes").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function(xhr, status, error) {
        console.error("Error al buscar clientes:", error);
    });
}
function seleccionClienteCtas(
    clientes_id,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_telefono,
    cli_correo,
    cli_direccion
) {

    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);
    $("#cli_direccion").val(cli_direccion);

    // 🔥 CERRAR TODAS LAS LISTAS FLOTANTES
    $("#listaClientes").hide().html("");
    $("#listaFormasCobro").hide().html("");
    $("#listaEntidadEmi").hide().html("");
    $("#listaMarcaTarj").hide().html("");
    $("#listaEntidadAdhe").hide().html("");

    $(".form-line").addClass("focused");

    // Cargar CTAS
    cargarCtasCobrar(clientes_id);
}

$(document).on("change", ".chk-cuota", function () {
    calcularTotalCobro();
});

$(document).ready(function () {

    // ============================
    // CALCULAR VUELTO EN TIEMPO REAL
    // ============================
    $("#monto_efectivo").on("input", function () {

        let montoEfectivo = parseFloat($(this).val()) || 0;
        let importeCobro  = parseFloat($("#cobro_importe").val()) || 0;

        let vuelto = montoEfectivo - importeCobro;

        $("#vuelto").val(vuelto > 0 ? vuelto : 0);
    });

    // ============================
    // RE-CALCULAR SI CAMBIA IMPORTE
    // ============================
    $("#cobro_importe").on("input", function () {
        $("#monto_efectivo").trigger("input");
    });

});
function cargarCtasCobrar(cliente_id) {

    $.ajax({
        url: getUrl() + "ctas_cobrar/cliente/" + cliente_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {

        let filas = "";

        for (let rs of resultado) {

            // ✅ si esta cuota ya pertenece a ESTE cobro → checked
            let checked = cuotasActualesCobro.includes(rs.id) ? "checked" : "";

            // ✅ si la cuota está COBRADA/CONFIRMADA en otro cobro → bloquear
            // (ajustá el nombre exacto de tu campo)
            let bloqueada = (rs.cta_cob_estado && rs.cta_cob_estado === "COBRADA")
                            ? "disabled"
                            : "";

            let chkId = "chk_cuota_" + rs.id;

            filas += `
                <tr>
                    <td class="text-center">
                        <input type="checkbox"
                               id="${chkId}"
                               class="chk-cuota"
                               data-id="${rs.id}"
                               data-venta="${rs.ventas_cab_id}"
                               data-monto="${rs.cta_cob_monto}"
                               ${checked}
                               ${bloqueada}>
                        <label for="${chkId}"></label>
                    </td>
                    <td>${rs.venta_nro}</td>
                    <td>${rs.nro_cuota}</td>
                    <td>${rs.fecha_vencimiento}</td>
                    <td class="text-right">${formatearNumero(rs.cta_cob_monto)}</td>
                </tr>
            `;
        }

        $("#tablaCtasCobrar").html(filas);
        calcularTotalCobro(); // recalcula y arma cuotas_seleccionadas
        $("#panelCtasCobrar").show();
    })
    .fail(function() {
        swal("Error", "No se pudieron cargar las cuentas a cobrar", "error");
    });
}

function calcularTotalCobro() {

    let total = 0;
    let ventaSeleccionada = null;
    let cuotas = [];

    $(".chk-cuota:checked").each(function () {

        let monto   = parseFloat($(this).data("monto"));
        let ventaId = $(this).data("venta");
        let cuotaId = $(this).data("id");

        if (!ventaSeleccionada) {
            ventaSeleccionada = ventaId;
            $("#ventas_cab_id").val(ventaId);
        }

        if (ventaId != ventaSeleccionada) {
            swal("Atención", "Solo se pueden cobrar cuotas de una misma venta", "warning");
            $(this).prop("checked", false);
            return;
        }

        total += monto;
        cuotas.push(cuotaId);
    });

    $("#totalCobrar").text(formatearNumero(total));
    $("#cobro_importe").val(total.toFixed(2));

    // ✅ ESTO es lo que usa el UPDATE para agregar/quitar
    $("#cuotas_seleccionadas").val(JSON.stringify(cuotas));

    $(".form-line").addClass("focused");
}
function buscarFormasCobro() {
    console.log("buscarFormasCobro ejecutado");
    let texto = $("#forma_cobro").val();

    // Si está vacío, no buscar
    if (texto.length === 0) {
        $("#listaFormasCobro").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "forma_cobro/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            // Filtrado en frontend (simple y efectivo)
            if (rs.for_cob_descripcion.toLowerCase().includes(texto.toLowerCase())) {

                lista += "<li class='list-group-item' " +
                    "onclick=\"seleccionFormaCobro(" +
                    rs.forma_cobro_id + ",'" +
                    rs.for_cob_descripcion +
                    "')\">" +
                    rs.for_cob_descripcion +
                "</li>";
            }
        }

        lista += "</ul>";

        $("#listaFormasCobro").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar formas de cobro");
    });
}
function seleccionFormaCobro(id, descripcion) {

    $("#forma_cobro_id").val(id);
    $("#forma_cobro").val(descripcion);

    $("#listaFormasCobro").html("").hide();
    $(".form-line").addClass("focused");

    // 👇 acá después podés poner reglas
    controlarCamposFormaCobro(descripcion);
}
function controlarCamposFormaCobro(descripcion) {

    // ==================================================
    // 🔄 RESET GENERAL
    // ==================================================
    $("#numero_documento").prop("disabled", true).val("");
    $("#nro_voucher").prop("disabled", true).val("");
    $("#portador").prop("disabled", true).val("");
    $("#fecha_cobro_diferido").prop("disabled", true).val("");

    $("#entidad_emisora").prop("disabled", true).val("");
    $("#marca_tarjeta").prop("disabled", true).val("");
    $("#entidad_adherida").prop("disabled", true).val("");

    // 🔥 IDs ocultos
    $("#entidad_emisora_id").val("");
    $("#marca_tarjeta_id").val("");
    $("#entidad_adherida_id").val("");

    // 🔥 EFECTIVO
    $("#monto_efectivo").prop("disabled", true).val("");
    $("#vuelto").val("");

    // ==================================================
    // 💵 EFECTIVO
    // ==================================================
    if (descripcion.includes("Efectivo")) {
        $("#monto_efectivo").prop("disabled", false);
    }

    // ==================================================
    // 🧾 CHEQUE
    // ==================================================
    if (descripcion.includes("Cheque")) {
        $("#numero_documento").prop("disabled", false);
        $("#portador").prop("disabled", false);
        $("#fecha_cobro_diferido").prop("disabled", false);
    }

    // ==================================================
    // 💳 TARJETA
    // ==================================================
    if (descripcion.includes("Tarjeta")) {
        $("#nro_voucher").prop("disabled", false);
        $("#entidad_emisora").prop("disabled", false);
        $("#marca_tarjeta").prop("disabled", false);
        $("#entidad_adherida").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}

function buscarEntidadEmisora() {

    let texto = $("#entidad_emisora").val().trim();

    if (texto.length === 0) {
        $("#listaEntidadEmi").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "entidad_emisora/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            if (rs.ent_emis_nombre.toLowerCase().includes(texto.toLowerCase())) {

                lista += `
                <li class="list-group-item"
                    onclick="seleccionEntidadEmisoraCab(
                        ${rs.entidad_emisora_id},
                        '${rs.ent_emis_nombre}'
                    )">
                    ${rs.ent_emis_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        $("#listaEntidadEmi").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar entidad emisora (cabecera)");
    });
}
function seleccionEntidadEmisoraCab(id, nombre) {

    $("#entidad_emisora_id").val(id);
    $("#entidad_emisora").val(nombre);

    $("#listaEntidadEmi").html("").hide();
    $(".form-line").addClass("focused");

    // 🔄 Reset dependientes (SOLO CABECERA)
    $("#marca_tarjeta").val("");
    $("#marca_tarjeta_id").val("");
    $("#entidad_adherida").val("");
    $("#entidad_adherida_id").val("");

    $("#marca_tarjeta").removeAttr("disabled");
}
function buscarMarcaTarjeta() {

    let texto = $("#marca_tarjeta").val().trim();

    if (texto.length === 0) {
        $("#listaMarcaTarj").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "marca_tarjeta/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            if (rs.marca_nombre.toLowerCase().includes(texto.toLowerCase())) {

                lista += `
                <li class="list-group-item"
                    onclick="seleccionMarcaTarjetaCab(
                        ${rs.marca_tarjeta_id},
                        '${rs.marca_nombre}'
                    )">
                    ${rs.marca_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        $("#listaMarcaTarj").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar marca tarjeta (cabecera)");
    });
}
function seleccionMarcaTarjetaCab(id, nombre) {

    $("#marca_tarjeta_id").val(id);
    $("#marca_tarjeta").val(nombre);

    $("#listaMarcaTarj").html("").hide();
    $(".form-line").addClass("focused");

    // 🔄 Reset entidad adherida (SOLO CABECERA)
    $("#entidad_adherida").val("");
    $("#entidad_adherida_id").val("");

    $("#entidad_adherida").removeAttr("disabled");
}
function buscarEntidadAdherida() {

    let texto = $("#entidad_adherida").val().trim();
    let entidadEmisoraId = $("#entidad_emisora_id").val();
    let marcaTarjetaId   = $("#marca_tarjeta_id").val();

    if (!entidadEmisoraId || !marcaTarjetaId) {
        $("#listaEntidadAdhe").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "entidad_adherida/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";
        let encontrado = false;

        for (let rs of resultado) {

            if (
                rs.entidad_emisora_id == entidadEmisoraId &&
                rs.marca_tarjeta_id == marcaTarjetaId &&
                rs.ent_adh_nombre.toLowerCase().includes(texto.toLowerCase())
            ) {

                encontrado = true;

                lista += `
                <li class="list-group-item"
                    onclick="seleccionEntidadAdheridaCab(
                        ${rs.entidad_adherida_id},
                        '${rs.ent_adh_nombre}'
                    )">
                    ${rs.ent_adh_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        if (encontrado) {
            $("#listaEntidadAdhe").html(lista).css({
                display: "block",
                position: "absolute",
                zIndex: 2000
            });
        } else {
            $("#listaEntidadAdhe").html("").hide();
        }
    })
    .fail(function () {
        console.error("Error al buscar entidad adherida (cabecera)");
    });
}
function seleccionEntidadAdheridaCab(id, nombre) {

    $("#entidad_adherida_id").val(id);
    $("#entidad_adherida").val(nombre);

    $("#listaEntidadAdhe").html("").hide();
    $(".form-line").addClass("focused");
}

function buscarApertCierCaja() {

    $.ajax({
        url: getUrl() + "apertura_cierre_caja/abiertas",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += "<li class='list-group-item' " +
                "onclick=\"seleccionApertCierCaja(" +
                    rs.apertura_cierre_caja_id + ",'" +
                    rs.caja_descripcion +
                "')\">" +
                rs.caja_descripcion + " | " +
                rs.usuario + " | " +
                rs.fecha_apertura +
            "</li>";
        }

        lista += "</ul>";

        $("#listaAperCierCaja").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        swal("Error", "No se pudieron cargar las cajas abiertas", "error");
    });
}
function seleccionApertCierCaja(id, descripcion) {

    $("#apertura_cierre_caja_id").val(id);
    $("#caja").val(descripcion);

    $("#listaAperCierCaja").html("").hide();
    $(".form-line").addClass("focused");
}
function buscarEntidadEmisoraTarjeta() {

    let texto = $("#entidad_emisora_tarjeta").val().trim();

    if (texto.length === 0) {
        $("#listaEntidadEmiTarj").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "entidad_emisora/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            if (rs.ent_emis_nombre.toLowerCase().includes(texto.toLowerCase())) {

                lista += `
                <li class="list-group-item"
                    onclick="seleccionEntidadEmisoraTarjeta(
                        ${rs.entidad_emisora_id},
                        '${rs.ent_emis_nombre}'
                    )">
                    ${rs.ent_emis_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        $("#listaEntidadEmiTarj").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar entidad emisora tarjeta");
    });
}
function seleccionEntidadEmisoraTarjeta(id, nombre) {

    $("#entidad_emisora_tarjeta_id").val(id);
    $("#entidad_emisora_tarjeta").val(nombre);

    $("#listaEntidadEmiTarj").html("").hide();
    $(".form-line").addClass("focused");

    // 🔄 Reset dependientes (SOLO TARJETA)
    $("#marca_tarjeta_tarjeta").val("");
    $("#marca_tarjeta_tarjeta_id").val("");
    $("#entidad_adherida_tarjeta").val("");
    $("#entidad_adherida_tarjeta_id").val("");

    $("#marca_tarjeta_tarjeta").removeAttr("disabled");
}
function buscarMarcaTarjetaCobro() {

    let texto = $("#marca_tarjeta_tarjeta").val().trim();

    if (texto.length === 0) {
        $("#listaMarcaTarjCobro").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "marca_tarjeta/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            if (rs.marca_nombre.toLowerCase().includes(texto.toLowerCase())) {

                lista += `
                <li class="list-group-item"
                    onclick="seleccionMarcaTarjetaCobro(
                        ${rs.marca_tarjeta_id},
                        '${rs.marca_nombre}'
                    )">
                    ${rs.marca_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        $("#listaMarcaTarjCobro").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar marca tarjeta");
    });
}
function seleccionMarcaTarjetaCobro(id, nombre) {

    $("#marca_tarjeta_tarjeta_id").val(id);
    $("#marca_tarjeta_tarjeta").val(nombre);

    $("#listaMarcaTarjCobro").html("").hide();
    $(".form-line").addClass("focused");

    // 🔄 Reset entidad adherida (SOLO TARJETA)
    $("#entidad_adherida_tarjeta").val("");
    $("#entidad_adherida_tarjeta_id").val("");

    $("#entidad_adherida_tarjeta").removeAttr("disabled");
}
function buscarEntidadAdheridaTarjeta() {

    let texto = $("#entidad_adherida_tarjeta").val().trim();
    let entidadEmisoraId = $("#entidad_emisora_tarjeta_id").val();
    let marcaTarjetaId   = $("#marca_tarjeta_tarjeta_id").val();

    if (!entidadEmisoraId || !marcaTarjetaId) {
        $("#listaEntidadAdheTarj").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "entidad_adherida/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";
        let encontrado = false;

        for (let rs of resultado) {

            if (
                rs.entidad_emisora_id == entidadEmisoraId &&
                rs.marca_tarjeta_id == marcaTarjetaId &&
                rs.ent_adh_nombre.toLowerCase().includes(texto.toLowerCase())
            ) {

                encontrado = true;

                lista += `
                <li class="list-group-item"
                    onclick="seleccionEntidadAdheridaTarjeta(
                        ${rs.entidad_adherida_id},
                        '${rs.ent_adh_nombre}'
                    )">
                    ${rs.ent_adh_nombre}
                </li>`;
            }
        }

        lista += "</ul>";

        if (encontrado) {
            $("#listaEntidadAdheTarj").html(lista).css({
                display: "block",
                position: "absolute",
                zIndex: 2000
            });
        } else {
            $("#listaEntidadAdheTarj").html("").hide();
        }
    })
    .fail(function () {
        console.error("Error al buscar entidad adherida tarjeta");
    });
}
function seleccionEntidadAdheridaTarjeta(id, nombre) {

    $("#entidad_adherida_tarjeta_id").val(id);
    $("#entidad_adherida_tarjeta").val(nombre);

    $("#listaEntidadAdheTarj").html("").hide();
    $(".form-line").addClass("focused");
}

function validarCobroTarjeta() {

    const forma = $("#forma_cobro_id option:selected").text().toUpperCase();

    // 👉 Si es efectivo, NO valida tarjeta
    if (forma.includes("Efectivo")) {
        return true;
    }

    let montoTarjeta = parseFloat($("#monto_tarjeta").val()) || 0;

    // Si no hay monto, no valida nada
    if (montoTarjeta === 0) {
        return true;
    }

    if ($("#entidad_emisora_tarjeta_id").val() === "") {
        swal("Error", "Seleccione la entidad emisora de la tarjeta", "error");
        return false;
    }

    if ($("#marca_tarjeta_tarjeta_id").val() === "") {
        swal("Error", "Seleccione la marca de la tarjeta", "error");
        return false;
    }

    if ($("#nro_tarjeta").val().trim() === "") {
        swal("Error", "Ingrese el número de tarjeta", "error");
        return false;
    }

    return true;
}


function habilitarCobroCheque() {

    $("#nro_cheque").prop("disabled", false);
    $("#fecha_venc_cheque").prop("disabled", false);
    $("#monto_cheque").prop("disabled", false);
    $("#entidad_emisora_cheque").prop("disabled", false);

    $(".form-line").addClass("focused");
}
function validarCobroCheque() {

    const forma = $("#forma_cobro_id option:selected").text().toUpperCase();

    // 👉 Si es EFECTIVO, NO valida cheque
    if (forma.includes("Efectivo")) {
        return true;
    }

    let montoCheque = parseFloat($("#monto_cheque").val()) || 0;

    if (montoCheque === 0) {
        return true; // no se usa cheque
    }

    if ($("#nro_cheque").val().trim() === "") {
        swal("Error", "Debe ingresar el número de cheque", "error");
        return false;
    }

    if ($("#entidad_emisora_cheque_id").val() === "") {
        swal("Error", "Debe seleccionar la entidad emisora del cheque", "error");
        return false;
    }

    return true;
}
function buscarEntidadEmisoraCheque() {

    let texto = $("#entidad_emisora_cheque").val();

    // Si está vacío, ocultar lista
    if (texto.length === 0) {
        $("#listaEntidadEmiCheq").html("").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "entidad_emisora/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            if (rs.ent_emis_nombre.toLowerCase().includes(texto.toLowerCase())) {

                lista += "<li class='list-group-item' " +
                    "onclick=\"seleccionEntidadEmisoraCheq(" +
                    rs.entidad_emisora_id + ",'" +
                    rs.ent_emis_nombre +
                    "')\">" +
                    rs.ent_emis_nombre +
                "</li>";
            }
        }

        lista += "</ul>";

        $("#listaEntidadEmiCheq").html(lista).css({
            display: "block",
            position: "absolute",
            zIndex: 2000
        });
    })
    .fail(function () {
        console.error("Error al buscar entidad emisora");
    });
}
function seleccionEntidadEmisoraCheq(id, nombre) {

    $("#entidad_emisora_cheque_id").val(id);
    $("#entidad_emisora_cheque").val(nombre);

    $("#listaEntidadEmiCheq").html("").hide();
    $(".form-line").addClass("focused");
}
function aplicarEstadoCobro() {

    let estado = $("#cobro_estado").val();

    // Reset
    $("#btnConfirmar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);

    if (estado === "PENDIENTE") {
        $("#btnConfirmar").prop("disabled", false);
        $("#btnEditar").prop("disabled", false);
        habilitarFormulario();
    } else {
        bloquearFormulario();
    }
}
function bloquearFormulario() {
    $("input, select, textarea").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);
}

function habilitarFormulario() {
    $("input, select, textarea").prop("disabled", false);
}
function grabar() {

    // ===============================
    // 🔹 VALIDACIONES PREVIAS
    // ===============================
    if (!validarCobroTarjeta()) return;
    if (!validarCobroCheque())  return;

    let endpoint = "cobros_cab/create";
    let metodo   = "POST";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "cobros_cab/update/" + $("#id").val();
        metodo = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "cobros_cab/anular/" + $("#id").val();
        metodo = "PUT";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "cobros_cab/confirmar/" + $("#id").val();
        metodo = "PUT";
    }

    // ===============================
    // 🔹 IMPORTES
    // ===============================
    let importeCobro = parseFloat($("#cobro_importe").val()) || 0;
    let montoTarjeta = parseFloat($("#monto_tarjeta").val()) || 0;
    let montoCheque  = parseFloat($("#monto_cheque").val()) || 0;

    // 👇 EFECTIVO IMPUTADO (NO EL ENTREGADO)
    let montoEfectivo = 0;
    if (!$("#monto_efectivo").prop("disabled")) {
        montoEfectivo = parseFloat($("#monto_efectivo").val()) || 0;
    }

    // 🔒 VALIDACIÓN: suma de medios = importe
    if ((montoTarjeta + montoCheque + montoEfectivo) !== importeCobro) {
        swal(
            "Error",
            "La suma de los medios de cobro no coincide con el importe total",
            "error"
        );
        return;
    }

    // ===============================
    // 🔹 DATA CABECERA (COBROS_CAB)
    // ===============================
    let data = {
        cobro_fecha: $("#cobro_fecha").val(),
        forma_cobro_id: $("#forma_cobro_id").val(),
        clientes_id: $("#clientes_id").val(),
        user_id: $("#user_id").val(),
        apertura_cierre_caja_id: $("#apertura_cierre_caja_id").val(),
        ventas_cab_id: $("#ventas_cab_id").val(),
        cobro_importe: importeCobro,

        numero_documento: $("#numero_documento").val(),
        nro_voucher: $("#nro_voucher").val(),
        portador: $("#portador").val(),
        fecha_cobro_diferido: $("#fecha_cobro_diferido").val(),

        // 🔹 IDS CABECERA (RESUMEN)
        entidad_emisora_id: $("#entidad_emisora_id").val(),
        marca_tarjeta_id: $("#marca_tarjeta_id").val(),
        entidad_adherida_id: $("#entidad_adherida_id").val(),

        cobro_observacion: $("#cobro_observacion").val()
    };

    // ===============================
    // 🔹 DATOS EFECTIVO
    // ===============================
    if (montoEfectivo > 0) {
        data.monto_efectivo = montoEfectivo;
    }

    // ===============================
    // 🔹 DATOS TARJETA (DETALLE)
    // ===============================
    if (montoTarjeta > 0) {

        data.monto_tarjeta       = montoTarjeta;
        data.nro_tarjeta         = $("#nro_tarjeta").val();
        data.fecha_venc_tarjeta  = $("#fecha_venc_tarjeta").val();
        data.nro_voucher_tarjeta = $("#nro_voucher_tarjeta").val();

        data.entidad_emisora_tarjeta_id  = $("#entidad_emisora_tarjeta_id").val();
        data.marca_tarjeta_tarjeta_id    = $("#marca_tarjeta_tarjeta_id").val();
        data.entidad_adherida_tarjeta_id = $("#entidad_adherida_tarjeta_id").val();
    }

    // ===============================
    // 🔹 DATOS CHEQUE (DETALLE)
    // ===============================
    if (montoCheque > 0) {

        data.monto_cheque      = montoCheque;
        data.nro_cheque        = $("#nro_cheque").val();
        data.fecha_venc_cheque = $("#fecha_venc_cheque").val();

        data.entidad_emisora_cheque_id = $("#entidad_emisora_cheque_id").val();
    }

    // ===============================
    // 🔹 CUOTAS (SOLO AL CREAR)
    // ===============================
    if ($("#txtOperacion").val() == 1) {
        let cuotas = [];
        $(".chk-cuota:checked").each(function () {
            cuotas.push($(this).data("id"));
        });
        data.cuotas = cuotas;
    }

    // ===============================
    // 🔹 AJAX
    // ===============================
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: data
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                let cobroId = resultado.id ||
                    (resultado.registro ? resultado.registro.id : $("#id").val());

                $("#id").val(cobroId);

                // 🔒 ACTUALIZAR ESTADO EN FRONT
                if (resultado.registro && resultado.registro.cobro_estado) {
                    $("#cobro_estado").val(resultado.registro.cobro_estado);
                }

                aplicarEstadoCobro();

                $("#registros").hide();
                $("#detalle").show();

                listarDetalles();
                listarCtasCobro(cobroId);

                $(".form-line").addClass("focused");
            }
        });

    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "No se pudo procesar el cobro", "error");
    });
}


function listarDetalles() {

    let cantidadDetalle = 0;
    let totalGral = 0;
    let totalIVA = 0;

    const cobroId = $("#id").val();
    const estadoCobro = $("#cobro_estado").val();

    if (!cobroId) {
        console.warn("No hay ID de cobro");
        return;
    }

    $.ajax({
        url: getUrl() + "cobros_det/read/" + cobroId,
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        if (resultado && resultado.length > 0) {

            for (let rs of resultado) {

                const cantidad = parseFloat(rs.cob_det_cantidad) || 0;
                const precio   = parseFloat(rs.cob_det_precio) || 0;
                const subtotal = cantidad * precio;

                let iva = 0;
                if (rs.tip_imp_nom === "IVA10") {
                    iva = subtotal / 11;
                } else if (rs.tip_imp_nom === "IVA5") {
                    iva = subtotal / 21;
                }

                lista += `<tr>
                    <td>${rs.item_id}</td>
                    <td>${rs.item_decripcion}</td>
                    <td class="text-center">${cantidad}</td>
                    <td class="text-right">${formatearNumero(precio)}</td>
                    <td class="text-center">${rs.tip_imp_nom}</td>
                    <td class="text-right">${formatearNumero(subtotal)}</td>
                    <td class="text-right">${formatearNumero(iva)}</td>
                </tr>`;

                cantidadDetalle++;
                totalGral += subtotal;
                totalIVA  += iva;
            }

            $("#tableDetalle").html(lista);

        } else {

            $("#tableDetalle").html(`
                <tr>
                    <td colspan="7" class="text-center">
                        No existen detalles para este cobro
                    </td>
                </tr>
            `);
        }

        // =========================
        // TOTALES
        // =========================
        $("#txtTotalGral").text(formatearNumero(totalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(totalIVA));

        // =========================
        // BOTÓN CONFIRMAR (COBROS)
        // =========================
        if (estadoCobro === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }

        $(".form-line").addClass("focused");
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "No se pudieron cargar los detalles del cobro", "error");
    });
}
function listarCobroTarjeta(cobro_id) {

    $.ajax({
        url: getUrl() + "cobros_tarjeta/readByCobro/" + cobro_id,
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        // 🔹 Si no hay tarjeta
        if (!resultado || resultado.length === 0) {
            deshabilitarCobroTarjeta();
            return;
        }

        // 🔹 Por ahora solo 1 tarjeta
        let rs = resultado[0];

        habilitarCobroTarjeta();

        // =========================
        // DATOS TARJETA
        // =========================
        $("#nro_tarjeta").val(rs.nro_tarjeta);
        $("#fecha_venc_tarjeta").val(rs.fecha_venc_tarjeta);
        $("#monto_tarjeta").val(rs.monto_tarjeta);
        $("#nro_voucher_tarjeta").val(rs.nro_voucher);

        // =========================
        // TEXTOS
        // =========================
        $("#entidad_emisora_tarjeta").val(rs.entidad_emisora_tarjeta);
        $("#marca_tarjeta_tarjeta").val(rs.marca_tarjeta_tarjeta);
        $("#entidad_adherida_tarjeta").val(rs.entidad_adherida_tarjeta);

        // =========================
        // IDS (DETALLE TARJETA)
        // =========================
        $("#entidad_emisora_tarjeta_id").val(rs.entidad_emisora_tarjeta_id);
        $("#marca_tarjeta_tarjeta_id").val(rs.marca_tarjeta_tarjeta_id);
        $("#entidad_adherida_tarjeta_id").val(rs.entidad_adherida_tarjeta_id);

        $(".form-line").addClass("focused");
    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "No se pudo cargar el cobro con tarjeta", "error");
    });
}

function listarCobroCheque(cobro_id) {

    $.ajax({
        url: getUrl() + "cobros_cheque/readByCobro/" + cobro_id,
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        // 🔹 Si no hay cheque registrado
        if (!resultado || resultado.length === 0) {
            deshabilitarCobroCheque();

            // Limpiar campos por seguridad
            $("#entidad_emisora_cheque").val("");
            $("#entidad_emisora_cheque_id").val("");
            $("#nro_cheque").val("");
            $("#fecha_venc_cheque").val("");
            $("#monto_cheque").val("");

            $(".form-line").removeClass("focused");
            return;
        }

        // 🔹 Tomamos el primer cheque (1 cobro = 1 cheque)
        let rs = resultado[0];

        habilitarCobroCheque();

        // =========================
        // 🔹 Asignar valores
        // =========================
        $("#nro_cheque").val(rs.nro_cheque);
        $("#fecha_venc_cheque").val(rs.fecha_venc_cheque);
        $("#monto_cheque").val(rs.monto_cheque);

        // Texto visible
        $("#entidad_emisora_cheque").val(rs.entidad_emisora_cheque);

        // ID oculto
        $("#entidad_emisora_cheque_id").val(rs.entidad_emisora_cheque_id);

        // =========================
        // 🔹 Forzar efecto visual
        // =========================
        $(".form-line").addClass("focused");

    })
    .fail(function (xhr, status, error) {
        console.error("Error al listar cobro cheque:", xhr.responseText);
        alert("Error al obtener datos del cheque");
    });
}


function buscarEmpresas() {
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        
        // Comprobar si hay empresas en el resultado
        if (resultado.length > 0) {
            // Seleccionar automáticamente la primera empresa
            var primeraEmpresa = resultado[0];
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telefono, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telefono, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telefono").val(emp_telefono);
    $("#emp_correo").val(emp_correo);

    $("#listaEmpresa").html("");
    $("#listaEmpresa").attr("style", "display:none;");
}

function buscarSucursal(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.empresa_id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
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

// Función para cargar el user_id real del usuario logueado
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

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
