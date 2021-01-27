import Bar from './Components/Bar'
import './assets/css/App.css'
import {addCategoryOnEnter, postNewPurchase, insertSavedCategories } from './getAndPostFuctions'
import {useEffect} from 'react'
import {attachtListeners} from './attachListeners'

function App() {

  useEffect(()=>{
    insertSavedCategories();
    attachtListeners();
  },[])


  // useEffect(()=>{
  //   getPurchases();
  // },[])

  return (
    <div className="App">
  
      <section >
        <p className="center"><em>Log your pruchase</em></p><br />
        <div className="center">
          
          <div className="categories inlineTable">
            <button>food</button>
            <button>rent</button>
            <button>clothes</button>
            <button>tech</button>      
          </div>
         
          <div className="left inlineTable">
            
            <div className="newCatergoryContainer">
              <input onKeyUp={addCategoryOnEnter} className="otherType" type ="text" placeholder="other type"></input>
            </div>
            
        
              <input className="otherType cost" placeholder="cost" type="number"></input>
            <br />
            <button  onClick={postNewPurchase}>Load Purchase</button>
            <div className="notificationPurchaseSubmit"></div>
            
          </div>

        </div>
      </section>  
      <Bar heights={[10,30,20,60,70,100,80,100,80,200]} labels={["A", "B","C","D","F","G","H","J","Last One"]} />
      <script src="./attachListeners.js" type="text/jsx" ></script>


    </div>

);
}

export default App;
