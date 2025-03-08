

const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {

        return Math.pow(2, zoom);
    },
    zoom: function(sc) {

        return Math.log(sc) / 0.6931471805599453;
    },
	distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
	transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

var SateliteStyle = L.tileLayer('styleAtlas/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 8,noWrap: true,continuousWorld: false,attribution: '0RESMON MAP',id: 'SateliteStyle map',});
 
var zero_resmon_map = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [0, 0],
    zoom: 5,
});

setInterval(() => {
    
	$.post("https://s4-carcontrol/getCoors", {}, function (data) {

        zero_resmon_map.eachLayer((layer) => {
            if(layer['_latlng']!=undefined)
                layer.remove();
        });

		var marker  = L.marker([data.y, data.x], {icon: L.icon({
            iconUrl: 'navi.png',
            iconSize:     [40, 50], 
            iconAnchor:   [50, 35], 
            
        })});
        marker.addTo(zero_resmon_map);
        console.log(data, "yok")
        zero_resmon_map.setView([data.y, data.x], 12);
	});

  

}, 1000);


// var params = new URL(document.location).searchParams;
// var x = params.get("x");
// var y = params.get("y");
// var marker  = L.marker([y, x], {icon: L.icon({
//     iconUrl: 'navi.png',
//     iconSize:     [40, 50], 
//     iconAnchor:   [50, 35], 
    
// })});
// marker.addTo(zero_resmon_map);
// zero_resmon_map.setView([y, x], 12);

