import { TokenCreateTransaction } from "@hashgraph/sdk"
import client from "../client.js"

export const createUSDToken = async () => {
  const tokenTx = new TokenCreateTransaction()
    .setTokenName("US Dollar")
    .setTokenSymbol("USD")
    .setTreasuryAccountId(client.operatorAccountId)
    .setInitialSupply(1_000_000_000_000_000)
  const submitTx = await tokenTx.execute(client)
  const rx = await submitTx.getReceipt(client)
  const tokenId = rx.tokenId
  console.log("Creating USD Token...")
  return tokenId
}
export const createInsanelyDumbSpendingVotingToken = async () => {
  const tokenTx = new TokenCreateTransaction()
    .setTokenName("Insanely Dumb Spending Voting Token")
    .setTokenSymbol("IDSVT")
    .setTreasuryAccountId(client.operatorAccountId)
    .setInitialSupply(1_000_000)
  const submitTx = await tokenTx.execute(client)
  const rx = await submitTx.getReceipt(client)
  const tokenId = rx.tokenId
  console.log("Creating Insanely Dumb Spending Voting Token...")
  return tokenId
}
