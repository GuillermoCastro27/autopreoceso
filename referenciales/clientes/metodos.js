listar();

function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect', title:'Clientes' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',  title:'Clientes' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',   title:'Clientes' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',  title:'Clientes' }
        ],
        iDisplayLength: 3,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar(){
    location.reload(true);
}

function habilitarCampos(){
    $("#cli_tipo_persona").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    $("#cli_apellido").removeAttr("disabled");
    $("#cli_ruc").removeAttr("disabled");
    $("#cli_telefono").removeAttr("disabled");
    $("#cli_direccion").removeAttr("disabled");
    $("#cli_correo").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#nacio_descripcion").removeAttr("disabled");
    $("#cli_razon_social").removeAttr("disabled");
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    habilitarCampos();
    cambiarTipoPersona($("#cli_tipo_persona").val());

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    habilitarCampos();
    cambiarTipoPersona($("#cli_tipo_persona").val());

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

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if (oper === 2) {
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if (oper === 4) {
        var estado = $("#cli_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
            ? '¿Desea desactivar este cliente? No aparecerá en búsquedas.'
            : '¿Desea activar este cliente nuevamente?';
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

function cambiarTipoPersona(tipo) {
    if (tipo === 'JURIDICA') {
        $("#seccion_razon_social").show();
        $("#lbl_nombre").text("Representante Legal");
        $("#lbl_apellido").text("Apellido Representante");
        $("#cli_nombre").attr("placeholder", "Nombre del representante legal");
        $("#cli_apellido").attr("placeholder", "Apellido del representante legal");
    } else {
        $("#seccion_razon_social").hide();
        $("#cli_razon_social").val("");
        $("#lbl_nombre").text("Nombre");
        $("#lbl_apellido").text("Apellido");
        $("#cli_nombre").attr("placeholder", "");
        $("#cli_apellido").attr("placeholder", "");
    }
}

function listar(){
    $.ajax({
        url: getUrl() + "clientes/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "";

        for (let rs of resultado) {
            var estado = rs.cli_estado || 'activo';
            var tipo   = rs.cli_tipo_persona || 'FISICA';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            var tipoBadge = tipo === 'JURIDICA'
                ? '<span class="badge" style="background:#2980b9;">Jurídica</span>'
                : '<span class="badge" style="background:#7f8c8d;">Física</span>';

            lista += "<tr class='item-list' onclick=\"seleccionCliente("
                + rs.id + ","
                + (rs.pais_id || 0) + ","
                + (rs.ciudad_id || 0) + ","
                + (rs.nacionalidad_id || 0) + ",'"
                + esc(rs.cli_nombre) + "','"
                + esc(rs.cli_apellido) + "','"
                + esc(rs.cli_ruc) + "','"
                + esc(rs.cli_telefono) + "','"
                + esc(rs.cli_direccion) + "','"
                + esc(rs.cli_correo) + "','"
                + esc(rs.pais_descripcion) + "','"
                + esc(rs.ciu_descripcion) + "','"
                + esc(rs.nacio_descripcion) + "','"
                + esc(estado) + "','"
                + esc(tipo) + "','"
                + esc(rs.cli_razon_social) + "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + tipoBadge + "</td>";
            lista += "<td>" + (rs.cli_razon_social || '—') + "</td>";
            lista += "<td>" + (rs.cli_nombre || '') + "</td>";
            lista += "<td>" + (rs.cli_apellido || '') + "</td>";
            lista += "<td>" + (rs.cli_ruc || '') + "</td>";
            lista += "<td>" + (rs.cli_telefono || '') + "</td>";
            lista += "<td>" + (rs.cli_direccion || '') + "</td>";
            lista += "<td>" + (rs.cli_correo || '') + "</td>";
            lista += "<td>" + (rs.pais_descripcion || '') + "</td>";
            lista += "<td>" + (rs.ciu_descripcion || '') + "</td>";
            lista += "<td>" + (rs.nacio_descripcion || '') + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionCliente(
    id, pais_id, ciudad_id, nacionalidad_id,
    cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo,
    pais_descripcion, ciu_descripcion, nacio_descripcion,
    estado, cli_tipo_persona, cli_razon_social
) {
    $("#id").val(id);
    $("#pais_id").val(pais_id);
    $("#ciudad_id").val(ciudad_id);
    $("#nacionalidad_id").val(nacionalidad_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);
    $("#pais_descripcion").val(pais_descripcion);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#nacio_descripcion").val(nacio_descripcion);
    $("#cli_estado").val(estado || 'activo');
    $("#cli_tipo_persona").val(cli_tipo_persona || 'FISICA');
    $("#cli_razon_social").val(cli_razon_social || '');

    cambiarTipoPersona(cli_tipo_persona || 'FISICA');

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

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) { cambiarEstado(); return; }

    var tipo = $("#cli_tipo_persona").val();
    var ruc  = $("#cli_ruc").val().trim();
    var INVALIDOS = /[*<>{}|]/;

    if (tipo === 'JURIDICA') {
        var razonSocial = $("#cli_razon_social").val().trim();
        if (!razonSocial) {
            swal('Error', 'La razón social es obligatoria para persona jurídica.', 'error'); return;
        }
        if (INVALIDOS.test(razonSocial)) {
            swal('Caracteres no permitidos', 'La razón social no puede contener: * < > { } |', 'error'); return;
        }
    } else {
        var nombre = $("#cli_nombre").val().trim();
        var apellido = $("#cli_apellido").val().trim();
        if (!nombre) {
            swal('Error', 'El nombre es obligatorio.', 'error'); return;
        }
        if (INVALIDOS.test(nombre) || INVALIDOS.test(apellido)) {
            swal('Caracteres no permitidos', 'Los campos no pueden contener: * < > { } |', 'error'); return;
        }
    }
    if (!ruc) {
        swal('Error', 'El Nro. Documento es obligatorio.', 'error'); return;
    }

    var endpoint = "clientes/create";
    var metodo   = "POST";
    if (op === 2) { endpoint = "clientes/update/" + $("#id").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            cli_tipo_persona: tipo,
            cli_razon_social: $("#cli_razon_social").val(),
            cli_nombre:       $("#cli_nombre").val(),
            cli_apellido:     $("#cli_apellido").val(),
            cli_ruc:          ruc,
            cli_direccion:    $("#cli_direccion").val(),
            cli_telefono:     $("#cli_telefono").val(),
            cli_correo:       $("#cli_correo").val(),
            ciudad_id:        $("#ciudad_id").val(),
            pais_id:          $("#pais_id").val(),
            nacionalidad_id:  $("#nacionalidad_id").val(),
        }
    })
    .done(function(resultado){
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function(){
            if (resultado.tipo === "success") location.reload(true);
        });
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function cambiarEstado() {
    var id = $("#id").val();
    $.ajax({
        url: getUrl() + 'clientes/estado/' + id,
        method: 'PATCH',
        dataType: 'json'
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo },
            function() { if (res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function buscarPaises(){
    $.ajax({
        url: getUrl() + "paises/read",
        method: "GET",
        dataType: "json",
        data: { 'pais_descripcion': $("#pais_descripcion").val() }
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais(" + rs.id + ",'" + esc(rs.pais_descripcion) + "');\">" + (rs.pais_descripcion || '') + "</li>";
        }
        lista += "</ul>";
        $("#listaPaises").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionPais(id, descri){
    $("#pais_id").val(id);
    $("#pais_descripcion").val(descri);
    $("#listaPaises").html("").attr("style","display:none;");
}

function buscarCiudades(){
    $.ajax({
        url: getUrl() + "ciudades/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad(" + rs.id + ",'" + esc(rs.ciu_descripcion) + "')\">" + (rs.ciu_descripcion || '') + "</li>";
        }
        lista += "</ul>";
        $("#listaCiudades").html(lista).attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionCiudad(id, ciu_descripcion) {
    $("#ciudad_id").val(id);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#listaCiudades").html("").attr("style", "display:none;");
}

function buscarNacionalidades(){
    $.ajax({
        url: getUrl() + "nacionalidad/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        const esc = s => (s || '').toString().replace(/'/g, "\\'");
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionNacionalidad(" + rs.id + ",'" + esc(rs.nacio_descripcion) + "');\">" + (rs.nacio_descripcion || '') + "</li>";
        }
        lista += "</ul>";
        $("#listaNacionalidades").html(lista).attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function seleccionNacionalidad(id, nacio_descripcion){
    $("#nacionalidad_id").val(id);
    $("#nacio_descripcion").val(nacio_descripcion);
    $("#listaNacionalidades").html("").attr("style","display:none;");
}

function mostrarErrores(xhr) {
    var res = xhr.responseJSON;
    if (xhr.status === 422 && res && res.errors) {
        var msg = Object.values(res.errors).flat().join('\n');
        swal('Error de validación', msg, 'error');
    } else {
        swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
    }
}

