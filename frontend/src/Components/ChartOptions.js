import '../assets/css/chartoptions.css'
import calendarIcon from '../assets/images/Calendar.svg'

export let ChartOptions=(props)=>{

   console.log(props.lastInitialDate)
    return(
         <div className="optionsContainer">
            <div><img src={calendarIcon} alt="Limite temporal"/>
                <ul className="intervalOfChart">
                <li>Feccha inicial:
                    <input type="date" value={props.resetDates?"":undefined}  onChange={(ev)=>{
                    props.changeInitialDate(ev)}}/>
                    </li>
                    
                <li>Fecha final :
                    <input type="date" value={props.resetDates?"":undefined}
                     onChange={(ev)=>{
                    props.changeFinalDate(ev)}} /></li>
                </ul>
            </div>
            <select className="graphBy"
                    onClick={(ev)=>{
                        if(ev.target.value==="Cantidad"){
                             props.graphByDate()
                        }
                        else if(ev.target.value==="Precios"){
                             props.graphByPrice()
                        }
                    }}
            >
                <option >Precios</option>
                <option >Cantidad</option>
            </select>
        </div>
    )
}