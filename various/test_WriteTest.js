var WriteTest = artifacts.require("WriteTest");

contract('Write Test Contract', function() {
  
  it("variable test should be initialized empty", function() {
  
    return WriteTest.deployed().then(function(instance) {
  
      return instance.test.call();
  
    }).then(function(value) {
  
      assert.equal(value, "", "variable 'test' was not empty, test:"+value);
  
    });
  
  });
  
  it("variable test should be changed to 'foo'", function() {
    
    var contract;
    
    return WriteTest.deployed().then(function(instance) {
  
      contract = instance;
      
      // get accounts
      return web3.eth.personal.getAccounts();

    }).then(function(accounts) {

      // call contract write function
      return contract.writeTest("foo",{from: accounts[0]});

    }).then(function() {
    
      // call contract static function
      return contract.test.call();  
      
    }).then(function(value) {
      
      assert.equal(value, "foo", "variable 'test' was not 'foo', 'test' was:"+value);
      
    }); 
  
  });
    
});
