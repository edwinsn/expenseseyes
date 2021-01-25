import axios from 'axios';

let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";



export const postNewPurchase = async()=>{
    let response = await axios.post(url+"/purchases",{name:"An A violin string",price:30})
}
export const getPurchases = async()=>{
    let {data,status} = await axios.get(url)
}
export const insertSavedCategories = async()=>{
    console.log("16")
    let {data,status} = await axios.get(url+"/categories");
    if(status===200){ 

        let categories = document.querySelector(".types");
        let savedCategoriesJson=[...data];

        savedCategoriesJson.forEach((category,i)=>{
          
            if(i%4===0)categories.appendChild(document.createElement("br"))
            let categotyButton = document.createElement("button");
            categotyButton.innerText = category.name;
            categories.appendChild(categotyButton)
        
        });
        if((categories.childElementCount+1)%4)categories.appendChild(document.createElement("ins"))
    
    }
}