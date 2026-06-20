<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI INFORMES WEB SERVICIO</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Plugins -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet" />

    <!-- AdminBSB -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />

    <style>
        .seccion-filtros { background:#f8f9fa; border:1px solid #e0e0e0; border-radius:4px; padding:12px 14px; margin-bottom:14px; }
        .kpi-box { display:inline-block; background:#2d3436; color:#fff; padding:5px 14px; border-radius:4px; margin:0 6px 6px 0; font-size:13px; }
        .kpi-box b { font-size:15px; }
        .chart-wrap { position:relative; min-height:260px; }
        .spinner-overlay { display:none; position:absolute; top:0; left:0; width:100%; height:100%;
            background:rgba(255,255,255,.75); z-index:10; align-items:center; justify-content:center; }
        .spinner-overlay.activo { display:flex; }
        .tabla-resultado { margin-top:14px; }

    .dt-buttons { display: none; }

    @media print {
        nav.navbar, #leftsidebar, .sidebar, .preloader, .overlay { display: none !important; }
        section.content { margin-left: 0 !important; padding: 8px !important; }
        body { background: #fff !important; font-size: 9pt; color: #000; }

        .print-only { display: block !important; }
        .no-print    { display: none  !important; }

        .dt-buttons, .dataTables_filter, .dataTables_length,
        .dataTables_paginate, .dataTables_info, .spinner-overlay { display: none !important; }

        .card { box-shadow: none !important; border: 1px solid #ddd !important;
                page-break-inside: avoid; margin-bottom: 8px !important; }
        .card .header { background: #f5f5f5 !important; padding: 8px 12px !important; }
        .card .body { padding: 10px !important; }

        canvas { display: block !important; max-width: 100% !important; height: auto !important; }

        .col-md-6, .col-sm-6 { width: 50% !important; float: left !important; box-sizing: border-box; }
        .row.clearfix { overflow: hidden; }

        table { width: 100% !important; font-size: 8pt !important; border-collapse: collapse !important; }
        th, td { padding: 2px 5px !important; border: 1px solid #bbb !important; }

        #print-summary { padding: 8px 14px 6px; background: #f8f9fa !important;
                         border: 1px solid #dee2e6 !important; margin-bottom: 12px;
                         font-size: 10pt; overflow: hidden; }
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

<!-- ================= FILTROS ================= -->
<div class="card card-industrial">
    <div class="header" style="position:relative;">
        <h2>
            <i class="material-icons">build</i>
            Informes de Servicio
            <small>Consulta y exportación por rango de fechas</small>
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

        <div class="filtro-box no-print">
            <div class="filtro-title">Parámetros de Búsqueda</div>

            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Desde</label>
                    <input type="text" id="fecha_desde" class="form-control datepicker-informe" placeholder="DD/MM/YYYY" autocomplete="off">
                </div>

                <div class="col-sm-3">
                    <label>Hasta</label>
                    <input type="text" id="fecha_hasta" class="form-control datepicker-informe" placeholder="DD/MM/YYYY" autocomplete="off">
                </div>

                <div class="col-sm-3">
                    <label>Informe de</label>
                    <select id="tipo" class="form-control">
                        <option value="solicitud_servicio">Solicitudes de Servicio</option>
                        <option value="recepcion">Recepciones</option>
                        <option value="diagnostico">Diagnósticos</option>
                        <option value="presupuesto_serv">Presupuestos de Servicio</option>
                        <option value="orden_servicio">Órdenes de Servicio</option>
                        <option value="insumos">Insumos Utilizados</option>
                        <option value="contrato">Contratos de Servicio</option>
                        <option value="promociones">Promociones</option>
                        <option value="descuentos">Descuentos</option>
                        <option value="reclamo">Reclamos de Clientes</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary btn-block waves-effect" onclick="buscarInforme();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>
            </div>
        </div>

        <!-- ================= TOTALES ================= -->
        <div id="resumen_totales" class="filtro-box" style="display:none; margin-bottom:12px;"></div>

        <!-- ================= TABLA ================= -->
        <div class="table-responsive" id="contenedor_tabla" style="display:none;">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr id="cabecera_tabla">
                        <!-- Cabecera dinámica -->
                    </tr>
                </thead>
                <tbody id="tabla_informes">
                    <!-- Datos dinámicos -->
                </tbody>
            </table>
        </div>

    </div>
</div>

<!-- ===== ESTADÍSTICAS DINÁMICAS POR TIPO ===== -->
<div id="stats_container"></div>

</div>
</div>
</div>
</section>

<!-- JS -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
<script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
<script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="../../plugins/node-waves/waves.js"></script>
<script src="../../plugins/sweetalert/sweetalert.min.js"></script>

<script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

<script src="../../plugins/autosize/autosize.js"></script>
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js?v=7"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

</body>
</html>

