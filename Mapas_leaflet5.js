//options del mapa 
let mapoptions1 = {
    center: [15.8454,-87.9376],
    zoom:12,
    zoomControl:true,
    maxZoom:16};
//limites boundingboxs de la vista del mapa
let setMaxBounds1 = [14.0758, -87.1826, 14.1075, -87.1418]; 
//crear nuesttro mapa 
let mapa1 = L.map('map5',mapoptions1,setMaxBounds1);
new L.control.scale({imperial:false}).addTo(mapa1);  
//agregar mnapas bases para el mapa 
//google maps
let satelite1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'  
});
//mapa base de google calles
let calles1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
//mapa base open street map 
let terreno1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
//agregar un titulo al mapa 
let info1 = L.control();
// Crear un div con una clase info este div se agregara al mapa
info1.onAdd = function(mapa1){
    this._div = L.DomUtil.create('div','info6');
    this.update();
    return this._div;
}; 
//crear nuestro elemento HTML 
info1.update = function (mapa1){
    this._div.innerHTML = '<h4>Mapa Parametros Geonorfologicos<br>Cuenca rio Tulian<br>Dept Cortés<br></h4> <ul> <li>Nombre:Cuenca rio Tulian</li><li>Area:50.05Km2</li><li>Perimetro:65.82Km</li><li>Longitud cuenca: 22.73Km</li><li>Altitud media: 314.88msm</li> <li>Ancho:2.20</li><li>Long rio: 10.69Km</li></ul> <br><img src="Curva_Hisometrica2.png" alt="Curvas"> <br> <img src="Frecuenca_altitudes2.png" alt="Frcuencias"> <br> <p>Fuente:GEE Alos Palsar.</p> <br> <p>Hecho: QGIS,SAGA y Javascipt</p> <br> <p>Carlos Archaga Analista SIG.</p>'}; 
info1.addTo(mapa1); 

// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.Nombre){
        layer.bindPopup("<strong>Nombre cuenca: </strong>" + feature.properties.Nombre + "<br/>" +
        "<strong>Area: </strong>" + feature.properties.Area + "<br/>" + 
        "<strong>Perimetro: </strong>" + feature.properties.Perimetro + "<br/>" + 
        "<strong>Altitud media cuenca: </strong>: </strong>" + feature.properties.Alti_media + "<br/>" + 
        "<strong>Uso: </strong>: </strong>" + feature.properties.Uso + "<br/>" + 
        "<strong>Longitud de la cuenca: </strong>: </strong>" + feature.properties.Longitud + "<br/>" + 
        "<strong>Ancho: </strong>: </strong>" + feature.properties.Ancho + "<br/>" + 
        "<strong>Longitud rios KM: </strong>: </strong>" + feature.properties.Long_rios + "<br/>" + 
        "<strong>Factor de forma: </strong>: </strong>" + feature.properties.F_Forma + "<br/>" + 
        "<strong>Indice compacidad KC: </strong>: </strong>" + feature.properties.KC + "<br/>" + 
        "<strong>Pendiente de la cuenca: </strong>: </strong>" + feature.properties.Slope_CH + "<br/>" + 
        "<strong>Lado mayor: </strong>: </strong>" + feature.properties.LadoMayor + "<br/>" + 
        "<strong>Lado menor: </strong>: </strong>" + feature.properties.LadoMenor + "<br/>" + 
        "<strong>Coeficiente de masividad: </strong>: </strong>" + feature.properties.CM + "<br/>" + 
        "<strong>Coeficiente orografico: </strong>: </strong>" + feature.properties.CO + "<br/>" + 
        "<strong>Densidad de drenaje: </strong>: </strong>" + feature.properties.D_Drenaje + "<br/>" + 
        "<strong>Extension media de escurrimiento: </strong>: </strong>" + feature.properties.Es + "<br/>" +
        "<strong>Frecuencia de rios: </strong>: </strong>" + feature.properties.F_rios + "<br/>" + 
        "<strong>Pendiente media del rio principal: </strong>: </strong>" + feature.properties.I + "<br/>" + 
        "<strong>Coeficiente de Torrencialidad: </strong>: </strong>" + feature.properties.Cm_T + "<br/>" + 
        "<strong>Coeficiente de Pasibilidad: </strong>: </strong>" + feature.properties.Ct + "<br/>");
    }
} 

    //popup cuenca declarada 
    function popup2(feature,layer){
        if(feature.properties && feature.properties.NOM_MICRO_){
            layer.bindPopup("<strong>Nombre cuenca: </strong>" + feature.properties.NOM_MICRO_ + "<br/>" +
            "<strong>Area Ha: </strong>" + feature.properties.AREA_HAS__ + "<br/>" + 
            "<strong>Perimetro: </strong>" + feature.properties.PERIMETER + "<br/>" + 
            "<strong>Departamento: </strong>: </strong>" + feature.properties.DEPTO_ + "<br/>" + 
            "<strong>Uso: </strong>: </strong>" + feature.properties.USO + "<br/>" + 
            "<strong>Uso de suelo: </strong>: </strong>" + feature.properties.USO_SUELO + "<br/>" + 
            "<strong>Comunidad: </strong>: </strong>" + feature.properties.COMUNIDAD_ + "<br/>" + 
            "<strong>Riesgo de erosion: </strong>: </strong>" + feature.properties.RIESGO_ERO + "<br/>" + 
            "<strong>Hay animales?: </strong>: </strong>" + feature.properties.ANIMALES_
            );
        }
    }
     //popup rios 
     function popup3(feature,layer){
        if(feature.properties && feature.properties.ORDER_){
            layer.bindPopup(
            "<strong>Orden de rio: </strong>" + feature.properties.ORDER_ + "<br/>" + 
            "<strong>Perimetro KM: </strong>" + feature.properties.KM + "<br/>" 
            );
        }
    } 
    //funcion para color rios 
    function getColor(d){
                return  d == 1 ? '#0000e6' :
                        d == 2 ? ' #8533ff' :
                        '#404040'; } 
    function style(feature){return {
                            fillColor: getColor(feature.properties.ORDER_),
                            weight: 2,
                            fillOpacity: 0.7}}  
    //popup curvas de nivel 
    function popup4(feature,layer){
        if(feature.properties && feature.properties.ELEV){
            layer.bindPopup(
                "<strong>Elevacion: </strong>" + feature.properties.ELEV);}}
    //crear capas con sus  elementos 
    let style1 = {
        fillColor:'green' ,
        weight: 2,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.2};

    let cuenca_generada1 = L.geoJson(cuenca_generada,{
        style:style1,
        onEachFeature: popup});
     
    /*let style5 = {
        fillColor:'yellow' ,
        weight: 2,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.7};*/

    /*let cuenca_declarada1 = L.geoJson(cuenca_declarada,{
        style:style5,
        onEachFeature: popup2});*/
    
    let rio1 = L.geoJson(rio,{
        style:style,
        onEachFeature: popup3});
    
    let style6 = {fillColor:'white',
    weight: 2,
    color:'yellow',
    fillOpacity: 0.7};  

    let curvas1 = L.geoJson(curvas,{style:style6,
                            onEachFeature: popup4});

    //agrupar las capas 
