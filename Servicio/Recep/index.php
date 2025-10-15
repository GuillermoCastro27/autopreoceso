﻿<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI RECEPCION DE VEHICULOS</title>
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
</head>

<body class="theme-red">

    <?php require_once('../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Registrar Recepcion de Vehiculos <small>CRUD de Recepcion de Vehiculos y su detalle</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="PENDIENTE" id="recep_cab_estado"/>
                                
                                <!-- CÓDIGO -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- EMPRESA -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="emp_razon_social" class="form-control" disabled>
                                            <label class="form-label">Empresa</label>
                                        </div>
                                        <input type="hidden" id="empresa_id" name="empresa_id">
                                        <div id="listaEmpresa" style="display:none;"></div>
                                    </div>
                                </div>
                                
                                <!-- SUCURSAL -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();">
                                            <label class="form-label">Sucursal</label>
                                        </div>
                                        <input type="hidden" id="sucursal_id" name="sucursal_id">
                                        <div id="listaSucursal" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- FECHA -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_fecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- FECHA ESTIMADA -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_fecha_estimada" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha Estimada</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="solicitud" class="form-control" disabled onkeyup="buscarSolicitud();">
                                            <label class="form-label">Solicitud</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la ciudad -->
                                        <input type="hidden" id="solicitudes_cab_id" name="solicitudes_cab_id" value="0">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaSolicitud" style="display:none;"></div>
                                    </div>
                                </div>
                                
                                <!-- OBSERVACIONES -->
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_observaciones" class="form-control" disabled>
                                            <label class="form-label">Observaciones</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- PRIORIDAD -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_prioridad" class="form-control" disabled>
                                            <label class="form-label">Prioridad</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_kilometraje" class="form-control" disabled>
                                            <label class="form-label">Kilometraje</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_cab_nivel_combustible" class="form-control" disabled>
                                            <label class="form-label">Combustible</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- TIPO DE SERVICIO -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tipo_serv_nombre" class="form-control" disabled onkeyup="buscarTipoServicio();">
                                            <label class="form-label">Tipo de Servicio</label>
                                        </div>
                                        <input type="hidden" id="tipo_servicio_id" name="tipo_servicio_id">
                                        <div id="listaTipoServ" style="display:none;"></div>
                                    </div>
                                </div>

                                <!-- CLIENTE -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarCliente();">
                                            <label class="form-label">Cliente</label>
                                        </div>
                                        <input type="hidden" id="clientes_id" name="clientes_id">
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

                                <!-- RUC -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_ruc" class="form-control" disabled>
                                            <label class="form-label">RUC</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- TELEFONO -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_telefono" class="form-control" disabled>
                                            <label class="form-label">Telefono</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- DIRECCION -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_direccion" class="form-control" disabled>
                                            <label class="form-label">Direccion</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CORREO -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_correo" class="form-control" disabled>
                                            <label class="form-label">Correo</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- BOTONES -->
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();"disabled>ANULAR</button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>CONFIRMAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button> 
                            </div>
                        </div>
                    </div>

                    <!-- DETALLE -->
                    <div class="card" id="detalle" style="display:none">
                        <div class="header">
                            <h2>Detalles de la Recepcion</h2>
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
                                            <input type="text" id="recep_det_cantidad_stock" class="form-control" disabled>
                                            <label class="form-label">Cantidad Disponible</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CANTIDAD -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_det_cantidad" class="form-control" disabled>
                                            <label class="form-label">Cantidad</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- COSTO -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="recep_det_costo" class="form-control" disabled>
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

                            <!-- TABLA DETALLE -->
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable ">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Cantidad Disponible</th>
                                            <th>Costo</th>
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
                    <div class="card" id="registros">
                        <div class="header">
                            <h2>Registros de Recepcion de Vehiculos</h2>
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
                                            <th>Fecha Estimada</th>
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
                                            <th>Fecha Estimada</th>
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
