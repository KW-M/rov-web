<script>
  export let angle = 0;
  let anim = () => {
    angle = (angle + 1) % 360;
    requestAnimationFrame(anim);
  };
  requestAnimationFrame(anim);
</script>

<div class="compass bg-base-100">
  <div class="line" />
  <div class="bg" id="compassDiscImg" style:transform={`translateX(${angle}px)`} />
</div>

<style>
  /* ********* Compass Display ********* */

  .compass {
    position: relative;

    overflow: hidden;
    max-width: 280px;
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    /*
    border: 2px solid #000;
    border-radius: 20px 20px 0 0; */
  }

  .compass::before {
    position: absolute;
    content: " ";
    top: 0;
    z-index: 1;
    left: 0;
    width: 50px;
    max-width: 40%;
    height: 100%;
    background: linear-gradient(to right, hsla(var(--b1) / 1), hsla(var(--b1) / 0));
  }

  .compass::after {
    position: absolute;
    content: " ";
    top: 0;
    right: 0;
    z-index: 1;
    width: 50px;
    max-width: 40%;
    height: 100%;
    background: linear-gradient(to left, hsl(var(--b1)), hsla(var(--b1) / 0));
  }

  .compass .bg {
    position: absolute;
    z-index: 0;

    width: 720%;
    left: -310%;
    height: 100%;

    transform: translateX(0px);

    background: url("../images/ui-elements/COMPASS-v4.png");
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
