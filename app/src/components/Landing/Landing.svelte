<script>
  import WashingMachine from "../WashingMachine";
  import QRCode from "qrcode";
  import { navigate } from "svelte-routing";
  import copy from "copy-to-clipboard";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade, slide, crossfade } from "svelte/transition";
  console.log(WashingMachine);
  console.log("hello");

  export let address;
  export let balance;
  export let cleanAddress;
  export let cleanBalance;

  let addressModal = false;
  let copied = false

  let qrCode = writable();

  function openAddressModal() {
    console.log(cleanAddress);
    QRCode.toDataURL(cleanAddress, (err, url) => {
      console.log(url);
      qrCode.set(url);
    });
    addressModal = true;
  }
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

  .checkLoads {
    background: #ffc555;
    border-radius: 0.2rem;
    font-family: "VT323", monospace;
    font-size: 1.5rem;
    align-self: right;
    color: #eb5757;
    margin-left: 8rem;
    border: 2px solid #eb5757;
  }

  .title {
    padding-top: 2rem;
    transform: rotate(-8.2deg);
  }

  #screenOverlay {
    position: fixed;
    width: 100%;
    max-width: 60vh;
    max-height: 100vh;
    height: 100%;
    z-index: 3;
  }
  #wallpaper {
    max-width: 60vh;
    max-height: 100vh;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  #washzone {
     max-width: 60vh;
  }

  #plant {
    margin-right: -2rem;
  }

  h1 {
    color: #ffc555;
    -webkit-text-stroke: #eb5757 0.2rem;
    font-size: 4rem;
    margin: 0.5rem;
  }

  .gtext {
    font-family: "VT323", monospace;
  }

  h5 {
    font-family: "VT323", monospace;
    font-size: 2rem;
    margin: 0;
  }

  .dark-fade {
    background: #000000bb;
    color: white;
  }

  .backbutton {
    background: #ffc555;
    border-radius: 0.2rem;
    font-family: "VT323", monospace;
    font-size: 1.5rem;
    color: #eb5757;
    border: 2px solid #eb5757;
  }
</style>

<div id="screenOverlay" class="flex flex-column justify-between items-center">
  {#if addressModal}
    <div
      transition:fade="{{duration: 200}}"
      class="flex flex-column absolute dark-fade items-center justify-around
      h-100 w-100 z-5">
      <div class="flex flex-column items-center justify-center">
        <img
          src={$qrCode}
          alt="qr"
          class="w-75"
          on:click={() => {
            copy(address);
            copied = true
          }} />
        <div class="pa2 f3 gtext">Send ETH here, tap QR to copy address</div>
        {#if copied}
        <div class='pa2 f3 gtext'>Copied to clipboard 👍</div>
    
        {/if}

      </div>
      <div class="pa3 backbutton" on:click={() => (addressModal = false)}>
        Back to the suds
      </div>
    </div>
  {/if}
  <div class="title">
    <h1>SUDZ</h1>
    <h5>
      Very Clean
      <br />
      Laundry Simulator
    </h5>
    <button class="checkLoads" on:click={() => navigate('/myloads')}>
      check loads 💦
    </button>
  </div>

  <div class="pa3" id='washzone'>
    <div class="flex justify-center items-end mb5 pr5">
      <img
        class="w-50 pb4"
        id="plant"
        src="../../../img/plant_02.png"
        alt="plant" />
      <div class="z2 washer flex justify-center items-end">
        <WashingMachine size={26} />
      </div>
    </div>
    <div class="w-100 flex justify-center mt2">
      <button class="start w-75 pa3" on:click={openAddressModal}>
        Get Soapy
      </button>
    </div>
  </div>
</div>

<section
  id="wallpaper"
  class="flex flex-column justify-end w-100 h-100"
  in:fade>
  <div id="floor" class="h-25" />
</section>
