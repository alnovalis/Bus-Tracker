var map;
var marker = [];

// TODO: add your own access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxub3ZhbGlzIiwiYSI6ImNsNWcxb2ZnNTFnbjgzY210M3V4M3E3cDAifQ.KRTasQyT-WcubuvvlxwPqA";

// This is the map instance
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.28117, 42.59291],
  zoom: 13,
});

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
var marker = new mapboxgl.Marker().setLngLat([-71.28117, 42.59291]).addTo(map);

// This array contains the coordinates for on the #23 bus route.
const busStops = [
  [-71.28117, 42.59291],
  [-71.0929, 42.33127],
  [-71.08547, 42.32921],
  [-71.088777, 42.32326],
  [-71.082523, 42.333794],
  [-71.083397, 42.325352],
  [-71.081988, 42.317882],
];

function addMarker(bus) {
  var icon = getIcon(bus);
  var marker = new google.maps.Marker({
    position: {
      lat: bus.attributes.latitude,
      lng: bus.attributes.longitude,
    },
    map: map,
    icon: icon,
    id: bus.id,
  });
  marker.push(marker);
}
// counter here represents the index of the current bus stop
// TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
// Use counter to access bus stops in the array busStops
// Make sure you call move() after you increment the counter.
let counter = 0;
function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}

async function run() {
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  setTimeout(run, 30000);
}
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=23&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

run();
// Do not edit code past this point
if (typeof module !== "undefined") {
  module.exports = { move };
}
