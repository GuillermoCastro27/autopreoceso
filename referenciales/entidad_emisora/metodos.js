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
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipo de impuestos'
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
    $("#txtCodigo").val(0);
    $("#ent_emis_nombre").removeAttr("disabled");
    $("#ent_emis_direccion").removeAttr("disabled");
    $("#ent_emis_telefono").removeAttr("disabled");
    $("#ent_emis_email").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#ent_emis_nombre").removeAttr("disabled");
    $("#ent_emis_direccion").removeAttr("disabled");
    $("#ent_emis_telefono").removeAttr("disabled");
    $("#ent_emis_email").removeAttr("disabled");

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

function listar() {
    $.ajax({
        url: getUrl() + "entidad_emisora/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            lista += `<tr class="item-list"
                        onclick="seleccionEntidadEmisora(
                            ${rs.entidad_emisora_id},
                            '${rs.ent_emis_nombre}',
                            '${rs.ent_emis_direccion || ""}',
                            '${rs.ent_emis_telefono || ""}',
                            '${rs.ent_emis_email || ""}',
                            '${rs.ent_emis_estado}'
                        )">`;

            lista += `<td>${rs.entidad_emisora_id}</td>`;
            lista += `<td>${rs.ent_emis_nombre}</td>`;
            lista += `<td>${rs.ent_emis_direccion || ""}</td>`;
            lista += `<td>${rs.ent_emis_telefono || ""}</td>`;
            lista += `<td>${rs.ent_emis_email || ""}</td>`;
            lista += `<td>${rs.ent_emis_estado}</td>`;

            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (a, b, c) {
        alert(c);
    });
}
function seleccionEntidadEmisora(
    id,
    nombre,
    direccion,
    telefono,
    email,
    estado
) {
    $("#txtCodigo").val(id);
    $("#ent_emis_nombre").val(nombre);
    $("#ent_emis_direccion").val(direccion);
    $("#ent_emis_telefono").val(telefono);
    $("#ent_emis_email").val(email);
    $("#ent_emis_estado").val(estado);

    // Botonera (igual a tu patrón)
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", true);
    $("#btnEliminar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}


function grabar() {

    // 🔹 Captura de campos
    var nombre    = $("#ent_emis_nombre").val().trim();
    var direccion = $("#ent_emis_direccion").val().trim();
    var telefono  = $("#ent_emis_telefono").val().trim();
    var email     = $("#ent_emis_email").val().trim();
    var estado    = $("#ent_emis_estado").val();

    // 🔹 Validación mínima
    if (nombre === "" || estado === "") {
        swal({
            title: "Error",
            text: "El nombre y el estado son obligatorios.",
            type: "error"
        });
        return;
    }

    // 🔹 Configuración por defecto
    var endpoint = "entidad_emisora/create";
    var metodo   = "POST";

    // ✏️ Editar
    if ($("#txtOperacion").val() == 2) {
        endpoint = "entidad_emisora/update/" + $("#txtCodigo").val();
        metodo   = "PUT";
    }

    // 🗑️ Anular
    if ($("#txtOperacion").val() == 3) {
        endpoint = "entidad_emisora/delete/" + $("#txtCodigo").val();
        metodo   = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            ent_emis_nombre: nombre,
            ent_emis_direccion: direccion,
            ent_emis_telefono: telefono,
            ent_emis_email: email,
            ent_emis_estado: estado
        }
    })
    .done(function (resultado) {
        swal({
            title: "Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function () {
            if (resultado.tipo === "success") {
                location.reload(true);
            }
        });
    })
    .fail(function (a) {

        try {
            let response = JSON.parse(a.responseText);

            swal({
                title: "Error",
                text: response.mensaje || "Error al procesar la solicitud",
                type: "error"
            });

        } catch (e) {
            swal({
                title: "Error",
                text: "Verifique los datos ingresados.",
                type: "error"
            });
        }
    });
}
