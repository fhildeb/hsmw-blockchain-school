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
  
      return contract.writeTest("foo",{from: web3.eth.accounts[0]});
  
    }).then(function() {
    
      return contract.test.call();  
      
    }).then(function(value) {
      
      assert.equal(value, "foo", "variable 'test' was not 'foo', 'test' was:"+value);
      
    }); 
  
  });
    
});
