

document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    var markers = [];

    map.on('click', function (event) {
        var latitude = event.latlng.lat;
        var longitude = event.latlng.lng;

        var marker = L.marker([latitude, longitude]).addTo(map);
        markers.push(marker);

        if (markers.length > 1) {
            drawRoute(markers);
        }
    });

    function drawRoute(markers) {
        var latlngs = markers.map(function (marker) {
            return marker.getLatLng();
        });

        var randomColor = getRandomColor();
        var polyline = L.polyline(latlngs, { color: randomColor }).addTo(map);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    document.getElementById("saveRouteButton").addEventListener("click", function () {
        saveRoute(markers);
        refreshMap();
    });

    function saveRoute(markers) {
        var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
        var latlngs = markers.map(function (marker) {
            return marker.getLatLng();
        });
        savedRoutes.push({ latlngs: latlngs, color: 'blue' });
        localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
        alert("Rota kaydedildi!");
    }

    document.getElementById("newRouteButton").addEventListener("click", function () {
        newRoute();
    });

    function newRoute() {
        markers.forEach(function (marker) {
            map.removeLayer(marker);
        });
        markers = [];
        
        map.eachLayer(function (layer) {
            if (layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        alert("Yeni rota oluşturuldu!");
    }

    document.getElementById("resetMapButton").addEventListener("click", function () {
        resetMap();
    });

    function resetMap() {
        markers.forEach(function (marker) {
            map.removeLayer(marker);
        });
        markers = [];

        map.eachLayer(function (layer) {
            if (layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        alert("Harita sıfırlandı!");
    }
});

function refreshMap() {
    var savedRoutesMap = L.map("savedRoutesMap").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(savedRoutesMap);

    savedRoutesMap.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
            savedRoutesMap.removeLayer(layer);
        }
    });

    var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    drawRoutes(savedRoutes);
}

function drawRoutes(savedRoutes) {
    savedRoutes.forEach(function (route) {
        var latlngs = route.latlngs.map(function (point) {
            return L.latLng(point.lat, point.lng);
        });

        L.polyline(latlngs, { color: route.color }).addTo(savedRoutesMap);
    });
}

document.getElementById("refreshButton").addEventListener("click", function () {
    refreshMap();
});

function clearRoutes() {
    localStorage.removeItem("savedRoutes");
    refreshMap();
}

document.getElementById("clearRoutesButton").addEventListener("click", function () {
    clearRoutes();
});

document.getElementById("saveRouteButton").addEventListener("click", function () {
    var routeName = document.getElementById("routeName").value;
    if (!routeName) {
        alert("Lütfen rota ismini girin.");
        return;
    }

    saveRoute(markers, routeName);
    refreshMap();
});

function saveRoute(markers, routeName) {
    var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    var latlngs = markers.map(function (marker) {
        return marker.getLatLng();
    });
    savedRoutes.push({ latlngs: latlngs, color: 'blue', name: routeName });
    localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
    alert("Rota kaydedildi!");
}

//yeni kod



var map = L.map("map").setView([39.920770, 32.854110], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

var markers = [];
var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];

map.on('click', function (event) {
    var latitude = event.latlng.lat;
    var longitude = event.latlng.lng;

    var marker = L.marker([latitude, longitude]).addTo(map);
    markers.push(marker);

    if (markers.length > 1) {
        drawRoute(markers);
    }
});

function drawRoute(markers) {
    var latlngs = markers.map(function (marker) {
        return marker.getLatLng();
    });

    var randomColor = getRandomColor();
    var polyline = L.polyline(latlngs, { color: randomColor }).addTo(map);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById("saveRouteButton").addEventListener("click", function () {
    var routeNameInput = document.getElementById("routeNameInput");
    var routeName = routeNameInput.value;
    saveRoute(markers, routeName);
    refreshMap();
});

function saveRoute(markers, routeName) {
    var latlngs = markers.map(function (marker) {
        return marker.getLatLng();
    });
    savedRoutes.push({ latlngs: latlngs, color: 'blue', name: routeName });
    localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
    alert("Rota kaydedildi!");
    markers = []; // Kaydedildikten sonra marker dizisini sıfırla
}









refreshMap();

