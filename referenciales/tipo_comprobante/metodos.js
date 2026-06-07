listar();

function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Tipos de Comprobante' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Tipos de Comprobante' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Tipos de Comprobante' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Tipos de Comprobante' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de _MAX_)',
            sZeroRecords: 'No se encontraron registros',
            sInfoEmpty: 'Mostrando 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function cancelar() { location.reload(true); }

function agregar() {
    $('#txtOperacion').val(1);
    $('#txtCodigo').val(0);
    $('#tip_comp_nombre, #tip_comp_abrev').removeAttr('disabled');
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function editar() {
    $('#txtOperacion').val(2);
    $('#tip_comp_nombre, #tip_comp_abrev').removeAttr('disabled');
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function eliminar() {
    $('#txtOperacion').val(3);
    $('#btnAgregar, #btnEditar, #btnEliminar').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
}

function confirmarOperacion() {
    var oper = parseInt($('#txtOperacion').val());
    var titulo   = oper === 2 ? 'MODIFICAR' : (oper === 3 ? 'ELIMINAR' : 'AGREGAR');
    var pregunta = oper === 2 ? '¿Desea guardar los cambios?' : (oper === 3 ? '¿Desea eliminar el registro?' : '¿Desea guardar el nuevo registro?');

    swal({ title: titulo, text: pregunta, type: 'warning', showCancelButton: true,
           confirmButtonColor: '#458E49', confirmButtonText: 'SI', cancelButtonText: 'NO',
           closeOnConfirm: false
    }, function () { grabar(); });
}

function listar() {
    $.ajax({ url: getUrl() + 'tipo-comprobante/read', method: 'GET' })
    .done(function(data) {
        var filas = '';
        data.forEach(function(r) {
            filas += '<tr class="item-list" onclick="seleccionar(' + r.id + ',\'' +
                     r.tip_comp_nombre.replace(/'/g, "\\'") + '\',\'' +
                     r.tip_comp_abrev.replace(/'/g, "\\'") + '\')">' +
                     '<td>' + r.id + '</td>' +
                     '<td>' + r.tip_comp_nombre + '</td>' +
                     '<td>' + r.tip_comp_abrev + '</td>' +
                     '</tr>';
        });
        $('#tableBody').html(filas);
        formatoTabla();
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar la lista.', 'error');
    });
}

function seleccionar(id, nombre, abrev) {
    $('#txtCodigo').val(id);
    $('#tip_comp_nombre').val(nombre);
    $('#tip_comp_abrev').val(abrev);
    $('#btnAgregar, #btnGrabar, #btnCancelar').attr('disabled', true);
    $('#btnEditar, #btnEliminar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function grabar() {
    var INVALIDOS = /[*<>{}|]/;
    var nombre = $('#tip_comp_nombre').val().trim();
    var abrev  = $('#tip_comp_abrev').val().trim();

    if (!nombre) { swal('Error', 'El nombre es obligatorio.', 'error'); return; }
    if (!abrev)  { swal('Error', 'La abreviatura es obligatoria.', 'error'); return; }
    if (INVALIDOS.test(nombre) || INVALIDOS.test(abrev)) {
        swal('Caracteres no permitidos', 'No se permiten: * < > { } |', 'error'); return;
    }

    var oper = parseInt($('#txtOperacion').val());
    var url  = getUrl() + (oper === 1 ? 'tipo-comprobante/create' :
                           oper === 2 ? 'tipo-comprobante/update/' + $('#txtCodigo').val() :
                                        'tipo-comprobante/delete/' + $('#txtCodigo').val());
    var method = oper === 1 ? 'POST' : (oper === 2 ? 'PUT' : 'DELETE');

    $.ajax({ url: url, method: method, data: { tip_comp_nombre: nombre, tip_comp_abrev: abrev } })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo }, function() {
            if (res.tipo === 'success') location.reload(true);
        });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        if (xhr.status === 422) {
            var msg = '';
            if (res && res.errors) $.each(res.errors, function(k, v){ msg += (Array.isArray(v) ? v[0] : v) + '\n'; });
            else msg = res && res.message ? res.message : 'Verifique los campos.';
            swal('Error de validación', msg, 'error');
        } else if (xhr.status === 409) {
            swal('No se puede eliminar', res && res.mensaje ? res.mensaje : 'Registro en uso.', 'error');
        } else {
            swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
        }
    });
}
