<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI DE VENTAS</title>
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
                    
                    <div class="card card-industrial">

    <div class="header">
        <h2>
            <i class="material-icons">point_of_sale</i>
            Gestionar Ventas
            <small>CRUD de Ventas y su detalle</small>
        </h2>
    </div>

    <div class="body">

        <!-- CAMPOS OCULTOS -->
        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="vent_estado" value="PENDIENTE">

        <!-- ================= DATOS GENERALES ================= -->
        <div class="section-box">
            <div class="section-title">Datos Generales de la Venta</div>

            <!-- FILA 1 -->
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
                <div class="col-sm-2">
                    <label class="field-label">Sucursal</label>
                    <input type="text" id="suc_razon_social" class="form-control" disabled onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <!-- CONDICIÓN DE PAGO -->
                <div class="col-sm-2">
                    <label class="field-label">Condición de Pago</label>
                    <select id="condicion_pago" class="form-control" disabled onchange="controlarCamposPago();">
                        <option value="CONTADO">Al contado</option>
                        <option value="CREDITO">A crédito</option>
                    </select>
                </div>

                <!-- FECHA -->
                <div class="col-sm-3">
                    <label class="field-label">Fecha</label>
                    <input type="text" id="vent_fecha"
                           class="datetimepicker form-control" disabled
                           placeholder="Fecha">
                </div>

            </div>

            <!-- FILA 2: crédito -->
            <div class="row clearfix" style="margin-top:8px;">

                <!-- INTERVALO VENCIMIENTO -->
                <div class="col-sm-3">
                    <label class="field-label">Intervalo Fecha Vencimiento</label>
                    <input type="text" id="vent_intervalo_fecha_vence"
                           class="datetimepicker form-control" disabled
                           placeholder="Intervalo fecha vencimiento">
                </div>

                <!-- CUOTA -->
                <div class="col-sm-2">
                    <label class="field-label">Cuota</label>
                    <input type="text" id="vent_cant_cuota"
                           class="form-control" disabled
                           placeholder="Cuota">
                </div>


            </div>

            <!-- TIMBRADO -->
            <div class="row clearfix" style="margin-top:8px;">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-addon" style="font-size:11px;white-space:nowrap;">Timbrado</span>
                        <input type="text" id="tim_numero_display" class="form-control" disabled placeholder="(seleccionar empresa y sucursal)">
                        <input type="hidden" id="timbrado_id">
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="input-group">
                        <span class="input-group-addon" style="font-size:11px;white-space:nowrap;">Nro. Comprobante</span>
                        <input type="text" id="vent_nro_comprobante" class="form-control" disabled placeholder="—">
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

        <!-- ================= ORIGEN DE LA VENTA ================= -->
        <div class="section-box">
            <div class="section-title">Origen de la Venta</div>

            <div style="margin-bottom:14px;">
                <label id="lblVentaDirecta" style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;padding:8px 16px;border-radius:4px;border:2px solid #b0bec5;background:#f5f5f5;font-size:13px;font-weight:500;color:#546e7a;transition:all .15s;">
                    <input type="checkbox" id="chkVentaDirecta" onchange="onVentaDirectaChange();" disabled style="width:16px;height:16px;cursor:pointer;">
                    Venta Directa
                    <small style="font-weight:400;color:#90a4ae;">(sin pedido ni orden de servicio)</small>
                </label>
            </div>

            <div id="seccionPedidosOrdenes">
            <!-- ─── PEDIDOS PRE-SAVE ─── -->
            <div class="row clearfix" style="margin-bottom:6px;">
                <div class="col-sm-12">
                    <label style="font-size:12px;color:#636e72;margin-bottom:4px;">Pedidos de Venta</label><br>
                    <button id="btnAbrirPanelPedidos" class="btn btn-info waves-effect" disabled onclick="abrirPanelPedidos();">
                        <i class="material-icons" style="vertical-align:middle;">playlist_add</i> Agregar Pedidos
                    </button>
                </div>
            </div>
            <!-- Panel multi-select pedidos -->
            <div id="panelMultiPedidos" style="display:none; border:1px solid #b2d8f7; border-radius:6px; padding:12px; margin-bottom:8px; background:#f5fbff;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="color:#2980b9;"><i class="material-icons" style="font-size:16px;vertical-align:middle;">receipt</i> Seleccionar Pedidos de Venta</strong>
                    <button class="btn btn-xs btn-default" onclick="cerrarPanelPedidos();">
                        <i class="material-icons" style="font-size:14px;line-height:1;">close</i>
                    </button>
                </div>
                <input type="text" id="filtroPanelPedidos" class="form-control" placeholder="Filtrar pedidos..." oninput="filtrarPanelPedidos();" style="margin-bottom:8px;">
                <div id="listaPanelPedidos" style="max-height:220px; overflow-y:auto; border:1px solid #cce5f7; border-radius:4px; padding:6px; background:#fff;"></div>
                <div style="margin-top:10px; text-align:right;">
                    <button class="btn btn-success btn-sm waves-effect" onclick="agregarPedidosMarcados();">
                        <i class="material-icons" style="font-size:14px;vertical-align:middle;">check</i> Agregar seleccionados
                    </button>
                </div>
            </div>
            <div class="row clearfix" id="rowPedidosPreSave" style="display:none; margin-bottom:8px;">
                <div class="col-sm-12">
                    <table class="table table-bordered table-condensed" style="margin-bottom:0;">
                        <thead style="background:#eaf4fb;">
                            <tr>
                                <th style="width:120px;">Pedido</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th style="width:50px;"></th>
                            </tr>
                        </thead>
                        <tbody id="tablePedidosPreSave">
                            <tr><td colspan="4" class="text-center text-muted">Sin pedidos seleccionados</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ─── ÓRDENES PRE-SAVE ─── -->
            <div class="row clearfix" style="margin-bottom:6px;">
                <div class="col-sm-12">
                    <label style="font-size:12px;color:#636e72;margin-bottom:4px;">Órdenes de Servicio</label><br>
                    <button id="btnAbrirPanelOrdenes" class="btn btn-info waves-effect" disabled onclick="abrirPanelOrdenes();">
                        <i class="material-icons" style="vertical-align:middle;">playlist_add</i> Agregar Órdenes
                    </button>
                </div>
            </div>
            <!-- Panel multi-select órdenes -->
            <div id="panelMultiOrdenes" style="display:none; border:1px solid #b2e0c8; border-radius:6px; padding:12px; margin-bottom:8px; background:#f5fff8;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="color:#27ae60;"><i class="material-icons" style="font-size:16px;vertical-align:middle;">build</i> Seleccionar Órdenes de Servicio</strong>
                    <button class="btn btn-xs btn-default" onclick="cerrarPanelOrdenes();">
                        <i class="material-icons" style="font-size:14px;line-height:1;">close</i>
                    </button>
                </div>
                <input type="text" id="filtroPanelOrdenes" class="form-control" placeholder="Filtrar órdenes..." oninput="filtrarPanelOrdenes();" style="margin-bottom:8px;">
                <div id="listaPanelOrdenes" style="max-height:220px; overflow-y:auto; border:1px solid #b2e0c8; border-radius:4px; padding:6px; background:#fff;"></div>
                <div style="margin-top:10px; text-align:right;">
                    <button class="btn btn-success btn-sm waves-effect" onclick="agregarOrdenesMarcadas();">
                        <i class="material-icons" style="font-size:14px;vertical-align:middle;">check</i> Agregar seleccionadas
                    </button>
                </div>
            </div>
            <div class="row clearfix" id="rowOrdenesPreSave" style="display:none; margin-bottom:8px;">
                <div class="col-sm-12">
                    <table class="table table-bordered table-condensed" style="margin-bottom:0;">
                        <thead style="background:#f0fbf4;">
                            <tr>
                                <th style="width:160px;">Orden</th>
                                <th>Estado</th>
                                <th>Cliente</th>
                                <th>Contrato</th>
                                <th style="width:50px;"></th>
                            </tr>
                        </thead>
                        <tbody id="tableOrdenesPreSave">
                            <tr><td colspan="5" class="text-center text-muted">Sin órdenes seleccionadas</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div><!-- /seccionPedidosOrdenes -->
        </div>

        <!-- ================= CLIENTE ================= -->
        <div class="section-box">
            <div class="section-title">Cliente</div>

            <div class="row clearfix">
                <div class="col-sm-2">
                    <label class="field-label">Nombre</label>
                    <input type="text" id="cli_nombre" class="form-control"
                           disabled onkeyup="buscarCliente();"
                           placeholder="Nombre">
                    <input type="hidden" id="clientes_id">
                    <div id="listaClientes" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Apellido</label>
                    <input type="text" id="cli_apellido" class="form-control"
                           disabled placeholder="Apellido">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">RUC</label>
                    <input type="text" id="cli_ruc" class="form-control"
                           disabled placeholder="RUC">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Dirección</label>
                    <input type="text" id="cli_direccion" class="form-control"
                           disabled placeholder="Dirección">
                </div>
            </div>

            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-4">
                    <label class="field-label">Teléfono</label>
                    <input type="text" id="cli_telefono" class="form-control"
                           disabled placeholder="Teléfono">
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Correo</label>
                    <input type="text" id="cli_correo" class="form-control"
                           disabled placeholder="Correo">
                </div>
            </div>
        </div>

        <!-- ================= BOTONES ================= -->
        <div class="btn-toolbar-left">
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
                <i class="material-icons">check_circle</i> Recibido
            </button>

            <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>

            <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>

            <button id="btnImprimir" class="btn btn-default" onclick="imprimir();" disabled>
                <i class="material-icons">print</i> Imprimir Factura
            </button>
        </div>

    </div>
