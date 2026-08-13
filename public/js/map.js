const map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingLocation)}`
)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            map.setView([lat, lon], 10);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`
                        <b>🏡 ${listingTitle}</b><br>
                        📍 ${listingLocation}<br>`)
                // .openPopup();
        } else {
            console.log("Location not found");
        }
    })
    .catch(error => {
        console.log("Error finding location:", error);
    });