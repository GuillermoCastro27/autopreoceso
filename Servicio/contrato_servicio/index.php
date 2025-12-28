<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI CONTRATO DE SERVICIO</title>

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

        .table thead {
            background: #2d3436;
            color: #fff;
        }
    </style>
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<div class="card card-industrial">
<div class="header">
    <h2>Registrar Contrato de Servicio <small>CRUD de Contrato de Servicio y su detalle</small></h2>
</div>

<div class="body">

<div class="section-box">
<div class="section-title">Datos Generales</div>
<div class="row clearfix">

<input type="hidden" id="txtOperacion" value="0">
<input type="hidden" id="user_id" value="1">
<input type="hidden" id="contrato_estado" value="PENDIENTE">

<div class="col-sm-1">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="id" class="form-control" disabled>
<label class="form-label">Código</label>
</div></div></div>

<div class="col-sm-2">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="emp_razon_social" class="form-control" disabled>
<label class="form-label">Empresa</label>
</div>
<input type="hidden" id="empresa_id">
<div id="listaEmpresa" style="display:none;"></div>
</div></div>

<div class="col-sm-2">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();">
<label class="form-label">Sucursal</label>
</div>
<input type="hidden" id="sucursal_id">
<div id="listaSucursal" style="display:none;"></div>
</div></div>

<div class="col-sm-3">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_fecha" class="datetimepicker form-control" disabled>
<label class="form-label">Fecha</label>
</div></div></div>

<div class="col-sm-3">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_fecha_inicio" class="datetimepicker form-control" disabled>
<label class="form-label">Fecha Inicio</label>
</div></div></div>

<div class="col-sm-3">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_fecha_fin" class="datetimepicker form-control" disabled>
<label class="form-label">Fecha Fin</label>
</div></div></div>

<div class="col-sm-2">
<div class="form-group form-float"><div class="form-line">
<select id="contrato_condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
<option value="CONTADO">Al contado</option>
<option value="CREDITO">A crédito</option>
</select>
<label class="form-label">Condición de Pago</label>
</div></div></div>

<div class="col-sm-1">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_cuotas" class="form-control" disabled>
<label class="form-label">Cuota</label>
</div></div></div>

<div class="col-sm-3">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_intervalo_fecha_vence" class="datetimepicker form-control" disabled>
<label class="form-label">Intervalo Fecha Vence</label>
</div></div></div>

</div>
</div>

<!-- SERVICIO / CONTRATO -->
<div class="section-box">
<div class="section-title">Servicio y Contrato</div>
<div class="row clearfix">

<div class="col-sm-3">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="tipo_serv_nombre" class="form-control" disabled onkeyup="buscarTipoServicio();">
<label class="form-label">Tipo de Servicio</label>
</div>
<input type="hidden" id="tipo_servicio_id">
<div id="listaTipoServ" style="display:none;"></div>
</div></div>

<div class="col-sm-4">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="tip_con_nombre" class="form-control" disabled onkeyup="buscarTipoContrato();">
<label class="form-label">Tipo Contrato</label>
</div>
<input type="hidden" id="tipo_contrato_id">
<div id="listaTipoCont" style="display:none;"></div>
</div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_objeto" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Objeto</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_alcance" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Alcance</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_responsabilidad" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Responsabilidad</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_garantia" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Garantía</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_limitacion" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Limitación</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_fuerza_mayor" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Fuerza Mayor</label>
</div></div></div>

<div class="col-sm-11"><div class="form-group form-float"><div class="form-line">
<textarea id="contrato_jurisdiccion" class="form-control" rows="2" disabled></textarea>
<label class="form-label">Jurisdicción</label>
</div></div></div>

</div>
</div>

<!-- CLIENTE -->
<div class="section-box">
<div class="section-title">Cliente</div>
<div class="row clearfix">

<div class="col-sm-2">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarCliente();">
<label class="form-label">Cliente</label>
</div>
<input type="hidden" id="clientes_id">
<div id="listaClientes" style="display:none;"></div>
</div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_apellido" class="form-control" disabled>
<label class="form-label">Apellido</label>
</div></div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_ruc" class="form-control" disabled>
<label class="form-label">RUC</label>
</div></div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_telefono" class="form-control" disabled>
<label class="form-label">Teléfono</label>
</div></div></div>

