﻿<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PRESUPUESTO</title>
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
                        <h2>Gestionar Presupuestos de Compras <small>CRUD de Presupuestos y su detalle</small> </h2>
                    </div>
                    <div class="body">
                        <div class="row clearfix">
                            <input type="hidden" value="0" id="txtOperacion"/>
                            <input type="hidden" value="1" id="user_id"/>
                            <input type="hidden" value="PENDIENTE" id="comp_estado"/>
                            
                            <!-- CAMPO PARA CODIGO CON 3 COLUMNAS -->
                            <div class="col-sm-1">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="id" class="form-control" disabled>
                                        <label class="form-label">Código</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA FECHA DE VENCIMIENTO CON 5 COLUMNAS -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="comp_intervalo_fecha_vence" class="datetimepicker form-control" disabled>
                                        <label class="form-label">Vencimiento</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA FECHA CON 5 COLUMNAS -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="comp_fecha" class="datetimepicker form-control" disabled>
                                        <label class="form-label">Fecha</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA CANTIDAD DE CUOTAS CON 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="comp_cant_cuota" class="form-control" disabled>
                                        <label class="form-label">Cantidad de Cuota</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA CONDICION DE PAGO CON 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <select id="condicion_pago" class="form-control" disabled>
                                            <option value="">Seleccione</option>
                                            <option value="al contado">Al Contado</option>
                                            <option value="a crédito">A Crédito</option>
                                        </select>
                                        <label class="form-label">Condición de Pago</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="orden_compra" class="form-control" disabled onkeyup="buscarPresupuesto();">
                                            <label class="form-label">Orden Compra</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la ciudad -->
                                        <input type="hidden" id="orden_compra_cab_id" name="orden_compra_cab_id" value="0">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaOrdenCompra" style="display:none;"></div>
                                    </div>
                                </div>

                            <!-- Resto de campos -->
                            
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>EDITAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>ANULAR</button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>CONFIRMAR</button>
                                <button type="button" id="btnRechazar" class="btn btn-danger waves-effect" onclick="rechazar();" disabled>RECHAZAR</button>
                                <button type="button" id="btnAprobar" class="btn btn-success waves-effect" onclick="aprobar();" disabled>APROBAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" id="detalle" style="display:none">
                    <div class="header">
                        <h2>Detalles del Presupuestos</h2>
                    </div>
                    <div class="body">
                        <div class="row clearfix" id="formDetalles">
                            <input type="hidden" value="0" id="txtOperacionDetalle"/>
                            <!-- CAMPO PARA CODIGO CON 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="item_id" class="form-control" disabled>
                                        <label class="form-label">Código</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA BUSCAR PRODUCTOS CON 4 COLUMNAS -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="item_decripcion" class="form-control" disabled onkeyup="buscarProductos();">
                                        <label class="form-label">Producto</label>
                                    </div>
                                    <div id="listaProductos" style="display:none;"></div>
                                </div>
                            </div>

                            <!-- CAMPO PARA CANTIDAD 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="det_cantidad" class="form-control" disabled>
                                        <label class="form-label">Cantidad</label>
                                    </div>
                                </div>
                            </div>

                            <!-- CAMPO PARA COSTO CON 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="det_costo" class="form-control" disabled>
                                        <label class="form-label">Costo</label>
                                    </div>
                                </div>
                            </div>
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
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover dataTable ">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Costo</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody id="tableDetalle">
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="4">Total General</th>
                                        <th class="text-right" id="txtTotalGral">0</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <h2>Listado de Presupuestos</h2>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover dataTable" id="tablePresupuesto">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Vencimiento</th>
                                        <th>Observaciones</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Usuario</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablePresupuestos">
                                    
                                </tbody>
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

    <!-- Ruta Js (la url del backend o del api rest) -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js"></script>
</body>

</html>
