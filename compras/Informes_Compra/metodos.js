function ymd(ddmmyyyy) {
    if (!ddmmyyyy) return '';
    var p = ddmmyyyy.split('/');
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : ddmmyyyy;
}

function formatoTabla(titulo) {
    titulo = titulo || "Listado";
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        destroy: true,
        responsive: true,
        buttons: [{
            extend: 'pdfHtml5',
            text: '',
            className: 'dt-pdf-oculto',
            title: titulo,
            orientation: 'landscape',
            pageSize: 'A4',
            exportOptions: { modifier: { search: 'applied', order: 'applied' } },
            customize: function (doc) {
                var desdeEl  = document.getElementById('fecha_desde');
                var hastaEl  = document.getElementById('fecha_hasta');
                var periodo  = (desdeEl && desdeEl.value)
                    ? ('Período: ' + desdeEl.value + ' al ' + (hastaEl ? hastaEl.value : ''))
                    : '';
                var generado = 'Generado el ' + new Date().toLocaleString('es-PY');
                doc.pageMargins = [20, 20, 20, 35];
                doc.defaultStyle.fontSize = 7.5;
                if (periodo) {
                    doc.content.splice(0, 1,
                        {
                            margin: [0, 0, 0, 2],
                            table: { widths: ['*'], body: [[{
                                text: titulo, fontSize: 14, bold: true,
                                color: '#ffffff', fillColor: '#2d3436',
                                alignment: 'center', margin: [0, 8, 0, 8]
                            }]] }, layout: 'noBorders'
                        },
                        {
                            margin: [0, 0, 0, 10],
                            table: { widths: ['*'], body: [[{
                                text: periodo, fontSize: 9, color: '#2d3436',
                                alignment: 'center', fillColor: '#f1f2f6', margin: [0, 4, 0, 4]
                            }]] }, layout: 'noBorders'
                        }
                    );
                    var tbl = doc.content[2] && doc.content[2].table;
                } else {
                    doc.content.splice(0, 1, {
                        margin: [0, 0, 0, 10],
                        table: { widths: ['*'], body: [[{
                            text: titulo, fontSize: 14, bold: true,
                            color: '#ffffff', fillColor: '#2d3436',
                            alignment: 'center', margin: [0, 8, 0, 8]
                        }]] }, layout: 'noBorders'
                    });
                    var tbl = doc.content[1] && doc.content[1].table;
                }
                if (tbl) {
                    var body = tbl.body;
                    var cols = body[0] ? body[0].length : 0;
                    body[0] && body[0].forEach(function (cell) {
                        cell.fillColor = '#2d3436'; cell.color = '#ffffff';
                        cell.bold = true; cell.fontSize = 8; cell.alignment = 'center';
                    });
                    for (var i = 1; i < body.length; i++) {
                        var fill = i % 2 === 0 ? '#f1f2f6' : '#ffffff';
                        body[i].forEach(function (cell) { cell.fillColor = fill; });
                    }
                    tbl.widths = Array(cols).fill('*');
                }
                doc.footer = function (cp, pc) {
                    return { margin: [20, 5, 20, 0], columns: [
                        { text: generado, fontSize: 7, color: '#636e72' },
                        { text: 'Página ' + cp + ' de ' + pc, fontSize: 7, color: '#636e72', alignment: 'right' }
                    ]};
                };
            }
        }],
        iDisplayLength: 25,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function exportarTabla() {
    if (!$.fn.DataTable.isDataTable('.js-exportable')) {
        swal('Advertencia', 'No hay datos para exportar.', 'warning');
        return;
    }
    $('.js-exportable').DataTable().button(0).trigger();
}

function renderizarTotales(totales) {
    var contenedor = document.getElementById("resumen_totales");
    if (!contenedor) return;
    if (!totales || Object.keys(totales).length === 0) {
        contenedor.style.display = "none";
        return;
    }
    contenedor.style.display = "block";
    contenedor.innerHTML = Object.entries(totales)
        .map(function (entry) {
            return '<span style="display:inline-block;background:#2d3436;color:#fff;' +
                   'padding:4px 12px;border-radius:4px;margin-right:8px;font-size:13px;">' +
                   '<b>' + entry[0] + ':</b> ' + entry[1] + '</span>';
        })
        .join('');
}

function buscarInforme() {
    var desde = document.getElementById("fecha_desde").value;
    var hasta = document.getElementById("fecha_hasta").value;
    var tipo  = document.getElementById("tipo").value;

    if (!desde || !hasta) {
        swal("Advertencia", "Debe seleccionar ambas fechas.", "warning");
        return;
    }

    var desdeYmd = ymd(desde);
    var hastaYmd = ymd(hasta);

    if (desdeYmd > hastaYmd) {
        swal("Advertencia", "La fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.", "warning");
        return;
    }

    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }

    document.getElementById("tabla_informes").innerHTML = "";
    document.getElementById("cabecera_tabla").innerHTML = "";

    var url = getUrl() + "informes/compras?tipo=" + tipo + "&desde=" + desdeYmd + "&hasta=" + hastaYmd;

    document.getElementById("contenedor_tabla").style.display = "block";

    $.ajax({
        url: url,
        method: 'GET',
        success: function (resp) {
            var cabecera = resp.columnas.map(function (c) {
                return '<th>' + c.label + '</th>';
            }).join('');
            document.getElementById("cabecera_tabla").innerHTML = cabecera;

            var keys = resp.columnas.map(function (c) { return c.key; });
            var html = resp.data.map(function (row) {
                var celdas = keys.map(function (k) {
                    return '<td>' + (row[k] !== null && row[k] !== undefined ? row[k] : '') + '</td>';
                }).join('');
                return '<tr>' + celdas + '</tr>';
            }).join('');

            document.getElementById("tabla_informes").innerHTML = html;

            renderizarTotales(resp.totales);
            formatoTabla(resp.titulo);
            buscarEstadisticas(tipo, desdeYmd, hastaYmd);
        },
        error: function (xhr) {
            document.getElementById("contenedor_tabla").style.display = "none";
            if (xhr.status !== 403) {
                swal('Error', 'No se pudo cargar el informe.', 'error');
            }
        }
    });
}

