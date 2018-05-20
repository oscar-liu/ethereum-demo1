pragma solidity ^0.4.17;

contract Cat {
    string public brand;

    constructor(string initialBrand) public {
        brand = initialBrand;
    }

    function setBrand(string newBrand) public {
        brand = newBrand;
    }
}