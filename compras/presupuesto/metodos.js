var pedidosSeleccionados = [];

// Cargar funcionario_id del usuario logueado
cargarFuncionarioIdLogueado();
// Función para cargar la lista de presupuestos al cargar la página.
listar();
// Función para configurar el formato de fecha en ciertos campos.
campoFecha();

var listaDepositos = [];
function cargarDepositos() {
    $.ajax({ url: getUrl()+'deposito/read', method:'GET', dataType:'json', success:function(data){ listaDepositos=data; } });
}
cargarDepositos();
function getSelectDeposito(id_sel) {
    var opts = '<option value="">-- Depósito --</option>';
    listaDepositos.forEach(function(d){
        var label = d.dep_nombre + (d.suc_razon_social ? ' — ' + d.suc_razon_social : '');
        opts += '<option value="'+d.id+'"'+(d.id==id_sel?' selected':'')+'>'+label+'</option>';
    });
    return opts;
}
function getNombreDeposito(id) {
    var d = listaDepositos.find(function(x){ return x.id==id; });
    return d ? d.dep_nombre : '-';
}

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
                title:'Listado de Presupuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Presupuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Presupuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Presupuestos'
            }
        ],
        iDisplayLength:25,
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
function cancelar(){
    location.reload(true);
}

// Prepara el formulario para agregar un nuevo presupuesto.
function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#pre_fecha").removeAttr("disabled");
    $("#pre_vence").removeAttr("disabled");
    $("#pre_observaciones").removeAttr("disabled");
    $("#prov_razonsocial").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    pedidosSeleccionados = [];
    renderizarPedidosSeleccionados();

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

// Prepara el formulario para editar un presupuesto existente.
function editar(){
    $("#txtOperacion").val(2);
    $("#pre_fecha").removeAttr("disabled");
    $("#pre_vence").removeAttr("disabled");
    $("#pre_observaciones").removeAttr("disabled");
    $("#prov_razonsocial").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    pedidosSeleccionados = [];
    renderizarPedidosSeleccionados();

    $(".form-line").attr("class","form-line focused");
}

// Prepara el formulario para eliminar un presupuesto.
function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para confirmar un presupuesto.
function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

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
    if(oper===4){
        titulo = "CONFIMRAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
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
function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}

