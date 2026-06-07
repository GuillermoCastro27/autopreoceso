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
        <i class="material-icons">description</i>
        Registrar Contrato de Servicio
        <small>CRUD de Contrato de Servicio y su detalle</small>
    </h2>
</div>

<div class="body">

    <input type="hidden" id="txtOperacion" value="0">
    <input type="hidden" id="funcionario_id">
    <input type="hidden" id="contrato_estado" value="PENDIENTE">
    <input type="hidden" id="orden_serv_cab_id">

    <!-- ================= DATOS GENERALES ================= -->
    <div class="section-box">
    <div class="section-title">Datos Generales</div>
    <div class="row clearfix">
        <div class="col-sm-1">
            <input type="text" id="id" class="form-control" disabled placeholder="Código">
        </div>
        <div class="col-sm-2">
            <input type="text" id="contrato_numero" class="form-control" disabled placeholder="Nº Contrato" style="font-weight:bold;color:#1565c0;">
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
            <input type="text" id="contrato_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
        </div>
        <div class="col-sm-3">
            <input type="text" id="contrato_fecha_inicio" class="datetimepicker form-control" disabled placeholder="Fecha Inicio">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <input type="text" id="contrato_fecha_fin" class="datetimepicker form-control" disabled placeholder="Fecha Fin">
        </div>
        <div class="col-sm-2" style="margin-top:10px;">
            <select id="contrato_condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                <option value="CONTADO">Al contado</option>
                <option value="CREDITO">A crédito</option>
            </select>
        </div>
        <div class="col-sm-1" style="margin-top:10px;">
            <input type="text" id="contrato_cuotas" class="form-control" disabled placeholder="Cuota">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <input type="text" id="contrato_intervalo_fecha_vence" class="datetimepicker form-control" disabled placeholder="Intervalo Fecha Vence">
        </div>
    </div>
    </div>

    <!-- ================= SERVICIO Y CONTRATO ================= -->
    <div class="section-box">
    <div class="section-title">Servicio y Contrato</div>
    <div class="row clearfix">
        <div class="col-sm-3">
            <input type="text" id="tipo_serv_nombre" class="form-control" disabled onkeyup="buscarTipoServicio();" placeholder="Tipo de Servicio">
            <input type="hidden" id="tipo_servicio_id">
            <div id="listaTipoServ" style="display:none;"></div>
        </div>
        <div class="col-sm-4">
            <input type="text" id="tip_con_nombre" class="form-control" disabled onkeyup="buscarTipoContrato();" placeholder="Tipo Contrato">
            <input type="hidden" id="tipo_contrato_id">
            <div id="listaTipoCont" style="display:none;"></div>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_objeto" class="form-control" rows="2" disabled placeholder="Objeto"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_alcance" class="form-control" rows="2" disabled placeholder="Alcance"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_responsabilidad" class="form-control" rows="2" disabled placeholder="Responsabilidad"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_garantia" class="form-control" rows="2" disabled placeholder="Garantía"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_limitacion" class="form-control" rows="2" disabled placeholder="Limitación"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_fuerza_mayor" class="form-control" rows="2" disabled placeholder="Fuerza Mayor"></textarea>
        </div>
        <div class="col-sm-11" style="margin-top:10px;">
            <textarea id="contrato_jurisdiccion" class="form-control" rows="2" disabled placeholder="Jurisdicción"></textarea>
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
        <div class="col-sm-2">
            <input type="text" id="cli_apellido" class="form-control" disabled placeholder="Apellido">
        </div>
        <div class="col-sm-2">
            <input type="text" id="cli_ruc" class="form-control" disabled placeholder="RUC">
        </div>
        <div class="col-sm-2">
            <input type="text" id="cli_telefono" class="form-control" disabled placeholder="Teléfono">
        </div>
        <div class="col-sm-3">
            <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
        </div>
        <div class="col-sm-4" style="margin-top:10px;">
            <input type="text" id="contrato_representante" class="form-control" disabled placeholder="Representante firmante del cliente">
        </div>
    </div>
    </div>

    <!-- ================= ORDEN DE SERVICIO VINCULADA ================= -->
    <div class="section-box">
    <div class="section-title">Orden de Servicio Vinculada (opcional)</div>
    <div class="row clearfix">
        <div class="col-sm-5">
            <input type="text" id="orden_buscar" class="form-control" disabled placeholder="Buscar orden por observación o cliente..." onkeyup="buscarOrdenParaContrato();">
        </div>
        <div class="col-sm-5" style="margin-top:0px;">
            <input type="text" id="orden_texto" class="form-control" disabled readonly placeholder="Orden vinculada">
        </div>
        <div class="col-sm-11" id="lista_orden"></div>
    </div>
    </div>

    <!-- ================= OBSERVACIONES ================= -->
    <div class="section-box">
    <div class="section-title">Observaciones</div>
    <div class="row clearfix">
        <div class="col-sm-6">
            <input type="text" id="contrato_observacion" class="form-control" disabled placeholder="Observaciones">
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
        <button type="button" id="btnImprimir" class="btn btn-info" onclick="imprimirContrato();" disabled>
            <i class="material-icons">print</i> Imprimir
        </button>
        <button type="button" id="btnRenovar" class="btn btn-default" onclick="renovarContrato();" disabled>
            <i class="material-icons">autorenew</i> Renovar
        </button>
    </div>

