import { Client } from '@hashgraph/sdk'
import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.OPERATOR_ID || !process.env.OPERATOR_KEY)
  throw new Error("No env vars set")

export default Client.forTestnet().setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY)
