<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI NOTA DE REMISIÓN</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ================= CABECERA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">local_shipping</i>
            Nota de Remisión
            <small>Recepción de proveedor y transferencia entre sucursales</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="funcionario_id">
        <input type="hidden" id="nota_remi_estado" value="PENDIENTE">

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">

                <div class="col-sm-1">
                    <label class="field-label">Código</label>
                    <input type="text" id="id" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Empresa</label>
                    <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
                    <input type="hidden" id="empresa_id">
                </div>

                <!-- Sucursal Origen -->
                <div class="col-sm-2">
                    <label class="field-label">Sucursal Origen</label>
                    <input type="text" id="suc_razon_social" class="form-control" disabled
                           onkeyup="buscarSucursal();" placeholder="Sucursal">
                    <input type="hidden" id="sucursal_id">
                    <div id="listaSucursal" style="display:none;"></div>
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Fecha</label>
                    <input type="text" id="nota_remi_fecha" class="datetimepicker form-control" disabled placeholder="Fecha">
                    <small id="avisoFechaRemi" style="color:#e74c3c;display:none;"></small>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Observaciones</label>
                    <input type="text" id="nota_remi_observaciones" class="form-control" disabled placeholder="Observaciones">
                </div>

            </div>

            <!-- TIPO: PROVEEDOR / TRANSFERENCIA -->
            <div class="row clearfix" style="margin-top:10px;">
                <div class="col-sm-12">
                    <label style="font-size:12px;font-weight:700;text-transform:uppercase;color:#2d3436;margin-right:10px;">Tipo:</label>
                    <div class="btn-group" id="grupoBtnTipo">
                        <button type="button" id="btnTipoProveedor"
                                class="btn btn-primary waves-effect active"
                                onclick="setTipo('PROVEEDOR');" disabled>
                            <i class="material-icons" style="font-size:16px;vertical-align:middle;">business</i>
                            Proveedor
                        </button>
                        <button type="button" id="btnTipoTransferencia"
                                class="btn btn-default waves-effect"
                                onclick="setTipo('TRANSFERENCIA');" disabled>
                            <i class="material-icons" style="font-size:16px;vertical-align:middle;">swap_horiz</i>
                            Transferencia
                        </button>
                    </div>
                    <input type="hidden" id="tipo" value="PROVEEDOR">
                </div>
            </div>

            <!-- SECCIÓN PROVEEDOR: chofer y vehículo (visible por defecto) -->
            <div id="seccionProveedor" style="margin-top:10px;">

                <!-- Proveedor -->
                <div class="row clearfix">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2980b9;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">store</i>
                            Proveedor
                        </label>
                    </div>
                    <div class="col-sm-4">
                        <label class="field-label">Razón Social</label>
                        <input type="text" id="prov_razonsocial" class="form-control" disabled
                               onkeyup="buscarProveedores();" placeholder="Razón Social del Proveedor">
                        <input type="hidden" id="proveedor_id">
                        <div id="listaProveedores" style="display:none;"></div>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">RUC</label>
                        <input type="text" id="prov_ruc" class="form-control" disabled placeholder="RUC">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Teléfono</label>
                        <input type="text" id="prov_telefono" class="form-control" disabled placeholder="Teléfono">
                    </div>
                    <div class="col-sm-3">
                        <label class="field-label">Nro. Nota</label>
                        <input type="text" id="nota_remi_nro" class="form-control" disabled
                               placeholder="000-000-0000000" maxlength="15"
                               oninput="this.value=this.value.replace(/\D/g,'').slice(0,13); autoFormatoNroNota(this);">
                        <small id="avisoNroNota" style="color:#e74c3c;display:none;"></small>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Fecha Emisión</label>
                        <input type="text" id="nota_remi_fecha_emision" class="form-control" disabled
                               placeholder="DD/MM/YYYY" maxlength="10"
                               oninput="mascararFecha(this); validarFechaEmision();">
                        <small id="avisoFechaEmision" style="color:#e74c3c;display:none;"></small>
                    </div>
                </div>

                <div class="row clearfix" style="margin-top:10px;">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2980b9;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">person</i>
                            Datos del Chofer
                        </label>
                    </div>
                    <div class="col-sm-4">
                        <label class="field-label">Nombre</label>
                        <input type="text" id="chofer_nombre" class="form-control" disabled placeholder="Nombre completo del chofer">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">CI</label>
                        <input type="text" id="chofer_documento" class="form-control" disabled
                               placeholder="CI (6-8 dígitos)" maxlength="8"
                               oninput="this.value=this.value.replace(/\D/g,''); validarCI();">
                        <small id="avisoCI" style="color:#e74c3c;display:none;"></small>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Teléfono</label>
                        <input type="text" id="chofer_telefono" class="form-control" disabled
                               placeholder="09XXXXXXXX" maxlength="10"
                               oninput="this.value=this.value.replace(/\D/g,''); validarTelefono();">
                        <small id="avisoTelefono" style="color:#e74c3c;display:none;"></small>
                    </div>
                </div>

                <div class="row clearfix" style="margin-top:8px;">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2980b9;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">directions_car</i>
                            Datos del Vehículo
                        </label>
                    </div>
                    <div class="col-sm-3">
                        <label class="field-label">Tipo de Vehículo</label>
                        <select id="tipo_vehiculo" class="form-control" disabled onchange="cambiarTipoVehiculo();">
                            <option value="">-- Tipo de Vehículo --</option>
                            <option value="AUTOMOVIL">Automóvil / Camioneta</option>
                            <option value="MOTOCICLETA">Motocicleta</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Matrícula</label>
                        <input type="text" id="vehiculo_matricula" class="form-control" disabled
                               placeholder="Matrícula" maxlength="10"
                               oninput="this.value=this.value.toUpperCase(); validarMatricula();">
                        <small id="avisoMatricula" style="color:#e74c3c;display:none;"></small>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Modelo</label>
                        <input type="text" id="vehiculo_modelo" class="form-control" disabled placeholder="Modelo">
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Color</label>
                        <input type="text" id="vehiculo_color" class="form-control" disabled placeholder="Color">
                    </div>
                    <div class="col-sm-1">
                        <label class="field-label">Año</label>
                        <input type="text" id="vehiculo_anio" class="form-control" disabled placeholder="Año"
                               maxlength="4" oninput="validarAnio();">
                        <small id="avisoAnio" style="color:#e74c3c;display:none;"></small>
                    </div>
                    <div class="col-sm-2">
                        <label class="field-label">Nro. Vehículo</label>
                        <input type="text" id="vehiculo_nro" class="form-control" disabled placeholder="Nro. Vehículo">
                    </div>
                </div>
            </div>

            <!-- SECCIÓN TRANSFERENCIA (oculta por defecto) -->
            <div id="seccionTransferencia" style="display:none; margin-top:10px;">

                <!-- Sucursal Destino -->
                <div class="row clearfix">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#e74c3c;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">arrow_forward</i>
                            Sucursal Destino
                        </label>
                    </div>
                    <div class="col-sm-3" style="position:relative;">
                        <input type="text" id="suc_destino_razon_social" class="form-control" disabled
                               onkeyup="buscarSucursalDestino();" placeholder="Sucursal Destino">
                        <input type="hidden" id="sucursal_destino_id">
                        <div id="listaSucursalDestino" style="display:none;"></div>
                    </div>
                </div>

                <!-- Conductor y Vehículo -->
                <div class="row clearfix" style="margin-top:10px;">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#e74c3c;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">person_pin</i>
                            Conductor y Vehículo
                        </label>
                    </div>

                    <!-- Conductor -->
                    <div class="col-sm-4" style="position:relative;">
                        <input type="text" id="conductor_nombre" class="form-control" disabled
                               onkeyup="buscarConductor();" placeholder="Buscar conductor (funcionario)...">
                        <input type="hidden" id="conductor_id">
                        <div id="listaConductor" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="conductor_ci" class="form-control" disabled placeholder="CI conductor">
                    </div>

                    <!-- Vehículo -->
                    <div class="col-sm-3" style="position:relative;">
                        <input type="text" id="tvd_buscar" class="form-control" disabled
                               onkeyup="buscarVehiculo();" placeholder="Buscar vehículo (placa/marca)...">
                        <input type="hidden" id="tipo_vehiculo_det_id">
                        <div id="listaVehiculo" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
                    </div>
                </div>

                <!-- Datos del vehículo seleccionado (readonly) -->
                <div class="row clearfix" style="margin-top:6px;" id="filaVehiculoInfo">
                    <div class="col-sm-2">
                        <input type="text" id="tvd_marca" class="form-control" disabled placeholder="Marca">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tvd_modelo" class="form-control" disabled placeholder="Modelo">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tvd_placa" class="form-control" disabled placeholder="Placa">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tvd_chasis" class="form-control" disabled placeholder="Nº Chasis">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tvd_motor" class="form-control" disabled placeholder="Nº Motor">
                    </div>
                </div>

                <!-- Timbrado Nota de Remisión -->
                <div class="row clearfix" style="margin-top:8px;" id="filaTimbradoRemi">
                    <div class="col-sm-12">
                        <label style="font-size:11px;font-weight:700;text-transform:uppercase;color:#e74c3c;">
                            <i class="material-icons" style="font-size:14px;vertical-align:middle;">receipt</i>
                            Timbrado
                        </label>
                    </div>
                    <input type="hidden" id="timbrado_id_remi">
                    <div class="col-sm-2">
                        <input type="text" id="tim_numero_remi" class="form-control" disabled placeholder="Nro. Timbrado">
                    </div>
                    <div class="col-sm-3">
                        <input type="text" id="nota_remi_nro_preview" class="form-control" disabled placeholder="Próximo número">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" id="tim_vence_remi" class="form-control" disabled placeholder="Vence">
                    </div>
                </div>
            </div>

        </div>

        <!-- BOTONES -->
        <div class="btn-toolbar-left">
            <button id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">
                <i class="material-icons">add</i> Agregar
            </button>
            <button id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>
                <i class="material-icons">edit</i> Modificar
            </button>
            <button id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();" disabled>
                <i class="material-icons">delete</i> Anular
            </button>
            <button id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>
                <i class="material-icons">check_circle</i> Confirmar
            </button>
            <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>
            <button id="btnImprimir" class="btn btn-info waves-effect" onclick="imprimirNota();" disabled style="display:none;">
                <i class="material-icons">print</i> Imprimir
            </button>
        </div>

    </div>
