import { Slider } from '../../src'

export function SliderSection() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <Slider id="volume" label="Volume" name="volume" value={40} minLabel="Quiet" maxLabel="Loud" hint="Drag to change." />
      <Slider id="steps" label="In steps of ten" step={10} value={30} minLabel="0" maxLabel="100" />
      <Slider id="too-bright" label="Brightness" value={95} error="Too bright for a dark room." />
      <Slider id="locked-slider" label="Locked" value={60} disabled />
    </div>
  )
}
