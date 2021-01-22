import Bar from './Components/Bar'

function App() {
  return (
    <div className="App">
        <Bar heights={[30,60,70,100,80,100,80]} labels={["A", "B","C","D","F","G","H"]} />
    </div>
  );
}

export default App;
