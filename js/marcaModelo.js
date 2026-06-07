/**
 * Helper reutilizable para selección de Marca y Modelo en módulos de detalle.
 * Requiere que existan elementos #marca_det_mm y #modelo_det_mm en el DOM,
 * o los crea automáticamente si no existen.
 *
 * Variables globales exportadas: _mmMarcaId, _mmModeloId
 * Funciones: mmCargarMarcas(itemId, marcaSelId), mmCargarModelos(itemId, marcaId, modeloSelId)
 *            mmLimpiar(), mmHabilitar(itemId, marcaSelId, modeloSelId), mmDeshabilitar()
 */
var _mmMarcaId    = null;
var _mmModeloId   = null;
var _mmCacheMarca = {};
var _mmCacheModelo= {};

$(function() {
    // Bindear cambio de marca via delegación (funciona aunque el elemento se cree después)
    $(document).off('change._mm', '#marca_det_mm').on('change._mm', '#marca_det_mm', function() {
        _mmMarcaId  = $(this).val() || null;
        _mmModeloId = null;
        var itemId  = $('#item_id').val();
        mmCargarModelos(itemId, _mmMarcaId, null);
    });
    $(document).off('change._mm', '#modelo_det_mm').on('change._mm', '#modelo_det_mm', function() {
        _mmModeloId = $(this).val() || null;
    });
});

function mmCargarMarcas(itemId, marcaSelId) {
    _mmMarcaId  = marcaSelId || null;
    _mmModeloId = null;
    $('#marca_det_mm').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_mm').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!itemId) return;
    var cb = function(data) {
        _mmCacheMarca[itemId] = data;
        var opts = '<option value="">-- Marca --</option>';
        data.forEach(function(m) {
            var id = m.marca_id;
            opts += '<option value="'+id+'"'+(id==marcaSelId?' selected':'')+'>'+m.marc_nom+'</option>';
        });
        $('#marca_det_mm').html(opts).removeAttr('disabled');
        if (marcaSelId) { _mmMarcaId = marcaSelId; mmCargarModelos(itemId, marcaSelId, null); }
    };
    if (_mmCacheMarca[itemId]) cb(_mmCacheMarca[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/marcas', cb);
}

function mmCargarModelos(itemId, marcaId, modeloSelId) {
    _mmMarcaId  = marcaId;
    _mmModeloId = modeloSelId || null;
    $('#modelo_det_mm').html('<option value="">-- Modelo --</option>').prop('disabled', true);
    if (!marcaId || !itemId) return;
    var cb = function(data) {
        _mmCacheModelo[itemId] = data;
        var filtrados = data.filter(function(m){ return String(m.marca_id)===String(marcaId); });
        if (!filtrados.length) return;
        var opts = '<option value="">-- Modelo --</option>';
        filtrados.forEach(function(m) {
            var id = m.modelo_id;
            opts += '<option value="'+id+'"'+(id==modeloSelId?' selected':'')+'>'
                + m.modelo_nom + (m.modelo_año?' ('+m.modelo_año+')':'') + '</option>';
        });
        $('#modelo_det_mm').html(opts).removeAttr('disabled');
        if (modeloSelId) { $('#modelo_det_mm').val(modeloSelId); _mmModeloId = modeloSelId; }
    };
    if (_mmCacheModelo[itemId]) cb(_mmCacheModelo[itemId]);
    else $.get(getUrl() + 'items/' + itemId + '/modelos', cb);
}

function mmLimpiar() {
    _mmMarcaId  = null;
    _mmModeloId = null;
    $('#marca_det_mm').html('<option value="">-- Marca --</option>').prop('disabled', true);
    $('#modelo_det_mm').html('<option value="">-- Modelo --</option>').prop('disabled', true);
}

function mmAutocompletar(itemId, marcaId, modeloId) {
    _mmMarcaId  = marcaId  || null;
    _mmModeloId = modeloId || null;
    if (marcaId) {
        mmCargarMarcas(itemId, marcaId);
        if (modeloId) setTimeout(function(){ mmCargarModelos(itemId, marcaId, modeloId); }, 350);
    } else {
        mmLimpiar();
    }
}
