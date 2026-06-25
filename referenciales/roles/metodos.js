listar();
function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect',  title:'Listado de Roles' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect',   title:'Listado de Roles' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',    title:'Listado de Roles' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect',   title:'Listado de Roles' }
        ],
        iDisplayLength:3,
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

function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#pref_descripcion").removeAttr("disabled");
    $("#pref_abreviatura").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#pref_descripcion").removeAttr("disabled");
    $("#pref_abreviatura").removeAttr("disabled");

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
    var titulo   = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===2){
        titulo   = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        var estado = $("#pref_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
            ? '¿Desea desactivar este perfil?'
            : '¿Desea activar este perfil nuevamente?';
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
        url: getUrl() + "perfiles/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(var rs of resultado){
            var estado = rs.pref_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista += "<tr class=\"item-list\" onclick=\"seleccionRol("
                + rs.id + ",'"
                + rs.pref_descripcion + "','"
                + rs.pref_abreviatura + "','"
                + estado + "');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.pref_descripcion + "</td>";
            lista += "<td>" + rs.pref_abreviatura + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){ alert(c); });
}

function seleccionRol(codigo, pref_descripcion, pref_abreviatura, estado){
    estado = estado || 'activo';
    $("#txtCodigo").val(codigo);
    $("#pref_descripcion").val(pref_descripcion);
    $("#pref_abreviatura").val(pref_abreviatura);
    $("#pref_estado").val(estado);

    var activo = estado === 'activo';
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

function grabar() {
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) { cambiarEstado(); return; }

    var descripcion = $("#pref_descripcion").val().trim();
    var abreviatura = $("#pref_abreviatura").val().trim();

    if (!descripcion) {
        swal('Error', 'La descripción es obligatoria.', 'error');
        return;
    }
    if (!abreviatura) {
        swal('Error', 'La abreviatura es obligatoria.', 'error');
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(descripcion)) {
        swal('Caracteres no permitidos', 'El campo no puede contener: * < > { } |', 'error');
        return;
    }

    var endpoint = "perfiles/create";
    var metodo   = "POST";
    if(op===2){
        endpoint = "perfiles/update/" + $("#txtCodigo").val();
        metodo   = "PUT";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id':               $("#txtCodigo").val(),
            'pref_descripcion': descripcion,
            'pref_abreviatura': abreviatura
        }
    })
    .done(function(resultado){
        swal({ title:"Respuesta", text: resultado.mensaje, type: resultado.tipo },
        function(){
            if(resultado.tipo === "success"){ location.reload(true); }
        });
    })
    .fail(function(xhr){
        var res = xhr.responseJSON;
        if(xhr.status === 422){
            var msg = '';
            if(res && res.errors){ $.each(res.errors, function(k,v){ msg += v[0] + '\n'; }); }
            else { msg = 'Ningún campo debe estar vacío.'; }
            swal('Error de validación', msg, 'error');
        } else {
            swal('Error', res ? (res.mensaje || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
    });
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'perfiles/estado/' + id,
        method: 'PATCH',
        dataType: 'json'
    })
    .done(function(res){
        swal({ title:'Respuesta', text: res.mensaje, type: res.tipo },
            function(){ if(res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr){
        var res = xhr.responseJSON;
        swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
    });
}
