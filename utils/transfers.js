import { TransferTransaction } from "@hashgraph/sdk";
import client from "../client.js";


export const transferToken = async (
  tokenId,
  from,
  to,
  amount,
  memo = "",
  signers,
  accountMemo
) => {
  let transferTx = new TransferTransaction()
    .addTokenTransfer(tokenId, from, -amount)
    .addTokenTransfer(tokenId, to, amount)
    .setTransactionMemo(memo)
  // if sender is not client, sign here
  if (signers && signers.length) {
    transferTx.freezeWith(client)
    await Promise.all(signers.map(sig => transferTx.sign(sig)))
  }
  const submitTx = await transferTx.execute(client)
  const rx = await submitTx.getReceipt(client)
  if (rx.status._code === 22)
    console.log(`Transfer ${amount} of ${tokenId.toString()} from: ${from.toString()} to: ${to.toString()} complete.`)
  return submitTx.transactionId
}
