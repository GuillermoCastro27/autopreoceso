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
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipo de impuestos'
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
    $("#btnEliminar").attr("disabled","true");

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
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

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
        titulo = "ELIMINAR";
        pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
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
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo_contrato/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
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
                + rs.tip_con_estado + "');\">";

            lista += "<td>" + rs.tipo_contrato_id + "</td>";
            lista += "<td>" + rs.tip_con_nombre + "</td>";
            lista += "<td>" + rs.tip_con_estado + "</td>";

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

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");
    
    if (tip_con_estado === "ACTIVO") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
    }
    if (tip_con_estado === "INACTIVO") {
        $("#btnEditar").attr("disabled","true");
        $("#btnEliminar").attr("disabled","true");
    }
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

    if (oper !== 3) {
        if (!nombre || !objeto || !alcance || !garantia || !responsabilidad || !limitacion || !fuerzaMayor || !jurisdiccion) {
            swal({
                title: "Error",
                text: "Todos los campos obligatorios deben estar completos.",
                type: "error"
            });
            return;
        }
    }

    let endpoint = "tipo_contrato/create";
    let metodo = "POST";

    // ✅ Estado correcto para este módulo
    let estado = "ACTIVO";

    if (oper === 2) {
        endpoint = "tipo_contrato/update/" + $("#txtCodigo").val();
        metodo = "PUT";
    }

    if (oper === 3) {
        endpoint = "tipo_contrato/delete/" + $("#txtCodigo").val();
        metodo = "DELETE";
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

    // ✅ Si es delete lógico, no hace falta mandar todo (opcional)
    if (oper === 3) {
        dataSend = {}; // tu destroy ya pone INACTIVO en backend
    }

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/" + endpoint,
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
    .fail(function(a) {
        // Si es validación de Laravel (422), mostrar mensajes
        if (a.status === 422 && a.responseJSON && a.responseJSON.errors) {
            let msg = Object.values(a.responseJSON.errors).flat().join("\n");
            swal("Error", msg, "error");
            return;
        }

        // Otros errores
        swal("Error", "Ocurrió un error al procesar la operación.", "error");
    });
}
