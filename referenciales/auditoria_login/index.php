<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Auditoría de Login</title>
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
        .badge-exitoso           { background:#27ae60; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; }
        .badge-contrasena        { background:#e67e22; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; }
        .badge-bloqueado         { background:#c0392b; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; }
        .badge-usuario_no_existe { background:#8e44ad; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; }
        .badge-desbloqueado      { background:#16a085; color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; }
        .card-bloqueados { border-left:4px solid #c0392b; border-radius:6px; background:#fff; padding:16px 20px; box-shadow:0 1px 4px rgba(0,0,0,.08); margin-bottom:20px; }
        .tabla-bloqueados td, .tabla-bloqueados th { vertical-align:middle !important; }
    </style>
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- USUARIOS BLOQUEADOS -->
<div id="card-bloqueados" class="card-bloqueados" style="display:none;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
            <i class="material-icons" style="color:#c0392b; font-size:24px;">lock</i>
            <strong style="font-size:16px; color:#c0392b;">Usuarios Bloqueados</strong>
            <span id="badge-cant-bloqueados" style="background:#c0392b; color:#fff; border-radius:12px; padding:2px 10px; font-size:12px; font-weight:600;"></span>
        </div>
        <button class="btn btn-default btn-sm waves-effect" onclick="cargarBloqueados();" title="Actualizar">
            <i class="material-icons" style="font-size:16px; vertical-align:middle;">refresh</i>
        </button>
    </div>
    <div class="table-responsive">
        <table class="tabla-bloqueados table table-bordered table-hover" style="margin-bottom:0;">
            <thead style="background:#fdf2f2;">
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Bloqueado hasta</th>
                    <th>Minutos restantes</th>
                    <th style="width:120px;">Acción</th>
                </tr>
            </thead>
            <tbody id="tbody-bloqueados"></tbody>
        </table>
    </div>
</div>

<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">security</i>
            Auditoría de Intentos de Login
            <small>Monitoreo de accesos al sistema</small>
        </h2>
    </div>

    <div class="body">

        <!-- FILTROS -->
        <div class="section-box">
            <div class="section-title">Filtros</div>
            <div class="row clearfix">
                <div class="col-sm-3">
                    <label class="field-label">Usuario</label>
                    <input type="text" id="filtro_login" class="form-control" placeholder="Usuario...">
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Resultado</label>
                    <select id="filtro_resultado" class="form-control">
                        <option value="">— Todos los resultados —</option>
                        <option value="exitoso">Exitoso</option>
                        <option value="contrasena_incorrecta">Contraseña incorrecta</option>
                        <option value="usuario_no_existe">Usuario no existe</option>
                        <option value="bloqueado">Bloqueado</option>
                        <option value="desbloqueado">Desbloqueado</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Desde</label>
                    <input type="text" id="filtro_desde" class="datetimepicker form-control" placeholder="DD/MM/AAAA" readonly>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Hasta</label>
                    <input type="text" id="filtro_hasta" class="datetimepicker form-control" placeholder="DD/MM/AAAA" readonly>
                </div>
                <div class="col-sm-2" style="padding-top:18px;">
                    <button class="btn btn-primary waves-effect btn-block" onclick="listar();">
                        <i class="material-icons">search</i> Filtrar
                    </button>
                </div>
            </div>
        </div>

        <!-- BOTONES -->
        <div class="btn-toolbar-left" style="margin-bottom:15px;">
            <button class="btn btn-default waves-effect" onclick="listar();">
                <i class="material-icons">refresh</i> Actualizar
            </button>
            <button class="btn btn-danger waves-effect" onclick="confirmarLimpiar();">
                <i class="material-icons">delete_sweep</i> Limpiar registros &gt;90 días
            </button>
        </div>

        <!-- RESUMEN -->
        <div class="row clearfix" id="resumen" style="margin-bottom:15px;"></div>

        <!-- TABLA -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Resultado</th>
                        <th>IP</th>
                        <th>Navegador</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Resultado</th>
                        <th>IP</th>
                        <th>Navegador</th>
                        <th>Fecha y Hora</th>
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
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js?v=2"></script>
<script src="metodos.js"></script>
</body>
</html>

