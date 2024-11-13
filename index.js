import client from "./client.js"
import { createAccount, createThresholdAccount } from "./utils/accounts.js"
import { createInsanelyDumbSpendingVotingToken, createUSDToken } from "./utils/tokens.js"
import { transferToken } from "./utils/transfers.js"

const main = async () => {
  // create gov accounts
  console.log('Creating Government accounts...')
  const departmentOfDefense = await createThresholdAccount("Department of Defense")
  const nationalInstituteOfAllergyAndInfectiousDiseases = await createThresholdAccount("National Institue of Allergy and Infectious Diseases")
  const receivingAccount = await createAccount("Receiving Account")

  // create public accounts
  console.log("Creating the Public's accounts...")
  const alice = await createAccount("Alice")
  const bob = await createAccount("Bob")

  // create usd token
  const usd = await createUSDToken()
  // transfer usd to gov accounts
  await Promise.all([
    transferToken(usd, client.operatorAccountId, departmentOfDefense.accountId, 1_000_000_000),
    transferToken(usd, client.operatorAccountId, nationalInstituteOfAllergyAndInfectiousDiseases.accountId, 1_000_000_000)
  ])

  // create dumb spending voting token
  const insanelyDumbSpendingVotingToken = await createInsanelyDumbSpendingVotingToken()
  // transfer voting tokens to public
  await Promise.all([
    transferToken(insanelyDumbSpendingVotingToken, client.operatorAccountId, alice.accountId, 100_000),
    transferToken(insanelyDumbSpendingVotingToken, client.operatorAccountId, bob.accountId, 100_000)
  ])

  // create transactions and their accounts
  console.log("Department of Defense purchasing a lobster tank...")
  const transactionReason_1 = "Purchase lobster tank"
  const transactionId_1 = await transferToken(
    usd,
    departmentOfDefense.accountId,
    receivingAccount.accountId,
    8_395,
    transactionReason_1,
    [departmentOfDefense.privKeys[0], departmentOfDefense.privKeys[1]]
  )
  const transactionVotingAccount_1 = await createAccount(transactionId_1.toString())

  console.log("National Institue of Allergy and Infectious Diseases funding a study of HIV in 'transgender' monkeys...")
  const transactionReason_2 = "HIV study on transgender monkeys"
  const transactionId_2 = await transferToken(
    usd,
    nationalInstituteOfAllergyAndInfectiousDiseases.accountId,
    receivingAccount.accountId,
    477_121,
    transactionReason_2,
    [nationalInstituteOfAllergyAndInfectiousDiseases.privKeys[0], nationalInstituteOfAllergyAndInfectiousDiseases.privKeys[1]]
  )
  const transactionVotingAccount_2 = await createAccount(transactionId_2.toString())


  // vote for dumb transactions
  // alice's vote
  console.log("Alice casting her vote for the most insanely dubmb spending of her tax dollars...")
  await transferToken(
    insanelyDumbSpendingVotingToken,
    alice.accountId,
    transactionVotingAccount_2.accountId,
    100_000,
    "What's the benefit of this research?",
    alice.privKeys
  )

  // bob's vote
  console.log("Bob casting his vote for the most insanely dubmb spending of his tax dollars...")
  await transferToken(
    insanelyDumbSpendingVotingToken,
    bob.accountId,
    transactionVotingAccount_1.accountId,
    100_000,
    "Why do the military need a lobster tank?",
    bob.privKeys
  )


  console.log(`Check out the dumb spending leaderboards here: https://hashscan.io/testnet/token/${insanelyDumbSpendingVotingToken.toString()}`)

}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
