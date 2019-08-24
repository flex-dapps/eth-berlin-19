<script>
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";

  export let size;
</script>

<style>
  #machine {
    border: 1px solid #00000020;
    border-radius: 0.5rem;
    background: whitesmoke;
    box-shadow: 0 15px 10px 0px #00000030, inset 0 -0.5rem 1em 1em #00000010;
  }

  #panel {
    border-radius: 0.2rem 0.4rem 0 0;
    background: #ffc555;
    height: 20%;
    border-bottom: 0.2rem solid #00000020;
  }

  #dial {
    border-radius: 1rem;
    height: 40%;
    width: 40%;
    border: 0.1rem solid #00000020;
    background: white;
    box-shadow: 0px 0.1rem 0px grey;
  }

  #dial div {
    width: 70%;
    height: 70%;
    background: #00000020;
    border: 1px dashed red;
    border-radius: 100rem;
  }

  #button {
    height: 25%;
    width: 25%;
    border-radius: 1rem;
    background: lightcoral;
    box-shadow: 0px 0.05rem 0px grey;
  }

  #button div {
    width: 50%;
    height: 50%;
    background: pink;
    border-radius: 100rem;
  }

  #door {
    border-radius: 100rem;
    background: #ffc555;
    border: 0.1rem solid #00000020;
    width: 62%;
    height: 50%;
  }

  #door div {
    width: 70%;
    height: 70%;
    border-radius: 100rem;
    box-shadow: 0px 0.05rem 5px grey;
    background: #00000050;
  }

  #door div div {
    width: 83%;
    height: 83%;
    border-radius: 100rem;
    background: lightcyan;
  }
</style>

<div
  class="container"
  style="{`width: ${size}vw; height: ${size * 1.2}vw;`}in:fade">
  <div
    id="machine"
    class="flex flex-column w-100 h-100 justify-between items-center">
    <div id="panel" class="w-100 flex justify-around items-center">
      <div class="flex items-center justify-between w-25 h-100">
        <div id="dial" class="flex justify-center items-center">
          <div />
        </div>
        <div id="dial" class="flex justify-center items-center">
          <div />
        </div>
      </div>
      <div class="flex items-center justify-between w-25 h-100">
        <div id="button" class="flex items-center justify-center">
          <div />
        </div>
        <div id="button" class="flex items-center justify-center">
          <div />
        </div>
        <div id="button" class="flex items-center justify-center">
          <div />
        </div>
      </div>
    </div>
    <div id="door" class="flex items-center justify-center">
      <div class="flex items-center justify-center">
        <div />
      </div>
    </div>
    <div />
  </div>

</div>
