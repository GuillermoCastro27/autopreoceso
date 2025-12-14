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
    $("#rec_cli_cab_fecha").removeAttr("disabled");
    $("#rec_cli_cab_fecha_inicio").removeAttr("disabled");
    $("#rec_cli_cab_fecha_fin").removeAttr("disabled");
    $("#rec_cli_cab_observacion").removeAttr("disabled");
    $("#rec_cli_cab_prioridad").removeAttr("disabled");
    $("#suc_razon_social").removeAttr("disabled");
    $("#cli_nombre").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
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
    
    $("#rec_cli_cab_fecha").removeAttr("disabled");
    $("#rec_cli_cab_fecha_inicio").removeAttr("disabled");
    $("#rec_cli_cab_fecha_fin").removeAttr("disabled");
    $("#rec_cli_cab_observacion").removeAttr("disabled");
    $("#rec_cli_cab_prioridad").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#cli_nombre").attr("disabled","true")

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
        url: getUrl() + "reclamoclicab/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        // ✅ Escapa strings de forma segura para meter en onclick
        const q = (v) => JSON.stringify((v ?? "").toString());

        let lista = "";

        resultado.forEach(rs => {

            lista += `
                <tr class="item-list" onclick='seleccionReclamo(
                    ${rs.id || 0},
                    ${rs.empresa_id || 0},
                    ${rs.sucursal_id || 0},
                    ${rs.clientes_id || 0},

                    ${q(rs.emp_razon_social)},
                    ${q(rs.suc_razon_social)},
                    ${q(rs.rec_cli_cab_fecha)},
                    ${q(rs.rec_cli_cab_fecha_inicio)},
                    ${q(rs.rec_cli_cab_fecha_fin)},

                    ${q(rs.cli_nombre)},
                    ${q(rs.cli_apellido)},
                    ${q(rs.cli_ruc)},
                    ${q(rs.cli_direccion)},
                    ${q(rs.cli_telefono)},
                    ${q(rs.cli_correo)},

                    ${q(rs.rec_cli_cab_prioridad)},
                    ${q(rs.rec_cli_cab_estado)},
                    ${q(rs.encargado)},
                    ${q(rs.rec_cli_cab_observacion)}
                )'>
                    <td>${rs.id || ""}</td>
                    <td>${rs.emp_razon_social || ""}</td>
                    <td>${rs.suc_razon_social || ""}</td>
                    <td>${rs.rec_cli_cab_fecha || ""}</td>
                    <td>${rs.cli_nombre || ""}</td>
                    <td>${rs.cli_apellido || ""}</td>
                    <td>${rs.cli_ruc || ""}</td>
                    <td>${rs.rec_cli_cab_prioridad || ""}</td>
                    <td>${rs.rec_cli_cab_estado || ""}</td>
                    <td>${rs.encargado || ""}</td>
                    <td>${rs.rec_cli_cab_observacion || ""}</td>
                </tr>
            `;
        });

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionReclamo(
    id,
    empresa_id,
    sucursal_id,
    clientes_id,

    emp_razon_social,
    suc_razon_social,
    rec_cli_cab_fecha,
    rec_cli_cab_fecha_inicio,
    rec_cli_cab_fecha_fin,

    cli_nombre,
    cli_apellido,
    cli_ruc,
    cli_direccion,
    cli_telefono,
    cli_correo,

    prioridad,
    estado,
    encargado,
    observacion
) {
    // 🔹 IDs
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#clientes_id").val(clientes_id);

    // 🔹 Empresa / Sucursal
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // 🔹 Fecha reclamo
    $("#rec_cli_cab_fecha").val(rec_cli_cab_fecha);
    $("#rec_cli_cab_fecha_inicio").val(rec_cli_cab_fecha_inicio);
    $("#rec_cli_cab_fecha_fin").val(rec_cli_cab_fecha_fin);

    // 🔹 Cliente
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    // 🔹 Reclamo
    $("#rec_cli_cab_prioridad").val(prioridad);
    $("#rec_cli_cab_estado").val(estado);
    $("#rec_cli_cab_observacion").val(observacion);

    // 🔹 Encargado (solo visual si lo usás)
    $("#encargado").val(encargado);

    // 🔹 Vistas
    $("#registros").hide();
    $("#detalle").show();
    $("#formDetalles").show();

    // 🔹 Botones
    $("#btnAgregar, #btnGrabar").prop("disabled", true);
    $("#btnCancelar").prop("disabled", false);

    if (estado === "PENDIENTE") {
        $("#btnEditar, #btnEliminar").prop("disabled", false);
    }
    listarDetalles();

    $(".form-line").addClass("focused");
}
function buscarCliente(){
    $.ajax({
        url: getUrl()+"clientes/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "cli_nombre":$("#cli_nombre").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.clientes_id+",'"+rs.cli_nombre+"','"+rs.cli_apellido+"','"+rs.cli_ruc+"','"+rs.cli_direccion+"','"+rs.cli_telefono+"','"+rs.cli_correo+"')\">"+rs.cli_nombre+" - "+rs.cli_apellido+"- "+rs.cli_ruc+"</li>";   
        }
        lista += "</ul>";
        $("#listaClientes").html(lista);
        $("#listaClientes").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el formulario con los datos de un proveedor seleccionado.
function seleccionCliente(clientes_id,cli_nombre,cli_apellido,cli_ruc,cli_direccion,cli_telefono,cli_correo){
    $("#clientes_id").val(clientes_id);
    $("#cli_nombre").val(cli_nombre);
    $("#cli_apellido").val(cli_apellido);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direccion").val(cli_direccion);
    $("#cli_telefono").val(cli_telefono);
    $("#cli_correo").val(cli_correo);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");

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
function grabar() {

    // 🔹 Captura de campos
    var observacion = $("#rec_cli_cab_observacion").val().trim();
    var prioridad   = $("#rec_cli_cab_prioridad").val().trim();
    var fecha        = $("#rec_cli_cab_fecha").val().trim();
    var fechaInicio        = $("#rec_cli_cab_fecha_inicio").val().trim();
    var fechaFin        = $("#rec_cli_cab_fecha_fin").val().trim();
    var sucursalTxt  = $("#suc_razon_social").val().trim();

    // 🔹 Validación mínima (cabecera)
    if (observacion === "" || prioridad === "" || fecha === "" || sucursalTxt === ""|| fechaInicio === ""|| fechaFin === "") {
        swal({
            title: "Error",
            text: "Todos los campos obligatorios deben estar completos.",
            type: "error"
        });
        return;
    }

    // 🔹 Configuración por defecto
    var endpoint = "reclamoclicab/create";
    var metodo   = "POST";
    var estado   = "PENDIENTE";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "reclamoclicab/update/" + $("#id").val();
        metodo = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "reclamoclicab/anular/" + $("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }

    if ($("#txtOperacion").val() == 4) {
        endpoint = "reclamoclicab/confirmar/" + $("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }

    // 🔹 Envío AJAX
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            id: $("#id").val(),

            rec_cli_cab_fecha: $("#rec_cli_cab_fecha").val(),
            rec_cli_cab_fecha_inicio: $("#rec_cli_cab_fecha_inicio").val(),
            rec_cli_cab_fecha_fin: $("#rec_cli_cab_fecha_fin").val(),
            rec_cli_cab_prioridad: $("#rec_cli_cab_prioridad").val(),
            rec_cli_cab_observacion: $("#rec_cli_cab_observacion").val(),
            rec_cli_cab_estado: estado,

            clientes_id: $("#clientes_id").val(),
            empresa_id: $("#empresa_id").val(),
            sucursal_id: $("#sucursal_id").val(),
            user_id: $("#user_id").val(),

            operacion: $("#txtOperacion").val()
        }
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {

            if (resultado.tipo === "success") {

                // 🔹 Asignar ID generado
                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                }

                // 🔹 Mostrar panel de detalle
                $("#detalle").show();
                $("#formDetalles").show();

                // 🔹 Cargar detalles del reclamo
                listarDetalles();

                // 🔄 Recargar si cambia de estado
                if (estado !== "PENDIENTE" || $("#txtOperacion").val() == 2) {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function (xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
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
    $("#tip_imp_nom").attr("disabled","true");
    $("#rec_cli_det_cantidad_stock").attr("disabled","true");
    $("#rec_cli_det_cantidad").removeAttr("disabled"); 
    $("#rec_cli_det_costo").attr("disabled","true"); 

    $("#btnAgregarDetalle").attr("style", "display:none");
    $("#btnEditarDetalle").attr("style", "display:none");
    $("#btnEliminarDetalle").attr("style", "display:none");
    $("#btnGrabarDetalle").attr("style", "display:inline");
}

function editarDetalle() {
    $("#txtOperacionDetalle").val(2);
    $("#item_decripcion").removeAttr("disabled");
    $("#tip_imp_nom").attr("disabled","true");
    $("#rec_cli_det_cantidad_stock").attr("disabled","true");
    $("#rec_cli_det_cantidad").removeAttr("disabled"); 
    $("#rec_cli_det_costo").attr("disabled","true");

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

    var endpoint = "reclamoclidet/create";
    var metodo = "POST";

if($("#txtOperacionDetalle").val()==2){
    endpoint = "reclamoclidet/update/"+$("#id").val();
    metodo = "PUT";
}
if($("#txtOperacionDetalle").val()==3){
    endpoint = "reclamoclidet/delete/"+$("#id").val()+"/"+$("#item_id").val();
    metodo = "DELETE";

}

$.ajax({
    url:getUrl()+endpoint,
    method: metodo,
    dataType: "json",
    data: {
        "reclamo_cli_cab_id":$("#id").val(),
        "item_id":$("#item_id").val(),
        "original_item_id": $("#original_item_id").val(),
        "tipo_impuesto_id":$("#tipo_impuesto_id").val(),
        "rec_cli_det_cantidad":$("#rec_cli_det_cantidad").val(),
        "rec_cli_det_costo":$("#rec_cli_det_costo").val(),
        "rec_cli_det_cantidad_stock":$("#rec_cli_det_cantidad_stock").val()
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
$("#rec_cli_det_cantidad_stock").val("");
$("#rec_cli_det_cantidad").val("");
$("#rec_cli_det_costo").val("");
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
                + rs.tipo_imp_tasa + ","
                + rs.cantidad_disponible + ")\">"
                + rs.item_decripcion + " (Stock: " + rs.cantidad_disponible + ")</li>";   
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
function seleccionProducto(item_id, item_decripcion, tipo_impuesto_id, item_costo, tip_imp_nom, tipo_imp_tasa, cantidad_disponible){
    // Asignar valores a los campos del detalle
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#rec_cli_det_costo").val(item_costo); // <- Asignar el costo al campo del detalle
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);
    
    // Asignar cantidad disponible al campo correspondiente
    $("#rec_cli_det_cantidad_stock").val(cantidad_disponible);

    // Cálculo de subtotal y total con impuesto (opcional)
    const cantidad = parseFloat($("#rec_cli_det_cantidad").val()) || 0;
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
        url: getUrl() + "reclamoclidet/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";

        if (resultado && resultado.length > 0) {
            for (let rs of resultado) {
                const cantidad = parseFloat(rs.rec_cli_det_cantidad) || 0;
                const costo = parseFloat(rs.rec_cli_det_costo) || 0;
                const subtotal = cantidad * costo;

                let iva = 0;
                if (rs.tip_imp_nom === "IVA10") {
                    iva = subtotal / 11;
                } else if (rs.tip_imp_nom === "IVA5") {
                    iva = subtotal / 21;
                }

                // Generar fila
                lista += "<tr class='item-list' onclick=\"seleccionRecepcionDet("
                    + rs.item_id + ", '"
                    + rs.item_decripcion + "', "
                    + cantidad + ", "
                    + rs.rec_cli_det_cantidad_stock + ", "
                    + costo + ", "
                    + rs.tipo_impuesto_id + ", '"
                    + rs.tip_imp_nom + "'"
                    + ");\">";

                lista += "<td>" + rs.item_id + "</td>";
                lista += "<td>" + rs.item_decripcion + "</td>";
                lista += "<td class='text-right'>" + cantidad + "</td>";
                lista += "<td class='text-right'>" + rs.rec_cli_det_cantidad_stock + "</td>";
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
        if ($("#rec_cli_cab_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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

function seleccionRecepcionDet(item_id, item_decripcion, rec_cli_det_cantidad, rec_cli_det_cantidad_stock, rec_cli_det_costo, tipo_impuesto_id, tip_imp_nom) {
    $("#original_item_id").val(item_id);
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);
    $("#rec_cli_det_cantidad").val(rec_cli_det_cantidad);
    $("#rec_cli_det_cantidad_stock").val(rec_cli_det_cantidad_stock);
    $("#rec_cli_det_costo").val(rec_cli_det_costo);
    $("#tipo_impuesto_id").val(tipo_impuesto_id);
    $("#tip_imp_nom").val(tip_imp_nom);

    // Calcular subtotal y IVA para mostrar en el formulario si quieres
    const subtotal = rec_cli_det_cantidad * rec_cli_det_costo;
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



