import { Component } from 'react'
import {Purchase} from './Purchase'
import '../assets/css/purchaseList.css'
import canlendarIcon from '../assets/images/Calendar.svg'

export class PurchaseList extends Component{

    constructor(props){
        super(props)
        this.state={order:false}
    }

    render(){
    console.log("Purchase list rendered")

    let list

    if(this.props.purchases[0]){

    let listOfPurchases = []
    let purchases=this.props.purchases

    if(this.state.order==="byPrice"){
        purchases=purchases.sort((a,b)=>{return a.price-b.price})
    }
    else if(this.state.order==="byDate"){
        purchases=purchases.sort((a,b)=>{return new Date(a.date)-new Date(b.date)})
    }
    
       purchases.forEach(
        (e,index)=>{
            let date = new Date(e.date)
            listOfPurchases.unshift(<Purchase
                key={e._id}
                price={e.price} 
                name={e.name} 
                category={e.category} 
                date={date} _id={e._id} 
                deletePurchase={this.props.deletePurchase}
                update={this.props.update}
                />)

        }) 

    list=(<>
                {listOfPurchases}
          </>)
    }
    else{
        list=(<p>Sin compras Aún</p>)
    }
    return (
        <div className="purchaseList" >
            <div className="listTitle">
                <span className="purchasesTitle">Compras</span>
                <div className="container">
                    <span>ordenar por:</span>
                    <button className="orderPurchases"
                            onClick={()=>{this.setState({order:"byPrice"})}}
                    >$</button>
                    <button className="orderPurchases"
                            onClick={()=>{this.setState({order:"byDate"})}}
                            alt="ordenar por Fecha"
                    ><img className="calendarIcon" alt="ordernar por fecha" src={canlendarIcon}/></button>
                </div>
            </div>
            {list}
        </div>
    )
    }
}