<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI TIPO VEHICULO</title>

    <!-- Favicon -->
    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

    <!-- Bootstrap -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation -->
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Sweetalert -->
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- DataTables -->
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

    <?php require_once('../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <div class="row clearfix">
                <div class="col-md-12">

                    <!-- ============================= -->
                    <!-- FORMULARIO DE TIPO VEHÍCULO -->
                    <!-- ============================= -->
                    <div class="card">
                        <div class="header">
                            <h2> Mantener datos de Tipo Vehículo 
                                <small>CRUD de Tipo Vehículo</small>
                            </h2>
                        </div>

                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" id="txtOperacion" value="0"/>

                                <!-- Código -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtCodigo" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Nombre -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_veh_nombre" class="form-control" disabled>
                                            <label class="form-label">Nombre</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Capacidad -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_veh_capacidad" class="form-control" disabled>
                                            <label class="form-label">Capacidad</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Combustible -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_veh_combustible" class="form-control" disabled>
                                            <label class="form-label">Combustible</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Categoría -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_veh_categoria" class="form-control" disabled>
                                            <label class="form-label">Categoría</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Observación -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tip_veh_observacion" class="form-control" disabled>
                                            <label class="form-label">Observación</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Marca -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="marc_nom" class="form-control" disabled onkeyup="buscarMarcas();">
                                            <label class="form-label">Marca</label>
                                        </div>

                                        <input type="hidden" id="marca_id">
                                        <div id="listaMarcas" style="display:none;"></div>
                                    </div>
                                </div>

                                <!-- Modelo -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="modelo_nom" class="form-control" disabled onkeyup="buscarModelo();">
                                            <label class="form-label">Modelo</label>
                                        </div>

                                        <input type="hidden" id="modelo_id">
                                        <div id="listaModelos" style="display:none;"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- BOTONES -->
                            <div class="button-demo">
                                <button id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
                                <button id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>ELIMINAR</button>
                                <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>GRABAR</button>
                                <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                            </div>

                        </div>
                    </div>

                    <!-- ============================= -->
                    <!-- TABLA DE REGISTROS -->
                    <!-- ============================= -->
                    <div class="card">
                        <div class="header">
                            <h2>Registros de Tipo Vehículo</h2>
                        </div>

                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Capacidad</th>
                                            <th>Combustible</th>
                                            <th>Categoría</th>
                                            <th>Observación</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableBody"></tbody>

                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Capacidad</th>
                                            <th>Combustible</th>
                                            <th>Categoría</th>
                                            <th>Observación</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                </div> <!-- END col-md-12 -->
            </div> <!-- END row -->

        </div> <!-- END container-fluid -->
    </section>

    <!-- ============================= -->
    <!-- JS FILES -->
    <!-- ============================= -->

    <script src="../../plugins/jquery/jquery.min.js"></script>
    <script src="../../plugins/bootstrap/js/bootstrap.js"></script>
    <script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
    <script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="../../plugins/node-waves/waves.js"></script>
    <script src="../../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- DataTables -->
    <script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

    <script src="../../js/admin.js"></script>
    <script src="../../js/demo.js"></script>
    <script src="metodos.js"></script>

</body>
</html>
