<script lang="ts">
  import fragmentShader from "./shaders/AHRS_Sphere.glsl?raw";
  import * as twgl from "twgl.js";
  import { onMount } from "svelte";
  import { rovHeading, rovPitch, rovRoll } from "../../lib/sensors";
  let canvas;

  // the most basic vertex shader possible:
  const vertexShader = `
attribute vec4 position;
void main() {
  gl_Position = position;
}`;

  let gl, programInfo, bufferInfo;
  $: if (programInfo && gl) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // console.log("rovHeading: ", $rovHeading, "rovPitch: ", $rovPitch, "rovRoll: ", $rovRoll);

    const uniforms = {
      yaw: $rovHeading * (3.14 / 180) * -1,
      pitch: $rovPitch * (3.14 / 180) * -1,
      roll: $rovRoll * (3.14 / 180),
      resolution: [gl.canvas.width, gl.canvas.height],
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
  }

  onMount(() => {
    gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
    bufferInfo = twgl.createBufferInfoFromArrays(gl, {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0], // square out of two triangles
    });
  });
</script>

<canvas id="AHRS-display" bind:this={canvas} />

<style>
  #AHRS-display {
    width: 100px;
    height: 100px;
    position: absolute;
    /* top: -11px; */
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  /*
  z-index: -1;
  #AHRS-display {
  width: 200%;
  height: 200%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 25%);
}
 */
</style>
