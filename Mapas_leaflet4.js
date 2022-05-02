//agregar elementos al mapa 
var mapoptions = {center:[14.085278,-87.163056],zoom:14,zoomControl: true ,maxZoom:19};
var setMaxBounds = [14.0758, -87.1826, 14.1075, -87.1418];
//crear elemento mapa
var mapa = L.map('map4',mapoptions,setMaxBounds);
//capas de teselas que se agregaran al mapa 
var satelite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'  
}); 

var calles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
var terreno = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NpdG9kb2JiaWUiLCJhIjoiY2t2NXlycG5xM3R2ZDJ3cDY2azA3dmxlciJ9.8Q9I-QOLNZ0mZL5pt_JnfQ'}); 
//hacer un zoom a los elementos seleccionados 
//agarar un elemnto por su id y generar un evento que ejecute una funcion de cambio 
//al correr una funcion 
//agregar mapas de carto 
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomright"
    }).addTo(mapa); 
//agregar escala 
//new L.control.scale({imperial:false}).addTo(mapa); 
// Agregar la leyenda

// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.nombre){
        layer.bindPopup("<strong>nombre: </strong>" + feature.properties.nombre + "<br/>" +
        "<strong>AreaKm: </strong>" + feature.properties.kilometers + "<br/>" + 
        "<strong>Geocodigo: </strong>" + feature.properties.geocodigo + "<br/>" + 
        "<strong>HA: </strong>" + feature.properties.hectares + "<br/>" 

        );
    }
}
//Agregar control para ver los datos al pasar el puntero
var info = L.control();
// Crear un div con una clase info este div se agregara al mapa
info.onAdd = function(mapa){
    this._div = L.DomUtil.create('div','info4');
    this.update();
    return this._div;
};
// Agregar el metodo que actualiza el control segun el puntero vaya pasando
info.update = function(props){
    this._div.innerHTML = '<h4>Propiedades Areas verdes DC.</h4>' +
    (props ? 'Sector: '+ props.sector + '<br/>' + ' CV: ' + props.clave_cat  + '<br/>' + 'Uso: ' +
    props.Uso + '<br/>' + 'Colonia: '+ props.nom_col + '<br/>' + 'Codigo: ' +  props.cod_col + '</sup></br><img src="AMDC_catastro.png" alt="AMDC">'
    : 'Pase el puntero por un layer  ');
};
info.addTo(mapa);
//funcion para el color 
function getColor(d){
    return  d == "Area verde" ? '#62F80C' :
            d == "Area verde y equipamiento" ? '#0FF312' :
            d == "Equipamiento" ? '#F37A0F' :
                       '#404040'; 
  } 
  function style(feature){
    return {
        fillColor: getColor(feature.properties.Uso),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


// AGregar interaccion del puntero con la capa para resaltar el objeto
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#09F3E1',
        dashArray: '1',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);
}

// Configurar los cambios de resaltado y zoom de la capa

var Areas_verdes_DC;
//funcion de reseteo del objetivo agregado y actualizara la Areas verdes
function resetHighlight(e){
    Areas_verdes_DC.resetStyle(e.target);
    info.update();
}
//funcion para obtener los bordes del objeto resaltado 
function zoomToFeature(e){
    mapa.fitBounds(e.target.getBounds());
}
//funcion para ejectuar las funcion highligthfeature cuando este el mouse mouseover
//agregar el puntero y los border de las funciones ejecutadas previamente
//y cuando se le de click al elemnto agarre los elementos atributivos de la capa 
//al div creado
function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


// Agregar capa en formato GeoJson
Areas_verdes_DC = L.geoJson(Areas_verdes_DC,{
    style: style,
    onEachFeature: onEachFeature
});
// Configurar PopUp
function popup2(feature,layer){
    if(feature.properties && feature.properties.clave_cat){
        layer.bindPopup("<strong>clave catastral: </strong>" + feature.properties.clave_cat + "<br/>" +
        "<strong>Sector: </strong>" + feature.properties.sector + "<br/>" + 
        "<strong>Direccion: </strong>" + feature.properties.UBICACIÓN + "<br/>" + 
        "<strong>Nombre colonia: </strong>" + feature.properties.nom_col + "<br/>" 

        );
    }
}
  function style2(feature){
    return {
        fillColor: '#0AF1A4',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.7
    };
}

var Edificios_DC = L.geoJson(Edificios_DC,{
    style: style2,
    onEachFeature: popup2
});
// Configurar PopUp
function popup3(feature,layer){
    if(feature.properties && feature.properties.clave_cat){
        layer.bindPopup("<strong>clave catastral: </strong>" + feature.properties.clave_cat + "<br/>" +
        "<strong>Sector: </strong>" + feature.properties.sector + "<br/>" + 
        "<strong>Direccion: </strong>" + feature.properties.UBICACIÓN + "<br/>" + 
        "<strong>Nombre mercado: </strong>" + feature.properties.NOMBRE + "<br/>" +
        "<strong>Nombre colonia: </strong>" + feature.properties.nom_col + "<br/>"  

        );
    }
}
  function style3(feature){
    return {
        fillColor: '#F7F010',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.7
    };
}
var Mercados_DC = L.geoJson(Mercados_DC,{
    style: style3,
    onEachFeature: popup3
});
//agrupar las capas 
var baseMaps  =  {
    'Satelite':satelite,
    'calles': calles,
    'noche':terreno
};
//agrupar las capas geojson 
var capas = {
'Areas Verdes Distrito Central':Areas_verdes_DC,
'Edificios historicos DC': Edificios_DC,
'Mecados municipales DC': Mercados_DC
};
//agregar capas al mapa en un control de capas
L.control.layers(baseMaps,capas).addTo(mapa); 

const legend4 = L.control.Legend({ 
    position: "bottomleft",
    collapsed: false,
    symbolWidth: 24,
    opacity:0,
    column:1,
    title:"Simbologia",
    legends: [
        {label: "Areas verdes DC.", 
        type: "polygon",
        color: "#ffff",
        fillColor: "#62E90A",
        weight: 2,
        sides: 4,
        layers: Areas_verdes_DC,
        inactive: false,}, 
        {label: "Edificios Municipales DC.", 
        type: "polygon",
        color: "#ffff",
        fillColor: "#15FBDC",
        weight: 2,
        sides: 4,
        layers: Edificios_DC,
        inactive: false,},
        {label: "Mercados Municipales DC.", 
        type: "polygon",
        color: "#ffff", 
        fillColor: "#F7F010",
        weight: 2,
        sides: 4,
        layers: Mercados_DC,
        inactive: false,}
    ]}).addTo(mapa); 

