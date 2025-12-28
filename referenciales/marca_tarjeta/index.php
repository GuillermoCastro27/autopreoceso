<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI MARCA DE TARJETA</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Plugins -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- AdminBSB -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
    <div class="container-fluid">

        <!-- ================= FORMULARIO ================= -->
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card">

                    <div class="header">
                        <h2>
                            Mantener datos de Marca detarjeta
                            <small>CRUD de Marca de tarjeta</small>
                        </h2>
                    </div>

                    <div class="body">

                        <!-- CAMPOS -->
                        <div class="row clearfix">
                            <input type="hidden" value="0" id="txtOperacion"/>

                            <div class="col-sm-1">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="txtCodigo"
                                               class="form-control" disabled>
                                        <label class="form-label">Código</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="marca_nombre"
                                               class="form-control" disabled>
                                        <label class="form-label">Nombre</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- BOTONES ABAJO -->
                        <div class="row clearfix">
                            <div class="col-md-12">

                                <div class="button-demo"
                                     style="margin-top:15px; display:flex; flex-wrap:wrap; gap:8px;">

                                    <button type="button" id="btnAgregar"
                                        class="btn btn-success waves-effect"
                                        onclick="agregar();">
                                        AGREGAR
                                    </button>

                                    <button type="button" id="btnEditar"
                                        class="btn btn-primary waves-effect"
                                        onclick="editar();" disabled>
                                        MODIFICAR
                                    </button>

                                    <button type="button" id="btnEliminar"
                                        class="btn btn-danger waves-effect"
                                        onclick="eliminar();" disabled>
                                        ELIMINAR
                                    </button>

                                    <button type="button" id="btnGrabar"
                                        class="btn btn-default waves-effect"
                                        onclick="confirmarOperacion();" disabled>
                                        GRABAR
                                    </button>

                                    <button type="button" id="btnCancelar"
                                        class="btn btn-warning waves-effect"
                                        onclick="cancelar();" disabled>
                                        CANCELAR
                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- ================= TABLA ================= -->
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card">
                    <div class="header">
                        <h2>Registros de Marca de tarjeta</h2>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody"></tbody>
                                <tfoot>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
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

<!-- Scripts -->
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

<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>
<script src="metodos.js"></script>

</body>
</html>
