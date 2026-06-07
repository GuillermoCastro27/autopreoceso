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
                title:'Listado de Tipos de Descuento'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipos de Descuento'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipos de Descuento'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipos de Descuento'
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
    $("#tipo_desc_nombre").removeAttr("disabled");
    $("#tipo_desc_descrip").removeAttr("disabled");
    $("#tipo_desc_fechaInicio").removeAttr("disabled");
    $("#tipo_desc_fechaFin").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tipo_desc_nombre").removeAttr("disabled");
    $("#tipo_desc_descrip").removeAttr("disabled");
    $("#tipo_desc_fechaInicio").removeAttr("disabled");
    $("#tipo_desc_fechaFin").removeAttr("disabled");

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
        var estado = $("#tipo_desc_estado").val();
        titulo   = (estado || 'activo') === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = (estado || 'activo') === 'activo'
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

function listar(){
    $.ajax({
        url:getUrl() + "tipo-descuentos/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = rs.tipo_desc_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoDescuentos("+rs.tipo_descuentos_id+",'"+rs.tipo_desc_nombre+"','"+rs.tipo_desc_descrip+"','"+rs.tipo_desc_fechaInicio+"','"+rs.tipo_desc_fechaFin+"','"+estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.tipo_descuentos_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_desc_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_desc_descrip;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_desc_fechaInicio;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_desc_fechaFin;
                lista = lista +"</td>";
                lista = lista + "<td>" + badge + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoDescuentos(codigo, tipo_desc_nombre,tipo_desc_descrip,tipo_desc_fechaInicio,tipo_desc_fechaFin, estado){
    $("#txtCodigo").val(codigo);
    $("#tipo_desc_nombre").val(tipo_desc_nombre);
    $("#tipo_desc_descrip").val(tipo_desc_descrip);
    $("#tipo_desc_fechaInicio").val(tipo_desc_fechaInicio);
    $("#tipo_desc_fechaFin").val(tipo_desc_fechaFin);

    $("#tipo_desc_estado").val(estado || 'activo');
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
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function grabar(){
    var nombre = $("#tipo_desc_nombre").val().trim();
    var descripción = $("#tipo_desc_descrip").val().trim();
    var FechaInicio = $("#tipo_desc_fechaInicio").val().trim();
    var FechaFin = $("#tipo_desc_fechaFin").val().trim();

    if (nombre === "") {
        swal('Error', 'El nombre del tipo de descuento es obligatorio.', 'error');
        return;
    }
    if (descripción === "") {
        swal('Error', 'La descripción es obligatoria.', 'error');
        return;
    }

    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(nombre)) {
        swal('Caracteres no permitidos', 'El nombre no puede contener: * < > { } |', 'error');
        return;
    }
    if (CHARS_INVALIDOS.test(descripción)) {
        swal('Caracteres no permitidos', 'La descripción no puede contener: * < > { } |', 'error');
        return;
    }

    if (FechaInicio === "") {
        swal('Error', 'La fecha de inicio es obligatoria.', 'error');
        return;
    }
    if (FechaFin === "") {
        swal('Error', 'La fecha de fin es obligatoria.', 'error');
        return;
    }

    var mInicio = moment(FechaInicio, 'DD/MM/YYYY HH:mm:ss', true);
    var mFin    = moment(FechaFin,    'DD/MM/YYYY HH:mm:ss', true);
    if (mInicio.isValid() && mFin.isValid() && mFin.isBefore(mInicio)) {
        swal('Error', 'La fecha de fin no puede ser anterior a la fecha de inicio.', 'error');
        return;
    }

    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }

    var endpoint = "tipo-descuentos/create";
    var metodo = "POST";
    if(op === 2){
        endpoint = "tipo-descuentos/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + ""+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipo_desc_descrip': $("#tipo_desc_descrip").val(), 
            'tipo_desc_nombre': $("#tipo_desc_nombre").val(),
            'tipo_desc_fechaInicio': $("#tipo_desc_fechaInicio").val(), 
            'tipo_desc_fechaFin': $("#tipo_desc_fechaFin").val()
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
        url: getUrl() + 'tipo-descuentos/estado/' + id,
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