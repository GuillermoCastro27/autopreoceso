<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DE COBRANZAS</title>
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
                    
                    <!-- ================= GESTIONAR COBRANZAS ================= -->
<div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">payments</i>
            Gestionar Cobranzas
            <small>CRUD de Cobranzas y su detalle</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="user_id">
        <input type="hidden" id="cobro_estado" value="PENDIENTE">

        <input type="hidden" id="ventas_cab_id" name="ventas_cab_id">
        <input type="hidden" id="cuotas_seleccionadas" name="cuotas_seleccionadas">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales del Cobro</div>

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
                    <input type="text" id="suc_razon_social"
                           class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- CAJA -->
                <div class="col-sm-2">
                    <input type="text" id="caja"
                           class="form-control" disabled
                           onkeyup="buscarApertCierCaja();" placeholder="Caja">
                    <input type="hidden" id="apertura_cierre_caja_id">
                    <div id="listaAperCierCaja" style="display:none;"></div>
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <input type="text" id="cobro_fecha"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha">
                </div>

            </div>
        </div>

        <!-- ================= CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Cliente</div>

            <div class="row clearfix">

                <div class="col-sm-2">
                    <input type="text" id="cli_nombre"
                           class="form-control" disabled
                           onkeyup="buscarClienteCtasCobrar();"
                           placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                    <div id="listaClientes" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <input type="text" id="cli_apellido"
                           class="form-control" disabled
                           placeholder="Apellido">
                </div>

            </div>
        </div>

                                <!-- ================= DATOS DEL CLIENTE ================= -->
<div class="section-box">
    <div class="section-title">Datos del Cliente</div>

    <div class="row clearfix">

        <!-- RUC -->
        <div class="col-sm-3">
            <input type="text" id="cli_ruc" class="form-control" disabled placeholder="RUC">
        </div>

        <!-- DIRECCIÓN -->
        <div class="col-sm-3">
            <input type="text" id="cli_direccion" class="form-control" disabled placeholder="Dirección">
        </div>

        <!-- TELÉFONO -->
        <div class="col-sm-3">
            <input type="text" id="cli_telefono" class="form-control" disabled placeholder="Teléfono">
        </div>

        <!-- CORREO -->
        <div class="col-sm-3">
            <input type="text" id="cli_correo" class="form-control" disabled placeholder="Correo">
        </div>

    </div>
</div>

<!-- ================= DATOS DEL COBRO ================= -->
<div class="section-box">
    <div class="section-title">Datos del Cobro</div>

    <div class="row clearfix">

        <!-- FORMA DE COBRO -->
        <div class="col-sm-3">
            <input type="text" id="forma_cobro"
                   class="form-control" disabled
                   onkeyup="buscarFormasCobro();"
                   placeholder="Forma de Cobro">
            <input type="hidden" id="forma_cobro_id">
            <div id="listaFormasCobro" style="display:none;"></div>
        </div>

        <!-- IMPORTE -->
        <div class="col-sm-3">
            <input type="text" id="cobro_importe"
                   class="form-control" disabled
                   placeholder="Importe">
        </div>

        <!-- OBSERVACIÓN -->
        <div class="col-sm-3">
            <input type="text" id="cobro_observacion"
                   class="form-control" disabled
                   placeholder="Observación">
        </div>

    </div>

    <div class="row clearfix" style="margin-top:10px;">

        <!-- MONTO EFECTIVO -->
        <div class="col-sm-3">
            <input type="number" id="monto_efectivo"
                   class="form-control" disabled
                   placeholder="Monto Efectivo">
        </div>

        <!-- VUELTO -->
        <div class="col-sm-3">
            <input type="number" id="vuelto"
                   class="form-control" disabled
                   placeholder="Vuelto">
        </div>

        <!-- NRO DOCUMENTO -->
        <div class="col-sm-3">
            <input type="text" id="numero_documento"
                   class="form-control" disabled
                   placeholder="Nro. Documento">
        </div>

        <!-- NRO VOUCHER -->
        <div class="col-sm-3">
            <input type="text" id="nro_voucher"
                   class="form-control" disabled
                   placeholder="Nro. Voucher">
        </div>

    </div>
</div>

