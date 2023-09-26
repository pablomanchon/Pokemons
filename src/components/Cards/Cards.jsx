/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getPokemons } from "../../apis/pokeAPI";
import "../../styles/cards.scss";
import { Card } from "./Card";

export const Cards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokeId, setPokeId] = useState(0);

  useEffect(() => {
    getPokemons().then((res) => {
      setPokemons(res.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div>Loading... </div>;

  return (
    <div className="pokemons-container">
      <button
        onClick={() => {
          pokeId == 0 ?
          setPokeId(pokemons.length-1) : setPokeId(pokeId - 1);
        }}
        className="btn-changePokemon">
        {"<"}
      </button>
      <Card pokeData={pokemons[pokeId]} />
      <button
        onClick={() => {
          pokeId == pokemons.length -1 ?
            setPokeId(0) : setPokeId(pokeId + 1);
          }
        }
        className="btn-changePokemon">
        {">"}
      </button>
    </div>
  );
};
