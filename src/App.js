import Bar from './Components/Bar'
import './assets/css/App.css'
import {postNewPurchase, getPurchases} from './getAndPostFuctions'
import {useDebugValue, useEffect} from 'react'
import {addCategoryOnEnter} from './addCategory'


function App() {

  // useEffect(()=>{
  //   getPurchases();
  // },[])

  return (
    <div className="App">

      <section className="">
        <p className="title"><em>Log your pruchase</em></p><br />
        <div className="center">
          <div className="types inline1">
            <button>food</button>
            <button>rent</button>
            <button>clothes</button>
            <button>tech</button>          
          </div>----
          <input onKeyUp={addCategoryOnEnter} className="otherType inline1" type ="text" placeholder="other type"></input>
        </div>

<br />
        <div className="cost center">
          <div >cost $</div>
          <input  type="number"></input>
        </div>
        <div className="center">
        <button className="center" onClick={postNewPurchase}>Load Purchase</button>
        </div>
      </section>  


      <Bar heights={[10,30,20,60,70,100,80,100,80,200]} labels={["A", "B","C","D","F","G","H","J","Last One"]} />
      <script ></script>
    </div>
  );
}

export default App;
