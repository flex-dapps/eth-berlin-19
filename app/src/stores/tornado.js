export default {
  address: {
    homestead: "0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf",
    kovan: "0x1Cea940cA15a303A0E01B7F8589F39fF34308DB2"
  },
  abi: [
    {
      "constant": false,
      "inputs": [
        {
          "name": "a",
          "type": "uint256[2]"
        },
        {
          "name": "b",
          "type": "uint256[2][2]"
        },
        {
          "name": "c",
          "type": "uint256[2]"
        },
        {
          "name": "input",
          "type": "uint256[4]"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "commitment",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ]
}