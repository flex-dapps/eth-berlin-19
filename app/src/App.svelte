<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";

  import { Landing, Home } from "./components";

  onMount(async () => {
    wallet.init(
      "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2", // tornado
      "0xc8f51a8ade617c4930f558b19b9491d525d01f13" // proxy
    );
    address = wallet;
  });

  export let wallet;
  let address;

  function addBounty() {
    wallet.addBounty();
  }
  function claimBounty() {
    wallet.claimBounty();
  }
  function deposit() {
    wallet.deposit();
  }
</script>

<style>
  :global(body) {
    font-family: "Arial";
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
</svelte:head>

<div id="app" class="flex h-100 flex-column justify-start relative">
  <div id="screen" class="h-100 w-100 overflow-hidden">
    <div>{$address}</div>
    <button on:click={deposit}>Deposit</button>
    <Router>
      <Route path="home">
        <Home />
      </Route>
      <Route>
        <Landing />
      </Route>
    </Router>
  </div>
</div>
