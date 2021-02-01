import React,{Component} from "react";
import '../assets/css/bar.css'


class Bar extends Component{

render(){

    let bars = [] ;
    let maxHeight = 240;

//order data

    let orderedData = this.props.data.sort((a,b)=>{return a.height-b.height});

//bars styles

    let maximun = this.props.data.reduce((acumulator,element)=>{
        return acumulator.height>element.height?acumulator.height:element.height;
    });

    let normalizedHeights=this.props.data.map((element)=>{
        return maxHeight*element.height/maximun
          });

    let barStyles = normalizedHeights.map((h)=>{
        return {height: h+"px",marginTop:maxHeight-h,width:this.props.width}        
    });


    let horizontalLineWidth = 0;

    barStyles.forEach((Style,index)=>{

        let adjustLabel = 35;
        let adjustMarginLabel = (Style['height'].slice(0,-2)-adjustLabel)+"px"
        horizontalLineWidth +=parseFloat(this.props.width.slice(0,-2))+index*4;

        bars.push(
            <div key= {index} className="bar" style={Style}>
                    <div className="horizontalLines" style={{width:horizontalLineWidth+"px"}}></div>
                    <p className="label" style={{marginTop:adjustMarginLabel}} >
                        {orderedData[index].label}
                    </p>
            </div>);
    });
 
// frecuences style (labels in the y-axe)

let frecuences = [];  
let numberOfFrecuences = 5;
let frecuencesfontSize={fontSize:maxHeight/18}
let paddingTop = ( (maxHeight-(numberOfFrecuences+1.1)*frecuencesfontSize.fontSize)/(numberOfFrecuences) )+"px"

    for(let i=0;i<=numberOfFrecuences;i++){

        paddingTop= (i===numberOfFrecuences)?0:paddingTop;

        frecuences.unshift(
            <div key={i} style={{...frecuencesfontSize,paddingTop:paddingTop}}>{i?(maximun*i/numberOfFrecuences).toFixed(1):i}</div>
        );
    }

/*

    let uniqueHeights = this.props.heights.filter( (value, index, heights) =>{
        return heights.indexOf(value) === index;
        });


    let frecuenceFontHeight =Math.round( maxHeight / (3*uniqueHeights.length)) 
    let frecuencesfontSize = {
              fontSize: frecuenceFontHeight+"px"
    };


    uniqueHeights.forEach( (h,i,uniHeights)=>{

        let paddingTop = (uniHeights[i+1]?uniHeights[i+1]:h)-h ;

        paddingTop = ((paddingTop-frecuenceFontHeight)>0)?(paddingTop-6):0;

        frecuences.unshift(
            <div  style={{...frecuencesfontSize,paddingTop:paddingTop}}>{h+"-"}</div>);
    });

*/        
    let chartWidth = this.props.data.length*this.props.width.slice(0,-2)+3*this.props.data.length+50;


        return (
            <section>
            <p className="title">{this.props.title}</p>
            <div className="frecuences" style={{height:maxHeight+"px"}} >{frecuences}</div>
            <div className="chart" style={{width:chartWidth+"px"}}>
                    {bars}
            </div>
            </section>
        );
    }
}

const data = []
for(let i=0;i<10;i++)  data.push({height:"10",label:""})


Bar.defaultProps = {
    data:data,
    width:"30px",
    title:""
};

export default Bar ;