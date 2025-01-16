let audioElem;
let audioSource;
let fft;

//table to store average values in
let myTable;

function setup() {
  createCanvas(600, 400);

  // 1) Initialize p5.Table
  myTable = new p5.Table();
  // Define the columns we want
  myTable.addColumn("index");
  myTable.addColumn("value");

  // 2) Create the audio element
  audioElem = createAudio("https://wwoz-sc.streamguys1.com/wwoz-hi.mp3");
  audioElem.elt.crossOrigin = "anonymous";

  // 3) Create a Web Audio source from the HTML audio element
  const myAudioContext = getAudioContext();
  audioSource = myAudioContext.createMediaElementSource(audioElem.elt);

  // 4) Create p5.FFT for frequency analysis
  fft = new p5.FFT();
  fft.setInput(audioSource);

  // 5) Connect to the audio output 
  audioSource.connect(myAudioContext.destination);

  // Attempt to start playing (might be blocked by autoplay browser settings)
  audioElem.play();
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

// Mouse click: start audio (if blocked) + save the table
function mousePressed() {
  // If audio context isn't running yet, try to unlock audio
  if (getAudioContext().state !== "running") {
    userStartAudio().then(() => {
      if (audioElem) audioElem.play();
    });
  }
  // Otherwise, save the table as CSV
  else {
    saveTable(myTable, "averageSpectrum.csv");
  }
}