</div>

<!-- ================= DETALLE ================= -->
<div class="card card-industrial" id="detalle" style="display:none">
    <div class="header">
        <h2><i class="material-icons">list</i> Detalle de la Nota de Remisión</h2>
    </div>

    <div class="body">

        <div class="section-box" id="formDetalles" style="display:none;">
            <div class="section-title">Ítems</div>
            <input type="hidden" id="txtOperacionDetalle" value="0">
            <input type="hidden" id="stock_disponible_det" value="0">

            <div class="row clearfix">

                <div class="col-sm-1">
                    <label class="field-label">Cód.</label>
                    <input type="text" id="item_id" class="form-control" disabled placeholder="Cód">
                </div>

                <div class="col-sm-3">
                    <label class="field-label">Producto</label>
                    <input type="text" id="item_descripcion" class="form-control" disabled
                           onkeyup="buscarProductos();" placeholder="Buscar...">
                    <div id="listaProductos" style="display:none;"></div>
                </div>

                <div class="col-sm-1">
                    <label class="field-label">Cant.</label>
                    <input type="text" id="nota_remi_com_det_cantidad" class="form-control" disabled placeholder="0">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Marca</label>
                    <select class="form-control" id="marca_det_mm" disabled>
                        <option value="">-- Marca --</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label class="field-label">Modelo</label>
                    <select class="form-control" id="modelo_det_mm" disabled>
                        <option value="">-- Modelo --</option>
                    </select>
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Depósito</label>
                    <select class="form-control" id="deposito_id_det" disabled>
                        <option value="">-- Depósito --</option>
                    </select>
                </div>

                <!-- Solo visible para TRANSFERENCIA -->
                <div class="col-sm-2" id="colDepositoDestino" style="display:none;">
                    <label class="field-label">Depósito Destino</label>
                    <select class="form-control" id="deposito_destino_id_det" disabled>
                        <option value="">-- Depósito Destino --</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <button id="btnAgregarDetalle"  class="btn btn-success waves-effect" onclick="agregarDetalle();">
                        <i class="material-icons">add</i>
                    </button>
                    <button id="btnEditarDetalle"   class="btn btn-warning waves-effect" onclick="editarDetalle();">
                        <i class="material-icons">edit</i>
                    </button>
                    <button id="btnEliminarDetalle" class="btn btn-danger waves-effect" onclick="eliminarDetalle();">
                        <i class="material-icons">clear</i>
                    </button>
                    <button id="btnGrabarDetalle"   class="btn btn-default waves-effect" style="display:none;" onclick="grabarDetalle();">
                        <i class="material-icons">save</i>
                    </button>
                    <button id="btnCancelarDetalle" class="btn btn-warning waves-effect" style="display:none;" onclick="cancelarDetalle();">
                        <i class="material-icons">close</i>
                    </button>
                </div>

            </div>
        </div>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Depósito Origen</th>
                    <th id="thDepositoDestino" style="display:none;">Depósito Destino</th>
                </tr>
            </thead>
            <tbody id="tableDetalle"></tbody>
        </table>

    </div>
</div>

<!-- ================= REGISTROS ================= -->
<div class="card card-industrial" id="registros">
    <div class="header">
        <h2><i class="material-icons">list_alt</i> Registros de Notas de Remisión</h2>
    </div>
    <div class="body">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Tipo</th>
                    <th>Sucursal Origen</th>
                    <th>Sucursal Destino</th>
                    <th>Fecha</th>
                    <th>Observaciones</th>
                    <th>Encargado</th>
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
</section>

<!-- JS -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
<script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
<script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="../../plugins/node-waves/waves.js"></script>
<script src="../../plugins/sweetalert/sweetalert.min.js"></script>
<script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
<script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
<script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>
<script src="../../plugins/momentjs/moment.js"></script>
<script src="../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="../../js/marcaModelo.js"></script>
<script src="metodos.js?v=7"></script>

</body>
</html>

