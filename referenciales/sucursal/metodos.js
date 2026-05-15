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
                title:'Listado de Sucursal'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Sucursal'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Sucursal'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Sucursal'
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
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    $("#suc_telefono").removeAttr("disabled");
    $("#suc_direccion").removeAttr("disabled");
    $("#suc_correo").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    $("#suc_telefono").removeAttr("disabled");
    $("#suc_direccion").removeAttr("disabled");
    $("#suc_correo").removeAttr("disabled");


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


function listar(){
    $.ajax({
        url:getUrl() + "sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionSucursal("+ rs.id +", "+ rs.empresa_id +", '" + rs.emp_razon_social + "','" + rs.suc_razon_social + "','" + rs.suc_telefono + "','" + rs.suc_direccion + "','" + rs.suc_correo + "');\">";
                lista = lista + "<td>" + rs.emp_razon_social + "</td>";
                lista = lista + "<td>" + rs.suc_razon_social + "</td>";
                lista = lista + "<td>" + rs.suc_telefono + "</td>";
                lista = lista + "<td>" + rs.suc_direccion + "</td>";
                lista = lista + "<td>" + rs.suc_correo + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionSucursal(id, empresa_id, emp_razon_social, suc_razon_social, suc_telefono, suc_direccion, suc_correo) {
    $("#sucursal_id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#suc_telefono").val(suc_telefono);
    $("#suc_direccion").val(suc_direccion);
    $("#suc_correo").val(suc_correo);


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function buscarEmpresas(){
    $.ajax({
        url:getUrl() + "empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionEmpresa("+rs.id+",'"+rs.emp_razon_social+"','"+rs.emp_direccion+"','"+rs.emp_telefono+"','"+rs.emp_correo+"');\">"+rs.emp_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaEmpresa").html(lista);
        $("#listaEmpresa").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionEmpresa(id,emp_razon_social,emp_direccion,emp_telefono,emp_correo){
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telefono").val(emp_telefono);
    $("#emp_correo").val(emp_correo);

    $("#listaEmpresa").html("");
    $("#listaEmpresa").attr("style","display:none;");
}

function grabar(){
    var op = parseInt($("#txtOperacion").val());

    if (op !== 3) {
        var suc  = $("#suc_razon_social").val().trim();
        var emp  = $("#empresa_id").val();
        if (!suc || !emp) {
            swal('Error', 'Razón social y empresa son obligatorios.', 'error');
            return;
        }
    }

    var endpoint = "sucursal/create";
    var metodo = "POST";
    if (op === 2) {
        endpoint = "sucursal/update/" + $("#sucursal_id").val();
        metodo = "PUT";
    }
    if (op === 3) {
        endpoint = "sucursal/delete/" + $("#sucursal_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + "" + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'empresa_id': $("#empresa_id").val(),
            'suc_razon_social': $("#suc_razon_social").val(),
            'suc_direccion': $("#suc_direccion").val(),
            'suc_telefono': $("#suc_telefono").val(),
            'suc_correo': $("#suc_correo").val()
        }
    })
    .done(function(resultado){
        swal({
            title: "Respuesta",
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
            swal('Error', 'Esta sucursal está en uso y no puede ser eliminada.', 'error');
        } else {
            swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
        console.log(xhr.responseText);
    });
}