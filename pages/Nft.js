import React,{useState} from 'react'
import Style from '../styles/nft.module.css'

const Nft = (props) => {
    const [resource,setresource]=useState([])
    fetch(props.img).then(e=>e.json()).then(s=>setresource(s.image));
  return (
    <img className={Style.nft} src={resource}></img>
  )
}

export default Nft