import { useEffect, useState } from "react";
import { Pokeball } from "./components/Pokeball";
import { getPokemons } from "./apis/pokeAPI";
import "./styles/App.scss"

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetch = async () => setPokemons(await getPokemons());
    fetch();
  }, []);



  return (
    <>
      <div className="container">
        {pokemons?.map((pokemon) => <Pokeball key={pokemon.name} pokeData={pokemon}/>)}
      </div>
    </>
  );
}

export default App;
