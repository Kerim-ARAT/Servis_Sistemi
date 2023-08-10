var savedRoutesMap;
var markers = [];

document.addEventListener("DOMContentLoaded", function () {
    savedRoutesMap = L.map("savedRoutesMap").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(savedRoutesMap);

    refreshMap();
});

function refreshMap() {
    if (savedRoutesMap) {
        savedRoutesMap.eachLayer(function (layer) {
            if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                savedRoutesMap.removeLayer(layer);
            }
        });

        var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
        drawRoutes(savedRoutes);
    }
}

function drawRoutes(savedRoutes) {
    markers.forEach(function (marker) {
        savedRoutesMap.removeLayer(marker);
    });
    markers = [];

    savedRoutes.forEach(function (route) {
        var latlngs = route.latlngs.map(function (point) {
            return L.latLng(point.lat, point.lng);
        });

        var randomColor = getRandomColor(); // Rastgele renk seçimi
        L.polyline(latlngs, { color: randomColor }).addTo(savedRoutesMap);

        latlngs.forEach(function (latlng) {
            var marker = L.marker(latlng).addTo(savedRoutesMap);
            markers.push(marker);
        });
    });
}

document.getElementById("refreshButton").addEventListener("click", function () {
    refreshMap();
});

document.getElementById("clearRoutesButton").addEventListener("click", function () {
    clearRoutes();
});

function clearRoutes() {
    localStorage.removeItem("savedRoutes");
    refreshMap();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}