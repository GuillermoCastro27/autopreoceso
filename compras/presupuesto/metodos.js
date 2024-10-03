// Función para cargar la lista de presupuestos al cargar la página.
listar();
// Función para configurar el formato de fecha en ciertos campos.
campoFecha();
// Configura el formato de la tabla para exportar en diferentes formatos
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
                title:'Listado de Presupuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Presupuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Presupuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Presupuestos'
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
 // Función para recargar la página y cancelar operaciones.
function cancelar(){
    location.reload(true);
}

// Prepara el formulario para agregar un nuevo presupuesto.
function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#pre_vence").removeAttr("disabled");
    $("#pre_observaciones").removeAttr("disabled");
    $("#prov_razonsocial").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

// Prepara el formulario para editar un presupuesto existente.
function editar(){
    $("#txtOperacion").val(2);
    $("#pre_vence").removeAttr("disabled");
    $("#ped_pbservaciones").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

// Prepara el formulario para eliminar un presupuesto.
function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para confirmar un presupuesto.
function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para rechazar un presupuesto.
function rechazar(){
    $("#txtOperacion").val(5);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");


    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para aprobar un presupuesto.
function aprobar(){
    $("#txtOperacion").val(6);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");                              
}

// Muestra un cuadro de diálogo para confirmar la operación antes de realizarla.
function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIMRAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===5){
        titulo = "RECHAZAR";
        pregunta = "¿DESEA RECHAZAR EL PRESUPUESTO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR EL PRESUPUESTO SELECCIONADO?";
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
// Muestra un mensaje de operación con SweetAlert.
function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}

// Obtiene y muestra la lista de presupuestos mediante una solicitud AJAX.
function listar(){
    $.ajax({
        url:getUrl()+"presupuesto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPresupuesto("+rs.id+",'"+rs.pre_vence+"','"+rs.pre_observaciones+"','"+rs.pre_estado+"',"+rs.proveedor_id+",'"+rs.prov_razonsocial+"','"+rs.prov_ruc+"','"+rs.prov_telefono+"','"+rs.prov_correo+"',"+rs.pedido_id+",'"+rs.pedido+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_vence;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_observaciones;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.name;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nro_pedido;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

// Rellena el formulario con los datos de un presupuesto seleccionado.
function seleccionPresupuesto(id,pre_vence,pre_observaciones,pre_estado,proveedor_id,prov_razonsocial,prov_ruc,prov_telefono,prov_correo,pedido_id,pedido){
    $("#id").val(id);
    $("#pre_observaciones").val(pre_observaciones);
    $("#pre_estado").val(pre_estado);
    $("#pre_vence").val(pre_vence);
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#pedido_id").val(pedido_id);
    $("#pedido").val(pedido);


    $("#registros").attr("style","display:none;");
    $("#detalle").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");
    
    $("#btnCancelar").removeAttr("disabled");

    if(pre_estado === "PENDIENTE"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }


    if(pre_estado === "CONFIRMADO"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}

// Realiza operaciones de creación, edición, eliminación, confirmación, rechazo o aprobación de un presupuesto.
function grabar(){
    var endpoint = "presupuesto/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "presupuesto/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "presupuesto/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "presupuesto/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    if($("#txtOperacion").val()==5){
        endpoint = "presupuesto/rechazar/"+$("#id").val();
        metodo = "PUT";
        estado = "RECHAZADO";
    }
    if($("#txtOperacion").val()==6){
        endpoint = "presupuesto/aprobar/"+$("#id").val();
        metodo = "PUT";
        estado = "APROBADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'pre_vence': $("#pre_vence").val(), 
            'pre_observaciones': $("#pre_observaciones").val(), 
            'user_id': $("#user_id").val(),  
            'proveedor_id': $("#proveedor_id").val(),  
            'pedido_id': $("#pedido_id").val(),
            'pre_estado': estado,
            'operacion': $("#txtOperacion").val()
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
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                listarDetalles();
                if(resultado.registro.pre_estado!="PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart:1
    });
}

// Prepara el formulario para agregar un nuevo detalle al presupuesto.
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    //$("#item_decripcion").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para editar un detalle existente del presupuesto
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    //$("#item_decripcion").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para eliminar un detalle del presupuesto.
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Realiza operaciones de creación, edición o eliminación de detalles del presupuesto.
function grabarDetalle(){
    var endpoint = "presupuestos-detalles/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "presupuestos-detalles/update/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "presupuestos-detalles/delete/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "presupuesto_id":$("#id").val(),
            "item_id":$("#item_id").val(),
            "det_cantidad":$("#det_cantidad").val(),
            "det_costo":$("#det_costo").val()
        }
    })
    .done(function(respuesta){
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })

    window.location.reload();

    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").val("");
    $("#det_cantidad").val("");
    $("#det_costo").val("");
}

// Realiza una búsqueda de productos y muestra los resultados.
function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "item_decripcion":$("#item_decripcion").val(),
            "tipo_descripcion":"PRODUCTO"
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_decripcion+"')\">"+rs.item_decripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

// Obtiene y muestra la lista de detalles de un presupuesto mediante una solicitud AJAX.
function listarDetalles(){
    var cantidadDetalle = 0;
    var TotalGral=0;
    $.ajax({
        url:getUrl()+"presupuestos-detalles/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.item_id+",'"+rs.item_decripcion+"',"+rs.det_cantidad+","+rs.det_costo+");\">";
                lista = lista + "<td>";
                lista = lista + rs.item_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_decripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.det_cantidad;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + rs.det_costo;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + (rs.det_cantidad*rs.det_costo);
                lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
            TotalGral+= (rs.det_cantidad*rs.det_costo);
        }
        $("#tableDetalle").html(lista);
        $("#txtTotalGral").text(TotalGral);
        if($("#pre_estado").val()=== "PENDIENTE" && cantidadDetalle>0){
            $("#btnConfirmar").removeAttr("disabled",);
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

// Rellena el formulario con los datos de un detalle seleccionado.
function seleccionDetalle(item_id,item_decripcion,det_cantidad,det_costo){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#det_costo").val(det_costo);
}

// Realiza una búsqueda de proveedores y muestra los resultados.
function buscarProveedores(){
    $.ajax({
        url: getUrl()+"proveedores/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "prov_razonsocial":$("#prov_razonsocial").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedor("+rs.proveedor_id+",'"+rs.prov_razonsocial+"','"+rs.prov_ruc+"','"+rs.prov_telefono+"','"+rs.prov_correo+"')\">"+rs.prov_razonsocial+" - "+rs.prov_ruc+"</li>";   
        }
        lista += "</ul>";
        $("#listaProveedores").html(lista);
        $("#listaProveedores").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el formulario con los datos de un proveedor seleccionado.
function seleccionProveedor(proveedor_id,prov_razonsocial,prov_ruc,prov_telefono,prov_correo){
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    $("#listaProveedores").html("");
    $("#listaProveedores").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

// Realiza una búsqueda de pedidos y muestra los resultados.
function buscarPedidos(){
    $.ajax({
        url: getUrl()+"pedidos/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "user_id":$("#user_id").val(),
            "name":$("#pedido").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPedido("+rs.pedido_id+",'"+rs.pedido+"')\">"+rs.pedido+"</li>";   
        }
        lista += "</ul>";
        $("#listaPedidos").html(lista);
        $("#listaPedidos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el formulario con los datos de un pedido seleccionado.
function seleccionPedido(pedido_id,pedido){
    $("#pedido_id").val(pedido_id);
    $("#pedido").val(pedido);

    $("#listaPedidos").html("");
    $("#listaPedidos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}