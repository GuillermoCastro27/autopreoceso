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
                title:'Arqueo de Caja'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Arqueo de Caja'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Arqueo de Caja'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Arqueo de Caja'
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

function generar_arqueo() {

    $("#txtOperacion").val(1);
    $("#id").val("");

    // Habilitar campos necesarios
    $("#tipo_arqueo").removeAttr("disabled");
    $("#suc_razon_social").attr("disabled", true);
    $("#caja").removeAttr("disabled");
    $("#arqueo_fecha").removeAttr("disabled");

    // Empresa normalmente ya viene cargada
    $("#emp_razon_social").attr("disabled", true);
    // Botones
    $("#btnApertura").attr("disabled", true);   // Generar
    $("#btnEliminar").attr("disabled", true);   // Anular
    $("#btnConfirmar").attr("disabled", true);  // Confirmar

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    // UI
    $(".form-line").addClass("focused");
    $("#registros").hide();
}
function eliminar() {

    $("#txtOperacion").val(2);

    $("#btnApertura").attr("disabled", true);
    $("#btnConfirmar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}
function confirmar() {

    $("#txtOperacion").val(3);

    $("#btnApertura").attr("disabled", true);
    $("#btnEliminar").attr("disabled", true);

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "GENERAR ARQUEO";
    var pregunta = "¿DESEA GENERAR EL ARQUEO?";

    if(oper===2){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
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
        url: getUrl() + "arqueo_caja/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            lista += `
                <tr class="item-list"
                    onclick="seleccionArqueo(
                        ${rs.id},
                        '${rs.emp_razon_social}',
                        '${rs.suc_razon_social}',
                        '${rs.arqueo_fecha}',
                        '${rs.caja_descripcion}',
                        '${rs.tipo_arqueo}',
                        '${rs.estado}',
                        ${rs.total_efectivo},
                        ${rs.total_cheque},
                        ${rs.total_tarjeta},
                        ${rs.total_general}
                    )">
                    <td>${rs.id}</td>
                    <td>${rs.emp_razon_social}</td>
                    <td>${rs.suc_razon_social}</td>
                    <td>${rs.arqueo_fecha}</td>
                    <td>${rs.caja_descripcion}</td>
                    <td>${rs.estado}</td>
                </tr>
            `;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (xhr) {
        mostrarErrores(xhr);
    });
}
function seleccionArqueo(
    id,
    emp_razon_social,
    suc_razon_social,
    arqueo_fecha,
    caja_descripcion,
    tipo_arqueo,
    estado,
    total_efectivo,
    total_cheque,
    total_tarjeta,
    total_general
) {
    $("#id").val(id);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);
    $("#arqueo_fecha").val(arqueo_fecha);
    $("#caja").val(caja_descripcion);
    $("#tipo_arqueo").val(tipo_arqueo);

    $("#total_efectivo").val(formatearNumero(total_efectivo));
    $("#total_cheque").val(formatearNumero(total_cheque));
    $("#total_tarjeta").val(formatearNumero(total_tarjeta));
    $("#total_general").val(formatearNumero(total_general));
    // =========================
    // VISTA
    // =========================
    $("#registros").hide();
    $(".form-line").addClass("focused");

    // =========================
    // BOTONES (reset)
    // =========================
    $("#btnApertura, #btnConfirmar, #btnEliminar, #btnGrabar")
        .attr("disabled", true);

    $("#btnCancelar").removeAttr("disabled");

    // =========================
    // REGLAS POR ESTADO
    // =========================
    if (estado === "PENDIENTE") {

        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEliminar").removeAttr("disabled");

    } else if (estado === "CONFIRMADO") {

        // solo consulta, todo bloqueado

    } else if (estado === "ANULADO") {

        // solo consulta, todo bloqueado
    }
}

function formatearNumero(n) {
    if (isNaN(n)) return '0,00';
    return Number(n).toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
function buscarApertCierCaja() {

    $.ajax({
        url: getUrl() + "apertura_cierre_caja/abiertas_arqueo",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        if (resultado.length === 0) {
            $("#listaAperCierCaja").hide();
            swal("Atención", "No hay cajas abiertas", "warning");
            return;
        }

        let lista = "<ul class='list-group'>";

        for (let rs of resultado) {

            lista += `
                <li class="list-group-item"
                    onclick="seleccionApertCierCaja(
                        ${rs.apertura_cierre_caja_id},
                        ${rs.empresa_id},
                        ${rs.sucursal_id},
                        '${rs.caja_descripcion}',
                        '${rs.emp_razon_social}',
                        '${rs.suc_razon_social}'
                    )">
                    
                    <strong>${rs.caja_descripcion}</strong><br>
                    <small>
                        ${rs.emp_razon_social} | ${rs.suc_razon_social}<br>
                        ${rs.usuario} | ${rs.fecha_apertura}
                    </small>
                </li>
            `;
        }

        lista += "</ul>";

        $("#listaAperCierCaja")
            .html(lista)
            .css({
                display: "block",
                position: "absolute",
                zIndex: 2000,
                width: "100%"
            });
    })
    .fail(function () {
        swal("Error", "No se pudieron cargar las cajas abiertas", "error");
    });
}
function seleccionApertCierCaja(
    apertura_cierre_caja_id,
    empresa_id,
    sucursal_id,
    caja_descripcion,
    emp_razon_social,
    suc_razon_social
) {
    $("#apertura_cierre_caja_id").val(apertura_cierre_caja_id);
    $("#empresa_id").val(empresa_id);
    $("#sucursal_id").val(sucursal_id);
    $("#caja").val(caja_descripcion);
    $("#emp_razon_social").val(emp_razon_social);
    $("#suc_razon_social").val(suc_razon_social);

    // Ocultar lista
    $("#listaAperCierCaja").hide().html("");

    // Foco visual AdminBSB
    $("#caja").closest(".form-line").addClass("focused");
    $("#emp_razon_social").closest(".form-line").addClass("focused");
    $("#suc_razon_social").closest(".form-line").addClass("focused");
}


function grabar() {


    let oper = parseInt($("#txtOperacion").val());

    let endpoint = "";
    let metodo   = "POST";
    let datos    = {};

    // =========================
    // 🟢 GRABAR ARQUEO (PENDIENTE)
    // =========================
    if (oper === 1) {

        let emp   = $("#empresa_id").val();
        let suc   = $("#sucursal_id").val();
        let aper  = $("#apertura_cierre_caja_id").val();
        let user  = $("#funcionario_id").val();
        let tipo  = $("#tipo_arqueo").val();
        let fechaVista = $("#arqueo_fecha").val();


        // 🔴 VALIDACIÓN FECHA
        if (!moment(fechaVista, "DD/MM/YYYY HH:mm:ss", true).isValid()) {
            swal("Error", "Debe ingresar una fecha válida para el arqueo.", "error");
            return;
        }

        let fecha = moment(fechaVista, "DD/MM/YYYY HH:mm:ss")
                    .format("YYYY-MM-DD HH:mm:ss");


        // 🔴 VALIDACIÓN CAMPOS
        if (!emp || !suc || !aper || !user || !tipo) {
            swal("Error", "Debe completar todos los datos del arqueo.", "error");
            return;
        }

        endpoint = "arqueo_caja/create";

        datos = {
            apertura_cierre_caja_id: aper,
            funcionario_id: user,
            tipo_arqueo: tipo,
            arqueo_fecha: fecha
        };

    }

    // =========================
    // 🔴 ANULAR ARQUEO
    // =========================
    if (oper === 2) {

        let id = $("#id").val();

        if (!id || id === "0") {
            swal("Error", "No hay un arqueo seleccionado.", "error");
            return;
        }

        endpoint = "arqueo_caja/anular/" + id;
        metodo   = "PUT";
    }

    // =========================
    // 🔵 CONFIRMAR ARQUEO
    // =========================
    if (oper === 3) {

        let id = $("#id").val();

        if (!id || id === "0") {
            swal("Error", "No hay un arqueo seleccionado.", "error");
            return;
        }

        endpoint = "arqueo_caja/confirmar/" + id;
        metodo   = "PUT";
    }

    if (endpoint === "") {
        swal("Error", "Operación no válida.", "error");
        return;
    }


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