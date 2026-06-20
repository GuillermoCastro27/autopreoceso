<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI USUARIO</title>

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
            Mantener Usruarios
            <small>CRUD de Usuarios</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" value="0" id="txtOperacion"/>

        <!-- DATOS DE CAJA -->
        <div class="section-box">
            <div class="section-title">Datos del Usuario</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <label class="field-label">Código</label>
                    <input type="text" id="txtCodigo" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-6">
                    <label class="field-label">Nombre</label>
                    <input type="text" id="name" class="form-control" disabled placeholder="Nombre">
                </div>
                <div class="col-sm-6">
                    <label class="field-label">Usuario</label>
                    <input type="text" id="login" class="form-control" disabled placeholder="Usuario">
                </div>
                <div class="col-sm-6">
                    <label class="field-label">Correo</label>
                    <input type="email" id="email" class="form-control" disabled placeholder="Correo">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Perfil</label>
                    <input type="text" id="perfil_desc" class="form-control" disabled onkeyup="buscarPerfil();" placeholder="Perfil">
                    <input type="hidden" id="perfil_id">
                    <div id="listaPerfil" style="display:none;"></div>
                </div>

                <div class="col-sm-6">
                    <label class="field-label">Funcionario</label>
                    <input type="text" id="fun_nombre_completo" class="form-control" disabled onkeyup="buscarFuncionario();" placeholder="Funcionario">
                    <input type="hidden" id="funcionario_id">
                    <div id="listaFuncionarios" style="display:none;"></div>
                    <small><a href="#" onclick="limpiarFuncionario(); return false;" style="font-size:11px; color:#999;">&#10005; Limpiar</a></small>
                </div>

                <div class="col-sm-6" id="divPassword">
                    <label class="field-label">Contraseña</label>
                    <input type="password" id="password" class="form-control" disabled placeholder="Contraseña">
                </div>

                <div class="col-sm-12" style="margin-top:8px;">
                    <div class="form-group">
                        <input type="checkbox" id="two_factor_enabled" name="two_factor_enabled">
                        <label for="two_factor_enabled" style="font-weight:600; margin-left:6px;">
                            Habilitar doble factor de autenticación (2FA)
                        </label>
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
            Registros de Usuarios
        </h2>
    </div>

    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Perfil</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Perfil</th>
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

<script src="../../js/ruta.js"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="metodos.js?v=2"></script>

</body>
</html>

