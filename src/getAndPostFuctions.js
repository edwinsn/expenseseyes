//pTO-do add listeners to the new cathegories
//To-do Notifications must be in a function

import axios from 'axios';


let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";
let categoriaActiva = false;

const postCategory=async(category)=>{

    let endPoint = url+"/categories"
    let {status} = await axios.post(endPoint,{name:category})
    if(status!==200){
        alert("Error saving the category: "+status)
    }
}


const addCategory=()=>{


    let categoriesDiv = document.querySelector(".categories");
    let newcategoryText = document.querySelector(".otherType").value;
    let listOfCategories = [...categoriesDiv.children].filter((child=>child.innerText.length>0)).map((child)=>{return child.innerText})


    if(newcategoryText.length>0 && !listOfCategories.includes(newcategoryText)){
      
        let newCategory = document.createElement("button");
        newCategory.innerText = newcategoryText;

        if(categoriesDiv.childElementCount%5===0){
          categoriesDiv.appendChild(document.createElement("br"))
        }
        categoriesDiv.appendChild(newCategory);
        //postCategory(newcategoryText);
    }
    else {
        let pExisting = document.createElement("p")
        pExisting.classList.add("existingClassError")
        
        if(!newcategoryText.length){
        pExisting.innerText = "Existing Category"}
        else{
        pExisting.innerText = "Empty Category"
        }
        document.querySelector(".newCatergoryContainer").appendChild(pExisting)
       
    }
}


export const addCategoryOnEnter=(event)=>{
    
    if(event.keyCode===13){
        addCategory();
    }
} 


export const selectCategory =(event)=>{

    //deselect the previous selection
    let peviousCathegorySelection=document.querySelector(".selectedCategory")
    if(peviousCathegorySelection) {
       peviousCathegorySelection.classList.remove("selectedCategory")
    }
    
    event.target.classList.add("selectedCategory")

    document.querySelector(".otherType").style.color="gray"
    categoriaActiva = event.target.innerText;

}

export const activeOtherCathegoryInput=()=>{
    //if there is an cathegory selectec deselect it
    if(document.querySelector(".selectedCategory")){
        document.querySelector(".selectedCategory").classList.remove("selectedCategory")
        document.querySelector(".otherType").style.color="black";
    }

}

const verifyDataEntries=()=>{
    
    let notificacion = document.querySelector(".notificationPurchaseSubmit");

    if(!categoriaActiva){
        try{
            categoriaActiva = document.querySelector(".otherType").value;
            addCategory();
        }
        catch(error){
            notificacion.innerText = "Select a category or enter a new one";
            notificacion.style.display="block"
            return {cathegory:"",price:0,dataIsValid:false};
        }
}

    let price = document.querySelector(".cost").value

    if(!price){
        notificacion.innerText = "Enter the price of your purchase";
        notificacion.style.display="block"
        return {cathegory:"",price:0,dataIsValid:false};
    }
    return {cathegory:categoriaActiva,price:price,dataIsValid:true};
}



export const postNewPurchase = async()=>{

    let {cathegory,price,dataIsValid} = verifyDataEntries();

    
    if(dataIsValid){

      let loadingDisplay = document.querySelector(".notificationPurchaseSubmit");
      loadingDisplay.innerText="Loading"
      loadingDisplay.style.display="block"

      let {status} = await axios.post(url+"/purchases",{
          category:cathegory,
          price:price
        })

      if(status===200){

        loadingDisplay.style.display="none"

        try{
            document.querySelector(".selectedCategory").style.background="white";
        }
        catch(error){console.log(error)}
      }
      else{
          loadingDisplay.innerText="Sorry purchase not registed"
      }
    }
    //reset the values as before the entry
    categoriaActiva=false;
    document.querySelector('.otherType').innerText = "";
}


export const getPurchases = async()=>{
    let {data,status} = await axios.get(url)
}


export const insertSavedCategories = async()=>{

    // let {data,status} = await axios.get(url+"/categories");
    // if(status===200){ 

    //     let categories = document.querySelector(".categories");
    //     let savedCategoriesJson=[...data];

    //     savedCategoriesJson.forEach((category,i)=>{
          
    //         if(i%4===0)categories.appendChild(document.createElement("br"))
    //         let categotyButton = document.createElement("button");
    //         categotyButton.innerText = category.name;
    //         categotyButton.addEventListener("click",selectCategory)
    //         categories.appendChild(categotyButton)
        
    //     });
    //     if((categories.childElementCount+1)%4)categories.appendChild(document.createElement("ins"))
    
    // }
}