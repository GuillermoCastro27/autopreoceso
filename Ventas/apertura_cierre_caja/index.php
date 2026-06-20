<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI APERTURA Y CIERRE DE CAJA</title>
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
                    
                    <!-- ================= APERTURA Y CIERRE DE CAJA ================= -->
<div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">account_balance_wallet</i>
            Registrar Apertura y Cierre de Caja
            <small>CRUD de Apertura y Cierre de Caja</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <!-- CÓDIGO -->
                <div class="col-sm-2">
                    <label class="field-label">Código</label>
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <!-- EMPRESA -->
                <div class="col-sm-2">
                    <label class="field-label">Empresa</label>
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                    <div id="listaEmpresa" style="display:none;"></div>
                </div>

                <!-- SUCURSAL -->
                <div class="col-sm-2">
                    <label class="field-label">Sucursal</label>
                    <input type="text" id="suc_razon_social" class="form-control"
                           disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- FECHA APERTURA -->
                <div class="col-sm-3">
                    <label class="field-label">Fecha Apertura</label>
                    <input type="text" id="fecha_apertura"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha Apertura">
                </div>

                <!-- CAJA -->
                <div class="col-sm-3">
                    <label class="field-label">Caja</label>
                    <input type="text" id="caja_descripcion"
                           class="form-control" disabled
                           onkeyup="buscarCaja();" placeholder="Caja">
                    <input type="hidden" id="caja_id">
                    <div id="listaCaja" style="display:none;"></div>
                </div>

            </div>
        </div>

        <!-- ================= APERTURA ================= -->
        <div class="section-box">
            <div class="section-title">Datos de Apertura</div>

            <div class="row clearfix">
                <div class="col-sm-3">
                    <label class="field-label">Monto Apertura</label>
                    <input type="number" id="monto_apertura"
                           class="form-control" disabled
                           placeholder="Monto Apertura">
                </div>
            </div>
        </div>

        <!-- ================= CIERRE (vista datos de registro cerrado) ================= -->
        <div class="section-box" id="seccionDatosCierre">
            <div class="section-title">Datos de Cierre</div>

            <div class="row clearfix">

                <div class="col-sm-4">
                    <label class="field-label">Fecha Cierre</label>
                    <input type="text" id="fecha_cierre"
                           class="form-control" disabled
                           placeholder="Fecha Cierre">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Total Efectivo</label>
                    <input type="text" id="monto_efectivo_cierre"
                           class="form-control" disabled
                           placeholder="Total Efectivo">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Total Tarjeta</label>
                    <input type="text" id="monto_tarjeta_cierre"
                           class="form-control" disabled
                           placeholder="Total Tarjeta">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label">Total Cheque</label>
                    <input type="text" id="monto_cheque_cierre"
                           class="form-control" disabled
                           placeholder="Total Cheque">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label">Total Transferencia</label>
                    <input type="text" id="monto_transferencia_cierre"
                           class="form-control" disabled
                           placeholder="Total Transferencia">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label">Total QR</label>
                    <input type="text" id="monto_qr_cierre"
                           class="form-control" disabled
                           placeholder="Total QR">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label">Monto Total Cierre</label>
                    <input type="text" id="monto_cierre"
                           class="form-control" disabled
                           placeholder="Monto Total Cierre">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label" style="color:#27ae60; font-weight:bold;">Sobrante</label>
                    <input type="text" id="sobrante_cierre"
                           class="form-control" disabled
                           placeholder="0"
                           style="color:#27ae60; font-weight:bold;">
                </div>

                <div class="col-sm-4" style="margin-top:10px;">
                    <label class="field-label" style="color:#c0392b; font-weight:bold;">Faltante</label>
                    <input type="text" id="faltante_cierre"
                           class="form-control" disabled
                           placeholder="0"
                           style="color:#c0392b; font-weight:bold;">
                </div>

            </div>
        </div>

        <!-- ================= PANEL CIERRE INTERACTIVO ================= -->
        <div class="section-box" id="panelCierre" style="display:none; border:2px solid #e74c3c; border-radius:6px;">
            <div class="section-title" style="color:#c0392b;">
                <i class="material-icons" style="vertical-align:middle;">lock</i>
                Proceso de Cierre de Caja
            </div>

            <!-- Fila 1: Selección de caja -->
            <div class="row clearfix">
                <div class="col-sm-6">
                    <label class="field-label">Seleccionar Caja a Cerrar</label>
                    <select id="select_caja_cierre" class="form-control"
                            onchange="seleccionarCajaCierre(this.value);">
                        <option value="">-- Seleccione una caja abierta --</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Sucursal</label>
                    <input type="text" id="cierre_suc_razon_social" class="form-control" disabled>
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Fecha Apertura</label>
                    <input type="text" id="cierre_fecha_apertura" class="form-control" disabled>
                </div>
            </div>

            <!-- Fila 2: Totales del sistema -->
            <div class="row clearfix" style="margin-top:12px;">
                <div class="col-sm-12">
                    <div class="section-title" style="font-size:12px; color:#666; margin-bottom:6px;">
                        Totales del Sistema (cobros confirmados)
                    </div>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Monto Apertura</label>
                    <input type="text" id="cierre_monto_apertura" class="form-control" disabled
                           style="background:#eaf3fb; font-weight:bold;">
                </div>
                <div class="col-sm-2">
                    <label class="field-label" style="color:#27ae60;">Efectivo Neto</label>
                    <input type="text" id="cierre_sistema_efectivo_neto" class="form-control" disabled
                           style="color:#27ae60; font-weight:bold;">
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Sistema: Tarjeta</label>
                    <input type="text" id="cierre_sistema_tarjeta" class="form-control" disabled>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Sistema: Cheque</label>
                    <input type="text" id="cierre_sistema_cheque" class="form-control" disabled>
                </div>
                <div class="col-sm-2" style="margin-top:10px;">
                    <label class="field-label">Sistema: Transferencia</label>
                    <input type="text" id="cierre_sistema_transferencia" class="form-control" disabled>
                </div>
                <div class="col-sm-2" style="margin-top:10px;">
                    <label class="field-label">Sistema: QR</label>
                    <input type="text" id="cierre_sistema_qr" class="form-control" disabled>
                </div>
            </div>

            <!-- Fila 3: Validación de efectivo -->
            <div class="row clearfix" style="margin-top:12px;">
                <div class="col-sm-3">
                    <label class="field-label" style="color:#e67e22; font-weight:bold;">
                        <i class="material-icons" style="font-size:14px;vertical-align:middle;">info</i>
                        Esperado en Caja (Apertura + Neto)
                    </label>
                    <input type="text" id="cierre_efectivo_esperado" class="form-control" disabled
                           style="background:#fef9e7; font-weight:bold; color:#e67e22;">
                </div>
                <div class="col-sm-3">
                    <label class="field-label" style="color:#27ae60; font-weight:bold;">
                        Efectivo Físico (lo que contó)
                    </label>
                    <input type="number" id="cierre_efectivo_fisico" class="form-control"
                           placeholder="0.00" oninput="calcularDiferenciaCierre();"
                           style="border:2px solid #27ae60;">
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Diferencia</label>
                    <input type="text" id="cierre_diferencia" class="form-control" disabled>
                </div>
                <div class="col-sm-3">
                    <label class="field-label">Total General Sistema</label>
                    <input type="text" id="cierre_total_sistema" class="form-control" disabled
                           style="font-weight:bold;">
                </div>
            </div>

            <input type="hidden" id="cierre_apertura_id">
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left text-center">

            <button id="btnApertura" class="btn btn-success" onclick="apertura();">
                <i class="material-icons">lock_open</i> Apertura
            </button>

            <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>

            <button id="btnEliminar" class="btn btn-danger" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Anular
            </button>

            <button id="btnCierre" class="btn btn-success" onclick="cierre();">
                <i class="material-icons">lock</i> Cierre
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
                            <h2>Registros de Apertura y Cierre de Caja</h2>
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
    <script src="../../js/admin.js?v=3"></script>

    <!-- Demo Js -->
    <script src="../../js/demo.js"></script>

    <!-- Ruta Js (la url del backend o del api rest) -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js?v=2"></script>
</body>

</html>