<div class="col-sm-3"><div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_direccion" class="form-control" disabled>
<label class="form-label">Dirección</label>
</div></div></div>

<div class="col-sm-3"><div class="form-group form-float"><div class="form-line">
<input type="text" id="cli_correo" class="form-control" disabled>
<label class="form-label">Correo</label>
</div></div></div>

</div>
</div>

<!-- OBSERVACIONES -->
<div class="section-box">
<div class="section-title">Observaciones</div>
<div class="row clearfix">

<div class="col-sm-6">
<div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_observacion" class="form-control" disabled>
<label class="form-label">Observaciones</label>
</div></div></div>

</div>
</div>

<div class="button-demo">
<button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
<button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
<button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>ANULAR</button>
<button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>CONFIRMAR</button>
<button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
<button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
<button type="button" id="btnImprimir" class="btn btn-info waves-effect" onclick="imprimirContrato();" disabled>IMPRIMIR</button>
</div>

</div>
</div>

<!-- DETALLE -->
<div class="card card-industrial" id="detalle" style="display:none">
<div class="header"><h2>Detalles del Contrato de Servicio</h2></div>
<div class="body">

<div class="row clearfix" id="formDetalles">
<input type="hidden" id="txtOperacionDetalle" value="0">

<div class="col-sm-1"><div class="form-group form-float"><div class="form-line">
<input type="text" id="item_id" class="form-control" disabled>
<label class="form-label">Código</label>
</div></div></div>

<div class="col-sm-5"><div class="form-group form-float"><div class="form-line">
<input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();">
<label class="form-label">Producto</label>
</div>
<div id="listaProductos" style="display:none;"></div>
</div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="tip_imp_nom" class="form-control" disabled>
<label class="form-label">Tipo impuesto</label>
</div>
<input type="hidden" id="tipo_impuesto_id">
</div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_serv_det_cantidad_stock" class="form-control" disabled>
<label class="form-label">Cantidad Disponible</label>
</div></div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_serv_det_cantidad" class="form-control" disabled>
<label class="form-label">Cantidad</label>
</div></div></div>

<div class="col-sm-2"><div class="form-group form-float"><div class="form-line">
<input type="text" id="contrato_serv_det_costo" class="form-control" disabled>
<label class="form-label">Costo</label>
</div></div></div>

<div class="col-sm-3">
<div class="icon-button-demo">
<button type="button" id="btnAgregarDetalle" class="btn btn-success waves-effect" onclick="agregarDetalle();"><i class="material-icons">add</i></button>
<button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();"><i class="material-icons">mode_edit</i></button>
<button type="button" id="btnEliminarDetalle" class="btn btn-danger waves-effect" onclick="eliminarDetalle();"><i class="material-icons">clear</i></button>
<button type="button" id="btnGrabarDetalle" class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();"><i class="material-icons">save</i></button>
</div>
</div>

</div>

<div class="table-responsive">
<table class="table table-bordered table-striped table-hover dataTable">
<thead>
<tr>
<th>Código</th>
<th>Producto</th>
<th>Cantidad</th>
<th>Cantidad Disponible</th>
<th>Costo</th>
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

<!-- REGISTROS -->
<div class="card card-industrial" id="registros">
<div class="header"><h2>Registros del Contrato de Servicio</h2></div>
<div class="body">
<div class="table-responsive">
<table class="table table-bordered table-striped table-hover dataTable js-exportable">
<thead>
<tr>
<th>Código</th>
<th>Empresa</th>
<th>Sucursal</th>
<th>Fecha</th>
<th>Fecha Inicio</th>
<th>Fecha Fin</th>
<th>Cliente</th>
<th>Apellido</th>
<th>RUC</th>
<th>Tipo de Servicio</th>
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
<script src="../../js/admin.js"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js"></script>

<script>
function controlarCamposPago() {
    var condicion = document.getElementById('contrato_condicion_pago').value;
    var cuota = document.getElementById('contrato_cuotas');
    var intervalo = document.getElementById('contrato_intervalo_fecha_vence');

    if (condicion === 'CONTADO') {
        cuota.disabled = true;
        intervalo.disabled = true;
        intervalo.value = '';
    } else {
        cuota.disabled = false;
        intervalo.disabled = false;
    }
}
</script>

</body>
</html>
