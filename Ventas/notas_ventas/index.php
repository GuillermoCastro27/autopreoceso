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
        <input type="hidden" id="funcionario_id" value="1">
        <input type="hidden" id="nota_vent_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>

            <div class="row clearfix">

                <!-- CÓDIGO -->
                <div class="col-sm-1">
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
                <div class="col-sm-2" style="position:relative;">
                    <label class="field-label">Sucursal</label>
                    <input type="text"
                           id="suc_razon_social"
                           class="form-control"
                           disabled
                           onkeyup="buscarSucursal();"
                           placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
                </div>

                <!-- CONDICIÓN DE PAGO -->
                <div class="col-sm-2">
                    <label class="field-label">Condición de Pago</label>
                    <input type="text"
                           id="nota_vene_condicion_pago"
                           class="form-control"
                           disabled
                           placeholder="Condición de Pago">
                </div>

                <!-- VENCIMIENTO -->
                <div class="col-sm-3">
                    <label class="field-label">Fecha Vencimiento</label>
                    <input type="text"
                           id="vencimiento"
                           class="datetimepicker form-control"
                           disabled
                           placeholder="Fecha Vencimiento">
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <label class="field-label">Fecha</label>
                    <input type="text"
                           id="nota_vent_fecha"
                           class="datetimepicker form-control"
                           readonly
                           placeholder="Fecha">
                </div>

            </div>

            <!-- TIMBRADO -->
            <div class="row clearfix" style="margin-top:8px;">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-addon" style="font-size:11px;white-space:nowrap;">Timbrado</span>
                        <input type="text" id="tim_numero_display" class="form-control" disabled placeholder="(auto)">
                        <input type="hidden" id="timbrado_id">
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="input-group">
                        <span class="input-group-addon" style="font-size:11px;white-space:nowrap;">Nro. Comprobante</span>
                        <input type="text" id="nota_vent_nro_comprobante" class="form-control" disabled placeholder="—">
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="input-group">
                        <span class="input-group-addon" style="font-size:11px;white-space:nowrap;">Vence</span>
                        <input type="text" id="tim_vence_display" class="form-control" disabled placeholder="—">
                    </div>
                </div>
            </div>

        </div>

        <!-- ================= DATOS DE LA NOTA ================= -->
        <div class="section-box">
            <div class="section-title">Datos de la Nota</div>

            <div class="row clearfix">

                <!-- CUOTAS -->
                <div class="col-sm-1">
                    <label class="field-label">Cuota</label>
                    <input type="text"
                           id="cuotas"
                           class="form-control"
                           disabled
                           placeholder="Cuota">
                </div>

                <!-- TIPO NOTA -->
                <div class="col-sm-2">
                    <label class="field-label">Tipo de Nota</label>
                    <select id="nota_vent_tipo" class="form-control" disabled onchange="cargarTimbrado();">
                        <option value="">-- Tipo --</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Débito">Débito</option>
                    </select>
                </div>

                <!-- AFECTA STOCK -->
                <div class="col-sm-2">
                    <label class="field-label">Afecta Stock</label>
                    <div class="btn-group" id="grupoAfectaStock">
                        <button type="button" id="btnAfectaSi" class="btn btn-success btn-sm waves-effect active"
                                onclick="setAfectaStock(true);" disabled>
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">check</i> Sí
                        </button>
                        <button type="button" id="btnAfectaNo" class="btn btn-default btn-sm waves-effect"
                                onclick="setAfectaStock(false);" disabled>
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">close</i> No
                        </button>
                    </div>
                    <input type="hidden" id="nota_vent_afecta_stock" value="1">
                </div>

                <!-- OBSERVACIONES -->
                <div class="col-sm-3">
                    <label class="field-label">Observaciones</label>
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
                    <label class="field-label">Venta</label>
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
                    <label class="field-label">Nombre</label>
                    <input type="text"
                           id="cli_nombre"
                           class="form-control"
                           disabled
                           placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Apellido</label>
                    <input type="text"
                           id="cli_apellido"
                           class="form-control"
                           disabled
                           placeholder="Apellido">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">RUC</label>
                    <input type="text"
                           id="cli_ruc"
                           class="form-control"
                           disabled
                           placeholder="RUC">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Dirección</label>
                    <input type="text"
                           id="cli_direccion"
                           class="form-control"
                           disabled
                           placeholder="Dirección">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Teléfono</label>
                    <input type="text"
                           id="cli_telefono"
                           class="form-control"
                           disabled
                           placeholder="Teléfono">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Correo</label>
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
                            <h2><i class="material-icons">list</i> Detalles de Notas de Ventas</h2>
                        </div>
                        <div class="body">

                            <!-- CAMPOS OCULTOS DETALLE -->
                            <input type="hidden" id="txtOperacionDetalle" value="0">
                            <input type="hidden" id="tipo_impuesto_id">
                            <input type="hidden" id="stock_disponible_det" value="0">

                            <!-- FORMULARIO DE ÍTEMS -->
                            <div class="section-box" id="formDetalles" style="display:none;">
                                <div class="section-title">Ítems</div>

                                <div class="row clearfix">
                                    <div class="col-sm-1">
                                        <label style="font-size:12px;color:#636e72;">Código</label>
                                        <input type="text" id="item_id" class="form-control" disabled placeholder="Cód">
                                    </div>
                                    <div class="col-sm-3">
                                        <label style="font-size:12px;color:#636e72;">Producto</label>
                                        <input type="text" id="item_decripcion" class="form-control" disabled
                                               onkeyup="buscarProductos();" placeholder="Buscar producto...">
                                        <div id="listaProductos" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
                                    </div>
                                    <div class="col-sm-1">
                                        <label style="font-size:12px;color:#636e72;">Cantidad</label>
                                        <input type="text" id="notas_vent_det_cantidad" class="form-control" disabled
                                               placeholder="Cant." oninput="validarCantidadNota();">
                                        <small id="avisoStockNota" style="color:#e74c3c;display:none;"></small>
                                    </div>
                                    <div class="col-sm-2">
                                        <label style="font-size:12px;color:#636e72;">Precio</label>
                                        <input type="text" id="notas_vent_det_precio" class="form-control" disabled placeholder="Precio">
                                    </div>
                                    <div class="col-sm-2">
                                        <label style="font-size:12px;color:#636e72;">Impuesto</label>
                                        <input type="text" id="tip_imp_nom" class="form-control" disabled placeholder="Tipo Impuesto">
                                    </div>
                                    <div class="col-sm-3">
                                        <label style="font-size:12px;color:#636e72;">Depósito</label>
                                        <select id="deposito_id_det" class="form-control" disabled>
                                            <option value="">-- Depósito --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row clearfix" style="margin-top:8px;">
                                    <div class="col-sm-3">
                                        <label style="font-size:12px;color:#636e72;">Marca</label>
                                        <select id="marca_det_mm" class="form-control" disabled>
                                            <option value="">-- Marca --</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <label style="font-size:12px;color:#636e72;">Modelo</label>
                                        <select id="modelo_det_mm" class="form-control" disabled>
                                            <option value="">-- Modelo --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="btn-toolbar-left" style="margin-top:10px;">
                                    <button id="btnAgregarDetalle"  class="btn btn-success waves-effect" onclick="agregarDetalle();">
                                        <i class="material-icons">add</i>
                                    </button>
                                    <button id="btnEditarDetalle"   class="btn btn-warning waves-effect" onclick="editarDetalle();">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button id="btnEliminarDetalle" class="btn btn-danger waves-effect"  onclick="eliminarDetalle();">
                                        <i class="material-icons">clear</i>
                                    </button>
                                    <button id="btnGrabarDetalle"   class="btn btn-default waves-effect" onclick="grabarDetalle();" style="display:none;">
                                        <i class="material-icons">save</i>
                                    </button>
                                    <button id="btnCancelarDetalle" class="btn btn-warning waves-effect" onclick="cancelarDetalle();" style="display:none;">
                                        <i class="material-icons">close</i>
                                    </button>
                                </div>
                            </div>

                            <!-- TABLA DE ÍTEMS -->
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th class="text-right">Cantidad</th>
                                            <th class="text-right">Precio</th>
                                            <th>Impuesto</th>
                                            <th class="text-right">Sub Total</th>
                                            <th class="text-right">IVA</th>
                                            <th>Depósito</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="8" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right">IVA 10%</th>
                                            <th class="text-right" id="txtIva10">0</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right">IVA 5%</th>
                                            <th class="text-right" id="txtIva5">0</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right" style="font-weight:bold;">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto" style="font-weight:bold;">0</th>
                                            <th></th>
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
                                    <tbody id="tableBody"></tbody>
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
    <script src="../../js/marcaModelo.js"></script>
    <script src="metodos.js?v=7"></script>
</body>

</html>