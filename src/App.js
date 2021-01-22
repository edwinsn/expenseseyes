import Bar from './Components/Bar'

function App() {
  return (
    <div className="App">
        <Bar heights={[10,30,20,60,70,100,80,100,80,200]} labels={["A", "B","C","D","F","G","H","J","Last One"]} />
    </div>
  );
}

export default App;
