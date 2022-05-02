//agregar mapa a la composicion del contenido
var mapoptions = {center:[14.085278,-87.163056],zoom: 10,zoomControl: true};
var setMaxBounds = [14.0758, -87.1826, 14.1075, -87.1418]; 
var mapa = L.map('map',mapoptions,setMaxBounds); 
//agregar escala 
new L.control.scale({imperial:false}).addTo(mapa); 
//hacer un zoom a los elementos seleccionados 
//agarar un elemnto por su id y generar un evento que ejecute una funcion de cambio 
//al correr una funcion 

var satelite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'  
});

var calles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
var terreno = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
//agrupar las capas 
var baseMaps  =  {
    'Satelite':satelite,
    'calles': calles,
    'noche':terreno
};
//agregar capas al mapa en un control de capas
L.control.layers(baseMaps).addTo(mapa);

//agregar mapas de carto 
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(mapa); 
//Agregar titutlo del mapa
var info = L.control();
// Crear un div con una clase info este div se agregara al mapa
info.onAdd = function(mapa){
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
};
info.update = function(props){
    this._div.innerHTML = '<h4>Mapa Cambio de uso de suelo.<br> Distrito Central <br> Año 1994 a 2017</h4>'};

info.addTo(mapa); 
// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.Tipo){
        layer.bindPopup("<strong>clase: </strong>" + feature.properties.Class + "<br/>" +
        "<strong>Tipo cambio: </strong>" + feature.properties.Tipo + "<br/>" + 
        "<strong>AreaHa: </strong>" + feature.properties.Area + "<br/>" + 
        "<strong>%</strong>: </strong>" + feature.properties.Porcentaje + "<br/>" 

        );
    }
} 

function getColor(d){
    return  d == 1 ? '#0CF5B5' :
            d == 2 ? '#F06B09' :
            d == 3 ? '#0E55ED' :
            d == 4 ? '#F5E609' : 
            d == 5 ? '#F01B06' :
            d == 6 ? '#59F80F' :
            '#404040'; } 
function style(feature){
                return {
                    fillColor: getColor(feature.properties.Class),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Uso_suelo = L.geoJson(Uso_suelo_DC,{style: style,onEachFeature: popup}).addTo(mapa); 
