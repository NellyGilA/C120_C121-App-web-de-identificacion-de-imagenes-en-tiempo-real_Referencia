function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded(){
  console.log("Modelo Cargado!");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video, gotResult);
}

var previous_result = '';

function gotResult(error, results){
  if(error){
    console.log(":( " + error);
  } else {
    if(previous_result != results[0].label){
      console.log(":) " + results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'El objeto detectado es '+ results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("").innerHTML = results[0].confidence.toFixed(3);
    }
    
  }

}