</div>

                    <div class="card card-industrial" id="detalle" style="display:none">
                        <div class="header">
                            <h2>Detalles de Ventas</h2>
                        </div>
                        <div class="body">
                            <div id="formDetalles" style="display:none;">
                                <input type="hidden" id="txtOperacionDetalle" value="0"/>
                                <input type="hidden" id="det_tipo_impuesto_id"/>

                                <div class="section-box">
                                    <div class="section-title">Agregar / Editar Detalle</div>

                                    <!-- FILA 1: Depósito → Producto → Código → Stock -->
                                    <div class="row clearfix">
                                        <div class="col-sm-3">
                                            <label class="field-label">Depósito</label>
                                            <select class="form-control" id="deposito_id_det" disabled onchange="onDepositoChange();">
                                                <option value="">-- Depósito (seleccione primero) --</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4" style="position:relative;">
                                            <label class="field-label">Producto</label>
                                            <input type="text" id="item_descripcion" class="form-control" disabled
                                                   onkeyup="buscarProductos();"
                                                   placeholder="Buscar producto (requiere depósito)">
                                            <div id="listaProductos" style="display:none;"></div>
                                        </div>
                                        <div class="col-sm-2">
                                            <label class="field-label">Código</label>
                                            <input type="text" id="item_id" class="form-control" disabled placeholder="Cód.">
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="field-label">Stock Disponible</label>
                                            <input type="text" id="cantidad_stock" class="form-control" disabled placeholder="Stock disponible">
                                        </div>
                                    </div>

                                    <!-- FILA 2: Marca → Modelo → Cantidad → Precio -->
                                    <div class="row clearfix" style="margin-top:10px;">
                                        <div class="col-sm-3">
                                            <label class="field-label">Marca</label>
                                            <select class="form-control" id="marca_det" disabled>
                                                <option value="">-- Marca --</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="field-label">Modelo</label>
                                            <select class="form-control" id="modelo_det" disabled>
                                                <option value="">-- Modelo --</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="field-label">Cantidad</label>
                                            <input type="text" id="det_cantidad" class="form-control" disabled placeholder="Cantidad">
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="field-label">Precio</label>
                                            <input type="number" id="det_precio" class="form-control" disabled placeholder="Precio" min="0" step="1">
                                        </div>
                                    </div>

                                    <!-- BOTONES -->
                                    <div class="btn-toolbar-left" style="margin-top:24px;">
                                        <button id="btnAgregarDetalle"  class="btn btn-success waves-effect" onclick="agregarDetalle();"><i class="material-icons">add</i></button>
                                        <button id="btnEditarDetalle"   class="btn btn-warning waves-effect" onclick="editarDetalle();"><i class="material-icons">mode_edit</i></button>
                                        <button id="btnEliminarDetalle" class="btn btn-danger  waves-effect" onclick="eliminarDetalle();"><i class="material-icons">clear</i></button>
                                        <button id="btnGrabarDetalle"   class="btn btn-default waves-effect" onclick="grabarDetalle();"   style="display:none;"><i class="material-icons">save</i></button>
                                        <button id="btnCancelarDetalle" class="btn btn-warning waves-effect" onclick="cancelarDetalle();" style="display:none;"><i class="material-icons">close</i></button>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Producto</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Depósito</th>
                                            <th>Sub Total</th>
                                            <th>IVA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableDetalle">
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="8" class="text-right">Total Comprobante</th>
                                            <th class="text-right" id="txtTotalGral">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right">IVA 10%</th>
                                            <th class="text-right" id="txtIva10">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right">IVA 5%</th>
                                            <th class="text-right" id="txtIva5">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="8" class="text-right">Total IVA</th>
                                            <th class="text-right" id="txtTotalConImpuesto">0</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card card-industrial" id="registros">
                        <div class="header">
                            <h2>Registros de Ventas</h2>
                        </div>
                        <div class="body">
                            <!-- Filtro por período -->
                            <div class="row" style="margin-bottom:12px; align-items:flex-end; display:flex; gap:8px; flex-wrap:wrap;">
                                <div>
                                    <label style="font-size:12px; font-weight:600; color:#555;">Desde</label>
                                    <input type="date" id="filtro_desde" class="form-control" style="width:150px;">
                                </div>
                                <div>
                                    <label style="font-size:12px; font-weight:600; color:#555;">Hasta</label>
                                    <input type="date" id="filtro_hasta" class="form-control" style="width:150px;">
                                </div>
                                <div style="padding-top:18px;">
                                    <button class="btn btn-primary waves-effect" onclick="listar();">
                                        <i class="material-icons" style="font-size:16px; vertical-align:middle;">search</i> Filtrar
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nro. Factura</th>
                                            <th>Intervalo de fecha Vencimiento</th>
                                            <th>Fecha</th>
                                            <th>Pedido de Ventas</th>
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
                                            <th>Nro. Factura</th>
                                            <th>Intervalo de fecha Vencimiento</th>
                                            <th>Fecha</th>
                                            <th>Pedido de Ventas</th>
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
    <script src="../../js/admin.js?v=3"></script>
    <script src="../../js/demo.js"></script>

    <!-- Ruta Js (la url del backend o del api rest) -->
    <script src="../../js/ruta.js"></script>

    <script src="metodos.js?v=3"></script>
    

                                <script>
                                // Función para habilitar/deshabilitar campos según la condición de pago seleccionada
                                function controlarCamposPago() {
                                    var condicion = document.getElementById('condicion_pago').value;
                                    var cuota = document.getElementById('vent_cant_cuota');
                                    var intervaloFechaVence = document.getElementById('vent_intervalo_fecha_vence');

                                    if (condicion === 'CONTADO') {
                                        cuota.disabled = true;
                                        intervaloFechaVence.disabled = true;
                                        intervaloFechaVence.value = '';
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
</body>

</html>

