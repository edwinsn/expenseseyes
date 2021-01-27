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

let newCategoryInput = document.querySelector(".otherType");
let categoriesDiv = document.querySelector(".categories");

const addCategory=()=>{

    let newcategoryText = newCategoryInput.value;
    let listOfCategories = [...categoriesDiv.children].filter((child=>child.innerText.length>0)).map((child)=>{return child.innerText})


    if(newcategoryText.length >0 && !listOfCategories.includes(newcategoryText)){
      
        let newCategory = document.createElement("button");
        newCategory.innerText = newCategoryInput.value;

        if(categoriesDiv.childElementCount%5===0){
          categoriesDiv.appendChild(document.createElement("br"))
        }
        categoriesDiv.appendChild(newCategory);
        //postCategory(newcategoryText);
    }
    else{
        let pExisting = document.createElement("p")
        pExisting.innerText = "Existing Category"
        pExisting.classList.add("existingClassError")
        document.querySelector(".newCatergoryContainer").appendChild(pExisting)
    }

}


export const addCategoryOnEnter=(event)=>{
    
    if(event.keyCode===13){
        addCategory();
    }
} 

export const selectCategory =(event)=>{

    event.target.classList.add("selectedCategory")
    categoriaActiva = event.target.innerText;

}

let loadingDisplay = document.querySelector(".loadingPurchase");

export const postNewPurchase = async()=>{
    
    if(!categoriaActiva){
        categoriaActiva = document.querySelector(".otherType").value.length?document.querySelector(".otherType").value.length:false;
        console.log("+++++++")
        console.log(categoriaActiva)
    }
    console.log("...")
    console.log(categoriaActiva)

    let price = document.querySelector(".cost").value

    if(categoriaActiva && price){
  
      loadingDisplay.style.display="block"

      let {status} = await axios.post(url+"/purchases",{
          category:categoriaActiva,
          price:price
        })

      if(status===200){

        loadingDisplay.style.display="none"

        try{
        document.querySelector(".selectedCategory").style.background="white";
        }
        catch(error){console.log(error)}
        categoriaActiva=false;

      }

    }else if(!categoriaActiva){
        alert("Select a category")
    }
    else{
        alert("Log your purchase price")
    }

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