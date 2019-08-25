<script>
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  import WashingMachine from "../WashingMachine";

  import ethers from "ethers";

  export let commitments;
  export let deposit;
  export let withdraw;
  export let balance = 0;
  export let cleanBalance = 0;

  console.log("blah", balance);
</script>

<style>
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

  #wallpaper {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .html {
    overflow-y: scroll;
  }

  .title {
    color: #ffc555;
    -webkit-text-stroke: #eb5757 0.2rem;
  }

  .subHead {
    font-family: "VT323", monospace;
    color: #000;
  }

  .body {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 3;
  }

  .grid {
    height: 50px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .washer {
    justify-content: center;
    padding-bottom: 5rem;
    flex-wrap: wrap;
    flex-basis: 50%;
  }

  .withdraw {
    background: lightgreen;
  }

  #myloads {
    max-width: 60vh;
z-index: 2;
  }

  #wallpaper {
    max-width: 60vh;
    max-height: 100vh;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>

<div id='myloads' class="body html flex flex-column items-center w-100 h-100" in:fade>
  <div class="heading flex flex-row w-100 h-33 pb4 justify-around items-center">
    <div class="flex flex-column justify-start items-start f3">
      <div class="subHead w-100">
        Dirty Pennies: {Number(ethers.utils.formatEther(balance)).toFixed(2)}
      </div>
      <div class="subHead w-100">
        Clean Coppers: {Number(ethers.utils.formatEther(cleanBalance)).toFixed(2)}
      </div>
    </div>
    <div class="flex justify-end">
      <div class="title f2">Loads 💦</div>
    </div>
  </div>
  <div class="grid flex flex-row w-100">
    {#each Array(10) as washer, i}
      <div class="washer flex flex-row">
        <WashingMachine
          size={15}
          commitment={commitments && commitments[i] ? commitments[i] : null}
          {deposit}
          {withdraw} />
      </div>
    {/each}
  </div>
  <div class="fixed bottom-2 right-2 pa3 br3 withdraw">Send</div>
</div>

<section
  id="wallpaper"
  class="flex flex-column justify-end w-100 h-100"
  in:fade />
