document.addEventListener("DOMContentLoaded", function () {
    var savedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
  
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
  });
  document.addEventListener("DOMContentLoaded", function () {
    // ... (daha önceki kodlar buraya gelecek)
  
    // Rotaları gösterme
    document.getElementById("showRoutesButton").addEventListener("click", function () {
      if (savedRoutes.length > 0) {
        savedRoutes.forEach(function (route) {
          drawRoute(route);
        });
      } else {
        alert("Kaydedilmiş rota yok!");
      }
    });
  });








































  