// Obtiene y muestra la lista de presupuestos mediante una solicitud AJAX.
function listar(){
    $.ajax({
        url: getUrl() + "presupuesto/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        let lista = "";

        for (let rs of resultado) {
            lista += "<tr class='item-list' onclick=\"seleccionPresupuesto("
                + rs.id + ","
                + rs.empresa_id + ","
                + rs.sucursal_id + ",'"
                + rs.emp_razon_social + "','"
                + rs.suc_razon_social + "','"
                + rs.pre_fecha + "','"
                + rs.pre_vence + "','"
                + rs.pre_observaciones + "','"
                + rs.pre_estado + "',"
                + rs.proveedor_id + ",'"
                + rs.prov_razonsocial + "','"
                + rs.prov_ruc + "','"
                + rs.prov_telefono + "','"
                + rs.prov_correo + "')\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.pre_fecha + "</td>";
            lista += "<td>" + rs.pre_vence + "</td>";
            lista += "<td>" + rs.pre_observaciones + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.pre_estado + "</td>";
            lista += "<td>" + (rs.pedidos || '-') + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar el listado.', 'error');
    });
}

// Rellena el formulario con los datos de un presupuesto seleccionado.
function seleccionPresupuesto(
    id, empresa_id, sucursal_id,
    emp_razon_social, suc_razon_social,
    pre_fecha, pre_vence, pre_observaciones, pre_estado,
    proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo
){
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#pre_fecha").val(pre_fecha);
    $("#pre_vence").val(pre_vence);
    $("#pre_observaciones").val(pre_observaciones);
    $("#pre_estado").val(pre_estado);

    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    pedidosSeleccionados = [];
    renderizarPedidosSeleccionados();

    $.get(getUrl() + 'presupuesto-pedidos/read/' + id, function(rows) {
        pedidosSeleccionados = rows.map(function(r) {
            return {
                pedido_id:       r.pedido_id,
                empresa_id:      r.empresa_id,
                sucursal_id:     r.sucursal_id,
                emp_razon_social: r.emp_razon_social,
                suc_razon_social: r.suc_razon_social,
                ped_vence:       r.ped_vence,
                pedido:          r.pedido
            };
        });
        renderizarPedidosSeleccionados();
    });

    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", true);
    $("#btnGrabar").prop("disabled", true);
    $("#btnEliminar").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true);
    $("#btnRechazar").prop("disabled", true);
    $("#btnAprobar").prop("disabled", true);

    $("#btnCancelar").prop("disabled", false);
    if (pre_estado === "PENDIENTE") {
        $("#btnEditar").prop("disabled", false);
        $("#btnEliminar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (pre_estado === "CONFIRMADO") {
        $("#btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
    listarDetalles();
}


function bloquearCabecera() {
    $("#pre_fecha").attr("disabled", true);
    $("#pre_vence").attr("disabled", true);
    $("#pre_observaciones").attr("disabled", true);
    $("#prov_razonsocial").attr("disabled", true);
    $("#pedido").attr("disabled", true);
    $("#suc_razon_social").attr("disabled", true);

    $("#btnGrabar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);
    $("#btnAgregar").prop("disabled", true);
    $("#btnEditar").prop("disabled", false);
    $("#btnEliminar").prop("disabled", false);
    $("#btnConfirmar").prop("disabled", true);
    $("#btnRechazar").prop("disabled", true);
    $("#btnAprobar").prop("disabled", true);
}

// Realiza operaciones de creación, edición, eliminación, confirmación, rechazo o aprobación de un presupuesto.
function grabar(){
    var errores = [];

    // Fecha (debe ser hoy)
    var fechaVal = $('#pre_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, 'DD/MM/YYYY HH:mm:ss', true);
        if (!mFecha.isValid()) errores.push('El formato de la fecha es inválido.');
        else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day')))
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
    }

    // Plazo de entrega (hoy o futuro, >= fecha)
    var venceVal = $('#pre_vence').val().trim();
    if (!venceVal) {
        errores.push('El plazo de entrega es obligatorio.');
    } else {
        var mVence = moment(venceVal, 'DD/MM/YYYY HH:mm:ss', true);
        if (!mVence.isValid()) errores.push('El formato del plazo de entrega es inválido.');
        else if (mVence.clone().startOf('day').isBefore(moment().startOf('day')))
            errores.push('El plazo de entrega no puede ser una fecha pasada.');
        else if (fechaVal) {
            var mF = moment(fechaVal, 'DD/MM/YYYY HH:mm:ss', true);
            if (mF.isValid() && mVence.isBefore(mF))
                errores.push('El plazo debe ser igual o posterior a la fecha del presupuesto.');
        }
    }

    if (!$('#pre_observaciones').val().trim()) errores.push('Las observaciones son obligatorias.');
    if (!$('#proveedor_id').val())             errores.push('Debe seleccionar un proveedor.');
    if (pedidosSeleccionados.length === 0)     errores.push('Debe agregar al menos un pedido.');

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }
    var endpoint = "presupuesto/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "presupuesto/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "presupuesto/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "presupuesto/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: {
            'id': $("#id").val(),
            'pre_fecha': $("#pre_fecha").val(),
            'pre_vence': $("#pre_vence").val(),
            'pre_observaciones': $("#pre_observaciones").val(),
            'funcionario_id': $("#funcionario_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'pedidos_ids': JSON.stringify(pedidosSeleccionados.map(function(p){ return p.pedido_id; })),
            'pre_estado': estado,
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'operacion': $("#txtOperacion").val()
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
                $("#detalle").attr("style","display:block;");
                listarDetalles();
                if(resultado.registro.pre_estado!="PENDIENTE"){
                    location.reload(true);
                } else {
                    bloquearCabecera();
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}
// ─── HELPERS ─────────────────────────────────────────────────────────────────
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
}

// ─── VALIDACIONES EN TIEMPO REAL ─────────────────────────────────────────────
function validarFechaPre() {
    var val = $('#pre_fecha').val().trim();
    var aviso = $('#avisoFechaPre');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, 'DD/MM/YYYY HH:mm:ss', true);
    if (!m.isValid()) {
        $('#pre_fecha').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
    } else if (!m.clone().startOf('day').isSame(moment().startOf('day'))) {
        $('#pre_fecha').css('border-color','#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#pre_fecha').css('border-color',''); aviso.hide();
        validarVencePre();
    }
}

function validarVencePre() {
    var valFecha = $('#pre_fecha').val().trim();
    var valVence = $('#pre_vence').val().trim();
    var aviso = $('#avisoVencePre');
    if (!valVence) { aviso.hide(); return; }
    var mVence = moment(valVence, 'DD/MM/YYYY HH:mm:ss', true);
    if (!mVence.isValid()) {
        $('#pre_vence').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show(); return;
    }
    if (mVence.clone().startOf('day').isBefore(moment().startOf('day'))) {
        $('#pre_vence').css('border-color','#e74c3c');
        aviso.text('El plazo de entrega no puede ser una fecha pasada.').show(); return;
    }
    if (valFecha) {
        var mFecha = moment(valFecha, 'DD/MM/YYYY HH:mm:ss', true);
        if (mFecha.isValid() && mVence.isBefore(mFecha)) {
            $('#pre_vence').css('border-color','#e74c3c');
            aviso.text('El plazo debe ser igual o posterior a la fecha del presupuesto.').show(); return;
        }
    }
    $('#pre_vence').css('border-color',''); aviso.hide();
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart:1
    });
    $('#pre_fecha').on('change', function() { validarFechaPre(); });
    $('#pre_vence').on('change', function() { validarVencePre(); });
}

// ─── MARCA Y MODELO ──────────────────────────────────────────────────────────
var _marcaIdPre  = null;
var _modeloIdPre = null;
var _cacheMarcasPre  = {};
var _cacheModelosPre = {};

function cargarMarcasPresupuesto(itemId, marcaSelId) {
    _marcaIdPre  = marcaSelId || null;
    _modeloIdPre = null;
    $('#marca_det_pre').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_pre').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!itemId) return;
    var cb = function(data) {
        _cacheMarcasPre[itemId] = data;
        var opts = '<option value="">-- Marca --</option>';
        data.forEach(function(m) {
            var id = m.marca_id;
            opts += '<option value="'+id+'"'+(id==marcaSelId?' selected':'')+'>'+m.marc_nom+'</option>';
        });
        $('#marca_det_pre').html(opts).removeAttr('disabled');
        if (marcaSelId) { _marcaIdPre = marcaSelId; cargarModelosPresupuesto(itemId, marcaSelId, null); }
    };
    if (_cacheMarcasPre[itemId]) cb(_cacheMarcasPre[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/marcas', cb);
}

function cargarModelosPresupuesto(itemId, marcaId, modeloSelId) {
    _marcaIdPre  = marcaId;
    _modeloIdPre = modeloSelId || null;
    $('#modelo_det_pre').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!marcaId || !itemId) return;
    var cb = function(data) {
        _cacheModelosPre[itemId] = data;
        var filtrados = data.filter(function(m) { return String(m.marca_id) === String(marcaId); });
        if (!filtrados.length) return;
        var opts = '<option value="">-- Modelo --</option>';
        filtrados.forEach(function(m) {
            var id = m.modelo_id;
            opts += '<option value="'+id+'"'+(id==modeloSelId?' selected':'')+'>'+m.modelo_nom+(m.modelo_año?' ('+m.modelo_año+')':'')+  '</option>';
        });
        $('#modelo_det_pre').html(opts).removeAttr('disabled');
        if (modeloSelId) { $('#modelo_det_pre').val(modeloSelId); _modeloIdPre = modeloSelId; }
    };
    if (_cacheModelosPre[itemId]) cb(_cacheModelosPre[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/modelos', cb);
}

// ─── AGREGAR: depósitos según sucursales de los pedidos del presupuesto ──────
// AGREGAR: depósitos según sucursales de los pedidos del presupuesto
function cargarDepositosParaAgregar(selectedId) {
    var presupuestoId = $('#id').val();
    $.get(getUrl() + 'presupuestos/depositos-por-pedidos/' + presupuestoId)
    .done(function(rows) {
        var select = $('#deposito_id_det');

        if (!rows || rows.length === 0) {
            // Sin pedidos vinculados: lista con nombre de sucursal igual
            select.html(getSelectDeposito(selectedId)).removeAttr('disabled');
            return;
        }

        if (rows.length === 1) {
            var d = rows[0];
            select.html('<option value="' + d.id + '">' + d.dep_nombre + ' — ' + d.suc_razon_social + '</option>');
            select.val(d.id).attr('disabled', true);
        } else {
            var opts = '<option value="">-- Depósito --</option>';
            rows.forEach(function(d) {
                var sel = (d.id == selectedId) ? ' selected' : '';
                opts += '<option value="' + d.id + '"' + sel + '>' + d.dep_nombre + ' — ' + d.suc_razon_social + '</option>';
            });
            select.html(opts).removeAttr('disabled');
        }
    })
    .fail(function(xhr) {
        // Fallback: mostrar todos los depósitos con nombre de sucursal
        $('#deposito_id_det').html(getSelectDeposito(selectedId)).removeAttr('disabled');
    });
}

// EDITAR: depósitos de la misma sucursal del depósito actual
function cargarDepositosParaEditar(depositoActualId) {
    var select = $('#deposito_id_det');
    var dep = listaDepositos.find(function(d) { return d.id == depositoActualId; });

    if (!dep || !dep.sucursal_id) {
        // Sin info de sucursal: mantener el depósito actual habilitado
        select.html(getSelectDeposito(depositoActualId)).removeAttr('disabled');
        return;
    }

    $.get(getUrl() + 'deposito/read-by-sucursal/' + dep.sucursal_id, function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            var sel = (d.id == depositoActualId) ? ' selected' : '';
            opts += '<option value="' + d.id + '"' + sel + '>' + d.dep_nombre + '</option>';
        });
        select.html(opts).removeAttr('disabled');
    });
}

// Mantener alias por compatibilidad (usado en seleccionDetalle)
function cargarDepositosPresupuesto(selectedId) {
    cargarDepositosParaAgregar(selectedId);
}

// Prepara el formulario para agregar un nuevo detalle al presupuesto.
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#item_id").val("");
    $("#item_decripcion").val("").removeAttr("disabled");
    $("#det_cantidad").val("").removeAttr("disabled");
    $("#det_costo").val("").removeAttr("disabled");
    $("#cantidad_stock").val("");
    _marcaIdPre  = null;
    _modeloIdPre = null;
    $('#marca_det_pre').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_pre').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#marca_det_pre').off('change.pre').on('change.pre', function() {
        _marcaIdPre = $(this).val() || null;
        _modeloIdPre = null;
        cargarModelosPresupuesto($('#item_id').val(), _marcaIdPre, null);
    });
    $('#modelo_det_pre').off('change.pre').on('change.pre', function() { _modeloIdPre = $(this).val() || null; });
    cargarDepositosParaAgregar(null);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

// Prepara el formulario para editar un detalle existente del presupuesto
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#det_costo").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    // Habilitar marca y modelo
    var itemId = $('#item_id').val();
    cargarMarcasPresupuesto(itemId, _marcaIdPre);
    $('#marca_det_pre').off('change.pre').on('change.pre', function() {
        _marcaIdPre = $(this).val() || null;
        _modeloIdPre = null;
        cargarModelosPresupuesto(itemId, _marcaIdPre, null);
    });
    $('#modelo_det_pre').off('change.pre').on('change.pre', function() {
        _modeloIdPre = $(this).val() || null;
    });
    var currentDeposito = $("#deposito_id_det").val();
    cargarDepositosParaEditar(currentDeposito);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

// Prepara el formulario para eliminar un detalle del presupuesto.
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

function cancelarDetalle(){
    $("#txtOperacionDetalle").val(0);
    $("#item_id").val("");
    $("#item_decripcion").val("").attr("disabled", true);
    $("#det_cantidad").val("").attr("disabled", true);
    $("#det_costo").val("").attr("disabled", true);
    $("#cantidad_stock").val("");
    _marcaIdPre  = null;
    _modeloIdPre = null;
    $('#marca_det_pre').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_pre').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $("#deposito_id_det").html('<option value="">-- Depósito --</option>').attr("disabled", true);
    $("#listaProductos").html('').hide();
    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");
    $("#btnCancelarDetalle").attr("style","display:none");
}

// Realiza operaciones de creación, edición o eliminación de detalles del presupuesto.
function grabarDetalle(){
    var oper = parseInt($("#txtOperacionDetalle").val());
    var errores = [];

    if (oper !== 3) {
        if (!$('#item_id').val())                                  errores.push('Seleccione un ítem.');
        var cant = parseFloat($('#det_cantidad').val());
        if (isNaN(cant) || cant <= 0)                              errores.push('La cantidad debe ser mayor a cero.');
        var costoStr = $('#det_costo').val().replace(/\./g,'').replace(',','.');
        if (!costoStr || isNaN(parseFloat(costoStr)))              errores.push('El costo es obligatorio.');
        if (!$('#deposito_id_det').val())                          errores.push('Seleccione un depósito.');
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var costoRaw = $("#det_costo").val().replace(/\./g, '').replace(',', '.');

    var endpoint = "presupuestos-detalles/create";
    var metodo = "POST";

    if($("#txtOperacionDetalle").val()==2){
        endpoint = "presupuestos-detalles/update/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "presupuestos-detalles/delete/"+$("#id").val()+"/"+$("#item_id").val()
            + "?deposito_id_original=" + ($("#deposito_id_original").val() || '');
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "presupuesto_id":    $("#id").val(),
            "item_id":           $("#item_id").val(),
            "det_cantidad":      $("#det_cantidad").val(),
            "det_costo":         costoRaw,
            "deposito_id":       $("#deposito_id_det").val(),
            "deposito_id_original": $("#deposito_id_original").val() || null,
            "marca_id":          _marcaIdPre  ? parseInt(_marcaIdPre)  : null,
            "modelo_id":         _modeloIdPre ? parseInt(_modeloIdPre) : null
        }
    })
    .done(function(respuesta){
        listarDetalles();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });

    $("#item_decripcion").val("").attr("disabled", true);
    $("#det_cantidad").val("").attr("disabled", true);
    $("#det_costo").val("").attr("disabled", true);
    $("#cantidad_stock").val("");
    $("#deposito_id_det").html('<option value="">-- Depósito --</option>').attr("disabled", true);
    $("#item_id").val("");

    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");
    $("#txtOperacionDetalle").val(0);
}

