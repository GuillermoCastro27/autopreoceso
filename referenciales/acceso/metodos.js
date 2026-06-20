// Árbol de permisos cacheado: { modulo: { mod_id, entidades: { entidad: [{accion, permiso_id}] } } }
var arbolPermisos = {};

// ─── INICIO ──────────────────────────────────────────────────────────────────

cargarArbol();
listar();

// ─── ÁRBOL DE PERMISOS ───────────────────────────────────────────────────────

function cargarArbol() {
    $.ajax({
        url: getUrl() + "permisos/arbol",
        method: "GET",
        dataType: "json"
    })
    .done(function(data) {
        arbolPermisos = data;
        var options = '<option value="">-- Seleccione módulo --</option>';
        Object.keys(data).sort().forEach(function(mod) {
            var label = mod.charAt(0).toUpperCase() + mod.slice(1);
            options += '<option value="' + mod + '">' + label + '</option>';
        });
        $('#sel_modulo').html(options).selectpicker('refresh');
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) console.error("Error cargando árbol de permisos");
    });
}

function onModuloChange() {
    var mod = $('#sel_modulo').val();
    $('#sel_entidad').html('<option value="">-- Seleccione formulario --</option>')
                    .prop('disabled', true).selectpicker('refresh');
    $('#fila_acciones').hide();
    $('#div_acciones').html('');
    $('#mod_id').val('');

    if (!mod || !arbolPermisos[mod]) return;

    $('#mod_id').val(arbolPermisos[mod].mod_id);

    var options = '<option value="">-- Seleccione formulario --</option>'
                + '<option value="__todas__">— Todas las entidades —</option>';
    Object.keys(arbolPermisos[mod].entidades).sort().forEach(function(ent) {
        var label = ent.replace(/_/g, ' ');
        label = label.charAt(0).toUpperCase() + label.slice(1);
        options += '<option value="' + ent + '">' + label + '</option>';
    });
    $('#sel_entidad').html(options).prop('disabled', false).selectpicker('refresh');
}

function onEntidadChange() {
    var mod = $('#sel_modulo').val();
    var ent = $('#sel_entidad').val();
    $('#fila_acciones').hide();
    $('#div_acciones').html('');

    if (!mod || !ent || !arbolPermisos[mod]) return;

    renderBotonesAccion(mod, ent, null);
    $('#fila_acciones').show();
}

function renderBotonesAccion(mod, ent, preselectedId) {
    var html = '<button type="button" class="btn btn-sm btn-default waves-effect" style="margin-bottom:10px;" onclick="toggleTodas();">'
             + '<i class="material-icons" style="font-size:16px;vertical-align:middle;">done_all</i> Seleccionar todas</button><br>';

    if (ent === '__todas__') {
        var accionesMap = {};
        Object.keys(arbolPermisos[mod].entidades).forEach(function(e) {
            arbolPermisos[mod].entidades[e].forEach(function(a) {
                if (!accionesMap[a.accion]) accionesMap[a.accion] = [];
                accionesMap[a.accion].push(a.permiso_id);
            });
        });
        Object.keys(accionesMap).sort().forEach(function(accion) {
            html += btnAccion(accion, JSON.stringify(accionesMap[accion]), false);
        });
    } else {
        var acciones = arbolPermisos[mod].entidades[ent] || [];
        acciones.forEach(function(a) {
            var activo = (preselectedId !== null && a.permiso_id === preselectedId);
            html += btnAccion(a.accion, a.permiso_id, activo);
        });
    }

    $('#div_acciones').html(html);
}

function btnAccion(accion, ids, activo) {
    var cls = activo ? 'btn-success' : 'btn-default';
    return '<button type="button" class="btn btn-sm waves-effect btn-accion ' + cls + '"'
         + ' data-ids=\'' + ids + '\''
         + ' onclick="toggleAccion(this);"'
         + ' style="margin:3px 5px 3px 0;">'
         + accion + '</button>';
}

function toggleAccion(btn) {
    var $b = $(btn);
    if ($b.hasClass('btn-success')) {
        $b.removeClass('btn-success').addClass('btn-default');
    } else {
        $b.removeClass('btn-default').addClass('btn-success');
    }
}

function toggleTodas() {
    var hayInactivo = $('.btn-accion.btn-default').length > 0;
    if (hayInactivo) {
        $('.btn-accion').removeClass('btn-default').addClass('btn-success');
    } else {
        $('.btn-accion').removeClass('btn-success').addClass('btn-default');
    }
}

// ─── CRUD BÁSICO ─────────────────────────────────────────────────────────────

function cancelar() { location.reload(true); }

