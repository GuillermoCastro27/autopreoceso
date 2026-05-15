<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ITEMS</title>

    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ================= FORMULARIO ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2>
            <i class="material-icons">inventory_2</i>
            Mantener Items
            <small>CRUD de Items</small>
        </h2>
    </div>

    <div class="body">
        <input type="hidden" value="0" id="txtOperacion"/>

        <!-- DATOS PRINCIPALES -->
        <div class="section-box">
            <div class="section-title">Datos del Item</div>
            <div class="row clearfix">
                <div class="col-sm-1">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="id" class="form-control" disabled>
                            <label class="form-label">Código</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="item_decripcion" class="form-control" disabled>
                            <label class="form-label">Descripción</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PRECIOS -->
        <div class="section-box">
            <div class="section-title">Precios</div>
            <div class="row clearfix">
                <div class="col-sm-3">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="item_costo" class="form-control" disabled>
                            <label class="form-label">Costo</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="item_precio" class="form-control" disabled>
                            <label class="form-label">Precio</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CLASIFICACIÓN -->
        <div class="section-box">
            <div class="section-title">Clasificación</div>
            <div class="row clearfix">
                <div class="col-sm-4">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="tipo_descripcion" class="form-control" disabled onkeyup="buscarTipoItems();">
                            <label class="form-label">Tipo Item</label>
                        </div>
                        <input type="hidden" id="tipo_id">
                        <div id="listaTipoItems"></div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group form-float">
                        <div class="form-line">
                            <input type="text" id="tip_imp_nom" class="form-control" disabled onkeyup="buscarTipoImpuestos();">
                            <label class="form-label">Tipo Impuesto</label>
                        </div>
                        <input type="hidden" id="tipo_impuesto_id">
                        <div id="listaTipoImpuestos"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MARCAS -->
        <div class="section-box">
            <div class="section-title">Marcas del Item</div>
            <div class="row clearfix">
                <div class="col-sm-5">
                    <div class="pivot-search-wrap">
                        <input type="text" id="marc_nom_add" class="form-control" disabled
                               placeholder="Buscar marca..." onkeyup="buscarMarcaAdd();">
                        <div id="listaMarcasAdd"></div>
                    </div>
                    <input type="hidden" id="marca_add_id">
                </div>
                <div class="col-sm-2" style="padding-top:2px;">
                    <button type="button" id="btnAgregarMarca" class="btn btn-info btn-sm waves-effect" disabled onclick="agregarMarca();">
                        <i class="material-icons" style="font-size:16px;vertical-align:middle;">add</i> Agregar Marca
                    </button>
                </div>
            </div>
            <table class="table table-bordered table-condensed pivot-table">
                <thead><tr><th>Marca</th><th style="width:60px;">Quitar</th></tr></thead>
                <tbody id="bodyMarcas"><tr><td colspan="2" class="text-center text-muted">Sin marcas</td></tr></tbody>
            </table>
        </div>

        <!-- MODELOS -->
        <div class="section-box">
            <div class="section-title">Modelos del Item</div>
            <div class="row clearfix">
                <div class="col-sm-5">
                    <div class="pivot-search-wrap">
                        <input type="text" id="modelo_nom_add" class="form-control" disabled
                               placeholder="Buscar modelo..." onkeyup="buscarModeloAdd();">
                        <div id="listaModelosAdd"></div>
                    </div>
                    <input type="hidden" id="modelo_add_id">
                </div>
                <div class="col-sm-2" style="padding-top:2px;">
                    <button type="button" id="btnAgregarModelo" class="btn btn-info btn-sm waves-effect" disabled onclick="agregarModelo();">
                        <i class="material-icons" style="font-size:16px;vertical-align:middle;">add</i> Agregar Modelo
                    </button>
                </div>
            </div>
            <table class="table table-bordered table-condensed pivot-table">
                <thead><tr><th>Modelo</th><th style="width:60px;">Quitar</th></tr></thead>
                <tbody id="bodyModelos"><tr><td colspan="2" class="text-center text-muted">Sin modelos</td></tr></tbody>
            </table>
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
                <i class="material-icons">delete</i> Eliminar
            </button>
            <button id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
                <i class="material-icons">save</i> Grabar
            </button>
            <button id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();">
                <i class="material-icons">close</i> Cancelar
            </button>
        </div>

    </div>
</div>

<!-- ================= TABLA ================= -->
<div class="card card-industrial">
    <div class="header">
        <h2><i class="material-icons">list</i> Registros de Items</h2>
    </div>
    <div class="body">
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th>Precio</th>
                        <th>Tipo Item</th>
                        <th>Tipo Impuesto</th>
                        <th>Marcas</th>
                        <th>Modelos</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
                <tfoot>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th>Precio</th>
                        <th>Tipo Item</th>
                        <th>Tipo Impuesto</th>
                        <th>Marcas</th>
                        <th>Modelos</th>
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
<script src="metodos.js?v=2"></script>

</body>
</html>
