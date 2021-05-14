import React,{Component} from "react";
import noDataIcon from '../assets/images/noData.svg'
import '../assets/css/barchart.css'


class Bar extends Component{

render(){


//order data    

    let orderedData = (this.props.orderData?this.props.data.sort((a,b)=>{return a.height-b.height}):
                                           this.props.data).filter((e)=>{
                                               return e.height?true:false
                                           })


//bars styles

    let maximun

    if (!orderedData.length) {
        return (
            <div style={{
                height:"100%",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
                }}>
                <img src={noDataIcon} alt="No hay datos en el intervalo de tiempo escogido" />
                <p>No hay datos de este tiempo</p>
            </div>
        
)    }
    else{
    maximun =  this.props.orderData?orderedData[orderedData.length-1].height:
                                        this.props.data.reduce((acumulator,element)=>{
                                            return acumulator.height>element.height?acumulator:element;
                                        }).height;
    }                                    

    let normalizedHeights = orderedData.map((element)=>{
        return 100*element.height/maximun
          });

    let totalBarsWidth = 100

    if(orderedData.length===1)totalBarsWidth = 50
    else if(orderedData.length===2)totalBarsWidth=70

    let barStyles = normalizedHeights.map((h)=>{
        return {height: h+"%",minWidth:(totalBarsWidth/orderedData.length)+"%"}
    });

    let bars = [] ;

    barStyles.forEach((style,index)=>{

        let noHeight = style.height.slice(0,-1)==="0"
        let horizontalLineWidth = noHeight?0:(index+1)*102+10
        let horizontalLineHeight =  noHeight?0:"0.2vh"

        bars.push(
            <div key= {index} className="bar" style={style}>
                    
                    <div className="horizontalLines"
                        style={{width:horizontalLineWidth+"%",height:horizontalLineHeight}}>
                    </div>
                    <p className="price">{orderedData[index].height}</p>
                    <div className="label" style={{fontSize:this.props.fontSize}}>
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
//el titulo se sobrepone
    return (
        <div className="barchart">
            <div className="barTitle">{this.props.title}</div>
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
for(let i=0;i<5;i++)  data.push({height:0,label:""})


Bar.defaultProps = {
    data:data,
    title:"",
};

export default Bar ;