var CHART_COLORS = ['#2980b9','#27ae60','#e74c3c','#f39c12','#8e44ad','#16a085','#d35400','#2c3e50','#c0392b','#1abc9c'];
var _charts = {};

// ── Helpers ──────────────────────────────────────────────────────────────────

function ymd(ddmmyyyy) {
    if (!ddmmyyyy) return '';
    var p = ddmmyyyy.split('/');
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : ddmmyyyy;
}

function getDesde() { return ymd(document.getElementById('g_desde').value); }
function getHasta() { return ymd(document.getElementById('g_hasta').value); }

function validarFechasGlobales() {
    var d = getDesde(), h = getHasta();
    if (!d || !h) { swal('Advertencia', 'Debe seleccionar el rango de fechas global.', 'warning'); return false; }
    if (d > h)    { swal('Advertencia', "La fecha 'Desde' no puede ser mayor que 'Hasta'.", 'warning'); return false; }
    return true;
}

function spinner(id, activo) {
    var el = document.getElementById('spin_' + id);
    if (el) { if (activo) el.classList.add('activo'); else el.classList.remove('activo'); }
}

function fmtNum(n) {
    return Number(n).toLocaleString('es-PY');
}

// ── Render helpers ────────────────────────────────────────────────────────────

function renderKpi(id, totales) {
    var el = document.getElementById('kpi_' + id);
    if (!el) return;
    if (!totales || !Object.keys(totales).length) { el.innerHTML = ''; return; }
    el.innerHTML = Object.entries(totales).map(function(e) {
        return '<span class="kpi-box"><b>' + e[1] + '</b> ' + e[0] + '</span>';
    }).join('');
    el.style.marginBottom = '10px';
}

function renderTabla(prefix, columnas, data) {
    var wrap  = document.getElementById('tabla_' + prefix + '_wrap');
    var thead = document.getElementById('thead_' + prefix);
    var tbody = document.getElementById('tbody_' + prefix);
    if (!wrap || !thead || !tbody) return;

    thead.innerHTML = '<tr>' + columnas.map(function(c) {
        return '<th>' + c.label + '</th>';
    }).join('') + '</tr>';

    var keys = columnas.map(function(c) { return c.key; });
    tbody.innerHTML = data.map(function(row) {
        return '<tr>' + keys.map(function(k) {
            var v = row[k];
            return '<td>' + (v !== null && v !== undefined ? v : '') + '</td>';
        }).join('') + '</tr>';
    }).join('');

    wrap.style.display = data.length ? 'block' : 'none';
}

function crearGrafico(canvasId, tipo, labels, datasets, opciones) {
    if (_charts[canvasId]) { _charts[canvasId].destroy(); }
    var ctx = document.getElementById(canvasId);
    if (!ctx) return;

    var chartDatasets = datasets.map(function(ds, i) {
        var color = ds.color || CHART_COLORS[i % CHART_COLORS.length];
        var base = {
            label:           ds.label,
            data:            ds.data,
            backgroundColor: tipo === 'pie' || tipo === 'doughnut'
                ? CHART_COLORS
                : color + 'cc',
            borderColor:     tipo === 'pie' || tipo === 'doughnut'
                ? CHART_COLORS.map(function(c) { return c; })
                : color,
            borderWidth: 1,
        };
        if (tipo === 'line') {
            base.fill = false;
            base.tension = 0.3;
        }
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
                        label: function(ctx) {
                            return ' ' + ctx.dataset.label + ': ' + fmtNum(ctx.raw);
                        }
                    }
                }
            },
            scales: (tipo === 'pie' || tipo === 'doughnut') ? {} : {
                y: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } }
            }
        }, opciones || {})
    });
}

// ── 1. Cuentas a pagar ────────────────────────────────────────────────────────

