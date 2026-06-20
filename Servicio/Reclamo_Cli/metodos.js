cargarFuncionarioIdLogueado();
listar();
campoFecha();

function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect',  title:'Listado de Reclamos de Clientes' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',   title:'Listado de Reclamos de Clientes' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',    title:'Listado de Reclamos de Clientes' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',   title:'Listado de Reclamos de Clientes' }
        ],
        iDisplayLength: 3,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del START al END de un total de TOTAL registros',
            sInfoFiltered: '(filtrado de entre MAX registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#rec_cli_cab_fecha").removeAttr("disabled");
    $("#rec_cli_cab_fecha_inicio").removeAttr("disabled");
    $("#rec_cli_cab_fecha_fin").removeAttr("disabled");
    $("#rec_cli_cab_observacion").removeAttr("disabled");
    $("#rec_cli_cab_prioridad").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    $("#nro_venta_display").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnProcesar").attr("disabled","true");
    $("#btnResolver").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#rec_cli_cab_fecha").removeAttr("disabled");
    $("#rec_cli_cab_fecha_inicio").removeAttr("disabled");
    $("#rec_cli_cab_fecha_fin").removeAttr("disabled");
    $("#rec_cli_cab_observacion").removeAttr("disabled");
    $("#nro_venta_display").removeAttr("disabled");
    $("#rec_cli_cab_prioridad").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnProcesar").attr("disabled","true");
    $("#btnResolver").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnProcesar").attr("disabled","true");
    $("#btnResolver").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function procesar(){
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnProcesar").attr("disabled","true");
    $("#btnResolver").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function resolver(){
    $("#txtOperacion").val(5);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnProcesar").attr("disabled","true");
    $("#btnResolver").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").addClass("focused");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if (oper === 2) { titulo = "EDITAR";    pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 3) { titulo = "ANULAR";    pregunta = "¿DESEA ANULAR EL RECLAMO SELECCIONADO?"; }
    if (oper === 4) { titulo = "PROCESAR";  pregunta = "¿DESEA PASAR EL RECLAMO A ESTADO EN PROCESO?"; }
    if (oper === 5) { titulo = "RESOLVER";  pregunta = "¿DESEA MARCAR EL RECLAMO COMO RESUELTO?"; }

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

function listar() {
    $.ajax({
        url: getUrl() + "reclamoclicab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "";

        for (let rs of resultado) {
            lista += "<tr class='item-list' onclick=\"seleccionReclamo("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.clientes_id + ",'"
                + esc(rs.emp_razon_social) + "','"
                + esc(rs.suc_razon_social) + "','"
                + esc(rs.rec_cli_cab_fecha) + "','"
                + esc(rs.rec_cli_cab_fecha_inicio) + "','"
                + esc(rs.rec_cli_cab_fecha_fin) + "','"
                + esc(rs.cli_nombre) + "','"
                + esc(rs.cli_apellido) + "','"
                + esc(rs.cli_ruc) + "','"
                + esc(rs.cli_direccion) + "','"
                + esc(rs.cli_telefono) + "','"
                + esc(rs.cli_correo) + "','"
                + esc(rs.rec_cli_cab_prioridad) + "','"
                + esc(rs.rec_cli_cab_estado) + "','"
                + esc(rs.funcionario) + "','"
                + esc(rs.rec_cli_cab_observacion) + "',"
                + (rs.venta_cab_id || 0) + ",'"
                + esc(rs.venta_fecha) + "')\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.emp_razon_social || '') + "</td>";
            lista += "<td>" + (rs.suc_razon_social || '') + "</td>";
            lista += "<td>" + (rs.rec_cli_cab_fecha || '') + "</td>";
            lista += "<td>" + (rs.cli_nombre || '') + "</td>";
            lista += "<td>" + (rs.cli_apellido || '') + "</td>";
            lista += "<td>" + (rs.cli_ruc || '') + "</td>";
            lista += "<td>" + (rs.rec_cli_cab_prioridad || '') + "</td>";
            lista += "<td>" + (rs.rec_cli_cab_estado || '') + "</td>";
            lista += "<td>" + (rs.funcionario || '-') + "</td>";
            lista += "<td>" + (rs.venta_cab_id ? '#' + String(rs.venta_cab_id).padStart(7,'0') : '—') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionReclamo(
    id, empresa_id, sucursal_id, clientes_id,
    emp_razon_social, suc_razon_social,
    rec_cli_cab_fecha, rec_cli_cab_fecha_inicio, rec_cli_cab_fecha_fin,
    cli_nombre, cli_apellido, cli_ruc, cli_direccion, cli_telefono, cli_correo,
    prioridad, estado, encargado, rec_cli_cab_observacion,
    venta_cab_id, venta_fecha
) {
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#rec_cli_cab_estado").val(estado);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    $("#rec_cli_cab_fecha").val(rec_cli_cab_fecha);
    $("#rec_cli_cab_fecha_inicio").val(rec_cli_cab_fecha_inicio);
    $("#rec_cli_cab_fecha_fin").val(rec_cli_cab_fecha_fin);

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#rec_cli_cab_prioridad").val(prioridad);
    $("#rec_cli_cab_observacion").val(rec_cli_cab_observacion);

    $("#venta_cab_id").val(venta_cab_id || "");
    $("#nro_venta_display").val(venta_cab_id ? '#' + String(venta_cab_id).padStart(7,'0') : "");
    $("#venta_fecha_display").val(venta_fecha || "");

    $("#encargado").val(encargado || '');

    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    $("#btnAgregar, #btnEditar, #btnEliminar, #btnProcesar, #btnResolver, #btnGrabar")
        .prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    listarDetalles();

    if (estado === "PENDIENTE") {
        $("#btnEditar, #btnEliminar, #btnProcesar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (estado === "EN PROCESO") {
        $("#btnEliminar, #btnResolver").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}

function grabar() {
    var oper = parseInt($("#txtOperacion").val());

    if (oper === 3) {
        $.ajax({ url: getUrl() + "reclamoclicab/anular/" + $("#id").val(), method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    if (oper === 4) {
        $.ajax({ url: getUrl() + "reclamoclicab/procesar/" + $("#id").val(), method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    if (oper === 5) {
        $.ajax({ url: getUrl() + "reclamoclicab/resolver/" + $("#id").val(), method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    var observacion = $("#rec_cli_cab_observacion").val().trim();
    var prioridad   = $("#rec_cli_cab_prioridad").val().trim();
    var fecha       = $("#rec_cli_cab_fecha").val().trim();
    var fechaInicio = $("#rec_cli_cab_fecha_inicio").val().trim();
    var fechaFin    = $("#rec_cli_cab_fecha_fin").val().trim();
    var clienteId   = $("#clientes_id").val();
    var sucursalTxt = $("#suc_razon_social").val().trim();

    if (!observacion) {
        swal("Validación", "La observación es obligatoria.", "warning"); return;
    }
    if (!prioridad) {
        swal("Validación", "Debe seleccionar una prioridad.", "warning"); return;
    }
    if (!fecha) {
        swal("Validación", "La fecha del reclamo es obligatoria.", "warning"); return;
    }
    if (!fechaInicio) {
        swal("Validación", "La fecha de inicio es obligatoria.", "warning"); return;
    }
    if (!fechaFin) {
        swal("Validación", "La fecha de fin es obligatoria.", "warning"); return;
    }
    if (!clienteId) {
        swal("Validación", "Debe seleccionar un cliente.", "warning"); return;
    }
    if (!sucursalTxt) {
        swal("Validación", "Debe seleccionar una sucursal.", "warning"); return;
    }

    var endpoint = "reclamoclicab/create";
    var metodo = "POST";
    if (oper === 2) { endpoint = "reclamoclicab/update/" + $("#id").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            rec_cli_cab_fecha:        fecha,
            rec_cli_cab_fecha_inicio: fechaInicio,
            rec_cli_cab_fecha_fin:    fechaFin,
            rec_cli_cab_prioridad:    prioridad,
            rec_cli_cab_observacion:  observacion,
            clientes_id:              clienteId,
            empresa_id:               $("#empresa_id").val(),
            sucursal_id:              $("#sucursal_id").val(),
            venta_cab_id:             $("#venta_cab_id").val() || null,
        }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === "success") {
                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                }
                $("#detalle").show();
                if (oper === 2) {
                    location.reload(true);
                } else {
                    $("#formDetalles").show();
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
    var num = Number(valor);
    if (isNaN(num)) { num = parseNumero(String(valor)); }
    try {
        return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
        var parts = (Math.round(num * 100) / 100).toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(',');
    }
}

function parseNumero(str) {
    if (str === null || str === undefined || str === '') return 0;
    if (typeof str === 'number') return str;
    var s = String(str).trim().replace(/\s+/g, '');
    var hasComma = s.indexOf(',') !== -1;
    var hasDot = s.indexOf('.') !== -1;
    if (hasComma && hasDot) {
        s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma && !hasDot) {
        s = s.replace(',', '.');
    }
    s = s.replace(/[^0-9\.-]/g, '');
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}

function agregarDetalle() {
    cancelarDetalle();
    $("#txtOperacionDetalle").val(1);
    $("#item_descripcion").removeAttr("disabled");
    $("#rec_cli_det_cantidad").removeAttr("disabled");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle, #btnCancelarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#rec_cli_det_cantidad").removeAttr("disabled");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle, #btnCancelarDetalle").attr("style", "display:inline");
}

function eliminarDetalle(){
    swal({
        title: "Eliminar detalle",
        text: "¿Desea eliminar el producto seleccionado del detalle?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }, function(confirmado) {
        if (!confirmado) return;
        $.ajax({
            url: getUrl() + "reclamoclidet/delete/" + $("#id").val() + "/" + $("#item_id").val(),
            method: "DELETE",
            dataType: "json"
        })
        .done(function(respuesta) {
            swal({ title: "Respuesta", text: respuesta.mensaje, type: respuesta.tipo });
            cancelarDetalle();
            listarDetalles();
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function cancelarDetalle() {
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val("");
    $("#original_item_id").val("");
    $("#item_descripcion").val("").attr("disabled","true");
    $("#tipo_imp_nom").val("");
    $("#tipo_impuesto_id").val("");
    $("#rec_cli_det_cantidad").val("").attr("disabled","true");
    $("#rec_cli_det_costo").val("").attr("disabled","true");
    $("#rec_cli_det_cantidad_stock").val("").attr("disabled","true");
    $("#subtotal").val("");
    $("#iva").val("");
    mmLimpiar();
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>');
    cargarDepositosDet(null);

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").attr("style", "display:inline");
    $("#btnGrabarDetalle, #btnCancelarDetalle").attr("style", "display:none");
}

function grabarDetalle(){
    var oper = parseInt($("#txtOperacionDetalle").val());

    var endpoint = "reclamoclidet/create";
    var metodo = "POST";
    if (oper === 2) { endpoint = "reclamoclidet/update/" + $("#id").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            reclamo_cli_cab_id:          $("#id").val(),
            item_id:                     $("#item_id").val(),
            original_item_id:            $("#original_item_id").val(),
            tipo_impuesto_id:            $("#tipo_impuesto_id").val(),
            rec_cli_det_cantidad:        $("#rec_cli_det_cantidad").val(),
            rec_cli_det_costo:           $("#rec_cli_det_costo").val(),
            rec_cli_det_cantidad_stock:  $("#rec_cli_det_cantidad_stock").val(),
            marca_id:                    _mmMarcaId(),
            modelo_id:                   _mmModeloId(),
        }
    })
    .done(function(respuesta) {
        swal({ title: "Respuesta", text: respuesta.mensaje, type: respuesta.tipo });
        cancelarDetalle();
        listarDetalles();
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
        url: getUrl() + "items/buscarItem",
        method: "POST",
        dataType: "json",
        data: { "item_descripcion": $("#item_descripcion").val() }
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + esc(rs.item_descripcion) + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tipo_imp_nom + "',"
                + rs.tipo_imp_tasa + ","
                + (rs.cantidad_disponible || 0) + ")\">"
                + esc(rs.item_descripcion) + " (Stock: " + (rs.cantidad_disponible || 0) + ")</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista).attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#rec_cli_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#rec_cli_det_cantidad_stock").val(cantidad_disponible);

    const cantidad = parseFloat($("#rec_cli_det_cantidad").val()) || 0;
    const costo = parseFloat(item_costo) || 0;
    const subtotal = cantidad * costo;
    let iva = 0;
    if (tipo_imp_nom === "IVA10") { iva = subtotal / 11; }
    else if (tipo_imp_nom === "IVA5") { iva = subtotal / 21; }

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));

    mmCargarMarcas(item_id, null);

    $("#listaProductos").html("").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    $.ajax({
        url: getUrl() + "reclamoclidet/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.rec_cli_det_cantidad) || 0;
                const costo = parseFloat(rs.rec_cli_det_costo) || 0;
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

                lista += "<tr class='item-list' onclick=\"seleccionReclamoDet("
                    + rs.item_id + ",'"
                    + (rs.item_descripcion || '').replace(/'/g, "\\'") + "',"
                    + cantidad + ","
                    + (rs.rec_cli_det_cantidad_stock || 0) + ","
                    + costo + ","
                    + rs.tipo_impuesto_id + ",'"
                    + (rs.tipo_imp_nom || '') + "',"
                    + (rs.marca_id || 0) + ","
                    + (rs.modelo_id || 0) + ","
                    + (rs.deposito_id || 0) + ",'"
                    + (rs.dep_nombre || '').replace(/'/g, "\\'")
                    + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + (rs.item_descripcion || '') + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + (rs.rec_cli_det_cantidad_stock || 0) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.tipo_imp_nom || '') + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "<td>" + (rs.dep_nombre || '-') + "</td>";
                lista += "<td>" + (rs.mar_nom || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }
            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='10' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        if ($("#rec_cli_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnProcesar").removeAttr("disabled");
        } else {
            if ($("#rec_cli_cab_estado").val() === "PENDIENTE") {
                $("#btnProcesar").attr("disabled", "true");
            }
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionReclamoDet(item_id, item_descripcion, rec_cli_det_cantidad, rec_cli_det_cantidad_stock, rec_cli_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id, deposito_id, dep_nombre) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#rec_cli_det_cantidad").val(rec_cli_det_cantidad);
    $("#rec_cli_det_cantidad_stock").val(rec_cli_det_cantidad_stock);
    $("#rec_cli_det_costo").val(rec_cli_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    const subtotal = rec_cli_det_cantidad * rec_cli_det_costo;
    let iva = 0;
    if (tipo_imp_nom === "IVA10") { iva = subtotal / 11; }
    else if (tipo_imp_nom === "IVA5") { iva = subtotal / 21; }

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

function buscarCliente(){
    $.ajax({
        url: getUrl() + "clientes/buscar",
        method: "POST",
        dataType: "json",
        data: { "cli_nombre": $("#cli_nombre").val() }
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("
                + rs.clientes_id + ",'"
                + esc(rs.cli_nombre) + "','"
                + esc(rs.cli_apellido) + "','"
                + esc(rs.cli_ruc) + "','"
                + esc(rs.cli_direccion) + "','"
                + esc(rs.cli_telefono) + "','"
                + esc(rs.cli_correo) + "');\">"
                + esc(rs.cli_nombre) + " - " + esc(rs.cli_apellido) + " - " + esc(rs.cli_ruc) + "</li>";
        }
        lista += "</ul>";
        $("#listaClientes").html(lista).attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionCliente(clientes_id, cli_nombre, cli_apellido, cli_ruc, cli_direccion, cli_telefono, cli_correo){
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);
    $("#listaClientes").html("").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function buscarEmpresas() {
    $.ajax({ url: getUrl() + "empresa/read", method: "GET", dataType: "json" })
    .done(function(resultado) {
        if (resultado.length > 0) {
            var p = resultado[0];
            seleccionEmpresa(p.id, p.emp_razon_social, p.emp_direccion, p.emp_telef, p.emp_correo);
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telef, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#listaEmpresa").html("").attr("style", "display:none;");
}

function buscarSucursal(){
    $.ajax({ url: getUrl() + "sucursal/read", method: "GET", dataType: "json" })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("
                + rs.id + ",'"
                + esc(rs.suc_razon_social) + "');\">"
                + esc(rs.suc_razon_social) + "</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionSucursal(sucursal_id, suc_razon_social){
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#listaSucursal").html("").attr("style","display:none;");
}

function buscarVenta() {
    var texto = $("#nro_venta_display").val().trim();
    if (texto.length < 1) {
        $("#listaVentas").html("").hide();
        return;
    }
    $.ajax({
        url: getUrl() + "ventas_cab/buscar",
        method: "GET",
        dataType: "json",
        data: { q: texto }
    })
    .done(function(resultado) {
        if (!resultado.length) {
            $("#listaVentas").html("<ul class='list-group'><li class='list-group-item disabled'>Sin resultados</li></ul>").show();
            return;
        }
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class='list-group'>";
        for (let rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionVenta("
                + rs.ventas_cab_id + ",'"
                + esc(rs.vent_fecha) + "','"
                + esc((rs.cli_nombre || '') + " " + (rs.cli_apellido || '')) + "')\">"
                + "#" + String(rs.ventas_cab_id).padStart(7,'0')
                + " — " + esc(rs.cli_nombre || '') + " " + esc(rs.cli_apellido || '')
                + " (" + (rs.vent_fecha || '') + ")</li>";
        }
        lista += "</ul>";
        $("#listaVentas").html(lista).css({ display:"block", position:"absolute", zIndex:2000 });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionVenta(venta_cab_id, vent_fecha, clienteNombre) {
    $("#venta_cab_id").val(venta_cab_id);
    $("#nro_venta_display").val("#" + String(venta_cab_id).padStart(7,'0') + " — " + clienteNombre);
    $("#venta_fecha_display").val(vent_fecha);
    $("#listaVentas").html("").hide();
    $(".form-line").addClass("focused");
}

function cargarFuncionarioIdLogueado() {
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
        } else {
            swal("Sesión inválida", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
            window.location.href = '../../index.html';
        }
    } catch (error) {
        swal("Error", "Error al cargar datos del usuario. Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}

function mostrarErrores(xhr) {
    let mensaje = 'Ocurrió un error inesperado.';
    if (xhr.responseJSON) {
        if (xhr.responseJSON.message) { mensaje = xhr.responseJSON.message; }
        if (xhr.responseJSON.errors) {
            mensaje = Object.values(xhr.responseJSON.errors).flat().join('\n');
        }
    }
    swal("Error", mensaje, "error");
}

