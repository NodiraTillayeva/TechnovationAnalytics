// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tile layer (default)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// Add additional basemaps
var baseMaps = {
    "Stamen Terrain": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.',
        maxZoom: 18
    })
};

// Add a Layer Control to switch between basemaps
L.control.layers(baseMaps).addTo(map);

// Create a MarkerClusterGroup with custom styles
var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
        var markers = cluster.getAllChildMarkers();
        var n = markers.length;
        var color = n < 10 ? 'blue' : n < 20 ? 'green' : n < 50 ? 'orange' : 'red';
        return L.divIcon({
            html: `<div style="background-color: ${color}; border-radius: 50%; color: white; width: 30px; height: 30px; line-height: 30px; text-align: center;">${n}</div>`,
            className: 'custom-cluster-icon'
        });
    }
});

// Example participant data
var participants = [
    {
        "name": "Shahzoda",
        "role": "Participant, Mentor",
        "year": "2022–2023",
        "university": "Tashkent University of Information Technologies named after Muhammad al-Khwarizmi, Tashkent",
        "specialization": "Engineering",
        "quote": "I’m not going to limit myself just because people won’t accept the fact that I can do something else.",
        "location": [41.2995, 69.2401]  // Coordinates for Tashkent
    }
    // Add more participants with their details and coordinates here
];

// Add markers to the MarkerClusterGroup with popups
participants.forEach(function(participant) {
    var marker = L.marker(participant.location);
    var popupContent = `
        <strong>${participant.name}</strong><br>
        Role: ${participant.role}<br>
        Year of participation: ${participant.year}<br>
        The name of the university: ${participant.university}<br>
        Specialization: ${participant.specialization}<br>
        Quote: “${participant.quote}”
    `;
    marker.bindPopup(popupContent);
    markers.addLayer(marker);
});

// Add the MarkerClusterGroup to the map
map.addLayer(markers);

// Create and add a search control
var searchControl = new L.Control.Search({
    layer: markers,
    propertyName: 'name',
    marker: false,
    moveToLocation: function(latlng, title, map) {
        if (latlng) {
            var zoom = 10; // Set zoom level
            map.setView(latlng, zoom); // Move map to location
        } else {
            console.warn('latlng is undefined for the searched location.');
        }
    }
});

// Add the search control to the map
searchControl.addTo(map);
