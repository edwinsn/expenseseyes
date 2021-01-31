import {Component} from 'react'
import axios from 'axios';
import '../assets/css/input.css'
//solve the notifications errors***
//reorder the code in a new component***
//error when cathegory doesnt void
//when clicking the input deleted active Category***
let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";
let activeCategory = false;

export class Inputs extends Component{


    //  componentDidMount(){
    //      insertSavedCategories();
    //  }

    render(){
        return (<div>
            
            <div className="categories inlineTable">
                <button onClick={selectCategory}>food</button>
                <button onClick={selectCategory}>rent</button>
                <button onClick={selectCategory}>clothes</button>
                <button onClick={selectCategory}>tech</button>      
            </div>
    
            <div className="left inlineTable">
        
                <div className="newCatergoryContainer">
                    <input onKeyUp={this.addCategoryOnEnter} onClick={this.activeOtherCathegoryInput} className="otherCategory" type ="text" placeholder="Other Type"></input>
                </div>
                <div className="categoryNotification notification"></div>
                <input className="cost" onKeyUp={postNewPurchaseOnEnter} placeholder="$cost" type="number"></input>
                <div className="priceNotification notification"></div>
                <button  onClick={postNewPurchase}>Load Purchase</button>
                <div className="purchaseDataNotification notification"></div>
            </div>

        </div>)
    }

    activeOtherCathegoryInput(){
        //if there is an cathegory selectec deselect it
        if(document.querySelector(".selectedCategory")){
            document.querySelector(".selectedCategory").classList.remove("selectedCategory")
            document.querySelector(".otherCategory").style.color="black";
            activeCategory = false;
        }

    }
    addCategoryOnEnter(event){
        if(event.keyCode===13){
            addCategory(event.target.value);
        }
    } 
}

let selectCategory =(event)=>{

    //deselect the previous selection
    let peviousCathegorySelection=document.querySelector(".selectedCategory")
    if(peviousCathegorySelection) {
    peviousCathegorySelection.classList.remove("selectedCategory")
    }
    
    event.target.classList.add("selectedCategory")

    document.querySelector(".otherCategory").style.color="gray"
    activeCategory = event.target.innerText;
}

let addCategory=(newcategoryText)=>{

    let categoriesDiv = document.querySelector(".categories");
    let listOfCategories = [...categoriesDiv.children].filter((child=>child.innerText.length>0)).map((child)=>{return child.innerText})


    if(newcategoryText.length>0 && !listOfCategories.includes(newcategoryText)){
    
        let newCategory = document.createElement("button");
        newCategory.innerText = newcategoryText;

        if((categoriesDiv.childElementCount+1)%5===0){
        categoriesDiv.appendChild(document.createElement("br"))
        }
        categoriesDiv.appendChild(newCategory);
        Notification("",".categoryNotification");
        //postCategory(newcategoryText);       
    }
    else {
        
        if(!newcategoryText.length){
        Notification("Empty Category",".categoryNotification");}
        else{
        Notification("Existing Category",".categoryNotification");
        }
    }
}

let postCategory=async(category)=>{

    let endPoint = url+"/categories"
    let {status} = await axios.post(endPoint,{name:category})
    if(status!==200){
        alert("Error saving the category: "+status)
    }
}
let verifyDataEntries=()=>{

    if(!activeCategory){
        
        let newCategory = document.querySelector(".otherCategory").value;
        
        if(newCategory){
            addCategory(newCategory);
            Notification(".categoryNotification")
        }
        else{
            Notification("Select a category or enter a new one",".categoryNotification");
            return {cathegory:"",price:0,dataIsValid:false};
        }
}else{Notification("",".categoryNotification")}

//remove the empty category 
    let price = document.querySelector(".cost").value
    if(!price||price<0){
        Notification("Enter the price of your purchase",".priceNotification");
        return {cathegory:"",price:0,dataIsValid:false};
    }
    return {cathegory:activeCategory,price:price,dataIsValid:true};
}

let postNewPurchaseOnEnter=(event)=>{
    if(event.keyCode===13){
        postNewPurchase();
    }
}

let postNewPurchase = async()=>{

    let {cathegory,price,dataIsValid} = verifyDataEntries();

    
    if(dataIsValid){

        Notification("Loading",".categoryNotification");

      let {status} = await axios.post(url+"/purchases",{
          category:cathegory,
          price:price
        })

    if(status===200){

        Notification("",".categoryNotification");
        Notification("",".priceNotification");
        Notification("",".purchaseDataNotification");

        let selectedCategory = document.querySelector(".selectedCategory") ;
        if(selectedCategory){
            selectedCategory.style.background="white";
        }
        else{document.querySelector('.otherCategory').value = "";}
        document.querySelector('.cost').value = "";
      
    }
      else{
        Notification("Sorry purchase not registed\n error:"+status,"purchaseDataNotification")
      }
    }

    //reset the values as before the entry
    activeCategory=false;

}

let Notification = (notification,htmlClass)=>{
    document.querySelector(htmlClass).innerText=notification;
}

let insertSavedCategories=async()=>{

    let {data,status} = await axios.get(url+"/categories");
    if(status===200){ 

        let categories = document.querySelector(".categories");
        let savedCategoriesJson=[...data];

        savedCategoriesJson.forEach((category,i)=>{
          
            if(i%4===0)categories.appendChild(document.createElement("br"));
            let categotyButton = document.createElement("button");
            categotyButton.innerText = category.name;
            categotyButton.addEventListener("click",selectCategory)
            categories.appendChild(categotyButton)
        
        });
        
        if((categories.childElementCount+1)%4)categories.appendChild(document.createElement("ins"));
    
    }
}