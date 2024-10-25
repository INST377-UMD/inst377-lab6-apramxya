function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const map = L.map('map').setView([38, -95], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

const markers = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

markers.forEach((marker, index) => {
    const leafletMarker = L.marker([marker.lat, marker.lon]).addTo(map);

    document.getElementById(`marker${index + 1}-coords`).textContent = `Latitude: ${marker.lat}, Longitude: ${marker.lon}`;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.lat}&longitude=${marker.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Unknown";
            document.getElementById(`marker${index + 1}-locality`).textContent = locality;
        })
        .catch(error => {
            console.error("Error fetching locality data:", error);
            document.getElementById(`marker${index + 1}-locality`).textContent = "Locality not found!";
        });
});
