<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI INFORMES WEB COMPRAS</title>

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

    <!-- ===== ESTILO INDUSTRIAL (SUAVE) ===== -->
    <style>
        body { background:#f1f2f6; }

        .card-industrial {
            border-left: 6px solid #0984e3;
            border-radius: 6px;
            box-shadow: 0 6px 14px rgba(0,0,0,.12);
            background: #fff;
        }

        .card-industrial .header {
            background: #2d3436;
            color: #fff;
            padding: 15px 20px;
        }

        .card-industrial .header h2 {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
        }

        .card-industrial .header small {
            color: #dfe6e9;
        }

        .filtro-box {
            background: #f8f9fa;
            border: 1px solid #dcdde1;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .filtro-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 12px;
            border-bottom: 1px solid #ced6e0;
            padding-bottom: 4px;
            color: #2d3436;
        }

        .table thead {
            background: #2d3436;
            color: #fff;
            font-size: 13px;
        }

        .table tbody {
            font-size: 13px;
        }
    </style>
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ================= FILTROS ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">assessment</i>
            Informes de Compras
            <small>Consulta y exportación por rango de fechas</small>
        </h2>
    </div>

    <div class="body">

        <div class="filtro-box">
            <div class="filtro-title">Parámetros de Búsqueda</div>

            <div class="row clearfix">
                <div class="col-sm-3">
                    <label>Desde</label>
                    <input type="date" id="fecha_desde" class="form-control">
                </div>

                <div class="col-sm-3">
                    <label>Hasta</label>
                    <input type="date" id="fecha_hasta" class="form-control">
                </div>

                <div class="col-sm-3">
                    <label>Informe de</label>
                    <select id="tipo" class="form-control">
                        <option value="pedidos">Pedidos</option>
                        <option value="presupuestos">Presupuestos</option>
                        <option value="ordenes_compras">Órdenes de compra</option>
                        <option value="compras">Compras</option>
                        <option value="libro_compras">Libro de compras</option>
                        <option value="notas_remision">Notas de Remisión</option>
                        <option value="ajuste_inventario">Ajuste de inventario</option>
                        <option value="notas_compra">Notas de compra</option>
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

<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("contenedor_tabla").style.display = "none";
    });
</script>

</body>
</html>
