import { Component } from 'react'
import BarChart from './BarChart'
import { ChartOptions } from './ChartOptions'


export class ChartWithOptions extends Component {

  constructor(props) {

    super(props)

    this.generateBarChartData = this.props.generateBarChartData.bind(this)

    let { dataByCounts, dataByPrice } = this.generateBarChartData()


    this.grahByDate = this.grahByDate.bind(this)
    this.grahByPrice = this.grahByPrice.bind(this)

    this.changeFinalDate = this.changeFinalDate.bind(this)
    this.changeInitialDate = this.changeInitialDate.bind(this)

    this.ComponentId = Math.random()
    this.dataByPrice = dataByPrice
    this.dataByCounts = dataByCounts
    this.renderId = this.props.renderId
    this.divisions=10

    this.state = {
      orderByPrice: true,
      initialDate: false,
      finalDate: false,
      fullScreen: false
    }
  }



  grahByDate = () => {
    if (this.state.orderByPrice) this.setState({ orderByPrice: false })
  }

  grahByPrice = () => {
    if (!this.state.orderByPrice) this.setState({ orderByPrice: true })
  }

  changeInitialDate(ev) {
    this.setState({ initialDate: new Date(ev.target.value) })
  }
  changeFinalDate(ev) {
    this.setState({ finalDate: new Date(ev.target.value) })
  }

  setDivisions = (ev) => {
    this.setState({ divisions: ev.target.value })
  }

  enlargeChart = () => {
    this.setState({
      fullScreen: true
    })
  }
  reduceChart = () => {
    this.setState({
      fullScreen: false
    })
  }


  render() {

    let resetDates = false

    if (this.props.renderId !== this.renderId) {
      this.renderId = this.props.renderId
      let { dataByCounts, dataByPrice } = this.generateBarChartData(undefined, undefined, this.state.divisions)
      this.dataByPrice = dataByPrice
      this.dataByCounts = dataByCounts
      resetDates = true
    }
    else if (this.state.finalDate || this.state.initialDate || this.state.divisions) {
      let { dataByCounts, dataByPrice } = this.generateBarChartData(this.state.initialDate, this.state.finalDate, this.state.divisions)
      this.dataByPrice = dataByPrice
      this.dataByCounts = dataByCounts
    }

    let data = this.state.orderByPrice ? this.dataByPrice : this.dataByCounts

    let fullScreenStyle = undefined

    if (this.state.fullScreen) {
      fullScreenStyle = {
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "1.6%",
        marginTop: "1%",
        border: "1.5px solid #666963",
        zIndex: "3"
      }
      if (window.innerWidth < 500) {
        fullScreenStyle = {
          ...fullScreenStyle,
          transformOrigin: "top left",
          transform: " translate(85%,-0%) rotate(90deg)",
          minWidth: "85vh",
          height: "94vw",
          margin: "0 0 55% 0",
          zIndex: 5
        }
      }
      else {
        fullScreenStyle = {
          ...fullScreenStyle,
          height: "94%",
          minWidth: "94%"
        }
      }
    }

    return (
      <div
        tabIndex="0"
        id={this.ComponentId}
        className="chartWithOptions"
        style={fullScreenStyle}>
        <ChartOptions
          graphByDate={this.grahByDate}
          graphByPrice={this.grahByPrice}
          changeInitialDate={this.changeInitialDate}
          changeFinalDate={this.changeFinalDate}
          resetDates={resetDates}
          lastInitialDate={this.state.initialDate}
          lastFinalDate={this.state.finalDate}
          reduceChart={this.reduceChart}
          fullScreen={this.state.fullScreen}
          enlargeChart={this.enlargeChart}
          ComponentId={this.ComponentId}
          showPartsOption={this.props.showPartsOption}
          setDivisions={this.setDivisions}
        />
        <BarChart data={data} orderData={this.props.order} title={this.props.title} fontSize={this.state.fullScreen ? "large" : undefined} />
      </div>
    )
  }
}