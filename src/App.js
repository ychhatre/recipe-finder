import './App.css';
import React, { useEffect, useState } from 'react';


const RecipeCard = ({title, calories, image, vendor}) => {
  return(
    <div>
      <h1> Name: {title} </h1>
      <h2>Vendor: {vendor}</h2>
      <img src={image} alt=""/>
      <p>Calories: {calories} </p>

    </div>
  )
}
const App = () => {


  const [hits, setHits] = useState([]); 
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); 
  useEffect(() => {
    getRecipes(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getRecipes = async() => {
    console.log(query); 
    const queryURL = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`; 
    const data = await (await fetch(queryURL)).json(); 
    console.log(process.env.REACT_APP_APP_ID); 
    setHits(data.hits); 
    console.log(data.hits); 
  }


  return (  
    <div className="App">
      <form onSubmit={e => {
        e.preventDefault(); 
        setQuery(search); 
        setSearch(""); 
      }}> 
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
      {hits.map(hit => (
        <RecipeCard key = {hit.recipe.shareAs} title = {hit.recipe.label}calories={hit.recipe.calories} vendor={hit.recipe.source} image={hit.recipe.image} />
      ))}
    </div>
  );
}

export default App;
