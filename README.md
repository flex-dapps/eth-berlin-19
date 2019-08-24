# S.U.D.S.

Come one come all to our laundry, where you can earn money for helping out around the place by filling up and emptying the washing machines.

![](https://media.giphy.com/media/STa7Y8FmSdsT771VU1/giphy.gif)

## What are you talking about?

Obviously, the laundry is a place for adding a little extra untracable fungibility to your funds. [Tornado Cash](https://tornado.cash) is a project which launched recently on the Ethereum mainnet, but has little liquidity. What we've built is an incentive structure for Tornado Cash and wrapped it in a game interface, so that people have a reason to add liquidity (and therfore privacy) to the Tornado Cash pool.

## How does it work?

A user who wants to **_ahem_** clean some cash, will add money to the Tornado Cash pool, and then top up our Bounty Contract with an amount of ETH that they are willing to pay to players of the game.

A player then deposits 0.1 ETH (+ some gas) into their game burner wallet, and use these funds to add liquidity to the Tornado Cash pool by putting some clothes in the washer. Once the cycle is done, they send their zero knowledge proof to our relayer, which then sends the proof, which includes a receiving address (so as not to create a link between the two wallets) to our proxy contract.

Our proxy contract then forwards this proof to the main Tornado Cash contract, and if the result is a success, then pays the player 5% of the total bounty pool.

## So, you're paying people to participate in mixing?

Kinda, we're allowing anyone to pay to incentivise people to participate in the mixing process.

## Could this be used for money laundering?

No comment.
