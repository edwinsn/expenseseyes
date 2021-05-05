import { Component } from "react";
import Select from "react-select";
import axios from 'axios'
import '../assets/css/newPurchase.css'
import { LoadingCircles } from "./Loading";

export class NewPurchase extends Component{

    constructor(props){
        super(props)
        this.addCathegory=this.addCathegory.bind(this)
        this.selectCathegory=this.selectCathegory.bind(this)
        this.sendPurchase=this.sendPurchase.bind(this)
        this.state={
            cathegoryMenuIsOpen:false,
            sendButton:<input type="submit" className="send" value="send"></input>,
            options:[
                {value:"internet",label:"internet"},
                {value:"alquiler",label:"alquiler"},
                {value:"comida",label:"comida"},
                {value:"servicios publicos",label:"Servicios publicos"}],
                cathegorySelected:{value:"noCathegory",label:"categoria"}
        }
    }

    render(){
        console.log("Rendered new Purchase")
        return (
            <div className="newPurchase">
                <div className="newPurchaseTitle">Registra tus compras</div>
                <form className="newPurchaseForm"onSubmit={this.sendPurchase}>
                    <div className="fields">
                        <input className="newPrice" placeholder="$precio" type="number" required></input>
                        <div className="options">
                            <input className="newName" placeholder="nombre" type="text"></input>
                            <input className="newDate" type="date" placeholder="mm/dd/yyyy"></input>
                            <Select onKeyDown={this.addCathegory} 
                            value={this.state.cathegorySelected}
                            onChange={this.selectCathegory}
                            className="newCathegory" 
                            options={this.state.options}
                            />
                        </div>
                    </div>
                    <div className="sendButtonContainer">
                   {this.state.sendButton} 
                   </div>
                </form>
            </div>
            )
        }

    addCathegory(ev){
        if(ev.keyCode===13){
            let previousValue=ev.target.value
            this.setState({cathegorySelected:{value: previousValue, label: previousValue}})
            console.log(previousValue)
            ev.target.blur()
        }
    }
    async sendPurchase(ev){
        ev.preventDefault();
        this.setState({sendButton:<LoadingCircles/>})
        let cathegory=this.state.cathegorySelected.value
        cathegory=cathegory!=="noCathegory"?cathegory:"various"

        let date=new Date(ev.target[2].value)
        if(!date.getDate()){
            date=new Date()
        }
        const newPurchase={
            userId:this.props.userId,
            price:ev.target[0].value,
            cathegory,
            name:ev.target[1].value,
            date
        }

        const {status}=await axios.post(process.env.REACT_APP_PURCHASES_URI, newPurchase)
        
        if(status===200){
            console.log("Data saved")
            await this.props.update()
        
            for(let i=0;i<3;i++){
                ev.target[i].value=""
            }
        }
        else{console.log("Error: "+ status)}
        this.setState({sendButton:<input type="submit" className="send" value="send"></input>})
    }


    selectCathegory(ev){
        this.setState({
            cathegorySelected:{value:ev.value, label:ev.value}
        })
    }
}