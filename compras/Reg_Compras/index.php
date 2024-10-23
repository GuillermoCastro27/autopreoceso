<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ORDENES DE COMPRAS</title>
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
                            <h2>Gestionar Compras <small>CRUD de Compras y su detalle</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="PENDIENTE" id="comp_estado"/>
                                <!-- CAMPO PARA CODIGO CON 1 COLUMNAS -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
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
                                            <select id="condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                                                <option value="CONTADO">Al contado</option>
                                                <option value="CREDITO">A crédito</option>
                                            </select>
                                            <label class="form-label">Condición de Pago</label>
                                        </div>
                                    </div>
                                </div>

                                <script>
                                // Función para habilitar/deshabilitar campos según la condición de pago seleccionada
                                function controlarCamposPago() {
                                    var condicion = document.getElementById('condicion_pago').value;
                                    var cuota = document.getElementById('comp_cant_cuota');
                                    var intervaloFechaVence = document.getElementById('comp_intervalo_fecha_vence');

                                    if (condicion === 'CONTADO') {
                                        cuota.disabled = true;
                                        intervaloFechaVence.disabled = true;
                                        intervaloFechaVence.value = ''; // Asegúrate de limpiar el valor
                                    } else {
                                        cuota.disabled = false;
                                        intervaloFechaVence.disabled = false;
                                    }
                                }

                                // Llamar a la función cuando se carga la página para que establezca el estado inicial
                                window.onload = function() {
                                    controlarCamposPago();
                                };
                                </script>
                                <!-- CAMPO PARA FECHA DE VENCIMIENTO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="comp_intervalo_fecha_vence" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Intervalo de fecha Vencimiento</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE VENCIMIENTO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="comp_fecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA OBSERVACIONES CON 5 COLUMNAS -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="comp_cant_cuota" class="form-control" disabled>
                                            <label class="form-label">Cuota</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-sm-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="ordencompra" class="form-control" disabled onkeyup="buscarOrdenCompra();">
                                            <label class="form-label">Ordenes de compra</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la ciudad -->
                                        <input type="hidden" id="orden_compra_cab_id" name="orden_compra_cab_id" value="0">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaOrdenCompra" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-4"> 
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="proveedor_id" value="0"> <!-- Este campo se actualizará dinámicamente -->
                                            <input type="text" id="prov_razonsocial" class="form-control" disabled>
                                            <label class="form-label">Proveedor</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CAMPO PARA RUC DEL PROVEEDOR -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="prov_ruc" class=" form-control" disabled>
                                            <label class="form-label">RUC</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA TELEFONO DEL PROVEEDOR -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="prov_telefono" class=" form-control" disabled>
                                            <label class="form-label">Telefono</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CORREO DEL PROVEEDOR -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="prov_correo" class=" form-control" disabled>
                                            <label class="form-label">Correo</label>
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
                            <h2>Detalles de Compras</h2>
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
                                            <th>Total con Impuesto</th> <!-- Agregado para mostrar el total con impuesto -->
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle">
                                        <!-- Aquí se llenarán los detalles de los productos -->
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="5" class="text-right">Total General</th>
                                            <th class="text-right" id="txtTotalGral">0</th> <!-- Total sin impuestos -->
                                        </tr>
                                        <tr>
                                            <th colspan="5" class="text-right">Total con Impuesto</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th> <!-- Total con impuestos -->
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="registros">
                        <div class="header">
                            <h2>Registros de Compra</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Intervalo de fecha Vencimiento</th>
                                            <th>Fecha</th>
                                            <th>Ordenes de compra</th>
                                            <th>Encargado</th>
                                            <th>Cantidad de cuota</th>
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
                                            <th>Ordenes de compra</th>
                                            <th>Encargado</th>
                                            <th>Cantidad de cuota</th>
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
