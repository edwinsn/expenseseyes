import {Component} from 'react'
import {hist,groupBy} from '../statistics'
import BarChart from './BarChart'
import '../assets/css/charts.css'

class PurchaseDistributionByPrice extends Component{
 
  render(){

      let prices = this.props.purchases.map(element=>element.price)

      if(!prices[0])return null;
      
      let {frecuences,labels} = hist(prices);
      let data = [];

      for(let i=0;i<frecuences.length;i++){
        data.push({label:labels[i],height:frecuences[i]})
      } 
  
    console.log("Chart1 rendered")
    return  <BarChart data={data} title="Prices Distribution"/>
  }
}

class PurchaseDistributionByCathegory extends Component{

  render(){

    let groupedData = groupBy(this.props.purchases,["cathegory"])
    let data = []

    for(let key in groupedData){
        data.push({label:key,height:groupedData[key].length})
    }

  console.log("chart2 rendered")
  return <BarChart data={data} orderData={true}  title="Count by Cathegories"/>
  }
}

class PurchaseDistributionByDates extends Component{

  render(){

    let numberOfIntervals = 3 
    let dates = this.props.purchases.map((e)=>{
    return parseInt(e.date.slice(2,4)+ e.date.slice(5,7)+e.date.slice(8,10))
    })

    let {frecuences,labels}=hist(dates, numberOfIntervals, true)
    let data=frecuences.map((e,i)=>{return {label:labels[i], height:e}})
    
    console.log("PurchaseByDates rendered!")
    return <BarChart data={data} title="Dates" />

  }
}

class Charts extends Component{

  render(){
    return (<div className="charts"  style={{width:"100%", height:"100%"}}>
             <PurchaseDistributionByPrice purchases={this.props.purchases}/>
             <PurchaseDistributionByCathegory purchases={this.props.purchases}/>
             <PurchaseDistributionByDates purchases={this.props.purchases}/>
          </div>)
  }
}

export {Charts, PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates}