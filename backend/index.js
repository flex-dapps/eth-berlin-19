require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const ethers = require('ethers')
const jsonParser = require('body-parser').json()

const { NETWORK, PRIVATE_KEY } = process.env

const tornadoDetails = require('./lib/tornado.json')

const provider = ethers.getDefaultProvider(NETWORK || 'homestead')

const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

const { abi } = tornadoDetails
const tornadoAddress = tornadoDetails.address[NETWORK]
const c = new ethers.Contract(tornadoAddress, abi, provider)
const contract = c.connect(wallet)

app.use(cors())
app.use(jsonParser)
app.post('/relay', async (req, res, next) => {
  const { a, b, c, input } = req.body
  const tx = await contract.withdraw(a, b, c, input)
  console.log({ tx })
  return res.json({ tx })
})

app.get('/', (req, res, next) => {
  console.log('pong')
  res.json({ ping: 'pong' })
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})
