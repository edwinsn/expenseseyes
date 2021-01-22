import React,{Component} from "react";
import '../assets/css/bar.css'



class Bar extends Component{
    
render(){

    let bars = [] ;
    let frecuences = [];  
   
//Normalize(0,100) the data

//bars styles

    let labelsStyles=[];
    let maxHeight = Math.max(...this.props.heights);

    let heightsStyle = this.props.heights.sort(function(a, b){return a - b}).map((h,i,heights)=>{

        labelsStyles[i]={marginTop:(!heights[i-1])?(-heights[i]):Math.abs(h-heights[1])}

        labelsStyles[i]={marginTop:0};
        return {height: h+"px",marginTop:maxHeight-h}
        
    });

    let barStyles = heightsStyle.map((height, index)=>{
        return {...height,...this.props.widths[index],...this.props.backGroundColor[index]}
    });

    let right = 0;

    barStyles.forEach((Style,index)=>{

        let adjustLabel = 22;
            console.log(right)
        bars.push(<div key= {index} className="bar inline" style={Style}>
                      <div className="horizontalLines" style={{width:right+"px"}}></div>
                      <p className="label" style={{marginTop:(Style['height'].slice(0,-2)-adjustLabel)+"px"}} >{this.props.labels[index]}</p>
                  </div>);
        right +=this.props.heights.length*this.props.widths[0].width.slice(0,-2)*index+2;
        console.log(right)

    });


// frecuences style (labels in the y-axe)

let frecuencesfontSize={fontSize:maxHeight/13}
let paddingTop = "19px"

    for(let i=0;i<=maxHeight/40;i++){

        paddingTop= (i===maxHeight/40)?0:paddingTop;

        frecuences.unshift(
            <div  style={{...frecuencesfontSize,paddingTop:paddingTop}}>{2*i}</div>
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
    let chartWidth = this.props.heights.length*this.props.widths[0].width.slice(0,-2)+3*this.props.heights.length+45;


        return (
            <section>
            <div className="frecuences inline" style={{height:maxHeight+"px"}} >{frecuences}</div>
            <div className="chart inline " style={{width:chartWidth+"px"}}>
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
for(let i=0;i<10;i++)  defaulWidths.push({width:"30px"})
for(let i=0;i<10;i++)  backGroundColor.push({background:"rgb(0, 102, 255)"})



Bar.defaultProps = {
    nbars:10,
    heights:defaultHeights,
    widths:defaulWidths,
    backGroundColor:backGroundColor,
    chartHeight:"200px"
};

export default Bar ;