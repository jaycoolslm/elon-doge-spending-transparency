import { AccountCreateTransaction, AccountId, KeyList, PrivateKey } from "@hashgraph/sdk"
import client from "../client.js";

export const createAccount = async (memo) => {
  // create single sig account for public
  const privKey = PrivateKey.generateED25519()
  const acctTx = new AccountCreateTransaction()
    .setKey(privKey.publicKey)
    .setAccountMemo(memo)
    .setMaxAutomaticTokenAssociations(-1)
    .setInitialBalance(5)
  // execute transaction
  const submitTx = await acctTx.execute(client)
  const rx = await submitTx.getReceipt(client)
  const accountId = rx.accountId
  console.log(`${memo} account created: ${accountId.toString()}`)
  return {
    accountId,
    privKeys: [privKey],
    memo
  }
}

export const createThresholdAccount = async (memo) => {
  // create multi sig account for department
  const privKeys = Array.from({ length: 3 }).map(() => PrivateKey.generateED25519())
  const thresholdKey = new KeyList(privKeys.map(key => key.publicKey), 2)
  const acctTx = new AccountCreateTransaction()
    .setKey(thresholdKey)
    .setAccountMemo(memo)
    .setMaxAutomaticTokenAssociations(-1)
    .setInitialBalance(10)
  // execute transaction
  const submitTx = await acctTx.execute(client)
  const rx = await submitTx.getReceipt(client)
  const accountId = rx.accountId
  console.log(`${memo} account created: ${accountId.toString()}`)
  return {
    accountId,
    privKeys,
    memo
  }
}
