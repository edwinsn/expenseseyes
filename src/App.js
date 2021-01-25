import Bar from './Components/Bar'
import './assets/css/App.css'
import {postNewPurchase, insertSavedCategories } from './getAndPostFuctions'
import {useEffect} from 'react'
import {addCategoryOnEnter} from './addCategory'


function App() {

  useEffect(()=>{
    insertSavedCategories();
  },[])

  // useEffect(()=>{
  //   getPurchases();
  // },[])

  return (
    <div className="App">

      <section className="">
        <p className="center"><em>Log your pruchase</em></p><br />
        <div className="center">
          
          <div className="types inlineTable">
            <button>food</button>
            <button>rent</button>
            <button>clothes</button>
            <button>tech</button>      
          </div>
         
          <div className="left inlineTable">
            
            <div className="newCatrgoryContainer">
              <input onKeyUp={addCategoryOnEnter} className="otherType" type ="text" placeholder="other type"></input>
            </div>
            
            <div className="cost">
              <input className="otherType" placeholder="cost" type="number"></input>
            </div>
            <button  onClick={postNewPurchase}>Load Purchase</button>
        
          </div>

        </div>
      </section>  

      <Bar heights={[10,30,20,60,70,100,80,100,80,200]} labels={["A", "B","C","D","F","G","H","J","Last One"]} />
    </div>
  );
}

export default App;
