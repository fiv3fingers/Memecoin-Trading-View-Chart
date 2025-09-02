import dotenv from 'dotenv';
import { Connection } from "@solana/web3.js"
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const LAMPORTS_PER_ETHER = 1e9
export const mainRPC = process.env.SOLANA_MAIN_RPC || ""
export const devRPC = process.env.SOLANA_DEV_RPC || ""
export const net = process.env.NET
export const laikaTokenAddy = process.env.LAIKA_TOKEN_ADDRESS || ""
export const connection = new Connection(net == 'mainnet' ? mainRPC : devRPC, 'confirmed')