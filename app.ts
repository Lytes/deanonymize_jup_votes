import { Connection, PublicKey } from "@solana/web3.js";
import { publicKey, u64, bool } from '@solana/buffer-layout-utils';
import { u32, u8, struct } from '@solana/buffer-layout';

const QUICKNODE_RPC = 'https://api.mainnet-beta.solana.com';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const MINT_ADDRESS = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');

export  const fetchAndParseMint = async (mint: PublicKey, solanaConnection: Connection) => {
    try {
        console.log(`Step - 1: Fetching Account Data for ${mint.toBase58()}`);
        let {data} = await solanaConnection.getAccountInfo(mint) || {};
        if (!data) return
        console.log(data) ;
    }
    catch {
        return null;
    }
}

fetchAndParseMint(MINT_ADDRESS, SOLANA_CONNECTION);
