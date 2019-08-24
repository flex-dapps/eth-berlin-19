<script>
  import { writable, get } from "svelte/store";
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  // import { RammettoOne } from '../public/RammettoOne-Regular.ttf'

  import { Landing, MyLoads } from "./components";

  onMount(async () => {
    wallet.init(
      "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2", // tornado
      "0xc8f51a8ade617c4930f558b19b9491d525d01f13" // proxy
    );
    address = wallet.address;
    balance = wallet.balance;
    cleanAddress = wallet.cleanAddress;
    cleanBalance = wallet.cleanBalance;
    commitments = wallet.commitments;
    console.log(get(commitments));
  });

  export let wallet;
  let address = writable();
  let balance = writable();
  let cleanAddress = writable();
  let cleanBalance = writable();
  let commitments = writable();

  function addBounty() {
    wallet.addBounty();
  }
  function claimBounty() {
    wallet.claimBounty();
  }
  function deposit() {
    wallet.deposit();
  }
  function withdraw() {
    wallet.withdrawAll();
  }
</script>

<style>
  :global(h1) {
    font-family: "Rammetto One", cursive;
  }
  :global(h2) {
    font-family: "Rammetto One", cursive;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />

</svelte:head>
<div id="app" class="flex h-100 flex-column justify-start relative">
  <div id="screen" class="h-100 w-100 overflow-hidden">
    <Router>
      <Route path="myloads">
        <MyLoads
          address={$address}
          cleanAddress={$cleanAddress}
          balance={$balance}
          cleanBalance={$cleanBalance}
          commitments={$commitments}
          deposit={wallet.deposit}
          withdraw={wallet.withdrawAll} />
      </Route>
      <Route>
        <Landing
          address={$address}
          cleanAddress={$cleanAddress}
          balance={$balance}
          cleanBalance={$cleanBalance} />
      </Route>
    </Router>
  </div>
</div>
