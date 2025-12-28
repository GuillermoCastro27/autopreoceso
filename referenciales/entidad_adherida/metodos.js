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
    $("#ent_adh_nombre").removeAttr("disabled");
    $("#ent_adh_direccion").removeAttr("disabled");
    $("#ent_adh_telefono").removeAttr("disabled");
    $("#ent_adh_email").removeAttr("disabled");
    $("#entidad_emisora").removeAttr("disabled");
    $("#marca_tarjeta").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#ent_adh_nombre").removeAttr("disabled");
    $("#ent_adh_direccion").removeAttr("disabled");
    $("#ent_adh_telefono").removeAttr("disabled");
    $("#ent_adh_email").removeAttr("disabled");
    $("#entidad_emisora").removeAttr("disabled");
    $("#marca_tarjeta").removeAttr("disabled");

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
        url: getUrl() + "entidad_adherida/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {

        let lista = "";

        for (let rs of resultado) {

            lista += `<tr class="item-list"
                        onclick="seleccionEntidadAdherida(
                            ${rs.entidad_adherida_id},
                            '${rs.ent_adh_nombre}',
                            '${rs.ent_adh_direccion || ""}',
                            '${rs.ent_adh_telefono || ""}',
                            '${rs.ent_adh_email || ""}',
                            ${rs.entidad_emisora_id},
                            '${rs.entidad_emisora}',
                            ${rs.marca_tarjeta_id},
                            '${rs.marca_tarjeta}'
                        )">`;

            lista += `<td>${rs.entidad_adherida_id}</td>`;
            lista += `<td>${rs.ent_adh_nombre}</td>`;
            lista += `<td>${rs.ent_adh_direccion || ""}</td>`;
            lista += `<td>${rs.ent_adh_telefono || ""}</td>`;
            lista += `<td>${rs.ent_adh_email || ""}</td>`;
            lista += `<td>${rs.entidad_emisora}</td>`;
            lista += `<td>${rs.marca_tarjeta}</td>`;
            lista += `</tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (a, b, c) {
        alert(c);
    });
}
function seleccionEntidadAdherida(
    id,
    nombre,
    direccion,
    telefono,
    email,
    entidadEmisoraId,
    entidadEmisoraNombre,
    marcaTarjetaId,
    marcaTarjetaNombre
) {
    $("#txtCodigo").val(id);
    $("#ent_adh_nombre").val(nombre);
    $("#ent_adh_direccion").val(direccion);
    $("#ent_adh_telefono").val(telefono);
    $("#ent_adh_email").val(email);

    $("#entidad_emisora_id").val(entidadEmisoraId);
    $("#entidad_emisora").val(entidadEmisoraNombre);

    $("#marca_tarjeta_id").val(marcaTarjetaId);
    $("#marca_tarjeta").val(marcaTarjetaNombre);

    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").removeAttr("disabled");
    $("#btnEliminar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnGrabar").attr("disabled", true);

    $(".form-line").addClass("focused");
}
function buscarEntidadEmisora() {
    $.ajax({
        url: getUrl() + "entidad_emisora/buscar",
        method: "GET",
        dataType: "json"
    })
    .done(function (data) {

        let html = "<ul class='list-group'>";

        data.forEach(e => {
            html += `<li class='list-group-item'
                        onclick="seleccionarEntidadEmisora(${e.entidad_emisora_id},'${e.ent_emis_nombre}')">
                        ${e.ent_emis_nombre}
                     </li>`;
        });

        html += "</ul>";

        $("#listaEntidadEmi").html(html).show();
        $("#listaEntidadEmi").attr("style","display:block; position:absolute; z-index:2000;");
    });
}

function seleccionarEntidadEmisora(id, nombre) {
    $("#entidad_emisora_id").val(id);
    $("#entidad_emisora").val(nombre);
    $("#listaEntidadEmi").hide();
}
function buscarMarcaTarjeta() {
    $.ajax({
        url: getUrl() + "marca_tarjeta/read",
        method: "GET",
        dataType: "json"
    })
    .done(function (data) {

        let html = "<ul class='list-group'>";

        data.forEach(m => {
            html += `<li class='list-group-item'
                        onclick="seleccionarMarcaTarjeta(${m.marca_tarjeta_id},'${m.marca_nombre}')">
                        ${m.marca_nombre}
                     </li>`;
        });

        html += "</ul>";

        $("#listaMarcaTarj").html(html).show();
        $("#listaMarcaTarj").attr("style","display:block; position:absolute; z-index:2000;");
    });
}

function seleccionarMarcaTarjeta(id, nombre) {
    $("#marca_tarjeta_id").val(id);
    $("#marca_tarjeta").val(nombre);
    $("#listaMarcaTarj").hide();
}

function grabar() {

    let nombre = $("#ent_adh_nombre").val().trim();

    if (nombre === "") {
        swal("Error", "El nombre es obligatorio.", "error");
        return;
    }

    let endpoint = "entidad_adherida/create";
    let metodo   = "POST";

    if ($("#txtOperacion").val() == 2) {
        endpoint = "entidad_adherida/update/" + $("#txtCodigo").val();
        metodo   = "PUT";
    }

    if ($("#txtOperacion").val() == 3) {
        endpoint = "entidad_adherida/delete/" + $("#txtCodigo").val();
        metodo   = "DELETE";
    }

    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            entidad_emisora_id: $("#entidad_emisora_id").val(),
            marca_tarjeta_id: $("#marca_tarjeta_id").val(),
            ent_adh_nombre: nombre,
            ent_adh_direccion: $("#ent_adh_direccion").val(),
            ent_adh_telefono: $("#ent_adh_telefono").val(),
            ent_adh_email: $("#ent_adh_email").val()
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
    .fail(function (xhr) {

        if (xhr.status === 422) {
            let errores = "";
            $.each(xhr.responseJSON.errors, function (k, v) {
                errores += v[0] + "\n";
            });
            swal("Error", errores, "error");
        } else {
            swal("Error", "Ocurrió un error inesperado.", "error");
        }
    });
}
