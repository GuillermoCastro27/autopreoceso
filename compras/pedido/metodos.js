function getToken() {
    var s = JSON.parse(localStorage.getItem('datosSesion'));
    return s ? s.token : '';
}

// Ocultar botones según permisos del usuario
$(document).ready(function() {
    aplicarPermisosUI([
        { selector: '#btnAgregar',  permiso: 'compras.pedidos.crear'     },
        { selector: '#btnEditar',   permiso: 'compras.pedidos.modificar' },
        { selector: '#btnEliminar', permiso: 'compras.pedidos.anular'    },
        { selector: '#btnConfirmar',permiso: 'compras.pedidos.confirmar' },
    ]);
});

// Cargar funcionario_id del usuario logueado
cargarFuncionarioIdLogueado();
listar();
campoFecha();

var listaDepositos = [];
function cargarDepositos() {
    $.ajax({ url: getUrl()+'deposito/read', method:'GET', dataType:'json', success:function(data){ listaDepositos=data; } });
}
cargarDepositos();
// ─── ESTADO MARCA Y MODELO ───────────────────────────────────────────────────
var _marcaIdSel    = null;
var _modeloIdSel   = null;
var _ajaxMarcas    = null;
var _ajaxModelos   = null;
var _cacheMarcas   = {};   // { item_id: [{ marca_id, mar_nom }] }
var _cacheModelos  = {};   // { item_id: [{ modelo_id, modelo_nom, marca_id, modelo_año }] }

// Crear selects de marca/modelo en el DOM si no existen (HTML viejo)
$(function() {
    if (!$('#marca_det').length) {
        var $panel = $('<div id="panelMarcaModelo" style="margin-top:6px;padding:4px 0;">'
            + '<select class="form-control" id="marca_det" style="display:inline-block;width:45%;margin-right:4%;" disabled>'
            + '<option value="">-- Marca --</option></select>'
            + '<select class="form-control" id="modelo_det" style="display:inline-block;width:50%;" disabled>'
            + '<option value="">-- Modelo --</option></select>'
            + '</div>');
        // Insertar antes de los botones del detalle
        $('#btnAgregarDetalle').closest('div').before($panel);
    }
    // Bindear eventos (siempre, por si el HTML nuevo los tiene sin bind)
    $(document).off('change', '#marca_det').on('change', '#marca_det', function() {
        _marcaIdSel  = $(this).val() || null;
        _modeloIdSel = null;
        $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
        if (!_marcaIdSel) return;
        var itemId = $('#item_id').val();
        if (!itemId) return;
        $.get(getUrl() + 'items/' + itemId + '/modelos', function(data) {
            var filtrados = data.filter(function(m) { return String(m.marca_id) === String(_marcaIdSel); });
            if (!filtrados.length) return;
            var opts = '<option value="">-- Modelo --</option>';
            filtrados.forEach(function(m) {
                var id = m.modelo_id || m.id;
                opts += '<option value="' + id + '">' + m.modelo_nom
                    + (m.modelo_año ? ' (' + m.modelo_año + ')' : '') + '</option>';
            });
            $('#modelo_det').html(opts).removeAttr('disabled');
        });
    });
    $(document).off('change', '#modelo_det').on('change', '#modelo_det', function() {
        _modeloIdSel = $(this).val() || null;
    });
});

// ─── MARCA Y MODELO ──────────────────────────────────────────────────────────
function cargarMarcasPedido(itemId, marcaSelId) {
    _marcaIdSel  = null;
    _modeloIdSel = null;
    var select = $('#marca_det');
    if (select.length) { select.html('<option value="">-- Marca --</option>').prop('disabled', true); }
    var selMod = $('#modelo_det');
    if (selMod.length) { selMod.html('<option value="">-- Modelo --</option>').prop('disabled', true); }
    if (!itemId) return;

    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    // Si ya está en caché, usar directamente
    if (_cacheMarcas[itemId]) {
        var data = _cacheMarcas[itemId];
        _poblarMarcaSelect(data, marcaSelId, select, itemId);
        return;
    }

    _ajaxMarcas = $.get(getUrl() + 'items/' + itemId + '/marcas', function(data) {
        _ajaxMarcas = null;
        _cacheMarcas[itemId] = data;
        if (!data.length) return;
        _poblarMarcaSelect(data, marcaSelId, select, itemId);
    });
}

