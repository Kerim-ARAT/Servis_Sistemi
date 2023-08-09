/*
document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([39.920770, 32.854110], 7);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
    var locations = [];
    var savedRoutes = [];
    var currentRouteMarkers = []; // Son eklenen rotanın işaretçilerini tutacak dizi
  
    var lastAddedMarker = null;
  
    map.on('click', function (event) {
      var latitude = event.latlng.lat;
      var longitude = event.latlng.lng;
      var locationName = prompt("Lütfen durak adını girin:");
  
      if (locationName) {
        var newLocation = { name: locationName, lat: latitude, lng: longitude };
        locations.push(newLocation);
  
        var marker = L.marker([latitude, longitude]).addTo(map).bindPopup(locationName).openPopup();
  
        if (lastAddedMarker) {
          map.removeLayer(lastAddedMarker);
          currentRouteMarkers.pop(); // Son eklenen rotanın işaretçisini kaldır
        }
        lastAddedMarker = marker;
        currentRouteMarkers.push(marker); // Son eklenen rotanın işaretçisini ekle
  
        if (locations.length >= 2) {
          drawRoute();
        }
      }
    });
  
    function drawRoute() {
      var waypoints = locations.map(function (location) {
        return L.latLng(location.lat, location.lng);
      });
  
      if (map.hasLayer(routeControl)) {
        map.removeControl(routeControl);
      }
  
      var routeControl = L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }]
        },
        createMarker: function() {}
      }).addTo(map);
    }
  
    document.getElementById("saveButton").addEventListener("click", function () {
      if (locations.length >= 2) {
        savedRoutes.push(locations);
        locations = [];
        lastAddedMarker = null;
        currentRouteMarkers = []; // Yeni rota için işaretçi dizisini sıfırla
        alert("Rota kaydedildi!");
      } else {
        alert("En az 2 nokta ekleyin!");
      }
    });
  
    document.getElementById("showRoutesButton").addEventListener("click", function () {
      if (savedRoutes.length > 0) {
        var routeList = document.getElementById("routeList");
        routeList.innerHTML = "";
  
        savedRoutes.forEach(function (route, index) {
          var listItem = document.createElement("li");
          listItem.innerHTML = "<a href='#' onclick='showRoute(" + index + ")'>Rota " + (index + 1) + "</a>";
          routeList.appendChild(listItem);
        });
      } else {
        alert("Kaydedilmiş rota yok!");
      }
    });
  
    window.showRoute = function (index) {
      var route = savedRoutes[index];
      if (route) {
        locations = route;
        drawRoute();
      }
    };
  
    document.getElementById("resetButton").addEventListener("click", function () {
      locations = [];
      lastAddedMarker = null;
      currentRouteMarkers.forEach(function (marker) {
        map.removeLayer(marker); // Son eklenen rotanın işaretçilerini kaldır
      });
      currentRouteMarkers = [];
      savedRoutes = [];
      map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer); // Tüm çizgileri kaldır
        }
        if (layer instanceof L.Marker) {
          map.removeLayer(layer); // Tüm durak işaretçilerini kaldır
        }
      });
      var routeList = document.getElementById("routeList");
      routeList.innerHTML = "";
    });
  
    document.getElementById("undoButton").addEventListener("click", function () {
      if (locations.length > 0) {
        var removedLocation = locations.pop();
        lastAddedMarker && map.removeLayer(lastAddedMarker);
        lastAddedMarker = currentRouteMarkers.pop(); // Son eklenen rotanın işaretçisini sil
        if (locations.length >= 2) {
          map.removeControl(routeControl);
          drawRoute();
        }
        alert(removedLocation.name + " adlı durak geri alındı.");
      } else {
        alert("Geri alınacak durak yok!");
      }
    });
  });
  normal ilk baştaki kod
  */


















  document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
    var locations = [];
    var savedRoutes = [];
    var routeLayer = null;
  
    var lastAddedMarker = null;
  
    map.on('click', function (event) {
      var latitude = event.latlng.lat;
      var longitude = event.latlng.lng;
      var locationName = prompt("Lütfen durak adını girin:");
  
      if (locationName) {
        var newLocation = { name: locationName, lat: latitude, lng: longitude };
        locations.push(newLocation);
  
        var marker = L.marker([latitude, longitude]).addTo(map).bindPopup(locationName).openPopup();
  
        if (lastAddedMarker) {
          map.removeLayer(lastAddedMarker);
        }
        lastAddedMarker = marker;
  
        if (locations.length >= 2) {
          drawRoute();
        }
      }
    });
  
    function drawRoute() {
      var waypoints = locations.map(function (location) {
        return L.latLng(location.lat, location.lng);
      });
  
      if (routeLayer) {
        map.removeControl(routeLayer);
      }
  
      routeLayer = L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }]
        },
        createMarker: function() {}
      }).addTo(map);
    }
  
    function resetMap() {
      locations = [];
      savedRoutes = [];
      if (routeLayer) {
        map.removeControl(routeLayer);
        routeLayer = null;
      }
      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      alert("Harita sıfırlandı!");
    }
  
    document.getElementById("saveButton").addEventListener("click", function () {
      if (locations.length >= 2) {
        savedRoutes.push(locations.slice()); // Rotayı kaydetmek için kopyasını al
        locations = [];
        lastAddedMarker = null;
        alert("Rota kaydedildi!");
      } else {
        alert("En az 2 nokta ekleyin!");
      }
    });
  
    document.getElementById("showRoutesButton").addEventListener("click", function () {
      if (savedRoutes.length > 0) {
        var routeList = document.getElementById("routeList");
        routeList.innerHTML = "";
  
        savedRoutes.forEach(function (route, index) {
          var listItem = document.createElement("li");
          listItem.innerHTML = "<a href='#' onclick='showRoute(" + index + ")'>Rota " + (index + 1) + "</a>";
          routeList.appendChild(listItem);
        });
      } else {
        alert("Kaydedilmiş rota yok!");
      }
    });
  
    document.getElementById("resetMapButton").addEventListener("click", function () {
      resetMap();
    });
  
    window.showRoute = function (index) {
      var route = savedRoutes[index];
      if (route) {
        locations = route.slice(); // Kaydedilen rotayı geri yükle
        drawRoute();
      }
    };
  });
  
  
  



  document.addEventListener("DOMContentLoaded", function () {
    var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
  
    var savedRoutesList = document.getElementById("savedRoutesList");
    savedRoutes.forEach(function (route, index) {
      var listItem = document.createElement("li");
      listItem.innerHTML = "Rota " + (index + 1) + ": " + getRouteString(route);
      savedRoutesList.appendChild(listItem);
    });
  
    function getRouteString(route) {
      return route.map(function (location) {
        return location.name;
      }).join(" -> ");
    }
  
    var map = L.map("map").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
    function drawRoute(route) {
      var waypoints = route.map(function (location) {
        return L.latLng(location.lat, location.lng);
      });
  
      L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }]
        },
        createMarker: function() {}
      }).addTo(map);
    }
  
    savedRoutes.forEach(function (route) {
      drawRoute(route);
    });
  
    map.addControl(new L.Control.Fullscreen());
  
    document.getElementById("newRouteButton").addEventListener("click", function () {
      var newRoute = [];
      map.off('click');
      map.on('click', function (event) {
        var latitude = event.latlng.lat;
        var longitude = event.latlng.lng;
        var locationName = prompt("Lütfen durak adını girin:");
  
        if (locationName) {
          var newLocation = { name: locationName, lat: latitude, lng: longitude };
          newRoute.push(newLocation);
  
          var marker = L.marker([latitude, longitude]).addTo(map).bindPopup(locationName).openPopup();
  
          if (newRoute.length >= 2) {
            drawRoute(newRoute);
          }
        }
      });
    });
  });






//geojeson kuıl