<!-- ================= DATOS BANCARIOS / TARJETA ================= -->
<div class="section-box">
    <div class="section-title">Datos Bancarios / Tarjeta</div>

    <div class="row clearfix">

        <!-- PORTADOR -->
        <div class="col-sm-3">
            <input type="text" id="portador"
                   class="form-control" disabled
                   placeholder="Portador">
        </div>

        <!-- FECHA COBRO DIFERIDO -->
        <div class="col-sm-3">
            <input type="text" id="fecha_cobro_diferido"
                   class="datetimepicker form-control" disabled
                   placeholder="Fecha de Cobro">
        </div>

        <!-- ENTIDAD EMISORA -->
        <div class="col-sm-2">
            <input type="text" id="entidad_emisora"
                   class="form-control" disabled
                   onkeyup="buscarEntidadEmisora();"
                   placeholder="Entidad Emisora">
            <input type="hidden" id="entidad_emisora_id">
            <div id="listaEntidadEmi" style="display:none;"></div>
        </div>

        <!-- MARCA TARJETA -->
        <div class="col-sm-2">
            <input type="text" id="marca_tarjeta"
                   class="form-control" disabled
                   onkeyup="buscarMarcaTarjeta();"
                   placeholder="Marca Tarjeta">
            <input type="hidden" id="marca_tarjeta_id">
            <div id="listaMarcaTarj" style="display:none;"></div>
        </div>

        <!-- ENTIDAD ADHERIDA -->
        <div class="col-sm-4">
            <input type="text" id="entidad_adherida"
                   class="form-control" disabled
                   onkeyup="buscarEntidadAdherida();"
                   placeholder="Entidad Adherida">
            <input type="hidden" id="entidad_adherida_id">
            <div id="listaEntidadAdhe" style="display:none;"></div>
        </div>

    </div>
</div>

                                
                            </div>
                                <!-- ================= COBRO CON TARJETA ================= -->
<div class="col-sm-6">

    <div class="card card-industrial equal-height">

        <div class="header">
            <h2>
                <i class="material-icons">credit_card</i>
                Cobro con Tarjeta
            </h2>
        </div>

        <div class="body">

            <div class="row clearfix">

                <!-- NRO TARJETA -->
                <div class="col-sm-6">
                    <input type="text"
                           id="nro_tarjeta"
                           class="form-control"
                           disabled
                           placeholder="Nro. Tarjeta">
                </div>

                <!-- FECHA VENCIMIENTO -->
                <div class="col-sm-6">
                    <input type="text"
                           id="fecha_venc_tarjeta"
                           class="datetimepicker form-control"
                           disabled
                           placeholder="Fecha Vencimiento">
                </div>

                <!-- MONTO TARJETA -->
                <div class="col-sm-6" style="margin-top:10px;">
                    <input type="text"
                           id="monto_tarjeta"
                           class="form-control"
                           disabled
                           placeholder="Monto Tarjeta">
                </div>

                <!-- NRO VOUCHER -->
                <div class="col-sm-6" style="margin-top:10px;">
                    <input type="text"
                           id="nro_voucher_tarjeta"
                           class="form-control"
                           disabled
                           placeholder="Nro. Voucher">
                </div>

            </div>

            <hr>

            <div class="row clearfix">

                <!-- ENTIDAD EMISORA -->
                <div class="col-sm-4">
                    <input type="text"
                           id="entidad_emisora_tarjeta"
                           class="form-control"
                           disabled
                           onkeyup="buscarEntidadEmisoraTarjeta();"
                           placeholder="Entidad Emisora">
                    <input type="hidden"
                           id="entidad_emisora_tarjeta_id">
                    <div id="listaEntidadEmiTarj" style="display:none;"></div>
                </div>

                <!-- MARCA TARJETA -->
                <div class="col-sm-4">
                    <input type="text"
                           id="marca_tarjeta_tarjeta"
                           class="form-control"
                           disabled
                           onkeyup="buscarMarcaTarjetaCobro();"
                           placeholder="Marca Tarjeta">
                    <input type="hidden"
                           id="marca_tarjeta_tarjeta_id">
                    <div id="listaMarcaTarjCobro" style="display:none;"></div>
                </div>

                <!-- ENTIDAD ADHERIDA -->
                <div class="col-sm-4">
                    <input type="text"
                           id="entidad_adherida_tarjeta"
                           class="form-control"
                           disabled
                           onkeyup="buscarEntidadAdheridaTarjeta();"
                           placeholder="Entidad Adherida">
                    <input type="hidden"
                           id="entidad_adherida_tarjeta_id">
                    <div id="listaEntidadAdheTarj" style="display:none;"></div>
                </div>

            </div>

            <!-- BOTÓN -->
            <div class="text-right" style="margin-top:15px;">
                <button id="btnAgregarTarjeta"
                        class="btn btn-success"
                        onclick="habilitarCobroTarjeta()"
                        disabled>
                    <i class="material-icons">add</i> Agregar Tarjeta
                </button>
            </div>

        </div>
    </div>

</div>


                                    <!-- ===================== -->
                                    <!-- COBRO CON CHEQUE -->
                                    <!-- ===================== -->
                                    <!-- ================= COBRO CON CHEQUE ================= -->
