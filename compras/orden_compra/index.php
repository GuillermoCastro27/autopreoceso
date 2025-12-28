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

    <!-- ===== ESTILO INDUSTRIAL ===== -->
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

        .card-industrial .header h2 {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
        }

        .card-industrial .header small {
            color: #dfe6e9;
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
            margin-bottom: 12px;
            border-bottom: 1px solid #ced6e0;
            padding-bottom: 4px;
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

        .table tbody {
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
        <input type="hidden" id="user_id">
        <input type="hidden" id="ord_comp_estado" value="PENDIENTE">

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

                <div class="col-sm-2">
                    <select id="condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                        <option value="CONTADO">Al contado</option>
                        <option value="CREDITO">A crédito</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="ord_comp_intervalo_fecha_vence" class="datetimepicker form-control" disabled placeholder="Intervalo Vencimiento">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="ord_comp_fecha" class="datetimepicker form-control" readonly placeholder="Fecha">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="ord_comp_cant_cuota" class="form-control" disabled placeholder="Cuota">
                </div>
            </div>
        </div>

        <div class="section-box">
            <div class="section-title">Presupuesto y Proveedor</div>

            <div class="row clearfix">
                <div class="col-sm-12">
                    <input type="text" id="presupuestos" class="form-control" disabled onkeyup="buscarPresupuesto();" placeholder="Presupuesto">
                    <input type="hidden" id="presupuesto_id" value="0">
                    <div id="listaPresupuesto" style="display:none;"></div>
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
            </div>
        </div>

        <div class="btn-toolbar-left">
            <button id="btnAgregar" class="btn btn-success" onclick="agregar();"><i class="material-icons">add</i> Agregar</button>
            <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled><i class="material-icons">edit</i> Modificar</button>
            <button id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled><i class="material-icons">delete</i> Anular</button>
            <button id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled><i class="material-icons">check_circle</i> Confirmar</button>
            <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled><i class="material-icons">save</i> Grabar</button>
            <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled><i class="material-icons">close</i> Cancelar</button>
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
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Impuesto</th>
                        <th>SubTotal</th>
                        <th>IVA</th>
                    </tr>
                </thead>
                <tbody id="tableDetalle"></tbody>
                <tfoot>
                    <tr>
                        <th colspan="5" class="text-right">Total</th>
                        <th id="txtTotalGral">0</th>
                    </tr>
                    <tr>
                        <th colspan="5" class="text-right">Total IVA</th>
                        <th id="txtTotalConImpuesto">0</th>
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
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

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
