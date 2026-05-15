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
                title:'Listado de Usuarios'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Usuarios'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Usuarios'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Usuarios'
            }
        ],
        iDisplayLength:25,
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
    $("#name").removeAttr("disabled");
    $("#login").removeAttr("disabled");
    $("#email").removeAttr("disabled");
    $("#perfil_desc").removeAttr("disabled");
    $("#fun_nombre_completo").removeAttr("disabled");
    $("#two_factor_enabled").prop("checked", true);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#name").removeAttr("disabled");
    $("#login").removeAttr("disabled");
    $("#email").removeAttr("disabled");
    $("#perfil_desc").removeAttr("disabled");
    $("#fun_nombre_completo").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    let id = $("#txtCodigo").val();

    if(id == 0 || id === ""){
        swal("Error", "Debe seleccionar un usuario.", "error");
        return;
    }

    swal({
        title: "¿Está seguro?",
        text: "El usuario será eliminado del sistema.",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }, function(confirmado){
        if(confirmado){
            $.ajax({
                url: getUrl() + "users/" + id,
                method: "DELETE",
                dataType: "json"
            })
            .done(function(resultado){
                swal("Correcto", resultado.mensaje, resultado.tipo, function(){
                    location.reload(true);
                });
            })
            .fail(function(xhr){
                let r = xhr.responseJSON;
                swal("Error", r?.mensaje ?? "No se pudo eliminar.", "error");
            });
        }
    });
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
        url: getUrl() + "users/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        let lista = "";

        resultado.forEach(rs => {
            let perfilDesc  = rs.perfil ? rs.perfil.pref_descripcion : 'SIN PERFIL';
            let funId       = rs.funcionario ? rs.funcionario.id : "";
            let funNombre   = rs.funcionario ? (rs.funcionario.fun_nom + ' ' + rs.funcionario.fun_apellido).replace(/'/g, "\\'") : "";
            let nombreMostrar = rs.funcionario ? (rs.funcionario.fun_nom + ' ' + rs.funcionario.fun_apellido) : rs.name;

            lista += `<tr class="item-list" onclick="seleccionUsuario(${rs.id},'${rs.name}','${rs.login}','${rs.email}',${rs.perfil_id ?? 0},'${perfilDesc}',${rs.two_factor_enabled ? 1 : 0},'${funId}','${funNombre}')">
                    <td>${rs.id}</td>
                    <td>${nombreMostrar}</td>
                    <td>${rs.login}</td>
                    <td>${rs.email}</td>
                    <td>${perfilDesc}</td>
                </tr>`;
        });

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr){
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar el listado de usuarios.', 'error');
    });
}

