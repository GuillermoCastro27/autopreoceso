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
                title:'Listado de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Compras'
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
function cancelar() {
    location.reload(true);
}

// Prepara el formulario para agregar una nueva compra.
function agregar() {
    $("#txtOperacion").val(1); // Indica operación de agregar
    $("#id").val(0); // Resetea el campo ID
    $("#comp_intervalo_fecha_vence").attr("disabled", "true");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").attr("disabled", "true");
    $("#ordencompra").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");
}

// Prepara el formulario para editar una compra existente.
function editar() {
    $("#txtOperacion").val(2); // Indica operación de editar
    $("#comp_intervalo_fecha_vence").removeAttr("disabled");
    $("#comp_fecha").removeAttr("disabled");
    $("#comp_estado").removeAttr("disabled");
    $("#comp_cant_cuota").removeAttr("disabled");
    $("#condicion_pago").removeAttr("disabled");
    $("#ordencompra").removeAttr("disabled");
    $("#emp_razon_social").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

// Prepara el formulario para eliminar una compra.
function eliminar() {
    $("#txtOperacion").val(3); // Indica operación de eliminar

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// Prepara el formulario para confirmar una compra.
function confirmar() {
    $("#txtOperacion").val(4); // Indica operación de confirmar

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnEliminar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}
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
        titulo = "CONFIRMAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===5){
        titulo = "RECHAZAR";
        pregunta = "¿DESEA RECHAZAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR EL REGISTRO SELECCIONADO?";
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
function mensajeOperacion(titulo, mensaje, tipo) {
    swal(titulo, mensaje, tipo);
}

// Lista los registros de compra mediante una solicitud AJAX
function listar() { 
    $.ajax({
        url: getUrl() + "compras/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionCompra(" + rs.id + "," + rs.proveedor_id + "," + rs.empresa_id + "," + rs.sucursal_id + "," + rs.orden_compra_cab_id + ",'" + rs.emp_razon_social + "','" + rs.suc_razon_social + "','" + rs.ordencompra + "','" + rs.comp_intervalo_fecha_vence + "','" + rs.comp_fecha + "','" + rs.comp_estado + "','" + rs.comp_cant_cuota + "','" + rs.encargado + "','" + rs.prov_razonsocial + "','" + rs.prov_ruc + "','" + rs.prov_telefono + "','" + rs.prov_correo + "');\">";
            lista += "<td>" + rs.id + "</td>";  // Código de la orden de compra
            lista += "<td>" + rs.comp_intervalo_fecha_vence + "</td>";  // Intervalo de fecha de vencimiento
            lista += "<td>" + rs.comp_fecha + "</td>";  // Fecha
            lista += "<td>" + rs.ordencompra + "</td>";  // Presupuesto
            lista += "<td>" + rs.encargado + "</td>";  // Encargado
            lista += "<td>" + rs.comp_cant_cuota + "</td>";  // Cantidad de cuota
            lista += "<td>" + rs.comp_estado + "</td>";  // Estado
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
function seleccionCompra(id_compra_cab, proveedor_id,empresa_id, sucursal_id, orden_compra_cab_id, emp_razon_social, suc_razon_social, ordencompra, comp_intervalo_fecha_vence, comp_fecha, comp_estado, comp_cant_cuota, encargado, prov_razonsocial, prov_ruc, prov_telefono, prov_correo) {
    $("#id").val(id_compra_cab);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#orden_compra_cab_id").val(orden_compra_cab_id);
    $("#proveedor_id").val(proveedor_id);
    $("#comp_intervalo_fecha_vence").val(comp_intervalo_fecha_vence);
    $("#comp_fecha").val(comp_fecha);
    $("#comp_cant_cuota").val(comp_cant_cuota);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#ordencompra").val(ordencompra);
    $("#comp_estado").val(comp_estado);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#encargado").val(encargado);  // Aquí autocompletas el encargado
    
    // Mostrar y ocultar secciones según sea necesario
    $("#registros").attr("style", "display:none;");

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

    if(ord_comp_estado === "CONFIRMADO"){
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        $("#btnConfirmar").attr("disabled","true");

        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
    
}
function buscarOrdenCompra() {
    $.ajax({
        url: getUrl() + "ordencompracab/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "user_id":$("#user_id").val(),
            "name":$("#ordencompra").val()
        }
    })
    .done(function(resultado) {
        console.log("Resultados encontrados:", resultado);
        var lista = "<ul class=\"list-group\">";
        for (var rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionOrdenCompra("+rs.orden_compra_cab_id+","+rs.empresa_id+","+rs.sucursal_id+", '"+rs.ordencompra+"',"+rs.proveedor_id+", '"+rs.prov_razonsocial+"', '"+rs.prov_ruc+"', '"+rs.prov_telefono+"', '"+rs.prov_correo+"', '"+rs.suc_razon_social+"', '"+rs.emp_razon_social+"', '"+rs.ord_comp_intervalo_fecha_vence+"', '"+rs.ord_comp_cant_cuota+"', '"+rs.condicion_pago+"')\">"+rs.ordencompra+"</li>";   
        }
        lista += "</ul>";
        $("#listaOrdenCompra").html(lista);
        $("#listaOrdenCompra").attr("style", "display:block; position: absolute; z-index: 2000;");
    })    
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la búsqueda:", textStatus, errorThrown);
    });
}
function seleccionOrdenCompra(orden_compra_cab_id, empresa_id, sucursal_id, ordencompra, proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, suc_razon_social, emp_razon_social,ord_comp_intervalo_fecha_vence,ord_comp_cant_cuota,condicion_pago) {
    // Asigna valores a los campos correspondientes
    $("#orden_compra_cab_id").val(orden_compra_cab_id);
    $("#ordencompra").val(ordencompra);
    $("#comp_intervalo_fecha_vence").val(ord_comp_intervalo_fecha_vence);
    $("#comp_cant_cuota").val(ord_comp_cant_cuota);
    $("#condicion_pago").val(condicion_pago);

    // Autocompletar los campos del proveedor
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial); // Razon social del proveedor
    $("#prov_ruc").val(prov_ruc);                 // RUC del proveedor
    $("#prov_telefono").val(prov_telefono);       // Teléfono del proveedor
    $("#prov_correo").val(prov_correo);           // Correo del proveedor

    // Autocompletar campos de empresa y sucursal
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#suc_razon_social").val(suc_razon_social); // Razon social de la sucursal
    $("#emp_razon_social").val(emp_razon_social); // Razon social de la empresa

    // Limpiar lista de orden de compra
    $("#listaOrdenCompra").html("");
    $("#listaOrdenCompra").attr("style", "display:none;");

    // Marcar los campos como "focused"
    $(".form-line").attr("class", "form-line focused");
}


// Realiza operaciones de creación, edición, anulación y confirmación de una compra
function grabar() {
    var endpoint = "compras/create";
    var metodo = "POST";
    var estado = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "compras/update/" + $("#id").val();
        metodo = "PUT";
    }
    if ($("#txtOperacion").val() == 3) {
        endpoint = "compras/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if ($("#txtOperacion").val() == 4) {
        endpoint = "compras/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            'id': $("#id").val(),
            'comp_intervalo_fecha_vence': $("#comp_intervalo_fecha_vence").val(),
            'comp_fecha': $("#comp_fecha").val(),
            'comp_estado': estado,
            'comp_cant_cuota': $("#comp_cant_cuota").val(),
            'condicion_pago': $("#condicion_pago").val(),
            'user_id': $("#user_id").val(), // Asumiendo que tienes un campo para el ID de usuario
            'orden_compra_cab_id': $("#orden_compra_cab_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val()
        }
    })
    .done(function(resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                if(resultado.registro.comp_estado!="PENDIENTE"){
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
function buscarEmpresas() {
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        
        // Comprobar si hay empresas en el resultado
        if (resultado.length > 0) {
            // Seleccionar automáticamente la primera empresa
            var primeraEmpresa = resultado[0];
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telefono, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telefono, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telefono").val(emp_telefono);
    $("#emp_correo").val(emp_correo);

    $("#listaEmpresa").html("");
    $("#listaEmpresa").attr("style", "display:none;");
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

// Inicializa el campo de fecha
function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
