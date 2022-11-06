import React,{useState,useEffect,useRef}from 'react'
import {ethers,Contract} from 'ethers'
import Web3Modal from 'web3modal'
import Container from './container'
import axios from 'axios'
import MORALIS_API from '../const'
import {Abi,Contract_Address} from './constants'
import Style from '../styles/nft.module.css'
import Image from 'next/image'

const Index = () => {
  const [address,setaddress]=useState([])
  const [uri,seturi]=useState([]);
  const [user,setuser]=useState();
  const [walletconnected,setwalletconnected]=useState(false);
  const [owner,setowner]=useState(false);
  const [value,setvalue]=useState('');
  const [isgenuine,setisgenuine]=useState(false);

  const getSignerorProvider=async (needsigner=false)=>{
      const providerOptions=()=>{}
      const modal=new Web3Modal({
        network:"mumbai",
      providerOptions
    })
    const instance=await modal.connect();
    const web3=new ethers.providers.Web3Provider(instance);
    const signer=web3.getSigner();
    const data=signer.getAddress();
    data.then((e)=>setaddress(e)); 
    if (needsigner) {
      return signer;
      
    } else {
      return web3;
    }
   
  }

  const connect=async()=>{
    await getSignerorProvider();
    setwalletconnected(true);
    setowner(false);
    setisgenuine(false);
    
  }
  
  const setverified=async(props)=>{
    const signer=await getSignerorProvider(true);
    const usercheck=new Contract(
      Contract_Address,Abi,signer);
    usercheck.verified_seller(props);
  }

  const check=async()=>{
    const provider=await getSignerorProvider(false);
    const usercheck=new Contract(
      Contract_Address,Abi,provider);
    const value=await usercheck.Checkgenunity(address);
    setvalue(value);
    if(value==='This address belongs to Genuine Seller'){
      setisgenuine(true);
    }
  }

  const getOwner=async()=>{
    const provider=await getSignerorProvider(false);
    const contract=new Contract(Contract_Address,Abi,provider);
    const contract_owner=await contract.owner();
    if(address==contract_owner){
      setowner(true);
    }

  }
  

  const load=async()=>{
    const options = {
      method: 'GET',
      url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
      params: {chain: 'mumbai', format: 'decimal'},
      headers: {accept: 'application/json', 'X-API-Key': MORALIS_API}
    };
  
  axios
    .request(options)
    .then(function (response) {
      check();
      getOwner();
      seturi(response.data.result);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  useEffect(()=>{
    if(address){
      load();
    }
  },[address]);

  return (
    <div>
      <Image src={require("../pages/Profile.png")} className={Style.profile} onClick={connect}></Image>
      <p className={Style.user}>{value}</p>
      <div >
        <Container  msg={uri} genuine={isgenuine}></Container>
        {owner &&
        <form>
          <input className={Style.input} placeholder='Enter the address' onChange={event=>setuser(event.target.value)}/>
          <button className={Style.submit} onClick={(event)=>{event.preventDefault();setverified(user)}}>Submit</button>
        </form>}
      </div>
      <hr className={Style.line}></hr>
    </div>
    
  )
}

export default Index