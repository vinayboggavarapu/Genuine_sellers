//SPDX-License-Identifier:MIT
pragma solidity^0.8.0;

contract verify{
    address public owner;
    constructor(){
        owner=msg.sender;
    }
    mapping(address=>bool) public Genuine;
    
    modifier isOwner{
        require(msg.sender==owner,"You are not the owner");
        _;
    }

    function verified_seller(address _user) public isOwner {
        Genuine[_user]=true;

    }

    function Checkgenunity(address _user)public view returns(string memory){
        if(Genuine[_user]==true){
            return("This address belongs to Genuine Seller");
        }
        else{
            return("Not a Genuine Seller");
        }
    }

}