// Realiza una búsqueda de productos y muestra los resultados.
function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data:{ "item_decripcion": $("#item_decripcion").val() }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_decripcion + "',"
                + (rs.item_costo || 0) + ","
                + (rs.cantidad_disponible || 0) + ")\">"
                + rs.item_decripcion
                + " <span class='badge' style='background:#3b82f6;color:#fff;'>Stock: " + (rs.cantidad_disponible || 0) + "</span>"
                + "</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo buscar productos.', 'error');
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion, item_costo, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#det_costo").val(formatearNumero(item_costo));
    $("#cantidad_stock").val('' + cantidad_disponible);
    _marcaIdPre  = null;
    _modeloIdPre = null;
    cargarMarcasPresupuesto(item_id, null);

    $("#listaProductos").html("").hide();
    $(".form-line").attr("class","form-line focused");
}
function formatearNumero(numero) {
    if (isNaN(numero)) return '0';
    return Number(numero).toLocaleString('es-PY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Obtiene y muestra la lista de detalles de un presupuesto mediante una solicitud AJAX.
function listarDetalles() {
    let cantidadDetalle = 0;
    let TotalGral = 0;

    const presupuestoId = $("#id").val();
    const estadoPresupuesto = $("#pre_estado").val();

    if (!presupuestoId) {
        alert("No se ha definido el ID del presupuesto.");
        return;
    }

    $.ajax({
        url: getUrl() + "presupuestos-detalles/read/" + presupuestoId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "";
        let TotalIva10 = 0;
        let TotalIva5  = 0;

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = rs.det_cantidad || 0;
                const costo = rs.det_costo || 0;
                const subtotal = cantidad * costo;
                const imp = (rs.tip_imp_nom || '').toUpperCase();
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

                lista += "<tr class='item-list' onclick=\"seleccionDetalle("
                    + rs.item_id + ",'"
                    + rs.item_decripcion + "',"
                    + cantidad + ","
                    + costo + ","
                    + (rs.deposito_id||0) + ","
                    + rs.cantidad_disponible + ","
                    + (rs.marca_id||0) + ","
                    + (rs.modelo_id||0) + ")\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td>" + (rs.marc_nom || '—') + "</td>";
                lista += "<td>" + (rs.modelo_nom || '—') + "</td>";
                lista += "<td>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td>" + (rs.tip_imp_nom || '—') + "</td>";
                lista += "<td>" + getNombreDeposito(rs.deposito_id) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
            }
        } else {
            lista = "<tr><td colspan='9' class='text-center'>No se encontraron detalles</td></tr>";
        }

        $("#tableDetalle").html(lista);
        $("#txtIva10").text(formatearNumero(TotalIva10));
        $("#txtIva5").text(formatearNumero(TotalIva5));
        $("#txtTotalIva").text(formatearNumero(TotalIva10 + TotalIva5));
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        
        if (estadoPresupuesto === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").prop("disabled", false);
        } else {
            $("#btnConfirmar").prop("disabled", true);
        }
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar los detalles.', 'error');
    });
}
// Rellena el formulario con los datos de un detalle seleccionado.
function seleccionDetalle(item_id, item_decripcion, det_cantidad, det_costo, deposito_id, cantidad_disponible, marca_id, modelo_id){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#det_costo").val(formatearNumero(det_costo));
    $("#cantidad_stock").val('' + cantidad_disponible);
    $("#deposito_id_original").val(deposito_id || '');
    $("#deposito_id_det").html(getSelectDeposito(deposito_id)).attr("disabled", true);
    $("#txtOperacionDetalle").val(0);
    // Autocompletar marca y modelo
    _marcaIdPre  = marca_id  || null;
    _modeloIdPre = modelo_id || null;
    if (marca_id) {
        cargarMarcasPresupuesto(item_id, marca_id);
        if (modelo_id) {
            setTimeout(function() { cargarModelosPresupuesto(item_id, marca_id, modelo_id); }, 350);
        }
    } else {
        $('#marca_det_pre').html('<option value="">-- Marca --</option>').prop('disabled', true);
        $('#modelo_det_pre').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    }
}

