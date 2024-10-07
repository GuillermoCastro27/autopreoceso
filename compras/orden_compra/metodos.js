// Lista los registros de pedidos utilizando DataTables
listar();
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
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ordenes de Compras'
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
    $("#ord_comp_intervalo_fecha_vence").removeAttr("disabled");
    $("#ord_comp_fecha").removeAttr("disabled");
    $("#ord_comp_cant_cuota").removeAttr("disabled");
    $("#presupuestos").removeAttr("disabled");
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

// Prepara el formulario para editar un presupuesto existente.
function editar(){
    $("#txtOperacion").val(2);
    $("#ord_comp_intervalo_fecha_vence").removeAttr("disabled");
    $("#ord_comp_fecha").removeAttr("disabled");
    $("#ord_comp_cant_cuota").removeAttr("disabled");
    $("#presupuestos").removeAttr("disabled");
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");

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
        titulo = "ELIMINAR";
        pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIMRAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
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

// Obtiene y muestra la lista de pedidos mediante una solicitud AJAX.
function listar() { 
    $.ajax({
        url: getUrl() + "ordencompracab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionOrdenCompra(" + rs.id + "," + rs.empresa_id + "," + rs.sucursal_id + "," + rs.presupuesto_id + ",'" + rs.emp_razon_social + "','" + rs.suc_razon_social + "','" + rs.presupuesto + "','" + rs.ord_comp_intervalo_fecha_vence + "','" + rs.ord_comp_fecha + "','" + rs.ord_comp_estado + "','" + rs.ord_comp_cant_cuota + "','" + rs.encargado + "','" + rs.prov_razonsocial + "','" + rs.prov_ruc + "','" + rs.prov_telefono + "','" + rs.prov_correo + "');\">";
            lista += "<td>" + rs.id + "</td>";  // Código de la orden de compra
            lista += "<td>" + rs.ord_comp_intervalo_fecha_vence + "</td>";  // Intervalo de fecha de vencimiento
            lista += "<td>" + rs.ord_comp_fecha + "</td>";  // Fecha
            lista += "<td>" + rs.presupuesto + "</td>";  // Presupuesto
            lista += "<td>" + rs.encargado + "</td>";  // Encargado
            lista += "<td>" + rs.ord_comp_cant_cuota + "</td>";  // Cantidad de cuota
            lista += "<td>" + rs.ord_comp_estado + "</td>";  // Estado
            lista += "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

// Rellena el formulario con los datos de un pedido seleccionado.
function seleccionOrdenCompra(id_orde_compra_cab, empresa_id, sucursal_id, presupuesto_id, emp_razon_social, suc_razon_social, presupuesto, ord_comp_intervalo_fecha_vence, ord_comp_fecha, ord_comp_estado, ord_comp_cant_cuota, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo) {
    $("#id").val(id_orde_compra_cab);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#presupuesto_id").val(presupuesto_id);
    $("#ord_comp_intervalo_fecha_vence").val(ord_comp_intervalo_fecha_vence);
    $("#ord_comp_fecha").val(ord_comp_fecha);
    $("#ord_comp_cant_cuota").val(ord_comp_cant_cuota);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#presupuestos").val(presupuesto);
    $("#ord_comp_estado").val(ord_comp_estado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#encargado").val(encargado);  // Aquí autocompletas el encargado
    
    // Mostrar y ocultar secciones según sea necesario
    $("#registros").attr("style", "display:none;");
    $("#detalle").attr("style", "display:block;");
    $("#formDetalles").attr("style", "display:none;");
    listarDetalles();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    
    $("#btnCancelar").removeAttr("disabled");

    if(ord_comp_estado === "PENDIENTE"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    $(".form-line").attr("class","form-line focused");
}

// Realiza operaciones de creación, edición, anulacion y confirmación de un pedido
function grabar() {
    var endpoint = "ordencompracab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    // Lógica para cambiar el endpoint y el método según la operación
    if ($("#txtOperacion").val() == 2) {
        endpoint = "ordencompracab/update/" + $("#id").val();
        metodo = "PUT";
    } else if ($("#txtOperacion").val() == 3) {
        endpoint = "ordencompracab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    } else if ($("#txtOperacion").val() == 4) {
        endpoint = "ordencompracab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    // Verificación del valor de presupuesto_id
    var presupuestoId = $("#presupuesto_id").val();
    console.log("Presupuesto ID:", presupuestoId); // Imprimir el valor

    if (!presupuestoId || presupuestoId == "0") {
        alert("El ID del presupuesto es obligatorio.");
        return; // Detener el envío si el presupuesto_id no es válido
    }

    // Verificar el valor del proveedor_id antes de enviar
    var proveedorId = $("#proveedor_id").val();
    console.log("Proveedor ID:", proveedorId); // Verificar el valor del proveedor_id

    if (!proveedorId || proveedorId == "0") {
        alert("El ID del proveedor es obligatorio.");
        return; // Detener el envío si el proveedor_id no es válido
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'ord_comp_intervalo_fecha_vence': $("#ord_comp_intervalo_fecha_vence").val(), 
            'ord_comp_fecha': $("#ord_comp_fecha").val(), 
            'ord_comp_cant_cuota': $("#ord_comp_cant_cuota").val(), 
            'user_id': $("#user_id").val(), 
            'presupuesto_id': presupuestoId, 
            'proveedor_id': proveedorId, // Asegúrate de que se esté enviando correctamente
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'ord_comp_estado': estado,
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function() {
            if (resultado.tipo == "success") {
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style", "display:block;");
                if (resultado.registro.ord_comp_estado != "PENDIENTE") {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a, b, c) {
        alert(c);
        console.log(a.responseText); // Mostrar error en la consola
    });
}




// Configura el formato de fecha en ciertos campos usando BootstrapMaterialDatePicker.
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

// Prepara el formulario para agregar un nuevo detalle al pedido
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").removeAttr("disabled");
    $("#orden_compra_det_cantidad").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para editar un detalle existente del pedido
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#orden_compra_det_cantidad").removeAttr("disabled");
    $("#tip_imp_nom").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Prepara el formulario para eliminar un detalle del pedido.
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

// Realiza operaciones de creación, edición o eliminación de detalles del pedido.
function grabarDetalle(){
    var endpoint = "ordencompradet/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "ordencompradet/update/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "ordencompradet/delete/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "orden_compra_cab_id":$("#id").val(),
            "item_id":$("#item_id").val(),
            "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
            "orden_compra_det_cantidad":$("#orden_compra_det_cantidad").val()
        }
    })
    .done(function(respuesta){
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
    
    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").val("");
    $("#orden_compra_det_cantidad").val("");
    $("#tip_imp_nom").val("");
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

function buscarTipoImpuestos(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-impuesto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoImpuestos("+rs.id+",'"+rs.tip_imp_nom+"','"+rs.tipo_imp_tasa+"');\">"+rs.tip_imp_nom+","+rs.tipo_imp_tasa+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoImpuestos").html(lista);
        $("#listaTipoImpuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionTipoImpuestos(id,tip_imp_nom,tipo_imp_tasa){
    $("#tipo_impuesto_id").val(id);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#tipo_imp_tasa").val(tipo_imp_tasa);

    $("#listaTipoImpuestos").html("");
    $("#listaTipoImpuestos").attr("style","display:none;");
}

// Realiza una búsqueda de productos mediante una solicitud AJAX
function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"ordencompradet/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(let rs of resultado){  // Asegúrate de usar "let" en lugar de "var" o simplemente "rs"
            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.item_id+","+rs.tipo_impuesto_id+",'"+rs.item_decripcion+"','"+rs.tip_imp_nom+"',"+rs.orden_compra_det_cantidad+");\">"; 
                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td>" + rs.tip_imp_nom + "</td>";
                lista += "<td>" + rs.orden_compra_det_cantidad + "</td>";
            lista += "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalle").html(lista);
        if($("#ord_comp_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("style","display:none");
        }
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}


// Selecciona un detalle de un pedido y actualiza el formulario
function seleccionDetalle(item_id, tipo_impuesto_id, item_decripcion, tip_imp_nom, orden_compra_det_cantidad){
    $("#item_id").val(item_id);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#item_decripcion").val(item_decripcion);
    $("#tip_imp_nom").val(tip_imp_nom);
    $("#orden_compra_det_cantidad").val(orden_compra_det_cantidad);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function buscarPresupuesto(){
    $.ajax({
        url: getUrl()+"presupuesto/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "user_id":$("#user_id").val(),
            "name":$("#presupuesto").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPresupuesto("+rs.presupuesto_id+", '"+rs.presupuesto+"', "+rs.proveedor_id+", '"+rs.prov_razonsocial+"', '"+rs.prov_ruc+"', '"+rs.prov_telefono+"', '"+rs.prov_correo+"')\">"+rs.presupuesto+"</li>";   
        }
        lista += "</ul>";
        $("#listaPresupuesto").html(lista);
        $("#listaPresupuesto").attr("style", "display:block; position: absolute; z-index: 2000;");
    })    
}

function seleccionPresupuesto(presupuesto_id, presupuesto, proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo) {
    $("#presupuesto_id").val(presupuesto_id);
    $("#presupuestos").val(presupuesto);

    // Autocompletar el proveedor
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial); // Aquí debe ir la razón social
    $("#prov_ruc").val(prov_ruc); // Aquí debe ir el RUC
    $("#prov_telefono").val(prov_telefono); // Aquí debe ir el teléfono
    $("#prov_correo").val(prov_correo); // Aquí debe ir el correo

    $("#listaPresupuesto").html("");
    $("#listaPresupuesto").attr("style", "display:none;");

    $(".form-line").attr("class", "form-line focused");
}

function buscarEmpresas(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/empresa/read",
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
function buscarSucursal(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.empresa_id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionSucursal(empresa_id,suc_razon_social,suc_direccion,suc_telefono,suc_correo){
    $("#sucursal_id").val(empresa_id);
    $("#suc_razon_social").val(suc_razon_social);
    $("#suc_direccion").val(suc_direccion);
    $("#suc_telefono").val(suc_telefono);
    $("#suc_correo").val(suc_correo);

    $("#listaSucursal").html("");
    $("#listaSucursal").attr("style","display:none;");
}