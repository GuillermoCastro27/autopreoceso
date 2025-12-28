<!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>GUI PRESUPUESTO DE SERVICIO</title>

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
            Registrar Presupuesto de Servicio
            <small>CRUD de Presupuesto de Servicio y su detalle</small>
        </h2>
    </div>

    <div class="body">

    <!-- ================= DATOS GENERALES ================= -->
    <div class="section-box">
    <div class="section-title">Datos Generales</div>

    <div class="row clearfix">

    <input type="hidden" value="0" id="txtOperacion"/>
    <input type="hidden" value="1" id="user_id"/>
    <input type="hidden" value="PENDIENTE" id="pres_serv_cab_estado"/>

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
                <input type="text" id="pres_serv_cab_fecha" class="datetimepicker form-control" disabled>
                <label class="form-label">Fecha</label>
            </div>
        </div>
    </div>

    <div class="col-sm-3">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="pres_serv_cab_fecha_vence" class="datetimepicker form-control" disabled>
                <label class="form-label">Fecha Vence</label>
            </div>
        </div>
    </div>

    </div>
    </div>

    <!-- ================= DIAGNÓSTICO ================= -->
    <div class="section-box">
    <div class="section-title">Diagnóstico</div>
    <div class="row clearfix">

    <div class="col-sm-6">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="diagnostico" class="form-control" disabled onkeyup="buscarDiagnostico();">
                <label class="form-label">Diagnóstico</label>
            </div>
            <input type="hidden" id="diagnostico_cab_id">
            <div id="listaDiagnostico" style="display:none;"></div>
        </div>
    </div>

    <div class="col-sm-3">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="tipo_diag_nombre" class="form-control" disabled>
                <label class="form-label">Tipo Diagnóstico</label>
            </div>
        </div>
    </div>

    </div>
    </div>

    <!-- ================= PROMOCIONES / DESCUENTOS / OBS ================= -->
    <div class="section-box">
    <div class="section-title">Promociones y Observaciones</div>
    <div class="row clearfix">

    <div class="col-sm-6">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="prom_cab_nombre" class="form-control" disabled onkeyup="buscarPromociones();">
                <label class="form-label">Promociones</label>
            </div>
            <input type="hidden" id="promociones_cab_id">
            <div id="listaPromociones" style="display:none;"></div>
        </div>
    </div>

    <div class="col-sm-6">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="desc_cab_nombre" class="form-control" disabled onkeyup="buscarDescuentos();">
                <label class="form-label">Descuentos</label>
            </div>
            <input type="hidden" id="descuentos_cab_id">
            <div id="listaDescuentos" style="display:none;"></div>
        </div>
    </div>

    <div class="col-sm-6">
        <div class="form-group form-float">
            <div class="form-line">
                <input type="text" id="pres_serv_cab_observaciones" class="form-control" disabled>
                <label class="form-label">Observaciones</label>
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
                <label class="form-label">Combustible</label>
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

    <input type="hidden" id="tipo_prom_modo">
    <input type="hidden" id="tipo_prom_valor">
    <input type="hidden" id="desc_cab_porcentaje">
    <input type="hidden" id="tip_serv_precio">

    </div>
    </div>

                            <!-- BOTONES (MISMO HTML, SOLO CLASE EXTRA PARA ORDENAR) -->
                            <div class="button-demo btn-toolbar-left">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">
                                    <i class="material-icons">add</i> AGREGAR
                                </button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>
                                    <i class="material-icons">edit</i> MODIFICAR
                                </button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();"disabled>
                                    <i class="material-icons">delete</i> ANULAR
                                </button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>
                                    <i class="material-icons">check_circle</i> CONFIRMAR
                                </button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">
                                    <i class="material-icons">save</i> GRABAR
                                </button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                                    <i class="material-icons">close</i> CANCELAR
                                </button>

                                <button type="button" id="btnBuscarPromociones" class="btn btn-info waves-effect" disabled onclick="buscarPromociones();">
                                    <i class="material-icons">local_offer</i> BUSCAR PROMOCIONES
                                </button>
                                <button type="button" id="btnBuscarDescuentos" class="btn btn-success waves-effect" disabled onclick="buscarDescuentos();">
                                    <i class="material-icons">percent</i> BUSCAR DESCUENTOS
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- DETALLE (MISMO CONTENIDO, SOLO CARD INDUSTRIAL) -->
                    <div class="card card-industrial" id="detalle" style="display:none">
                        <div class="header">
                            <h2><i class="material-icons" style="vertical-align: middle;">playlist_add</i> Detalles de la PresupuestoServ</h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix" id="formDetalles">
                                <input type="hidden" value="0" id="txtOperacionDetalle"/>

                                <!-- CODIGO ITEM -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="item_id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- PRODUCTO -->
                                <div class="col-sm-5">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();">
                                            <label class="form-label">Producto</label>
                                        </div>
                                        <div id="listaProductos" style="display:none;"></div>
                                    </div>
                                </div>

                                <!-- TIPO IMPUESTO -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_imp_nom" class="form-control" disabled>
                                            <label class="form-label">Tipo impuesto</label>
                                        </div>
                                        <input type="hidden" id="tipo_impuesto_id" name="tipo_impuesto_id">
                                    </div>
                                </div>

                                <!-- CANTIDAD DISPONIBLE -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="pres_serv_det_cantidad_stock" class="form-control" disabled>
                                            <label class="form-label">Cantidad Disponible</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CANTIDAD -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="pres_serv_det_cantidad" class="form-control" disabled>
                                            <label class="form-label">Cantidad</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- COSTO -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="pres_serv_det_costo" class="form-control" disabled>
                                            <label class="form-label">Costo</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- BOTONES DETALLE -->
                                <div class="col-sm-3">
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

                            <!-- TABLA DETALLE (IGUAL, SIN TOCAR) -->
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
                                            <th colspan="14" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="14" class="text-right">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- REGISTROS (IGUAL, SIN TOCAR) -->
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2><i class="material-icons" style="vertical-align: middle;">list</i> Registros de Presupuesto Servicio</h2>
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

    <!-- Jquery Core Js -->
    <script src="../../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../../plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="../../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Jquery DataTable Plugin Js -->
    <script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

    <!-- Autosize Plugin Js -->
    <script src="../../plugins/autosize/autosize.js"></script>

    <!-- Moment Plugin Js -->
    <script src="../../plugins/momentjs/moment.js"></script>

    <!-- Bootstrap Material Datetime Picker Plugin Js -->
    <script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

    <!-- Custom Js -->
    <script src="../../js/admin.js"></script>

    <!-- Demo Js -->
    <script src="../../js/demo.js"></script>

    <!-- Ruta Js -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js"></script>
</body>

</html>
