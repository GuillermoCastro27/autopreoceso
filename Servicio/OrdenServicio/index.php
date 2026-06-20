<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ORDEN DE SERVICIO</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<div class="card card-industrial">
<div class="header">
    <h2>
        <i class="material-icons">assignment</i>
        Registrar Orden de Servicio
        <small>CRUD de Orden de Servicio y su detalle</small>
    </h2>
</div>

<div class="body">

    <input type="hidden" value="0" id="txtOperacion"/>
    <input type="hidden" id="funcionario_id">
    <input type="hidden" value="PENDIENTE" id="ord_serv_estado"/>
    <input type="hidden" value="NORMAL" id="ord_serv_tipo"/>

    <!-- ================= DATOS GENERALES ================= -->
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
            <div id="listaEmpresa" style="display:none;"></div>
        </div>
        <div class="col-sm-2">
            <label class="field-label">Sucursal</label>
            <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
            <input type="hidden" id="sucursal_id">
            <div id="listaSucursal" style="display:none;"></div>
        </div>
        <div class="col-sm-3">
            <label class="field-label">Fecha</label>
            <input type="text" id="ord_serv_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Fecha Vence</label>
            <input type="text" id="ord_serv_fecha_vence" class="datetimepicker form-control" disabled placeholder="Fecha Vence">
        </div>
        <div class="col-sm-5" style="margin-top:10px;">
            <label class="field-label">Presupuesto de Servicio</label>
            <input type="text" id="presupuesto_serv" class="form-control" disabled onkeyup="buscarPresupuestoServ();" placeholder="Presupuesto de Servicio">
            <input type="hidden" id="presupuesto_serv_cab_id">
            <div id="listaPresupuestoServ" style="display:none;"></div>
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Observaciones</label>
            <input type="text" id="ord_serv_observaciones" class="form-control" disabled placeholder="Observaciones">
        </div>
    </div>
    </div>

    <!-- ================= DIAGNÓSTICO Y EQUIPO ================= -->
    <div class="section-box">
    <div class="section-title">Diagnóstico y Equipo de Trabajo</div>
    <div class="row clearfix">
        <div class="col-sm-4">
            <label class="field-label">Diagnóstico</label>
            <input type="text" id="diagnostico" class="form-control" disabled placeholder="Diagnóstico">
            <input type="hidden" id="diagnostico_cab_id">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Tipo Diagnóstico</label>
            <input type="text" id="tipo_diag_nombre" class="form-control" disabled placeholder="Tipo Diagnóstico">
            <input type="hidden" id="tipo_diagnostico_id">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Equipo de Trabajo</label>
            <input type="text" id="equipo_nombre" class="form-control" disabled onkeyup="buscarEquipoTrabajo();" placeholder="Equipo de Trabajo">
            <input type="hidden" id="equipo_trabajo_id">
            <div id="listaEquiTrab" style="display:none;"></div>
        </div>
        <div class="col-sm-8" style="margin-top:10px;">
            <label class="field-label">Descripción</label>
            <input type="text" id="equipo_descripcion" class="form-control" disabled placeholder="Descripción">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Categoría</label>
            <input type="text" id="equipo_categoria" class="form-control" disabled placeholder="Categoría">
        </div>
    </div>
    </div>

    <!-- ================= CLIENTE ================= -->
    <div class="section-box">
    <div class="section-title">Cliente</div>
    <div class="row clearfix">
        <div class="col-sm-2">
            <label class="field-label">Nombre</label>
            <input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarCliente();" placeholder="Nombre">
            <input type="hidden" id="clientes_id">
            <div id="listaClientes" style="display:none;"></div>
        </div>
        <div class="col-sm-2">
            <label class="field-label">Apellido</label>
            <input type="text" id="cli_apellido" class="form-control" disabled placeholder="Apellido">
        </div>
        <div class="col-sm-2">
            <label class="field-label">RUC</label>
            <input type="text" id="cli_ruc" class="form-control" disabled placeholder="RUC">
        </div>
        <div class="col-sm-2">
            <label class="field-label">Teléfono</label>
            <input type="text" id="cli_telefono" class="form-control" disabled placeholder="Teléfono">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Dirección</label>
            <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Correo</label>
            <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
        </div>
    </div>
    </div>

    <!-- ================= VEHÍCULO ================= -->
    <div class="section-box">
    <div class="section-title">Vehículo</div>
    <div class="row clearfix">
        <div class="col-sm-3">
            <label class="field-label">Tipo Vehículo</label>
            <input type="text" id="tip_veh_nombre" class="form-control" disabled placeholder="Tipo Vehículo">
            <input type="hidden" id="tipo_vehiculo_id">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Capacidad</label>
            <input type="text" id="tip_veh_capacidad" class="form-control" disabled placeholder="Capacidad">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Tipo Combustible</label>
            <input type="text" id="tip_veh_combustible" class="form-control" disabled placeholder="Tipo Combustible">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Categoría</label>
            <input type="text" id="tip_veh_categoria" class="form-control" disabled placeholder="Categoría">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Marca</label>
            <input type="text" id="mar_nom" class="form-control" disabled placeholder="Marca">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Modelo</label>
            <input type="text" id="modelo_nom" class="form-control" disabled placeholder="Modelo">
        </div>
    </div>
    </div>

    <!-- ================= BOTONES ================= -->
    <div class="btn-toolbar-left text-center">
        <button type="button" id="btnAgregar" class="btn btn-success" onclick="agregar();">
            <i class="material-icons">add</i> Agregar
        </button>
        <button type="button" id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>
            <i class="material-icons">edit</i> Modificar
        </button>
        <button type="button" id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled>
            <i class="material-icons">delete</i> Anular
        </button>
        <button type="button" id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled>
            <i class="material-icons">check_circle</i> Confirmar
        </button>
        <button type="button" id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>
            <i class="material-icons">save</i> Grabar
        </button>
        <button type="button" id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>
            <i class="material-icons">close</i> Cancelar
        </button>
    </div>

</div>
</div>

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">playlist_add</i> Detalles de la Orden de Servicio</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Costo</th>
                        <th>Marca</th>
                        <th>Modelo</th><th>Depósito</th>
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
        <h2><i class="material-icons">list</i> Registros de Orden de Servicio</h2>
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
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js?v=2"></script>

</body>
</html>

