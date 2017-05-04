
$(document).ready(function(){

  let context = new AudioContext();
  let oscillators = {};
  let notes = {};
  let playedSounds = {};
  let playedSounds2 = {};
  let originalFreq = {};
  let originalFreq2 = {};
  let currentEffects = {};

  let tuna = new Tuna(context);
  let masterGain = context.createGain();
  let delay;
  let flanger;


  $(".delay-time-container #slider").roundSlider({
    width:10,
    radius: 50,
    max:100//0 to 180
  });

  $(".delay-feedback-container #slider").roundSlider({
    width:10,
    radius: 40,
    max:50 //0 to 1
  });

  $(".delay-mix-container #slider").roundSlider({
    width:10,
    radius: 40,
    max:100 // 0 to 1
  });

const applyFlanger = (sound) => {
  let time = $('.flanger-container #time')[0].value / 100;
  let speed = $('.flanger-container #speed')[0].value / 100;
  let depth = $('.flanger-container #depth')[0].value / 100;
  let mix = $('.flanger-container #mix')[0].value / 100;

  flanger = new Pizzicato.Effects.Flanger({
    time: time,
    speed: speed,
    depth: depth,
    feedback: .1,
    mix: mix
  })
  sound.effects.splice(1, 1);
  sound.addEffect(flanger);
}

const applyDelay = (sound) => {
  let delayTime = $('.delay-time-container #slider').data('roundSlider').option("value") / 100;
  let feedback = $('.delay-feedback-container #slider').data('roundSlider').option("value") / 100;
  let mix = $('.delay-mix-container #slider').data('roundSlider').option("value") / 100;

  delay = new Pizzicato.Effects.Delay({
    feedback: feedback,
    time: delayTime,
    mix: mix
  });
  currentEffects["delay"] = delay;
  sound.effects.shift();
  sound.addEffect(delay);
}

const applyOctave = (sound) => {
  let val = parseInt($('.octave-container #octave')[0].value);
  newFrequency = calcOctave(sound.frequency, val);
  sound.frequency = newFrequency;
}

// const updateFlanger = () => {
//   let sounds = Object.values(playedSounds);
//   let sounds2 = Object.values(playedSounds2);
//
//   sounds.forEach((sound) => {
//     applyFlanger(sound)
//   });
//
//   sounds2.forEach((sound2) => {
//     applyFlanger(sound2)
//   });
// }

const updatePitch = () => {
  let adjustVal = $('.pitch-container #pitch')[0].value / 100;
  let notes = Object.keys(playedSounds);
  let notes2 = Object.keys(playedSounds2);

  notes.forEach((note) => {
    playedSounds[note].frequency = originalFreq[note] * (adjustVal + 1);
  })

  notes2.forEach((note2) => {
    playedSounds2[note2].frequency = originalFreq2[note2] * (adjustVal + 1);
  })
}


// const updateDelay = () => {
//
//   let sounds = Object.values(playedSounds);
//   let sounds2 = Object.values(playedSounds2);
//
//   sounds.forEach((sound) => {
//     applyDelay(sound)
//   });
//
//   sounds2.forEach((sound2) => {
//     applyDelay(sound2)
//   });
// }

// $(".delay-container #slider").change(updateDelay);
// $(".flanger-container input").on("input", updateFlanger);
$(".pitch-container #pitch").on("input", updatePitch);

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

  const calcOctave = (frequency, val) => {

    switch(val){
      case 0:
        return frequency * 1;
      case 1:
        return frequency * 2;
      case 2:
        return (frequency * 2) * 2;
      case 3:
        return ((frequency * 2) * 2) * 2;
      case -1:
        return frequency / 2;
      case -2:
        return (frequency / 2) / 2;
      case -3:
        return ((frequency / 2) / 2) / 2;
      default:
        return frequency;
    }
  }

  const keyDown = (note, frequency) => {
    if(notes[note] === "down") return;
    notes[note] = "down";

    let oscillator1Type = $("#oscillator1Type").val();
    let sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: oscillator1Type,
        frequency: frequency
      }
    });

    let oscillator2Type = $("#oscillator2Type").val();
    let sound2 = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: oscillator2Type,
        frequency: frequency
      }
    });

    playedSounds[note] = sound;
    playedSounds2[note] = sound2;

    originalFreq[note] = sound.frequency;
    originalFreq2[note] = sound2.frequency;

    applyDelay(sound);
    applyDelay(sound2);

    applyFlanger(sound);
    applyFlanger(sound2);

    applyOctave(sound);
    applyOctave(sound2);

    sound.play();
    sound2.play();
  }

  const keyUp = (note, frequency) => {
    notes[note] = "up";

    playedSounds[note].stop();
    playedSounds2[note].stop();
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
      $keyS[0].setAttribute("class", "white-active-margin")
      keyDown("g", 783.99);
    } else if (key === 101) {
      $keyE[0].setAttribute("class", "black-active")
      keyDown("gs", 830.61);
    } else if (key === 100){
      $keyD[0].setAttribute("class", "white-active-margin")
      keyDown("a", 880.00);
    } else if (key === 114){
      $keyR[0].setAttribute("class", "black-active")
      keyDown("as", 932.33);
    } else if (key === 102){
      $keyF[0].setAttribute("class", "white-active-margin")
      keyDown("b", 987.77);
    } else if (key === 103){
      $keyG[0].setAttribute("class", "white-active")
      keyDown("c", 1046.50);
    } else if (key === 121){
      $keyY[0].setAttribute("class", "black-active")
      keyDown("cs", 1108.73);
    } else if (key === 104){
      $keyH[0].setAttribute("class", "white-active-margin")
      keyDown("d", 1174.66);
    } else if (key === 117){
      $keyU[0].setAttribute("class", "black-active")
      keyDown("ds", 1244.51);
    } else if (key === 106){
      $keyJ[0].setAttribute("class", "white-active-margin")
      keyDown("e", 1318.51);
    }
  });

  $(window).bind('keyup', (e) => {

    let key = e.keyCode || e.which;
    if (key === 65) {
      $keyA[0].setAttribute("class", "white f")
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
      $keyF[0].setAttribute("class", "white b")
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
