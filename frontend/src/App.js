import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css'
import axios from 'axios';
import Bar from './Components/Bar'
import {Inputs} from './Components/Inputs' 
import {hist,groupBy} from './statistics'
import {url} from "./url";


class App extends Component {

  constructor(props){
    super(props);
    this.update = this.update.bind(this);
  }


  render(){

    purchaseDistributionByPrice();
    purchaseDistributionByCathegory();

    return (
      <div className="App center">
        <p className="title"><em>Log your purchase type and price</em></p><br />        
        <Inputs update={()=>{this.update();}} />
        <div className="aux inline"></div>
        <div className="aux2  inline"></div>
      </div>
  );
  }

  update(){
    this.forceUpdate();
  }

}


const getPurchases = async()=>{
    let {data,status} = await axios.get(url+"/purchases")
    if(status===200)return data
    return false;
}

const purchaseDistributionByPrice = async()=>{
  let purchases = await getPurchases();
  let prices = purchases.map(element=>element.price)

  if(!prices[0])return null;
  
  let {frecuences,labels} = hist(prices);
  let data = [];

  for(let i=0;i<frecuences.length;i++){
    data.push({label:labels[i],height:frecuences[i]})
  }
  console.log(data)
   ReactDOM.render(
        <Bar data={data} title="Prices Distribution"/>
   ,document.querySelector(".aux")
   );
}

const purchaseDistributionByCathegory = async()=>{

  let purchases = await getPurchases();
  let groupedData = groupBy(purchases,["category"])
  let data = []
  for(let key in groupedData){
      
      data.push({label:key,height:groupedData[key].length})
      
  }
  console.log(data)
  ReactDOM.render(
        <Bar data={data} title="Count by Cathegories"/>
        ,document.querySelector(".aux2")
   );

}
export default App;