function _poblarMarcaSelect(data, marcaSelId, select, itemId) {
        var opts = '<option value="">-- Marca --</option>';
        data.forEach(function(m) {
            var id  = m.marca_id || m.id;
            var sel = (id == marcaSelId) ? ' selected' : '';
            opts += '<option value="' + id + '"' + sel + '>' + m.mar_nom + '</option>';
        });
        if (select.length) {
            select.html(opts).removeAttr('disabled');
            if (marcaSelId) {
                _marcaIdSel = marcaSelId;
                cargarModelosPedido(itemId, marcaSelId, null);
            }
        }
}

function cargarModelosPedido(itemId, marcaId, modeloSelId) {
    // Puede llamarse desde onchange del select (sin args) o programáticamente
    if (!itemId) itemId  = $('#item_id').val();
    if (!marcaId) {
        var selMarca = $('#marca_det');
        marcaId = selMarca.length ? selMarca.val() : null;
    }
    _marcaIdSel  = marcaId;
    _modeloIdSel = modeloSelId || null;

    var select = $('#modelo_det');
    if (select.length) { select.html('<option value="">-- Modelo --</option>').prop('disabled', true); }
    if (!marcaId || !itemId) return;

    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    // Usar caché si existe
    if (_cacheModelos[itemId]) {
        _poblarModeloSelect(_cacheModelos[itemId], marcaId, modeloSelId, select);
        return;
    }

    _ajaxModelos = $.get(getUrl() + 'items/' + itemId + '/modelos', function(data) {
        _ajaxModelos = null;
        _cacheModelos[itemId] = data;
        // getModelos retorna {modelo_id, modelo_nom, modelo_año, marca_id}
        var filtrados = data.filter(function(m) { return String(m.marca_id) === String(marcaId); });
        if (!filtrados.length) return;
        var opts = '<option value="">-- Modelo --</option>';
        filtrados.forEach(function(m) {
            var id    = m.modelo_id || m.id;
            var label = m.modelo_nom + (m.modelo_año ? ' ('+m.modelo_año+')' : '');
            var sel   = (id == modeloSelId) ? ' selected' : '';
            opts += '<option value="' + id + '"' + sel + '>' + label + '</option>';
        });
        _poblarModeloSelect(data, marcaId, modeloSelId, select);
    });
}

function _poblarModeloSelect(data, marcaId, modeloSelId, select) {
        var filtrados = data.filter(function(m) { return String(m.marca_id) === String(marcaId); });
        if (!filtrados.length) return;
        var opts = '<option value="">-- Modelo --</option>';
        filtrados.forEach(function(m) {
            var id    = m.modelo_id || m.id;
            var label = m.modelo_nom + (m.modelo_año ? ' ('+m.modelo_año+')' : '');
            var sel   = (id == modeloSelId) ? ' selected' : '';
            opts += '<option value="' + id + '"' + sel + '>' + label + '</option>';
        });
        if (select.length) {
            select.html(opts).removeAttr('disabled');
            if (modeloSelId) { select.val(modeloSelId); _modeloIdSel = modeloSelId; }
        }
}

// Carga depósitos filtrados por la sucursal de la cabecera del pedido
function cargarDepositosPedido(selectedId) {
    var sucId = $('#sucursal_id').val();
    var select = $('#deposito_id_det');
    if (!sucId) {
        select.html('<option value="">-- Depósito --</option>');
        return;
    }
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucId, function(data) {
        var opts = '<option value="">-- Depósito --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selectedId ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        select.html(opts);
    });
}

