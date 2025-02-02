#!/usr/bin/env node

import * as dotenv from "dotenv";
import fetch, { Headers, Request, Response } from "node-fetch";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
  (globalThis as any).Request = Request;
  (globalThis as any).Response = Response;
}

dotenv.config();

// eslint-disable-next-line no-unused-vars
const _ = yargs(hideBin(process.argv))
  .commandDir("commands")
  .env("TBL")
  .option("k", {
    alias: "privateKey",
    type: "string",
    description: "Private key string",
  })
  .option("c", {
    alias: "chain",
    type: "string",
    description: "The EVM chain to target",
    default: "polygon-mumbai",
  })
  .option("r", {
    alias: "rpcRelay",
    type: "boolean",
    description: "Whether writes should be relayed via a validator",
  })
  .options({
    alchemy: {
      type: "string",
      description: "Alchemy provider API key",
    },
    infura: {
      type: "string",
      description: "Infura provider API key",
    },
    etherscan: {
      type: "string",
      description: "Etherscan provider API key",
    },
  })

  .strict().argv;
