<script>
	  import { Router, Route, navigate } from 'svelte-routing';
	  import { onMount } from 'svelte';

	  import {Landing, Home} from './components';
</script>

<style>
  :global(body) {
    font-family: 'Arial';
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
			<Route>
				<Landing />
			</Route>
		</Router>
	</div>
</div>