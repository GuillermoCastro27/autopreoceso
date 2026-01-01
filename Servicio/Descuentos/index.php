<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DESCUENTOS</title>
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
                    
                    <div class="card card-industrial">

    <!-- ================= HEADER ================= -->
    <div class="header">
        <h2>
            <i class="material-icons">percent</i>
            Registrar Descuentos
            <small>CRUD de Descuentos y su detalle</small>
        </h2>
    </div>

    <!-- ================= BODY ================= -->
    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id">
        <input type="hidden" id="desc_cab_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <!-- CÓDIGO -->
                <div class="col-sm-2">
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
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- FECHA REGISTRO -->
                <div class="col-sm-3">
                    <input type="text" id="desc_cab_fecha_registro"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha Registro">
                </div>

            </div>
        </div>

        <!-- ================= VIGENCIA DEL DESCUENTO ================= -->
        <div class="section-box">
            <div class="section-title">Vigencia</div>

            <div class="row clearfix">

                <div class="col-sm-3">
                    <input type="text" id="desc_cab_fecha_inicio"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha Inicio">
                </div>

                <div class="col-sm-3">
                    <input type="text" id="desc_cab_fecha_fin"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha Fin">
                </div>

            </div>
        </div>

        <!-- ================= CONFIGURACIÓN DEL DESCUENTO ================= -->
        <div class="section-box">
            <div class="section-title">Configuración del Descuento</div>

            <div class="row clearfix">

                <div class="col-sm-5">
                    <input type="text" id="desc_cab_nombre"
                           class="form-control" disabled
                           placeholder="Nombre del Descuento">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="tipo_desc_nombre"
                           class="form-control" disabled
                           onkeyup="buscarTipoDescuento();"
                           placeholder="Tipo de Descuento">
                    <input type="hidden" id="tipo_descuentos_id">
                    <div id="listaTipoDesc" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="desc_cab_porcentaje"
                           class="form-control" disabled
                           placeholder="Porcentaje (%)">
                </div>

            </div>
        </div>

        <!-- ================= OBSERVACIONES ================= -->
        <div class="section-box">
            <div class="section-title">Observaciones</div>

            <div class="row clearfix">
                <div class="col-sm-12">
                    <input type="text" id="desc_cab_observaciones"
                           class="form-control" disabled
                           placeholder="Observaciones">
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
                            <h2>Detalles de Descuentos</h2>
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
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle"></tbody>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- REGISTROS -->
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Descuentos</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Nombre</th>
                                            <th>Encargado</th>
                                            <th>Observación</th>
                                            <th>Fecha Registro</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin</th>
                                            <th>Porcentaje</th>
                                            <th>Estado</th>
                                            <th>Tipo Descuento</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Nombre</th>
                                            <th>Encargado</th>
                                            <th>Observación</th>
                                            <th>Fecha Registro</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin</th>
                                            <th>Porcentaje</th>
                                            <th>Estado</th>
                                            <th>Tipo Descuento</th>
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