import React, { useState } from 'react'
import Nft from './Nft'
import Style from '../styles/nft.module.css'


const Container = (props) => {
        return (  
            <div className={Style.allnftcontainer}>
                {props.msg? props.msg.map((e)=>(
                    <div className={Style.nftcontainer} key={e.token_id}>
                        <h1 className={Style.nftheading}>{e.name}</h1>
                        <Nft img={e.token_uri}></Nft>
                        {props.genuine && <p className={Style.nftsale} id={e.token_id} onClick={()=>{console.log(e)}}>List for Sale</p>}
                    </div>
                    
                )) :null}
            </div>
          )
}

export default Container