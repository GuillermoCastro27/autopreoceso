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
                title:'Modelos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Modelos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Modelos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Modelos'
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
    $("#txtNom").removeAttr("disabled");
    $("#mar_nom").attr("disabled","true");
    $("#modelo_tipo").removeAttr("disabled");
    $("#modelo_año").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#txtNom").removeAttr("disabled");
    $("#mar_nom").removeAttr("disabled");
    $("#modelo_tipo").removeAttr("disabled");
    $("#modelo_año").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEstado").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function confirmarCambioEstado() {
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
        var estado = $("#modelo_estado").val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
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
        url:getUrl() + "modelo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        console.log(resultado); 
        var lista = "";
        for(rs of resultado){
            var estado = rs.modelo_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionModelo("+rs.id+","+rs.marca_id+",'"+rs.mar_nom+"','"+rs.modelo_nom+"','"+rs.modelo_tipo+"','"+rs.modelo_año+"','"+estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.mar_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.modelo_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.modelo_tipo;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.modelo_año;
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
function seleccionModelo(codigo, marca_id, mar_nom, modelo_nom, modelo_tipo, modelo_año, estado){
    $("#txtCodigo").val(codigo);
    $("#marca_id").val(marca_id);
    $("#mar_nom").val(mar_nom);
    $("#txtNom").val(modelo_nom);
    $("#modelo_tipo").val(modelo_tipo);
    $("#modelo_año").val(modelo_año);
    $("#modelo_estado").val(estado || 'activo');

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
function buscarMarcas() {
    let texto = $("#mar_nom").val();
    let tipo = $("#modelo_tipo").val();

    if (tipo === "") {
        $("#listaMarcas").html("<div class='list-group-item'>Seleccione el tipo de modelo primero</div>").show();
        return;
    }

    $.ajax({
        url: getUrl() + "marca/buscarPorTipo",
        method: "POST",
        data: { texto: texto, tipo: tipo },
        dataType: "json"
    })
    .done(function(resultado) {
        let lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron marcas</li>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <li class="list-group-item"
                        onclick="seleccionMarca(${rs.id}, '${rs.mar_nom}', '${rs.mar_tipo}')">
                        ${rs.mar_nom}
                    </li>
                `;
            }
        }

        lista += "</ul>";
        $("#listaMarcas").html(lista).show().css({position:"absolute", zIndex:2000});
    });
}
function seleccionMarca(id,mar_nom){
    $("#marca_id").val(id);
    $("#mar_nom").val(mar_nom);

    $("#listaMarcas").html("");
    $("#listaMarcas").attr("style","display:none;");
}
function habilitarMarca() {
    let tipo = $("#modelo_tipo").val();

    // Si no seleccionó nada
    if (tipo === "") {
        $("#mar_nom").prop("disabled", true);
        $("#mar_nom").val("");
        $("#marca_id").val("");
        $("#listaMarcas").hide();

        // Deshabilitar también modelo año
        $("#modelo_año").prop("disabled", true).val("");

        return;
    }

    // Si seleccionó algún tipo → habilitar MARCA
    $("#mar_nom").prop("disabled", false);
    $("#mar_nom").val("");
    $("#marca_id").val("");
    $("#listaMarcas").hide();

    // 🔹 Control específico para VEHÍCULO
    if (tipo === "VEHICULO") {
        $("#modelo_año").prop("disabled", false); // habilitar
    } else {
        $("#modelo_año").prop("disabled", true).val(""); // deshabilitar y limpiar
    }
}


function grabar(){
    var op = parseInt($("#txtOperacion").val());

    if (op === 4) { cambiarEstado(); return; }

    var descripcion = $("#txtNom").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var CHARS_INVALIDOS = /[*<>{}|]/;
    if (CHARS_INVALIDOS.test(descripcion)) {
        swal('Caracteres no permitidos', 'El campo no puede contener los caracteres: * < > { } |', 'error');
        return;
    }

    var endpoint = "modelo/create";
    var metodo = "POST";
    if(op==2){
        endpoint = "modelo/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    // op===3 removed — use cambiarEstado() for state toggle
    $.ajax({
        url:getUrl() + ""+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'modelo_nom': $("#txtNom").val(), 
            'modelo_tipo': $("#modelo_tipo").val(), 
            'modelo_año': $("#modelo_año").val(), 
            'marca_id': $("#marca_id").val()
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
            swal('Error', 'Este modelo está en uso y no puede ser eliminado.', 'error');
        } else {
            swal('Error', res ? (res.mensaje || res.message || 'Error inesperado.') : 'Error inesperado.', 'error');
        }
        console.log(xhr.responseText);
    })
}

function cambiarEstado() {
    var id = $("#txtCodigo").val();
    $.ajax({
        url: getUrl() + 'modelo/estado/' + id,
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
