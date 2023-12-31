import { Wallet, Provider, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as fs from 'fs';
import * as fs2 from 'fs/promises';

import * as path from 'path';
import { BigNumber } from 'ethers';

// Put the address of the deployed paymaster here
var PAYMASTER_ADDRESS = "0x7704484E22bD429c0fDE0049e09c65F856D777da";

// Put the address of the deployed paymaster here
var TOKEN_ADDRESS = "0x9EF042fCc41569d94a0d0Ba6B050cdA75cC9B971";


function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
const zkBitcoinABI = [
		{
        "inputs": [
            {
                "internalType": "uint256",
                "name": "minAmt",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "mintToAddress",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "nonce",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes32[]",
                "name": "challengeNumber2",
                "type": "bytes32[]"
            }
        ],
        "name": "multiMint_SameAddress_Min_Mined",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
	{
        "inputs": [
            {
                "internalType": "uint256",
                "name": "minAmt",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "mintToAddress",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "nonce",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes32[]",
                "name": "challengeNumber2",
                "type": "bytes32[]"
            }
        ],
        "name": "multiMint_SameAddress_EZ_Min_Mined",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
	   {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
	 {
        "inputs": [],
        "name": "blocksToReadjust",
        "outputs": [
            {
                "internalType": "uint",
                "name": "blocks",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

];

  return new ethers.Contract(TOKEN_ADDRESS, zkBitcoinABI, wallet);
}
interface Config {
  privateKey: string;
  minerAddress: string;
  contractAddress: string;
  contractAddressPayMaster: string;
  // ... other properties if needed
}

function readConfig(filePath: string): Promise<Config> {
  try {
	const fileContent = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(fileContent) as Config;

    // Extract and return the specific properties
    return {
      privateKey: config.privateKey,
      minerAddress: config.minerAddress,
      contractAddress: config.contractAddress,
      contractAddressPayMaster: config.contractAddressPayMaster
    };
  } catch (error) {
    console.error('Error reading the config file:', error);
    throw error;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function (hre: HardhatRuntimeEnvironment) {

 while (true) {

				const filePath2 = path.join(__dirname, '..', '..', 'aDataToMintHexChallenge.txt');

				var data2zzzz;


				try {
					// Read the file content
					const fileContent = fs.readFileSync(filePath2, 'utf8');

					// Split the content into individual hex strings
					const hexStrings = fileContent.split(', ');
				data2zzzz = hexStrings;
				
					// Process each hex string
					hexStrings.forEach(hexString => {
						console.log(hexString);
						// Perform additional processing if needed
					    fs.unlinkSync(filePath2);
					});
				} catch (error) {
					console.error('No new Mints');
				}



				const filePath3 = path.join(__dirname, '..', '..', 'aDataToMintHexNonce.txt');

				var data22Nonce;


				try {
					// Read the file content
					const fileContent = fs.readFileSync(filePath3, 'utf8');

					// Split the content into individual hex strings
					const hexStrings = fileContent.split(', ');
					data22Nonce = hexStrings;
					// Process each hex string
					hexStrings.forEach(hexString => {
						console.log(hexString);
						// Perform additional processing if needed
						    fs.unlinkSync(filePath3);

					});
				} catch (error) {
					console.error('No new Mints');
				}




				console.log('Challenge: ',data2zzzz);
				console.log('Nonce: ',data22Nonce);
				// Usage example

				const filePath = path.join(__dirname, '..', '..', '_zkBitcoinMiner.conf');
				var test1;
				var test2;
				var test3;
				var config2;
					try {
					  const config = readConfig(filePath);
						config2=config;
					  // Now you can use the config object
					  //console.log('Private Key:', config.privateKey);
					  console.log('Miner Address:', config.minerAddress);
					  //console.log('Contract Address:', config.contractAddress);

					  // Rest of your code...
					} catch (error) {
					  console.error('Error reading the config file:', error);
					  // Handle the error as needed...
					}
					

	try{
				const count = data22Nonce.length;
				const provider = new Provider('https://testnet.era.zksync.dev');
				 const wallet = new Wallet(config2.privateKey, provider);
				const connectedWallet = wallet.connect(provider);
				  //console.log(`ERC20 token balance of the wallet before mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);

				PAYMASTER_ADDRESS = config2.contractAddressPayMaster;
				  console.log(`Paymaster is ${PAYMASTER_ADDRESS}`);
				  let paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);
				  console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);
									  
					// Put the address of the ERC20 token here:
					TOKEN_ADDRESS = config2.contractAddress;
	
				  const erc20 = getToken(hre, wallet);
				  const gasPrice = await provider.getGasPrice();

				  // Encoding the "ApprovalBased" paymaster flow's input
				  const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
					type: "ApprovalBased",
					token: TOKEN_ADDRESS,
					// set minimalAllowance as we defined in the paymaster contract
					minimalAllowance: ethers.BigNumber.from(1),
					// empty bytes as testnet paymaster does not use innerInput
					innerInput: new Uint8Array(),
				  });
				  var epochsUntilAdjustmentawait = await erc20.blocksToReadjust();
				  console.log(`Epochs until adjustment  ${epochsUntilAdjustmentawait}`);
				  console.log(`Epochs to turn in:  ${count}`);
				  var doEz = false;
				  if(count >=epochsUntilAdjustmentawait){ doEz = true; }
if(doEz){
				  // Estimate gas fee for mint transaction
				  const minAmts = ethers.utils.parseUnits(count.toString(), 'ether');

				  const gasLimit = await erc20.estimateGas.multiMint_SameAddress_Min_Mined(minAmts, PAYMASTER_ADDRESS, data22Nonce, data2zzzz,{
					customData: {
					  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					  paymasterParams: paymasterParams,
					},
				  });

				  const fee = gasPrice.mul(gasLimit.toString());
				  console.log("Transaction fee estimation is :>> ", fee.toString());

				  console.log(`Minting 5 tokens for the wallet via paymaster...`);
				  const transaction = await erc20.multiMint_SameAddress_Min_Mined(minAmts, PAYMASTER_ADDRESS, data22Nonce, data2zzzz, {
				  // paymaster info
				  customData: {
					paymasterParams: paymasterParams,
					gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					},
					  gasLimit: gasLimit, // Set the custom gas limit
					  gasPrice: gasPrice, // Set the custom gas price
					});
					
				const receipt = await transaction.wait();
				const transactionHash = receipt.transactionHash;
				console.log(`Transaction Hash: ${transactionHash}`);

				const filePathff = path.join(__dirname, '..', '..', 'transactionHash.txt');
				fs.writeFileSync(filePathff, transactionHash);
				console.log(`Transaction Hash saved to ${filePath}`);

				  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(PAYMASTER_ADDRESS)}`);
				  paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);

				  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
				  console.log(`ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);
				 
}else{
  // Estimate gas fee for mint transaction
				  const minAmts = ethers.utils.parseUnits(count.toString(), 'ether');

				  const gasLimit = await erc20.estimateGas.multiMint_SameAddress_EZ_Min_Mined(minAmts, PAYMASTER_ADDRESS, data22Nonce, data2zzzz,{
					customData: {
					  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					  paymasterParams: paymasterParams,
					},
				  });

				  const fee = gasPrice.mul(gasLimit.toString());
				  console.log("Transaction fee estimation is :>> ", fee.toString());

				  console.log(`Minting 5 tokens for the wallet via paymaster...`);
				  const transaction = await erc20.multiMint_SameAddress_EZ_Min_Mined(minAmts, PAYMASTER_ADDRESS, data22Nonce, data2zzzz, {
				  // paymaster info
				  customData: {
					paymasterParams: paymasterParams,
					gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					},
					  gasLimit: gasLimit, // Set the custom gas limit
					  gasPrice: gasPrice, // Set the custom gas price
					});
					
				const receipt = await transaction.wait();
				const transactionHash = receipt.transactionHash;
				console.log(`Transaction Hash: ${transactionHash}`);

				const filePathff = path.join(__dirname, '..', '..', 'transactionHash.txt');
				fs.writeFileSync(filePathff, transactionHash);
				console.log(`Transaction Hash saved to ${filePath}`);

				  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(PAYMASTER_ADDRESS)}`);
				  paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);

				  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
				  console.log(`ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);

}
				 
				
	///*
	} catch (error) {
	
	
    // Checking if the error message contains the text 'minAmt'
	 if (error.message.includes('Paymaster balance might not be enough')){
	  console.log("Error contains 'Paymaster', Means Paymaster is out of ETH, please contact us on Discord");
		
	 }
    if (error.message.includes('minAmt')) {
        // Do something specific when 'minAmt' is found in the error message
        console.log("Error contains 'minAmt'");
		
			const filePathfz = path.join(__dirname, '..', '..', 'counter.txt');

             try{fs.unlinkSync(filePathfz);}catch{}

        // Additional code for handling this specific case
    } else {
        // Handling other types of errors
        console.log("No new mining");
    }
	}

	
	//*/			
				  data2zzzz = null;
				data22Nonce= null;
				
				 await sleep(2000); // Sleep for 2 seconds (2000 milliseconds)
}

}