function exportarPDF() {
    var desde   = (document.getElementById('fecha_desde') || {}).value || '';
    var hasta   = (document.getElementById('fecha_hasta') || {}).value || '';
    if (!desde) {
        swal('Advertencia', 'Primero realice una búsqueda para poder exportar.', 'warning');
        return;
    }
    var tipoEl  = document.getElementById('tipo');
    var tipoTxt = tipoEl ? tipoEl.options[tipoEl.selectedIndex].text : '';
    var ahora   = new Date().toLocaleString('es-PY');

    var hasDT = $.fn.DataTable.isDataTable('.js-exportable');
    var dt = hasDT ? $('.js-exportable').DataTable() : null;

    function doCapture() {
        var pdf = new jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        var pw = pdf.internal.pageSize.getWidth();
        var ph = pdf.internal.pageSize.getHeight();
        var mx = 8, my = 8;
        var iw = pw - mx * 2;

        // Encabezado como texto (nítido, sin captura de imagen)
        pdf.setFillColor(45, 52, 54);
        pdf.rect(mx, my, iw, 11, 'F');
        pdf.setFontSize(13); pdf.setFont(undefined, 'bold'); pdf.setTextColor(255, 255, 255);
        pdf.text(tipoTxt || 'Informe', pw / 2, my + 7.5, { align: 'center' });
        pdf.setFontSize(9); pdf.setFont(undefined, 'normal'); pdf.setTextColor(50, 50, 50);
        pdf.text('Período: ' + desde + ' al ' + hasta, mx, my + 17);
        pdf.setFontSize(7); pdf.setTextColor(100, 110, 114);
        pdf.text('Generado: ' + ahora, pw - mx, my + 17, { align: 'right' });
        pdf.setTextColor(0);

        var cursorY = my + 22;

        // Recolectar tarjetas visibles (no anidadas, no ocultas, no filtros)
        var section = document.querySelector('section.content') || document.body;
        var cards = Array.from(section.querySelectorAll('.card')).filter(function(card) {
            var parent = card.parentElement;
            while (parent && parent !== section) {
                if (parent.classList && parent.classList.contains('card')) return false;
                parent = parent.parentElement;
            }
            return card.offsetParent !== null
                && !card.classList.contains('no-print')
                && getComputedStyle(card).display !== 'none'
                && !card.querySelector('input.datepicker-informe');
        });

        if (!cards.length) {
            if (dt) dt.page.len(25).draw();
            pdf.save('Informe.pdf');
            return;
        }

        var i = 0;
        function siguiente() {
            if (i >= cards.length) {
                if (dt) dt.page.len(25).draw();
                var nombre = (tipoTxt || 'informe').replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, '').replace(/\s+/g, '_');
                pdf.save('Informe_' + nombre + '_' + desde.replace(/\//g, '-') + '.pdf');
                return;
            }
            var card = cards[i++];
            html2canvas(card, {
                scale: 1.5, useCORS: true, logging: false,
                onclone: function(clonedDoc) {
                    // Eliminar restricciones de altura/overflow para capturar contenido completo
                    clonedDoc.querySelectorAll('.table-responsive, .tabla-resultado').forEach(function(el) {
                        el.style.maxHeight = 'none';
                        el.style.height = 'auto';
                        el.style.overflow = 'visible';
                        el.style.overflowY = 'visible';
                    });
                }
            }).then(function(canvas) {
                var ih = (canvas.height / canvas.width) * iw;

                if (ih <= ph - my * 2) {
                    // La tarjeta cabe en una sola página
                    if (cursorY + ih > ph - my) { pdf.addPage(); cursorY = my; }
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', mx, cursorY, iw, ih);
                    cursorY += ih + 4;
                } else {
                    // Tarjeta más alta que una página: recorte limpio por secciones
                    if (cursorY + 30 > ph - my) { pdf.addPage(); cursorY = my; }
                    var pxPerMm = canvas.width / iw;
                    var sliceStart = 0;
                    while (sliceStart < canvas.height) {
                        var availMm = ph - cursorY - my;
                        var slicePx = Math.min(availMm * pxPerMm, canvas.height - sliceStart);
                        var sliceMm = slicePx / pxPerMm;
                        var tmp = document.createElement('canvas');
                        tmp.width = canvas.width;
                        tmp.height = Math.ceil(slicePx);
                        tmp.getContext('2d').drawImage(canvas, 0, sliceStart, canvas.width, slicePx, 0, 0, tmp.width, tmp.height);
                        pdf.addImage(tmp.toDataURL('image/png'), 'PNG', mx, cursorY, iw, sliceMm);
                        sliceStart += slicePx;
                        cursorY += sliceMm;
                        if (sliceStart < canvas.height) { pdf.addPage(); cursorY = my; }
                    }
                    cursorY += 4;
                }
                siguiente();
            });
        }
        siguiente();
    }

    if (dt) { dt.page.len(-1).draw(); setTimeout(doCapture, 600); }
    else setTimeout(doCapture, 100);
}

function exportarPagina() {
    var desde  = (document.getElementById('fecha_desde') || {}).value || '';
    var hasta  = (document.getElementById('fecha_hasta') || {}).value || '';
    if (!desde) {
        swal('Advertencia', 'Primero realice una búsqueda para poder exportar.', 'warning');
        return;
    }
    var tipoEl  = document.getElementById('tipo');
    var tipoTxt = tipoEl ? tipoEl.options[tipoEl.selectedIndex].text : '';
    var ahora   = new Date().toLocaleString('es-PY');
    document.getElementById('print-summary').innerHTML =
        '<strong style="font-size:12pt;">' + tipoTxt + '</strong>' +
        '<span style="margin-left:20px;"><strong>Período:</strong> ' + desde + ' al ' + hasta + '</span>' +
        '<span style="float:right;font-size:8.5pt;color:#636e72;">Generado: ' + ahora + '</span>';
    var hasDT = $.fn.DataTable.isDataTable('.js-exportable');
    if (hasDT) {
        var dt = $('.js-exportable').DataTable();
        dt.page.len(-1).draw();
        window.addEventListener('afterprint', function restoreDT() {
            dt.page.len(25).draw();
            window.removeEventListener('afterprint', restoreDT);
        });
        setTimeout(function () { window.print(); }, 400);
    } else {
        window.print();
    }
}

$(function () {
    $('.datepicker-informe').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        time: false,
        weekStart: 1,
        switchOnClick: true
    });
    document.getElementById("contenedor_tabla").style.display = "none";
});

