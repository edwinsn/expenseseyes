import React, { Component } from 'react';
import './assets/css/App.css'
import {NewPurchase} from './Components/NewPurchase'
import {Charts} from  './Components/Charts'
import {PurchaseList} from './Components/PurchaseList'
import {LoadingRectangles} from './Components/Loading'
import axios from 'axios'

class App extends Component {

  constructor(props){
    super(props)
    this.state={Charts:<LoadingRectangles />, PurchaseList:<LoadingRectangles />}
    this.getPurchases=this.getPurchases.bind(this)
  }

  componentDidMount(){
    this.getPurchases()
  }

  render(){
      console.log("App rendered")
   
      return (
        <div className="App">
            
            <div className="purchasesInfo">
              <NewPurchase update={this.getPurchases} className="newPurchase"/>
              {this.state.PurchaseList}     
            </div>

            <div className="chartsPart">
              {this.state.Charts}
            </div>

        </div>
    );
  }

  async getPurchases(){
    console.log("getting data")

    let {data,status} = await axios.get(process.env.REACT_APP_PURCHASES_URI,{ params:{userId:1} })

    if(status===200){
        this.setState({
        Charts:<Charts purchases={data}/>,
        PurchaseList:<PurchaseList className="purchaseList" update={this.getPurchases} purchases={data} loading={{deleting:false}}/> })
    }

    return false;
  }

}

export default App;