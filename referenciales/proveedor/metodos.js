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
                title:'Proveedores'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Proveedores'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Proveedores'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Proveedores'
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
    $("#prov_estado").val("activo");
    $("#prov_razonsocial").removeAttr("disabled");
    $("#prov_ruc").removeAttr("disabled");
    $("#prov_telefono").removeAttr("disabled");
    $("#prov_direccion").removeAttr("disabled");
    $("#prov_correo").removeAttr("disabled");
    $("#pais_descrpcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#nacio_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#prov_razonsocial").removeAttr("disabled");
    $("#prov_ruc").removeAttr("disabled");
    $("#prov_telefono").removeAttr("disabled");
    $("#prov_direccion").removeAttr("disabled");
    $("#prov_correo").removeAttr("disabled");
    $("#pais_descrpcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#nacio_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
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
        var estado = $("#prov_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
            ? '¿Desea desactivar este proveedor? No aparecerá en búsquedas.'
            : '¿Desea activar este proveedor nuevamente?';
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
        url:getUrl() + "proveedores/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            var estado = rs.prov_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            var razon = (rs.prov_razonsocial||'').replace(/'/g,"\\'");
            var ruc   = (rs.prov_ruc||'').replace(/'/g,"\\'");
            var tel   = (rs.prov_telefono||'').replace(/'/g,"\\'");
            var dir   = (rs.prov_direccion||'').replace(/'/g,"\\'");
            var cor   = (rs.prov_correo||'').replace(/'/g,"\\'");
            var pdes  = (rs.pais_descrpcion||'').replace(/'/g,"\\'");
            var cdes  = (rs.ciu_descripcion||'').replace(/'/g,"\\'");
            var ndes  = (rs.nacio_descripcion||'').replace(/'/g,"\\'");

            lista += "<tr class='item-list' onclick=\"seleccionProveedor("+rs.id+","+rs.pais_id+","+rs.ciudad_id+","+rs.nacionalidad_id+",'"+razon+"','"+ruc+"','"+tel+"','"+dir+"','"+cor+"','"+pdes+"','"+cdes+"','"+ndes+"','"+estado+"');\">";
            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.prov_razonsocial + "</td>";
            lista += "<td>" + rs.prov_ruc + "</td>";
            lista += "<td>" + rs.prov_telefono + "</td>";
            lista += "<td>" + rs.prov_direccion + "</td>";
            lista += "<td>" + rs.prov_correo + "</td>";
            lista += "<td>" + rs.pais_descrpcion + "</td>";
            lista += "<td>" + rs.ciu_descripcion + "</td>";
            lista += "<td>" + rs.nacio_descripcion + "</td>";
            lista += "<td>" + badge + "</td>";
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionProveedor(id, pais_id, ciudad_id, nacionalidad_id, prov_razonsocial, prov_ruc, prov_telefono, prov_direccion, prov_correo, pais_descrpcion, ciu_descripcion, nacio_descripcion, prov_estado) {
    $("#id").val(id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_direccion").val(prov_direccion);
    $("#prov_correo").val(prov_correo);
    $("#pais_descrpcion").val(pais_descrpcion);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#nacio_descripcion").val(nacio_descripcion);
    $("#pais_id").val(pais_id);
    $("#ciudad_id").val(ciudad_id);
    $("#nacionalidad_id").val(nacionalidad_id);
    $("#prov_estado").val(prov_estado || 'activo');

    var activo = (prov_estado || 'activo') === 'activo';
    if (activo) {
        $("#btnEstado").removeClass("btn-success").addClass("btn-danger");
        $("#lblEstado").text("Desactivar");
        $("#btnEstado").find("i").text("block");
    } else {
        $("#btnEstado").removeClass("btn-danger").addClass("btn-success");
        $("#lblEstado").text("Activar");
        $("#btnEstado").find("i").text("check_circle");
    }

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnEstado").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", "true");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class", "form-line focused");
}
function buscarPaises(){
    $.ajax({
        url:getUrl() + "paises/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais("+rs.id+",'"+rs.pais_descrpcion+"')\">"+rs.pais_descrpcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaPaises").html(lista);
        $("#listaPaises").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionPais(id, pais_descrpcion) {
    $("#pais_id").val(id);
    $("#pais_descrpcion").val(pais_descrpcion);
    $("#listaPaises").html("").attr("style", "display:none;");

    // Limpiar ciudad y nacionalidad al cambiar de país
    $("#ciudad_id").val("");
    $("#ciu_descripcion").val("");
    $("#nacionalidad_id").val("");
    $("#nacio_descripcion").val("");

    // Auto-rellenar nacionalidad del país
    $.ajax({ url: getUrl() + 'nacionalidad/por-pais/' + id, method: 'GET', dataType: 'json' })
    .done(function(res) {
        $("#nacionalidad_id").val(res.id);
        $("#nacio_descripcion").val(res.nacio_descripcion);
    });
}

function buscarCiudades(){
    var paisId = $("#pais_id").val();
    var url = paisId
        ? getUrl() + 'ciudades/por-pais/' + paisId
        : getUrl() + 'ciudades/read';

    $.ajax({ url: url, method: "GET", dataType: "json" })
    .done(function(resultado){
        var q = $("#ciu_descripcion").val().toLowerCase();
        var filtrado = resultado.filter(function(c) {
            return !q || c.ciu_descripcion.toLowerCase().indexOf(q) >= 0;
        });
        var lista = "<ul class=\"list-group\">";
        for (var rs of filtrado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciu_descripcion.replace(/'/g,"\\'")+"')\">"+rs.ciu_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaCiudades").html(lista);
        $("#listaCiudades").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionCiudad(id, ciu_descripcion) {
    $("#ciudad_id").val(id);  // Asegúrate de que el campo hidden exista
    $("#ciu_descripcion").val(ciu_descripcion);

    $("#listaCiudades").html("");
    $("#listaCiudades").attr("style", "display:none;");
}

function buscarNacionalidades(){
    $.ajax({
        url:getUrl() + "nacionalidad/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionNacionalidad("+rs.id+",'"+rs.nacio_descripcion+"');\">"+rs.nacio_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaNacionalidades").html(lista);
        $("#listaNacionalidades").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionNacionalidad(id,nacio_descripcion){
    $("#nacionalidad_id").val(id);
    $("#nacio_descripcion").val(nacio_descripcion);

    $("#listaNacionalidades").html("");
    $("#listaNacionalidades").attr("style","display:none;");
}

function grabar() {
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) {
        cambiarEstado();
        return;
    }

    if (op !== 3) {
        var razon = $("#prov_razonsocial").val().trim();
        var ruc   = $("#prov_ruc").val().trim();
        if (!razon || !ruc) {
            swal('Error', 'Razón social y RUC son obligatorios.', 'error');
            return;
        }
        var CHARS_INVALIDOS = /[*<>{}|]/;
        if (CHARS_INVALIDOS.test(razon)) {
            swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
            return;
        }
    }

    var endpoint = "proveedores/create";
    var metodo = "POST";
    if (op === 2) {
        endpoint = "proveedores/update/" + $("#id").val();
        metodo = "PUT";
    }
    if (op === 3) {
        endpoint = "proveedores/delete/" + $("#id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl() + "" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'prov_razonsocial': $("#prov_razonsocial").val(), 
            'prov_ruc': $("#prov_ruc").val(),
            'prov_telefono': $("#prov_telefono").val(),
            'prov_direccion': $("#prov_direccion").val(),
            'prov_correo': $("#prov_correo").val(),
            'pais_id': $("#pais_id").val(),
            'ciudad_id': $("#ciudad_id").val(),
            'nacionalidad_id': $("#nacionalidad_id").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function() {
            if(resultado.tipo == "success") {
                location.reload(true);
            }
        });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) {
                $.each(res.errors, function(k, v){ msg += (Array.isArray(v) ? v[0] : v) + '\n'; });
            } else {
                msg = res && res.message ? res.message : 'Verifique los campos ingresados.';
            }
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 409) {
            swal('No se puede eliminar', res && res.mensaje ? res.mensaje : 'El registro está siendo utilizado en otra parte del sistema.', 'error');
        } else if (xhr.status === 404) {
            swal('No encontrado', 'El registro seleccionado no existe.', 'error');
        } else {
            swal('Error', res && res.mensaje ? res.mensaje : 'Ocurrió un error inesperado. Intente nuevamente.', 'error');
        }
    });
}

function confirmarCambioEstado() {
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEstado").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function cambiarEstado() {
    var id = $("#id").val();
    $.ajax({
        url: getUrl() + 'proveedores/estado/' + id,
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

