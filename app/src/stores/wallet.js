import { writable } from 'svelte/store'
import ethers from 'ethers'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import tornadoDetails from './tornado'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({
  dirtyWallet: {},
  cleanWallet: {},
  commitments: [],
  notes: []
}).write()

let address = writable()
let balance = writable()
let cleanAddress = writable()
let cleanBalance = writable()
let commitments = writable()

export default {
  addBounty,
  claimBounty,
  init,
  deposit,
  address,
  cleanAddress,
  cleanBalance,
  withdrawAll,
  balance,
  commitments
}

let tornadoAddress
let proxyAddress
let web3
let provider
let dirtyWallet
let cleanWallet

export async function init(_tornadoAddress, _proxyAddress) {
  tornadoAddress = _tornadoAddress
  proxyAddress = _proxyAddress
  provider = new ethers.getDefaultProvider('kovan')
  dirtyWallet = getDirtyWallet(provider)
  cleanWallet = getCleanWallet(provider)
  address.set(dirtyWallet.address)
  cleanAddress.set(cleanWallet.address)
  commitments.set(db.get('commitments').value())
  balance.set(await dirtyWallet.getBalance())
  cleanBalance.set(await cleanWallet.getBalance())
  await window.tornado.init(web3)
}

export async function deposit() {
  const { commitment, note } = window.tornado.deposit()
  db.get('commitments')
    .push({ commitment, timestamp: Math.floor(Date.now() / 1000) })
    .write()
  db.get('notes')
    .push(note)
    .write()

  commitments.set(db.get('commitments').value())

  console.log({ commitment, note })
  // call deposit on mixer with commitment as param 1 (with 0.1 eth)
  const contract = new ethers.Contract(
    tornadoAddress,
    tornadoDetails.abi,
    provider
  )
  let actualContract = contract.connect(dirtyWallet)
  const tx = await actualContract.deposit(commitment, {
    value: ethers.utils.parseEther('0.1')
  })
  return tx
}

export async function withdrawAll() {
  const notes = db.get('notes').value()
  const txs = []
  for (let note of notes) {
    try {
      txs.push(await withdraw(note))
    } catch (e) {
      console.log(`failed to withdraw note ${note}`)
    }
  }
  console.log(txs)
  db.set('notes', []).write()
  db.set('commitments', []).write()
}

export async function withdraw(note) {
  const { pi_a, pi_b, pi_c, publicSignals } = await window.tornado.withdraw(
    note,
    cleanWallet.address
  )
  const res = await (await fetch('https://relayer.flexdapps.com/relay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      a: pi_a,
      b: pi_b,
      c: pi_c,
      input: publicSignals
    })
  })).json()
  console.log({ res })
  return res.tx
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
