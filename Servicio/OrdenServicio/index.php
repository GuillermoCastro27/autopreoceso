<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ORDEN DE SERVICIO</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- AdminBSB -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />

    <!-- ESTILO INDUSTRIAL -->
    <style>
        body { background:#f1f2f6; }

        .card-industrial {
            border-left: 6px solid #0984e3;
            border-radius: 6px;
            box-shadow: 0 6px 14px rgba(0,0,0,.12);
            background: #fff;
            margin-bottom: 25px;
        }

        .card-industrial .header {
            background: #2d3436;
            color: #fff;
            padding: 15px 20px;
        }

        .card-industrial .header h2 small {
            color: rgba(255,255,255,.75);
        }

        .section-box {
            background: #ffffff;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #2d3436;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #dcdde1;
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
        <i class="material-icons">assignment</i>
        Registrar Orden de Servicio
        <small>CRUD de Orden de Servicio y su detalle</small>
    </h2>
</div>

<div class="body">

<!-- ================= DATOS GENERALES ================= -->
<div class="section-box">
<div class="section-title">Datos Generales</div>
<div class="row clearfix">

<input type="hidden" value="0" id="txtOperacion"/>
<input type="hidden" value="1" id="user_id"/>
<input type="hidden" value="PENDIENTE" id="ord_serv_estado"/>

<div class="col-sm-1">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="id" class="form-control" disabled>
            <label class="form-label">Código</label>
        </div>
    </div>
</div>

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="emp_razon_social" class="form-control" disabled>
            <label class="form-label">Empresa</label>
        </div>
        <input type="hidden" id="empresa_id">
        <div id="listaEmpresa" style="display:none;"></div>
    </div>
</div>

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();">
            <label class="form-label">Sucursal</label>
        </div>
        <input type="hidden" id="sucursal_id">
        <div id="listaSucursal" style="display:none;"></div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="ord_serv_fecha" class="datetimepicker form-control" disabled>
            <label class="form-label">Fecha</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="ord_serv_fecha_vence" class="datetimepicker form-control" disabled>
            <label class="form-label">Fecha Vence</label>
        </div>
    </div>
</div>

<div class="col-sm-5">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="presupuesto_serv" class="form-control" disabled onkeyup="buscarPresupuestoServ();">
            <label class="form-label">Presupuesto de Servicio</label>
        </div>
        <input type="hidden" id="presupuesto_serv_cab_id">
        <div id="listaPresupuestoServ" style="display:none;"></div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="ord_serv_observaciones" class="form-control" disabled>
            <label class="form-label">Observaciones</label>
        </div>
    </div>
</div>

</div>
</div>

<!-- ================= DIAGNÓSTICO Y EQUIPO ================= -->
<div class="section-box">
<div class="section-title">Diagnóstico y Equipo de Trabajo</div>
<div class="row clearfix">

<div class="col-sm-4">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="diagnostico" class="form-control" disabled>
            <label class="form-label">Diagnóstico</label>
        </div>
        <input type="hidden" id="diagnostico_cab_id">
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="tipo_diag_nombre" class="form-control" disabled>
            <label class="form-label">Tipo Diagnóstico</label>
        </div>
        <input type="hidden" id="tipo_diagnostico_id">
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="equipo_nombre" class="form-control" disabled onkeyup="buscarEquipoTrabajo();">
            <label class="form-label">Equipo de Trabajo</label>
        </div>
        <input type="hidden" id="equipo_trabajo_id">
        <div id="listaEquiTrab" style="display:none;"></div>
    </div>
</div>

<div class="col-sm-8">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="equipo_descripcion" class="form-control" disabled>
            <label class="form-label">Descripción</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="equipo_categoria" class="form-control" disabled>
            <label class="form-label">Categoría</label>
        </div>
    </div>
</div>

</div>
</div>

<!-- ================= CLIENTE ================= -->
<div class="section-box">
<div class="section-title">Cliente</div>
<div class="row clearfix">

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarCliente();">
            <label class="form-label">Cliente</label>
        </div>
        <input type="hidden" id="clientes_id">
        <div id="listaClientes" style="display:none;"></div>
    </div>
</div>

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_apellido" class="form-control" disabled>
            <label class="form-label">Apellido</label>
        </div>
    </div>
</div>

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_ruc" class="form-control" disabled>
            <label class="form-label">RUC</label>
        </div>
    </div>
</div>

<div class="col-sm-2">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_telefono" class="form-control" disabled>
            <label class="form-label">Teléfono</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_direccion" class="form-control" disabled>
            <label class="form-label">Dirección</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="cli_correo" class="form-control" disabled>
            <label class="form-label">Correo</label>
        </div>
    </div>
</div>

</div>
</div>

<!-- ================= VEHÍCULO ================= -->
<div class="section-box">
<div class="section-title">Vehículo</div>
<div class="row clearfix">

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="tip_veh_nombre" class="form-control" disabled>
            <label class="form-label">Tipo Vehículo</label>
        </div>
        <input type="hidden" id="tipo_vehiculo_id">
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="tip_veh_capacidad" class="form-control" disabled>
            <label class="form-label">Capacidad</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="tip_veh_combustible" class="form-control" disabled>
            <label class="form-label">Tipo Combustible</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="tip_veh_categoria" class="form-control" disabled>
            <label class="form-label">Categoría</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="marc_nom" class="form-control" disabled>
            <label class="form-label">Marca</label>
        </div>
    </div>
</div>

<div class="col-sm-3">
    <div class="form-group form-float">
        <div class="form-line">
            <input type="text" id="modelo_nom" class="form-control" disabled>
            <label class="form-label">Modelo</label>
        </div>
    </div>
</div>

</div>
</div>

<!-- ================= BOTONES ================= -->
<div class="button-demo btn-toolbar-left">
    <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
    <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
    <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>ANULAR</button>
    <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>CONFIRMAR</button>
    <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
    <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
</div>

</div>
</div>

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2>Detalles de la Orden de Servicio</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
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
        <h2>Registros de Orden de Servicio</h2>
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
                        <th>Fecha Vence</th>
                        <th>Cliente</th>
                        <th>Apellido</th>
                        <th>RUC</th>
                        <th>Estado</th>
                        <th>Diagnóstico</th>
                        <th>Observaciones</th>
                        <th>Tipo de Servicio</th>
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
</div>
</section>

<!-- SCRIPTS -->
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
<script src="../../plugins/autosize/autosize.js"></script>
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

</body>
</html>
