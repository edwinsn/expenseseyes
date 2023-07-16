import '../../assets/css/chartoptions.css'
import enlageIcon from '../../assets/images/Enlarge.svg'
import calendarIcon from '../../assets/images/Calendar.svg'

export let ChartOptions = (props) => {

    return (
        <div className="optionsContainer">
            <div><img className="optionsImages" src={calendarIcon} alt="Limite temporal" />
                <ul className="intervalOfChart">
                    <li>Feccha inicial:
                        <input type="date" value={props.resetDates ? "" : undefined} onChange={(ev) => {
                            props.changeInitialDate(ev)
                        }} />
                    </li>

                    <li>Fecha final :
                        <input type="date" value={props.resetDates ? "" : undefined}
                            onChange={(ev) => {
                                props.changeFinalDate(ev)
                            }} /></li>
                </ul>
            </div>
            <select className="graphBy"
                onChange={(ev) => {
                    if (ev.target.value === "Cantidad") {
                        props.graphByDate()
                    }
                    else if (ev.target.value === "Precios") {
                        props.graphByPrice()
                    }
                }}
            >
                <option >Precios</option>
                <option >Cantidad</option>
            </select>
            {
                props.showPartsOption &&
                <input
                    title='Dividir el gráfico en n partes'
                    placeholder='Divisiones'
                    type="number"
                    className='divisionInput'
                    onChange={props.setDivisions}
                    defaultValue={10}
                />
            }
            {!props.fullScreen &&
                <a href={"#" + props.ComponentId}>
                    <img src={enlageIcon} className="optionsImages" alt="expand chart" onClick={props.enlargeChart} />
                </a>
            }
            {props.fullScreen && <p onClick={props.reduceChart} className="closeChart">X</p>}
        </div>
    )
}