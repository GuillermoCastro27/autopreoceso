<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ORDENES DE COMPRAS</title>

    <!-- Favicon -->
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

<!-- ================================================= -->
<!-- CABECERA -->
<!-- ================================================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">shopping_cart</i>
            Órdenes de Compra
            <small>Gestión de órdenes y detalle</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="ord_comp_estado" value="PENDIENTE">

        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">
                <div class="col-sm-1">
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

                <div class="col-sm-2">
                    <label class="field-label">Condición de Pago</label>
                    <select id="condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                        <option value="CONTADO">Al contado</option>
                        <option value="CREDITO">A crédito</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Intervalo Vencimiento</label>
                    <input type="text" id="ord_comp_intervalo_fecha_vence" class="datetimepicker form-control" disabled placeholder="Intervalo Vencimiento">
                    <small id="avisoVenceOC" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Fecha</label>
                    <input type="text" id="ord_comp_fecha" class="datetimepicker form-control" readonly placeholder="Fecha">
                    <small id="avisoFechaOC" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Cuota</label>
                    <input type="text" id="ord_comp_cant_cuota" class="form-control" disabled placeholder="Cuota">
                </div>
            </div>
        </div>

        <div class="section-box">
            <div class="section-title">Origen y Proveedor</div>

            <!-- Toggle origen (solo visible en modo Agregar/Editar) -->
            <div id="seccionOrigen" style="display:none; margin-bottom:12px;">
                <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-default active" id="btnLblPresupuesto">
                        <input type="radio" name="origen_oc" value="presupuesto" autocomplete="off" checked onchange="cambiarOrigen();">
                        <i class="material-icons" style="font-size:16px;vertical-align:middle;">description</i> Desde Presupuesto
                    </label>
                    <label class="btn btn-default" id="btnLblPedido">
                        <input type="radio" name="origen_oc" value="pedido" autocomplete="off" onchange="cambiarOrigen();">
                        <i class="material-icons" style="font-size:16px;vertical-align:middle;">list_alt</i> Desde Pedido Directo
                    </label>
                </div>
            </div>

            <!-- Búsqueda de presupuesto -->
            <div id="divPresupuesto" class="row clearfix">
                <div class="col-sm-12">
                    <input type="text" id="presupuestos" class="form-control" disabled onkeyup="buscarPresupuesto();" placeholder="Presupuesto">
                    <input type="hidden" id="presupuesto_id" value="0">
                    <div id="listaPresupuesto" style="display:none;"></div>
                </div>

                <div class="col-sm-12" id="panelPedidosPresupuesto" style="display:none; margin-top:8px;">
                    <small style="font-weight:600; color:#555;">Pedidos que conforman este presupuesto:</small>
                    <table class="table table-bordered table-condensed" style="margin-top:4px; margin-bottom:0; font-size:12px;">
                        <thead>
                            <tr>
                                <th style="width:90px;">Nro Pedido</th>
                                <th>Observaciones</th>
                                <th style="width:110px;">Vencimiento</th>
                                <th style="width:90px;">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="bodyPedidosPresupuesto"></tbody>
                    </table>
                </div>
            </div>

            <!-- Búsqueda de pedido (oculto por defecto) -->
            <div id="divPedido" class="row clearfix" style="display:none;">
                <div class="col-sm-12">
                    <input type="text" id="pedido_desc" class="form-control" disabled onkeyup="buscarPedidoDirecto();" placeholder="Buscar Pedido por número...">
                    <input type="hidden" id="pedido_id" value="0">
                    <div id="listaPedido" style="display:none;"></div>
                </div>
            </div>

            <!-- Proveedor -->
            <div class="row clearfix" style="margin-top:6px;">
                <div class="col-sm-4">
                    <label class="field-label">Proveedor</label>
                    <input type="hidden" id="proveedor_id" value="0">
                    <input type="text" id="prov_razonsocial" class="form-control" disabled onkeyup="buscarProveedorDirecto();" placeholder="Proveedor">
                    <div id="listaProveedor" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">RUC</label>
                    <input type="text" id="prov_ruc" class="form-control" disabled placeholder="RUC">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Teléfono</label>
                    <input type="text" id="prov_telefono" class="form-control" disabled placeholder="Teléfono">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Correo</label>
                    <input type="text" id="prov_correo" class="form-control" disabled placeholder="Correo">
                </div>
            </div>
        </div>

        <div class="btn-toolbar-left">
            <button id="btnAgregar" class="btn btn-success" onclick="agregar();"><i class="material-icons">add</i> Agregar</button>
            <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled><i class="material-icons">edit</i> Modificar</button>
            <button id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled><i class="material-icons">delete</i> Anular</button>
            <button id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled><i class="material-icons">check_circle</i> Confirmar</button>
            <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled><i class="material-icons">save</i> Grabar</button>
            <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled><i class="material-icons">close</i> Cancelar</button>
            <button id="btnImprimir" class="btn btn-info waves-effect" onclick="imprimirOrden();" style="display:none;" disabled><i class="material-icons">print</i> Imprimir</button>
        </div>

    </div>
