// Initialize the map
var map = L.map('map', {
    center: [20, 0], // Center of the map
    zoom: 2,         // Initial zoom level
    minZoom: 2,      // Minimum zoom level
    maxZoom: 18,     // Maximum zoom level
    maxBounds: [
        [-90, -180], // South-West corner
        [90, 180]    // North-East corner
    ],
    maxBoundsViscosity: 0.5 // Controls how close the view can go to the bounds before bouncing back
});

// Define the OpenStreetMap and Satellite layers
var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map); // Set as default

var satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
});

// Define custom icons
var jobIcon = createCustomIcon('static/js/marker.png', 30, 30);
var educationIcon = createCustomIcon('static/js/marker.png', 30, 30);

// Helper function to create custom icons
function createCustomIcon(iconUrl, width, height) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [width, height],
        iconAnchor: [width / 2, height],
        popupAnchor: [0, -height + 10]
    });
}

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

// Example alumni data (random points across the world)
var alumni = [
    { "name": "Alumni 1", "type": "job", "location": [41.2995, 69.2401] }, // Tashkent
    { "name": "Alumni 2", "type": "education", "location": [48.8566, 2.3522] }, // Paris
    { "name": "Alumni 3", "type": "job", "location": [41.1495, 69.2201], "properties": { "name": "Alumni 1" } }, // Tashkent
    { "name": "Alumni 4", "type": "job", "location": [41.2235, 69.3451], "properties": { "name": "Alumni 1" } }, // Tashkent
    { "name": "Alumni 5", "type": "job", "location": [41.1295, 69.2401], "properties": { "name": "Alumni 1" } }, // Tashkent
    // Add more alumni with their details and coordinates here
];

// Add markers to the MarkerClusterGroup with popups and custom icons
alumni.forEach(function(alum) {
    var icon = alum.type === "job" ? jobIcon : educationIcon; // Choose icon based on alumni type
    var marker = L.marker(alum.location, { icon: icon });
    var popupContent = `<strong>${alum.name}</strong><br>Type: ${alum.type}`;
    marker.bindPopup(popupContent);
    markers.addLayer(marker);
});

// Add the MarkerClusterGroup to the map
map.addLayer(markers);

// Create custom basemap toggle buttons
var basemapControlDiv = L.control({ position: 'topright' });

basemapControlDiv.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'basemap-control');

    // Create OpenStreetMap button
    var osmButton = createBasemapButton(div, 'Map', function () {
        map.removeLayer(satelliteMap);
        map.addLayer(openStreetMap);
        setActiveButton(osmButton, satelliteButton);
    });

    // Create Satellite button
    var satelliteButton = createBasemapButton(div, 'Satellite', function () {
        map.removeLayer(openStreetMap);
        map.addLayer(satelliteMap);
        setActiveButton(satelliteButton, osmButton);
    });

    // Set default active state
    osmButton.classList.add('active');

    return div;
};

// Helper function to create basemap buttons
function createBasemapButton(container, label, onClick) {
    var button = L.DomUtil.create('button', 'basemap-button', container);
    button.innerHTML = label;
    button.onclick = onClick;
    return button;
}

// Helper function to set the active button style
function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

basemapControlDiv.addTo(map);

// Create and add a geocoder control
L.Control.geocoder({
    defaultMarkGeocode: false // Disable default marker behavior
}).on('markgeocode', function(e) {
    var latlng = e.geocode.center;
    map.setView(latlng, 10); // Pan and zoom to the found location
}).addTo(map);

let currentIndex = 0;

function scrollList(direction) {
    const viewport = document.querySelector('.carousel-viewport');
    const list = document.querySelector('.company-list');
    const items = document.querySelectorAll('.company-list li');
    const itemWidth = items[0].offsetWidth + 40; // Item width + margin (20px each side)

    const maxScroll = list.scrollWidth - viewport.offsetWidth;

    // Calculate new scroll position
    currentIndex += direction;
    let newScroll = currentIndex * itemWidth;

    // Prevent scrolling out of bounds
    if (newScroll < 0) {
        newScroll = 0;
        currentIndex = 0;
    } else if (newScroll > maxScroll) {
        newScroll = maxScroll;
        currentIndex = Math.floor(maxScroll / itemWidth);
    }

    // Apply the scroll
    list.style.transform = `translateX(-${newScroll}px)`;
}