// ─────────────────────────────────────────────────────────────────────────────
// ESTADÍSTICAS DINÁMICAS POR TIPO
// ─────────────────────────────────────────────────────────────────────────────

function buscarEstadisticas(tipo, desde, hasta) {
    _tipo_actual  = tipo;
    _desde_actual = desde;
    _hasta_actual = hasta;
    var container = document.getElementById('stats_container');
    if (!container) return;
    container.innerHTML = '<div class="col-md-12" style="padding:20px;text-align:center;"><i class="material-icons" style="font-size:32px;color:#2980b9;">hourglass_empty</i><br>Cargando estadísticas...</div>';

    $.get(getUrl() + 'informes/gerencial/compras/estadisticas?tipo=' + encodeURIComponent(tipo) + '&desde=' + desde + '&hasta=' + hasta)
        .done(function(r) {
            _catalogos_stats = r.catalogos || { sucursales: [], depositos: [] };
            renderEstadisticas(r.secciones || []);
        })
        .fail(function() { container.innerHTML = ''; });
}

function renderEstadisticas(secciones) {
    var container = document.getElementById('stats_container');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(_charts).forEach(function(k) { try { _charts[k].destroy(); } catch(e){} });
    _charts = {};

    if (!secciones.length) return;

    secciones.forEach(function(sec, idx) {
        var canvasId = 'dyn_chart_' + idx;
        var col      = (sec.tipo_grafico === 'doughnut' || sec.tipo_grafico === 'pie') ? 'col-sm-5' : 'col-sm-12';
        var tablaCol = (sec.tipo_grafico === 'doughnut' || sec.tipo_grafico === 'pie') ? 'col-sm-7' : 'col-sm-12';
        var minH     = (sec.tipo_grafico === 'bar' && sec.opciones && sec.opciones.indexAxis === 'y')
                       ? Math.max(260, (sec.labels || []).length * 28) + 'px'
                       : '260px';

        // Fila de filtros para secciones que los definen
        var filtrosHtml = '';
        if (sec.filtros && sec.filtros.length) {
            filtrosHtml = '<div class="row clearfix" style="background:#f8f9fa;border:1px solid #ddd;border-radius:4px;padding:8px 6px 4px;margin-bottom:12px;">';
            sec.filtros.forEach(function(f) {
                var selId = 'flt_' + idx + '_' + f.id;
                var attrs = f.id === 'sucursal'
                    ? 'id="' + selId + '" class="form-control input-sm flt-suc" data-secidx="' + idx + '"'
                    : 'id="' + selId + '" class="form-control input-sm"';
                filtrosHtml += '<div class="col-sm-3"><label style="font-size:11px;margin-bottom:2px;">' + f.label + '</label>'
                    + '<select ' + attrs + ' style="font-size:11px;"><option value="">— Todos —</option>';
                var items = f.id === 'sucursal'      ? (_catalogos_stats.sucursales     || [])
                         : f.id === 'deposito'      ? (_catalogos_stats.depositos      || [])
                         : f.id === 'proveedor'     ? (_catalogos_stats.proveedores    || [])
                         : f.id === 'tipo_impuesto' ? (_catalogos_stats.tipos_impuesto || [])
                         : f.id === 'tipo_nrc'      ? (_catalogos_stats.tipos_nota_remi || [])
                         : f.id === 'tipo_ajuste'   ? (_catalogos_stats.tipos_ajuste    || [])
                         : f.id === 'tipo_nc'       ? (_catalogos_stats.tipos_nota_comp || [])
                         : [];
                items.forEach(function(item) {
                    filtrosHtml += '<option value="' + item.id + '">' + item.nombre + '</option>';
                });
                filtrosHtml += '</select></div>';
            });
            filtrosHtml += '<div class="col-sm-3" style="padding-top:18px;">'
                + '<button class="btn btn-info btn-sm waves-effect" onclick="actualizarSeccion(' + idx + ',\'' + sec.id + '\')">'
                + '<i class="material-icons" style="font-size:14px;vertical-align:middle;">refresh</i> Actualizar</button>'
                + '</div></div>';
        }

        var html = '<div class="card card-industrial" id="dyn_card_' + idx + '">'
            + '<div class="header"><h2><i class="material-icons">bar_chart</i> ' + sec.titulo + '</h2></div>'
            + '<div class="body">'
            + filtrosHtml
            + '<div class="row clearfix">'
            + '<div class="' + col + '">'
            + '<div class="chart-wrap" style="min-height:' + minH + ';">'
            + '<canvas id="' + canvasId + '"></canvas>'
            + '</div></div>';

        if (sec.tabla && sec.tabla.length && sec.columnas && sec.columnas.length) {
            html += '<div class="' + tablaCol + '">'
                + '<div class="table-responsive" style="max-height:320px;overflow-y:auto;">'
                + '<table class="table table-bordered table-condensed table-striped" style="font-size:11px;">'
                + '<thead><tr>' + sec.columnas.map(function(c) { return '<th>' + c.label + '</th>'; }).join('') + '</tr></thead>'
                + '<tbody id="dyn_tbody_' + idx + '">'
                + sec.tabla.map(function(row) {
                    return '<tr>' + sec.columnas.map(function(c) {
                        var v = row[c.key];
                        return '<td>' + (v !== null && v !== undefined ? v : '') + '</td>';
                    }).join('') + '</tr>';
                }).join('')
                + '</tbody></table></div></div>';
        }

        html += '</div></div></div>';
        container.insertAdjacentHTML('beforeend', html);

        var optsExtra = sec.opciones || {};
        if (optsExtra.indexAxis === 'y') {
            optsExtra.scales = { x: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } } };
        }
        crearGrafico(canvasId, sec.tipo_grafico, sec.labels || [], sec.datasets || [], optsExtra);
    });
}

