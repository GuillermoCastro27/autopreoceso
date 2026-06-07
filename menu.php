<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Panel de Control — AUTOPROCESOS</title>
    <link rel="icon" href="images.ico" type="image/x-icon">

    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- AdminBSB base -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="plugins/node-waves/waves.css" rel="stylesheet">
    <link href="plugins/animate-css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/themes/all-themes.css" rel="stylesheet">

    <style>
        /* ── Variables ──────────────────────────────────────── */
        :root {
            --blue:   #3b82f6;
            --green:  #10b981;
            --red:    #ef4444;
            --yellow: #f59e0b;
            --purple: #8b5cf6;
            --bg:     #f1f5f9;
            --card:   #ffffff;
            --text:   #1e293b;
            --muted:  #64748b;
            --border: #e2e8f0;
            --radius: 12px;
            --shadow: 0 1px 3px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.06);
        }

        /* ── Fondo general del contenido ────────────────────── */
        .content {
            background: var(--bg) !important;
            font-family: 'Inter', 'Roboto', sans-serif !important;
        }
        .block-header {
            display: none !important;   /* eliminamos el encabezado viejo */
        }

        /* ── Encabezado del dashboard ───────────────────────── */
        .dash-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 0 14px;
        }
        .dash-header h1 {
            font-size: 20px;
            font-weight: 700;
            color: var(--text);
            margin: 0;
            letter-spacing: -.3px;
        }
        .dash-header small {
            font-size: 12px;
            color: var(--muted);
            font-weight: 400;
            margin-left: 8px;
        }
        .btn-refresh {
            display: flex;
            align-items: center;
            gap: 5px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 6px 14px;
            font-size: 13px;
            color: var(--muted);
            cursor: pointer;
            transition: .15s;
        }
        .btn-refresh:hover { background: var(--border); color: var(--text); }

        /* ── Tarjetas KPI ───────────────────────────────────── */
        .kpi-card {
            background: var(--card);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            padding: 18px 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 16px;
            transition: transform .15s;
            text-decoration: none !important;
            color: inherit !important;
            display: block;
        }
        .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,.1); }
        .kpi-inner { display: flex; align-items: center; gap: 14px; }
        .kpi-icon {
            width: 48px; height: 48px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .kpi-icon .material-icons { font-size: 24px; color: #fff; }
        .kpi-icon.blue   { background: var(--blue); }
        .kpi-icon.green  { background: var(--green); }
        .kpi-icon.red    { background: var(--red); }
        .kpi-icon.yellow { background: var(--yellow); }
        .kpi-icon.purple { background: var(--purple); }
        .kpi-body { flex: 1; min-width: 0; }
        .kpi-value {
            font-size: 22px;
            font-weight: 700;
            color: var(--text);
            line-height: 1.1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .kpi-label {
            font-size: 11px;
            font-weight: 600;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: .5px;
            margin-top: 2px;
        }
        .kpi-trend {
            font-size: 11px;
            font-weight: 600;
            margin-top: 4px;
        }
        .trend-up   { color: var(--green); }
        .trend-down { color: var(--red); }
        .trend-neu  { color: var(--muted); }

        /* ── Tarjetas de gráficos ───────────────────────────── */
        .dash-card {
            background: var(--card);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            margin-bottom: 16px;
            overflow: hidden;
        }
        .dash-card-header {
            padding: 14px 18px 10px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: baseline;
            gap: 6px;
        }
        .dash-card-header h3 {
            font-size: 14px;
            font-weight: 600;
            color: var(--text);
            margin: 0;
        }
        .dash-card-header span {
            font-size: 11px;
            color: var(--muted);
        }
        .dash-card-body { padding: 14px 16px; }

        /* ── Tabla de presupuestos ──────────────────────────── */
        .presup-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .presup-table th {
            text-align: left;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .5px;
            color: var(--muted);
            padding: 6px 10px;
            border-bottom: 1px solid var(--border);
        }
        .presup-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #f8fafc;
            color: var(--text);
            vertical-align: middle;
        }
        .presup-table tr:last-child td { border-bottom: none; }
        .badge-dias {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
        }
        .badge-dias.warn  { background: #fef3c7; color: #92400e; }
        .badge-dias.alert { background: #fee2e2; color: #991b1b; }
        .btn-ver {
            font-size: 11px;
            padding: 3px 10px;
            border-radius: 6px;
            border: 1px solid var(--blue);
            color: var(--blue);
            background: #eff6ff;
            text-decoration: none;
            display: inline-block;
        }
        .btn-ver:hover { background: var(--blue); color: #fff; }
        .empty-state {
            text-align: center;
            color: var(--muted);
            font-size: 13px;
            padding: 24px 0;
        }
        .empty-state .material-icons { font-size: 32px; display: block; margin-bottom: 6px; opacity: .4; }
    </style>
</head>

<body class="theme-red">

    <?php require_once('opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <!-- ── Encabezado ───────────────────────────────── -->
            <div class="dash-header">
                <div>
                    <h1>Panel de Control <small id="dash-fecha"></small></h1>
                </div>
                <button class="btn-refresh" onclick="cargarDashboard()">
                    <i class="material-icons" style="font-size:15px;">refresh</i> Actualizar
                </button>
            </div>

            <!-- ── KPI Cards ────────────────────────────────── -->
            <div class="row">

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/Ventas/gestionar_ventas/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon green"><i class="material-icons">trending_up</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-ventas">—</div>
                                <div class="kpi-label">Ventas del Mes</div>
                                <div class="kpi-trend trend-neu" id="kpi-trend">calculando…</div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/compras/pedido/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon blue"><i class="material-icons">shopping_cart</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-pedidos">—</div>
                                <div class="kpi-label">Pedidos Pendientes</div>
                                <div class="kpi-trend trend-neu">sin procesar</div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/referenciales/items/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon red"><i class="material-icons">warning</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-stock">—</div>
                                <div class="kpi-label">Stock Crítico</div>
                                <div class="kpi-trend trend-neu">ítems bajo mínimo</div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/Servicio/Reclamo_cli/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon yellow"><i class="material-icons">report_problem</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-reclamos">—</div>
                                <div class="kpi-label">Reclamos Abiertos</div>
                                <div class="kpi-trend trend-neu">pendientes + en proceso</div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/compras/presupuesto/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon purple"><i class="material-icons">description</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-presup">—</div>
                                <div class="kpi-label">Presup. sin convertir</div>
                                <div class="kpi-trend trend-neu">más de 15 días</div>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding:0 8px;">
                    <a href="/taller_front/Ventas/cobros/" class="kpi-card">
                        <div class="kpi-inner">
                            <div class="kpi-icon" style="background:#06b6d4;"><i class="material-icons">payments</i></div>
                            <div class="kpi-body">
                                <div class="kpi-value" id="kpi-cobros">—</div>
                                <div class="kpi-label">Cobros del Mes</div>
                                <div class="kpi-trend trend-neu">cobros confirmados</div>
                            </div>
                        </div>
                    </a>
                </div>

            </div><!-- /KPI row -->

            <!-- ── Gráficos fila 1 ───────────────────────────── -->
            <div class="row">

                <div class="col-md-7 col-sm-12" style="padding:0 8px;">
                    <div class="dash-card">
                        <div class="dash-card-header">
                            <h3>Ventas últimos 6 meses</h3>
                            <span>total en Gs.</span>
                        </div>
                        <div class="dash-card-body">
                            <canvas id="chartVentas" height="80"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 col-sm-12" style="padding:0 8px;">
                    <div class="dash-card">
                        <div class="dash-card-header">
                            <h3>Top 5 productos</h3>
                            <span>unidades vendidas · últimos 6 meses</span>
                        </div>
                        <div class="dash-card-body">
                            <canvas id="chartProductos" height="130"></canvas>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ── Gráficos fila 2: Ventas vs Compras ──────────── -->
            <div class="row">

                <div class="col-md-12" style="padding:0 8px;">
                    <div class="dash-card">
                        <div class="dash-card-header">
                            <h3>Ventas vs Compras últimos 6 meses</h3>
                            <span>total en Gs.</span>
                        </div>
                        <div class="dash-card-body">
                            <canvas id="chartVsCompras" height="60"></canvas>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ── Gráficos fila 3 ───────────────────────────── -->
            <div class="row">

                <div class="col-md-5 col-sm-12" style="padding:0 8px;">
                    <div class="dash-card">
                        <div class="dash-card-header">
                            <h3>Ventas por sucursal</h3>
                            <span>últimos 6 meses</span>
                        </div>
                        <div class="dash-card-body" style="display:flex;align-items:center;justify-content:center;">
                            <canvas id="chartSucursal" height="160" style="max-width:320px;"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-md-7 col-sm-12" style="padding:0 8px;">
                    <div class="dash-card">
                        <div class="dash-card-header">
                            <h3>Presupuestos sin convertir</h3>
                            <span>confirmados hace más de 15 días</span>
                        </div>
                        <div class="dash-card-body" style="padding:0;">
                            <table class="presup-table">
                                <thead>
                                    <tr>
                                        <th>Proveedor</th>
                                        <th>Fecha</th>
                                        <th>Días</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tbPresup">
                                    <tr><td colspan="4" class="empty-state">
                                        <i class="material-icons">hourglass_empty</i>cargando…
                                    </td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div><!-- /fila 2 -->

        </div><!-- /container-fluid -->
    </section>

    <!-- Scripts -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.js"></script>
    <script src="plugins/bootstrap-select/js/bootstrap-select.js"></script>
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="plugins/node-waves/waves.js"></script>
    <script src="plugins/chartjs/Chart.bundle.js"></script>
    <script src="js/admin.js?v=3"></script>
    <script src="js/demo.js"></script>
    <script src="js/ruta.js"></script>

    <script>
    (function () {

        var MESES  = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        var COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'];

        /* fecha actual en el encabezado */
        var hoy = new Date();
        document.getElementById('dash-fecha').textContent =
            hoy.toLocaleDateString('es-PY', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

        /* formato guaraníes */
        function gs(n) {
            n = Math.round(n);
            if (n >= 1000000) return 'Gs. ' + (n / 1000000).toFixed(1).replace('.', ',') + ' M';
            if (n >= 1000)    return 'Gs. ' + Math.round(n / 1000) + ' K';
            return 'Gs. ' + n.toLocaleString('es-PY');
        }
        function gsExacto(n) {
            return 'Gs. ' + Math.round(n).toLocaleString('es-PY');
        }

        var chartVentas     = null;
        var chartProductos  = null;
        var chartSucursal   = null;
        var chartVsCompras  = null;

        function destruir(c) { if (c) c.destroy(); }

        /* ── KPI cards ──────────────────────────────────────── */
        function cargarResumen() {
            $.get(getUrl() + 'dashboard/resumen')
                .done(function (d) {
                    $('#kpi-pedidos').text(d.pedidos_pendientes);
                    $('#kpi-stock').text(d.stock_critico);
                    $('#kpi-reclamos').text(d.reclamos_abiertos);
                    $('#kpi-presup').text(d.presupuestos_viejos);
                    $('#kpi-ventas').text(gs(d.ventas_mes_actual));
                    $('#kpi-cobros').text(gs(d.cobros_mes));

                    var ant = d.ventas_mes_anterior;
                    var act = d.ventas_mes_actual;
                    var $t  = $('#kpi-trend');
                    if (ant > 0) {
                        var pct = ((act - ant) / ant * 100);
                        var cls = pct >= 0 ? 'trend-up' : 'trend-down';
                        var sig = pct >= 0 ? '▲' : '▼';
                        $t.removeClass('trend-up trend-down trend-neu').addClass(cls)
                          .text(sig + ' ' + Math.abs(pct).toFixed(1) + '% vs mes anterior');
                    } else {
                        $t.removeClass('trend-up trend-down').addClass('trend-neu')
                          .text('primer mes con datos');
                    }
                })
                .fail(function () {
                    $('.kpi-value').text('—');
                });
        }

        /* ── Línea: ventas por mes ──────────────────────────── */
        function cargarVentasMes() {
            $.get(getUrl() + 'dashboard/ventas-por-mes')
                .done(function (rows) {
                    destruir(chartVentas);
                    var labels = rows.map(function (r) { return MESES[r.mes_num] + ' ' + r.anio; });
                    var data   = rows.map(function (r) { return parseFloat(r.total); });

                    chartVentas = new Chart(document.getElementById('chartVentas'), {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Ventas',
                                data: data,
                                borderColor: '#3b82f6',
                                backgroundColor: 'rgba(59,130,246,.08)',
                                borderWidth: 2.5,
                                pointBackgroundColor: '#3b82f6',
                                pointRadius: 4,
                                pointHoverRadius: 6,
                                fill: true,
                                lineTension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            legend: { display: false },
                            tooltips: {
                                callbacks: {
                                    label: function (item) {
                                        return ' ' + gsExacto(item.yLabel);
                                    }
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontSize: 10,
                                        callback: function (v) { return gs(v); }
                                    },
                                    gridLines: { color: 'rgba(0,0,0,.05)' }
                                }],
                                xAxes: [{
                                    gridLines: { display: false },
                                    ticks: { fontSize: 11 }
                                }]
                            }
                        }
                    });
                });
        }

        /* ── Barras horizontales: top productos ─────────────── */
        function cargarTopProductos() {
            $.get(getUrl() + 'dashboard/top-productos')
                .done(function (rows) {
                    destruir(chartProductos);
                    var labels = rows.map(function (r) {
                        var p = r.producto || '';
                        return p.length > 20 ? p.substring(0, 20) + '…' : p;
                    });
                    var data = rows.map(function (r) { return r.total_vendido; });

                    chartProductos = new Chart(document.getElementById('chartProductos'), {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Unidades',
                                data: data,
                                backgroundColor: COLORS.slice(0, rows.length)
                            }]
                        },
                        options: {
                            responsive: true,
                            legend: { display: false },
                            tooltips: {
                                callbacks: {
                                    label: function (item) {
                                        return ' ' + item.xLabel + ' unidades';
                                    }
                                }
                            },
                            scales: {
                                xAxes: [{
                                    ticks: { fontSize: 10, beginAtZero: true },
                                    gridLines: { color: 'rgba(0,0,0,.05)' }
                                }],
                                yAxes: [{
                                    ticks: { fontSize: 10 },
                                    gridLines: { display: false }
                                }]
                            }
                        }
                    });
                });
        }

        /* ── Donut: ventas por sucursal ─────────────────────── */
        function cargarSucursal() {
            $.get(getUrl() + 'dashboard/ventas-por-sucursal')
                .done(function (rows) {
                    destruir(chartSucursal);
                    var labels = rows.map(function (r) { return r.sucursal; });
                    var data   = rows.map(function (r) { return parseFloat(r.total); });

                    chartSucursal = new Chart(document.getElementById('chartSucursal'), {
                        type: 'doughnut',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: data,
                                backgroundColor: COLORS.slice(0, rows.length),
                                borderWidth: 2,
                                borderColor: '#fff'
                            }]
                        },
                        options: {
                            responsive: true,
                            cutoutPercentage: 65,
                            legend: {
                                position: 'bottom',
                                labels: { fontSize: 11, padding: 10 }
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (item, data) {
                                        var dataset = data.datasets[item.datasetIndex];
                                        var total   = dataset.data.reduce(function (a, b) { return a + b; }, 0);
                                        var val     = dataset.data[item.index];
                                        var pct     = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                                        return ' ' + data.labels[item.index] + ': ' + gsExacto(val) + ' (' + pct + '%)';
                                    }
                                }
                            }
                        }
                    });
                });
        }

        /* ── Barras agrupadas: Ventas vs Compras ───────────────── */
        function cargarVentasVsCompras() {
            $.get(getUrl() + 'dashboard/ventas-vs-compras')
                .done(function (rows) {
                    destruir(chartVsCompras);
                    var labels   = rows.map(function (r) { return MESES[r.mes_num] + ' ' + r.anio; });
                    var ventas   = rows.map(function (r) { return parseFloat(r.ventas); });
                    var compras  = rows.map(function (r) { return parseFloat(r.compras); });

                    chartVsCompras = new Chart(document.getElementById('chartVsCompras'), {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Ventas',
                                    data: ventas,
                                    backgroundColor: 'rgba(16,185,129,.75)',
                                    borderColor: '#10b981',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Compras',
                                    data: compras,
                                    backgroundColor: 'rgba(239,68,68,.65)',
                                    borderColor: '#ef4444',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            legend: { position: 'top', labels: { fontSize: 12, padding: 16 } },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function (item, data) {
                                        return ' ' + data.datasets[item.datasetIndex].label +
                                               ': ' + gsExacto(item.yLabel);
                                    }
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        fontSize: 10,
                                        callback: function (v) { return gs(v); }
                                    },
                                    gridLines: { color: 'rgba(0,0,0,.05)' }
                                }],
                                xAxes: [{
                                    gridLines: { display: false },
                                    ticks: { fontSize: 11 }
                                }]
                            }
                        }
                    });
                });
        }

        /* ── Tabla: presupuestos sin convertir ──────────────── */
        function cargarPresupuestos() {
            $.get(getUrl() + 'dashboard/presupuestos-detalle')
                .done(function (rows) {
                    var $tb = $('#tbPresup');
                    $tb.empty();
                    if (!rows || rows.length === 0) {
                        $tb.html('<tr><td colspan="4" class="empty-state">' +
                            '<i class="material-icons">check_circle</i>Sin presupuestos pendientes</td></tr>');
                        return;
                    }
                    rows.forEach(function (r) {
                        var cls  = r.dias > 30 ? 'alert' : 'warn';
                        var dias = '<span class="badge-dias ' + cls + '">' + r.dias + ' días</span>';
                        $tb.append(
                            '<tr>' +
                            '<td title="' + r.proveedor + '">' +
                                (r.proveedor.length > 22 ? r.proveedor.substring(0,22)+'…' : r.proveedor) +
                            '</td>' +
                            '<td>' + r.fecha + '</td>' +
                            '<td>' + dias + '</td>' +
                            '<td><a href="/taller_front/compras/presupuesto/" class="btn-ver">Ver</a></td>' +
                            '</tr>'
                        );
                    });
                })
                .fail(function () {
                    $('#tbPresup').html('<tr><td colspan="4" class="empty-state">' +
                        '<i class="material-icons">error_outline</i>No se pudo cargar</td></tr>');
                });
        }

        /* ── Carga completa ─────────────────────────────────── */
        window.cargarDashboard = function () {
            cargarResumen();
            cargarVentasMes();
            cargarTopProductos();
            cargarSucursal();
            cargarVentasVsCompras();
            cargarPresupuestos();
        };

        cargarDashboard();

    })();
    </script>

</body>
</html>
