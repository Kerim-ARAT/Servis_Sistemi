document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([39.920770, 32.854110], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
    // Diğer sayfadan rota bilgilerini al
    var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
  
    var routeLayer = null;
  
    function drawRoute(route) {
      var waypoints = route.map(function (location) {
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
  
    // Önceden kaydedilmiş rotaları çiz
    savedRoutes.forEach(function (route) {
      drawRoute(route);
    });
  
    document.getElementById("findNearestButton").addEventListener("click", function () {
      var address = document.getElementById("addressInput").value;
      if (!address) {
        alert("Lütfen bir adres girin!");
        return;
      }
  
      // En yakın rota bulma işlemleri burada yapılacak
      var geocoder = L.Control.Geocoder.nominatim();
  
      geocoder.geocode(address, function(results) {
        if (results.length > 0) {
          var location = results[0].center;
          var latitude = location.lat;
          var longitude = location.lng;
  
          var nearestRoute = findNearestRoute(latitude, longitude);
          if (nearestRoute) {
            drawRoute(nearestRoute);
          } else {
            alert("Yakın bir rota bulunamadı!");
          }
        } else {
          alert("Girilen adres bulunamadı!");
        }
      });
    });
  
    // En yakın rota bulma fonksiyonu
    function findNearestRoute(latitude, longitude) {
      var nearestRoute = null;
      var nearestDistance = Number.MAX_VALUE;
  
      savedRoutes.forEach(function (route) {
        var distance = calculateDistance(route, latitude, longitude);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestRoute = route;
        }
      });
  
      return nearestRoute;
    }
  
    // İki nokta arasındaki uzaklığı hesaplayan fonksiyon
    function calculateDistance(route, latitude, longitude) {
      var nearestDistance = Number.MAX_VALUE;
  
      for (var i = 0; i < route.length; i++) {
        var location = route[i];
        var distance = Math.sqrt(Math.pow(location.lat - latitude, 2) + Math.pow(location.lng - longitude, 2));
        if (distance < nearestDistance) {
          nearestDistance = distance;
        }
      }
  
      return nearestDistance;
    }
  });
  