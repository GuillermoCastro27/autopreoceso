let cuotasActualesCobro = [];
var formaCobro_mapa = {}; // { "EFECTIVO": id, "TARJETA": id, ... }

(function () {
    var hoy = new Date();
    var yyyy = hoy.getFullYear();
    var mm   = String(hoy.getMonth() + 1).padStart(2, '0');
    var dd   = String(hoy.getDate()).padStart(2, '0');
    var desde = yyyy + '-' + mm + '-01';
    var hasta  = yyyy + '-' + mm + '-' + dd;
    document.getElementById('filtro_desde').value = desde;
    document.getElementById('filtro_hasta').value  = hasta;
})();

cargarFuncionarioIdLogueado();
cargarFormasCobro();
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
    $("#numero_documento").removeAttr("disabled").val("");
    $("#nro_voucher").attr("disabled", true);
    $("#portador").attr("disabled", true);
    $("#fecha_cobro_diferido").attr("disabled", true);

    // Resetear checkboxes y ocultar secciones
    $(".fc-chk").prop("checked", false).prop("disabled", false);
    $(".fc-chk").closest("label").css("cursor", "pointer");
    $("#forma_cobro_id").val("");
    $("#forma_cobro").val("");
    $("#cardTarjeta").hide();
    $("#cardCheque").hide();
    $("#tablaTarjetas").empty();
    $("#tablaCheques").empty();
    $("#btnAgregarTarjeta").prop("disabled", true);
    $("#btnAgregarCheque").prop("disabled",  true);

    // Efectivo deshabilitado hasta que marque el checkbox
    $("#monto_efectivo").prop("disabled", true).val("");

    // ===============================
    // Botones
    // ===============================
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

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
    // 🔹 MEDIOS DE COBRO — habilitar checkboxes
    // ==================================================
    $(".fc-chk").prop("disabled", false);
    $(".fc-chk").closest("label").css("cursor", "pointer");

    // Restaurar estado de secciones según checkboxes actuales
    onFormaCobroChange();

    // Habilitar filas existentes para edición
    $("#tablaTarjetas input, #tablaTarjetas button").prop("disabled", false);
    $("#tablaCheques input, #tablaCheques button").prop("disabled", false);
    $("#tablaTransferencias input, #tablaTransferencias button").prop("disabled", false);
    $("#tablaQrs input, #tablaQrs button").prop("disabled", false);

    // ==================================================
    // 🔒 BOTONES (EDITANDO)
    // ==================================================
    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);
    $("#btnEliminar").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true); // 🔒 NUNCA habilitar acá

    $("#btnGrabar").prop("disabled", false);
    $("#btnCancelar").prop("disabled", false);

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
function calcularVuelto() {
    var montoEfectivo = parseFloat($("#monto_efectivo").val()) || 0;
    var importeCobro  = parseFloat($("#cobro_importe").val()) || 0;

    var totalTarj  = colectarTarjetas().reduce(function(s,t){ return s + (parseFloat(t.monto_tarjeta)||0); }, 0);
    var totalCheq  = colectarCheques().reduce(function(s,c){ return s + (parseFloat(c.monto_cheque)||0); }, 0);
    // Cuánto debe cubrir el efectivo = lo que no cubren los otros medios
    var porteEfectivo = Math.max(importeCobro - totalTarj - totalCheq, 0);
    var vuelto = montoEfectivo - porteEfectivo;

    $("#vuelto").val(vuelto > 0 ? formatearNumero(vuelto) : "0,00");
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

    var desde = document.getElementById('filtro_desde').value;
    var hasta  = document.getElementById('filtro_hasta').value;

    $.ajax({
        url: getUrl() + "cobros_cab/read",
        method: "GET",
        dataType: "json",
        data: { desde: desde, hasta: hasta }
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
                    '${(rs.emp_razon_social||'').replace(/'/g,"\\'")}',
                    ${rs.sucursal_id},
                    '${(rs.suc_razon_social||'').replace(/'/g,"\\'")}',
                    '${(rs.cli_nombre||'').replace(/'/g,"\\'")}',
                    '${(rs.cli_apellido||'').replace(/'/g,"\\'")}',
                    '${rs.cli_ruc||''}',
                    '${rs.cli_telefono||''}',
                    '${rs.cli_correo||''}',
                    '${(rs.cli_direccion||'').replace(/'/g,"\\'")}',
                    '${(rs.cobro_observacion||'').replace(/'/g,"\\'")}',
                    '${(rs.forma_cobro||'').replace(/'/g,"\\'")}',
                    '${(rs.caja||'').replace(/'/g,"\\'")}',
                    '${rs.cobro_fecha||''}',
                    '${rs.numero_documento||''}',
                    ${rs.cobro_importe},
                    ${rs.monto_efectivo||0},
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
    id, clientes_id, forma_cobro_id,
    empresa_id, emp_razon_social,
    sucursal_id, suc_razon_social,
    cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_correo, cli_direccion,
    cobro_observacion, forma_cobro, caja, cobro_fecha,
    numero_documento,
    cobro_importe, monto_efectivo,
    cobro_estado, ventas_cab_id
) {
    $("#id").val(id);
    $("#clientes_id").val(clientes_id);
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#cobro_estado").val(cobro_estado);

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
    $("#cobro_importe").val(cobro_importe);
    $("#cobro_observacion").val(cobro_observacion);
    $("#forma_cobro").val(forma_cobro);
    // Restaurar array de selección con la forma cargada
    formasCobro_sel = forma_cobro_id ? [{ id: forma_cobro_id, descripcion: forma_cobro }] : [];
    $("#numero_documento").val(numero_documento);
    $("#caja").val(caja);

    $("#monto_efectivo").val(monto_efectivo || 0);
    $("#monto_efectivo").trigger("input");

    // Resetear checkboxes (deshabilitados en modo vista)
    $(".fc-chk").prop("checked", false).prop("disabled", true);
    $(".fc-chk").closest("label").css("cursor", "not-allowed");
    $("#cardTarjeta").hide();
    $("#cardCheque").hide();

    // Limpiar tablas
    $("#tablaTarjetas").empty();
    $("#tablaCheques").empty();

    // UI – modo consulta (deshabilitar todo primero)
    $("input, select").prop("disabled", true);
    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);
    $("#btnEliminar").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);
    $("#btnImprimir").prop("disabled", false);

    // Marcar Efectivo si tiene monto (el campo queda disabled en modo vista)
    if (parseFloat(monto_efectivo) > 0) {
        $("#chkEfectivo").prop("checked", true);
    }

    if (cobro_estado === "PENDIENTE") {
        $("#btnEditar").prop("disabled", false);
        $("#btnEliminar").prop("disabled", false);
        $("#btnConfirmar").prop("disabled", false);
    }

    // Cargar tarjeta + cheque + ítems + cuotas en 1 llamada
    cargarDetalleCobro(id);

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
                    <td></td>
                    <td>${rs.nro_factura || rs.venta_nro}</td>
                    <td class="text-center">${rs.nro_cuota}</td>
                    <td>${rs.fecha_vencimiento ? moment(rs.fecha_vencimiento).format('DD/MM/YYYY') : ''}</td>
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
                rs.clientes_id + ",'" +
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
    $("#monto_efectivo").on("input", calcularVuelto);

    // Recalcular vuelto cuando cambian montos de cualquier medio
    $(document).on("input", ".monto_tarjeta, .monto_cheque", calcularVuelto);

    // ============================
    // RE-CALCULAR SI CAMBIA IMPORTE
    // ============================
    $("#cobro_importe").on("input", function () {
        $("#monto_efectivo").trigger("input");
    });

});
function cargarCtasCobrar(cliente_id) {

    if (!cliente_id || cliente_id === 'undefined' || cliente_id === 'null') return;

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
                    <td class="text-center" style="width:40px;">
                        <div class="checkbox">
                            <input type="checkbox"
                                   id="${chkId}"
                                   class="chk-cuota"
                                   data-id="${rs.id}"
                                   data-venta="${rs.ventas_cab_id}"
                                   data-monto="${rs.cta_cob_monto}"
                                   data-nro-factura="${rs.nro_factura || ''}"
                                   ${checked}
                                   ${bloqueada}>
                            <label for="${chkId}"></label>
                        </div>
                    </td>
                    <td style="white-space:nowrap;">${rs.nro_factura || rs.venta_nro}</td>
                    <td class="text-center">${rs.nro_cuota}</td>
                    <td style="white-space:nowrap;">${rs.fecha_vencimiento}</td>
                    <td class="text-right" style="white-space:nowrap;">${formatearNumero(rs.cta_cob_monto)}</td>
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
    let nroFactura = null;

    $(".chk-cuota:checked").each(function () {

        let monto   = parseFloat($(this).data("monto"));
        let ventaId = $(this).data("venta");
        let cuotaId = $(this).data("id");

        if (!ventaSeleccionada) {
            ventaSeleccionada = ventaId;
            nroFactura = $(this).data("nroFactura") || "";
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

    // Auto-rellenar numero_documento con el nro de factura de la primera cuota
    if (nroFactura !== null) {
        $("#numero_documento").val(nroFactura);
    } else {
        $("#numero_documento").val("");
    }

    $("#totalCobrar").text(formatearNumero(total));
    $("#cobro_importe").val(total.toFixed(2));

    // ✅ ESTO es lo que usa el UPDATE para agregar/quitar
    $("#cuotas_seleccionadas").val(JSON.stringify(cuotas));

    $(".form-line").addClass("focused");
}
// Cargar mapa de IDs de forma_cobro desde el servidor
function cargarFormasCobro() {
    $.ajax({
        url: getUrl() + "forma_cobro/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        formaCobro_mapa = {};
        for (var r of resultado) {
            var desc = (r.for_cob_descripcion || '').toUpperCase();
            var id   = r.forma_cobro_id || r.id;
            if (desc.includes("EFECTIVO"))      formaCobro_mapa["EFECTIVO"]      = id;
            if (desc.includes("TARJETA"))       formaCobro_mapa["TARJETA"]       = id;
            if (desc.includes("CHEQUE"))        formaCobro_mapa["CHEQUE"]        = id;
        }
    });
}

// Se llama cada vez que cambia un checkbox de forma de cobro
function onFormaCobroChange() {
    var chkEfe   = $("#chkEfectivo").is(":checked");
    var chkTarj  = $("#chkTarjeta").is(":checked");
    var chkCheq  = $("#chkCheque").is(":checked");
    // Efectivo
    if (chkEfe) {
        $("#monto_efectivo").prop("disabled", false);
    } else {
        $("#monto_efectivo").prop("disabled", true).val("");
    }

    // Tarjeta
    if (chkTarj) {
        $("#cardTarjeta").show();
        $("#btnAgregarTarjeta").prop("disabled", false);
        if ($("#tablaTarjetas tr").length === 0) agregarFilaTarjeta();
    } else {
        $("#cardTarjeta").hide();
        $("#tablaTarjetas").empty();
        $("#btnAgregarTarjeta").prop("disabled", true);
    }

    // Cheque
    if (chkCheq) {
        $("#cardCheque").show();
        $("#btnAgregarCheque").prop("disabled", false);
        if ($("#tablaCheques tr").length === 0) agregarFilaCheque();
    } else {
        $("#cardCheque").hide();
        $("#tablaCheques").empty();
        $("#btnAgregarCheque").prop("disabled", true);
    }

    // Actualizar forma_cobro_id (primer método seleccionado)
    var primero = null;
    var labels  = [];
    if (chkEfe)  { labels.push("Efectivo"); if (!primero) primero = "EFECTIVO"; }
    if (chkTarj) { labels.push("Tarjeta");  if (!primero) primero = "TARJETA"; }
    if (chkCheq) { labels.push("Cheque");   if (!primero) primero = "CHEQUE"; }

    $("#forma_cobro_id").val(primero ? (formaCobro_mapa[primero] || "") : "");
    $("#forma_cobro").val(labels.join(", "));

    calcularVuelto();
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
    });
}
function seleccionEntidadEmisoraCheq(id, nombre) {

    $("#entidad_emisora_cheque_id").val(id);
    $("#entidad_emisora_cheque").val(nombre);

    $("#listaEntidadEmiCheq").html("").hide();
    $(".form-line").addClass("focused");
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
    var importeCobro  = parseFloat($("#cobro_importe").val()) || 0;
    var montoEfectivo = parseFloat($("#monto_efectivo").val()) || 0;
    var tarjetas      = colectarTarjetas();
    var cheques       = colectarCheques();

    var totalTarjetas = tarjetas.reduce(function(s,t){ return s + (parseFloat(t.monto_tarjeta)||0); }, 0);
    var totalCheques  = cheques.reduce(function(s,c){ return s + (parseFloat(c.monto_cheque)||0); }, 0);
    var totalMedios   = montoEfectivo + totalTarjetas + totalCheques;

    if (importeCobro <= 0) {
        swal("Error", "Debe seleccionar al menos una cuota a cobrar.", "error");
        return;
    }
    if (totalMedios <= 0) {
        swal("Error", "Debe ingresar el monto en al menos un medio de cobro.", "error");
        return;
    }
    if (!$("#forma_cobro_id").val()) {
        swal("Error", "Debe seleccionar al menos una forma de cobro.", "error");
        return;
    }
    var totalDigital = totalTarjetas + totalCheques;
    if (totalDigital > importeCobro + 0.01) {
        swal("Error",
            "La suma de los medios de cobro (" + formatearNumero(totalDigital) + ") " +
            "supera el importe total (" + formatearNumero(importeCobro) + ").",
            "error");
        return;
    }
    if (totalMedios < importeCobro - 0.01) {
        swal("Error",
            "El monto entregado (" + formatearNumero(totalMedios) + ") " +
            "no alcanza para cubrir el importe total (" + formatearNumero(importeCobro) + ").",
            "error");
        return;
    }

    // ===============================
    // 🔹 DATA CABECERA
    // ===============================
    var data = {
        cobro_fecha:             $("#cobro_fecha").val(),
        forma_cobro_id:          $("#forma_cobro_id").val(),
        clientes_id:             $("#clientes_id").val(),
        funcionario_id:          $("#funcionario_id").val(),
        apertura_cierre_caja_id: $("#apertura_cierre_caja_id").val(),
        ventas_cab_id:           $("#ventas_cab_id").val(),
        cobro_importe:           importeCobro,
        numero_documento:        $("#numero_documento").val(),
        cobro_observacion:       $("#cobro_observacion").val(),
        monto_efectivo:  montoEfectivo > 0 ? montoEfectivo : null,
        tarjetas:        JSON.stringify(tarjetas),
        cheques:         JSON.stringify(cheques),
    };

    // ===============================
    // 🔹 CUOTAS (SOLO AL CREAR)
    // ===============================
    if ($("#txtOperacion").val() == 1) {
        var cuotas = [];
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
        swal("Error", "No se pudo procesar el cobro", "error");
    });
}


