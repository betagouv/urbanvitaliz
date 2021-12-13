var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_2021_12_13_projets_toprocess_inprogress_ready_done_1 = new ol.format.GeoJSON();
var features_2021_12_13_projets_toprocess_inprogress_ready_done_1 = format_2021_12_13_projets_toprocess_inprogress_ready_done_1.readFeatures(json_2021_12_13_projets_toprocess_inprogress_ready_done_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_2021_12_13_projets_toprocess_inprogress_ready_done_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_2021_12_13_projets_toprocess_inprogress_ready_done_1.addFeatures(features_2021_12_13_projets_toprocess_inprogress_ready_done_1);
var lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_2021_12_13_projets_toprocess_inprogress_ready_done_1, 
                style: style_2021_12_13_projets_toprocess_inprogress_ready_done_1,
                interactive: true,
    title: '2021_12_13_projets_toprocess_inprogress_ready_done<br />\
    <img src="styles/legend/2021_12_13_projets_toprocess_inprogress_ready_done_1_0.png" /> DONE<br />\
    <img src="styles/legend/2021_12_13_projets_toprocess_inprogress_ready_done_1_1.png" /> IN_PROGRESS<br />\
    <img src="styles/legend/2021_12_13_projets_toprocess_inprogress_ready_done_1_2.png" /> READY<br />\
    <img src="styles/legend/2021_12_13_projets_toprocess_inprogress_ready_done_1_3.png" /> TO_PROCESS<br />'
        });

lyr_OSMStandard_0.setVisible(true);lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1];
lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1.set('fieldAliases', {'id': 'id', 'status': 'status', 'name': 'name', 'location': 'location', 'commune.id': 'commune.id', 'commune.in': 'commune.in', 'commune.po': 'commune.po', 'commune.na': 'commune.na', 'commune.lo': 'commune.lo', 'commune.la': 'commune.la', 'switchtend': 'switchtend', 'switchte_1': 'switchte_1', 'commune.de': 'commune.de', 'commune._1': 'commune._1', 'Lien': 'Lien', });
lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1.set('fieldImages', {'id': 'TextEdit', 'status': 'TextEdit', 'name': 'TextEdit', 'location': 'TextEdit', 'commune.id': 'TextEdit', 'commune.in': 'TextEdit', 'commune.po': 'TextEdit', 'commune.na': 'TextEdit', 'commune.lo': 'TextEdit', 'commune.la': 'TextEdit', 'switchtend': 'TextEdit', 'switchte_1': 'TextEdit', 'commune.de': 'TextEdit', 'commune._1': 'TextEdit', 'Lien': 'TextEdit', });
lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1.set('fieldLabels', {'id': 'no label', 'status': 'no label', 'name': 'no label', 'location': 'no label', 'commune.id': 'no label', 'commune.in': 'no label', 'commune.po': 'no label', 'commune.na': 'no label', 'commune.lo': 'no label', 'commune.la': 'no label', 'switchtend': 'no label', 'switchte_1': 'no label', 'commune.de': 'no label', 'commune._1': 'no label', 'Lien': 'no label', });
lyr_2021_12_13_projets_toprocess_inprogress_ready_done_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});