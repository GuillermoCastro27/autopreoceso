<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI TIPO CONTRATO</title>

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
            Tipo de Contrato
            <small>CRUD de Tipo de Contrato</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="tip_con_estado" value="ACTIVO">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">

                <div class="col-sm-2">
                    <label class="field-label">Código</label>
                    <input type="text" id="txtCodigo" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Nombre</label>
                    <input type="text" id="tip_con_nombre" class="form-control" disabled placeholder="Nombre">
                </div>

            </div>
        </div>

        <!-- CONTENIDO -->
        <div class="section-box">
            <div class="section-title">Contenido del Contrato</div>
            <div class="row clearfix">

                <div class="col-sm-6">
                    <label class="field-label">Objeto</label>
                    <textarea id="tip_con_objeto" class="form-control" disabled placeholder="Objeto"></textarea>
                </div>

                <div class="col-sm-6">
                    <label class="field-label">Alcance</label>
                    <textarea id="tip_con_alcance" class="form-control" disabled placeholder="Alcance"></textarea>
                </div>

            </div>
        </div>

        <!-- CONDICIONES -->
        <div class="section-box">
            <div class="section-title">Condiciones</div>
            <div class="row clearfix">

                <div class="col-sm-4">
                    <label class="field-label">Garantía</label>
                    <textarea id="tip_con_garantia" class="form-control" disabled placeholder="Garantía"></textarea>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Responsabilidad</label>
                    <textarea id="tip_con_responsabilidad" class="form-control" disabled placeholder="Responsabilidad"></textarea>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Limitaciones</label>
                    <textarea id="tip_con_limitacion" class="form-control" disabled placeholder="Limitaciones"></textarea>
                </div>

            </div>
        </div>

        <!-- ASPECTOS LEGALES -->
        <div class="section-box">
            <div class="section-title">Aspectos Legales</div>
            <div class="row clearfix">

                <div class="col-sm-6">
                    <label class="field-label">Fuerza Mayor</label>
                    <textarea id="tip_con_fuerza_mayor" class="form-control" disabled placeholder="Fuerza Mayor"></textarea>
                </div>

                <div class="col-sm-6">
                    <label class="field-label">Jurisdicción</label>
                    <textarea id="tip_con_jurisdiccion" class="form-control" disabled placeholder="Jurisdicción"></textarea>
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
            <button id="btnEstado" class="btn btn-danger waves-effect" onclick="confirmarCambioEstado();" disabled>
                <i class="material-icons">block</i> <span id="lblEstado">Desactivar</span>
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
        <h2>
            <i class="material-icons">list</i>
            Registros de Tipos de Contrato
        </h2>
    </div>

    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Objeto</th>
                        <th>Alcance</th>
                        <th>Garantía</th>
                        <th>Responsabilidad</th>
                        <th>Limitaciones</th>
                        <th>Fuerza mayor</th>
                        <th>Jurisdicción</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Objeto</th>
                        <th>Alcance</th>
                        <th>Garantía</th>
                        <th>Responsabilidad</th>
                        <th>Limitaciones</th>
                        <th>Fuerza mayor</th>
                        <th>Jurisdicción</th>
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
<script src="metodos.js?v=2"></script>

</body>
</html>
