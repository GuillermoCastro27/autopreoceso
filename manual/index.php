<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Manuales del Sistema</title>
    <link rel="icon" href="../images.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../plugins/node-waves/waves.css" rel="stylesheet">
    <link href="../plugins/animate-css/animate.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet">
    <link href="../css/themes/all-themes.css" rel="stylesheet">
    <style>
        /* ── Pestañas ── */
        .nav-tabs-manual { border-bottom: 2px solid #e53935; margin-bottom: 24px; }
        .nav-tabs-manual > li > a {
            font-weight: 600; font-size: 14px; color: #555;
            border-radius: 0; border: none; padding: 12px 24px;
        }
        .nav-tabs-manual > li.active > a,
        .nav-tabs-manual > li > a:hover {
            color: #e53935; border-bottom: 3px solid #e53935; background: transparent;
        }

        /* ── Acordeón ── */
        .panel-manual { border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 8px; box-shadow: none; }
        .panel-manual .panel-heading {
            background: #fafafa; padding: 0; border-bottom: none;
        }
        .panel-manual .panel-title a {
            display: block; padding: 14px 18px; font-size: 14px; font-weight: 600;
            color: #333; text-decoration: none;
        }
        .panel-manual .panel-title a:hover { color: #e53935; }
        .panel-manual .panel-title a .material-icons {
            vertical-align: middle; margin-right: 8px; font-size: 20px; color: #e53935;
        }
        .panel-manual .panel-body { padding: 20px 24px; }

        /* ── Placeholder de captura ── */
        .screenshot-box {
            border: 2px dashed #bdbdbd; border-radius: 6px;
            background: #f5f5f5; padding: 28px 20px;
            text-align: center; margin: 14px 0; color: #9e9e9e;
        }
        .screenshot-box .material-icons { font-size: 40px; display: block; margin-bottom: 6px; }
        .screenshot-box p { margin: 0 0 4px; font-weight: 600; font-size: 13px; color: #757575; }
        .screenshot-box small { font-size: 11px; font-family: monospace; }
        .screenshot-box img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }

        /* ── Pasos ── */
        .steps-list { counter-reset: step-counter; list-style: none; padding-left: 0; }
        .steps-list li {
            counter-increment: step-counter; position: relative;
            padding: 8px 8px 8px 46px; margin-bottom: 6px;
            background: #fff; border-left: 3px solid #e53935; border-radius: 2px;
        }
        .steps-list li::before {
            content: counter(step-counter);
            position: absolute; left: 12px; top: 8px;
            background: #e53935; color: #fff; border-radius: 50%;
            width: 22px; height: 22px; line-height: 22px;
            text-align: center; font-size: 12px; font-weight: 700;
        }

        /* ── Sección de seguridad ── */
        .sec-block {
            background: #fff; border-left: 4px solid #e53935;
            padding: 16px 20px; margin-bottom: 16px; border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,.08);
        }
        .sec-block h4 { margin-top: 0; color: #e53935; font-weight: 700; }
        .sec-block code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px; }

        .badge-modulo { background: #e53935; color: #fff; font-size: 11px; border-radius: 3px; padding: 2px 7px; margin-left: 8px; }
        .alerta-seguridad { background: #fff8e1; border: 1px solid #ffe082; border-radius: 4px; padding: 12px 16px; margin-top: 10px; }
        .alerta-seguridad .material-icons { vertical-align: middle; color: #f9a825; margin-right: 6px; }
    </style>
</head>

<body class="theme-red">

    <?php require_once('../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                <i class="material-icons">menu_book</i>
                                Manuales del Sistema
                                <small>Manual de Usuario y Manual de Seguridad</small>
                            </h2>
                        </div>
                        <div class="body">

                            <!-- ════════════════ PESTAÑAS ════════════════ -->
                            <ul class="nav nav-tabs nav-tabs-manual" id="tabsManuales" role="tablist">
                                <li class="active">
                                    <a href="#tab-usuario" data-toggle="tab">
                                        <i class="material-icons" style="vertical-align:middle;margin-right:6px;font-size:18px;">person</i>
                                        Manual de Usuario
                                    </a>
                                </li>
                                <li>
                                    <a href="#tab-seguridad" data-toggle="tab">
                                        <i class="material-icons" style="vertical-align:middle;margin-right:6px;font-size:18px;">security</i>
                                        Manual de Seguridad
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">

                                <!-- ════════════════════════════════════════════════
                                     TAB 1 — MANUAL DE USUARIO
                                ════════════════════════════════════════════════ -->
                                <div class="tab-pane active" id="tab-usuario">

                                    <!-- ── 0. Introducción ── -->
                                    <div class="panel-group" id="accordionUsuario">

                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u0">
                                                        <i class="material-icons">info</i> 1. Introducción al Sistema
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u0" class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    <p>El sistema de gestión para talleres automotrices es una aplicación web desarrollada para administrar las operaciones de ventas, compras y servicios de un taller. Permite registrar y controlar facturación, cobros, órdenes de servicio, inventario y más desde un entorno centralizado.</p>
                                                    <p><strong>Tecnología:</strong> Aplicación web accesible desde cualquier navegador moderno (Chrome, Firefox, Edge). No requiere instalación en el equipo del usuario.</p>
                                                    <p><strong>Módulos disponibles:</strong></p>
                                                    <ul>
                                                        <li><strong>Referenciales</strong> — Clientes, proveedores, artículos, empresas y más</li>
                                                        <li><strong>Compras</strong> — Pedidos, órdenes, compras, ajuste de inventario</li>
                                                        <li><strong>Servicio</strong> — Órdenes de servicio, reclamos, insumos</li>
                                                        <li><strong>Ventas y Cobros</strong> — Facturas, cobros, notas de crédito/débito, remisiones, caja</li>
                                                    </ul>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel de control — parte superior (KPIs y gráfico de ventas)</p>
                                                        <small>img/dashboard_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel de control — parte inferior (gráficos comparativos)</p>
                                                        <small>img/dashboard_2.png</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- ── 1. Acceso ── -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u1" class="collapsed">
                                                        <i class="material-icons">login</i> 2. Acceso al Sistema
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u1" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <h4>2.1 Iniciar sesión</h4>
                                                    <ol class="steps-list">
                                                        <li>Abrir el navegador e ingresar la dirección del sistema.</li>
                                                        <li>Ingresar el nombre de usuario y la contraseña en la pantalla de inicio.</li>
                                                        <li>Presionar el botón <strong>INGRESAR</strong>.</li>
                                                        <li>Si los datos son correctos, el sistema redirige al menú principal.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de inicio de sesión</p>
                                                        <small>img/login.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Menú principal después del inicio de sesión</p>
                                                        <small>img/menu_principal.png</small>
                                                    </div>
                                                    <h4>2.2 Cerrar sesión</h4>
                                                    <ol class="steps-list">
                                                        <li>Hacer clic en el nombre del usuario en la esquina superior derecha.</li>
                                                        <li>Seleccionar la opción <strong>Cerrar Sesión</strong>.</li>
                                                        <li>El sistema regresa a la pantalla de inicio.</li>
                                                    </ol>
                                                    <p class="alerta-seguridad">
                                                        <i class="material-icons">warning</i>
                                                        <strong>Importante:</strong> Siempre cerrar sesión al terminar de usar el sistema, especialmente en equipos compartidos.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ REFERENCIALES ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u3ref" class="collapsed">
                                                        <i class="material-icons">list_alt</i> 3. Referenciales
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u3ref" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Los referenciales son las tablas de configuración del sistema. Se acceden desde el menú <em>Mantenimiento → Referenciales</em> y se gestionan con las operaciones estándar (Agregar, Editar, Eliminar). Deben cargarse antes de empezar a operar el sistema.</p>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Menú lateral — sección Referenciales</p>
                                                        <small>img/referenciales/menu.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Referencial Ítems/Artículos — parte superior (datos generales)</p>
                                                        <small>img/referenciales/items_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Referencial Ítems/Artículos — parte inferior (precios y stock)</p>
                                                        <small>img/referenciales/items_2.png</small>
                                                    </div>

                                                    <h4>3.1 Referenciales de Compras</h4>
                                                    <table class="table table-bordered table-striped table-condensed">
                                                        <thead><tr><th>Referencial</th><th>Descripción</th></tr></thead>
                                                        <tbody>
                                                            <tr><td><strong>Proveedores</strong></td><td>Empresas o personas que suministran mercadería al taller</td></tr>
                                                            <tr><td><strong>Ítems / Artículos</strong></td><td>Repuestos, materiales, lubricantes y servicios que se compran y venden</td></tr>
                                                            <tr><td><strong>Motivo de Ajuste</strong></td><td>Causas válidas para realizar ajustes de inventario (merma, sobrante, devolución, etc.)</td></tr>
                                                            <tr><td><strong>Tipo de Ítem</strong></td><td>Clasificación de los artículos (repuesto, insumo, servicio, etc.)</td></tr>
                                                            <tr><td><strong>Tipo de Impuesto</strong></td><td>Tasas impositivas aplicables (IVA 10%, IVA 5%, Exento)</td></tr>
                                                            <tr><td><strong>Marca</strong></td><td>Marcas de los artículos o vehículos (Toyota, Ford, Bosch, etc.)</td></tr>
                                                            <tr><td><strong>Modelo</strong></td><td>Modelos específicos asociados a cada marca</td></tr>
                                                        </tbody>
                                                    </table>

                                                    <h4>3.2 Referenciales de Servicio</h4>
                                                    <table class="table table-bordered table-striped table-condensed">
                                                        <thead><tr><th>Referencial</th><th>Descripción</th></tr></thead>
                                                        <tbody>
                                                            <tr><td><strong>Tipo de Servicio</strong></td><td>Categorías de servicios ofrecidos (mantenimiento, reparación, pintura, etc.)</td></tr>
                                                            <tr><td><strong>Tipo de Promoción</strong></td><td>Clasificaciones de las promociones (descuento porcentual, precio fijo, etc.)</td></tr>
                                                            <tr><td><strong>Tipo de Descuento</strong></td><td>Modalidades de descuento aplicables a clientes o servicios</td></tr>
                                                            <tr><td><strong>Tipo de Diagnóstico</strong></td><td>Categorías de diagnóstico técnico (eléctrico, mecánico, carrocería, etc.)</td></tr>
                                                            <tr><td><strong>Equipo de Trabajo</strong></td><td>Grupos o cuadrillas de técnicos asignables a órdenes de servicio</td></tr>
                                                            <tr><td><strong>Tipo de Vehículo</strong></td><td>Categorías de vehículos atendidos (auto, camioneta, moto, camión, etc.)</td></tr>
                                                            <tr><td><strong>Tipo de Contrato</strong></td><td>Modalidades de contratos de servicio (mantenimiento anual, semestral, etc.)</td></tr>
                                                        </tbody>
                                                    </table>

                                                    <h4>3.3 Referenciales de Ventas y Cobros</h4>
                                                    <table class="table table-bordered table-striped table-condensed">
                                                        <thead><tr><th>Referencial</th><th>Descripción</th></tr></thead>
                                                        <tbody>
                                                            <tr><td><strong>Clientes</strong></td><td>Personas o empresas que adquieren productos o servicios del taller</td></tr>
                                                            <tr><td><strong>Caja</strong></td><td>Puntos de cobro habilitados en el taller</td></tr>
                                                            <tr><td><strong>Entidad Emisora</strong></td><td>Bancos o entidades que emiten cheques o tarjetas</td></tr>
                                                            <tr><td><strong>Marca de Tarjeta</strong></td><td>Marcas de tarjetas de crédito/débito aceptadas (Visa, Mastercard, etc.)</td></tr>
                                                            <tr><td><strong>Forma de Cobro</strong></td><td>Medios de pago habilitados (efectivo, tarjeta, cheque, transferencia)</td></tr>
                                                            <tr><td><strong>Entidad Adherida</strong></td><td>Entidades bancarias o financieras adheridas al sistema de cobros</td></tr>
                                                            <tr><td><strong>Tipo Comprobante</strong></td><td>Tipos de documentos fiscales emitidos (factura, nota de crédito, etc.)</td></tr>
                                                            <tr><td><strong>Timbrado</strong></td><td>Autorización de la DNIT para emitir comprobantes fiscales (con número y vigencia)</td></tr>
                                                        </tbody>
                                                    </table>

                                                    <h4>3.4 Referenciales Varios</h4>
                                                    <table class="table table-bordered table-striped table-condensed">
                                                        <thead><tr><th>Referencial</th><th>Descripción</th></tr></thead>
                                                        <tbody>
                                                            <tr><td><strong>Funcionarios</strong></td><td>Empleados del taller: técnicos, cajeros, vendedores, administrativos</td></tr>
                                                            <tr><td><strong>Ciudades</strong></td><td>Ciudades del país para domicilios de clientes y proveedores</td></tr>
                                                            <tr><td><strong>Países</strong></td><td>Listado de países para datos de clientes o proveedores extranjeros</td></tr>
                                                            <tr><td><strong>Nacionalidad</strong></td><td>Nacionalidades registrables para clientes y funcionarios</td></tr>
                                                            <tr><td><strong>Empresa</strong></td><td>Datos de la empresa propietaria del taller (razón social, RUC, etc.)</td></tr>
                                                            <tr><td><strong>Sucursal</strong></td><td>Sedes o locales del taller con sus datos de contacto</td></tr>
                                                            <tr><td><strong>Depósitos</strong></td><td>Almacenes físicos donde se guarda el stock, asociados a cada sucursal</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ COMPRAS ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u5comp" class="collapsed">
                                                        <i class="material-icons">shopping_cart</i> 4. Módulo Compras
                                                        <span class="badge-modulo">7 submódulos</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u5comp" class="panel-collapse collapse">
                                                <div class="panel-body">

                                                    <h4>4.1 Pedidos de Compra</h4>
                                                    <p>Solicitud interna de artículos que se necesitan reponer en stock.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Pedidos</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y completar fecha, observaciones y sucursal.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar cada artículo solicitado (producto, cantidad) y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para enviar el pedido al proveedor.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del pedido de compra</p>
                                                        <small>img/compras/pedido.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos del pedido de compra</p>
                                                        <small>img/compras/pedido_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.2 Presupuestos de Proveedor</h4>
                                                    <p>Cotización recibida del proveedor en respuesta a uno o más pedidos.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Presupuestos</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong>, seleccionar proveedor y vincular pedidos.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, verificar y ajustar los artículos con sus costos y presionar <strong>+</strong> para agregar.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aprobar el presupuesto y pasar a orden de compra.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del presupuesto de proveedor</p>
                                                        <small>img/compras/presupuesto.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos en el presupuesto de proveedor</p>
                                                        <small>img/compras/presupuesto_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.3 Órdenes de Compra</h4>
                                                    <p>Documento formal enviado al proveedor para efectivizar la compra.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Órdenes de Compra</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular el presupuesto aprobado.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, revisar y ajustar cantidades, costos, marca, modelo y depósito de cada artículo.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para emitir la orden.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la orden de compra</p>
                                                        <small>img/compras/orden_compra.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos en la orden de compra</p>
                                                        <small>img/compras/orden_compra_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.4 Registro de Compras (Facturas de Proveedor)</h4>
                                                    <p>Ingreso de la factura del proveedor. Al confirmar, actualiza el stock y genera las cuentas por pagar.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Compras</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular la orden de compra.</li>
                                                        <li>Ingresar número de factura, timbrado y fecha de emisión del proveedor.</li>
                                                        <li>Seleccionar condición de pago (CONTADO / CRÉDITO).</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, revisar los artículos recibidos con cantidad, costo, marca, modelo y depósito.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para registrar la compra y actualizar stock.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del registro de compra</p>
                                                        <small>img/compras/compra.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos registrados en la compra</p>
                                                        <small>img/compras/compra_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.5 Nota de Remisión de Compras</h4>
                                                    <p>Documento que acompaña la recepción de mercadería del proveedor o la transferencia entre sucursales.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Nota de Remisión</em>.</li>
                                                        <li>Seleccionar el tipo: <strong>PROVEEDOR</strong> (recepción) o <strong>TRANSFERENCIA</strong> (entre depósitos).</li>
                                                        <li>Completar los datos del transporte y el conductor.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar cada artículo con marca, modelo y depósito de destino, y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para actualizar stock (solo en TRANSFERENCIA).</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Remisión tipo PROVEEDOR (recepción de mercadería)</p>
                                                        <small>img/compras/remision_proveedor.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Remisión tipo TRANSFERENCIA (entre depósitos)</p>
                                                        <small>img/compras/remision_transferencia.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos en la remisión de compras</p>
                                                        <small>img/compras/remision_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.6 Ajuste de Inventario</h4>
                                                    <p>Corrección manual del stock por diferencias físicas (mermas, sobrantes, devoluciones internas).</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Ajuste de Inventario</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el tipo: <strong>Entrada</strong> (suma stock) o <strong>Salida</strong> (resta stock).</li>
                                                        <li>Seleccionar el motivo del ajuste.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar cada artículo con la cantidad a ajustar y el depósito, y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aplicar el cambio en stock.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del ajuste de inventario</p>
                                                        <small>img/compras/ajuste.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos ajustados con cantidades</p>
                                                        <small>img/compras/ajuste_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>4.7 Notas de Crédito / Débito de Compras</h4>
                                                    <p>Ajustes sobre facturas de proveedor ya confirmadas.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Compras → Notas Crédito/Débito</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el tipo (Crédito o Débito).</li>
                                                        <li>Buscar y vincular la compra de referencia.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar los artículos afectados con sus importes y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aplicar el ajuste.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la nota de compra</p>
                                                        <small>img/compras/nota_compra.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos afectados en la nota de compra</p>
                                                        <small>img/compras/nota_compra_detalle.png</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ SERVICIO ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u6serv" class="collapsed">
                                                        <i class="material-icons">build</i> 5. Módulo Servicio
                                                        <span class="badge-modulo">10 submódulos</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u6serv" class="panel-collapse collapse">
                                                <div class="panel-body">

                                                    <h4>5.1 Solicitudes de Servicio</h4>
                                                    <p>Registro inicial de la solicitud del cliente cuando ingresa al taller. Es el punto de entrada al flujo de servicio.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Solicitudes de Servicio</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el cliente.</li>
                                                        <li>Describir el motivo de la visita o el problema reportado.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar el producto, cantidad y precio de cada ítem solicitado y presionar <strong>+</strong> para agregarlo.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para registrar la solicitud definitivamente.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de solicitud de servicio</p>
                                                        <small>img/servicio/solicitud.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel detalle con ítems de la solicitud</p>
                                                        <small>img/servicio/solicitud_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.2 Recepción de Vehículos</h4>
                                                    <p>Registro formal del vehículo que ingresa al taller con sus datos, estado físico y condiciones de recepción.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Recepción de Vehículos</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular la solicitud de servicio.</li>
                                                        <li>Registrar marca, modelo, matrícula, kilometraje y estado del vehículo.</li>
                                                        <li>Anotar las observaciones del estado físico (daños visibles, accesorios).</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar los repuestos o accesorios recibidos junto al vehículo y presionar <strong>+</strong> para agregar cada ítem.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para formalizar la recepción.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de recepción — parte superior (datos del cliente y vehículo)</p>
                                                        <small>img/servicio/recepcion_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de recepción — parte inferior (estado físico y observaciones)</p>
                                                        <small>img/servicio/recepcion_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos/repuestos en la recepción</p>
                                                        <small>img/servicio/recepcion_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.3 Diagnóstico</h4>
                                                    <p>Resultado técnico de la inspección del vehículo. Describe los problemas encontrados y los trabajos recomendados.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Diagnóstico</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular la recepción del vehículo.</li>
                                                        <li>Seleccionar el tipo de diagnóstico y el técnico responsable.</li>
                                                        <li>Describir los problemas encontrados en el campo de observaciones.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar cada ítem diagnosticado (producto, cantidad, precio, marca, modelo) y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para registrar el diagnóstico.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de diagnóstico — parte superior</p>
                                                        <small>img/servicio/diagnostico_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de diagnóstico — parte inferior (observaciones y técnico)</p>
                                                        <small>img/servicio/diagnostico_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de ítems del diagnóstico</p>
                                                        <small>img/servicio/diagnostico_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.4 Presupuesto de Servicio</h4>
                                                    <p>Cotización de los trabajos y repuestos necesarios que se presenta al cliente para su aprobación antes de iniciar el servicio.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Presupuesto de Servicio</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular el diagnóstico correspondiente.</li>
                                                        <li>Indicar el plazo estimado de entrega.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar cada trabajo o repuesto (producto, cantidad, precio, marca, modelo) y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aprobar el presupuesto y habilitar la orden de servicio.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de presupuesto de servicio — parte superior</p>
                                                        <small>img/servicio/presupuesto_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de presupuesto de servicio — parte inferior</p>
                                                        <small>img/servicio/presupuesto_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de trabajos y precios en el presupuesto de servicio</p>
                                                        <small>img/servicio/presupuesto_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.5 Promociones</h4>
                                                    <p>Gestiona las promociones disponibles que se pueden aplicar a los servicios del taller.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Promociones</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el tipo de promoción.</li>
                                                        <li>Definir el porcentaje o monto de descuento y el período de vigencia.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los artículos o servicios incluidos en la promoción y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Grabar</strong> para finalizar.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del formulario de promociones</p>
                                                        <small>img/servicio/promociones.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel detalle con artículos de la promoción</p>
                                                        <small>img/servicio/promociones_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.6 Descuentos</h4>
                                                    <p>Registra descuentos especiales aplicados a clientes o servicios específicos.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Descuentos</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el tipo de descuento.</li>
                                                        <li>Ingresar el valor del descuento (porcentaje o monto fijo) y el período de vigencia.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los artículos o clientes beneficiados con el descuento y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Grabar</strong> para finalizar.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del formulario de descuentos</p>
                                                        <small>img/servicio/descuentos.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel detalle con artículos del descuento</p>
                                                        <small>img/servicio/descuentos_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.7 Orden de Servicio</h4>
                                                    <p>Documento que formaliza la autorización del trabajo técnico. Vincula el vehículo, el técnico asignado y los repuestos a utilizar.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Orden de Servicio</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular el presupuesto aprobado.</li>
                                                        <li>Asignar el técnico y el equipo de trabajo.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los ítems de repuestos y mano de obra con marca y modelo y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para emitir la orden y descontar stock de repuestos.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de orden de servicio — parte superior</p>
                                                        <small>img/servicio/orden_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de orden de servicio — parte inferior</p>
                                                        <small>img/servicio/orden_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de repuestos y mano de obra en la orden de servicio</p>
                                                        <small>img/servicio/orden_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.8 Insumos Utilizados</h4>
                                                    <p>Registro del consumo de insumos (aceites, líquidos, materiales consumibles) durante la prestación del servicio.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Insumos Utilizados</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar la orden de servicio relacionada.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar el tipo de insumo, cantidad y unidad de cada material utilizado y presionar <strong>+</strong>.</li>
                                                        <li>Repetir para cada insumo consumido.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aplicar el descuento de stock.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de insumos utilizados</p>
                                                        <small>img/servicio/insumos.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de insumos consumidos registrados</p>
                                                        <small>img/servicio/insumos_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.9 Contrato de Servicio</h4>
                                                    <p>Formaliza un acuerdo de servicio periódico o de mantenimiento programado con el cliente.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Contrato</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el cliente.</li>
                                                        <li>Seleccionar el tipo de contrato y definir la vigencia (fecha inicio/fin).</li>
                                                        <li>Completar las condiciones y observaciones del contrato.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los servicios incluidos en el contrato y presionar <strong>+</strong> por cada uno.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para activar el contrato.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de contrato — parte superior (datos del cliente y tipo)</p>
                                                        <small>img/servicio/contrato_1.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de contrato — parte media (vigencia y condiciones)</p>
                                                        <small>img/servicio/contrato_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de contrato — parte inferior (observaciones)</p>
                                                        <small>img/servicio/contrato_3.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de servicios incluidos en el contrato</p>
                                                        <small>img/servicio/contrato_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>5.10 Reclamos de Clientes</h4>
                                                    <p>Gestiona las quejas y reclamos presentados por los clientes sobre servicios o productos.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Servicio → Reclamos</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el cliente.</li>
                                                        <li>Describir el reclamo en el campo de observaciones.</li>
                                                        <li>Asignar el estado inicial (PENDIENTE).</li>
                                                        <li>Dar seguimiento actualizando el estado hasta RESUELTO o CERRADO.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Formulario de reclamo de cliente</p>
                                                        <small>img/servicio/reclamo.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Seguimiento del reclamo con cambios de estado</p>
                                                        <small>img/servicio/reclamo_seguimiento.png</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ VENTAS ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u7vent" class="collapsed">
                                                        <i class="material-icons">point_of_sale</i> 6. Módulo Ventas y Cobros
                                                        <span class="badge-modulo">7 submódulos</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u7vent" class="panel-collapse collapse">
                                                <div class="panel-body">

                                                    <h4>6.1 Pedidos de Clientes</h4>
                                                    <p>Permite registrar los pedidos que los clientes realizan antes de que se genere la factura de venta.</p>
                                                    <p><strong>Estados posibles:</strong> PENDIENTE → CONFIRMADO / ANULADO</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Pedidos de Clientes</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y completar la fecha, observaciones y sucursal.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los artículos solicitados con cantidad y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aprobar el pedido del cliente.</li>
                                                        <li>El pedido confirmado puede luego vincularse a una venta.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del pedido de cliente</p>
                                                        <small>img/ventas/pedido_cliente.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos en el pedido del cliente</p>
                                                        <small>img/ventas/pedido_cliente_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.2 Gestionar Ventas (Facturas)</h4>
                                                    <p>Permite registrar, editar, confirmar y anular facturas de venta.</p>
                                                    <p><strong>Estados posibles:</strong> PENDIENTE → CONFIRMADO / ANULADO</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Gestionar Ventas</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> para crear una nueva venta.</li>
                                                        <li>Completar fecha, cliente, empresa, sucursal y condición de pago.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera en estado PENDIENTE.</li>
                                                        <li>En la tabla de detalle, agregar los artículos con cantidad y precio.</li>
                                                        <li>Una vez completo, presionar <strong>Confirmar</strong> para generar la factura definitiva.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del registro de venta</p>
                                                        <small>img/ventas/registro.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Tabla de detalle con artículos</p>
                                                        <small>img/ventas/detalle.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Vista adicional del registro de venta</p>
                                                        <small>img/ventas/registro_2.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.3 Apertura y Cierre de Caja</h4>
                                                    <p>Controla la apertura y el cierre de caja diario. Al cerrar, se genera automáticamente la recaudación a depositar si hay efectivo.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Apertura/Cierre de Caja</em>.</li>
                                                        <li>Para abrir: completar monto de apertura y presionar <strong>Abrir Caja</strong>.</li>
                                                        <li>Para cerrar: seleccionar la caja abierta y presionar <strong>Cerrar Caja</strong>.</li>
                                                        <li>El sistema calcula el total recaudado y los movimientos del día.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de apertura/cierre de caja</p>
                                                        <small>img/ventas/caja.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Movimientos del día en la caja</p>
                                                        <small>img/ventas/caja_movimientos.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.4 Cobros</h4>
                                                    <p>Registra los pagos recibidos de clientes. Admite efectivo, tarjeta y cheques en el mismo cobro.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Cobros</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong>.</li>
                                                        <li>Seleccionar el cliente y la forma de cobro.</li>
                                                        <li>Ingresar el importe total y los medios de pago (efectivo, tarjetas, cheques).</li>
                                                        <li>Vincular las cuotas o facturas que se están cancelando.</li>
                                                        <li>Presionar <strong>Grabar</strong>.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del cobro — parte superior</p>
                                                        <small>img/ventas/cobros.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera del cobro — parte inferior</p>
                                                        <small>img/ventas/cobros_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Panel de cuotas y facturas a cancelar (detalle del cobro)</p>
                                                        <small>img/ventas/cobros_cuotas.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.5 Arqueo de Caja</h4>
                                                    <p>Conteo físico del dinero en caja para verificar concordancia con el sistema.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Arqueo de Caja</em>.</li>
                                                        <li>Seleccionar la caja a arquear.</li>
                                                        <li>Ingresar los billetes y monedas contados físicamente.</li>
                                                        <li>El sistema muestra la diferencia entre lo físico y lo registrado.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de arqueo de caja</p>
                                                        <small>img/ventas/arqueo.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.6 Nota de Remisión de Ventas</h4>
                                                    <p>Documento que acompaña el traslado de mercadería al cliente.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Nota de Remisión</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y vincular la venta correspondiente.</li>
                                                        <li>Completar datos del transporte (conductor, vehículo, matrícula).</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, agregar los artículos remitidos con marca y modelo y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para emitir la remisión.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la nota de remisión de ventas — parte superior</p>
                                                        <small>img/ventas/remision.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la nota de remisión de ventas — parte inferior</p>
                                                        <small>img/ventas/remision_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos en la remisión de ventas</p>
                                                        <small>img/ventas/remision_detalle.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>6.7 Notas de Venta (Crédito / Débito)</h4>
                                                    <p>Genera ajustes sobre facturas ya confirmadas. Una Nota de Crédito reduce el importe; una Nota de Débito lo aumenta.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Ventas → Notas de Venta</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> y seleccionar el tipo (Crédito o Débito).</li>
                                                        <li>Buscar y seleccionar la venta de referencia.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la cabecera (estado PENDIENTE).</li>
                                                        <li>En el panel <strong>Detalle</strong>, ingresar los artículos afectados con sus importes y presionar <strong>+</strong>.</li>
                                                        <li>Presionar <strong>Confirmar</strong> para aplicar el ajuste.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la nota de venta — parte superior</p>
                                                        <small>img/ventas/notas_venta.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Cabecera de la nota de venta — parte inferior</p>
                                                        <small>img/ventas/notas_venta_2.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Detalle de artículos afectados en la nota de venta</p>
                                                        <small>img/ventas/notas_venta_detalle.png</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ INFORMES WEB ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u8inf" class="collapsed">
                                                        <i class="material-icons">bar_chart</i> 7. Informes Web
                                                        <span class="badge-modulo">3 informes</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u8inf" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Los informes web permiten consultar resúmenes y listados de operaciones filtradas por período, estado u otros criterios. Se acceden desde el menú <em>Informes Varios</em>.</p>

                                                    <h4>7.1 Informes de Compras</h4>
                                                    <p>Resúmenes de pedidos, presupuestos, órdenes de compra, compras realizadas y ajustes de inventario por período.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Informes → Informes Web Compras</em>.</li>
                                                        <li>Seleccionar el tipo de informe y el rango de fechas.</li>
                                                        <li>Presionar <strong>Buscar</strong> para generar el listado.</li>
                                                        <li>Exportar en Excel, PDF o imprimir según necesidad.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de informes de compras</p>
                                                        <small>img/informes/compras.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Resultado del informe con datos filtrados</p>
                                                        <small>img/informes/compras_resultado.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>7.2 Informes de Servicio</h4>
                                                    <p>Resúmenes de órdenes de servicio, diagnósticos, reclamos y contratos por período.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Informes → Informes Web Servicio</em>.</li>
                                                        <li>Seleccionar el tipo de informe y el rango de fechas.</li>
                                                        <li>Presionar <strong>Buscar</strong> para generar el listado.</li>
                                                        <li>Exportar o imprimir el resultado.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de informes de servicio</p>
                                                        <small>img/informes/servicio.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Resultado del informe de servicio filtrado</p>
                                                        <small>img/informes/servicio_resultado.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>7.3 Informes de Ventas</h4>
                                                    <p>Resúmenes de ventas facturadas, cobros recibidos, notas de crédito/débito y movimientos de caja por período.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Informes → Informes Web Ventas</em>.</li>
                                                        <li>Seleccionar el tipo de informe y el rango de fechas.</li>
                                                        <li>Presionar <strong>Buscar</strong> para generar el listado.</li>
                                                        <li>Exportar o imprimir el resultado.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de informes de ventas</p>
                                                        <small>img/informes/ventas.png</small>
                                                    </div>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Resultado del informe de ventas con totales</p>
                                                        <small>img/informes/ventas_resultado.png</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ OPERACIONES COMUNES ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionUsuario" href="#u6" class="collapsed">
                                                        <i class="material-icons">help_outline</i> 8. Operaciones Comunes y Preguntas Frecuentes
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="u6" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <h4>¿Qué significa cada estado?</h4>
                                                    <table class="table table-bordered">
                                                        <thead><tr><th>Estado</th><th>Significado</th><th>Operaciones permitidas</th></tr></thead>
                                                        <tbody>
                                                            <tr><td><span class="label label-warning">PENDIENTE</span></td><td>Creado pero no procesado</td><td>Editar, Confirmar, Anular</td></tr>
                                                            <tr><td><span class="label label-success">CONFIRMADO</span></td><td>Procesado y con efecto en el sistema</td><td>Anular (revierte efectos)</td></tr>
                                                            <tr><td><span class="label label-danger">ANULADO</span></td><td>Cancelado. No tiene efecto</td><td>Ninguna</td></tr>
                                                            <tr><td><span class="label label-info">PROCESADO</span></td><td>Usado en documentos encadenados (pedido usado en presupuesto)</td><td>Solo consulta</td></tr>
                                                        </tbody>
                                                    </table>

                                                    <h4>¿Puedo editar un registro confirmado?</h4>
                                                    <p>No. Una vez confirmado, el registro tiene efecto en stock, libro de compras o cuentas. Para corregir errores se debe anular y crear uno nuevo.</p>

                                                    <h4>¿Qué pasa al anular una compra CONFIRMADA?</h4>
                                                    <p>El sistema revierte automáticamente el stock, anula el libro de compras y las cuotas de cuentas por pagar generadas.</p>

                                                    <h4>¿Puedo imprimir documentos?</h4>
                                                    <p>Sí. En los módulos de Ventas, Pedidos y Órdenes de Servicio encontrará botones de impresión que generan el documento en formato imprimible.</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div><!-- /accordionUsuario -->
                                </div><!-- /tab-usuario -->


                                <!-- ════════════════════════════════════════════════
                                     TAB 2 — MANUAL DE SEGURIDAD
                                ════════════════════════════════════════════════ -->
                                <div class="tab-pane" id="tab-seguridad">

                                    <div class="panel-group" id="accordionSeguridad">

                                        <!-- 1. Introducción -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s1">
                                                        <i class="material-icons">shield</i> 1. Introducción a la Seguridad del Sistema
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s1" class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    <p>El sistema implementa un modelo de seguridad por capas que protege la información desde la interfaz de usuario hasta la base de datos. Las medidas aplicadas cubren autenticación, autorización, validación de datos, trazabilidad y protección contra ataques comunes.</p>
                                                    <table class="table table-bordered table-striped">
                                                        <thead><tr><th>Capa</th><th>Mecanismo aplicado</th></tr></thead>
                                                        <tbody>
                                                            <tr><td>Autenticación</td><td>JSON Web Token (JWT) con expiración configurada</td></tr>
                                                            <tr><td>Transporte</td><td>HTTPS (recomendado en producción)</td></tr>
                                                            <tr><td>Validación entrada</td><td>Laravel Validation Rules en cada endpoint</td></tr>
                                                            <tr><td>Base de datos</td><td>Consultas parametrizadas (bindings) — sin SQL dinámico</td></tr>
                                                            <tr><td>Trazabilidad</td><td>Tablas de auditoría con triggers PostgreSQL</td></tr>
                                                            <tr><td>Control de estado</td><td>Máquina de estados en cada módulo (PENDIENTE → CONFIRMADO)</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 2. JWT -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s2" class="collapsed">
                                                        <i class="material-icons">vpn_key</i> 2. Autenticación y Autorización (JWT)
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s2" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <div class="sec-block">
                                                        <h4>¿Qué es JWT?</h4>
                                                        <p>JSON Web Token es un estándar abierto (RFC 7519) que permite transmitir información de autenticación de forma segura entre el cliente y el servidor mediante un token firmado digitalmente.</p>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Flujo de autenticación</h4>
                                                        <ol>
                                                            <li>El usuario envía sus credenciales (usuario + contraseña) al endpoint <code>POST /api/login</code>.</li>
                                                            <li>El servidor verifica la contraseña con <code>Hash::check()</code> (bcrypt).</li>
                                                            <li>Si es correcta, genera un token JWT firmado y lo retorna al cliente.</li>
                                                            <li>El cliente almacena el token en <code>localStorage</code> bajo la clave <code>datosSesion</code>.</li>
                                                            <li>Cada petición posterior incluye el token en el header: <code>Authorization: Bearer &lt;token&gt;</code>.</li>
                                                            <li>El servidor valida la firma del token en cada request. Sin token válido → HTTP 401.</li>
                                                        </ol>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Consideraciones</h4>
                                                        <ul>
                                                            <li>El token tiene tiempo de expiración configurado en <code>config/jwt.php</code>.</li>
                                                            <li>El sistema usa API stateless — no mantiene sesiones en el servidor.</li>
                                                            <li>Al cerrar sesión, el token se elimina del <code>localStorage</code>.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 3. Validación -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s3" class="collapsed">
                                                        <i class="material-icons">rule</i> 3. Validación de Datos de Entrada
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s3" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Todos los datos enviados al servidor son validados antes de procesarse, usando el sistema de validación nativo de Laravel. Esto aplica a todos los módulos (ventas, compras, servicio, referenciales).</p>
                                                    <div class="sec-block">
                                                        <h4>Reglas aplicadas por tipo de campo</h4>
                                                        <table class="table table-bordered table-sm">
                                                            <thead><tr><th>Tipo de dato</th><th>Reglas Laravel</th><th>Propósito</th></tr></thead>
                                                            <tbody>
                                                                <tr><td>Campos de texto</td><td><code>required|string|max:500|not_regex:/[*&lt;&gt;{}|]/</code></td><td>Evita inyección de HTML/scripts y limita tamaño</td></tr>
                                                                <tr><td>Campos de estado</td><td><code>required|in:PENDIENTE,CONFIRMADO,ANULADO</code></td><td>Solo valores permitidos por la máquina de estados</td></tr>
                                                                <tr><td>Claves foráneas</td><td><code>required|integer|exists:tabla,id</code></td><td>Garantiza integridad referencial desde el servidor</td></tr>
                                                                <tr><td>Importes / cantidades</td><td><code>required|numeric|min:0</code></td><td>Impide valores negativos o no numéricos</td></tr>
                                                                <tr><td>Fechas</td><td><code>required|date</code></td><td>Formato de fecha válido</td></tr>
                                                                <tr><td>Nro. de factura</td><td><code>regex:/^\d{3}-\d{3}-\d{7}$/</code></td><td>Formato oficial paraguayo 000-000-0000000</td></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Validación en el frontend</h4>
                                                        <p>Adicionalmente, el frontend realiza validaciones previas al envío (campos obligatorios, formatos de fecha con Moment.js, rangos) para mejorar la experiencia del usuario. Estas validaciones son complementarias — no reemplazan las del servidor.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 4. SQL Injection -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s4" class="collapsed">
                                                        <i class="material-icons">storage</i> 4. Protección contra Inyección SQL
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s4" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <div class="sec-block">
                                                        <h4>Consultas parametrizadas (bindings)</h4>
                                                        <p>Todas las consultas a la base de datos utilizan parámetros enlazados (<em>parameter binding</em>), nunca interpolación directa de variables en el SQL. Esto hace imposible que un dato del usuario modifique la estructura de la consulta.</p>
                                                        <p><strong>Correcto (bindings):</strong></p>
                                                        <pre style="background:#f5f5f5;padding:10px;border-radius:4px;font-size:12px;">DB::select("SELECT * FROM pedidos WHERE id = ?", [$id]);</pre>
                                                        <p><strong>Incorrecto (interpolación — NO se usa en este sistema):</strong></p>
                                                        <pre style="background:#fff0f0;padding:10px;border-radius:4px;font-size:12px;">DB::select("SELECT * FROM pedidos WHERE id = $id"); // ❌ VULNERABILIDAD</pre>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Eloquent ORM</h4>
                                                        <p>La mayoría de las operaciones CRUD usan el ORM Eloquent de Laravel (<code>Model::find()</code>, <code>Model::create()</code>, <code>Model::update()</code>), que aplica bindings automáticamente en todas las operaciones.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 5. XSS -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s5" class="collapsed">
                                                        <i class="material-icons">code_off</i> 5. Protección contra XSS
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s5" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <div class="sec-block">
                                                        <h4>¿Qué es XSS?</h4>
                                                        <p>Cross-Site Scripting (XSS) es un ataque donde un usuario malicioso intenta inyectar código JavaScript en campos de texto para ejecutarlo en el navegador de otras personas.</p>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Medidas implementadas</h4>
                                                        <ul>
                                                            <li><strong>Regex de rechazo en backend:</strong> La regla <code>not_regex:/[*&lt;&gt;{}|]/</code> impide que se almacenen los caracteres típicos de scripts (<code>&lt;script&gt;</code>, <code>{}</code>) en campos de texto libre.</li>
                                                            <li><strong>API JSON:</strong> El sistema es una API REST que retorna JSON, no HTML generado desde el servidor, lo que reduce la superficie de ataque XSS.</li>
                                                            <li><strong>Construcción de HTML por jQuery:</strong> Los datos del servidor se insertan en el DOM con <code>.val()</code> y <code>.text()</code> (no <code>.html()</code> con datos del usuario), evitando la ejecución de HTML arbitrario.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 6. Auditoría -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s6" class="collapsed">
                                                        <i class="material-icons">history</i> 6. Auditoría del Sistema
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s6" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <div class="sec-block">
                                                        <h4>Trazabilidad de operaciones</h4>
                                                        <p>El sistema registra automáticamente cada operación sensible (INSERT, UPDATE, DELETE) en tablas de auditoría mediante triggers de PostgreSQL. Se almacena:</p>
                                                        <ul>
                                                            <li><strong>Operación:</strong> INSERT, UPDATE o DELETE</li>
                                                            <li><strong>Tabla afectada</strong> y <strong>ID del registro</strong></li>
                                                            <li><strong>Datos anteriores</strong> (OLD) y <strong>datos nuevos</strong> (NEW)</li>
                                                            <li><strong>Usuario del sistema</strong> y <strong>nombre de usuario</strong></li>
                                                            <li><strong>Dirección IP</strong> y <strong>URL</strong> del request</li>
                                                            <li><strong>Fecha y hora</strong> exactas</li>
                                                        </ul>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Inmutabilidad del registro</h4>
                                                        <p>Los registros de auditoría son de solo inserción — ningún módulo de la aplicación permite modificar o borrar el historial de auditoría.</p>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Máquina de estados</h4>
                                                        <p>Cada módulo transaccional implementa un control de estado que impide:</p>
                                                        <ul>
                                                            <li>Editar registros que ya fueron CONFIRMADOS o ANULADOS</li>
                                                            <li>Confirmar algo que ya está confirmado</li>
                                                            <li>Anular algo que ya está anulado</li>
                                                        </ul>
                                                        <p>Cualquier intento de violación retorna HTTP 409 con un mensaje descriptivo.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 7. Sesiones -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s7" class="collapsed">
                                                        <i class="material-icons">manage_accounts</i> 7. Gestión de Sesiones y Recomendaciones de Uso
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s7" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <div class="sec-block">
                                                        <h4>Sesiones stateless</h4>
                                                        <p>El sistema no mantiene sesiones en el servidor. Cada petición es autenticada de forma independiente con el token JWT. Esto mejora la escalabilidad y evita ataques de fijación de sesión.</p>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Almacenamiento del token</h4>
                                                        <p>El token JWT se almacena en <code>localStorage</code> del navegador bajo la clave <code>datosSesion</code>. Se recomienda:</p>
                                                        <ul>
                                                            <li>Usar el sistema solo en equipos de confianza.</li>
                                                            <li>Cerrar sesión explícitamente al terminar.</li>
                                                            <li>No dejar la sesión abierta en computadoras compartidas.</li>
                                                        </ul>
                                                    </div>
                                                    <div class="sec-block">
                                                        <h4>Recomendaciones para producción</h4>
                                                        <ul>
                                                            <li><strong>HTTPS:</strong> Siempre utilizar certificado SSL/TLS para cifrar la comunicación entre el navegador y el servidor.</li>
                                                            <li><strong>Contraseñas:</strong> Las contraseñas se almacenan hasheadas con bcrypt. Utilizar contraseñas de al menos 8 caracteres con letras, números y símbolos.</li>
                                                            <li><strong>Caducidad del token:</strong> Configurar un tiempo de expiración apropiado en <code>JWT_TTL</code> (minutos). Se recomienda 480 minutos (8 horas) para jornada laboral.</li>
                                                            <li><strong>Backups:</strong> Realizar copias de seguridad periódicas de la base de datos PostgreSQL, incluyendo las tablas de auditoría.</li>
                                                            <li><strong>Actualizaciones:</strong> Mantener actualizadas las dependencias de Laravel y los paquetes npm del frontend.</li>
                                                            <li><strong>Acceso físico:</strong> Restringir el acceso físico y de red al servidor de base de datos.</li>
                                                        </ul>
                                                    </div>
                                                    <div class="alerta-seguridad">
                                                        <i class="material-icons">warning</i>
                                                        <strong>Aviso:</strong> Nunca compartir credenciales de acceso. Cada usuario debe tener su propio usuario y contraseña para que la auditoría sea válida.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- ══════════════ ADMINISTRACIÓN DE USUARIOS Y ACCESOS ══════════════ -->
                                        <div class="panel panel-manual">
                                            <div class="panel-heading">
                                                <h4 class="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordionSeguridad" href="#s8admin" class="collapsed">
                                                        <i class="material-icons">admin_panel_settings</i> 8. Administración de Usuarios y Accesos
                                                        <span class="badge-modulo">7 opciones</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="s8admin" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>La administración de seguridad se accede desde <em>Mantenimiento → Mantener Seguridad</em>. Solo los administradores del sistema deben operar estas pantallas.</p>

                                                    <h4>8.1 Accesos</h4>
                                                    <p>Configura qué roles tienen acceso a cada módulo o funcionalidad del sistema.</p>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de control de accesos</p>
                                                        <small>img/seguridad/accesos.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.2 Usuarios</h4>
                                                    <p>Administra las cuentas de acceso al sistema. Cada funcionario que usa el sistema debe tener un usuario.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Seguridad → Usuarios</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> e ingresar nombre de usuario y contraseña.</li>
                                                        <li>Vincular el usuario a un funcionario del sistema.</li>
                                                        <li>Asignar el rol correspondiente.</li>
                                                        <li>Presionar <strong>Grabar</strong>.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Formulario de gestión de usuarios</p>
                                                        <small>img/seguridad/usuarios.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.3 Permisos</h4>
                                                    <p>Asigna qué acciones puede realizar cada rol en cada módulo (lectura, escritura, confirmación, anulación).</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Seguridad → Permisos</em>.</li>
                                                        <li>Seleccionar el rol a configurar.</li>
                                                        <li>Marcar o desmarcar los permisos por módulo y entidad.</li>
                                                        <li>Presionar <strong>Grabar</strong> para guardar la configuración.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Pantalla de asignación de permisos</p>
                                                        <small>img/seguridad/permisos.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.4 Roles</h4>
                                                    <p>Define los perfiles de acceso (Administrador, Vendedor, Técnico, etc.). Cada rol agrupa un conjunto de permisos.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Seguridad → Roles</em>.</li>
                                                        <li>Presionar <strong>Agregar</strong> e ingresar el nombre del rol.</li>
                                                        <li>Presionar <strong>Grabar</strong>. Luego asignar permisos al rol desde la sección Permisos.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Formulario de roles</p>
                                                        <small>img/seguridad/roles.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.5 Módulos</h4>
                                                    <p>Lista los módulos funcionales del sistema que pueden asignarse a los roles (ventas, compras, servicios, referenciales, etc.).</p>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Listado de módulos del sistema</p>
                                                        <small>img/seguridad/modulos.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.6 Auditoría de Login</h4>
                                                    <p>Registro histórico de todos los inicios y cierres de sesión en el sistema (usuario, fecha, hora, IP).</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Seguridad → Auditoría Login</em>.</li>
                                                        <li>Consultar el historial filtrando por usuario o rango de fechas.</li>
                                                        <li>Solo lectura — no se puede modificar ni eliminar.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Historial de auditoría de login</p>
                                                        <small>img/seguridad/auditoria_login.png</small>
                                                    </div>

                                                    <hr>
                                                    <h4>8.7 Auditoría de Transacciones</h4>
                                                    <p>Registro detallado de cada INSERT, UPDATE y DELETE realizado en el sistema, con los datos anteriores y nuevos, usuario responsable e IP.</p>
                                                    <ol class="steps-list">
                                                        <li>Ir a <em>Seguridad → Auditoría Transacciones</em>.</li>
                                                        <li>Filtrar por tabla, operación, usuario o rango de fechas.</li>
                                                        <li>Ver el detalle de cada cambio (OLD vs NEW).</li>
                                                        <li>Solo lectura — no se puede modificar ni eliminar.</li>
                                                    </ol>
                                                    <div class="screenshot-box">
                                                        <i class="material-icons">photo_camera</i>
                                                        <p>Captura: Historial de auditoría de transacciones</p>
                                                        <small>img/seguridad/auditoria_tx.png</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div><!-- /accordionSeguridad -->
                                </div><!-- /tab-seguridad -->

                            </div><!-- /tab-content -->

                        </div><!-- /body -->
                    </div><!-- /card -->
                </div>
            </div>
        </div>
    </section>

    <!-- jQuery Core Js -->
    <script src="../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Waves Effect Js -->
    <script src="../plugins/node-waves/waves.js"></script>

    <!-- Custom Js -->
    <script src="../js/admin.js?v=3"></script>
    <script src="../js/demo.js"></script>
    <script src="../js/ruta.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.screenshot-box').forEach(function (box) {
                var pathEl = box.querySelector('small');
                if (!pathEl) return;
                var path = pathEl.textContent.trim();
                var img = new Image();
                img.onload = function () {
                    box.innerHTML = '<img src="' + path + '" class="img-responsive" style="border-radius:6px;border:1px solid #ddd;margin-top:6px;max-width:100%;display:block;margin-left:auto;margin-right:auto;">';
                    box.style.background = 'transparent';
                    box.style.border = 'none';
                    box.style.padding = '0';
                };
                img.src = path;
            });
        });
    </script>

</body>
</html>
