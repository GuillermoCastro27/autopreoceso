<!-- Page Loader -->
<div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Por favor espere...</p>
        </div>
    </div>
    <!-- #END# Page Loader -->
    <!-- Overlay For Sidebars -->
    <div class="overlay"></div>
    <!-- #END# Overlay For Sidebars -->
    <!-- Search Bar -->
    <div class="search-bar">
       
    </div>
    <!-- #END# Search Bar -->
    <!-- Top Bar -->
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                <a href="javascript:void(0);" class="bars"></a>
                <a class="navbar-brand">AUTOPROCESOS</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <!-- Call Search -->
                    <!-- #END# Call Search -->
                    <!-- Notifications -->
                    <li class="dropdown">
                        <ul class="dropdown-menu">
                            <li class="header">NOTIFICATIONS</li>
                            <li class="body">
                                <ul class="menu">
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-light-green">
                                                <i class="material-icons">person_add</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4>12 new members joined</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 14 mins ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-cyan">
                                                <i class="material-icons">add_shopping_cart</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4>4 sales made</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 22 mins ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-red">
                                                <i class="material-icons">delete_forever</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4><b>Nancy Doe</b> deleted account</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 3 hours ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-orange">
                                                <i class="material-icons">mode_edit</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4><b>Nancy</b> changed name</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 2 hours ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-blue-grey">
                                                <i class="material-icons">comment</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4><b>John</b> commented your post</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 4 hours ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-light-green">
                                                <i class="material-icons">cached</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4><b>John</b> updated status</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> 3 hours ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="icon-circle bg-purple">
                                                <i class="material-icons">settings</i>
                                            </div>
                                            <div class="menu-info">
                                                <h4>Settings updated</h4>
                                                <p>
                                                    <i class="material-icons">access_time</i> Yesterday
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="footer">
                                <a href="javascript:void(0);">View All Notifications</a>
                            </li>
                        </ul>
                    </li>
                    <!-- #END# Notifications -->
                    <!-- Tasks -->
                    <!-- #END# Tasks -->
                </ul>
            </div>
        </div>
    </nav>
    <!-- #Top Bar -->
    <section>
        <!-- Left Sidebar -->
        <aside id="leftsidebar" class="sidebar">
            <!-- User Info -->
            <div class="user-info">
            </div>
            <!-- #User Info -->
            <!-- Menu -->
            <div class="menu">
                <ul class="list">
                    <li class="header">NAVEGACIÓN PRINCIPAL</li>
                    <li>
                        <?php if (basename($_SERVER['PHP_SELF']) !== 'menu.php'): ?>
                            <a href="../../menu.php">
                                <i class="material-icons">home</i>
                                <span>Home</span>
                            </a>
                        <?php endif;?>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">trending_down</i>
                            <span>Gestion de Mantenimiento y Seguridad</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <i class="material-icons">trending_down</i>
                                    <span>Seguridad</span>
                                </a>
                                <ul class="ml-menu">
                                    <li><a href="/taller_front/referenciales/roles"><span>Mantener Roles</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <i class="material-icons">trending_down</i>
                                    <span>Ref_Compras</span>
                                </a>
                                <ul class="ml-menu">
                                    <li><a href="/taller_front/referenciales/proveedor"><span>Mantener Proveedores</span></a></li>
                                    <li><a href="/taller_front/referenciales/items"><span>Mantener Items</span></a></li>
                                    <li><a href="/taller_front/referenciales/tipo_item"><span>Mantener Tipo Items</span></a></li>
                                    <li><a href="/taller_front/referenciales/marca"><span>Mantener Marca</span></a></li>
                                    <!--<li><a href="/taller_front/referenciales/item_marca"><span>Mantener Item Marca</span></a></li>-->
                                    <li><a href="/taller_front/referenciales/modelo"><span>Mantener Modelo</span></a></li>
                                    <!-- <li><a href="/taller_front/referenciales/item_modelo"><span>Mantener Item Modelo</span></a></li>-->
                                    <li><a href="/taller_front/referenciales/tipo_impuesto"><span>Mantener Tipo Impuesto</span></a></li>
                                    <li><a href="/taller_front/referenciales/Motivo_ajuste"><span>Mantener Motivo Ajuste</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <i class="material-icons">trending_down</i>
                                    <span>Ref_Servicios</span>
                                </a>
                                <ul class="ml-menu">
                                    <li><a href="/taller_front/referenciales/tipo_servicio"><span>Mantener Tipo Servicio</span></a></li>
                                    <li><a href="/taller_front/referenciales/tipo_vehiculo"><span>Mantener Tipo Vehículo</span></a></li>
                                    <li><a href="/taller_front/referenciales/Tipo_diagnostico"><span>Mantener Tipo Diagnostico</span></a></li>
                                    <li><a href="/taller_front/referenciales/tipo_promociones"><span>Mantener Tipo Promociones</span></a></li>
                                    <li><a href="/taller_front/referenciales/tipo_descuentos"><span>Mantener Tipo Descuentos</span></a></li>
                                    <li><a href="/taller_front/referenciales/equipo_trabajo"><span>Mantener Equipo de Trabajo</span></a></li>
                                    <li><a href="/taller_front/referenciales/tipo_contrato"><span>Mantener Tipo de Contrato</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <i class="material-icons">trending_down</i>
                                    <span>Ref_Ventas</span>
                                </a>
                                <ul class="ml-menu">
                                    <li><a href="/taller_front/referenciales/caja"><span>Mantener Caja</span></a></li>
                                    <li><a href="/taller_front/referenciales/entidad_emisora"><span>Mantener Entidad Emisora</span></a></li>
                                    <li><a href="/taller_front/referenciales/marca_tarjeta"><span>Mantener Marca de Tarjeta</span></a></li>
                                    <li><a href="/taller_front/referenciales/entidad_adherida"><span>Mantener Entidad Adherida</span></a></li>
                                    <li><a href="/taller_front/referenciales/forma_cobro"><span>Mantener Forma de Cobro</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <i class="material-icons">trending_down</i>
                                    <span>Ref_varios</span>
                                </a>
                                <ul class="ml-menu">
                                    <li><a href="/taller_front/referenciales/paises"><span>Paises</span></a></li>
                                    <li><a href="/taller_front/referenciales/ciudades"><span>Ciudades</span></a></li>
                                    <li><a href="/taller_front/referenciales/nacionalidad"><span>Nacionalidad</span></a></li>
                                    <li><a href="/taller_front/referenciales/clientes"><span>Clientes</span></a></li>
                                    <li><a href="/taller_front/referenciales/funcionario"><span>Funcionarios</span></a></li>
                                    <li><a href="/taller_front/referenciales/empresa"><span>Empresa</span></a></li>
                                    <li><a href="/taller_front/referenciales/sucursal"><span>Sucursal</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">trending_down</i>
                            <span>Compras</span>
                        </a>
                        <ul class="ml-menu">
                            <li><a href="/taller_front/compras/pedido"><span>Pedidos</span></a></li>
                            <li><a href="/taller_front/compras/presupuesto"><span>Presupuestos</span></a></li>
                            <li><a href="/taller_front/compras/orden_compra"><span>Ordenes de Compra</span></a></li>
                            <li><a href="/taller_front/compras/Reg_compras"><span>Registrar Compras</span></a></li>
                            <li><a href="/taller_front/compras/Nota_remi_comp"><span>Registrar Nota de Remisión</span></a></li>
                            <li><a href="/taller_front/compras/Ajustes_inventario"><span>Registrar Ajustes</span></a></li>
                            <li><a href="/taller_front/compras/notas_cred_deb"><span>Registrar Notas de Compra</span></a></li>
                            <li><a href="/taller_front/compras/Informes_Compra"><span>Informes Web</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">trending_down</i>
                            <span>Servicio</span>
                        </a>
                        <ul class="ml-menu">
                            <li><a href="/taller_front/Servicio/Solicitud"><span>Registrar Solicitudes de Servicio</span></a></li>
                            <li><a href="/taller_front/Servicio/Recep"><span>Registrar Recepcion de Vehiculos</span></a></li>
                            <li><a href="/taller_front/Servicio/Diagnostico"><span>Registrar Diagnostico</span></a></li>
                            <li><a href="/taller_front/Servicio/Promociones"><span>Registrar Promociones</span></a></li>
                            <li><a href="/taller_front/Servicio/Descuentos"><span>Registrar Descuentos</span></a></li>
                            <li><a href="/taller_front/Servicio/PresupuestoServ"><span>Registrar Presupuesto de Servicio</span></a></li>
                            <li><a href="/taller_front/Servicio/OrdenServicio"><span>Registrar Orden de Servicio</span></a></li>
                            <li><a href="/taller_front/Servicio/contrato_servicio"><span>Registrar Contrato de Servicio</span></a></li>
                            <li><a href="/taller_front/Servicio/Reclamo_cli"><span>Registrar Reclamo de Clientes</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">trending_down</i>
                            <span>Ventas</span>
                        </a>
                        <ul class="ml-menu">
                            <li><a href="/taller_front/Ventas/pedido_ventas"><span>Registrar Pedido Ventas</span></a></li>
                            <li><a href="/taller_front/Ventas/gestionar_ventas"><span>Gestionar Ventas</span></a></li>
                            <li><a href="/taller_front/Ventas/apertura_cierre_caja"><span>Registrar Apertura y Cierre de Caja</span></a></li>
                            <li><a href="/taller_front/Ventas/cobranzas"><span>Gestioinar Cobranzas</span></a></li>
                            <li><a href="/taller_front/Ventas/arqueo_caja"><span>Generar Arqueo de Caja</span></a></li>
                            <li><a href="/taller_front/Ventas/nota_remi_vent"><span>Registrar Nota de Remision</span></a></li>
                            <li><a href="/taller_front/Ventas/notas_ventas"><span>Registrar Nota de Ventas</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">trending_down</i>
                            <span>Informes Varios</span>
                        </a>
                        <ul class="ml-menu">
                            <li><a href="/taller_front/compras/Informes_Compra"><span>Informes Web Compras</span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>

                
                    <li class="header">LABELS</li>
                    <li>
                        <a href="javascript:void(0);">
                            <i class="material-icons col-red">donut_large</i>
                            <span>Important</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <i class="material-icons col-amber">donut_large</i>
                            <span>Warning</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <i class="material-icons col-light-blue">donut_large</i>
                            <span>Information</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- #Menu -->
            <!-- Footer -->
            <!-- #Footer -->
        </aside>
        <!-- #END# Left Sidebar -->
        <!-- Right Sidebar -->
        <aside id="rightsidebar" class="right-sidebar">
            <ul class="nav nav-tabs tab-nav-right" role="tablist">
                <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
                <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active in active" id="skins">
                    <ul class="demo-choose-skin">
                        <li data-theme="red" class="active">
                            <div class="red"></div>
                            <span>Red</span>
                        </li>
                        <li data-theme="pink">
                            <div class="pink"></div>
                            <span>Pink</span>
                        </li>
                        <li data-theme="purple">
                            <div class="purple"></div>
                            <span>Purple</span>
                        </li>
                        <li data-theme="deep-purple">
                            <div class="deep-purple"></div>
                            <span>Deep Purple</span>
                        </li>
                        <li data-theme="indigo">
                            <div class="indigo"></div>
                            <span>Indigo</span>
                        </li>
                        <li data-theme="blue">
                            <div class="blue"></div>
                            <span>Blue</span>
                        </li>
                        <li data-theme="light-blue">
                            <div class="light-blue"></div>
                            <span>Light Blue</span>
                        </li>
                        <li data-theme="cyan">
                            <div class="cyan"></div>
                            <span>Cyan</span>
                        </li>
                        <li data-theme="teal">
                            <div class="teal"></div>
                            <span>Teal</span>
                        </li>
                        <li data-theme="green">
                            <div class="green"></div>
                            <span>Green</span>
                        </li>
                        <li data-theme="light-green">
                            <div class="light-green"></div>
                            <span>Light Green</span>
                        </li>
                        <li data-theme="lime">
                            <div class="lime"></div>
                            <span>Lime</span>
                        </li>
                        <li data-theme="yellow">
                            <div class="yellow"></div>
                            <span>Yellow</span>
                        </li>
                        <li data-theme="amber">
                            <div class="amber"></div>
                            <span>Amber</span>
                        </li>
                        <li data-theme="orange">
                            <div class="orange"></div>
                            <span>Orange</span>
                        </li>
                        <li data-theme="deep-orange">
                            <div class="deep-orange"></div>
                            <span>Deep Orange</span>
                        </li>
                        <li data-theme="brown">
                            <div class="brown"></div>
                            <span>Brown</span>
                        </li>
                        <li data-theme="grey">
                            <div class="grey"></div>
                            <span>Grey</span>
                        </li>
                        <li data-theme="blue-grey">
                            <div class="blue-grey"></div>
                            <span>Blue Grey</span>
                        </li>
                        <li data-theme="black">
                            <div class="black"></div>
                            <span>Black</span>
                        </li>
                    </ul>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="settings">
                    <div class="demo-settings">
                        <p>GENERAL SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Report Panel Usage</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Email Redirect</span>
                                <div class="switch">
                                    <label><input type="checkbox"><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                        <p>SYSTEM SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Notifications</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Auto Updates</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                        <p>ACCOUNT SETTINGS</p>
                        <ul class="setting-list">
                            <li>
                                <span>Offline</span>
                                <div class="switch">
                                    <label><input type="checkbox"><span class="lever"></span></label>
                                </div>
                            </li>
                            <li>
                                <span>Location Permission</span>
                                <div class="switch">
                                    <label><input type="checkbox" checked><span class="lever"></span></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
        <!-- #END# Right Sidebar -->
    </section>