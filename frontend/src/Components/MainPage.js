import {NewPurchase} from './NewPurchase'
import {Charts} from  './Charts'
import {PurchaseList} from './PurchaseList'
import {LoadingRectangles} from './Loading'
import axios from 'axios'
import { Component } from "react"
import Header from './Header.js'
import '../assets/css/mainpage.css'
import PurchasesTabs from './Purchases/PurchasesTabs'

class MainPage extends Component{

    constructor(props){
        super(props)
        this.state={
        Charts:<LoadingRectangles />, 
        PurchaseList:<LoadingRectangles />    
        }
        this.getPurchases=this.getPurchases.bind(this)
        this.deletePurchase=this.deletePurchase.bind(this)
        this.addPurchase=this.addPurchase.bind(this)
    }

    componentDidMount(){
        this.getPurchases()
    }

    render(){
        

        return (
            <div className="MainPage" id="mainPage">
           <Header handleLogout={this.props.handleLogout} email={this.props.email}/>
            <div className="purchasesInfo g-1 stretch-items" >
                <NewPurchase update={this.getPurchases} userId={this.props.userId} className="newPurchase"/>
                <PurchasesTabs 
                                purchases={this.data}
                                deletePurchase={this.deletePurchase}
                                update={this.getPurchases}
                                loading={this.state.loading}
                 />  
            </div>

            <div className="chartsPart">
                {this.state.Charts}
            </div>

            </div>
            )
    }


    deletePurchase(id){
        let data = this.state.data.filter((e)=>{
            // eslint-disable-next-line
            return e._id!=id
        })
        this.setState({
            data,
             Charts:<Charts purchases={data}/>,
               PurchaseList:<PurchaseList key={Math.random()}className="purchaseList" 
               purchases={data}
               deletePurchase={this.deletePurchase}
               update={this.getPurchases}
               loading={{deleting:false}}/>})

    }
    
    addPurchase(p){
        let data=[...this.state.data,p]
        this.setState({
            data,
             Charts:<Charts purchases={data}/>,
               PurchaseList:<PurchaseList key={Math.random()}className="purchaseList" 
               purchases={data}
               deletePurchase={this.deletePurchase}
               loading={{deleting:false}}
               update={this.getPurchases}
               />})
    }


    async getPurchases(){

        try{
            let {data,status} = await axios.get(process.env.REACT_APP_PURCHASES_URI,{ params:{userId:this.props.userId} })

            this.data=data
            if(status===200){
                this.setState({
                data,
                loading: {deleting:false},
                Charts:<Charts purchases={data}/>,
            })
                
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