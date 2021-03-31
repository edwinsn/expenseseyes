import React,{Component} from "react";
import '../assets/css/bar.css'


class Bar extends Component{

render(){

    console.log("bar rendered")

    if(!this.props.data[0]) return null

//order data

    let orderedData = this.props.orderData?this.props.data.sort((a,b)=>{return a.height-b.height}):this.props.data

//bars styles

    let maximun =  this.props.orderData?orderedData[orderedData.length-1].height:
                                        this.props.data.reduce((acumulator,element)=>{
                                            return acumulator.height>element.height?acumulator:element;
                                        }).height;


    let normalizedHeights = orderedData.map((element)=>{
        return 100*element.height/maximun
          });


    let barStyles = normalizedHeights.map((h)=>{
        return {height: h+"%",width:(100/orderedData.length)+"%"}
    });

    let bars = [] ;

    barStyles.forEach((style,index)=>{

        let noHeight = style.height.slice(0,-1)==="0"
        let horizontalLineWidth = noHeight?0:(index+1)*102
        let horizontalLineHeight =  noHeight?0:"0.7vh"

        bars.push(
            <div key= {index} className="bar" style={style}>
                    
                    <div className="horizontalLines"
                        style={{width:horizontalLineWidth+"%",height:horizontalLineHeight}}>
                    </div>
                    <div className="label" >
                        {noHeight?"":orderedData[index].label}
                    </div>
            </div>);
    });
 
// frecuences style (labels in the y-axe)

    let frecuences = [];
    let numberOfFrecuences = 5;
    let frecuencesfontSize={fontSize:"70%"}

    for(let i=0;i<=numberOfFrecuences;i++){
        frecuences.unshift(
            <div key={i} 
                 className="frecuence" 
                 style={{...frecuencesfontSize}}>
                     {(maximun*i/numberOfFrecuences).toFixed(1)}
            </div>
        );
    }

    return (
        <div className="barchart">
            <div className="Bartitle">{this.props.title}</div>
            <div className="container">
                <div className="frecuences">
                        {frecuences}
                </div>
                <div className="axis">
                    {bars}
                </div>
            </div>
        </div>
        );
    }
}

const data = []
for(let i=0;i<10;i++)  data.push({height:"10",label:""})


Bar.defaultProps = {
    data:data,
    title:"",
};

export default Bar ;