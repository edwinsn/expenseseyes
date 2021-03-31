import {Component, useState} from 'react'
import {hist,groupBy} from '../statistics'
import axios from 'axios';
import BarChart from './BarChart'
import '../assets/css/charts.css'

const getPurchases = async()=>{
  console.log("getting data")
    let {data,status} = await axios.get(process.env.REACT_APP_PURCHASES_URI,{ params:{userId:1} })
    if(status===200)return data
    return false;
}


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
    return parseInt(e.date.slice(0,4)+ e.date.slice(5,7)+e.date.slice(8,10))
    })

    let {frecuences,labels}=hist(dates, numberOfIntervals, true)
    let data=frecuences.map((e,i)=>{return {label:labels[i], height:e}})
    
    console.log("PurchaseByDates rendered!")
    return <BarChart data={data} title="Dates" />

  }
}

class Charts extends Component{

  constructor(props){
    super(props)
    this.state={chart1:null, chart2:null, chart3:null}
  }

  componentDidMount(){
    let purchases = getPurchases()
    purchases.then((res)=>{
      this.setState({chart1:<PurchaseDistributionByPrice purchases={res}/>})
      this.setState({chart2:<PurchaseDistributionByCathegory purchases={res}/>})
      this.setState({chart3:<PurchaseDistributionByDates purchases={res}/>})
    })
  }

  render(){
    return (<div className="charts"  style={{width:"100%", height:"100%"}}>
            {this.state.chart1}
            {this.state.chart2}
            {this.state.chart3}
          </div>)
  }
}

export {Charts, PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates}