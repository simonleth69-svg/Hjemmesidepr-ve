let map;
let route = [];
let polyline;
let markers = [];

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", function () {
    initMap();
    setupForm();
    setDefaultDate();

    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) undoBtn.addEventListener("click", undoLastPoint);
});

// ---------------- MAP ----------------
function initMap() {
    map = L.map("map").setView([56.15, 10.20], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    polyline = L.polyline([], { color: "green" }).addTo(map);

    // ✅ ONLY map click (no DOM blocking!)
    map.on("click", addPoint);
}

// ---------------- ADD POINT ----------------
function addPoint(e) {
    const point = [e.latlng.lat, e.latlng.lng];

    route.push(point);

    polyline.setLatLngs(route);

    // marker (kan fjernes hvis du ikke vil have “blå prikker”)
    const marker = L.circleMarker(point, {
        radius: 5,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.8
    }).addTo(map);

    markers.push(marker);

    updateDistanceField();
}

// ---------------- DATE ----------------
function setDefaultDate() {
    const dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }
}

// ---------------- DISTANCE ----------------
function updateDistanceField() {
    const field = document.getElementById("distance");
    if (!field) return;

    if (route.length < 2) {
        field.value = "0 km";
        return;
    }

    let total = 0;

    for (let i = 1; i < route.length; i++) {
        total += map.distance(route[i - 1], route[i]);
    }

    field.value = (total / 1000).toFixed(2) + " km";
}

// ---------------- UNDO ----------------
function undoLastPoint() {
    if (route.length === 0) return;

    route.pop();

    const marker = markers.pop();
    if (marker) map.removeLayer(marker);

    polyline.setLatLngs(route);

    updateDistanceField();
}

// ---------------- FORM ----------------
function setupForm() {
    const form = document.getElementById("routeForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const newRoute = {
            id: Date.now(),
            title: document.getElementById("routeName").value,
            location: document.getElementById("location").value,
            description: document.getElementById("description").value,
            distance: document.getElementById("distance").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            coordinates: route
        };

        saveRoute(newRoute);

        alert("Rute gemt!");

        // reset state (IMPORTANT)
        route = [];
        polyline.setLatLngs([]);
        markers.forEach(m => map.removeLayer(m));
        markers = [];

        window.location.href = "index.html";
    });
}

// ---------------- SAVE ----------------
function saveRoute(routeData) {
    const saved = JSON.parse(localStorage.getItem("brabrandWalks_userRoutes") || "[]");

    saved.push(routeData);

    localStorage.setItem("brabrandWalks_userRoutes", JSON.stringify(saved));
}