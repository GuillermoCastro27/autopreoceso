<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Auditoría de Transacciones</title>
    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
    <style>
        .badge-insert { background:#27ae60; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600; }
        .badge-update { background:#2980b9; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600; }
        .badge-delete { background:#c0392b; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600; }
        .btn-detalle  { padding:2px 10px; font-size:11px; }
        pre.json-view { background:#f8f9fa; border:1px solid #dee2e6; border-radius:4px;
                        padding:12px; font-size:12px; max-height:340px; overflow-y:auto;
                        white-space:pre-wrap; word-break:break-all; }
        .json-null    { color:#999; font-style:italic; }
    </style>
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">history</i>
            Auditoría de Transacciones
            <small>Registro completo de INSERT, UPDATE y DELETE sobre tablas de negocio</small>
        </h2>
    </div>

    <div class="body">

        <!-- ================= FILTROS ================= -->
        <div class="section-box">
            <div class="section-title">Filtros</div>
            <div class="row clearfix">

                <div class="col-sm-2">
                    <label class="field-label">Módulo</label>
                    <select id="filtro_modulo" class="form-control" onchange="filtrarTablasPorModulo();">
                        <option value="">— Todos —</option>
                        <option value="Compras">Compras</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Servicio">Servicio</option>
                        <option value="Referenciales">Referenciales</option>
                        <option value="Seguridad">Seguridad</option>
                    </select>
                </div>

                <div class="col-sm-5">
                    <label class="field-label">Tabla</label>
                    <select id="filtro_tabla" class="form-control">
                        <option value="">— Todas las tablas —</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Operación</label>
                    <select id="filtro_operacion" class="form-control">
                        <option value="">— Todas —</option>
                        <option value="INSERT">INSERT</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">ID de Registro</label>
                    <input type="text" id="filtro_registro_id" class="form-control" placeholder="ID de registro...">
                </div>

            </div>

            <div class="row clearfix" style="margin-top:6px;">

                <div class="col-sm-3">
                    <label class="field-label">Desde</label>
                    <input type="text" id="filtro_desde" class="datetimepicker form-control" placeholder="DD/MM/AAAA" readonly>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Hasta</label>
                    <input type="text" id="filtro_hasta" class="datetimepicker form-control" placeholder="DD/MM/AAAA" readonly>
                </div>

                <div class="col-sm-2" style="padding-top:18px;">
                    <button class="btn btn-primary waves-effect" onclick="listar();">
                        <i class="material-icons">search</i> Buscar
                    </button>
                </div>

            </div>
        </div>

        <!-- ================= BOTÓN ACTUALIZAR ================= -->
        <div class="btn-toolbar-left">
            <button class="btn btn-default waves-effect" onclick="listar();">
                <i class="material-icons">refresh</i> Actualizar
            </button>
        </div>

        <!-- ================= TARJETAS RESUMEN ================= -->
        <div class="row clearfix" id="resumen" style="margin-bottom:20px;"></div>

        <!-- ================= TABLA ================= -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Módulo</th>
                        <th>Tabla</th>
                        <th>Operación</th>
                        <th>Registro ID</th>
                        <th>Usuario BD</th>
                        <th>Fecha y Hora</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Módulo</th>
                        <th>Tabla</th>
                        <th>Operación</th>
                        <th>Registro ID</th>
                        <th>Usuario BD</th>
                        <th>Fecha y Hora</th>
                        <th>Detalle</th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>
</div>

</div>
</div>
</div>
</section>

<!-- MODAL DETALLE -->
<div class="modal fade" id="modalDetalle" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
                <h4 class="modal-title">
                    <i class="material-icons" style="vertical-align:middle;">info</i>
                    Detalle del registro
                    &nbsp;<span id="modalTitulo" style="font-size:14px; color:#666;"></span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <h5 style="color:#c0392b;"><i class="material-icons" style="font-size:16px;vertical-align:middle;">arrow_back</i> Antes</h5>
                        <pre class="json-view" id="jsonAntes"></pre>
                    </div>
                    <div class="col-sm-6">
                        <h5 style="color:#27ae60;"><i class="material-icons" style="font-size:16px;vertical-align:middle;">arrow_forward</i> Después</h5>
                        <pre class="json-view" id="jsonDespues"></pre>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!-- JS -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
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
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js?v=2"></script>
<script src="metodos.js"></script>
</body>
</html>