function seleccionUsuario(id, name, login, email, perfil_id, pref_descripcion, two_factor_enabled, fun_id, fun_nombre){
    $("#txtCodigo").val(id);
    $("#name").val(name);
    $("#login").val(login);
    $("#email").val(email);

    $("#perfil_id").val(perfil_id);
    $("#perfil_desc").val(pref_descripcion);
    $("#two_factor_enabled").prop("checked", two_factor_enabled == 1);

    $("#funcionario_id").val(fun_id || "");
    $("#fun_nombre_completo").val(fun_nombre || "");

    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").removeAttr("disabled");
    $("#btnEliminar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    $("#password").val("");
    $(".form-line").addClass("focused");
}
function buscarPerfil(){
    let texto = $("#perfil_desc").val().trim();

    if(texto.length < 1){
        $("#listaPerfil").hide().html("");
        return;
    }

    $.ajax({
        url: getUrl() + "perfiles/buscar",
        method: "GET",
        dataType: "json",
        data: { q: texto }
    })
    .done(function(resultado){
        let lista = "";

        if(resultado.length === 0){
            lista = `<a class="list-group-item">No se encontraron perfiles</a>`;
        }else{
            resultado.forEach(p => {
                lista += `
                    <a href="#"
                       class="list-group-item list-group-item-action"
                       onclick="seleccionarPerfil(${p.id}, '${p.pref_descripcion}')">
                        ${p.pref_descripcion}
                    </a>
                `;
            });
        }

        $("#listaPerfil").html(lista)
                         .show()
                         .css({position:"absolute", zIndex:2000});
    })
    .fail(function(){
        $("#listaPerfil").hide();
    });
}
function seleccionarPerfil(id, descripcion){
    $("#perfil_id").val(id);
    $("#perfil_desc").val(descripcion);
    $("#listaPerfil").hide().html("");
    $(".form-line").addClass("focused");
}

function buscarFuncionario(){
    let texto = $("#fun_nombre_completo").val().trim();
    if(texto.length < 1){ $("#listaFuncionarios").hide().html(""); return; }

    $.ajax({
        url: getUrl() + "funcionario/buscar",
        method: "GET",
        dataType: "json",
        data: { q: texto }
    })
    .done(function(resultado){
        let lista = resultado.length === 0
            ? `<a class="list-group-item">No se encontraron funcionarios</a>`
            : resultado.map(f => `<a href="#" class="list-group-item list-group-item-action"
                  onclick="seleccionarFuncionario(${f.id},'${(f.fun_nombre_completo || '').replace(/'/g,"\\'")}')">
                  ${f.fun_nombre_completo}
              </a>`).join('');
        $("#listaFuncionarios").html(lista).show().css({position:"absolute", zIndex:2000});
    })
    .fail(function(){ $("#listaFuncionarios").hide(); });
}

function seleccionarFuncionario(id, nombre){
    $("#funcionario_id").val(id);
    $("#fun_nombre_completo").val(nombre);
    $("#listaFuncionarios").hide().html("");
    $(".form-line").addClass("focused");
}

function limpiarFuncionario(){
    $("#funcionario_id").val("");
    $("#fun_nombre_completo").val("");
    $("#listaFuncionarios").hide().html("");
}

function grabar() {

    let operacion = $("#txtOperacion").val();

    let name      = $("#name").val().trim();
    let login     = $("#login").val().trim();
    let email     = $("#email").val().trim();
    let perfil_id = $("#perfil_id").val();
    let password  = $("#password").val();

    // ===============================
    // VALIDACIONES BÁSICAS
    // ===============================
    if(name === "" || login === "" || email === ""){
        swal("Error", "Todos los campos obligatorios deben ser completados.", "error");
        return;
    }

    if(perfil_id === "" || perfil_id == 0){
        swal("Error", "Debe seleccionar un perfil.", "error");
        return;
    }

    // Password obligatorio solo al crear
    if(operacion == 1 && password === ""){
        swal("Error", "La contraseña es obligatoria para crear el usuario.", "error");
        return;
    }

    // ===============================
    // ARMAR DATA
    // ===============================
    let datos = {
        name               : name,
        login              : login,
        email              : email,
        perfil_id          : perfil_id,
        two_factor_enabled : $('#two_factor_enabled').is(':checked') ? 1 : 0,
        funcionario_id     : $("#funcionario_id").val() || null
    };

    // Solo enviar password si fue escrito
    if(password !== ""){
        datos.password = password;
    }

    // ===============================
    // ENDPOINT Y MÉTODO
    // ===============================
    let endpoint = "users/create";
    let metodo   = "POST";

    if(operacion == 2){
        endpoint = "users/update/" + $("#txtCodigo").val();
        metodo   = "PUT";
    }

    // ===============================
    // AJAX
    // ===============================
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: datos
    })
    .done(function(resultado){
        swal({
            title: "Correcto",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){
            if(resultado.tipo === "success"){
                location.reload(true);
            }
        });
    })
    .fail(function(xhr){
        let respuesta = xhr.responseJSON;

        if(xhr.status === 422){
            let errores = "";
            $.each(respuesta.errors, function(key, value){
                errores += value + "\n";
            });
            swal("Error de validación", errores, "error");

        }else if(xhr.status === 404){
            swal("Error", respuesta.mensaje, "error");

        }else if(xhr.status === 409){
            swal("Advertencia", respuesta.mensaje, "warning");

        }else{
            swal("Error", "Ocurrió un error inesperado.", "error");
        }

        console.log(xhr.responseText);
    });
}
