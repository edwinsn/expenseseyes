import './assets/css/App.css'
import axios from 'axios';
import Bar from './Components/Bar'
import {Inputs} from './Components/Inputs' 


let url = "https://jsonbox.io/box_93b2e4f60b0014f95d48";


function App() {

  // useEffect(()=>{
  //   getPurchases();
  // },[])

  return (
    <div className="App">
  
      <section className="center">
        <p ><em>Log your pruchase</em></p><br />        
        <Inputs />
      </section>  
      <Bar heights={[10,30,20,60,70,100,80,100,80,200]} labels={["A", "B","C","D","F","G","H","J","Last One"]} />
      <script src="./attachListeners.js" type="text/jsx" ></script>

    </div>
);
}


export const getPurchases = async()=>{
    let {data,status} = await axios.get(url)
}


export default App;