</div>
</div>

<!-- DETALLE -->
<div class="card card-industrial" id="detalle" style="display:none">
<div class="header"><h2><i class="material-icons">playlist_add</i> Detalles del Contrato de Servicio</h2></div>
<div class="body">
    <div class="row clearfix" id="formDetalles">
        <input type="hidden" id="txtOperacionDetalle" value="0">

        <div class="col-sm-1">
            <input type="text" id="item_id" class="form-control" disabled placeholder="Código">
        </div>
        <div class="col-sm-5">
            <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
            <div id="listaProductos" style="display:none;"></div>
        </div>
        <div class="col-sm-2">
            <input type="text" id="tip_imp_nom" class="form-control" disabled placeholder="Tipo impuesto">
            <input type="hidden" id="tipo_impuesto_id">
        </div>
        <div class="col-sm-2">
            <input type="text" id="contrato_serv_det_cantidad_stock" class="form-control" disabled placeholder="Cant. Disponible">
        </div>
        <div class="col-sm-2">
            <input type="text" id="contrato_serv_det_cantidad" class="form-control" disabled placeholder="Cantidad">
        </div>
        <div class="col-sm-2">
            <input type="text" id="contrato_serv_det_costo" class="form-control" disabled placeholder="Costo">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <div class="icon-button-demo">
                <button type="button" id="btnAgregarDetalle" class="btn btn-success waves-effect" onclick="agregarDetalle();"><i class="material-icons">add</i></button>
                <button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();"><i class="material-icons">mode_edit</i></button>
                <button type="button" id="btnEliminarDetalle" class="btn btn-danger waves-effect" onclick="eliminarDetalle();"><i class="material-icons">clear</i></button>
                <button type="button" id="btnGrabarDetalle" class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();"><i class="material-icons">save</i></button>
                <button type="button" id="btnCancelarDetalle" class="btn btn-warning waves-effect" style="display:none;" onclick="cancelarDetalle();"><i class="material-icons">close</i></button>
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
                <th colspan="7" class="text-right">IVA 10%</th>
                <th class="text-right" id="txtIva10">0</th>
            </tr>
            <tr>
                <th colspan="7" class="text-right">IVA 5%</th>
                <th class="text-right" id="txtIva5">0</th>
            </tr>
            <tr>
                <th colspan="7" class="text-right">Total IVA</th>
                <th class="text-right" id="txtTotalConImpuesto">0</th>
            </tr>
            <tr>
                <th colspan="7" class="text-right" style="font-weight:bold;">Total Comprobante</th>
                <th class="text-right" id="txtTotalGral" style="font-weight:bold;">0</th>
            </tr>
        </tfoot>
    </table>
    </div>
</div>
</div>

<!-- REGISTROS -->
<div class="card card-industrial" id="registros">
<div class="header"><h2><i class="material-icons">list</i> Registros del Contrato de Servicio</h2></div>
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
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js?v=2"></script>

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
