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
    document.getElementById("stats_container").innerHTML = "";

    var url = getUrl() + "informes/servicio?tipo=" + tipo + "&desde=" + desdeYmd + "&hasta=" + hastaYmd;

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

// ── ESTADÍSTICAS ──────────────────────────────────────────────────────────────

var _charts          = {};
var _catalogos_stats = {};
var _tipo_actual     = '';
var _desde_actual    = '';
var _hasta_actual    = '';

function fmtNum(n) {
    if (n === null || n === undefined) return '0';
    return Number(n).toLocaleString('es-PY');
}

function buscarEstadisticas(tipo, desde, hasta) {
    _tipo_actual  = tipo;
    _desde_actual = desde;
    _hasta_actual = hasta;

    var url = getUrl() + 'informes/gerencial/servicio/estadisticas'
            + '?tipo=' + encodeURIComponent(tipo)
            + '&desde=' + encodeURIComponent(desde)
            + '&hasta=' + encodeURIComponent(hasta);

    $.ajax({
        url: url,
        method: 'GET',
        success: function (resp) {
            _catalogos_stats = resp.catalogos || {};
            if (resp.secciones && resp.secciones.length) {
                renderEstadisticas(resp.secciones);
            }
        }
    });
}

function renderEstadisticas(secciones) {
    Object.keys(_charts).forEach(function (k) {
        try { _charts[k].destroy(); } catch (e) {}
    });
    _charts = {};

    var html = '<div class="row clearfix">';

    secciones.forEach(function (sec, idx) {
        var filtrosHtml = '';
        if (sec.filtros && sec.filtros.length) {
            filtrosHtml = '<div class="seccion-filtros"><div class="row clearfix">';
            sec.filtros.forEach(function (f) {
                var items = f.id === 'sucursal' ? (_catalogos_stats.sucursales || []) : [];
                var opts  = '<option value="">— Todas —</option>'
                          + items.map(function (it) {
                                return '<option value="' + it.id + '">' + it.nombre + '</option>';
                            }).join('');
                var cls = f.id === 'sucursal' ? ' flt-suc' : '';
                filtrosHtml += '<div class="col-sm-3">'
                             + '<label style="font-size:12px;">' + f.label + '</label>'
                             + '<select class="form-control input-sm' + cls + '" id="flt_' + idx + '_' + f.id + '">'
                             + opts + '</select></div>';
            });
            filtrosHtml += '<div class="col-sm-3" style="padding-top:20px;">'
                         + '<button class="btn btn-xs btn-primary waves-effect" onclick="actualizarSeccion(' + idx + ',\'' + sec.id + '\')">'
                         + '<i class="material-icons" style="font-size:15px;vertical-align:middle;">refresh</i> Actualizar</button>'
                         + '</div></div></div>';
        }

        // tabla
        var tablaHtml = '';
        if (sec.columnas && sec.tabla) {
            var ths = sec.columnas.map(function (c) { return '<th>' + c.label + '</th>'; }).join('');
            var trs = (sec.tabla || []).map(function (row) {
                var tds = sec.columnas.map(function (c) {
                    return '<td>' + (row[c.key] !== null && row[c.key] !== undefined ? row[c.key] : '') + '</td>';
                }).join('');
                return '<tr>' + tds + '</tr>';
            }).join('');
            tablaHtml = '<div class="tabla-resultado" style="max-height:220px;overflow-y:auto;">'
                      + '<table class="table table-bordered table-condensed" style="font-size:12px;margin:0;">'
                      + '<thead><tr>' + ths + '</tr></thead><tbody>' + trs + '</tbody></table></div>';
        }

        html += '<div class="col-md-6"><div class="card">'
              + '<div class="header"><h2>' + sec.titulo + '</h2></div>'
              + '<div class="body">'
              + filtrosHtml
              + '<div class="chart-wrap" style="position:relative;">'
              + '<div class="spinner-overlay" id="spin_' + idx + '"><div class="preloader pl-size-xs"><div class="spinner-layer pl-cyan"><div class="circle-clipper left"><div class="circle"></div></div></div></div></div>'
              + '<canvas id="canvas_' + idx + '" height="200"></canvas>'
              + '</div>'
              + tablaHtml
              + '</div></div></div>';
    });

    html += '</div>';
    document.getElementById('stats_container').innerHTML = html;

    secciones.forEach(function (sec, idx) {
        var canvas = document.getElementById('canvas_' + idx);
        if (canvas && sec.labels && sec.datasets) {
            crearGrafico(canvas, sec);
        }
    });
}

