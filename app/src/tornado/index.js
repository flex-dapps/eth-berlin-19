const assert = require('assert')
const snarkjs = require('snarkjs')
const crypto = require('crypto')
const circomlib = require('circomlib')
const bigInt = snarkjs.bigInt
const merkleTree = require('./lib/MerkleTree')
const Web3 = require('web3')
const buildGroth16 = require('websnark/src/groth16')
const websnarkUtils = require('websnark/src/utils')

let web3, mixer, circuit, proving_key, groth16
let MERKLE_TREE_HEIGHT, AMOUNT, EMPTY_ELEMENT

const rbigint = nbytes => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes))
const pedersenHash = data =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0]

function createDeposit(nullifier, secret) {
  let deposit = { nullifier, secret }
  deposit.preimage = Buffer.concat([
    deposit.nullifier.leInt2Buff(31),
    deposit.secret.leInt2Buff(31)
  ])
  deposit.commitment = pedersenHash(deposit.preimage)
  return deposit
}

async function deposit() {
  const deposit = createDeposit(rbigint(31), rbigint(31))

  console.log('Submitting deposit transaction')
  await mixer.methods
    .deposit('0x' + deposit.commitment.toString(16))
    .send({ value: AMOUNT, from: (await web3.eth.getAccounts())[0], gas: 1e6 })

  const note = '0x' + deposit.preimage.toString('hex')
  console.log('Your note:', note)
  return note
}

async function withdraw(note, receiver) {
  let buf = Buffer.from(note.slice(2), 'hex')
  let deposit = createDeposit(
    bigInt.leBuff2int(buf.slice(0, 31)),
    bigInt.leBuff2int(buf.slice(31, 62))
  )

  console.log('Getting current state from mixer contract')
  const events = await mixer.getPastEvents('Deposit', {
    fromBlock: mixer.deployedBlock,
    toBlock: 'latest'
  })
  let leafIndex

  const commitment = deposit.commitment.toString(16).padStart('66', '0x000000')
  const leaves = events
    .sort((a, b) => a.returnValues.leafIndex.sub(b.returnValues.leafIndex))
    .map(e => {
      if (e.returnValues.commitment.eq(commitment)) {
        leafIndex = e.returnValues.leafIndex.toNumber()
      }
      return e.returnValues.commitment
    })
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, EMPTY_ELEMENT, leaves)
  const validRoot = await mixer.methods.isKnownRoot(await tree.root()).call()
  const nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31))
  const nullifierHashToCheck = nullifierHash
    .toString(16)
    .padStart('66', '0x000000')
  const isSpent = await mixer.methods.isSpent(nullifierHashToCheck).call()
  assert(validRoot === true)
  assert(isSpent === false)

  assert(leafIndex >= 0)
  const { root, path_elements, path_index } = await tree.path(leafIndex)
  // Circuit input
  const input = {
    // public
    root: root,
    nullifierHash,
    receiver: bigInt(receiver),
    fee: bigInt(0),

    // private
    nullifier: deposit.nullifier,
    secret: deposit.secret,
    pathElements: path_elements,
    pathIndex: path_index
  }

  console.log('Generating SNARK proof')
  console.time('Proof time')
  const proof = await websnarkUtils.genWitnessAndProve(
    groth16,
    input,
    circuit,
    proving_key
  )
  const { pi_a, pi_b, pi_c, publicSignals } = websnarkUtils.toSolidityInput(
    proof
  )
  console.timeEnd('Proof time')

  console.log('Submitting withdraw transaction')
  await mixer.methods
    .withdraw(pi_a, pi_b, pi_c, publicSignals)
    .send({ from: (await web3.eth.getAccounts())[0], gas: 1e6 })
  console.log('Done')
}

async function init() {
  let contractJson
  web3 = new Web3(window.web3.currentProvider, null, {
    transactionConfirmationBlocks: 1
  })
  contractJson = await (await fetch('Mixer.json')).json()
  circuit = await (await fetch('withdraw.json')).json()
  proving_key = await (await fetch('withdraw_proving_key.bin')).arrayBuffer()
  MERKLE_TREE_HEIGHT = 16
  AMOUNT = 1e17
  EMPTY_ELEMENT = 1
  groth16 = await buildGroth16()
  let netId = await web3.eth.net.getId()
  const tx = await web3.eth.getTransaction(
    contractJson.networks[netId].transactionHash
  )
  mixer = new web3.eth.Contract(
    contractJson.abi,
    contractJson.networks[netId].address
  )
  mixer.deployedBlock = tx.blockNumber
  console.log('Loaded')
}

window.deposit = deposit
window.withdraw = async () => {
  const note = prompt('Enter the note to withdraw')
  const receiver = (await web3.eth.getAccounts())[0]
  await withdraw(note, receiver)
}
init()

export default {
  deposit,
  withdraw
}