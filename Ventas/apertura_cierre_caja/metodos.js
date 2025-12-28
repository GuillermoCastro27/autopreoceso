// Cargar user_id del usuario logueado
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

function apertura(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#fecha_apertura").removeAttr("disabled");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").removeAttr("disabled");
    $("#caja_descripcion").removeAttr("disabled");
    $("#monto_apertura").removeAttr("disabled");
    buscarEmpresas();

    $("#btnApertura").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnCierre").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");


}

function editar(){
    $("#txtOperacion").val(2);

    $("#fecha_apertura").attr("disabled","true");
    $("#emp_razon_social").attr("disabled","true");
    $("#suc_razon_social").attr("disabled","true");
    $("#caja_descripcion").removeAttr("disabled");
    $("#monto_apertura").removeAttr("disabled");

    $("#btnApertura").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnCierre").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}


function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnApertura").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnCierre").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function cierre(){
    $("#txtOperacion").val(4);

    $("#btnApertura").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnCierre").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}


function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "APERTURA";
    var pregunta = "¿DESEA GRABAR LA NUEVA APERTURA?";

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CIERRE";
        pregunta="¿DESEA CERRAR EL REGISTRO SELECCIONADO?";
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
        url: getUrl() + "apertura_cierre_caja/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){

        let lista = "";

        for (let rs of resultado) {
console.log("monto_apertura:", rs.monto_apertura);

            lista += `<tr class="item-list"
            onclick="seleccionAperturaCaja(
                ${rs.id},
                '${rs.emp_razon_social}',
                '${rs.suc_razon_social}',
                '${rs.fecha_apertura}',
                '${rs.caja_descripcion}',
                '${rs.estado}',
                '${rs.fecha_cierre}',
                ${rs.monto_apertura},
                ${rs.monto_efectivo_cierre},
                ${rs.monto_tarjeta_cierre},
                ${rs.monto_cheque_cierre},
            )">`;

            lista += `<td>${rs.id}</td>`;
            lista += `<td>${rs.emp_razon_social}</td>`;
            lista += `<td>${rs.suc_razon_social}</td>`;
            lista += `<td>${rs.fecha_apertura}</td>`;
            lista += `<td>${rs.caja_descripcion}</td>`;
            lista += `<td>${rs.estado}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr){
        console.error(xhr.responseText);
        alert("Error al listar aperturas de caja");
    });
}
function seleccionAperturaCaja(
    id,
    emp_razon_social,
    suc_razon_social,
    fecha_apertura,
    caja_descripcion,
    estado,
    fecha_cierre,
    monto_apertura,
    monto_efectivo_cierre,
    monto_tarjeta_cierre,
    monto_cheque_cierre
){
    // =========================
    // DATOS BASE
    // =========================
    $("#id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#fecha_apertura").val(fecha_apertura);
    $("#monto_apertura").val(monto_apertura || 0);
    $("#caja_descripcion").val(caja_descripcion);

    // =========================
    // DATOS DE CIERRE
    // =========================
    $("#fecha_cierre").val(fecha_cierre || "");
    $("#monto_efectivo_cierre").val(monto_efectivo_cierre || 0);
    $("#monto_tarjeta_cierre").val(monto_tarjeta_cierre || 0);
    $("#monto_cheque_cierre").val(monto_cheque_cierre || 0);

    // =========================
    // VISTA
    // =========================
    $("#registros").hide();

    // =========================
    // BOTONES (reset)
    // =========================
    $("#btnApertura, #btnEditar, #btnEliminar, #btnCierre, #btnGrabar")
        .attr("disabled", true);

    $("#btnCancelar").removeAttr("disabled");

    // =========================
    // REGLAS POR ESTADO
    // =========================
    if (estado === "ABIERTA") {

        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnCierre").removeAttr("disabled");

        // limpiar cierre visual
        $("#fecha_cierre").val("");
        $("#monto_efectivo_cierre").val("");
        $("#monto_tarjeta_cierre").val("");
        $("#monto_cheque_cierre").val("");

    } else if (estado === "CERRADA") {

        // solo consulta
        $("#btnCierre").attr("disabled", true);
        calcularMontoCierre();
    }

    $(".form-line").addClass("focused");
}
function calcularMontoCierre() {

    let efectivo = parseFloat($("#monto_efectivo_cierre").val()) || 0;
    let tarjeta  = parseFloat($("#monto_tarjeta_cierre").val()) || 0;
    let cheque   = parseFloat($("#monto_cheque_cierre").val()) || 0;

    let total = efectivo + tarjeta + cheque;

    $("#monto_cierre").val(total.toFixed(2));
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
function buscarCaja(){
    $.ajax({
        url:"http://127.0.0.1:8000/Proyecto_tp/caja/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCaja("+rs.id+",'"+rs.caja_descripcion+"');\">"+rs.caja_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaCaja").html(lista);
        $("#listaCaja").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionCaja(id,caja_descripcion){
    $("#caja_id").val(id);
    $("#caja_descripcion").val(caja_descripcion);

    $("#listaCaja").html("");
    $("#listaCaja").attr("style","display:none;");
}
function grabar(){

    let oper = parseInt($("#txtOperacion").val());

    let endpoint = "";
    let metodo   = "POST";
    let datos    = {};

    // =========================
    // 🟢 APERTURA DE CAJA
    // =========================
    if (oper === 1) {

        let fechaVista = $("#fecha_apertura").val().trim();

        if (!moment(fechaVista, "DD/MM/YYYY HH:mm:ss", true).isValid()) {
            swal("Error", "Formato de fecha inválido.", "error");
            return;
        }

        let fecha = moment(fechaVista, "DD/MM/YYYY HH:mm:ss")
                    .format("YYYY-MM-DD HH:mm:ss");
        let montoApertura = $("#monto_apertura").val().trim();
        let caja  = $("#caja_id").val().trim();
        let suc   = $("#sucursal_id").val().trim();
        let emp   = $("#empresa_id").val().trim();
        let user  = $("#user_id").val().trim();

        if (!fecha || !caja || !suc || !emp || !user) {
            swal("Error", "Todos los campos son obligatorios para abrir caja.", "error");
            return;
        }

        endpoint = "apertura_cierre_caja/create";

        datos = {
            empresa_id: emp,
            sucursal_id: suc,
            caja_id: caja,
            user_id: user,
            fecha_apertura: fecha,
            monto_apertura: montoApertura
        };
    }

    // =========================
    // 🔴 ANULAR APERTURA
    // =========================
    if (oper === 3) {

        let id = $("#id").val();

        if (!id || id === "0") {
            swal("Error", "No hay una apertura seleccionada.", "error");
            return;
        }

        endpoint = "apertura_cierre_caja/anular";

        datos = { id: id };
    }

    // =========================
    // 🔵 CIERRE DE CAJA
    // =========================
    if (oper === 4) {

        let id = $("#id").val();

        if (!id || id === "0") {
            swal("Error", "No hay una caja seleccionada para cerrar.", "error");
            return;
        }

        endpoint = "apertura_cierre_caja/cerrarCaja";
        metodo   = "PUT";

        datos = { id: id };
    }

    if (endpoint === "") {
        swal("Error", "Operación no válida.", "error");
        return;
    }

    // $("#btnGrabar").attr("disabled", true); // opcional

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: datos
    })
    .done(function (resultado) {

        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {
            location.reload(true);
        });

    })
    .fail(function (xhr) {
        console.error(xhr.responseText);
        swal("Error", "No se pudo completar la operación.", "error");
    });
}


function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

// Función para cargar el user_id real del usuario logueado
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