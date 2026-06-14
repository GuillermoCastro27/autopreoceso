<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Nota de Remisión de Ventas</title>
    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet">
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet">
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet">
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet">
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ===== CABECERA ===== -->
<div class="card card-industrial">
<div class="header">
    <h2>
        <i class="material-icons">local_shipping</i>
        Gestionar Notas de Remisión de Ventas
        <small>Registro de entregas vinculadas a ventas</small>
    </h2>
</div>
<div class="body">

    <!-- CAMPOS OCULTOS -->
    <input type="hidden" id="txtOperacion" value="0">
    <input type="hidden" id="funcionario_id">
    <input type="hidden" id="nota_remi_vent_estado" value="PENDIENTE">
    <input type="hidden" id="empresa_id">
    <input type="hidden" id="sucursal_id">
    <input type="hidden" id="ventas_cab_id" value="0">
    <input type="hidden" id="clientes_id">
    <input type="hidden" id="funcionario_entrega_id">
    <input type="hidden" id="tipo_vehiculo_det_id">
    <input type="hidden" id="timbrado_id">

    <!-- ===== DATOS GENERALES ===== -->
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
            </div>
            <div class="col-sm-2">
                <label class="field-label">Sucursal</label>
                <input type="text" id="suc_razon_social" class="form-control" disabled placeholder="Sucursal">
            </div>
            <div class="col-sm-3">
                <label class="field-label">Fecha</label>
                <input type="text" id="nota_remi_vent_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
            </div>
            <div class="col-sm-4">
                <label class="field-label">Observaciones</label>
                <input type="text" id="nota_remi_vent_observaciones" class="form-control" disabled placeholder="Observaciones">
            </div>
        </div>
    </div>

    <!-- ===== VENTA ASOCIADA ===== -->
    <div class="section-box">
        <div class="section-title">Venta Asociada</div>
        <div class="row clearfix">
            <div class="col-sm-4">
                <label class="field-label">Buscar por número de venta</label>
                <input type="text" id="nro_venta" class="form-control" disabled
                       onkeyup="buscarVentas();" placeholder="Ej: 0000001">
                <div id="listaVentas" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
            </div>
        </div>
    </div>

    <!-- ===== CLIENTE ===== -->
    <div class="section-box">
        <div class="section-title">Cliente</div>
        <div class="row clearfix">
            <div class="col-sm-3">
                <label class="field-label">Nombre</label>
                <input type="text" id="cli_nombre" class="form-control" disabled placeholder="Nombre">
            </div>
            <div class="col-sm-3">
                <label class="field-label">Apellido</label>
                <input type="text" id="cli_apellido" class="form-control" disabled placeholder="Apellido">
            </div>
            <div class="col-sm-2">
                <label class="field-label">RUC / CI</label>
                <input type="text" id="cli_ruc" class="form-control" disabled placeholder="RUC">
            </div>
            <div class="col-sm-4">
                <label class="field-label">Dirección</label>
                <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
            </div>
        </div>
    </div>

    <!-- ===== ENTREGA ===== -->
    <div class="section-box">
        <div class="section-title">Datos de Entrega</div>
        <div class="row clearfix">
            <div class="col-sm-4">
                <label class="field-label">Funcionario que entrega</label>
                <input type="text" id="buscar_funcionario_entrega" class="form-control" disabled
                       onkeyup="buscarFuncionarioEntrega();" placeholder="Buscar por nombre o CI...">
                <div id="listaFuncionariosEntrega" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
            </div>
            <div class="col-sm-4">
                <label class="field-label">Vehículo de entrega <small class="text-muted">(opcional)</small></label>
                <input type="text" id="buscar_vehiculo" class="form-control" disabled
                       onkeyup="buscarVehiculo();" placeholder="Buscar por placa, marca o tipo...">
                <div id="listaVehiculos" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
            </div>
        </div>
    </div>

    <!-- ===== TIMBRADO ===== -->
    <div class="section-box">
        <div class="section-title">Timbrado</div>
        <div class="row clearfix">
            <div class="col-sm-3">
                <label class="field-label">Número de timbrado</label>
                <input type="text" id="tim_numero_display" class="form-control" disabled placeholder="(auto)">
            </div>
            <div class="col-sm-3">
                <label class="field-label">Nro. Comprobante</label>
                <input type="text" id="nota_remi_vent_nro_comprobante_display" class="form-control" disabled placeholder="—">
                <input type="hidden" id="nota_remi_vent_nro_comprobante">
            </div>
            <div class="col-sm-2">
                <label class="field-label">Vence</label>
                <input type="text" id="tim_vence_display" class="form-control" disabled placeholder="—">
            </div>
        </div>
    </div>

    <!-- ===== BOTONES ===== -->
    <div class="btn-toolbar-left text-center">
        <button id="btnAgregar"  class="btn btn-success waves-effect" onclick="agregar();">
            <i class="material-icons">add</i> Agregar
        </button>
        <button id="btnEditar"   class="btn btn-primary waves-effect" onclick="editar();" disabled>
            <i class="material-icons">edit</i> Modificar
        </button>
        <button id="btnEliminar" class="btn btn-danger waves-effect"  onclick="eliminar();" disabled>
            <i class="material-icons">delete</i> Anular
        </button>
        <button id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>
            <i class="material-icons">check_circle</i> Confirmar
        </button>
        <button id="btnGrabar"   class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
            <i class="material-icons">save</i> Grabar
        </button>
        <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
            <i class="material-icons">close</i> Cancelar
        </button>
        <button id="btnImprimir" class="btn btn-info waves-effect" onclick="abrirImprimir();" disabled>
            <i class="material-icons">print</i> Imprimir
        </button>
    </div>

</div>
</div>

<!-- ===== DETALLE ===== -->
<div class="card card-industrial" id="detalle" style="display:none;">
<div class="header">
    <h2><i class="material-icons">playlist_add_check</i> Ítems de la Nota de Remisión</h2>
</div>
<div class="body">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descripción</th>
                    <th>Origen</th>
                    <th class="text-right">Cantidad</th>
                    <th class="text-right">Precio Unit.</th>
                    <th class="text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody id="tableDetalle">
                <tr><td colspan="6" class="text-center text-muted">Sin ítems</td></tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5" class="text-right"><strong>Total:</strong></td>
                    <td class="text-right"><strong id="txtTotalGral">0,00</strong></td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
</div>

<!-- ===== REGISTROS ===== -->
<div class="card card-industrial" id="registros">
<div class="header">
    <h2><i class="material-icons">list</i> Registros de Notas de Remisión</h2>
</div>
<div class="body">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Empresa</th>
                    <th>Sucursal</th>
                    <th>Fecha</th>
                    <th>Venta</th>
                    <th>Cliente</th>
                    <th>Entrega</th>
                    <th>Vehículo</th>
                    <th>Observaciones</th>
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
<script src="metodos.js?v=2"></script>
</body>
</html>
