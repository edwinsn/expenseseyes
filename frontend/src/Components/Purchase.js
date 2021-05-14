import axios from 'axios'
import {LoadingCircles} from './Loading'
import { useState } from 'react'
export function Purchase(props) {

    let {price, name, category, date, _id, update}= props

    let [loading, changeLoading] = useState(false)
    let [updating,changeUpdating]=useState(false)
    //console.log(loading)
    //console.log(updating)
    return (
        <form
        key={props.key}
        className="purchase"
        onSubmit={async (ev)=>{
                ev.preventDefault()
                changeLoading(true)
                // eslint-disable-next-line
                if(price!=ev.target[0].value||
                // eslint-disable-next-line
                     name!=ev.target[1].value|| 
                // eslint-disable-next-line
                     category!=ev.target[2].value|| 
                // eslint-disable-next-line
                     date.toISOString().split('T')[0]!=ev.target[3].value)
                {
                changeLoading(true)
                changeUpdating(false)
                await updatedPurchase(ev.target,_id)
                props.update()
                changeLoading(false)
                updating=false
                
                }
                else{
                    console.log("noChanges")
                }
                
            }}
            onChange={()=>{
                changeUpdating(true)
            }}>

                <input 
                key="1"
                type="number" className="purchasePrice"  
                defaultValue={price}
                />
                <input
                key="2"
                className="purchaseName" type="text" defaultValue={name}/>
                <input key="3" className="purchaseCategory" type="text" defaultValue={category}/>
                <input  
                keY="4"
                className="purchaseDate" 
                type="text" 
                onFocus={(ev)=>{ev.target.type="date"}} 
                onBlur={(ev)=>{
                    ev.target.type="text"
                    ev.target.value=date.toISOString().split('T')[0].split("-").reverse().join("/")
            }}
                defaultValue = {date.toISOString().split('T')[0].split("-").reverse().join("/")}
                /> 

                {(loading)&&<div className="loadingPurchaseuUpdate"><LoadingCircles /></div>}
                {updating&&<input className="saveBtn" type="submit" value=""/>}
                {!(loading||updating)&&<span className="deletePurchase" onClick={async (ev)=>{
                    if(!loading){
                        console.log(ev.target)
                        changeLoading(true)
                        await deletePurchaseInDataBase(_id, update);
                        props.deletePurchase(_id)
                        changeLoading(false)
                    }
                    }}>
                        X
                </span>}
                
        </form>
    )
}

let deletePurchaseInDataBase = async function (id){
        await axios.delete(process.env.REACT_APP_PURCHASES_URI+id)
}

let updatedPurchase=async function(inputs,id){
    let price=inputs[0].value
    let name=inputs[1].value
    let category=inputs[2].value
    let date=inputs[3].value

   // if(price[0]==="$")price=price.slice(1,price.length)

    console.log(price,name, category,date)

    const newPurchase={
        id,
        price,
        category,
        name,
        date
        }
        try{
        const {data}=await axios.put(process.env.REACT_APP_PURCHASES_URI, newPurchase)
        console.log(data)
        }catch(err){}

}