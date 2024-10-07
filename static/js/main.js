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

// URL of your Google Sheet JSON (replace with your actual URL)
const jsonUrl = "https://docs.google.com/spreadsheets/d/1Zq6m433XYNb4PLtf-QytM4p90p2iou8ybVe2fWJcetg/gviz/tq?tqx=out:json";

// Function to geocode the workplace and return coordinates
async function geocodeLocation(workplace) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(workplace)}&format=json&limit=1`;
    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)]; // Return latitude and longitude
        } else {
            console.warn(`Geocoding failed for ${workplace}`);
            return null; // Return null if no coordinates found
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null; // Return null if there is an error
    }
}

// Fetch JSON data from Google Sheets
fetch(jsonUrl)
    .then(response => response.text())  // Get the response as text
    .then(async text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));  // Clean up the JSON response
        const rows = json.table.rows;  // Get the rows of data
        
        // Alumni data array to hold processed data
        var alumni = [];

        // Loop through each row of data and extract participant details
        for (const row of rows) {
            const alumData = row.c;
            
            // Extract relevant data from each column in the Google Sheet
            const name = alumData[2] ? alumData[2].v : "N/A";
            const role = alumData[4] ? alumData[4].v : "N/A";
            const year = alumData[3] ? alumData[3].v : "N/A";
            const profession = alumData[8] ? alumData[8].v : "N/A";
            const education = alumData[9] ? alumData[9].v : "N/A";
            const workplace = alumData[10] ? alumData[10].v : "N/A";
            const linkedin = alumData[12] ? alumData[12].v : "N/A";
            const opinion = alumData[13] ? alumData[13].v : "N/A";
            
            // Geocode the workplace to get the coordinates
            const location = await geocodeLocation(education);

            if (location) {  // Only add the alumni if location is found
                alumni.push({
                    name: name,
                    type: "job",  // Adjust as needed
                    role: role,
                    year: year,
                    profession: profession,
                    education: education,
                    workplace: workplace,
                    linkedin: linkedin,
                    opinion: opinion,
                    location: location
                });
            }
        }

        // Add alumni data to the map with popups
        alumni.forEach(function(alum) {
            var marker = L.marker(alum.location, { icon: jobIcon });  // Use jobIcon or other icons based on type
            var popupContent = `
                <strong>${alum.name}</strong><br>
                <b>Role:</b> ${alum.role}<br>
                <b>Year:</b> ${alum.year}<br>
                <b>Profession:</b> ${alum.profession}<br>
                <b>Education:</b> ${alum.education}<br>
                <b>Workplace:</b> ${alum.workplace}<br>
                <b>LinkedIn:</b> <a href="${alum.linkedin}" target="_blank">${alum.linkedin}</a><br>
                <b>Opinion:</b> ${alum.opinion}
            `;
            
            marker.bindPopup(popupContent);  // Bind popup content to the marker
            markers.addLayer(marker);  // Add marker to the map
        });
        
        // Add the marker cluster group to the map
        map.addLayer(markers);
    })
    .catch(error => console.error('Error fetching the JSON data:', error));

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
