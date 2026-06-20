<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Insumos Utilizados</title>
    <link rel="icon" href="../../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet">
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet">
    <link href="../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet">
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../css/style.css" rel="stylesheet">
    <link href="../../css/themes/all-themes.css" rel="stylesheet">
</head>
<body class="theme-red">

<?php require_once('../../opciones.php'); ?>

<section class="content">
<div class="container-fluid">
<div class="row clearfix">
<div class="col-md-12">

<!-- ===== CABECERA ===== -->
<div class="card card-industrial">
<div class="header">
    <h2>
        <i class="material-icons">build</i>
        Insumos Utilizados
        <small>Registro de materiales utilizados por Orden de Servicio</small>
    </h2>
</div>
<div class="body">

    <!-- CAMPOS OCULTOS -->
    <input type="hidden" id="txtOperacion" value="0">
    <input type="hidden" id="ins_cab_id">
    <input type="hidden" id="ins_cab_estado" value="">
    <input type="hidden" id="orden_serv_cab_id">
    <input type="hidden" id="empresa_id">
    <input type="hidden" id="sucursal_id">
    <input type="hidden" id="clientes_id">

    <!-- ===== FILA 1: CÓDIGO / EMPRESA / SUCURSAL / FECHA REGISTRO ===== -->
    <div class="section-box">
        <div class="section-title">Datos del Registro</div>
        <div class="row clearfix">
            <div class="col-sm-1">
                <label style="font-size:12px;color:#636e72;">Código</label>
                <input type="text" id="ins_cab_id_display" class="form-control" disabled placeholder="Cód.">
            </div>
            <div class="col-sm-3">
                <label style="font-size:12px;color:#636e72;">Empresa</label>
                <input type="text" id="emp_razon_social" class="form-control" disabled placeholder="Empresa">
            </div>
            <div class="col-sm-3">
                <label style="font-size:12px;color:#636e72;">Sucursal</label>
                <input type="text" id="suc_razon_social" class="form-control" disabled placeholder="Sucursal">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Fecha Registro <span class="text-danger">*</span></label>
                <div class="form-line">
                    <input type="text" id="ins_cab_fecha_registro" class="form-control datetimepicker-date" disabled
                           placeholder="AAAA-MM-DD">
                </div>
            </div>
        </div>
    </div>

    <!-- ===== FILA 2: FECHA OS / BUSCAR OS ===== -->
    <div class="section-box">
        <div class="section-title">Orden de Servicio</div>
        <div class="row clearfix">
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Fecha OS</label>
                <input type="text" id="ord_serv_fecha" class="form-control" disabled placeholder="Fecha OS">
            </div>
            <div class="col-sm-5" style="position:relative;">
                <label style="font-size:12px;color:#636e72;">Buscar Orden de Servicio</label>
                <input type="text" id="buscar_os" class="form-control" disabled
                       placeholder="Número, cliente o equipo..."
                       onkeyup="buscarOS();">
                <div id="listaOS" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
            </div>
        </div>
    </div>

    <!-- ===== FILA 3: DATOS CLIENTE / VEHÍCULO ===== -->
    <div class="section-box">
        <div class="section-title">Datos del Cliente y Vehículo</div>
        <div class="row clearfix">
            <div class="col-sm-3">
                <label style="font-size:12px;color:#636e72;">Cliente</label>
                <input type="text" id="ord_cliente" class="form-control" disabled placeholder="Cliente">
            </div>
            <div class="col-sm-3">
                <label style="font-size:12px;color:#636e72;">Equipo de Trabajo</label>
                <input type="text" id="ord_equipo" class="form-control" disabled placeholder="Equipo">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Marca Vehículo</label>
                <input type="text" id="ord_marca" class="form-control" disabled placeholder="Marca">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Modelo Vehículo</label>
                <input type="text" id="ord_modelo" class="form-control" disabled placeholder="Modelo">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Nº de Chasis</label>
                <input type="text" id="ord_num_chasis" class="form-control" disabled placeholder="Nº de Chasis">
            </div>
        </div>
    </div>

    <!-- ===== BOTONES CABECERA ===== -->
    <div class="btn-toolbar-left text-center">
        <button id="btnAgregar"   class="btn btn-success waves-effect" onclick="agregar();">
            <i class="material-icons">add</i> Agregar
        </button>
        <button id="btnEditar"    class="btn btn-primary waves-effect" onclick="editar();" disabled>
            <i class="material-icons">edit</i> Modificar
        </button>
        <button id="btnAnular"    class="btn btn-danger waves-effect"  onclick="anular();" disabled>
            <i class="material-icons">delete</i> Anular
        </button>
        <button id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmarCab();" disabled>
            <i class="material-icons">check_circle</i> Confirmar
        </button>
        <button id="btnGrabar"    class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>
            <i class="material-icons">save</i> Grabar
        </button>
        <button id="btnCancelar"  class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
            <i class="material-icons">close</i> Cancelar
        </button>
    </div>

