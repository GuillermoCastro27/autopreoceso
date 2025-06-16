function formatoTabla(titulo = "Listado") {
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        destroy: true,
        responsive: true,
        buttons: [
            {
                extend: 'copy',
                text: 'COPIAR',
                className: 'btn btn-primary waves-effect',
                title: titulo
            },
            {
                extend: 'excel',
                text: 'EXCEL',
                className: 'btn btn-success waves-effect',
                title: titulo
            },
            {
                extend: 'pdfHtml5',
                text: 'PDF',
                className: 'btn btn-danger waves-effect',
                title: titulo,
                orientation: 'landscape', // ✅ HOJA HORIZONTAL
                pageSize: 'A4',
                exportOptions: {
                    columns: ':visible'
                },
                customize: function (doc) {
                    // Ajustar fuente y tamaño de tabla
                    doc.defaultStyle.fontSize = 8;
                    doc.styles.tableHeader.fontSize = 9;
                    doc.styles.tableHeader.alignment = 'center';
                    doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                }
            },
            {
                extend: 'print',
                text: 'IMPRIMIR',
                className: 'btn btn-warning waves-effect',
                title: titulo
            }
        ],
        iDisplayLength: 3,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: {
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}

function buscarInforme() {
    const desde = document.getElementById("fecha_desde").value;
    const hasta = document.getElementById("fecha_hasta").value;
    const tipo = document.getElementById("tipo").value;

    if (!desde || !hasta) {
        alert("Debe seleccionar ambas fechas");
        return;
    }

    let url = "";
    let titulo = "";
    let columnas = "";

    // 🔥 Destruir DataTable si ya existe para evitar conflicto al cambiar tipo
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }

    // 🧹 Limpiar contenido anterior
    document.getElementById("tabla_informes").innerHTML = "";
    document.getElementById("cabecera_tabla").innerHTML = "";

    if (tipo === "pedidos") {
        url = getUrl() + "pedidos/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Pedidos";
        columnas = `
            <th>Código</th>
            <th>Empresa</th>
            <th>Sucursal</th>
            <th>Fecha</th>
            <th>Entrega</th>
            <th>Observaciones</th>
            <th>Encargado</th>
            <th>Estado</th>
        `;
    } else if (tipo === "presupuestos") {
        url = getUrl() + "presupuestos/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Presupuestos";
        columnas = `
            <th>Código</th>
            <th>Empresa</th>
            <th>Sucursal</th>
            <th>Fecha</th>
            <th>Plazo de Entrega</th>
            <th>Observaciones</th>
            <th>proveedor</th>
            <th>ruc</th>
            <th>Encargado</th>
            <th>Estado</th>
            <th>Pedido</th>
        `;
    } else if (tipo === "ordenes_compras") {
        url = getUrl() + "ordenes_compras/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Órdenes de Compra";
        columnas = `
            <th>Código</th>
            <th>Fecha</th>
            <th>proveedor</th>
            <th>ruc</th>
            <th>Intervalo Fecha de Vencimiento</th>
            <th>Estado</th>
            <th>Condición</th>
            <th>Cuotas</th>
            <th>Encargado</th>
            <th>Empresa</th>
            <th>Sucursal</th>
            <th>Presupuesto</th>
        `;
    } else if (tipo === "compras") {
        url = getUrl() + "compras/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Compras";
        columnas = `
            <th>Código</th>
            <th>Empresa</th>
            <th>Sucursal</th>
            <th>Fecha</th>
            <th>Intervalo Fecha de Vencimiento</th>
            <th>proveedor</th>
            <th>ruc</th>
            <th>Condición</th>
            <th>Cuotas</th>
            <th>Encargado</th>
            <th>Estado</th>
            <th>Orden de Compra</th>
        `;
    } else if (tipo === "libro_compras") {
        url = getUrl() + "libro_compras/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Libro de Compras";
        columnas = `
            <th>Código</th>
            <th>Fecha</th>
            <th>Tipo Nota</th>
            <th>Proveedor</th>
            <th>RUC</th>
            <th>Condición</th>
            <th>Tipo de Impuesto</th>
            <th>Monto</th>
            <th>Cuota</th>
        `;
    } else if (tipo === "notas_remision") {
        url = getUrl() + "notaremicomp/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Notas de Remisión";
        columnas = `
            <th>Código</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Estado</th>
            <th>Encargado</th>
            <th>Empresa</th>
            <th>Sucursal</th>
        `;
    } else if (tipo === "ajuste_inventario") {
        url = getUrl() + "ajus_cab/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Ajustes de Inventario";
        columnas = `
            <th>Código</th>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Encargado</th>
            <th>Empresa</th>
            <th>Sucursal</th>
        `;
    }else if (tipo === "notas_compra") {
        url = getUrl() + "notacompcab/buscar-informe?desde=" + desde + "&hasta=" + hasta;
        titulo = "Listado de Notas de Compra";
        columnas = `
            <th>Código</th>
            <th>Empresa</th>
            <th>Sucursal</th>
            <th>Fecha</th>
            <th>Entrega</th>
            <th>Tipo</th>
            <th>Proveedor</th>
            <th>RUC</th>
            <th>Condición</th>
            <th>Cuotas</th>
            <th>Encargado</th>
            <th>Estado</th>
            <th>Compra</th>
        `;
    }else {
        alert("Tipo de informe no implementado aún.");
        return;
    }

    document.getElementById("cabecera_tabla").innerHTML = columnas;
    document.getElementById("contenedor_tabla").style.display = "block";

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            return res.json();
        })
        .then(data => {
            let html = "";
            data.forEach(row => {
                if (tipo === "pedidos") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                            <td>${row.fecha}</td>
                            <td>${row.entrega}</td>
                            <td>${row.observaciones}</td>
                            <td>${row.encargado}</td>
                            <td>${row.estado}</td>
                        </tr>
                    `;
                } else if (tipo === "presupuestos") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                            <td>${row.fecha}</td>
                            <td>${row.entrega}</td>
                            <td>${row.observaciones}</td>
                            <td>${row.proveedor}</td>
                            <td>${row.ruc}</td>
                            <td>${row.encargado}</td>
                            <td>${row.estado}</td>
                            <td>${row.pedido}</td>
                        </tr>
                    `;
                } else if (tipo === "ordenes_compras") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.fecha}</td>
                            <td>${row.proveedor}</td>
                            <td>${row.ruc}</td>
                            <td>${row.entrega}</td>
                            <td>${row.estado}</td>
                            <td>${row.condicion_pago}</td>
                            <td>${row.cuotas}</td>
                            <td>${row.encargado}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                            <td>${row.presupuesto}</td>
                        </tr>
                    `;
                } else if (tipo === "compras") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                            <td>${row.fecha}</td>
                            <td>${row.entrega}</td>
                            <td>${row.proveedor}</td>
                            <td>${row.ruc}</td>
                            <td>${row.condicion_pago}</td>
                            <td>${row.cuotas}</td>
                            <td>${row.encargado}</td>
                            <td>${row.estado}</td>
                            <td>${row.ordencompra}</td>
                        </tr>
                    `;
                } else if (tipo === "libro_compras") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.fecha}</td>
                            <td>${row.tipo_nota}</td>
                            <td>${row.proveedor}</td>
                            <td>${row.ruc}</td>
                            <td>${row.condicion_pago}</td>
                            <td>${row.impuesto}</td>
                            <td>${row.monto}</td>
                            <td>${row.cuota}</td>
                        </tr>
                    `;
                }else if (tipo === "notas_remision") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.fecha}</td>
                            <td>${row.observaciones}</td>
                            <td>${row.estado}</td>
                            <td>${row.encargado}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                        </tr>
                    `;
                }else if (tipo === "ajuste_inventario") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.fecha}</td>
                            <td>${row.motivo}</td>
                            <td>${row.tipo}</td>
                            <td>${row.estado}</td>
                            <td>${row.encargado}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                        </tr>
                    `;
                }else if (tipo === "notas_compra") {
                    html += `
                        <tr>
                            <td>${row.id}</td>
                            <td>${row.empresa}</td>
                            <td>${row.sucursal}</td>
                            <td>${row.fecha}</td>
                            <td>${row.entrega}</td>
                            <td>${row.tipo}</td>
                            <td>${row.proveedor}</td>
                            <td>${row.ruc}</td>
                            <td>${row.condicion_pago}</td>
                            <td>${row.cuotas}</td>
                            <td>${row.encargado}</td>
                            <td>${row.estado}</td>
                            <td>${row.compra}</td>
                        </tr>
                    `;
                }
            });

            document.getElementById("tabla_informes").innerHTML = html;
            formatoTabla(titulo);
        })
        .catch(error => {
            console.error("Error al cargar el informe:", error);
            alert("Hubo un problema al cargar los datos.");
        });
}

