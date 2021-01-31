import React,{Component} from "react";
import '../assets/css/bar.css'


class Bar extends Component{

render(){

    let bars = [] ;
    let maxHeight = 240;
   
//bars styles

    let maximun = Math.max(...this.props.heights);

    let normalizedHeights=this.props.heights.map((element)=>{
        return maxHeight*element/maximun
          });
    let heightsStyle = normalizedHeights.sort(function(a, b){return a - b}).map((h)=>{
        return {height: h+"px",marginTop:maxHeight-h}        
    });

    let barStyles = heightsStyle.map((height, index)=>{
        return {...height,...this.props.widths[index],background:this.props.background}
    });

    let horizontalLineWidth = 0;

    barStyles.forEach((Style,index)=>{

        let adjustLabel = 35;
        let adjustMarginLabel = (Style['height'].slice(0,-2)-adjustLabel)+"px"
        horizontalLineWidth +=parseFloat(this.props.widths[index].width.slice(0,-2))+index*4;

        bars.push(
            <div key= {index} className="bar" style={Style}>
                    <div className="horizontalLines" style={{width:horizontalLineWidth+"px"}}></div>
                    <p className="label" style={{marginTop:adjustMarginLabel}} >
                        {this.props.labels[index]}
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
            <div key={i} style={{...frecuencesfontSize,paddingTop:paddingTop}}>{Math.round(maximun*i/numberOfFrecuences)}</div>
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
    let chartWidth = this.props.heights.length*this.props.widths[0].width.slice(0,-2)+3*this.props.heights.length+50;


        return (
            <section>
            <div className="frecuences" style={{height:maxHeight+"px"}} >{frecuences}</div>
            <div className="chart" style={{width:chartWidth+"px"}}>
                    {bars}
            </div>
            </section>
        );
    }
}

const defaultHeights = []
const defaulWidths = []
const backGroundColor = []
for(let i=0;i<10;i++)  defaultHeights.push("40px")
for(let i=0;i<20;i++)  defaulWidths.push({width:"30px"})
// ojo con widthsssss1


Bar.defaultProps = {
    nbars:10,
    heights:defaultHeights,
    widths:defaulWidths,
    background:"rgb(0, 102, 255)",
    chartHeight:"200px"
};

export default Bar ;