var CHART_COLORS = ['#2980b9','#27ae60','#e74c3c','#f39c12','#8e44ad','#16a085','#d35400','#2c3e50','#c0392b','#1abc9c'];
var _charts          = {};
var _catalogos_stats = { sucursales: [], depositos: [] };
var _tipo_actual     = '';
var _desde_actual    = '';
var _hasta_actual    = '';
function fmtNum(n) {
    return Number(n).toLocaleString('es-PY');
}

function crearGrafico(canvasId, tipo, labels, datasets, opciones) {
    if (_charts[canvasId]) { _charts[canvasId].destroy(); }
    var ctx = document.getElementById(canvasId);
    if (!ctx) return;
    var es_circular = (tipo === 'pie' || tipo === 'doughnut');
    var chartDatasets = datasets.map(function(ds, i) {
        var color = ds.color || CHART_COLORS[i % CHART_COLORS.length];
        var base = {
            label:           ds.label,
            data:            ds.data,
            backgroundColor: es_circular ? CHART_COLORS : color + 'cc',
            borderColor:     es_circular ? CHART_COLORS : color,
            borderWidth: 1
        };
        if (tipo === 'line') { base.fill = false; base.tension = 0.3; }
        return base;
    });
    _charts[canvasId] = new Chart(ctx, {
        type: tipo,
        data: { labels: labels, datasets: chartDatasets },
        options: Object.assign({
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(c) { return ' ' + c.dataset.label + ': ' + fmtNum(c.raw); }
                    }
                }
            },
            scales: es_circular ? {} : {
                y: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } }
            }
        }, opciones || {})
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTROS POR SECCIÓN
// ─────────────────────────────────────────────────────────────────────────────

