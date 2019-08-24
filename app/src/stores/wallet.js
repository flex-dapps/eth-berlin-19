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

export default {
  addBounty,
  claimBounty,
  init,
  address
}

let tornadoAddress
let proxyAddress
let web3
let provider

export function init(_tornadoAddress, _proxyAddress) {
  // tornadoAddress = _tornadoAddress
  // proxyAddress = _proxyAddress
  // provider = new ethers.getDefaultProvider()
  // const dirtyWallet = generateDirtyWallet()
  // address.set(dirtyWallet.address)
  // console.log(dirtyWallet.address)
  // dirtyWallet.connect(provider)
  // const web3 = new Web3(new ProviderBridge(provider, dirtyWallet))
  // generateCleanWallet()
  // window.tornado.init(web3)
}

export async function deposit() {
  // const { commitment, note } = window.tornado.deposit()
  // // call deposit on mixer with commitment as param 1 (with 0.1 eth)
  // const contract = new ethers.Contract(
  //   tornadoAddress,
  //   tornadoDetails.abi,
  //   provider
  // )
  // contract.connect(wallet)
  // contract.deposit(commitment, { value: ethers.utils.parseEther('0.1') })
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

export function generateDirtyWallet() {
  const wallet = new ethers.Wallet.createRandom()
  db.set('dirtyWallet', wallet).write()
  return wallet
}

export function generateCleanWallet() {
  const wallet = new ethers.Wallet.createRandom()
  db.set('cleanWallet', wallet).write()
  return wallet
}
