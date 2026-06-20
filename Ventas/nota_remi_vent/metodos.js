function getToken() {
    var s = JSON.parse(localStorage.getItem('datosSesion'));
    return s ? s.token : '';
}

cargarFuncionarioIdLogueado();
listar();
campoFecha();

// ===================================================
// FORMATO TABLA
// ===================================================

function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Notas de Remisión de Venta' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Notas de Remisión de Venta' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Notas de Remisión de Venta' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Notas de Remisión de Venta' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

// ===================================================
// ACCIONES DE BOTONES
// ===================================================

function cancelar() {
    location.reload(true);
}

function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    limpiarForm();

    $("#nota_remi_vent_fecha").prop("disabled", false);
    $("#nota_remi_vent_observaciones").prop("disabled", false);
    $("#nro_venta").prop("disabled", false);
    $("#buscar_funcionario_entrega").prop("disabled", false);
    $("#buscar_vehiculo").prop("disabled", false);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);

    $("#registros").hide();
    $(".form-line").addClass("focused");
}

function editar() {
    $("#txtOperacion").val(2);

    $("#nota_remi_vent_fecha").prop("disabled", false);
    $("#nota_remi_vent_observaciones").prop("disabled", false);
    $("#buscar_funcionario_entrega").prop("disabled", false);
    $("#buscar_vehiculo").prop("disabled", false);

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
    $(".form-line").addClass("focused");
}

function eliminar() {
    $("#txtOperacion").val(3);
    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
}

