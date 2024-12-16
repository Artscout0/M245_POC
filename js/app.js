import dijkstra from "./modules/dijkstra.js";

let supported_countries = ["CHE"];

let nodes = [
    {
        "id": "zh_air",
        "name": "Zurich Airport",
        "connected_to": [
            { "id": "zh_train", "type": "train" },
            { "id": "bs_train", "type": "train" },
            { "id": "ge_air", "type": "plane" },
            { "id": "vs_air", "type": "plane" }
        ],
        "posX": 47.464722,
        "posY": 8.549167
    },
    {
        "id": "ge_air",
        "name": "Geneva Airport",
        "connected_to": [
            { "id": "ge_train", "type": "train" },
            { "id": "zh_air", "type": "plane" },
            { "id": "vs_air", "type": "plane" }
        ],
        "posX": 46.23756,
        "posY": 6.10921
    },
    {
        "id": "ge_train",
        "name": "Cornavin Train Station",
        "connected_to": [
            { "id": "ge_air", "type": "train" },
            { "id": "vd_nyon_train", "type": "train" },
            // { "id": "vd_laussane_train", "type": "train" },
            // { "id": "be_train", "type": "train" }
        ],
        "posX": 46.210217,
        "posY": 6.142447
    },
    {
        "id": "vd_nyon_train",
        "name": "Nyon Train Station",
        "connected_to": [
            { "id": "vd_laussane_train", "type": "train" },
            { "id": "ge_train", "type": "train" }
        ],
        "posX": 46.3833,
        "posY": 6.2396
    },
    {
        "id": "zh_train",
        "name": "Zurich HB Train Station",
        "connected_to": [
            { "id": "zh_air", "type": "train" },
            { "id": "be_train", "type": "train" },
            { "id": "bs_train", "type": "train" },
            { "id": "sg_train", "type": "train" },
            { "id": "lu_train", "type": "train" }
        ],
        "posX": 47.378177,
        "posY": 8.540192
    },
    {
        "id": "be_train",
        "name": "Bern Train Station",
        "connected_to": [
            { "id": "zh_train", "type": "train" },
            { "id": "vd_laussane_train", "type": "train" },
            { "id": "bs_train", "type": "train" },
            { "id": "fr_train", "type": "train" },
            { "id": "lu_train", "type": "train" }
        ],
        "posX": 46.94809,
        "posY": 7.44744
    },
    {
        "id": "lu_train",
        "name": "Lucerne Train Station",
        "connected_to": [
            { "id": "zh_train", "type": "train" },
            { "id": "be_train", "type": "train" },
            { "id": "ti_lugano_train", "type": "train" }
        ],
        "posX": 47.05048,
        "posY": 8.31031
    },
    {
        "id": "ti_lugano_train",
        "name": "Lugano Train Station",
        "connected_to": [
            { "id": "lu_train", "type": "train" },
            { "id": "ti_air", "type": "plane" }
        ],
        "posX": 46.00593,
        "posY": 8.94062
    },
    {
        "id": "ti_air",
        "name": "Lugano Airport",
        "connected_to": [
            { "id": "ti_lugano_train", "type": "train" },
            { "id": "ge_air", "type": "plane" },
            { "id": "zh_air", "type": "plane" },
            { "id": "vs_air", "type": "plane" }

        ],
        "posX": 46.004275,
        "posY": 8.96028
    },
    {
        "id": "vd_laussane_train",
        "name": "Lausanne Train Station",
        "connected_to": [
            // { "id": "ge_train", "type": "train" },
            { "id": "vd_nyon_train", "type": "train" },
            { "id": "be_train", "type": "train" }
        ],
        "posX": 46.516,
        "posY": 6.6296
    },
    {
        "id": "bs_train",
        "name": "Basel SBB Train Station",
        "connected_to": [
            { "id": "zh_train", "type": "train" },
            { "id": "be_train", "type": "train" },
            { "id": "lu_train", "type": "train" }
        ],
        "posX": 47.5475,
        "posY": 7.5892
    },
    {
        "id": "sg_train",
        "name": "St. Gallen Train Station",
        "connected_to": [
            { "id": "zh_train", "type": "train" },
            { "id": "gr_davos_train", "type": "train" }
        ],
        "posX": 47.4245,
        "posY": 9.3767
    },
    {
        "id": "gr_davos_train",
        "name": "Davos Platz Train Station",
        "connected_to": [
            { "id": "sg_train", "type": "train" }
        ],
        "posX": 46.8023,
        "posY": 9.8365
    },
    {
        "id": "vs_zermatt_train",
        "name": "Zermatt Train Station",
        "connected_to": [
            { "id": "vs_brig_train", "type": "train" }
        ],
        "posX": 46.0207,
        "posY": 7.7491
    },
    {
        "id": "vs_brig_train",
        "name": "Brig Train Station",
        "connected_to": [
            { "id": "vs_zermatt_train", "type": "train" }
        ],
        "posX": 46.3172,
        "posY": 7.9855
    },
    {
        "id": "vs_air",
        "name": "Sion Airport",
        "connected_to": [
            { "id": "vs_zermatt_train", "type": "train" },
            { "id": "ge_air", "type": "plane" },
            { "id": "zh_air", "type": "plane" }
        ],
        "posX": 46.2196,
        "posY": 7.3268
    },
    {
        "id": "ne_train",
        "name": "Neuchatel Train Station",
        "connected_to": [
            { "id": "be_train", "type": "train" },
            { "id": "vd_laussane_train", "type": "train" }
        ],
        "posX": 46.9896,
        "posY": 6.9296
    },
    {
        "id": "fr_train",
        "name": "Fribourg Train Station",
        "connected_to": [
            { "id": "be_train", "type": "train" },
            { "id": "vd_laussane_train", "type": "train" }
        ],
        "posX": 46.8039,
        "posY": 7.1513
    }
]

