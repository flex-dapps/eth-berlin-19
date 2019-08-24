<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";

	import {
			Landing, 
			Home, 
			MyLoads
		} from './components';

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
<div
  id="app"
  class="flex h-100 flex-column justify-start relative"
>
	<div id="screen" class="h-100 w-100 overflow-hidden" >
		<Router>
			<Route path='home'>
				<Home/>
			</Route>
			<Route path='myloads'>
				<MyLoads />
			</Route>
			<Route>
				<Landing />
			</Route>
		</Router>
	</div>
</div>