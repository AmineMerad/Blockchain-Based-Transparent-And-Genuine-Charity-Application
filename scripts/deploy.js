async function main() {
  // Get the contract factories
  const Token = await ethers.getContractFactory("Token");
  const Charity = await ethers.getContractFactory("Charity");
  
  try {
    // Deploy Token first
    console.log("Deploying Token contract...");
    const token = await Token.deploy();
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("Token deployed to:", tokenAddress);

    // Deploy Charity
    console.log("Deploying Charity contract...");
    const charity = await Charity.deploy();
    await charity.waitForDeployment();
    const charityAddress = await charity.getAddress();
    console.log("Charity deployed to:", charityAddress);

    // Initialize Charity
    console.log("Initializing Charity...");
    await charity.createCharity(charityAddress);

    // Pass minter role from Token to Charity
    console.log("Passing minter role to Charity...");
    await token.passMinterRole(charityAddress);

    // Create jsons directory if it doesn't exist
    const fs = require("fs");
    if (!fs.existsSync("GUI/jsons")) {
      fs.mkdirSync("GUI/jsons", { recursive: true });
    }

    // Store the contract addresses
    const contractAddresses = {
      Token: tokenAddress,
      Charity: charityAddress
    };

    // Save contract addresses
    fs.writeFileSync(
      "GUI/jsons/contract-address.json",
      JSON.stringify(contractAddresses, null, 2)
    );

    // Save the ABIs
    const CharityArtifact = await artifacts.readArtifact("Charity");
    const TokenArtifact = await artifacts.readArtifact("Token");
    
    fs.writeFileSync(
      "GUI/jsons/abi.json",
      JSON.stringify({
        Charity: CharityArtifact.abi,
        Token: TokenArtifact.abi
      }, null, 2)
    );

  } catch (error) {
    console.error("Deployment Error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script Error:", error);
    process.exit(1);
  }); 