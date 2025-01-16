let earthquakes;

function preload() {
  earthquakes = loadJSON(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
  );
}

function setup() {
  createCanvas(400, 400);

  let earthqauke_num = earthquakes.features.length;

  print("total number of quakes =", earthqauke_num, '\n');

  for (let i = 0; i < earthqauke_num; i++) {
    print(
      earthquakes.features[i].properties.place,
      earthquakes.features[i].properties.mag
    );
    print(
      "lat",
      earthquakes.features[i].geometry.coordinates[0],
      "lon",
      earthquakes.features[i].geometry.coordinates[1]
    );
    print("\n");
  }
}
