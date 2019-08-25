<script>
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  
    export let deposit;
    export let withdraw;
    export let commitment;
    let withdrawing;
    let tx;

  let seed = commitment ? commitment.timestamp : 1234
  console.log(seed % 3)
  console.log(seed)
  export let size = 50;
  const rand = (x = 2) => {
    return Math.round(Math.random() * x);
  };
  let plants = seed % 3;
  let laundry = seed % 3;
  let backgrounds = ["#5d526d", "#7dac7d", "#b3e876", "#fff66d", "#fff66d"]
  let index = (seed % backgrounds.length+1)
  let background = backgrounds[seed % backgrounds.length];


</script>

<style>
  #machine {
    border: 1px solid #00000050;
    border-radius: 0.5rem;
    background: whitesmoke;
    box-shadow: 0 15px 10px 0px #00000030, inset 0 -0.5rem 1em 1em #00000010;
  }

  #panel {
    border-radius: 0.2rem 0.4rem 0 0;
    height: 20%;
    border-bottom: 0.2rem solid #00000020;
    background-blend-mode: soft-light;
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
    border: 0.1rem solid #00000020;
    width: 62%;
    background-blend-mode: soft-light;
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

  #extras {
    margin-bottom: -5px;
    z-index: 3;
    max-height: 4rem;
  }

  #extras img {
    position: relative;
  }

  .munny {
    animation: spin 2s infinite linear;
  }
  .rumble {
    animation: rumbling 0.2s infinite;
  }

  .glow {
    animation: glowing 3s infinite alternate;
  }

  .greenglow {
    animation: glowgreen 1s infinite alternate;
  }

  @keyframes glowgreen {
    from {
      box-shadow: 0px 0px 40px #00ff00ee;
    }
    to {
      box-shadow: 1px 1px 1px #00ff00ee;
    }
  }

  @keyframes glowing {
    from {
      box-shadow: 10px 10px 50px #ff0000aa;
    }
    to {
      box-shadow: 1px 1px 1px #ff0000aa;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rumbling {
    0% {
      transform: rotate(0deg);

      transform-origin: bottom;
    }
    33% {
      transform: rotate(2deg);
      transform-origin: bottom right;
    }
    66% {
      transform: rotate(0deg);
      transform-origin: bottom left;
    }
    100% {
      transform: rotate(-2deg);
      transform-origin: left;
    }
  }
</style>

{#if seed}
<div
  class:rumble={tx}
  style="{`width: ${size}vh; height: ${size * 1.2}vh;`}in:fade">
  <div
    class={`w-100 flex justify-around items-start; ${plants == 2 ? 'flex-row-reverse' : ''}`}
    id="extras">
    {#if laundry}
      {#if laundry === 1}
        <img
          width={size * 1.2 + 'px'}
          height={size * 1.8 + 'px'}
          alt=""
          src="../../../img/laundry_01.png" />
      {:else if laundry === 2}
        <img
          width={size * 1.2 + 'px'}
          height={size * 1.8 + 'px'}
          alt=""
          src="../../../img/laundry_01.png" />
      {/if}
    {/if}
    {#if plants}
      {#if plants === 1}
        <img
          width={size * 1.2 + 'px'}
          height={size * 1.8 + 'px'}
          alt=""
          src="../../../img/plant_01.png" />
      {:else if plants === 2}
        <img
          width={size * 1.2 + 'px'}
          height={size * 1.8 + 'px'}
          alt=""
          src="../../../img/plant_01.png" />
      {/if}
    {/if}
  </div>

  <div
    id="machine"
    class:glow={withdrawing}
    class="flex flex-column w-100 h-100 justify-between items-center">
    {#if background}
      <div
        id="panel"
        class="w-100 flex justify-around items-center"
        style={background.length > 9 ? `background: url('${background}')` : `background: ${background};`}>
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
      <div
        style={background.length > 9 ? `background: url('${background}')` : `background: ${background};`}
        id="door"
        class:greenglow={commitment && !tx}
        class="flex items-center justify-center">
        <div class="flex items-center justify-center">
          <div
            on:click={async () => {
              if (commitment) {
                withdrawing = true;
                await withdraw();
                withdrawing = false;
              } else {
                tx = true;
                tx = await deposit(index);
                await tx.wait();
                tx = null;
              }
            }}
            class="{commitment && tx ? 'munny' : ''} flex items-center
            justify-center f2">
            {#if commitment && !tx}💰{:else if tx}💸{:else}🧼{/if}
          </div>
        </div>
      </div>
      <div />
    {/if}
  </div>

</div>
{/if}
