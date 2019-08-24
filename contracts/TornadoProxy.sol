pragma solidity 0.5.10;

import "./TornadoCash.sol";

contract TornadoProxy {

  mapping(address => bool) public receivers;

  function withdraw (uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[4] memory input, address _receiver) public {
    require(!receivers[_receiver], "Can't re-use a recipient address");
    receivers[_receiver] = true;
    tornadoCash.withdraw(a, b, c, input);
    _receiver.transfer(0.1 ether);
    _receiver.transfer(address(this).balance / 20);
  }

  function () public payable {}

}