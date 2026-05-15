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
    $("#tip_veh_nombre").removeAttr("disabled");
    $("#tip_veh_capacidad").removeAttr("disabled");
    $("#tip_veh_combustible").removeAttr("disabled");
    $("#tip_veh_categoria").removeAttr("disabled");
    $("#tip_veh_observacion").removeAttr("disabled");
    $("#marc_nom").removeAttr("disabled");
    $("#modelo_nom").attr("disabled","true");
    $("#modelo_año").attr("disabled","true");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tip_veh_nombre").removeAttr("disabled");
    $("#tip_veh_capacidad").removeAttr("disabled");
    $("#tip_veh_combustible").removeAttr("disabled");
    $("#tip_veh_categoria").removeAttr("disabled");
    $("#tip_veh_observacion").removeAttr("disabled");
    $("#marc_nom").removeAttr("disabled");
    $("#modelo_nom").attr("disabled","true");
    $("#modelo_año").attr("disabled","true");

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

function listar() {
    $.ajax({
        url: getUrl() + "tipo-vehiculo/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {

        var lista = "";
        for (let rs of resultado) {

            lista += `
                <tr class="item-list" 
                    onclick="seleccionTipoVehiculo(
                        ${rs.tipo_vehiculo_id},
                        ${rs.marca_id},
                        ${rs.modelo_id},
                        '${rs.tip_veh_nombre}',
                        '${rs.tip_veh_capacidad}',
                        '${rs.tip_veh_combustible}',
                        '${rs.tip_veh_categoria}',
                        '${rs.tip_veh_observacion}',
                        '${rs.marca_nombre}',
                        '${rs.modelo_nombre}',
                        '${rs.modelo_año}'
                    )">
                    
                    <td>${rs.tipo_vehiculo_id}</td>
                    <td>${rs.tip_veh_nombre}</td>
                    <td>${rs.tip_veh_capacidad}</td>
                    <td>${rs.tip_veh_combustible}</td>
                    <td>${rs.tip_veh_categoria}</td>
                    <td>${rs.tip_veh_observacion}</td>
                    <td>${rs.marca_nombre}</td>
                    <td>${rs.modelo_nombre}</td>
                    <td>${rs.modelo_año}</td>

                </tr>
            `;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a, b, c) {
        alert(c);
    });
}
function seleccionTipoVehiculo(
    codigo, marca_id, modelo_id,
    tip_veh_nombre, tip_veh_capacidad, tip_veh_combustible,
    tip_veh_categoria, tip_veh_observacion,
    marca_nombre, modelo_nombre, modelo_año
) {
    $("#txtCodigo").val(codigo);
    $("#tip_veh_nombre").val(tip_veh_nombre);
    $("#tip_veh_capacidad").val(tip_veh_capacidad);
    $("#tip_veh_combustible").val(tip_veh_combustible);
    $("#tip_veh_categoria").val(tip_veh_categoria);
    $("#tip_veh_observacion").val(tip_veh_observacion);

    $("#marc_nom").val(marca_nombre);
    $("#marca_id").val(marca_id);

    $("#modelo_nom").val(modelo_nombre);
    $("#modelo_id").val(modelo_id);
    $("#modelo_año").val(modelo_año);

    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").removeAttr("disabled");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnGrabar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").addClass("focused");
}

function buscarMarcas() {
    let texto = $("#marc_nom").val();

    $.ajax({
        url: getUrl() + "marca/buscarPorTipo",
        method: "POST",
        data: { 
            texto: texto, 
            tipo: "VEHICULO"  // 👈 SIEMPRE VEHICULO 
        },
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
                        onclick="seleccionMarca(${rs.id}, '${rs.marc_nom}')">
                        ${rs.marc_nom}
                    </li>
                `;
            }
        }

        lista += "</ul>";

        $("#listaMarcas").html(lista)
                         .show()
                         .css({position:"absolute", zIndex:2000});
    });
}
function seleccionMarca(id, marc_nom) {
    $("#marca_id").val(id);
    $("#marc_nom").val(marc_nom);

    // habilitar modelo
    $("#modelo_nom").prop("disabled", false);

    // limpiar modelo y año
    $("#modelo_id").val("");
    $("#modelo_nom").val("");
    $("#modelo_anio").val("");

    $("#listaMarcas").html("").hide();
}
function buscarModelo() {
    let texto = $("#modelo_nom").val();
    let marca_id = $("#marca_id").val();

    if (!marca_id) {
        $("#listaModelos").hide();
        return;
    }

    $.ajax({
        url: getUrl() + "modelo/buscarPorMarca",
        method: "POST",
        data: { 
            texto: texto,
            marca_id: marca_id
        },
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item'>No se encontraron modelos</li>";
        } else {
            for (let rs of resultado) {
                lista += `
                    <li class="list-group-item" 
                        onclick="seleccionModelos(${rs.id}, '${rs.modelo_nom}', '${rs.modelo_año}')">
                        ${rs.modelo_nom} (${rs.modelo_año})
                    </li>
                `;
            }
        }

        lista += "</ul>";

        $("#listaModelos")
            .html(lista)
            .show()
            .css({ position: "absolute", zIndex: 2000 });
    });
}
function seleccionModelos(id, modelo_nom, modelo_año) {
    $("#modelo_id").val(id);
    $("#modelo_nom").val(modelo_nom);

    // MOSTRAR EL AÑO AQUÍ
    $("#modelo_año").val(modelo_año);

    $("#listaModelos").html("").hide();
}
function grabar(){
    var nombre = $("#tip_veh_nombre").val().trim();
    var capacidad = $("#tip_veh_capacidad").val().trim();
    var combustible = $("#tip_veh_combustible").val().trim();
    var categoria = $("#tip_veh_categoria").val().trim();
    var observacion = $("#tip_veh_observacion").val().trim();
    var marca = $("#marc_nom").val().trim();
    var modelo = $("#modelo_nom").val().trim();

    // Validar que el campo descripción no esté vacío
    if (nombre === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (capacidad === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (combustible === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (categoria === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (observacion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (marca === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    if (modelo === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var endpoint = "tipo-vehiculo/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "tipo-vehiculo/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "tipo-vehiculo/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl() + ""+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tip_veh_nombre': $("#tip_veh_nombre").val(), 
            'tip_veh_capacidad': $("#tip_veh_capacidad").val(), 
            'tip_veh_combustible': $("#tip_veh_combustible").val(), 
            'tip_veh_categoria': $("#tip_veh_categoria").val(), 
            'tip_veh_observacion': $("#tip_veh_observacion").val(), 
            'marca_id': $("#marca_id").val(), 
            'modelo_id': $("#modelo_id").val()
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