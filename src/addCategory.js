import axios from "axios";


let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";
let endPoint = url+"/categories"

const postCategory=async(category)=>{

    let {status} = await axios.post(endPoint,{name:category})
    if(status!==200){
        alert("Error saving the category: "+status)
    }
}

const addCategory=()=>{

    let newCategoryInput = document.querySelector(".otherType");
    let newcategoryText = newCategoryInput.value;
    let categoriesDiv = document.querySelector(".types");
    let listOfCategories = [...categoriesDiv.children].filter((child=>child.innerText.length>0)).map((child)=>{return child.innerText})


    if(newcategoryText.length>0 && !listOfCategories.includes(newcategoryText)){
        let newCategory = document.createElement("button");
        
        newCategory.innerText = newCategoryInput.value;

        if(categoriesDiv.childElementCount%5===0){
          categoriesDiv.appendChild(document.createElement("br"))
        }
        categoriesDiv.appendChild(newCategory);
        //postCategory(newcategoryText);
    }
    else{
        let pExiting = document.createElement("p")
        pExiting.innerText = "Existing Category"
        pExiting.classList.add("existingClassError")
        document.querySelector(".newCatrgoryContainer").appendChild(pExiting)
    }

}


export const addCategoryOnEnter=(event)=>{
    
    if(event.keyCode===13){
        addCategory();
    }
} 