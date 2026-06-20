// Cargar funcionario_id del usuario logueado
cargarFuncionarioIdLogueado();
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
                title:'Apertura/Cierre de Caja'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Apertura/Cierre de Caja'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Apertura/Cierre de Caja'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Apertura/Cierre de Caja'
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
    // Limpiar panel
    $("#select_caja_cierre").val("").html('<option value="">-- Seleccione una caja abierta --</option>');
    $("#cierre_apertura_id").val("");
    $("#cierre_suc_razon_social, #cierre_fecha_apertura").val("");
    $("#cierre_monto_apertura").val("");
    $("#cierre_sistema_efectivo_neto, #cierre_sistema_tarjeta, #cierre_sistema_cheque").val("");
    $("#cierre_sistema_transferencia, #cierre_sistema_qr").val("");
    $("#cierre_efectivo_esperado, #cierre_efectivo_fisico, #cierre_diferencia, #cierre_total_sistema").val("");
    $("#cierre_diferencia").css("background", "").css("color", "");

    // Mostrar panel, ocultar tabla y sección de cierre anterior
    $("#registros").hide();
    $("#seccionDatosCierre").hide();
    $("#panelCierre").show();

    // Botones
    $("#btnApertura").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);
    $("#btnCierre").attr("disabled", true);
    $("#btnGrabar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    // Cargar cajas abiertas
    $.ajax({
        url: getUrl() + "apertura_cierre_caja/abiertas",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var opts = '<option value="">-- Seleccione una caja abierta --</option>';
        for (var rs of resultado) {
            opts += '<option value="' + rs.apertura_cierre_caja_id + '">'
                 + rs.caja_descripcion + ' — ' + rs.fecha_apertura
                 + '</option>';
        }
        $("#select_caja_cierre").html(opts);

        if (resultado.length === 0) {
            swal("Sin cajas abiertas", "No hay cajas abiertas para cerrar.", "warning");
        }
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function seleccionarCajaCierre(apertura_id) {
    if (!apertura_id) {
        $("#cierre_apertura_id").val("");
        $("#cierre_suc_razon_social, #cierre_fecha_apertura").val("");
        $("#cierre_monto_apertura").val("");
        $("#cierre_sistema_efectivo_neto, #cierre_sistema_tarjeta, #cierre_sistema_cheque").val("");
        $("#cierre_sistema_transferencia, #cierre_sistema_qr").val("");
        $("#cierre_efectivo_esperado, #cierre_efectivo_fisico, #cierre_diferencia, #cierre_total_sistema").val("");
        $("#btnGrabar").attr("disabled", true);
        return;
    }

    $.ajax({
        url: getUrl() + "apertura_cierre_caja/totales/" + apertura_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(r) {
        $("#cierre_apertura_id").val(r.apertura_id);
        $("#cierre_suc_razon_social").val(r.suc_razon_social || "");
        $("#cierre_fecha_apertura").val(r.fecha_apertura || "");
        $("#cierre_monto_apertura").val(formatearNumero(r.monto_apertura));
        $("#cierre_sistema_efectivo_neto").val(formatearNumero(r.sistema_efectivo_neto));
        $("#cierre_sistema_tarjeta").val(formatearNumero(r.sistema_tarjeta));
        $("#cierre_sistema_cheque").val(formatearNumero(r.sistema_cheque));
        $("#cierre_sistema_transferencia").val(formatearNumero(r.sistema_transferencia));
        $("#cierre_sistema_qr").val(formatearNumero(r.sistema_qr));
        $("#cierre_efectivo_esperado").val(formatearNumero(r.efectivo_esperado));

        var totalSistema = r.efectivo_esperado
                         + r.sistema_tarjeta
                         + r.sistema_cheque
                         + r.sistema_transferencia
                         + r.sistema_qr;
        $("#cierre_total_sistema").val(formatearNumero(totalSistema));

        // Limpiar efectivo físico y diferencia
        $("#cierre_efectivo_fisico").val("").focus();
        $("#cierre_diferencia").val("").css("background","").css("color","");
        $("#btnGrabar").attr("disabled", true);

        // Guardar esperado para cálculo de diferencia
        $("#cierre_efectivo_fisico").data("esperado", r.efectivo_esperado);
        $("#txtOperacion").val(4);
    })
    .fail(function(xhr) {
        mostrarErrores(xhr);
    });
}

function calcularDiferenciaCierre() {
    var fisico   = parseFloat($("#cierre_efectivo_fisico").val());
    var esperado = parseFloat($("#cierre_efectivo_fisico").data("esperado")) || 0;

    if (isNaN(fisico) || $("#cierre_efectivo_fisico").val() === "") {
        $("#cierre_diferencia").val("").css("background","").css("color","");
        $("#btnGrabar").attr("disabled", true);
        return;
    }

    var diff = fisico - esperado;
    $("#cierre_diferencia").val(formatearNumero(diff));

    if (Math.abs(diff) < 0.01) {
        $("#cierre_diferencia")
            .css("background","#d5f5e3")
            .css("color","#1e8449")
            .css("font-weight","bold");
    } else if (diff > 0) {
        // Sobra dinero (a favor del cajero)
        $("#cierre_diferencia")
            .css("background","#fef9e7")
            .css("color","#d68910")
            .css("font-weight","bold");
    } else {
        // Falta dinero (en contra del cajero)
        $("#cierre_diferencia")
            .css("background","#fadbd8")
            .css("color","#c0392b")
            .css("font-weight","bold");
    }

    // Grabar se habilita siempre que se haya ingresado un valor
    $("#btnGrabar").removeAttr("disabled");
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

            lista += `<tr class="item-list"
            onclick="seleccionAperturaCaja(
                ${rs.id},
                '${(rs.emp_razon_social||'').replace(/'/g,"\\'")}',
                '${(rs.suc_razon_social||'').replace(/'/g,"\\'")}',
                '${rs.fecha_apertura}',
                '${(rs.caja_descripcion||'').replace(/'/g,"\\'")}',
                '${rs.estado}',
                '${rs.fecha_cierre}',
                ${rs.monto_apertura},
                ${rs.monto_efectivo_cierre},
                ${rs.monto_tarjeta_cierre},
                ${rs.monto_cheque_cierre},
                ${rs.monto_transferencia_cierre},
                ${rs.monto_qr_cierre}
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
        mostrarErrores(xhr);
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
    monto_cheque_cierre,
    monto_transferencia_cierre,
    monto_qr_cierre
){
    $("#id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#fecha_apertura").val(fecha_apertura);
    $("#monto_apertura").val(monto_apertura || 0);
    $("#caja_descripcion").val(caja_descripcion);

    $("#fecha_cierre").val(fecha_cierre || "");
    $("#monto_efectivo_cierre").val(monto_efectivo_cierre || 0);
    $("#monto_tarjeta_cierre").val(monto_tarjeta_cierre || 0);
    $("#monto_cheque_cierre").val(monto_cheque_cierre || 0);
    $("#monto_transferencia_cierre").val(monto_transferencia_cierre || 0);
    $("#monto_qr_cierre").val(monto_qr_cierre || 0);

    // Ocultar panel de cierre interactivo, mostrar sección de datos
    $("#panelCierre").hide();
    $("#seccionDatosCierre").show();
    $("#registros").hide();

    $("#btnApertura, #btnEditar, #btnEliminar, #btnCierre, #btnGrabar")
        .attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    // Limpiar sobrante/faltante siempre
    $("#sobrante_cierre").val("").css("background", "").css("color", "#27ae60");
    $("#faltante_cierre").val("").css("background", "").css("color", "#c0392b");

    if (estado === "ABIERTA") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");
        $("#btnCierre").removeAttr("disabled");

        $("#fecha_cierre, #monto_efectivo_cierre, #monto_tarjeta_cierre").val("");
        $("#monto_cheque_cierre, #monto_transferencia_cierre, #monto_qr_cierre, #monto_cierre").val("");

    } else if (estado === "CERRADA") {
        calcularMontoCierre();
        cargarDiferenciaCierre(id);
    }

    $(".form-line").addClass("focused");
}

function cargarDiferenciaCierre(apertura_id) {
    $.ajax({
        url: getUrl() + "apertura_cierre_caja/diferencia/" + apertura_id,
        method: "GET",
        dataType: "json"
    })
    .done(function(r) {
        if (r.sobrante > 0.01) {
            $("#sobrante_cierre")
                .val(formatearNumero(r.sobrante))
                .css("background", "#d5f5e3");
            $("#faltante_cierre").val("0,00");
        } else if (r.faltante > 0.01) {
            $("#faltante_cierre")
                .val(formatearNumero(r.faltante))
                .css("background", "#fadbd8");
            $("#sobrante_cierre").val("0,00");
        } else {
            $("#sobrante_cierre").val("0,00");
            $("#faltante_cierre").val("0,00");
        }
    })
    .fail(function() {
        // Si falla, solo deja los campos vacíos sin bloquear
    });
}
function calcularMontoCierre() {
    var efectivo      = parseFloat($("#monto_efectivo_cierre").val()) || 0;
    var tarjeta       = parseFloat($("#monto_tarjeta_cierre").val()) || 0;
    var cheque        = parseFloat($("#monto_cheque_cierre").val()) || 0;
    var transferencia = parseFloat($("#monto_transferencia_cierre").val()) || 0;
    var qr            = parseFloat($("#monto_qr_cierre").val()) || 0;

    var total = efectivo + tarjeta + cheque + transferencia + qr;
    $("#monto_cierre").val(formatearNumero(total));
}

function buscarEmpresas() {
    $.ajax({
        url:getUrl() + "empresa/read",
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
    .fail(function(xhr) {
        swal("Error", "No se pudo cargar las sucursales.", "error");
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
        url:getUrl() + "sucursal/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_razon_social+"','"+rs.suc_direccion+"','"+rs.suc_telefono+"','"+rs.suc_correo+"');\">"+rs.suc_razon_social+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr){
        swal("Error", "No se pudo cargar las sucursales.", "error");
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
        url:getUrl() + "caja/read",
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
    .fail(function(xhr){
        swal("Error", "No se pudo cargar las cajas.", "error");
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
        let user  = $("#funcionario_id").val().trim();

        if (!fecha || !caja || !suc || !emp || !user) {
            swal("Error", "Todos los campos son obligatorios para abrir caja.", "error");
            return;
        }

        endpoint = "apertura_cierre_caja/create";

        datos = {
            empresa_id: emp,
            sucursal_id: suc,
            caja_id: caja,
            funcionario_id: user,
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

        let apertura_id = $("#cierre_apertura_id").val();

        if (!apertura_id) {
            swal("Error", "Seleccione una caja abierta para cerrar.", "error");
            return;
        }

        let montoFisico = parseFloat($("#cierre_efectivo_fisico").val());

        if (isNaN(montoFisico) || montoFisico < 0) {
            swal("Error", "Ingrese el efectivo físico contado.", "error");
            return;
        }

        let esperado = parseFloat($("#cierre_efectivo_fisico").data("esperado")) || 0;
        let diff     = montoFisico - esperado;

        if (Math.abs(diff) > 0.01) {
            // Hay diferencia → pedir segunda confirmación antes de proceder
            let signo    = diff > 0 ? "a favor del cajero" : "en contra del cajero";
            let absDiff  = Math.abs(diff).toLocaleString("es-PY", {minimumFractionDigits: 2});
            let tipo_dif = diff > 0 ? "warning" : "error";

            swal({
                title: "DIFERENCIA EN EFECTIVO",
                text: "Hay una diferencia de " + absDiff + " Gs. (" + signo + ").\n¿Desea cerrar la caja de todas formas?",
                type: tipo_dif,
                showCancelButton: true,
                confirmButtonColor: "#c0392b",
                confirmButtonText: "SÍ, CERRAR IGUAL",
                cancelButtonText: "CANCELAR",
                closeOnConfirm: false
            }, function(confirmado) {
                if (confirmado) {
                    ejecutarCierreCaja(apertura_id, montoFisico);
                }
            });
            return;
        }

        endpoint = "apertura_cierre_caja/cerrarCaja";
        metodo   = "PUT";

        datos = {
            id: apertura_id,
            monto_fisico_efectivo: montoFisico
        };
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
        mostrarErrores(xhr);
    });
}


function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function ejecutarCierreCaja(apertura_id, montoFisico) {
    $.ajax({
        url: getUrl() + "apertura_cierre_caja/cerrarCaja",
        method: "PUT",
        dataType: "json",
        data: { id: apertura_id, monto_fisico_efectivo: montoFisico }
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo },
            function() { location.reload(true); });
    })
    .fail(function(xhr) { mostrarErrores(xhr); });
}

function formatearNumero(numero) {
    var n = parseFloat(numero) || 0;
    return n.toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function mostrarErrores(xhr) {
    var msg = "Error en la operación.";
    try {
        var resp = JSON.parse(xhr.responseText);
        if (resp.mensaje) msg = resp.mensaje;
        else if (resp.message) msg = resp.message;
    } catch(e) {}
    swal("Error", msg, "error");
}

// Función para cargar el funcionario_id del usuario logueado
function cargarFuncionarioIdLogueado() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion') || '{}');
    if (datosSesion && datosSesion.user && datosSesion.user.funcionario_id) {
        $('#funcionario_id').val(datosSesion.user.funcionario_id);
    } else {
        swal("Sesión expirada", "No se puede identificar al usuario. Inicie sesión nuevamente.", "error");
        window.location.href = '../../index.html';
    }
}
