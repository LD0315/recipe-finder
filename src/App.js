import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = "0364cdd295ca5baba4881a9fc5c043fc";
  const APP_ID = "e9364af3";

  const search = () => {
    //console.log("input ref", inputRef);
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  };

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then(response => {
        //console.log(response);
        //setLoading(true);
        return response.json();
      })
      .then(res => {
        //console.log("final response", res);
        console.log(res.hits);
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch(err => console.log("error", err),
      setLoading(false));
  };
  //const [count, setCount] = useState(0);
  //no dependency, call useEffect once
  useEffect(() => {
    searchForRecipe('beef');
  }, []);

  //<button onClick={() => setCount(count + 1)}>Increment count</button>
  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe"/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="Wrapper">
          {ingredientList.map(({ recipe }) => {
            const {label, image, ingredientLines} = recipe;
            return(
              <div key={label} className="Ingredient">
                <span>{label}</span>
                <img src={image}/>
                <div className="Steps">
                  {ingredientLines.map((step, index) => {
                    return <p key={index}>{step}</p>
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
