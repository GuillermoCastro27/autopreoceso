<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI MARCA</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
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

    <!-- ===== ESTILO INDUSTRIAL ===== -->
    <style>
        body { background-color: #f1f1f1; }

        .card-industrial {
            border-left: 6px solid #ff6f00;
            border-radius: 6px;
            box-shadow: 0 5px 14px rgba(0,0,0,.12);
            background: #ffffff;
        }

        .card-industrial .header {
            background: #2f3542;
            color: #fff;
            padding: 15px 20px;
        }

        .card-industrial .header h2 {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
        }

        .card-industrial .header small {
            color: #ced6e0;
        }

        .section-box {
            background: #f8f9fa;
            border: 1px solid #dcdde1;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            color: #2f3542;
            margin-bottom: 15px;
            border-bottom: 1px solid #ced6e0;
            padding-bottom: 5px;
        }

        .btn-toolbar-left button {
            margin-right: 6px;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .table thead {
            background: #2f3542;
            color: #fff;
            font-size: 13px;
        }

        .table tbody { font-size: 13px; }
    </style>
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
            <i class="material-icons">branding_watermark</i>
            Mantener Marca
            <small>CRUD de Marca</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" value="0" id="txtOperacion"/>

        <!-- DATOS DE MARCA -->
        <div class="section-box">
            <div class="section-title">Datos de la Marca</div>

            <div class="row clearfix">

                <div class="col-sm-3">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="txtCodigo" class="form-control" disabled>
                            <label class="form-label">Código</label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-5">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="txtNom" class="form-control" disabled>
                            <label class="form-label">Marca</label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <select id="mar_tipo" class="form-control" disabled>
                                <option value="LUBRICANTE">LUBRICANTE</option>
                                <option value="PRODUCTO">PRODUCTO</option>
                                <option value="VEHICULO">VEHICULO</option>
                            </select>
                            <label class="form-label">Tipo de Marca</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- BOTONES -->
        <div class="btn-toolbar-left">
            <button id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">
                <i class="material-icons">add</i> Agregar
            </button>
            <button id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>
            <button id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Eliminar
            </button>
            <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>
        </div>

    </div>
</div>

<!-- ================= TABLA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Marcas</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Marca</th>
                        <th>Tipo de Marca</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Marca</th>
                        <th>Tipo de Marca</th>
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

<script src="../../js/admin.js"></script>
<script src="metodos.js"></script>

</body>
</html>
