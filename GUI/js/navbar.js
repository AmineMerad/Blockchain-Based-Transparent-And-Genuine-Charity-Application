//const contract = require("@truffle/contract");
//const charity = require("../../migrations/charity");


const signUpButton = document.getElementById("buttonSignUp");
signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("userSignUp").value;
    const password = document.getElementById("passSignUp").value;
    const password2 = document.getElementById("pass2SignUp").value;
    
    if (password==password2 && username!=null){
      
        if(null==localStorage.getItem(username)){
          var userInfo=new Array(password.toString());
          localStorage.setItem(username, userInfo);//store type 
          alert("You have successfully signed up.");
        }
      else{
        alert("You have already signed up! please sign in");

        }
      location.reload();

    }
    else {
      loginErrorMsg.style.opacity = 1;
  }
});

  
  
  const loginButton = document.getElementById("buttonLogin");
  loginButton.addEventListener("click", (e) => {
  
    e.preventDefault();
    const username = document.getElementById("userLogin").value;
    const password = document.getElementById("passLogin").value; 

    const userExistance=localStorage.getItem(username); 

    if(userExistance!=null){ 
        console.log(password);
      if (password === userExistance) {
        alert("You have successfully logged in.");
        } 
      }
    else{
      alert("Please sign up!");
    }
    location.reload();
  });
  


var abiStr;

fetch("../jsons/abi.json")
  .then(response=>response.json())
  .then(data=>{
      abiStr=data;
  });

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3('http://localhost:8545'); // Connect to Ganache
        try {
            const accounts = await web3.eth.getAccounts();
            console.log('Connected accounts:', accounts);
        } catch (error) {
            console.error('Error connecting to Ganache:', error);
        }
    } else {
        console.log('Please install MetaMask or use a Web3 browser');
    }
});
  //console.log (window.web3.currentProvider)

  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0xB27bfEECa6579275eBBE399eA2936802F846aE9C'; // Use one of the Ganache addresses
  var abi =abiStr;// JSON.parse(abiStr);
//  abi = require("../jsons/abi.json"); 
  //contract instance



  const web3 = new Web3(window.ethereum);
  var Charity;
  const main = async () => {
      Charity = new web3.eth.Contract(abi, contractAddress);
//      Charity.methods.creatDonator("ayda",,0)
    //    const tokenURI = await contract.methods.tokenURI(tokenId).call();
  //  console.log({ tokenURI });
  };

// Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
    const creatBenificiary_ = async () => {
      const benificiary0 =await charity.methods.creatBenificiary("benificiary",{from:account[1]}).call();
    


  }
  const creatDonator = async () => {
  
   // const donator0 =await charity.methods.creatDonator("donator0",web3.utils.toWei( web3.utils.toBN(8), "ether"),0,{from:account[2]}).call();
  }
  });


//Smart contract functions



/*var loginInfo;
fs.readFile("./jsons/loginInfo.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    loginInfo = JSON.parse(jsonString);

} catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
*/
//window.localStorage.setItem('user', JSON.stringify(person));



/*
var names = [];
names[0] = prompt("New member name?");
localStorage.setItem("names", JSON.stringify(names));

var storedNames = JSON.parse(localStorage.getItem("names"));


localStorage.names = JSON.stringify(names);
var storedNames = JSON.parse(localStorage.names);*/


