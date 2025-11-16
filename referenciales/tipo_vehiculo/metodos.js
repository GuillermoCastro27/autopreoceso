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
    $("#modelo_nom").removeAttr("disabled");

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
    $("#modelo_nom").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-vehiculo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoVehiculo("+rs.tipo_vehiculo_id+","+rs.marca_id+","+rs.modelo_id+",'"+rs.tip_veh_nombre+"','"+rs.tip_veh_capacidad+"','"+rs.tip_veh_combustible+"','"+rs.tip_veh_categoria+"','"+rs.tip_veh_observacion+"','"+rs.marc_nom+"','"+rs.modelo_nom+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.tipo_vehiculo_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.marca_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.modelo_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tip_veh_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tip_veh_capacidad;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tip_veh_combustible;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tip_veh_categoria;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tip_veh_observacion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.marc_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.modelo_nom;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoVehiculo(codigo,marca_id,modelo_id, tipo_veh_nombre,
     tipo_veh_capacidad, tipo_veh_combustible, tipo_veh_categoria,
      tipo_veh_observacion, marc_nom, modelo_nom){
    $("#txtCodigo").val(codigo);
    $("#tipo_veh_nombre").val(tipo_veh_nombre);
    $("#tipo_veh_capacidad").val(tipo_veh_capacidad);
    $("#tipo_veh_combustible").val(tipo_veh_combustible);
    $("#tipo_veh_categoria").val(tipo_veh_categoria);
    $("#tipo_veh_observacion").val(tipo_veh_observacion);
    $("#marc_nom").val(marc_nom);
    $("#modelo_nom").val(modelo_nom);
    $("#marca_id").val(marca_id);
    $("#modelo_id").val(modelo_id);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}
function buscarMarcas() {
    let texto = $("#marc_nom").val();

    $.ajax({
        url: "http://127.0.0.1:8000/Proyecto_tp/marca/buscarPorTipo",
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
function seleccionMarca(id,marc_nom){
    $("#marca_id").val(id);
    $("#marc_nom").val(marc_nom);

    $("#listaMarcas").html("");
    $("#listaMarcas").attr("style","display:none;");
}
function grabar(){
    var descripcion = $("#tipo_serv_nombre").val().trim();

    // Validar que el campo descripción no esté vacío
    if (descripcion === "") {
        swal({
            title: "Error",
            text: "El campo no debe estar vacío.",
            type: "error"
        });
        return;  // Salir de la función si la validación falla
    }
    var endpoint = "tipo-servicio/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "tipo-servicio/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "tipo-servicio/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipo_serv_nombre': $("#tipo_serv_nombre").val()
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
    .fail(function(a) {
        // Manejar el error de respuesta personalizada del servidor
        try {
            var response = JSON.parse(a.responseText);  // Intentamos obtener la respuesta JSON
            if (response.mensaje.includes("ya existe")) {
                // Mostrar mensaje específico para el error de duplicado
                swal({
                    title: "Error",
                    text: "Error: El registro ya existe",
                    type: "error"
                });
            } else {
                // Mostrar cualquier otro error personalizado
                swal({
                    title: "Error",
                    text: response.mensaje,
                    type: "error"
                });
            }
        } catch (e) {
            // Si no es JSON, mostrar el error genérico
            swal({
                title: "Error",
                text: "El registro ya existe",
                type: "error"
            });
        }
    });
}