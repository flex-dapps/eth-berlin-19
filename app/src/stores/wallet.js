import { writable } from 'svelte/store'
import ethers from 'ethers'
import Web3 from 'web3'
import low from 'lowdb'
import ProviderBridge from 'ethers-web3-bridge'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import tornadoDetails from './tornado'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ dirtyWallet: {}, cleanWallet: {} }).write()

let address = writable()
let balance = writable()

export default {
  addBounty,
  claimBounty,
  init,
  address,
  balance
}

let tornadoAddress
let proxyAddress
let web3
let provider

export async function init(_tornadoAddress, _proxyAddress) {
  tornadoAddress = _tornadoAddress
  proxyAddress = _proxyAddress
  provider = new ethers.getDefaultProvider('kovan')
  let dirtyWallet = getDirtyWallet(provider)
  let cleanWallet = getCleanWallet(provider)
  address.set(dirtyWallet.address)
  balance.set(await dirtyWallet.getBalance())
  const web3 = new Web3(new ProviderBridge(provider, dirtyWallet))
  window.tornado.init(web3)
}

export async function deposit() {
  const { commitment, note } = window.tornado.deposit()
  // call deposit on mixer with commitment as param 1 (with 0.1 eth)
  const contract = new ethers.Contract(
    tornadoAddress,
    tornadoDetails.abi,
    provider
  )
  contract.connect(wallet)
  contract.deposit(commitment, { value: ethers.utils.parseEther('0.1') })
}

export async function hasEnoughEth() {
  const wallet = db.get('dirtyWallet').value()
  const balance = await wallet.getBalance()
  return balance.gte(ethers.utils.parseEther('0.1'))
}

export function addBounty(ethAmount) {
  // send some eth to the proxy contract to be distributed to good washer women
  // for their services
  provider.sendTransaction({
    to: proxyAddress,
    value: ethers.utils.parseEther(ethAmount.toString())
  })
}

export function claimBounty() {
  // sends 0.1 eth to tornado cash in exchange for 0.11 eth from bounty contract
  // psuedo
  // const note = tornado.deposit()
  // proxy.withdraw(note)
}

function getDirtyWallet(provider) {
  let w = localStorage.getItem('dirty-wallet')
  if (w) {
    w = new ethers.Wallet(JSON.parse(w).signingKey.privateKey, provider)
  } else {
    w = ethers.Wallet.createRandom()
    localStorage.setItem('dirty-wallet', JSON.stringify(w))
    w = w.connect(provider)
  }
  db.set('dirtyWallet', w).write()
  return w
}

function getCleanWallet(provider) {
  let w = localStorage.getItem('clean-wallet')
  if (w) {
    w = new ethers.Wallet(JSON.parse(w).signingKey.privateKey, provider)
  } else {
    w = ethers.Wallet.createRandom()
    localStorage.setItem('clean-wallet', JSON.stringify(w))
    w = w.connect(provider)
  }
  db.set('cleanWallet', w).write()
  return w
}
