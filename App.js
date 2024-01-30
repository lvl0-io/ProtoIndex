
const ethers = require("ethers")
require('dotenv').config();
const {abi} = require('./MultiSwap.json')

async function main(){

    const contractAddress =  process.env.CONTRACT_ADDRESS 
    const pKey = process.env.PRIVATE_KEY
    //const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const provider = new ethers.JsonRpcProvider('http://localhost:8545')
    const signer = new ethers.Wallet(pKey, provider);
    const contract = new  ethers.Contract(contractAddress,abi,signer) // Use signer instead of provider

    const WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" // WETH
    const WBTC = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6" // WBTC
    const AVAX = "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b" // AVAX
    const USDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" // USDC
    const WMATIC = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" // WMATIC
    const SOL = "0x50B6eE6E2c786d012c6Cf7c5bC7e9e3cA5853912" // SOL

    const tokensIn = [USDC, USDC, USDC]
    const tokensOut = [WETH, WBTC, WMATIC] // WETH WBTC WMATIC
    const amounts = ["10000000","10000000","10000000"] // 10 USDC

    const encodeFuncData = contract.interface.encodeFunctionData("swapExact", [tokensIn,tokensOut,amounts]) // func name and args 

    const transaction = {
        to: contractAddress, // Send to contract address
        data: encodeFuncData,
    };

    const trx = await signer.sendTransaction(transaction);
    return trx;
}

main().then((trx) => console.log(trx));