// Realiza una búsqueda de proveedores y muestra los resultados.
function buscarProveedores(){
    $.ajax({
        url: getUrl()+"proveedores/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "prov_razonsocial":$("#prov_razonsocial").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedor("+rs.proveedor_id+",'"+rs.prov_razonsocial+"','"+rs.prov_ruc+"','"+rs.prov_telefono+"','"+rs.prov_correo+"')\">"+rs.prov_razonsocial+" - "+rs.prov_ruc+"</li>";   
        }
        lista += "</ul>";
        $("#listaProveedores").html(lista);
        $("#listaProveedores").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo buscar proveedores.', 'error');
    });
}

// Rellena el formulario con los datos de un proveedor seleccionado.
function seleccionProveedor(proveedor_id,prov_razonsocial,prov_ruc,prov_telefono,prov_correo){
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    $("#listaProveedores").html("");
    $("#listaProveedores").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

// Realiza una búsqueda de pedidos y muestra los resultados.
function buscarPedidos(){
    $.ajax({
        url: getUrl()+"pedidos/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "numero":$("#pedido").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPedido("+rs.pedido_id+","+rs.empresa_id+","+rs.sucursal_id+",'"+rs.emp_razon_social+"','"+rs.suc_razon_social+"','"+rs.ped_vence+"','"+rs.pedido+"')\">"+rs.pedido+"</li>";   
        }
        lista += "</ul>";
        $("#listaPedidos").html(lista);
        $("#listaPedidos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo buscar pedidos.', 'error');
    });
}

// Agrega el pedido seleccionado al array y actualiza la tabla.
function seleccionPedido(pedido_id, empresa_id, sucursal_id, emp_razon_social, suc_razon_social, ped_vence, pedido) {
    if (pedidosSeleccionados.find(function(p){ return p.pedido_id === pedido_id; })) {
        swal("Aviso", "Este pedido ya fue agregado.", "warning");
        $("#listaPedidos").hide().html("");
        return;
    }

    pedidosSeleccionados.push({ pedido_id: pedido_id, empresa_id: empresa_id, sucursal_id: sucursal_id, emp_razon_social: emp_razon_social, suc_razon_social: suc_razon_social, ped_vence: ped_vence, pedido: pedido });

    if (pedidosSeleccionados.length === 1) {
        $("#empresa_id").val(empresa_id);
        $("#emp_razon_social").val(emp_razon_social);
    }

    $("#pedido").val("");
    $("#listaPedidos").hide().html("");
    renderizarPedidosSeleccionados();
}

function renderizarPedidosSeleccionados() {
    if (pedidosSeleccionados.length === 0) {
        $("#bodyPedidosSeleccionados").html('<tr><td colspan="5" class="text-center text-muted">Sin pedidos seleccionados</td></tr>');
        return;
    }
    var html = "";
    pedidosSeleccionados.forEach(function(p, i) {
        html += "<tr>"
            + "<td>" + p.pedido_id + "</td>"
            + "<td>" + p.pedido + "</td>"
            + "<td>" + p.emp_razon_social + "</td>"
            + "<td>" + p.suc_razon_social + "</td>"
            + "<td><button type='button' class='btn btn-xs btn-danger' onclick='removerPedido(" + i + ")'>"
            + "<i class='material-icons' style='font-size:14px;line-height:1;'>close</i></button></td>"
            + "</tr>";
    });
    $("#bodyPedidosSeleccionados").html(html);
}

function removerPedido(index) {
    pedidosSeleccionados.splice(index, 1);
    renderizarPedidosSeleccionados();
}

function buscarEmpresas() {
    $.ajax({
        url: getUrl() + "empresa/read",
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
    .fail(function(xhr,b,c) {
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar las empresas.', 'error');
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
        url: getUrl() + "sucursal/read",
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
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar las sucursales.', 'error');
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
        } else {
            window.location.href = '/taller_front/index.html';
        }
    } catch (error) {
        window.location.href = '/taller_front/index.html';
    }
}