function agregar() {
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#perfil_desc").removeAttr("disabled");
    $("#sel_modulo").prop("disabled", false).selectpicker('refresh');
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnDesactivar").attr("disabled", true);
    $("#btnActivar").attr("disabled", true);
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function editar() {
    $("#txtOperacion").val(2);
    $("#perfil_desc").removeAttr("disabled");
    $("#sel_modulo").prop("disabled", false).selectpicker('refresh');
    // Si ya hay entidad pre-cargada (viene de seleccionAcceso), habilitarla también
    if ($("#sel_entidad").val()) {
        $("#sel_entidad").prop("disabled", false).selectpicker('refresh');
    }
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnDesactivar").attr("disabled", true);
    $("#btnActivar").attr("disabled", true);
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function desactivar() {
    $("#txtOperacion").val(3);
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnDesactivar").attr("disabled", true);
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function activar() {
    $("#txtOperacion").val(4);
    $("#btnAgregar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnActivar").attr("disabled", true);
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

// ─── GRABAR ──────────────────────────────────────────────────────────────────

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo   = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    if (oper === 2) { titulo = "EDITAR";      pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 3) { titulo = "DESACTIVAR";  pregunta = "¿DESEA DESACTIVAR EL REGISTRO SELECCIONADO?"; }
    if (oper === 4) { titulo = "ACTIVAR";     pregunta = "¿DESEA ACTIVAR EL REGISTRO SELECCIONADO?"; }
    swal({
        title: titulo, text: pregunta, type: "warning",
        showCancelButton: true, confirmButtonColor: "#458E49",
        confirmButtonText: "SI", cancelButtonText: "NO", closeOnConfirm: false
    }, function() { grabar(); });
}

function grabar() {
    var oper       = parseInt($("#txtOperacion").val());
    var perfil_id  = $("#perfil_id").val();
    var mod_id     = $("#mod_id").val();
    var codigo     = $("#txtCodigo").val();

    if (oper === 3) {
        callAjax("accesos/desactivar/" + codigo, "PUT", {});
        return;
    }
    if (oper === 4) {
        callAjax("accesos/activar/" + codigo, "PUT", {});
        return;
    }

    // Validaciones comunes a agregar y editar
    if (!perfil_id) { swal("Error", "Debe seleccionar un rol / perfil", "error"); return; }
    if (!mod_id)    { swal("Error", "Debe seleccionar un módulo",       "error"); return; }
    if (!$('#sel_entidad').val()) { swal("Error", "Debe seleccionar un formulario / entidad", "error"); return; }

    var permiso_ids = [];
    $('.btn-accion.btn-success').each(function() {
        try {
            var parsed = JSON.parse($(this).data('ids'));
            if (Array.isArray(parsed)) {
                permiso_ids = permiso_ids.concat(parsed);
            } else {
                permiso_ids.push(parseInt(parsed));
            }
        } catch (e) {
            permiso_ids.push(parseInt($(this).data('ids')));
        }
    });

    if (permiso_ids.length === 0) { swal("Error", "Debe seleccionar al menos una acción", "error"); return; }

    if (oper === 1 || permiso_ids.length > 1) {
        // Crear múltiples accesos de una sola vez (también aplica al editar con varias seleccionadas)
        callAjax("accesos/create-masivo", "POST", {
            perfil_id:   perfil_id,
            mod_id:      mod_id,
            permiso_ids: permiso_ids
        });

    } else if (oper === 2) {
        // Editar acceso individual: una sola acción seleccionada
        callAjax("accesos/update/" + codigo, "PUT", {
            perfil_id:  perfil_id,
            mod_id:     mod_id,
            permiso_id: permiso_ids[0],
            acc_estado: "ACTIVO"
        });
    }
}

function callAjax(endpoint, method, data) {
    $.ajax({
        url:      getUrl() + endpoint,
        method:   method,
        dataType: "json",
        data:     data
    })
    .done(function(resultado) {
        swal({ title: "Respuesta", text: resultado.mensaje, type: resultado.tipo }, function() {
            if (resultado.tipo === "success" || resultado.tipo === "warning") location.reload(true);
        });
    })
    .fail(function(xhr) {
        if (xhr.status === 403) return;
        var resp = xhr.responseJSON;
        if (xhr.status === 422) {
            var errores = "";
            $.each(resp.errors, function(k, v) { errores += v + "\n"; });
            swal("Error de validación", errores, "error");
        } else {
            swal("Error", "Ocurrió un error inesperado.", "error");
        }
        console.error(xhr.responseText);
    });
}

// ─── LISTAR ──────────────────────────────────────────────────────────────────

function formatoTabla() {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend: 'copy',  text: 'COPIAR',   className: 'btn btn-primary waves-effect',  title: 'Listado de Accesos' },
            { extend: 'excel', text: 'EXCEL',    className: 'btn btn-success waves-effect',  title: 'Listado de Accesos' },
            { extend: 'pdf',   text: 'PDF',      className: 'btn btn-danger waves-effect',   title: 'Listado de Accesos' },
            { extend: 'print', text: 'IMPRIMIR', className: 'btn btn-warning waves-effect',  title: 'Listado de Accesos' }
        ],
        iDisplayLength: 10,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando _START_ al _END_ de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de _MAX_)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function listar() {
    $.ajax({
        url:      getUrl() + "accesos/read",
        method:   "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (var rs of resultado) {
            // Parsear per_nombre → modulo.entidad.accion
            var partes  = (rs.per_nombre || '').split('.');
            var modCol  = partes[0] || rs.per_nombre;
            var entCol  = partes[1] || '—';
            var accCol  = partes[2] || '—';

            lista += "<tr class='item-list' onclick=\"seleccionAcceso("
                   + rs.id + ","
                   + rs.permiso_id + ",'"
                   + rs.per_nombre + "',"
                   + rs.perfil_id + ",'"
                   + (rs.perfil_desc || '').replace(/'/g, "\\'") + "',"
                   + (rs.mod_id || 0) + ",'"
                   + (rs.mod_nombre || '') + "','"
                   + rs.acc_estado + "');\">"
                   + "<td>" + rs.id        + "</td>"
                   + "<td>" + modCol       + "</td>"
                   + "<td>" + entCol       + "</td>"
                   + "<td>" + accCol       + "</td>"
                   + "<td>" + (rs.perfil_desc || '') + "</td>"
                   + "<td>" + rs.acc_estado + "</td>"
                   + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(xhr) {
        if (xhr.status !== 403) console.error("Error al listar accesos");
    });
}

// ─── SELECCIÓN DE FILA ───────────────────────────────────────────────────────

function seleccionAcceso(codigo, permiso_id, per_nombre, perfil_id, perfil_desc, mod_id, mod_nombre, acc_estado) {
    $("#txtCodigo").val(codigo);
    $("#perfil_id").val(perfil_id);
    $("#perfil_desc").val(perfil_desc);
    $("#mod_id").val(mod_id);

    // Parsear per_nombre y preseleccionar en los selects
    var partes  = per_nombre.split('.');
    var modulo  = partes[0] || '';
    var entidad = partes[1] || '';
    var permId  = permiso_id;

    if (modulo && arbolPermisos[modulo]) {
        $('#sel_modulo').val(modulo).selectpicker('refresh');

        // Poblar entidades
        var optEnt = '<option value="">-- Seleccione formulario --</option>';
        Object.keys(arbolPermisos[modulo].entidades).sort().forEach(function(e) {
            var lbl = e.replace(/_/g, ' ');
            lbl = lbl.charAt(0).toUpperCase() + lbl.slice(1);
            optEnt += '<option value="' + e + '">' + lbl + '</option>';
        });
        $('#sel_entidad').html(optEnt).prop('disabled', false).val(entidad).selectpicker('refresh');

        // Poblar acciones y marcar la seleccionada
        if (entidad && arbolPermisos[modulo].entidades[entidad]) {
            renderBotonesAccion(modulo, entidad, permId);
            $('#fila_acciones').show();
        }
    }

    // Habilitar botones según estado
    $("#btnAgregar").attr("disabled", true);
    $("#btnGrabar").attr("disabled", true);
    $("#btnEditar").attr("disabled", true);
    $("#btnDesactivar").attr("disabled", true);
    $("#btnActivar").attr("disabled", true);
    $("#btnCancelar").removeAttr("disabled");

    if (acc_estado === "PENDIENTE" || acc_estado === "ACTIVO") {
        $("#btnEditar").removeAttr("disabled");
        $("#btnDesactivar").removeAttr("disabled");
    }
    if (acc_estado === "INACTIVO") {
        $("#btnActivar").removeAttr("disabled");
    }
}

// ─── AUTOCOMPLETE PERFIL ─────────────────────────────────────────────────────

function buscarPerfil() {
    var texto = $("#perfil_desc").val().trim();
    if (texto.length < 1) { $("#listaPerfil").hide().html(""); return; }

    $.ajax({
        url:      getUrl() + "perfiles/buscar",
        method:   "GET",
        dataType: "json",
        data:     { q: texto }
    })
    .done(function(resultado) {
        var lista = resultado.length === 0
            ? '<a class="list-group-item">No se encontraron perfiles</a>'
            : resultado.map(function(p) {
                return '<a href="#" class="list-group-item list-group-item-action"'
                     + ' onclick="seleccionarPerfil(' + p.id + ',\'' + p.pref_descripcion.replace(/'/g, "\\'") + '\')">'
                     + p.pref_descripcion + '</a>';
              }).join('');
        $("#listaPerfil").html(lista).show();
    })
    .fail(function() { $("#listaPerfil").hide(); });
}

function seleccionarPerfil(id, descripcion) {
    $("#perfil_id").val(id);
    $("#perfil_desc").val(descripcion);
    $("#listaPerfil").hide().html("");
}

