import axios from 'axios'
import { Component } from 'react'
import {LoadingCircles} from './Loading'
import '../assets/css/purchaseList.css'
//evitar renderizar para remover el icono de carga

export class PurchaseList extends Component{

    constructor(props){
        super(props)
        this.deletePurchase=this.deletePurchase.bind(this)
        this.state={loading:null}
    }


    render(){
    console.log("Purchase list rendered")

    let listOfPurchases = []
    this.props.purchases.forEach(
        (e)=>{
            let date = new Date(e.date)
            listOfPurchases.unshift(<div key={e._id} className="purchase">
                <span className="purchasePrice">${e.price}</span>
                <span className="purchaseName">{e.name}</span>
                <span className="purchaseCathegory">{e.cathegory}</span>
                <span className="purchaseDate">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
                <span className="deletePurchase" onClick={()=>{this.deletePurchase(e._id);}}>X</span>
            </div>)
        })

    return <div className="purchaseList" >
                <div className="listTitle">
                    <span className="purchasesTitle">Purchases</span>
                    {this.state.loading}
                </div>
                {listOfPurchases}
           </div>
    }

    async deletePurchase(id){
        this.setState({loading:<LoadingCircles />})
        let {status}=await axios.delete(process.env.REACT_APP_PURCHASES_URI+id)
        this.props.update()
        this.setState({loading:null})
    }
}