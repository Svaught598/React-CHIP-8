

export class Audio {
  ctx: AudioContext = new AudioContext();
  oscillator: OscillatorNode = this.ctx.createOscillator();
  playing = false;

  play() {
    if (this.playing) return;
    this.oscillator.connect(this.ctx.destination);
    this.oscillator.start();
    this.playing = true;
  }

  stop() {
    if (!this.playing) return;
    this.oscillator.disconnect();
  }
}