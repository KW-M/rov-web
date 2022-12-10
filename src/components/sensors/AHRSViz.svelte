<script lang="ts">
  import fragmentShader from "./shaders/AHRS_Sphere.glsl?raw";
  import * as twgl from "twgl.js";
  import { onMount } from "svelte";
  let canvas;

  // the most basic vertex shader possible:
  const vertexShader = `
attribute vec4 position;
void main() {
  gl_Position = position;
}`;

  let yaw = 0;
  let pitch = 0;
  let roll = 0;

  let gl, programInfo, bufferInfo;
  function render(time) {
    yaw = time * 0.001;
    pitch = time * 0.0007;
    roll = time * 0.0003;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  $: if (programInfo && gl) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const uniforms = {
      yaw: yaw,
      pitch: pitch,
      roll: roll,
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
