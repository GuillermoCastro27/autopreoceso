<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ARQUEO DE CAJA</title>
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
        .card-industrial.equal-height {
            min-height: 430px;
        }
    </style>
</head>

<body class="theme-red">

    <?php require_once('../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <!-- ================= REGISTRAR ARQUEO DE CAJA ================= -->
<div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">fact_check</i>
            Registrar Arqueo de Caja
            <small>CRUD de Arqueo de Caja</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id">

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
                    <input type="text" id="suc_razon_social"
                           class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <input type="text" id="arqueo_fecha"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha">
                </div>

                <!-- CAJA -->
                <div class="col-sm-3">
                    <input type="text" id="caja"
                           class="form-control" disabled
                           onkeyup="buscarApertCierCaja();" placeholder="Caja">
                    <input type="hidden" id="apertura_cierre_caja_id">
                    <div id="listaAperCierCaja" style="display:none;"></div>
                </div>

            </div>
        </div>

        <!-- ================= TIPO DE ARQUEO ================= -->
        <div class="section-box">
            <div class="section-title">Tipo de Arqueo</div>

            <div class="row clearfix">

                <div class="col-sm-2">
                    <select id="tipo_arqueo" class="form-control" disabled>
                        <option value="EFECTIVO">EFECTIVO</option>
                        <option value="CHEQUE">CHEQUE</option>
                        <option value="TARJETA">TARJETA</option>
                        <option value="TOTAL">TOTAL</option>
                    </select>
                </div>

            </div>
        </div>

        <!-- ================= TOTALES ================= -->
        <div class="section-box">
            <div class="section-title">Totales del Arqueo</div>

            <div class="row clearfix">

                <div class="col-sm-4">
                    <input type="text" id="total_efectivo"
                           class="form-control" disabled
                           placeholder="Total Efectivo">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="total_cheque"
                           class="form-control" disabled
                           placeholder="Total Cheque">
                </div>

                <div class="col-sm-4">
                    <input type="text" id="total_tarjeta"
                           class="form-control" disabled
                           placeholder="Total Tarjeta">
                </div>

                <div class="col-sm-3" style="margin-top:10px;">
                    <input type="text" id="total_general"
                           class="form-control" disabled
                           placeholder="Total General">
                </div>

            </div>
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left text-center">

            <button id="btnApertura" class="btn btn-success" onclick="generar_arqueo();">
                <i class="material-icons">calculate</i> Generar Arqueo
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

                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Arqueo de Caja</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Fecha</th>
                                            <th>Caja</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Fecha</th>
                                            <th>Caja</th>
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