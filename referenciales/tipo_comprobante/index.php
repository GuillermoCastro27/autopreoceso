<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Mantener Tipo de Comprobante</title>
    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ================= FORMULARIO ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">description</i>
            Mantener Tipo de Comprobante
            <small>Gestión de tipos de comprobante (Factura, Nota de Crédito, etc.)</small>
        </h2>
    </div>
    <div class="body">

        <input type="hidden" value="0" id="txtOperacion"/>

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">
                <div class="col-sm-1">
                    <label class="field-label">Código</label>
                    <input type="text" id="txtCodigo" class="form-control" disabled placeholder="Código">
                </div>
                <div class="col-sm-4">
                    <label class="field-label">Nombre del Tipo de Comprobante</label>
                    <input type="text" id="tip_comp_nombre" class="form-control" maxlength="100" disabled placeholder="Nombre del Tipo de Comprobante">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Abreviatura / Código SET</label>
                    <input type="text" id="tip_comp_abrev" class="form-control" maxlength="10" disabled placeholder="Abreviatura / Código SET">
                </div>
            </div>
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left">
            <button type="button" id="btnAgregar" class="btn btn-success" onclick="agregar();">
                <i class="material-icons">add</i> Agregar
            </button>
            <button type="button" id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>
            <button type="button" id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Eliminar
            </button>
            <button type="button" id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button type="button" id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>
        </div>

    </div>
</div>

<!-- ================= TABLA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Tipo de Comprobante</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Abreviatura</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Abreviatura</th>
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
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js?v=2"></script>
<script src="metodos.js?v=1"></script>
</body>
</html>
