cargarUserIdLogueado();
listar();
campoFecha();
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
                title:'Listado de Pedidos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del START al END de un total de TOTAL registros',
            sInfoFiltered: '(filtrado de entre MAX registros)',
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
    $("#prom_cab_fecha_registro").removeAttr("disabled");
    $("#prom_cab_fecha_inicio").removeAttr("disabled");
    $("#prom_cab_fecha_fin").removeAttr("disabled");
    $("#prom_cab_nombre").removeAttr("disabled");
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#prom_cab_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);
    $("#prom_cab_fecha_registro").removeAttr("disabled");
    $("#prom_cab_fecha_inicio").removeAttr("disabled");
    $("#prom_cab_fecha_fin").removeAttr("disabled");
    $("#prom_cab_nombre").removeAttr("disabled");
    $("#tipo_prom_nombre").removeAttr("disabled");
    $("#prom_cab_observaciones").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    buscarEmpresas();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

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
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIRMAR";
        pregunta="¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
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
        url: getUrl() + "promocionescab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (let rs of resultado) {
            lista += "<tr class=\"item-list\" onclick=\"seleccionPromocion(" 
                + rs.id + ", " 
                + rs.empresa_id + ", "
                + rs.sucursal_id + ", "
                + rs.user_id + ", "
                + rs.tipo_promociones_id + ", '"
                + rs.emp_razon_social + "', '"
                + rs.suc_razon_social + "', '"
                + rs.name + "', '"
                + rs.prom_cab_nombre + "', '"
                + rs.prom_cab_observaciones + "', '"
                + rs.prom_cab_fecha_registro + "', '"
                + rs.prom_cab_fecha_inicio + "', '"
                + rs.prom_cab_fecha_fin + "', '"
                + rs.prom_cab_estado + "', '"
                + rs.tipo_prom_nombre + "', '"
                + rs.tipo_prom_modo + "', '"
                + rs.tipo_prom_valor + "');\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.emp_razon_social + "</td>";
            lista += "<td>" + rs.suc_razon_social + "</td>";
            lista += "<td>" + rs.prom_cab_nombre + "</td>";
            lista += "<td>" + rs.name + "</td>";
            lista += "<td>" + rs.prom_cab_fecha_registro + "</td>";
            lista += "<td>" + rs.prom_cab_fecha_inicio + "</td>";
            lista += "<td>" + rs.prom_cab_fecha_fin + "</td>";
            lista += "<td>" + rs.prom_cab_estado + "</td>";
            lista += "<td>" + rs.tipo_prom_nombre + "</td>";
            lista += "<td>" + rs.prom_cab_observaciones + "</td>";
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

function seleccionPromocion(
    id, empresa_id, sucursal_id, user_id, tipo_promociones_id,
    emp_razon_social, suc_razon_social, encargado,
    prom_cab_nombre, prom_cab_observaciones,
    prom_cab_fecha_registro, prom_cab_fecha_inicio, prom_cab_fecha_fin,
    prom_cab_estado, tipo_prom_nombre,tipo_prom_modo,tipo_prom_valor
) {
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#user_id").val(user_id);
    $("#tipo_promociones_id").val(tipo_promociones_id);

    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#name").val(encargado);
    $("#prom_cab_nombre").val(prom_cab_nombre);
    $("#prom_cab_observaciones").val(prom_cab_observaciones);
    $("#prom_cab_fecha_registro").val(prom_cab_fecha_registro);
    $("#prom_cab_fecha_inicio").val(prom_cab_fecha_inicio);
    $("#prom_cab_fecha_fin").val(prom_cab_fecha_fin);
    $("#prom_cab_estado").val(prom_cab_estado);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);
    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);

    // Muestra/oculta paneles
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").hide();

    listarDetalles(); // Si tuvieras detalles relacionados

    // Botones
    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnEliminar, #btnConfirmar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (prom_cab_estado === "PENDIENTE") {
        $("#btnEliminar, #btnConfirmar, #btnEditar").prop("disabled", false);
        $("#formDetalles").show();
    }

    if (prom_cab_estado === "CONFIRMADO") {
        $("#btnEliminar").prop("disabled", false);
    }

    $(".form-line").addClass("focused");
}

