<script lang="ts">
  import { rovHeading, rovPitch, rovRoll } from "../js/sensors";
  import fragmentShader from "../assets/shaders/AHRS_Sphere.glsl?raw";
  import * as twgl from "twgl.js";
  import { onMount } from "svelte";
  import { getColors } from "../js/util";
  import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging";

  let canvas: HTMLCanvasElement;
  const varietyColor = getColors();
  $: classes = `${$$props.class ?? ""}`;

  // the most basic vertex shader possible:
  const vertexShader = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
  `;

  let gl: any, programInfo: any, bufferInfo: any;
  $: if (programInfo && gl) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // log("rovHeading: ", $rovHeading, "rovPitch: ", $rovPitch, "rovRoll: ", $rovRoll);

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
      logWarn("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
    bufferInfo = twgl.createBufferInfoFromArrays(gl, {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0], // square out of two triangles
    });
  });
</script>

<div class={"border-2 shadow-md rounded-md p-2 " + varietyColor.bg + " " + varietyColor.border + " " + classes}>
  <canvas id="AHRS-display" width="100" height="100" class="w-full aspect-square" bind:this={canvas} />
</div>
