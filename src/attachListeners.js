
import {selectCategory,activeOtherCathegoryInput} from './getAndPostFuctions'



export const attachtListeners=()=>{

    let categoriesDiv = document.querySelector(".categories").children

    let categories = [...categoriesDiv];
     categories.forEach(element => {
        element.addEventListener("click",selectCategory); 
     });
     document.querySelector(".otherType").addEventListener("click",activeOtherCathegoryInput)

} 