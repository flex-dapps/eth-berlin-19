<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";

  import { Landing, Home } from "./components";
<<<<<<< HEAD
=======

  onMount(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error(error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    }
    await window.ethereum.enable();
    wallet.init(
      "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2", // tornado
      "0xc8f51a8ade617c4930f558b19b9491d525d01f13", // proxy
      window.web3
    );
  });

  export let wallet;

  function addBounty() {
    wallet.addBounty();
  }
  function claimBounty() {
    wallet.claimBounty();
  }
>>>>>>> e4c2f257a3839c25638c3ac4a20eed8920a47e31
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
    <Router>
<<<<<<< HEAD
      <Route>
        <Landing />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Router>
  </div>
</div>
=======
      <Route path="home">
        <Home />
      </Route>
      <Route>
        <Landing />
      </Route>
    </Router>
  </div>
</div>
>>>>>>> 1b0c494b945ce37f069da4a3b42a89a7400372f0
>>>>>>> e4c2f257a3839c25638c3ac4a20eed8920a47e31
