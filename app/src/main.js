import App from './App.svelte'
import wallet from './stores/wallet'

const app = new App({
  target: document.body,
  props: { wallet }
})

export default app