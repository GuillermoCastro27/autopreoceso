<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Mantener Timbrado</title>
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
            <i class="material-icons">receipt</i>
            Mantener Timbrado
            <small>Gestión de timbrados habilitados por la SET para emisión de comprobantes</small>
        </h2>
    </div>
    <div class="body">

        <input type="hidden" id="txtOperacion" value="0"/>

        <!-- ================= DATOS DEL TIMBRADO ================= -->
        <div class="section-box">
            <div class="section-title">Datos del Timbrado</div>
            <div class="row clearfix">
                <div class="col-sm-1">
                    <label class="field-label">Código</label>
                    <input type="text" id="txtCodigo" class="form-control" disabled placeholder="Código">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Nro. Timbrado (SET)</label>
                    <input type="text" id="tim_numero" class="form-control" maxlength="20" disabled placeholder="Nro. de Timbrado (SET)">
                </div>
                <div class="col-sm-1">
                    <label class="field-label">Establecimiento</label>
                    <input type="text" id="tim_establecimiento" class="form-control" maxlength="3" disabled placeholder="Est. (001)">
                </div>
                <div class="col-sm-1">
                    <label class="field-label">Pto. Expedición</label>
                    <input type="text" id="tim_punto_expedicion" class="form-control" maxlength="3" disabled placeholder="Exp. (001)">
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Tipo de Comprobante</label>
                    <select id="tipo_comprobante_id" class="form-control" disabled>
                        <option value="">-- Tipo de Comprobante --</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Empresa</label>
                    <select id="empresa_id" class="form-control" disabled>
                        <option value="">-- Empresa --</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Sucursal</label>
                    <select id="sucursal_id" class="form-control" disabled>
                        <option value="">-- Sucursal --</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- ================= VIGENCIA Y RANGOS ================= -->
        <div class="section-box">
            <div class="section-title">Vigencia y Rangos</div>
            <div class="row clearfix">
                <div class="col-sm-2">
                    <label class="field-label">Fecha Inicio Vigencia</label>
                    <input type="date" id="tim_fecha_inicio" class="form-control" disabled>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Fecha Fin Vigencia</label>
                    <input type="date" id="tim_fecha_fin" class="form-control" disabled>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Nro. Desde</label>
                    <input type="number" id="tim_nro_desde" class="form-control" min="1" disabled placeholder="Nro. Desde">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Nro. Hasta</label>
                    <input type="number" id="tim_nro_hasta" class="form-control" min="1" disabled placeholder="Nro. Hasta">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Últ. Nro. Usado</label>
                    <input type="text" id="tim_nro_actual" class="form-control" disabled placeholder="Últ. Nro. Usado">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Estado</label>
                    <select id="tim_estado" class="form-control" disabled>
                        <option value="activo">Activo</option>
                        <option value="agotado">Agotado</option>
                        <option value="vencido">Vencido</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
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
        <h2><i class="material-icons">list</i> Timbrados Registrados</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nro. Timbrado</th>
                        <th>Establecimiento</th>
                        <th>Pto. Exp.</th>
                        <th>Tipo Comprobante</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Vigencia</th>
                        <th>Rango</th>
                        <th>Últ. Usado</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Nro. Timbrado</th>
                        <th>Establecimiento</th>
                        <th>Pto. Exp.</th>
                        <th>Tipo Comprobante</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Vigencia</th>
                        <th>Rango</th>
                        <th>Últ. Usado</th>
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