function buscarCuentasPagar() {
    if (!validarFechasGlobales()) return;
    spinner('cuentas_pagar', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var prov = document.getElementById('f1_proveedor').value.trim();
    var cond = document.getElementById('f1_condicion').value;
    var est  = document.getElementById('f1_estado').value;
    if (prov) params += '&proveedor=' + encodeURIComponent(prov);
    if (cond) params += '&condicion_pago=' + encodeURIComponent(cond);
    if (est)  params += '&estado=' + encodeURIComponent(est);

    $.get(getUrl() + 'informes/gerencial/compras/cuentas-pagar?' + params)
        .done(function(r) {
            renderKpi('cuentas_pagar', r.totales);
            crearGrafico('chart_cuentas_pagar', 'bar', r.labels, r.datasets);
            renderTabla('cuentas_pagar', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('cuentas_pagar', false); });
}

// ── 2. Ítems más comprados ────────────────────────────────────────────────────

function buscarItemsComprados() {
    if (!validarFechasGlobales()) return;
    spinner('items_comprados', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var suc = document.getElementById('f2_sucursal').value.trim();
    var dep = document.getElementById('f2_deposito').value.trim();
    var top = document.getElementById('f2_top').value || 10;
    if (suc) params += '&sucursal=' + encodeURIComponent(suc);
    if (dep) params += '&deposito=' + encodeURIComponent(dep);
    params += '&top_n=' + top;

    $.get(getUrl() + 'informes/gerencial/compras/items-comprados?' + params)
        .done(function(r) {
            renderKpi('items_comprados', r.totales);
            crearGrafico('chart_items_comprados', 'bar', r.labels, r.datasets, {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } }
                }
            });
            renderTabla('items_comprados', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('items_comprados', false); });
}

// ── 3. Ítems más transferidos ─────────────────────────────────────────────────

function buscarItemsTransferidos() {
    if (!validarFechasGlobales()) return;
    spinner('transferidos', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var orig = document.getElementById('f3_orig').value.trim();
    var dest = document.getElementById('f3_dest').value.trim();
    var top  = document.getElementById('f3_top').value || 10;
    if (orig) params += '&dep_origen=' + encodeURIComponent(orig);
    if (dest) params += '&dep_destino=' + encodeURIComponent(dest);
    params += '&top_n=' + top;

    $.get(getUrl() + 'informes/gerencial/compras/items-transferidos?' + params)
        .done(function(r) {
            renderKpi('transferidos', r.totales);
            crearGrafico('chart_transferidos', 'bar', r.labels, r.datasets, {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } }
                }
            });
            renderTabla('transferidos', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('transferidos', false); });
}

// ── 4. Libro de compras por impuesto ──────────────────────────────────────────

function buscarLibroImpuesto() {
    if (!validarFechasGlobales()) return;
    spinner('libro_impuesto', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();

    $.get(getUrl() + 'informes/gerencial/compras/libro-impuesto?' + params)
        .done(function(r) {
            renderKpi('libro_impuesto', r.totales);
            crearGrafico('chart_libro_impuesto', 'doughnut', r.labels, r.datasets);
            renderTabla('libro_impuesto', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('libro_impuesto', false); });
}

// ── 5. Presupuestos por mes ───────────────────────────────────────────────────

function buscarPresupuestosMes() {
    if (!validarFechasGlobales()) return;
    spinner('presupuestos_mes', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var suc = document.getElementById('f5_sucursal').value.trim();
    if (suc) params += '&sucursal=' + encodeURIComponent(suc);

    $.get(getUrl() + 'informes/gerencial/compras/presupuestos-mes?' + params)
        .done(function(r) {
            renderKpi('presupuestos_mes', r.totales);
            crearGrafico('chart_presupuestos_mes', 'line', r.labels, r.datasets, {
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1, callback: function(v) { return fmtNum(v); } } }
                }
            });
            renderTabla('presupuestos_mes', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('presupuestos_mes', false); });
}

// ── 6. Proveedor con más presupuesto ──────────────────────────────────────────

function buscarProveedorPresupuesto() {
    if (!validarFechasGlobales()) return;
    spinner('proveedor_presupuesto', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var top = document.getElementById('f6_top').value || 10;
    params += '&top_n=' + top;

    $.get(getUrl() + 'informes/gerencial/compras/proveedor-presupuesto?' + params)
        .done(function(r) {
            renderKpi('proveedor_presupuesto', r.totales);
            crearGrafico('chart_proveedor_presupuesto', 'bar', r.labels, r.datasets, {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, ticks: { callback: function(v) { return fmtNum(v); } } }
                }
            });
            renderTabla('proveedor_presupuesto', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('proveedor_presupuesto', false); });
}

// ── 7. Ajustes de inventario ──────────────────────────────────────────────────

function buscarAjustes() {
    if (!validarFechasGlobales()) return;
    spinner('ajustes', true);

    var params = 'desde=' + getDesde() + '&hasta=' + getHasta();
    var suc  = document.getElementById('f7_sucursal').value.trim();
    var tipo = document.getElementById('f7_tipo').value;
    if (suc)  params += '&sucursal=' + encodeURIComponent(suc);
    if (tipo) params += '&tipo_ajuste=' + encodeURIComponent(tipo);

    $.get(getUrl() + 'informes/gerencial/compras/ajustes?' + params)
        .done(function(r) {
            renderKpi('ajustes', r.totales);
            crearGrafico('chart_ajustes', 'bar', r.labels, r.datasets, {
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1, callback: function(v) { return fmtNum(v); } } }
                }
            });
            renderTabla('ajustes', r.columnas, r.tabla);
        })
        .fail(function(xhr) { if (xhr.status !== 403) swal('Error', 'No se pudo cargar el informe.', 'error'); })
        .always(function() { spinner('ajustes', false); });
}

