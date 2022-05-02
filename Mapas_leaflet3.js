 //agregar mapa a la composicion del contenido
var mapoptions = {center:[15.5,-88.03],zoom: 12,zoomControl: true,maxZoom:16};
var setMaxBounds = [14.0758, -87.1826, 14.1075, -87.1418]; 
var mapa = L.map('map3',mapoptions,setMaxBounds); 
//agregar escala 
new L.control.scale({imperial:false}).addTo(mapa); 
//hacer un zoom a los elementos seleccionados 
//agarar un elemnto por su id y generar un evento que ejecute una funcion de cambio 

//capas de teselas que se agregaran al mapa 
var satelite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'  
});

var calles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
var terreno = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
//Agregar titutlo del mapa
var info = L.control();
// Crear un div con una clase info este div se agregara al mapa
info.onAdd = function(mapa){
    this._div = L.DomUtil.create('div','info2');
    this.update();
    return this._div;
};
info.update = function(props){
    this._div.innerHTML = '<h4>Mapa riesgo inundacion.<br> San Pedro Sula. <br> 2021.</h4> <br> <img src="COPECO.png" alt="Albergues">'}; 
info.addTo(mapa);  
//agregar capas geojson
// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.Departamen){
        layer.bindPopup("<strong>Departamento: </strong>" + feature.properties.Departamen + "<br/>" +
        "<strong>Nombre albergue: </strong>" + feature.properties.Albergue + "<br/>" + 
        "<strong>Tipo de albergue: </strong>" + feature.properties.Tipo_ALB + "<br/>" + 
        "<strong>Tipo de instalacion: </strong>: </strong>" + feature.properties.Tipo_Ins + "<br/>" + 
        "<strong>Colonia: </strong>: </strong>" + feature.properties.Colonia + "<br/>"
        );
    }
} 

function getColor(d){
    return  d == "Albergue comunitario en instalación cerrada" ? '#51DC11' :
            d == "Albergue comunitario tipo campaña" ? '#E3E910' :
            '#404040'; } 
function style(feature){
                return {
                    fillColor: getColor(feature.properties.Tipo_ALB),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Albergues_COPECO = L.geoJson(Albergues_COPECO,{
                        style: style,
                        onEachFeature: popup});
//mapa 2
function popup2(feature,layer){
    if(feature.properties && feature.properties.GRIDCODE){
        layer.bindPopup("<strong>Valor: </strong>" + feature.properties.GRIDCODE + "<br/>" +
        "<strong>Tipo de amanaza: </strong>" + feature.properties.AMENAZA + "<br/>" + 
        "<strong>AreaHa: </strong>" + feature.properties.Area_Ha + "<br/>" 

        );
    }
} 

function getColor2(d){
    return  d == 1 ? '#F81D0B' :
            d == 2 ? '#EEEE06' :
            d == 3 ? '#5BF80C' :
            '#404040'; } 
function style2(feature){
                return {
                    fillColor: getColor2(feature.properties.GRIDCODE),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Riesgos_inundacion_SPS = L.geoJson(Riesgos_inundacion_SPS,{
                        style: style2,
                        onEachFeature: popup2});
//mapa 3
function popup3(feature,layer){
    if(feature.properties && feature.properties.INUNDA){
        layer.bindPopup("<strong>Tipo de amanaza: </strong>" + feature.properties.INUNDA + "<br/>" +
        "<strong>Nombre edificio: </strong>" + feature.properties.NOMBRE + "<br/>" + 
        "<strong>AreaHa: </strong>" + feature.properties.AREA_HA + "<br/>" 

        );
    }
} 

function getColor3(d){
    return  d == "Muy Alta" ? '#EF140A' :
            d == "Alta" ? '#F55709' :
            d == "Media" ? '#EBBF0A' :
            d == "Nula" ? '#5EF80B' :
            '#404040'; } 
function style3(feature){
                return {
                    fillColor: getColor3(feature.properties.INUNDA),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '2',
                    fillOpacity: 0.7};} 
var Estructura_urbana_SPS = L.geoJson(Estructura_urbana_SPS,{
                        style: style3,
                        onEachFeature: popup3});
//agrupar las capas 
var baseMaps  =  {
    'Satelite':satelite,
    'calles': calles,
    'noche':terreno
};
//agrupar las capas geojson 
var capas = {
'Albergues COPECO nivel nacional':Albergues_COPECO,
'Riesgo inundacion SPS':Riesgos_inundacion_SPS,
'Estructura urbana en riesgos':Estructura_urbana_SPS
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
const legend3 = L.control.Legend({ 
        position: "bottomright",
        collapsed: false,
        symbolWidth: 24,
        opacity:0,
        column:1,
        title:"Simbologia",
        legends: [
            {label: "Albergues COPECO.", 
            type: "image",
            url: "COPECO.png",
            weight: 2,
            layers: Albergues_COPECO,
            inactive: false,}, 
            {label: "Riesgo inundacion SPS.", 
            type: "image",
            url: "inundacion.jpg",
            weight: 2,
            layers: Riesgos_inundacion_SPS,
            inactive: false,},
            {label: "Estructura urbana riesgo.", 
            type: "image",
            url: "edificio_img.jpg",
            weight: 2,
            layers: Estructura_urbana_SPS,
            inactive: false,}
        ]}).addTo(mapa); 



 

