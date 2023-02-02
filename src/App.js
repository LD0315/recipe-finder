import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const API_KEY = "0364cdd295ca5baba4881a9fc5c043fc";
  const APP_ID = "e9364af3";
  //const [count, setCount] = useState(0);
  //no dependency, call useEffect once
  useEffect(() => {
    let url = `search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then(response => {
        //console.log(response);
        return response.json()
      })
      .then(res => {
        console.log("final response", res);
      })
      .catch(err => 
        console.log("error", err));
  }, []);

  //<button onClick={() => setCount(count + 1)}>Increment count</button>
  return (
    <div className="App">
      <header className="App-header">
       Hello World!!
      </header>
    </div>
  );
}

export default App;
