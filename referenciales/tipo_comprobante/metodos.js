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
    $('#btnAgregar, #btnEditar, #btnEstado').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function editar() {
    $('#txtOperacion').val(2);
    $('#tip_comp_nombre, #tip_comp_abrev').removeAttr('disabled');
    $('#btnAgregar, #btnEditar, #btnEstado').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function confirmarCambioEstado() {
    $('#txtOperacion').val(4);
    $('#btnAgregar, #btnEditar, #btnEstado').attr('disabled', true);
    $('#btnGrabar, #btnCancelar').removeAttr('disabled');
}

function confirmarOperacion() {
    var oper = parseInt($('#txtOperacion').val());
    var titulo, pregunta;

    if (oper === 2) {
        titulo = 'MODIFICAR'; pregunta = '¿Desea guardar los cambios?';
    } else if (oper === 4) {
        var estado = $('#tip_comp_estado').val();
        titulo   = estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR';
        pregunta = estado === 'activo'
            ? '¿Desea desactivar este tipo de comprobante? No podrá usarse en nuevos timbrados.'
            : '¿Desea activar este tipo de comprobante nuevamente?';
    } else {
        titulo = 'AGREGAR'; pregunta = '¿Desea guardar el nuevo registro?';
    }

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
            var estado = r.tip_comp_estado || 'activo';
            var badge  = estado === 'activo'
                ? '<span class="badge" style="background:#27ae60;">Activo</span>'
                : '<span class="badge" style="background:#c0392b;">Inactivo</span>';
            filas += '<tr class="item-list" onclick="seleccionar(' + r.id + ',\'' +
                     r.tip_comp_nombre.replace(/'/g, "\\'") + '\',\'' +
                     r.tip_comp_abrev.replace(/'/g, "\\'") + '\',\'' + estado + '\')">' +
                     '<td>' + r.id + '</td>' +
                     '<td>' + r.tip_comp_nombre + '</td>' +
                     '<td>' + r.tip_comp_abrev + '</td>' +
                     '<td>' + badge + '</td>' +
                     '</tr>';
        });
        $('#tableBody').html(filas);
        formatoTabla();
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) swal('Error', 'No se pudo cargar la lista.', 'error');
    });
}

function seleccionar(id, nombre, abrev, estado) {
    $('#txtCodigo').val(id);
    $('#tip_comp_nombre').val(nombre);
    $('#tip_comp_abrev').val(abrev);
    $('#tip_comp_estado').val(estado || 'activo');

    var activo = (estado || 'activo') === 'activo';
    if (activo) {
        $('#btnEstado').removeClass('btn-success').addClass('btn-danger');
        $('#lblEstado').text('Desactivar');
        $('#btnEstado').find('i').text('block');
    } else {
        $('#btnEstado').removeClass('btn-danger').addClass('btn-success');
        $('#lblEstado').text('Activar');
        $('#btnEstado').find('i').text('check_circle');
    }

    $('#btnAgregar, #btnGrabar').attr('disabled', true);
    $('#btnEditar, #btnEstado, #btnCancelar').removeAttr('disabled');
    $('.form-line').addClass('focused');
}

function grabar() {
    var oper = parseInt($('#txtOperacion').val());
    if (oper === 4) { cambiarEstado(); return; }

    var INVALIDOS = /[*<>{}|]/;
    var nombre = $('#tip_comp_nombre').val().trim();
    var abrev  = $('#tip_comp_abrev').val().trim();

    if (!nombre) { swal('Error', 'El nombre es obligatorio.', 'error'); return; }
    if (!abrev)  { swal('Error', 'La abreviatura es obligatoria.', 'error'); return; }
    if (INVALIDOS.test(nombre) || INVALIDOS.test(abrev)) {
        swal('Caracteres no permitidos', 'No se permiten: * < > { } |', 'error'); return;
    }

    var url    = getUrl() + (oper === 1 ? 'tipo-comprobante/create' : 'tipo-comprobante/update/' + $('#txtCodigo').val());
    var method = oper === 1 ? 'POST' : 'PUT';

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

function cambiarEstado() {
    $.ajax({
        url: getUrl() + 'tipo-comprobante/estado/' + $('#txtCodigo').val(),
        method: 'PATCH'
    })
    .done(function(res) {
        swal({ title: 'Respuesta', text: res.mensaje, type: res.tipo },
            function() { if (res.tipo === 'success') location.reload(true); });
    })
    .fail(function(xhr) {
        var res = xhr.responseJSON;
        swal('Error', res && res.mensaje ? res.mensaje : 'Error inesperado.', 'error');
    });
}
