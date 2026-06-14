<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI AJUSTES DE INVENTARIO</title>

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
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

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

<!-- ================= CABECERA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">build_circle</i>
            Ajustes de Inventario
            <small>Gestión y control de ajustes</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="ajus_cab_estado" value="PENDIENTE">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">

                <div class="col-sm-2">
                    <label class="field-label">Código</label>
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Empresa</label>
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Sucursal</label>
                    <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Fecha</label>
                    <input type="text" id="ajus_cab_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                    <small id="avisoFechaAjuste" style="color:#e74c3c;display:none;"></small>
                </div>

            </div>
        </div>

        <!-- MOTIVO DEL AJUSTE -->
        <div class="section-box">
            <div class="section-title">Motivo del Ajuste</div>
            <div class="row clearfix">

                <div class="col-sm-4">
                    <label class="field-label">Motivo de Ajuste</label>
                    <input type="text" id="descripcion" class="form-control" disabled onkeyup="buscarMotivoAjuste();" placeholder="Buscar motivo...">
                    <input type="hidden" id="motivo_ajuste_id">
                    <div id="listaMotivoajuste" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Tipo de Ajuste</label>
                    <input type="text" id="tipo_ajuste" class="form-control" disabled placeholder="Tipo de ajuste">
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
                <i class="material-icons">delete</i> Anular
            </button>
            <button id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>
                <i class="material-icons">check_circle</i> Confirmar
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

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">list</i> Detalle del Ajuste</h2>
    </div>

    <div class="body">

        <div class="section-box" id="formDetalles" style="display:none;">
            <div class="section-title">Ítems</div>
            <input type="hidden" id="txtOperacionDetalle" value="0">
            <input type="hidden" id="stock_disponible_det" value="0">
        <div class="row clearfix">

            <div class="col-sm-1">
                <label class="field-label">Cód.</label>
                <input type="text" id="item_id" class="form-control" disabled placeholder="Cód">
            </div>

            <div class="col-sm-3">
                <label class="field-label">Producto</label>
                <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Buscar...">
                <div id="listaProductos" style="display:none;"></div>
            </div>

            <div class="col-sm-3">
                <label class="field-label">Stock Actual</label>
                <input type="text" id="cantidad_stock" class="form-control" disabled placeholder="0">
            </div>

            <div class="col-sm-2">
                <label class="field-label">Cantidad</label>
                <input type="text" id="ajus_det_cantidad" class="form-control" disabled placeholder="0"
                       oninput="validarCantidadAjuste();">
                <small id="avisoStockAjuste" style="color:#e74c3c;display:none;"></small>
            </div>

            <div class="col-sm-2">
                <label class="field-label">Depósito</label>
                <select class="form-control" id="deposito_id_det" disabled>
                    <option value="">-- Depósito --</option>
                </select>
            </div>

            <div class="col-sm-2">
                <label class="field-label">Marca</label>
                <select class="form-control" id="marca_det_mm" disabled>
                    <option value="">-- Marca --</option>
                </select>
            </div>
            <div class="col-sm-2">
                <label class="field-label">Modelo</label>
                <select class="form-control" id="modelo_det_mm" disabled>
                    <option value="">-- Modelo --</option>
                </select>
            </div>

            <div class="col-sm-2 icon-button-demo">

    <button type="button"
            id="btnAgregarDetalle"
            class="btn btn-success waves-effect"
            onclick="agregarDetalle();">
        <i class="material-icons">add</i>
    </button>

    <button type="button"
            id="btnEditarDetalle"
            class="btn btn-warning waves-effect"
            onclick="editarDetalle();">
        <i class="material-icons">mode_edit</i>
    </button>

    <button type="button"
            id="btnEliminarDetalle"
            class="btn btn-danger waves-effect"
            onclick="eliminarDetalle();">
        <i class="material-icons">clear</i>
    </button>

    <button type="button"
            id="btnGrabarDetalle"
            class="btn btn-default waves-effect"
            style="display:none;"
            onclick="grabarDetalle();">
        <i class="material-icons">save</i>
    </button>

    <button type="button"
            id="btnCancelarDetalle"
            class="btn btn-warning waves-effect"
            style="display:none;"
            onclick="cancelarDetalle();">
        <i class="material-icons">close</i>
    </button>

</div>
        </div>
        </div>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Stock</th>
                    <th>Depósito</th>
                </tr>
            </thead>
            <tbody id="tableDetalle"></tbody>
        </table>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list_alt</i> Registros de Ajustes</h2>
    </div>

    <div class="body">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Empresa</th>
                    <th>Sucursal</th>
                    <th>Fecha</th>
                    <th>Motivo</th>
                    <th>Tipo</th>
                    <th>Encargado</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
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

<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="../../js/marcaModelo.js"></script>
<script src="metodos.js?v=5"></script>

</body>
</html>
