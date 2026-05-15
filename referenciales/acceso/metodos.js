listar();
function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'copy',  text:'COPIAR',   className:'btn btn-primary waves-effect', title:'Listado de Accesos' },
            { extend:'excel', text:'EXCEL',    className:'btn btn-success waves-effect', title:'Listado de Accesos' },
            { extend:'pdf',   text:'PDF',      className:'btn btn-danger waves-effect',  title:'Listado de Accesos' },
            { extend:'print', text:'IMPRIMIR', className:'btn btn-warning waves-effect', title:'Listado de Accesos' }
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
    $("#perfil_desc").removeAttr("disabled");
    $("#mod_nombre").removeAttr("disabled");
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
    $("#perfil_desc").removeAttr("disabled");
    $("#mod_nombre").removeAttr("disabled");
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $(".form-line").attr("class","form-line focused");
}

function desactivar(){
    $("#txtOperacion").val(3);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnDesactivar").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function activar(){
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo   = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    if(oper===2){ titulo = "EDITAR";      pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if(oper===3){ titulo = "DESACTIVAR";  pregunta = "¿DESEA DESACTIVAR EL REGISTRO SELECCIONADO?"; }
    if(oper===4){ titulo = "ACTIVAR";     pregunta = "¿DESEA ACTIVAR EL REGISTRO SELECCIONADO?"; }
    swal({
        title: titulo, text: pregunta, type: "warning",
        showCancelButton: true, confirmButtonColor: "#458E49",
        confirmButtonText: "SI", cancelButtonText: "NO", closeOnConfirm: false
    }, function () { grabar(); });
}

function mensajeOperacion(titulo,mensaje,tipo) { swal(titulo, mensaje, tipo); }

function listar(){
    $.ajax({
        url: getUrl() + "accesos/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista += "<tr class=\"item-list\" onclick=\"seleccionAcceso("
                  + rs.id + ","
                  + rs.permiso_id + ",'"
                  + rs.per_nombre + "',"
                  + rs.perfil_id + ",'"
                  + rs.perfil_desc + "',"
                  + rs.mod_id + ",'"
                  + rs.mod_nombre + "','"
                  + rs.acc_estado + "');\">"
                  + "<td>" + rs.id         + "</td>"
                  + "<td>" + rs.per_nombre  + "</td>"
                  + "<td>" + rs.perfil_desc + "</td>"
                  + "<td>" + rs.mod_nombre  + "</td>"
                  + "<td>" + rs.acc_estado  + "</td>"
                  + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr,b,c){
        if (xhr.status !== 403) alert(c);
    });
}

function seleccionAcceso(codigo, permiso_id, per_nombre, perfil_id, perfil_desc, mod_id, mod_nombre, acc_estado){
    $("#txtCodigo").val(codigo);
    $("#permiso_id").val(permiso_id);
    $("#per_nombre").val(per_nombre);
    $("#perfil_id").val(perfil_id);
    $("#perfil_desc").val(perfil_desc);
    $("#mod_id").val(mod_id);
    $("#mod_nombre").val(mod_nombre);
    $("#acc_estado").val(acc_estado);

    $("#btnAgregar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnDesactivar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");

    if (acc_estado === "PENDIENTE") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnDesactivar").removeAttr("disabled");
        $("#btnActivar").removeAttr("disabled");
    }
    if(acc_estado === "ACTIVO"){
        $("#btnEditar").removeAttr("disabled");
        $("#btnDesactivar").removeAttr("disabled");
    } else if(acc_estado === "INACTIVO"){
        $("#btnActivar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}

function buscarPerfil(){
    let texto = $("#perfil_desc").val().trim();
    if(texto.length < 1){ $("#listaPerfil").hide().html(""); return; }

    $.ajax({
        url: getUrl() + "perfiles/buscar",
        method: "GET",
        dataType: "json",
        data: { q: texto }
    })
    .done(function(resultado){
        let lista = resultado.length === 0
            ? `<a class="list-group-item">No se encontraron perfiles</a>`
            : resultado.map(p => `<a href="#" class="list-group-item list-group-item-action"
                  onclick="seleccionarPerfil(${p.id},'${p.pref_descripcion}')">${p.pref_descripcion}</a>`).join('');
        $("#listaPerfil").html(lista).show().css({position:"absolute", zIndex:2000});
    })
    .fail(function(){ $("#listaPerfil").hide(); });
}

function seleccionarPerfil(id, descripcion){
    $("#perfil_id").val(id);
    $("#perfil_desc").val(descripcion);
    $("#listaPerfil").hide().html("");
    $(".form-line").addClass("focused");
}

function buscarPermisos(){
    let texto = $("#per_nombre").val().trim();
    if(texto.length < 1){ $("#listaPermisos").hide().html(""); return; }

    $.ajax({
        url: getUrl() + "permisos/buscar",
        method: "GET",
        dataType: "json",
        data: { q: texto }
    })
    .done(function(resultado){
        let lista = resultado.length === 0
            ? `<a class="list-group-item">No se encontraron permisos</a>`
            : resultado.map(p => `<a href="#" class="list-group-item list-group-item-action"
                  onclick="seleccionarPermiso(${p.id},'${p.per_nombre}')">${p.per_nombre}</a>`).join('');
        $("#listaPermisos").html(lista).show().css({position:"absolute", zIndex:2000});
    })
    .fail(function(){ $("#listaPermisos").hide(); });
}

function seleccionarPermiso(id, nombre){
    $("#permiso_id").val(id);
    $("#per_nombre").val(nombre);
    $("#listaPermisos").hide().html("");
    $(".form-line").addClass("focused");
}

function buscarModulo(){
    let texto = $("#mod_nombre").val().trim();
    if(texto.length < 1){ $("#listaModulos").hide().html(""); return; }

    $.ajax({
        url: getUrl() + "modulos/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        let filtrado = resultado.filter(m =>
            m.mod_nombre.toLowerCase().includes(texto.toLowerCase())
        );
        let lista = filtrado.length === 0
            ? `<a class="list-group-item">No se encontraron módulos</a>`
            : filtrado.map(m => `<a href="#" class="list-group-item list-group-item-action"
                  onclick="seleccionarModulo(${m.id},'${m.mod_nombre}')">${m.mod_nombre}</a>`).join('');
        $("#listaModulos").html(lista).show().css({position:"absolute", zIndex:2000});
    })
    .fail(function(){ $("#listaModulos").hide(); });
}

function seleccionarModulo(id, nombre){
    $("#mod_id").val(id);
    $("#mod_nombre").val(nombre);
    $("#listaModulos").hide().html("");
    $(".form-line").addClass("focused");
}

function grabar() {
    var permiso_id = $("#permiso_id").val();
    var perfil_id  = $("#perfil_id").val();
    var mod_id     = $("#mod_id").val();
    var acc_estado = $("#acc_estado").val();

    if (permiso_id === "" || permiso_id == 0) { swal("Error", "Debe seleccionar un permiso",  "error"); return; }
    if (perfil_id  === "" || perfil_id  == 0) { swal("Error", "Debe seleccionar un perfil",   "error"); return; }
    if (mod_id     === "" || mod_id     == 0) { swal("Error", "Debe seleccionar un módulo",   "error"); return; }

    var endpoint = "accesos/create";
    var metodo   = "POST";
    if($("#txtOperacion").val() == 2){ endpoint = "accesos/update/"     + $("#txtCodigo").val(); metodo = "PUT"; }
    if($("#txtOperacion").val() == 3){ endpoint = "accesos/desactivar/" + $("#txtCodigo").val(); metodo = "PUT"; }
    if($("#txtOperacion").val() == 4){ endpoint = "accesos/activar/"    + $("#txtCodigo").val(); metodo = "PUT"; }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id:         $("#txtCodigo").val(),
            permiso_id: permiso_id,
            perfil_id:  perfil_id,
            mod_id:     mod_id,
            acc_estado: acc_estado
        }
    })
    .done(function(resultado) {
        swal({ title:"Respuesta", text:resultado.mensaje, type:resultado.tipo }, function(){
            if(resultado.tipo == "success") location.reload(true);
        });
    })
    .fail(function(xhr) {
        if (xhr.status === 403) return;
        var respuesta = xhr.responseJSON;
        if (xhr.status === 422) {
            let errores = "";
            $.each(respuesta.errors, function(k,v){ errores += v + "\n"; });
            swal("Error de validación", errores, "error");
        } else if (xhr.status === 500 && xhr.responseText.includes("SQLSTATE[23503]")) {
            swal("Error", "No se puede eliminar porque está en uso.", "error");
        } else {
            swal("Error", "Ocurrió un error inesperado.", "error");
        }
        console.log(xhr.responseText);
    });
}
