<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DESCUENTOS</title>

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
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

    <!-- AdminBSB -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />

    <!-- ESTILO INDUSTRIAL UNIFICADO -->
    <style>
        body { background:#f1f2f6; }

        .card-industrial {
            border-left: 6px solid #00b894;
            border-radius: 6px;
            box-shadow: 0 6px 14px rgba(0,0,0,.12);
            background: #fff;
        }

        .card-industrial .header {
            background: #2d3436;
            color: #fff;
            padding: 15px 20px;
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
            color: #2d3436;
            margin-bottom: 10px;
            border-bottom: 1px solid #ced6e0;
        }

        .btn-toolbar-left button {
            margin-right: 6px;
            margin-bottom: 6px;
            font-weight: 600;
        }

        .table thead {
            background: #2d3436;
            color: #fff;
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

<!-- ================= CABECERA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">percent</i>
            Descuentos
            <small>Gestión y control</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id" value="1">
        <input type="hidden" id="desc_cab_estado" value="PENDIENTE">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <input type="text" id="desc_cab_fecha_registro" class="datetimepicker form-control"
                           disabled placeholder="Fecha Registro">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="desc_cab_porcentaje" class="form-control"
                           disabled placeholder="Porcentaje">
                </div>
            </div>
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="section-box">
            <div class="section-title">Descripción del Descuento</div>

            <div class="row clearfix">
                <div class="col-sm-4">
                    <input type="text" id="desc_cab_nombre" class="form-control" disabled placeholder="Nombre">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="tipo_desc_nombre" class="form-control" disabled
                           onkeyup="buscarTipoDescuento();" placeholder="Tipo de Descuento">
                    <input type="hidden" id="tipo_descuentos_id">
                    <div id="listaTipoDesc" style="display:none;"></div>
                </div>

                <div class="col-sm-4">
                    <input type="text" id="desc_cab_observaciones" class="form-control"
                           disabled placeholder="Observaciones">
                </div>
            </div>

            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-3">
                    <input type="text" id="desc_cab_fecha_inicio" class="datetimepicker form-control"
                           disabled placeholder="Fecha Inicio">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="desc_cab_fecha_fin" class="datetimepicker form-control"
                           disabled placeholder="Fecha Fin">
                </div>
            </div>
        </div>

        <!-- BOTONES -->
        <div class="btn-toolbar-left">
            <button id="btnAgregar" class="btn btn-success" onclick="agregar();">
                <i class="material-icons">add</i> Agregar
            </button>
            <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>
            <button id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Anular
            </button>
            <button id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled>
                <i class="material-icons">check_circle</i> Confirmar
            </button>
            <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>
        </div>

    </div>
</div>

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">playlist_add</i> Detalle de Descuentos</h2>
    </div>

    <div class="body">

        <div class="section-box">
            <div class="section-title">Agregar / Editar Detalle</div>

            <div class="row clearfix" id="formDetalles">

                <input type="hidden" id="txtOperacionDetalle" value="0">

                <!-- CÓDIGO ITEM -->
                <div class="col-sm-2">
                    <input type="text" id="item_id" class="form-control" disabled placeholder="Código">
                </div>

                <!-- PRODUCTO -->
                <div class="col-sm-5">
                    <input type="text" id="item_decripcion" class="form-control" disabled
                           onkeyup="buscarProductos();" placeholder="Producto">
                    <div id="listaProductos" style="display:none;"></div>
                </div>

                <!-- TIPO IMPUESTO -->
                <div class="col-sm-2">
                    <input type="text" id="tip_imp_nom" class="form-control" disabled placeholder="Tipo Impuesto">
                    <input type="hidden" id="tipo_impuesto_id">
                </div>

                <!-- CANTIDAD -->
                <div class="col-sm-1">
                    <input type="text" id="desc_det_cantidad" class="form-control" disabled placeholder="Cantidad">
                </div>

                <!-- COSTO -->
                <div class="col-sm-2">
                    <input type="text" id="desc_det_costo" class="form-control" disabled placeholder="Precio">
                </div>

                <!-- BOTONES DETALLE -->
                <div class="col-sm-12" style="margin-top:10px;">
                    <button type="button" id="btnAgregarDetalle" class="btn btn-success waves-effect" onclick="agregarDetalle();">
                        <i class="material-icons">add</i>
                    </button>
                    <button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();">
                        <i class="material-icons">mode_edit</i>
                    </button>
                    <button type="button" id="btnEliminarDetalle" class="btn btn-danger waves-effect" onclick="eliminarDetalle();">
                        <i class="material-icons">clear</i>
                    </button>
                    <button type="button" id="btnGrabarDetalle" class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();">
                        <i class="material-icons">save</i>
                    </button>
                </div>

            </div>
        </div>

        <!-- TABLA DETALLE -->
        <div class="table-responsive" style="overflow-x:auto;">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Tipo impuesto</th>
                        <th>Sub Total</th>
                        <th>IVA</th>
                    </tr>
                </thead>

                <tbody id="tableDetalle"></tbody>

                <tfoot>
                    <tr>
                        <th colspan="6" class="text-right">Total Comprobante</th>
                        <th class="text-right" id="txtTotalGral">0</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th colspan="6" class="text-right">Total IVA</th>
                        <th class="text-right" id="txtTotalConImpuesto">0</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Descuentos</h2>
    </div>
    <div class="body">
        <div class="table-responsive" style="overflow-x:auto;">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable" style="width:100%;">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Nombre</th>
                        <th>Encargado</th>
                        <th>Observación</th>
                        <th>Fecha Registro</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Porcentaje</th>
                        <th>Estado</th>
                        <th>Tipo Descuento</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Nombre</th>
                        <th>Encargado</th>
                        <th>Observación</th>
                        <th>Fecha Registro</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Porcentaje</th>
                        <th>Estado</th>
                        <th>Tipo Descuento</th>
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

<!-- ================= SCRIPTS ================= -->
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

<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>

<script src="metodos.js"></script>

</body>
</html>
