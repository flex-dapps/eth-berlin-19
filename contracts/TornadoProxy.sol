pragma solidity 0.5.10;

import "./Mixer.sol";

contract TornadoProxy {

  address payable owner = 0x9a27Ca423f7A26779af4C8B6d9C3aDC8165c1bD1;
  address payable relayer = 0x0Ec11c829E3Ca13150b8DE5C766Fc133B2D1C383;
  Mixer public tornadoCash;

  constructor (address _tornadoCashAddress) public {
    tornadoCash = Mixer(_tornadoCashAddress);
  }

  function withdraw (uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[4] memory input) public {
    tornadoCash.withdraw(a, b, c, input);
    address payable _receiver = address(input[2]);
    relayer.transfer(2000000000000000);
    _receiver.transfer(address(this).balance / 20);
  }

  // hackathon only. delete before final deploy
  function emergencyStop() public {
      assert(msg.sender == owner);
      owner.transfer(address(this).balance);
  }

  function () external payable {}

}