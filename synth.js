$(document).ready(function(){

  let context = new AudioContext();
  let oscillators = {};

  let masterVolume = context.createGain();
  masterVolume.gain.value = 0.3;
  masterVolume.connect(context.destination);

  let keyA = document.getElementById('keyA');
  let $keyA = $(keyA);
  let keyW = document.getElementById('keyW');
  let $keyW = $(keyW);
  let keyS = document.getElementById('keyS');
  let $keyS = $(keyS);
  let keyE = document.getElementById('keyE');
  let $keyE = $(keyE);
  let keyD = document.getElementById('keyD');
  let $keyD = $(keyD);
  let keyR = document.getElementById('keyR');
  let $keyR = $(keyR);
  let keyF = document.getElementById('keyF');
  let $keyF = $(keyF);
  let keyG = document.getElementById('keyG');
  let $keyG = $(keyG);
  let keyY = document.getElementById('keyY');
  let $keyY = $(keyY);
  let keyH = document.getElementById('keyH');
  let $keyH = $(keyH);
  let keyU = document.getElementById('keyU');
  let $keyU = $(keyU);
  let keyJ = document.getElementById('keyJ');
  let $keyJ = $(keyJ);


  const keyDown = (note, frequency) => {
    let osc = context.createOscillator();
    let osc2 = context.createOscillator();

    osc.frequency.value = frequency;
    osc.type = $("#oscillator1Type").val();

    osc2.frequency.value = frequency;
    osc2.type = $("#oscillator2Type").val();

    osc.connect(masterVolume);
    osc2.connect(masterVolume);

    masterVolume.connect(context.destination);

    oscillators[frequency] = [osc, osc2];

    osc.start(context.currentTime);
    osc2.start(context.currentTime);
  }

  const keyUp = (note, frequency) => {
    oscillators[frequency].forEach((oscillator) => {
      oscillator.stop(context.currentTime);
    });
  }

  $(window).bind('keypress', (e) => {

    let key = e.keyCode || e.which;
    if (key === 97) {
      $keyA[0].setAttribute("class", "white-active")
      keyDown("f", 698.46);
    } else if (key === 119) {
      $keyW[0].setAttribute("class", "black-active")
      keyDown("fs", 739.99);
    } else if (key === 115){
      $keyS[0].setAttribute("class", "white-active")
      keyDown("g", 783.99);
    } else if (key === 101) {
      $keyE[0].setAttribute("class", "black-active")
      keyDown("gs", 830.61);
    } else if (key === 100){
      $keyD[0].setAttribute("class", "white-active")
      keyDown("a", 880.00);
    } else if (key === 114){
      $keyR[0].setAttribute("class", "black-active")
      keyDown("as", 932.33);
    } else if (key === 102){
      $keyF[0].setAttribute("class", "white-active")
      keyDown("b", 987.77);
    } else if (key === 103){
      $keyG[0].setAttribute("class", "white-active")
      keyDown("c", 1046.50);
    } else if (key === 121){
      $keyY[0].setAttribute("class", "black-active")
      keyDown("cs", 1108.73);
    } else if (key === 104){
      $keyH[0].setAttribute("class", "white-active")
      keyDown("d", 1174.66);
    } else if (key === 117){
      $keyU[0].setAttribute("class", "black-active")
      keyDown("ds", 1244.51);
    } else if (key === 106){
      $keyJ[0].setAttribute("class", "white-active")
      keyDown("e", 1318.51);
    }
  });

  $(window).bind('keyup', (e) => {
    
    let key = e.keyCode || e.which;
    if (key === 65) {
      $keyA[0].setAttribute("class", "white b")
      keyUp("f", 698.46)
    } else if (key === 87){
      $keyW[0].setAttribute("class", "black fs")
      keyUp("fs", 739.99);
    } else if (key === 83){
      $keyS[0].setAttribute("class", "white g")
      keyUp("g", 783.99);
    } else if (key === 69){
      $keyE[0].setAttribute("class", "black gs")
      keyUp("gs", 830.61);
    } else if (key === 68){
      $keyD[0].setAttribute("class", "white a")
      keyUp("a", 880.00	);
    } else if (key === 82){
      $keyR[0].setAttribute("class", "black as")
      keyUp("as", 932.33);
    } else if (key === 70){
      $keyF[0].setAttribute("class", "white d")
      keyUp("b", 987.77	);
    } else if (key === 71){
      $keyG[0].setAttribute("class", "white c")
      keyUp("c", 1046.50);
    } else if (key === 89){
      $keyY[0].setAttribute("class", "black cs")
      keyUp("cs", 1108.73);
    } else if (key === 72){
      $keyH[0].setAttribute("class", "white d")
      keyUp("d", 1174.66);
    } else if (key === 85){
      $keyU[0].setAttribute("class", "black ds")
      keyUp("ds", 1244.51);
    } else if (key === 74){
      $keyJ[0].setAttribute("class", "white e")
      keyUp("e", 1318.51);
    }
  });




});