function getNombreDeposito(id) {
    var d = listaDepositos.find(function(x){ return x.id==id; });
    return d ? d.dep_nombre : '-';
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
    $("#ped_vence").removeAttr("disabled");
    $("#ped_fecha").removeAttr("disabled");
    $("#ped_pbservaciones").removeAttr("disabled");
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
    $("#ped_vence").removeAttr("disabled");
    $("#ped_fecha").removeAttr("disabled");
    $("#ped_pbservaciones").removeAttr("disabled");
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
        url: getUrl() + "pedidos/read",
        method: "GET",
        dataType: "json",
        headers: {
            Authorization: "Bearer " + getToken()
        }
    })
    .done(function(resultado){
        var lista = "";
        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionPedido("
                + rs.id + ", " 
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", '"
                + rs.emp_razon_social + "', '"
                + rs.suc_razon_social + "', '"
                + rs.ped_fecha + "', '"
                + rs.ped_vence + "', '"
                + rs.ped_pbservaciones + "', '"
                + rs.ped_estado + "', '"
                + rs.name + "');\">";
            
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.emp_razon_social + "</td>";
            lista += "<td>" + rs.suc_razon_social + "</td>";
            lista += "<td>" + rs.ped_fecha + "</td>";
            lista += "<td>" + rs.ped_vence + "</td>";
            lista += "<td>" + rs.ped_pbservaciones + "</td>";
            lista += "<td>" + (rs.funcionario || rs.name || rs.encargado || '-') + "</td>";
            lista += "<td>" + rs.ped_estado + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}
function imprimirPedido() {
    var id = $('#id').val();
    if (!id || id == '0') return;
    window.open('imprimir.html?id=' + id, '_blank');
}

function _imprimirPedidoLegacy_unused() {
    var id         = $('#id').val();
    var empresa    = $('#emp_razon_social').val();
    var sucursal   = $('#suc_razon_social').val();
    var fecha      = $('#ped_fecha').val();
    var vence      = $('#ped_vence').val();
    var obs        = $('#ped_pbservaciones').val();

    $.ajax({ url: getUrl() + 'pedidos-detalles/read/' + id, method: 'GET', dataType: 'json',
             headers: { Authorization: 'Bearer ' + getToken() } })
    .done(function(detalles) {
        var filas = '';
        detalles.forEach(function(d, i) {
            filas += '<tr>'
                + '<td style="text-align:center;">' + (i+1) + '</td>'
                + '<td>' + d.item_descripcion + '</td>'
                + '<td style="text-align:center;">' + d.det_cantidad + '</td>'
                + '<td style="text-align:center;">' + (d.cantidad_stock || 0) + '</td>'
                + '<td style="text-align:center;">' + (d.dep_nombre || '-') + '</td>'
                + '</tr>';
        });

        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
            + '<title>Pedido de Compra #' + id + '</title>'
            + '<style>body{font-family:Arial,sans-serif;font-size:12px;margin:20px;color:#333}'
            + 'h1{font-size:18px;text-align:center;margin:0}h2{font-size:13px;text-align:center;color:#555;margin:4px 0 16px}'
            + '.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}'
            + '.campo label{font-weight:bold;font-size:10px;text-transform:uppercase;color:#888;display:block}'
            + 'table{width:100%;border-collapse:collapse;margin-top:12px}'
            + 'th{background:#2c3e50;color:#fff;padding:7px;text-align:left;font-size:11px}'
            + 'td{padding:6px;border-bottom:1px solid #eee}'
            + 'tr:nth-child(even) td{background:#f9f9f9}'
            + '.footer{margin-top:30px;text-align:center;font-size:10px;color:#aaa}'
            + '@media print{button{display:none}}</style></head><body>'
            + '<h1>PEDIDO DE COMPRA</h1>'
            + '<h2>' + empresa + ' — ' + sucursal + '</h2>'
            + '<div style="text-align:center;margin-bottom:12px;"><strong>N° ' + String(id).padStart(7,'0') + '</strong>'
            + ' &nbsp; <span style="background:#27ae60;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;">CONFIRMADO</span></div>'
            + '<div class="grid">'
            + '<div class="campo"><label>Fecha</label><span>' + fecha + '</span></div>'
            + '<div class="campo"><label>Plazo de Entrega</label><span>' + vence + '</span></div>'
            + '<div class="campo"><label>Observaciones</label><span>' + (obs||'—') + '</span></div>'
            + '</div>'
            + '<table><thead><tr><th>#</th><th>Producto</th><th>Cantidad</th><th>Stock Disp.</th><th>Depósito</th></tr></thead>'
            + '<tbody>' + filas + '</tbody></table>'
            + '<div class="footer">Impreso el ' + new Date().toLocaleString('es-PY') + '</div>'
            + '<script>window.onload=function(){window.print();window.onafterprint=function(){window.close();}};<\/script>'
            + '</body></html>';

        var w = window.open('', '_blank', 'width=800,height=600');
        w.document.write(html);
        w.document.close();
    });
}

function seleccionPedido(id_pedido,empresa_id, sucursal_id,emp_razon_social,suc_razon_social, ped_fecha, ped_vence, ped_pbservaciones, ped_estado){
    $("#id").val(id_pedido);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#ped_fecha").val(ped_fecha);
    $("#ped_vence").val(ped_vence);
    $("#ped_pbservaciones").val(ped_pbservaciones);
    $("#ped_estado").val(ped_estado);

    
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

    if (ped_estado === "PENDIENTE") {
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style", "display:block;");
    } else if (ped_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
        $('#btnImprimir').show().removeAttr('disabled');
    } else if (ped_estado === "PROCESADO") {
        $('#btnImprimir').show().removeAttr('disabled');
    } else if (ped_estado === "ANULADO") {
        // Todos los botones permanecen deshabilitados
    }

    $(".form-line").attr("class","form-line focused");
}
function grabar(){
    var errores = [];

    // Fecha del pedido (debe ser hoy)
    var fechaVal = $('#ped_fecha').val().trim();
    if (!fechaVal) {
        errores.push('La fecha del pedido es obligatoria.');
    } else {
        var mFecha = moment(fechaVal, 'DD/MM/YYYY HH:mm:ss', true);
        if (!mFecha.isValid()) errores.push('El formato de la fecha es inválido.');
        else if (!mFecha.clone().startOf('day').isSame(moment().startOf('day')))
            errores.push('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').');
    }

    // Plazo de entrega (debe ser hoy o futuro, y >= fecha pedido)
    var venceVal = $('#ped_vence').val().trim();
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
                errores.push('El plazo de entrega debe ser igual o posterior a la fecha del pedido.');
        }
    }

    if (!$('#sucursal_id').val()) errores.push('Seleccione la sucursal.');

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = "pedidos/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "pedidos/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "pedidos/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pedidos/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        headers: { Authorization: "Bearer " + getToken() },
        data: {
            'id': $("#id").val(),
            'ped_fecha': $("#ped_fecha").val(), 
            'ped_vence': $("#ped_vence").val(), 
            'ped_pbservaciones': $("#ped_pbservaciones").val(), 
            'funcionario_id': $("#funcionario_id").val(), 
            'ped_estado': estado,
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
                $("#detalle").show();
                $("#formDetalles").show();
                mostrarBotonesDetalle('normal');
                if(resultado.registro.ped_estado!="PENDIENTE" || $("#txtOperacion").val()==2){
                    location.reload(true);
                } else {
                    // Cabecera grabada y pendiente: bloquear campos, habilitar Modificar/Anular
                    $('#ped_fecha, #ped_vence, #ped_pbservaciones, #suc_razon_social').attr('disabled', 'true');
                    $('#btnGrabar, #btnAgregar').attr('disabled', 'true');
                    $('#btnCancelar').removeAttr('disabled');
                    $('#btnEditar, #btnEliminar').removeAttr('disabled');
                }
            }
        });
    })
    .fail(function(xhr) { mostrarErrores(xhr); })
}

