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
</head>

<body class="theme-red">

    <?php require_once('../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Gestionar Cobranzas <small>CRUD de Cobranzas y su detalle</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="" id="user_id"/>
                                <input type="hidden" value="PENDIENTE" id="cobro_estado"/>
                                <!-- CAMPO PARA CODIGO CON 1 COLUMNAS -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="ventas_cab_id" name="ventas_cab_id">
                                <input type="hidden" id="cuotas_seleccionadas" name="cuotas_seleccionadas">
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="emp_razon_social" class="form-control" disabled>
                                            <label class="form-label">Empresa</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la ciudad -->
                                        <input type="hidden" id="empresa_id" name="empresa_id">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaEmpresa" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();">
                                            <label class="form-label">Sucursal</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la ciudad -->
                                        <input type="hidden" id="sucursal_id" name="sucursal_id">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaSucursal" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="caja" class="form-control" disabled onkeyup="buscarApertCierCaja();">
                                            <label class="form-label">Caja</label>
                                        </div>
                                        <input type="hidden" id="apertura_cierre_caja_id" name="apertura_cierre_caja_id">
                                        <div id="listaAperCierCaja" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE VENCIMIENTO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cobro_fecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha</label>
                                        </div>
                                    </div>
                                </div>
                            <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_nombre" class="form-control" disabled onkeyup="buscarClienteCtasCobrar();">
                                            <label class="form-label">Cliente</label>
                                        </div>
                                        <input type="hidden" id="clientes_id" name="clientes_id">
                                        <div id="listaClientes" style="display:none;"></div>
                                    </div>
                                </div>
                                 <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_apellido" class="form-control" disabled>
                                            <label class="form-label">Apellido</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- RUC -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_ruc" class="form-control" disabled>
                                            <label class="form-label">RUC</label>
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

                                <!-- TELEFONO -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cli_telefono" class="form-control" disabled>
                                            <label class="form-label">Telefono</label>
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
                            <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="forma_cobro" class="form-control" disabled onkeyup="buscarFormasCobro();">
                                            <label class="form-label">Forma de cobro</label>
                                        </div>
                                        <input type="hidden" id="forma_cobro_id" name="forma_cobro_id">
                                        <div id="listaFormasCobro" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cobro_importe" class="form-control" disabled>
                                            <label class="form-label">Importe</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cobro_observacion" class="form-control" disabled>
                                            <label class="form-label">Observacion</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="number" id="monto_efectivo" class="form-control" disabled>
                                            <label class="form-label">Monto Efectivo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="number" id="vuelto" class="form-control" disabled>
                                            <label class="form-label">Vuelto</label>
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="numero_documento" class="form-control" disabled>
                                            <label class="form-label">Nro. Docuemento</label>
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="nro_voucher" class="form-control" disabled>
                                            <label class="form-label">Nro. Voucher</label>
                                        </div>
                                    </div>
                                </div>
                                 <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="portador" class="form-control" disabled>
                                            <label class="form-label">Portador</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_cobro_diferido" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha de Cobro</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="entidad_emisora" class="form-control" disabled onkeyup="buscarEntidadEmisora();">
                                            <label class="form-label">Entidad Emisora</label>
                                        </div>
                                        <input type="hidden" id="entidad_emisora_id" name="entidad_emisora_id">
                                        <div id="listaEntidadEmi" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="marca_tarjeta" class="form-control" disabled onkeyup="buscarMarcaTarjeta();">
                                            <label class="form-label">Marca Tarjeta</label>
                                        </div>
                                        <input type="hidden" id="marca_tarjeta_id" name="marca_tarjeta_id">
                                        <div id="listaMarcaTarj" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text"
                                                id="entidad_adherida"
                                                class="form-control"
                                                disabled
                                                onkeyup="buscarEntidadAdherida();">
                                            <label class="form-label">Entidad Adherida</label>
                                        </div>
                                        <input type="hidden" id="entidad_adherida_id" name="entidad_adherida_id">
                                        <div id="listaEntidadAdhe" style="display:none;"></div>
                                    </div>
                                </div>
                                
                            </div>
                                <div class="row clearfix">

                                    <!-- ===================== -->
                                    <!-- COBRO CON TARJETA -->
                                    <!-- ===================== -->
                                    <div class="col-sm-6">
                                        <div class="card">
                                            <div class="header bg-blue">
                                                <h2>
                                                    <i class="material-icons">credit_card</i>
                                                    Cobro con Tarjeta
                                                </h2>
                                            </div>
                                            <div class="body">

                                                <div class="row clearfix">

                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="nro_tarjeta"
                                                                    class="form-control"
                                                                    disabled>
                                                                <label class="form-label">Nro. Tarjeta</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- FECHA VENCIMIENTO -->
                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="fecha_venc_tarjeta"
                                                                    class="datetimepicker form-control"
                                                                    disabled>
                                                                <label class="form-label">Fecha Vencimiento</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- MONTO TARJETA -->
                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="monto_tarjeta"
                                                                    class="form-control"
                                                                    disabled>
                                                                <label class="form-label">Monto Tarjeta</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- NRO VOUCHER -->
                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="nro_voucher_tarjeta"
                                                                    class="form-control"
                                                                    disabled>
                                                                <label class="form-label">Nro. Voucher</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- ENTIDAD EMISORA -->
                                                    <div class="col-sm-4">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="entidad_emisora_tarjeta"
                                                                    class="form-control"
                                                                    disabled
                                                                    onkeyup="buscarEntidadEmisoraTarjeta();">
                                                                <label class="form-label">Entidad Emisora</label>
                                                            </div>
                                                            <input type="hidden"
                                                                id="entidad_emisora_tarjeta_id"
                                                                name="entidad_emisora_tarjeta_id">
                                                            <div id="listaEntidadEmiTarj" style="display:none;"></div>
                                                        </div>
                                                    </div>

                                                    <!-- MARCA TARJETA -->
                                                    <div class="col-sm-4">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="marca_tarjeta_tarjeta"
                                                                    class="form-control"
                                                                    disabled
                                                                    onkeyup="buscarMarcaTarjetaCobro();">
                                                                <label class="form-label">Marca Tarjeta</label>
                                                            </div>
                                                            <input type="hidden"
                                                                id="marca_tarjeta_tarjeta_id"
                                                                name="marca_tarjeta_tarjeta_id">
                                                            <div id="listaMarcaTarjCobro" style="display:none;"></div>
                                                        </div>
                                                    </div>

                                                    <!-- ENTIDAD ADHERIDA -->
                                                    <div class="col-sm-4">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="entidad_adherida_tarjeta"
                                                                    class="form-control"
                                                                    disabled
                                                                    onkeyup="buscarEntidadAdheridaTarjeta();">
                                                                <label class="form-label">Entidad Adherida</label>
                                                            </div>
                                                            <input type="hidden"
                                                                id="entidad_adherida_tarjeta_id"
                                                                name="entidad_adherida_tarjeta_id">
                                                            <div id="listaEntidadAdheTarj" style="display:none;"></div>
                                                        </div>
                                                    </div>

                                                </div>
                                               <div class="text-right" style="margin-top:10px;">
                                                    <button
                                                        id="btnAgregarTarjeta"
                                                        class="btn btn-success"
                                                        onclick="habilitarCobroTarjeta()"
                                                        disabled>
                                                        + Agregar Tarjeta
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- ===================== -->
                                    <!-- COBRO CON CHEQUE -->
                                    <!-- ===================== -->
                                    <div class="col-sm-6">
                                        <div class="card">
                                            <div class="header bg-orange">
                                                <h2>
                                                    <i class="material-icons">receipt</i>
                                                    Cobro con Cheque
                                                </h2>
                                            </div>
                                            <div class="body">

                                                <div class="row clearfix">

                                                    <div class="col-sm-4">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text"
                                                                    id="entidad_emisora_cheque"
                                                                    class="form-control"
                                                                    disabled
                                                                    onkeyup="buscarEntidadEmisoraCheque();">
                                                                <label class="form-label">Entidad Emisora</label>
                                                            </div>
                                                            <input type="hidden"
                                                                id="entidad_emisora_cheque_id"
                                                                name="entidad_emisora_cheque_id">
                                                            <div id="listaEntidadEmiCheq" style="display:none;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text" id="nro_cheque" class="form-control">
                                                                <label class="form-label">Nro. Cheque</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text" id="fecha_venc_cheque" class="datetimepicker form-control">
                                                                <label class="form-label">Fecha Vencimiento</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group form-float">
                                                            <div class="form-line">
                                                                <input type="text" id="monto_cheque" class="form-control">
                                                                <label class="form-label">Monto Cheque</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="text-right" style="margin-top:10px;">
                                                    <button
                                                        id="btnAgregarCheque"
                                                        class="btn btn-success"
                                                        onclick="habilitarCobroCheque()"
                                                        disabled>
                                                        + Agregar Cheque
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row clearfix" id="panelCtasCobrar" style="display:none;">
                                    <div class="col-sm-12">
                                        <div class="card">
                                            <div class="header">
                                                <h2>Cuentas a Cobrar del Cliente</h2>
                                            </div>
                                            <div class="body">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered table-striped">
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

                                                <!-- 🔽 BOTÓN AGREGAR CUOTA -->
                                                <div class="text-right" style="margin-top:10px;">
                                                    <button
                                                        id="btnAgregarCuota"
                                                        class="btn btn-success"
                                                        onclick="listarCtasCobrarCliente()"
                                                        disabled>
                                                        + Agregar cuota
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();"disabled>ANULAR</button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>RECIBIDO</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>  
                            </div>
                        </div>
                    </div>

                    <div class="card" id="detalle" style="display:none">
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
                    <div class="card" id="registros">
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
