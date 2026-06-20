cargarFuncionarioIdLogueado();
listar();
campoFecha();

function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect',  title:'Listado de Promociones' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',   title:'Listado de Promociones' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',    title:'Listado de Promociones' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',   title:'Listado de Promociones' }
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
    $("#prom_cab_fecha_registro").removeAttr("disabled");
    $("#prom_cab_fecha_inicio").removeAttr("disabled");
    $("#prom_cab_fecha_fin").removeAttr("disabled");
    $("#prom_cab_nombre").removeAttr("disabled");
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#prom_cab_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#prom_cab_fecha_registro").removeAttr("disabled");
    $("#prom_cab_fecha_inicio").removeAttr("disabled");
    $("#prom_cab_fecha_fin").removeAttr("disabled");
    $("#prom_cab_nombre").removeAttr("disabled");
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#prom_cab_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    buscarEmpresas();

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

    if (oper === 2) { titulo = "EDITAR";    pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 3) { titulo = "ANULAR";    pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 4) { titulo = "CONFIRMAR"; pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?"; }

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
        url: getUrl() + "promocionescab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "";

        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionPromocion("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ","
                + rs.funcionario_id + ","
                + rs.tipo_promociones_id + ",'"
                + esc(rs.emp_razon_social) + "','"
                + esc(rs.suc_razon_social) + "','"
                + esc(rs.funcionario) + "','"
                + esc(rs.prom_cab_nombre) + "','"
                + esc(rs.prom_cab_observaciones) + "','"
                + esc(rs.prom_cab_fecha_registro) + "','"
                + esc(rs.prom_cab_fecha_inicio) + "','"
                + esc(rs.prom_cab_fecha_fin) + "','"
                + esc(rs.prom_cab_estado) + "','"
                + esc(rs.tipo_prom_nombre) + "','"
                + esc(rs.tipo_prom_modo) + "','"
                + esc(rs.tipo_prom_valor) + "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + (rs.emp_razon_social || '') + "</td>";
            lista += "<td>" + (rs.suc_razon_social || '') + "</td>";
            lista += "<td>" + (rs.prom_cab_nombre || '') + "</td>";
            lista += "<td>" + (rs.funcionario || '-') + "</td>";
            lista += "<td>" + (rs.prom_cab_fecha_registro || '') + "</td>";
            lista += "<td>" + (rs.prom_cab_fecha_inicio || '') + "</td>";
            lista += "<td>" + (rs.prom_cab_fecha_fin || '') + "</td>";
            lista += "<td>" + (rs.prom_cab_estado || '') + "</td>";
            lista += "<td>" + (rs.tipo_prom_nombre || '') + "</td>";
            lista += "<td>" + (rs.prom_cab_observaciones || '') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionPromocion(
    id, empresa_id, sucursal_id, funcionario_id, tipo_promociones_id,
    emp_razon_social, suc_razon_social, encargado,
    prom_cab_nombre, prom_cab_observaciones,
    prom_cab_fecha_registro, prom_cab_fecha_inicio, prom_cab_fecha_fin,
    prom_cab_estado, tipo_prom_nombre, tipo_prom_modo, tipo_prom_valor
) {
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#funcionario_id").val(funcionario_id);
    $("#tipo_promociones_id").val(tipo_promociones_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#prom_cab_nombre").val(prom_cab_nombre);
    $("#prom_cab_observaciones").val(prom_cab_observaciones);
    $("#prom_cab_fecha_registro").val(prom_cab_fecha_registro);
    $("#prom_cab_fecha_inicio").val(prom_cab_fecha_inicio);
    $("#prom_cab_fecha_fin").val(prom_cab_fecha_fin);
    $("#prom_cab_estado").val(prom_cab_estado);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);
    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);

    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (prom_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").prop("disabled", false);
        $("#formDetalles").show();
    }

    $(".form-line").addClass("focused");
}

function grabar(){
    var oper = parseInt($("#txtOperacion").val());

    if (oper === 3) {
        $.ajax({ url: getUrl() + "promocionescab/anular/" + $("#id").val(), method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    if (oper === 4) {
        $.ajax({ url: getUrl() + "promocionescab/confirmar/" + $("#id").val(), method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
                if (resultado.tipo === "success") location.reload(true);
            });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    // Validaciones frontend para agregar/editar
    var nombre = $("#prom_cab_nombre").val().trim();
    var fecha = $("#prom_cab_fecha_registro").val().trim();
    var fechaInicio = $("#prom_cab_fecha_inicio").val().trim();
    var fechaFin = $("#prom_cab_fecha_fin").val().trim();
    var tipoPromoId = $("#tipo_promociones_id").val();

    if (!nombre) {
        swal("Validación", "El nombre de la promoción es obligatorio.", "warning"); return;
    }
    if (/[*<>{}|]/.test(nombre)) {
        swal("Validación", "El nombre contiene caracteres no permitidos.", "warning"); return;
    }
    if (!fecha) {
        swal("Validación", "La fecha de registro es obligatoria.", "warning"); return;
    }
    if (!fechaInicio) {
        swal("Validación", "La fecha de inicio es obligatoria.", "warning"); return;
    }
    if (!fechaFin) {
        swal("Validación", "La fecha de fin es obligatoria.", "warning"); return;
    }
    if (!tipoPromoId) {
        swal("Validación", "Debe seleccionar un tipo de promoción.", "warning"); return;
    }

    var endpoint = "promocionescab/create";
    var metodo = "POST";
    if (oper === 2) { endpoint = "promocionescab/update/" + $("#id").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            prom_cab_nombre:         nombre,
            prom_cab_observaciones:  $("#prom_cab_observaciones").val(),
            prom_cab_fecha_registro: fecha,
            prom_cab_fecha_inicio:   fechaInicio,
            prom_cab_fecha_fin:      fechaFin,
            tipo_promociones_id:     tipoPromoId,
            empresa_id:              $("#empresa_id").val(),
            sucursal_id:             $("#sucursal_id").val(),
        }
    })
    .done(function(resultado){
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === "success") {
                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                }
                $("#detalle").attr("style","display:block;");
                if (oper === 2) {
                    location.reload(true);
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
    $("#prom_det_cantidad").removeAttr("disabled");

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle, #btnCancelarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#prom_det_cantidad").removeAttr("disabled");

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
            url: getUrl() + "promociones_det/delete/" + $("#id").val() + "/" + $("#item_id").val(),
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
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val("");
    $("#original_item_id").val("");
    $("#item_descripcion").val("").attr("disabled","true");
    $("#tipo_imp_nom").val("");
    $("#tipo_impuesto_id").val("");
    $("#prom_det_cantidad").val("").attr("disabled","true");
    $("#prom_det_costo").val("");
    $("#subtotal").val("");
    $("#iva").val("");
    mmLimpiar();

    $("#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle").attr("style", "display:inline");
    $("#btnGrabarDetalle, #btnCancelarDetalle").attr("style", "display:none");
}

function grabarDetalle(){
    var oper = parseInt($("#txtOperacionDetalle").val());

    var endpoint = "promociones_det/create";
    var metodo = "POST";
    if (oper === 2) { endpoint = "promociones_det/update/" + $("#id").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            promociones_cab_id: $("#id").val(),
            item_id:            $("#item_id").val(),
            tipo_impuesto_id:   $("#tipo_impuesto_id").val(),
            original_item_id:   $("#original_item_id").val(),
            prom_det_cantidad:  $("#prom_det_cantidad").val(),
            prom_det_costo:     $("#prom_det_costo").val(),
            marca_id:           _mmMarcaId(),
            modelo_id:          _mmModeloId(),
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

function buscarProductos(){
    $.ajax({
        url: getUrl() + "items/buscarItem",
        method: "POST",
        dataType: "json",
        data: { item_descripcion: $("#item_descripcion").val() }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + (rs.item_descripcion || '').replace(/'/g, "\\'") + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tipo_imp_nom + "',"
                + rs.tipo_imp_tasa + ")\">"
                + rs.item_descripcion + "</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista).attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#prom_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    const cantidad = parseFloat($("#prom_det_cantidad").val()) || 0;
    const costo = parseFloat(item_costo) || 0;
    const tasaImpuesto = parseFloat(tipo_imp_tasa) || 0;
    const subtotal = cantidad * costo;
    const totalConImpuesto = subtotal + (subtotal * (tasaImpuesto / 100));

    $("#subtotal").val(subtotal);
    $("#totalConImpuesto").val(totalConImpuesto);

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
        url: getUrl() + "promociones_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.prom_det_cantidad) || 0;
                const costo = parseFloat(rs.prom_det_costo) || 0;
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

                lista += "<tr class='item-list' onclick=\"seleccionSolicitudDet("
                    + rs.item_id + ",'"
                    + (rs.item_descripcion || '').replace(/'/g, "\\'") + "',"
                    + cantidad + ","
                    + costo + ","
                    + rs.tipo_impuesto_id + ",'"
                    + (rs.tipo_imp_nom || '') + "',"
                    + (rs.marca_id || 0) + ","
                    + (rs.modelo_id || 0) + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + (rs.item_descripcion || '') + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.tipo_imp_nom || '') + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "<td>" + (rs.mar_nom || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }
            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='9' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        if ($("#prom_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionSolicitudDet(item_id, item_descripcion, prom_det_cantidad, prom_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#prom_det_cantidad").val(prom_det_cantidad);
    $("#prom_det_costo").val(prom_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    const subtotal = prom_det_cantidad * prom_det_costo;
    let iva = 0;
    if (tipo_imp_nom === "IVA10") { iva = subtotal / 11; }
    else if (tipo_imp_nom === "IVA5") { iva = subtotal / 21; }

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));

    mmAutocompletar(item_id, marca_id, modelo_id);

    $(".form-line").attr("class","form-line focused");
}

function buscarEmpresas() {
    $.ajax({
        url: getUrl() + "empresa/read",
        method: "GET",
        dataType: "json"
    })
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
    $("#listaEmpresa").html("").attr("style","display:none;");
}

function buscarSucursal(){
    $.ajax({
        url: getUrl() + "sucursal/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("
                + rs.id + ",'"
                + (rs.suc_razon_social || '').replace(/'/g, "\\'") + "','"
                + (rs.suc_direccion || '').replace(/'/g, "\\'") + "','"
                + (rs.suc_telefono || '') + "','"
                + (rs.suc_correo || '') + "');\">"
                + rs.suc_razon_social + "</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionSucursal(empresa_id, suc_razon_social, suc_direccion, suc_telefono, suc_correo){
    $("#sucursal_id").val(empresa_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#listaSucursal").html("").attr("style","display:none;");
}

function buscarTipoPromociones(){
    $.ajax({
        url: getUrl() + "tipo-promociones/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoProm("
                + rs.tipo_promociones_id + ",'"
                + (rs.tipo_prom_nombre || '').replace(/'/g, "\\'") + "','"
                + (rs.tipo_prom_modo || '') + "','"
                + (rs.tipo_prom_valor || '') + "');\">"
                + rs.tipo_prom_nombre + "</li>";
        }
        lista += "</ul>";
        $("#listaTipoProm").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionTipoProm(tipo_promociones_id, tipo_prom_nombre, tipo_prom_modo, tipo_prom_valor){
    $("#tipo_promociones_id").val(tipo_promociones_id);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);
    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);
    $("#listaTipoProm").html("").attr("style","display:none;");
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
        if (xhr.responseJSON.message) {
            mensaje = xhr.responseJSON.message;
        }
        if (xhr.responseJSON.errors) {
            const errores = xhr.responseJSON.errors;
            mensaje = Object.values(errores).flat().join('\n');
        }
    }
    swal("Error", mensaje, "error");
}

