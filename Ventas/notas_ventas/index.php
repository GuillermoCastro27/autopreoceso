<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI NOTAS DE VENTAS</title>
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
            border-left: 6px solid #00b894;
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
                    
                    <!-- ================= GESTIONAR NOTAS DE VENTAS ================= -->
<div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">description</i>
            Gestionar Notas de Ventas
            <small>CRUD de Notas de Ventas y su detalle</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id" value="1">
        <input type="hidden" id="nota_vent_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <!-- CÓDIGO -->
                <div class="col-sm-1">
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <!-- EMPRESA -->
                <div class="col-sm-2">
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <!-- SUCURSAL -->
                <div class="col-sm-2">
                    <input type="text"
                           id="suc_razon_social"
                           class="form-control"
                           disabled
                           onkeyup="buscarSucursal();"
                           placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- CONDICIÓN DE PAGO -->
                <div class="col-sm-2">
                    <input type="text"
                           id="nota_vene_condicion_pago"
                           class="form-control"
                           disabled
                           placeholder="Condición de Pago">
                </div>

                <!-- VENCIMIENTO -->
                <div class="col-sm-3">
                    <input type="text"
                           id="vencimiento"
                           class="datetimepicker form-control"
                           disabled
                           placeholder="Fecha Vencimiento">
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <input type="text"
                           id="nota_vent_fecha"
                           class="datetimepicker form-control"
                           readonly
                           placeholder="Fecha">
                </div>

            </div>
        </div>

        <!-- ================= DATOS DE LA NOTA ================= -->
        <div class="section-box">
            <div class="section-title">Datos de la Nota</div>

            <div class="row clearfix">

                <!-- CUOTAS -->
                <div class="col-sm-1">
                    <input type="text"
                           id="cuotas"
                           class="form-control"
                           disabled
                           placeholder="Cuota">
                </div>

                <!-- TIPO NOTA -->
                <div class="col-sm-2">
                    <select id="nota_vent_tipo" class="form-control" disabled>
                        <option>Crédito</option>
                        <option>Débito</option>
                    </select>
                </div>

                <!-- OBSERVACIONES -->
                <div class="col-sm-4">
                    <input type="text"
                           id="nota_vent_observaciones"
                           class="form-control"
                           disabled
                           placeholder="Observaciones">
                </div>

            </div>
        </div>

        <!-- ================= VENTA ================= -->
        <div class="section-box">
            <div class="section-title">Venta Asociada</div>

            <div class="row clearfix">

                <div class="col-sm-6">
                    <input type="text"
                           id="venta"
                           class="form-control"
                           disabled
                           onkeyup="buscarVentas();"
                           placeholder="Venta">
                    <input type="hidden" id="ventas_cab_id" value="0">
                    <div id="listaVentas" style="display:none;"></div>
                </div>

            </div>
        </div>

        <!-- ================= CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Cliente</div>

            <div class="row clearfix">

                <div class="col-sm-2">
                    <input type="text"
                           id="cli_nombre"
                           class="form-control"
                           disabled
                           onkeyup="buscarCliente();"
                           placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                    <div id="listaClientes" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text"
                           id="cli_apellido"
                           class="form-control"
                           disabled
                           placeholder="Apellido">
                </div>

                <div class="col-sm-3">
                    <input type="text"
                           id="cli_ruc"
                           class="form-control"
                           disabled
                           placeholder="RUC">
                </div>

                <div class="col-sm-3">
                    <input type="text"
                           id="cli_direccion"
                           class="form-control"
                           disabled
                           placeholder="Dirección">
                </div>

                <div class="col-sm-3">
                    <input type="text"
                           id="cli_telefono"
                           class="form-control"
                           disabled
                           placeholder="Teléfono">
                </div>

                <div class="col-sm-3">
                    <input type="text"
                           id="cli_correo"
                           class="form-control"
                           disabled
                           placeholder="Correo">
                </div>

            </div>
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left text-center">

            <button id="btnAgregar" class="btn btn-success" onclick="agregar();">
                <i class="material-icons">add</i> Agregar
            </button>

            <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>

            <button id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Anular
            </button>

            <button id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled>
                <i class="material-icons">check_circle</i> Confirmar
            </button>

            <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>

            <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>

        </div>

    </div>
</div>


                    <div class="card card-industrial" id="detalle" style="display:none">
                        <div class="header">
                            <h2>Detalles de Notas de Ventas</h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix" id="formDetalles">
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
                                        <input type="text" id="notas_vent_det_cantidad" class="form-control" disabled>
                                        <label class="form-label">Cantidad</label>
                                    </div>
                                </div>
                            </div>
                            <!-- CAMPO PARA COSTO CON 2 COLUMNAS -->
                            <div class="col-sm-2">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="notas_vent_det_precio" class="form-control" disabled>
                                        <label class="form-label">Precio</label>
                                    </div>
                                </div>
                            </div>
                            <!-- BOTONES -->
                            <div class="col-sm-2">
                                <div class="icon-button-demo">
                                    <button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button type="button" id="btnGrabarDetalle" class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();">
                                        <i class="material-icons">save</i>
                                    </button>
                                </div>
                            </div>
                        </div> <!-- fin de row -->

                        <!-- Campos ocultos adicionales -->
                        <input type="hidden" value="0" id="txtOperacionDetalle"/>
                        <input type="hidden" id="tipo_impuesto_id"/>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Tipo impuesto</th>
                                            <th>Sub Total</th>
                                            <th>IVA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle">
                                        <!-- Aquí se llenarán los detalles de los productos -->
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="6" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="6" class="text-right">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Notas de Ventas</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Intervalo de fecha Vencimiento</th>
                                            <th>Fecha</th>
                                            <th>Ventas</th>
                                            <th>Encargado</th>
                                            <th>Cantidad de cuota</th>
                                            <th>Tipo de Nota</th>
                                            <th>Observaciones</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Intervalo de fecha Vencimiento</th>
                                            <th>Fecha</th>
                                            <th>Ventas</th>
                                            <th>Encargado</th>
                                            <th>Cantidad de cuota</th>
                                            <th>Tipo de Nota</th>
                                            <th>Observaciones</th>
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

    <!-- Ruta Js (la url del backend o del api rest) -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js"></script>
</body>

</html>