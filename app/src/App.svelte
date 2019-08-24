<script>
  import { onMount } from "svelte";

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
      "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2",
      "0xc8f51a8ade617c4930f558b19b9491d525d01f13",
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

</style>

<button on:click={() => addBounty()}>Add Bounty</button>
<button on:click={() => claimBounty()}>Claim Bounty</button>
