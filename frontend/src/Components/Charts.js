import {Component} from 'react'
import {hist,groupBy} from '../statistics'
import BarChart from './BarChart'
import '../assets/css/charts.css'

class PurchaseDistributionByPrice extends Component{
 
  constructor(props){

    super(props)
    let prices = this.props.purchases.map(element=>element.price)

    if(!prices[0])return null;
      
    let {frecuences,labels, totals} = hist(prices);
    let dataByCounts = [];
    let dataByPrice = [];

    for(let i=0;i<frecuences.length;i++){
      dataByCounts.push({label:labels[i],height:frecuences[i]})
      dataByPrice.push({label:labels[i],height:totals[i]})
    }

    this.state={
      dataByCounts,
      dataByPrice,
      orderByPrice:true
    }
  }

  render(){

    console.log("Chart1 rendered")

    let data = this.state.orderByPrice?this.state.dataByPrice:this.state.dataByCounts
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
    let groupedData = groupBy(this.props.purchases,["cathegory"])
    let dataByCounts = []
    let dataByPrice=[]

    for(let key in groupedData){
        dataByCounts.push({label:key,height:groupedData[key].length})
        
        let sum=0
        groupedData[key].forEach((e)=>{sum+=e.price})
        dataByPrice.push({label:key,height:sum})
    }

    this.state={
      dataByCounts,
      dataByPrice,
      orderByPrice:true
    }

  }

  render(){

  console.log("Chart2 rendered")

  let data=this.state.orderByPrice?this.state.dataByPrice:this.state.dataByCounts

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
    let numberOfIntervals = 3 
    let dates = this.props.purchases.map((e)=>{
    return parseInt(e.date.slice(2,4)+ e.date.slice(5,7)+e.date.slice(8,10))
    })

    let {frecuences,labels, totals}=hist(dates, numberOfIntervals, true)
    let dataByCounts=frecuences.map((e,i)=>{return {label:labels[i], height:e}})
    let dataByPrice=totals.map((e,i)=>{return {label:labels[i], height:e}})
    this.state={
      dataByCounts,
      dataByPrice,
      orderByPrice:true
    } 
  
  }


  render(){
    console.log("Chart3 rendered!")

    let data=this.state.orderByPrice?this.state.dataByPrice:this.state.dataByCounts

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
    return (<div className="charts"  style={{width:"100%", height:"100%"}}>
             <PurchaseDistributionByPrice purchases={this.props.purchases} orderByPrice={false}/>
             <PurchaseDistributionByCathegory purchases={this.props.purchases} />
             <PurchaseDistributionByDates purchases={this.props.purchases}/>
          </div>)
  }
}

export {Charts, PurchaseDistributionByCathegory, PurchaseDistributionByPrice, PurchaseDistributionByDates}