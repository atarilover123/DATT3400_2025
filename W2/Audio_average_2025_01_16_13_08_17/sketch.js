let fft;

//table to store average values in
let myTable;

let sound; 

function preload(){
  sound = loadSound("soundfile.wav");
}

function setup() {
  createCanvas(600, 400);

  // 1) Initialize p5.Table
  myTable = new p5.Table();
  // Define the columns we want
  myTable.addColumn("index");
  myTable.addColumn("value");

 
 // 2) Initialize fft and play sound
  fft = new p5.FFT();
   sound.amp(0.5);
  sound.loop();
}
  

let index = 0;

function draw() {
  background(0);

  // Analyze and draw frequency spectrum
  let spectrum = fft.analyze();


  noStroke();
  fill(255, 0, 255);
  let barWidth = width / spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    let barHeight = map(spectrum[i], 0, 255, 0, height);
    rect(i * barWidth, height - barHeight, barWidth, barHeight);
  }

  // compute average and add a new row to table
  if (frameCount % 60 === 0) {
    index++;
    let av = average(spectrum);

    let newRow = myTable.addRow();
    newRow.setNum("index",index );
    newRow.setNum("value", av);
    
    //consle log 
    console.log("Avg:", av);
  }
}

// Compute the average value from the spectrum array
function average(spectrum) {
  let sum = 0;
  for (let i = 0; i < spectrum.length; i++) {
    sum += spectrum[i];
  }
  return sum / spectrum.length;
}

// Mouse click: save the table
function mousePressed() {
 
    saveTable(myTable, "averageSpectrum.csv");
  
}
