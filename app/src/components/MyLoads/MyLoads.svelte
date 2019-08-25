<script>
  import { onMount } from "svelte";
  import { fade, slide, crossfade } from "svelte/transition";
  import {takeLaundryHome} from '../../stores/wallet.js';
  import WashingMachine from "../WashingMachine";
  import { navigate } from "svelte-routing";
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'
  const adapter = new LocalStorage('db')
  const db = low(adapter)
    let machines = db.get('commitments').value()
  console.log(machines)

  import ethers from "ethers";

  let showSendModal = false;
  let withdrawAddress = ''
  let latestWithdraw = ''
  let withdrawError = null
  export let commitments;
  export let deposit;
  export let withdrawIndex;
  export let balance = 0;
  export let cleanBalance = 0;
  export let proxyBalance = 0;

  const clickGo = async () => {
    withdrawError = null
    try {
      const tx = await takeLaundryHome(withdrawAddress)
      latestWithdraw = tx.hash
    } catch (error) {
      withdrawError = error.message
    }
  };
</script>

<style>
.backbutton {
    background: #ffc555;
    border-radius: 0.2rem;
    font-family: "VT323", monospace;
    font-size: 1.5rem;
    color: #eb5757;
    border: 2px solid #eb5757;
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
    border-radius: 0.2rem;
    font-family: "VT323", monospace;
    font-size: 1.5rem;
    color: darkgreen;
    border: 2px solid darkgreen;
  }

  .dark-fade {
    background: #000000bb;
    color: white;
  }

  .current-reward {
    animation: rainbow 5s infinite;
  }
  @keyframes rainbow {
    0% {
      color: orange;
    }
    10% {
      color: purple;
    }
    20% {
      color: red;
    }
    30% {
      color: CadetBlue;
    }
    40% {
      color: yellow;
    }
    50% {
      color: coral;
    }
    60% {
      color: green;
    }
    70% {
      color: cyan;
    }
    80% {
      color: DeepPink;
    }
    90% {
      color: DodgerBlue;
    }
    100% {
      color: orange;
    }
  }
  #myloads {
    max-width: 60vh;
    z-index: 2;
  }
  .go {
    width: 6rem;
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
  {#if showSendModal}
    <div
      transition:fade="{{duration: 200}}"
      class="flex flex-column absolute dark-fade items-center justify-around
      h-100 w-100 z-5">
      <div class="tc flex flex-column items-center justify-center w-80">
        <h3>Claim your Squeaky™ Load</h3>
        <input bind:value={withdrawAddress} />
        <div on:click={clickGo} class="pa2 mt3 withdraw go">GO</div>
        {#if withdrawError}
          <div>{withdrawError}</div>
        {/if}
        {#if latestWithdraw}
          <a target="_blank" href="https://etherscan.com/tx/{latestWithdraw}">{latestWithdraw}</a>
        {/if}
      </div>
      <div class="pa3 backbutton" on:click={() => (showSendModal = false)}>
        Back to the suds
      </div>
    </div>
  {/if}
  <div class="heading flex flex-row w-100 h-33 pb4 justify-around items-center">
    <div class="flex flex-column justify-start items-start f3">

      <div class="subHead w-100">
        Dirty Pennies: {Number(ethers.utils.formatEther(balance)).toFixed(2)}
      </div>
      <div class="subHead w-100">
        Clean Coppers: {Number(ethers.utils.formatEther(cleanBalance)).toFixed(2)}
      </div>
    </div>
    <div class="flex flex-column items-end">
      <div class="title f2">Loads 💦</div>
      <div class="current-reward">
        Reward: ~{Number(ethers.utils.formatEther(balance) / 20).toFixed(2)} ETH
      </div>
    </div>
  </div>
  <div class="grid flex flex-row w-100">
    {#each machines as machine, i}
      <div class="washer flex flex-row">
        <WashingMachine
          size={15}
          commitment={machine}
           deposit={() => deposit(i)}
          withdraw={() => withdrawIndex(i)}/>
      </div>
    {/each}
  </div>
<div class='fixed w-100 bottom-2 justify-center flex'>
  <div on:click={() => navigate('/')} class="backbutton flex justify-center items-center pa3 br3 ma3" >Back</div>
  <div on:click={() => (showSendModal = true)} class="pa3 br3 ma3 flex items-center withdraw">Send</div>
  </div>
</div>

<section
  id="wallpaper"
  class="flex flex-column justify-end w-100 h-100"
  in:fade />
