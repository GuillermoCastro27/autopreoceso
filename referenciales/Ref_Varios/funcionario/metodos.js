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
    $("#fun_nom").removeAttr("disabled");
    $("#fun_apellido").removeAttr("disabled");
    $("#fun_direccion").removeAttr("disabled");
    $("#fun_telefono").removeAttr("disabled");
    $("#fun_correo").removeAttr("disabled");
    $("#fun_ci").removeAttr("disabled");
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
    $("#fun_nom").removeAttr("disabled");
    $("#fun_apellido").removeAttr("disabled");
    $("#fun_direccion").removeAttr("disabled");
    $("#fun_telefono").removeAttr("disabled");
    $("#fun_correo").removeAttr("disabled");
    $("#fun_ci").removeAttr("disabled");
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
        url:"http://127.0.0.1:8000/Proyecto_tp/funcionario/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionFuncionario("+rs.id+","+rs.pais_id+","+rs.ciudad_id+","+rs.nacionalidad_id+",'"+rs.fun_nom+"','"+rs.fun_apellido+"','"+rs.fun_direccion+"','"+rs.fun_telefono+"','"+rs.fun_correo+"','"+rs.fun_ci+"','"+rs.pais_descrpcion+"','"+rs.ciu_descripcion+"','"+rs.nacio_descripcion+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_nom;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_apellido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_direccion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_telefono;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_correo;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_ci;
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

function seleccionFuncionario(id,ciudad_id,pais_id,nacionalidad_id,pais_descrpcion,ciu_descripcion,nacio_descripcion, fun_nom, fun_apellido, fun_direccion, fun_telefono, fun_correo, fun_ci){
    $("#id").val(id);
    $("#ciudad_id").val(ciudad_id);
    $("#pais_id").val(pais_id);
    $("#nacionalidad_id").val(nacionalidad_id);
    $("#pais_descrpcion").val(pais_descrpcion);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#nacio_descripcion").val(nacio_descripcion);
    $("#fun_nom").val(fun_nom);
    $("#fun_apellido").val(fun_apellido);
    $("#fun_direccion").val(fun_direccion);
    $("#fun_telefono").val(fun_telefono);
    $("#fun_correo").val(fun_correo);
    $("#fun_ci").val(fun_ci);

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
    var endpoint = "funcionario/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "funcionario/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "funcionario/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'fun_nom': $("#fun_nom").val(), 
            'fun_apellido': $("#fun_apellido").val(),
            'fun_direccion': $("#fun_direccion").val(),
            'fun_telefono': $("#fun_telefono").val(),
            'fun_correo': $("#fun_correo").val(),
            'fun_ci': $("#fun_ci").val(),
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