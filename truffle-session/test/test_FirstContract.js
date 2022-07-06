var FirstTestContract = artifacts.require("FirstContract");

contract('First Test Contract',
    function()
    {
        it("Variable Test == 'FirstContract'",
        function()
        {
            return FirstTestContract.deployed().then(
            //Variable aufrufen
            function(instance)
            {
                return instance.test.call();
            }
            ).then(
            //Variable vergleichen
            function(value)
            {
                 assert.equal(value, "FirstContract",
                "Variable Test beinhaltet kein 'First Contract'")
            });   
        });
    });