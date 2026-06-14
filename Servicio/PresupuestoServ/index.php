<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PRESUPUESTO DE SERVICIO</title>

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
        Registrar Presupuesto de Servicio
        <small>CRUD de Presupuesto de Servicio y su detalle</small>
    </h2>
</div>

<div class="body">

    <input type="hidden" value="0" id="txtOperacion"/>
    <input type="hidden" id="funcionario_id">
    <input type="hidden" value="PENDIENTE" id="pres_serv_cab_estado"/>

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
            <input type="text" id="pres_serv_cab_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Fecha Vence</label>
            <input type="text" id="pres_serv_cab_fecha_vence" class="datetimepicker form-control" disabled placeholder="Fecha Vence">
        </div>
    </div>
    </div>

    <!-- ================= DIAGNÓSTICO ================= -->
    <div class="section-box">
    <div class="section-title">Diagnóstico</div>
    <div class="row clearfix">
        <div class="col-sm-6">
            <label class="field-label">Diagnóstico</label>
            <input type="text" id="diagnostico" class="form-control" disabled onkeyup="buscarDiagnostico();" placeholder="Diagnóstico">
            <input type="hidden" id="diagnostico_cab_id">
            <div id="listaDiagnostico" style="display:none;"></div>
        </div>
        <div class="col-sm-3">
            <label class="field-label">Tipo Diagnóstico</label>
            <input type="text" id="tipo_diag_nombre" class="form-control" disabled placeholder="Tipo Diagnóstico">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Tipo de Servicio</label>
            <input type="text" id="tipo_serv_nombre" class="form-control" disabled placeholder="Tipo de Servicio">
            <input type="hidden" id="tipo_servicio_id" name="tipo_servicio_id">
        </div>
    </div>
    </div>

    <!-- ================= PROMOCIONES Y OBSERVACIONES ================= -->
    <div class="section-box">
    <div class="section-title">Promociones y Observaciones</div>
    <div class="row clearfix">
        <div class="col-sm-6">
            <label class="field-label">Promociones</label>
            <input type="text" id="prom_cab_nombre" class="form-control" disabled onkeyup="buscarPromociones();" placeholder="Promociones">
            <input type="hidden" id="promociones_cab_id">
            <div id="listaPromociones" style="display:none;"></div>
        </div>
        <div class="col-sm-6">
            <label class="field-label">Descuentos</label>
            <input type="text" id="desc_cab_nombre" class="form-control" disabled onkeyup="buscarDescuentos();" placeholder="Descuentos">
            <input type="hidden" id="descuentos_cab_id">
            <div id="listaDescuentos" style="display:none;"></div>
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Tipo de Descuento</label>
            <input type="text" id="tipo_desc_nombre" class="form-control" disabled onkeyup="buscarTipoDescuento();" placeholder="Tipo de Descuento">
            <input type="hidden" id="tipo_descuento_id" name="tipo_descuento_id">
            <div id="listaTipoDesc" style="display:none;"></div>
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Tipo de Promoción</label>
            <input type="text" id="tipo_prom_nombre" class="form-control" disabled onkeyup="buscarTipoPromocion();" placeholder="Tipo de Promociones">
            <input type="hidden" id="tipo_promocion_id" name="tipo_promocion_id">
            <div id="listaTipoProm" style="display:none;"></div>
        </div>
        <div class="col-sm-6" style="margin-top:10px;">
            <label class="field-label">Observaciones</label>
            <input type="text" id="pres_serv_cab_observaciones" class="form-control" disabled placeholder="Observaciones">
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
            <label class="field-label">Combustible</label>
            <input type="text" id="tip_veh_combustible" class="form-control" disabled placeholder="Combustible">
        </div>
        <div class="col-sm-3">
            <label class="field-label">Categoría</label>
            <input type="text" id="tip_veh_categoria" class="form-control" disabled placeholder="Categoría">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Marca</label>
            <input type="text" id="marc_nom" class="form-control" disabled placeholder="Marca">
        </div>
        <div class="col-sm-3" style="margin-top:10px;">
            <label class="field-label">Modelo</label>
            <input type="text" id="modelo_nom" class="form-control" disabled placeholder="Modelo">
        </div>
    </div>
    </div>

    <input type="hidden" id="tipo_prom_modo">
    <input type="hidden" id="tipo_prom_valor">
    <input type="hidden" id="desc_cab_porcentaje">
    <input type="hidden" id="tip_serv_precio">

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
        <button type="button" id="btnBuscarPromociones" class="btn btn-info" onclick="buscarPromociones();" disabled>
            <i class="material-icons">local_offer</i> Buscar Promociones
        </button>
        <button type="button" id="btnBuscarDescuentos" class="btn btn-success" onclick="buscarDescuentos();" disabled>
            <i class="material-icons">percent</i> Buscar Descuentos
        </button>
    </div>

</div>
</div>

<!-- DETALLE -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">playlist_add</i> Detalles del Presupuesto de Servicio</h2>
    </div>
    <div class="body">
        <div class="row clearfix" id="formDetalles">
            <input type="hidden" value="0" id="txtOperacionDetalle"/>
            <input type="hidden" id="original_item_id"/>

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
                <input type="text" id="pres_serv_det_cantidad_stock" class="form-control" disabled placeholder="Cant. Disponible">
            </div>
            <div class="col-sm-2">
                <input type="text" id="pres_serv_det_cantidad" class="form-control" disabled placeholder="Cantidad">
            </div>
            <div class="col-sm-2">
                <input type="text" id="pres_serv_det_costo" class="form-control" disabled placeholder="Costo">
            </div>
            <div class="col-sm-2" style="margin-top:10px;">
                <select class="form-control" id="marca_det_mm" disabled>
                    <option value="">-- Marca --</option>
                </select>
            </div>
            <div class="col-sm-2" style="margin-top:10px;">
                <select class="form-control" id="modelo_det_mm" disabled>
                    <option value="">-- Modelo --</option>
                </select>
            </div>
            <div class="col-sm-3" style="margin-top:10px;">
                <div class="icon-button-demo">
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

        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Cantidad</th>
                        <th>Stock</th>
                        <th>Costo</th>
                        <th>Sub Total</th>
                        <th>Desc %</th>
                        <th>Modo Promoción</th>
                        <th>Promo %</th>
                        <th>Desc ₲</th>
                        <th>Promo ₲</th>
                        <th>Total Ítem</th>
                        <th>IVA</th>
                        <th>Mano de Obra</th>
                    </tr>
                </thead>
                <tbody id="tableDetalle"></tbody>
                <tfoot>
                    <tr>
                        <th colspan="14" class="text-right">IVA 10%</th>
                        <th class="text-right" id="txtIva10">0</th>
                    </tr>
                    <tr>
                        <th colspan="14" class="text-right">IVA 5%</th>
                        <th class="text-right" id="txtIva5">0</th>
                    </tr>
                    <tr>
                        <th colspan="14" class="text-right">Total IVA</th>
                        <th class="text-right" id="txtTotalConImpuesto">0</th>
                    </tr>
                    <tr>
                        <th colspan="14" class="text-right" style="font-weight:bold;">Total Comprobante</th>
                        <th class="text-right" id="txtTotalGral" style="font-weight:bold;">0</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

<!-- REGISTROS -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Presupuesto Servicio</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>RUC</th>
                        <th>Vehículo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>RUC</th>
                        <th>Vehículo</th>
                        <th>Estado</th>
                    </tr>
                </tfoot>
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
<script src="../../js/marcaModelo.js"></script>
<script src="metodos.js?v=3"></script>

</body>
</html>