var baseMaps  =  {
    'Satelite':satelite1,
    'calles': calles1,
    'noche':terreno1
};
var conseciones_mineras = L.tileLayer.wms("https://territoriosenriesgo.unah.edu.hn/geoserver/ows?", {
    layers: 'Concesiones_Mineras_2020',
    format: 'image/png',
    transparent: true,
    opacity: 0.7,
    attribution: "Geoportal OT UNAH."
});

let capa_wms =  L.tileLayer.wms("http://localhost:82/geoserver/Raster_Mapboxes/ows?", {
    layers: 'DEM_cuenca',
    format: 'image/png',
    transparent: true,
    opacity: 0.6,
    attribution: "QGIS y Geoserver."
}); 
let capa_wms2 = L.tileLayer.wms("http://localhost:82/geoserver/Raster_Mapboxes/ows?",{
    layers: 'Hillshade_DEM',
    format: 'image/png',
    transparent: true,
    opacity: 1,
    attribution: "QGIS y Geoserver"
});

//agrupar las capas geojson 
var capas = {
'Hillshade':capa_wms2,
'DEM':capa_wms,
'Cuenca generada actualizada':cuenca_generada1,
//'Cuenca declarada ICF 1995':cuenca_declarada1,
'Rios cuenca':rio1,
'Curvas de nivel':curvas1

};
//agregar capas al mapa en un control de capas
L.control.layers(baseMaps,capas,{position: "topleft"}).addTo(mapa1); 

//agregar mapas de carto 
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});
// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(mapa1);  

    const legend7 = new L.control.Legend({ 
        position: "bottomleft",
        collapsed: false,
        symbolWidth: 24,
        opacity:0,
        column:1,
        title:"Simbologia",
        legends: [
            {label: "Relieve cuenca.", 
            type: "image",
            url: "Relieve.jpg",
            weight: 2,
            layers: capa_wms2,
            inactive: false,}, 
            {label: "Modelo de elevacion.", 
            type: "image",
            url: "inundacion.jpg",
            weight: 2,
            layers: capa_wms,
            inactive: false,},
            {label: "Cuenca actualizada.", 
            type: "polygon",
            color: "#ffff",
            fillColor: "#00e600",
            weight: 2,
            sides: 4,
            layers: cuenca_generada1,
            inactive: false,},
            {label: "Rios cuenca.", 
            type: "polyline",
            color: "#ffff",
            fillColor: "#1a1aff",
            weight: 2,
            sides: 4,
            layers: rio1,
            inactive: false,},
            {
            label: "Curvas cuenca.", 
            type: "polyline",
            color: "#ffff",
            fillColor: "#ffff00",
            weight: 2,
            sides: 4,
            layers: curvas1,
            inactive: false,}
        ]}).addTo(mapa1);   





    
        
    

    
            
        
    





