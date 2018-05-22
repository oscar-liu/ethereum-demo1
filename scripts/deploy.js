const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

//1. 拿到interface 和 bytecode
const contractPath = path.resolve(__dirname, '../compiled/Cat.json');
const { interface ,bytecode } = require(contractPath);

//2. 配置 provider
const provider = new HDWalletProvider(
  'style trim couch clean between famous shy dragon traffic taste manage swallow',
  'https://rinkeby.infura.io/I7r6w00gwpmet92gbkAY'
	);

// 3. 初始化 web3 实例
const web3 = new Web3(provider);

(async () => {
    // 4. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约的账户：', accounts[0]);

    // 5. 创建合约实例并且部署
    console.time('contract-deploy');
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['AUDI'] })
        .send({ from: accounts[0], gas: '1000000' });
    console.timeEnd('contract-deploy');

    console.log('合约部署成功：', result.options.address);
})();


