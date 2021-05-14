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
            categoryMenuIsOpen:false,
            sendButton:<input type="submit" className="send" value="send"></input>,
            options:[
                {value:"internet",label:"internet"},
                {value:"alquiler",label:"alquiler"},
                {value:"comida",label:"comida"},
                {value:"servicios publicos",label:"Servicios publicos"}],
                categorySelected:{value:"noCathegory",label:"categoria"}
        }
    }

    render(){
        console.log("Rendered new Purchase")
        return (
            <div className="newPurchase">
                <div id="newPurchase" className="newPurchaseTitle">Registra tus compras</div>
                <form className="newPurchaseForm"onSubmit={this.sendPurchase}>
                    <div className="fields">
                        <input className="newPrice" placeholder="$precio" type="number" required></input>
                        <div className="options">
                            <input className="newName" placeholder="nombre" type="text"></input>
                            <input className="newDate" type="date" placeholder="mm/dd/yyyy"></input>
                            <Select onKeyDown={this.addCathegory} 
                            value={this.state.categorySelected}
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
            this.setState({categorySelected:{value: previousValue, label: previousValue}})
            console.log(previousValue)
            ev.target.blur()
        }
    }
    async sendPurchase(ev){
        ev.preventDefault();
        this.setState({sendButton:<LoadingCircles/>})
        let category=this.state.categorySelected.value
        category=category!=="noCathegory"?category:"various"

        let date=new Date(ev.target[2].value)
        if(!date.getDate()){
            date=new Date()
        }
        const newPurchase={
            userId:this.props.userId,
            price:ev.target[0].value,
            category,
            name:ev.target[1].value,
            date
        }
try{
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
    catch(err){
        console.log(err)
    }
}


    selectCathegory(ev){
        this.setState({
            categorySelected:{value:ev.value, label:ev.value}
        })
    }
}