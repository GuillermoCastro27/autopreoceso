<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI RECLAMO DE CLIENTES</title>
    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

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
                <i class="material-icons">report_problem</i>
                Registrar Reclamo de Clientes
                <small>CRUD de Reclamo de Clientes y su detalle</small>
            </h2>
        </div>

        <div class="body">

            <input type="hidden" value="0" id="txtOperacion">
            <input type="hidden" id="funcionario_id">
            <input type="hidden" value="PENDIENTE" id="rec_cli_cab_estado">

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
                        <input type="text" id="rec_cli_cab_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                    </div>
                    <div class="col-sm-3">
                        <label class="field-label">Fecha Inicio</label>
                        <input type="text" id="rec_cli_cab_fecha_inicio" class="datetimepicker form-control" disabled placeholder="Fecha Inicio">
                    </div>
                </div>
                <div class="row clearfix" style="margin-top:10px;">
                    <div class="col-sm-3">
                        <label class="field-label">Fecha Fin</label>
                        <input type="text" id="rec_cli_cab_fecha_fin" class="datetimepicker form-control" disabled placeholder="Fecha Fin">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Prioridad</label>
                        <select id="rec_cli_cab_prioridad" class="form-control" disabled>
                            <option value="ALTA">Alta</option>
                            <option value="MEDIA">Media</option>
                            <option value="BAJA">Baja</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <label class="field-label">Observaciones</label>
                        <input type="text" id="rec_cli_cab_observacion" class="form-control" disabled placeholder="Observaciones">
                    </div>
                </div>
            </div>

            <!-- ================= VENTA VINCULADA ================= -->
            <div class="section-box">
                <div class="section-title">Venta / Recibo Vinculado <small style="font-weight:normal;">(opcional)</small></div>
                <div class="row clearfix">
                    <div class="col-sm-2">
                        <label class="field-label">Buscar Venta</label>
                        <input type="text" id="nro_venta_display" class="form-control" disabled onkeyup="buscarVenta();" placeholder="Buscar N° venta o cliente">
                        <input type="hidden" id="venta_cab_id">
                        <div id="listaVentas" style="display:none;"></div>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Fecha Venta</label>
                        <input type="text" id="venta_fecha_display" class="form-control" disabled placeholder="Fecha venta">
                    </div>
                    <div class="col-sm-3">
                        <label class="field-label">Encargado</label>
                        <input type="text" id="encargado" class="form-control" disabled placeholder="Encargado">
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
                </div>
                <div class="row clearfix" style="margin-top:10px;">
                    <div class="col-sm-3">
                        <label class="field-label">Correo</label>
                        <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
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
                <button type="button" id="btnProcesar" class="btn btn-info" onclick="procesar();" disabled>
                    <i class="material-icons">sync</i> Procesar
                </button>
                <button type="button" id="btnResolver" class="btn btn-success" onclick="resolver();" disabled>
                    <i class="material-icons">check_circle</i> Resolver
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

    <!-- DETALLE -->
    <div class="card card-industrial" id="detalle" style="display:none">
        <div class="header">
            <h2><i class="material-icons">playlist_add</i> Detalles del Reclamo de Clientes</h2>
        </div>
        <div class="body">

            <!-- FORMULARIO DETALLE -->
            <div id="formDetalles" style="display:none;">
                <input type="hidden" value="0" id="txtOperacionDetalle">
                <input type="hidden" id="original_item_id">

                <div class="row clearfix">
                    <div class="col-sm-1">
                        <input type="text" id="item_id" class="form-control" disabled placeholder="Cód.">
                    </div>
                    <div class="col-sm-4">
                        <input type="text" id="item_descripcion" class="form-control" disabled onkeyup="buscarProductos();" placeholder="Producto">
                        <div id="listaProductos" style="display:none;"></div>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tipo_imp_nom" class="form-control" disabled placeholder="Tipo impuesto">
                        <input type="hidden" id="tipo_impuesto_id">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="rec_cli_det_cantidad_stock" class="form-control" disabled placeholder="Cant. Disponible">
                    </div>
                    <div class="col-sm-1">
                        <input type="text" id="rec_cli_det_cantidad" class="form-control" disabled placeholder="Cantidad">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="rec_cli_det_costo" class="form-control" disabled placeholder="Precio">
                    </div>
                </div>

                <div class="row clearfix" style="margin-top:8px;">
                    <div class="col-sm-2">
                        <input type="text" id="subtotal" class="form-control" disabled placeholder="Subtotal">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="iva" class="form-control" disabled placeholder="IVA">
                    </div>
                    <div class="col-sm-3">
                        <select id="marca_det_mm" class="form-control" onchange="mmCambioMarca(this.value);">
                            <option value="">-- Marca --</option>
                        </select>
                    </div>
                    <div class="col-sm-3">
                        <select id="modelo_det_mm" class="form-control">
                            <option value="">-- Modelo --</option>
                        </select>
                    </div>
                    <div class="col-sm-2" style="margin-top:5px;">
                        <button type="button" id="btnAgregarDetalle" class="btn btn-success btn-sm waves-effect" onclick="agregarDetalle();">
                            <i class="material-icons">add</i>
                        </button>
                        <button type="button" id="btnEditarDetalle" class="btn btn-warning btn-sm waves-effect" onclick="editarDetalle();">
                            <i class="material-icons">mode_edit</i>
                        </button>
                        <button type="button" id="btnEliminarDetalle" class="btn btn-danger btn-sm waves-effect" onclick="eliminarDetalle();">
                            <i class="material-icons">clear</i>
                        </button>
                        <button type="button" id="btnGrabarDetalle" class="btn btn-default btn-sm waves-effect" style="display:none;" onclick="grabarDetalle();">
                            <i class="material-icons">save</i>
                        </button>
                        <button type="button" id="btnCancelarDetalle" class="btn btn-warning btn-sm waves-effect" style="display:none;" onclick="cancelarDetalle();">
                            <i class="material-icons">undo</i>
                        </button>
                    </div>
                </div>
            </div><!-- fin formDetalles -->

            <div class="table-responsive" style="margin-top:15px;">
                <table class="table table-bordered table-striped table-hover dataTable">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th class="text-right">Cantidad</th>
                            <th class="text-right">Cant. Disponible</th>
                            <th class="text-right">Precio</th>
                            <th>Tipo impuesto</th>
                            <th class="text-right">Sub Total</th>
                            <th class="text-right">IVA</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                        </tr>
                    </thead>
                    <tbody id="tableDetalle"></tbody>
                    <tfoot>
                        <tr>
                            <th colspan="6" class="text-right">IVA 10%</th>
                            <th class="text-right"><span id="txtIva10">0,00</span></th>
                            <th colspan="3"></th>
                        </tr>
                        <tr>
                            <th colspan="6" class="text-right">IVA 5%</th>
                            <th class="text-right"><span id="txtIva5">0,00</span></th>
                            <th colspan="3"></th>
                        </tr>
                        <tr>
                            <th colspan="6" class="text-right">Total IVA</th>
                            <th class="text-right"><span id="txtTotalConImpuesto">0,00</span></th>
                            <th colspan="3"></th>
                        </tr>
                        <tr>
                            <th colspan="6" class="text-right" style="font-weight:bold;"><strong>Total Comprobante:</strong></th>
                            <th class="text-right"><span id="txtTotalGral">0,00</span></th>
                            <th colspan="3"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- REGISTROS -->
    <div class="card card-industrial" id="registros">
        <div class="header">
            <h2><i class="material-icons">list</i> Registros de Reclamo de Clientes</h2>
        </div>
        <div class="body">
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Empresa</th>
                            <th>Sucursal</th>
                            <th>Fecha Reclamo</th>
                            <th>Cliente</th>
                            <th>Apellido</th>
                            <th>RUC</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th>Encargado</th>
                            <th>N° Venta</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                    <tfoot>
                        <tr>
                            <th>Código</th>
                            <th>Empresa</th>
                            <th>Sucursal</th>
                            <th>Fecha Reclamo</th>
                            <th>Cliente</th>
                            <th>Apellido</th>
                            <th>RUC</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th>Encargado</th>
                            <th>N° Venta</th>
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
    <script src="../../js/marcaModelo.js?v=1"></script>
    <script src="metodos.js?v=3"></script>
</body>

</html>