</div>

<!-- ================================================= -->
<!-- DETALLE -->
<!-- ================================================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">list</i> Detalle de la Orden</h2>
    </div>
    <div class="body">

        <div id="formDetalles" style="display:none;">
            <input type="hidden" id="txtOperacionDetalle" value="0">
            <input type="hidden" id="tipo_impuesto_id">

            <div class="section-box">
                <div class="section-title">Productos</div>
                <div class="row clearfix">
                    <div class="col-sm-1">
                        <label class="field-label">Cód.</label>
                        <input type="text" id="item_id" class="form-control" disabled placeholder="Cód">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Producto</label>
                        <input type="text" id="item_descripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Buscar...">
                        <div id="listaProductos" style="display:none;"></div>
                    </div>
                    <div class="col-sm-1">
                        <label class="field-label">Cant.</label>
                        <input type="text" id="orden_compra_det_cantidad" class="form-control" disabled placeholder="0">
                    </div>
                    <div class="col-sm-1">
                        <label class="field-label">Stock</label>
                        <input type="text" id="cantidad_stock" class="form-control" disabled placeholder="0">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Costo</label>
                        <input type="text" id="item_costo" class="form-control" disabled placeholder="0">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Impuesto</label>
                        <input type="text" id="tipo_imp_nom" class="form-control" disabled placeholder="—">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Marca</label>
                        <select class="form-control" id="marca_det_oc" disabled>
                            <option value="">-- Marca --</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Modelo</label>
                        <select class="form-control" id="modelo_det_oc" disabled>
                            <option value="">-- Modelo --</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Depósito</label>
                        <select class="form-control" id="deposito_id_det" disabled>
                            <option value="">-- Depósito --</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="btn-toolbar-left">
                <button type="button" id="btnAgregarDetalle" class="btn btn-success waves-effect" onclick="agregarDetalle();"><i class="material-icons">add</i></button>
                <button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();"><i class="material-icons">mode_edit</i></button>
                <button type="button" id="btnEliminarDetalle" class="btn btn-danger waves-effect" onclick="eliminarDetalle();"><i class="material-icons">clear</i></button>
                <button type="button" id="btnGrabarDetalle"    class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();"><i class="material-icons">save</i></button>
                <button type="button" id="btnCancelarDetalle" class="btn btn-warning waves-effect" style="display:none;" onclick="cancelarDetalle();"><i class="material-icons">close</i></button>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Impuesto</th>
                        <th>SubTotal</th>
                        <th>IVA</th>
                        <th>Depósito</th>
                    </tr>
                </thead>
                <tbody id="tableDetalle"></tbody>
                <tfoot>
                    <tr>
                        <th colspan="9" class="text-right">IVA 10%</th>
                        <th id="txtIva10" class="text-right">0</th>
                    </tr>
                    <tr>
                        <th colspan="9" class="text-right">IVA 5%</th>
                        <th id="txtIva5" class="text-right">0</th>
                    </tr>
                    <tr>
                        <th colspan="9" class="text-right">Total IVA</th>
                        <th id="txtTotalConImpuesto" class="text-right">0</th>
                    </tr>
                    <tr>
                        <th colspan="9" class="text-right" style="font-weight:bold;">Total General</th>
                        <th id="txtTotalGral" class="text-right" style="font-weight:bold;">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

<!-- ================================================= -->
<!-- REGISTROS -->
<!-- ================================================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list_alt</i> Registros de Órdenes</h2>
    </div>
    <div class="body">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Intervalo Vencimiento</th>
                    <th>Fecha</th>
                    <th>Presupuesto</th>
                    <th>Encargado</th>
                    <th>Cuotas</th>
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

<!-- ================= JS ================= -->
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
<script src="metodos.js?v=2"></script>

<!-- ===== FUNCION ORIGINAL ===== -->
<script>
function controlarCamposPago() {

    var condicion = document.getElementById('condicion_pago').value;
    var cuota = document.getElementById('ord_comp_cant_cuota');
    var intervalo = document.getElementById('ord_comp_intervalo_fecha_vence');

    if (condicion === 'CONTADO') {
        cuota.disabled = true;
        cuota.value = '';
        intervalo.disabled = true;
        intervalo.value = '';
    } else {
        cuota.disabled = false;
        intervalo.disabled = false;
    }
}

window.onload = function () {
    controlarCamposPago();
};
</script>

</body>
</html>

