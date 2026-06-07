// Arrays en memoria para marcas y modelos del item en edición
var marcasItem  = [];  // [{marca_id, marc_nom}]
var modelosItem = [];  // [{modelo_id, modelo_nom}]

listar();

// Cierra cualquier lista desplegable al hacer clic fuera de su contenedor
$(document).on('click', function(e){
    if (!$(e.target).closest('.pivot-search-wrap').length) {
        $('#listaMarcasAdd').html('').hide();
        $('#listaModelosAdd').html('').hide();
    }
    if (!$(e.target).closest('#tipo_descripcion, #listaTipoItems').length) {
        $('#listaTipoItems').html('').hide();
    }
    if (!$(e.target).closest('#tip_imp_nom, #listaTipoImpuestos').length) {
        $('#listaTipoImpuestos').html('').hide();
    }
});

// ===================== TABLA =====================
function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',   text:'COPIAR',   className:'btn btn-primary waves-effect',  title:'Ítems' },
            { extend:'excel',  text:'EXCEL',    className:'btn btn-success waves-effect',  title:'Ítems' },
            { extend:'pdf',    text:'PDF',      className:'btn btn-danger waves-effect',   title:'Ítems' },
            { extend:'print',  text:'IMPRIMIR', className:'btn btn-warning waves-effect',  title:'Ítems' }
        ],
        iDisplayLength: 5,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{ sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar(){ location.reload(true); }

// ===================== BOTONES CRUD =====================
function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    habilitarCampos(true);
    marcasItem  = [];
    modelosItem = [];
    renderMarcas();
    renderModelos();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    habilitarCampos(true);
    // Cargar marcas y modelos existentes del item seleccionado
    var itemId = $("#id").val();
    cargarMarcasItem(itemId);
    cargarModelosItem(itemId);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

function confirmarCambioEstado() {
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function habilitarCampos(habilitar){
    var action = habilitar ? "removeAttr" : "attr";
    var args   = habilitar ? ["disabled"] : ["disabled","true"];
    $("#item_decripcion")[action](...args);
    $("#item_costo")[action](...args);
    $("#item_precio")[action](...args);
    $("#tipo_descripcion")[action](...args);
    $("#tip_imp_nom")[action](...args);
    $("#marc_nom_add")[action](...args);
    $("#modelo_nom_add")[action](...args);
    $("#btnAgregarMarca")[action](...args);
    $("#btnAgregarModelo")[action](...args);
}

// ===================== LISTAR =====================
function listar(){
    $.ajax({
        url: getUrl() + "items/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(var rs of resultado){
            var estado = rs.item_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista += "<tr class=\"item-list\" onclick=\"seleccionItems(" + rs.id + "," + rs.tipo_id + "," + rs.tipo_impuesto_id + ",'" +
                rs.item_decripcion + "','" + rs.item_costo + "','" + rs.item_precio + "','" +
                rs.tipo_descripcion + "','" + rs.tip_imp_nom + "','" + estado + "');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.item_decripcion + "</td>";
            lista += "<td>" + rs.item_costo + "</td>";
            lista += "<td>" + rs.item_precio + "</td>";
            lista += "<td>" + rs.tipo_descripcion + "</td>";
            lista += "<td>" + rs.tip_imp_nom + "</td>";
            lista += "<td>" + (rs.marcas  || '-') + "</td>";
            lista += "<td>" + (rs.modelos || '-') + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr){
        var res = xhr.responseJSON;
        swal('Error', res ? (res.mensaje || res.message || 'Error al listar.') : 'Error al listar.', 'error');
    });
}

// ===================== SELECCIÓN DE FILA =====================
function seleccionItems(id, tipo_id, tipo_impuesto_id, item_decripcion, item_costo, item_precio, tipo_descripcion, tip_imp_nom, estado){
    $("#id").val(id);
    $("#item_decripcion").val(item_decripcion);
    $("#item_costo").val(item_costo);
    $("#item_precio").val(item_precio);
    $("#tipo_id").val(tipo_id);
    $("#tipo_descripcion").val(tipo_descripcion);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#item_estado").val(estado || 'activo');

    var activo = (estado || 'activo') === 'activo';
    if (activo) {
        $("#btnEstado").removeClass("btn-success").addClass("btn-danger");
        $("#lblEstado").text("Desactivar");
        $("#btnEstado").find("i").text("block");
    } else {
        $("#btnEstado").removeClass("btn-danger").addClass("btn-success");
        $("#lblEstado").text("Activar");
        $("#btnEstado").find("i").text("check_circle");
    }

    // Cargar marcas y modelos (solo lectura)
    cargarMarcasItem(id);
    cargarModelosItem(id);

    habilitarCampos(false);
    $("#marc_nom_add").attr("disabled","true");
    $("#modelo_nom_add").attr("disabled","true");
    $("#btnAgregarMarca").attr("disabled","true");
    $("#btnAgregarModelo").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

// ===================== MARCAS =====================
function cargarMarcasItem(itemId){
    $.ajax({
        url: getUrl() + "items/" + itemId + "/marcas",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        marcasItem = resultado.map(function(r){ return { marca_id: r.marca_id, marc_nom: r.marc_nom }; });
        renderMarcas();
    });
}

function buscarMarcaAdd(){
    var texto = $("#marc_nom_add").val();
    $.ajax({
        url: getUrl() + "marca/read",
        method: "GET",
        data: { marc_nom: texto, excluir_tipo: 'VEHICULO' },
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class='list-group'>";
        if (resultado.length === 0) {
            lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
        } else {
            for (var rs of resultado) {
                lista += "<li class='list-group-item' onclick=\"seleccionMarcaAdd(" + rs.id + ",'" + rs.marc_nom + "')\">" + rs.marc_nom + "</li>";
            }
        }
        lista += "</ul>";
        $("#listaMarcasAdd").html(lista).show();
    });
}

function seleccionMarcaAdd(id, nombre){
    $("#marca_add_id").val(id);
    $("#marc_nom_add").val(nombre);
    $("#listaMarcasAdd").html("").hide();
}

function agregarMarca(){
    var id     = $("#marca_add_id").val();
    var nombre = $("#marc_nom_add").val().trim();
    if (!id || !nombre) {
        swal('Error', 'Seleccione una marca de la lista.', 'error');
        return;
    }
    // Evitar duplicados
    for (var i = 0; i < marcasItem.length; i++) {
        if (marcasItem[i].marca_id == id) {
            swal('Aviso', 'Esa marca ya está en la lista.', 'warning');
            return;
        }
    }
    marcasItem.push({ marca_id: id, marc_nom: nombre });
    renderMarcas();
    $("#marc_nom_add").val('');
    $("#marca_add_id").val('');
}

function quitarMarca(idx){
    marcasItem.splice(idx, 1);
    renderMarcas();
}

function renderMarcas(){
    if (marcasItem.length === 0) {
        $("#bodyMarcas").html("<tr><td colspan='2' class='text-center text-muted'>Sin marcas</td></tr>");
        return;
    }
    var html = "";
    for (var i = 0; i < marcasItem.length; i++) {
        html += "<tr>";
        html += "<td>" + marcasItem[i].marc_nom + "</td>";
        html += "<td><button type='button' class='btn btn-danger btn-quitar waves-effect' onclick='quitarMarca(" + i + ");'>" +
                "<i class='material-icons' style='font-size:14px;vertical-align:middle;'>close</i></button></td>";
        html += "</tr>";
    }
    $("#bodyMarcas").html(html);
}

// ===================== MODELOS =====================
function cargarModelosItem(itemId){
    $.ajax({
        url: getUrl() + "items/" + itemId + "/modelos",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        modelosItem = resultado.map(function(r){ return { modelo_id: r.modelo_id, modelo_nom: r.modelo_nom }; });
        renderModelos();
    });
}

function buscarModeloAdd(){
    var texto = $("#modelo_nom_add").val();
    $.ajax({
        url: getUrl() + "modelo/read",
        method: "GET",
        data: { modelo_nom: texto, excluir_tipo: 'VEHICULO' },
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class='list-group'>";
        if (resultado.length === 0) {
            lista += "<li class='list-group-item text-muted'>Sin resultados</li>";
        } else {
            for (var rs of resultado) {
                lista += "<li class='list-group-item' onclick=\"seleccionModeloAdd(" + rs.id + ",'" + rs.modelo_nom + "')\">" + rs.modelo_nom + "</li>";
            }
        }
        lista += "</ul>";
        $("#listaModelosAdd").html(lista).show();
    });
}

function seleccionModeloAdd(id, nombre){
    $("#modelo_add_id").val(id);
    $("#modelo_nom_add").val(nombre);
    $("#listaModelosAdd").html("").hide();
}

function agregarModelo(){
    var id     = $("#modelo_add_id").val();
    var nombre = $("#modelo_nom_add").val().trim();
    if (!id || !nombre) {
        swal('Error', 'Seleccione un modelo de la lista.', 'error');
        return;
    }
    for (var i = 0; i < modelosItem.length; i++) {
        if (modelosItem[i].modelo_id == id) {
            swal('Aviso', 'Ese modelo ya está en la lista.', 'warning');
            return;
        }
    }
    modelosItem.push({ modelo_id: id, modelo_nom: nombre });
    renderModelos();
    $("#modelo_nom_add").val('');
    $("#modelo_add_id").val('');
}

function quitarModelo(idx){
    modelosItem.splice(idx, 1);
    renderModelos();
}

function renderModelos(){
    if (modelosItem.length === 0) {
        $("#bodyModelos").html("<tr><td colspan='2' class='text-center text-muted'>Sin modelos</td></tr>");
        return;
    }
    var html = "";
    for (var i = 0; i < modelosItem.length; i++) {
        html += "<tr>";
        html += "<td>" + modelosItem[i].modelo_nom + "</td>";
        html += "<td><button type='button' class='btn btn-danger btn-quitar waves-effect' onclick='quitarModelo(" + i + ");'>" +
                "<i class='material-icons' style='font-size:14px;vertical-align:middle;'>close</i></button></td>";
        html += "</tr>";
    }
    $("#bodyModelos").html(html);
}

// ===================== BÚSQUEDAS TIPO/IMPUESTO =====================
function buscarTipoItems(){
    $.ajax({
        url: getUrl() + "tipo/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionTipoItems(" + rs.id + ",'" + rs.tipo_descripcion + "','" + rs.tipo_objeto + "')\">" + rs.tipo_descripcion + "</li>";
        }
        lista += "</ul>";
        $("#listaTipoItems").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    });
}

function seleccionTipoItems(id, tipo_descripcion, tipo_objeto){
    $("#tipo_id").val(id);
    $("#tipo_descripcion").val(tipo_descripcion);
    $("#listaTipoItems").html("").hide();
}

function buscarTipoImpuestos(){
    $.ajax({
        url: getUrl() + "tipo-impuesto/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class='list-group'>";
        for (var rs of resultado) {
            lista += "<li class='list-group-item' onclick=\"seleccionTipoImpuestos(" + rs.id + ",'" + rs.tip_imp_nom + "','" + rs.tipo_imp_tasa + "')\">" + rs.tip_imp_nom + " " + rs.tipo_imp_tasa + "</li>";
        }
        lista += "</ul>";
        $("#listaTipoImpuestos").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    });
}

function seleccionTipoImpuestos(id, tip_imp_nom, tipo_imp_tasa){
    $("#tipo_impuesto_id").val(id);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#listaTipoImpuestos").html("").hide();
}

// ===================== CONFIRMACIÓN Y GRABAR =====================
function confirmarOperacion(){
    var oper  = parseInt($("#txtOperacion").val());
    var titulo   = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    if (oper === 2){ titulo = "EDITAR";    pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 4){
        var estado = $("#item_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
            ? '¿Desea desactivar este registro? No aparecerá en búsquedas.'
            : '¿Desea activar este registro nuevamente?';
    }
    swal({
        title: titulo, text: pregunta, type: "warning",
        showCancelButton: true, confirmButtonColor: "#458E49",
        confirmButtonText: "SI", cancelButtonText: "NO", closeOnConfirm: false
    }, function(){ grabar(); });
}

function grabar(){
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) { cambiarEstado(); return; }

    if (op !== 3) {
        if (!$("#item_decripcion").val().trim() || !$("#item_costo").val().trim() ||
            !$("#item_precio").val().trim() || !$("#tipo_id").val() || !$("#tipo_impuesto_id").val()) {
            swal('Error', 'Descripción, costo, precio, tipo e impuesto son obligatorios.', 'error');
            return;
        }
        var CHARS_INVALIDOS = /[*<>{}|]/;
        if (CHARS_INVALIDOS.test($("#item_decripcion").val().trim())) {
            swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
            return;
        }
    }

    var endpoint = "items/create";
    var metodo   = "POST";
    if (op === 2){ endpoint = "items/update/" + $("#id").val(); metodo = "PUT"; }
    // op===3 removed — use cambiarEstado() for state toggle

    // Construir arrays de IDs para enviar
    var marcasIds  = marcasItem.map(function(m){ return m.marca_id; });
    var modelosIds = modelosItem.map(function(m){ return m.modelo_id; });

    $.ajax({
        url: getUrl() + "" + endpoint,
        method: metodo,
        dataType: "json",
        traditional: true,   // para que los arrays lleguen como marcas[]=1&marcas[]=2
        data: {
            'item_decripcion':  $("#item_decripcion").val(),
            'item_costo':       $("#item_costo").val(),
            'item_precio':      $("#item_precio").val(),
            'tipo_id':          $("#tipo_id").val(),
            'tipo_impuesto_id': $("#tipo_impuesto_id").val(),
            'marcas':           marcasIds,
            'modelos':          modelosIds
        }
    })
    .done(function(resultado){
        swal({ title:"Respuesta", text: resultado.mensaje, type: resultado.tipo },
        function(){
            if (resultado.tipo === "success"){ location.reload(true); }
        });
    })
    .fail(function(xhr){
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) {
                $.each(res.errors, function(k, v){ msg += v[0] + '\n'; });
            } else {
                msg = 'Ningún campo debe estar vacío.';
            }
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 500 && xhr.responseText.indexOf('SQLSTATE[23') !== -1) {
            swal('Error', 'Este ítem está en uso y no puede ser eliminado.', 'error');
        } else {
            swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
    });
}

function cambiarEstado() {
    var id = $("#id").val();
    $.ajax({
        url: getUrl() + 'items/estado/' + id,
        method: 'PATCH',
        dataType: 'json'
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo },
            function() { if (res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
    });
}
