<script lang="ts">
  import { rovHeading } from "../js/sensors";
</script>

<!-- <script>
  let anim = () => {
    angle = (angle + 1) % 360;
    requestAnimationFrame(anim);
  };
  requestAnimationFrame(anim);
</script> -->

<div class={"compass left-1/2 -translate-x-1/2 overflow-hidden bg-surface-900 rounded-full box-content border-slate-700 border-2 " + $$props.class || ""} style="height:34px; min-width: 200px;">
  <div class="line" />
  <div class="bg" id="compassDiscImg" style:transform={`translateX(${$rovHeading}px)`} />
</div>

<style lang="postcss">
  /* ********* Compass Display ********* */

  .compass {
    /* position: relative; */
    max-width: 280px;
  }

  .compass::before {
    position: absolute;
    content: " ";
    top: 0;
    z-index: 1;
    left: 0;
    width: 88px;
    max-width: 40%;
    height: 100%;
    /* background: linear-gradient(to right, rgb(var(--color-surface-900) / 1), rgb(var(--color-surface-900) / 0)); */
    background: linear-gradient(to right, rgb(0 0 0 / 1), rgb(0 0 0 / 0));
  }

  .compass::after {
    position: absolute;
    content: " ";
    top: 0;
    right: 0;
    z-index: 1;
    width: 88px;
    max-width: 40%;
    height: 100%;
    /* background: linear-gradient(to left, rgb(var(--color-surface-900) / 1), rgb(var(--color-surface-900) / 0)); */
    background: linear-gradient(to left, rgb(0 0 0 / 1), rgb(0 0 0 / 0));
  }

  .compass .bg {
    position: absolute;
    z-index: 0;

    width: 720%;
    left: -310%;
    height: 100%;

    transform: translateX(0px);

    background: url("../assets/ui-elements/COMPASS-v4.png");
    background-repeat: repeat-x;
    background-position: center center;
    background-size: 360px 34px;
    /* background-size: 423.57px 40px; */
  }

  .compass .line {
    position: absolute;
    z-index: 2;
    top: -1px;
    left: 50%;

    width: 2px;
    height: 100%;

    background-color: #fff;
  }
</style>
