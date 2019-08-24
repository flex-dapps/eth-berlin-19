<script>
  import WashingMachine from "../WashingMachine";
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  console.log(WashingMachine);
  console.log("hello");
</script>

<style>
  section {
  }

  section::after {
    content: "";
    background: url("../../../img/wallpaper_03.png");
    background-size: 100% 70%;
    background-repeat: round;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }

  #floor {
    position: relative;
    background: lightgrey;
    border-top: 0.5rem solid grey;
    z-index: 2;
  }

  .start {
    background: #2da2b0;
    border-radius: 0.5rem;
    font-family: "VT323", monospace;
    font-size: 2rem;
    color: #fff;
  }

  #screen {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  #wallpaper {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  #plant {
    margin-right: -2rem;
  }

  h1 {
    color: #ffc555;
    -webkit-text-stroke: #eb5757 0.1rem;
    font-size: 4rem;
    margin: 0.5rem;
  }

  h5 {
    font-family: "VT323", monospace;
    font-size: 2rem;
    margin: 0;
  }
</style>

<div id="screen" class="flex flex-column justify-between items-center">
  <div class="title">
    <h1>SUDZ</h1>
    <h5>
      Very Clean
      <br />
      Laundry Simulator
    </h5>
  </div>

  <div class="pa3">
    <div class="flex justify-center items-end mb5 pr5">
      <img class="w-50 pb4" id="plant" src="../../../img/plant_02.png" />
      <div class="z2 washer flex justify-center items-end">
        <WashingMachine size={45} />
      </div>
    </div>
    <div class="w-100 flex justify-center mt2">
      <button class="start w-75 pa3">Start with 0.1 Eth</button>
    </div>
  </div>
</div>

<section
  id="wallpaper"
  class="flex flex-column justify-end w-100 h-100"
  in:fade>
  <div id="floor" class="h-25" />
</section>
