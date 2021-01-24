import axios from 'axios';

let url = "https://jsonbox.io/box_4bb2630da915a12991a3";



export const postNewPurchase = async()=>{
    let response = await axios.post(url+"/purchases",{name:"An A violin string",price:30})
    console.log(response)
}
export const getPurchases = async()=>{
    let {data,status} = await axios.get(url)

}