function confirmar() {
    $("#txtOperacion").val(4);
    $("#btnAgregar, #btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnGrabar, #btnCancelar").prop("disabled", false);
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulos  = { 1: "AGREGAR",    2: "EDITAR",    3: "ANULAR",    4: "CONFIRMAR" };
    var preguntas= { 1: "¿Desea grabar el nuevo registro?",
                     2: "¿Desea guardar los cambios?",
                     3: "¿Desea anular esta nota de remisión?",
                     4: "¿Desea confirmar esta nota de remisión?" };
    swal({
        title: titulos[oper] || "GRABAR",
        text:  preguntas[oper] || "¿Continuar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#458E49",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () { grabar(); });
}

// ===================================================
// GRABAR
// ===================================================

function grabar() {
    var op = parseInt($("#txtOperacion").val());

    if (op === 3) {
        $.ajax({
            url: getUrl() + "notaremivent/anular/" + $("#id").val(),
            method: "PUT", dataType: "json",
            headers: { Authorization: "Bearer " + getToken() }
        })
        .done(function(r) { swal("Listo", r.mensaje, r.tipo, function() { if (r.tipo === "success") location.reload(true); }); })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    if (op === 4) {
        $.ajax({
            url: getUrl() + "notaremivent/confirmar/" + $("#id").val(),
            method: "PUT", dataType: "json",
            headers: { Authorization: "Bearer " + getToken() }
        })
        .done(function(r) { swal("Listo", r.mensaje, r.tipo, function() { if (r.tipo === "success") location.reload(true); }); })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    var fecha = $.trim($("#nota_remi_vent_fecha").val());
    if (!fecha) { swal("Atención", "Debe ingresar la fecha.", "warning"); return; }
    if (!$("#ventas_cab_id").val() || $("#ventas_cab_id").val() == 0) {
        swal("Atención", "Debe seleccionar una venta.", "warning"); return;
    }
    if (!$("#funcionario_entrega_id").val()) {
        swal("Atención", "Debe seleccionar el funcionario que realiza la entrega.", "warning"); return;
    }

    var endpoint = (op === 2)
        ? "notaremivent/update/" + $("#id").val()
        : "notaremivent/create";
    var metodo = (op === 2) ? "PUT" : "POST";

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo, dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: {
            nota_remi_vent_fecha:           $("#nota_remi_vent_fecha").val(),
            nota_remi_vent_observaciones:   $("#nota_remi_vent_observaciones").val(),
            ventas_cab_id:                  $("#ventas_cab_id").val(),
            clientes_id:                    $("#clientes_id").val(),
            empresa_id:                     $("#empresa_id").val(),
            sucursal_id:                    $("#sucursal_id").val(),
            funcionario_entrega_id:         $("#funcionario_entrega_id").val() || null,
            tipo_vehiculo_det_id:           $("#tipo_vehiculo_det_id").val()   || null,
            timbrado_id:                    $("#timbrado_id").val()            || null,
            nota_remi_vent_nro_comprobante: $("#nota_remi_vent_nro_comprobante").val() || null,
        }
    })
    .done(function(r) {
        swal({ title: "Respuesta", text: r.mensaje, type: r.tipo }, function() {
            if (r.tipo === "success") {
                if (r.registro && r.registro.id) $("#id").val(r.registro.id);
                $("#detalle").show();
                listarDetalles();
                var estadoReg = (r.registro && r.registro.nota_remi_vent_estado) || "";
                if (op === 1 && estadoReg === "PENDIENTE") {
                    $("#nota_remi_vent_fecha").prop("disabled", true);
                    $("#nota_remi_vent_observaciones").prop("disabled", true);
                    $("#nro_venta").prop("disabled", true);
                    $("#buscar_funcionario_entrega").prop("disabled", true);
                    $("#buscar_vehiculo").prop("disabled", true);
                    $("#nota_remi_vent_estado").val("PENDIENTE");
                    $("#btnAgregar, #btnGrabar").prop("disabled", true);
                    $("#btnEditar, #btnEliminar").prop("disabled", false);
                } else {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ===================================================
// LISTAR
// ===================================================

function listar() {
    $.ajax({
        url: getUrl() + "notaremivent/read",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
    })
    .done(function(resultado) {
        var lista = "";
        for (var rs of resultado) {
            var badge = badgeEstado(rs.nota_remi_vent_estado);
            var vehiculo = rs.tv_det_placa
                ? (rs.mar_nom + " " + rs.modelo_nom + " — " + rs.tv_det_placa).trim()
                : "—";
            lista += "<tr style='cursor:pointer;' onclick='seleccionNotaRemi(" + rs.id + ");'>";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.emp_razon_social || "") + "</td>";
            lista += "<td>" + (rs.suc_razon_social || "") + "</td>";
            lista += "<td>" + (rs.nota_remi_vent_fecha_formato || "") + "</td>";
            lista += "<td>" + (rs.nro_venta ? "VENTA NRO: " + rs.nro_venta : "—") + "</td>";
            lista += "<td>" + (rs.cli_nombre || "") + " " + (rs.cli_apellido || "") + "</td>";
            lista += "<td>" + (rs.funcionario_entrega_nombre || "—") + "</td>";
            lista += "<td>" + vehiculo + "</td>";
            lista += "<td>" + (rs.nota_remi_vent_observaciones || "") + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }

        if ($.fn.DataTable.isDataTable(".js-exportable")) {
            $(".js-exportable").DataTable().destroy();
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionNotaRemi(id) {
    $.ajax({
        url: getUrl() + "notaremivent/read",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
    })
    .done(function(resultado) {
        var rs = resultado.find(function(r) { return r.id === id; });
        if (!rs) return;

        $("#id").val(rs.id);
        $("#empresa_id").val(rs.empresa_id);
        $("#sucursal_id").val(rs.sucursal_id);
        $("#emp_razon_social").val(rs.emp_razon_social);
        $("#suc_razon_social").val(rs.suc_razon_social);
        $("#ventas_cab_id").val(rs.ventas_cab_id);
        $("#nro_venta").val(rs.nro_venta ? "VENTA NRO: " + rs.nro_venta : "");
        $("#clientes_id").val(rs.clientes_id);
        $("#cli_nombre").val(rs.cli_nombre || "");
        $("#cli_apellido").val(rs.cli_apellido || "");
        $("#cli_ruc").val(rs.cli_ruc || "");
        $("#cli_direccion").val(rs.cli_direccion || "");
        $("#nota_remi_vent_fecha").val(rs.nota_remi_vent_fecha_formato || "");
        $("#nota_remi_vent_observaciones").val(rs.nota_remi_vent_observaciones || "");
        $("#nota_remi_vent_estado").val(rs.nota_remi_vent_estado);

        // Funcionario entrega
        $("#funcionario_entrega_id").val(rs.funcionario_entrega_id || "");
        $("#buscar_funcionario_entrega").val(rs.funcionario_entrega_nombre || "");

        // Vehículo
        $("#tipo_vehiculo_det_id").val(rs.tipo_vehiculo_det_id || "");
        if (rs.tv_det_placa) {
            $("#buscar_vehiculo").val(rs.mar_nom + " " + rs.modelo_nom + " — " + rs.tv_det_placa);
        } else {
            $("#buscar_vehiculo").val("");
        }

        // Timbrado
        $("#timbrado_id").val(rs.timbrado_id || "");
        $("#nota_remi_vent_nro_comprobante").val(rs.nota_remi_vent_nro_comprobante || "");
        $("#nota_remi_vent_nro_comprobante_display").val(rs.nota_remi_vent_nro_comprobante || "");
        $("#tim_numero_display").val(rs.timbrado_id ? "(cargado)" : "—");

        var estado = (rs.nota_remi_vent_estado || "").trim().toUpperCase();

        $("#registros").hide();
        $("#detalle").show();
        listarDetalles();

        $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar, #btnImprimir").prop("disabled", true);
        $("#btnCancelar").prop("disabled", false);

        if (estado === "PENDIENTE") {
            $("#btnEditar, #btnEliminar, #btnConfirmar").prop("disabled", false);
        }
        if (estado === "CONFIRMADA") {
            $("#btnEliminar").prop("disabled", false);
        }
        $("#btnImprimir").prop("disabled", false);

        $(".form-line").addClass("focused");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ===================================================
// LISTAR DETALLE
// ===================================================

function listarDetalles() {
    var notaId = $("#id").val();
    if (!notaId || notaId == 0) return;

    $.ajax({
        url: getUrl() + "notaremiventdet/read/" + notaId,
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
    })
    .done(function(resultado) {
        var lista = "";
        var total = 0;
        var n = 0;

        for (var rs of resultado) {
            n++;
            var sub = parseFloat(rs.subtotal) || 0;
            total += sub;

            var origenBadge = rs.tipo_origen === 'servicio'
                ? "<span class='label label-info'>" + rs.origen_label + "</span>"
                : "<span class='label label-success'>Venta</span>";

            lista += "<tr>";
            lista += "<td>" + n + "</td>";
            lista += "<td>" + rs.item_descripcion + "</td>";
            lista += "<td>" + origenBadge + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(rs.nota_remi_vent_det_cantidad) + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(rs.nota_remi_vent_det_precio) + "</td>";
            lista += "<td class='text-right'>" + formatearNumero(sub) + "</td>";
            lista += "</tr>";
        }

        if (!lista) lista = "<tr><td colspan='6' class='text-center text-muted'>Sin ítems registrados</td></tr>";

        $("#tableDetalle").html(lista);
        $("#txtTotalGral").text(formatearNumero(total));

        var estado = $("#nota_remi_vent_estado").val();
        if (estado === "PENDIENTE" && n > 0) {
            $("#btnConfirmar").prop("disabled", false);
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// ===================================================
// BUSCAR VENTA
// ===================================================

function buscarVentas() {
    var q = $("#nro_venta").val();
    if (q.length < 1) { $("#listaVentas").hide(); return; }

    $.ajax({
        url: getUrl() + "ventas_cab/buscar",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: { q: q }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var nro = (rs.nro_venta || "").trim();
            var info = JSON.stringify({
                ventas_cab_id:  rs.ventas_cab_id,
                nro_venta:      nro,
                empresa_id:     rs.empresa_id,
                emp_razon_social: rs.emp_razon_social || "",
                sucursal_id:    rs.sucursal_id,
                suc_razon_social: rs.suc_razon_social || "",
                clientes_id:    rs.clientes_id,
                cli_nombre:     rs.cli_nombre    || "",
                cli_apellido:   rs.cli_apellido  || "",
                cli_ruc:        rs.cli_ruc        || "",
                cli_direccion:  rs.cli_direccion  || ""
            }).replace(/'/g, "&#39;");

            lista += "<li class='list-group-item lista-venta-item' style='cursor:pointer;' data-info='" +
                info + "'>VENTA NRO: " + nro + " &mdash; " +
                (rs.cli_nombre || "") + " " + (rs.cli_apellido || "") + "</li>";
        }
        if (!resultado.length) lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
        lista += "</ul>";
        $("#listaVentas").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

$(document).on("click", ".lista-venta-item", function() {
    var d = $(this).data("info");
    if (!d) return;
    seleccionVenta(d.ventas_cab_id, d.nro_venta, d.empresa_id, d.emp_razon_social,
        d.sucursal_id, d.suc_razon_social, d.clientes_id, d.cli_nombre,
        d.cli_apellido, d.cli_ruc, d.cli_direccion);
});

function seleccionVenta(ventas_cab_id, nro_venta, empresa_id, emp_razon_social, sucursal_id, suc_razon_social, clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_direccion) {
    $("#ventas_cab_id").val(ventas_cab_id);
    $("#nro_venta").val("VENTA NRO: " + nro_venta).prop("disabled", true);
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#listaVentas").html("").hide();
    $(".form-line").addClass("focused");
    cargarTimbrado();
}

// ===================================================
// BUSCAR FUNCIONARIO ENTREGA
// ===================================================

function buscarFuncionarioEntrega() {
    var q = $("#buscar_funcionario_entrega").val();
    if (q.length < 2) { $("#listaFuncionariosEntrega").hide(); return; }

    $.ajax({
        url: getUrl() + "funcionario/buscar",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: { q: q }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item lista-func-entrega-item' style='cursor:pointer;'" +
                " data-id='" + rs.id + "'" +
                " data-nombre='" + (rs.fun_nombre_completo || "").replace(/'/g,"&#39;") + "'>" +
                (rs.fun_nombre_completo || "") + " <small class='text-muted'>CI: " + (rs.fun_ci || "") + "</small></li>";
        }
        if (!resultado.length) lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
        lista += "</ul>";
        $("#listaFuncionariosEntrega").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionFuncionarioEntrega(id, nombre) {
    $("#funcionario_entrega_id").val(id);
    $("#buscar_funcionario_entrega").val(nombre);
    $("#listaFuncionariosEntrega").html("").hide();
    $(".form-line").addClass("focused");
}

$(document).on("click", ".lista-func-entrega-item", function() {
    seleccionFuncionarioEntrega($(this).data("id"), $(this).data("nombre"));
});

// ===================================================
// BUSCAR VEHÍCULO DE ENTREGA
// ===================================================

function buscarVehiculo() {
    var q = $("#buscar_vehiculo").val();
    if (q.length < 1) { $("#listaVehiculos").hide(); return; }

    $.ajax({
        url: getUrl() + "tipo_vehiculo_det/buscar",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: { q: q }
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            var label = (rs.mar_nom || "") + " " + (rs.modelo_nom || "") +
                        (rs.tv_anio  ? " " + rs.tv_anio  : "") +
                        (rs.tv_color ? " — " + rs.tv_color : "") +
                        (rs.tv_det_placa ? " | Placa: " + rs.tv_det_placa : "");
            lista += "<li class='list-group-item lista-vehiculo-item' style='cursor:pointer;'" +
                " data-id='" + rs.id + "'" +
                " data-label='" + label.replace(/'/g,"&#39;") + "'>" + label + "</li>";
        }
        if (!resultado.length) lista += "<li class='list-group-item text-muted'>Sin vehículos encontrados</li>";
        lista += "</ul>";
        $("#listaVehiculos").html(lista).css({ display: "block", position: "absolute", zIndex: 2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionVehiculo(id, label) {
    $("#tipo_vehiculo_det_id").val(id);
    $("#buscar_vehiculo").val(label);
    $("#listaVehiculos").html("").hide();
    $(".form-line").addClass("focused");
}

$(document).on("click", ".lista-vehiculo-item", function() {
    seleccionVehiculo($(this).data("id"), $(this).data("label"));
});

// ===================================================
// TIMBRADO
// ===================================================

function cargarTimbrado() {
    var empId = $("#empresa_id").val();
    var sucId = $("#sucursal_id").val();

    if (!empId || !sucId) {
        $("#timbrado_id").val("");
        $("#nota_remi_vent_nro_comprobante").val("");
        $("#nota_remi_vent_nro_comprobante_display").val("—");
        $("#tim_numero_display").val("(seleccionar venta primero)");
        $("#tim_vence_display").val("—");
        return;
    }

    $.ajax({
        url: getUrl() + "timbrado/para-ventas",
        method: "GET", dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: { empresa_id: empId, sucursal_id: sucId, tipo_documento: "nota_remision_vent" }
    })
    .done(function(res) {
        $("#timbrado_id").val(res.timbrado_id);
        $("#nota_remi_vent_nro_comprobante").val(res.nro_comprobante);
        $("#nota_remi_vent_nro_comprobante_display").val(res.nro_formateado || res.nro_comprobante);
        $("#tim_numero_display").val(res.tim_numero);
        var vence = res.tim_fecha_fin ? res.tim_fecha_fin.substring(0, 10) : "—";
        $("#tim_vence_display").val(vence);
        if (res.nros_restantes <= 10) {
            swal("Atención", "El timbrado " + res.tim_numero + " tiene solo " + res.nros_restantes + " números restantes.", "warning");
        }
    })
    .fail(function(xhr) {
        $("#timbrado_id").val("");
        $("#nota_remi_vent_nro_comprobante").val("");
        $("#nota_remi_vent_nro_comprobante_display").val("—");
        var res = xhr.responseJSON;
        var msg = (res && res.mensaje) ? res.mensaje : "Sin timbrado activo para nota de remisión.";
        $("#tim_numero_display").val(msg);
        $("#tim_vence_display").val("—");
        if (xhr.status === 404) {
            swal("Sin timbrado", msg + " Registre uno en Referenciales → Timbrado.", "warning");
        }
    });
}

// ===================================================
// HELPERS
// ===================================================

function limpiarForm() {
    $("#id").val("");
    $("#empresa_id, #sucursal_id, #emp_razon_social, #suc_razon_social").val("");
    $("#ventas_cab_id").val(0);
    $("#nro_venta").val("").prop("disabled", false);
    $("#clientes_id").val("");
    $("#cli_nombre, #cli_apellido, #cli_ruc, #cli_direccion").val("");
    $("#nota_remi_vent_fecha, #nota_remi_vent_observaciones").val("");
    $("#funcionario_entrega_id").val("");
    $("#buscar_funcionario_entrega").val("");
    $("#tipo_vehiculo_det_id").val("");
    $("#buscar_vehiculo").val("");
    $("#timbrado_id").val("");
    $("#nota_remi_vent_nro_comprobante").val("");
    $("#nota_remi_vent_nro_comprobante_display").val("—");
    $("#tim_numero_display").val("—");
    $("#tim_vence_display").val("—");
    $("#detalle").hide();
    $("#tableDetalle").html("<tr><td colspan='6' class='text-center text-muted'>Sin ítems</td></tr>");
    $("#txtTotalGral").text("0,00");
}

function badgeEstado(estado) {
    var colores = { PENDIENTE: "label-warning", CONFIRMADA: "label-success", ANULADA: "label-danger" };
    var clase = colores[estado] || "label-default";
    return "<span class='label " + clase + "'>" + (estado || "") + "</span>";
}

function formatearNumero(n) {
    if (n === null || n === undefined || isNaN(n)) return "0,00";
    return Number(n).toLocaleString("es-PY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function campoFecha() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function cargarFuncionarioIdLogueado() {
    var s = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (s && s.user && s.user.funcionario_id) {
        $('#funcionario_id').val(s.user.funcionario_id);
    } else {
        swal("Sesión expirada", "Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}

// ===================================================
// IMPRIMIR
// ===================================================

function abrirImprimir() {
    var id = $("#id").val();
    if (!id || id == 0) { swal("Atención", "Seleccione una nota de remisión.", "warning"); return; }
    window.open("imprimir.html?id=" + id, "_blank");
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    if (xhr.status === 422 && res && res.errors) {
        var msgs = Object.values(res.errors).flat().map(function(e) { return "• " + e; }).join("\n");
        swal({ title: "Datos inválidos", text: msgs, type: "warning" });
    } else if (res && res.mensaje) {
        swal({ title: "Error", text: res.mensaje, type: res.tipo || "error" });
    } else {
        swal({ title: "Error", text: "Ocurrió un error inesperado (HTTP " + xhr.status + ").", type: "error" });
    }
}