// ── Generar todo ──────────────────────────────────────────────────────────────

function buscarTodo() {
    if (!validarFechasGlobales()) return;
    buscarCuentasPagar();
    buscarItemsComprados();
    buscarItemsTransferidos();
    buscarLibroImpuesto();
    buscarPresupuestosMes();
    buscarProveedorPresupuesto();
    buscarAjustes();
}

function exportarPDF() {
    var desde = (document.getElementById('g_desde') || {}).value || '';
    var hasta = (document.getElementById('g_hasta') || {}).value || '';
    if (!desde) {
        swal('Advertencia', 'Primero genere los informes para poder exportar.', 'warning');
        return;
    }
    var ahora = new Date().toLocaleString('es-PY');

    setTimeout(function() {
        var pdf = new jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        var pw = pdf.internal.pageSize.getWidth();
        var ph = pdf.internal.pageSize.getHeight();
        var mx = 8, my = 8;
        var iw = pw - mx * 2;

        pdf.setFillColor(45, 52, 54);
        pdf.rect(mx, my, iw, 11, 'F');
        pdf.setFontSize(13); pdf.setFont(undefined, 'bold'); pdf.setTextColor(255, 255, 255);
        pdf.text('Informe Gerencial — Compras', pw / 2, my + 7.5, { align: 'center' });
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
                && getComputedStyle(card).display !== 'none';
        });

        if (!cards.length) { pdf.save('Informe_Gerencial_Compras.pdf'); return; }

        var i = 0;
        function siguiente() {
            if (i >= cards.length) {
                pdf.save('Informe_Gerencial_Compras_' + desde.replace(/\//g, '-') + '.pdf');
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
    }, 100);
}

function exportarPagina() {
    var desde = (document.getElementById('g_desde') || {}).value || '';
    var hasta = (document.getElementById('g_hasta') || {}).value || '';
    if (!desde) {
        swal('Advertencia', 'Primero genere los informes para poder exportar.', 'warning');
        return;
    }
    var ahora = new Date().toLocaleString('es-PY');
    document.getElementById('print-summary').innerHTML =
        '<strong style="font-size:12pt;">Informe Gerencial — Compras</strong>' +
        '<span style="margin-left:20px;"><strong>Período:</strong> ' + desde + ' al ' + hasta + '</span>' +
        '<span style="float:right;font-size:8.5pt;color:#636e72;">Generado: ' + ahora + '</span>';
    window.print();
}

// ── Init ──────────────────────────────────────────────────────────────────────

$(function () {
    $('.datepicker-ger').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        time: false,
        weekStart: 1,
        switchOnClick: true
    });
});
