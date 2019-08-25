<script>
  import { writable, get } from "svelte/store";
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  // import { RammettoOne } from '../public/RammettoOne-Regular.ttf'

  import { Landing, MyLoads } from "./components";

  onMount(async () => {
    wallet.init(
      "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2", // tornado
      "0xAceaf1EB83949D0DFd16D75421e4Ae53dd144180" // proxy
    );
    address = wallet.address;
    balance = wallet.balance;
    cleanAddress = wallet.cleanAddress;
    cleanBalance = wallet.cleanBalance;
    commitments = wallet.commitments;
    proxyBalance = wallet.proxyBalance;
    console.log(get(commitments));
  });

  export let wallet;
  let address = writable();
  let balance = writable();
  let cleanAddress = writable();
  let cleanBalance = writable();
  let commitments = writable();
  let proxyBalance = writable();

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

  #app {
    background: whitesmoke;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />

</svelte:head>
<div id="app" class="flex h-100 w-100 justify-center relative">
    <Router>
      <Route path="myloads">
        <MyLoads
          address={$address}
          cleanAddress={$cleanAddress}
          balance={$balance}
          cleanBalance={$cleanBalance}
          commitments={$commitments}
          deposit={wallet.deposit}
          proxyBalance={$proxyBalance}
          depositIndex={wallet.depositIndex}
          withdrawIndex={wallet.withdrawIndex} />
      </Route>
      <Route>
        <Landing
          address={$address}
          cleanAddress={$cleanAddress}
          balance={$balance}
          cleanBalance={$cleanBalance}
          proxyBalance={$proxyBalance} />
      </Route>
    </Router>
  </div>
