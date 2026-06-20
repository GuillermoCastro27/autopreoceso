listar();
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
                title:'Listado de Tipos de Contrato'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipos de Contrato'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipos de Contrato'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipos de Contrato'
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
    $("#txtCodigo").val(0);
    $("#tip_con_nombre").removeAttr("disabled");
    $("#tip_con_objeto").removeAttr("disabled");
    $("#tip_con_alcance").removeAttr("disabled");
    $("#tip_con_garantia").removeAttr("disabled");
    $("#tip_con_responsabilidad").removeAttr("disabled");
    $("#tip_con_limitacion").removeAttr("disabled");
    $("#tip_con_fuerza_mayor").removeAttr("disabled");
    $("#tip_con_jurisdiccion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tip_con_nombre").removeAttr("disabled");
    $("#tip_con_objeto").removeAttr("disabled");
    $("#tip_con_alcance").removeAttr("disabled");
    $("#tip_con_garantia").removeAttr("disabled");
    $("#tip_con_responsabilidad").removeAttr("disabled");
    $("#tip_con_limitacion").removeAttr("disabled");
    $("#tip_con_fuerza_mayor").removeAttr("disabled");
    $("#tip_con_jurisdiccion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function confirmarCambioEstado(){
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

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        var estado = $("#tip_con_estado").val();
        titulo   = (estado || '').toLowerCase() === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = (estado || '').toLowerCase() === 'activo'
            ? '¿Desea desactivar este registro? No aparecerá en búsquedas.'
            : '¿Desea activar este registro nuevamente?';
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
function resumirTexto(texto, limite = 60){
    if (!texto) return "";
    return texto.length > limite 
        ? texto.substring(0, limite) + "..."
        : texto;
}
function listar(){
    $.ajax({
        url:getUrl() + "tipo_contrato/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = (rs.tip_con_estado || 'activo').toLowerCase();
            var activo = (estado || '').toLowerCase() === 'activo';
            var badge  = activo
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoContrato("
                + rs.tipo_contrato_id + ",'"
                + rs.tip_con_nombre + "','"
                + rs.tip_con_objeto + "','"
                + rs.tip_con_alcance + "','"
                + rs.tip_con_garantia + "','"
                + rs.tip_con_responsabilidad + "','"
                + rs.tip_con_limitacion + "','"
                + rs.tip_con_fuerza_mayor + "','"
                + rs.tip_con_jurisdiccion + "','"
                + estado + "');\">";

            lista += "<td>" + rs.tipo_contrato_id + "</td>";
            lista += "<td>" + rs.tip_con_nombre + "</td>";
            lista += "<td>" + badge + "</td>";

            // 👇 SOLO VISUAL (resumido)
            lista += "<td>" + resumirTexto(rs.tip_con_objeto) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_alcance) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_garantia) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_responsabilidad) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_limitacion) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_fuerza_mayor) + "</td>";
            lista += "<td>" + resumirTexto(rs.tip_con_jurisdiccion) + "</td>";

            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoContrato(
    codigo, tip_con_nombre,tip_con_objeto,tip_con_alcance,
    tip_con_garantia,tip_con_responsabilidad,tip_con_limitacion,
    tip_con_fuerza_mayor,tip_con_jurisdiccion,tip_con_estado
){
    $("#txtCodigo").val(codigo);
    $("#tip_con_nombre").val(tip_con_nombre);
    $("#tip_con_objeto").val(tip_con_objeto);
    $("#tip_con_alcance").val(tip_con_alcance);
    $("#tip_con_garantia").val(tip_con_garantia);
    $("#tip_con_responsabilidad").val(tip_con_responsabilidad);
    $("#tip_con_limitacion").val(tip_con_limitacion);
    $("#tip_con_fuerza_mayor").val(tip_con_fuerza_mayor);
    $("#tip_con_jurisdiccion").val(tip_con_jurisdiccion);

    $("#tip_con_estado").val((tip_con_estado || 'activo').toLowerCase());
    var activo = (tip_con_estado || '').toLowerCase() === 'activo';
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
    const nombre = ($("#tip_con_nombre").val() || "").trim();
    const objeto = ($("#tip_con_objeto").val() || "").trim();
    const alcance = ($("#tip_con_alcance").val() || "").trim();
    const garantia = ($("#tip_con_garantia").val() || "").trim();
    const responsabilidad = ($("#tip_con_responsabilidad").val() || "").trim();
    const limitacion = ($("#tip_con_limitacion").val() || "").trim();
    const fuerzaMayor = ($("#tip_con_fuerza_mayor").val() || "").trim();
    const jurisdiccion = ($("#tip_con_jurisdiccion").val() || "").trim();

    // ✅ Validar campos obligatorios (solo en alta/edición)
    const oper = parseInt($("#txtOperacion").val(), 10);
    if (oper === 4) { cambiarEstado(); return; }

    if (oper !== 3) {
        var camposReq = [
            { val: nombre,          label: 'Nombre' },
            { val: objeto,          label: 'Objeto del contrato' },
            { val: alcance,         label: 'Alcance' },
            { val: garantia,        label: 'Garantía' },
            { val: responsabilidad, label: 'Responsabilidad' },
            { val: limitacion,      label: 'Limitación' },
            { val: fuerzaMayor,     label: 'Fuerza mayor' },
            { val: jurisdiccion,    label: 'Jurisdicción' }
        ];
        for (var i = 0; i < camposReq.length; i++) {
            if (!camposReq[i].val) {
                swal('Error', 'El campo "' + camposReq[i].label + '" es obligatorio.', 'error');
                return;
            }
        }
        var CHARS_INVALIDOS = /[*<>{}|]/;
        var camposTexto = {
            'Nombre': nombre, 'Objeto': objeto, 'Alcance': alcance,
            'Garantía': garantia, 'Responsabilidad': responsabilidad,
            'Limitación': limitacion, 'Fuerza mayor': fuerzaMayor, 'Jurisdicción': jurisdiccion
        };
        for (var campo in camposTexto) {
            if (CHARS_INVALIDOS.test(camposTexto[campo])) {
                swal('Caracteres no permitidos', 'El campo "' + campo + '" no puede contener: * < > { } |', 'error');
                return;
            }
        }
    }

    let endpoint = "tipo_contrato/create";
    let metodo = "POST";

    let estado = "activo";

    if (oper === 2) {
        endpoint = "tipo_contrato/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }

    // ✅ Armar data
    let dataSend = {
        'id': $("#txtCodigo").val(),
        'tip_con_nombre': $("#tip_con_nombre").val(),
        'tip_con_objeto': $("#tip_con_objeto").val(),
        'tip_con_alcance': $("#tip_con_alcance").val(),
        'tip_con_garantia': $("#tip_con_garantia").val(),
        'tip_con_responsabilidad': $("#tip_con_responsabilidad").val(),
        'tip_con_limitacion': $("#tip_con_limitacion").val(),
        'tip_con_fuerza_mayor': $("#tip_con_fuerza_mayor").val(),
        'tip_con_jurisdiccion': $("#tip_con_jurisdiccion").val(),
        'tip_con_estado': estado
    };

    $.ajax({
        url: getUrl() + "" + endpoint,
        method: metodo,
        dataType: "json",
        data: dataSend
    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){
            if(resultado.tipo == "success"){
                location.reload(true);
            }
        });
    })
    .fail(function(xhr) {
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
            swal('Error', 'Este registro está en uso y no puede ser eliminado.', 'error');
        } else {
            swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
    });
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'tipo_contrato/estado/' + id,
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

