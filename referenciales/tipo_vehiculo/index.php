<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Tipo de Vehículo</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Plugins -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- AdminBSB -->
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ================= FORMULARIO CABECERA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">directions_car</i>
            Tipo de Vehículo
            <small>Gestión de Tipo de Vehículo</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtOperacion" value="0">
        <input type="hidden" id="tip_veh_estado" value="activo"/>

        <!-- DATOS GENERALES -->
        <div class="section-box">
            <div class="section-title">Datos Generales</div>
            <div class="row clearfix">

                <div class="col-sm-2">
                    <label class="field-label">Código</label>
                    <input type="text" id="txtCodigo" class="form-control" disabled placeholder="Código">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Uso</label>
                    <select id="tv_uso" class="form-control" disabled onchange="cambiarUso(this.value);">
                        <option value="SERVICIO">Servicio</option>
                        <option value="EMPRESA">Empresa</option>
                    </select>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Nombre del Tipo</label>
                    <input type="text" id="tip_veh_nombre" class="form-control" disabled placeholder="Nombre del Tipo">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Capacidad (asientos)</label>
                    <input type="text" id="tip_veh_capacidad" class="form-control" disabled placeholder="Capacidad (asientos)">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Combustible</label>
                    <input type="text" id="tip_veh_combustible" class="form-control" disabled placeholder="Combustible">
                </div>

                <div class="col-sm-2">
                    <label class="field-label">Categoría</label>
                    <input type="text" id="tip_veh_categoria" class="form-control" disabled placeholder="Categoría">
                </div>

                <div class="col-sm-5">
                    <label class="field-label">Observaciones</label>
                    <input type="text" id="tip_veh_observacion" class="form-control" disabled placeholder="Observaciones">
                </div>

                <div class="col-sm-2" id="col_tv_anio" style="display:none;">
                    <label class="field-label">Año</label>
                    <input type="number" id="tv_anio" class="form-control" disabled min="1900" max="2100" placeholder="Año">
                </div>

                <div class="col-sm-3" id="col_tv_color" style="display:none;">
                    <label class="field-label">Color</label>
                    <input type="text" id="tv_color" class="form-control" disabled placeholder="Color">
                </div>

            </div>
        </div>

        <!-- MARCA Y MODELO -->
        <div class="section-box">
            <div class="section-title">Marca y Modelo</div>
            <div class="row clearfix">

                <div class="col-sm-4">
                    <label class="field-label">Marca</label>
                    <input type="text" id="mar_nom" class="form-control" disabled onkeyup="buscarMarcas();" placeholder="Marca">
                    <input type="hidden" id="marca_id">
                    <div id="listaMarcas" style="display:none;"></div>
                </div>

                <div class="col-sm-4">
                    <label class="field-label">Modelo</label>
                    <input type="text" id="modelo_nom" class="form-control" disabled onkeyup="buscarModelo();" placeholder="Modelo">
                    <input type="hidden" id="modelo_id">
                    <div id="listaModelos" style="display:none;"></div>
                </div>

                <input type="hidden" id="modelo_año">

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
            <button id="btnEstado" class="btn btn-danger waves-effect" onclick="confirmarCambioEstado();" disabled>
                <i class="material-icons">block</i> <span id="lblEstado">Desactivar</span>
            </button>
            <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                <i class="material-icons">close</i> Cancelar
            </button>
        </div>

    </div>
</div>

<!-- ================= DETALLE VEHÍCULOS DE EMPRESA ================= -->
<div class="card card-industrial" id="cardDetalle" style="display:none;">
    <div class="header">
        <h2>
            <i class="material-icons">commute</i>
            Vehículos de la Empresa
            <small>Registros individuales de este tipo de vehículo</small>
        </h2>
    </div>

    <div class="body">

        <input type="hidden" id="txtDetOperacion" value="0">
        <input type="hidden" id="txtDetId" value="0">

        <!-- FORM DETALLE -->
        <div id="formDetalle" style="display:none;">
            <div class="section-box" style="border-left: 4px solid #2980b9;">
                <div class="section-title" style="color:#2980b9;">Datos del Vehículo</div>
                <div class="row clearfix">

                    <div class="col-sm-3">
                        <label class="field-label">Placa</label>
                        <input type="text" id="tv_det_placa" class="form-control" placeholder="Placa">
                    </div>

                    <div class="col-sm-4">
                        <label class="field-label">Nro. Chasis</label>
                        <input type="text" id="tv_det_num_chasis" class="form-control" placeholder="Nro. Chasis">
                    </div>

                    <div class="col-sm-4">
                        <label class="field-label">Nro. Motor</label>
                        <input type="text" id="tv_det_num_motor" class="form-control" placeholder="Nro. Motor">
                    </div>

                </div>
            </div>

            <div class="btn-toolbar-left" style="margin-bottom:15px;">
                <button class="btn btn-default waves-effect" onclick="grabarDetalle();">
                    <i class="material-icons">save</i> Grabar Vehículo
                </button>
                <button id="btnCancelarDetalle" class="btn btn-warning waves-effect" onclick="cancelarDetalle();">
                    <i class="material-icons">close</i> Cancelar
                </button>
            </div>
        </div>

        <!-- BOTÓN AGREGAR VEHÍCULO -->
        <button id="btnAgregarDetalle" class="btn btn-success waves-effect" onclick="agregarDetalle();" style="margin-bottom:10px;">
            <i class="material-icons">add</i> Agregar Vehículo
        </button>

        <!-- TABLA DETALLES -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Placa</th>
                        <th>Nro. Chasis</th>
                        <th>Nro. Motor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tableBodyDet"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Placa</th>
                        <th>Nro. Chasis</th>
                        <th>Nro. Motor</th>
                        <th>Acciones</th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>
</div>

<!-- ================= TABLA PRINCIPAL ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">list_alt</i>
            Registros de Tipo de Vehículo
        </h2>
    </div>

    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Uso</th>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Combustible</th>
                        <th>Categoría</th>
                        <th>Observación</th>
                        <th>Año</th>
                        <th>Color</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Uso</th>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Combustible</th>
                        <th>Categoría</th>
                        <th>Observación</th>
                        <th>Año</th>
                        <th>Color</th>
                        <th>Marca</th>
                        <th>Modelo</th>
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

<script src="../../js/admin.js?v=3"></script>
<script src="../../js/demo.js"></script>
<script src="../../js/ruta.js"></script>
<script src="metodos.js?v=5"></script>

</body>
</html>

