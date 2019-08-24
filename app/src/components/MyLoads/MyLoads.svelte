<script>
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  import WashingMachine from "../WashingMachine";

  export let commitments;
  export let deposit;
  export let withdraw;
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

  .body {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 3;
  }

  .heading {
    justify-content: flex-end;
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
</style>

<div class="body html flex flex-column items-center w-100 h-100" in:fade>
  <div class="heading flex flex-row w-100 h-33">
    <h1 class="title w-50">My Loads</h1>
  </div>
  <div class="grid flex flex-row w-100">
    {#each Array(10) as washer, i}
      <div class="washer flex flex-row">
        <WashingMachine
          size={30}
          commitment={commitments && commitments[i] ? commitments[i] : null}
          {deposit}
          {withdraw} />
      </div>
    {/each}
  </div>
  <div class="fixed bottom-2 pa3 br3 withdraw">Withdraw All</div>
</div>

<section
  id="wallpaper"
  class="flex flex-column justify-end w-100 h-100"
  in:fade />
