<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DE COMPRAS</title>

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
<!-- CABECERA COMPRA -->
<!-- ================================================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">receipt_long</i>
            Compras
            <small>Gestión de compras y detalle</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="comp_estado" value="PENDIENTE">

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
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
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

                <div class="col-sm-2">
                    <label class="field-label">Timbrado</label>
                    <input type="text" id="comp_timbrado" class="form-control" disabled placeholder="Timbrado">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Intervalo Vencimiento</label>
                    <input type="text" id="comp_intervalo_fecha_vence" class="datetimepicker form-control" disabled placeholder="Intervalo Vencimiento">
                    <small id="avisoIFVComp" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Fecha</label>
                    <input type="text" id="comp_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                    <small id="avisoFechaComp" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-1">
                    <label class="field-label">Cuota</label>
                    <input type="text" id="comp_cant_cuota" class="form-control" disabled placeholder="Cuota">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Nro. Factura</label>
                    <input type="text" id="comp_nro_factura" class="form-control" disabled
                           placeholder="000-000-0000000" maxlength="15"
                           oninput="autoFormatoFactura(this)">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Fecha Emisión</label>
                    <input type="text" id="comp_fecha_emision" class="datepicker-emision form-control" disabled
                           placeholder="DD/MM/YYYY" readonly>
                </div>
            </div>
        </div>

        <div class="section-box">
            <div class="section-title">Orden de Compra y Proveedor</div>

            <div class="row clearfix">
                <div class="col-sm-12">
                    <label class="field-label">Orden de Compra</label>
                    <input type="text" id="ordencompra" class="form-control" disabled
                           onkeyup="buscarOrdenCompra();" placeholder="Orden de Compra">
                    <input type="hidden" id="orden_compra_cab_id" value="0">
                    <div id="listaOrdenCompra" style="display:none;"></div>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Proveedor</label>
                    <input type="hidden" id="proveedor_id" value="0">
                    <input type="text" id="prov_razonsocial" class="form-control" disabled placeholder="Proveedor">
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

        <!-- BOTONES CABECERA -->
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
                <i class="material-icons">check_circle</i> Recibido
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

<!-- ================================================= -->
<!-- DETALLE COMPRA -->
<!-- ================================================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">list</i> Detalle de la Compra</h2>
    </div>

    <div class="body">
        <div class="row clearfix" id="formDetalles"></div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
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
        <h2><i class="material-icons">list_alt</i> Registros de Compras</h2>
    </div>

    <div class="body">
        <!-- Filtro por período -->
        <div class="row" style="margin-bottom:12px; align-items:flex-end; display:flex; gap:8px; flex-wrap:wrap;">
            <div>
                <label style="font-size:12px; font-weight:600; color:#555;">Desde</label>
                <input type="date" id="filtro_desde" class="form-control" style="width:150px;">
            </div>
            <div>
                <label style="font-size:12px; font-weight:600; color:#555;">Hasta</label>
                <input type="date" id="filtro_hasta" class="form-control" style="width:150px;">
            </div>
            <div style="padding-top:18px;">
                <button class="btn btn-primary waves-effect" onclick="listar();">
                    <i class="material-icons" style="font-size:16px; vertical-align:middle;">search</i> Filtrar
                </button>
            </div>
        </div>

        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nro. Factura</th>
                    <th>Timbrado</th>
                    <th>Intervalo Vencimiento</th>
                    <th>Fecha</th>
                    <th>Orden de Compra</th>
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
<script src="metodos.js?v=2"></script>

<!-- ===== FUNCIÓN ORIGINAL ===== -->
<script>
function controlarCamposPago() {
    var condicion = document.getElementById('condicion_pago').value;
    var cuota = document.getElementById('comp_cant_cuota');
    var intervalo = document.getElementById('comp_intervalo_fecha_vence');

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

