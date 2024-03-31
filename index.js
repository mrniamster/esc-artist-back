// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

const port = 3000;
// Use body-parser middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// City data
const cities = [
    { name: "Yapkashnagar", distance: 60, img: "https://i.ibb.co/X5qMP0M/image.png" },
    { name: "Lihaspur", distance: 50, img: "https://i.ibb.co/H2gdg5h/image.png" },
    { name: "Narmis City", distance: 40, img: "https://i.ibb.co/NLQWP7F/image.png" },
    { name: "Shekharvati", distance: 30, img: "https://i.ibb.co/y67yn7B/image.png" },
    { name: "Nuravgram", distance: 20, img: "https://i.ibb.co/RNz988T/image.png" }
];

// Vehicle data
const vehicles = [
    { kind: "EV Bike", range: 60, count: 2, img: "https://i.ibb.co/yd9ZLYS/image.png" },
    { kind: "EV Car", range: 100, count: 1, img: "https://i.ibb.co/c2wG37Q/image.png" },
    { kind: "EV SUV", range: 120, count: 1, img: "https://i.ibb.co/ZfdZrs3/image.png" }
];

// Fugitive's location (simulated)
const fugitiveLocation = cities[Math.floor(Math.random() * cities.length)];

// Calculate distance from each city to the fugitive's location
cities.forEach(city => {
    city.distanceToFugitive = Math.abs(city.distance - fugitiveLocation.distance);
});

// Cops data (selected city and vehicle)
var cops = [
    { name: "Cop 1", selectedCity: null, selectedVehicle: null },
    { name: "Cop 2", selectedCity: null, selectedVehicle: null },
    { name: "Cop 3", selectedCity: null, selectedVehicle: null }
];

// Endpoint to get city data
app.get('/cities', (req, res) => {
    res.json(cities);
});

// Endpoint to get vehicle data
app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

// Endpoint to determine capture status
app.post('/capture-status', (req, res) => {
    // Capture logic
    const closestCop = { distance: Infinity };
    cops = req.body;
    cops.forEach(cop => {
        const distanceToCity = cities.find(city => city.name === cop.selectedCity).distanceToFugitive;

        if (distanceToCity < closestCop.distance) {
            closestCop.distance = distanceToCity;
            closestCop.name = cop.name;
            closestCop.selectedVehicle = cop.selectedVehicle;
        }
        console.log('res', closestCop)
    });
    if (closestCop.distance <= vehicles.find((v) => v.kind == closestCop.selectedVehicle).range) {
        res.json({ captureStatus: true, capturingCop: closestCop.name });
    } else {
        res.json({ captureStatus: false });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
