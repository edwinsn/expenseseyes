import {Component} from 'react'
import {hist,groupBy} from '../statistics'
import {ChartWithOptions} from './ChartWithOptions'
import '../assets/css/charts.css'
import noDataIcon from '../assets/images/noData.svg'
class PurchaseDistributionByPrice extends Component{
 
  constructor(props){

    super(props)
    this.generateBarChartData=this.generateBarChartData.bind(this)
  }


  generateBarChartData(initialDate=false, finalDate=false){


    let purchases=this.props.purchases


    if(initialDate){
      purchases=purchases.filter((e)=>{
        
        return (new Date(e.date))-initialDate>-86400000})
    }

    if(finalDate){
      purchases=purchases.filter((e)=>{
        return new Date(e.date)-finalDate<=0})
    }


    let prices = purchases.map(element=>element.price)

    if(!prices[0])return {dataByCounts:undefined, dataByPrice:undefined};

    let {frecuences,labels, totals} = hist(prices);
    let dataByCounts = [];
    let dataByPrice = [];
    

    for(let i=0;i<frecuences.length;i++){
      dataByCounts.push({label:labels[i],height:frecuences[i]})
      dataByPrice.push({label:labels[i],height:totals[i]})
    }

    return {dataByCounts, dataByPrice}
  }

  render(){

    //console.log("Chart1 rendered")

    return <ChartWithOptions title="Compras por Precios" generateBarChartData={this.generateBarChartData} renderId={this.props.renderId}/>

  }
}

class PurchaseDistributionByCathegory extends Component{

  constructor(props){
    super(props)
    this.generateBarChartData = this.generateBarChartData.bind(this)
  }

  generateBarChartData(initialDate=false, finalDate=false){

    let purchases=this.props.purchases

    if(initialDate){
      purchases=purchases.filter((e)=>{return new Date(e.date)-initialDate>-86400000})
    }

    if(finalDate){
      purchases=purchases.filter((e)=>{return new Date(e.date)-finalDate<=0})
    }

   let groupedData = groupBy(purchases,["category"])
    
    let dataByCounts = []
    let dataByPrice=[]

    for(let key in groupedData){
        dataByCounts.push({label:key,height:groupedData[key].length})
        
        let sum=0
        groupedData[key].forEach((e)=>{sum+=e.price})
        dataByPrice.push({label:key,height:sum})
    }
    return {dataByCounts, dataByPrice}

  }

  render(){

  //console.log("Chart2 rendered")

  return <ChartWithOptions title="Compras por Categoria" generateBarChartData={this.generateBarChartData} order={true} renderId={this.props.renderId}/>
  
  }
}

class PurchaseDistributionByDates extends Component{

  constructor(props){

    super(props)
    this.generateBarChartData=this.generateBarChartData.bind(this)
  
  }

  generateBarChartData(initialDate=false, finalDate=false){

    let purchases=this.props.purchases

    if(initialDate){
      purchases=purchases.filter((e)=>{return new Date(e.date)-initialDate>-86400000})
    }

    if(finalDate){
      purchases=purchases.filter((e)=>{return new Date(e.date)-finalDate<=0})
    }

    let numberOfIntervals = 0
    let dates = purchases.map((e)=>{
      try{
        return e.date
      }
      catch(err){
        return undefined
      }
    })
    let prices = this.props.purchases.map((e)=>{return e.price})

    let {frecuences,labels, totals}=hist(dates, numberOfIntervals, true, prices)

    if(frecuences){
      let dataByCounts=frecuences.map((e,i)=>{return {label:labels[i], height:e}})
      let dataByPrice=totals.map((e,i)=>{return {label:labels[i], height:e}})
      return {dataByPrice, dataByCounts}
      }

    return {dataByPrice:undefined, dataByCounts:undefined}

  }

  render(){
  //console.log("Chart3 rendered!")

  return <ChartWithOptions title="Compras por fecha" generateBarChartData={this.generateBarChartData} order={true} renderId={this.props.renderId}/>
  }
}

class Charts extends Component{


  render(){    

  let renderId = Math.random()

  if(this.props.purchases[0]){
    return (<div className="charts"  style={{width:"100%", height:"100%"}} >
             <PurchaseDistributionByPrice  purchases={this.props.purchases} orderByPrice={false} renderId={renderId}/>
             <PurchaseDistributionByCathegory  purchases={this.props.purchases} renderId={renderId}/>
             <PurchaseDistributionByDates  purchases={this.props.purchases} renderId={renderId}/>
          </div>)
  }
  return (
  <div className="noData">
  <img src={noDataIcon} className="noDataIcon" alt="sin compras"/>
  <p>Registra tus compras</p>
  </div>
  )
  }
}

export {Charts, PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates}