<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI NOTAS DE COMPRAS</title>

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
            <i class="material-icons">assignment_return</i>
            Notas de Compras
            <small>Notas de crédito y débito sobre compras</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="nota_comp_estado" value="PENDIENTE">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <!-- FILA 1 -->
            <div class="row clearfix">
                <div class="col-sm-1">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <select id="nota_comp_condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                        <option value="CONTADO">Al contado</option>
                        <option value="CREDITO">A crédito</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="nota_comp_fecha" class="datetimepicker form-control"
                           readonly placeholder="Fecha">
                </div>
            </div>

            <!-- FILA 2 -->
            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-3">
                    <input type="text" id="nota_comp_intervalo_fecha_vence"
                           class="datetimepicker form-control" disabled
                           placeholder="Intervalo vencimiento">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="nota_comp_cant_cuota" class="form-control"
                           disabled placeholder="Cuota">
                </div>

                <div class="col-sm-2">
                    <select id="nota_comp_tipo" class="form-control" disabled>
                        <option>Crédito</option>
                        <option>Débito</option>
                    </select>
                </div>

                <div class="col-sm-5">
                    <input type="text" id="nota_comp_observaciones"
                           class="form-control" disabled
                           placeholder="Observaciones">
                </div>
            </div>
        </div>

        <!-- REFERENCIAS -->
        <div class="section-box">
            <div class="section-title">Documento Relacionado</div>
            <div class="row clearfix">

                <div class="col-sm-12">
                    <input type="text" id="compra_cab" class="form-control" disabled onkeyup="buscarCompra();" placeholder="Compra">
                    <input type="hidden" id="compra_cab_id" value="0">
                    <div id="listaCompra" style="display:none;"></div>
                </div>

                <div class="col-sm-4">
                    <input type="hidden" id="proveedor_id" value="0">
                    <input type="text" id="prov_razonsocial" class="form-control" disabled placeholder="Proveedor">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="prov_ruc" class="form-control" disabled placeholder="RUC">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="prov_telefono" class="form-control" disabled placeholder="Teléfono">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="prov_correo" class="form-control" disabled placeholder="Correo">
                </div>

                <div class="col-sm-3" style="margin-top:10px;">
                    <input type="text" id="comp_timbrado" class="form-control" disabled
                           placeholder="Timbrado de la Compra">
                </div>

                <div class="col-sm-3" style="margin-top:10px;">
                    <input type="text" id="nota_comp_timbrado" class="form-control" disabled
                           placeholder="Timbrado de la Nota" maxlength="20">
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
        <h2><i class="material-icons">list</i> Detalle de la Nota</h2>
    </div>

    <div class="body">

        <div class="row clearfix" id="formDetalles">
            <input type="hidden" id="txtOperacionDetalle" value="0">
            <input type="hidden" id="tipo_impuesto_id">

            <div class="col-sm-2">
                <input type="text" id="item_id" class="form-control" disabled placeholder="Código">
            </div>

            <div class="col-sm-4">
                <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
                <div id="listaProductos" style="display:none;"></div>
            </div>

            <div class="col-sm-2">
                <input type="text" id="notas_comp_det_cantidad" class="form-control" disabled placeholder="Cantidad">
            </div>

            <div class="col-sm-2">
                <input type="text" id="item_costo" class="form-control" disabled placeholder="Costo">
            </div>

            <div class="col-sm-2">
                <select class="form-control" id="deposito_id_det" disabled>
                    <option value="">-- Depósito --</option>
                </select>
            </div>

            <div class="col-sm-2">
                <button class="btn btn-warning" onclick="editarDetalle();">
                    <i class="material-icons">edit</i>
                </button>
                <button class="btn btn-default" id="btnGrabarDetalle" style="display:none;" onclick="grabarDetalle();">
                    <i class="material-icons">save</i>
                </button>
            </div>
        </div>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th>Impuesto</th>
                    <th>Sub Total</th>
                    <th>IVA</th>
                    <th>Depósito</th>
                </tr>
            </thead>
            <tbody id="tableDetalle"></tbody>
            <tfoot>
                <tr>
                    <th colspan="6" class="text-right">Total</th>
                    <th id="txtTotalGral" class="text-right">0</th>
                </tr>
                <tr>
                    <th colspan="6" class="text-right">Total IVA</th>
                    <th id="txtTotalConImpuesto" class="text-right">0</th>
                </tr>
            </tfoot>
        </table>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list_alt</i> Registros de Notas de Compra</h2>
    </div>

    <div class="body">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Intervalo Venc.</th>
                    <th>Fecha</th>
                    <th>Compra</th>
                    <th>Encargado</th>
                    <th>Cuotas</th>
                    <th>Tipo</th>
                    <th>Obs.</th>
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
<script src="metodos.js?v=3"></script>

</body>
</html>
