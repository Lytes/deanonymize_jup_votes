import type { JupVote } from "./anchor_idl";
import * as anchor from "@coral-xyz/anchor";
import { clusterApiUrl, Keypair, PublicKey, Connection } from "@solana/web3.js";
import idl from "./anchor_idl.json";

// EDIT
// const proposal_url = "https://vote.jup.ag/proposal/ApKpFDzwsjMEpW4zPNpmsHyPGfKrjaY6rA9HTLwV5a1w";

const proposal_url = "";

const regex = /https:\/\/vote\.jup\.ag\/proposal\/([^\/]+)/;
const match = proposal_url.match(regex);

let proposalId: PublicKey;

if (match) {
  proposalId = new PublicKey(match[1]);
  console.log(proposalId.toBase58());
} else {
  throw new Error("No proposal CA found");
}

const JUPVOTECA = new PublicKey("GovaE4iu227srtG2s3tZzB4RmWBzw8sTwrCLZz7kN7rY");
const keypair = Keypair.generate();
const wallet = new anchor.Wallet(keypair);
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const provider = new anchor.AnchorProvider(connection, wallet, {});
const program = new anchor.Program(
  idl as unknown as JupVote,
  JUPVOTECA,
  provider
);

export const getVotes = async () => {
  const account = await program.account.proposal.fetch(proposalId);

  const optionVotes = account.optionVotes.map((vote: anchor.BN) =>
    vote.toNumber()
  );

  const abstained = optionVotes[0] / 10 ** 6;
  const votedAgainst = optionVotes[1] / 10 ** 6;
  const votedFor = optionVotes[2] / 10 ** 6;

  console.log(`Abstained: ${abstained}`);
  console.log(`Voted For: ${votedFor}`);
  console.log(`Voted Against: ${votedAgainst}`);
};

getVotes();
