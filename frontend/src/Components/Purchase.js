import axios from 'axios'
import {LoadingCircles} from './Loading'
import { useState } from 'react'

export function Purchase(props) {

    let {price, name, cathegory, date, _id, update} = props

    let [loading, changeLoading] = useState(false)

    return (
        <div key={Math.random()} className="purchase">
                <span className="purchasePrice">${price}</span>
                <span className="purchaseName">{name}</span>
                <span className="purchaseCathegory">{cathegory}</span>
                <span  className="purchaseDate">{`${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}`}</span>
                <span  className="deletePurchase" onClick={async (ev)=>{
                    if(!loading){
                        console.log(ev.target)
                        changeLoading(true)
                        await deletePurchase(_id, update);
                        changeLoading(false)
                    }

                    }}>
                        {!loading&&"X"}
                        {loading&&<LoadingCircles />}
                </span>
        </div>
    )
}

let deletePurchase = async function (id, update){
        await axios.delete(process.env.REACT_APP_PURCHASES_URI+id)
        update()
}