function grabar(){
    var observaciones = $("#prom_cab_observaciones").val().trim();
    var nombre = $("#prom_cab_nombre").val().trim();
    var fecha = $("#prom_cab_fecha_registro").val().trim();
    var fechaInicio = $("#prom_cab_fecha_inicio").val().trim();
    var fechaFin = $("#prom_cab_fecha_fin").val().trim();
    var sucursal = $("#suc_razon_social").val().trim();

    // Validar campos vacíos
    if (observaciones === "" ||nombre === "" || fecha === "" || fechaInicio === "" || fechaFin === "" || sucursal === "") {
        swal({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            type: "error"
        });
        return; 
    }

    var endpoint = "promocionescab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "promocionescab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "promocionescab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "promocionescab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'prom_cab_observaciones': $("#prom_cab_observaciones").val(), 
            'prom_cab_nombre': $("#prom_cab_nombre").val(), 
            'prom_cab_fecha_registro': $("#prom_cab_fecha_registro").val(),  
            'prom_cab_fecha_inicio': $("#prom_cab_fecha_inicio").val(),
            'prom_cab_fecha_fin': $("#prom_cab_fecha_fin").val(),
            'user_id': $("#user_id").val(), 
            'prom_cab_estado': estado,
            'tipo_promociones_id': $("#tipo_promociones_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
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
                $("#id").val(resultado.registro.id);
                $("#detalle").attr("style","display:block;");
                
                // 🔄 Recarga si NO es pendiente o si es actualización
                if(resultado.registro.prom_cab_estado!="PENDIENTE" || $("#txtOperacion").val()==2){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
function formatearNumero(valor) {
    if (valor === null || valor === undefined || valor === '') return '0,00';
    // Si ya es número, úsalo; si es string, intenta limpiarlo y convertirlo
    var num = Number(valor);
    if (isNaN(num)) {
        num = parseNumero(String(valor));
    }
    // formateo en estilo español: separador de miles '.' y decimal ','
    try {
        return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
        // fallback manual si no soporta toLocaleString con opciones
        var parts = (Math.round(num * 100) / 100).toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(',');
    }
}

// Convierte una cadena formateada (ej: "1.234,56" o "1234.56") a Number
function parseNumero(str) {
    if (str === null || str === undefined || str === '') return 0;
    if (typeof str === 'number') return str;
    var s = String(str).trim();
    s = s.replace(/\s+/g, ''); // quitar espacios
    var hasComma = s.indexOf(',') !== -1;
    var hasDot = s.indexOf('.') !== -1;

    if (hasComma && hasDot) {
        // asumimos: '.' = miles, ',' = decimal  ->  "1.234.567,89" -> "1234567.89"
        s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma && !hasDot) {
        // asumimos ',' = decimal -> "1234,56" -> "1234.56"
        s = s.replace(',', '.');
    } else {
        // sólo '.' o ninguno -> ya ok ("1234.56" o "1234")
    }

    // eliminar todo lo que no sea número, signo o punto decimal
    s = s.replace(/[^0-9\.-]/g, '');
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
}
function agregarDetalle() {
    $("#txtOperacionDetalle").val(1);
    $("#item_decripcion").removeAttr("disabled");
    $("#prom_det_cantidad").removeAttr("disabled"); 
    $("#prom_det_costo").attr("disabled","true");

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#prom_det_cantidad").removeAttr("disabled"); 
    $("#prom_det_costo").attr("disabled","true");

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function grabarDetalle(){

    var endpoint = "promociones_det/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "promociones_det/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "promociones_det/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "promociones_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
        "original_item_id": $("#original_item_id").val(),
        "prom_det_cantidad":$("#prom_det_cantidad").val(),
        "prom_det_costo":$("#prom_det_costo").val()
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
$("#tip_imp_nom").val("");
$("#prom_det_cantidad").val("");
$("#prom_det_costo").val("");
}

function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscarItem",
        method: "POST",
        dataType: "json",
        data: {
            "item_decripcion": $("#item_decripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (let rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("
                + rs.item_id + ",'"
                + rs.item_decripcion + "',"
                + rs.tipo_impuesto_id + ",'"
                + rs.item_costo + "','"
                + rs.tip_imp_nom + "',"
                + rs.tipo_imp_tasa + ")\">"
                + rs.item_decripcion + "</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a, b, c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion,tipo_impuesto_id,item_costo,tip_imp_nom,tipo_imp_tasa){
    // Asignar valores a los campos del detalle
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#prom_det_costo").val(item_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

     const cantidad = parseFloat($("#prom_det_cantidad").val()) || 0;
    const costo = parseFloat(item_costo) || 0;
    const tasaImpuesto = parseFloat(tipo_imp_tasa) || 0;

    const subtotal = cantidad * costo;
    const totalConImpuesto = subtotal + (subtotal * (tasaImpuesto / 100));

    $("#subtotal").val(subtotal);
    $("#totalConImpuesto").val(totalConImpuesto);

    // Ocultar lista de productos y enfocar formulario
    $("#listaProductos").html("").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var TotalGral = 0;          // Total comprobante (sin IVA)
    var TotalIVA = 0;           // Total IVA

    $.ajax({
        url: getUrl() + "promociones_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.prom_det_cantidad) || 0;
                const costo = parseFloat(rs.prom_det_costo) || 0;
                const subtotal = cantidad * costo;

                let iva = 0;
                if (rs.tip_imp_nom === "IVA10") {
                    iva = subtotal / 11;
                } else if (rs.tip_imp_nom === "IVA5") {
                    iva = subtotal / 21;
                }

                // Generar fila
                lista += "<tr class='item-list' onclick=\"seleccionSolicitudDet("
                    + rs.item_id + ", '"
                    + rs.item_decripcion + "', "
                    + cantidad + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tip_imp_nom + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(costo) + "</td>";
                lista += "<td>" + rs.tip_imp_nom + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(subtotal) + "</td>";
                lista += "<td class='text-right'>" + formatearNumero(iva) + "</td>";
                lista += "</tr>";

                cantidadDetalle++;
                TotalGral += subtotal;
                TotalIVA += iva;
            }

            $("#tableDetalle").html(lista);
        } else {
            $("#tableDetalle").html("<tr><td colspan='8' class='text-center'>No se encontraron detalles.</td></tr>");
        }

        // Actualizar totales en el pie
        $("#txtTotalGral").text(formatearNumero(TotalGral));
        $("#txtTotalConImpuesto").text(formatearNumero(TotalIVA));

        // Activar o desactivar Confirmar
        if ($("#prom_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionSolicitudDet(item_id, item_decripcion, prom_det_cantidad, prom_det_costo, tipo_impuesto_id, tip_imp_nom) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#prom_det_cantidad").val(prom_det_cantidad);
    $("#prom_det_costo").val(prom_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Calcular subtotal y IVA para mostrar en el formulario si quieres
    const subtotal = prom_det_cantidad * prom_det_costo;
    let iva = 0;
    if (tip_imp_nom === "IVA10") {
        iva = subtotal / 11;
    } else if (tip_imp_nom === "IVA5") {
        iva = subtotal / 21;
    }

    $("#subtotal").val(formatearNumero(subtotal));
    $("#iva").val(formatearNumero(iva));

    $(".form-line").attr("class","form-line focused");
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
            seleccionEmpresa(primeraEmpresa.id, primeraEmpresa.emp_razon_social, primeraEmpresa.emp_direccion, primeraEmpresa.emp_telef, primeraEmpresa.emp_correo);
        }
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionEmpresa(id, emp_razon_social, emp_direccion, emp_telef, emp_correo) {
    $("#empresa_id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#emp_direccion").val(emp_direccion);
    $("#emp_telef").val(emp_telef);
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
function buscarTipoPromociones(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/tipo-promociones/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoProm("+rs.tipo_promociones_id+",'"+rs.tipo_prom_nombre+"','"+rs.tipo_prom_modo+"','"+rs.tipo_prom_valor+"');\">"+rs.tipo_prom_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaTipoProm").html(lista);
        $("#listaTipoProm").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionTipoProm(tipo_promociones_id,tipo_prom_nombre,tipo_prom_modo,tipo_prom_valor){
    $("#tipo_promociones_id").val(tipo_promociones_id);
    $("#tipo_prom_nombre").val(tipo_prom_nombre);
    $("#tipo_prom_modo").val(tipo_prom_modo);
    $("#tipo_prom_valor").val(tipo_prom_valor);

    $("#listaTipoProm").html("");
    $("#listaTipoProm").attr("style","display:none;");
}
function cargarUserIdLogueado() {
    try {
        const datosSesion = JSON.parse(sessionStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.id) {
            $('#user_id').val(datosSesion.user.id);
            console.log('User ID cargado exitosamente:', datosSesion.user.id);
        } else {
            console.error('No se encontraron datos de sesión válidos');
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}