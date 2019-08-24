<script>
  import { onMount } from 'svelte';
  import { fade, slide, crossfade } from 'svelte/transition'
  import WashingMachine from "../WashingMachine";

</script>

<style>

  .html { 
    overflow-y: scroll; 
  }
  
  .body { 
    position: absolute; 
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

</style>

<div class="body html flex flex-column w-100 h-100" in:fade>
  <div class="heading flex flex-row w-100 h-33">
    <h1 class="w-50">My Loads</h1>
  </div>
  <div class="grid flex flex-row w-100">
    {#each Array(10) as washer, i}
      <div class="washer flex flex-row">
        <a href='/'>
          <WashingMachine size={30} />      
        </a>
      </div>
    {/each}
  </div>
</div>