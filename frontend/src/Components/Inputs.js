import {Component} from 'react'
import axios from 'axios';
import '../assets/css/input.css'
//cant press twice same cathegory
//change the notifications
let activeCategory = false;

export function Inputs (){
    

    /*
    componentDidMount(){
        insertSavedCategories();
    }*/


        console.log("Inputs rendered")
        return (
        <div>
            <p className="title">Log your purchase data</p>
            <input placeholder="$price" type="number"></input>
            <div className="categories">
                <button onClick={selectCategory}>Food</button>
                <button onClick={selectCategory}>Rent</button>
                <button onClick={selectCategory}>Clothes</button>
                <button onClick={selectCategory}>Tech</button>
            </div>

            <input onKeyUp={addCategoryOnEnter}
              onClick={activeOtherCathegoryInput} 
              className="otherCathegory" 
              type ="text" 
              placeholder="Other Type">
            </input>                
            <div className="categoryNotification notification"></div>
            <div className="priceNotificadollartion notification"></div>
            <button  onClick={postNewPurchase}>Load Purchase</button>
            <div className="purchaseDataNotification notification"></div>


        </div>)
}

  function  postNewPurchaseOnEnter(event){
        if(event.keyCode===13){
            //
            this.postNewPurchase();
        }
    }
    
  async function postNewPurchase(){
    
        let {cathegory,price,dataIsValid} = verifyDataEntries();
        
        if(dataIsValid){
    
            Notification("Loading",".categoryNotification");
    
          let {status} = await axios.post(process.env.PURCHASES_URI ,{
              category:cathegory,
              price:price
            })
        if(status===200){
    
            Notification("",".categoryNotification");
            Notification("",".priceNotification");
            Notification("",".purchaseDataNotification");
    
            let selectedCategory = document.querySelector(".selectedCategory") ;
            if(selectedCategory){
                selectedCategory.classList.remove("selectedCategory");
            }
            else{document.querySelector('.otherCategory').value = "";}
            document.querySelector('.cost').value = "";
            this.props.update() 
        }
          else{
            Notification("Sorry purchase not registed\n error:"+status,"purchaseDataNotification")
          }
        }
    
        //reset the values as before the entry
        activeCategory=false;
    
    }
    


let activeOtherCathegoryInput=()=>{
    //if there is an cathegory selectec deselect it
    if(document.querySelector(".selectedCategory")){
        document.querySelector(".selectedCategory").classList.remove("selectedCategory")
        document.querySelector(".otherCategory").style.color="black";
        activeCategory = false;
    }
}
const addCategoryOnEnter=(event)=>{
    if(event.keyCode===13){
        addCategory(event.target.value);
    }
}

let selectCategory =(event)=>{
    //deselect the previous selection
    let peviousCategorySelection=document.querySelector(".selectedCategory");
    if(peviousCategorySelection){
    peviousCategorySelection.classList.remove("selectedCategory")
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
        newCategory.addEventListener("click",selectCategory)
        categoriesDiv.appendChild(newCategory);
        Notification("",".categoryNotification");
        //
        postCategory(newcategoryText);       
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

    let endPoint = process.env.PURCHASES_URI 
    let {status} = await axios.post(endPoint,{name:category})
    if(status!==200){
        alert("Error saving the category: "+status)
    }
}
let verifyDataEntries=()=>{

    if(!activeCategory){
        
        activeCategory = document.querySelector(".otherCategory").value;

        if(activeCategory){
            addCategory(activeCategory);
            Notification("",".categoryNotification")
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


let Notification = (notification,htmlClass)=>{
    document.querySelector(htmlClass).innerText=notification;
}

/*let insertSavedCategories=async()=>{

    let {data,status} = await axios.get(process.env.PURCHASES_URI);
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
        
    }
}classsName="inline"*/