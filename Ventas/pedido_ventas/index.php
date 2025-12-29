<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PEDIDOS VENTAS</title>

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

    <!-- ESTILO INDUSTRIAL -->
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
            <i class="material-icons">shopping_cart</i>
            Pedidos de Ventas
            <small>CRUD de Pedidos y su detalle</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id">
        <input type="hidden" id="ped_ven_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="ped_ven_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="ped_ven_vence" class="datetimepicker form-control" disabled placeholder="Plazo de Entrega">
                </div>
            </div>

            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-6">
                    <input type="text" id="ped_ven_observaciones" class="form-control" disabled placeholder="Observaciones">
                </div>
            </div>
        </div>

        <!-- ================= CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Cliente</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarCliente();" placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                    <div id="listaClientes" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="cli_apellido" class="form-control" disabled placeholder="Apellido">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="cli_ruc" class="form-control" disabled placeholder="RUC">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
                </div>
            </div>

            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-4">
                    <input type="text" id="cli_telefono" class="form-control" disabled placeholder="Teléfono">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
                </div>
            </div>
        </div>

        <!-- ================= BOTONES ================= -->
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

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">playlist_add</i> Detalles del Pedido de Ventas</h2>
    </div>
    <div class="body">
        <div class="row clearfix" id="formDetalles">
            <input type="hidden" id="txtOperacionDetalle" value="0"/>

            <div class="col-sm-1">
                <input type="text" id="item_id" class="form-control" disabled placeholder="Código">
            </div>

            <div class="col-sm-6">
                <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
                <div id="listaProductos" style="display:none;"></div>
            </div>

            <div class="col-sm-3">
                <input type="text" id="cantidad_stock" class="form-control" disabled placeholder="Cantidad Disponible">
            </div>

            <div class="col-sm-2">
                <input type="text" id="det_cantidad" class="form-control" disabled placeholder="Cantidad">
            </div>

            <div class="col-sm-3" style="margin-top:15px;">
                <button id="btnAgregarDetalle" class="btn btn-success" onclick="agregarDetalle();"><i class="material-icons">add</i></button>
                <button id="btnEditarDetalle" class="btn btn-warning" onclick="editarDetalle();"><i class="material-icons">mode_edit</i></button>
                <button id="btnEliminarDetalle" class="btn btn-danger" onclick="eliminarDetalle();"><i class="material-icons">clear</i></button>
                <button id="btnGrabarDetalle" class="btn btn-default" onclick="grabarDetalle();" style="display:none;"><i class="material-icons">save</i></button>
            </div>
        </div>

        <hr>

        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Cantidad Disponible</th>
                    </tr>
                </thead>
                <tbody id="tableDetalle"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Pedidos de Ventas</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Fecha</th>
                        <th>Plazo de Entrega</th>
                        <th>Observaciones</th>
                        <th>Cliente</th>
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

<!-- SCRIPTS -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
<script src="../../plugins/node-waves/waves.js"></script>
<script src="../../plugins/sweetalert/sweetalert.min.js"></script>

<!-- DATATABLE -->
<script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>

<script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>

<script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>

<script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

<!-- FECHA -->
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

<!-- ADMIN -->
<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>

<!-- RUTA Y MÉTODOS -->
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

</body>
</html>
