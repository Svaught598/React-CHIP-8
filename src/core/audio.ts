

export class Audio {
  ctx: AudioContext = new AudioContext();
  oscillator: OscillatorNode = this.ctx.createOscillator();

  startBuzzing() {
    this.oscillator.connect(this.ctx.destination);
    this.oscillator.start();
  }

  stopBuzzing() {
    this.oscillator.disconnect();
  }
}