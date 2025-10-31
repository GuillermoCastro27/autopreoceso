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
                title:'Listado de Clientes'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Clientes'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Clientes'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Clientes'
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
    $("#cli_nombre").removeAttr("disabled");
    $("#cli_apellido").removeAttr("disabled");
    $("#cli_ruc").removeAttr("disabled");
    $("#cli_telefono").removeAttr("disabled");
    $("#cli_direccion").removeAttr("disabled");
    $("#cli_correo").removeAttr("disabled");
    $("#pais_descrpcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#nacio_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#cli_nombre").removeAttr("disabled");
    $("#cli_apellido").removeAttr("disabled");
    $("#cli_ruc").removeAttr("disabled");
    $("#cli_telefono").removeAttr("disabled");
    $("#cli_direccion").removeAttr("disabled");
    $("#cli_correo").removeAttr("disabled");
    $("#pais_descrpcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#nacio_descripcion").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/Proyecto_tp/clientes/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCliente("+rs.id+","+rs.pais_id+","+rs.ciudad_id+","+rs.nacionalidad_id+",'"+rs.cli_nombre+"','"+rs.cli_apellido+"','"+rs.cli_ruc+"','"+rs.cli_telefono+"','"+rs.cli_direccion+"','"+rs.cli_correo+"','"+rs.pais_descrpcion+"','"+rs.ciu_descripcion+"','"+rs.nacio_descripcion+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_apellido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_telefono;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_direccion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_correo;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pais_descrpcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciu_descripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nacio_descripcion;
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

function seleccionCliente(id, ciudad_id,pais_id,nacionalidad_id,pais_descrpcion,ciu_descripcion,nacio_descripcion,cli_nombre, cli_apellido, cli_ruc, cli_telefono, cli_direccion, cli_correo){
    $("#id").val(id);
    $("#ciudad_id").val(ciudad_id);
    $("#pais_id").val(pais_id);
    $("#nacionalidad_id").val(nacionalidad_id);
    $("#pais_descrpcion").val(pais_descrpcion);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#nacio_descripcion").val(nacio_descripcion);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_correo").val(cli_correo);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").removeAttr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}
function buscarPaises(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/paises/read",
        method:"GET",
        dataType: "json",
        data: {
            'pais_descrpcion': $("#pais_descrpcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais("+rs.id+",'"+rs.pais_descrpcion+"');\">"+rs.pais_descrpcion+"</li>";
        }
        lista += "</ul>";
        $("#listaPaises").html(lista);
        $("#listaPaises").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionPais(id,descri){
    $("#pais_id").val(id);
    $("#pais_descrpcion").val(descri);

    $("#listaPaises").html("");
    $("#listaPaises").attr("style","display:none;");
}
function buscarCiudades(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/ciudades/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciu_descripcion+"')\">"+rs.ciu_descripcion+"</li>";   
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
        url:"http://127.0.0.1:8000/Proyecto_tp/nacionalidad/read",
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

function grabar(){
    var endpoint = "clientes/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "clientes/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "clientes/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'cli_nombre': $("#cli_nombre").val(), 
            'cli_apellido': $("#cli_apellido").val(),
            'cli_ruc': $("#cli_ruc").val(),
            'cli_direccion': $("#cli_direccion").val(),
            'cli_telefono': $("#cli_telefono").val(),
            'cli_correo': $("#cli_correo").val(),
            'ciudad_id': $("#ciudad_id").val(),
            'pais_id': $("#pais_id").val(),
            'nacionalidad_id': $("#nacionalidad_id").val()
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
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}