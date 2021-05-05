import {Component} from 'react'
import BarChart from './BarChart'
import {ChartOptions} from './ChartOptions'

export class ChartWithOptions extends Component{
 
  constructor(props){

    super(props)
    
    this.generateBarChartData=this.props.generateBarChartData.bind(this)

    let {dataByCounts, dataByPrice} = this.generateBarChartData() 


    this.grahByDate = this.grahByDate.bind(this)
    this.grahByPrice = this.grahByPrice.bind(this)

    this.changeFinalDate=this.changeFinalDate.bind(this)
    this.changeInitialDate=this.changeInitialDate.bind(this)
    
    this.dataByPrice=dataByPrice
    this.dataByCounts=dataByCounts
    this.renderId=this.props.renderId

    this.state={
      orderByPrice:true,
      initialDate: false,
      finalDate: false
    }
  }

  grahByDate=()=>{
     if(this.state.orderByPrice)this.setState({orderByPrice:false})
  }

  grahByPrice=()=>{
     if(!this.state.orderByPrice)this.setState({orderByPrice:true})
  }

  changeInitialDate(ev){
    this.setState({initialDate:new Date(ev.target.value)})
  }
  changeFinalDate(ev){
    this.setState({finalDate:new Date(ev.target.value)})
  }

  render(){

    console.log("Chart rendered")
    let resetDates=false

    if(this.props.renderId!==this.renderId){
      this.renderId=this.props.renderId
      let {dataByCounts, dataByPrice} = this.generateBarChartData()
      this.dataByPrice=dataByPrice
      this.dataByCounts=dataByCounts
      resetDates=true
    }
    else if(this.state.finalDate || this.state.initialDate){
      let {dataByCounts, dataByPrice} = this.generateBarChartData(this.state.initialDate, this.state.finalDate)
      this.dataByPrice=dataByPrice
      this.dataByCounts=dataByCounts
    }
    
    let data = this.state.orderByPrice?this.dataByPrice:this.dataByCounts

    return ( 
    <div>
       <ChartOptions graphByDate={this.grahByDate}
       graphByPrice={this.grahByPrice}
       changeInitialDate={this.changeInitialDate}
       changeFinalDate={this.changeFinalDate}
       resetDates={resetDates}
       lastInitialDate={this.state.initialDate}
       lastFinalDate={this.state.finalDate}
       />
       <BarChart data={data} orderData={this.props.order} title={this.props.title}/>
    </div>
    )
  }
}