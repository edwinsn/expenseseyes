let brCount=0;

const addCategory=()=>{
    let newCategoryInput=document.querySelector(".otherType")
    if(newCategoryInput.value.length>0){
        let categoriesDiv=document.querySelector(".types");
        let newCategory = document.createElement("button");
        
        newCategory.innerText = newCategoryInput.value;
        
        if((categoriesDiv.childElementCount-(brCount))%4===0){
          categoriesDiv.appendChild(document.createElement("br"))
          brCount++;
        }
        categoriesDiv.appendChild(newCategory);

    }

}


export const addCategoryOnEnter=(event)=>{
    
    if(event.keyCode===13){
        addCategory();
    }
} 