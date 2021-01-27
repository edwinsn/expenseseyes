
import {selectCategory} from './getAndPostFuctions'



export const attachtListeners=()=>{

    let categoriesDiv = document.querySelector(".categories").children

    let categories = [...categoriesDiv];
    console.log(categories)
     categories.forEach(element => {
        element.addEventListener("click",selectCategory); 
     });

} 