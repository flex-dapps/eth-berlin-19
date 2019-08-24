<script>
  import WashingMachine from "../WashingMachine";
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  console.log(WashingMachine);
  console.log("hello");
</script>

<style>

</style>

<div class="flex flex-column overflow-scroll" in:fade>
  <h1>sudz skuds spuds yeet</h1>
  <WashingMachine size={80} />
  {#each Array(10) as washer, i}
    <WashingMachine size={30} />
  {/each}

</div>
