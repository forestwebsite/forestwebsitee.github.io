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

var SateliteStyle = L.tileLayer('mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
	minZoom: 0,
	maxZoom: 8,
	noWrap: true,
	continuousWorld: false,
	attribution: 'Online map GTA V',
	id: 'SateliteStyle map',
});
var AtlasStyle = L.tileLayer('mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {
	minZoom: 0,
	maxZoom: 5,
	noWrap: true,
	continuousWorld: false,
	attribution: 'Online map GTA V',
	id: 'styleAtlas map',
});
var GridStyle = L.tileLayer('mapStyles/styleGrid/{z}/{x}/{y}.png', {
	minZoom: 0,
	maxZoom: 5,
	noWrap: true,
	continuousWorld: false,
	attribution: 'Online map GTA V',
	id: 'styleGrid map',
});

var ExampleGroup = L.layerGroup();

var Icons = {
	"Example": ExampleGroup,
};

var mymap = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [0, 0],
    zoom: 3,
});

var layersControl = L.control.layers({
	"Satelite": SateliteStyle,
	"Atlas": AtlasStyle,
	"Grid": GridStyle
}, Icons).addTo(mymap);

function customIcon(icon){
	return L.icon({
		iconUrl: `blips/${icon}.png`,
		iconSize:     [20, 20],
		iconAnchor:   [20, 20], 
		popupAnchor:  [-10, -27]
	});
}

// Tek bir blip (örnek)
var X = 0;
var Y = 0;
L.marker([Y, X], {icon: customIcon(1)}).addTo(Icons["Example"]).bindPopup("I am here.");

// Tüm diğer blipler (senin verdiğin lokasyonlar)
var coords = [
  [-815.24, -1078.54], [-812.44, -1339.83], [-704.07, -1401.18], [-722.13, -932.13],
  [-807.15, -1376.63], [-828.11, -1257.90], [29.14, -1353.49], [-1179.88, -885.32],
  [-1432.59, -277.20], [-1541.35, 121.86], [-1519.63, 144.05], [378.24, 321.60],
  [932.02, 46.34], [1162.86, -328.20], [-804.52, -1304.18], [-56.02, -1756.88],
  [127.90, -1300.90], [122.33, -1294.05], [85.18, -1393.79], [-224.82, -1396.55],
  [126.02, -207.80], [153.54, -1037.24], [-3169.19, 1060.41], [-3162.46, 1083.49],
  [-1483.01, 106.62], [-628.80, -218.98], [876.12, -2126.41], [1399.57, 1144.57],
  [-335.14, 6153.58], [-388.11, 6235.39], [1685.44, 4822.16], [1932.97, 3722.04],
  [-355.45, -46.79], [-1455.39, -229.52]
];

coords.forEach(([y, x]) => {
	L.marker([y, x], {icon: customIcon(1)}).addTo(Icons["Example"]);
});
