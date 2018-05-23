const path = require('path');
const assert = require('assert');
const Web3 = require('web3');


// 1 配置 provider 
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}


// 2 拿到 bytecode
// const contractPath = path.resolve(__dirname, '../compiled/Car.json');
// const { interface, bytecode } = require(contractPath);

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/Cat.json');
const { interface, bytecode } = require(contractPath);



let accounts;
let contract;
const initialBrand = 'AUDI';


describe('contract', () => {

	//3 每次跑单测时，需要部署全新的合约实例，起到隔离作用
  //勾子函数  在本区块的每个测试用例之前执行
	beforeEach(async () => {
      accounts = await web3.eth.getAccounts();
      console.log('合约部署账户：', accounts[0]);

      contract = await new web3.eth.Contract(JSON.parse(interface))
          .deploy({ data: bytecode, arguments: [initialBrand] })
          .send({ from: accounts[0], gas: '1000000' });
      console.log('合约部署成功：', contract.options.address);
  });

	// 4 编写单元测试
	it( 'deploy a contract', ()=> {
		assert.ok(contract.options.address);
	})

	it('has initial brand' , async ()=>{
		const brand = await contract.methods.brand().call();
		assert.equal(brand , initialBrand);
	})

	it('can change the brand' , async () => {
		const newBrand = 'BMW';
		await contract.methods.setBrand(newBrand).send({ from : accounts[0]})
		const brand = await contract.methods.brand().call();
		assert.equal(brand,newBrand);
	})

})

//contract.methods.brand().call()，调用合约上的方法，通常是取数据，立即返回；
//contract.methods.setBrand('xxx').send()，对合约发起交易，通常是修改数据，返回的是交易 Hash；
