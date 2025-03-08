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

var SateliteStyle = L.tileLayer('styleAtlas/{z}/{x}/{y}.jpg', {
    minZoom: 0, maxZoom: 8, noWrap: true, continuousWorld: false,
    attribution: '0RESMON MAP', id: 'SateliteStyle map',
});

// 🟢 **Önce haritayı oluştur**
var zero_resmon_map = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [0, 0],
    zoom: 3,
});

// 🟢 **LayerGroup'u oluştur ve haritaya ekle**
var ExampleGroup = L.layerGroup().addTo(zero_resmon_map); // ✅ **Önce ekliyoruz!**

var Icons = {
    "Example": ExampleGroup, // ✅ **Şimdi tanımlama doğru yapıldı**
};

// 🟢 **Layer kontrolü için düzeltilmiş kod**
var layersControl = L.control.layers({ "Satelite": SateliteStyle }, Icons).addTo(zero_resmon_map);

function customIcon(icon) {
    return L.icon({
        iconUrl: `navi.png`,
        iconSize: [20, 20],
        iconAnchor: [10, 10], // İkonun ortalanması için 10,10 yapıldı
        popupAnchor: [0, -10]
    });
}

// 🔹 Marker İçin Örnek Koordinat
var X = 0; // X koordinatı
var Y = 0; // Y koordinatı

// 🟢 **Marker artık çalışacak!**
L.marker([X, Y], { icon: customIcon(1) })
    .addTo(ExampleGroup) // ✅ **Önce haritaya eklediğimiz layer'a ekliyoruz**
    .bindPopup("I am here.");

zero_resmon_map.setView([X, Y], 12);