function listarDetalles() {

    let cantidadDetalle = 0;
    let totalGral  = 0;
    let TotalIva10 = 0;
    let TotalIva5  = 0;

    const cobroId = $("#id").val();
    const estadoCobro = $("#cobro_estado").val();

    if (!cobroId) {
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

                lista += `<tr>
                    <td>${rs.item_id}</td>
                    <td>${rs.item_descripcion}</td>
                    <td class="text-center">${cantidad}</td>
                    <td class="text-right">${formatearNumero(precio)}</td>
                    <td class="text-center">${rs.tipo_imp_nom}</td>
                    <td class="text-right">${formatearNumero(subtotal)}</td>
                    <td class="text-right">${formatearNumero(iva)}</td>
                </tr>`;

                cantidadDetalle++;
                totalGral += subtotal;
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
        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));

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
    .fail(function (xhr) {
        mostrarErrores(xhr);
    });
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
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telefono, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(xhr) {
        swal("Error", "No se pudo cargar las sucursales.", "error");
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
        swal("Error", "No se pudo cargar las sucursales.", "error");
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

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
        $('#funcionario_id').val(datosSesion.user.funcionario_id);
    } else {
        swal("Sesión expirada", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}

function imprimir() {
    var id = $("#id").val();
    if (!id || id == 0) return;
    window.open('imprimir.html?id=' + id, '_blank');
}

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

// ================================================================
// TABLAS DINÁMICAS — TARJETAS
// ================================================================
function crearFilaTarjeta(data) {
    data = data || {};
    var disabled = ($("#txtOperacion").val() == 0) ? 'disabled' : '';
    return '<tr>' +
        '<td style="min-width:120px;">' +
            '<input type="text" class="form-control form-control-sm ee_tarjeta_texto" value="' + (data.entidad_emisora_tarjeta||'') + '" placeholder="Entidad Emisora" onkeyup="buscarEETarjetaFila(this);" ' + disabled + '>' +
            '<input type="hidden" class="ee_tarjeta_id" value="' + (data.entidad_emisora_tarjeta_id||'') + '">' +
            '<div class="lista-ee-tarjeta" style="display:none;position:absolute;z-index:3000;min-width:200px;"></div>' +
        '</td>' +
        '<td style="min-width:90px;">' +
            '<input type="text" class="form-control form-control-sm marca_tarjeta_texto" value="' + (data.marca_tarjeta_tarjeta||'') + '" placeholder="Marca" onkeyup="buscarMarcaFila(this);" ' + disabled + '>' +
            '<input type="hidden" class="marca_tarjeta_id" value="' + (data.marca_tarjeta_tarjeta_id||'') + '">' +
            '<div class="lista-marca-fila" style="display:none;position:absolute;z-index:3000;min-width:200px;"></div>' +
        '</td>' +
        '<td style="min-width:270px;">' +
            '<input type="text" class="form-control form-control-sm ea_tarjeta_texto" value="' + (data.entidad_adherida_tarjeta||'') + '" placeholder="Adherida" onkeyup="buscarEAFila(this);" ' + disabled + '>' +
            '<input type="hidden" class="ea_tarjeta_id" value="' + (data.entidad_adherida_tarjeta_id||'') + '">' +
            '<div class="lista-ea-fila" style="display:none;position:absolute;z-index:3000;min-width:200px;"></div>' +
        '</td>' +
        '<td style="min-width:110px;"><input type="text" class="form-control form-control-sm nro_tarjeta" value="' + (data.nro_tarjeta||'') + '" placeholder="Nro. Tarjeta" ' + disabled + '></td>' +
        '<td style="min-width:120px;"><input type="date" class="form-control form-control-sm fecha_venc_tarjeta" value="' + (data.fecha_venc_tarjeta||'') + '" ' + disabled + '></td>' +
        '<td style="min-width:110px;"><input type="text" class="form-control form-control-sm nro_voucher_tarjeta" value="' + (data.nro_voucher||'') + '" placeholder="Voucher" ' + disabled + '></td>' +
        '<td style="min-width:100px;"><input type="number" class="form-control form-control-sm monto_tarjeta" value="' + (data.monto_tarjeta||'') + '" placeholder="0" ' + disabled + '></td>' +
        '<td style="width:36px;"><button type="button" class="btn btn-danger btn-xs" onclick="eliminarFilaTarjeta(this);" ' + disabled + '><i class="material-icons" style="font-size:14px;">delete</i></button></td>' +
    '</tr>';
}

function agregarFilaTarjeta() {
    $("#tablaTarjetas").append(crearFilaTarjeta({}));
    // quitar disabled de la nueva fila (ya se crea habilitada cuando operacion>0)
    $("#tablaTarjetas tr:last input, #tablaTarjetas tr:last button").prop('disabled', false);
}

function eliminarFilaTarjeta(btn) {
    $(btn).closest('tr').remove();
}

// ================================================================
// TABLAS DINÁMICAS — CHEQUES
// ================================================================
function crearFilaCheque(data) {
    data = data || {};
    var disabled = ($("#txtOperacion").val() == 0) ? 'disabled' : '';
    return '<tr>' +
        '<td style="min-width:160px;">' +
            '<input type="text" class="form-control form-control-sm ee_cheque_texto" value="' + (data.entidad_emisora_cheque||'') + '" placeholder="Entidad Emisora" onkeyup="buscarEEChequeFila(this);" ' + disabled + '>' +
            '<input type="hidden" class="ee_cheque_id" value="' + (data.entidad_emisora_cheque_id||'') + '">' +
            '<div class="lista-ee-cheque" style="display:none;position:absolute;z-index:3000;min-width:200px;"></div>' +
        '</td>' +
        '<td style="min-width:100px;"><input type="text" class="form-control form-control-sm nro_cheque" value="' + (data.nro_cheque||'') + '" placeholder="Nro. Cheque" ' + disabled + '></td>' +
        '<td style="min-width:175px;"><input type="text" class="form-control form-control-sm portador_cheque" value="' + (data.portador||'') + '" placeholder="Portador" ' + disabled + '></td>' +
        '<td style="min-width:120px;"><input type="date" class="form-control form-control-sm fecha_cobro_dif" value="' + (data.fecha_cobro_diferido||'') + '" ' + disabled + '></td>' +
        '<td style="min-width:120px;"><input type="date" class="form-control form-control-sm fecha_venc_cheque" value="' + (data.fecha_venc_cheque||'') + '" ' + disabled + '></td>' +
        '<td style="min-width:100px;"><input type="number" class="form-control form-control-sm monto_cheque" value="' + (data.monto_cheque||'') + '" placeholder="0" ' + disabled + '></td>' +
        '<td style="width:36px;"><button type="button" class="btn btn-danger btn-xs" onclick="eliminarFilaCheque(this);" ' + disabled + '><i class="material-icons" style="font-size:14px;">delete</i></button></td>' +
    '</tr>';
}

function agregarFilaCheque() {
    $("#tablaCheques").append(crearFilaCheque({}));
    $("#tablaCheques tr:last input, #tablaCheques tr:last button").prop('disabled', false);
}

function eliminarFilaCheque(btn) {
    $(btn).closest('tr').remove();
}

// ================================================================
// AUTOCOMPLETE POR FILA — TARJETA
// ================================================================
function buscarEETarjetaFila(input) {
    var texto = $(input).val().trim();
    var $drop = $(input).siblings('.lista-ee-tarjeta');
    if (texto.length < 1) { $drop.hide().html(''); return; }
    $.ajax({ url: getUrl() + 'entidad_emisora/read', method: 'GET', dataType: 'json' })
    .done(function(res) {
        var lista = "<ul class='list-group'>";
        res.filter(function(r){ return r.ent_emis_nombre.toLowerCase().includes(texto.toLowerCase()); })
           .forEach(function(r) {
               lista += "<li class='list-group-item' style='cursor:pointer;padding:6px 10px;' " +
                   "onclick=\"seleccionEETarjetaFila(this," + r.entidad_emisora_id + ",'" + r.ent_emis_nombre.replace(/'/g,"\\'") + "')\">" +
                   r.ent_emis_nombre + "</li>";
           });
        lista += "</ul>";
        $drop.html(lista).show();
    });
}
function seleccionEETarjetaFila(li, id, nombre) {
    var $tr = $(li).closest('tr');
    $tr.find('.ee_tarjeta_texto').val(nombre);
    $tr.find('.ee_tarjeta_id').val(id);
    $tr.find('.lista-ee-tarjeta').hide().html('');
    $tr.find('.marca_tarjeta_texto').val('').prop('disabled', false);
    $tr.find('.marca_tarjeta_id').val('');
    $tr.find('.ea_tarjeta_texto').val('');
    $tr.find('.ea_tarjeta_id').val('');
}
function buscarMarcaFila(input) {
    var texto = $(input).val().trim();
    var $drop = $(input).siblings('.lista-marca-fila');
    if (texto.length < 1) { $drop.hide().html(''); return; }
    $.ajax({ url: getUrl() + 'marca_tarjeta/read', method: 'GET', dataType: 'json' })
    .done(function(res) {
        var lista = "<ul class='list-group'>";
        res.filter(function(r){ return r.marca_nombre.toLowerCase().includes(texto.toLowerCase()); })
           .forEach(function(r) {
               lista += "<li class='list-group-item' style='cursor:pointer;padding:6px 10px;' " +
                   "onclick=\"seleccionMarcaFila(this," + r.marca_tarjeta_id + ",'" + r.marca_nombre.replace(/'/g,"\\'") + "')\">" +
                   r.marca_nombre + "</li>";
           });
        lista += "</ul>";
        $drop.html(lista).show();
    });
}
function seleccionMarcaFila(li, id, nombre) {
    var $tr = $(li).closest('tr');
    $tr.find('.marca_tarjeta_texto').val(nombre);
    $tr.find('.marca_tarjeta_id').val(id);
    $tr.find('.lista-marca-fila').hide().html('');
    $tr.find('.ea_tarjeta_texto').val('').prop('disabled', false);
    $tr.find('.ea_tarjeta_id').val('');
}
function buscarEAFila(input) {
    var texto = $(input).val().trim();
    var $drop = $(input).siblings('.lista-ea-fila');
    var $tr   = $(input).closest('tr');
    var eeId  = $tr.find('.ee_tarjeta_id').val();
    var mId   = $tr.find('.marca_tarjeta_id').val();
    if (texto.length < 1 || !eeId || !mId) { $drop.hide().html(''); return; }
    $.ajax({ url: getUrl() + 'entidad_adherida/read', method: 'GET', dataType: 'json' })
    .done(function(res) {
        var lista = "<ul class='list-group'>";
        var encontrado = false;
        res.filter(function(r){ return r.entidad_emisora_id == eeId && r.marca_tarjeta_id == mId && r.ent_adh_nombre.toLowerCase().includes(texto.toLowerCase()); })
           .forEach(function(r) {
               encontrado = true;
               lista += "<li class='list-group-item' style='cursor:pointer;padding:6px 10px;' " +
                   "onclick=\"seleccionEAFila(this," + r.entidad_adherida_id + ",'" + r.ent_adh_nombre.replace(/'/g,"\\'") + "')\">" +
                   r.ent_adh_nombre + "</li>";
           });
        lista += "</ul>";
        if (encontrado) $drop.html(lista).show(); else $drop.hide().html('');
    });
}
function seleccionEAFila(li, id, nombre) {
    var $tr = $(li).closest('tr');
    $tr.find('.ea_tarjeta_texto').val(nombre);
    $tr.find('.ea_tarjeta_id').val(id);
    $tr.find('.lista-ea-fila').hide().html('');
}

// ================================================================
// AUTOCOMPLETE POR FILA — CHEQUE
// ================================================================
function buscarEEChequeFila(input) {
    var texto = $(input).val().trim();
    var $drop = $(input).siblings('.lista-ee-cheque');
    if (texto.length < 1) { $drop.hide().html(''); return; }
    $.ajax({ url: getUrl() + 'entidad_emisora/read', method: 'GET', dataType: 'json' })
    .done(function(res) {
        var lista = "<ul class='list-group'>";
        res.filter(function(r){ return r.ent_emis_nombre.toLowerCase().includes(texto.toLowerCase()); })
           .forEach(function(r) {
               lista += "<li class='list-group-item' style='cursor:pointer;padding:6px 10px;' " +
                   "onclick=\"seleccionEEChequeFila(this," + r.entidad_emisora_id + ",'" + r.ent_emis_nombre.replace(/'/g,"\\'") + "')\">" +
                   r.ent_emis_nombre + "</li>";
           });
        lista += "</ul>";
        $drop.html(lista).show();
    });
}
function seleccionEEChequeFila(li, id, nombre) {
    var $tr = $(li).closest('tr');
    $tr.find('.ee_cheque_texto').val(nombre);
    $tr.find('.ee_cheque_id').val(id);
    $tr.find('.lista-ee-cheque').hide().html('');
}

// ================================================================
// RECOLECTAR DATOS DE LAS TABLAS
// ================================================================
function colectarTarjetas() {
    var arr = [];
    $("#tablaTarjetas tr").each(function() {
        var $r = $(this);
        var monto = parseFloat($r.find('.monto_tarjeta').val()) || 0;
        if (monto > 0) {
            arr.push({
                monto_tarjeta:              monto,
                nro_tarjeta:                $r.find('.nro_tarjeta').val(),
                fecha_venc_tarjeta:         $r.find('.fecha_venc_tarjeta').val(),
                nro_voucher_tarjeta:        $r.find('.nro_voucher_tarjeta').val(),
                entidad_emisora_tarjeta_id: $r.find('.ee_tarjeta_id').val()   || null,
                marca_tarjeta_tarjeta_id:   $r.find('.marca_tarjeta_id').val()|| null,
                entidad_adherida_tarjeta_id:$r.find('.ea_tarjeta_id').val()   || null,
            });
        }
    });
    return arr;
}
function colectarCheques() {
    var arr = [];
    $("#tablaCheques tr").each(function() {
        var $r = $(this);
        var monto = parseFloat($r.find('.monto_cheque').val()) || 0;
        if (monto > 0) {
            arr.push({
                monto_cheque:              monto,
                nro_cheque:                $r.find('.nro_cheque').val(),
                portador:                  $r.find('.portador_cheque').val(),
                fecha_cobro_diferido:      $r.find('.fecha_cobro_dif').val(),
                fecha_venc_cheque:         $r.find('.fecha_venc_cheque').val(),
                entidad_emisora_cheque_id: $r.find('.ee_cheque_id').val() || null,
            });
        }
    });
    return arr;
}


// ================================================================
// CARGA UNIFICADA AL SELECCIONAR UN COBRO
// ================================================================
function cargarDetalleCobro(id) {

    $.ajax({
        url: getUrl() + 'cobros_cab/detalle/' + id,
        method: 'GET',
        dataType: 'json'
    })
    .done(function (resp) {

        /* ===== TARJETAS ===== */
        $("#tablaTarjetas").empty();
        (resp.tarjeta || []).forEach(function(t) {
            $("#tablaTarjetas").append(crearFilaTarjeta(t));
        });
        var hayTarjetas = (resp.tarjeta || []).length > 0;
        if (hayTarjetas) {
            $("#chkTarjeta").prop("checked", true);
            $("#cardTarjeta").show();
        } else {
            $("#cardTarjeta").hide();
        }

        /* ===== CHEQUES ===== */
        $("#tablaCheques").empty();
        (resp.cheque || []).forEach(function(ch) {
            $("#tablaCheques").append(crearFilaCheque(ch));
        });
        var hayCheques = (resp.cheque || []).length > 0;
        if (hayCheques) {
            $("#chkCheque").prop("checked", true);
            $("#cardCheque").show();
        } else {
            $("#cardCheque").hide();
        }

        /* ===== ÍTEMS / DETALLES ===== */
        var cantidadDetalle = 0, totalGral = 0, cIva10 = 0, cIva5 = 0;
        var estadoCobro = $("#cobro_estado").val();
        var lista = "";

        if (resp.detalles && resp.detalles.length > 0) {
            resp.detalles.forEach(function(rs) {
                var cantidad = parseFloat(rs.cob_det_cantidad) || 0;
                var precio   = parseFloat(rs.cob_det_precio)   || 0;
                var subtotal = cantidad * precio;
                var imp = (rs.tipo_imp_nom || '').toUpperCase();
                var iva = 0;
                if (imp.indexOf('EXENT') !== -1) {
                    iva = 0;
                } else if (imp.indexOf('5') !== -1) {
                    iva = Math.round(subtotal / 21);
                    cIva5 += iva;
                } else {
                    iva = Math.round(subtotal / 11);
                    cIva10 += iva;
                }
                lista += '<tr><td>' + rs.item_id + '</td><td>' + rs.item_descripcion + '</td>' +
                    '<td class="text-center">' + cantidad + '</td>' +
                    '<td class="text-right">' + formatearNumero(precio) + '</td>' +
                    '<td class="text-center">' + rs.tipo_imp_nom + '</td>' +
                    '<td class="text-right">' + formatearNumero(subtotal) + '</td>' +
                    '<td class="text-right">' + formatearNumero(iva) + '</td></tr>';
                cantidadDetalle++; totalGral += subtotal;
            });
            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html('<tr><td colspan="7" class="text-center">No existen detalles para este cobro</td></tr>');
        }
        $("#txtTotalGral").text(formatearNumero(totalGral));
        $("#txtIva10").text(formatearNumero(cIva10));
        $("#txtIva5").text(formatearNumero(cIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(cIva10 + cIva5));
        if (estadoCobro === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", true);
        }

        /* ===== CUOTAS ===== */
        var filas = "", total = 0;
        cuotasActualesCobro = [];
        (resp.cuotas || []).forEach(function(q) {
            total += parseFloat(q.monto_cobrado);
            cuotasActualesCobro.push(q.cta_cobrar_id);
            filas += '<tr><td></td><td>' + (q.nro_factura || q.venta_nro) + '</td><td class="text-center">' + q.nro_cuota + '</td>' +
                '<td>' + (q.fecha_vencimiento ? moment(q.fecha_vencimiento).format('DD/MM/YYYY') : '') + '</td>' +
                '<td class="text-right">' + formatearNumero(q.monto_cobrado) + '</td></tr>';
        });
        $("#tablaCtasCobrar").html(filas);
        $("#totalCobrar").text(formatearNumero(total));
        $("#panelCtasCobrar").show();

        calcularVuelto();

        $(".form-line").addClass("focused");
    })
    .fail(function () {
        swal("Error", "No se pudo cargar el detalle del cobro", "error");
    });
}

