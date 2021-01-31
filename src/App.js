import {useEffect} from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
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
    <div className="App">
  
      <section className="center">
        <p ><em>Log your pruchase</em></p><br />        
        <Inputs />
      </section><br />
      <script src="./attachListeners.js" type="text/jsx" ></script>
      <div className="aux inline">aux1</div>
      <div className="aux2  inline">aux2</div>
    </div>
);
}


export const getPurchases = async()=>{
    let {data,status} = await axios.get(url)
    if(status===200)return data
    return false;
}

const purchaseDistributionByPrice = async()=>{
  let purchases = await getPurchases();
  let prices = purchases.map(element=>element.price)
  let {frecuences,labels} = hist(prices);
 
   ReactDOM.render(
        <Bar heights={frecuences} labels={labels}/>
   ,document.querySelector(".aux")
   );
}
const purchaseDistributionByCathegory = async()=>{

  let purchases = await getPurchases();
  let groupedData = groupBy(purchases,["category"])
  let labels = []
  let frecuences = []
 
  for(let key in groupedData){
      
      labels.push(key)
      frecuences.push(groupedData[key].length)
      
  }
 
   ReactDOM.render(
        <Bar heights={frecuences} labels={labels}/>
   ,document.querySelector(".aux2")
   );

}
export default App;
