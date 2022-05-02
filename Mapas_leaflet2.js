 //agregar mapa a la composicion del contenido
var mapoptions = {center:[14.216667,-86.700000],zoom: 10,zoomControl: true};
var setMaxBounds = [14.0758, -87.1826, 14.1075, -87.1418]; 
var mapa = L.map('map2',mapoptions,setMaxBounds); 
//agregar escala 
new L.control.scale({imperial:false}).addTo(mapa); 
//hacer un zoom a los elementos seleccionados 
//agarar un elemnto por su id y generar un evento que ejecute una funcion de cambio 
//al correr una funcion 

//capas de teselas que se agregaran al mapa 
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
//Agregar titutlo del mapa
var info = L.control();
// Crear un div con una clase info este div se agregara al mapa
info.onAdd = function(mapa){
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
};
info.update = function(props){
    this._div.innerHTML = '<h4>Mapa Ubicacion optima.<br> Teupasenti. <br> Cedro Caoba.</h4>'}; 

info.addTo(mapa); 
//agregar capas geojson
// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.Clase){
        layer.bindPopup("<strong>clase: </strong>" + feature.properties.Clase + "<br/>" +
        "<strong>Tipo cambio: </strong>" + feature.properties.Valor + "<br/>" + 
        "<strong>AreaHa: </strong>" + feature.properties.Area + "<br/>" + 
        "<strong>%</strong>: </strong>" + feature.properties.porcentaje + "<br/>" 

        );
    }
} 

function getColor(d){
    return  d == 1 ? '#51DC11' :
            d == 2 ? '#E3E910' :
            d == 3 ? '#EF230A' :
            '#404040'; } 
function style(feature){
                return {
                    fillColor: getColor(feature.properties.Clase),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Ubicacion_caoba = L.geoJson(Ubicacion_caoba,{
                        style: style,
                        onEachFeature: popup});
//mapa 2
function popup2(feature,layer){
    if(feature.properties && feature.properties.Valor){
        layer.bindPopup("<strong>clase: </strong>" + feature.properties.Valor + "<br/>" +
        "<strong>Tipo cambio: </strong>" + feature.properties.Clase + "<br/>" + 
        "<strong>AreaHa: </strong>" + feature.properties.Area + "<br/>" + 
        "<strong>%</strong>: </strong>" + feature.properties.porcentaje + "<br/>" 

        );
    }
} 

function getColor2(d){
    return  d == 1 ? '#51DC11' :
            d == 2 ? '#E3E910' :
            d == 3 ? '#EF230A' :
            '#404040'; } 
function style2(feature){
                return {
                    fillColor: getColor2(feature.properties.Valor),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Ubicacion_Cedro = L.geoJson(Ubicacion_Cedro,{
                        style: style2,
                        onEachFeature: popup2});

//agrupar las capas 
var baseMaps  =  {
    'Satelite':satelite,
    'calles': calles,
    'noche':terreno
};
//agrupar las capas geojson 
var capas = {
'Ubicacion optima arbol de Caoba':Ubicacion_caoba,
'Ubicacion optima arbol de Cedro':Ubicacion_Cedro
};
//agregar capas al mapa en un control de capas
L.control.layers(baseMaps,capas).addTo(mapa);

//agregar mapas de carto 
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});
// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(mapa);  

const legend2 = L.control.Legend({ 
        position: "bottomright",
        collapsed: false,
        symbolWidth: 24,
        opacity:0,
        column:1,
        title:"Simbologia",
        legends: [
            {label: "Ubicacion optima Cedro.", 
            type: "image",
            url: "Cedro.jpg",
            weight: 2,
            layers: Ubicacion_Cedro,
            inactive: false,}, 
            {label: "Ubicacion optima Caoba.", 
            type: "image",
            url: "Caoba.jpg",
            weight: 2,
            layers: Ubicacion_caoba,
            inactive: false,}
        ]}).addTo(mapa);
