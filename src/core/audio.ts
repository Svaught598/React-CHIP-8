

export class Audio {
  ctx: AudioContext = new AudioContext();
  oscillator: OscillatorNode = this.ctx.createOscillator();

  play() {
    this.oscillator.connect(this.ctx.destination);
    this.oscillator.start();
  }

  stop() {
    this.oscillator.disconnect();
  }
}