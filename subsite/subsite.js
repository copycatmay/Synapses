    // Initialize Leaflet Map
    var map = L.map('mapid').setView([0, 0], 2);
    L.tileLayer.provider('CartoDB.DarkMatterNoLabels', {
        maxZoom: 6,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);