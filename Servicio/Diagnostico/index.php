<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DIAGNOSTICO</title>
    <!-- Favicon-->
    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Bootstrap Material Datetime Picker Css -->
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

    <!-- Sweetalert Css -->
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- JQuery DataTable Css -->
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="../../css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
    <style>
body { background:#f1f2f6; }

.card-industrial {
    border-left: 6px solid #0984e3;
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
                    
                    <!-- ================= REGISTRAR DIAGNÓSTICO ================= -->
<div class="card card-industrial">

    <!-- ================= HEADER ================= -->
    <div class="header">
        <h2>
            <i class="material-icons">build</i>
            Registrar Diagnóstico
            <small>CRUD de Diagnóstico y su detalle</small>
        </h2>
    </div>

    <!-- ================= BODY ================= -->
    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id">
        <input type="hidden" id="diag_cab_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <div class="col-sm-1">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <div class="col-sm-2">
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="diag_cab_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="tipo_diag_nombre" class="form-control" disabled
                           onkeyup="buscarTipoDiagnostico();" placeholder="Tipo de Diagnóstico">
                    <input type="hidden" id="tipo_diagnostico_id">
                    <div id="listaTipoDiag" style="display:none;"></div>
                </div>

            </div>
        </div>

        <!-- ================= RECEPCIÓN ================= -->
        <div class="section-box">
            <div class="section-title">Recepción</div>

            <div class="row clearfix">
                <div class="col-sm-6">
                    <input type="text" id="recepcion" class="form-control" disabled
                           onkeyup="buscarRecepcion();" placeholder="Recepción">
                    <input type="hidden" id="recep_cab_id" value="0">
                    <div id="listaRecepcion" style="display:none;"></div>
                </div>
            </div>
        </div>

        <!-- ================= DATOS DEL DIAGNÓSTICO ================= -->
        <div class="section-box">
            <div class="section-title">Datos del Diagnóstico</div>

            <div class="row clearfix">
                <div class="col-sm-6">
                    <input type="text" id="diag_cab_observaciones" class="form-control" disabled
                           placeholder="Observaciones">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="diag_cab_prioridad" class="form-control" disabled
                           placeholder="Prioridad">
                </div>
            </div>
        </div>

        <!-- ================= DATOS DEL VEHÍCULO ================= -->
        <div class="section-box">
            <div class="section-title">Datos del Vehículo</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <input type="text" id="diag_cab_kilometraje" class="form-control" disabled placeholder="Kilometraje">
                </div>

                <div class="col-sm-2">
                    <input type="text" id="diag_cab_nivel_combustible" class="form-control" disabled
                           placeholder="Nivel de Combustible">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="tipo_serv_nombre" class="form-control" disabled
                           onkeyup="buscarTipoServicio();" placeholder="Tipo de Servicio">
                    <input type="hidden" id="tipo_servicio_id">
                    <div id="listaTipoServ" style="display:none;"></div>
                </div>
            </div>
        </div>

        <!-- ================= DATOS DEL CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Datos del Cliente</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <input type="text" id="cli_nombre" class="form-control" disabled
                           onkeyup="buscarCliente();" placeholder="Cliente">
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

                <div class="col-sm-3">
                    <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
                </div>
            </div>
        </div>

        <!-- ================= INFORMACIÓN DEL VEHÍCULO ================= -->
        <div class="section-box">
            <div class="section-title">Información del Vehículo</div>

            <div class="row clearfix">
                <div class="col-sm-3">
                    <input type="text" id="tip_veh_nombre" class="form-control" disabled placeholder="Tipo de Vehículo">
                    <input type="hidden" id="tipo_vehiculo_id">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="tip_veh_capacidad" class="form-control" disabled placeholder="Capacidad">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="tip_veh_combustible" class="form-control" disabled
                           placeholder="Tipo Combustible">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="tip_veh_categoria" class="form-control" disabled placeholder="Categoría">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="marc_nom" class="form-control" disabled placeholder="Marca">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="modelo_nom" class="form-control" disabled placeholder="Modelo">
                </div>
            </div>
        </div>

        <!-- ================= BOTONERA ================= -->
        <div class="section-box text-center">

            <button id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">
                AGREGAR
            </button>

            <button id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>
                MODIFICAR
            </button>

            <button id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>
                ANULAR
            </button>

            <button id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>
                CONFIRMAR
            </button>

            <button id="btnGrabar" class="btn btn-default waves-effect"
                    onclick="confirmarOperacion();" disabled>
                GRABAR
            </button>

            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                CANCELAR
            </button>

        </div>

    </div> <!-- FIN BODY -->

</div> <!-- FIN CARD -->


                    <!-- DETALLE -->
                    <div class="card card-industrial" id="detalle" style="display:none">
                        <div class="header">
                            <h2>Detalles del Diagnostico</h2>
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
                                            <input type="text" id="diag_det_cantidad_stock" class="form-control" disabled>
                                            <label class="form-label">Cantidad Disponible</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CANTIDAD -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="diag_det_cantidad" class="form-control" disabled>
                                            <label class="form-label">Cantidad</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- COSTO -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="diag_det_costo" class="form-control" disabled>
                                            <label class="form-label">Precio</label>
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

                            <!-- TABLA DETALLE -->
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable ">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Cantidad Disponible</th>
                                            <th>Precio</th>
                                            <th>Tipo impuesto</th>
                                            <th>Sub Total</th>
                                            <th>IVA</th> <!-- Agregado para mostrar el total con impuesto -->
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="5" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th> <!-- Total sin impuestos -->
                                        </tr>
                                        <tr>
                                            <th colspan="5" class="text-right">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th> <!-- Total con impuestos -->
                                        </tr>
                                    </tfoot>    
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- REGISTROS -->
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Diagnosticos</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Encargado</th>
                                            <th>Solicitud</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Observaciones</th>
                                            <th>Prioridad</th>
                                            <th>Kilometraje</th>
                                            <th>Combustible</th> 
                                            <th>Tipo Servicio</th>
                                            <th>Cliente</th>
                                            <th>Apellido</th>
                                            <th>Ruc</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Encargado</th>
                                            <th>Solicitud</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Observaciones</th>
                                            <th>Prioridad</th>
                                            <th>Kilometraje</th>
                                            <th>Combustible</th> 
                                            <th>Tipo Servicio</th>
                                            <th>Cliente</th>
                                            <th>Apellido</th>
                                            <th>Ruc</th>
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