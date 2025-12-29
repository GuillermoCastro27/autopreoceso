<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI NOTA DE REMISIÓN VENTAS</title>
    <!-- Favicon-->
    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Bootstrap Material Datetime Picker Css -->
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

    <!-- Sweetalert Css -->
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- JQuery DataTable Css -->
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="../../css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
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
                    
                    <!-- ================= NOTAS DE REMISIÓN DE VENTAS ================= -->
<div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">local_shipping</i>
            Gestionar Notas de Remisión de Ventas
            <small>CRUD de Nota de Remisión de Ventas y su detalle</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id" value="1">
        <input type="hidden" id="nota_remi_vent_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <!-- CÓDIGO -->
                <div class="col-sm-2">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <!-- EMPRESA -->
                <div class="col-sm-2">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <!-- SUCURSAL -->
                <div class="col-sm-2">
                    <input type="text" id="suc_razon_social" class="form-control"
                           disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <input type="text" id="nota_remi_vent_fecha"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha">
                </div>

                <!-- OBSERVACIONES -->
                <div class="col-sm-6" style="margin-top:10px;">
                    <input type="text" id="nota_remi_vent_observaciones"
                           class="form-control" disabled
                           placeholder="Observaciones">
                </div>

            </div>
        </div>

        <!-- ================= VENTA ================= -->
        <div class="section-box">
            <div class="section-title">Venta Asociada</div>

            <div class="row clearfix">
                <div class="col-sm-3">
                    <input type="text" id="nro_venta"
                           class="form-control" disabled
                           onkeyup="buscarVentas();"
                           placeholder="Venta">
                    <input type="hidden" id="ventas_cab_id" value="0">
                    <div id="listaVentas" style="display:none;"></div>
                </div>
            </div>
        </div>

        <!-- ================= CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Cliente</div>

            <div class="row clearfix">

                <div class="col-sm-2">
                    <input type="text" id="cli_nombre"
                           class="form-control" disabled
                           onkeyup="buscarCliente();"
                           placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                    <div id="listaClientes" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="cli_apellido"
                           class="form-control" disabled
                           placeholder="Apellido">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="cli_ruc"
                           class="form-control" disabled
                           placeholder="RUC">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="cli_direccion"
                           class="form-control" disabled
                           placeholder="Dirección">
                </div>

            </div>

            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-4">
                    <input type="text" id="cli_telefono"
                           class="form-control" disabled
                           placeholder="Teléfono">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="cli_correo"
                           class="form-control" disabled
                           placeholder="Correo">
                </div>
            </div>
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left text-center">
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


</div><!-- FIN BODY -->
</div><!-- FIN CARD -->

<!-- ========================= DETALLE ========================= -->
<div class="card card-industrial" id="detalle" style="display:none">
<div class="header"><h2>Detalles de Nota de Remisión</h2></div>
<div class="body">
<div class="table-responsive">
<table class="table table-bordered table-striped table-hover">
<thead>
<tr>
    <th>Código</th>
    <th>Producto</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Subtotal</th>
</tr>
</thead>
<tbody id="tableDetalle"></tbody>
<tfoot>
<tr>
<th colspan="4" class="text-right">Total</th>
<th id="txtTotalGral" class="text-right">0</th>
</tr>
</tfoot>
</table>
</div>
</div>
</div>

<!-- ========================= REGISTROS ========================= -->
<div class="card card-industrial" id="registros">
<div class="header"><h2>Registros de Notas de Remisión</h2></div>
<div class="body">
<div class="table-responsive">
<table class="table table-bordered table-striped table-hover dataTable js-exportable">
<thead>
<tr>
<th>Código</th>
<th>Empresa</th>
<th>Sucursal</th>
<th>Fecha</th>
<th>Observaciones</th>
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
</div>
</section>

<!-- JS BASE -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>

<!-- PLUGINS OBLIGATORIOS ADMINBSB -->
<script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="../../plugins/node-waves/waves.js"></script>

<!-- SWEETALERT -->
<script src="../../plugins/sweetalert/sweetalert.min.js"></script>

<!-- DATATABLE -->
<script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>

<!-- EXPORT BUTTONS -->
<script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

<!-- FECHAS -->
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

<!-- ADMINBSB -->
<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>

<!-- TU SISTEMA -->
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

</body>
</html>
