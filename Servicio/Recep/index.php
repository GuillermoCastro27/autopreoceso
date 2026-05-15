<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>GUI RECEPCION DE VEHICULOS</title>

<link rel="icon" href="../../images.ico" type="image/x-icon">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Bootstrap & Plugins -->
<link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
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
<i class="material-icons">directions_car</i>
Recepción de Vehículos
<small>Registro y control</small>
</h2>
</div>

<div class="body">

<input type="hidden" id="txtOperacion" value="0">
<input type="hidden" id="funcionario_id">
<input type="hidden" id="recep_cab_estado" value="PENDIENTE">

<!-- ================= DATOS GENERALES ================= -->
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
        <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
        <input type="hidden" id="sucursal_id">
        <div id="listaSucursal" style="display:none;"></div>
    </div>

    <div class="col-sm-2">
        <input type="text" id="recep_cab_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
    </div>

    <div class="col-sm-2">
        <input type="text" id="recep_cab_fecha_estimada" class="datetimepicker form-control" disabled placeholder="Fecha Estimada">
    </div>
</div>
</div>

<!-- ================= SOLICITUD ================= -->
<div class="section-box">
<div class="section-title">Solicitud</div>

<div class="row clearfix">
    <div class="col-sm-6">
        <input type="text" id="solicitud" class="form-control" disabled onkeyup="buscarSolicitud();" placeholder="Solicitud">
        <input type="hidden" id="solicitudes_cab_id" value="0">
        <div id="listaSolicitud" style="display:none;"></div>
    </div>

    <div class="col-sm-6">
        <input type="text" id="recep_cab_observaciones" class="form-control" disabled placeholder="Observaciones">
    </div>
</div>

<div class="row clearfix" style="margin-top:10px;">
    <div class="col-sm-2">
        <input type="text" id="recep_cab_prioridad" class="form-control" disabled placeholder="Prioridad">
    </div>

    <div class="col-sm-2">
        <input type="text" id="recep_cab_kilometraje" class="form-control" disabled placeholder="Kilometraje">
    </div>

    <div class="col-sm-2">
        <input type="text" id="recep_cab_nivel_combustible" class="form-control" disabled placeholder="Combustible">
    </div>

    <div class="col-sm-4">
        <input type="text" id="tipo_serv_nombre" class="form-control" disabled onkeyup="buscarTipoServicio();" placeholder="Tipo Servicio">
        <input type="hidden" id="tipo_servicio_id">
        <div id="listaTipoServ" style="display:none;"></div>
    </div>
</div>
</div>

<!-- ================= CLIENTE ================= -->
<div class="section-box">
<div class="section-title">Cliente</div>

<div class="row clearfix">
    <div class="col-sm-3">
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

    <div class="col-sm-3">
        <input type="text" id="cli_telefono" class="form-control" disabled placeholder="Teléfono">
    </div>
</div>

<div class="row clearfix" style="margin-top:10px;">
    <div class="col-sm-6">
        <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
    </div>

    <div class="col-sm-6">
        <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
    </div>
</div>
</div>

<!-- ================= VEHÍCULO ================= -->
<div class="section-box">
<div class="section-title">Vehículo</div>

<div class="row clearfix">
    <div class="col-sm-3">
        <input type="text" id="tip_veh_nombre" class="form-control" disabled onkeyup="buscarTipoVehiculoPorMarca();" placeholder="Tipo Vehículo">
        <input type="hidden" id="tipo_vehiculo_id">
        <div id="listaTipoVeh" style="display:none;"></div>
    </div>

    <div class="col-sm-3">
        <input type="text" id="tip_veh_capacidad" class="form-control" disabled placeholder="Capacidad">
    </div>

    <div class="col-sm-3">
        <input type="text" id="tip_veh_combustible" class="form-control" disabled placeholder="Tipo Combustible">
    </div>

    <div class="col-sm-3">
        <input type="text" id="tip_veh_categoria" class="form-control" disabled placeholder="Categoría">
    </div>
</div>

<div class="row clearfix" style="margin-top:10px;">
    <div class="col-sm-3">
        <input type="text" id="tip_veh_observacion" class="form-control" disabled placeholder="Observación">
    </div>

    <div class="col-sm-4">
        <input type="text" id="marc_nom" class="form-control" disabled onkeyup="buscarMarcasVehiculo();" placeholder="Marca">
        <input type="hidden" id="marca_id">
        <div id="listaMarcasVehiculo" style="display:none;"></div>
    </div>

    <div class="col-sm-3">
        <input type="text" id="modelo_nom" class="form-control" disabled placeholder="Modelo">
    </div>

    <div class="col-sm-2">
        <input type="text" id="modelo_año" class="form-control" disabled placeholder="Año Modelo">
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
<div class="card card-industrial" id="detalle" style="display:none">

    <div class="header">
        <h2>
            <i class="material-icons">playlist_add</i>
            Detalles de la Recepción
        </h2>
    </div>

    <div class="body">

        <!-- ===== FORMULARIO DETALLE ===== -->
        <div class="row clearfix" id="formDetalles">

            <input type="hidden" id="txtOperacionDetalle" value="0"/>

            <div class="col-sm-1">
                <input type="text" id="item_id" class="form-control" disabled placeholder="Código">
            </div>
            <div class="col-sm-5">
                <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
                <div id="listaProductos" style="display:none;"></div>
            </div>
            <div class="col-sm-2">
                <input type="text" id="tip_imp_nom" class="form-control" disabled placeholder="Tipo impuesto">
                <input type="hidden" id="tipo_impuesto_id" name="tipo_impuesto_id">
            </div>
            <div class="col-sm-2">
                <input type="text" id="recep_det_cantidad_stock" class="form-control" disabled placeholder="Cant. Disponible">
            </div>
            <div class="col-sm-2">
                <input type="text" id="recep_det_cantidad" class="form-control" disabled placeholder="Cantidad">
            </div>
            <div class="col-sm-2">
                <input type="text" id="recep_det_costo" class="form-control" disabled placeholder="Precio">
            </div>

            <!-- BOTONES DETALLE -->
            <div class="col-sm-3">
                <div class="icon-button-demo" style="margin-top:15px;">
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

        <hr>

        <!-- ===== TABLA DETALLE ===== -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Cantidad Disponible</th>
                        <th>Precio</th>
                        <th>Tipo impuesto</th>
                        <th>Sub Total</th>
                        <th>IVA</th>
                    </tr>
                </thead>

                <tbody id="tableDetalle"></tbody>

                <tfoot>
                    <tr>
                        <th colspan="7" class="text-right">Total Comprobante</th>
                        <th class="text-right" id="txtTotalGral">0</th>
                    </tr>
                    <tr>
                        <th colspan="7" class="text-right">Total IVA</th>
                        <th class="text-right" id="txtTotalConImpuesto">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
<div class="header">
<h2><i class="material-icons">list</i> Registros de Recepción</h2>
</div>
<div class="body">
<table class="table table-bordered table-striped table-hover dataTable js-exportable">
<thead>
<tr>
<th>Código</th>
<th>Cliente</th>
<th>Vehículo</th>
<th>Solicitud</th>
<th>Fecha</th>
<th>Estado</th>
<th>Encargado</th>
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
<script src="metodos.js?v=2"></script>

</body>
</html>