// ─── HELPERS GENERALES ───────────────────────────────────────────────────────
var _timers = {};
function debounce(key, fn) { clearTimeout(_timers[key]); _timers[key] = setTimeout(fn, 300); }

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

// ─── VALIDACIONES EN TIEMPO REAL ─────────────────────────────────────────────
function validarFechaPed() {
    var val = $('#ped_fecha').val().trim();
    var aviso = $('#avisoFechaPed');
    if (!val) { aviso.hide(); return; }
    var m = moment(val, 'DD/MM/YYYY HH:mm:ss', true);
    if (!m.isValid()) {
        $('#ped_fecha').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show();
    } else if (!m.clone().startOf('day').isSame(moment().startOf('day'))) {
        $('#ped_fecha').css('border-color','#e74c3c');
        aviso.text('La fecha debe ser la de hoy (' + moment().format('DD/MM/YYYY') + ').').show();
    } else {
        $('#ped_fecha').css('border-color',''); aviso.hide();
        // Al validar fecha, re-validar plazo
        validarVencePed();
    }
}

function validarVencePed() {
    var valFecha = $('#ped_fecha').val().trim();
    var valVence = $('#ped_vence').val().trim();
    var aviso = $('#avisoVencePed');
    if (!valVence) { aviso.hide(); return; }
    var mVence = moment(valVence, 'DD/MM/YYYY HH:mm:ss', true);
    if (!mVence.isValid()) {
        $('#ped_vence').css('border-color','#e74c3c');
        aviso.text('Formato de fecha inválido.').show(); return;
    }
    var hoy = moment().startOf('day');
    if (mVence.clone().startOf('day').isBefore(hoy)) {
        $('#ped_vence').css('border-color','#e74c3c');
        aviso.text('El plazo de entrega no puede ser una fecha pasada.').show(); return;
    }
    if (valFecha) {
        var mFecha = moment(valFecha, 'DD/MM/YYYY HH:mm:ss', true);
        if (mFecha.isValid() && mVence.isBefore(mFecha)) {
            $('#ped_vence').css('border-color','#e74c3c');
            aviso.text('El plazo de entrega debe ser igual o posterior a la fecha del pedido.').show(); return;
        }
    }
    $('#ped_vence').css('border-color',''); aviso.hide();
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
    $('#ped_fecha').on('change', function() { validarFechaPed(); });
    $('#ped_vence').on('change', function() { validarVencePed(); });
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

function cancelarDetalle() {
    // Abortar cualquier carga pendiente de marcas/modelos
    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    $('#txtOperacionDetalle').val(0);
    $('#item_id').val('');
    $('#item_descripcion').val('').prop('disabled', true);
    $('#det_cantidad').val('').prop('disabled', true);
    $('#cantidad_stock').val('');
    // Resetear marca y modelo (variables + TODOS los elementos del DOM)
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $('[id="marca_det"]').each(function()  { $(this).val('').prop('disabled', true).find('option:first').prop('selected',true); $(this).html('<option value="">-- Marca --</option>').prop('disabled', true); });
    $('[id="modelo_det"]').each(function() { $(this).html('<option value="">-- Modelo --</option>').prop('disabled', true); });
    $('[id="marca_id_det"]').val('');
    $('[id="modelo_id_det"]').val('');
    $('[id="deposito_id_det"]').html('<option value="">-- Depósito --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();
    mostrarBotonesDetalle('normal');
}

function agregarDetalle() {
    cancelarDetalle();
    $('#txtOperacionDetalle').val(1);
    $('#item_descripcion').removeAttr('disabled');
    $('#det_cantidad').removeAttr('disabled');
    cargarDepositosPedido(null);
    $('#deposito_id_det').removeAttr('disabled');
    mostrarBotonesDetalle('grabar');
}

function editarDetalle() {
    $('#txtOperacionDetalle').val(2);
    $('#item_descripcion').removeAttr('disabled');
    $('#det_cantidad').removeAttr('disabled');

    // Habilitar depósito con los valores ya cargados por seleccionDetalle
    var currentDeposito = $('#deposito_id_det').val();
    cargarDepositosPedido(currentDeposito);
    $('#deposito_id_det').removeAttr('disabled');

    // Habilitar marca y modelo sin resetear — ya tienen los valores de seleccionDetalle
    var marcaActual  = _marcaIdSel;
    var modeloActual = _modeloIdSel;
    var itemId = $('#item_id').val();

    if (itemId && marcaActual) {
        // Recarga manteniendo la selección actual
        $.get(getUrl() + 'items/' + itemId + '/marcas', function(data) {
            var opts = '<option value="">-- Marca --</option>';
            data.forEach(function(m) {
                opts += '<option value="'+m.id+'"'+(m.id==marcaActual?' selected':'')+'>'+m.mar_nom+'</option>';
            });
            $('#marca_det').html(opts).removeAttr('disabled');
            // Cargar modelos de la marca actual
            if (modeloActual) {
                $.get(getUrl() + 'items/' + itemId + '/modelos', function(mods) {
                    var mopts = '<option value="">-- Modelo --</option>';
                    mods.filter(function(m){ return String(m.marca_id)===String(marcaActual); })
                        .forEach(function(m) {
                            var label = m.modelo_nom + (m.modelo_año ? ' ('+m.modelo_año+')' : '');
                            mopts += '<option value="'+m.id+'"'+(m.id==modeloActual?' selected':'')+'>'+label+'</option>';
                        });
                    $('#modelo_det').html(mopts).removeAttr('disabled').on('change', function() {
                        $('#modelo_id_det').val($(this).val());
                    });
                });
            }
        });
    } else if (itemId) {
        // Sin marca asignada — cargar opciones para que el usuario elija
        cargarMarcasPedido(itemId);
        $('#marca_det').removeAttr('disabled');
    }

    mostrarBotonesDetalle('grabar');
}

function eliminarDetalle() {
    $('#txtOperacionDetalle').val(3);
    mostrarBotonesDetalle('grabar');
}

function grabarDetalle() {
    var oper = parseInt($('#txtOperacionDetalle').val());
    console.log('Grabar detalle — marca:', _marcaIdSel, 'modelo:', _modeloIdSel);
    var errores = [];

    if (oper !== 3) {
        if (!$('#item_id').val())           errores.push('Seleccione un ítem.');
        var cant = parseFloat($('#det_cantidad').val());
        if (isNaN(cant) || cant <= 0)       errores.push('La cantidad debe ser mayor a cero.');
        if (!$('#deposito_id_det').val())   errores.push('Seleccione un depósito.');
    }

    if (errores.length > 0) {
        swal({ title: 'Datos incompletos', text: errores.map(function(e){ return '• '+e; }).join('\n'), type: 'warning' });
        return;
    }

    var endpoint = 'pedidos-detalles/create';
    var metodo   = 'POST';
    if (oper === 2) { endpoint = 'pedidos-detalles/update/' + $('#id').val(); metodo = 'PUT'; }
    if (oper === 3) { endpoint = 'pedidos-detalles/delete/' + $('#id').val() + '/' + $('#item_id').val(); metodo = 'DELETE'; }

    $.ajax({
        url: getUrl() + endpoint, method: metodo, dataType: 'json',
        headers: { Authorization: 'Bearer ' + getToken() },
        data: {
            'pedidos_id':    $('#id').val(),
            'item_id':       $('#item_id').val(),
            'det_cantidad':  $('#det_cantidad').val(),
            'cantidad_stock':$('#cantidad_stock').val(),
            'deposito_id':   $('#deposito_id_det').val() || null,
            'marca_id':      _marcaIdSel  ? parseInt(_marcaIdSel)  : null,
            'modelo_id':     _modeloIdSel ? parseInt(_modeloIdSel) : null
        }
    })
    .done(function() {
        listarDetalles();
        cancelarDetalle();
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function buscarProductos() {
    var q = $('#item_descripcion').val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }
    debounce('prod', function() {
        var depId = $('#deposito_id_det').val();
        $.ajax({
            url: getUrl() + 'items/buscar', method: 'POST', dataType: 'json',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: { item_descripcion: q, deposito_id: depId || null }
        })
        .done(function(resultado) {
            var lista = '<ul class="list-group">';
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += '<li class="list-group-item" onclick="seleccionProducto(' + rs.item_id + ",'" + rs.item_descripcion + "'," + stock + ')">'
                    + rs.item_descripcion
                    + ' <span class="badge" style="background:#3b82f6;color:#fff;">Stock: ' + stock + '</span>'
                    + '</li>';
            });
            lista += '</ul>';
            $('#listaProductos').html(lista).attr('style', 'display:block; position:absolute; z-index:2000;');
        })
        .fail(function(xhr) { console.error(xhr.responseText); });
    });
}
function seleccionProducto(item_id, item_descripcion, cantidad_disponible){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#cantidad_stock").val(cantidad_disponible);
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $("#listaProductos").html("").hide();
    $(".form-line").addClass("focused");
    cargarMarcasPedido(item_id, null);
}

function _esc(s) {
    return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"pedidos-detalles/read/"+$("#id").val(),
        method:"GET",
        dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
    })
    .done(function(resultado){
        var lista = "";
        for(var rs of resultado){
            var modeloNomFull = rs.modelo_nom
                ? rs.modelo_nom + (rs.modelo_año ? ' (' + rs.modelo_año + ')' : '')
                : '';
            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle("
                + rs.item_id + ",'"
                + _esc(rs.item_descripcion) + "',"
                + rs.det_cantidad + ","
                + rs.cantidad_stock + ","
                + (rs.deposito_id||0) + ","
                + (rs.marca_id||0) + ","
                + (rs.modelo_id||0) + ",'"
                + _esc(rs.dep_nombre||'') + "','"
                + _esc(rs.mar_nom||'') + "','"
                + _esc(modeloNomFull) + "')\">";
            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + rs.item_descripcion + "</td>";
            lista += "<td>" + (rs.mar_nom || '—') + "</td>";
            lista += "<td>" + (modeloNomFull || '—') + "</td>";
            lista += "<td>" + rs.det_cantidad + "</td>";
            lista += "<td>" + rs.cantidad_stock + "</td>";
            lista += "<td>" + (rs.dep_nombre || '—') + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ped_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}
function seleccionDetalle(item_id, item_descripcion, det_cantidad, cantidad_stock, deposito_id, marca_id, modelo_id, dep_nombre, mar_nom, modelo_nom_full) {
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#cantidad_stock").val(cantidad_stock);
    _marcaIdSel  = marca_id  || null;
    _modeloIdSel = modelo_id || null;

    // Depósito: poblar directamente con el valor ya conocido (sin AJAX)
    var $dep = $('#deposito_id_det');
    if (deposito_id && dep_nombre) {
        $dep.html('<option value="' + deposito_id + '" selected>' + dep_nombre + '</option>');
    } else {
        $dep.html('<option value="">-- Depósito --</option>');
    }
    $dep.prop('disabled', true);

    // Marca: poblar directamente
    var $marca = $('#marca_det');
    if (marca_id && mar_nom) {
        $marca.html('<option value="' + marca_id + '" selected>' + mar_nom + '</option>');
    } else {
        $marca.html('<option value="">-- Marca --</option>');
    }
    $marca.prop('disabled', true);

    // Modelo: poblar directamente
    var $modelo = $('#modelo_det');
    if (modelo_id && modelo_nom_full) {
        $modelo.html('<option value="' + modelo_id + '" selected>' + modelo_nom_full + '</option>');
    } else {
        $modelo.html('<option value="">-- Modelo --</option>');
    }
    $modelo.prop('disabled', true);

    $(".form-line").addClass("focused");
}

function buscarEmpresas() {
    $.ajax({
        url:getUrl() + "empresa/read",
        method:"GET",
        dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
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
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
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
        dataType: "json",
        headers: { Authorization: "Bearer " + getToken() }
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

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    try {
        const datosSesion = JSON.parse(localStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
            $('#funcionario_id').val(datosSesion.user.funcionario_id);
            console.log('User ID cargado exitosamente:', datosSesion.user.funcionario_id);
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
