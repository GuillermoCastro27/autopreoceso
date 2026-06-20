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
                title:'Listado de Tipos de Promociones'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipos de Promociones'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipos de Promociones'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipos de Promociones'
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

function manejarCambioModo() {
    var modo = $("#tipo_prom_modo").val();
    if (modo === "2X1") {
        $("#tipo_prom_valor").val("0").prop("disabled", true);
        $("#lbl_valor_hint").text("No aplica para 2x1").show();
    } else {
        $("#tipo_prom_valor").prop("disabled", false);
        var hint = modo === "PORCENTAJE" ? "Entre 0 y 100" : "";
        $("#lbl_valor_hint").text(hint);
    }
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#tipo_prom_descrip").removeAttr("disabled");
    $("#tipo_prom_fechaInicio").removeAttr("disabled");
    $("#tipo_prom_fechaFin").removeAttr("disabled");
    $("#tipo_prom_modo").removeAttr("disabled").val("").off("change.modo").on("change.modo", manejarCambioModo);
    $("#tipo_prom_valor").removeAttr("disabled").val("");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#tipo_prom_descrip").removeAttr("disabled");
    $("#tipo_prom_fechaInicio").removeAttr("disabled");
    $("#tipo_prom_fechaFin").removeAttr("disabled");
    $("#tipo_prom_modo").removeAttr("disabled").off("change.modo").on("change.modo", manejarCambioModo);
    manejarCambioModo(); // aplicar regla según modo actual

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
        var estado = $("#tipo_prom_estado").val();
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
        url:getUrl() + "tipo-promociones/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = rs.tipo_prom_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoPromociones("+rs.tipo_promociones_id+",'"+rs.tipo_prom_nombre+"','"+rs.tipo_prom_descrip+"','"+rs.tipo_prom_fechaInicio+"','"+rs.tipo_prom_fechaFin+"','"+rs.tipo_prom_modo+"','"+rs.tipo_prom_valor+"','"+estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.tipo_promociones_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_descrip;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_fechaInicio;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_fechaFin;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_modo;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_prom_valor;
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
function seleccionTipoPromociones(codigo, tipo_prom_nombre,tipo_prom_descrip,tipo_prom_fechaInicio,tipo_prom_fechaFin,tipo_prom_modo,tipo_prom_valor, estado){
    $("#txtCodigo").val(codigo);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);
    $("#tipo_prom_descrip").val(tipo_prom_descrip);
    $("#tipo_prom_fechaInicio").val(tipo_prom_fechaInicio);
    $("#tipo_prom_fechaFin").val(tipo_prom_fechaFin);
    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);
    // Mostrar hint de modo al visualizar un registro
    if (tipo_prom_modo === "2X1") {
        $("#lbl_valor_hint").text("No aplica para 2x1").show();
    } else if (tipo_prom_modo === "PORCENTAJE") {
        $("#lbl_valor_hint").text("Entre 0 y 100");
    } else {
        $("#lbl_valor_hint").text("");
    }

    $("#tipo_prom_estado").val(estado || 'activo');
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
    var nombre = $("#tipo_prom_nombre").val().trim();
    var descripción = $("#tipo_prom_descrip").val().trim();
    var FechaInicio = $("#tipo_prom_fechaInicio").val().trim();
    var FechaFin = $("#tipo_prom_fechaFin").val().trim();
    var Modo = $("#tipo_prom_modo").val().trim();
    var Valor = $("#tipo_prom_valor").val().trim();

    if (nombre === "") {
        swal('Error', 'El nombre de la promoción es obligatorio.', 'error');
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
    if (Modo === "") {
        swal('Error', 'Debe seleccionar un modo de promoción.', 'error');
        return;
    }
    if (Modo !== "2X1" && Valor === "") {
        swal('Error', 'El valor es obligatorio para el modo seleccionado.', 'error');
        return;
    }

    // Si el modo es 2X1 no se valida ni envía valor
    if (Modo !== "2X1") {
        var valorNum = parseFloat(Valor.replace(",", "."));
        if (isNaN(valorNum) || valorNum < 0) {
            swal('Error', 'El valor debe ser un número mayor o igual a cero.', 'error');
            return;
        }
        if (Modo === "PORCENTAJE" && valorNum > 100) {
            swal('Error', 'El porcentaje no puede ser mayor a 100%.', 'error');
            return;
        }
    }

    var mInicio = moment(FechaInicio, 'DD/MM/YYYY HH:mm:ss', true);
    var mFin    = moment(FechaFin,    'DD/MM/YYYY HH:mm:ss', true);
    if (mInicio.isValid() && mFin.isValid() && mFin.isBefore(mInicio)) {
        swal('Error', 'La fecha de fin no puede ser anterior a la fecha de inicio.', 'error');
        return;
    }

    var op = parseInt($("#txtOperacion").val());
    if (op === 4) { cambiarEstado(); return; }

    var endpoint = "tipo-promociones/create";
    var metodo = "POST";
    if(op === 2){
        endpoint = "tipo-promociones/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + ""+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipo_prom_descrip': $("#tipo_prom_descrip").val(), 
            'tipo_prom_nombre': $("#tipo_prom_nombre").val(),
            'tipo_prom_fechaInicio': $("#tipo_prom_fechaInicio").val(), 
            'tipo_prom_fechaFin': $("#tipo_prom_fechaFin").val(),
            'tipo_prom_modo':  $("#tipo_prom_modo").val(),
            'tipo_prom_valor': $("#tipo_prom_modo").val() === "2X1" ? 0 : $("#tipo_prom_valor").val()
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
        url: getUrl() + 'tipo-promociones/estado/' + id,
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
