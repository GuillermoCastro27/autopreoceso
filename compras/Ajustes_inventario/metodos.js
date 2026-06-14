// ─── DEBOUNCE HELPER ─────────────────────────────────────────────────────────
var _timers = {};
function buscarConDebounce(key, fn) {
    clearTimeout(_timers[key]);
    _timers[key] = setTimeout(fn, 300);
}

// Cargar funcionario_id del usuario logueado
cargarFuncionarioIdLogueado();
listar();
campoFecha();

var listaDepositos = [];
function cargarDepositos() {
    $.ajax({ url: getUrl()+'deposito/read', method:'GET', dataType:'json', success:function(data){ listaDepositos=data; } });
}
cargarDepositos();
function getNombreDeposito(id) {
    var d = listaDepositos.find(function(x){ return x.id==id; });
    return d ? d.dep_nombre : '-';
}
function cargarDepositosPorSucursal(sucursal_id, selected_id) {
    if (!sucursal_id) return;
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucursal_id, function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selected_id ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        $('#deposito_id_det').html(opts);
    });
}

function esSalida() { return $('#tipo_ajuste').val() === 'Salida'; }

function validarFechaInput(campoId, avisoId) {
    var val = $('#' + campoId).val().trim();
    var aviso = $('#' + avisoId);
    if (!val) { aviso.hide(); return; }
    var m = moment(val, 'DD/MM/YYYY HH:mm:ss', true);
    if (!m.isValid()) {
        $('#' + campoId).css('border-color', '#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
        return;
    }
    var hoy = moment().startOf('day');
    var fechaDia = m.clone().startOf('day');
    if (!fechaDia.isSame(hoy)) {
        $('#' + campoId).css('border-color', '#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#' + campoId).css('border-color', '');
        aviso.hide();
    }
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    var titulo = xhr.status === 422 ? 'Datos inválidos' : 'Error';
    var msg = '';
    if (res && res.errors) {
        var lineas = [];
        $.each(res.errors, function(k, v) { lineas.push('• ' + (Array.isArray(v) ? v[0] : v)); });
        msg = lineas.join('\n');
    } else if (res && res.mensaje) { msg = res.mensaje; }
    else { msg = 'Ocurrió un error inesperado.'; }
    swal({ title: titulo, text: msg, type: xhr.status === 422 ? 'warning' : 'error' });
    console.error(xhr.responseText);
}

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
                title:'Listado de Ajustes'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ajustes'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ajustes'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ajustes'
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
    $("#ajus_cab_fecha").removeAttr("disabled");
    $("#descripcion").removeAttr("disabled");
    $("#tipo_ajuste").val("");
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
    $("#ajus_cab_fecha").removeAttr("disabled");
    $("#descripcion").removeAttr("disabled");
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


function listar(){
    $.ajax({
        url: getUrl() + "ajus_cab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionAjuste("
                + rs.id + ", " 
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", '"
                + rs.emp_razon_social + "', '"
                + rs.suc_razon_social + "', '"
                + rs.ajus_cab_fecha + "', '"
                + rs.motivo_ajuste_id + "', '"
                + rs.descripcion + "', '"
                + rs.tipo_ajuste + "', '"
                + rs.ajus_cab_estado + "', '"
                + rs.name + "');\">";
            
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.emp_razon_social + "</td>";
            lista += "<td>" + rs.suc_razon_social + "</td>";
            lista += "<td>" + rs.ajus_cab_fecha + "</td>";
            lista += "<td>" + rs.descripcion + "</td>";
            lista += "<td>" + rs.tipo_ajuste + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.ajus_cab_estado + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}
function seleccionAjuste(ajuste_id,empresa_id, sucursal_id,emp_razon_social,suc_razon_social, ajus_cab_fecha, motivo_ajuste_id, descripcion,tipo_ajuste, ajus_cab_estado){
    $("#id").val(ajuste_id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#ajus_cab_fecha").val(ajus_cab_fecha);
    $("#motivo_ajuste_id").val(motivo_ajuste_id);
    $("#descripcion").val(descripcion);
    $("#tipo_ajuste").val(tipo_ajuste);
    $("#ajus_cab_estado").val(ajus_cab_estado);

    
    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();
    
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    
    $("#btnCancelar").removeAttr("disabled");

    if (ajus_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").removeAttr("disabled");
        $("#formDetalles").show();
        mostrarBotonesDetalle('normal');
    }
    if (ajus_cab_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
    }
    $(".form-line").attr("class","form-line focused");
}
function grabar(){
    var errores = [];
    var fechaVal = $('#ajus_cab_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, 'DD/MM/YYYY HH:mm:ss', true);
        if (!mFecha.isValid()) {
            errores.push('El formato de fecha es inválido.');
        } else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day'))) {
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
        }
    }
    if (!$('#suc_razon_social').val().trim())  errores.push('Seleccione la sucursal.');
    if (!$('#motivo_ajuste_id').val())         errores.push('Seleccione el motivo de ajuste.');

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }
    var endpoint = "ajus_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "ajus_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "ajus_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "ajus_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'ajus_cab_fecha': $("#ajus_cab_fecha").val(), 
            'motivo_ajuste_id': $("#motivo_ajuste_id").val(),  
            'tipo_ajuste': $("#tipo_ajuste").val(),
            'funcionario_id': $("#funcionario_id").val(), 
            'ajus_cab_estado': estado,
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val()
        }

    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                $("#id").val(resultado.registro.id);
                $("#detalle").show();
                $("#formDetalles").show();
                if(resultado.registro.ajus_cab_estado!="PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });

    // El onchange HTML no dispara para datetimepicker — se bindea aquí
    $('#ajus_cab_fecha').on('change', function() {
        validarFechaInput('ajus_cab_fecha', 'avisoFechaAjuste');
    });
}

function agregarDetalle() {
    mmLimpiar();
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val('');
    $("#item_decripcion").val('');
    $("#ajus_det_cantidad").val('').prop('disabled', true);
    $("#cantidad_stock").val('');
    $("#stock_disponible_det").val(0);
    $("#avisoStockAjuste").hide();
    $("#ajus_det_cantidad").css('border-color','');

    cargarDepositosPorSucursal($('#sucursal_id').val(), null);
    $('#deposito_id_det').removeAttr('disabled');

    if (esSalida()) {
        // Salida: primero deposito, luego item filtrado
        $('#item_decripcion').prop('disabled', true);
        $('#deposito_id_det').off('change.ajuste').on('change.ajuste', function() {
            $('#item_id').val('');
            $('#item_decripcion').val('');
            $('#cantidad_stock').val('');
            $('#stock_disponible_det').val(0);
            if ($(this).val()) {
                $('#item_decripcion').removeAttr('disabled');
            } else {
                $('#item_decripcion').prop('disabled', true);
            }
        });
    } else {
        $('#item_decripcion').removeAttr('disabled');
    }

    mostrarBotonesDetalle('grabar');
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#ajus_det_cantidad").removeAttr("disabled");
    cargarDepositosPorSucursal($('#sucursal_id').val(), $('#deposito_id_det').val());
    $('#deposito_id_det').removeAttr('disabled');
    $('#marca_det_mm, #modelo_det_mm').removeAttr('disabled');
    mostrarBotonesDetalle('grabar');
}

function eliminarDetalle() {
    $("#txtOperacionDetalle").val(3);
    mostrarBotonesDetalle('grabar');
}

function cancelarDetalle() {
    mmLimpiar();
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val('');
    $("#item_decripcion").val('').prop('disabled', true);
    $("#ajus_det_cantidad").val('').prop('disabled', true);
    $("#cantidad_stock").val('');
    $("#stock_disponible_det").val(0);
    $("#avisoStockAjuste").hide();
    $("#ajus_det_cantidad").css('border-color','');
    $('#deposito_id_det').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    $('#deposito_id_det').off('change.ajuste');
    $("#listaProductos").html('').hide();
    mostrarBotonesDetalle('normal');
}

function mostrarBotonesDetalle(modo) {
    if (modo === 'grabar') {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').hide();
        $('#btnGrabarDetalle, #btnCancelarDetalle').show();
    } else {
        $('#btnAgregarDetalle, #btnEditarDetalle, #btnEliminarDetalle').show();
        $('#btnGrabarDetalle, #btnCancelarDetalle').hide();
    }
}
function grabarDetalle() {
    var errores = [];
    var oper = parseInt($("#txtOperacionDetalle").val());

    if (oper !== 3) {
        if (!$('#item_id').val())                errores.push('Seleccione un ítem.');
        var cantidad = parseFloat($('#ajus_det_cantidad').val());
        if (isNaN(cantidad) || cantidad <= 0)    errores.push('La cantidad debe ser mayor a cero.');
        if (!$('#deposito_id_det').val())         errores.push('Seleccione un depósito.');
        if (esSalida() && errores.length === 0) {
            var stock = parseFloat($('#stock_disponible_det').val()) || 0;
            if (cantidad > stock) errores.push('La cantidad (' + cantidad + ') supera el stock disponible (' + stock + ').');
        }
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = 'ajus_det/create';
    var metodo   = 'POST';
    if (oper === 2) { endpoint = 'ajus_det/update/' + $("#id").val(); metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'ajus_det/delete/' + $("#id").val() + '/' + $("#item_id").val() + '?deposito_id=' + $("#deposito_id_det").val(); metodo = 'DELETE'; }

    $.ajax({
        url: getUrl() + endpoint, method: metodo, dataType: 'json',
        data: {
            'ajuste_cab_id':    $("#id").val(),
            'item_id':          $("#item_id").val(),
            'ajus_det_cantidad':$("#ajus_det_cantidad").val(),
            'cantidad_stock':   $("#cantidad_stock").val(),
            'deposito_id':      $("#deposito_id_det").val(),
            'marca_id':         _mmMarcaId ? parseInt(_mmMarcaId) : null,
            'modelo_id':        _mmModeloId ? parseInt(_mmModeloId) : null
        }
    })
    .done(function() { listarDetalles(); })
    .fail(function(xhr) { mostrarErrores(xhr); });

    cancelarDetalle();
}

function validarCantidadAjuste() {
    if (!esSalida()) return;
    var cantidad = parseFloat($('#ajus_det_cantidad').val());
    var stock    = parseFloat($('#stock_disponible_det').val()) || 0;
    if (!isNaN(cantidad) && cantidad > stock) {
        $('#ajus_det_cantidad').css('border-color', '#e74c3c');
        $('#avisoStockAjuste').text('Stock disponible: ' + stock).show();
        $('#btnGrabarDetalle').prop('disabled', true);
    } else {
        $('#ajus_det_cantidad').css('border-color', '');
        $('#avisoStockAjuste').hide();
        $('#btnGrabarDetalle').prop('disabled', false);
    }
}

function buscarProductos() {
    var q = $("#item_decripcion").val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }

    if (esSalida() && !$('#deposito_id_det').val()) {
        swal('Aviso', 'Seleccione el depósito antes de buscar ítems.', 'warning'); return;
    }

    var data = { item_decripcion: q };
    if (esSalida()) data.deposito_id = $('#deposito_id_det').val();

    buscarConDebounce('prod', function() {
        $.ajax({ url: getUrl() + 'items/buscar', method: 'POST', dataType: 'json', data: data })
        .done(function(resultado) {
            if (resultado.length === 0 && esSalida()) {
                $('#listaProductos').html('<ul class="list-group"><li class="list-group-item text-muted">Sin stock en este depósito</li></ul>')
                    .attr('style','display:block; position:absolute; z-index:2000;');
                return;
            }
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += '<li class="list-group-item" onclick="seleccionProducto(' + rs.item_id + ",'" + rs.item_decripcion + "'," + stock + ')">'
                    + rs.item_decripcion
                    + ' <span class="badge" style="background:#3b82f6;color:#fff;">Stock: ' + stock + '</span>'
                    + '</li>';
            });
            lista += '</ul>';
            $('#listaProductos').html(lista).attr('style','display:block; position:absolute; z-index:2000;');
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}
function seleccionProducto(item_id, item_decripcion, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#cantidad_stock").val('' + cantidad_disponible);
    $("#stock_disponible_det").val(cantidad_disponible || 0);
    $("#ajus_det_cantidad").removeAttr('disabled');
    mmCargarMarcas(item_id, null);
    $('#marca_det_mm').removeAttr('disabled');
    $("#listaProductos").html("").hide();
    $(".form-line").addClass("focused");
}

function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"ajus_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for (var rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle("
                + rs.item_id + ",'"
                + rs.item_decripcion + "',"
                + rs.ajus_det_cantidad + ","
                + (rs.cantidad_stock || 0) + ","
                + (rs.deposito_id || 0) + ","
                + (rs.marca_id || 0) + ","
                + (rs.modelo_id || 0) + ");\">";
            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + rs.item_decripcion + "</td>";
            lista += "<td>" + (rs.marc_nom || '-') + "</td>";
            lista += "<td>" + (rs.modelo_nom || '-') + "</td>";
            lista += "<td>" + rs.ajus_det_cantidad + "</td>";
            lista += "<td>" + (rs.cantidad_stock || 0) + "</td>";
            lista += "<td>" + getNombreDeposito(rs.deposito_id) + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ajus_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr) { mostrarErrores(xhr); })
}
function seleccionDetalle(item_id, item_decripcion, ajus_det_cantidad, cantidad_stock, deposito_id, marca_id, modelo_id) {
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#ajus_det_cantidad").val(ajus_det_cantidad);
    $("#cantidad_stock").val('' + cantidad_stock);
    $("#stock_disponible_det").val(cantidad_stock || 0);
    cargarDepositosPorSucursal($('#sucursal_id').val(), deposito_id);
    mmAutocompletar(item_id, marca_id, modelo_id);
    $("#listaProductos").html('').hide();
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
    buscarConDebounce('suc', function() {
    $.ajax({ url: getUrl() + "sucursal/read", method:"GET", dataType:"json" })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(var rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){ console.log(a.responseText); });
    });
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
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
            console.log('User ID cargado exitosamente:', datosSesion.user.funcionario_id);
        } else {
            console.error('No se encontraron datos de sesión válidos');
            swal({ title: 'Error', text: 'No se puede identificar al usuario. Inicie sesión nuevamente.', type: 'error' });
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        swal({ title: 'Error', text: 'Error al cargar datos del usuario. Inicie sesión nuevamente.', type: 'error' });
        window.location.href = '../../index.html';
    }
}
function buscarMotivoAjuste() {
    buscarConDebounce('motivo', function() {
        $.ajax({ url: getUrl() + "motivo_ajuste/read", method: "GET", dataType: "json" })
        .done(function(resultado) {
            var lista = "<ul class=\"list-group\">";
            resultado.forEach(function(rs) {
                lista += "<li class=\"list-group-item\" onclick=\"seleccionMotivoAjuste("+rs.id+", '"+rs.descripcion+"', '"+rs.tipo_ajuste+"');\">"
                    + rs.descripcion + " (" + rs.tipo_ajuste + ")</li>";
            });
            lista += "</ul>";
            $("#listaMotivoajuste").html(lista).attr("style", "display:block; position:absolute; z-index:2000;");
        })
        .fail(function(xhr) { mostrarErrores(xhr); });
    });
}

function seleccionMotivoAjuste(id, descripcion, tipo_ajuste) {
    $("#motivo_ajuste_id").val(id);
    $("#descripcion").val(descripcion);
    $("#tipo_ajuste").val(tipo_ajuste);

    $("#listaMotivoajuste").html("");
    $("#listaMotivoajuste").attr("style", "display:none;");
}
