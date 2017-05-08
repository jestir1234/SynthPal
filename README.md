## JS Project Proposal: Synth-pal

### Background

Synth-pal is a browser-based keyboard synthesizer featuring eight keys with different pitches, an oscillator, and filter control to enable sound modification. User's will be able to control the notes of the sound through the following inputs: "A", "W", "S", "E", "D", "R", "F", "T".

[Live](http://mattnguyen.win/SynthPal/)

### Functionality & MVP

With Synth-pal, users will be able to:
- [ ] Play sounds on the visual keyboard through their computer keyboards
- [ ] Oscillates sounds using the oscillator
- [ ] Modify sounds using the filter
- [ ] Change volume of the sounds through the UI

In addition, this project will include:
- [ ] An About modal with instructions on how to use the synth
- [ ] A production README

### Wireframes
This app will consist of a single screen with a visual keyboard, oscillator and filter controls, as well as volume nob. It will also include nav links to the GitHub, my LinkedIn, and the About Modal.

![wireframes](https://github.com/jestir1234/synth-pal/blob/master/synth-pal.png)

### Architecture and Technologies
This project will be implemented with the following technologies:
- `JavaScript` for synth keyboard logic,
- `Web Audio API` for manipulating the audio elements,

In addition to the entry file, there will be three scripts in this project:

`keyboard.js`: this script will handle the logic for pressing down keys, rendering sounds, as well as controlling volume.

`oscillator.js`: this script will be responsible for manipulating the sounds through the oscillator.

`filter.js`: this script will hold all the various filters which can be applied to the sounds.

### Implementation Timeline
**Day 1**: Setup all necessary Node Modules, including getting webpack up and running. Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for the day:
- Importing necessary libraries
- Creating basic outline of UI

**Day 2**: Dedicate the day towards getting comfortable with the different ways to manipulate HTML5 audio elements using the Web Audio API. Goals for the day:
- Create sample sounds using the oscillator
- Get some styling done for Keyboard

**Day 3** Create functioning knobs that can tweak sound through difference oscillators (Sine, Square, Saw) and construct some basic filters (Low pass filter, high pass filter). Goals for the day:
- Have functioning knobs that can modify Oscillator and filter sounds

**Day 4** Add finishing touches, including a volume knob and style keys. Goals for the day:
- Have the keyboard presentable with adequate styling and CSS
- Add more sounds

### Bonus Features
- [ ] Add the ability to insert beats
- [ ] Add the ability to create beats and record