let map = L.map('map').setView([46.8182, 8.2275], 9);
let pathDisplay = document.querySelector("#display-option");

let pathPolylines = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let geoJsonUrl = "https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson";

fetch(geoJsonUrl)
    .then(response => response.json())
    .then(data => {
        var switzerlandData = data.features.filter(
            feature => supported_countries.includes(feature.properties.ISO_A3)
        );

        L.geoJSON(switzerlandData, {
            style: {
                color: "#ff7800",
                weight: 5,
                opacity: 1,
                fillOpacity: 0
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));


let from = document.querySelector("#from");
let to = document.querySelector("#to");

from.innerHTML = nodes.reduce((acc, val) => acc + `<option value="${val.id}">${val.name}</option>`, '');
to.innerHTML = nodes.reduce((acc, val) => acc + `<option value="${val.id}">${val.name}</option>`, '');

document.querySelector("#option-list").hidden = true;

document
    .querySelector("#get_path_form")
    .addEventListener("submit", (e) => {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));

        clearPath();

        let path = display_shortest_path(data.from, data.to, nodes);

        document.querySelector("#option-list").hidden = false;

        let option = path.map(part => {
            let out = "";

            out += part[0]
            out += " - "
            out += part[1]
            out += ` - <img src="img/${part[2]["type"]}.png" alt="${part[2]["type"]}" class="path-img">`

            return out;
        });

        console.log(path);


        pathDisplay.innerHTML = option.join("<br>");
        pathDisplay.dataset.path = path.reduce((acc, cur) => { console.log(cur[2]["type"]); return acc + "|" + cur[0] + "," + cur[1] + "," + (cur[2]["type"]) });

    });

pathDisplay.addEventListener("click", (e) => {
    document.querySelector("#map").hidden = true;

    document.querySelector("#option-list").hidden = true;

    let data = e.currentTarget.dataset.path;

    let parts = data.split("|");
    
    let out = "";

    for (const part of parts) {
        let elem = part.split(",");

        out += `<li class="list-group-item"><p>${elem[0]} - ${elem[1]} - ${elem[2]}</p><img src="img/qrcode.png" alt="qrcode" class="qrcode"></li>`;
    }

    document.querySelector("#path-tickets").innerHTML = out;
});


// clears the path
function clearPath() {
    pathPolylines.forEach(polyline => {
        map.removeLayer(polyline);
    });

    pathPolylines = [];
}

// finds and displays the shortest path
function display_shortest_path(start, finish, nodes) {
    let path = dijkstra(start, finish, nodes);

    let out = [];

    if (!path) {
        console.log("No path found.");
        return;
    }

    let pathCoords = [];
    for (let i = 0; i < path.length - 1; i++) {
        let nodeA = nodes.find(n => n.id === path[i]);
        let nodeB = nodes.find(n => n.id === path[i + 1]);
        let connection = nodeA.connected_to.find(c => c.id === nodeB.id);

        let lineCoords = [
            [nodeA.posX, nodeA.posY],
            [nodeB.posX, nodeB.posY]
        ];

        let color = connection.type === "plane" ? "red" : "blue";

        addLine(lineCoords, map, color);

        out.push([nodeA.name, nodeB.name, connection]);
    }

    return out;
}

function addLine(pathCoords, map, color) {
    let polyline = L.polyline(pathCoords, {
        color: color,
        weight: 2,
        opacity: 0.7
    }).addTo(map);

    pathPolylines.push(polyline);


}