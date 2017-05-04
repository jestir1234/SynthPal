
$(document).ready(function(){

  let context = new AudioContext();
  let oscillators = {};
  let notes = {};
  let playedSounds = {};
  // let currentSounds = [];
  let tuna = new Tuna(context);
  let masterGain = context.createGain();
  // let chorusGain = context.createGain();
  // let delayGain = context.createGain();
  // let filterGain = context.createGain();
  // let tremeloGain = context.createGain();
  // let biquadFilter = context.createBiquadFilter();
  let delay;


  $(".delay-time-container #slider").roundSlider({
    width:10,
    radius: 50,
    max:10000
  });

  $(".delay-wet-container #slider").roundSlider({
    width:10,
    radius: 40,
    max:100
  });

  $(".delay-dry-container #slider").roundSlider({
    width:10,
    radius: 40,
    max:100
  });

  $(".delay-cutoff-container #slider").roundSlider({
    width:10,
    radius: 50,
    max:22050
  });


//   const addChorus = (rate, delay) => {
//     return new tuna.Chorus({
//       rate: rate,
//       feedback: 0.2,
//       delay: delay,
//       bypass: 0
//     });
//   }
//
//   const addDelay = (delayTime, wetLevel, dryLevel, cutoff) => {
//     return new tuna.Delay({
//     feedback: 0.45,
//     delayTime: delayTime,
//     wetLevel: wetLevel,
//     dryLevel: dryLevel,
//     cutoff: cutoff,
//     bypass: 0
//   })
// };
//
// const addLowPassFilter = (frequency, lowpass) => {
//   return new tuna.Filter({
//     frequency: frequency, //20 to 22050
//     Q: 20, //0.001 to 100
//     gain: 10, //-40 to 40 (in decibels)
//     filterType: lowpass, //highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
//     bypass: 0
//   })
// }
//
// const addTremelo = (intensity) => {
//   return new tuna.Overdrive({
//     outputGain: 0.5,         //0 to 1+
//     drive: 0.7,              //0 to 1
//     curveAmount: 1,          //0 to 1
//     algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
//     bypass: 0
// });
// }


// const applyFilter = () => {

// }
//
// $('.lowpass-container #frequency').change(applyFilter)


const applyDelayTime = () => {
  let delayTime = $('.delay-time-container #slider').data('roundSlider').option("value") / 1;

  delay = new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: delayTime,
    mix: 0.5
  });
  let sounds = Object.values(playedSounds);

  sounds.forEach((sound) => {
    sound.addEffect(delay);
  });
}

$(".delay-time-container #slider").change(applyDelayTime);

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

  class Sound {
    constructor(context){
      this.context = context;
      this.osc = context.createOscillator();
      this.osc2 = context.createOscillator();
      this.octave = parseInt($('#octave').val());
      this.masterVolume;
    }

    applyChorus(){
      let rate = $('.chorus-container #rate')[0].value;
      let delay = $('.chorus-container #delay')[0].value / 1000;
      let chorus = addChorus(rate, delay);

      this.masterVolume.connect(chorus);
      chorus.connect(masterGain);
      // chorusGain.connect(masterGain);
    }

    applyDelay(){
      let delayTime = $('.delay-time-container #slider').data('roundSlider').option("value") / 1;
      let wetLevel = $('.delay-wet-container #slider').data('roundSlider').option("value") / 100;
      let dryLevel = $('.delay-dry-container #slider').data('roundSlider').option("value") / 100;
      let cutoff = $('.delay-cutoff-container #slider').data('roundSlider').option("value") / 1;

      let delayEffect = addDelay(delayTime, wetLevel, dryLevel, cutoff);

      this.masterVolume.connect(delayEffect);
      delayEffect.connect(masterGain);
      // delayGain.connect(masterGain);
    }

    applyLowPassFilter(){
       let frequency = $('.lowpass-container #frequency')[0].value
       let filterEffect = addLowPassFilter(frequency, "lowpass");

       this.masterVolume.connect(filterEffect);
       filterEffect.connect(filterGain);
       filterGain.connect(masterGain);
    }

    applyHighPassFilter(){
       let frequency = $('.lowpass-container #frequency')[0].value;
       let filterEffect = addLowPassFilter(frequency, "highpass");

       this.masterVolume.connect(filterEffect);
       filterEffect.connect(filterGain);
       filterGain.connect(masterGain);
    }

    applyTremelo(){
      let intensity = $('.tremelo-container #intensity')[0].value / 100;
      let tremeloEffect = addTremelo(intensity);

      this.masterVolume.connect(tremeloEffect);
      tremeloEffect.connect(tremeloGain);
      tremeloGain.connect(masterGain);
    }


    play(note, frequency, effects){
      this.masterVolume = context.createGain();
      //
      this.applyChorus();
      // this.applyDelay();
      // this.applyLowPassFilter();
      // this.applyTremelo();

      this.osc.frequency.value = calcOctave(frequency, this.octave)
      this.osc.type = $("#oscillator1Type").val();

      this.osc2.frequency.value = calcOctave(frequency, this.octave)
      this.osc2.type = $("#oscillator2Type").val();

      this.osc.connect(this.masterVolume);
      this.osc2.connect(this.masterVolume);

      this.masterVolume.connect(masterGain);

      masterGain.connect(context.destination);

      oscillators[frequency] = [this.osc, this.osc2];

      this.osc.start(context.currentTime);
      this.osc2.start(context.currentTime);
    }
  }


  const keyDown = (note, frequency) => {
    if(notes[note] === "down") return;
    notes[note] = "down";

    // let sound = new Sound(context);
    // let effects = {};
    // currentSounds.push(sound);
    // sound.play(note, frequency, effects);

    // Pizzicato sounds Use one or the other
    let oscillator1Type = $("#oscillator1Type").val();
    let sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        type: oscillator1Type,
        frequency: frequency
      }
    });
    playedSounds[note] = sound;
    sound.play();
  }

  const keyUp = (note, frequency) => {
    notes[note] = "up";
    // oscillators[frequency].forEach((oscillator) => {
    //   oscillator.stop(context.currentTime);
    // });

    playedSounds[note].stop();
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