<div class="col-sm-6">

    <div class="card card-industrial equal-height">

        <div class="header">
            <h2>
                <i class="material-icons">receipt</i>
                Cobro con Cheque
            </h2>
        </div>

        <div class="body">

            <div class="row clearfix">

                <!-- ENTIDAD EMISORA -->
                <div class="col-sm-4">
                    <input type="text"
                           id="entidad_emisora_cheque"
                           class="form-control"
                           disabled
                           onkeyup="buscarEntidadEmisoraCheque();"
                           placeholder="Entidad Emisora">
                    <input type="hidden"
                           id="entidad_emisora_cheque_id"
                           name="entidad_emisora_cheque_id">
                    <div id="listaEntidadEmiCheq" style="display:none;"></div>
                </div>

                <!-- NRO CHEQUE -->
                <div class="col-sm-6">
                    <input type="text"
                           id="nro_cheque"
                           class="form-control"
                           placeholder="Nro. Cheque">
                </div>

                <!-- FECHA VENCIMIENTO -->
                <div class="col-sm-6" style="margin-top:10px;">
                    <input type="text"
                           id="fecha_venc_cheque"
                           class="datetimepicker form-control"
                           placeholder="Fecha Vencimiento">
                </div>

                <!-- MONTO CHEQUE -->
                <div class="col-sm-12" style="margin-top:10px;">
                    <input type="text"
                           id="monto_cheque"
                           class="form-control"
                           placeholder="Monto Cheque">
                </div>

            </div>

            <!-- BOTÓN -->
            <div class="text-right" style="margin-top:15px;">
                <button id="btnAgregarCheque"
                        class="btn btn-success"
                        onclick="habilitarCobroCheque()"
                        disabled>
                    <i class="material-icons">add</i> Agregar Cheque
                </button>
            </div>

        </div>
    </div>

</div>

                                <!-- ================= CUENTAS A COBRAR ================= -->
<div class="row clearfix" id="panelCtasCobrar" style="display:none;">

    <div class="col-sm-12">

        <div class="card card-industrial">

            <div class="header">
                <h2>
                    <i class="material-icons">assignment</i>
                    Cuentas a Cobrar del Cliente
                </h2>
            </div>

            <div class="body">

                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th style="width:5%"></th>
                                <th>Venta</th>
                                <th>Cuota</th>
                                <th>Vencimiento</th>
                                <th class="text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody id="tablaCtasCobrar">
                            <!-- Se carga por JS -->
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4" class="text-right">TOTAL A COBRAR</th>
                                <th class="text-right" id="totalCobrar">0</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- BOTÓN AGREGAR CUOTA -->
                <div class="text-right" style="margin-top:15px;">
                    <button id="btnAgregarCuota"
                            class="btn btn-success"
                            onclick="listarCtasCobrarCliente()"
                            disabled>
                        <i class="material-icons">add</i> Agregar cuota
                    </button>
                </div>

            </div>
        </div>

    </div>
</div>

                            
                            <!-- ================= BOTONERA COBRANZAS ================= -->
<div class="btn-toolbar-left text-center">

    <button type="button" id="btnAgregar"
            class="btn btn-success"
            onclick="agregar();">
        <i class="material-icons">add</i> Agregar
    </button>

    <button type="button" id="btnEditar"
            class="btn btn-primary"
            onclick="editar();" disabled>
        <i class="material-icons">edit</i> Modificar
    </button>

    <button type="button" id="btnEliminar"
            class="btn btn-danger"
            onclick="eliminar();" disabled>
        <i class="material-icons">delete</i> Anular
    </button>

    <button type="button" id="btnConfirmar"
            class="btn btn-success"
            onclick="confirmar();" disabled>
        <i class="material-icons">check_circle</i> Recibido
    </button>

    <button type="button" id="btnGrabar"
            class="btn btn-default"
            onclick="confirmarOperacion();" disabled>
        <i class="material-icons">save</i> Grabar
    </button>

    <button type="button" id="btnCancelar"
            class="btn btn-warning"
            onclick="cancelar();" disabled>
        <i class="material-icons">close</i> Cancelar
    </button>

</div>


                    <div class="card card-industrial" id="detalle" style="display:none">
                        <div class="header">
                            <h2>Detalles de Cobros</h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix" id="formDetalles"></div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Tipo impuesto</th>
                                            <th>Sub Total</th>
                                            <th>IVA</th> <!-- Agregado para mostrar el total con impuesto -->
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle">
                                        <!-- Aquí se llenarán los detalles de los productos -->
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="6" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th> <!-- Total sin impuestos -->
                                        </tr>
                                        <tr>
                                            <th colspan="6" class="text-right">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th> <!-- Total con impuestos -->
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Cobros</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Forma de Cobro</th>
                                            <th>Caja</th>
                                            <th class="text-right">Importe</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Forma de Cobro</th>
                                            <th>Caja</th>
                                            <th class="text-right">Importe</th>
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

    <!-- Ruta Js (la url del backend o del api rest) -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js"></script>
</body>

</html>
