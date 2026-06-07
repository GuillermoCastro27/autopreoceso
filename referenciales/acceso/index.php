<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ACCESOS</title>

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
            <i class="material-icons">point_of_sale</i>
            Mantener Accesos
            <small>CRUD de Accesos</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" value="0" id="txtOperacion"/>
        <input type="hidden" id="txtCodigo" value="0"/>

        <!-- DATOS DEL ACCESO -->
        <div class="section-box">
            <div class="section-title">Datos del Acceso</div>

            <div class="row clearfix">

                <!-- Rol / Perfil -->
                <div class="col-sm-4">
                    <label class="control-label">Rol / Perfil</label>
                    <div class="form-group" style="position:relative;">
                        <input type="text" id="perfil_desc" class="form-control" disabled
                               onkeyup="buscarPerfil();" placeholder="Buscar perfil...">
                        <input type="hidden" id="perfil_id">
                        <div id="listaPerfil" class="list-group"
                             style="display:none; position:absolute; z-index:2000; width:100%;"></div>
                    </div>
                </div>

                <!-- Módulo -->
                <div class="col-sm-3">
                    <label class="control-label">Módulo</label>
                    <div class="form-group">
                        <select id="sel_modulo" class="form-control" disabled onchange="onModuloChange();">
                            <option value="">-- Seleccione módulo --</option>
                        </select>
                        <input type="hidden" id="mod_id">
                    </div>
                </div>

                <!-- Entidad / Formulario -->
                <div class="col-sm-3">
                    <label class="control-label">Formulario / Entidad</label>
                    <div class="form-group">
                        <select id="sel_entidad" class="form-control" disabled onchange="onEntidadChange();">
                            <option value="">-- Seleccione formulario --</option>
                        </select>
                    </div>
                </div>

            </div>

            <!-- Acciones -->
            <div class="row clearfix" id="fila_acciones" style="display:none;">
                <div class="col-sm-12">
                    <label class="control-label"><strong>Acciones permitidas:</strong></label>
                    <div id="div_acciones" style="padding:8px 0;"></div>
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

            <button id="btnDesactivar" class="btn btn-danger waves-effect" onclick="desactivar();" disabled>
                <i class="material-icons">cancel</i> Desactivar
            </button>

            <button id="btnActivar" class="btn btn-info waves-effect" onclick="activar();" disabled>
                <i class="material-icons">check_circle</i> Activar
            </button>

            <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>

            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();">
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
            Registros de Accesos
        </h2>
    </div>

    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Módulo</th>
                        <th>Entidad</th>
                        <th>Acción</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Módulo</th>
                        <th>Entidad</th>
                        <th>Acción</th>
                        <th>Rol</th>
                        <th>Estado</th>
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

<script src="../../js/ruta.js?v=2"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="metodos.js?v=3"></script>

</body>
</html>