</div>
</div>

<!-- ===== DETALLE ===== -->
<div class="card card-industrial" id="cardDetalle" style="display:none;">
<div class="header">
    <h2><i class="material-icons">playlist_add</i> Ítems Utilizados</h2>
</div>
<div class="body">

    <!-- CAMPOS OCULTOS DETALLE -->
    <input type="hidden" id="txtOperacionDet" value="0">
    <input type="hidden" id="det_id">
    <input type="hidden" id="item_id">
    <input type="hidden" id="tipo_impuesto_id">

    <!-- FORMULARIO DETALLE -->
    <div class="section-box" id="formDetalle" style="display:none;">
        <div class="section-title">Agregar / Editar Ítem</div>
        <div class="row clearfix">
            <div class="col-sm-1">
                <label style="font-size:12px;color:#636e72;">Código</label>
                <input type="text" id="item_id_display" class="form-control" disabled placeholder="Cód.">
            </div>
            <div class="col-sm-4" style="position:relative;">
                <label style="font-size:12px;color:#636e72;">Ítem (insumo / repuesto)</label>
                <input type="text" id="buscar_item" class="form-control" disabled
                       placeholder="Buscar por descripción..."
                       onkeyup="buscarItem();">
                <div id="listaItems" style="display:none; position:absolute; z-index:2000; width:100%;"></div>
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Impuesto</label>
                <input type="text" id="tipo_imp_nom" class="form-control" disabled placeholder="Impuesto">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Cantidad</label>
                <input type="number" id="ins_det_cantidad" class="form-control" disabled
                       placeholder="0" min="0.01" step="0.01">
            </div>
            <div class="col-sm-2">
                <label style="font-size:12px;color:#636e72;">Costo Unit.</label>
                <input type="number" id="ins_det_costo" class="form-control" disabled
                       placeholder="0" min="0" step="1">
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
            <button id="btnAgregarDet"   class="btn btn-success waves-effect" onclick="agregarDet();">
                <i class="material-icons">add</i>
            </button>
            <button id="btnEditarDet"    class="btn btn-warning waves-effect" onclick="editarDet();">
                <i class="material-icons">edit</i>
            </button>
            <button id="btnEliminarDet"  class="btn btn-danger waves-effect"  onclick="eliminarDet();">
                <i class="material-icons">clear</i>
            </button>
            <button id="btnGrabarDet"    class="btn btn-default waves-effect" onclick="grabarDet();" style="display:none;">
                <i class="material-icons">save</i>
            </button>
            <button id="btnCancelarDet"  class="btn btn-warning waves-effect" onclick="cancelarDet();" style="display:none;">
                <i class="material-icons">close</i>
            </button>
        </div>
    </div>

    <!-- TABLA DETALLE -->
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Ítem</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Impuesto</th>
                    <th class="text-right">Cantidad</th>
                    <th class="text-right">Costo Unit.</th>
                    <th class="text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody id="tableDetalle">
                <tr><td colspan="8" class="text-center text-muted">Sin ítems registrados</td></tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="7" class="text-right">Total:</th>
                    <th class="text-right" id="txtTotalDet">0,00</th>
                </tr>
            </tfoot>
        </table>
    </div>

</div>
</div>

<!-- ===== REGISTROS ===== -->
<div class="card card-industrial" id="cardRegistros">
<div class="header">
    <h2><i class="material-icons">list</i> Registros de Insumos Utilizados</h2>
</div>
<div class="body">
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover dataTable js-exportable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Orden Nº</th>
                    <th>Fecha OS</th>
                    <th>Fecha Registro</th>
                    <th>Cliente</th>
                    <th>Equipo</th>
                    <th>Vehículo</th>
                    <th>Empresa</th>
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

<script src="../../plugins/jquery/jquery.min.js"></script>
<script src="../../plugins/bootstrap/js/bootstrap.js"></script>
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
<script src="metodos.js?v=5"></script>
</body>
</html>

