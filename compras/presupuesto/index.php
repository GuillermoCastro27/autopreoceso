<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PRESUPUESTO</title>

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

<!-- ================= CABECERA PRESUPUESTO ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">request_quote</i>
            Presupuestos de Compras
            <small>Gestión de presupuestos y detalle</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="pre_estado" value="PENDIENTE">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">

                <div class="col-sm-1">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="pre_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                    <small id="avisoFechaPre" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="pre_vence" class="datetimepicker form-control" disabled placeholder="Plazo de Entrega">
                    <small id="avisoVencePre" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-5">
                    <input type="text" id="pre_observaciones" class="form-control" disabled placeholder="Observaciones">
                </div>

            </div>
        </div>

        <!-- PEDIDO Y PROVEEDOR -->
        <div class="section-box">
            <div class="section-title">Pedido y Proveedor</div>
            <div class="row clearfix">

                <div class="col-sm-12">
                    <label style="font-size:12px;font-weight:700;text-transform:uppercase;color:#2d3436;margin-bottom:4px;display:block;">Pedidos</label>
                    <div style="position:relative;">
                        <input type="text" id="pedido" class="form-control" disabled onkeyup="buscarPedidos();" placeholder="Buscar por número de pedido...">
                        <div id="listaPedidos" style="display:none;"></div>
                    </div>
                    <table class="table table-bordered table-condensed" style="font-size:12px;margin-top:8px;">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Pedido</th>
                                <th>Empresa</th>
                                <th>Sucursal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="bodyPedidosSeleccionados">
                            <tr><td colspan="5" class="text-center text-muted">Sin pedidos seleccionados</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-sm-4">
                    <input type="hidden" id="proveedor_id" value="0">
                    <input type="text" id="prov_razonsocial" class="form-control" disabled onkeyup="buscarProveedores();" placeholder="Proveedor">
                    <div id="listaProveedores" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <input type="text" id="prov_ruc" class="form-control" disabled placeholder="RUC">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="prov_telefono" class="form-control" disabled placeholder="Teléfono">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="prov_correo" class="form-control" disabled placeholder="Correo">
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
        <h2><i class="material-icons">list</i> Detalle del Presupuesto</h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacionDetalle" value="0">
            <input type="hidden" id="deposito_id_original">

        <div class="section-box">
            <div class="section-title">Ítems</div>
            <div class="row clearfix">

                <div class="col-sm-1">
                    <input type="text" id="item_id" class="form-control" disabled placeholder="Cód">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
                    <div id="listaProductos" style="display:none;"></div>
                </div>

                <div class="col-sm-1">
                    <input type="text" id="det_cantidad" class="form-control" disabled placeholder="Cant.">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="det_costo" class="form-control" disabled placeholder="Costo">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="cantidad_stock" class="form-control" disabled placeholder="Stock">
                </div>

                <div class="col-sm-2">
                    <select class="form-control" id="marca_det_pre" disabled>
                        <option value="">-- Marca --</option>
                    </select>
                </div>

                <div class="col-sm-2">
                    <select class="form-control" id="modelo_det_pre" disabled>
                        <option value="">-- Modelo --</option>
                    </select>
                </div>

                <div class="col-sm-2">
                    <select class="form-control" id="deposito_id_det" disabled>
                        <option value="">-- Depósito --</option>
                    </select>
                </div>

            </div>
        </div>

        <div class="btn-toolbar-left">
            <button id="btnAgregarDetalle"  class="btn btn-success waves-effect" onclick="agregarDetalle();">
                <i class="material-icons">add</i>
            </button>
            <button id="btnEditarDetalle"   class="btn btn-warning waves-effect" onclick="editarDetalle();">
                <i class="material-icons">edit</i>
            </button>
            <button id="btnEliminarDetalle" class="btn btn-danger waves-effect"  onclick="eliminarDetalle();">
                <i class="material-icons">clear</i>
            </button>
            <button id="btnGrabarDetalle"    class="btn btn-default waves-effect" onclick="grabarDetalle();" style="display:none;">
                <i class="material-icons">save</i>
            </button>
            <button id="btnCancelarDetalle" class="btn btn-warning waves-effect" onclick="cancelarDetalle();" style="display:none;">
                <i class="material-icons">close</i>
            </button>
        </div>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th>Sub Total</th>
                    <th>Impuesto</th>
                    <th>Depósito</th>
                </tr>
            </thead>
            <tbody id="tableDetalle"></tbody>
            <tfoot>
                <tr>
                    <th colspan="8" class="text-right">IVA 10%</th>
                    <th id="txtIva10" class="text-right">0</th>
                </tr>
                <tr>
                    <th colspan="8" class="text-right">IVA 5%</th>
                    <th id="txtIva5" class="text-right">0</th>
                </tr>
                <tr>
                    <th colspan="8" class="text-right">Total IVA</th>
                    <th id="txtTotalIva" class="text-right">0</th>
                </tr>
                <tr>
                    <th colspan="8" class="text-right" style="font-weight:bold;">Total General</th>
                    <th id="txtTotalGral" class="text-right" style="font-weight:bold;">0</th>
                </tr>
            </tfoot>
        </table>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list_alt</i> Registros de Presupuestos</h2>
    </div>
    <div class="body">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Fecha</th>
                    <th>Plazo</th>
                    <th>Observaciones</th>
                    <th>Encargado</th>
                    <th>Estado</th>
                    <th>Pedido</th>
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
<script src="metodos.js?v=4"></script>

</body>
</html>
