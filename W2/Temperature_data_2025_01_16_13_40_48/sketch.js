let table;
let yearData = {}; 

function preload() {
  // Load the CSV file
  table = loadTable('climate-daily.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800); // Square canvas for a circular plot

  print(table.getRowCount());
  
  // Parse the CSV and organize data by year
  for (let i = 0; i < table.getRowCount(); i++) {
    let year = table.getString(i, 'LOCAL_YEAR');
    let day = table.getString(i, 'LOCAL_DAY');
    let minTemp = table.getNum(i, 'MIN_TEMPERATURE');
    let maxTemp = table.getNum(i, 'MAX_TEMPERATURE');

    if (!yearData[year]) {
      yearData[year] = [];
    }

    yearData[year].push({ day: day, min: minTemp, max: maxTemp });
  }

  noLoop();
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  let maxRadius = 500; 
  let totalDays = Object.values(yearData).reduce((sum, year) => sum + year.length, 0);

  // Define color palette for years
  let colors = Object.keys(yearData).map((_, i) => {
    let hue = map(i, 0, Object.keys(yearData).length, 0, 360);
    return color(`hsl(${hue}, 70%, 50%)`);
  });

  let angleSpacing = TWO_PI / totalDays;
  let currentAngle = 0;
  let yearIndex = 0;

  for (let year of Object.keys(yearData)) {
    let data = yearData[year];
    let yearColor = colors[yearIndex];

    // Draw min temperature
    stroke(yearColor);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < data.length; i++) {
      let radius = map(data[i].min, -30, 40, 50, maxRadius);
      let x = radius * cos(currentAngle);
      let y = radius * sin(currentAngle);
      vertex(x, y);
      currentAngle += angleSpacing;
    }
    endShape();

    // Reset angle for max temperature
    currentAngle -= data.length * angleSpacing;

    // Draw max temperature
    stroke(red(yearColor), green(yearColor), blue(yearColor), 150);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < data.length; i++) {
      let radius = map(data[i].max, -30, 40, 50, maxRadius);
      let x = radius * cos(currentAngle);
      let y = radius * sin(currentAngle);
      vertex(x, y);
      currentAngle += angleSpacing;
    }
    endShape();

    yearIndex++;
  }
}
