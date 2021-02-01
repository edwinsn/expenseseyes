import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect} from 'react'
import './assets/css/App.css'
import axios from 'axios';
import Bar from './Components/Bar'
import {Inputs} from './Components/Inputs' 
import {hist,groupBy} from './statistics'

let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";


function App() {

   useEffect(()=>{
    purchaseDistributionByPrice();
    purchaseDistributionByCathegory();
   },[])

  return (
    <div className="App center">
      <p ><em>Log your pruchase</em></p><br />        
      <Inputs />
      <div className="aux inline"></div>
      <div className="aux2  inline"></div>
    </div>
);
}


const getPurchases = async()=>{
    let {data,status} = await axios.get(url+"/purchases")
    if(status===200)return data
    return false;
}

const purchaseDistributionByPrice = async()=>{
  let purchases = await getPurchases();
  let prices = purchases.map(element=>element.price)
  let {frecuences,labels} = hist(prices);
  let data = [];

  for(let i=0;i<frecuences.length;i++){
    data.push({label:labels[i],height:frecuences[i]})
  }

   ReactDOM.render(
        <Bar data={data} title="Prices Distribution"/>
   ,document.querySelector(".aux")
   );
}

const purchaseDistributionByCathegory = async()=>{

  let purchases = await getPurchases();
  let groupedData = groupBy(purchases,["category"])
  let data = []
  console.log(purchases)
  for(let key in groupedData){
      
      data.push({label:key,height:groupedData[key].length})
      
  }
  ReactDOM.render(
        <Bar data={data} title="Count by Cathegories"/>
        ,document.querySelector(".aux2")
   );

}
export default App;