import React,{Component} from "react";
import '../assets/css/bar.css'



class Bar extends Component{
    
    render(){

        let bars = [] ;
        let frecuences = [];  
        let labelsStyles=[];

        let heightsStyle = this.props.heights.sort(function(a, b){return a - b}).map((h,i,heights)=>{

            labelsStyles[i]={marginTop:(!heights[i-1])?(-heights[i]):Math.abs(heights[i]-heights[1])}
            console.log(labelsStyles[i])
            return {height: h+"px",marginTop:Math.max(...this.props.heights)-h}
        
        });

        let uniqueHeights = this.props.heights.filter( (value, index, heights) =>{
            return heights.indexOf(value) === index;
        });


        let frecuenceFontHeight =Math.round( (Math.max(...this.props.heights) / uniqueHeights.length) -12 )
        let frecuencesStyle = {
              fontSize: frecuenceFontHeight+"px"
        };


        uniqueHeights.forEach( (h,i,uniHeight)=>{

            let paddingTop = (uniHeight[i+1]?uniHeight[i+1]:h)-h ;
            console.log(paddingTop)
            paddingTop = ((paddingTop-frecuenceFontHeight)>0)?(paddingTop-9):0;

            
            console.log(paddingTop)
            console.log("----")

            frecuences.unshift(<div key={frecuencesStyle['paddingTop'] } style={{...frecuencesStyle,paddingTop:paddingTop}}>{h}</div>);

          });

        let barStyles = heightsStyle.map((height, index)=>{
            return {...height,...this.props.widths[index],...this.props.backGroundColor[index]}
        });
        barStyles.forEach((Style,index)=>{

            bars.push(<div key= {index} className="bar inline" style={Style}><p className="label" style={labelsStyles[index]}>{this.props.labels[index]}</p></div>);

       
        });     
        

        return (
            <section>
            <div className="frecuences inline" style={{height:(Math.max(...this.props.heights)-5)+"px"}} >{frecuences}</div>
            <div className="chart inline ">
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
for(let i=0;i<10;i++)  backGroundColor.push({background:"aqua"})



Bar.defaultProps = {
    nbars:10,
    heights:defaultHeights,
    widths:defaulWidths,
    backGroundColor:backGroundColor,
    chartHeight:"200px"
};

export default Bar ;