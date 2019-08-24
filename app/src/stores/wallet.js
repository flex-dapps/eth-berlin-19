import ethers from 'ethers'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ wallets: [], sweeps: [], activeWallet: 0 }).write()

export default {
  addBounty,
  claimBounty,
  init
}

let tornadoAddress
let proxyAddress
let web3
let provider

export async function hasEnoughEth() {
  const wallets = db.get('wallets').value()
  const activeWallet = db.get('activeWallet').value()
  const wallet = wallets[activeWallet]
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

export function init(_tornadoAddress, _proxyAddress, _web3) {
  tornadoAddress = _tornadoAddress
  proxyAddress = _proxyAddress
  web3 = _web3
  provider = new ethers.providers.Web3Provider(web3.currentProvider)
}

export function generateAndConnect() {
  const wallet = generateNewWallet()
  const currentWallet = db.get('activeWallet').value()
  db.set('activeWallet', currentWallet + 1).write()
  wallet.connect(provider)
  return wallet
}

export function generateNewWallet() {
  const wallet = new ethers.Wallet.createRandom()
  db.get('wallets')
    .push(wallet)
    .write()
  return wallet
}

export async function sweepTo(final) {
  const allWallets = db.get('wallets').value()
  let gasPrice = await provider.getGasPrice()
  let gasLimit = 21000
  let ethForGas = gasPrice.mul(gasLimit)
  for (let _wallet of allWallets) {
    const wallet = new ethers.Wallet(_wallet.signingKey.privateKey, provider)
    let balance = await wallet.getBalance()
    let value = balance.sub(ethForGas)
    const tx = wallet.sendTransaction({
      to: final,
      value: value,
      gasLimit: gasLimit,
      gasPrice: gasPrice
    })
    db.get('sweeps').push(tx.hash)
  }
}
