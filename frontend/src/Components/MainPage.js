import {NewPurchase} from './NewPurchase'
import {Charts} from  './Charts'
import {PurchaseList} from './PurchaseList'
import {LoadingRectangles} from './Loading'
import axios from 'axios'
import { Component } from "react"
import Header from './Header.js'


class MainPage extends Component{

    constructor(props){
        console.log("Main Page contructed")
        super(props)
        this.state={
        Charts:<LoadingRectangles />, 
        PurchaseList:<LoadingRectangles />    
        }
        this.getPurchases=this.getPurchases.bind(this)
    }

    componentDidMount(){
        this.getPurchases()
    }

    render(){
        
        console.log("Main Page Rendered")

        return (
            <div className="MainPage">
           <Header handleLogout={this.props.handleLogout} email={this.props.email}/>
            <div className="purchasesInfo">
                <NewPurchase update={this.getPurchases} userId={this.props.userId} className="newPurchase"/>
                {this.state.PurchaseList}     
            </div>

            <div className="chartsPart">
                {this.state.Charts}
            </div>

            </div>
            )
    }


    async getPurchases(){
        console.log("getting data")

        try{
            let {data,status} = await axios.get(process.env.REACT_APP_PURCHASES_URI,{ params:{userId:this.props.userId} })
            if(status===200){
                this.setState({
                Charts:<Charts purchases={data}/>,
                PurchaseList:<PurchaseList className="purchaseList" update={this.getPurchases} purchases={data} loading={{deleting:false}}/> })
            }
            else{
                console.log(status)
            }


        }catch(err){
            console.log(err)
        }
  }
  
}

export default MainPage