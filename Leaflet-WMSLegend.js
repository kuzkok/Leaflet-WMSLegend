/**
 * Created by kuzkok on 12.02.2016.
 */
L.Control.WMSLegend = L.Control.extend({
    options: {
        position: 'bottomleft',
        url: '',
        layers: [],
        version: '1.3.0'
    },

    onAdd: function(map){
        this._container = L.DomUtil.create('div', '');

        var control = this;
        this.options.layers.forEach(function(layer){
            var parameters = {
                service: 'WMS',
                request: 'GetLegendGraphic',
                format: 'image/png',
                version: control.options.version,
                layer: layer.name
            };

            var div = L.DomUtil.create('div', 'leaflet-wmslegend');

            var label = L.DomUtil.create('span', 'leaflet-wmslegend-label');
            label.innerHTML = layer.title;

            div.appendChild(label);

            var image = L.DomUtil.create('img', 'leaflet-wmslegend-image');
            image.src = control.options.url + L.Util.getParamString(parameters);

            div.appendChild(image);

            control._container.appendChild(div);
        });

        return this._container;
    }
});

L.Control.wmsLegend = function(options){
    return new L.Control.WMSLegend(options);
};