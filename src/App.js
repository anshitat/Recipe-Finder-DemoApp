import './App.css';
import { useEffect, useState , useRef} from 'react';

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading]  = useState(false);
  const inputRef = useRef(null);
  const API_KEY = '2fb2dd7b6f636b493219402ac0ac5928'
  const APP_ID = '715123f9'

  const search= () =>{
    // console.log('input ref: ', inputRef)
    searchForRecipe(inputRef.current.value);
    inputRef.current.value =''
  }

  const searchForRecipe = (query) =>{
    setLoading(true)
    let url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    fetch(url)
      .then((res) => res.json())
      .then((data) =>{
        updateIngredientList(data.hits);
        setLoading(false)
        console.log(data)
      })
      .catch((err)=>{
          console.log(err)
          setLoading(false)
      })
  }

  useEffect( ()=>{
    searchForRecipe('chicken');
  },[])

  return (
    <div className="App">
      <header className='App-header'>
        <div className='inputWrapper'>
          <input ref={inputRef}  placeholder='Search for recipe'/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className='wrapper'>
          {ingredientList.map( ({recipe}) =>{
            const {label, image, ingredientLines} = recipe
            return(
              <div key={label} className='ingredient'>
                <span>{label}</span>
                <img src={image}/>
                <div className='steps'>
                  {ingredientLines.map( (step, index)=>{
                    return(
                      <p key={index}>{step}</p>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
