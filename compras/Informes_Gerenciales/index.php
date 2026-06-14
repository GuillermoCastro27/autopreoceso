<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Informe Gerencial — Compras</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />

    <style>
        .seccion-filtros { background:#f8f9fa; border:1px solid #e0e0e0; border-radius:4px; padding:12px 14px; margin-bottom:14px; }
        .kpi-box { display:inline-block; background:#2d3436; color:#fff; padding:5px 14px; border-radius:4px; margin:0 6px 6px 0; font-size:13px; }
        .kpi-box b { font-size:15px; }
        .tabla-resultado { margin-top:14px; }
        .chart-wrap { position:relative; min-height:280px; }
        .spinner-overlay { display:none; position:absolute; top:0; left:0; width:100%; height:100%;
            background:rgba(255,255,255,.75); z-index:10; align-items:center; justify-content:center; }
        .spinner-overlay.activo { display:flex; }

    @media print {
        nav.navbar, #leftsidebar, .sidebar, .preloader, .overlay { display: none !important; }
        section.content { margin-left: 0 !important; padding: 8px !important; }
        body { background: #fff !important; font-size: 9pt; color: #000; }

        .print-only { display: block !important; }
        .no-print    { display: none  !important; }

        .spinner-overlay { display: none !important; }

        .card { box-shadow: none !important; border: 1px solid #ddd !important;
                page-break-inside: avoid; margin-bottom: 8px !important; }
        .card .header { background: #f5f5f5 !important; padding: 8px 12px !important; }
        .card .body { padding: 10px !important; }

        canvas { display: block !important; max-width: 100% !important; height: auto !important; }

        .col-sm-8, .col-md-8 { width: 66% !important; float: left !important; box-sizing: border-box; }
        .col-sm-4, .col-md-4 { width: 33% !important; float: left !important; box-sizing: border-box; }
        .col-sm-6, .col-md-6 { width: 50% !important; float: left !important; box-sizing: border-box; }
        .row.clearfix { overflow: hidden; }

        table { width: 100% !important; font-size: 8pt !important; border-collapse: collapse !important; }
        th, td { padding: 2px 5px !important; border: 1px solid #bbb !important; }

        #print-summary { padding: 8px 14px 6px; background: #f8f9fa !important;
                         border: 1px solid #dee2e6 !important; margin-bottom: 12px;
                         font-size: 10pt; overflow: hidden; }

        .tabla-resultado { display: block !important; max-height: none !important; overflow: visible !important; }
    }
    </style>
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div id="print-summary" class="print-only" style="display:none;"></div>
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ===== ENCABEZADO ===== -->
<div class="card card-industrial">
    <div class="header" style="position:relative;">
        <h2>
            <i class="material-icons">bar_chart</i>
            Informe Gerencial — Módulo Compras
            <small>Análisis estadístico del período seleccionado</small>
        </h2>
        <div class="no-print" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);">
            <button onclick="exportarPDF();" class="btn btn-sm waves-effect"
                    style="background:#c0392b;color:#fff;border:none;padding:7px 13px;margin-right:6px;">
                <i class="material-icons" style="vertical-align:middle;font-size:16px;">picture_as_pdf</i>
                PDF
            </button>
            <button onclick="exportarPagina();" class="btn btn-sm waves-effect"
                    style="background:#2d3436;color:#fff;border:none;padding:7px 13px;">
                <i class="material-icons" style="vertical-align:middle;font-size:16px;">print</i>
                Imprimir
            </button>
        </div>
    </div>
    <div class="body">
        <div class="seccion-filtros no-print">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Desde</label>
                    <input type="text" id="g_desde" class="form-control datepicker-ger" placeholder="DD/MM/YYYY" autocomplete="off">
                </div>
                <div class="col-sm-3">
                    <label>Hasta</label>
                    <input type="text" id="g_hasta" class="form-control datepicker-ger" placeholder="DD/MM/YYYY" autocomplete="off">
                </div>
                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarTodo();">
                        <i class="material-icons">bar_chart</i> Generar Todos los Informes
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ===== 1. CUENTAS A PAGAR ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">account_balance_wallet</i> Cuentas a Pagar por Proveedor</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Proveedor</label>
                    <input type="text" id="f1_proveedor" class="form-control" placeholder="Filtrar por proveedor...">
                </div>
                <div class="col-sm-3">
                    <label>Condición de pago</label>
                    <select id="f1_condicion" class="form-control">
                        <option value="">— Todas —</option>
                        <option value="CONTADO">Contado</option>
                        <option value="CRÉDITO">Crédito</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label>Estado</label>
                    <select id="f1_estado" class="form-control">
                        <option value="">— Todos —</option>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="CONFIRMADO">Confirmado</option>
                        <option value="PROCESADO">Procesado</option>
                        <option value="RECIBIDO">Recibido</option>
                        <option value="ANULADO">Anulado</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarCuentasPagar();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_cuentas_pagar"></div>
        <div class="row clearfix">
            <div class="col-sm-8">
                <div class="chart-wrap">
                    <div class="spinner-overlay" id="spin_cuentas_pagar">
                        <i class="material-icons" style="font-size:36px;color:#2980b9;">hourglass_empty</i>
                    </div>
                    <canvas id="chart_cuentas_pagar"></canvas>
                </div>
            </div>
            <div class="col-sm-4" id="tabla_cuentas_pagar_wrap" style="display:none;">
                <div class="tabla-resultado table-responsive">
                    <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                        <thead id="thead_cuentas_pagar"></thead>
                        <tbody id="tbody_cuentas_pagar"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ===== 2. ÍTEMS MÁS COMPRADOS ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">trending_up</i> Ítems Más Comprados</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Sucursal</label>
                    <input type="text" id="f2_sucursal" class="form-control" placeholder="Filtrar por sucursal...">
                </div>
                <div class="col-sm-3">
                    <label>Depósito</label>
                    <input type="text" id="f2_deposito" class="form-control" placeholder="Filtrar por depósito...">
                </div>
                <div class="col-sm-2">
                    <label>Top N</label>
                    <input type="number" id="f2_top" class="form-control" value="10" min="1" max="50">
                </div>
                <div class="col-sm-2">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarItemsComprados();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_items_comprados"></div>
        <div class="chart-wrap" style="position:relative;">
            <div class="spinner-overlay" id="spin_items_comprados">
                <i class="material-icons" style="font-size:36px;color:#27ae60;">hourglass_empty</i>
            </div>
            <canvas id="chart_items_comprados"></canvas>
        </div>
        <div id="tabla_items_comprados_wrap" class="tabla-resultado" style="display:none;">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                    <thead id="thead_items_comprados"></thead>
                    <tbody id="tbody_items_comprados"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- ===== 3. ÍTEMS MÁS TRANSFERIDOS ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">swap_horiz</i> Ítems Más Transferidos entre Depósitos</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Depósito Origen</label>
                    <input type="text" id="f3_orig" class="form-control" placeholder="Filtrar por origen...">
                </div>
                <div class="col-sm-3">
                    <label>Depósito Destino</label>
                    <input type="text" id="f3_dest" class="form-control" placeholder="Filtrar por destino...">
                </div>
                <div class="col-sm-2">
                    <label>Top N</label>
                    <input type="number" id="f3_top" class="form-control" value="10" min="1" max="50">
                </div>
                <div class="col-sm-2">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarItemsTransferidos();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_transferidos"></div>
        <div class="chart-wrap">
            <div class="spinner-overlay" id="spin_transferidos">
                <i class="material-icons" style="font-size:36px;color:#8e44ad;">hourglass_empty</i>
            </div>
            <canvas id="chart_transferidos"></canvas>
        </div>
        <div id="tabla_transferidos_wrap" class="tabla-resultado" style="display:none;">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                    <thead id="thead_transferidos"></thead>
                    <tbody id="tbody_transferidos"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- ===== 4. LIBRO DE COMPRAS POR IMPUESTO ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">receipt_long</i> Libro de Compras por Tipo de Impuesto</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3 col-sm-offset-9">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarLibroImpuesto();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_libro_impuesto"></div>
        <div class="row clearfix">
            <div class="col-sm-6">
                <div class="chart-wrap">
                    <div class="spinner-overlay" id="spin_libro_impuesto">
                        <i class="material-icons" style="font-size:36px;color:#e74c3c;">hourglass_empty</i>
                    </div>
                    <canvas id="chart_libro_impuesto"></canvas>
                </div>
            </div>
            <div class="col-sm-6" id="tabla_libro_impuesto_wrap" style="display:none;">
                <div class="table-responsive">
                    <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                        <thead id="thead_libro_impuesto"></thead>
                        <tbody id="tbody_libro_impuesto"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ===== 5. PRESUPUESTOS POR MES ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">show_chart</i> Presupuestos Aprobados por Mes</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Sucursal</label>
                    <input type="text" id="f5_sucursal" class="form-control" placeholder="Filtrar por sucursal...">
                </div>
                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarPresupuestosMes();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_presupuestos_mes"></div>
        <div class="chart-wrap">
            <div class="spinner-overlay" id="spin_presupuestos_mes">
                <i class="material-icons" style="font-size:36px;color:#2980b9;">hourglass_empty</i>
            </div>
            <canvas id="chart_presupuestos_mes"></canvas>
        </div>
        <div id="tabla_presupuestos_mes_wrap" class="tabla-resultado" style="display:none;">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                    <thead id="thead_presupuestos_mes"></thead>
                    <tbody id="tbody_presupuestos_mes"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- ===== 6. PROVEEDOR CON MÁS PRESUPUESTO ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">people</i> Proveedores con Más Presupuesto Aprobado</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-2">
                    <label>Top N</label>
                    <input type="number" id="f6_top" class="form-control" value="10" min="1" max="50">
                </div>
                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarProveedorPresupuesto();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_proveedor_presupuesto"></div>
        <div class="chart-wrap">
            <div class="spinner-overlay" id="spin_proveedor_presupuesto">
                <i class="material-icons" style="font-size:36px;color:#f39c12;">hourglass_empty</i>
            </div>
            <canvas id="chart_proveedor_presupuesto"></canvas>
        </div>
        <div id="tabla_proveedor_presupuesto_wrap" class="tabla-resultado" style="display:none;">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                    <thead id="thead_proveedor_presupuesto"></thead>
                    <tbody id="tbody_proveedor_presupuesto"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- ===== 7. AJUSTES DE INVENTARIO ===== -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">tune</i> Ajustes de Inventario por Motivo</h2>
    </div>
    <div class="body">
        <div class="seccion-filtros">
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Sucursal</label>
                    <input type="text" id="f7_sucursal" class="form-control" placeholder="Filtrar por sucursal...">
                </div>
                <div class="col-sm-3">
                    <label>Tipo de ajuste</label>
                    <select id="f7_tipo" class="form-control">
                        <option value="">— Todos —</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Salida">Salida</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarAjustes();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>
        <div id="kpi_ajustes"></div>
        <div class="chart-wrap">
            <div class="spinner-overlay" id="spin_ajustes">
                <i class="material-icons" style="font-size:36px;color:#27ae60;">hourglass_empty</i>
            </div>
            <canvas id="chart_ajustes"></canvas>
        </div>
        <div id="tabla_ajustes_wrap" class="tabla-resultado" style="display:none;">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" style="font-size:11px;">
                    <thead id="thead_ajustes"></thead>
                    <tbody id="tbody_ajustes"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</div>
</div>
</div>
</section>

<!-- JS -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
<script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="../../plugins/node-waves/waves.js"></script>
<script src="../../plugins/sweetalert/sweetalert.min.js"></script>
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="metodos.js?v=4"></script>

</body>
</html>
