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
                title:'Listado de Solicitudes de Servicio'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Solicitudes de Servicio'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Solicitudes de Servicio'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Solicitudes de Servicio'
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
    $("#soli_cab_fecha").removeAttr("disabled");
    $("#soli_cab_fecha_estimada").removeAttr("disabled");
    $("#soli_cab_observaciones").removeAttr("disabled");
    $("#soli_cab_prioridad").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
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
    $("#soli_cab_fecha").removeAttr("disabled");
    $("#soli_cab_fecha_estimada").removeAttr("disabled");
    $("#soli_cab_observaciones").removeAttr("disabled");
    $("#soli_cab_prioridad").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#tipo_serv_nombre").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
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
        url: getUrl() + "solicitudcad/read", // corregí el endpoint
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (let rs of resultado) {
            // Escapar observaciones para no romper el onclick con apóstrofes
            var obs = (rs.soli_cab_observaciones || '').replace(/'/g, "\\'");
            lista += "<tr class=\"item-list\" onclick=\"seleccionSolicitud("
                + rs.id + ", "
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", "
                + rs.clientes_id + ", "
                + rs.tipo_servicio_id + ", '"
                + (rs.emp_razon_social || '').replace(/'/g,"\\'") + "', '"
                + (rs.suc_razon_social || '').replace(/'/g,"\\'") + "', '"
                + (rs.cli_nombre      || '').replace(/'/g,"\\'") + "', '"
                + (rs.cli_apellido    || '').replace(/'/g,"\\'") + "', '"
                + (rs.cli_ruc         || '') + "', '"
                + (rs.cli_direccion   || '').replace(/'/g,"\\'") + "', '"
                + (rs.cli_telefono    || '') + "', '"
                + (rs.cli_correo      || '') + "', '"
                + (rs.tipo_serv_nombre|| '').replace(/'/g,"\\'") + "', '"
                + rs.soli_cab_fecha + "', '"
                + rs.soli_cab_fecha_estimada + "', '"
                + obs + "', '"
                + rs.soli_cab_prioridad + "', '"
                + rs.soli_cab_estado + "', '"
                + (rs.funcionario || '') + "');\">";

           lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.emp_razon_social}</td>`;
            lista += `<td>${rs.cli_nombre} ${rs.cli_apellido}</td>`;
            lista += `<td>${rs.tipo_serv_nombre}</td>`;
            lista += `<td>${rs.soli_cab_fecha}</td>`;
            lista += `<td>${rs.soli_cab_prioridad}</td>`;
            lista += `<td>${rs.soli_cab_estado}</td>`;
            lista += `</tr>`;
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionSolicitud(
    id_solicitud, empresa_id, sucursal_id, clientes_id, tipo_servicio_id,
    emp_razon_social, suc_razon_social, cli_nombre, cli_apellido, cli_ruc,
    cli_direccion, cli_telefono, cli_correo, tipo_serv_nombre,
    soli_cab_fecha, soli_cab_fecha_estimada, soli_cab_observaciones,
    soli_cab_prioridad, soli_cab_estado, usuario
) {
    $("#id").val(id_solicitud);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);
    $("#tipo_servicio_id").val(tipo_servicio_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);
    $("#tipo_serv_nombre").val(tipo_serv_nombre);

    $("#soli_cab_fecha").val(soli_cab_fecha);
    $("#soli_cab_fecha_estimada").val(soli_cab_fecha_estimada);
    $("#soli_cab_observaciones").val(soli_cab_observaciones);
    $("#soli_cab_prioridad").val(soli_cab_prioridad);
    $("#soli_cab_estado").val(soli_cab_estado);

    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");

    if (soli_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (soli_cab_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}
function grabar(){
    var op = parseInt($("#txtOperacion").val());

    // Anular y confirmar: solo cambian estado, sin revalidar campos
    if (op === 3 || op === 4) {
        var endpoint = op === 3
            ? "solicitudcad/anular/"   + $("#id").val()
            : "solicitudcad/confirmar/" + $("#id").val();
        $.ajax({ url: getUrl() + endpoint, method: "PUT", dataType: "json" })
        .done(function(resultado) {
            swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
                function() { if (resultado.tipo === "success") location.reload(true); });
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
        return;
    }

    // Agregar / Editar — validar todos los campos
    var CHARS_INV = /[*<>{}|]/;
    var observaciones = $("#soli_cab_observaciones").val().trim();
    var fecha          = $("#soli_cab_fecha").val().trim();
    var plazo          = $("#soli_cab_fecha_estimada").val().trim();
    var prioridad      = $("#soli_cab_prioridad").val();
    var cliente        = $("#clientes_id").val();
    var tipoServicio   = $("#tipo_servicio_id").val();

    if (!observaciones) { swal("Error", "Las observaciones son obligatorias.", "error"); return; }
    if (CHARS_INV.test(observaciones)) { swal("Caracteres no permitidos", "Las observaciones contienen caracteres no permitidos: * < > { } |", "error"); return; }
    if (!fecha)         { swal("Error", "La fecha de solicitud es obligatoria.", "error"); return; }
    if (!plazo)         { swal("Error", "La fecha estimada es obligatoria.", "error"); return; }
    if (moment(plazo, 'DD/MM/YYYY HH:mm:ss', true).isBefore(moment(fecha, 'DD/MM/YYYY HH:mm:ss', true))) {
        swal("Error", "La fecha estimada no puede ser anterior a la fecha de solicitud.", "error"); return;
    }
    if (!prioridad)     { swal("Error", "Debe seleccionar la prioridad.", "error"); return; }
    if (!cliente)       { swal("Error", "Debe seleccionar un cliente.", "error"); return; }
    if (!tipoServicio)  { swal("Error", "Debe seleccionar el tipo de servicio.", "error"); return; }

    var endpoint = op === 2
        ? "solicitudcad/update/" + $("#id").val()
        : "solicitudcad/create";
    var metodo = op === 2 ? "PUT" : "POST";

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'soli_cab_fecha':          $("#soli_cab_fecha").val(),
            'soli_cab_fecha_estimada': $("#soli_cab_fecha_estimada").val(),
            'soli_cab_observaciones':  observaciones,
            'soli_cab_prioridad':      prioridad,
            'funcionario_id':          $("#funcionario_id").val(),
            'clientes_id':             cliente,
            'tipo_servicio_id':        tipoServicio,
            'empresa_id':              $("#empresa_id").val(),
            'sucursal_id':             $("#sucursal_id").val()
        }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
        function() {
            if (resultado.tipo === "success") {
                $("#id").val(resultado.registro.id);
                $("#detalle").show();
                if (op === 2) { location.reload(true); }
                else {
                    $("#soli_cab_fecha").attr("disabled","true");
                    $("#soli_cab_fecha_estimada").attr("disabled","true");
                    $("#soli_cab_observaciones").attr("disabled","true");
                    $("#soli_cab_prioridad").attr("disabled","true");
                    $("#suc_razon_social").attr("disabled","true");
                    $("#tipo_serv_nombre").attr("disabled","true");
                    $("#cli_nombre").attr("disabled","true");

                    $("#btnAgregar").attr("disabled","true");
                    $("#btnGrabar").attr("disabled","true");
                    $("#btnEditar").removeAttr("disabled");
                    $("#btnEliminar").removeAttr("disabled");

                    $("#formDetalles").show();
                    listarDetalles();
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';
    if (res && res.errors) {
        $.each(res.errors, function(k, v) { msg += '• ' + (Array.isArray(v) ? v[0] : v) + '\n'; });
    } else if (res && res.mensaje) {
        msg = res.mensaje;
    } else {
        msg = 'Ocurrió un error inesperado.';
    }
    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
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
    $("#item_id").val('');
    $("#item_descripcion").val('').removeAttr("disabled");
    $("#tipo_imp_nom").val('').attr("disabled","true");
    $("#soli_det_cantidad_stock").val('').attr("disabled","true");
    $("#soli_det_cantidad").val('').removeAttr("disabled");
    $("#soli_det_costo").val('').attr("disabled","true");

    $("#btnAgregarDetalle").hide();
    $("#btnEditarDetalle").hide();
    $("#btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    if (!$("#item_id").val()) {
        swal("Aviso", "Seleccione un ítem de la tabla para editar.", "warning");
        return;
    }
    $("#item_descripcion").removeAttr("disabled");
    $("#tipo_imp_nom").attr("disabled","true");
    $("#soli_det_cantidad_stock").attr("disabled","true");
    $("#soli_det_cantidad").removeAttr("disabled");
    $("#soli_det_costo").attr("disabled","true");
    $("#marca_det_mm, #modelo_det_mm").removeAttr("disabled");
    cargarDepositosDet($('#deposito_id_det').val());

    $("#btnAgregarDetalle").hide();
    $("#btnEditarDetalle").hide();
    $("#btnEliminarDetalle").hide();
    $("#btnGrabarDetalle").show();
}

function eliminarDetalle(){
    if (!$("#item_id").val()) {
        swal("Aviso", "Seleccione un ítem de la tabla para eliminar.", "warning");
        return;
    }
    swal({
        title: "Eliminar ítem",
        text: "¿Desea eliminar \"" + $("#item_descripcion").val() + "\" del detalle?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            url: getUrl() + "solicitud_det/delete/" + $("#id").val() + "/" + $("#item_id").val(),
            method: "DELETE",
            dataType: "json"
        })
        .done(function() {
            swal({ title: "Eliminado", text: "Ítem eliminado del detalle.", type: "success", timer: 1500, showConfirmButton: false });
            cancelarDetalle();
            listarDetalles();
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}
function cancelarDetalle() {
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    mmLimpiar();
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val('');
    $("#item_descripcion").val('').prop('disabled', true);
    $("#tipo_imp_nom").val('').prop('disabled', true);
    $("#soli_det_cantidad_stock").val('').prop('disabled', true);
    $("#soli_det_cantidad").val('').prop('disabled', true);
    $("#soli_det_costo").val('').prop('disabled', true);
    $("#listaProductos").html('').hide();

    $("#btnAgregarDetalle").show();
    $("#btnEditarDetalle").show();
    $("#btnEliminarDetalle").show();
    $("#btnGrabarDetalle").hide();
}

function grabarDetalle(){
    var op = parseInt($("#txtOperacionDetalle").val());

    if (op !== 3) {
        if (!$("#item_id").val()) { swal("Error", "Seleccione un ítem.", "error"); return; }
        var cant = parseFloat($("#soli_det_cantidad").val());
        if (isNaN(cant) || cant <= 0) { swal("Error", "La cantidad debe ser mayor a cero.", "error"); return; }
    }

    var endpoint = "solicitud_det/create";
    var metodo = "POST";
    if (op === 2) { endpoint = "solicitud_det/update/" + $("#id").val(); metodo = "PUT"; }
    if (op === 3) { endpoint = "solicitud_det/delete/" + $("#id").val() + "/" + $("#item_id").val(); metodo = "DELETE"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "solicitudes_cab_id":      $("#id").val(),
            "item_id":                 $("#item_id").val(),
            "tipo_impuesto_id":        $("#tipo_impuesto_id").val(),
            "soli_det_cantidad":       $("#soli_det_cantidad").val(),
            "soli_det_costo":          $("#soli_det_costo").val(),
            "soli_det_cantidad_stock": $("#soli_det_cantidad_stock").val(),
            "marca_id":                _mmMarcaId  ? parseInt(_mmMarcaId)  : null,
            "modelo_id":               _mmModeloId ? parseInt(_mmModeloId) : null,
            "deposito_id":             $("#deposito_id_det").val() || null
        }
    })
    .done(function() { cancelarDetalle(); listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });
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
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_descripcion, tipo_impuesto_id, item_costo, tipo_imp_nom, tipo_imp_tasa, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#soli_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);
    $("#soli_det_cantidad_stock").val(cantidad_disponible);

    // Cargar marcas para este ítem
    mmCargarMarcas(item_id, null);
    $("#marca_det_mm").removeAttr("disabled");

    $("#listaProductos").html("").hide();
    $(".form-line").addClass("focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral  = 0;
    var TotalIva10 = 0;
    var TotalIva5  = 0;

    $.ajax({
        url: getUrl() + "solicitud_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.soli_det_cantidad) || 0;
                const costo    = parseFloat(rs.soli_det_costo)    || 0;
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
                    + rs.item_id + ", '"
                    + (rs.item_descripcion || '').replace(/'/g,"\\'") + "', "
                    + cantidad + ", "
                    + rs.soli_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + (rs.tipo_imp_nom || '').replace(/'/g,"\\'") + "', "
                    + (rs.marca_id  || 0) + ", "
                    + (rs.modelo_id || 0) + ", "
                    + (rs.deposito_id || 0) + ",'"
                    + (rs.dep_nombre || '').replace(/'/g,"\\'") + "'"
                    + ");\">";

                lista += "<td>" + rs.item_descripcion + "</td>";
                lista += "<td>" + (rs.mar_nom   || '-') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.soli_det_cantidad_stock + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + (rs.dep_nombre || '-') + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }
            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='8' class='text-center text-muted'>Sin ítems en el detalle.</td></tr>");
        }

        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));

        // Activar o desactivar Confirmar
        if ($("#soli_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionSolicitudDet(item_id, item_descripcion, soli_det_cantidad, soli_det_cantidad_stock, soli_det_costo, tipo_impuesto_id, tipo_imp_nom, marca_id, modelo_id, deposito_id, dep_nombre) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#soli_det_cantidad").val(soli_det_cantidad);
    $("#soli_det_cantidad_stock").val(soli_det_cantidad_stock);
    $("#soli_det_costo").val(soli_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tipo_imp_nom").val(tipo_imp_nom);

    mmAutocompletar(item_id, marca_id, modelo_id);
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>').prop('disabled', true);
    } else {
        $dep.html('<option value="">-- Depósito --</option>').prop('disabled', true);
    }
    $(".form-line").addClass("focused");
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
    .fail(function(xhr) { mostrarErrores(xhr); });
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
    .fail(function(xhr) { mostrarErrores(xhr); });
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
    .fail(function(xhr) { mostrarErrores(xhr); });
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
    .fail(function(xhr) { mostrarErrores(xhr); });
}

// Rellena el formulario con los datos de un proveedor seleccionado.
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