function actualizarSeccion(idx, secId) {
    var spinEl = document.getElementById('spin_' + idx);
    if (spinEl) spinEl.classList.add('activo');

    var sucEl = document.getElementById('flt_' + idx + '_sucursal');

    var params = 'tipo='    + encodeURIComponent(_tipo_actual)
               + '&seccion=' + encodeURIComponent(secId)
               + '&desde='   + encodeURIComponent(_desde_actual)
               + '&hasta='   + encodeURIComponent(_hasta_actual);

    if (sucEl && sucEl.value) params += '&sucursal_id=' + sucEl.value;

    $.ajax({
        url: getUrl() + 'informes/gerencial/servicio/estadisticas/seccion?' + params,
        method: 'GET',
        success: function (resp) {
            if (spinEl) spinEl.classList.remove('activo');
            var sec    = resp.seccion;
            var canvas = document.getElementById('canvas_' + idx);
            if (!canvas) return;

            if (_charts['c_' + idx]) {
                try { _charts['c_' + idx].destroy(); } catch (e) {}
                delete _charts['c_' + idx];
            }

            if (sec.labels && sec.datasets) crearGrafico(canvas, sec);

            if (sec.columnas && sec.tabla) {
                var ths = sec.columnas.map(function (c) { return '<th>' + c.label + '</th>'; }).join('');
                var trs = (sec.tabla || []).map(function (row) {
                    var tds = sec.columnas.map(function (c) {
                        return '<td>' + (row[c.key] !== null && row[c.key] !== undefined ? row[c.key] : '') + '</td>';
                    }).join('');
                    return '<tr>' + tds + '</tr>';
                }).join('');
                var wrap = canvas.closest('.body').querySelector('.tabla-resultado');
                if (wrap) {
                    wrap.innerHTML = '<table class="table table-bordered table-condensed" style="font-size:12px;margin:0;">'
                                   + '<thead><tr>' + ths + '</tr></thead><tbody>' + trs + '</tbody></table>';
                }
            }
        },
        error: function () {
            if (spinEl) spinEl.classList.remove('activo');
        }
    });
}

function crearGrafico(canvas, sec) {
    var paleta = ['#3498db','#2ecc71','#e74c3c','#f39c12','#9b59b6','#1abc9c','#d35400','#2980b9','#27ae60','#c0392b'];

    var datasets = (sec.datasets || []).map(function (ds, di) {
        var color = ds.color || paleta[di % paleta.length];
        if (sec.tipo_grafico === 'doughnut' || sec.tipo_grafico === 'pie') {
            return {
                label: ds.label || '',
                data: ds.data || [],
                backgroundColor: (sec.labels || []).map(function (_, i) { return paleta[i % paleta.length]; }),
                borderWidth: 1
            };
        }
        return {
            label: ds.label || '',
            data: ds.data || [],
            backgroundColor: color + 'cc',
            borderColor: color,
            borderWidth: 1.5,
            fill: sec.tipo_grafico === 'line' ? false : undefined,
            tension: 0.3
        };
    });

    var opts = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true, position: 'top' } }
    };

    if (sec.opciones) Object.assign(opts, sec.opciones);

    var chartType = sec.tipo_grafico || 'bar';
    if (chartType === 'bar' && sec.opciones && sec.opciones.indexAxis === 'y') {
        opts.indexAxis = 'y';
        chartType = 'bar';
    }

    _charts['c_' + canvas.id.replace('canvas_', '')] = new Chart(canvas, {
        type: chartType,
        data: { labels: sec.labels || [], datasets: datasets },
        options: opts
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
                    if (cursorY + ih > ph - my) { pdf.addPage(); cursorY = my; }
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', mx, cursorY, iw, ih);
                    cursorY += ih + 4;
                } else {
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

