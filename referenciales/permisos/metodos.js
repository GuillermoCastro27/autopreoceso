listar();
function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect', title:'Listado de Permisos' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect', title:'Listado de Permisos' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',  title:'Listado de Permisos' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect', title:'Listado de Permisos' }
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

function cancelar(){ location.reload(true); }

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#per_nombre").removeAttr("disabled");
    $("#per_descripcion").removeAttr("disabled");
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#per_nombre").removeAttr("disabled");
    $("#per_descripcion").removeAttr("disabled");
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
    var titulo   = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    if(oper===2){ titulo = "EDITAR";    pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if(oper===3){ titulo = "ELIMINAR";  pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?"; }
    swal({
        title: titulo, text: pregunta, type: "warning",
        showCancelButton: true, confirmButtonColor: "#458E49",
        confirmButtonText: "SI", cancelButtonText: "NO", closeOnConfirm: false
    }, function () { grabar(); });
}

function mensajeOperacion(titulo,mensaje,tipo) { swal(titulo, mensaje, tipo); }

function listar(){
    $.ajax({
        url: getUrl() + "permisos/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista += "<tr class=\"item-list\" onclick=\"seleccionPermiso("+rs.id+",'"+rs.per_nombre+"','"+rs.per_descripcion+"');\">"
                  +  "<td>"+rs.id+"</td><td>"+rs.per_nombre+"</td><td>"+rs.per_descripcion+"</td></tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) alert(c);
    });
}

function seleccionPermiso(codigo, per_nombre, per_descripcion){
    $("#txtCodigo").val(codigo);
    $("#per_nombre").val(per_nombre);
    $("#per_descripcion").val(per_descripcion);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

function grabar() {
    var nombre      = $("#per_nombre").val().trim();
    var descripcion = $("#per_descripcion").val().trim();

    if (nombre === "") {
        swal({ title:"Error", text:"El campo Nombre no debe estar vacío.", type:"error" });
        return;
    }
    if (descripcion === "") {
        swal({ title:"Error", text:"El campo Descripción no debe estar vacío.", type:"error" });
        return;
    }

    var endpoint = "permisos/create";
    var metodo   = "POST";
    if($("#txtOperacion").val() == 2){ endpoint = "permisos/update/" + $("#txtCodigo").val(); metodo = "PUT"; }
    if($("#txtOperacion").val() == 3){ endpoint = "permisos/delete/" + $("#txtCodigo").val(); metodo = "DELETE"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: { id: $("#txtCodigo").val(), per_nombre: nombre, per_descripcion: descripcion }
    })
    .done(function(resultado) {
        swal({ title:"Respuesta", text:resultado.mensaje, type:resultado.tipo }, function(){
            if(resultado.tipo == "success") location.reload(true);
        });
    })
    .fail(function(xhr) {
        if (xhr.status === 403) return; // manejado por el handler global
        var respuesta = xhr.responseJSON;
        if (xhr.status === 400) {
            swal({ title:"Error", text:respuesta.mensaje, type:"error" });
        } else if (xhr.status === 422) {
            let errores = "";
            $.each(respuesta.errors, function(k,v){ errores += v + "\n"; });
            swal({ title:"Error de validación", text:errores, type:"error" });
        } else if (xhr.status === 500 && xhr.responseText.includes("SQLSTATE[23503]")) {
            swal({ title:"Error", text:"No se puede eliminar el permiso porque está siendo utilizado en otra parte del sistema.", type:"error" });
        } else {
            swal({ title:"Error", text:"Ocurrió un error inesperado.", type:"error" });
        }
        console.log(xhr.responseText);
    });
}
