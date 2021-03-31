import React from 'react';
import './assets/css/App.css'
import {Inputs} from './Components/Inputs' 
import {Charts,PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates} from  './Components/Charts'
import {PurchaseList} from './Components/PurchaseList'

function App () {


    console.log("App rendered")
    let isWideEnought =  true
    let listWidth = (isWideEnought?38:85)
    let chartContainerWidth = (isWideEnought?(99-listWidth):85)

    return (
      <div className="App center">
        <div className="info">  
          
          <div style={{width:listWidth+"%", boxSizing:"border-box",minWidth:"6.6cm"}}>
            <Inputs /*update={()=>{this.update();}}*/ />
            <PurchaseList/>          
          </div>
          
          <div style={{width:chartContainerWidth+"%"}}>
           <Charts /> 
          </div>

        </div>
      </div>
  );
}

export default App;