function actualizarSeccion(idx, secId) {
    var params = 'tipo='    + encodeURIComponent(_tipo_actual)
               + '&seccion=' + encodeURIComponent(secId)
               + '&desde='   + _desde_actual
               + '&hasta='   + _hasta_actual;

    var sucEl    = document.getElementById('flt_' + idx + '_sucursal');
    var depEl    = document.getElementById('flt_' + idx + '_deposito');
    var provEl   = document.getElementById('flt_' + idx + '_proveedor');
    var tipImpEl = document.getElementById('flt_' + idx + '_tipo_impuesto');
    var tipNrcEl = document.getElementById('flt_' + idx + '_tipo_nrc');
    if (sucEl    && sucEl.value)    params += '&sucursal_id='   + encodeURIComponent(sucEl.value);
    if (depEl    && depEl.value)    params += '&deposito_id='   + encodeURIComponent(depEl.value);
    if (provEl   && provEl.value)   params += '&proveedor_id='  + encodeURIComponent(provEl.value);
    if (tipImpEl && tipImpEl.value) params += '&tipo_impuesto=' + encodeURIComponent(tipImpEl.value);
    if (tipNrcEl && tipNrcEl.value) params += '&tipo_nrc='      + encodeURIComponent(tipNrcEl.value);
    var tipAjEl  = document.getElementById('flt_' + idx + '_tipo_ajuste');
    if (tipAjEl  && tipAjEl.value)  params += '&tipo_ajuste='   + encodeURIComponent(tipAjEl.value);
    var tipNcEl  = document.getElementById('flt_' + idx + '_tipo_nc');
    if (tipNcEl  && tipNcEl.value)  params += '&tipo_nc='        + encodeURIComponent(tipNcEl.value);

    var card = document.getElementById('dyn_card_' + idx);
    if (card) card.style.opacity = '0.5';

    $.get(getUrl() + 'informes/gerencial/compras/estadisticas/seccion?' + params)
        .done(function(r) {
            var sec = r.seccion;
            if (!sec) return;
            var canvasId  = 'dyn_chart_' + idx;
            var optsExtra = sec.opciones || {};
            if (optsExtra.indexAxis === 'y') {
                optsExtra.scales = { x: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } } };
            }
            crearGrafico(canvasId, sec.tipo_grafico, sec.labels || [], sec.datasets || [], optsExtra);
            var tbody = document.getElementById('dyn_tbody_' + idx);
            if (tbody && sec.tabla && sec.columnas) {
                tbody.innerHTML = sec.tabla.map(function(row) {
                    return '<tr>' + sec.columnas.map(function(c) {
                        var v = row[c.key];
                        return '<td>' + (v !== null && v !== undefined ? v : '') + '</td>';
                    }).join('') + '</tr>';
                }).join('');
            }
        })
        .fail(function() { swal('Error', 'No se pudo actualizar la sección.', 'error'); })
        .always(function() { if (card) card.style.opacity = '1'; });
}

// Cascada sucursal → depósito en filtros por sección
$(document).on('change', '.flt-suc', function() {
    var idx   = $(this).data('secidx');
    var sucId = $(this).val();
    var $dep  = $('#flt_' + idx + '_deposito');
    if (!$dep.length) return;
    $dep.find('option:not(:first)').remove();
    var deps = sucId
        ? (_catalogos_stats.depositos || []).filter(function(d) { return String(d.sucursal_id) === String(sucId); })
        : (_catalogos_stats.depositos || []);
    deps.forEach(function(d) {
        $dep.append('<option value="' + d.id + '">' + d.nombre + '</option>');
    });
    $dep.val('');
});

