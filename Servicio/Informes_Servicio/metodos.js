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
                orientation: 'landscape',
                pageSize: 'A4',
                exportOptions: { columns: ':visible' },
                customize: function (doc) {
                    var desdeVal = document.getElementById('fecha_desde').value;
                    var hastaVal = document.getElementById('fecha_hasta').value;

                    function fmtFecha(s) {
                        if (!s) return '';
                        var p = s.split('-');
                        return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : s;
                    }

                    var periodo  = 'Período: ' + fmtFecha(desdeVal) + ' al ' + fmtFecha(hastaVal);
                    var generado = 'Generado el ' + new Date().toLocaleString('es-PY');

                    doc.pageMargins = [20, 20, 20, 35];
                    doc.defaultStyle.fontSize = 7.5;

                    doc.content.splice(0, 1,
                        {
                            margin: [0, 0, 0, 2],
                            table: {
                                widths: ['*'],
                                body: [[{
                                    text: titulo,
                                    fontSize: 14,
                                    bold: true,
                                    color: '#ffffff',
                                    fillColor: '#2d3436',
                                    alignment: 'center',
                                    margin: [0, 8, 0, 8]
                                }]]
                            },
                            layout: 'noBorders'
                        },
                        {
                            margin: [0, 0, 0, 10],
                            table: {
                                widths: ['*'],
                                body: [[{
                                    text: periodo,
                                    fontSize: 9,
                                    color: '#2d3436',
                                    alignment: 'center',
                                    fillColor: '#f1f2f6',
                                    margin: [0, 4, 0, 4]
                                }]]
                            },
                            layout: 'noBorders'
                        }
                    );

                    var tbl  = doc.content[2].table;
                    var body = tbl.body;
                    var cols = body[0].length;

                    body[0].forEach(function (cell) {
                        cell.fillColor = '#2d3436';
                        cell.color     = '#ffffff';
                        cell.bold      = true;
                        cell.fontSize  = 8;
                        cell.alignment = 'center';
                    });

                    for (var i = 1; i < body.length; i++) {
                        var fill = i % 2 === 0 ? '#f1f2f6' : '#ffffff';
                        body[i].forEach(function (cell) {
                            cell.fillColor = fill;
                        });
                    }

                    tbl.widths = Array(cols + 1).join('*').split('');

                    doc.footer = function (currentPage, pageCount) {
                        return {
                            margin: [20, 5, 20, 0],
                            columns: [
                                { text: generado,                                      fontSize: 7, color: '#636e72' },
                                { text: 'Página ' + currentPage + ' de ' + pageCount, fontSize: 7, color: '#636e72', alignment: 'right' }
                            ]
                        };
                    };
                }
            },
            {
                extend: 'print',
                text: 'IMPRIMIR',
                className: 'btn btn-warning waves-effect',
                title: titulo
            }
        ],
        iDisplayLength: 25,
        language: {
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate: { sNext: 'Siguiente', sPrevious: 'Anterior' }
        }
    });
}

function renderizarTotales(totales) {
    var contenedor = document.getElementById("resumen_totales");
    if (!contenedor) return;
    if (!totales || Object.keys(totales).length === 0) {
        contenedor.style.display = "none";
        return;
    }
    contenedor.style.display = "block";
    contenedor.innerHTML = Object.entries(totales)
        .map(function (entry) {
            return '<span style="display:inline-block;background:#2d3436;color:#fff;' +
                   'padding:4px 12px;border-radius:4px;margin-right:8px;font-size:13px;">' +
                   '<b>' + entry[0] + ':</b> ' + entry[1] + '</span>';
        })
        .join('');
}

function buscarInforme() {
    var desde = document.getElementById("fecha_desde").value;
    var hasta = document.getElementById("fecha_hasta").value;
    var tipo  = document.getElementById("tipo").value;

    if (!desde || !hasta) {
        swal("Advertencia", "Debe seleccionar ambas fechas.", "warning");
        return;
    }

    if (desde > hasta) {
        swal("Advertencia", "La fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.", "warning");
        return;
    }

    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }

    document.getElementById("tabla_informes").innerHTML = "";
    document.getElementById("cabecera_tabla").innerHTML = "";

    var url = getUrl() + "informes/servicio?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta;

    document.getElementById("contenedor_tabla").style.display = "block";

    $.ajax({
        url: url,
        method: 'GET',
        success: function (resp) {
            var cabecera = resp.columnas.map(function (c) {
                return '<th>' + c.label + '</th>';
            }).join('');
            document.getElementById("cabecera_tabla").innerHTML = cabecera;

            var keys = resp.columnas.map(function (c) { return c.key; });
            var html = resp.data.map(function (row) {
                var celdas = keys.map(function (k) {
                    return '<td>' + (row[k] !== null && row[k] !== undefined ? row[k] : '') + '</td>';
                }).join('');
                return '<tr>' + celdas + '</tr>';
            }).join('');

            document.getElementById("tabla_informes").innerHTML = html;

            renderizarTotales(resp.totales);
            formatoTabla(resp.titulo);
        },
        error: function (xhr) {
            document.getElementById("contenedor_tabla").style.display = "none";
            if (xhr.status !== 403) {
                swal('Error', 'No se pudo cargar el informe.', 'error');
            }
        }
    });
}
