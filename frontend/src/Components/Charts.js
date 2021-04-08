import {Component} from 'react'
import {hist,groupBy} from '../statistics'
import BarChart from './BarChart'
import '../assets/css/charts.css'

class PurchaseDistributionByPrice extends Component{
 
  constructor(props){

    super(props)

    const {dataByCounts, dataByPrice} = this.generateBarChartData()

    this.dataByPrice=dataByPrice
    this.dataByCounts=dataByCounts
    this.renderId=this.props.renderId

    this.state={
      orderByPrice:true
    }
  }

  generateBarChartData(){

    let prices = this.props.purchases.map(element=>element.price)

    if(!prices[0])return null;

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

    console.log("Chart1 rendered")

    if(this.props.renderId!==this.renderId){
      this.renderId=this.props.renderId
      let {dataByCounts, dataByPrice} = this.generateBarChartData()
      this.dataByPrice=dataByPrice
      this.dataByCounts=dataByCounts
    }    
    
    let data = this.state.orderByPrice?this.dataByPrice:this.dataByCounts
    
    return ( 
    <div>
        <select className="graphBy">
          <option onClick={()=>{
            if(!this.state.orderByPrice)this.setState({orderByPrice:true})
          }
        }>Prices</option>
          <option onClick={()=>{
            this.setState({orderByPrice:false})
          }
          }>Counts</option>
        </select>
       <BarChart data={data} title="Prices Distribution"/>
    </div>
    )
  }
}

class PurchaseDistributionByCathegory extends Component{

  constructor(props){

    super(props)

    const {dataByCounts, dataByPrice} = this.generateBarChartData()
    this.dataByCounts = dataByCounts
    this.dataByPrice= dataByPrice 

    this.renderId=this.props.renderId

    this.state={
      orderByPrice:true
    }

  }

  generateBarChartData(){

   let groupedData = groupBy(this.props.purchases,["cathegory"])
    
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

  console.log("Chart2 rendered")

    if(this.props.renderId!==this.renderId){
      this.renderId=this.props.renderId
      let {dataByCounts, dataByPrice} = this.generateBarChartData()
      this.dataByPrice=dataByPrice
      this.dataByCounts=dataByCounts
    }    

  let data=this.state.orderByPrice?this.dataByPrice:this.dataByCounts

  return (
    <div>
      <select className="graphBy">
      <option onClick={()=>{
        if(!this.state.orderByPrice)this.setState({orderByPrice:true})
        }
      }>Prices</option>
      <option onClick={()=>{
        this.setState({orderByPrice:false})
       }
      }>Counts</option>
      </select>
      <BarChart data={data} orderData={true}  title="Count by Cathegories"/>
    </div>
    )
  }
}

class PurchaseDistributionByDates extends Component{

  constructor(props){

    super(props)

    this.renderId=this.props.renderId

    const {dataByCounts, dataByPrice} = this.generateBarChartData()
    
      this.dataByCounts=dataByCounts
      this.dataByPrice=dataByPrice

    this.state={
      orderByPrice:true
    } 
  
  }

  generateBarChartData(){

    let numberOfIntervals = 3 
    let dates = this.props.purchases.map((e)=>{
    return parseInt(e.date.slice(2,4)+ e.date.slice(5,7)+e.date.slice(8,10))
    })
    let pricesBysDates= this.props.purchases.map((e)=>{return e.price})

    let {frecuences,labels, totals}=hist(dates, numberOfIntervals, true, pricesBysDates)
    let dataByCounts=frecuences.map((e,i)=>{return {label:labels[i], height:e}})
    let dataByPrice=totals.map((e,i)=>{return {label:labels[i], height:e}})

    return {dataByPrice, dataByCounts}
  }

  render(){
    console.log("Chart3 rendered!")


    if(this.props.renderId!==this.renderId){
      this.renderId=this.props.renderId
      let {dataByCounts, dataByPrice} = this.generateBarChartData()
      this.dataByPrice=dataByPrice
      this.dataByCounts=dataByCounts
    }    

    let data=this.state.orderByPrice?this.dataByPrice:this.dataByCounts

    return (
      <div>
        <select className="graphBy">
          <option onClick={()=>{
            if(!this.state.orderByPrice)this.setState({orderByPrice:true})
          }
        }>Prices</option>
          <option onClick={()=>{
            this.setState({orderByPrice:false})
          }
          }>Counts</option>
        </select>
        <BarChart data={data} title="Dates" />
      </div>)
  }
}

class Charts extends Component{


  render(){
    
  let renderId = Math.random()

    return (<div className="charts"  style={{width:"100%", height:"100%"}} >
             <PurchaseDistributionByPrice purchases={this.props.purchases} orderByPrice={false} renderId={renderId}/>
             <PurchaseDistributionByCathegory purchases={this.props.purchases} renderId={renderId}/>
             <PurchaseDistributionByDates purchases={this.props.purchases} renderId={renderId}/>
          </div>)
  }
}

export {Charts, PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates}