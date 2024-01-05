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




function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      reject(new Error(`Timed out in ${ms} ms.`));
    }, ms);

    promise.then(resolve).catch(reject).finally(() => clearTimeout(id));
  });
}



function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
const zkBitcoinABI = [
		{
        "inputs": [
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
        "name": "multiMint_SameAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
	{
        "inputs": [	
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
        "name": "multiMint_PayMaster_EZ",
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
    },
	    {
        "constant": true,
        "inputs": [
            {
                "name": "_requiredETH",
                "type": "uint256"
            }
        ],
        "name": "findMinimumGoodLoops",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
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

// Function to control retries of the main function
export default async function (hre: HardhatRuntimeEnvironment) {
    let retryDelay = 15000; // Delay between retries in milliseconds
    let attempt = 0;

    while (true) {
        try {
            await retryMain(hre);
            console.log('Main function succeeded');
         } catch (error) {
            console.error(`Attempt ${attempt + 1} failed: `, error);
            attempt++;
            await sleep(retryDelay); // Wait for a bit before retrying
        }
    }
}

async function retryMain(hre: HardhatRuntimeEnvironment) {
var gasLimitBump = 86;
    let attempt = 0;

 while (true) {
				 // to prevent infinite loop
				 if(attempt > 100){
					break;
				}
					attempt++;
       

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
					//console.error('No new Mints');
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
					//console.error('No new Mints');
				}




				console.log('Challenge: ',data2zzzz);
				console.log('Nonce: ',data22Nonce);
				// Usage example
				var gasLimit=0;
				var gasPrice=0;
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
								  
					// Put the address of the ERC20 token here:
					TOKEN_ADDRESS = config2.contractAddress;
	
					const provider = new Provider('https://testnet.era.zksync.dev');
				const wallet = new Wallet(config2.privateKey, provider);
				 
				const erc20 = getToken(hre, wallet);
				
					

	try{
		
				var count = data22Nonce.length;
				if(count > 3){
					count = count - 1;
				}
				if(count > 6){
					count = count - 1;
				}
				if(count>10){
					count = count - 2;
				}
				if(count>20){
					count = count - 3;
				}
				if(count>30){
					count = count - 2;
				}
				if(count>40){
					count = count - 4;
				}
				if(count>60){
					count = count - 4;
				}
				if(count>100){
					count = count - 10;
				}
				if(count>200){
					count = count - 20;
				}
				if(count>500){
					count = count - 50;
				}
				

				//console.log(`ERC20 token balance of the wallet before mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);

				PAYMASTER_ADDRESS = config2.contractAddressPayMaster;
				  console.log(`Paymaster is ${PAYMASTER_ADDRESS}`);
				  let paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);
				  console.log(`Paymaster ETH balance is ${paymasterBalance.toString()}`);
									  
				
				  gasPrice = await provider.getGasPrice();

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
if(false){

				const subtractAmount = ethers.utils.parseUnits('100000', 'wei');

				  // Ethers units for mint transaction 50 for reward
				  var minAmts = ethers.utils.parseUnits((count*50).toString(), 'ether');
						minAmts = minAmts.sub(subtractAmount);
						
					console.log("Min Amts: " +minAmts.toString());
				  gasLimit = await erc20.estimateGas.multiMint_PayMaster_EZ(config2.minerAddress, data22Nonce, data2zzzz,{
					customData: {
					  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					  paymasterParams: paymasterParams,
					},
				  });


					var gasLimitUpdate = Math.floor(gasLimit*2/3*2/3*gasLimitBump/100);
					if(gasLimitUpdate < gasLimit){
						gasLimit = gasLimitUpdate;
					
					}
				  const fee = gasPrice.mul(gasLimit.toString());
				  console.log("Transaction fee estimation is :>> ", fee.toString());

				  console.log(`Minting 5 tokens for the wallet via paymaster...`);
				  const transaction = await erc20.multiMint_PayMaster_EZ(config2.minerAddress, data22Nonce, data2zzzz, {
				  // paymaster info
				  customData: {
					paymasterParams: paymasterParams,
					gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					},
					  gasLimit: gasLimit, // Set the custom gas limit
					  gasPrice: gasPrice, // Set the custom gas price
					});




		var transactionHashz;
// Usage with your transaction.wait()

  try {
    const receipt = await timeout(30000, transaction.wait()); // Set timeout for 30 seconds
    transactionHashz = receipt.transactionHash;
    console.log(`Transaction Hash from then block: ${transactionHashz}`);
  } catch (err) {
    console.error(err);
    transactionHashz = null; // or handle this case as you see fit
  }
  
				console.log(`Transaction Hash: ${transactionHashz}`);

				const filePathff = path.join(__dirname, '..', '..', 'transactionHash.txt');
				fs.writeFileSync(filePathff, transactionHashz);
				console.log(`Transaction Hash saved to ${filePath}`);

				  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(PAYMASTER_ADDRESS)}`);
				  paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);

				  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
				  console.log(`ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);
				 
}else{	
				 // Estimate units for reward, 50 of them currently
				  
				const subtractAmount = ethers.utils.parseUnits('100000', 'wei');

				  var minAmts = ethers.utils.parseUnits((count*50).toString(), 'ether');
						minAmts = minAmts.sub(subtractAmount);
						
					console.log("Min Amts: " +minAmts.toString());
	
				  gasLimit = await erc20.estimateGas.multiMint_PayMaster_EZ(config2.minerAddress, data22Nonce, data2zzzz,{
					customData: {
					  gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					  paymasterParams: paymasterParams,
					},
				  });
					var gasLimitUpdate = Math.floor(gasLimit*2/3*2/3*gasLimitBump/100);
					if(gasLimitUpdate < gasLimit){
						gasLimit = gasLimitUpdate;
					
					}

				//var gasLimit = 918398; //must remove
				  const fee = gasPrice.mul(gasLimit.toString());
				  console.log("Transaction fee estimation is :>> ", fee.toString());

				  console.log(`Minting 5 tokens for the wallet via paymaster...`);
				  const transaction = await erc20.multiMint_PayMaster_EZ(config2.minerAddress, data22Nonce, data2zzzz, {
				  // paymaster info
				  customData: {
					paymasterParams: paymasterParams,
					gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
					},
					  gasLimit: gasLimit, // Set the custom gas limit
					  gasPrice: gasPrice, // Set the custom gas price
					});
					
				
var transactionHashz;
// Usage with your transaction.wait()

  try {
    const receipt = await timeout(30000, transaction.wait()); // Set timeout for 30 seconds
    transactionHashz = receipt.transactionHash;
    console.log(`Transaction Hash from then block: ${transactionHashz}`);
  } catch (err) {
    console.error(err);
    transactionHashz = null; // or handle this case as you see fit
  }
				console.log(`Transaction Hash: ${transactionHashz}`);


				const filePathff = path.join(__dirname, '..', '..', 'transactionHash.txt');
				fs.writeFileSync(filePathff, transactionHashz);
				console.log(`Transaction Hash saved to ${filePath}`);

				  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(PAYMASTER_ADDRESS)}`);
				  paymasterBalance = await provider.getBalance(PAYMASTER_ADDRESS);

				  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
				  console.log(`ERC20 token balance of the the wallet after mint: ${await wallet.getBalance(TOKEN_ADDRESS)}`);
			

				 gasLimitBump = gasLimitBump - Math.floor(gasLimitBump*10/100);
			try {
			 var totalETHUSED = gasLimit*gasPrice;
				const result = await erc20.findMinimumGoodLoops(totalETHUSED);
				if(result > 4200){
					result = -1;
				}
				console.log(`Minimum Good Loops: ${result.toString()}`);
			const filePathffffffz = path.join(__dirname, '..', '..', 'MinmumMintsAtLeast.txt');
				fs.writeFileSync(filePathffffffz, result.toString());

    
			} catch (error) {
				console.error('Error calling findMinimumGoodLoops setting MinimuMMintsAtLeast to 1 to reset:', error);
				const result = -1;
				console.log(`Minimum Good Loops: ${result.toString()}`);
				const filePathffffffz = path.join(__dirname, '..', '..', 'MinmumMintsAtLeast.txt');
				fs.writeFileSync(filePathffffffz, result.toString());

			}

}
				 
				
	
	
	} catch (error) {
	  console.log("Error contains " + error);
	
    // Checking if the error message contains the text 'minAmt'
	 if (error.message.includes('Paymaster balance might not be enough')){
	  console.log("Error contains 'Paymaster', Means Paymaster is out of ETH, please contact us on Discord");
				 await sleep(1000); // Sleep for 2 seconds (2000 milliseconds)
	  console.log("Error contains 'Paymaster', Means Paymaster is out of ETH, please contact us on Discord");
		
	 }
	 

    // Checking if the error message contains the text 'minAmt'
	 if (error.message.includes('Not enough gas for transaction') || error.message.includes('Most likely not enough gas provided') || error.message.includes('failed to validate the transaction')){
	  console.log("Error contains 'Not enough gas for transaction', Means we need to UP the Gas Price, doing that now and resending");
				 gasLimitBump = gasLimitBump + Math.floor(gasLimitBump*10/100);
		console.log("gas Limit bumped to: "+gasLimitBump.toString());
				 await sleep(250); // Sleep for 2 seconds (2000 milliseconds)
		console.log("gas Limit bumped to: "+gasLimitBump.toString());
		continue;
	 }else{
	 
	 
				  data2zzzz = null;
				data22Nonce= null;
				
	 
	 }
	 if(error.message.includes('MUST mint at least enough zkBTC')){
	 
	  console.log("Error contains 'MUST mint at least enough zkBTC', Means we need to UP the Number of Mints on the Miner because its too small at this price");
	
	 
			try {
			 var totalETHUSED = gasLimit*gasPrice;
				const result = await erc20.findMinimumGoodLoops(totalETHUSED);
				console.log(`Minimum Good Loops: ${result.toString()}`);
			const filePathffffffz = path.join(__dirname, '..', '..', 'MinmumMintsAtLeast.txt');
				fs.writeFileSync(filePathffffffz, result.toString());

    
			} catch (error) {
				console.error('Error calling findMinimumGoodLoops:', error);
			}

	 
	 }
	 
	 
	 
	 
	 
	}
	
	
	//Update this everytime since its important to know instantly.
	
	 
			try {
			 var totalETHUSED = gasLimit*gasPrice;
			 if(totalETHUSED != 0){
					const result = await erc20.findMinimumGoodLoops(totalETHUSED);
					console.log(`Minimum Good Loops: ${result.toString()}`);
					const filePathffffffz = path.join(__dirname, '..', '..', 'MinmumMintsAtLeast.txt');
					fs.writeFileSync(filePathffffffz, result.toString());

				}
			} catch (error) {
				console.error('Error calling findMinimumGoodLoops:', error);
			}

	
	 
	
				
				  data2zzzz = null;
				data22Nonce= null;
				
				 await sleep(2000); // Sleep for 2 seconds (2000 milliseconds)
}






























}



