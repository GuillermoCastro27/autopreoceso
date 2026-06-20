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

// ─── ESTADO MARCA Y MODELO ───────────────────────────────────────────────────
var _marcaIdSel   = null;
var _modeloIdSel  = null;
var _ajaxMarcas   = null;
var _ajaxModelos  = null;
var _cacheMarcas  = {};
var _cacheModelos = {};

$(function() {
    $(document).off('change', '#marca_det').on('change', '#marca_det', function() {
        _marcaIdSel  = $(this).val() || null;
        _modeloIdSel = null;
        $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
        if (!_marcaIdSel) return;
        var itemId = $('#item_id').val();
        if (!itemId) return;
        var data = _cacheModelos[itemId];
        if (data) {
            _poblarModeloSelect(data, _marcaIdSel, null, $('#modelo_det'));
        } else {
            $.get(getUrl() + 'items/' + itemId + '/modelos', function(d) {
                _cacheModelos[itemId] = d;
                _poblarModeloSelect(d, _marcaIdSel, null, $('#modelo_det'));
            });
        }
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
    select.html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!itemId) return;

    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    if (_cacheMarcas[itemId]) {
        _poblarMarcaSelect(_cacheMarcas[itemId], marcaSelId, select, itemId);
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
    select.html(opts).prop('disabled', false);
    if (marcaSelId) {
        _marcaIdSel = marcaSelId;
        var modData = _cacheModelos[itemId];
        if (modData) {
            _poblarModeloSelect(modData, marcaSelId, null, $('#modelo_det'));
        } else {
            $.get(getUrl() + 'items/' + itemId + '/modelos', function(d) {
                _cacheModelos[itemId] = d;
                _poblarModeloSelect(d, marcaSelId, null, $('#modelo_det'));
            });
        }
    }
}

function _poblarModeloSelect(data, marcaId, modeloSelId, select) {
    // Los modelos ya están filtrados por item en el backend (item_modelo).
    // No se filtra por marca_id porque item_marca e item_modelo son relaciones independientes.
    var opts = '<option value="">-- Modelo --</option>';
    data.forEach(function(m) {
        var id    = m.modelo_id || m.id;
        var label = m.modelo_nom + (m.modelo_año ? ' (' + m.modelo_año + ')' : '');
        var sel   = (id == modeloSelId) ? ' selected' : '';
        opts += '<option value="' + id + '"' + sel + '>' + label + '</option>';
    });
    select.html(opts).prop('disabled', false);
    if (modeloSelId) { select.val(modeloSelId); _modeloIdSel = modeloSelId; }
}

// Carga depósitos filtrados por la sucursal de la cabecera del pedido
function cargarDepositosPedido(selectedId) {
    var sucId = $('#sucursal_id').val();
    var select = $('#deposito_id_det');
    if (!sucId) {
        select.html('<option value="">-- Depósito (seleccione primero) --</option>');
        return;
    }
    $.get(getUrl() + 'deposito/read-by-sucursal/' + sucId, function(data) {
        var opts = '<option value="">-- Depósito (seleccione primero) --</option>';
        data.forEach(function(d) {
            opts += '<option value="' + d.id + '"' + (d.id == selectedId ? ' selected' : '') + '>' + d.dep_nombre + '</option>';
        });
        select.html(opts);
        // Si hay selectedId, habilitar búsqueda de producto
        if (selectedId) {
            $('#item_descripcion').prop('disabled', false).attr('placeholder', 'Buscar producto...');
        }
    });
}

// Cuando cambia el depósito: habilita/deshabilita búsqueda y limpia producto+marca+modelo
function onDepositoChange() {
    var depId = $('#deposito_id_det').val();
    // Limpiar producto y filtros
    $('#item_id').val('');
    $('#item_descripcion').val('');
    $('#cantidad_stock').val('');
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();

    if (depId) {
        $('#item_descripcion').prop('disabled', false).attr('placeholder', 'Buscar producto...');
    } else {
        $('#item_descripcion').prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
        $('#det_cantidad').prop('disabled', true);
    }
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
                title:'Listado de Pedidos de Ventas'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos de Ventas'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos de Ventas'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos de Ventas'
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
function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);

    // Limpiar empresa y sucursal para forzar selección fresca
    $("#empresa_id").val('');
    $("#emp_razon_social").val('');
    $("#sucursal_id").val('');
    $("#suc_razon_social").val('');
    $("#clientes_id").val('');
    $("#cli_nombre").val('');
    $("#cli_apellido").val('').add("#cli_ruc").val('').add("#cli_direccion").val('').add("#cli_telefono").val('').add("#cli_correo").val('');

    $("#ped_ven_fecha").removeAttr("disabled");
    $("#ped_ven_vence").removeAttr("disabled");
    $("#ped_ven_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled", true);   // empresa es solo lectura (auto-rellena)
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");

    // Empresa auto-rellena; después muestra lista de sucursales para seleccionar
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
    $("#ped_ven_fecha").removeAttr("disabled");
    $("#ped_ven_vence").removeAttr("disabled");
    $("#ped_ven_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
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
        pregunta="¿DESEA CONFIRMAR EL PEDIDO SELECCIONADO?";
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
        url: getUrl() + "pedido_ventas/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){

        let lista = "";

        for (let rs of resultado) {

            lista += `<tr class="item-list"
                onclick="seleccionPedidoVenta(
                    ${rs.id},
                    ${rs.empresa_id},
                    ${rs.sucursal_id},
                    ${rs.clientes_id},
                    '${rs.emp_razon_social}',
                    '${rs.suc_razon_social}',
                    '${rs.cli_nombre}',
                    '${rs.cli_apellido}',
                    '${rs.cli_ruc}',
                    '${rs.cli_direccion}',
                    '${rs.cli_telefono}',
                    '${rs.cli_correo}',
                    '${rs.ped_ven_fecha}',
                    '${rs.ped_ven_vence}',
                    '${rs.ped_ven_observaciones}',
                    '${rs.ped_ven_estado}'
                )">`;

            lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.emp_razon_social}</td>`;
            lista += `<td>${rs.suc_razon_social}</td>`;
            lista += `<td>${rs.ped_ven_fecha}</td>`;
            lista += `<td>${rs.ped_ven_vence}</td>`;
            lista += `<td>${rs.ped_ven_observaciones}</td>`;
            lista += `<td>${rs.cli_nombre}</td>`;
            lista += `<td>${rs.funcionario || rs.name || rs.encargado || '-'}</td>`;
            lista += `<td>${rs.ped_ven_estado}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr){
        mostrarErrores(xhr);
    });
}
function seleccionPedidoVenta(
    id_pedido,
    empresa_id,
    sucursal_id,
    clientes_id,
    emp_razon_social,
    suc_razon_social,
    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,
    ped_ven_fecha,
    ped_ven_vence,
    ped_ven_observaciones,
    ped_ven_estado
){
    $("#id").val(id_pedido);
    $("#empresa_id").val(empresa_id);
    $("#clientes_id").val(clientes_id);

    $("#emp_razon_social").val(emp_razon_social);
    // Sucursal no se auto-rellena — el usuario debe seleccionarla manualmente
    $("#sucursal_id").val('');
    $("#suc_razon_social").val('');

    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#ped_ven_fecha").val(ped_ven_fecha);
    $("#ped_ven_vence").val(ped_ven_vence);
    $("#ped_ven_observaciones").val(ped_ven_observaciones);
    $("#ped_ven_estado").val(ped_ven_estado);

    // Vista
    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    // Botonera base
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnEliminar, #btnConfirmar")
        .attr("disabled", true);

    $("#btnCancelar").removeAttr("disabled");

    if (ped_ven_estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").show();
        $("#suc_razon_social").removeAttr("disabled");
        buscarSucursal();
    } else if (ped_ven_estado === "CONFIRMADO") {
        $("#btnEliminar").removeAttr("disabled");
    } else if (ped_ven_estado === "PROCESADO") {
        // Solo lectura: todos los botones permanecen deshabilitados
    } else if (ped_ven_estado === "ANULADO") {
        // Todos los botones permanecen deshabilitados
    }

    $(".form-line").addClass("focused");
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
    .fail(function(xhr){
        swal("Error", "No se pudo buscar clientes.", "error");
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
function grabar(){

    var observaciones = $("#ped_ven_observaciones").val().trim();
    var fecha         = $("#ped_ven_fecha").val().trim();
    var plazo         = $("#ped_ven_vence").val().trim();
    var sucursal      = $("#suc_razon_social").val().trim();
    var cliente       = $("#cli_nombre").val().trim();

    if (observaciones === "" || fecha === "" || plazo === "" || sucursal === "" || cliente === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return;
    }

    let endpoint = "pedido_ventas/create";
    let metodo   = "POST";
    let estado   = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "pedido_ventas/update/" + $("#id").val();
        metodo   = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "pedido_ventas/anular/" + $("#id").val();
        metodo   = "PUT";
        estado   = "ANULADO";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "pedido_ventas/confirmar/" + $("#id").val();
        metodo   = "PUT";
        estado   = "CONFIRMADO";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id: $("#id").val(),
            ped_ven_fecha: fecha,
            ped_ven_vence: plazo,
            ped_ven_observaciones: observaciones,
            ped_ven_estado: estado,

            funcionario_id: $("#funcionario_id").val(),
            empresa_id: $("#empresa_id").val(),
            sucursal_id: $("#sucursal_id").val(),
            clientes_id: $("#clientes_id").val(),

            operacion: $("#txtOperacion").val()
        }
    })
    .done(function(resultado){

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){

            if (resultado.tipo === "success") {

                $("#id").val(resultado.registro.id);
                $("#detalle").show();

                if (resultado.registro.ped_ven_estado === "PENDIENTE" && $("#txtOperacion").val() == 1) {
                    $("#ped_ven_fecha").attr("disabled", true);
                    $("#ped_ven_vence").attr("disabled", true);
                    $("#ped_ven_observaciones").attr("disabled", true);
                    $("#suc_razon_social").attr("disabled", true);
                    $("#cli_nombre").attr("disabled", true);
                    $("#btnAgregar, #btnGrabar").attr("disabled", true);
                    $("#btnEditar, #btnEliminar").removeAttr("disabled");
                    $("#formDetalles").show();
                    listarDetalles();
                } else {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr){
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

function cancelarDetalle() {
    if (_ajaxMarcas)  { _ajaxMarcas.abort();  _ajaxMarcas  = null; }
    if (_ajaxModelos) { _ajaxModelos.abort(); _ajaxModelos = null; }

    $('#txtOperacionDetalle').val(0);
    $('#item_id').val('');
    $('#item_descripcion').val('').prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
    $('#det_cantidad').val('').prop('disabled', true);
    $('#cantidad_stock').val('');
    _marcaIdSel  = null;
    _modeloIdSel = null;
    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    $('#deposito_id_det').html('<option value="">-- Depósito (seleccione primero) --</option>').prop('disabled', true);
    $('#listaProductos').html('').hide();

    $("#btnAgregarDetalle").attr("style", "display:inline");
    $("#btnEditarDetalle").attr("style", "display:inline");
    $("#btnEliminarDetalle").attr("style", "display:inline");
    $("#btnGrabarDetalle").attr("style", "display:none");
    $("#btnCancelarDetalle").attr("style", "display:none");
}

function agregarDetalle() {
    cancelarDetalle();
    $("#txtOperacionDetalle").val(1);
    // El depósito se habilita primero; el producto queda bloqueado hasta que se elija depósito
    cargarDepositosPedido(null);
    $("#deposito_id_det").prop('disabled', false);
    $("#item_descripcion").prop('disabled', true).attr('placeholder', 'Buscar producto (requiere depósito)');
    $("#det_cantidad").prop('disabled', false);

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
    $("#btnCancelarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    var currentDeposito = $('#deposito_id_det').val();
    cargarDepositosPedido(currentDeposito);
    $("#deposito_id_det").prop('disabled', false);
    // Habilitar producto solo si ya hay depósito
    if (currentDeposito) {
        $("#item_descripcion").prop('disabled', false).attr('placeholder', 'Buscar producto...');
    }
    $("#det_cantidad").prop('disabled', false);

    // Habilitar marca/modelo sin resetear — ya tienen los valores de seleccionDetalle
    var marcaActual  = _marcaIdSel;
    var modeloActual = _modeloIdSel;
    var itemId = $('#item_id').val();

    if (itemId && marcaActual) {
        var marcaData = _cacheMarcas[itemId];
        if (marcaData) {
            var opts = '<option value="">-- Marca --</option>';
            marcaData.forEach(function(m) {
                var id = m.marca_id || m.id;
                opts += '<option value="' + id + '"' + (id == marcaActual ? ' selected' : '') + '>' + m.mar_nom + '</option>';
            });
            $('#marca_det').html(opts).removeAttr('disabled');
        } else {
            $.get(getUrl() + 'items/' + itemId + '/marcas', function(data) {
                _cacheMarcas[itemId] = data;
                var opts = '<option value="">-- Marca --</option>';
                data.forEach(function(m) {
                    var id = m.marca_id || m.id;
                    opts += '<option value="' + id + '"' + (id == marcaActual ? ' selected' : '') + '>' + m.mar_nom + '</option>';
                });
                $('#marca_det').html(opts).removeAttr('disabled');
            });
        }
        if (modeloActual) {
            var modData = _cacheModelos[itemId];
            if (modData) {
                _poblarModeloSelect(modData, marcaActual, modeloActual, $('#modelo_det'));
            } else {
                $.get(getUrl() + 'items/' + itemId + '/modelos', function(d) {
                    _cacheModelos[itemId] = d;
                    _poblarModeloSelect(d, marcaActual, modeloActual, $('#modelo_det'));
                });
            }
        }
    } else if (itemId) {
        cargarMarcasPedido(itemId, null);
        $('#marca_det').removeAttr('disabled');
    }

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
    $("#btnCancelarDetalle").attr("style", "display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
    $("#btnCancelarDetalle").attr("style","display:inline");
}

function grabarDetalle(){
    var oper = parseInt($("#txtOperacionDetalle").val());
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

    var endpoint = "pedido_ventas_det/create";
    var metodo = "POST";

    if (oper === 2) {
        endpoint = "pedido_ventas_det/update/" + $("#id").val();
        metodo = "PUT";
    }
    if (oper === 3) {
        endpoint = "pedido_ventas_det/delete/" + $("#id").val() + "/" + $("#item_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "pedidos_ventas_id": $("#id").val(),
            "item_id":           $("#item_id").val(),
            "det_cantidad":      $("#det_cantidad").val(),
            "cantidad_stock":    $("#cantidad_stock").val(),
            "deposito_id":       $("#deposito_id_det").val() || null,
            "marca_id":          _marcaIdSel  ? parseInt(_marcaIdSel)  : null,
            "modelo_id":         _modeloIdSel ? parseInt(_modeloIdSel) : null
        }
    })
    .done(function(){
        listarDetalles();
        cancelarDetalle();
    })
    .fail(function(xhr){
        mostrarErrores(xhr);
    });
}

var _timers = {};
function debounce(key, fn) { clearTimeout(_timers[key]); _timers[key] = setTimeout(fn, 300); }

function buscarProductos() {
    var q = $('#item_descripcion').val();
    if (q.length < 2) { $('#listaProductos').html('').hide(); return; }
    var depositoId = $('#deposito_id_det').val() || '';
    if (!depositoId) {
        $('#listaProductos').html('<ul class="list-group"><li class="list-group-item text-muted">Seleccione un depósito primero.</li></ul>').show();
        return;
    }
    debounce('prod', function() {
        $.ajax({
            url: getUrl() + "items/buscar",
            method: "POST",
            dataType: "json",
            data: {
                "item_descripcion": q,
                "deposito_id":     depositoId
            }
        })
        .done(function(resultado){
            var lista = "<ul class=\"list-group\">";
            resultado.forEach(function(rs) {
                var stock = rs.cantidad_disponible || 0;
                lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto(" + rs.item_id + ",'" + rs.item_descripcion + "'," + stock + ")\">"
                    + rs.item_descripcion
                    + " <span class='badge' style='background:#3b82f6;color:#fff;'>Stock: " + stock + "</span>"
                    + "</li>";
            });
            lista += "</ul>";
            $("#listaProductos").html(lista);
            $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
        })
        .fail(function(xhr) {
            mostrarErrores(xhr);
        });
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

function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url: getUrl() + "pedido_ventas_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for (var rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle("
                + rs.item_id + ",'"
                + rs.item_descripcion + "',"
                + rs.det_cantidad + ","
                + rs.cantidad_stock + ","
                + (rs.deposito_id || 0) + ","
                + (rs.marca_id   || 0) + ","
                + (rs.modelo_id  || 0) + ")\">";
            lista += "<td>" + rs.item_id + "</td>";
            lista += "<td>" + rs.item_descripcion + "</td>";
            lista += "<td>" + (rs.mar_nom || '—') + "</td>";
            lista += "<td>" + (rs.modelo_nom ? rs.modelo_nom + (rs.modelo_año ? ' (' + rs.modelo_año + ')' : '') : '—') + "</td>";
            lista += "<td>" + rs.det_cantidad + "</td>";
            lista += "<td>" + rs.cantidad_stock + "</td>";
            lista += "<td>" + (rs.dep_nombre || getNombreDeposito(rs.deposito_id)) + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);

        if($("#ped_ven_estado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionDetalle(item_id, item_descripcion, det_cantidad, cantidad_stock, deposito_id, marca_id, modelo_id) {
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#cantidad_stock").val(cantidad_stock);
    _marcaIdSel  = marca_id  || null;
    _modeloIdSel = modelo_id || null;
    cargarDepositosPedido(deposito_id);

    $('#marca_det').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det').html('<option value="">-- Modelo --</option>').prop('disabled', true);

    if (marca_id) {
        function poblarMarca(marcas) {
            var opts = '<option value="">-- Marca --</option>';
            marcas.forEach(function(m) {
                var id = m.marca_id || m.id;
                opts += '<option value="' + id + '"' + (id == marca_id ? ' selected' : '') + '>' + m.mar_nom + '</option>';
            });
            $('#marca_det').html(opts).val(marca_id).prop('disabled', true);
        }
        function poblarModelo(modelos) {
            var filtrados = modelos.filter(function(m) { return String(m.marca_id) === String(marca_id); });
            var mopts = '<option value="">-- Modelo --</option>';
            filtrados.forEach(function(m) {
                var id = m.modelo_id || m.id;
                mopts += '<option value="' + id + '"' + (id == modelo_id ? ' selected' : '') + '>' + m.modelo_nom + (m.modelo_año ? ' (' + m.modelo_año + ')' : '') + '</option>';
            });
            if (modelo_id) $('#modelo_det').html(mopts).val(modelo_id).prop('disabled', true);
        }

        if (_cacheMarcas[item_id]) {
            poblarMarca(_cacheMarcas[item_id]);
        } else {
            $.get(getUrl() + 'items/' + item_id + '/marcas', function(d) { _cacheMarcas[item_id] = d; poblarMarca(d); });
        }
        if (modelo_id) {
            if (_cacheModelos[item_id]) {
                poblarModelo(_cacheModelos[item_id]);
            } else {
                $.get(getUrl() + 'items/' + item_id + '/modelos', function(d) { _cacheModelos[item_id] = d; poblarModelo(d); });
            }
        }
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
        if (resultado.length > 0) {
            var primeraEmpresa = resultado[0];
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telef, primeraEmpresa.emp_correo);
            // Mostrar lista de sucursales para que el usuario seleccione
            buscarSucursal();
        }
    })
    .fail(function(xhr) {
        swal("Error", "No se pudo cargar la empresa.", "error");
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
        swal("Error", "No se pudo cargar las sucursales.", "error");
    });
}

function seleccionSucursal(sucursal_id, suc_razon_social, suc_direccion, suc_telefono, suc_correo){
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#suc_direccion").val(suc_direccion);
    $("#suc_telefono").val(suc_telefono);
    $("#suc_correo").val(suc_correo);

    $("#listaSucursal").html("");
    $("#listaSucursal").attr("style","display:none;");
}

function cargarFuncionarioIdLogueado() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
        $('#funcionario_id').val(datosSesion.user.funcionario_id);
    } else {
        swal("Sesión expirada", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}

function mostrarErrores(xhr) {
    if (xhr.status === 403) return;
    var res = xhr.responseJSON;
    if (xhr.status === 422 && res && res.errors) {
        var msgs = Object.values(res.errors).flat().map(function(e){ return '• ' + e; }).join('\n');
        swal({ title: 'Datos inválidos', text: msgs, type: 'warning' });
    } else if (res && res.mensaje) {
        swal({ title: 'Error', text: res.mensaje, type: res.tipo || 'error' });
    } else {
        swal({ title: 'Error', text: 'Ocurrió un error inesperado (HTTP ' + xhr.status + ').', type: 'error' });
    }
}

